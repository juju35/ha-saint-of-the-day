"""Tests for the Saint of the day integration: config flow, sensors, midnight update, card resource."""

from datetime import datetime
from types import SimpleNamespace

import pytest
from freezegun.api import FrozenDateTimeFactory
from homeassistant import config_entries
from homeassistant.config_entries import ConfigEntryState
from homeassistant.core import HomeAssistant
from homeassistant.data_entry_flow import FlowResultType
from homeassistant.helpers import entity_registry as er
from homeassistant.setup import async_setup_component
from homeassistant.util import dt as dt_util
from pytest_homeassistant_custom_component.common import MockConfigEntry, async_fire_time_changed

from custom_components.saint_of_the_day import _async_register_card, _lovelace_resources
from custom_components.saint_of_the_day.const import DOMAIN, UPCOMING_DAYS
from custom_components.saint_of_the_day.diagnostics import async_get_config_entry_diagnostics

TODAY = "sensor.saint_of_the_day_saint_of_the_day"
TOMORROW = "sensor.saint_of_the_day_saint_of_tomorrow"


@pytest.fixture
async def paris(hass: HomeAssistant):
    await hass.config.async_set_time_zone("Europe/Paris")


@pytest.fixture
def entry(hass: HomeAssistant) -> MockConfigEntry:
    entry = MockConfigEntry(domain=DOMAIN, data={}, title="Saint of the day")
    entry.add_to_hass(hass)
    return entry


def _resources(hass):
    lovelace = hass.data["lovelace"]
    return lovelace["resources"] if isinstance(lovelace, dict) else lovelace.resources


async def _setup(hass, entry):
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()


async def test_config_flow_creates_a_single_entry(hass: HomeAssistant) -> None:
    result = await hass.config_entries.flow.async_init(DOMAIN, context={"source": config_entries.SOURCE_USER})
    assert result["type"] is FlowResultType.FORM
    assert result["step_id"] == "user"
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {})
    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert result["title"] == "Saint of the day"
    assert result["data"] == {}
    await hass.async_block_till_done()

    again = await hass.config_entries.flow.async_init(DOMAIN, context={"source": config_entries.SOURCE_USER})
    assert again["type"] is FlowResultType.ABORT
    assert again["reason"] == "single_instance_allowed"


async def test_sensors_show_today_and_tomorrow(
    hass: HomeAssistant, paris, entry: MockConfigEntry, freezer: FrozenDateTimeFactory
) -> None:
    freezer.move_to(datetime(2026, 7, 26, 10, 0, tzinfo=dt_util.get_time_zone("Europe/Paris")))
    await _setup(hass, entry)
    assert entry.state is ConfigEntryState.LOADED

    today = hass.states.get(TODAY)
    assert today.state == "Sts Anne et Joachim"
    assert today.attributes["date"] == "2026-07-26"
    assert today.attributes["names"] == ["Anne", "Joachim"]
    assert today.attributes["config_entry_id"] == entry.entry_id
    assert len(today.attributes["upcoming"]) == UPCOMING_DAYS
    assert today.attributes["upcoming"][0] == {"date": "2026-07-27", "label": "Ste Nathalie", "names": ["Nathalie"]}

    tomorrow = hass.states.get(TOMORROW)
    assert tomorrow.state == "Ste Nathalie"
    assert tomorrow.attributes["date"] == "2026-07-27"
    assert "upcoming" not in tomorrow.attributes

    registry = er.async_get(hass)
    assert registry.async_get(TODAY).translation_key == "today"
    assert registry.async_get(TOMORROW).translation_key == "tomorrow"


async def test_the_feast_changes_at_local_midnight(
    hass: HomeAssistant, paris, entry: MockConfigEntry, freezer: FrozenDateTimeFactory
) -> None:
    tz = dt_util.get_time_zone("Europe/Paris")
    freezer.move_to(datetime(2026, 12, 31, 23, 59, 50, tzinfo=tz))
    await _setup(hass, entry)
    assert hass.states.get(TODAY).state == "St Sylvestre"
    assert hass.states.get(TOMORROW).state == "Ste Marie, Mère de Dieu"

    midnight = datetime(2027, 1, 1, 0, 0, 0, tzinfo=tz)
    freezer.move_to(midnight)
    async_fire_time_changed(hass, midnight)
    await hass.async_block_till_done()
    assert hass.states.get(TODAY).state == "Ste Marie, Mère de Dieu"
    assert hass.states.get(TODAY).attributes["date"] == "2027-01-01"
    assert hass.states.get(TOMORROW).state == "St Basile"


async def test_unload(hass: HomeAssistant, entry: MockConfigEntry) -> None:
    await _setup(hass, entry)
    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()
    assert entry.state is ConfigEntryState.NOT_LOADED


async def test_card_added_to_lovelace_resources_once(hass: HomeAssistant, entry: MockConfigEntry) -> None:
    assert await async_setup_component(hass, "lovelace", {})
    await _setup(hass, entry)
    await hass.async_start()
    await hass.async_block_till_done()
    items = [i for i in _resources(hass).async_items() if "saint-of-the-day-card.js" in i["url"]]
    assert len(items) == 1
    assert items[0]["url"].startswith("/saint_of_the_day_static/saint-of-the-day-card.js?v=")

    # A stale version is updated in place, duplicates removed.
    resources = _resources(hass)
    await resources.async_update_item(
        items[0]["id"], {"res_type": "module", "url": items[0]["url"].split("?")[0] + "?v=old"}
    )
    await resources.async_create_item(
        {"res_type": "module", "url": "/saint_of_the_day_static/saint-of-the-day-card.js?v=dup"}
    )
    await _async_register_card(hass)
    await hass.async_block_till_done()
    items = [i for i in resources.async_items() if "saint-of-the-day-card.js" in i["url"]]
    assert len(items) == 1
    assert not items[0]["url"].endswith("v=old")


async def test_card_loaded_on_every_page_in_yaml_mode(hass: HomeAssistant, stub_frontend) -> None:
    hass.data["lovelace"] = {"resources": None, "mode": "yaml"}
    await _async_register_card(hass)
    assert stub_frontend.called
    assert "saint-of-the-day-card.js?v=" in stub_frontend.call_args[0][1]


def test_lovelace_resources_across_versions() -> None:
    assert _lovelace_resources({"resources": "r", "mode": "yaml"}) == ("r", "yaml")
    assert _lovelace_resources({"resources": "r", "resource_mode": "storage"}) == ("r", "storage")
    assert _lovelace_resources(SimpleNamespace(resources="r", mode="storage")) == ("r", "storage")
    assert _lovelace_resources(SimpleNamespace(resources="r", resource_mode="yaml", mode="storage")) == ("r", "yaml")
    assert _lovelace_resources(None) == (None, "storage")


async def test_diagnostics(hass: HomeAssistant, paris, entry: MockConfigEntry, freezer: FrozenDateTimeFactory) -> None:
    freezer.move_to(datetime(2026, 1, 3, 12, 0, tzinfo=dt_util.get_time_zone("Europe/Paris")))
    await _setup(hass, entry)
    diag = await async_get_config_entry_diagnostics(hass, entry)
    assert diag == {
        "time_zone": "Europe/Paris",
        "today": {"date": "2026-01-03", "label": "Ste Geneviève", "names": ["Geneviève"]},
        "calendar_days": 366,
    }
