'use strict';

// Kombom — game state and rules. No DOM, no AI, no UI orchestration.
// The class encapsulates board, half-move history, and the move-progression
// state machine (which actions of the current turn are still pending).

class Kombom {
  static SIZE = 4;
  static N = 16;
  static TOTAL_MOVES = 17;

  // All 10 winning lines (4 rows + 4 columns + 2 diagonals).
  static LINES = (() => {
    const lines = [];
    for (let r = 0; r < 4; r++) lines.push([0, 1, 2, 3].map(c => r * 4 + c));
    for (let c = 0; c < 4; c++) lines.push([0, 1, 2, 3].map(r => r * 4 + c));
    lines.push([0, 5, 10, 15]);
    lines.push([3, 6, 9, 12]);
    return lines;
  })();

  // For each cell, the lines that pass through it (≤ 4: row, col, up to 2 diagonals).
  static LINES_THROUGH = (() => {
    const t = Array.from({ length: 16 }, () => []);
    for (const line of Kombom.LINES) for (const i of line) t[i].push(line);
    return t;
  })();

  static opponent(p) { return p === 'X' ? 'O' : 'X'; }

  static checkWin(p, b) {
    return Kombom.LINES.some(line => line.every(i => b[i] === p));
  }

  static findWinLine(p, b) {
    for (const line of Kombom.LINES) {
      if (line.every(i => b[i] === p)) return line;
    }
    return null;
  }

  // All legal full moves for `player` at full-move number `mn` on board `b`.
  // Each option is { actions, finalBoard, isWin }, where `actions` is a list
  // of one or two half-moves (place/invert), `finalBoard` is the board after
  // applying them, and `isWin` is true if the move ends in a 4-in-a-row.
  //
  //   move 1   → place only (the very first half-move).
  //   move 17  → invert only (board is full, only flips remain).
  //   else     → place + invert in either order, plus single-action wins
  //              (the player ends the turn early once the line is complete).
  static generateMoveOptions(b, player, mn) {
    const opp = Kombom.opponent(player);
    const empties = [];
    const opps = [];
    for (let i = 0; i < 16; i++) {
      if (b[i] === null) empties.push(i);
      else if (b[i] === opp) opps.push(i);
    }

    const options = [];

    if (mn === 1) {
      for (const pIdx of empties) {
        const nb = b.slice(); nb[pIdx] = player;
        options.push({
          actions: [{ kind: 'place', idx: pIdx }],
          finalBoard: nb,
          isWin: Kombom.checkWin(player, nb),
        });
      }
      return options;
    }

    if (mn === Kombom.TOTAL_MOVES) {
      for (const iIdx of opps) {
        const nb = b.slice(); nb[iIdx] = player;
        options.push({
          actions: [{ kind: 'invert', idx: iIdx }],
          finalBoard: nb,
          isWin: Kombom.checkWin(player, nb),
        });
      }
      return options;
    }

    // Single-action wins are listed first; combos that already win via either
    // half-action alone are skipped in the two-action loop below.
    const placeWins = new Set();
    for (const pIdx of empties) {
      const nb = b.slice(); nb[pIdx] = player;
      if (Kombom.checkWin(player, nb)) {
        options.push({ actions: [{ kind: 'place', idx: pIdx }], finalBoard: nb, isWin: true });
        placeWins.add(pIdx);
      }
    }
    const invertWins = new Set();
    for (const iIdx of opps) {
      const nb = b.slice(); nb[iIdx] = player;
      if (Kombom.checkWin(player, nb)) {
        options.push({ actions: [{ kind: 'invert', idx: iIdx }], finalBoard: nb, isWin: true });
        invertWins.add(iIdx);
      }
    }

    for (const pIdx of empties) {
      if (placeWins.has(pIdx)) continue;
      for (const iIdx of opps) {
        if (invertWins.has(iIdx)) continue;
        const nb = b.slice(); nb[pIdx] = player; nb[iIdx] = player;
        options.push({
          actions: [{ kind: 'place', idx: pIdx }, { kind: 'invert', idx: iIdx }],
          finalBoard: nb,
          isWin: Kombom.checkWin(player, nb),
        });
      }
    }
    return options;
  }

  // ---- URL fragment serialization ----
  // Format: <mode><human?><moves>
  //   mode  : 'p' = 2 players, 'e' = easy, 'm' = medium, 'h' = hard
  //   human : (only for AI modes)  'x' = human is X, 'o' = human is O
  //   moves : one char per half-move:
  //             a..p  → place at cell 0..15
  //             A..P  → invert at cell 0..15

  static MODE_TO_CHAR = { '2p': 'p', easy: 'e', medium: 'm', hard: 'h' };
  static CHAR_TO_MODE = { p: '2p', e: 'easy', m: 'medium', h: 'hard' };

  static encode(mode, humanSymbol, history) {
    if (!mode) return '';
    let s = Kombom.MODE_TO_CHAR[mode];
    if (mode !== '2p') s += humanSymbol === 'X' ? 'x' : 'o';
    for (const h of history) {
      const c = String.fromCharCode(97 + h.idx);
      s += h.kind === 'place' ? c : c.toUpperCase();
    }
    return s;
  }

  static decode(s) {
    if (!s) return null;
    if (!(s[0] in Kombom.CHAR_TO_MODE)) return null;
    const mode = Kombom.CHAR_TO_MODE[s[0]];
    let i = 1, human = null;
    if (mode !== '2p') {
      const hc = s[1];
      if (hc !== 'x' && hc !== 'o') return null;
      human = hc.toUpperCase();
      i = 2;
    }
    const moves = [];
    for (; i < s.length; i++) {
      const code = s.charCodeAt(i);
      if (code >= 97 && code <= 112)      moves.push({ kind: 'place',  idx: code - 97 });
      else if (code >= 65 && code <= 80)  moves.push({ kind: 'invert', idx: code - 65 });
      else return null;
    }
    return { mode, human, moves };
  }

  // ---- Instance: live game state ----

  constructor() {
    this.reset();
  }

  reset() {
    this.board = new Array(16).fill(null);
    this.currentPlayer = 'X';
    this.moveNum = 1;
    this.needsPlace = true;
    this.needsInvert = false;
    this.gameOver = false;
    this.history = [];
  }

  applyHalfMove(action, player) {
    this.board[action.idx] = player;
    if (action.kind === 'place') this.needsPlace = false;
    else this.needsInvert = false;
    this.history.push({ idx: action.idx, kind: action.kind, player });
  }

  // Single-step undo of the most recent half-move.
  undoOneHalfMove() {
    if (this.history.length === 0) return;
    const last = this.history.pop();
    if (last.kind === 'place') this.board[last.idx] = null;
    else this.board[last.idx] = Kombom.opponent(last.player);
    this.gameOver = false;

    const n = this.history.length;
    if (n === 0) {
      this.moveNum = 1;
      this.currentPlayer = 'X';
      this.needsPlace = true;
      this.needsInvert = false;
      return;
    }
    const k = n - 1;
    if (k % 2 === 0) {
      this.moveNum = 2 + k / 2;
      this.currentPlayer = (this.moveNum % 2 === 1) ? 'X' : 'O';
      if (this.moveNum === Kombom.TOTAL_MOVES) {
        this.needsPlace = false; this.needsInvert = true;
      } else {
        this.needsPlace = true; this.needsInvert = true;
      }
    } else {
      this.moveNum = 1 + (k + 1) / 2;
      this.currentPlayer = (this.moveNum % 2 === 1) ? 'X' : 'O';
      const lastEntry = this.history[this.history.length - 1];
      this.needsPlace = lastEntry.kind !== 'place';
      this.needsInvert = lastEntry.kind !== 'invert';
    }
  }

  // True iff we're at the very start of someone's turn (no half-moves yet
  // applied this turn). Used by `undo` to know when to stop rewinding.
  isFreshMoveStart() {
    if (this.moveNum === 1) return this.needsPlace && !this.needsInvert;
    if (this.moveNum === Kombom.TOTAL_MOVES) return !this.needsPlace && this.needsInvert;
    return this.needsPlace && this.needsInvert;
  }

  // Resolve game state after a half-move:
  //   'win'      — the just-moved player completed a 4-in-a-row.
  //   'tie'      — move 17 ended without a 4-in-a-row.
  //   'continue' — game advances; if both halves of the turn are done, the
  //                turn rolls over to the opponent and `currentPlayer`,
  //                `moveNum`, `needsPlace`, `needsInvert` are updated.
  resolveAction() {
    if (Kombom.checkWin(this.currentPlayer, this.board)) {
      this.gameOver = true;
      return 'win';
    }
    if (!this.needsPlace && !this.needsInvert) {
      if (this.moveNum === Kombom.TOTAL_MOVES) {
        this.gameOver = true;
        return 'tie';
      }
      this.moveNum++;
      this.currentPlayer = Kombom.opponent(this.currentPlayer);
      if (this.moveNum === Kombom.TOTAL_MOVES) {
        this.needsPlace = false;
        this.needsInvert = true;
      } else {
        this.needsPlace = true;
        this.needsInvert = true;
      }
    }
    return 'continue';
  }
}

if (typeof module !== 'undefined') module.exports = { Kombom };
