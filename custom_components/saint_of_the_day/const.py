"""Constants for the Saint of the day integration."""

from __future__ import annotations

from typing import Final

DOMAIN: Final = "saint_of_the_day"
NAME: Final = "Saint of the day"

# Days listed in the `upcoming` attribute of the today sensor, read by the card.
UPCOMING_DAYS: Final = 7

FRONTEND_URL: Final = "/saint_of_the_day_static"
CARD_FILENAME: Final = "saint-of-the-day-card.js"
