var SAINT_CARD_VERSION = '1.3.2';

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
    status_today: 'Aujourd\'hui',
    status_unavailable: 'Indisponible',
    status_not_found: 'Introuvable',
    editor: {
      entity: 'Capteur Saint du jour',
      title: 'Titre',
      show_title: 'Afficher le titre',
      show_wish: 'Afficher le message de fête',
      show_background: 'Afficher le fond de l\'en-tête',
      upcoming_days: 'Jours suivants affichés',
      language: 'Langue',
      lang_auto: 'Automatique',
      illustration: 'Illustration animée',
      illustration_theme: 'Thème de l’illustration',
      theme_auto: 'Automatique (suit le thème)',
      theme_day: 'Jour',
      theme_night: 'Nuit',
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
    status_today: 'Today',
    status_unavailable: 'Unavailable',
    status_not_found: 'Not found',
    editor: {
      entity: 'Saint of the day sensor',
      title: 'Title',
      show_title: 'Show title',
      show_wish: 'Show the name day wish',
      show_background: 'Show the header background',
      upcoming_days: 'Next days shown',
      language: 'Language',
      lang_auto: 'Auto',
      illustration: 'Animated illustration',
      illustration_theme: 'Illustration theme',
      theme_auto: 'Automatic (follows the theme)',
      theme_day: 'Day',
      theme_night: 'Night',
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
    status_today: 'Heute',
    status_unavailable: 'Nicht verfügbar',
    status_not_found: 'Nicht gefunden',
    editor: {
      entity: 'Sensor „Heiliger des Tages“',
      title: 'Titel',
      show_title: 'Titel anzeigen',
      show_wish: 'Namenstagsgruß anzeigen',
      show_background: 'Kopfzeilenhintergrund anzeigen',
      upcoming_days: 'Angezeigte Folgetage',
      language: 'Sprache',
      lang_auto: 'Automatisch',
      illustration: 'Animierte Illustration',
      illustration_theme: 'Thema der Illustration',
      theme_auto: 'Automatisch (folgt dem Design)',
      theme_day: 'Tag',
      theme_night: 'Nacht',
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
    status_today: 'Hoy',
    status_unavailable: 'No disponible',
    status_not_found: 'No encontrado',
    editor: {
      entity: 'Sensor de Santo del día',
      title: 'Título',
      show_title: 'Mostrar el título',
      show_wish: 'Mostrar la felicitación',
      show_background: 'Mostrar el fondo del encabezado',
      upcoming_days: 'Días siguientes mostrados',
      language: 'Idioma',
      lang_auto: 'Automático',
      illustration: 'Ilustración animada',
      illustration_theme: 'Tema de la ilustración',
      theme_auto: 'Automático (sigue el tema)',
      theme_day: 'Día',
      theme_night: 'Noche',
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
    status_today: 'Данас',
    status_unavailable: 'Недоступно',
    status_not_found: 'Није пронађен',
    editor: {
      entity: 'Сензор „Светац дана“',
      title: 'Наслов',
      show_title: 'Прикажи наслов',
      show_wish: 'Прикажи честитку за имендан',
      show_background: 'Прикажи позадину заглавља',
      upcoming_days: 'Приказани наредни дани',
      language: 'Језик',
      lang_auto: 'Аутоматски',
      illustration: 'Анимирана илустрација',
      illustration_theme: 'Тема илустрације',
      theme_auto: 'Аутоматски (прати тему)',
      theme_day: 'Дан',
      theme_night: 'Ноћ',
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
    status_today: 'Danas',
    status_unavailable: 'Nedostupno',
    status_not_found: 'Nije pronađen',
    editor: {
      entity: 'Senzor „Svetac dana“',
      title: 'Naslov',
      show_title: 'Prikaži naslov',
      show_wish: 'Prikaži čestitku za imendan',
      show_background: 'Prikaži pozadinu zaglavlja',
      upcoming_days: 'Prikazani naredni dani',
      language: 'Jezik',
      lang_auto: 'Automatski',
      illustration: 'Animirana ilustracija',
      illustration_theme: 'Tema ilustracije',
      theme_auto: 'Automatski (prati temu)',
      theme_day: 'Dan',
      theme_night: 'Noć',
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
    status_today: 'Oggi',
    status_unavailable: 'Non disponibile',
    status_not_found: 'Non trovato',
    editor: {
      entity: 'Sensore Santo del giorno',
      title: 'Titolo',
      show_title: 'Mostra il titolo',
      show_wish: 'Mostra gli auguri',
      show_background: 'Mostra lo sfondo dell\'intestazione',
      upcoming_days: 'Giorni successivi mostrati',
      language: 'Lingua',
      lang_auto: 'Automatica',
      illustration: 'Illustrazione animata',
      illustration_theme: 'Tema dell’illustrazione',
      theme_auto: 'Automatico (segue il tema)',
      theme_day: 'Giorno',
      theme_night: 'Notte',
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
    status_today: 'Vandaag',
    status_unavailable: 'Niet beschikbaar',
    status_not_found: 'Niet gevonden',
    editor: {
      entity: 'Sensor Heilige van de dag',
      title: 'Titel',
      show_title: 'Titel tonen',
      show_wish: 'Naamdagwens tonen',
      show_background: 'Achtergrond van de koptekst tonen',
      upcoming_days: 'Getoonde volgende dagen',
      language: 'Taal',
      lang_auto: 'Automatisch',
      illustration: 'Geanimeerde illustratie',
      illustration_theme: 'Thema van de illustratie',
      theme_auto: 'Automatisch (volgt het thema)',
      theme_day: 'Dag',
      theme_night: 'Nacht',
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
    status_today: 'Hoje',
    status_unavailable: 'Indisponível',
    status_not_found: 'Não encontrado',
    editor: {
      entity: 'Sensor Santo do dia',
      title: 'Título',
      show_title: 'Mostrar o título',
      show_wish: 'Mostrar a mensagem de parabéns',
      show_background: 'Mostrar o fundo do cabeçalho',
      upcoming_days: 'Dias seguintes apresentados',
      language: 'Idioma',
      lang_auto: 'Automático',
      illustration: 'Ilustração animada',
      illustration_theme: 'Tema da ilustração',
      theme_auto: 'Automático (segue o tema)',
      theme_day: 'Dia',
      theme_night: 'Noite',
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
    status_today: 'Dziś',
    status_unavailable: 'Niedostępny',
    status_not_found: 'Nie znaleziono',
    editor: {
      entity: 'Czujnik Święty dnia',
      title: 'Tytuł',
      show_title: 'Pokaż tytuł',
      show_wish: 'Pokaż życzenia imieninowe',
      show_background: 'Pokaż tło nagłówka',
      upcoming_days: 'Wyświetlane kolejne dni',
      language: 'Język',
      lang_auto: 'Automatycznie',
      illustration: 'Animowana ilustracja',
      illustration_theme: 'Motyw ilustracji',
      theme_auto: 'Automatycznie (według motywu)',
      theme_day: 'Dzień',
      theme_night: 'Noc',
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
    status_today: 'Astăzi',
    status_unavailable: 'Indisponibil',
    status_not_found: 'Negăsit',
    editor: {
      entity: 'Senzor Sfântul zilei',
      title: 'Titlu',
      show_title: 'Afișează titlul',
      show_wish: 'Afișează urarea de onomastică',
      show_background: 'Afișează fundalul antetului',
      upcoming_days: 'Zile următoare afișate',
      language: 'Limbă',
      lang_auto: 'Automat',
      illustration: 'Ilustrație animată',
      illustration_theme: 'Tema ilustrației',
      theme_auto: 'Automat (urmează tema)',
      theme_day: 'Zi',
      theme_night: 'Noapte',
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
    status_today: 'I dag',
    status_unavailable: 'Utilgængelig',
    status_not_found: 'Ikke fundet',
    editor: {
      entity: 'Sensoren Dagens helgen',
      title: 'Titel',
      show_title: 'Vis titel',
      show_wish: 'Vis navnedagshilsen',
      show_background: 'Vis baggrund i overskriften',
      upcoming_days: 'Viste kommende dage',
      language: 'Sprog',
      lang_auto: 'Automatisk',
      illustration: 'Animeret illustration',
      illustration_theme: 'Illustrationens tema',
      theme_auto: 'Automatisk (følger temaet)',
      theme_day: 'Dag',
      theme_night: 'Nat',
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
    status_today: 'I dag',
    status_unavailable: 'Ej tillgänglig',
    status_not_found: 'Hittades inte',
    editor: {
      entity: 'Sensorn Dagens helgon',
      title: 'Titel',
      show_title: 'Visa titel',
      show_wish: 'Visa namnsdagshälsning',
      show_background: 'Visa rubrikens bakgrund',
      upcoming_days: 'Visade kommande dagar',
      language: 'Språk',
      lang_auto: 'Automatiskt',
      illustration: 'Animerad illustration',
      illustration_theme: 'Illustrationens tema',
      theme_auto: 'Automatiskt (följer temat)',
      theme_day: 'Dag',
      theme_night: 'Natt',
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
    status_today: 'Днес',
    status_unavailable: 'Недостъпно',
    status_not_found: 'Не е намерен',
    editor: {
      entity: 'Сензор „Светия на деня“',
      title: 'Заглавие',
      show_title: 'Покажи заглавието',
      show_wish: 'Покажи поздрава за имен ден',
      show_background: 'Покажи фона на заглавието',
      upcoming_days: 'Показани следващи дни',
      language: 'Език',
      lang_auto: 'Автоматично',
      illustration: 'Анимирана илюстрация',
      illustration_theme: 'Тема на илюстрацията',
      theme_auto: 'Автоматично (следва темата)',
      theme_day: 'Ден',
      theme_night: 'Нощ',
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
    status_today: 'Сегодня',
    status_unavailable: 'Недоступно',
    status_not_found: 'Не найден',
    editor: {
      entity: 'Датчик «Святой дня»',
      title: 'Заголовок',
      show_title: 'Показывать заголовок',
      show_wish: 'Показывать поздравление с именинами',
      show_background: 'Показывать фон заголовка',
      upcoming_days: 'Показываемые следующие дни',
      language: 'Язык',
      lang_auto: 'Автоматически',
      illustration: 'Анимированная иллюстрация',
      illustration_theme: 'Тема иллюстрации',
      theme_auto: 'Автоматически (по теме)',
      theme_day: 'День',
      theme_night: 'Ночь',
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
    status_today: 'Сьогодні',
    status_unavailable: 'Недоступно',
    status_not_found: 'Не знайдено',
    editor: {
      entity: 'Датчик «Святий дня»',
      title: 'Заголовок',
      show_title: 'Показувати заголовок',
      show_wish: 'Показувати привітання з іменинами',
      show_background: 'Показувати фон заголовка',
      upcoming_days: 'Показані наступні дні',
      language: 'Мова',
      lang_auto: 'Автоматично',
      illustration: 'Анімована ілюстрація',
      illustration_theme: 'Тема ілюстрації',
      theme_auto: 'Автоматично (за темою)',
      theme_day: 'День',
      theme_night: 'Ніч',
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
    status_today: 'Ma',
    status_unavailable: 'Nem elérhető',
    status_not_found: 'Nem található',
    editor: {
      entity: 'A nap szentje érzékelő',
      title: 'Cím',
      show_title: 'Cím megjelenítése',
      show_wish: 'Névnapi köszöntés megjelenítése',
      show_background: 'Fejléc hátterének megjelenítése',
      upcoming_days: 'Megjelenített következő napok',
      language: 'Nyelv',
      lang_auto: 'Automatikus',
      illustration: 'Animált illusztráció',
      illustration_theme: 'Az illusztráció témája',
      theme_auto: 'Automatikus (a témát követi)',
      theme_day: 'Nappal',
      theme_night: 'Éjszaka',
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
    status_today: 'Dnes',
    status_unavailable: 'Nedostupné',
    status_not_found: 'Nenájdené',
    editor: {
      entity: 'Senzor Svätý dňa',
      title: 'Názov',
      show_title: 'Zobraziť názov',
      show_wish: 'Zobraziť blahoželanie k meninám',
      show_background: 'Zobraziť pozadie hlavičky',
      upcoming_days: 'Zobrazené nasledujúce dni',
      language: 'Jazyk',
      lang_auto: 'Automaticky',
      illustration: 'Animovaná ilustrácia',
      illustration_theme: 'Téma ilustrácie',
      theme_auto: 'Automaticky (podľa témy)',
      theme_day: 'Deň',
      theme_night: 'Noc',
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
    status_today: 'Dnes',
    status_unavailable: 'Nedostupné',
    status_not_found: 'Nenalezeno',
    editor: {
      entity: 'Senzor Svatý dne',
      title: 'Název',
      show_title: 'Zobrazit název',
      show_wish: 'Zobrazit blahopřání k svátku',
      show_background: 'Zobrazit pozadí záhlaví',
      upcoming_days: 'Zobrazené následující dny',
      language: 'Jazyk',
      lang_auto: 'Automaticky',
      illustration: 'Animovaná ilustrace',
      illustration_theme: 'Motiv ilustrace',
      theme_auto: 'Automaticky (podle motivu)',
      theme_day: 'Den',
      theme_night: 'Noc',
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
    status_today: 'Danes',
    status_unavailable: 'Ni na voljo',
    status_not_found: 'Ni najden',
    editor: {
      entity: 'Senzor Svetnik dneva',
      title: 'Naslov',
      show_title: 'Pokaži naslov',
      show_wish: 'Pokaži voščilo za god',
      show_background: 'Pokaži ozadje glave',
      upcoming_days: 'Prikazani naslednji dnevi',
      language: 'Jezik',
      lang_auto: 'Samodejno',
      illustration: 'Animirana ilustracija',
      illustration_theme: 'Tema ilustracije',
      theme_auto: 'Samodejno (sledi temi)',
      theme_day: 'Dan',
      theme_night: 'Noč',
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
    status_today: 'Šodien',
    status_unavailable: 'Nav pieejams',
    status_not_found: 'Nav atrasts',
    editor: {
      entity: 'Sensors “Dienas svētais”',
      title: 'Virsraksts',
      show_title: 'Rādīt virsrakstu',
      show_wish: 'Rādīt vārda dienas apsveikumu',
      show_background: 'Rādīt galvenes fonu',
      upcoming_days: 'Rādītās nākamās dienas',
      language: 'Valoda',
      lang_auto: 'Automātiski',
      illustration: 'Animēta ilustrācija',
      illustration_theme: 'Ilustrācijas motīvs',
      theme_auto: 'Automātiski (seko tēmai)',
      theme_day: 'Diena',
      theme_night: 'Nakts',
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
    status_today: 'Σήμερα',
    status_unavailable: 'Μη διαθέσιμο',
    status_not_found: 'Δεν βρέθηκε',
    editor: {
      entity: 'Αισθητήρας «Άγιος της ημέρας»',
      title: 'Τίτλος',
      show_title: 'Εμφάνιση τίτλου',
      show_wish: 'Εμφάνιση ευχών ονομαστικής εορτής',
      show_background: 'Εμφάνιση φόντου κεφαλίδας',
      upcoming_days: 'Εμφανιζόμενες επόμενες ημέρες',
      language: 'Γλώσσα',
      lang_auto: 'Αυτόματα',
      illustration: 'Κινούμενη εικονογράφηση',
      illustration_theme: 'Θέμα εικονογράφησης',
      theme_auto: 'Αυτόματο (ακολουθεί το θέμα)',
      theme_day: 'Ημέρα',
      theme_night: 'Νύχτα',
    },
  },
};

// Single source of the config defaults, shared by the card (setConfig) and the editor.
var SAINT_DEFAULTS = { show_title: true, show_wish: true, show_background: true, illustration: true, illustration_theme: 'auto', upcoming_days: 3 };
var SAINT_MAX_UPCOMING = 7;

// The whole width of an element's text in its own font, an ellipsised one included.
function saintTextWidth(el) {
  const range = document.createRange();
  range.selectNodeContents(el);
  return range.getBoundingClientRect().width;
}

// Shadow DOM patching: a new render rewrites the header and the body in place instead of replacing them
// (innerHTML), so the nodes kept (the illustration's SVG, its running animations, the focused detail button) keep
// their size and state: nothing shows anew for a frame, the Sections view does not reflow and the page does not
// jump by itself. Nodes are matched by position; a node of another kind is replaced. A custom element written empty
// (<ha-icon>) draws its own content: only the attributes the markup gives are updated.
function saintPatchChildren(cur, next) {
  const old = [...cur.childNodes];
  const fresh = [...next.childNodes];
  fresh.forEach((n, i) => {
    const o = old[i];
    if (!o || o.nodeType !== n.nodeType || o.nodeName !== n.nodeName) {
      if (o) cur.replaceChild(n, o);
      else cur.appendChild(n);
      return;
    }
    if (n.nodeType !== 1) {
      if (o.nodeValue !== n.nodeValue) o.nodeValue = n.nodeValue;
      return;
    }
    const own = n.localName.includes('-') && !n.firstChild;
    if (!own) for (const { name } of [...o.attributes]) if (!n.hasAttribute(name)) o.removeAttribute(name);
    for (const { name, value } of n.attributes) if (o.getAttribute(name) !== value) o.setAttribute(name, value);
    if (!own) saintPatchChildren(o, n);
  });
  for (let i = old.length - 1; i >= fresh.length; i--) cur.removeChild(old[i]);
}

function saintMorph(el, html) {
  const tpl = el.childNodes && document.createElement('template');
  if (!tpl || !tpl.content) {
    el.innerHTML = html;
    return;
  }
  tpl.innerHTML = html;
  saintPatchChildren(el, tpl.content);
}

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

// Night picture: forced by illustration_theme, else Home Assistant's dark mode alone (a light theme keeps the day
// picture after sunset).
function saintIsNight(hass, config) {
  var theme = config?.illustration_theme;
  if (theme === 'night') return true;
  if (theme === 'day') return false;
  return !!hass?.themes?.darkMode;
}

// The header's status, shown by the colour of the round icon and by the scene: `ok` (today's feast is known),
// `off` (the sensor is unavailable: grey, the scene rests) or `alert` (no sensor found: red, the scene rests).
function saintStatus(st) {
  if (!st) return 'alert';
  return st.state === 'unavailable' || st.state === 'unknown' ? 'off' : 'ok';
}

// ── Illustration ──────────────────────────────────────────────────────────────
// The illustrated header, as on the other cards with a scene (flight and train boards): a sky across the card, a strip
// of paving stones along the bottom, the scene on the right and the round icon with the texts on the left. The sky
// follows day and night; the chapel keeps its light stone. In the scene, a saint stands in front
// of a rose window: the saint sways and blesses under a glowing halo, the window turns slowly (8-fold: one petal step
// every 6 s), its light breathes, two candles flicker. Every loop is a divisor of 6 s, so a 6 s GIF loops seamlessly.
var SAINT_GOLD = '#e8a33d';
var SAINT_SKIN = '#f2d4b8';
var SAINT_GLASS = ['#8e44ad', '#3a6fc4', '#c0392b', '#2e9e6b'];

function saintRose() {
  var petals = '';
  for (var i = 0; i < 8; i++) {
    petals +=
      `<path d="M78 38 L73 11 Q78 5 83 11 Z" transform="rotate(${i * 45} 78 38)" fill="${SAINT_GLASS[i % 4]}" fill-opacity=".75"/>` +
      `<circle cx="78" cy="9.5" r="2.6" transform="rotate(${i * 45 + 22.5} 78 38)" fill="${SAINT_GOLD}"/>`;
  }
  return (
    '<g class="rose">' +
    '<circle class="disc" cx="78" cy="38" r="33" stroke-width="3"/>' +
    `${petals}<circle cx="78" cy="38" r="5.5" fill="${SAINT_GOLD}"/></g>`
  );
}

// The saint, drawn in a 120 x 96 box standing on its bottom edge (centre x = 78).
function saintFigure() {
  return (
    '<g class="saint">' +
    `<circle class="halo" cx="78" cy="41" r="10" fill="${SAINT_GOLD}" fill-opacity=".35" stroke="${SAINT_GOLD}" stroke-width="2"/>` +
    '<path d="M66 54 Q78 47 90 54 L97 96 L59 96 Z" fill="#8e44ad"/>' +
    '<path d="M74 55 L82 55 L85 96 L71 96 Z" fill="#fff" fill-opacity=".2"/>' +
    `<rect x="65" y="67" width="26" height="2.6" rx="1.3" fill="${SAINT_GOLD}"/>` +
    '<path d="M68.5 46 Q78 27 87.5 46 L89 56 Q78 51 67 56 Z" fill="#6c2f86"/>' +
    '<path d="M70 46 Q78 31 86 46 L86.5 52 Q78 49 69.5 52 Z" fill="#fff" fill-opacity=".22"/>' +
    `<circle cx="78" cy="43" r="6" fill="${SAINT_SKIN}"/>` +
    '<path d="M74.6 43.2 q1.2 1 2.4 0 M79 43.2 q1.2 1 2.4 0" fill="none" stroke="#6b4a3a" stroke-width=".8" stroke-linecap="round"/>' +
    `<rect x="61" y="59" width="9" height="12" rx="1.2" transform="rotate(-12 65.5 65)" fill="${SAINT_GOLD}"/>` +
    '<rect x="62.6" y="60.5" width="1.3" height="9" transform="rotate(-12 65.5 65)" fill="#fff" fill-opacity=".5"/>' +
    '<g class="arm"><path d="M85 54 L96 63 L92.5 67.5 L83 59 Z" fill="#7a3897"/>' +
    `<circle cx="95.6" cy="66.4" r="2.4" fill="${SAINT_SKIN}"/></g></g>`
  );
}

function saintCandle(x, n) {
  return (
    `<g class="candle c${n}"><rect x="${x - 2.5}" y="58" width="5" height="22" rx="1" fill="#fbf3e4" stroke="#e2d2b8" stroke-width=".6"/>` +
    `<ellipse class="glow" cx="${x}" cy="53" rx="6" ry="7" fill="${SAINT_GOLD}" fill-opacity=".22"/>` +
    `<path class="flame" d="M${x} 49 Q${x + 2.6} 53.5 ${x} 57 Q${x - 2.6} 53.5 ${x} 49 Z" fill="${SAINT_GOLD}"/></g>`
  );
}

function saintSparkle(x, y, n) {
  return `<path class="spark s${n}" d="M${x} ${y - 3}L${x + .8} ${y - .8}L${x + 3} ${y}L${x + .8} ${y + .8}L${x} ${y + 3}L${x - .8} ${y + .8}L${x - 3} ${y}L${x - .8} ${y - .8}Z" fill="${SAINT_GOLD}"/>`;
}

// The scene: 200 x 80, anchored at the bottom right of the banner, above the floor.
function saintScene() {
  return (
    '<svg class="scene" viewBox="0 0 200 80" preserveAspectRatio="xMaxYMax meet" aria-hidden="true" focusable="false">' +
    // Gothic arch of the window bay, two columns.
    '<path class="arch" d="M86 80 V34 Q120 -6 154 34 V80 Z"/>' +
    [70, 161, 186].map((x) => `<rect class="col" x="${x}" y="14" width="9" height="66"/><rect class="cap" x="${x - 2}" y="12" width="13" height="4" rx="1"/>`).join('') +
    `<polygon class="ray r1" points="112,40 128,40 108,80 58,80" fill="${SAINT_GOLD}"/>` +
    '<polygon class="ray r2" points="116,42 124,42 96,80 76,80" fill="#ffffff"/>' +
    `<g transform="translate(61.5 8) scale(.75)">${saintRose()}</g>` +
    `<g transform="translate(61.5 8) scale(.75)">${saintFigure()}</g>` +
    saintCandle(172, 1) +
    saintCandle(180, 2) +
    saintSparkle(98, 16, 1) +
    saintSparkle(150, 52, 2) +
    saintSparkle(92, 50, 3) +
    '</svg>'
  );
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
    var night = this._hass ? saintIsNight(this._hass, this._config) : null;
    this._hass = hass;
    var entityId = this._entityId();
    var st = entityId ? hass.states[entityId] : null;
    // Only redraw when the sensor, the language or day / night changed: hass updates several times a second.
    if (first || st !== this._lastState || lang !== saintLang(hass, this._config) || night !== saintIsNight(hass, this._config)) {
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

  // The round calendar icon, on frosted glass over the illustration; its colour is the header's status.
  _iconHtml() {
    return '<div class="badge"><ha-icon icon="mdi:calendar"></ha-icon></div>';
  }

  _ensureShell() {
    if (this._root) return;
    this._root = this.attachShadow({ mode: 'open' });
    this._root.innerHTML = `<style>${SaintCard._styles()}</style><ha-card><div class="header"></div><div class="body"></div></ha-card>`;
    // A new width (or the web font loaded): the status pill is fitted again, in the next frame.
    if (typeof ResizeObserver === 'function') {
      new ResizeObserver((entries) => {
        const w = Math.round(entries.at(-1).contentRect.width);
        if (w === this._fitWidth) return;
        this._fitWidth = w;
        cancelAnimationFrame(this._fitFrame);
        this._fitFrame = requestAnimationFrame(() => this._fitPill());
      }).observe(this);
    }
    document.fonts?.ready?.then(() => this._fitPill());
    this._root.querySelector('ha-card').addEventListener('click', (ev) => {
      if (ev.target.closest?.('.feast')) this._moreInfo();
    });
    // The mini card's detail button (kept from one render to the next: one listener, on its header).
    this._root.querySelector('.header').addEventListener('click', (ev) => {
      if (ev.target.closest?.('.detail')) this._toggleDetail?.(ev);
    });
    this._root.querySelector('ha-card').addEventListener('keydown', (ev) => {
      if ((ev.key === 'Enter' || ev.key === ' ') && ev.target.closest?.('.feast')) {
        ev.preventDefault();
        this._moreInfo();
      }
    });
  }

  // The status pill stays right after the title only while the whole title and the pill's whole label fit on that
  // row; otherwise it takes a line of its own under the subtitle (.below), and when even then the text would leave the
  // banner or run into its floor strip, it keeps its dot alone (.pill-dot). Measured in the real fonts, so that every
  // language and title length gets its own answer.
  _fitPill() {
    for (const t of this._root?.querySelectorAll?.('.banner .titles') || []) {
      const row = t.querySelector(':scope > .trow');
      const pill = row?.querySelector(':scope > .pill');
      if (!pill?.getBoundingClientRect) continue;
      t.classList.remove('below', 'pill-dot');
      const name = row.querySelector(':scope > .name');
      const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
      const title = name && getComputedStyle(name).display !== 'none' ? saintTextWidth(name) + gap : 0;
      const natural = pill.getBoundingClientRect().width;
      if (title + natural <= row.getBoundingClientRect().width) continue;
      t.classList.add('below');
      const banner = t.closest('.banner');
      const r = t.getBoundingClientRect();
      const box = banner.getBoundingClientRect();
      const floor = banner.querySelector('.floor')?.getBoundingClientRect().top ?? box.bottom;
      if (r.bottom > floor + 0.5 || r.top < box.top - 0.5 || natural > r.width + 0.5) t.classList.add('pill-dot');
    }
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

    var names = Array.isArray(attrs.names) ? attrs.names : [];
    var wish = unavailable || !this._config.show_wish ? '' : saintWish(t, names, locale);
    // The illustrated banner. Full card: the title and the date. Compact mini card: the banner is the whole card,
    // today's feast laid on it with the wish (else the date).
    // The status pill right after the title (or the feast): today's feast, sensor unavailable or not found, in the
    // colour of the round icon.
    var status = saintStatus(st);
    var pillText = status === 'ok' ? t.status_today : status === 'off' ? t.status_unavailable : t.status_not_found;
    var pill =
      `<span class="pill" title="${saintEsc(pillText)}" aria-label="${saintEsc(pillText)}">` +
      `<span class="dot"></span><span class="pt">${saintEsc(pillText)}</span></span>`;
    var texts =
      compact && !unavailable
        ? `<div class="titles feast" role="button" tabindex="0"><div class="trow"><div class="name">${saintEsc(st.state)}</div>${pill}</div>` +
          `<div class="sub" title="${saintEsc(wish || date)}">${saintEsc(wish || date)}</div></div>`
        : `<div class="titles"><div class="trow"><div class="name">${saintEsc(title)}</div>${pill}</div>` +
          (date ? `<div class="sub" title="${saintEsc(date)}">${saintEsc(date)}</div>` : '') +
          '</div>';
    var detail = this._detailButton(t);
    // illustration: false keeps a classic header (the round icon and the texts, no scene, no floor).
    var illustrated = this._config.illustration !== false;
    var cls =
      (compact ? ' mini' : '') +
      (illustrated && saintIsNight(this._hass, this._config) ? ' night' : '') +
      (illustrated ? (this._config.show_background === false ? ' plain' : '') : ' classic') +
      (detail ? ' with-detail' : '') +
      ` st-${status}`;
    saintMorph(
      header,
      `<div class="banner${cls}">${illustrated ? `${saintScene()}<div class="floor"></div>` : ''}` +
        `<div class="head">${this._iconHtml()}${texts}</div>${detail}</div>`,
    );
    this._fitPill();

    if (!st) {
      this._shown = null;
      saintMorph(body, `<div class="empty">${saintEsc(t.no_entity)}</div>`);
      return;
    }
    if (unavailable) {
      this._shown = null;
      saintMorph(body, `<div class="empty">${saintEsc(t.unavailable)}</div>`);
      return;
    }
    if (compact) {
      this._shown = `${attrs.date}|${st.state}`;
      saintMorph(body, '');
      return;
    }
    var html =
      `<div class="feast" role="button" tabindex="0"><div class="label">${saintEsc(st.state)}</div>` +
      (wish ? `<div class="wish">${saintEsc(wish)}</div>` : '') +
      '</div>';
    var upcoming = (Array.isArray(attrs.upcoming) ? attrs.upcoming : []).slice(0, this._config.upcoming_days);
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
    saintMorph(body, html);
    // The feast fades in when it is new (first draw, a new day), not when the mini card folds or the language changes.
    var shown = `${attrs.date}|${st.state}`;
    // The nodes are kept: a new feast replays the entrance even when the last one still holds the class.
    if (shown !== this._shown && body.classList.contains?.('enter')) {
      body.classList.remove('enter');
      void body.offsetWidth;
    }
    body.classList.toggle('enter', shown !== this._shown);
    this._shown = shown;
  }

  static _styles() {
    return [
      ':host { display: block; }',
      // A 0 px high line gives the host a preferred width without a minimum, as in the other cards: the card keeps a
      // width in auto-sized containers and still shrinks in a `1fr 1fr` grid.
      ':host::before { content: ""; display: grid; grid-template-columns: minmax(0, 320px); height: 0; }',
      'ha-card { overflow: hidden; container: saint / inline-size; }',
      // ── Illustrated header (90 px, as on the other cards with a scene): a sky across the card, the saint in front of
      // the rose window on the right, a 10 px strip of paving stones edge to edge, the round icon and the texts on the left.
      '.banner { position: relative; height: var(--banner-h, 90px); overflow: hidden; --floor-h: 10px; --wall-text: #0d2a45; --wall-muted: #3b5b78;' +
        ' --st: #2f80ed; background: linear-gradient(90deg, #f1f8ff 0%, #e2f1fd 34%, #b9def8 70%, #9fd0f3 100%); }',
      // Night (a dark theme, or illustration_theme: night): a night sky, the paving
      // darkens, the texts turn light, the window and the candles glow.
      '.banner.night { --wall-text: #ffffff; --wall-muted: rgba(255,255,255,.78); --st: #8fbaff;' +
        ' background: linear-gradient(90deg, #1b2f52 0%, #15284a 36%, #0f1f3d 72%, #0a1830 100%); }',
      // The round icon's colour is the status: feast known (accent), sensor unavailable (grey), no sensor (red).
      '.st-off { --st: #8a939c; } .night.st-off { --st: #9aa3ad; }',
      '.st-alert { --st: #e53935; } .night.st-alert { --st: #ff6b6b; }',
      '.scene .arch { fill: #e6d8ef; } .scene .col { fill: #ddcce9; } .scene .cap { fill: #cdb8dd; } .scene .disc { fill: #fbf7fd; stroke: #b9a4c9; }',
      '.night .scene .disc { fill: #fff6e0; }',
      // Without a feast to show, the scene rests: greyed, the animations stopped.
      '.st-off .scene, .st-alert .scene { filter: grayscale(.85); opacity: .6; }',
      '.st-off .scene *, .st-alert .scene * { animation: none !important; }',
      // The chapel's lavender paving, by day and by night.
      '.floor { position: absolute; left: 0; right: 0; bottom: 0; height: var(--floor-h); box-shadow: inset 0 1px 0 #b19dc2;' +
        ' background: repeating-linear-gradient(90deg, #d4c4df 0 15px, #c6b2d4 15px 30px); }',
      '.night .floor { box-shadow: inset 0 1px 0 #4b3a5c; background: repeating-linear-gradient(90deg, #3a2b48 0 15px, #30233d 15px 30px); }',
      '.night .badge { background: rgba(255,255,255,.12); box-shadow: inset 0 0 0 1px rgba(255,255,255,.14); }',
      '.night .detail { color: #ffffff; background: rgba(255,255,255,.12); box-shadow: inset 0 0 0 1px rgba(255,255,255,.2); }',
      '.night .detail:hover { background: rgba(255,255,255,.22); }',
      // show_background: false — no sky: the scene and the paving sit on the card, the texts and the round icon take the
      // theme's colours, as on the cards without an illustration. illustration: false — the classic header, no scene.
      '.banner.plain, .banner.classic { background: none; --wall-text: var(--primary-text-color); --wall-muted: var(--secondary-text-color); }',
      '.plain .badge, .classic .badge { background: color-mix(in srgb, var(--st) 16%, transparent); box-shadow: none; }',
      '.banner.classic { --banner-h: 64px; --floor-h: 0px; --scene-max: 0px; }',
      '.plain .detail, .plain .detail:hover, .classic .detail, .classic .detail:hover { color: var(--secondary-text-color); background: none;' +
        ' -webkit-backdrop-filter: none; backdrop-filter: none; box-shadow: inset 0 0 0 1px var(--divider-color, rgba(127,127,127,.3)); }',
      '.plain .detail:hover, .classic .detail:hover { color: var(--primary-text-color); background: color-mix(in srgb, var(--secondary-text-color) 12%, transparent); }',
      '.banner .scene { position: absolute; right: 0; bottom: var(--floor-h); height: calc(100% - var(--floor-h));' +
        ' width: min(calc((var(--banner-h, 90px) - var(--floor-h)) * 2.5), var(--scene-max, 62%)); }',
      '.head { position: absolute; z-index: 1; left: 0; top: 0; bottom: var(--floor-h); box-sizing: border-box;' +
        ' right: min(calc((var(--banner-h, 90px) - var(--floor-h)) * 2.5), var(--scene-max, 62%));' +
        ' display: flex; align-items: center; gap: 10px; padding: 8px 8px 8px 14px; min-width: 0; color: var(--wall-text); }',
      // The full card's texts may run over the scene's light rays too (its left third), never over the saint.
      '@container (min-width: 301px) { .banner:not(.mini):not(.classic) .head { right: calc(min(calc((var(--banner-h, 90px) - var(--floor-h)) * 2.5), var(--scene-max, 62%)) * .66); } }',
      '.badge { width: 40px; height: 40px; flex: none; border-radius: 50%; display: grid; place-items: center; color: var(--st);' +
        ' background: rgba(255,255,255,.62); box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--st) 18%, transparent); }',
      '.badge ha-icon { --mdc-icon-size: 24px; }',
      '.titles { flex: 1 1 0; min-width: 0; overflow: hidden; display: flex; flex-wrap: wrap; align-items: center; column-gap: 8px;' +
        ' container: saint-titles / inline-size; }',
      '.titles > * { flex: 1 0 100%; min-width: 0; }',
      // The title (or the mini card's feast), then its status pill 8 px after it, centred on it, while the whole title
      // and the pill's whole label fit on that row; otherwise (measured by the card, see _fitPill) the title takes its
      // whole line and the pill goes under the subtitle (.below), its dot alone (.pill-dot) when even then the text
      // would leave the banner or run into the floor strip.
      '.trow { display: flex; align-items: center; gap: 8px; min-width: 0; }',
      '.trow .name { flex: 0 1 auto; min-width: 0; display: block; white-space: nowrap; text-overflow: ellipsis; }',
      '.pill { flex: none; display: inline-flex; align-items: center; gap: 4px; max-width: none; min-width: 0; box-sizing: border-box; padding: 1px 8px;' +
        ' border-radius: 12px; font-size: 11px; font-weight: 500; line-height: 16px; white-space: nowrap; overflow: hidden;' +
        ' background: color-mix(in srgb, var(--st) 18%, rgba(255,255,255,.78)); color: color-mix(in srgb, var(--st) 45%, #0d2a45); }',
      '.night .pill { background: color-mix(in srgb, var(--st) 30%, rgba(8,18,38,.55)); color: color-mix(in srgb, var(--st) 35%, #ffffff); }',
      '.plain .pill, .classic .pill { background: color-mix(in srgb, var(--st) 15%, transparent);' +
        ' color: color-mix(in srgb, var(--st) 50%, var(--primary-text-color)); }',
      '.pill .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--st); flex: none; }',
      '.pill .pt { min-width: 0; overflow: hidden; text-overflow: ellipsis; }',
      '.titles.below .trow { display: contents; }',
      '.titles.below .trow .name { flex: 1 0 100%; }',
      '.titles.below > .sub { order: 1; }',
      '.titles.below .pill { order: 2; margin-top: 2px; max-width: 100%; }',
      '.titles.pill-dot .pill { padding: 5px; }',
      '.titles.pill-dot .pill .pt { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }',
      // Under 200 px only the pill's dot shows (its text stays its tooltip and accessible name).
      '@container saint (max-width: 200px) { .titles .pill { padding: 5px; }' +
        ' .pill .pt { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); } }',
      ':host([hide-title]) .banner:not(.mini) .name { display: none; }',
      // The title (or the mini card's feast) may take two lines, the line under it one.
      '.name { font-size: 16px; font-weight: 500; line-height: 20px; overflow: hidden; overflow-wrap: anywhere;' +
        ' display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; }',
      '.sub { font-size: 13px; line-height: 16px; color: var(--wall-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }',
      ':host([hide-title]) .banner:not(.mini) .sub { font-size: 14px; color: var(--wall-text); }',
      '.banner .feast { cursor: pointer; border-radius: 6px; }',
      // ── The scene's animations ──
      '.scene .rose { transform-box: fill-box; transform-origin: center; animation: saint-turn 48s linear infinite; }',
      '.scene .ray { opacity: .2; animation: saint-ray 3s ease-in-out infinite; }',
      '.night .scene .r2 { fill: #ffd98a; }',
      '.scene .r2 { opacity: .35; animation-delay: -1.5s; }',
      '.scene .saint { transform-box: fill-box; transform-origin: 50% 100%; animation: saint-sway 6s ease-in-out infinite; }',
      '.scene .arm { transform-box: fill-box; transform-origin: 13% 13%; animation: saint-bless 6s ease-in-out infinite; }',
      '.scene .halo, .scene .glow, .scene .spark { transform-box: fill-box; transform-origin: center; }',
      '.scene .halo { animation: saint-glow 3s ease-in-out infinite; }',
      '.scene .flame { transform-box: fill-box; transform-origin: 50% 100%; animation: saint-flicker 1s ease-in-out infinite; }',
      '.scene .glow { animation: saint-glow 1s ease-in-out infinite; }',
      '.scene .c2 .flame, .scene .c2 .glow { animation-delay: -.5s; }',
      '.scene .spark { opacity: 0; animation: saint-twinkle 3s ease-in-out infinite; }',
      '.scene .s2 { animation-delay: -1s; } .scene .s3 { animation-delay: -2s; }',
      '@keyframes saint-turn { to { transform: rotate(360deg); } }',
      '@keyframes saint-ray { 50% { opacity: .38; } }',
      '@keyframes saint-sway { 25% { transform: rotate(1.5deg); } 75% { transform: rotate(-1.5deg); } }',
      // Arm down, raised to bless half way through the loop, then lowered.
      '@keyframes saint-bless { 0%, 45%, 100% { transform: none; } 60%, 80% { transform: rotate(-75deg); } }',
      '@keyframes saint-glow { 50% { transform: scale(1.12); fill-opacity: .5; } }',
      '@keyframes saint-flicker { 25% { transform: scale(.9, 1.1) rotate(4deg); } 50% { transform: scale(1.05, .92); } 75% { transform: scale(.95, 1.06) rotate(-4deg); } }',
      '@keyframes saint-twinkle { 50% { opacity: .9; transform: scale(1.2); } }',
      // ── Body: neutral, today's feast first, then the next days ──
      '.body { padding: 12px 12px 12px; }',
      '.body:empty { display: none; }',
      '.empty { padding: 0 4px; color: var(--secondary-text-color); }',
      '.body .feast { cursor: pointer; padding: 10px 12px; border-radius: 12px; background: color-mix(in srgb, var(--primary-text-color) 5%, transparent); }',
      '.feast:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }',
      '.label { font-size: 22px; font-weight: 500; line-height: 1.2; color: var(--primary-text-color); overflow-wrap: anywhere; }',
      `.wish { margin-top: 4px; font-size: 14px; color: color-mix(in srgb, ${SAINT_ACCENT} 60%, var(--primary-text-color)); overflow-wrap: anywhere; }`,
      '.section { margin: 12px 4px 4px; font-size: 12px; font-weight: 500; letter-spacing: .02em; color: var(--secondary-text-color); }',
      '.upcoming { list-style: none; margin: 0; padding: 0; }',
      '.upcoming li { display: flex; gap: 12px; align-items: baseline; padding: 6px 4px; border-top: 1px solid var(--divider-color, rgba(0,0,0,.12)); font-size: 14px; }',
      '.upcoming li:first-child { border-top: none; }',
      '.when { flex: none; min-width: 7.5em; color: var(--secondary-text-color); font-size: 13px; }',
      '.what { min-width: 0; color: var(--primary-text-color); overflow-wrap: anywhere; }',
      // A new feast (first draw, a new day) fades in, line after line.
      '.enter .label, .enter .wish, .enter .section, .enter li { animation: saint-in .5s ease-out both; }',
      '.enter .wish { animation-delay: .12s; } .enter .section { animation-delay: .2s; }',
      ...[1, 2, 3, 4, 5, 6, 7].map((n) => `.enter li:nth-child(${n}) { animation-delay: ${(0.2 + n * 0.07).toFixed(2)}s; }`),
      '@keyframes saint-in { from { opacity: 0; transform: translateY(6px); } }',
      '@media (prefers-reduced-motion: reduce) { .scene *, .enter * { animation: none !important; } }',
      '@container (max-width: 380px) { .banner:not(.mini):not(.classic) { --scene-max: 50%; } }',
      // A narrow card keeps the wall and the floor for its texts: no scenery.
      '@container (max-width: 300px) { .banner:not(.mini) .scene { display: none; } .banner:not(.mini) .head { right: 0; } .when { min-width: 0; } .upcoming li { flex-direction: column; gap: 0; } }',
      // ── Mini card: the same 90 px banner, today's feast laid on the sky, the detail button on frosted glass. ──
      ':host([mini])::before { grid-template-columns: minmax(0, 300px); }',
      '.banner.mini:not(.classic) { --scene-max: 44%; }',
      // The feast's texts may run over the scene's light rays (its left part), never over the saint and the window.
      '.banner.mini:not(.classic) .head { padding-right: 6px; right: calc(min(200px, var(--scene-max)) * .6); }',
      '.banner.mini .name { font-size: 16px; line-height: 20px; }',
      '@container (max-width: 280px) { .banner.mini .scene { display: none; } .banner.mini:not(.classic) .head { right: 0; } .banner.mini .head { padding-right: 40px; } .banner.mini.with-detail .head { padding-right: 6px; } }',
      // The mini card's detail button gets its own strip of wall on the right, 5 px from the edges: the scene moves
      // aside so that the button never covers it.
      '.with-detail .scene { right: 36px; }',
      '.with-detail .head { margin-right: 36px; }',
      '.detail { all: unset; position: absolute; z-index: 2; top: 5px; right: 5px; cursor: pointer; width: 24px; height: 24px; border-radius: 50%;' +
        ' display: grid; place-items: center; color: #33506b; background: rgba(255,255,255,.55); box-shadow: inset 0 0 0 1px rgba(255,255,255,.7);' +
        ' -webkit-backdrop-filter: blur(4px); backdrop-filter: blur(4px); --mdc-icon-size: 16px; }',
      '.detail:hover { background: rgba(255,255,255,.75); }',
      '.detail:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 1px; }',
    ].join('\n');
  }
}

// A click inside Home Assistant's dialogs (more-info, confirmations) is not "outside" the card.
function saintInDialog(ev) {
  return ev.composedPath().some((n) => ['ha-more-info-dialog', 'ha-dialog', 'dialog'].includes(n.localName));
}

// « A click elsewhere », caught on the pointer: iOS (Safari and the companion app) sends no click for a tap on
// something that is not clickable. It counts when the press and the release are both outside the card (a slider
// dragged out of it does not count, nor a scroll, which cancels the pointer); keyboard clicks (no click count) go
// through the click event.
function saintWatchOutside(card, handler) {
  var downOutside = false;
  var outside = (ev) => !ev.composedPath().includes(card);
  var onDown = (ev) => {
    downOutside = outside(ev);
  };
  var onUp = (ev) => {
    if (downOutside && outside(ev)) handler(ev);
    downOutside = false;
  };
  var onClick = (ev) => {
    if (ev.detail === 0 && outside(ev)) handler(ev);
  };
  return {
    on() {
      document.addEventListener('pointerdown', onDown, true);
      document.addEventListener('pointerup', onUp, true);
      document.addEventListener('click', onClick, true);
    },
    off() {
      document.removeEventListener('pointerdown', onDown, true);
      document.removeEventListener('pointerup', onUp, true);
      document.removeEventListener('click', onClick, true);
    },
    // A tap (press and release at the same spot), for the tests.
    tap(ev) {
      onDown(ev);
      onUp(ev);
    },
  };
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
    (this._miniWatch = this._miniWatch || saintWatchOutside(this, this._onOutsideMini)).on();
    // Back on the page after leaving it: drawn again, compact.
    if (this._left && this._hass && this._config) this._render();
    this._left = false;
  }

  disconnectedCallback() {
    this._miniWatch?.off();
    // Left (another dashboard view, a conditional card hidden): back to the compact view.
    this._left = true;
    this._zoomed = false;
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
        { name: 'show_background', selector: { boolean: {} } },
        { name: 'illustration', selector: { boolean: {} } },
      ],
    },
    {
      name: 'illustration_theme',
      selector: { select: { mode: 'dropdown', options: ['auto', 'day', 'night'].map((v) => ({ value: v, label: t[`theme_${v}`] })) } },
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
