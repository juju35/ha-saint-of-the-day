// ── saint-of-the-day-mini-card ────────────────────────────────────────────────
// Today's feast only. Its detail button (top right) switches to the full card and back; a click outside the card
// folds it back to the compact view.
import { saintEsc } from "./i18n-helpers.js";
import { SaintCard, saintInDialog, saintWatchOutside } from "./card.js";

export class SaintMiniCard extends SaintCard {
  constructor() {
    super();
    this._zoomed = false;
    this._onOutsideMini = (ev) => {
      if (this._zoomed && !ev.composedPath().includes(this) && !saintInDialog(ev)) this._setZoom(false);
    };
  }

  connectedCallback() {
    super.connectedCallback();
    (this._miniWatch = this._miniWatch || saintWatchOutside(this, this._onOutsideMini)).on();
    // Back on the page after leaving it: drawn again, compact.
    if (this._left && this._hass && this._config) this._render();
    this._left = false;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._miniWatch?.off();
    // Left (another dashboard view, a conditional card hidden): back to the compact view.
    this._left = true;
    this._zoomed = false;
  }

  setConfig(config) {
    this.setAttribute?.('mini', '');
    super.setConfig(config);
  }

  getCardSize() {
    return this._zoomed ? super.getCardSize() : 2;
  }

  getGridOptions() {
    return this._zoomed ? super.getGridOptions() : { columns: 6, min_columns: 4, rows: 'auto' };
  }

  _compact() {
    return !this._zoomed;
  }

  _detailButton(t) {
    var label = this._zoomed ? t.show_compact : t.show_full;
    return (
      `<button class="detail" title="${saintEsc(label)}" aria-label="${saintEsc(label)}">` +
      `<ha-icon icon="mdi:${this._zoomed ? 'arrow-collapse' : 'arrow-expand'}"></ha-icon></button>`
    );
  }

  _toggleDetail(ev) {
    ev.stopPropagation();
    this._setZoom(!this._zoomed);
    // Keyboard use (Enter / Space: no click count) keeps the focus on the button, without scrolling the page.
    if (!ev.detail) this._root.querySelector('.detail')?.focus?.({ preventScroll: true });
  }

  _setZoom(zoomed) {
    this._zoomed = zoomed;
    this._render();
  }

  _render() {
    super._render();
    this._root?.querySelector('ha-card')?.classList.toggle('mini', this._compact());
  }
}
