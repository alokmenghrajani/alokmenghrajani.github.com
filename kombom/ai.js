'use strict';

// Make Kombom available under both module loaders and `<script>` tags.
// In a browser, kombom.js is loaded as a separate <script> first and Kombom
// is already a global; this `require` only fires under node.
if (typeof Kombom === 'undefined' && typeof require !== 'undefined') {
  // eslint-disable-next-line no-global-assign
  globalThis.Kombom = require('./kombom').Kombom;
}

// AI strategies for Kombom. Depends on the Kombom class from kombom.js.
//
// Each AI subclass exposes `chooseMove(game)` and returns one of the move
// options produced by `Kombom.generateMoveOptions`. AIs are stateless from
// the game's point of view (no memory of previous turns), but `HardAI`
// caches a perfect-play transposition table in a static field shared
// across all instances.

class AI {
  constructor(computerSymbol) {
    this.computerSymbol = computerSymbol;
  }

  get humanSymbol() { return Kombom.opponent(this.computerSymbol); }

  // Override in subclasses.
  chooseMove(_game) {
    throw new Error('AI.chooseMove must be overridden');
  }

  static randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // Mate-in-N detection. Returns true iff `player` (to move at full-move
  // number `mn`) can force a 4-in-a-row within `nMoves` of their own turns.
  // Mutually recursive with `opponentForcedLoses`.
  //
  //   nMoves=1 → "immediate win": player has at least one move that wins now.
  //   nMoves=2 → "mate in 2": player has a move such that for every opponent
  //              response, player has a follow-up that wins immediately.
  static playerForcesWinIn(b, player, mn, nMoves) {
    if (nMoves <= 0 || mn > Kombom.TOTAL_MOVES) return false;
    const opts = Kombom.generateMoveOptions(b, player, mn);
    for (const opt of opts) {
      if (opt.isWin) return true;
      if (nMoves <= 1 || mn >= Kombom.TOTAL_MOVES) continue;
      if (AI.opponentForcedLoses(opt.finalBoard, Kombom.opponent(player), mn + 1, nMoves - 1)) {
        return true;
      }
    }
    return false;
  }

  static opponentForcedLoses(b, opp, mn, nMoves) {
    if (nMoves <= 0 || mn > Kombom.TOTAL_MOVES) return false;
    const opts = Kombom.generateMoveOptions(b, opp, mn);
    if (opts.length === 0) return false;
    for (const opt of opts) {
      if (opt.isWin) return false;            // opp wins → not forced loss
      if (mn >= Kombom.TOTAL_MOVES) return false; // game ends in draw → not a loss
      if (!AI.playerForcesWinIn(opt.finalBoard, Kombom.opponent(opp), mn + 1, nMoves)) {
        return false;
      }
    }
    return true;
  }
}

// 2-player mode driver: just picks a random legal move. Doesn't actually
// play, but matches the AI interface so the UI can drive turns uniformly.
class RandomAI extends AI {
  chooseMove(game) {
    const opts = Kombom.generateMoveOptions(game.board, this.computerSymbol, game.moveNum);
    return opts.length === 0 ? null : AI.randomChoice(opts);
  }
}

// Easy:
//   1. Win immediately if any move does.
//   2. Otherwise drop any move that lets the opponent win on their next turn.
//   3. Pick uniformly at random from what's left (or from all legal moves
//      if every move is unsafe).
class EasyAI extends AI {
  chooseMove(game) {
    const opts = Kombom.generateMoveOptions(game.board, this.computerSymbol, game.moveNum);
    if (opts.length === 0) return null;

    const winning = opts.filter(o => o.isWin);
    if (winning.length > 0) return AI.randomChoice(winning);

    const safe = opts.filter(o => {
      if (game.moveNum >= Kombom.TOTAL_MOVES) return true;
      return !AI.playerForcesWinIn(o.finalBoard, this.humanSymbol, game.moveNum + 1, 1);
    });
    return AI.randomChoice(safe.length > 0 ? safe : opts);
  }
}

// Medium:
//   1. Take an immediate win if available. (Same as easy's first step —
//      never lose a dice roll to a mate-in-2 when a mate-in-1 exists.)
//   2. Otherwise play any move that forces a win on our next turn (mate-in-2).
//   3. Otherwise drop any move that lets the opponent win within 2 of *their*
//      turns; pick uniformly at random from what's left.
//   4. If nothing survives, fall back to easy mode — medium is never strictly
//      worse than easy.
class MediumAI extends AI {
  constructor(computerSymbol) {
    super(computerSymbol);
    this._easyFallback = new EasyAI(computerSymbol);
  }

  chooseMove(game) {
    const opts = Kombom.generateMoveOptions(game.board, this.computerSymbol, game.moveNum);
    if (opts.length === 0) return null;

    const winning = opts.filter(o => o.isWin);
    if (winning.length > 0) return AI.randomChoice(winning);

    if (game.moveNum < Kombom.TOTAL_MOVES) {
      const matesIn2 = opts.filter(o =>
        AI.opponentForcedLoses(o.finalBoard, this.humanSymbol, game.moveNum + 1, 1)
      );
      if (matesIn2.length > 0) return AI.randomChoice(matesIn2);
    }

    const safe = opts.filter(o => {
      if (game.moveNum >= Kombom.TOTAL_MOVES) return true;
      return !AI.playerForcesWinIn(o.finalBoard, this.humanSymbol, game.moveNum + 1, 2);
    });
    if (safe.length > 0) return AI.randomChoice(safe);

    return this._easyFallback.chooseMove(game);
  }
}

// Hard: full perfect-play with mate-distance scoring.
//
// Memoized minimax over the full game tree. The board is encoded as a base-3
// integer (0=empty, 1=X, 2=O); the move number is determined by the count of
// filled cells at any decision point, so the board alone is the memo key.
//
// Each memo entry is a single byte: 0 = unset, otherwise high 3 bits hold
// value+2 (1=O wins, 2=draw, 3=X wins from X's perspective) and low 5 bits
// hold the distance — the number of full moves remaining until the result
// is realized (1 = "settled this turn"; max 17). With that, the AI ranks
// moves by (value, distance): in winning/drawing positions it picks the
// shortest line; in lost positions it drags the loss out as long as
// possible, forcing the opponent to actually find the win.
//
// Memo keys are canonicalized via the board's D4 symmetry group: keys are
// the lex-smallest of the 8 rotated/reflected encodings, so symmetric
// positions share entries. We maintain all 8 keys incrementally as the
// search mutates the board, so canonicalization is O(8) per node.
//
// The memo is a static field, shared across HardAI instances — building it
// once costs ~1 s, and any HardAI / eval display can reuse it.
class HardAI extends AI {
  static PERFECT_MEMO_SIZE = 43046721; // 3^16

  // Hard-coded results for moves 1 and 2: the search is unnecessary because
  // every reachable board at those points has the same outcome (verified
  // exhaustively).
  //   Move 1 (empty board, X to move) — every X placement leads to an
  //   O-winning position; X's "best" line still loses in 12 full moves.
  //   Move 2 (1 X piece, O to move) — every O response keeps the win; all 16
  //   reachable boards resolve to (value=-1, distance=11).
  // Packed byte = ((xVal + 2) << 5) | distance. xVal = -1 → high nybble = 1.
  static PS_PACKED_MOVE_1 = (1 << 5) | 12; // (-1, 12)
  static PS_PACKED_MOVE_2 = (1 << 5) | 11; // (-1, 11)

  static PS_POW3 = (() => {
    const p = new Float64Array(17); p[0] = 1;
    for (let i = 1; i <= 16; i++) p[i] = p[i - 1] * 3;
    return p;
  })();

  // PS_WEIGHT[t][i] = 3 ** PERMS[t][i] for symmetry t (0..7) — the weight to
  // add to the t-th symmetry's running base-3 key when cell i changes.
  static PS_WEIGHT = (() => {
    const W = [];
    for (let t = 0; t < 8; t++) {
      const w = new Float64Array(16);
      for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) {
        let nr, nc;
        switch (t) {
          case 0: nr = r;     nc = c;     break; // identity
          case 1: nr = c;     nc = 3 - r; break; // rotate 90°
          case 2: nr = 3 - r; nc = 3 - c; break; // rotate 180°
          case 3: nr = 3 - c; nc = r;     break; // rotate 270°
          case 4: nr = 3 - r; nc = c;     break; // flip horizontal
          case 5: nr = r;     nc = 3 - c; break; // flip vertical
          case 6: nr = c;     nc = r;     break; // flip main diagonal
          default: nr = 3 - c; nc = 3 - r;       // flip anti-diagonal
        }
        w[r * 4 + c] = HardAI.PS_POW3[nr * 4 + nc];
      }
      W.push(w);
    }
    return W;
  })();

  // Same shape as Kombom.LINES_THROUGH but indexed for the Uint8Array board
  // representation used internally. (Identical contents — we just keep our
  // own reference for hot-path locality.)
  static LINES_THROUGH = (() => {
    const t = Array.from({ length: 16 }, () => []);
    for (const line of Kombom.LINES) for (const i of line) t[i].push(line);
    return t;
  })();

  // The memo, build-time stat, and incremental build state are all static so
  // they're shared across HardAI instances (an in-progress build started by
  // the eval display is reused by the gameplay AI and vice versa).
  static memo = null;
  static buildMs = null;
  static _buildState = null; // null | { elapsedMs, seedIdx } while building
  static _solvedCount = 0;   // memo entries written so far (for progress UI)

  // Sentinel thrown out of `_solve` when the chunk's deadline expires. A
  // singleton plain object — no Error allocation, no stack-trace capture.
  static _BUDGET_EXCEEDED = { kind: 'BUDGET_EXCEEDED' };

  // Tick counter for periodic deadline checks inside `_solve`. Reset at the
  // start of each chunk so the bitwise mask never overflows.
  static _tickCounter = 0;

  // Highest realistic state count under D4 canonicalization (~990k observed).
  // Used only to convert `_solvedCount` into a 0..1 progress fraction.
  static _ESTIMATED_TOTAL_STATES = 990000;

  // (a, b) pairs with a < b in [0..15] — the seed boards (2 O pieces, 0 X)
  // that drive the move-3 build.
  static _SEEDS = (() => {
    const seeds = [];
    for (let a = 0; a < 16; a++) for (let b = a + 1; b < 16; b++) seeds.push([a, b]);
    return seeds;
  })();

  // Bound monotonic clock: avoids the `typeof performance` branch inside
  // `_solve`, which fires every 4096 calls during a build.
  static _now = (typeof performance !== 'undefined' && performance.now)
    ? performance.now.bind(performance)
    : Date.now.bind(Date);

  static unpackVal(byte) { return (byte >> 5) - 2; }
  static unpackDist(byte) { return byte & 31; }

  // True only when the memo is fully populated. Partial builds (chunked
  // mode) report false so callers wait until completion.
  static get isReady() { return HardAI.memo !== null && HardAI._buildState === null; }

  // Fraction in [0, 1] of the memo build complete. Reads `_solvedCount`
  // (memo writes) against the empirical state-count estimate.
  static get buildProgress() {
    if (HardAI.isReady) return 1;
    if (!HardAI.memo) return 0;
    return Math.min(0.999, HardAI._solvedCount / HardAI._ESTIMATED_TOTAL_STATES);
  }

  constructor(computerSymbol) {
    super(computerSymbol);
    // Per-instance scratch — avoids reallocating in the hot recursion.
    this._psBoard = new Uint8Array(16);
    this._psSymKeys = new Float64Array(8);
    this._psEmptiesPool = [];
    this._psOppCellsPool = [];
    for (let i = 0; i <= 18; i++) {
      this._psEmptiesPool.push(new Int32Array(16));
      this._psOppCellsPool.push(new Int32Array(16));
    }
    // Per-instance deadline used by `_solve`'s periodic check. Infinity
    // means "no deadline" (the synchronous code path through `ensureMemo`).
    this._deadline = Infinity;
  }

  // Synchronous build path. If a chunked build is already underway, run it
  // to completion in one shot. Idempotent.
  ensureMemo() {
    while (!this.buildMemoChunk(Infinity).done) { /* loop until done */ }
  }

  // Cooperative incremental build. Runs as many seeds as fit before
  // `deadlineMs` (an absolute time matching `HardAI._now()`); use
  // `Infinity` for an unbounded synchronous run. Idempotent — calling
  // after the build is finished returns immediately.
  //
  // Returns:
  //   { done: true,  totalMs }    when the memo is fully built
  //   { done: false, progress }   when more chunks are needed
  buildMemoChunk(deadlineMs) {
    // Already done.
    if (HardAI.memo && HardAI._buildState === null) {
      return { done: true, totalMs: HardAI.buildMs };
    }

    // First chunk: allocate memo and prepare build state.
    if (HardAI._buildState === null) {
      HardAI.memo = new Uint8Array(HardAI.PERFECT_MEMO_SIZE);
      HardAI._buildState = { elapsedMs: 0, seedIdx: 0 };
      HardAI._solvedCount = 0;
    }

    const state = HardAI._buildState;
    const chunkStart = HardAI._now();
    const arr = HardAI._buildArr || (HardAI._buildArr = new Uint8Array(16));
    HardAI._tickCounter = 0;
    this._deadline = deadlineMs;

    try {
      // Moves 1 and 2 are trivially decided (psSolve hardcodes them). Seed
      // the search at move 3 by enumerating every board reachable from any
      // (X-place, O-place, O-invert) sequence: 2 O pieces, 0 X pieces, in
      // C(16, 2) = 120 layouts. Canonicalization in psSolve collapses these
      // to ~15 unique solves; the rest hit the cache.
      while (state.seedIdx < HardAI._SEEDS.length) {
        const [a, b] = HardAI._SEEDS[state.seedIdx];
        arr.fill(0);
        arr[a] = 2;
        arr[b] = 2;
        this._resetFromArray(arr);
        try {
          this._solve(3);
        } catch (e) {
          if (e === HardAI._BUDGET_EXCEEDED) break;
          throw e;
        }
        state.seedIdx++;
      }
    } finally {
      this._deadline = Infinity;
      state.elapsedMs += HardAI._now() - chunkStart;
    }

    if (state.seedIdx >= HardAI._SEEDS.length) {
      HardAI.buildMs = Math.round(state.elapsedMs);
      HardAI._buildState = null;
      return { done: true, totalMs: HardAI.buildMs };
    }
    return { done: false, progress: HardAI.buildProgress };
  }

  chooseMove(game) {
    this.ensureMemo();

    const opts = Kombom.generateMoveOptions(game.board, this.computerSymbol, game.moveNum);
    if (opts.length === 0) return null;

    const targetSign = this.computerSymbol === 'X' ? 1 : -1;
    const scratch = new Uint8Array(16);

    let bestRank = -10000;
    let bestMoves = [];

    for (const opt of opts) {
      let cv, cd;
      if (opt.isWin) {
        cv = 1; cd = 1;
      } else if (game.moveNum === Kombom.TOTAL_MOVES) {
        cv = 0; cd = 1;
      } else {
        for (let i = 0; i < 16; i++) {
          scratch[i] = opt.finalBoard[i] === 'X' ? 1 : opt.finalBoard[i] === 'O' ? 2 : 0;
        }
        this._resetFromArray(scratch);
        const childByte = this._solve(game.moveNum + 1);
        cv = HardAI.unpackVal(childByte) * targetSign;
        cd = HardAI.unpackDist(childByte) + 1;
      }
      const r = cv * 100 + (cv === -1 ? cd : -cd);
      if (r > bestRank) { bestRank = r; bestMoves = [opt]; }
      else if (r === bestRank) bestMoves.push(opt);
    }

    return AI.randomChoice(bestMoves);
  }

  // Position evaluation for the eval display. Returns
  //   { player, value, distance }
  // where value is +1 if `player` (= currentPlayer) wins, 0 draw, -1 loses,
  // and distance is the number of full moves remaining until the result is
  // realized. Returns null if the memo isn't built or the game is over.
  // Handles both clean start-of-turn states (direct memo lookup) and mid-turn
  // states (one half-move already done — enumerate the remaining half-move).
  evaluatePosition(game) {
    if (game.gameOver || !HardAI.memo) return null;

    const scratch = new Uint8Array(16);
    for (let i = 0; i < 16; i++) {
      scratch[i] = game.board[i] === 'X' ? 1 : game.board[i] === 'O' ? 2 : 0;
    }

    const player = game.currentPlayer === 'X' ? 1 : 2;
    const opp = 3 - player;
    const isMax = player === 1;

    const expP = game.moveNum !== Kombom.TOTAL_MOVES;
    const expI = game.moveNum !== 1;
    const isStart = game.needsPlace === expP && game.needsInvert === expI;

    if (isStart) {
      this._resetFromArray(scratch);
      const cb = this._solve(game.moveNum);
      const xVal = HardAI.unpackVal(cb);
      return {
        player: game.currentPlayer,
        value: isMax ? xVal : -xVal,
        distance: HardAI.unpackDist(cb),
      };
    }

    // Mid-turn: exactly one half-move remains. Enumerate completions.
    let bestRank = -10000, bestCv = 0, bestCd = 0;
    const consider = (captured, won) => {
      let cv, cd;
      if (won) { cv = 1; cd = 1; }
      else if (game.moveNum === Kombom.TOTAL_MOVES) { cv = 0; cd = 1; }
      else {
        this._resetFromArray(captured);
        const cb = this._solve(game.moveNum + 1);
        const xVal = HardAI.unpackVal(cb);
        cv = isMax ? xVal : -xVal;
        cd = HardAI.unpackDist(cb) + 1;
      }
      const r = cv * 100 + (cv === -1 ? cd : -cd);
      if (r > bestRank) { bestRank = r; bestCv = cv; bestCd = cd; }
    };

    if (game.needsPlace) {
      for (let i = 0; i < 16; i++) {
        if (scratch[i] !== 0) continue;
        scratch[i] = player;
        const won = this._winsAt(scratch, i, player);
        const captured = scratch.slice();
        scratch[i] = 0;
        consider(captured, won);
      }
    } else if (game.needsInvert) {
      for (let i = 0; i < 16; i++) {
        if (scratch[i] !== opp) continue;
        scratch[i] = player;
        const won = this._winsAt(scratch, i, player);
        const captured = scratch.slice();
        scratch[i] = opp;
        consider(captured, won);
      }
    }

    if (bestRank === -10000) return null;
    return { player: game.currentPlayer, value: bestCv, distance: bestCd };
  }

  // ---- Internals ----

  _setCell(idx, oldV, newV) {
    const delta = newV - oldV;
    const W = HardAI.PS_WEIGHT;
    const k = this._psSymKeys;
    k[0] += delta * W[0][idx];
    k[1] += delta * W[1][idx];
    k[2] += delta * W[2][idx];
    k[3] += delta * W[3][idx];
    k[4] += delta * W[4][idx];
    k[5] += delta * W[5][idx];
    k[6] += delta * W[6][idx];
    k[7] += delta * W[7][idx];
    this._psBoard[idx] = newV;
  }

  _canonKey() {
    const k = this._psSymKeys;
    let m = k[0];
    if (k[1] < m) m = k[1];
    if (k[2] < m) m = k[2];
    if (k[3] < m) m = k[3];
    if (k[4] < m) m = k[4];
    if (k[5] < m) m = k[5];
    if (k[6] < m) m = k[6];
    if (k[7] < m) m = k[7];
    return m;
  }

  _resetFromArray(arr) {
    this._psSymKeys.fill(0);
    const W = HardAI.PS_WEIGHT;
    const k = this._psSymKeys;
    for (let i = 0; i < 16; i++) {
      const v = arr[i];
      this._psBoard[i] = v;
      if (v !== 0) {
        k[0] += v * W[0][i];
        k[1] += v * W[1][i];
        k[2] += v * W[2][i];
        k[3] += v * W[3][i];
        k[4] += v * W[4][i];
        k[5] += v * W[5][i];
        k[6] += v * W[6][i];
        k[7] += v * W[7][i];
      }
    }
  }

  _winsAt(b, i, p) {
    const lines = HardAI.LINES_THROUGH[i];
    for (let li = 0; li < lines.length; li++) {
      const L = lines[li];
      if (b[L[0]] === p && b[L[1]] === p && b[L[2]] === p && b[L[3]] === p) return true;
    }
    return false;
  }

  // Returns the packed byte (matches the memo entry shape). Internally ranks
  // options from the *current player's* perspective:
  //   rank = cv*100 + (cv === -1 ? cd : -cd)
  // — higher is better, so winning shorter and losing longer both rank well.
  _solve(moveNum) {
    // Cooperative deadline check — fires once every 4096 nodes (so the
    // check itself stays well under 1% of solve time). When the chunk
    // budget expires we throw a sentinel; `buildMemoChunk` catches it,
    // leaves `_buildState` in place (memo entries we did write persist),
    // and the next chunk resumes from the current seed.
    if ((HardAI._tickCounter++ & 4095) === 0 && HardAI._now() >= this._deadline) {
      throw HardAI._BUDGET_EXCEEDED;
    }
    if (moveNum === 1) return HardAI.PS_PACKED_MOVE_1;
    if (moveNum === 2) return HardAI.PS_PACKED_MOVE_2;

    const key = this._canonKey();
    const cached = HardAI.memo[key];
    if (cached !== 0) return cached;

    const isMax = (moveNum & 1) === 1;
    const player = isMax ? 1 : 2;
    const opp = isMax ? 2 : 1;

    const empties = this._psEmptiesPool[moveNum];
    const oppCells = this._psOppCellsPool[moveNum];
    let empN = 0, oppN = 0;
    for (let i = 0; i < 16; i++) {
      const v = this._psBoard[i];
      if (v === 0) empties[empN++] = i;
      else if (v === opp) oppCells[oppN++] = i;
    }

    let bestRank = -10000;
    let cpBest = 0;
    let cpDist = 0;

    if (moveNum === Kombom.TOTAL_MOVES) {
      // Terminal one-shot: no recursion, no symmetry-key churn needed.
      for (let k = 0; k < oppN; k++) {
        const idx = oppCells[k];
        this._psBoard[idx] = player;
        const won = this._winsAt(this._psBoard, idx, player);
        this._psBoard[idx] = opp;
        const cv = won ? 1 : 0;
        const r = cv * 100 - 1;
        if (r > bestRank) { bestRank = r; cpBest = cv; cpDist = 1; }
        if (cv === 1) break;
      }
    } else {
      // Single-action wins (no recursion), can short-circuit at (cv=1, cd=1).
      let singleWin = false;
      for (let k = 0; k < empN; k++) {
        const idx = empties[k];
        this._psBoard[idx] = player;
        const won = this._winsAt(this._psBoard, idx, player);
        this._psBoard[idx] = 0;
        if (won) { singleWin = true; break; }
      }
      if (!singleWin) {
        for (let k = 0; k < oppN; k++) {
          const idx = oppCells[k];
          this._psBoard[idx] = player;
          const won = this._winsAt(this._psBoard, idx, player);
          this._psBoard[idx] = opp;
          if (won) { singleWin = true; break; }
        }
      }
      if (singleWin) {
        cpBest = 1; cpDist = 1;
      } else {
        let done = false;
        for (let pi = 0; pi < empN && !done; pi++) {
          const pIdx = empties[pi];
          this._setCell(pIdx, 0, player);
          for (let ii = 0; ii < oppN; ii++) {
            const iIdx = oppCells[ii];
            this._setCell(iIdx, opp, player);
            let cv, cd;
            if (this._winsAt(this._psBoard, pIdx, player) || this._winsAt(this._psBoard, iIdx, player)) {
              cv = 1; cd = 1;
            } else {
              const cb = this._solve(moveNum + 1);
              const cvX = (cb >> 5) - 2;
              cv = isMax ? cvX : -cvX;
              cd = (cb & 31) + 1;
            }
            this._setCell(iIdx, player, opp);
            const r = cv * 100 + (cv === -1 ? cd : -cd);
            if (r > bestRank) { bestRank = r; cpBest = cv; cpDist = cd; }
            if (cv === 1 && cd === 1) { done = true; break; }
          }
          this._setCell(pIdx, player, 0);
        }
      }
    }

    const xVal = isMax ? cpBest : -cpBest;
    const result = ((xVal + 2) << 5) | cpDist;
    HardAI.memo[key] = result;
    HardAI._solvedCount++;
    return result;
  }
}

if (typeof module !== 'undefined') {
  module.exports = { AI, RandomAI, EasyAI, MediumAI, HardAI };
}
