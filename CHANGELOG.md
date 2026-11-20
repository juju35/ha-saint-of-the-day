# Changelog

## 1.3.2 - 2026-11-20

### Fixes
- Mini card: a tap elsewhere on the page folds it back on iOS too (Safari and the companion app send no click for a tap on something that is not clickable), and leaving the page (another dashboard view, a conditional card hidden) brings it back compact.
- Sensors: the base entity's `async_added_to_hass` is called.

### Maintenance
- Tests: the coverage of the card is now measured (`node --test --experimental-test-coverage`).
- README: the options table says which card each option applies to, like the other cards.

## 1.3.1 - 2026-11-18

### Fixes
- Illustrated header: `auto` now follows the Home Assistant theme alone — a light theme keeps the day picture after sunset, a dark theme still shows the night one.

## 1.3.0 - 2026-11-17

### Features
- The illustrated header takes the look shared by the other cards with a scene: 90 px high on the full and the mini card, the title on a sky, the saint in front of the rose window on the right (same scene and animations), and a 10 px strip of the chapel's lavender paving stones edge to edge at the bottom.
- Day and night: the sky turns to night when the sun is below the horizon or with a dark theme (even while the sun is up); `illustration_theme: day | night` forces it (both cards, visual editor).
- The round calendar icon shows the status: accent when today's feast is known, grey when the sensor is unavailable, red when no sensor is found; without a feast the scene rests, greyed and still.
- `illustration: false` keeps a classic header, without the scene (both cards, visual editor).
- A status pill right after the title (or the feast on the compact mini card), in the round icon's colour: *Today*, *Unavailable* or *Not found* (beside the title only while the whole title and the pill's whole label fit on that row, measured in the real fonts so in every language; otherwise on its own line under a one-line subtitle, only its dot when even that would not fit above the floor strip and below 200 px), on both cards, with or without the illustration. The mini card's detail button is the small frosted round button in the banner's top right corner.

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
