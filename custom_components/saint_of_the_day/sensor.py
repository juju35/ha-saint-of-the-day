"""Sensors of the saint of the day and of tomorrow, updated at local midnight."""

from __future__ import annotations

from datetime import date, datetime, timedelta
from typing import Any

from homeassistant.components.sensor import SensorEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.event import async_track_time_change
from homeassistant.util import dt as dt_util

from .calendar_data import feast_of, upcoming
from .const import UPCOMING_DAYS
from .entity import SaintEntity


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry, async_add_entities: AddEntitiesCallback) -> None:
    async_add_entities([SaintSensor(entry, "today", 0), SaintSensor(entry, "tomorrow", 1)])


class SaintSensor(SaintEntity, SensorEntity):
    """The feast of today (offset 0) or tomorrow (offset 1): its label as the state, its first names as attributes."""

    def __init__(self, entry: ConfigEntry, key: str, offset: int) -> None:
        super().__init__(entry, key)
        self._offset = offset
        # The upcoming list only matters to the card: keep it out of the recorder.
        self._unrecorded_attributes = frozenset({"upcoming"})

    def _day(self) -> date:
        return dt_util.now().date() + timedelta(days=self._offset)

    async def async_added_to_hass(self) -> None:
        # Midnight in the Home Assistant time zone: the day, and so the feast, changes.
        self.async_on_remove(async_track_time_change(self.hass, self._midnight, hour=0, minute=0, second=0))

    @callback
    def _midnight(self, _now: datetime) -> None:
        self.async_write_ha_state()

    @property
    def native_value(self) -> str:
        return feast_of(self._day()).label

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        day = self._day()
        feast = feast_of(day)
        attributes: dict[str, Any] = {
            "date": day.isoformat(),
            "names": list(feast.names),
            "config_entry_id": self._entry.entry_id,
        }
        if self._offset == 0:
            attributes["upcoming"] = [f.as_dict() for f in upcoming(day, UPCOMING_DAYS)]
        return attributes
