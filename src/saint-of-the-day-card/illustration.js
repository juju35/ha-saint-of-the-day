// ── Illustration ──────────────────────────────────────────────────────────────
// The illustrated header, as on the other cards with a scene (flight and train boards): a sky across the card, a strip
// of paving stones along the bottom, the scene on the right and the round icon with the texts on the left. The sky
// follows day and night; the chapel keeps its light stone. In the scene, a saint stands in front
// of a rose window: the saint sways and blesses under a glowing halo, the window turns slowly (8-fold: one petal step
// every 6 s), its light breathes, two candles flicker. Every loop is a divisor of 6 s, so a 6 s GIF loops seamlessly.
export var SAINT_GOLD = '#e8a33d';
export var SAINT_SKIN = '#f2d4b8';
export var SAINT_GLASS = ['#8e44ad', '#3a6fc4', '#c0392b', '#2e9e6b'];

export function saintRose() {
  var petals = '';
  for (var i = 0; i < 8; i++) {
    petals +=
      `<path d="M78 38 L73 11 Q78 5 83 11 Z" transform="rotate(${i * 45} 78 38)" fill="${SAINT_GLASS[i % 4]}" fill-opacity=".75"/>` +
      `<circle cx="78" cy="9.5" r="2.6" transform="rotate(${i * 45 + 22.5} 78 38)" fill="${SAINT_GOLD}"/>`;
  }
  return (
    '<g class="rose">' +
    '<circle class="disc" cx="78" cy="38" r="33" stroke-width="3"/>' +
    `${petals}<circle cx="78" cy="38" r="5.5" fill="${SAINT_GOLD}"/></g>`
  );
}

// The saint, drawn in a 120 x 96 box standing on its bottom edge (centre x = 78).
export function saintFigure() {
  return (
    '<g class="saint">' +
    `<circle class="halo" cx="78" cy="41" r="10" fill="${SAINT_GOLD}" fill-opacity=".35" stroke="${SAINT_GOLD}" stroke-width="2"/>` +
    '<path d="M66 54 Q78 47 90 54 L97 96 L59 96 Z" fill="#8e44ad"/>' +
    '<path d="M74 55 L82 55 L85 96 L71 96 Z" fill="#fff" fill-opacity=".2"/>' +
    `<rect x="65" y="67" width="26" height="2.6" rx="1.3" fill="${SAINT_GOLD}"/>` +
    '<path d="M68.5 46 Q78 27 87.5 46 L89 56 Q78 51 67 56 Z" fill="#6c2f86"/>' +
    '<path d="M70 46 Q78 31 86 46 L86.5 52 Q78 49 69.5 52 Z" fill="#fff" fill-opacity=".22"/>' +
    `<circle cx="78" cy="43" r="6" fill="${SAINT_SKIN}"/>` +
    '<path d="M74.6 43.2 q1.2 1 2.4 0 M79 43.2 q1.2 1 2.4 0" fill="none" stroke="#6b4a3a" stroke-width=".8" stroke-linecap="round"/>' +
    `<rect x="61" y="59" width="9" height="12" rx="1.2" transform="rotate(-12 65.5 65)" fill="${SAINT_GOLD}"/>` +
    '<rect x="62.6" y="60.5" width="1.3" height="9" transform="rotate(-12 65.5 65)" fill="#fff" fill-opacity=".5"/>' +
    '<g class="arm"><path d="M85 54 L96 63 L92.5 67.5 L83 59 Z" fill="#7a3897"/>' +
    `<circle cx="95.6" cy="66.4" r="2.4" fill="${SAINT_SKIN}"/></g></g>`
  );
}

export function saintCandle(x, n) {
  return (
    `<g class="candle c${n}"><rect x="${x - 2.5}" y="58" width="5" height="22" rx="1" fill="#fbf3e4" stroke="#e2d2b8" stroke-width=".6"/>` +
    `<ellipse class="glow" cx="${x}" cy="53" rx="6" ry="7" fill="${SAINT_GOLD}" fill-opacity=".22"/>` +
    `<path class="flame" d="M${x} 49 Q${x + 2.6} 53.5 ${x} 57 Q${x - 2.6} 53.5 ${x} 49 Z" fill="${SAINT_GOLD}"/></g>`
  );
}

export function saintSparkle(x, y, n) {
  return `<path class="spark s${n}" d="M${x} ${y - 3}L${x + .8} ${y - .8}L${x + 3} ${y}L${x + .8} ${y + .8}L${x} ${y + 3}L${x - .8} ${y + .8}L${x - 3} ${y}L${x - .8} ${y - .8}Z" fill="${SAINT_GOLD}"/>`;
}

// The scene: 200 x 80, anchored at the bottom right of the banner, above the floor.
export function saintScene() {
  return (
    '<svg class="scene" viewBox="0 0 200 80" preserveAspectRatio="xMaxYMax meet" aria-hidden="true" focusable="false">' +
    // Gothic arch of the window bay, two columns.
    '<path class="arch" d="M86 80 V34 Q120 -6 154 34 V80 Z"/>' +
    [70, 161, 186].map((x) => `<rect class="col" x="${x}" y="14" width="9" height="66"/><rect class="cap" x="${x - 2}" y="12" width="13" height="4" rx="1"/>`).join('') +
    `<polygon class="ray r1" points="112,40 128,40 108,80 58,80" fill="${SAINT_GOLD}"/>` +
    '<polygon class="ray r2" points="116,42 124,42 96,80 76,80" fill="#ffffff"/>' +
    `<g transform="translate(61.5 8) scale(.75)">${saintRose()}</g>` +
    `<g transform="translate(61.5 8) scale(.75)">${saintFigure()}</g>` +
    saintCandle(172, 1) +
    saintCandle(180, 2) +
    saintSparkle(98, 16, 1) +
    saintSparkle(150, 52, 2) +
    saintSparkle(92, 50, 3) +
    '</svg>'
  );
}
