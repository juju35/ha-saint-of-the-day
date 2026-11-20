"""State updates patch the cards in place (rendered in Chromium): an update of another entity changes nothing in
their shadow DOM, a new state object of the sensor keeps every node (no innerHTML rebuild of the illustration and the
feast, so nothing shows anew for a frame and the Sections view does not reflow, the page jumping by itself), and the
cards' height does not move."""

import importlib.util
from pathlib import Path

import pytest

SCRIPT = Path(__file__).resolve().parent.parent / "scripts" / "screenshots.py"

RUN = """async ({next, n}) => {
  const make = new Function('hass', 'i', next);
  const el = document.querySelector('#root').firstElementChild;
  const raf = () => new Promise((r) => requestAnimationFrame(() => r()));
  const stats = {removed: 0, mutations: 0, heights: new Set()};
  const o = new MutationObserver((recs) => {
    for (const r of recs) {
      stats.mutations++;
      if (r.type === 'childList') stats.removed += r.removedNodes.length;
    }
  });
  o.observe(el.shadowRoot, {childList: true, subtree: true, attributes: true, characterData: true});
  let on = true;
  (async () => {
    while (on) {
      stats.heights.add(Math.round(el.getBoundingClientRect().height));
      await raf();
    }
  })();
  for (let k = 0; k < n; k++) {
    el.hass = make(el._hass, k);
    await raf();
    await raf();
  }
  on = false;
  o.disconnect();
  return {removed: stats.removed, mutations: stats.mutations, heights: [...stats.heights]};
}"""

OTHER = (
    "return {...hass, states: {...hass.states, 'sensor.elsewhere': "
    "{entity_id: 'sensor.elsewhere', state: String(i), attributes: {}}}};"
)
OWN = (
    "const id = 'sensor.saint_of_the_day_today'; "
    "return {...hass, states: {...hass.states, [id]: {...hass.states[id], last_updated: String(i)}}};"
)


@pytest.mark.parametrize("element", ["saint-of-the-day-card", "saint-of-the-day-mini-card"])
def test_state_updates_patch_the_card_in_place(element):
    spec = importlib.util.spec_from_file_location("saint_screenshots", SCRIPT)
    script = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(script)
    sync_api = pytest.importorskip("playwright.sync_api")
    with sync_api.sync_playwright() as p:
        try:
            browser = p.chromium.launch()
        except Exception as err:  # noqa: BLE001 - no browser installed here
            pytest.skip(f"no Chromium: {err}")
        page = script.mount(
            browser.new_context(), {"file": "x", "theme": "light", "lang": "fr", "element": element, "config": {}}
        )
        page.wait_for_timeout(300)
        other = page.evaluate(RUN, {"next": OTHER, "n": 6})
        own = page.evaluate(RUN, {"next": OWN, "n": 6})
        browser.close()
    assert other["mutations"] == 0, other
    assert other["heights"] == own["heights"][:1], (other, own)
    assert own["removed"] == 0, own
    assert len(own["heights"]) == 1, own
