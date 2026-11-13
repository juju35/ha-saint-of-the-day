# Changelog

## 1.0.0 - 2026-11-13

### Features
- **Saint of the day** and **Saint of tomorrow** sensors: the French name day (calendar label as the state, first names, date), updated at local midnight. The today sensor also lists the next 7 days in its `upcoming` attribute.
- The 366-day calendar (29 February included) is embedded in the integration: no external API, no account, no polling.
- `custom:saint-of-the-day-card`, **shipped with the integration** and loaded automatically: today's feast with a name day wish, the date, and the next days (`upcoming_days`, 0 to 7). A click on the feast opens the sensor's details.
- `custom:saint-of-the-day-mini-card`: today's feast only, with a button to open the full card in place.
- Visual editor for both cards.
- Single config entry, nothing to set up.
- Diagnostics download (time zone and the day the integration sees).
- English, French, German, Spanish, Serbian (Cyrillic and Latin), Italian, Dutch, Portuguese, Polish, Romanian, Danish, Swedish, Bulgarian, Russian, Ukrainian, Hungarian, Slovak, Czech, Slovenian, Latvian and Greek. In the release zip, the card keeps English only and loads the other languages on demand.
