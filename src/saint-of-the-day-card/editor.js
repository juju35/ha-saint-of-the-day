// ── saint-of-the-day-card-editor ──────────────────────────────────────────────
import { SAINT_CARD_VERSION, pickerDefine } from "./card-picker.js";
import { SAINT_DEFAULTS, SAINT_MAX_UPCOMING, saintLang } from "./i18n-helpers.js";
import { SaintCard } from "./card.js";
import { SaintMiniCard } from "./mini-card.js";
import { SaintI18n } from "./i18n/saint-i18n.js";

export var SAINT_LANGUAGES = [
  ['en', 'English'],
  ['fr', 'Français'],
  ['de', 'Deutsch'],
  ['es', 'Español'],
  ['sr', 'Српски'],
  ['sr-Latn', 'Srpski (latinica)'],
  ['it', 'Italiano'],
  ['nl', 'Nederlands'],
  ['pt', 'Português (Portugal)'],
  ['pl', 'Polski'],
  ['ro', 'Română'],
  ['da', 'Dansk'],
  ['sv', 'Svenska'],
  ['bg', 'Български'],
  ['ru', 'Русский'],
  ['uk', 'Українська'],
  ['hu', 'Magyar'],
  ['sk', 'Slovenčina'],
  ['cs', 'Čeština'],
  ['sl', 'Slovenščina'],
  ['lv', 'Latviešu'],
  ['el', 'Ελληνικά'],
];

export function saintEditorSchema(t) {
  return [
    { name: 'entity', selector: { entity: { domain: 'sensor', integration: 'saint_of_the_day' } } },
    { name: 'title', selector: { text: {} } },
    {
      type: 'grid',
      name: '',
      schema: [
        { name: 'show_title', selector: { boolean: {} } },
        { name: 'show_wish', selector: { boolean: {} } },
        { name: 'show_background', selector: { boolean: {} } },
        { name: 'illustration', selector: { boolean: {} } },
      ],
    },
    {
      name: 'illustration_theme',
      selector: { select: { mode: 'dropdown', options: ['auto', 'day', 'night'].map((v) => ({ value: v, label: t[`theme_${v}`] })) } },
    },
    { name: 'upcoming_days', selector: { number: { min: 0, max: SAINT_MAX_UPCOMING, mode: 'box' } } },
    {
      name: 'language',
      selector: {
        select: {
          mode: 'dropdown',
          options: [{ value: '', label: t.lang_auto }].concat(SAINT_LANGUAGES.map((l) => ({ value: l[0], label: l[1] }))),
        },
      },
    },
  ];
}

export class SaintCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = Object.assign({}, config);
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    if (this._form) this._form.hass = hass;
    else this._render();
  }

  _render() {
    if (!this._hass || !this._config) return;
    if (!this._form) {
      this._form = document.createElement('ha-form');
      this._form.addEventListener('value-changed', this._valueChanged.bind(this));
      this.appendChild(this._form);
    }
    // The labels follow the language picked in the editor: rebuilt only when it changes.
    var lang = saintLang(this._hass, this._config);
    if (lang !== this._lang) {
      this._lang = lang;
      var t = SaintI18n[lang].editor;
      this._form.schema = saintEditorSchema(t);
      this._form.computeLabel = (field) => t[field.name] || field.name;
    }
    this._form.hass = this._hass;
    this._form.data = Object.assign({}, SAINT_DEFAULTS, this._config);
  }

  _valueChanged(ev) {
    var value = Object.assign({}, ev.detail.value);
    // Keep the YAML short: drop options left at their default.
    Object.keys(SAINT_DEFAULTS).forEach((key) => {
      if (value[key] === SAINT_DEFAULTS[key]) delete value[key];
    });
    ['title', 'entity', 'language'].forEach((key) => {
      if (!value[key]) delete value[key];
    });
    this._config = value;
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: value }, bubbles: true, composed: true }));
  }
}

if (!customElements.get('saint-of-the-day-card-editor')) {
  pickerDefine('saint-of-the-day-card-editor', SaintCardEditor);
}

export var saintDefined = false;
if (!customElements.get('saint-of-the-day-card')) {
  pickerDefine('saint-of-the-day-card', SaintCard);
  saintDefined = true;
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: 'saint-of-the-day-card',
    name: 'Saint of the day',
    description: 'The French name day of today, with a wish and the next days.',
    preview: true,
    documentationURL: 'https://github.com/juju35/ha-saint-of-the-day',
  });
}
if (!customElements.get('saint-of-the-day-mini-card')) {
  pickerDefine('saint-of-the-day-mini-card', SaintMiniCard);
  saintDefined = true;
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: 'saint-of-the-day-mini-card',
    name: 'Saint of the day mini',
    description: 'Today’s name day, with a button to show the full Saint of the day card.',
    preview: true,
    documentationURL: 'https://github.com/juju35/ha-saint-of-the-day',
  });
}
if (saintDefined) {
  console.info(`%c SAINT-OF-THE-DAY-CARD %c v${SAINT_CARD_VERSION} `, 'color:#fff;background:#8e44ad;font-weight:700', 'color:#8e44ad;background:#fff');
}
