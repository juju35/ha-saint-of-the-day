# Saint of the day Integration — Agent Context

## Purpose
Home Assistant custom integration: the French name day ("fête du jour", calendrier des Postes) of today and tomorrow.
Ships its own Lovelace card (`frontend/saint-of-the-day-card.js`), served by the integration itself.

## Architecture

```
custom_components/saint_of_the_day/
├── __init__.py          # Setup, card registration (Lovelace resources, add_extra_js_url in YAML mode)
├── calendar_data.py     # Reads data/saints.json once (executor), feast_of(date), upcoming(date, n)
├── data/saints.json     # 366 days keyed "MM-DD": {label, names}; names empty for a feast without first names
├── sensor.py            # today (+ `upcoming`, 7 days) and tomorrow sensors, refreshed at local midnight
├── entity.py            # Base entity (one service device), no polling
├── config_flow.py       # One confirmation step; manifest single_config_entry
├── diagnostics.py       # Time zone, today's feast, calendar size
├── const.py / icons.json / translations/*.json
└── frontend/saint-of-the-day-card.js   # Vanilla JS cards (saint-of-the-day-card, saint-of-the-day-mini-card), no dependencies
```

## Calendar
- `label` is the calendar text shown as the sensor state ("Ste Geneviève", "Sts Anne et Joachim", "Noël"); `names` are the first names wished that day.
- The day is `dt_util.now().date()`: the Home Assistant time zone. `async_track_time_change(hour=0, minute=0, second=0)` writes the state at local midnight.
- 29 February has its own entry; in a non-leap year 28 February is followed by 1 March naturally.

## Card
- Served from the `/saint_of_the_day_static` static path and added to the Lovelace resources at startup, URL versioned with the file's md5 (same code as ha-parcel).
- Finds the today sensor by its `upcoming` + `config_entry_id` attributes, else through `hass.entities` (`platform: saint_of_the_day`, `translation_key: today`).
- The wish joins the first names with `Intl.ListFormat` in the card's language; dates are parsed as local dates (never `Date.parse` on "YYYY-MM-DD").
- Redraws only when the sensor state object or the language changes.

## Release
The Marketplace installs `saint_of_the_day.zip` (`zip_release`), built from the split frontend. Before releasing, bump the version in manifest.json and `SAINT_CARD_VERSION` in the card, and add the CHANGELOG.md section. Pushing to main publishes release `vX.Y.Z` when that tag doesn't exist yet.

## Tests
`pip install -r requirements_test.txt && pytest`; card: `node --test test/*.test.mjs` (the card file is evaluated in a `vm` context with a minimal fake DOM).

## Translations
Same split as the other ha-* integrations: `scripts/split-frontend.mjs` runs in the release, English stays in the card, every other language goes to `<file>.i18n.<lang>.js`.
