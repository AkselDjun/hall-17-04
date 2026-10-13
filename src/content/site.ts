export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://akseldjun.github.io/hall-17-04").replace(/\/$/, "");

export const meta = {
  title: "HALL 17.04 — пространство для событий в Барановичах",
  description:
    "Зал для свадеб, юбилеев и дней рождения в Барановичах: сцена, свет, LED-экран и банкет на 55 гостей. Праздники под ключ и фотостудия в том же пространстве.",
};

export const contacts = {
  city: "Барановичи",
  street: "ул. Ленина, 12",
  addressFull: "г. Барановичи, ул. Ленина, 12",
  phone: "+375 29 240 12 67",
  phoneHref: "tel:+375292401267",
  instagram: { handle: "@hall_17.04", url: "https://www.instagram.com/hall_17.04/" },
  studioInstagram: { handle: "@photostudio.1704", url: "https://www.instagram.com/photostudio.1704/" },
  direct: "https://ig.me/m/hall_17.04",
  reviewsHighlight: "https://www.instagram.com/stories/highlights/18063433931367008/",
  map: `https://yandex.by/maps/?text=${encodeURIComponent("Барановичи, улица Ленина, 12")}`,
};

export const nav = [
  { href: "#formats", label: "Форматы" },
  { href: "#prices", label: "Цены" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#booking", label: "Контакты" },
];

export type ReelFrame = { src: string; alt: string; ratio: number; position: string };

export const hero = {
  kicker: ["HALL 17.04 представляет", "Барановичи", contacts.street],
  lead: "Пространство для событий в Барановичах: зал со сценой, светом и LED-экраном, площадка для мастер-классов. Дни рождения и свадьбы — под ключ.",
  reel: [
    { src: "reel-01", alt: "Гости поднимают бокалы за молодожёнов", ratio: 3 / 4, position: "50% 60%" },
    { src: "reel-02", alt: "Гостья с бокалом в тёплом свете люстры", ratio: 1, position: "50% 50%" },
    { src: "reel-03", alt: "Пара смеётся на фоне драпировок", ratio: 3 / 4, position: "50% 30%" },
    { src: "reel-04", alt: "Тост с микрофоном", ratio: 3 / 4, position: "50% 40%" },
    { src: "reel-05", alt: "Семья на фоне штор и люстры", ratio: 5 / 4, position: "50% 40%" },
    { src: "reel-06", alt: "Объятия гостей", ratio: 5 / 4, position: "50% 40%" },
    { src: "reel-07", alt: "Рамка с пожеланиями гостей", ratio: 3 / 4, position: "50% 45%" },
    { src: "reel-08", alt: "Подруги делают селфи", ratio: 3 / 4, position: "50% 25%" },
  ] satisfies ReelFrame[],
};

export const ticker = [
  "Дни рождения",
  "Свадьбы",
  "Корпоративы",
  "Новый год",
  "Фуршеты",
  "Выпускные",
  "Мастер-классы",
  "Фотостудия",
];

export const space = {
  kicker: "Сцена 01 — Пространство",
  title: ["Один адрес.", "Два пространства."],
  lead: `HALL 17.04 — это зал для мероприятий и площадка для обучения под одной крышей: ${contacts.city}, ${contacts.street}.`,
  photo: {
    src: "hall-banquet",
    alt: "Банкетный зал HALL 17.04: столы со свечами, люстра и LED-экран в лучах света",
    caption: "Сцена 01 · 00:17:04",
  },
  items: [
    { title: "Зал для мероприятий", text: "Сцена, свет, LED-экран и банкетная посадка на 55 гостей." },
    { title: "Пространство для обучения", text: "Мастер-классы, лекции и нетворкинг-вечера со сценой и экраном." },
  ],
  quote: "HALL 17.04 — это всегда внимание к деталям",
};

export const bookingFormats = [
  "Свадьба под ключ",
  "Юбилей под ключ",
  "18-летие",
  "Крещение",
  "Мероприятие не под ключ",
  "День рождения",
  "Корпоратив",
  "Фотостудия",
  "Другое",
] as const;

export type BookingFormat = (typeof bookingFormats)[number];

export const formats = {
  kicker: "Сцена 02 — Форматы",
  title: "В программе сезона",
  lead: "Под ключ — значит, зал, декор, свет и проверенные подрядчики собраны в одном месте. Вам остаётся прийти и быть в кадре.",
  items: [
    {
      genre: "Жанр: мелодрама",
      title: "Свадьба под ключ",
      text: "Ваш идеальный день — в наших руках: от welcome-зоны до первого танца в дыму.",
      photo: { src: "format-wedding", alt: "Первый танец жениха и невесты", position: "50% 50%" },
      format: "Свадьба под ключ",
    },
    {
      genre: "Жанр: комедия",
      title: "День рождения под ключ",
      text: "Взрослые и детские, тематические и камерные. Торт, неон и горка бокалов — по вашему сценарию.",
      photo: { src: "format-birthday", alt: "Именинница с букетом роз у экрана Happy Birthday", position: "50% 45%" },
      format: "День рождения",
    },
    {
      genre: "Жанр: экшн",
      title: "Корпоратив и Новый год",
      text: "Шоу-программа, Дед Мороз и Снегурочка, ваша заставка на LED-экране.",
      photo: { src: "format-corporate", alt: "Команда на корпоративе", position: "50% 50%" },
      format: "Корпоратив",
    },
    {
      genre: "Жанр: мюзикл",
      title: "Фуршетная вечеринка",
      text: "Огненный формат для тех, кто не хочет банкета: музыка, танцы и закуски без рассадки.",
      photo: { src: "format-party", alt: "Гостья с большим букетом ромашек на фоне драпировок", position: "50% 30%" },
      format: "Другое",
    },
  ] satisfies { genre: string; title: string; text: string; photo: { src: string; alt: string; position: string }; format: BookingFormat }[],
  alsoLabel: "Также в программе:",
  also: ["Выпускные", "Детские праздники", "Мастер-классы", "Нетворкинг-вечера", "Кинопросмотры", "Фотосессии"],
};

export const tech = {
  kicker: "Сцена 03 — Техника",
  title: "Свет, камера, мотор",
  lead: "Свет, звук, экран и спецэффекты уже в зале — не нужно искать отдельного подрядчика.",
  rows: [
    { label: "Свет", value: "Лучи, прожекторы и тяжёлый дым" },
    { label: "Экран", value: "LED-экран для видео и поздравлений" },
    { label: "Звук", value: "Своё звуковое оборудование в зале" },
    { label: "Декор", value: "Хрустальные люстры, драпировки, колонны" },
    { label: "Съёмка", value: "Фотостудия в этом же пространстве" },
  ],
  photos: [
    { src: "stage-band-1", alt: "Живая музыка на сцене в лучах тёплого света", position: "50% 55%" },
    { src: "stage-band-2", alt: "Кавер-группа выступает на сцене HALL 17.04", position: "50% 60%" },
  ],
};

export const promo = {
  value: "−20%",
  title: ["На ваш праздник", "в воскресенье — четверг"],
  days: "Вс · Пн · Вт · Ср · Чт",
  cta: "Выбрать будний день",
};

export const studio = {
  kicker: "Сцена 04 — Фотостудия",
  title: ["Фотостудия", "в соседнем кадре"],
  lead: "HALL 17.04 вырос из Photo studio 17.04. Студия — в этом же пространстве: портреты перед праздником, семейная съёмка или контент для бренда.",
  badge: { value: "1", title: "час съёмки бесплатно", note: "При бронировании HALL 17.04" },
  cta: "Забронировать студию",
  profile: {
    name: "Фотостудия Барановичи",
    posts: "779",
    followers: "8 661",
    bio: "Зал №1 — интерьерный, №2 — циклорама.",
    rent: "@rent.1704",
  },
  gallery: [
    { src: "studio-light", alt: "Портрет со студийным светом", caption: "Профессиональный свет" },
    { src: "studio-props", alt: "Съёмка с гитарой в ванне", caption: "Реквизит и ванна" },
    { src: "studio-portrait", alt: "Портрет с букетом ромашек", caption: "Портреты и семья" },
  ],
};

export type Review = { src: string; alt: string; tag: string; quote: string };

export const reviews = {
  kicker: "Сцена 05 — Рецензии",
  title: "Рецензии гостей",
  lead: "Живые отзывы из наших сторис — без правок. Нажмите на кадр, чтобы прочитать целиком.",
  link: "Все отзывы в Instagram →",
  items: [
    { src: "review-1", alt: "Отзыв гостьи о юбилее в HALL 17.04", tag: "Юбилей", quote: "Ваша работа покорила сердца всех наших гостей!" },
    { src: "review-2", alt: "Отзыв гостьи о мероприятии в HALL 17.04", tag: "Мероприятие", quote: "Очень ценно, что в нашем городе есть такое место…" },
    { src: "review-3", alt: "Отзыв невесты на фоне фото молодожёнов у LED-экрана", tag: "Свадьба", quote: "Всё было просто волшебно!" },
    { src: "review-4", alt: "Отзыв молодожёнов о свадебном банкете", tag: "Свадебный банкет", quote: "Наш танец стал ещё более невероятным и атмосферным" },
  ] satisfies Review[],
};

export type Offer = {
  tag: string;
  title: string;
  price: string;
  features: string[];
  tone: "gold" | "cream" | "dark";
  wide?: boolean;
  format: BookingFormat;
};

export const offers = {
  kicker: "Сцена 06 — Стоимость",
  title: "Предложения",
  lead: "Цены — ориентир. Точный расчёт — после короткой встречи в зале.",
  items: [
    {
      tag: "Под ключ",
      title: "Свадьбы под ключ",
      price: "от [цена] BYN",
      features: ["Сценарий, декор и свет", "Ведущий и DJ, кейтеринг от партнёров", "Первый танец в дыму и лучах"],
      tone: "gold",
      format: "Свадьба под ключ",
    },
    {
      tag: "Под ключ",
      title: "Юбилеи под ключ",
      price: "от [цена] BYN",
      features: ["Декор и заставка на LED-экране", "Ведущий и программа вечера", "Банкет или фуршет"],
      tone: "cream",
      format: "Юбилей под ключ",
    },
    {
      tag: "Вечеринка",
      title: "18-летие",
      price: "от [цена] BYN",
      features: ["Свет, дым и танцпол", "Фотозона и LED-экран", "Ведущий и DJ"],
      tone: "cream",
      format: "18-летие",
    },
    {
      tag: "Семейный праздник",
      title: "Крещение",
      price: "от [цена] BYN",
      features: ["Камерный зал для семьи", "Декор и праздничный стол", "Семейная съёмка в студии"],
      tone: "cream",
      format: "Крещение",
    },
    {
      tag: "Аренда зала",
      title: "Мероприятие не под ключ",
      price: "от [цена] BYN / час",
      features: ["Зал на ваше время", "Свет и LED-экраны", "Свои подрядчики и кейтеринг"],
      tone: "dark",
      wide: true,
      format: "Мероприятие не под ключ",
    },
  ] satisfies Offer[],
};

export const booking = {
  kicker: "Касса",
  title: ["Забронируйте дату", "вашего мероприятия"],
  lead: "Оставьте заявку — перезвоним, ответим на вопросы и пригласим посмотреть зал вживую.",
  leadDone: "Заявка у нас — осталось дождаться звонка.",
};

export const footer = {
  copyright: "© 2026 HALL 17.04",
  tagline: "Пространство для событий",
  end: "Конец фильма",
};
