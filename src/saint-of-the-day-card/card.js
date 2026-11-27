// ── saint-of-the-day-card ─────────────────────────────────────────────────────
import { SAINT_ACCENT } from "./header-icon.js";
import { SAINT_DEFAULTS, SAINT_MAX_UPCOMING, saintEsc, saintFormatDate, saintIsNight, saintLang, saintLocale, saintMorph, saintStatus, saintTextWidth, saintWish } from "./i18n-helpers.js";
import { saintScene } from "./illustration.js";
import { SaintI18n } from "./i18n/saint-i18n.js";

export class SaintCard extends HTMLElement {
  static getConfigElement() {
    return document.createElement('saint-of-the-day-card-editor');
  }

  static getStubConfig(hass) {
    var entity = SaintCard._findEntity(hass);
    return entity ? { entity: entity } : {};
  }

  // The today sensor: the one with the `upcoming` list. An unavailable sensor has no attributes: fall back to the
  // entity registry (platform and translation key).
  static _findEntity(hass) {
    if (!hass?.states) return null;
    var ids = Object.keys(hass.states);
    for (var i = 0; i < ids.length; i++) {
      var st = hass.states[ids[i]];
      if (ids[i].indexOf('sensor.') === 0 && st.attributes && Array.isArray(st.attributes.upcoming) && st.attributes.config_entry_id) {
        return ids[i];
      }
    }
    var entities = hass.entities || {};
    var reg = Object.keys(entities);
    for (var j = 0; j < reg.length; j++) {
      var e = entities[reg[j]];
      if (reg[j].indexOf('sensor.') === 0 && e.platform === 'saint_of_the_day' && e.translation_key === 'today' && hass.states[reg[j]]) return reg[j];
    }
    return null;
  }

  setConfig(config) {
    var c = Object.assign({}, SAINT_DEFAULTS, config || {});
    var days = Number(c.upcoming_days);
    c.upcoming_days = Number.isFinite(days) ? Math.max(0, Math.min(SAINT_MAX_UPCOMING, Math.round(days))) : SAINT_DEFAULTS.upcoming_days;
    this._config = c;
    this.toggleAttribute?.('hide-title', c.show_title === false);
    var entityId = this._hass ? this._entityId() : null;
    this._lastState = entityId ? this._hass.states[entityId] || null : null;
    if (this._hass) this._render();
  }

  set hass(hass) {
    var first = !this._hass;
    var lang = this._hass ? saintLang(this._hass, this._config) : null;
    var night = this._hass ? saintIsNight(this._hass, this._config) : null;
    this._hass = hass;
    var entityId = this._entityId();
    var st = entityId ? hass.states[entityId] : null;
    // Only redraw when the sensor, the language or day / night changed: hass updates several times a second.
    if (first || st !== this._lastState || lang !== saintLang(hass, this._config) || night !== saintIsNight(hass, this._config)) {
      this._lastState = st;
      this._render();
    }
  }

  getCardSize() {
    return 2 + (this._config ? this._config.upcoming_days : 0);
  }

  getGridOptions() {
    return { columns: 12, min_columns: 6, rows: 'auto' };
  }

  // Without a configured entity, the sensor found is kept and looked up again only when it disappears.
  _entityId() {
    if (this._config?.entity) return this._config.entity;
    if (!this._autoEntity || !this._hass?.states[this._autoEntity]) this._autoEntity = SaintCard._findEntity(this._hass);
    return this._autoEntity;
  }

  _t() {
    return SaintI18n[saintLang(this._hass, this._config)];
  }

  _compact() {
    return false;
  }

  _detailButton() {
    return '';
  }

  // The round calendar icon, on frosted glass over the illustration; its colour is the header's status.
  _iconHtml() {
    return '<div class="badge"><ha-icon icon="mdi:calendar"></ha-icon></div>';
  }

  // Back on the page: the width is watched again (the shell, and its observer, are kept).
  connectedCallback() {
    this._resize?.observe(this);
  }

  // Left the page: no width observer nor pending pill measurement on a detached card.
  disconnectedCallback() {
    this._resize?.disconnect();
    this._fitWidth = null;
    if (this._fitFrame) cancelAnimationFrame(this._fitFrame);
    this._fitFrame = null;
  }

  _ensureShell() {
    if (this._root) return;
    this._root = this.attachShadow({ mode: 'open' });
    this._root.innerHTML = `<style>${SaintCard._styles()}</style><ha-card><div class="header"></div><div class="body"></div></ha-card>`;
    // A new width (or the web font loaded): the status pill is fitted again, in the next frame.
    if (typeof ResizeObserver === 'function') {
      this._resize = new ResizeObserver((entries) => {
        const w = Math.round(entries.at(-1).contentRect.width);
        if (w === this._fitWidth) return;
        this._fitWidth = w;
        cancelAnimationFrame(this._fitFrame);
        this._fitFrame = requestAnimationFrame(() => this._fitPill());
      });
      this._resize.observe(this);
    }
    document.fonts?.ready?.then(() => this._fitPill());
    this._root.querySelector('ha-card').addEventListener('click', (ev) => {
      if (ev.target.closest?.('.feast')) this._moreInfo();
    });
    // The mini card's detail button (kept from one render to the next: one listener, on its header).
    this._root.querySelector('.header').addEventListener('click', (ev) => {
      if (ev.target.closest?.('.detail')) this._toggleDetail?.(ev);
    });
    this._root.querySelector('ha-card').addEventListener('keydown', (ev) => {
      if ((ev.key === 'Enter' || ev.key === ' ') && ev.target.closest?.('.feast')) {
        ev.preventDefault();
        this._moreInfo();
      }
    });
  }

  // The status pill stays right after the title only while the whole title and the pill's whole label fit on that
  // row; otherwise it takes a line of its own under the subtitle (.below), and when even then the text would leave the
  // banner or run into its floor strip, it keeps its dot alone (.pill-dot). Measured in the real fonts, so that every
  // language and title length gets its own answer.
  _fitPill() {
    for (const t of this._root?.querySelectorAll?.('.banner .titles, .titlebar .titles') || []) {
      const row = t.querySelector(':scope > .trow');
      const pill = row?.querySelector(':scope > .pill');
      if (!pill?.getBoundingClientRect) continue;
      t.classList.remove('below', 'pill-dot');
      const name = row.querySelector(':scope > .name');
      const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
      const title = name && getComputedStyle(name).display !== 'none' ? saintTextWidth(name) + gap : 0;
      const natural = pill.getBoundingClientRect().width;
      if (title + natural <= row.getBoundingClientRect().width) continue;
      t.classList.add('below');
      const banner = t.closest('.banner, .titlebar');
      const r = t.getBoundingClientRect();
      const box = banner.getBoundingClientRect();
      const floor = banner.querySelector('.floor')?.getBoundingClientRect().top ?? box.bottom;
      if (r.bottom > floor + 0.5 || r.top < box.top - 0.5 || natural > r.width + 0.5) t.classList.add('pill-dot');
    }
  }

  _moreInfo() {
    var entityId = this._entityId();
    if (!entityId) return;
    this.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId: entityId }, bubbles: true, composed: true }));
  }

  _render() {
    if (!this._config || !this._hass) return;
    this._ensureShell();
    var t = this._t();
    var locale = saintLocale(this._hass, this._config);
    var st = this._lastState;
    var header = this._root.querySelector('.header');
    var body = this._root.querySelector('.body');
    var title = this._config.title || t.default_title;
    var attrs = st?.attributes || {};
    var unavailable = !st || st.state === 'unavailable' || st.state === 'unknown';
    var date = unavailable ? '' : saintFormatDate(attrs.date, locale, { weekday: 'long', day: 'numeric', month: 'long' });
    var compact = this._compact();

    var names = Array.isArray(attrs.names) ? attrs.names : [];
    var wish = unavailable || !this._config.show_wish ? '' : saintWish(t, names, locale);
    // The illustrated banner. Full card: the title and the date. Compact mini card: the banner is the whole card,
    // today's feast laid on it with the wish (else the date).
    // The status pill right after the title (or the feast): today's feast, sensor unavailable or not found, in the
    // colour of the round icon.
    var status = saintStatus(st);
    var pillText = status === 'ok' ? t.status_today : status === 'off' ? t.status_unavailable : t.status_not_found;
    var pill =
      `<span class="pill" title="${saintEsc(pillText)}" aria-label="${saintEsc(pillText)}">` +
      `<span class="dot"></span><span class="pt">${saintEsc(pillText)}</span></span>`;
    var texts =
      compact && !unavailable
        ? `<div class="titles feast" role="button" tabindex="0"><div class="trow"><div class="name">${saintEsc(st.state)}</div>${pill}</div>` +
          `<div class="sub" title="${saintEsc(wish || date)}">${saintEsc(wish || date)}</div></div>`
        : `<div class="titles"><div class="trow"><div class="name">${saintEsc(title)}</div>${pill}</div>` +
          (date ? `<div class="sub" title="${saintEsc(date)}">${saintEsc(date)}</div>` : '') +
          '</div>';
    var detail = this._detailButton(t);
    // illustration: false — no banner at all, as on the other cards: the round icon and the texts in a plain header
    // of their own height (no scene, no sky, no floor).
    var illustrated = this._config.illustration !== false;
    var cls =
      (compact ? ' mini' : '') +
      (illustrated && saintIsNight(this._hass, this._config) ? ' night' : '') +
      (illustrated && this._config.show_background === false ? ' plain' : '') +
      (detail ? ' with-detail' : '') +
      ` st-${status}`;
    var head = `<div class="head">${this._iconHtml()}${texts}</div>${detail}`;
    saintMorph(
      header,
      illustrated ? `<div class="banner${cls}">${saintScene()}<div class="floor"></div>${head}</div>` : `<div class="titlebar${cls}">${head}</div>`,
    );
    this._fitPill();

    if (!st) {
      this._shown = null;
      saintMorph(body, `<div class="empty">${saintEsc(t.no_entity)}</div>`);
      return;
    }
    if (unavailable) {
      this._shown = null;
      saintMorph(body, `<div class="empty">${saintEsc(t.unavailable)}</div>`);
      return;
    }
    if (compact) {
      this._shown = `${attrs.date}|${st.state}`;
      saintMorph(body, '');
      return;
    }
    var html =
      `<div class="feast" role="button" tabindex="0"><div class="label">${saintEsc(st.state)}</div>` +
      (wish ? `<div class="wish">${saintEsc(wish)}</div>` : '') +
      '</div>';
    var upcoming = (Array.isArray(attrs.upcoming) ? attrs.upcoming : []).slice(0, this._config.upcoming_days);
    if (upcoming.length) {
      html +=
        `<div class="section">${saintEsc(t.upcoming)}</div><ul class="upcoming">` +
        upcoming
          .map((f, i) => {
            var when = i === 0 ? t.tomorrow : saintFormatDate(f.date, locale, { weekday: 'short', day: 'numeric', month: 'short' });
            return `<li><span class="when">${saintEsc(when)}</span><span class="what">${saintEsc(f.label)}</span></li>`;
          })
          .join('') +
        '</ul>';
    }
    saintMorph(body, html);
    // The feast fades in when it is new (first draw, a new day), not when the mini card folds or the language changes.
    var shown = `${attrs.date}|${st.state}`;
    // The nodes are kept: a new feast replays the entrance even when the last one still holds the class.
    if (shown !== this._shown && body.classList.contains?.('enter')) {
      body.classList.remove('enter');
      void body.offsetWidth;
    }
    body.classList.toggle('enter', shown !== this._shown);
    this._shown = shown;
  }

  static _styles() {
    return [
      ':host { display: block; }',
      // A 0 px high line gives the host a preferred width without a minimum, as in the other cards: the card keeps a
      // width in auto-sized containers and still shrinks in a `1fr 1fr` grid.
      ':host::before { content: ""; display: grid; grid-template-columns: minmax(0, 320px); height: 0; }',
      'ha-card { overflow: hidden; container: saint / inline-size; }',
      // ── Illustrated header (90 px, as on the other cards with a scene): a sky across the card, the saint in front of
      // the rose window on the right, a 10 px strip of paving stones edge to edge, the round icon and the texts on the left.
      '.banner { position: relative; height: var(--banner-h, 90px); overflow: hidden; --floor-h: 10px; --wall-text: #0d2a45; --wall-muted: #3b5b78;' +
        ' --st: #2f80ed; background: linear-gradient(90deg, #f1f8ff 0%, #e2f1fd 34%, #b9def8 70%, #9fd0f3 100%); }',
      // Night (a dark theme, or illustration_theme: night): a night sky, the paving
      // darkens, the texts turn light, the window and the candles glow.
      '.banner.night { --wall-text: #ffffff; --wall-muted: rgba(255,255,255,.78); --st: #8fbaff;' +
        ' background: linear-gradient(90deg, #1b2f52 0%, #15284a 36%, #0f1f3d 72%, #0a1830 100%); }',
      // The round icon's colour is the status: feast known (accent), sensor unavailable (grey), no sensor (red).
      '.st-off { --st: #8a939c; } .night.st-off { --st: #9aa3ad; }',
      '.st-alert { --st: #e53935; } .night.st-alert { --st: #ff6b6b; }',
      '.scene .arch { fill: #e6d8ef; } .scene .col { fill: #ddcce9; } .scene .cap { fill: #cdb8dd; } .scene .disc { fill: #fbf7fd; stroke: #b9a4c9; }',
      '.night .scene .disc { fill: #fff6e0; }',
      // Without a feast to show, the scene rests: greyed, the animations stopped.
      '.st-off .scene, .st-alert .scene { filter: grayscale(.85); opacity: .6; }',
      '.st-off .scene *, .st-alert .scene * { animation: none !important; }',
      // The chapel's lavender paving, by day and by night.
      '.floor { position: absolute; left: 0; right: 0; bottom: 0; height: var(--floor-h); box-shadow: inset 0 1px 0 #b19dc2;' +
        ' background: repeating-linear-gradient(90deg, #d4c4df 0 15px, #c6b2d4 15px 30px); }',
      '.night .floor { box-shadow: inset 0 1px 0 #4b3a5c; background: repeating-linear-gradient(90deg, #3a2b48 0 15px, #30233d 15px 30px); }',
      '.night .badge { background: rgba(255,255,255,.12); box-shadow: inset 0 0 0 1px rgba(255,255,255,.14); }',
      '.night .detail { color: #ffffff; background: rgba(255,255,255,.12); box-shadow: inset 0 0 0 1px rgba(255,255,255,.2); }',
      '.night .detail:hover { background: rgba(255,255,255,.22); }',
      // show_background: false — no sky: the scene and the paving sit on the card, the texts and the round icon take the
      // theme's colours, as on the cards without an illustration. illustration: false — no banner: the plain header
      // (.titlebar), of its own height like on the other cards.
      '.banner.plain, .titlebar { background: none; --wall-text: var(--primary-text-color); --wall-muted: var(--secondary-text-color); }',
      ':where(.titlebar) { --st: #2f80ed; } .titlebar { position: relative; padding: 12px 14px 8px; }',
      '.titlebar .head { position: static; padding: 0; }',
      '.titlebar.with-detail { padding-right: 36px; }',
      '.plain .badge, .titlebar .badge { background: color-mix(in srgb, var(--st) 16%, transparent); box-shadow: none; }',
      '.plain .detail, .plain .detail:hover, .titlebar .detail, .titlebar .detail:hover { color: var(--secondary-text-color); background: none;' +
        ' -webkit-backdrop-filter: none; backdrop-filter: none; box-shadow: inset 0 0 0 1px var(--divider-color, rgba(127,127,127,.3)); }',
      '.plain .detail:hover, .titlebar .detail:hover { color: var(--primary-text-color); background: color-mix(in srgb, var(--secondary-text-color) 12%, transparent); }',
      '.banner .scene { position: absolute; right: 0; bottom: var(--floor-h); height: calc(100% - var(--floor-h));' +
        ' width: min(calc((var(--banner-h, 90px) - var(--floor-h)) * 2.5), var(--scene-max, 62%)); }',
      '.head { position: absolute; z-index: 1; left: 0; top: 0; bottom: var(--floor-h); box-sizing: border-box;' +
        ' right: min(calc((var(--banner-h, 90px) - var(--floor-h)) * 2.5), var(--scene-max, 62%));' +
        ' display: flex; align-items: center; gap: 10px; padding: 8px 8px 8px 14px; min-width: 0; color: var(--wall-text); }',
      // The full card's texts may run over the scene's light rays too (its left third), never over the saint.
      '@container (min-width: 301px) { .banner:not(.mini) .head { right: calc(min(calc((var(--banner-h, 90px) - var(--floor-h)) * 2.5), var(--scene-max, 62%)) * .66); } }',
      '.badge { width: 40px; height: 40px; flex: none; border-radius: 50%; display: grid; place-items: center; color: var(--st);' +
        ' background: rgba(255,255,255,.62); box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--st) 18%, transparent); }',
      '.badge ha-icon { --mdc-icon-size: 24px; }',
      '.titles { flex: 1 1 0; min-width: 0; overflow: hidden; display: flex; flex-wrap: wrap; align-items: center; column-gap: 8px;' +
        ' container: saint-titles / inline-size; }',
      '.titles > * { flex: 1 0 100%; min-width: 0; }',
      // The title (or the mini card's feast), then its status pill 8 px after it, centred on it, while the whole title
      // and the pill's whole label fit on that row; otherwise (measured by the card, see _fitPill) the title takes its
      // whole line and the pill goes under the subtitle (.below), its dot alone (.pill-dot) when even then the text
      // would leave the banner or run into the floor strip.
      '.trow { display: flex; align-items: center; gap: 8px; min-width: 0; }',
      '.trow .name { flex: 0 1 auto; min-width: 0; display: block; white-space: nowrap; text-overflow: ellipsis; }',
      '.pill { flex: none; display: inline-flex; align-items: center; gap: 4px; max-width: none; min-width: 0; box-sizing: border-box; padding: 1px 8px;' +
        ' border-radius: 12px; font-size: 11px; font-weight: 500; line-height: 16px; white-space: nowrap; overflow: hidden;' +
        ' background: color-mix(in srgb, var(--st) 18%, rgba(255,255,255,.78)); color: color-mix(in srgb, var(--st) 45%, #0d2a45); }',
      '.night .pill { background: color-mix(in srgb, var(--st) 30%, rgba(8,18,38,.55)); color: color-mix(in srgb, var(--st) 35%, #ffffff); }',
      '.plain .pill, .titlebar .pill { background: color-mix(in srgb, var(--st) 15%, transparent);' +
        ' color: color-mix(in srgb, var(--st) 50%, var(--primary-text-color)); }',
      '.pill .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--st); flex: none; }',
      '.pill .pt { min-width: 0; overflow: hidden; text-overflow: ellipsis; }',
      '.titles.below .trow { display: contents; }',
      '.titles.below .trow .name { flex: 1 0 100%; }',
      '.titles.below > .sub { order: 1; }',
      '.titles.below .pill { order: 2; margin-top: 2px; max-width: 100%; }',
      '.titles.pill-dot .pill { padding: 5px; }',
      '.titles.pill-dot .pill .pt { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }',
      // Under 200 px only the pill's dot shows (its text stays its tooltip and accessible name).
      '@container saint (max-width: 200px) { .titles .pill { padding: 5px; }' +
        ' .pill .pt { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); } }',
      ':host([hide-title]) :is(.banner, .titlebar):not(.mini) .name { display: none; }',
      // The title (or the mini card's feast) may take two lines, the line under it one.
      '.name { font-size: 16px; font-weight: 500; line-height: 20px; overflow: hidden; overflow-wrap: anywhere;' +
        ' display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; }',
      '.sub { font-size: 13px; line-height: 16px; color: var(--wall-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }',
      ':host([hide-title]) :is(.banner, .titlebar):not(.mini) .sub { font-size: 14px; color: var(--wall-text); }',
      ':is(.banner, .titlebar) .feast { cursor: pointer; border-radius: 6px; }',
      // ── The scene's animations ──
      '.scene .rose { transform-box: fill-box; transform-origin: center; animation: saint-turn 48s linear infinite; }',
      '.scene .ray { opacity: .2; animation: saint-ray 3s ease-in-out infinite; }',
      '.night .scene .r2 { fill: #ffd98a; }',
      '.scene .r2 { opacity: .35; animation-delay: -1.5s; }',
      '.scene .saint { transform-box: fill-box; transform-origin: 50% 100%; animation: saint-sway 6s ease-in-out infinite; }',
      '.scene .arm { transform-box: fill-box; transform-origin: 13% 13%; animation: saint-bless 6s ease-in-out infinite; }',
      '.scene .halo, .scene .glow, .scene .spark { transform-box: fill-box; transform-origin: center; }',
      '.scene .halo { animation: saint-glow 3s ease-in-out infinite; }',
      '.scene .flame { transform-box: fill-box; transform-origin: 50% 100%; animation: saint-flicker 1s ease-in-out infinite; }',
      '.scene .glow { animation: saint-glow 1s ease-in-out infinite; }',
      '.scene .c2 .flame, .scene .c2 .glow { animation-delay: -.5s; }',
      '.scene .spark { opacity: 0; animation: saint-twinkle 3s ease-in-out infinite; }',
      '.scene .s2 { animation-delay: -1s; } .scene .s3 { animation-delay: -2s; }',
      '@keyframes saint-turn { to { transform: rotate(360deg); } }',
      '@keyframes saint-ray { 50% { opacity: .38; } }',
      '@keyframes saint-sway { 25% { transform: rotate(1.5deg); } 75% { transform: rotate(-1.5deg); } }',
      // Arm down, raised to bless half way through the loop, then lowered.
      '@keyframes saint-bless { 0%, 45%, 100% { transform: none; } 60%, 80% { transform: rotate(-75deg); } }',
      '@keyframes saint-glow { 50% { transform: scale(1.12); fill-opacity: .5; } }',
      '@keyframes saint-flicker { 25% { transform: scale(.9, 1.1) rotate(4deg); } 50% { transform: scale(1.05, .92); } 75% { transform: scale(.95, 1.06) rotate(-4deg); } }',
      '@keyframes saint-twinkle { 50% { opacity: .9; transform: scale(1.2); } }',
      // ── Body: neutral, today's feast first, then the next days ──
      '.body { padding: 12px 12px 12px; }',
      '.body:empty { display: none; }',
      '.empty { padding: 0 4px; color: var(--secondary-text-color); }',
      '.body .feast { cursor: pointer; padding: 10px 12px; border-radius: 12px; background: color-mix(in srgb, var(--primary-text-color) 5%, transparent); }',
      '.feast:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }',
      '.label { font-size: 22px; font-weight: 500; line-height: 1.2; color: var(--primary-text-color); overflow-wrap: anywhere; }',
      `.wish { margin-top: 4px; font-size: 14px; color: color-mix(in srgb, ${SAINT_ACCENT} 60%, var(--primary-text-color)); overflow-wrap: anywhere; }`,
      '.section { margin: 12px 4px 4px; font-size: 12px; font-weight: 500; letter-spacing: .02em; color: var(--secondary-text-color); }',
      '.upcoming { list-style: none; margin: 0; padding: 0; }',
      '.upcoming li { display: flex; gap: 12px; align-items: baseline; padding: 6px 4px; border-top: 1px solid var(--divider-color, rgba(0,0,0,.12)); font-size: 14px; }',
      '.upcoming li:first-child { border-top: none; }',
      '.when { flex: none; min-width: 7.5em; color: var(--secondary-text-color); font-size: 13px; }',
      '.what { min-width: 0; color: var(--primary-text-color); overflow-wrap: anywhere; }',
      // A new feast (first draw, a new day) fades in, line after line.
      '.enter .label, .enter .wish, .enter .section, .enter li { animation: saint-in .5s ease-out both; }',
      '.enter .wish { animation-delay: .12s; } .enter .section { animation-delay: .2s; }',
      ...[1, 2, 3, 4, 5, 6, 7].map((n) => `.enter li:nth-child(${n}) { animation-delay: ${(0.2 + n * 0.07).toFixed(2)}s; }`),
      '@keyframes saint-in { from { opacity: 0; transform: translateY(6px); } }',
      '@media (prefers-reduced-motion: reduce) { .scene *, .enter * { animation: none !important; } }',
      '@container (max-width: 380px) { .banner:not(.mini) { --scene-max: 50%; } }',
      // A narrow card keeps the wall and the floor for its texts: no scenery.
      '@container (max-width: 300px) { .banner:not(.mini) .scene { display: none; } .banner:not(.mini) .head { right: 0; } .when { min-width: 0; } .upcoming li { flex-direction: column; gap: 0; } }',
      // ── Mini card: the same 90 px banner, today's feast laid on the sky, the detail button on frosted glass. ──
      ':host([mini])::before { grid-template-columns: minmax(0, 300px); }',
      '.banner.mini { --scene-max: 44%; }',
      // The feast's texts may run over the scene's light rays (its left part), never over the saint and the window.
      '.banner.mini .head { padding-right: 6px; right: calc(min(200px, var(--scene-max)) * .6); }',
      '.banner.mini .name { font-size: 16px; line-height: 20px; }',
      '@container (max-width: 280px) { .banner.mini .scene { display: none; } .banner.mini .head { right: 0; } .banner.mini .head { padding-right: 40px; } .banner.mini.with-detail .head { padding-right: 6px; } }',
      // The mini card's detail button gets its own strip of wall on the right, 5 px from the edges: the scene moves
      // aside so that the button never covers it.
      '.with-detail .scene { right: 36px; }',
      '.with-detail .head { margin-right: 36px; }',
      '.detail { all: unset; position: absolute; z-index: 2; top: 5px; right: 5px; cursor: pointer; width: 24px; height: 24px; border-radius: 50%;' +
        ' display: grid; place-items: center; color: #33506b; background: rgba(255,255,255,.55); box-shadow: inset 0 0 0 1px rgba(255,255,255,.7);' +
        ' -webkit-backdrop-filter: blur(4px); backdrop-filter: blur(4px); --mdc-icon-size: 16px; }',
      '.detail:hover { background: rgba(255,255,255,.75); }',
      '.detail:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 1px; }',
    ].join('\n');
  }
}

// A click inside Home Assistant's dialogs (more-info, confirmations) is not "outside" the card.
export function saintInDialog(ev) {
  return ev.composedPath().some((n) => ['ha-more-info-dialog', 'ha-dialog', 'dialog'].includes(n.localName));
}

// « A click elsewhere », caught on the pointer: iOS (Safari and the companion app) sends no click for a tap on
// something that is not clickable. It counts when the press and the release are both outside the card (a slider
// dragged out of it does not count, nor a scroll, which cancels the pointer); keyboard clicks (no click count) go
// through the click event.
export function saintWatchOutside(card, handler) {
  var downOutside = false;
  var outside = (ev) => !ev.composedPath().includes(card);
  var onDown = (ev) => {
    downOutside = outside(ev);
  };
  var onUp = (ev) => {
    if (downOutside && outside(ev)) handler(ev);
    downOutside = false;
  };
  var onClick = (ev) => {
    if (ev.detail === 0 && outside(ev)) handler(ev);
  };
  return {
    on() {
      document.addEventListener('pointerdown', onDown, true);
      document.addEventListener('pointerup', onUp, true);
      document.addEventListener('click', onClick, true);
    },
    off() {
      document.removeEventListener('pointerdown', onDown, true);
      document.removeEventListener('pointerup', onUp, true);
      document.removeEventListener('click', onClick, true);
    },
    // A tap (press and release at the same spot), for the tests.
    tap(ev) {
      onDown(ev);
      onUp(ev);
    },
  };
}
