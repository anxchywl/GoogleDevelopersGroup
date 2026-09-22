import type { Locale } from "./types";

const en = {
  language: "Language", skip: "Skip to content", home: "Back to the top of the page",
  nav: ["Value", "Event", "Packages", "Community"],
  partner: "Become a partner", seePackages: "See the packages",
  by: "by Google Developer Groups on Campus",
  byline: "GOOGLE DEVELOPER GROUPS / ON CAMPUS NAZARBAYEV UNIVERSITY",
  heroLead: "A 48-hour datathon for 300+ of the strongest IT and mathematics students in Kazakhstan. We are looking for the company that brings the case and the prize fund.",
  place: "Nazarbayev University, Astana", date: "Dates to be announced",
  stats: [
    { value: "300+", label: "participants expected" },
    { value: "48", label: "hours of building" },
    { value: "02", label: "technical tracks" },
    { value: "03", label: "days on campus" },
  ],

  valueLabel: "01 / WHAT YOU GET", valueTitle: "What your company\ngets out of it.",
  values: [
    { title: "Hiring pipeline", body: "300+ IT and maths students in one room for a weekend. Participants who opt in share their CV and GitHub with you." },
    { title: "A business problem, solved", body: "Hand the room a real technical case and leave with ten or more concepts and working prototypes." },
    { title: "Branding and reach", body: "Your brand inside Nazarbayev University student channels and across the GDG community feed." },
  ],

  eventLabel: "02 / THE EVENT", eventTitle: "One case.\nTwo tracks. 48 hours.",
  eventBody: "Teams receive a real dataset and a real question from a partner company, then build a working prototype from scratch under mentors from the industry.",
  tracks: [
    { tag: "TRACK 01", title: "Software Engineering", body: "High-load web and mobile products, complex backend systems, API integration, and efficient cloud architecture.", tags: ["Products", "APIs", "Cloud"] },
    { tag: "TRACK 02", title: "Machine Learning and Data Science", body: "Predictive models, large-scale analysis, and intelligent agents built on current tooling, including Google Gemini.", tags: ["Models", "Analysis", "Agents"] },
  ],
  day: "Day",
  days: [
    { title: "Speakers and coffee break", body: "Talks and workshops from industry experts, a walk through the technical stack, and the networking where teams form." },
    { title: "Case announcement", body: "Partners present their tasks, teams lock in, mentor checkpoints start, and development runs non-stop." },
    { title: "Pitching", body: "Teams package the product, present to the jury, and the winners are announced." },
  ],

  packagesLabel: "03 / PACKAGES", packagesTitle: "Four ways to sponsor.",
  scopeLabels: ["Both tracks", "One track", "Hiring", "Barter"],
  packagePrice: "Package price", toDiscuss: "Agreed with you",
  prizeFund: "Fixed prize fund", proposedFund: "Proposed prize fund",
  perTrack: "Per track: 1st / 2nd / 3rd",
  fundingNote: "The prize fund is not the package price. Operations and merch are agreed separately.",
  packages: {
    exclusive: { title: "Exclusive sponsor", intro: "The whole event carries your name.", benefits: ["Your brand in the name of the hackathon", "Exclusive cases in both tracks", "Up to five minutes on stage at the opening or closing", "The largest logo across every printed and digital surface", "A branded booth in the hiring zone", "Introductions to participants in both tracks who opt in"], note: "Naming integration is agreed separately with the university and with Google brand review." },
    track: { title: "Main track sponsor", intro: "One track, written around your problem.", benefits: ["A case built from your company's actual task", "Your experts as mentors and jury for the track", "Introductions to that track's participants who opt in", "Exclusivity inside your track"], note: "The second track may go to another sponsor who is not your direct competitor. Undivided exclusivity over the whole event comes only with the exclusive package." },
    internship: { title: "Internship sponsor", intro: "Hiring access without a prize fund.", benefits: ["First pick of the strongest participants for your internships and career tracks", "Your open roles sent to the participants who asked to hear about them", "Logo on the site, the press wall, and the career partners section", "Option: co-fund the coffee break and put your name on the snack bar"], note: "Participation never guarantees a hire, an accepted offer, or access to a participant database." },
    snacks: { title: "Snack partner", intro: "Full barter. Feed the room.", benefits: ["Roll-ups, flags and products in the coffee-break zone, in front of everyone every two to three hours", "Exclusive right to run the night activity, from story tags to pizza runs", "Logo on the site, the main banner and the posters, plus host mentions at the opening, closing and breaks", "Promo codes, flyers and merch handed straight to participants"], note: "Volumes, timing and exclusivity are agreed in advance." },
  },

  orgLabel: "04 / COMMUNITY", orgTitle: "The people\nrunning it.",
  orgBody: "GDG on Campus Nazarbayev University is the official campus chapter at NU. We run talks, workshops and hackathons for students in IT, mathematics and related fields.",
  mission: "We work to grow the IT ecosystem in Kazakhstan, teach current technology such as generative AI and cloud, and connect student talent with business.",
  teamCaption: "GDG on Campus NU members, September 2025",
  orgStats: [
    { value: "1 024", label: "subscribers on Telegram" },
    { value: "987", label: "followers on Instagram" },
  ],
  orgPlace: "Nazarbayev University campus, Astana",
  galleryLabel: "From our events",
  photos: {
    devfest: "DevFest, with a Google Cloud Developer Expert on stage",
    talks: "Google Talks, students speaking about their internships",
    mentoring: "NeHackathon, mentors at the team tables",
    workshop: "A technical workshop on campus",
    solutions: "Google Solutions Challenge session",
  },
  partnersLabel: "Companies that have worked with us",

  footerEvents: "Our events",
  jams: {
    nav: ["About", "Format", "Join", "Next jam"],
    headerCta: "Join the channel",
    tagline: "Students and professors on one team.",
    heroLead: "A short case competition at Nazarbayev University. Students and professors work in mixed teams on one real problem and pitch their solution to a panel.",
    studentCta: "I am a student", professorCta: "I am a professor",
    next: "Next jam", timeRange: "{start} to {end}",
    table: { students: "Students", professors: "Professors", case: "CASE" },

    aboutLabel: "01 / WHAT IT IS", aboutTitle: "A case competition\nwith your professors.",
    aboutBody: "Google Jams replaces the lecture format with teamwork. Students and professors sit at the same table and work on the same problem.",
    compare: {
      caption: "A lecture compared with a jam", lecture: "A lecture", jam: "A jam",
      rows: [
        { lecture: "One person talks", jam: "Everyone at the table talks" },
        { lecture: "The professor stands at the front", jam: "The professor sits on your team" },
        { lecture: "You take notes", jam: "You build an answer" },
        { lecture: "Graded weeks later", jam: "Pitched the same evening" },
      ],
    },

    formatLabel: "02 / HOW IT RUNS", formatTitle: "Warm up. Solve.\nPitch.",
    formatBody: "The plan for the next jam.",
    minutes: "min",
    steps: [
      { title: "Warm-up", body: "Code puzzles and bingo." },
      { title: "Case solving", body: "Teams get the case and work on a solution together with professors." },
      { title: "Coffee break" },
      { title: "Pitching", body: "Each team presents its solution to the panel and answers questions." },
    ],
    warmupsLabel: "Try the warm-ups",
    puzzles: {
      title: "Code puzzles", body: "You get a function cut into fragments. Work out the logic, look at each piece and put them back in the order that runs.",
      hint: "Tap the lines in the order they run.", done: "It runs.", again: "Shuffle again",
    },
    bingo: {
      title: "Bingo", body: "You get a card of descriptions. Walk around, talk to people, find someone who fits each one and write their name in the box.",
      sample: "Sample bingo card", win: "Bingo. Full line.",
      cells: ["Has their own app", "Speaks three languages", "Writes Python", "Has been to a hackathon", "In first year", "Reads research papers", "Dark mode everywhere", "Has pitched before", "Tea over coffee"],
    },
    criteriaLabel: "The jury sheet", criteriaHead: ["Criterion", "What the jury looks for", "Score"],
    criteria: {
      feasibility: { title: "Feasibility", body: "Could this actually be built with what the team has?" },
      creativity: { title: "Creativity", body: "A fresh angle on the problem, as long as it still makes sense and solves it." },
      process: { title: "Process", body: "The steps to bring it to life: planning, design, development and testing." },
      expenses: { title: "Expenses", body: "A rough cost broken into parts. No exact prices, just proof you thought about the budget." },
      scalability: { title: "Scalability", body: "Does it still work when ten times more people use it?" },
    },

    joinLabel: "03 / WHY JOIN", joinTitle: "Two sides\nof one table.",
    students: {
      tag: "FOR STUDENTS", title: "Work next to your professors.",
      benefits: ["Solve a real problem with professors on your team", "Meet new people during the warm-up games", "Practise pitching in front of a panel", "No finished product needed. Slides, a PDF or a demo link are enough", "Prizes for the winners, coffee for everyone"],
      cta: "Follow the channel for registration",
    },
    professors: {
      tag: "FOR PROFESSORS", title: "Two hours. Nothing to prepare.",
      benefits: ["We prepare the case and run the event", "Work with students outside the lecture hall and see how they solve a real problem", "Meet strong students and maybe find your next research assistant", "Guide a team and ask questions at the pitches", "Have a problem from your field that students could try? Tell us"],
      cta: "Write to us",
    },

    nextLabel: "04 / NEXT JAM", nextTitle: "Save\nthe date.",
    nextBody: "The registration link will be posted in our Telegram channel.",
    runByLabel: "WHO RUNS IT", runBy: "Google Jams is run by GDG on Campus Nazarbayev University, the team behind DevFest, Google Talks and NeHackathon on campus.",
  },

  footerContact: "Talk to us",
  sourceCode: "Open source on GitHub", rights: "GDG on Campus Nazarbayev University",
  emailLabel: "Email", instagramLabel: "Instagram", telegramLabel: "Telegram",
};

const kk: typeof en = {
  language: "Тіл", skip: "Мазмұнға өту", home: "Беттің басына оралу",
  nav: ["Пайда", "Іс-шара", "Пакеттер", "Қауымдастық"],
  partner: "Серіктес болу", seePackages: "Пакеттерді көру",
  by: "Google Developer Groups on Campus ұйымдастырады",
  byline: "GOOGLE DEVELOPER GROUPS / ON CAMPUS NAZARBAYEV UNIVERSITY",
  heroLead: "Қазақстандағы ең күшті IT және математика студенттерінің 300-ден астамына арналған 48 сағаттық дататон. Кейс пен жүлде қорын ұсынатын компанияны іздеп жатырмыз.",
  place: "Назарбаев Университеті, Астана", date: "Күндері кейін жарияланады",
  stats: [
    { value: "300+", label: "күтілетін қатысушы" },
    { value: "48", label: "сағат әзірлеу" },
    { value: "02", label: "техникалық бағыт" },
    { value: "03", label: "күн кампуста" },
  ],

  valueLabel: "01 / СІЗ НЕ АЛАСЫЗ", valueTitle: "Компанияңыз нақты\nне алады.",
  values: [
    { title: "Кадрлық ағын", body: "Бір демалыс күні бір залда 300-ден астам IT және математика студенті. Келісім берген қатысушылар түйіндеме мен GitHub сілтемесін сізбен бөліседі." },
    { title: "Бизнес-міндеттің шешімі", body: "Залға нақты техникалық кейс беріп, он немесе одан көп тұжырымдама мен жұмыс істейтін прототип алыңыз." },
    { title: "Брендинг және қамту", body: "Брендіңіз Назарбаев Университетінің студенттік арналарында және GDG қауымдастығының лентасында." },
  ],

  eventLabel: "02 / ІС-ШАРА", eventTitle: "Бір кейс.\nЕкі бағыт. 48 сағат.",
  eventBody: "Командалар серіктес компаниядан нақты деректер жинағы мен нақты сұрақ алады да, индустрия менторларының қолдауымен нөлден жұмыс істейтін прототип жасайды.",
  tracks: [
    { tag: "БАҒЫТ 01", title: "Бағдарламалық инженерия", body: "Жоғары жүктемелі веб және мобильді өнімдер, күрделі серверлік жүйелер, API интеграциясы және тиімді бұлттық архитектура.", tags: ["Өнімдер", "API", "Бұлт"] },
    { tag: "БАҒЫТ 02", title: "Машиналық оқыту және деректер ғылымы", body: "Болжамдық модельдер, ауқымды талдау және заманауи құралдарға, оның ішінде Google Gemini-ге негізделген зияткерлік агенттер.", tags: ["Модельдер", "Талдау", "Агенттер"] },
  ],
  day: "Күн",
  days: [
    { title: "Спикерлер және кофе-брейк", body: "Индустрия сарапшыларының дәрістері мен воркшоптары, техникалық стекпен танысу және командалар құрылатын нетворкинг." },
    { title: "Кейсті жариялау", body: "Серіктестер міндеттерін ұсынады, командалар бекітіледі, менторлармен кездесулер басталады және әзірлеу тоқтаусыз жүреді." },
    { title: "Питчинг", body: "Командалар өнімді жинақтап, қазылар алқасына ұсынады, жеңімпаздар жарияланады." },
  ],

  packagesLabel: "03 / ПАКЕТТЕР", packagesTitle: "Демеушіліктің төрт форматы.",
  scopeLabels: ["Екі бағыт", "Бір бағыт", "Рекрутинг", "Бартер"],
  packagePrice: "Пакет құны", toDiscuss: "Сізбен келісіледі",
  prizeFund: "Тіркелген жүлде қоры", proposedFund: "Ұсынылатын жүлде қоры",
  perTrack: "Әр бағытта: 1 / 2 / 3-орын",
  fundingNote: "Жүлде қоры пакеттің құны емес. Ұйымдастыру шығындары мен мерч бөлек келісіледі.",
  packages: {
    exclusive: { title: "Эксклюзивті демеуші", intro: "Бүкіл іс-шара сіздің атыңызбен өтеді.", benefits: ["Хакатон атауына брендіңізді қосу", "Екі бағытта да эксклюзивті кейстер", "Ашылуда не жабылуда сахнада бес минутқа дейін сөз сөйлеу", "Барлық баспа және цифрлық материалдарда ең үлкен логотип", "Рекрутинг аймағында брендтелген стенд", "Келісім берген екі бағыт қатысушыларымен танысу"], note: "Атауға бренд қосу университетпен және Google бренд талаптарымен бөлек келісіледі." },
    track: { title: "Бағыттың негізгі демеушісі", intro: "Бір бағыт, сіздің міндетіңізге жазылған.", benefits: ["Компанияңыздың нақты міндетінен құрылған кейс", "Сіздің сарапшыларыңыз бағыттың менторы және қазысы ретінде", "Келісім берген бағыт қатысушыларымен танысу", "Өз бағытыңыз аясындағы эксклюзивтілік"], note: "Екінші бағыт сіздің тікелей бәсекелесіңіз емес басқа демеушіге берілуі мүмкін. Бүкіл іс-шараға бөлінбейтін эксклюзивтілік тек эксклюзивті пакетпен беріледі." },
    internship: { title: "Тағылымдама демеушісі", intro: "Жүлде қорынсыз рекрутинг мүмкіндігі.", benefits: ["Ең күшті қатысушыларды тағылымдама мен мансап бағдарламаларына бірінші болып шақыру құқығы", "Ашық вакансияларыңызды хабарлама алуға келісім берген қатысушыларға жіберу", "Сайтта, пресс-уолда және мансап серіктестері бөлімінде логотип", "Опция: кофе-брейкті бірлесіп қаржыландырып, снэк-барға атыңызды қою"], note: "Қатысу жұмысқа қабылдауға, ұсынысты қабылдауға немесе қатысушылар базасына қол жеткізуге кепілдік бермейді." },
    snacks: { title: "Снэк серіктесі", intro: "Толық бартер. Залды тамақтандырыңыз.", benefits: ["Кофе-брейк аймағында ролл-ап, тулар және өнім, әр екі-үш сағат сайын барлығының көз алдында", "Түнгі белсенділікті өткізудің эксклюзивті құқығы: сторис белгілеуден пиццаға дейін", "Сайтта, басты баннерде және афишаларда логотип, ашылуда, жабылуда және үзілістерде жүргізушінің атауы", "Промокодтар, флаерлер және мерчті қатысушылардың қолына тікелей беру"], note: "Көлемі, уақыты және эксклюзивтілігі алдын ала келісіледі." },
  },

  orgLabel: "04 / ҚАУЫМДАСТЫҚ", orgTitle: "Ұйымдастыратын\nадамдар.",
  orgBody: "GDG on Campus Nazarbayev University — НУ-дағы ресми кампус чаптері. Біз IT, математика және сабақтас салалардағы студенттерге арналған дәрістер, воркшоптар және хакатондар өткіземіз.",
  mission: "Біз Қазақстанның IT экожүйесін дамытуға, генеративті AI мен бұлт сияқты заманауи технологияларды үйретуге және студент таланттарын бизнеспен байланыстыруға жұмыс істейміз.",
  teamCaption: "GDG on Campus NU мүшелері, 2025 жылғы қыркүйек",
  orgStats: [
    { value: "1 024", label: "Telegram жазылушысы" },
    { value: "987", label: "Instagram жазылушысы" },
  ],
  orgPlace: "Назарбаев Университеті кампусы, Астана",
  galleryLabel: "Іс-шараларымыздан",
  photos: {
    devfest: "DevFest, сахнада Google Cloud Developer Expert",
    talks: "Google Talks, студенттер тағылымдамалары туралы айтады",
    mentoring: "NeHackathon, команда үстелдеріндегі менторлар",
    workshop: "Кампустағы техникалық воркшоп",
    solutions: "Google Solutions Challenge сессиясы",
  },
  partnersLabel: "Бізбен жұмыс істеген компаниялар",

  footerEvents: "Іс-шараларымыз",
  jams: {
    nav: ["Туралы", "Формат", "Қатысу", "Күні"],
    headerCta: "Арнаға жазылу",
    tagline: "Студенттер мен профессорлар бір командада.",
    heroLead: "Назарбаев Университетіндегі қысқа кейс-чемпионат. Студенттер мен профессорлар аралас командаларда бір нақты мәселенің үстінде жұмыс істеп, шешімін қазылар алқасына ұсынады.",
    studentCta: "Мен студентпін", professorCta: "Мен профессормын",
    next: "Келесі джем", timeRange: "{start}-ден {end}-ге дейін",
    table: { students: "Студенттер", professors: "Профессорлар", case: "КЕЙС" },

    aboutLabel: "01 / БҰЛ НЕ", aboutTitle: "Профессорлармен\nбірге кейс-чемпионат.",
    aboutBody: "Google Jams дәріс форматын командалық жұмыспен алмастырады. Студенттер мен профессорлар бір үстел басында бір мәселенің үстінде жұмыс істейді.",
    compare: {
      caption: "Дәріс пен джемді салыстыру", lecture: "Дәріс", jam: "Джем",
      rows: [
        { lecture: "Бір адам сөйлейді", jam: "Үстел басындағылардың бәрі сөйлейді" },
        { lecture: "Профессор алдыңғы жақта тұрады", jam: "Профессор сіздің командаңызда отырады" },
        { lecture: "Сіз конспект жазасыз", jam: "Сіз жауап құрастырасыз" },
        { lecture: "Баға апталардан кейін шығады", jam: "Сол кеште питч жасайсыз" },
      ],
    },

    formatLabel: "02 / ҚАЛАЙ ӨТЕДІ", formatTitle: "Жаттығу. Шешім.\nПитч.",
    formatBody: "Келесі джемнің жоспары.",
    minutes: "мин",
    steps: [
      { title: "Жаттығу", body: "Код жұмбақтары мен бинго." },
      { title: "Кейсті шешу", body: "Командалар кейсті алып, профессорлармен бірге шешім әзірлейді." },
      { title: "Кофе-брейк" },
      { title: "Питчинг", body: "Әр команда шешімін қазыларға ұсынып, сұрақтарға жауап береді." },
    ],
    warmupsLabel: "Жаттығуларды байқап көріңіз",
    puzzles: {
      title: "Код жұмбақтары", body: "Сізге бөліктерге бөлінген функция беріледі. Логикасын түсініп, әр фрагментті талдап, оларды жұмыс істейтін ретке қойыңыз.",
      hint: "Жолдарды орындалу ретімен басыңыз.", done: "Жұмыс істейді.", again: "Қайта араластыру",
    },
    bingo: {
      title: "Бинго", body: "Сізге түрлі сипаттамалар жазылған карточка беріледі. Залды аралап, адамдармен сөйлесіп, әр сипаттамаға сай адамды тауып, оның атын ұяшыққа жазыңыз.",
      sample: "Бинго карточкасының үлгісі", win: "Бинго. Толық қатар.",
      cells: ["Өз қосымшасы бар", "Үш тілде сөйлейді", "Python-да жазады", "Хакатонда болған", "Бірінші курста оқиды", "Ғылыми мақала оқиды", "Барлық жерде қараңғы тақырып", "Бұрын питч жасаған", "Кофеден гөрі шай"],
    },
    criteriaLabel: "Қазылар парағы", criteriaHead: ["Критерий", "Қазылар неге қарайды", "Балл"],
    criteria: {
      feasibility: { title: "Іске асырымдылық", body: "Мұны команданың қолындағы мүмкіндікпен шынымен жасауға бола ма?" },
      creativity: { title: "Креативтілік", body: "Мәселеге жаңа көзқарас, бірақ ол мағыналы болып, мәселені шешуі керек." },
      process: { title: "Процесс", body: "Идеяны іске асыру қадамдары: жоспарлау, дизайн, әзірлеу және тестілеу." },
      expenses: { title: "Шығындар", body: "Бөліктерге бөлінген шамамен құн. Нақты бағалар қажет емес, бюджетті ойластырғаныңызды көрсетсеңіз болды." },
      scalability: { title: "Масштабталу", body: "Қолданушылар он есе көбейсе де жұмыс істей ме?" },
    },

    joinLabel: "03 / НЕГЕ ҚАТЫСУ КЕРЕК", joinTitle: "Бір үстелдің\nекі жағы.",
    students: {
      tag: "СТУДЕНТТЕРГЕ", title: "Профессорлармен қатар жұмыс істеңіз.",
      benefits: ["Командаңыздағы профессорлармен бірге нақты мәселені шешіңіз", "Жаттығу ойындарында жаңа адамдармен танысыңыз", "Қазылар алдында питч жасап жаттығыңыз", "Дайын өнім қажет емес. Слайдтар, PDF немесе демо сілтеме жеткілікті", "Жеңімпаздарға жүлде, барлығына кофе"],
      cta: "Тіркелу үшін арнаға жазылыңыз",
    },
    professors: {
      tag: "ПРОФЕССОРЛАРҒА", title: "Екі сағат. Дайындалудың қажеті жоқ.",
      benefits: ["Кейсті біз дайындаймыз және іс-шараны өзіміз жүргіземіз", "Студенттермен дәрісханадан тыс жұмыс істеп, олардың нақты мәселені қалай шешетінін көріңіз", "Мықты студенттермен танысып, келесі ғылыми ассистентіңізді табуыңыз мүмкін", "Командаға бағыт беріп, питч кезінде сұрақтар қойыңыз", "Студенттер шешіп көретін өз салаңыздағы мәселе бар ма? Бізге айтыңыз"],
      cta: "Бізге жазыңыз",
    },

    nextLabel: "04 / КЕЛЕСІ ДЖЕМ", nextTitle: "Күнді\nбелгілеп қойыңыз.",
    nextBody: "Тіркелу сілтемесі Telegram арнамызда жарияланады.",
    runByLabel: "КІМ ӨТКІЗЕДІ", runBy: "Google Jams-ты GDG on Campus Nazarbayev University өткізеді. Кампустағы DevFest, Google Talks және NeHackathon-ды да осы команда ұйымдастырған.",
  },

  footerContact: "Байланыс",
  sourceCode: "GitHub-та ашық код", rights: "GDG on Campus Nazarbayev University",
  emailLabel: "Пошта", instagramLabel: "Instagram", telegramLabel: "Telegram",
};

const ru: typeof en = {
  language: "Язык", skip: "Перейти к содержимому", home: "Вернуться в начало страницы",
  nav: ["Польза", "Событие", "Пакеты", "Сообщество"],
  partner: "Стать партнёром", seePackages: "Посмотреть пакеты",
  by: "организует Google Developer Groups on Campus",
  byline: "GOOGLE DEVELOPER GROUPS / ON CAMPUS NAZARBAYEV UNIVERSITY",
  heroLead: "48-часовой дататон для 300+ сильнейших студентов IT и математики Казахстана. Ищем компанию, которая принесёт кейс и призовой фонд.",
  place: "Назарбаев Университет, Астана", date: "Даты будут объявлены",
  stats: [
    { value: "300+", label: "ожидаемых участников" },
    { value: "48", label: "часов разработки" },
    { value: "02", label: "технических трека" },
    { value: "03", label: "дня в кампусе" },
  ],

  valueLabel: "01 / ЧТО ВЫ ПОЛУЧАЕТЕ", valueTitle: "Что ваша компания\nполучает на деле.",
  values: [
    { title: "Кадровый пайплайн", body: "300+ студентов IT и математики в одном зале на выходные. Участники, которые дали согласие, делятся с вами резюме и GitHub." },
    { title: "Решение бизнес-задачи", body: "Дайте залу реальный технический кейс и заберите десять и больше концептов и работающих прототипов." },
    { title: "Брендинг и охват", body: "Ваш бренд в студенческих каналах Назарбаев Университета и в ленте сообщества GDG." },
  ],

  eventLabel: "02 / СОБЫТИЕ", eventTitle: "Один кейс.\nДва трека. 48 часов.",
  eventBody: "Команды получают реальные данные и реальный вопрос от компании-партнёра и собирают работающий прототип с нуля под руководством менторов из индустрии.",
  tracks: [
    { tag: "ТРЕК 01", title: "Программная инженерия", body: "Высоконагруженные веб- и мобильные продукты, сложные бэкенд-системы, интеграция API и эффективная облачная архитектура.", tags: ["Продукты", "API", "Облако"] },
    { tag: "ТРЕК 02", title: "Машинное обучение и анализ данных", body: "Предиктивные модели, анализ больших данных и интеллектуальные агенты на современных решениях, включая Google Gemini.", tags: ["Модели", "Анализ", "Агенты"] },
  ],
  day: "День",
  days: [
    { title: "Спикеры и кофе-брейк", body: "Лекции и воркшопы от экспертов индустрии, разбор технического стека и нетворкинг, из которого собираются команды." },
    { title: "Анонс кейса", body: "Партнёры представляют задачи, команды фиксируются, начинаются чек-поинты с менторами и непрерывная разработка." },
    { title: "Питчинг", body: "Команды упаковывают продукт, защищают его перед жюри, объявляются победители." },
  ],

  packagesLabel: "03 / ПАКЕТЫ", packagesTitle: "Четыре формата спонсорства.",
  scopeLabels: ["Оба трека", "Один трек", "Рекрутинг", "Бартер"],
  packagePrice: "Стоимость пакета", toDiscuss: "Согласуется с вами",
  prizeFund: "Фиксированный призовой фонд", proposedFund: "Предлагаемый призовой фонд",
  perTrack: "На каждый трек: 1 / 2 / 3-е место",
  fundingNote: "Призовой фонд не равен стоимости пакета. Организационные расходы и мерч согласуются отдельно.",
  packages: {
    exclusive: { title: "Эксклюзивный спонсор", intro: "Всё событие идёт под вашим именем.", benefits: ["Ваш бренд в названии хакатона", "Эксклюзивные кейсы в обоих треках", "До пяти минут на сцене на открытии или закрытии", "Самый крупный логотип на всех печатных и цифровых носителях", "Брендированный стенд в зоне хантинга", "Знакомства с участниками обоих треков, которые дали согласие"], note: "Интеграция в название согласуется отдельно с университетом и с требованиями бренда Google." },
    track: { title: "Основной спонсор трека", intro: "Один трек, написанный под вашу задачу.", benefits: ["Кейс из реальной задачи вашей компании", "Ваши эксперты как менторы и жюри трека", "Знакомства с участниками этого трека, которые дали согласие", "Эксклюзивность внутри вашего трека"], note: "Второй трек может достаться другому спонсору, не являющемуся вашим прямым конкурентом. Неделимый эксклюзив на всё событие даёт только эксклюзивный пакет." },
    internship: { title: "Спонсор стажировок", intro: "Доступ к найму без призового фонда.", benefits: ["Право первыми позвать сильнейших участников на стажировки и карьерные треки", "Рассылка ваших вакансий участникам, которые попросили о ней", "Логотип на сайте, пресс-волле и в секции карьерных партнёров", "Опция: софинансировать кофе-брейк и поставить своё имя на снэк-баре"], note: "Участие не гарантирует найм, принятие оффера или доступ к базе участников." },
    snacks: { title: "Партнёр по снэкам", intro: "Полный бартер. Накормите зал.", benefits: ["Ролл-апы, флаги и продукция в зоне кофе-брейка, на виду у всех каждые два-три часа", "Эксклюзивное право на ночную активность, от сторис с отметкой до пиццы", "Логотип на сайте, главном баннере и афишах, упоминания ведущим на открытии, закрытии и перерывах", "Промокоды, флаеры и мерч прямо в руки участникам"], note: "Объёмы, время и эксклюзивность согласуются заранее." },
  },

  orgLabel: "04 / СООБЩЕСТВО", orgTitle: "Кто это\nорганизует.",
  orgBody: "GDG on Campus Nazarbayev University — официальный кампусный чаптер в НУ. Мы проводим лекции, воркшопы и хакатоны для студентов IT, математики и смежных направлений.",
  mission: "Мы развиваем IT-экосистему Казахстана, учим современным технологиям вроде генеративного AI и облака и связываем студенческие таланты с бизнесом.",
  teamCaption: "Участники GDG on Campus NU, сентябрь 2025",
  orgStats: [
    { value: "1 024", label: "подписчика в Telegram" },
    { value: "987", label: "подписчиков в Instagram" },
  ],
  orgPlace: "Кампус Назарбаев Университета, Астана",
  galleryLabel: "С наших мероприятий",
  photos: {
    devfest: "DevFest, на сцене Google Cloud Developer Expert",
    talks: "Google Talks, студенты рассказывают о стажировках",
    mentoring: "NeHackathon, менторы за столами команд",
    workshop: "Технический воркшоп в кампусе",
    solutions: "Сессия Google Solutions Challenge",
  },
  partnersLabel: "Компании, которые уже работали с нами",

  footerEvents: "Наши события",
  jams: {
    nav: ["О джемах", "Формат", "Участие", "Дата"],
    headerCta: "Подписаться",
    tagline: "Студенты и профессора в одной команде.",
    heroLead: "Короткий кейс-чемпионат в Назарбаев Университете. Студенты и профессора работают в смешанных командах над одной реальной задачей и защищают решение перед жюри.",
    studentCta: "Я студент", professorCta: "Я профессор",
    next: "Следующий джем", timeRange: "с {start} до {end}",
    table: { students: "Студенты", professors: "Профессора", case: "КЕЙС" },

    aboutLabel: "01 / ЧТО ЭТО", aboutTitle: "Кейс-чемпионат\nвместе с профессорами.",
    aboutBody: "Google Jams заменяет формат лекции командной работой. Студенты и профессора сидят за одним столом и работают над одной задачей.",
    compare: {
      caption: "Лекция в сравнении с джемом", lecture: "Лекция", jam: "Джем",
      rows: [
        { lecture: "Говорит один человек", jam: "Говорят все за столом" },
        { lecture: "Профессор стоит у доски", jam: "Профессор сидит в вашей команде" },
        { lecture: "Вы пишете конспект", jam: "Вы собираете решение" },
        { lecture: "Оценка через несколько недель", jam: "Питч в тот же вечер" },
      ],
    },

    formatLabel: "02 / КАК ЭТО ПРОХОДИТ", formatTitle: "Разминка. Решение.\nПитч.",
    formatBody: "План следующего джема.",
    minutes: "мин",
    steps: [
      { title: "Разминка", body: "Код-пазлы и бинго." },
      { title: "Решение кейса", body: "Команды получают кейс и работают над решением вместе с профессорами." },
      { title: "Кофе-брейк" },
      { title: "Питчинг", body: "Каждая команда представляет решение жюри и отвечает на вопросы." },
    ],
    warmupsLabel: "Попробуйте разминку",
    puzzles: {
      title: "Код-пазлы", body: "Вы получаете функцию, разрезанную на фрагменты. Поймите её логику, разберите каждый кусок и расставьте их в рабочем порядке.",
      hint: "Нажимайте на строки в порядке выполнения.", done: "Работает.", again: "Перемешать ещё раз",
    },
    bingo: {
      title: "Бинго", body: "Вы получаете карточку с разными описаниями. Ходите по залу, общайтесь, находите человека под каждое описание и вписывайте его имя в клетку.",
      sample: "Пример карточки бинго", win: "Бинго. Полный ряд.",
      cells: ["Есть своё приложение", "Говорит на трёх языках", "Пишет на Python", "Бывает на хакатонах", "Учится на первом курсе", "Читает научные статьи", "Везде тёмная тема", "Есть опыт питча", "Чай вместо кофе"],
    },
    criteriaLabel: "Лист жюри", criteriaHead: ["Критерий", "На что смотрит жюри", "Балл"],
    criteria: {
      feasibility: { title: "Реализуемость", body: "Можно ли на самом деле собрать это теми силами, что есть у команды?" },
      creativity: { title: "Креативность", body: "Свежий взгляд на задачу, если он остаётся осмысленным и решает её." },
      process: { title: "Процесс", body: "Шаги, которые воплотят идею: планирование, дизайн, разработка и тестирование." },
      expenses: { title: "Расходы", body: "Примерная стоимость по частям. Точные цены не нужны, важно показать, что бюджет продуман." },
      scalability: { title: "Масштабируемость", body: "Будет ли это работать, если пользователей станет в десять раз больше?" },
    },

    joinLabel: "03 / ЗАЧЕМ УЧАСТВОВАТЬ", joinTitle: "Две стороны\nодного стола.",
    students: {
      tag: "СТУДЕНТАМ", title: "Работайте бок о бок с профессорами.",
      benefits: ["Решите реальную задачу вместе с профессорами в своей команде", "Познакомьтесь с новыми людьми во время разминки", "Потренируйте питч перед жюри", "Готовый продукт не нужен. Достаточно слайдов, PDF или ссылки на демо", "Призы победителям и кофе для всех"],
      cta: "Подписаться на канал с регистрацией",
    },
    professors: {
      tag: "ПРОФЕССОРАМ", title: "Два часа. Готовиться не нужно.",
      benefits: ["Мы готовим кейс и проводим мероприятие", "Поработайте со студентами вне аудитории и посмотрите, как они решают реальную задачу", "Познакомьтесь с сильными студентами и, возможно, найдите нового научного ассистента", "Направляйте команду и задавайте вопросы на питчах", "Есть задача из вашей области, которую стоит дать студентам? Напишите нам"],
      cta: "Написать нам",
    },

    nextLabel: "04 / СЛЕДУЮЩИЙ ДЖЕМ", nextTitle: "Запишите\nдату.",
    nextBody: "Ссылку на регистрацию мы опубликуем в Telegram-канале.",
    runByLabel: "КТО ПРОВОДИТ", runBy: "Google Jams проводит GDG on Campus Nazarbayev University. Та же команда делала в кампусе DevFest, Google Talks и NeHackathon.",
  },

  footerContact: "Связаться",
  sourceCode: "Открытый код на GitHub", rights: "GDG on Campus Nazarbayev University",
  emailLabel: "Почта", instagramLabel: "Instagram", telegramLabel: "Telegram",
};

export const copy: Record<Locale, typeof en> = { en, kk, ru };
export type Copy = typeof en;
