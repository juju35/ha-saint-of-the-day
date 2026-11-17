"""The card keeps a width in auto-sized containers and still shrinks in a `1fr 1fr` grid (rendered in Chromium)."""

import importlib.util
from pathlib import Path

import pytest

SCRIPT = Path(__file__).resolve().parent.parent / "scripts" / "screenshots.py"

# Places the card (and a twin in the grids) in the given container, directly or wrapped in a <div>, and measures.
PLACE = """({ctx, wrap, width}) => {
  const card = document.querySelector('saint-of-the-day-card');
  const box = document.createElement('div');
  if (ctx === 'inline-block') box.style.display = 'inline-block';
  else if (ctx === 'grid-auto')
    Object.assign(box.style, {display: 'grid', gridTemplateColumns: 'auto', justifyContent: 'start'});
  else
    Object.assign(box.style, {display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', width: width + 'px'});
  document.body.style.width = 'auto';
  document.body.appendChild(box);
  const cards = [card];
  if (ctx === 'grid-1fr') {
    const twin = document.createElement('saint-of-the-day-card');
    twin.setConfig({type: 'custom:saint-of-the-day-card'});
    cards.push(twin);
  }
  for (const c of cards) {
    if (!wrap) { box.appendChild(c); continue; }
    const div = document.createElement('div');
    div.appendChild(c);
    box.appendChild(div);
  }
  document.getElementById('root').remove();
  for (const c of cards) if (c !== card) c.hass = card._hass;
  const b = box.getBoundingClientRect();
  return {box: b.width, scroll: box.scrollWidth, cards: cards.map((c) => {
    const r = c.shadowRoot.querySelector('ha-card').getBoundingClientRect();
    return {width: r.width, right: r.right - b.left};
  })};
}"""

CASES = [
    ("inline-block", False, None),
    ("inline-block", True, None),
    ("grid-auto", False, None),
    ("grid-auto", True, None),
    *[("grid-1fr", wrap, width) for wrap in (False, True) for width in (320, 360, 500)],
]


def test_the_card_width_in_intrinsic_and_shared_containers():
    """container-type: inline-size left the card at a few pixels in an inline-block or a grid `auto` column;
    contain-intrinsic-inline-size fixed that but gave the card a 320 px minimum: in a `1fr 1fr` grid it refused to
    shrink and overflowed by up to 332 px (two 322 px cards in 320 px), wrapped in a div or not."""
    spec = importlib.util.spec_from_file_location("saint_screenshots", SCRIPT)
    script = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(script)
    sync_api = pytest.importorskip("playwright.sync_api")
    failures = []
    with sync_api.sync_playwright() as p:
        try:
            browser = p.chromium.launch()
        except Exception as err:  # noqa: BLE001 - no browser installed here
            pytest.skip(f"no Chromium: {err}")
        for ctx, wrap, width in CASES:
            page = script.mount(browser.new_context(), {"file": "x", "theme": "light", "lang": "en", "config": {}})
            out = page.evaluate(PLACE, {"ctx": ctx, "wrap": wrap, "width": width or 0})
            page.close()
            cards = out["cards"]
            if ctx == "grid-1fr":
                ok = out["scroll"] <= out["box"] and all(
                    c["right"] <= out["box"] + 0.5 and c["width"] >= (width - 8) / 2 - 0.5 for c in cards
                )
            else:
                ok = cards[0]["width"] >= 300  # its preferred width, not a few pixels
            if not ok:
                failures.append((ctx, "in a div" if wrap else "direct", width, out))
        browser.close()
    assert not failures, failures


# The status pill (rendered in Chromium): en, fr, de, hu, el and ru from 190 to 500 px, the card's own title and a
# long one, the full card and the mini card compact and expanded. The pill sits right after the title only beside a
# whole title, its label is whole or it shows its dot alone (always its dot alone at 200 px or less), and nothing of
# the title block leaves the banner or reaches its floor strip.
AUDIT = (Path(__file__).resolve().parent / "pill_audit.js").read_text()

PILL = """async ({audit, width}) => {
  const pillAudit = new Function(`${audit}; return pillAudit;`)();
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  const el = document.querySelector('#root').firstElementChild;
  return pillAudit(el.shadowRoot, width, '.banner .trow > .pill', '.name', '.floor');
}"""


def test_the_status_pill_beside_a_whole_title_or_under_the_subtitle():
    """The pill used to sit beside a title cut down to four letters, or under it below a fixed width: it is now placed
    by measure, so a long title or a long translated label never ends in an ellipsis next to it."""
    spec = importlib.util.spec_from_file_location("saint_screenshots", SCRIPT)
    script = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(script)
    sync_api = pytest.importorskip("playwright.sync_api")
    failures = []
    with sync_api.sync_playwright() as p:
        try:
            browser = p.chromium.launch()
        except Exception as err:  # noqa: BLE001 - no browser installed here
            pytest.skip(f"no Chromium: {err}")
        context = browser.new_context()
        for element, zoom in (
            ("saint-of-the-day-card", False),
            ("saint-of-the-day-mini-card", False),
            ("saint-of-the-day-mini-card", True),
        ):
            for lang in ("en", "fr", "de", "hu", "el", "ru"):
                for width in (190, 245, 300, 400, 460, 500):
                    for title in (None, "Saint of the day in our family calendar"):
                        shot = {"file": "x", "theme": "light", "lang": lang, "element": element, "width": width}
                        shot |= {"zoom": zoom, "config": {"title": title} if title else {}}
                        page = script.mount(context, shot)
                        what = f"{element}{' zoomed' if zoom else ''} {lang} {width}px {title or ''}"
                        issues = page.evaluate(PILL, {"audit": AUDIT, "width": width})
                        failures.extend(f"{what}: {issue}" for issue in issues)
                        page.close()
        browser.close()
    assert not failures, failures
