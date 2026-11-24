import { SaintI18n } from "./i18n/saint-i18n.js";

// Single source of the config defaults, shared by the card (setConfig) and the editor.
export var SAINT_DEFAULTS = { show_title: true, show_wish: true, show_background: true, illustration: true, illustration_theme: 'auto', upcoming_days: 3 };
export var SAINT_MAX_UPCOMING = 7;

// The whole width of an element's text in its own font, an ellipsised one included.
export function saintTextWidth(el) {
  const range = document.createRange();
  range.selectNodeContents(el);
  return range.getBoundingClientRect().width;
}

// Shadow DOM patching: a new render rewrites the header and the body in place instead of replacing them
// (innerHTML), so the nodes kept (the illustration's SVG, its running animations, the focused detail button) keep
// their size and state: nothing shows anew for a frame, the Sections view does not reflow and the page does not
// jump by itself. Nodes are matched by position; a node of another kind is replaced. A custom element written empty
// (<ha-icon>) draws its own content: only the attributes the markup gives are updated.
export function saintPatchChildren(cur, next) {
  const old = [...cur.childNodes];
  const fresh = [...next.childNodes];
  fresh.forEach((n, i) => {
    const o = old[i];
    if (!o || o.nodeType !== n.nodeType || o.nodeName !== n.nodeName) {
      if (o) cur.replaceChild(n, o);
      else cur.appendChild(n);
      return;
    }
    if (n.nodeType !== 1) {
      if (o.nodeValue !== n.nodeValue) o.nodeValue = n.nodeValue;
      return;
    }
    const own = n.localName.includes('-') && !n.firstChild;
    if (!own) for (const { name } of [...o.attributes]) if (!n.hasAttribute(name)) o.removeAttribute(name);
    for (const { name, value } of n.attributes) if (o.getAttribute(name) !== value) o.setAttribute(name, value);
    if (!own) saintPatchChildren(o, n);
  });
  for (let i = old.length - 1; i >= fresh.length; i--) cur.removeChild(old[i]);
}

export function saintMorph(el, html) {
  const tpl = el.childNodes && document.createElement('template');
  if (!tpl || !tpl.content) {
    el.innerHTML = html;
    return;
  }
  tpl.innerHTML = html;
  saintPatchChildren(el, tpl.content);
}

export function saintEsc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);
}

// The card's `language` option wins over the Home Assistant language. A full code the card knows (sr-Latn) is
// kept, otherwise its part before the dash (fr-FR gives fr, pt-BR gives the European Portuguese pt), otherwise English.
export function saintLang(hass, config) {
  var lang = String(config?.language || (hass && (hass.locale?.language || hass.language)) || navigator.language || 'en');
  if (SaintI18n[lang]) return lang;
  lang = lang.split('-')[0];
  return SaintI18n[lang] ? lang : 'en';
}

// Locale for Intl: the full code (fr-CA, pt-BR) of the card's `language` option, else of Home Assistant, when its
// base is the card's resolved language, otherwise the resolved language. Plain "pt" is European Portuguese in Home
// Assistant but Brazilian in Intl, so it becomes pt-PT. The sr / sr-Latn scripts never mix.
export function saintLocale(hass, config) {
  var lang = saintLang(hass, config);
  var full = String(config?.language || (hass && (hass.locale?.language || hass.language)) || '');
  var sameScript = /-Latn\b/i.test(full) === /-Latn\b/i.test(lang);
  var locale = full && full.split('-')[0] === lang.split('-')[0] && sameScript ? full : lang;
  return locale === 'pt' ? 'pt-PT' : locale;
}

// "YYYY-MM-DD" as a local date: Date.parse reads a date alone as UTC midnight, the day before west of UTC.
export function saintParseDate(iso) {
  var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || ''));
  return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : null;
}

export function saintFormatDate(iso, locale, options) {
  var d = saintParseDate(iso);
  if (!d) return '';
  try {
    return d.toLocaleDateString(locale, options);
  } catch (_err) {
    return d.toLocaleDateString('en', options);
  }
}

// "Philippe and Jacques" in the card's language.
export function saintJoin(names, locale) {
  try {
    return new Intl.ListFormat(locale, { style: 'long', type: 'conjunction' }).format(names);
  } catch (_err) {
    return names.join(', ');
  }
}

export function saintWish(t, names, locale) {
  return names.length ? t.wish.replace('{names}', saintJoin(names, locale)) : '';
}

// Night picture: forced by illustration_theme, else Home Assistant's dark mode alone (a light theme keeps the day
// picture after sunset).
export function saintIsNight(hass, config) {
  var theme = config?.illustration_theme;
  if (theme === 'night') return true;
  if (theme === 'day') return false;
  return !!hass?.themes?.darkMode;
}

// The header's status, shown by the colour of the round icon and by the scene: `ok` (today's feast is known),
// `off` (the sensor is unavailable: grey, the scene rests) or `alert` (no sensor found: red, the scene rests).
export function saintStatus(st) {
  if (!st) return 'alert';
  return st.state === 'unavailable' || st.state === 'unknown' ? 'off' : 'ok';
}
