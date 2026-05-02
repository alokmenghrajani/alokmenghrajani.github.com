'use strict';

// UI / wiring layer. Game state and rules live in `Kombom` (kombom.js); AI
// strategies live in `AI` and subclasses (ai.js). Everything here is
// presentation, persistence, and orchestration.
(() => {
  const cellEls = [];
  const game = new Kombom();
  let gameMode = null;       // null | '2p' | 'easy' | 'medium' | 'hard'
  let humanSymbol = null;
  let computerSymbol = null;
  let ai = null;             // AI subclass instance for the current mode
  // Shared HardAI used by the eval display in debug mode (not necessarily the
  // active `ai`). Holds a per-instance scratch board; the perfect-play memo
  // it builds is shared statically with any HardAI used for play.
  const evalAI = new HardAI('X');

  let aiToken = 0;     // bumped to cancel in-flight AI turn timers
  let aiRunning = false;
  let animToken = 0;   // bumped to cancel in-flight winning-line animation
  let memoBuildMs = null;     // shown briefly in the eval display
  let replayInProgress = false;

  // Eval display is debug-only: enabled by appending `?debug` to the URL.
  const DEBUG = new URLSearchParams(location.search).has('debug');

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  function makeAI(mode, sym) {
    if (!mode || mode === '2p') return null;
    if (mode === 'easy')   return new EasyAI(sym);
    if (mode === 'medium') return new MediumAI(sym);
    if (mode === 'hard')   return new HardAI(sym);
    return null;
  }

  const grid = document.getElementById('grid');
  const statusEl = document.getElementById('status');
  const statusLine1 = statusEl.querySelector('.line-1');
  const statusLine2 = statusEl.querySelector('.line-2');
  const evalEl = document.getElementById('eval-display');
  const modeSelectorEl = document.getElementById('mode-selector');
  const modal = document.getElementById('modal');

  // Pre-render every status variant; rendering = toggle the `active` class.
  function setStatusMsg(line, key) {
    const lineEl = line === 1 ? statusLine1 : statusLine2;
    const msgs = lineEl.children;
    for (let i = 0; i < msgs.length; i++) {
      const el = msgs[i];
      if (el.dataset.msg === key) el.classList.add('active');
      else el.classList.remove('active');
    }
  }

  function buildGrid() {
    grid.innerHTML = '';
    cellEls.length = 0;
    for (let i = 0; i < Kombom.N; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.addEventListener('click', () => onCellClick(i));
      grid.appendChild(cell);
      cellEls.push(cell);
    }
  }

  function newGame(preferredHuman) {
    aiToken++;
    animToken++; // cancel any in-flight winning-line animation
    aiRunning = false;
    game.reset();

    if (!gameMode || gameMode === '2p') {
      humanSymbol = null;
      computerSymbol = null;
    } else if (preferredHuman === 'X' || preferredHuman === 'O') {
      humanSymbol = preferredHuman;
      computerSymbol = preferredHuman === 'X' ? 'O' : 'X';
    } else if (Math.random() < 0.5) {
      humanSymbol = 'X'; computerSymbol = 'O';
    } else {
      humanSymbol = 'O'; computerSymbol = 'X';
    }
    ai = makeAI(gameMode, computerSymbol);

    render();
    updateHash();
    if (!replayInProgress && isComputerTurn()) runComputerTurn();
  }

  // ---- URL fragment serialization (sharing / refresh persistence) ----
  // The encoding lives in Kombom.encode / Kombom.decode. We persist via
  // history.replaceState (NOT pushState) so per-move updates don't pile up
  // in the browser's back-button history.
  function updateHash() {
    if (replayInProgress) return;
    const s = Kombom.encode(gameMode, humanSymbol, game.history);
    const want = s ? '#' + s : '';
    if (location.hash === want) return;
    const url = s ? want : location.pathname + location.search;
    // window.history (not the local `history` field on the game).
    try { window.history.replaceState(null, '', url); } catch (_) { /* file:// etc. */ }
  }

  function loadFromHash() {
    const hash = location.hash.slice(1);
    if (!hash) return false;
    const state = Kombom.decode(hash);
    if (!state) return false;

    gameMode = state.mode;
    replayInProgress = true;
    try {
      newGame(state.human);
      for (const m of state.moves) {
        if (game.gameOver) break;
        applyHalfMoveAndSync({ kind: m.kind, idx: m.idx }, game.currentPlayer);
        afterAction();
      }
    } finally {
      replayInProgress = false;
    }

    updateHash();
    if (!game.gameOver && isComputerTurn()) runComputerTurn();
    return true;
  }

  function isComputerTurn() {
    return ai !== null && !game.gameOver && game.currentPlayer === computerSymbol;
  }

  function onCellClick(idx) {
    if (game.gameOver || !gameMode || isComputerTurn()) return;
    const v = game.board[idx];
    if (v === null && game.needsPlace) {
      applyHalfMoveAndSync({ kind: 'place', idx }, game.currentPlayer);
      afterAction();
    } else if (v === Kombom.opponent(game.currentPlayer) && game.needsInvert) {
      applyHalfMoveAndSync({ kind: 'invert', idx }, game.currentPlayer);
      afterAction();
    }
  }

  function applyHalfMoveAndSync(action, player) {
    game.applyHalfMove(action, player);
    updateHash();
  }

  function undo() {
    aiToken++;
    animToken++;
    aiRunning = false;

    if (gameMode === '2p') {
      if (game.history.length === 0) return;
      game.undoOneHalfMove();
      render();
      updateHash();
      return;
    }

    if (game.history.length === 0) return;

    // Rewind until the human is about to start a fresh move, or history empties.
    while (game.history.length > 0) {
      game.undoOneHalfMove();
      if (game.currentPlayer === humanSymbol && game.isFreshMoveStart()) break;
    }

    render();
    updateHash();

    // If we ended up at a state where the computer moves next (e.g. computer
    // started the game and we rolled all the way back), let it play again.
    if (isComputerTurn()) runComputerTurn();
  }

  function afterAction() {
    const result = game.resolveAction();
    if (result === 'win') {
      const winner = game.currentPlayer;
      let bannerKey;
      if (gameMode === '2p') bannerKey = winner === 'X' ? 'win-x' : 'win-o';
      else bannerKey = winner === humanSymbol ? 'you-win' : 'you-lose';
      render(bannerKey);
      const line = Kombom.findWinLine(winner, game.board);
      if (line) animateWinningLine(line);
      return;
    }
    if (result === 'tie') {
      render('tie');
      return;
    }
    render();
    if (!replayInProgress && !aiRunning && isComputerTurn()) runComputerTurn();
  }

  function animateWinningLine(line) {
    animToken++;
    const myToken = animToken;
    const blinkMs = 280;
    const cycles = 3;
    const sequence = [];
    for (let c = 0; c < cycles; c++) for (const idx of line) sequence.push(idx);

    let i = 0;
    function tick() {
      if (myToken !== animToken || i >= sequence.length) return;
      const el = cellEls[sequence[i++]];
      if (!el) return;
      // Restart the CSS animation by toggling the class with a forced reflow.
      el.classList.remove('win-blink');
      void el.offsetWidth;
      el.classList.add('win-blink');
      setTimeout(() => {
        if (myToken !== animToken) return;
        el.classList.remove('win-blink');
        tick();
      }, blinkMs);
    }
    tick();
  }

  function render(bannerKey) {
    const compTurn = isComputerTurn();
    cellEls.forEach((el, i) => {
      el.classList.remove('x', 'o', 'valid-place', 'valid-invert', 'win-blink');
      const v = game.board[i];
      if (v === 'X') el.classList.add('x');
      else if (v === 'O') el.classList.add('o');

      if (!game.gameOver && !compTurn) {
        if (v === null && game.needsPlace) el.classList.add('valid-place');
        else if (v === Kombom.opponent(game.currentPlayer) && game.needsInvert) el.classList.add('valid-invert');
      }
    });

    const empty = !bannerKey && !gameMode;
    statusEl.classList.toggle('empty', empty);

    if (bannerKey) {
      setStatusMsg(1, bannerKey);
      setStatusMsg(2, 'action-empty');
    } else if (empty) {
      // No mode picked yet — hide the status entirely (visibility: hidden so
      // the surrounding layout doesn't shift when it reappears).
      setStatusMsg(1, null);
      setStatusMsg(2, null);
    } else {
      const cur = game.currentPlayer;
      let turnKey;
      if (gameMode === '2p') {
        turnKey = cur === 'X' ? 'turn-2p-x' : 'turn-2p-o';
      } else if (compTurn) {
        turnKey = cur === 'X' ? 'thinking-x' : 'thinking-o';
      } else {
        turnKey = cur === 'X' ? 'turn-you-x' : 'turn-you-o';
      }
      setStatusMsg(1, turnKey);

      let actionKey;
      if (compTurn) actionKey = 'action-empty';
      else if (game.needsPlace && game.needsInvert) actionKey = 'action-both';
      else if (game.needsPlace) actionKey = 'action-place';
      else if (game.needsInvert) actionKey = 'action-invert';
      else actionKey = 'action-empty';
      setStatusMsg(2, actionKey);
    }

    updateModeVisibility();
    renderEval();
  }

  // Mode picker overlay is shown until the player has chosen a mode.
  // Picking is mandatory: gameplay is gated on `gameMode` being non-null
  // (see onCellClick) and on `ai` being non-null for AI turns.
  function updateModeVisibility() {
    modeSelectorEl.classList.toggle('hidden', !!gameMode);
  }

  function renderEval() {
    if (!DEBUG) {
      evalEl.className = 'eval empty';
      return;
    }
    if (game.gameOver) {
      evalEl.textContent = '';
      evalEl.className = 'eval empty';
      return;
    }
    if (!HardAI.isReady) {
      const pct = Math.round(HardAI.buildProgress * 100);
      evalEl.textContent = `Computing perfect-play table… ${pct}%`;
      evalEl.className = 'eval calc';
      return;
    }
    if (memoBuildMs !== null) {
      if (game.history.length === 0) {
        evalEl.textContent = `Table built in ${memoBuildMs} ms`;
        evalEl.className = 'eval calc';
        return;
      }
      memoBuildMs = null; // game has started — clear the build-time message permanently
    }
    // Don't preview the empty-board verdict before any move is played
    // (covers fresh games and rewinds back to history.length === 0).
    if (game.history.length === 0) {
      evalEl.textContent = '';
      evalEl.className = 'eval empty';
      return;
    }
    const e = evalAI.evaluatePosition(game);
    if (!e) {
      evalEl.textContent = '';
      evalEl.className = 'eval empty';
      return;
    }
    const plural = (n) => n === 1 ? 'move' : 'moves';
    if (e.value === 0) {
      evalEl.textContent = `Drawn (${e.distance} ${plural(e.distance)} remain)`;
      evalEl.className = 'eval draw';
      return;
    }
    const winner = e.value === 1 ? e.player : Kombom.opponent(e.player);
    const disc = `<span class="token-inline ${winner.toLowerCase()}"></span>`;
    evalEl.innerHTML = `${disc} wins in ${e.distance} ${plural(e.distance)}`;
    evalEl.className = `eval ${winner.toLowerCase()}`;
  }

  // ---- Computer turn driver ----

  async function runComputerTurn() {
    if (aiRunning || !ai) return;
    aiRunning = true;
    const myToken = aiToken;

    try {
      // Yield so the "thinking" UI paints before we compute.
      await sleep(80);
      if (myToken !== aiToken) return;

      const move = ai.chooseMove(game);
      if (myToken !== aiToken || !move) return;

      for (let i = 0; i < move.actions.length; i++) {
        // Visual delay between half-moves so the player can follow.
        await sleep(i === 0 ? 350 : 600);
        if (myToken !== aiToken) return;

        applyHalfMoveAndSync(move.actions[i], game.currentPlayer);
        afterAction();
        if (game.gameOver || myToken !== aiToken) return;
      }
    } finally {
      if (myToken === aiToken) aiRunning = false;
    }
  }

  // ---- Wiring ----

  document.getElementById('btn-instructions').addEventListener('click', () => modal.classList.add('show'));
  document.getElementById('btn-close-modal').addEventListener('click', () => modal.classList.remove('show'));
  modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('show'); });
  document.getElementById('btn-new-game').addEventListener('click', () => {
    // Re-open the mode picker — the player must choose again before playing.
    gameMode = null;
    newGame();
  });
  document.getElementById('btn-undo').addEventListener('click', undo);

  document.querySelectorAll('.mode-selector button[data-mode]').forEach(btn => {
    btn.addEventListener('click', () => {
      gameMode = btn.dataset.mode;
      newGame();
    });
  });

  // External fragment edits (paste a new URL, edit the address bar, browser
  // back/forward) reload the game from the new state. Our own writes go
  // through history.replaceState, which doesn't fire hashchange.
  window.addEventListener('hashchange', () => {
    if (!loadFromHash()) {
      gameMode = null;
      newGame();
    }
  });

  buildGrid();
  if (!loadFromHash()) newGame();

  // In debug mode, build the perfect-play table incrementally so the eval
  // display can come online without freezing the UI. Each rAF tick gets a
  // ~12 ms slice; `buildMemoChunk` returns whether the build finished. The
  // memo is built lazily (sync) for hard-mode AI moves outside debug — see
  // HardAI.ensureMemo — and skipped entirely for easier modes.
  if (DEBUG) {
    const FRAME_BUDGET_MS = 12;
    const tick = () => {
      const result = evalAI.buildMemoChunk(performance.now() + FRAME_BUDGET_MS);
      if (result.done) {
        memoBuildMs = HardAI.buildMs;
        render();
      } else {
        render();
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);
  }
})();
