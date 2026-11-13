"""The French calendar of name days, embedded in data/saints.json: no external API."""

from __future__ import annotations

import json
from dataclasses import dataclass
from datetime import date, timedelta
from functools import cache
from pathlib import Path

DATA_FILE = Path(__file__).parent / "data" / "saints.json"


@dataclass(frozen=True, slots=True)
class Feast:
    """The calendar entry of a day: its label ("Ste Geneviève", "Noël") and the first names wished that day."""

    day: date
    label: str
    names: tuple[str, ...]

    def as_dict(self) -> dict[str, object]:
        return {"date": self.day.isoformat(), "label": self.label, "names": list(self.names)}


@cache
def _calendar() -> dict[str, dict[str, object]]:
    """366 days keyed "MM-DD", read once (in the executor at setup: see async_load_calendar)."""
    return json.loads(DATA_FILE.read_text(encoding="utf-8"))


def load_calendar() -> int:
    """Read the calendar file; return the number of days. Blocking: run it in the executor."""
    return len(_calendar())


def feast_of(day: date) -> Feast:
    """The feast of a day. 29 February has its own saint; every other day too."""
    entry = _calendar()[day.strftime("%m-%d")]
    return Feast(day, str(entry["label"]), tuple(entry["names"]))  # type: ignore[arg-type]


def upcoming(day: date, count: int) -> list[Feast]:
    """The feasts of the `count` days after `day`."""
    return [feast_of(day + timedelta(days=i)) for i in range(1, count + 1)]
