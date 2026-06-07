/* Nadi. Board setup (requirement01).
 *
 * Cards live as labelled groups inside the inlined asset spritesheet
 * (assets_plain.svg). Each card is rendered into its own <svg> via <use>,
 * cropped to that card with a per-card viewBox computed from the artwork.
 */

const SVGNS = "http://www.w3.org/2000/svg";

/* card name -> group id in the spritesheet (from the inkscape labels) */
const CARD_IDS = {
  riverbed_a: "g24",
  riverbed_b: "g23",
  riverbed_c: "g22",
  riverbed_d: "g21",
  riverbed_e: "g20",
  rivercard_1: "g2",
  rivercard_2: "g1-9",
  rivercard_3: "g1-5",
  rivercard_back: "g3",
  actioncard_back: "g4",
  action_predict1: "g5",
  action_predict2: "g6",
  action_predict3: "g7",
  action_discard: "g8",
  action_flow: "g9",
};

/* The cards sit under layer2, which carries this translate. We reproduce it
 * around every <use> so that userSpaceOnUse clip-paths line up exactly as in
 * the original sheet. */
const LAYER2_TRANSFORM = "translate(-729.24839,-275.74126)";

let sheetSvg = null;
const viewBoxCache = {};

function el(name, cls) {
  const e = document.createElementNS(SVGNS, name);
  if (cls) e.setAttribute("class", cls);
  return e;
}

/* Bounding box of a sheet element expressed in the sheet's root user space.
 * Uses screen CTMs so we don't depend on the subtle getBBox/transform pairing. */
function rootBBox(node) {
  const b = node.getBBox();
  const toRoot = sheetSvg.getScreenCTM().inverse().multiply(node.getScreenCTM());
  const corners = [
    [b.x, b.y],
    [b.x + b.width, b.y],
    [b.x, b.y + b.height],
    [b.x + b.width, b.y + b.height],
  ].map(([x, y]) => {
    const p = sheetSvg.createSVGPoint();
    p.x = x;
    p.y = y;
    return p.matrixTransform(toRoot);
  });
  const xs = corners.map((p) => p.x);
  const ys = corners.map((p) => p.y);
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  return { x: minX, y: minY, w: Math.max(...xs) - minX, h: Math.max(...ys) - minY };
}

/* Root-space frame of a card.
 * Every card carries a "Safe Zone" path marking its rounded-rect boundary.
 * We frame to that, not the whole group: a group's decorations (e.g. riverbed
 * pebbles) overflow the card and are only hidden by a clip-path, which getBBox
 * ignores, so measuring the group would shrink the card to a speck. */
function frameOf(group) {
  const outline = group.querySelector('[data-name="Safe Zone"]');
  return rootBBox(outline || group);
}

/* Compute (and cache) the viewBox string that crops to a single card. */
function viewBoxFor(cardName) {
  if (viewBoxCache[cardName]) return viewBoxCache[cardName];
  const group = sheetSvg.querySelector("#" + CSS.escape(CARD_IDS[cardName]));
  const bb = frameOf(group);
  const pad = Math.max(bb.w, bb.h) * 0.02; // small margin so strokes aren't clipped
  const vb = `${bb.x - pad} ${bb.y - pad} ${bb.w + 2 * pad} ${bb.h + 2 * pad}`;
  viewBoxCache[cardName] = vb;
  return vb;
}

/* Build a standalone <svg> showing one card. */
function card(cardName, cls) {
  const svg = el("svg", "card" + (cls ? " " + cls : ""));
  svg.setAttribute("viewBox", viewBoxFor(cardName));
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
  svg.dataset.card = cardName;
  const g = el("g");
  g.setAttribute("transform", LAYER2_TRANSFORM);
  const use = el("use");
  use.setAttribute("href", "#" + CARD_IDS[cardName]);
  g.appendChild(use);
  svg.appendChild(g);
  return svg;
}

function emptySlot(extraCls) {
  const d = document.createElement("div");
  d.className = "slot empty" + (extraCls ? " " + extraCls : "");
  return d;
}

/* ===========================================================================
 * Nadi. Pass-and-play game (requirement02).
 * ======================================================================== */

const RIVERBEDS = ["riverbed_a", "riverbed_b", "riverbed_c", "riverbed_d", "riverbed_e"];

/* Composition of the draw deck (requirement02). */
const DECK_COMPOSITION = {
  rivercard_1: 7,
  rivercard_2: 6,
  rivercard_3: 5,
  action_predict1: 3,
  action_predict2: 3,
  action_predict3: 3,
  action_flow: 6,
  action_discard: 3,
};

const MAX_HAND = 5;
const MAX_STACK = 3;

/* --- card classification helpers --- */
const isRiver = (c) => c && c.startsWith("rivercard_");
const isPrediction = (c) => c && c.startsWith("action_predict");
const isFlow = (c) => c === "action_flow";
const isDiscard = (c) => c === "action_discard";
const backFor = (c) => (isRiver(c) ? "rivercard_back" : "actioncard_back");
const riverValue = (c) => parseInt(c.slice("rivercard_".length), 10);
const predValue = (c) => parseInt(c.slice("action_predict".length), 10);

/* Score one prediction against the top card of its slot (requirement02). */
function scorePrediction(predType, topCard) {
  const pv = predValue(predType); // 1, 2 or 3
  if (!topCard) return -1; // empty slot
  const tv = riverValue(topCard);
  if (tv === pv) return [2, 4, 6][pv - 1]; // exact match -> double points
  if (tv > pv) return 1; // top card higher -> partial credit
  return -1; // top card lower
}

/* ---------------------------------------------------------------------------
 * Tooltips. Shown on hover (desktop) and toggled on click or tap (touch).
 * ------------------------------------------------------------------------- */
const CARD_TIPS = {
  rivercard_1: "River card, pebble (1). Place it on a river slot.",
  rivercard_2: "River card, fish (2). Place it on a river slot.",
  rivercard_3: "River card, reeds (3). Place it on a river slot.",
  action_predict1:
    "Prediction, pebble (1). Tuck it face-down by a slot. It scores against the slot's top card at game end.",
  action_predict2:
    "Prediction, fish (2). Tuck it face-down by a slot. It scores against the slot's top card at game end.",
  action_predict3:
    "Prediction, reeds (3). Tuck it face-down by a slot. It scores against the slot's top card at game end.",
  action_discard:
    "Discard: discard a card from the river or one of your predictions.",
  action_flow:
    "Flow: every river stack shifts one slot toward E; E's stack is discarded.",
};

function describeCard(cardType) {
  if (cardType.startsWith("riverbed_"))
    return `River bed ${cardType.slice(-1).toUpperCase()}: the base of a river stack (never moves).`;
  return CARD_TIPS[cardType] || "";
}

let pinnedTip = null;

function tooltipEl() {
  let t = document.getElementById("tooltip");
  if (!t) {
    t = document.createElement("div");
    t.id = "tooltip";
    document.body.appendChild(t);
  }
  return t;
}

function showTooltipFor(node, text) {
  const t = tooltipEl();
  t.textContent = text;
  t.style.display = "block";
  const r = node.getBoundingClientRect();
  const tr = t.getBoundingClientRect();
  let left = r.left + r.width / 2 - tr.width / 2;
  let top = r.top - tr.height - 8;
  if (top < 4) top = r.bottom + 8; // flip below if no room above
  left = Math.max(4, Math.min(left, window.innerWidth - tr.width - 4));
  t.style.left = left + "px";
  t.style.top = top + "px";
}

function hideTooltip() {
  const t = document.getElementById("tooltip");
  if (t) t.style.display = "none";
}

function clearTooltip() {
  pinnedTip = null;
  hideTooltip();
}

function attachTooltip(node, text) {
  if (!text) return;
  node.addEventListener("mouseenter", () => {
    if (!pinnedTip) showTooltipFor(node, text);
  });
  node.addEventListener("mouseleave", () => {
    if (!pinnedTip) hideTooltip();
  });
  node.addEventListener("click", () => {
    if (pinnedTip === node) {
      clearTooltip();
    } else {
      pinnedTip = node;
      showTooltipFor(node, text);
    }
  });
}

/* A card svg with a tooltip already attached. */
function tipCard(cardType, cls, text) {
  const c = card(cardType, cls);
  attachTooltip(c, text !== undefined ? text : describeCard(cardType));
  return c;
}

/* ---------------------------------------------------------------------------
 * Game state
 * ------------------------------------------------------------------------- */
function buildDeck() {
  const deck = [];
  for (const [type, n] of Object.entries(DECK_COMPOSITION)) {
    for (let i = 0; i < n; i++) deck.push(type);
  }
  // Fisher-Yates shuffle
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

/* The game is fully described by the shuffled deck (the seed) plus the ordered
 * list of moves. Everything else (hands, river, deck, discard, whose turn) is
 * derived by replaying the moves. So the URL hash (seed + moves) is the single
 * source of truth, and any move can be undone by dropping it from the list.
 *
 * G also holds the derived board plus transient UI fields:
 *   seed, moves           the source of truth
 *   deck, discard, river, players   the derived board
 *   view                  whose perspective we render (the player taking, or who
 *                         just took, this turn). The player *to move* is moves%2.
 *   phase, selected, over UI state */
let G = null;

const topOf = (slot) => (slot.stack.length ? slot.stack[slot.stack.length - 1] : null);
const cur = () => G.players[G.view];
const opp = () => G.players[1 - G.view];
const toMove = () => G.moves.length % 2; // player whose turn it is (yet to move)

function removeOne(hand, cardType) {
  const i = hand.indexOf(cardType);
  return i >= 0 ? hand.splice(i, 1)[0] : cardType;
}

/* Deal two cards to each player from the top (end) of the seed deck. */
function dealtState(seed) {
  const deck = seed.slice();
  const hands = [[], []];
  for (const p of [0, 1, 0, 1]) hands[p].push(deck.pop());
  return { deck, hands };
}

/* Replay the moves from the seed into a complete board state. */
function deriveState(seed, moves) {
  const { deck, hands } = dealtState(seed);
  const st = {
    deck,
    discard: [],
    river: RIVERBEDS.map((bed) => ({ bed, stack: [] })),
    players: [
      { hand: hands[0], predictions: [null, null, null, null, null] },
      { hand: hands[1], predictions: [null, null, null, null, null] },
    ],
  };
  moves.forEach((m, i) => applyMoveTo(st, i % 2, m));
  return st;
}

function applyMoveTo(st, player, m) {
  const P = st.players[player];
  switch (m.k) {
    case "draw":
      P.hand.push(st.deck.pop());
      break;
    case "placeRiver":
      removeOne(P.hand, m.card);
      st.river[m.slot].stack.push(m.card);
      break;
    case "placePrediction":
      removeOne(P.hand, m.card);
      P.predictions[m.slot] = m.card;
      break;
    case "discardRiver":
      st.discard.push(st.river[m.slot].stack.pop());
      st.discard.push(removeOne(P.hand, "action_discard"));
      break;
    case "discardPred":
      st.discard.push(P.predictions[m.slot]);
      P.predictions[m.slot] = null;
      st.discard.push(removeOne(P.hand, "action_discard"));
      break;
    case "flow":
      st.discard.push(...st.river[4].stack);
      for (let i = 4; i > 0; i--) st.river[i].stack = st.river[i - 1].stack;
      st.river[0].stack = [];
      st.discard.push(removeOne(P.hand, "action_flow"));
      break;
  }
}

/* Copy a derived board into G (leaving seed/moves/UI fields alone). */
function setBoard(st) {
  G.deck = st.deck;
  G.discard = st.discard;
  G.river = st.river;
  G.players = st.players;
}

/* Recompute the live board from G.seed + G.moves. */
function rebuild() {
  setBoard(deriveState(G.seed, G.moves));
}

/* Append a move, recompute the board, and write the new state to the URL. */
function applyMove(m) {
  G.moves.push(m);
  rebuild();
  updateHash();
}

/* End conditions. The board ends the game (deck empty or every stack full);
 * gameIsOver also covers the rare "current player cannot move" case. */
function boardEnded() {
  return G.deck.length === 0 || G.river.every((s) => s.stack.length >= MAX_STACK);
}
function gameIsOver() {
  return boardEnded() || !anyMovePossible();
}

/* ---------------------------------------------------------------------------
 * Rendering. Always from the current player's perspective.
 * ------------------------------------------------------------------------- */
function render() {
  clearTooltip(); // avoid stale tooltips after the DOM is rebuilt
  renderOppHand(document.querySelector(".z-A"));
  // at game end all predictions flip face up
  renderPredictions(document.querySelector(".z-E"), opp().predictions, G.over);
  renderRiver(document.querySelector(".z-G"));
  renderDeckAndDiscard(document.querySelector(".z-H"));
  renderPredictions(document.querySelector(".z-I"), cur().predictions, true);
  renderHand(document.querySelector(".z-M"));
  updateStatus();
}

function renderOppHand(zone) {
  // Opponent's cards are face down; the back colour reflects card colour
  // (blue/green), which is public in the physical game, but not the value.
  zone.replaceChildren();
  opp().hand.forEach((c) =>
    zone.appendChild(tipCard(backFor(c), null, "Opponent's card in hand."))
  );
}

function renderHand(zone) {
  zone.replaceChildren();
  cur().hand.forEach((c, i) => {
    const el = tipCard(c, "in-hand");
    if (G.phase !== "_locked") {
      el.classList.add("clickable");
      if (G.selected === i && G.phase !== "choose") el.classList.add("selected");
      el.addEventListener("click", () => onHandClick(i));
      attachDrag(el, { kind: "hand", i }); // drag to play (touch + mouse)
    }
    zone.appendChild(el);
  });
}

function renderPredictions(zone, predictions, faceUp) {
  const placing = faceUp && G.phase === "place-prediction";
  zone.classList.toggle("selecting", placing);
  zone.replaceChildren();
  predictions.forEach((p, i) => {
    if (!p) {
      const s = emptySlot("pred-empty");
      s.dataset.predSlot = i;
      if (placing) {
        s.dataset.drop = "pred";
        s.dataset.slot = i;
        s.addEventListener("click", () => {
          if (recentlyDragged()) return;
          placePrediction(i);
        });
      }
      zone.appendChild(s);
    } else if (faceUp) {
      // current player's predictions are face up
      const c = tipCard(p, null);
      if (G.over) {
        // at game end, badge each prediction with the points it scored
        const cell = document.createElement("div");
        cell.className = "pred-cell";
        cell.appendChild(c);
        const pts = scorePrediction(p, topOf(G.river[i]));
        const badge = document.createElement("div");
        badge.className = "score-badge " + (pts >= 0 ? "pos" : "neg");
        badge.textContent = (pts >= 0 ? "+" : "") + pts;
        cell.appendChild(badge);
        zone.appendChild(cell);
      } else {
        if (G.phase === "discard") {
          c.classList.add("clickable", "targetable");
          c.dataset.drop = "discardPred";
          c.dataset.slot = i;
          c.addEventListener("click", () => {
            if (recentlyDragged()) return;
            discardPrediction(i);
          });
        }
        zone.appendChild(c);
      }
    } else {
      // opponent's predictions stay face down
      zone.appendChild(
        tipCard(
          "actioncard_back",
          null,
          "Opponent's prediction (value hidden until game end)."
        )
      );
    }
  });
}

function renderRiver(zone) {
  zone.replaceChildren();
  G.river.forEach((slot, i) => {
    const stack = document.createElement("div");
    stack.className = "stack";

    const bed = tipCard(slot.bed, "bed");
    bed.style.bottom = "0";
    stack.appendChild(bed);

    slot.stack.forEach((rc, j) => {
      const c = tipCard(rc);
      c.style.bottom = `calc(var(--ch) * ${0.22 * (j + 1)})`;
      // top card of a non-empty stack can be discarded with action_discard
      if (G.phase === "discard" && j === slot.stack.length - 1) {
        c.classList.add("clickable", "targetable");
        c.dataset.drop = "discardRiver";
        c.dataset.slot = i;
        c.addEventListener("click", () => {
          if (recentlyDragged()) return;
          discardRiverTop(i);
        });
      }
      stack.appendChild(c);
    });

    if (slot.stack.length >= MAX_STACK) {
      const full = document.createElement("div");
      full.className = "full-label";
      full.textContent = "FULL";
      stack.appendChild(full);
    }

    // placing a river card: empty-or-not, any non-full stack is a target
    if (G.phase === "place-river" && slot.stack.length < MAX_STACK) {
      stack.classList.add("clickable", "targetable");
      stack.dataset.drop = "river";
      stack.dataset.slot = i;
      stack.addEventListener("click", () => {
        if (recentlyDragged()) return;
        placeRiverCard(i);
      });
    }

    // dragging a flow card: drop it on the river to flow it
    if (G.phase === "place-flow") {
      stack.classList.add("targetable");
      stack.dataset.drop = "flow";
    }

    zone.appendChild(stack);
  });
}

function renderDeckAndDiscard(zone) {
  zone.replaceChildren();

  const deck = document.createElement("div");
  deck.className = "deck";
  const remaining = G.deck.length;
  const STACK = Math.min(4, Math.max(1, remaining));
  const STEP = 0.5;
  const splay = (STACK - 1) * STEP;
  deck.style.width = `calc(var(--cw) + ${splay}vh)`;
  deck.style.height = `calc(var(--ch) + ${splay}vh)`;

  if (remaining > 0) {
    for (let i = 0; i < STACK; i++) {
      const off = (STACK - 1 - i) * STEP;
      if (i === STACK - 1) {
        // top card: show the actual card back, which reveals only the colour
        const top = card(backFor(G.deck[remaining - 1]), "deck-top");
        top.style.right = `${off}vh`;
        top.style.top = `${off}vh`;
        deck.appendChild(top);
      } else {
        // cards beneath hide their colour
        const c = document.createElement("div");
        c.className = "card-rect hidden-card";
        c.style.right = `${off}vh`;
        c.style.top = `${off}vh`;
        deck.appendChild(c);
      }
    }
    if (canDraw()) {
      deck.classList.add("clickable", "targetable");
      deck.addEventListener("click", () => {
        if (recentlyDragged()) return;
        drawFromDeck();
      });
      attachDrag(deck, { kind: "deck" }); // drag a card to your hand to draw
    }
    attachTooltip(
      deck,
      "Draw deck. The colour of the next card is shown. Draw if you hold 4 or fewer cards."
    );
  } else {
    const c = document.createElement("div");
    c.className = "card-rect empty-deck";
    deck.appendChild(c);
  }

  const dl = document.createElement("div");
  dl.className = "pile-label";
  dl.innerHTML = 'Draw deck<span class="count">' + remaining + " cards</span>";
  deck.appendChild(dl);
  zone.appendChild(deck);

  // discard pile: show the top discarded card face up (discards are public)
  const pile = document.createElement("div");
  pile.className = "pile discard-pile";
  if (G.phase === "place-flow") {
    pile.classList.add("targetable");
    pile.dataset.drop = "flow"; // dropping a flow card here flows the river
  }
  if (G.discard.length) {
    pile.appendChild(
      tipCard(
        G.discard[G.discard.length - 1],
        "discard-top",
        "Discard pile (top card)."
      )
    );
  } else {
    const empty = emptySlot("discard");
    attachTooltip(empty, "Discard pile (empty).");
    pile.appendChild(empty);
  }
  const pl = document.createElement("div");
  pl.className = "pile-label";
  pl.innerHTML =
    'Discard<span class="count">' + G.discard.length + " cards</span>";
  pile.appendChild(pl);
  zone.appendChild(pile);
}

/* ---------------------------------------------------------------------------
 * Status / instructions panel (in the sidebar)
 * ------------------------------------------------------------------------- */
const HINTS = {
  "place-river": "Choose a river slot to place your card on.",
  "place-prediction": "Choose a slot to tuck your prediction.",
  discard: "Choose a river top card or one of your predictions to discard.",
  "place-flow": "Drop the flow card on the river to flow it.",
};

/* The "choose" hint adapts to which actions are actually available. */
function chooseHint() {
  const canDrawNow = canDraw();
  const hasHand = cur().hand.length > 0;
  if (canDrawNow && hasHand)
    return "Tap the deck to draw a card, or tap a card in your hand to play it.";
  if (canDrawNow) return "Tap the deck to draw a card.";
  if (hasHand) return "Tap a card in your hand to play it.";
  return "No moves available.";
}

function updateStatus() {
  const turn = document.getElementById("turn-line");
  const hint = document.getElementById("hint-line");
  const cancel = document.getElementById("cancel-btn");
  const undo = document.getElementById("undo-btn");
  const go = document.getElementById("gameover");
  if (!turn) return;
  // Undo needs a move to undo. While the game is in progress it is also disabled
  // mid-animation, and (vs the computer) until the human has actually made a move
  // (the first human move is at index G.human). Once the game is over, undo stays
  // available so you can take the last move back.
  undo.disabled =
    G.moves.length === 0 ||
    (!G.over &&
      (G.phase === "_locked" || (G.vsComputer && G.moves.length <= G.human)));
  if (G.over) {
    turn.style.display = hint.style.display = cancel.style.display = "none";
    showGameOverPanel(go);
    return;
  }
  go.style.display = "none";
  turn.style.display = "";
  hint.style.display = "";
  if (G.vsComputer) {
    const thinking = G.phase === "_locked" && toMove() === G.aiPlayer;
    turn.textContent = thinking ? "Computer is thinking…" : "Your turn";
  } else {
    turn.textContent = `Player ${G.view + 1}, your turn`;
  }
  hint.textContent = G.phase === "choose" ? chooseHint() : HINTS[G.phase] || "";
  // the Cancel button only appears while choosing a target (not during animation)
  const choosing = ["place-river", "place-prediction", "discard", "place-flow"].includes(G.phase);
  cancel.style.display = choosing ? "inline-block" : "none";
}

/* Game-over scoreboard, shown in the sidebar so the board stays visible. */
function showGameOverPanel(go) {
  const [s1, s2] = computeScores();
  // Against the computer, label the seats by role (the computer is not always
  // Player 1); otherwise use the two player numbers.
  const label = (i) =>
    G.vsComputer ? (i === G.aiPlayer ? "Computer" : "You") : "Player " + (i + 1);
  let verdict;
  if (s1 === s2) verdict = "It's a tie!";
  else {
    const winner = s1 > s2 ? 0 : 1;
    verdict = G.vsComputer
      ? winner === G.human
        ? "You win!"
        : "Computer wins!"
      : `Player ${winner + 1} wins!`;
  }
  go.style.display = "block";
  go.innerHTML = `
    <div class="go-verdict">${verdict}</div>
    <table class="go-table">
      <tr${s1 >= s2 ? ' class="win"' : ""}><td>${label(0)}</td><td>${s1}</td></tr>
      <tr${s2 >= s1 ? ' class="win"' : ""}><td>${label(1)}</td><td>${s2}</td></tr>
    </table>
    <button id="again-btn" class="splash-btn">Play again</button>`;
  document.getElementById("again-btn").addEventListener("click", playAgain);
}

/* ---------------------------------------------------------------------------
 * Turn flow & actions
 * ------------------------------------------------------------------------- */
const canDraw = () => G.deck.length > 0 && cur().hand.length <= MAX_HAND - 1;

/* When a play is triggered by a drag-drop, the played card's fly animation
 * should start from where the player released it (set by the drag system). */
let dragSrcRect = null;
function takeDragSrc() {
  const r = dragSrcRect;
  dragSrcRect = null;
  return r;
}

/* Show the given player's turn. The board is already derived; this sets the
 * perspective and lets them act (the game-over scoreboard appears by itself, via
 * render/updateStatus, if the board has ended or the player cannot move). */
function enterTurn(player) {
  G.view = player;
  G.holder = player; // this player is now holding the device
  G.phase = "choose";
  G.selected = null;
  G.over = gameIsOver();
  render();
}

function anyMovePossible() {
  if (canDraw()) return true;
  return cur().hand.some((c) => {
    if (isRiver(c)) return G.river.some((s) => s.stack.length < MAX_STACK);
    if (isPrediction(c)) return cur().predictions.some((p) => p === null);
    if (isFlow(c)) return true;
    if (isDiscard(c))
      return (
        G.river.some((s) => s.stack.length > 0) ||
        cur().predictions.some((p) => p !== null)
      );
    return false;
  });
}

function onHandClick(i) {
  if (recentlyDragged()) return; // a drag just ended; ignore the trailing click
  if (G.phase !== "choose" && G.selected === i) {
    cancelSelection();
    return;
  }
  selectCard(i);
}

function selectCard(i) {
  const c = cur().hand[i];
  G.selected = i;
  if (isFlow(c)) {
    playFlow();
    return;
  }
  if (isRiver(c)) G.phase = "place-river";
  else if (isPrediction(c)) G.phase = "place-prediction";
  else if (isDiscard(c)) G.phase = "discard";
  render();
}

/* Enter the target-selection phase for a card without auto-playing (used by
 * drag: even a flow card waits for a drop instead of firing immediately). */
function enterPlayMode(i) {
  const c = cur().hand[i];
  G.selected = i;
  if (isRiver(c)) G.phase = "place-river";
  else if (isPrediction(c)) G.phase = "place-prediction";
  else if (isDiscard(c)) G.phase = "discard";
  else if (isFlow(c)) G.phase = "place-flow";
  render();
}

function cancelSelection() {
  G.phase = "choose";
  G.selected = null;
  render();
}

async function drawFromDeck() {
  if (!canDraw()) return;
  G.phase = "_locked";
  render(); // clear the draw highlight before animating
  const player = G.view;
  const zone = document.querySelector(".z-M");
  const oldRects = [...zone.children].map((e) => e.getBoundingClientRect());
  const from = deckTopRect();
  applyMove({ k: "draw" }); // deck popped, card added to this player's hand
  render();
  await flyNewHandCard(player, oldRects, from, cur().hand[cur().hand.length - 1]);
  concludeTurn();
}

function placeRiverCard(slotIndex) {
  if (G.river[slotIndex].stack.length >= MAX_STACK) return;
  const cardType = cur().hand[G.selected];
  playMove(cardType, riverDropRect(slotIndex), {
    k: "placeRiver",
    card: cardType,
    slot: slotIndex,
  });
}

function placePrediction(slotIndex) {
  if (cur().predictions[slotIndex] !== null) return;
  const cardType = cur().hand[G.selected];
  playMove(cardType, predSlotRect(slotIndex), {
    k: "placePrediction",
    card: cardType,
    slot: slotIndex,
  });
}

function discardRiverTop(slotIndex) {
  const slot = G.river[slotIndex];
  if (!slot.stack.length) return;
  const stackEl = document.querySelectorAll(".z-G .stack")[slotIndex];
  const cardEls = stackEl.querySelectorAll(".card:not(.bed)");
  const removedEl = cardEls[cardEls.length - 1];
  discardBoth(topOf(slot), removedEl, { k: "discardRiver", slot: slotIndex });
}

function discardPrediction(slotIndex) {
  const p = cur().predictions[slotIndex];
  if (!p) return;
  const removedEl = document.querySelectorAll(".z-I > *")[slotIndex];
  discardBoth(p, removedEl, { k: "discardPred", slot: slotIndex });
}

/* Discard action: the removed card and the played action_discard card both
 * fly to the discard pile at once, then the move is recorded. */
async function discardBoth(removedType, removedEl, move) {
  const handEl = document.querySelectorAll(".z-M .in-hand")[G.selected];
  const dest = discardRect();
  const r1 = removedEl.getBoundingClientRect();
  const r2 = takeDragSrc() || (handEl && handEl.getBoundingClientRect());
  G.phase = "_locked";
  removedEl.style.visibility = "hidden";
  if (handEl) handEl.style.visibility = "hidden";
  await Promise.all([
    flyCard(removedType, r1, dest),
    flyCard("action_discard", r2, dest),
  ]);
  applyMove(move);
  concludeTurn();
}

/* Play a flow card: first the flow card flies to the discard pile, then the
 * river flows one step at a time: E goes to discard, D to E, C to D, B to C, A to B, with each
 * stack sliding to its new slot. (PDF: move each stack one letter toward E.) */
async function playFlow() {
  const src = document.querySelectorAll(".z-M .in-hand")[G.selected];
  const srcRect = takeDragSrc() || (src && src.getBoundingClientRect());
  G.phase = "_locked";
  if (src) src.style.visibility = "hidden";
  removeOne(cur().hand, "action_flow"); // hide it from the hand during the flow
  await flyCard("action_flow", srcRect, discardRect());

  await moveStackAnimated(4, "discard");
  await moveStackAnimated(3, 4);
  await moveStackAnimated(2, 3);
  await moveStackAnimated(1, 2);
  await moveStackAnimated(0, 1);

  applyMove({ k: "flow" }); // canonical board, matching the animation
  concludeTurn();
}

/* Animate one stack sliding from river slot srcIndex to a destination
 * (another slot index, or "discard"), preserving its shape, then renders. */
async function moveStackAnimated(srcIndex, dest) {
  const slot = G.river[srcIndex];
  const cards = slot.stack;
  if (cards.length) {
    const stackEl = document.querySelectorAll(".z-G .stack")[srcIndex];
    const cardEls = [...stackEl.querySelectorAll(".card:not(.bed)")];
    const srcSlot = riverSlotRect(srcIndex);
    const toBase = dest === "discard" ? discardRect() : riverSlotRect(dest);
    const dx = toBase.left - srcSlot.left;
    const dy = toBase.top - srcSlot.top;
    cardEls.forEach((e) => (e.style.visibility = "hidden"));
    // Slide the "FULL" badge along with the cards. The badge lives inside the
    // board (z-index auto), so it can't paint above the body-level flying cards;
    // we fly a clone of it in a top layer instead, then drop it on render.
    const fullEl = stackEl.querySelector(".full-label");
    let fullClone = null;
    if (fullEl) {
      const fr = fullEl.getBoundingClientRect();
      fullEl.style.visibility = "hidden";
      fullClone = fullEl.cloneNode(true);
      fullClone.style.position = "fixed";
      fullClone.style.left = fr.left + "px";
      fullClone.style.top = fr.top + "px";
      fullClone.style.transform = "none";
      fullClone.style.zIndex = "65"; // above the flying cards (60)
      fullClone.style.transition = "transform 0.42s cubic-bezier(0.4, 0, 0.2, 1)";
      document.body.appendChild(fullClone);
      void fullClone.getBoundingClientRect();
      fullClone.style.transform = `translate(${dx}px, ${dy}px)`;
    }
    await Promise.all(
      cards.map((c, i) => {
        const r = cardEls[i].getBoundingClientRect();
        const to = { left: r.left + dx, top: r.top + dy, width: r.width, height: r.height };
        return flyCard(c, r, to);
      })
    );
    if (fullClone) fullClone.remove();
  }
  if (dest === "discard") {
    G.discard.push(...cards);
    slot.stack = [];
  } else {
    G.river[dest].stack = cards;
    slot.stack = [];
  }
  render();
}

/* Animate the played card from the player's hand to its destination, then
 * record the move and conclude the turn. */
async function playMove(cardType, destRect, move) {
  const src = document.querySelectorAll(".z-M .in-hand")[G.selected];
  const srcRect = takeDragSrc() || (src && src.getBoundingClientRect());
  G.phase = "_locked";
  if (src) src.style.visibility = "hidden"; // the card "lifts off" into the clone
  await flyCard(cardType, srcRect, destRect);
  applyMove(move);
  concludeTurn();
}

/* After a move: hand off to the next player (or end the game). The move is
 * already recorded in G.moves / the URL by applyMove. */
function concludeTurn() {
  G.selected = null;
  G.phase = "_locked";
  if (boardEnded()) {
    G.over = true;
    render(); // updateStatus shows the scoreboard
  } else if (G.vsComputer) {
    // no pass splash against the computer: it plays automatically on its turn
    if (toMove() === G.aiPlayer) runComputerTurn();
    else enterTurn(G.human);
  } else {
    render();
    showPassSplash(toMove());
  }
}

/* ---------------------------------------------------------------------------
 * Drag & drop (touch + mouse, via Pointer Events). Tapping still works; this
 * adds an alternative: press a card/the deck, drag it onto a highlighted
 * target, and release to play. Reuses the same action functions as clicking.
 * ------------------------------------------------------------------------- */
let drag = null; // active drag descriptor
let dragEndAt = 0;
const recentlyDragged = () => Date.now() - dragEndAt < 350;

function attachDrag(el, spec) {
  el.addEventListener("pointerdown", (e) => startDragWatch(e, el, spec));
}

function startDragWatch(e, el, spec) {
  if (e.pointerType === "mouse" && e.button !== 0) return;
  if (G.phase !== "choose" || G.over) return; // only from the start of a turn
  if (spec.kind === "deck" && !canDraw()) return;
  drag = { spec, el, x0: e.clientX, y0: e.clientY, started: false };
  window.addEventListener("pointermove", onDragMove);
  window.addEventListener("pointerup", onDragEnd);
  window.addEventListener("pointercancel", onDragEnd);
}

function onDragMove(e) {
  if (!drag) return;
  if (!drag.started) {
    if (Math.hypot(e.clientX - drag.x0, e.clientY - drag.y0) < 6) return;
    beginDrag();
  }
  drag.ghost.style.left = e.clientX - drag.gx + "px";
  drag.ghost.style.top = e.clientY - drag.gy + "px";
  highlightUnder(e);
}

function beginDrag() {
  drag.started = true;
  document.body.classList.add("dragging");
  const rect = drag.el.getBoundingClientRect();
  drag.gx = drag.x0 - rect.left;
  drag.gy = drag.y0 - rect.top;
  let cardType;
  if (drag.spec.kind === "hand") {
    cardType = cur().hand[drag.spec.i];
    enterPlayMode(drag.spec.i); // sets phase + renders highlighted targets
    drag.hideEl = document.querySelectorAll(".z-M .in-hand")[drag.spec.i];
    if (drag.hideEl) drag.hideEl.style.visibility = "hidden";
  } else {
    cardType = backFor(G.deck[G.deck.length - 1]); // a face-down deck card
    markDrawTarget(true);
  }
  const g = document.createElement("div");
  g.className = "drag-ghost";
  g.style.width = rect.width + "px";
  g.style.height = rect.height + "px";
  g.style.left = rect.left + "px";
  g.style.top = rect.top + "px";
  g.appendChild(card(cardType));
  document.body.appendChild(g);
  drag.ghost = g;
}

function dropTargetAt(e) {
  // the ghost is pointer-events:none, so elementFromPoint already ignores it
  const t = document.elementFromPoint(e.clientX, e.clientY);
  return t && t.closest("[data-drop]");
}

function highlightUnder(e) {
  const el = dropTargetAt(e);
  document
    .querySelectorAll(".drop-hover")
    .forEach((n) => n.classList.remove("drop-hover"));
  if (el) el.classList.add("drop-hover");
}

function onDragEnd(e) {
  window.removeEventListener("pointermove", onDragMove);
  window.removeEventListener("pointerup", onDragEnd);
  window.removeEventListener("pointercancel", onDragEnd);
  const d = drag;
  drag = null;
  if (!d || !d.started) return; // a tap, so let the click handler run
  dragEndAt = Date.now();
  document.body.classList.remove("dragging");

  const dropEl = dropTargetAt(e);
  const ghostRect = d.ghost.getBoundingClientRect();
  d.ghost.remove();
  document
    .querySelectorAll(".drop-hover")
    .forEach((n) => n.classList.remove("drop-hover"));

  let handled = false;
  const kind = dropEl && dropEl.dataset.drop;
  if (d.spec.kind === "deck") {
    markDrawTarget(false);
    if (kind === "draw") {
      drawFromDeck();
      handled = true;
    }
  } else if (dropEl) {
    const slot = +dropEl.dataset.slot;
    dragSrcRect = ghostRect; // the played card flies on from where you let go
    if (kind === "river") (placeRiverCard(slot), (handled = true));
    else if (kind === "pred") (placePrediction(slot), (handled = true));
    else if (kind === "discardRiver") (discardRiverTop(slot), (handled = true));
    else if (kind === "discardPred") (discardPrediction(slot), (handled = true));
    else if (kind === "flow") {
      playFlow();
      handled = true;
    }
    if (!handled) dragSrcRect = null;
  }

  if (!handled) {
    if (d.spec.kind === "deck") render();
    else cancelSelection(); // restores the hidden card
  }
}

function markDrawTarget(on) {
  const z = document.querySelector(".z-M");
  if (on) {
    z.dataset.drop = "draw";
    z.classList.add("draw-target");
  } else {
    delete z.dataset.drop;
    z.classList.remove("draw-target");
  }
}

/* ---------------------------------------------------------------------------
 * Game end & scoring
 * ------------------------------------------------------------------------- */
function computeScores() {
  return G.players.map((pl) =>
    pl.predictions.reduce((sum, pred, i) => {
      if (!pred) return sum;
      return sum + scorePrediction(pred, topOf(G.river[i]));
    }, 0)
  );
}

/* ---------------------------------------------------------------------------
 * Splash screens / overlays
 * ------------------------------------------------------------------------- */
function overlay(html) {
  let ov = document.getElementById("overlay");
  if (!ov) {
    ov = document.createElement("div");
    ov.id = "overlay";
    document.body.appendChild(ov);
  }
  ov.innerHTML = `<div class="splash">${html}</div>`;
  ov.style.display = "flex";
  return ov;
}

function hideOverlay() {
  const ov = document.getElementById("overlay");
  if (ov) ov.style.display = "none";
}

function showStartSplash() {
  overlay(`
    <h1 class="splash-title">Nadi</h1>
    <p class="splash-mode">a river prediction game</p>
    <button class="splash-btn" id="start-btn">2 players (pass &amp; play)</button>
    <button class="splash-btn" id="start-ai-btn">1 player (vs computer)</button>
  `);
  document.getElementById("start-btn").addEventListener("click", () => startGame(false));
  document.getElementById("start-ai-btn").addEventListener("click", () => startGame(true));
}

function showPassSplash(nextPlayer) {
  G.holder = 1 - nextPlayer; // the player who just moved still holds the device
  overlay(`
    <p class="splash-msg">Pass the device to</p>
    <h1 class="splash-title">Player ${nextPlayer + 1}</h1>
    <p class="splash-msg">Player ${2 - nextPlayer}, look away.</p>
    <button class="splash-btn" id="pass-btn">I'm Player ${nextPlayer + 1}, continue</button>
    <button class="splash-undo" id="pass-undo">Undo last move</button>
  `);
  document.getElementById("pass-btn").addEventListener("click", async () => {
    hideOverlay();
    await playReplay(nextPlayer); // show what the opponent just did
    enterTurn(nextPlayer);
  });
  document.getElementById("pass-undo").addEventListener("click", undoMove);
}

/* Undo the last move: drop it from the list, re-derive, and update the URL. If
 * the turn now belongs to the other player (e.g. you undo right after pressing
 * continue), show the pass splash so the device is handed back; otherwise the
 * same player keeps playing. The hash stays the single source of truth and this
 * never touches browser history. */
function undoMove() {
  if (!G.moves.length) return;
  if (G.vsComputer) {
    // step back to the human's previous decision (skip the computer's replies)
    G.moves.pop();
    while (G.moves.length && toMove() === G.aiPlayer) G.moves.pop();
    rebuild();
    updateHash();
    hideOverlay();
    if (toMove() === G.aiPlayer) runComputerTurn();
    else enterTurn(G.human);
    return;
  }
  const holder = G.holder;
  G.moves.pop();
  rebuild();
  updateHash();
  hideOverlay();
  const next = toMove();
  if (next === holder) {
    enterTurn(next);
  } else {
    G.view = next;
    G.phase = "_locked";
    render();
    showPassSplash(next);
  }
}

function playAgain() {
  history.replaceState(null, "", location.pathname + location.search);
  showStartSplash();
}

async function startGame(vsComputer) {
  hideOverlay();
  G = {
    seed: buildDeck(),
    moves: [],
    phase: "_locked",
    selected: null,
    view: 0,
    over: false,
    vsComputer: !!vsComputer,
    aiPlayer: -1,
    human: 0,
  };
  if (vsComputer) {
    // Coin flip for who goes first (player 0 moves first).
    G.aiPlayer = Math.random() < 0.5 ? 0 : 1;
    G.human = 1 - G.aiPlayer;
    G.view = G.human;
  }
  rebuild();
  updateHash();
  await animateDeal();
  if (G.vsComputer && toMove() === G.aiPlayer) runComputerTurn();
  else enterTurn(G.vsComputer ? G.human : 0);
}

/* ---------------------------------------------------------------------------
 * Deal & draw animations (deck -> hand)
 * ------------------------------------------------------------------------- */
function flyCard(cardName, from, to) {
  return new Promise((resolve) => {
    const fly = document.createElement("div");
    fly.className = "flying-card";
    fly.style.left = from.left + "px";
    fly.style.top = from.top + "px";
    fly.style.width = from.width + "px";
    fly.style.height = from.height + "px";
    fly.appendChild(card(cardName));
    document.body.appendChild(fly);
    // force reflow so the transition runs
    void fly.getBoundingClientRect();
    const dx = to.left + to.width / 2 - (from.left + from.width / 2);
    const dy = to.top + to.height / 2 - (from.top + from.height / 2);
    fly.style.transform = `translate(${dx}px, ${dy}px)`;
    const done = () => {
      fly.remove();
      resolve();
    };
    fly.addEventListener("transitionend", done, { once: true });
    setTimeout(done, 600);
  });
}

function deckRect() {
  return document.querySelector(".z-H .deck").getBoundingClientRect();
}
/* The actual top card of the deck (card-sized), so a card flying off the deck
 * fully covers it. Using the padded deck container would leak the next card's
 * colour through the flying card's transparent margins. */
function deckTopRect() {
  const t = document.querySelector(".z-H .deck .deck-top");
  return t ? t.getBoundingClientRect() : deckRect();
}
function discardRect() {
  return document.querySelector(".z-H .discard-pile").getBoundingClientRect();
}
function riverSlotRect(i) {
  return document.querySelectorAll(".z-G .stack")[i].getBoundingClientRect();
}
/* Exact spot where the next card placed on a river slot will rest, so it flies
 * straight to its final position instead of the stack's centre. */
function riverDropRect(slot) {
  const r = document.querySelectorAll(".z-G .stack")[slot].getBoundingClientRect();
  const ch = r.height / 1.5; // the stack box is 1.5x a card tall
  const j = G.river[slot].stack.length; // index the new card will occupy
  const offset = 0.22 * (j + 1) * ch; // matches renderRiver's stacking offset
  return { left: r.left, top: r.bottom - offset - ch, width: r.width, height: ch };
}
function predSlotRect(i) {
  return document.querySelectorAll(".z-I > *")[i].getBoundingClientRect();
}

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

/* Slide a hand's existing cards aside to open a gap while a new card flies in
 * from the deck (FLIP on the existing cards, then fly the newcomer). The new
 * card is assumed to already be the last child of the hand zone. */
async function flyNewHandCard(player, oldRects, from, flyType) {
  const zone = document.querySelector(player === G.view ? ".z-M" : ".z-A");
  const els = [...zone.children];
  for (let i = 0; i < oldRects.length; i++) {
    const el = els[i];
    const nr = el.getBoundingClientRect();
    el.style.transition = "none";
    el.style.transform = `translate(${oldRects[i].left - nr.left}px, ${oldRects[i].top - nr.top}px)`;
    void el.getBoundingClientRect();
    el.style.transition = "transform 0.42s cubic-bezier(0.4, 0, 0.2, 1)";
    el.style.transform = "";
  }
  const newEl = els[els.length - 1];
  if (!newEl) return;
  const dest = newEl.getBoundingClientRect();
  newEl.style.visibility = "hidden";
  await flyCard(flyType, from, dest);
  newEl.style.visibility = "";
}

/* Animate the setup deal (two cards to each player) into the current hands, from
 * G.view's perspective. Purely visual: the hands are restored afterwards (the
 * canonical hands come from the move list). */
async function animateDeal() {
  const top = G.seed.slice();
  const dealt = [0, 1, 0, 1].map((p) => ({ p, c: top.pop() }));
  const savedHands = G.players.map((pl) => pl.hand.slice());
  const savedDeck = G.deck;
  G.players[0].hand = [];
  G.players[1].hand = [];
  G.deck = G.seed.slice();
  G.phase = "_locked";
  render();
  await delay(150);
  for (const { p, c } of dealt) {
    const zone = document.querySelector(p === G.view ? ".z-M" : ".z-A");
    const oldRects = [...zone.children].map((e) => e.getBoundingClientRect());
    const from = deckTopRect();
    G.players[p].hand.push(c);
    G.deck.pop();
    render();
    await flyNewHandCard(p, oldRects, from, p === G.view ? c : backFor(c));
  }
  G.players[0].hand = savedHands[0];
  G.players[1].hand = savedHands[1];
  G.deck = savedDeck;
}

// FLIP helper: send the last card out of a hand zone, sliding the rest to close
// the gap; returns the rect the sent card occupied (for the flying clone).
function sendFromHand(actor) {
  const zone = document.querySelector(actor === G.view ? ".z-M" : ".z-A");
  const oldRects = [...zone.children].map((e) => e.getBoundingClientRect());
  const srcRect = oldRects[oldRects.length - 1];
  G.players[actor].hand.pop(); // visual only; the exact hand comes from the moves
  render();
  const els = [...zone.children];
  for (let i = 0; i < els.length; i++) {
    const nr = els[i].getBoundingClientRect();
    els[i].style.transition = "none";
    els[i].style.transform = `translate(${oldRects[i].left - nr.left}px, ${
      oldRects[i].top - nr.top
    }px)`;
    void els[i].getBoundingClientRect();
    els[i].style.transition = "transform 0.42s cubic-bezier(0.4, 0, 0.2, 1)";
    els[i].style.transform = "";
  }
  return srcRect;
}

const oppPredSlotRect = (i) =>
  document.querySelectorAll(".z-E > *")[i].getBoundingClientRect();
function riverTopCardRect(slot) {
  const cards = document
    .querySelectorAll(".z-G .stack")[slot]
    .querySelectorAll(".card:not(.bed)");
  return cards[cards.length - 1].getBoundingClientRect();
}

/* When a turn starts, replay the opponent's last move from this player's
 * perspective: rewind to the board before that move, animate it forward, and
 * (the first time Player 2 takes a turn) animate the setup deal first. */
async function playReplay(viewer) {
  G.view = viewer;
  G.over = false;
  const n = G.moves.length;
  if (n === 0) {
    rebuild();
    render();
    return;
  }
  const pre = deriveState(G.seed, G.moves.slice(0, n - 1));
  const post = deriveState(G.seed, G.moves);
  setBoard(pre);
  G.phase = "_locked";
  render();
  if (viewer === 1 && n === 1) await animateDeal(); // Player 2's first turn
  await delay(350);
  await animateMove(viewer, G.moves[n - 1]);
  setBoard(post);
  render();
}

/* Animate one move made by the opponent (1 - viewer). G's board is the pre-move
 * state; this mutates it for the animation, then the caller snaps to post. */
async function animateMove(viewer, move) {
  const actor = 1 - viewer;
  if (move.k === "draw") {
    const zone = document.querySelector(actor === G.view ? ".z-M" : ".z-A");
    const oldRects = [...zone.children].map((e) => e.getBoundingClientRect());
    const from = deckTopRect();
    const c = G.deck.pop(); // reveal the next card immediately
    G.players[actor].hand.push(c);
    render();
    await flyNewHandCard(actor, oldRects, from, actor === G.view ? c : backFor(c));
  } else if (move.k === "placeRiver") {
    const src = sendFromHand(actor);
    await flyCard(move.card, src, riverDropRect(move.slot)); // face up (public)
  } else if (move.k === "placePrediction") {
    const src = sendFromHand(actor);
    await flyCard("actioncard_back", src, oppPredSlotRect(move.slot)); // hidden
  } else if (move.k === "discardRiver" || move.k === "discardPred") {
    const removedFrom =
      move.k === "discardRiver" ? riverTopCardRect(move.slot) : oppPredSlotRect(move.slot);
    const removedType =
      move.k === "discardRiver"
        ? topOf(G.river[move.slot])
        : G.players[actor].predictions[move.slot];
    if (move.k === "discardRiver") G.river[move.slot].stack.pop();
    else G.players[actor].predictions[move.slot] = null;
    const src = sendFromHand(actor);
    await Promise.all([
      flyCard(removedType, removedFrom, discardRect()),
      flyCard("action_discard", src, discardRect()),
    ]);
  } else if (move.k === "flow") {
    const src = sendFromHand(actor);
    await flyCard("action_flow", src, discardRect());
    await moveStackAnimated(4, "discard");
    await moveStackAnimated(3, 4);
    await moveStackAnimated(2, 3);
    await moveStackAnimated(1, 2);
    await moveStackAnimated(0, 1);
  }
}

/* ---------------------------------------------------------------------------
 * Computer player (requirement04). It never looks at hidden information: only
 * its own hand and predictions, the river, the discard pile, the deck size, and
 * the fact that the human has tucked predictions on certain slots (a public
 * back). The human's prediction values and hand are never read.
 * ------------------------------------------------------------------------- */
async function runComputerTurn() {
  G.view = G.human;
  G.phase = "_locked";
  render();
  await delay(600); // a brief "thinking" pause
  const move = chooseAIMove();
  await animateMove(G.human, move); // the computer is the opponent (top of board)
  applyMove(move);
  rebuild();
  render();
  if (boardEnded()) {
    G.over = true;
    render();
    return;
  }
  enterTurn(G.human);
}

/* A shallow board clone for simulating a candidate move. */
function cloneState() {
  return {
    river: G.river.map((s) => ({ bed: s.bed, stack: s.stack.slice() })),
    players: G.players.map((p) => ({ hand: p.hand.slice(), predictions: p.predictions.slice() })),
    discard: G.discard.slice(),
    deck: G.deck.slice(),
  };
}

/* Estimated distribution over the value of a human prediction on a slot, using a
 * bluff model: as the game advances the human bluffs less (predicts what they
 * expect the top to be), and when they do bluff they lean toward predicting 1. */
function oppPredEV(st, slotIdx, movesMade) {
  const top = topOf(st.river[slotIdx]);
  const t = top ? riverValue(top) : 0;
  const progress = Math.min(1, movesMade / 22);
  const bluff = 0.5 * (1 - progress);
  const honest =
    t === 0 ? [0.5, 0.3, 0.2]
    : t === 1 ? [0.7, 0.2, 0.1]
    : t === 2 ? [0.15, 0.7, 0.15]
    : [0.1, 0.2, 0.7];
  const bluffD = [0.6, 0.3, 0.1]; // bluffs lean toward predicting 1
  let ev = 0;
  for (let v = 1; v <= 3; v++) {
    const p = (1 - bluff) * honest[v - 1] + bluff * bluffD[v - 1];
    ev += p * scorePrediction("action_predict" + v, top);
  }
  return ev;
}

/* Position value to the computer: its own (known) predictions minus the human's
 * estimated prediction value, judged against the current river tops. */
function evState(st, me, opp, movesMade) {
  let mine = 0;
  st.players[me].predictions.forEach((p, i) => {
    if (p) mine += scorePrediction(p, topOf(st.river[i]));
  });
  let theirs = 0;
  st.players[opp].predictions.forEach((p, i) => {
    if (p) theirs += oppPredEV(st, i, movesMade); // value never read, only existence
  });
  return mine - theirs;
}

function moveBonus(mv, st) {
  if (mv.k === "placePrediction") {
    // predicting on a full stack is safe (its top can no longer change)
    return st.river[mv.slot].stack.length >= MAX_STACK
      ? 1.5
      : 0.3 * st.river[mv.slot].stack.length;
  }
  if (mv.k === "placeRiver") return 0.1; // mild tempo for shaping the river
  return 0;
}

/* Greedy one-ply move choice: enumerate legal moves, simulate each, and keep the
 * one that best improves the computer's position (with the bluff model in play). */
function chooseAIMove() {
  const me = G.aiPlayer;
  const opp = G.human;
  const hand = G.players[me].hand;
  const movesAfter = G.moves.length + 1;
  const cands = [];
  hand.forEach((c) => {
    if (isRiver(c)) {
      G.river.forEach((s, i) => {
        if (s.stack.length < MAX_STACK) cands.push({ k: "placeRiver", card: c, slot: i });
      });
    } else if (isPrediction(c)) {
      G.players[me].predictions.forEach((p, i) => {
        if (p === null) cands.push({ k: "placePrediction", card: c, slot: i });
      });
    } else if (isDiscard(c)) {
      G.river.forEach((s, i) => {
        if (s.stack.length) cands.push({ k: "discardRiver", slot: i });
      });
      G.players[me].predictions.forEach((p, i) => {
        if (p) cands.push({ k: "discardPred", slot: i });
      });
    } else if (isFlow(c)) {
      cands.push({ k: "flow" });
    }
  });

  let best = null;
  let bestVal = -Infinity;
  for (const mv of cands) {
    const st = cloneState();
    applyMoveTo(st, me, mv);
    const val = evState(st, me, opp, movesAfter) + moveBonus(mv, st);
    if (val > bestVal) {
      bestVal = val;
      best = mv;
    }
  }

  // Drawing keeps options open. We can't see the card, only that one exists;
  // prefer it when the hand is thin or nothing else clearly helps.
  if (G.deck.length > 0 && hand.length <= MAX_HAND - 1) {
    const cur = evState(cloneState(), me, opp, movesAfter);
    const drawVal = cur + (hand.length <= 1 ? 1.5 : 0.2) + (cands.length === 0 ? 5 : 0);
    if (drawVal > bestVal || !best) best = { k: "draw" };
  }

  return best || { k: "draw" };
}

/* ---------------------------------------------------------------------------
 * State <-> URL hash (the single source of truth: shuffled deck + move list)
 * ------------------------------------------------------------------------- */
const ENC = {
  rivercard_1: "1",
  rivercard_2: "2",
  rivercard_3: "3",
  action_predict1: "p",
  action_predict2: "q",
  action_predict3: "r",
  action_flow: "f",
  action_discard: "d",
};
const DEC = Object.fromEntries(Object.entries(ENC).map(([k, v]) => [v, k]));
const encList = (a) => a.map((c) => ENC[c]).join("");
const decList = (s) => (s ? [...s].map((ch) => DEC[ch]) : []);
/* Moves are encoded as a compact string, each move self-delimiting by its first
 * character: d=draw, r=placeRiver(card,slot), p=placePrediction(card,slot),
 * x=discardRiver(slot), y=discardPred(slot), f=flow. */
function encMoves(moves) {
  return moves
    .map((m) => {
      if (m.k === "draw") return "d";
      if (m.k === "placeRiver") return "r" + ENC[m.card] + m.slot;
      if (m.k === "placePrediction") return "p" + ENC[m.card] + m.slot;
      if (m.k === "discardRiver") return "x" + m.slot;
      if (m.k === "discardPred") return "y" + m.slot;
      if (m.k === "flow") return "f";
      return "";
    })
    .join("");
}
function decMoves(s) {
  const moves = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (c === "d") (moves.push({ k: "draw" }), (i += 1));
    else if (c === "r") (moves.push({ k: "placeRiver", card: DEC[s[i + 1]], slot: +s[i + 2] }), (i += 3));
    else if (c === "p") (moves.push({ k: "placePrediction", card: DEC[s[i + 1]], slot: +s[i + 2] }), (i += 3));
    else if (c === "x") (moves.push({ k: "discardRiver", slot: +s[i + 1] }), (i += 2));
    else if (c === "y") (moves.push({ k: "discardPred", slot: +s[i + 1] }), (i += 2));
    else if (c === "f") (moves.push({ k: "flow" }), (i += 1));
    else i += 1;
  }
  return moves;
}

/* URL-safe base64 (so the hash is compact and link-friendly). */
function b64encode(str) {
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function b64decode(s) {
  s = s.replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4) s += "=";
  return atob(s);
}

/* Write the current state (seed + moves) to the URL. replaceState keeps the
 * hash in sync without pushing a browser-history entry, so the browser back
 * button isn't tangled up with the game; undo is handled in-app instead. */
function updateHash() {
  const obj = { d: encList(G.seed), m: encMoves(G.moves) };
  if (G.vsComputer) obj.ai = G.aiPlayer; // 0 or 1: which player the computer is
  history.replaceState(null, "", "#" + b64encode(JSON.stringify(obj)));
}

/* Resume the game encoded in the URL (the single source of truth). */
function loadFromHash() {
  let st;
  try {
    st = JSON.parse(b64decode(location.hash.slice(1)));
  } catch (e) {
    st = null;
  }
  if (!st || !st.d) {
    showStartSplash();
    return;
  }
  const vsComputer = st.ai === 0 || st.ai === 1;
  G = {
    seed: decList(st.d),
    moves: decMoves(st.m || ""),
    phase: "_locked",
    selected: null,
    view: 0,
    over: false,
    vsComputer,
    aiPlayer: vsComputer ? st.ai : -1,
    human: vsComputer ? 1 - st.ai : 0,
  };
  rebuild();
  const current = toMove();
  G.view = vsComputer ? G.human : current;
  if (gameIsOver()) {
    G.over = true;
    render(); // reveals predictions + shows the scoreboard
  } else if (vsComputer) {
    render();
    if (current === G.aiPlayer) runComputerTurn(); // computer to move
    else enterTurn(G.human); // human to move (no splash vs the computer)
  } else if (G.moves.length === 0) {
    enterTurn(0); // fresh 2-player game: Player 1 to act
  } else {
    render(); // current board behind the splash
    showPassSplash(current); // continue replays the opponent's last move
  }
}

/* ---------------------------------------------------------------------------
 * Boot
 * ------------------------------------------------------------------------- */
function buildStatusPanel() {
  const sidebar = document.querySelector(".z-title");
  const status = document.createElement("div");
  status.className = "status";
  status.innerHTML = `
    <div id="turn-line" class="turn-line"></div>
    <div id="hint-line" class="hint-line"></div>
    <button id="cancel-btn" class="cancel-btn" style="display:none">Cancel</button>
    <button id="undo-btn" class="cancel-btn">Undo move</button>
    <div id="gameover" style="display:none"></div>
  `;
  sidebar.appendChild(status);
  document.getElementById("cancel-btn").addEventListener("click", cancelSelection);
  document.getElementById("undo-btn").addEventListener("click", undoMove);
}

function init() {
  sheetSvg = document.querySelector(".asset-sheet svg");
  if (!sheetSvg) {
    console.error("Asset spritesheet not found.");
    return;
  }
  buildStatusPanel();
  // Our own state writes use history.replaceState, which does not fire
  // hashchange. So any hashchange is the user editing/pasting the URL: reload
  // the game from it (no manual refresh needed).
  window.addEventListener("hashchange", loadFromHash);
  if (location.hash.length > 1) loadFromHash();
  else showStartSplash();
}

window.addEventListener("DOMContentLoaded", init);
