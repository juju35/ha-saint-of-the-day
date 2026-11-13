"""Diagnostics for Saint of the day: the day the integration sees, its feast and the time zone."""

from __future__ import annotations

from typing import Any

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.util import dt as dt_util

from .calendar_data import feast_of, load_calendar


async def async_get_config_entry_diagnostics(hass: HomeAssistant, entry: ConfigEntry) -> dict[str, Any]:
    today = dt_util.now().date()
    return {
        "time_zone": hass.config.time_zone,
        "today": feast_of(today).as_dict(),
        "calendar_days": await hass.async_add_executor_job(load_calendar),
    }
