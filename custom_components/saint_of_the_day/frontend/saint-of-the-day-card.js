var SAINT_CARD_VERSION = '1.0.0';

// ── Header icon: tinted round icon, the accent of the project on the showcase site (the integration keeps its
// brand/icon.png). 16 % tint like the generic icons of the other cards.
var SAINT_ACCENT = '#8e44ad';

// ── i18n ──────────────────────────────────────────────────────────────────────
var SaintI18n = {
  fr: {
    default_title: 'Saint du jour',
    wish: 'Bonne fête, {names} !',
    tomorrow: 'Demain',
    upcoming: 'Prochains jours',
    no_entity: 'Capteur Saint du jour introuvable. Ajoutez l\'intégration Saint du jour ou renseignez « entity ».',
    unavailable: 'Le saint du jour est indisponible pour le moment.',
    show_full: 'Afficher la carte complète',
    show_compact: 'Revenir à la vue compacte',
    editor: {
      entity: 'Capteur Saint du jour',
      title: 'Titre',
      show_title: 'Afficher le titre',
      show_wish: 'Afficher le message de fête',
      upcoming_days: 'Jours suivants affichés',
      language: 'Langue',
      lang_auto: 'Automatique',
    },
  },
  en: {
    default_title: 'Saint of the day',
    wish: 'Happy name day, {names}!',
    tomorrow: 'Tomorrow',
    upcoming: 'Coming up',
    no_entity: 'Saint of the day sensor not found. Add the Saint of the day integration or set "entity".',
    unavailable: 'The saint of the day is unavailable for now.',
    show_full: 'Show the full card',
    show_compact: 'Back to the compact view',
    editor: {
      entity: 'Saint of the day sensor',
      title: 'Title',
      show_title: 'Show title',
      show_wish: 'Show the name day wish',
      upcoming_days: 'Next days shown',
      language: 'Language',
      lang_auto: 'Auto',
    },
  },
  de: {
    default_title: 'Heiliger des Tages',
    wish: 'Alles Gute zum Namenstag, {names}!',
    tomorrow: 'Morgen',
    upcoming: 'Demnächst',
    no_entity: 'Sensor „Heiliger des Tages“ nicht gefunden. Füge die Integration „Heiliger des Tages“ hinzu oder setze „entity“.',
    unavailable: 'Der Heilige des Tages ist derzeit nicht verfügbar.',
    show_full: 'Vollständige Karte anzeigen',
    show_compact: 'Zurück zur kompakten Ansicht',
    editor: {
      entity: 'Sensor „Heiliger des Tages“',
      title: 'Titel',
      show_title: 'Titel anzeigen',
      show_wish: 'Namenstagsgruß anzeigen',
      upcoming_days: 'Angezeigte Folgetage',
      language: 'Sprache',
      lang_auto: 'Automatisch',
    },
  },
  es: {
    default_title: 'Santo del día',
    wish: '¡Feliz santo, {names}!',
    tomorrow: 'Mañana',
    upcoming: 'Próximos días',
    no_entity: 'No se encuentra el sensor de Santo del día. Añade la integración Santo del día o indica «entity».',
    unavailable: 'El santo del día no está disponible por ahora.',
    show_full: 'Mostrar la tarjeta completa',
    show_compact: 'Volver a la vista compacta',
    editor: {
      entity: 'Sensor de Santo del día',
      title: 'Título',
      show_title: 'Mostrar el título',
      show_wish: 'Mostrar la felicitación',
      upcoming_days: 'Días siguientes mostrados',
      language: 'Idioma',
      lang_auto: 'Automático',
    },
  },
  sr: {
    default_title: 'Светац дана',
    wish: 'Срећан имендан, {names}!',
    tomorrow: 'Сутра',
    upcoming: 'Наредни дани',
    no_entity: 'Сензор „Светац дана“ није пронађен. Додајте интеграцију „Светац дана“ или подесите „entity“.',
    unavailable: 'Светац дана тренутно није доступан.',
    show_full: 'Прикажи целу картицу',
    show_compact: 'Назад на сажети приказ',
    editor: {
      entity: 'Сензор „Светац дана“',
      title: 'Наслов',
      show_title: 'Прикажи наслов',
      show_wish: 'Прикажи честитку за имендан',
      upcoming_days: 'Приказани наредни дани',
      language: 'Језик',
      lang_auto: 'Аутоматски',
    },
  },
  'sr-Latn': {
    default_title: 'Svetac dana',
    wish: 'Srećan imendan, {names}!',
    tomorrow: 'Sutra',
    upcoming: 'Naredni dani',
    no_entity: 'Senzor „Svetac dana“ nije pronađen. Dodajte integraciju „Svetac dana“ ili podesite „entity“.',
    unavailable: 'Svetac dana trenutno nije dostupan.',
    show_full: 'Prikaži celu karticu',
    show_compact: 'Nazad na sažeti prikaz',
    editor: {
      entity: 'Senzor „Svetac dana“',
      title: 'Naslov',
      show_title: 'Prikaži naslov',
      show_wish: 'Prikaži čestitku za imendan',
      upcoming_days: 'Prikazani naredni dani',
      language: 'Jezik',
      lang_auto: 'Automatski',
    },
  },
  it: {
    default_title: 'Santo del giorno',
    wish: 'Buon onomastico, {names}!',
    tomorrow: 'Domani',
    upcoming: 'Prossimi giorni',
    no_entity: 'Sensore Santo del giorno non trovato. Aggiungi l\'integrazione Santo del giorno o imposta "entity".',
    unavailable: 'Il santo del giorno non è disponibile per ora.',
    show_full: 'Mostra la scheda completa',
    show_compact: 'Torna alla vista compatta',
    editor: {
      entity: 'Sensore Santo del giorno',
      title: 'Titolo',
      show_title: 'Mostra il titolo',
      show_wish: 'Mostra gli auguri',
      upcoming_days: 'Giorni successivi mostrati',
      language: 'Lingua',
      lang_auto: 'Automatica',
    },
  },
  nl: {
    default_title: 'Heilige van de dag',
    wish: 'Fijne naamdag, {names}!',
    tomorrow: 'Morgen',
    upcoming: 'Binnenkort',
    no_entity: 'Sensor Heilige van de dag niet gevonden. Voeg de integratie Heilige van de dag toe of stel "entity" in.',
    unavailable: 'De heilige van de dag is momenteel niet beschikbaar.',
    show_full: 'Volledige kaart tonen',
    show_compact: 'Terug naar de compacte weergave',
    editor: {
      entity: 'Sensor Heilige van de dag',
      title: 'Titel',
      show_title: 'Titel tonen',
      show_wish: 'Naamdagwens tonen',
      upcoming_days: 'Getoonde volgende dagen',
      language: 'Taal',
      lang_auto: 'Automatisch',
    },
  },
  pt: {
    default_title: 'Santo do dia',
    wish: 'Feliz dia do santo, {names}!',
    tomorrow: 'Amanhã',
    upcoming: 'Próximos dias',
    no_entity: 'Sensor Santo do dia não encontrado. Adicione a integração Santo do dia ou defina "entity".',
    unavailable: 'O santo do dia não está disponível de momento.',
    show_full: 'Mostrar o cartão completo',
    show_compact: 'Voltar à vista compacta',
    editor: {
      entity: 'Sensor Santo do dia',
      title: 'Título',
      show_title: 'Mostrar o título',
      show_wish: 'Mostrar a mensagem de parabéns',
      upcoming_days: 'Dias seguintes apresentados',
      language: 'Idioma',
      lang_auto: 'Automático',
    },
  },
  pl: {
    default_title: 'Święty dnia',
    wish: 'Wszystkiego najlepszego z okazji imienin, {names}!',
    tomorrow: 'Jutro',
    upcoming: 'Nadchodzące dni',
    no_entity: 'Nie znaleziono czujnika Święty dnia. Dodaj integrację Święty dnia lub ustaw „entity”.',
    unavailable: 'Święty dnia jest obecnie niedostępny.',
    show_full: 'Pokaż pełną kartę',
    show_compact: 'Wróć do widoku kompaktowego',
    editor: {
      entity: 'Czujnik Święty dnia',
      title: 'Tytuł',
      show_title: 'Pokaż tytuł',
      show_wish: 'Pokaż życzenia imieninowe',
      upcoming_days: 'Wyświetlane kolejne dni',
      language: 'Język',
      lang_auto: 'Automatycznie',
    },
  },
  ro: {
    default_title: 'Sfântul zilei',
    wish: 'La mulți ani de onomastică, {names}!',
    tomorrow: 'Mâine',
    upcoming: 'Zilele următoare',
    no_entity: 'Senzorul Sfântul zilei nu a fost găsit. Adăugați integrarea Sfântul zilei sau setați „entity”.',
    unavailable: 'Sfântul zilei nu este disponibil momentan.',
    show_full: 'Afișează cardul complet',
    show_compact: 'Înapoi la vizualizarea compactă',
    editor: {
      entity: 'Senzor Sfântul zilei',
      title: 'Titlu',
      show_title: 'Afișează titlul',
      show_wish: 'Afișează urarea de onomastică',
      upcoming_days: 'Zile următoare afișate',
      language: 'Limbă',
      lang_auto: 'Automat',
    },
  },
  da: {
    default_title: 'Dagens helgen',
    wish: 'Tillykke med navnedagen, {names}!',
    tomorrow: 'I morgen',
    upcoming: 'Kommende dage',
    no_entity: 'Sensoren Dagens helgen blev ikke fundet. Tilføj integrationen Dagens helgen, eller angiv "entity".',
    unavailable: 'Dagens helgen er ikke tilgængelig lige nu.',
    show_full: 'Vis hele kortet',
    show_compact: 'Tilbage til kompakt visning',
    editor: {
      entity: 'Sensoren Dagens helgen',
      title: 'Titel',
      show_title: 'Vis titel',
      show_wish: 'Vis navnedagshilsen',
      upcoming_days: 'Viste kommende dage',
      language: 'Sprog',
      lang_auto: 'Automatisk',
    },
  },
  sv: {
    default_title: 'Dagens helgon',
    wish: 'Grattis på namnsdagen, {names}!',
    tomorrow: 'I morgon',
    upcoming: 'Kommande dagar',
    no_entity: 'Sensorn Dagens helgon hittades inte. Lägg till integrationen Dagens helgon eller ange "entity".',
    unavailable: 'Dagens helgon är inte tillgängligt just nu.',
    show_full: 'Visa hela kortet',
    show_compact: 'Tillbaka till kompakt vy',
    editor: {
      entity: 'Sensorn Dagens helgon',
      title: 'Titel',
      show_title: 'Visa titel',
      show_wish: 'Visa namnsdagshälsning',
      upcoming_days: 'Visade kommande dagar',
      language: 'Språk',
      lang_auto: 'Automatiskt',
    },
  },
  bg: {
    default_title: 'Светия на деня',
    wish: 'Честит имен ден, {names}!',
    tomorrow: 'Утре',
    upcoming: 'Следващи дни',
    no_entity: 'Сензорът „Светия на деня“ не е намерен. Добавете интеграцията „Светия на деня“ или задайте „entity“.',
    unavailable: 'Светията на деня в момента не е наличен.',
    show_full: 'Покажи цялата карта',
    show_compact: 'Обратно към компактния изглед',
    editor: {
      entity: 'Сензор „Светия на деня“',
      title: 'Заглавие',
      show_title: 'Покажи заглавието',
      show_wish: 'Покажи поздрава за имен ден',
      upcoming_days: 'Показани следващи дни',
      language: 'Език',
      lang_auto: 'Автоматично',
    },
  },
  ru: {
    default_title: 'Святой дня',
    wish: 'С именинами, {names}!',
    tomorrow: 'Завтра',
    upcoming: 'Ближайшие дни',
    no_entity: 'Датчик «Святой дня» не найден. Добавьте интеграцию «Святой дня» или укажите «entity».',
    unavailable: 'Святой дня сейчас недоступен.',
    show_full: 'Показать полную карточку',
    show_compact: 'Вернуться к компактному виду',
    editor: {
      entity: 'Датчик «Святой дня»',
      title: 'Заголовок',
      show_title: 'Показывать заголовок',
      show_wish: 'Показывать поздравление с именинами',
      upcoming_days: 'Показываемые следующие дни',
      language: 'Язык',
      lang_auto: 'Автоматически',
    },
  },
  uk: {
    default_title: 'Святий дня',
    wish: 'З іменинами, {names}!',
    tomorrow: 'Завтра',
    upcoming: 'Найближчі дні',
    no_entity: 'Датчик «Святий дня» не знайдено. Додайте інтеграцію «Святий дня» або вкажіть «entity».',
    unavailable: 'Святий дня зараз недоступний.',
    show_full: 'Показати повну картку',
    show_compact: 'Повернутися до компактного вигляду',
    editor: {
      entity: 'Датчик «Святий дня»',
      title: 'Заголовок',
      show_title: 'Показувати заголовок',
      show_wish: 'Показувати привітання з іменинами',
      upcoming_days: 'Показані наступні дні',
      language: 'Мова',
      lang_auto: 'Автоматично',
    },
  },
  hu: {
    default_title: 'A nap szentje',
    wish: 'Boldog névnapot, {names}!',
    tomorrow: 'Holnap',
    upcoming: 'Következő napok',
    no_entity: 'A nap szentje érzékelő nem található. Add hozzá A nap szentje integrációt, vagy állítsd be az „entity” értéket.',
    unavailable: 'A nap szentje jelenleg nem érhető el.',
    show_full: 'Teljes kártya megjelenítése',
    show_compact: 'Vissza a kompakt nézethez',
    editor: {
      entity: 'A nap szentje érzékelő',
      title: 'Cím',
      show_title: 'Cím megjelenítése',
      show_wish: 'Névnapi köszöntés megjelenítése',
      upcoming_days: 'Megjelenített következő napok',
      language: 'Nyelv',
      lang_auto: 'Automatikus',
    },
  },
  sk: {
    default_title: 'Svätý dňa',
    wish: 'Všetko najlepšie k meninám, {names}!',
    tomorrow: 'Zajtra',
    upcoming: 'Nasledujúce dni',
    no_entity: 'Senzor Svätý dňa sa nenašiel. Pridajte integráciu Svätý dňa alebo nastavte „entity“.',
    unavailable: 'Svätý dňa momentálne nie je dostupný.',
    show_full: 'Zobraziť celú kartu',
    show_compact: 'Späť na kompaktné zobrazenie',
    editor: {
      entity: 'Senzor Svätý dňa',
      title: 'Názov',
      show_title: 'Zobraziť názov',
      show_wish: 'Zobraziť blahoželanie k meninám',
      upcoming_days: 'Zobrazené nasledujúce dni',
      language: 'Jazyk',
      lang_auto: 'Automaticky',
    },
  },
  cs: {
    default_title: 'Svatý dne',
    wish: 'Všechno nejlepší k svátku, {names}!',
    tomorrow: 'Zítra',
    upcoming: 'Následující dny',
    no_entity: 'Senzor Svatý dne nebyl nalezen. Přidejte integraci Svatý dne nebo nastavte „entity“.',
    unavailable: 'Svatý dne momentálně není dostupný.',
    show_full: 'Zobrazit celou kartu',
    show_compact: 'Zpět na kompaktní zobrazení',
    editor: {
      entity: 'Senzor Svatý dne',
      title: 'Název',
      show_title: 'Zobrazit název',
      show_wish: 'Zobrazit blahopřání k svátku',
      upcoming_days: 'Zobrazené následující dny',
      language: 'Jazyk',
      lang_auto: 'Automaticky',
    },
  },
  sl: {
    default_title: 'Svetnik dneva',
    wish: 'Vse najboljše za god, {names}!',
    tomorrow: 'Jutri',
    upcoming: 'Naslednji dnevi',
    no_entity: 'Senzorja Svetnik dneva ni mogoče najti. Dodajte integracijo Svetnik dneva ali nastavite »entity«.',
    unavailable: 'Svetnik dneva trenutno ni na voljo.',
    show_full: 'Pokaži celotno kartico',
    show_compact: 'Nazaj na strnjen pogled',
    editor: {
      entity: 'Senzor Svetnik dneva',
      title: 'Naslov',
      show_title: 'Pokaži naslov',
      show_wish: 'Pokaži voščilo za god',
      upcoming_days: 'Prikazani naslednji dnevi',
      language: 'Jezik',
      lang_auto: 'Samodejno',
    },
  },
  lv: {
    default_title: 'Dienas svētais',
    wish: 'Daudz laimes vārda dienā, {names}!',
    tomorrow: 'Rīt',
    upcoming: 'Nākamās dienas',
    no_entity: 'Sensors “Dienas svētais” nav atrasts. Pievienojiet integrāciju “Dienas svētais” vai iestatiet “entity”.',
    unavailable: 'Dienas svētais pašlaik nav pieejams.',
    show_full: 'Rādīt pilno karti',
    show_compact: 'Atpakaļ uz kompakto skatu',
    editor: {
      entity: 'Sensors “Dienas svētais”',
      title: 'Virsraksts',
      show_title: 'Rādīt virsrakstu',
      show_wish: 'Rādīt vārda dienas apsveikumu',
      upcoming_days: 'Rādītās nākamās dienas',
      language: 'Valoda',
      lang_auto: 'Automātiski',
    },
  },
  el: {
    default_title: 'Άγιος της ημέρας',
    wish: 'Χρόνια πολλά, {names}!',
    tomorrow: 'Αύριο',
    upcoming: 'Επόμενες ημέρες',
    no_entity: 'Δεν βρέθηκε ο αισθητήρας «Άγιος της ημέρας». Προσθέστε την ενσωμάτωση «Άγιος της ημέρας» ή ορίστε το «entity».',
    unavailable: 'Ο άγιος της ημέρας δεν είναι διαθέσιμος προς το παρόν.',
    show_full: 'Εμφάνιση πλήρους κάρτας',
    show_compact: 'Επιστροφή στη συμπαγή προβολή',
    editor: {
      entity: 'Αισθητήρας «Άγιος της ημέρας»',
      title: 'Τίτλος',
      show_title: 'Εμφάνιση τίτλου',
      show_wish: 'Εμφάνιση ευχών ονομαστικής εορτής',
      upcoming_days: 'Εμφανιζόμενες επόμενες ημέρες',
      language: 'Γλώσσα',
      lang_auto: 'Αυτόματα',
    },
  },
};

// Single source of the config defaults, shared by the card (setConfig) and the editor.
var SAINT_DEFAULTS = { show_title: true, show_wish: true, upcoming_days: 3 };
var SAINT_MAX_UPCOMING = 7;

function saintEsc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);
}

// The card's `language` option wins over the Home Assistant language. A full code the card knows (sr-Latn) is
// kept, otherwise its part before the dash (fr-FR gives fr, pt-BR gives the European Portuguese pt), otherwise English.
function saintLang(hass, config) {
  var lang = String(config?.language || (hass && (hass.locale?.language || hass.language)) || navigator.language || 'en');
  if (SaintI18n[lang]) return lang;
  lang = lang.split('-')[0];
  return SaintI18n[lang] ? lang : 'en';
}

// Locale for Intl: the full code (fr-CA, pt-BR) of the card's `language` option, else of Home Assistant, when its
// base is the card's resolved language, otherwise the resolved language. Plain "pt" is European Portuguese in Home
// Assistant but Brazilian in Intl, so it becomes pt-PT. The sr / sr-Latn scripts never mix.
function saintLocale(hass, config) {
  var lang = saintLang(hass, config);
  var full = String(config?.language || (hass && (hass.locale?.language || hass.language)) || '');
  var sameScript = /-Latn\b/i.test(full) === /-Latn\b/i.test(lang);
  var locale = full && full.split('-')[0] === lang.split('-')[0] && sameScript ? full : lang;
  return locale === 'pt' ? 'pt-PT' : locale;
}

// "YYYY-MM-DD" as a local date: Date.parse reads a date alone as UTC midnight, the day before west of UTC.
function saintParseDate(iso) {
  var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || ''));
  return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : null;
}

function saintFormatDate(iso, locale, options) {
  var d = saintParseDate(iso);
  if (!d) return '';
  try {
    return d.toLocaleDateString(locale, options);
  } catch (_err) {
    return d.toLocaleDateString('en', options);
  }
}

// "Philippe and Jacques" in the card's language.
function saintJoin(names, locale) {
  try {
    return new Intl.ListFormat(locale, { style: 'long', type: 'conjunction' }).format(names);
  } catch (_err) {
    return names.join(', ');
  }
}

function saintWish(t, names, locale) {
  return names.length ? t.wish.replace('{names}', saintJoin(names, locale)) : '';
}

// ── saint-of-the-day-card ─────────────────────────────────────────────────────
class SaintCard extends HTMLElement {
  static getConfigElement() {
    return document.createElement('saint-of-the-day-card-editor');
  }

  static getStubConfig(hass) {
    var entity = SaintCard._findEntity(hass);
    return entity ? { entity: entity } : {};
  }

  // The today sensor: the one with the `upcoming` list. An unavailable sensor has no attributes: fall back to the
  // entity registry (platform and translation key).
  static _findEntity(hass) {
    if (!hass?.states) return null;
    var ids = Object.keys(hass.states);
    for (var i = 0; i < ids.length; i++) {
      var st = hass.states[ids[i]];
      if (ids[i].indexOf('sensor.') === 0 && st.attributes && Array.isArray(st.attributes.upcoming) && st.attributes.config_entry_id) {
        return ids[i];
      }
    }
    var entities = hass.entities || {};
    var reg = Object.keys(entities);
    for (var j = 0; j < reg.length; j++) {
      var e = entities[reg[j]];
      if (reg[j].indexOf('sensor.') === 0 && e.platform === 'saint_of_the_day' && e.translation_key === 'today' && hass.states[reg[j]]) return reg[j];
    }
    return null;
  }

  setConfig(config) {
    var c = Object.assign({}, SAINT_DEFAULTS, config || {});
    var days = Number(c.upcoming_days);
    c.upcoming_days = Number.isFinite(days) ? Math.max(0, Math.min(SAINT_MAX_UPCOMING, Math.round(days))) : SAINT_DEFAULTS.upcoming_days;
    this._config = c;
    this.toggleAttribute?.('hide-title', c.show_title === false);
    var entityId = this._hass ? this._entityId() : null;
    this._lastState = entityId ? this._hass.states[entityId] || null : null;
    if (this._hass) this._render();
  }

  set hass(hass) {
    var first = !this._hass;
    var lang = this._hass ? saintLang(this._hass, this._config) : null;
    this._hass = hass;
    var entityId = this._entityId();
    var st = entityId ? hass.states[entityId] : null;
    // Only redraw when the sensor (or the language) changed: hass updates several times a second.
    if (first || st !== this._lastState || lang !== saintLang(hass, this._config)) {
      this._lastState = st;
      this._render();
    }
  }

  getCardSize() {
    return 2 + (this._config ? this._config.upcoming_days : 0);
  }

  getGridOptions() {
    return { columns: 12, min_columns: 6, rows: 'auto' };
  }

  // Without a configured entity, the sensor found is kept and looked up again only when it disappears.
  _entityId() {
    if (this._config?.entity) return this._config.entity;
    if (!this._autoEntity || !this._hass?.states[this._autoEntity]) this._autoEntity = SaintCard._findEntity(this._hass);
    return this._autoEntity;
  }

  _t() {
    return SaintI18n[saintLang(this._hass, this._config)];
  }

  _compact() {
    return false;
  }

  _detailButton() {
    return '';
  }

  _iconHtml() {
    return '<div class="logo"><ha-icon icon="mdi:calendar-star"></ha-icon></div>';
  }

  _ensureShell() {
    if (this._root) return;
    this._root = this.attachShadow({ mode: 'open' });
    this._root.innerHTML = `<style>${SaintCard._styles()}</style><ha-card><div class="header"></div><div class="body"></div></ha-card>`;
    this._root.querySelector('.body').addEventListener('click', (ev) => {
      if (ev.target.closest?.('.feast')) this._moreInfo();
    });
  }

  _moreInfo() {
    var entityId = this._entityId();
    if (!entityId) return;
    this.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId: entityId }, bubbles: true, composed: true }));
  }

  _render() {
    if (!this._config || !this._hass) return;
    this._ensureShell();
    var t = this._t();
    var locale = saintLocale(this._hass, this._config);
    var st = this._lastState;
    var header = this._root.querySelector('.header');
    var body = this._root.querySelector('.body');
    var title = this._config.title || t.default_title;
    var attrs = st?.attributes || {};
    var unavailable = !st || st.state === 'unavailable' || st.state === 'unknown';
    var date = unavailable ? '' : saintFormatDate(attrs.date, locale, { weekday: 'long', day: 'numeric', month: 'long' });
    var compact = this._compact();

    header.innerHTML =
      `<div class="title">${this._iconHtml()}<div class="titles"><div class="name">${saintEsc(title)}</div>` +
      (date ? `<div class="sub">${saintEsc(date)}</div>` : '') +
      `</div></div>${this._detailButton(t)}`;
    header.querySelector('.detail')?.addEventListener('click', (ev) => this._toggleDetail(ev));

    if (!st) {
      body.innerHTML = `<div class="empty">${saintEsc(t.no_entity)}</div>`;
      return;
    }
    if (unavailable) {
      body.innerHTML = `<div class="empty">${saintEsc(t.unavailable)}</div>`;
      return;
    }
    var names = Array.isArray(attrs.names) ? attrs.names : [];
    var wish = this._config.show_wish ? saintWish(t, names, locale) : '';
    var html =
      `<div class="feast" role="button" tabindex="0"><div class="label">${saintEsc(st.state)}</div>` +
      (wish ? `<div class="wish">${saintEsc(wish)}</div>` : '') +
      '</div>';
    var upcoming = compact ? [] : (Array.isArray(attrs.upcoming) ? attrs.upcoming : []).slice(0, this._config.upcoming_days);
    if (upcoming.length) {
      html +=
        `<div class="section">${saintEsc(t.upcoming)}</div><ul class="upcoming">` +
        upcoming
          .map((f, i) => {
            var when = i === 0 ? t.tomorrow : saintFormatDate(f.date, locale, { weekday: 'short', day: 'numeric', month: 'short' });
            return `<li><span class="when">${saintEsc(when)}</span><span class="what">${saintEsc(f.label)}</span></li>`;
          })
          .join('') +
        '</ul>';
    }
    body.innerHTML = html;
    body.querySelector('.feast').addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        this._moreInfo();
      }
    });
  }

  static _styles() {
    return [
      ':host { display: block; }',
      // A 0 px high line gives the host a preferred width without a minimum, as in the other cards: the card keeps a
      // width in auto-sized containers and still shrinks in a `1fr 1fr` grid.
      ':host::before { content: ""; display: grid; grid-template-columns: minmax(0, 320px); height: 0; }',
      'ha-card { padding: 0 0 12px; overflow: hidden; container-type: inline-size; }',
      '.header { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 12px 10px 8px 12px; min-height: 36px; }',
      '.title { flex: 1 1 0; min-width: calc(5ch + 50px); display: flex; align-items: center; gap: 10px; }',
      `.logo { width: 40px; height: 40px; flex: none; border-radius: 50%; display: grid; place-items: center; color: ${SAINT_ACCENT}; background: color-mix(in srgb, ${SAINT_ACCENT} 16%, transparent); }`,
      '.logo ha-icon { --mdc-icon-size: 24px; }',
      '.titles { flex: 1 1 0; min-width: 5ch; overflow: hidden; }',
      ':host([hide-title]) .titles > .name { display: none; }',
      '.name { font-size: 16px; font-weight: 500; line-height: 1.25; color: var(--primary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }',
      '.sub { font-size: 12px; color: var(--secondary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }',
      ':host([hide-title]) .sub { font-size: 14px; color: var(--primary-text-color); }',
      '.body { padding: 0 12px; }',
      '.empty { padding: 4px 4px 0; color: var(--secondary-text-color); }',
      `.feast { cursor: pointer; padding: 10px 12px; border-radius: 12px; background: color-mix(in srgb, ${SAINT_ACCENT} 10%, transparent); }`,
      '.feast:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }',
      '.label { font-size: 22px; font-weight: 500; line-height: 1.2; color: var(--primary-text-color); overflow-wrap: anywhere; }',
      `.wish { margin-top: 4px; font-size: 14px; color: color-mix(in srgb, ${SAINT_ACCENT} 50%, var(--primary-text-color)); overflow-wrap: anywhere; }`,
      '.section { margin: 12px 4px 4px; font-size: 12px; font-weight: 500; letter-spacing: .02em; color: var(--secondary-text-color); }',
      '.upcoming { list-style: none; margin: 0; padding: 0; }',
      '.upcoming li { display: flex; gap: 12px; align-items: baseline; padding: 6px 4px; border-top: 1px solid var(--divider-color, rgba(0,0,0,.12)); font-size: 14px; }',
      '.upcoming li:first-child { border-top: none; }',
      '.when { flex: none; min-width: 7.5em; color: var(--secondary-text-color); font-size: 13px; }',
      '.what { min-width: 0; color: var(--primary-text-color); overflow-wrap: anywhere; }',
      // Narrow card: the logo goes, the title keeps a few letters.
      '@container (max-width: 240px) { .logo { display: none; } .when { min-width: 0; } .upcoming li { flex-direction: column; gap: 0; } }',
      // Mini card: a 240 px preferred width, the detail button at the top right, and a smaller name.
      ':host([mini])::before { grid-template-columns: minmax(0, 240px); }',
      'ha-card.mini .label { font-size: 18px; }',
      '@container (max-width: 240px) { ha-card.mini .logo { display: grid; } }',
      '.detail { all: unset; flex: none; cursor: pointer; width: 24px; height: 24px; margin-right: 4px; border-radius: 50%; align-self: flex-start;' +
        ' display: grid; place-items: center; color: var(--secondary-text-color); --mdc-icon-size: 16px; }',
      '.detail:hover { background: color-mix(in srgb, var(--secondary-text-color) 14%, transparent); color: var(--primary-text-color); }',
      '.detail:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 1px; }',
    ].join('\n');
  }
}

// A click inside Home Assistant's dialogs (more-info, confirmations) is not "outside" the card.
function saintInDialog(ev) {
  return ev.composedPath().some((n) => ['ha-more-info-dialog', 'ha-dialog', 'dialog'].includes(n.localName));
}

// ── saint-of-the-day-mini-card ────────────────────────────────────────────────
// Today's feast only. Its detail button (top right) switches to the full card and back; a click outside the card
// folds it back to the compact view.
class SaintMiniCard extends SaintCard {
  constructor() {
    super();
    this._zoomed = false;
    this._onOutsideMini = (ev) => {
      if (this._zoomed && !ev.composedPath().includes(this) && !saintInDialog(ev)) this._setZoom(false);
    };
  }

  connectedCallback() {
    document.addEventListener('click', this._onOutsideMini, true);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this._onOutsideMini, true);
  }

  setConfig(config) {
    this.setAttribute?.('mini', '');
    super.setConfig(config);
  }

  getCardSize() {
    return this._zoomed ? super.getCardSize() : 2;
  }

  getGridOptions() {
    return this._zoomed ? super.getGridOptions() : { columns: 6, min_columns: 4, rows: 'auto' };
  }

  _compact() {
    return !this._zoomed;
  }

  _detailButton(t) {
    var label = this._zoomed ? t.show_compact : t.show_full;
    return (
      `<button class="detail" title="${saintEsc(label)}" aria-label="${saintEsc(label)}">` +
      `<ha-icon icon="mdi:${this._zoomed ? 'arrow-collapse' : 'arrow-expand'}"></ha-icon></button>`
    );
  }

  _toggleDetail(ev) {
    ev.stopPropagation();
    this._setZoom(!this._zoomed);
    // Keyboard use (Enter / Space: no click count) keeps the focus on the button, without scrolling the page.
    if (!ev.detail) this._root.querySelector('.detail')?.focus?.({ preventScroll: true });
  }

  _setZoom(zoomed) {
    this._zoomed = zoomed;
    this._render();
  }

  _render() {
    super._render();
    this._root?.querySelector('ha-card')?.classList.toggle('mini', this._compact());
  }
}

// ── saint-of-the-day-card-editor ──────────────────────────────────────────────
var SAINT_LANGUAGES = [
  ['en', 'English'],
  ['fr', 'Français'],
  ['de', 'Deutsch'],
  ['es', 'Español'],
  ['sr', 'Српски'],
  ['sr-Latn', 'Srpski (latinica)'],
  ['it', 'Italiano'],
  ['nl', 'Nederlands'],
  ['pt', 'Português (Portugal)'],
  ['pl', 'Polski'],
  ['ro', 'Română'],
  ['da', 'Dansk'],
  ['sv', 'Svenska'],
  ['bg', 'Български'],
  ['ru', 'Русский'],
  ['uk', 'Українська'],
  ['hu', 'Magyar'],
  ['sk', 'Slovenčina'],
  ['cs', 'Čeština'],
  ['sl', 'Slovenščina'],
  ['lv', 'Latviešu'],
  ['el', 'Ελληνικά'],
];

function saintEditorSchema(t) {
  return [
    { name: 'entity', selector: { entity: { domain: 'sensor', integration: 'saint_of_the_day' } } },
    { name: 'title', selector: { text: {} } },
    {
      type: 'grid',
      name: '',
      schema: [
        { name: 'show_title', selector: { boolean: {} } },
        { name: 'show_wish', selector: { boolean: {} } },
      ],
    },
    { name: 'upcoming_days', selector: { number: { min: 0, max: SAINT_MAX_UPCOMING, mode: 'box' } } },
    {
      name: 'language',
      selector: {
        select: {
          mode: 'dropdown',
          options: [{ value: '', label: t.lang_auto }].concat(SAINT_LANGUAGES.map((l) => ({ value: l[0], label: l[1] }))),
        },
      },
    },
  ];
}

class SaintCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = Object.assign({}, config);
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    if (this._form) this._form.hass = hass;
    else this._render();
  }

  _render() {
    if (!this._hass || !this._config) return;
    if (!this._form) {
      this._form = document.createElement('ha-form');
      this._form.addEventListener('value-changed', this._valueChanged.bind(this));
      this.appendChild(this._form);
    }
    // The labels follow the language picked in the editor: rebuilt only when it changes.
    var lang = saintLang(this._hass, this._config);
    if (lang !== this._lang) {
      this._lang = lang;
      var t = SaintI18n[lang].editor;
      this._form.schema = saintEditorSchema(t);
      this._form.computeLabel = (field) => t[field.name] || field.name;
    }
    this._form.hass = this._hass;
    this._form.data = Object.assign({}, SAINT_DEFAULTS, this._config);
  }

  _valueChanged(ev) {
    var value = Object.assign({}, ev.detail.value);
    // Keep the YAML short: drop options left at their default.
    Object.keys(SAINT_DEFAULTS).forEach((key) => {
      if (value[key] === SAINT_DEFAULTS[key]) delete value[key];
    });
    ['title', 'entity', 'language'].forEach((key) => {
      if (!value[key]) delete value[key];
    });
    this._config = value;
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: value }, bubbles: true, composed: true }));
  }
}

if (!customElements.get('saint-of-the-day-card-editor')) {
  customElements.define('saint-of-the-day-card-editor', SaintCardEditor);
}

var saintDefined = false;
if (!customElements.get('saint-of-the-day-card')) {
  customElements.define('saint-of-the-day-card', SaintCard);
  saintDefined = true;
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: 'saint-of-the-day-card',
    name: 'Saint of the day',
    description: 'The French name day of today, with a wish and the next days.',
    preview: true,
    documentationURL: 'https://github.com/juju35/ha-saint-of-the-day',
  });
}
if (!customElements.get('saint-of-the-day-mini-card')) {
  customElements.define('saint-of-the-day-mini-card', SaintMiniCard);
  saintDefined = true;
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: 'saint-of-the-day-mini-card',
    name: 'Saint of the day mini',
    description: 'Today’s name day, with a button to show the full Saint of the day card.',
    preview: true,
    documentationURL: 'https://github.com/juju35/ha-saint-of-the-day',
  });
}
if (saintDefined) {
  console.info(`%c SAINT-OF-THE-DAY-CARD %c v${SAINT_CARD_VERSION} `, 'color:#fff;background:#8e44ad;font-weight:700', 'color:#8e44ad;background:#fff');
}
