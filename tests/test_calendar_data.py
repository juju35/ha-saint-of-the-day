"""The embedded calendar covers every day of a leap year, each with a label and well-formed first names."""

import json
from datetime import date, timedelta

from custom_components.saint_of_the_day.calendar_data import DATA_FILE, feast_of, load_calendar, upcoming


def test_every_day_of_a_leap_year_has_a_feast():
    assert load_calendar() == 366
    day = date(2028, 1, 1)
    while day.year == 2028:
        feast = feast_of(day)
        assert feast.label.strip(), day
        assert all(name.strip() and name == name.strip() for name in feast.names), day
        day += timedelta(days=1)


def test_the_file_has_no_extra_or_duplicate_day():
    data = json.loads(DATA_FILE.read_text(encoding="utf-8"))
    leap = {(date(2028, 1, 1) + timedelta(days=i)).strftime("%m-%d") for i in range(366)}
    assert set(data) == leap
    for key, entry in data.items():
        assert set(entry) == {"label", "names"}, key


def test_well_known_days():
    assert feast_of(date(2026, 1, 3)).label == "Ste Geneviève"
    assert feast_of(date(2026, 2, 14)).names == ("Valentin",)
    assert feast_of(date(2028, 2, 29)).names == ("Auguste",)
    assert feast_of(date(2026, 12, 25)).names == ()
    assert feast_of(date(2026, 7, 26)).names == ("Anne", "Joachim")


def test_upcoming_crosses_month_year_and_leap_day():
    assert [f.day for f in upcoming(date(2026, 12, 30), 3)] == [date(2026, 12, 31), date(2027, 1, 1), date(2027, 1, 2)]
    # 29 February only in a leap year.
    assert [f.day.day for f in upcoming(date(2027, 2, 27), 2)] == [28, 1]
    assert [f.day.day for f in upcoming(date(2028, 2, 27), 2)] == [28, 29]
    assert upcoming(date(2026, 1, 1), 0) == []


def test_as_dict():
    assert feast_of(date(2026, 1, 3)).as_dict() == {
        "date": "2026-01-03",
        "label": "Ste Geneviève",
        "names": ["Geneviève"],
    }
