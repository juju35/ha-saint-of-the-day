// Unit tests for the card logic: the card file is evaluated with stubs, no browser needed.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import vm from 'node:vm';

// Run west of UTC: a date-only "YYYY-MM-DD" parsed as UTC midnight shows the day before there,
// which CI runners (UTC) would never reveal. Node applies a TZ change made at runtime.
process.env.TZ = 'America/New_York';

const source = readFileSync(new URL('../custom_components/saint_of_the_day/frontend/saint-of-the-day-card.js', import.meta.url), 'utf8');

// Minimal DOM: enough for the card's shadow root, innerHTML writes and listeners.
class FakeNode {
  constructor() {
    this.innerHTML = '';
    this.listeners = {};
    this.classList = { toggle: (name, on) => (this.classes = { ...this.classes, [name]: on }) };
  }
  addEventListener(type, fn) {
    this.listeners[type] = fn;
  }
  querySelector(sel) {
    if (!this.children) this.children = {};
    if (!this.children[sel]) this.children[sel] = new FakeNode();
    return this.children[sel];
  }
}
class FakeElement {
  constructor() {
    this.attributes = {};
    this.events = [];
  }
  attachShadow() {
    this.shadowRoot = new FakeNode();
    return this.shadowRoot;
  }
  toggleAttribute(name, on) {
    if (on) this.attributes[name] = '';
    else delete this.attributes[name];
  }
  setAttribute(name, value) {
    this.attributes[name] = value;
  }
  dispatchEvent(ev) {
    this.events.push(ev);
  }
}

const defined = {};
const context = {
  HTMLElement: FakeElement,
  customElements: { get: (name) => defined[name], define: (name, cls) => (defined[name] = cls) },
  window: {},
  navigator: { language: 'en' },
  document: { addEventListener() {}, removeEventListener() {}, createElement: () => ({}) },
  CustomEvent: class {
    constructor(type, init) {
      this.type = type;
      this.detail = init?.detail;
    }
  },
  Intl,
  console: { info() {}, log: console.log },
};
vm.createContext(context);
vm.runInContext(
  `${source}\nthis.saint = { saintEsc, saintLang, saintLocale, saintParseDate, saintJoin, saintWish, SaintCard, SaintMiniCard, SaintI18n, SAINT_DEFAULTS };`,
  context,
);
const { saintEsc, saintLang, saintLocale, saintParseDate, saintJoin, saintWish, SaintCard, SaintMiniCard, SaintI18n, SAINT_DEFAULTS } = context.saint;

const TODAY = {
  entity_id: 'sensor.saint_of_the_day_saint_of_the_day',
  state: 'Sts Anne et Joachim',
  attributes: {
    date: '2026-07-26',
    names: ['Anne', 'Joachim'],
    config_entry_id: 'abc',
    upcoming: [
      { date: '2026-07-27', label: 'Ste Nathalie', names: ['Nathalie'] },
      { date: '2026-07-28', label: 'St Samson', names: ['Samson'] },
      { date: '2026-07-29', label: 'Ste Marthe', names: ['Marthe'] },
      { date: '2026-07-30', label: 'Ste Juliette', names: ['Juliette'] },
    ],
  },
};
const hassWith = (states, lang = 'en', extra = {}) => ({ states, language: lang, locale: { language: lang }, ...extra });

function render(Cls, config, hass) {
  const card = new Cls();
  card.setConfig(config);
  card.hass = hass;
  return card;
}

test('the elements and the card picker entries are defined', () => {
  assert.equal(defined['saint-of-the-day-card'], SaintCard);
  assert.equal(defined['saint-of-the-day-mini-card'], SaintMiniCard);
  assert.ok(defined['saint-of-the-day-card-editor']);
  assert.deepEqual(
    [...context.window.customCards.map((c) => c.type)],
    ['saint-of-the-day-card', 'saint-of-the-day-mini-card'],
  );
});

test('saintEsc escapes HTML', () => {
  assert.equal(saintEsc('<b a="1">\'&'), '&lt;b a=&quot;1&quot;&gt;&#39;&amp;');
  assert.equal(saintEsc(null), '');
});

test('saintLang and saintLocale follow the card option, then Home Assistant, then English', () => {
  assert.equal(saintLang({ locale: { language: 'fr-FR' } }), 'fr');
  assert.equal(saintLang({ locale: { language: 'sr-Latn' } }), 'sr-Latn');
  assert.equal(saintLang({ locale: { language: 'pt-BR' } }), 'pt');
  assert.equal(saintLang({ locale: { language: 'xx' } }), 'en');
  assert.equal(saintLang({ language: 'fr' }, { language: 'de' }), 'de');
  assert.equal(saintLocale({ language: 'pt' }), 'pt-PT');
  assert.equal(saintLocale({ locale: { language: 'fr-CA' } }), 'fr-CA');
  assert.equal(saintLocale({ locale: { language: 'sr-Latn' } }, { language: 'sr' }), 'sr');
});

test('every language has every key of English, with the {names} placeholder', () => {
  const keys = (o) => Object.keys(o).sort();
  const en = SaintI18n.en;
  assert.equal(Object.keys(SaintI18n).length, 22);
  for (const [lang, t] of Object.entries(SaintI18n)) {
    assert.deepEqual(keys(t), keys(en), lang);
    assert.deepEqual(keys(t.editor), keys(en.editor), lang);
    assert.ok(t.wish.includes('{names}'), lang);
    for (const v of [...Object.values(t).filter((x) => typeof x === 'string'), ...Object.values(t.editor)]) assert.ok(v.trim(), lang);
  }
});

test('a date alone is a local date, not UTC midnight', () => {
  const d = saintParseDate('2026-07-26');
  assert.equal(d.getDate(), 26);
  assert.equal(d.getMonth(), 6);
  assert.equal(saintParseDate('nope'), null);
});

test('the wish joins the first names in the card language, and is empty on a feast without names', () => {
  assert.equal(saintJoin(['Anne', 'Joachim'], 'en'), 'Anne and Joachim');
  assert.equal(saintJoin(['Anne', 'Joachim'], 'fr'), 'Anne et Joachim');
  assert.equal(saintWish(SaintI18n.fr, ['Anne', 'Joachim'], 'fr'), 'Bonne fête, Anne et Joachim !');
  assert.equal(saintWish(SaintI18n.en, [], 'en'), '');
});

test('the full card shows the feast, the wish, tomorrow and the configured number of next days', () => {
  const card = render(SaintCard, { upcoming_days: 3 }, hassWith({ [TODAY.entity_id]: TODAY }));
  const header = card.shadowRoot.children['.header'].innerHTML;
  const body = card.shadowRoot.children['.body'].innerHTML;
  assert.match(header, /Saint of the day/);
  assert.match(header, /Sunday, July 26/);
  assert.match(body, /Sts Anne et Joachim/);
  assert.match(body, /Happy name day, Anne and Joachim!/);
  assert.match(body, /Tomorrow<\/span><span class="what">Ste Nathalie/);
  assert.match(body, /St Samson/);
  assert.match(body, /Ste Marthe/);
  assert.doesNotMatch(body, /Ste Juliette/);
});

test('upcoming_days 0 and show_wish false hide the list and the wish', () => {
  const card = render(SaintCard, { upcoming_days: 0, show_wish: false }, hassWith({ [TODAY.entity_id]: TODAY }));
  const body = card.shadowRoot.children['.body'].innerHTML;
  assert.doesNotMatch(body, /upcoming/);
  assert.doesNotMatch(body, /Happy name day/);
});

test('upcoming_days is clamped to 0..7', () => {
  const card = new SaintCard();
  card.setConfig({ upcoming_days: 42 });
  assert.equal(card._config.upcoming_days, 7);
  card.setConfig({ upcoming_days: -3 });
  assert.equal(card._config.upcoming_days, 0);
  card.setConfig({ upcoming_days: 'x' });
  assert.equal(card._config.upcoming_days, SAINT_DEFAULTS.upcoming_days);
});

test('the card follows its language option', () => {
  const card = render(SaintCard, { language: 'fr' }, hassWith({ [TODAY.entity_id]: TODAY }));
  assert.match(card.shadowRoot.children['.header'].innerHTML, /Saint du jour/);
  assert.match(card.shadowRoot.children['.body'].innerHTML, /Demain/);
});

test('the sensor is found by its attributes, else by the entity registry', () => {
  assert.equal(SaintCard._findEntity(hassWith({ 'sensor.other': { attributes: {} }, [TODAY.entity_id]: TODAY })), TODAY.entity_id);
  const unavailable = { state: 'unavailable', attributes: {} };
  const hass = hassWith(
    { 'sensor.x': unavailable },
    'en',
    { entities: { 'sensor.x': { platform: 'saint_of_the_day', translation_key: 'today' } } },
  );
  assert.equal(SaintCard._findEntity(hass), 'sensor.x');
  assert.deepEqual({ ...SaintCard.getStubConfig(hassWith({})) }, {});
});

test('missing or unavailable sensor messages', () => {
  let card = render(SaintCard, {}, hassWith({}));
  assert.match(card.shadowRoot.children['.body'].innerHTML, /sensor not found/);
  card = render(SaintCard, { entity: 'sensor.x' }, hassWith({ 'sensor.x': { state: 'unavailable', attributes: {} } }));
  assert.match(card.shadowRoot.children['.body'].innerHTML, /unavailable for now/);
});

test('the card redraws only when the sensor or the language changes', () => {
  const states = { [TODAY.entity_id]: TODAY };
  const card = render(SaintCard, {}, hassWith(states));
  let renders = 0;
  const original = card._render.bind(card);
  card._render = () => {
    renders += 1;
    original();
  };
  card.hass = hassWith(states);
  assert.equal(renders, 0);
  card.hass = hassWith({ [TODAY.entity_id]: { ...TODAY, state: 'Ste Nathalie' } });
  assert.equal(renders, 1);
  card.hass = hassWith({ [TODAY.entity_id]: card._lastState }, 'fr');
  assert.equal(renders, 2);
});

test('the mini card shows the feast only, and its detail button switches to the full card and back', () => {
  const card = render(SaintMiniCard, {}, hassWith({ [TODAY.entity_id]: TODAY }));
  assert.equal(card.attributes.mini, '');
  assert.doesNotMatch(card.shadowRoot.children['.body'].innerHTML, /Ste Nathalie/);
  assert.match(card.shadowRoot.children['.header'].innerHTML, /arrow-expand/);
  assert.equal(card.getCardSize(), 2);
  assert.deepEqual({ ...card.getGridOptions() }, { columns: 6, min_columns: 4, rows: 'auto' });
  card._toggleDetail({ stopPropagation() {}, detail: 1 });
  assert.match(card.shadowRoot.children['.body'].innerHTML, /Ste Nathalie/);
  assert.match(card.shadowRoot.children['.header'].innerHTML, /arrow-collapse/);
  // A click outside the card folds it back.
  card._onOutsideMini({ composedPath: () => [] });
  assert.doesNotMatch(card.shadowRoot.children['.body'].innerHTML, /Ste Nathalie/);
});

test('a click on the feast opens the more-info dialog of the sensor', () => {
  const card = render(SaintCard, {}, hassWith({ [TODAY.entity_id]: TODAY }));
  card._moreInfo();
  assert.equal(card.events[0].type, 'hass-more-info');
  assert.equal(card.events[0].detail.entityId, TODAY.entity_id);
});
