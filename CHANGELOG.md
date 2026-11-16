# Changelog

## 1.2.0 - 2026-11-17

### Features
- `show_background` option (both cards, visual editor): `false` removes the chapel wall from the illustrated header — the scene and its paved floor sit on the card, the texts and the round icon take the theme's colours.

### Fixes
- Mini card: the detail / fold button covered the scene's right column, folded and unfolded. It now has its own strip of wall at the top right, 8 px from the edges, the scene moved aside.
- The banner's title (or the mini card's feast) may take two lines instead of being cut short, and below 380 px the full card's scene takes less room.

## 1.1.1 - 2026-11-16

### Fixes
- The illustrated header follows Home Assistant's dark mode: night falls in the chapel — the wall and the floor darken, the texts turn light, the round icon and the detail button take a smoked glass, the rose window and the candles glow.

## 1.1.0 - 2026-11-16

### Features
- Illustrated header, like the other cards with a scene: a chapel wall across the card with its paved floor, the project's round icon and the texts on the left, and on the right a saint in front of a rose window — the saint sways and raises a hand to bless under a glowing halo, the window turns slowly, its light breathes and two candles flicker.
- The compact mini card is a lower banner of the same scene, with today's feast and the wish laid on it and the detail button on frosted glass.
- Today's feast sits on a neutral tile; a new feast (first display, a new day) fades in line after line.
- The animations stop when the system asks for reduced motion.

### Maintenance
- The screenshots script also renders one GIF per animation (full card and mini card, light and dark), from frames taken with the animations paused at fixed times.

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
