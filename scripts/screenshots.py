"""Render the Saint of the day card with a mock sensor and save the README screenshots.

Usage: python scripts/screenshots.py  (needs `pip install playwright pillow` and `playwright install chromium`;
CHROMIUM_PATH=/path/to/chrome to use another browser)
A screenshot is rewritten only when its decoded pixels change, so a re-render never commits identical images.
The mock day is 26 July 2026 (Sts Anne et Joachim, two first names), read from the integration's calendar file.
"""

import json
import os
import shutil
import tempfile
from datetime import date, timedelta
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
COMPONENT = ROOT / "custom_components/saint_of_the_day"
CARD_JS = (COMPONENT / "frontend/saint-of-the-day-card.js").read_text()
CALENDAR = json.loads((COMPONENT / "data/saints.json").read_text(encoding="utf-8"))
DAY = date(2026, 7, 26)
NOW = "2026-07-26T09:00:00+02:00"
WIDTH = 400
THEMES = {
    "light": {
        "--primary-background-color": "#e8eaed",
        "--secondary-background-color": "#ececec",
        "--card-background-color": "#ffffff",
        "--primary-text-color": "#212121",
        "--secondary-text-color": "#727272",
        "--divider-color": "rgba(0,0,0,.12)",
    },
    "dark": {
        "--primary-background-color": "#111111",
        "--secondary-background-color": "#282828",
        "--card-background-color": "#1c1c1c",
        "--primary-text-color": "#e1e1e1",
        "--secondary-text-color": "#9b9b9b",
        "--divider-color": "rgba(225,225,225,.12)",
    },
}
COMMON = {
    "--primary-color": "#03a9f4",
    "--info-color": "#039be5",
    "--success-color": "#43a047",
    "--warning-color": "#ffa600",
    "--error-color": "#db4437",
    "--disabled-text-color": "#9e9e9e",
    "--text-primary-color": "#ffffff",
}

# Material Design Icons used by the card (@mdi/js).
ICONS = {
    "calendar-star": "M19 19H5V8H19M16 1V3H8V1H6V3H5C3.9 3 3 3.9 3 5V19C3 20.11 3.9 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.9 20.11 3 19 3H18V1M10.88 12H7.27L10.19 14.11L9.08 17.56L12 15.43L14.92 17.56L13.8 14.12L16.72 12H13.12L12 8.56L10.88 12Z",
    "arrow-expand": "M10,21V19H6.41L10.91,14.5L9.5,13.09L5,17.59V14H3V21H10M14.5,10.91L19,6.41V10H21V3H14V5H17.59L13.09,9.5L14.5,10.91Z",
    "arrow-collapse": "M19.5,3.09L15,7.59V4H13V11H20V9H16.41L20.91,4.5L19.5,3.09M4,13V15H7.59L3.09,19.5L4.5,20.91L9,16.41V20H11V13H4Z",
}

# Minimal stand-ins for Home Assistant's <ha-card>, <ha-icon> and <ha-icon-button>.
HA_ELEMENTS = """
const ICONS = %s;
customElements.define("ha-card", class extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML =
      "<style>:host{display:block;background:var(--card-background-color);border-radius:12px;" +
      "border:1px solid var(--divider-color);color:var(--primary-text-color);overflow:hidden}</style><slot></slot>";
  }
});
customElements.define("ha-icon", class extends HTMLElement {
  connectedCallback() {
    const path = ICONS[(this.getAttribute("icon") || "").replace("mdi:", "")] || "";
    this.style.display = "inline-flex";
    this.innerHTML = '<svg viewBox="0 0 24 24" style="width:var(--mdc-icon-size,24px);height:var(--mdc-icon-size,24px);fill:currentColor"><path d="' + path + '"/></svg>';
  }
});
customElements.define("ha-icon-button", class extends HTMLElement {
  connectedCallback() {
    this.style.cssText = "display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;color:var(--secondary-text-color)";
  }
});
""" % json.dumps(ICONS)  # noqa: UP031 - percent-format keeps the embedded JS braces un-escaped


def feast(day):
    entry = CALENDAR[day.strftime("%m-%d")]
    return {"date": day.isoformat(), "label": entry["label"], "names": entry["names"]}


TODAY = feast(DAY)
STATES = {
    "sensor.saint_of_the_day_today": {
        "entity_id": "sensor.saint_of_the_day_today",
        "state": TODAY["label"],
        "attributes": {
            "date": TODAY["date"],
            "names": TODAY["names"],
            "config_entry_id": "mock",
            "upcoming": [feast(DAY + timedelta(days=i)) for i in range(1, 8)],
            "friendly_name": "Saint of the day",
        },
    },
}

SHOTS = [
    {"file": "card", "theme": "light", "lang": "en", "config": {}},
    {"file": "card-dark", "theme": "dark", "lang": "en", "config": {}},
    {
        "file": "mini-card",
        "theme": "light",
        "lang": "en",
        "element": "saint-of-the-day-mini-card",
        "width": 260,
        "config": {},
    },
    {
        "file": "mini-card-dark",
        "theme": "dark",
        "lang": "en",
        "element": "saint-of-the-day-mini-card",
        "width": 260,
        "config": {},
    },
    # The card in French, its home language: the date and the wish follow the card's language.
    {"file": "card-fr", "theme": "light", "lang": "fr", "config": {"upcoming_days": 5}},
    {"file": "card-fr-dark", "theme": "dark", "lang": "fr", "config": {"upcoming_days": 5}},
]


def _frames(path):
    """Decoded RGBA pixels of every frame, with each frame's duration: what the image looks like, not its bytes."""
    from PIL import Image, ImageSequence

    with Image.open(path) as image:
        return [
            (frame.info.get("duration"), frame.convert("RGBA").size, frame.convert("RGBA").tobytes())
            for frame in ImageSequence.Iterator(image)
        ]


def replace_if_changed(new, out):
    """Move the fresh render `new` onto `out` only when its pixels differ (or `out` is missing); return whether
    `out` changed. Encoders do not give the same bytes twice for the same image, which made the screenshots
    workflow commit images that looked exactly the same."""
    new, out = Path(new), Path(out)
    if out.exists() and _frames(new) == _frames(out):
        new.unlink()
        return False
    shutil.move(str(new), str(out))
    return True


def page_html(theme, width=WIDTH):
    variables = "".join(f"{k}:{v};" for k, v in {**THEMES[theme], **COMMON}.items())
    return f"""<!doctype html><html><head><meta charset="utf-8"><style>
  :root {{ {variables} }}
  body {{ margin: 0; padding: 16px; background: var(--primary-background-color); color: var(--primary-text-color);
         font-family: Roboto, "Segoe UI", Helvetica, Arial, sans-serif; width: {width}px; }}
</style></head><body><div id="root"></div></body></html>"""


def mount(context, shot):
    # A new page per capture: the card's top-level declarations would clash in a reused page.
    page = context.new_page()
    page.on("pageerror", lambda err, name=shot["file"]: print(f"{name}: page error: {err}"))
    page.clock.set_fixed_time(NOW)
    page.set_content(page_html(shot["theme"], shot.get("width", WIDTH)))
    page.add_script_tag(content=HA_ELEMENTS)
    page.add_script_tag(content=CARD_JS)
    page.evaluate(
        """({config, states, lang, element}) => {
          const el = document.createElement(element);
          el.setConfig({type: `custom:${element}`, ...config});
          el.hass = {states, language: lang, locale: {language: lang}};
          document.getElementById("root").appendChild(el);
        }""",
        {
            "config": shot["config"],
            "states": STATES,
            "lang": shot["lang"],
            "element": shot.get("element", "saint-of-the-day-card"),
        },
    )
    return page


def main():
    out_dir = ROOT / "screenshots"
    out_dir.mkdir(exist_ok=True)
    # Imported here: the file helpers above (and their tests) do not need Playwright.
    from playwright.sync_api import sync_playwright

    with sync_playwright() as p:
        chromium = os.environ.get("CHROMIUM_PATH")
        browser = p.chromium.launch(executable_path=chromium) if chromium else p.chromium.launch()
        context = browser.new_context(
            device_scale_factor=2, viewport={"width": 1000, "height": 2400}, timezone_id="Europe/Paris"
        )
        for shot in SHOTS:
            page = mount(context, shot)
            page.wait_for_timeout(300)
            # The card with the 16 px page padding around it, on the theme background.
            box = page.locator("#root").bounding_box()
            with tempfile.TemporaryDirectory() as tmp:
                fresh = Path(tmp) / f"{shot['file']}.png"
                page.screenshot(
                    path=str(fresh),
                    clip={
                        "x": 0,
                        "y": 0,
                        "width": shot.get("width", WIDTH) + 32,
                        "height": int(box["height"] + 0.999) + 32,
                    },
                    animations="disabled",
                )
                changed = replace_if_changed(fresh, out_dir / f"{shot['file']}.png")
            print(f"screenshots/{shot['file']}.png" + ("" if changed else " (unchanged)"))
            page.close()
        browser.close()


if __name__ == "__main__":
    main()
