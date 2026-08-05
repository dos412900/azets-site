export type Category = {
  slug: string;
  title: { ru: string; kz: string; en: string };
  description: { ru: string; kz: string; en: string };
};

export type Product = {
  slug: string;
  title: string;
  category: string;
  short: string;
  brand?: string;
  note?: string;
  image?: string;
  specs?: Array<{ k: string; v: string }>;
};

export const categories: Category[] = [
  {
    slug: "ophthalmic-diagnostics",
    title: {
      ru: "Офтальмологическая диагностика",
      kz: "Офтальмологиялық диагностика",
      en: "Ophthalmic Diagnostics",
    },
    description: {
      ru: "Авторефрактометры, тонометры, анализаторы поля зрения, ОКТ",
      kz: "Авторефрактометрлер, тонометрлер, көру өрісі анализаторлары, ОКТ",
      en: "Autorefractometers, tonometers, visual field analyzers, OCT",
    },
  },
  {
    slug: "slit-lamps",
    title: {
      ru: "Щелевые лампы",
      kz: "Саңылау шамдары",
      en: "Slit Lamps",
    },
    description: {
      ru: "Щелевые лампы для осмотра переднего отрезка глаза",
      kz: "Көздің алдыңғы бөлігін тексеруге арналған саңылау шамдары",
      en: "Slit lamps for anterior eye segment examination",
    },
  },
  {
    slug: "ophthalmoscopes",
    title: {
      ru: "Офтальмоскопы",
      kz: "Офтальмоскоптар",
      en: "Ophthalmoscopes",
    },
    description: {
      ru: "Прямые и непрямые офтальмоскопы",
      kz: "Тікелей және жанама офтальмоскоптар",
      en: "Direct and indirect ophthalmoscopes",
    },
  },
  {
    slug: "anterior-segment",
    title: {
      ru: "Анализаторы переднего отрезка",
      kz: "Алдыңғы сегмент анализаторлары",
      en: "Anterior Segment Analyzers",
    },
    description: {
      ru: "Топография роговицы, биометрия, анализ переднего сегмента глаза",
      kz: "Роговица топографиясы, биометрия, көздің алдыңғы сегментін талдау",
      en: "Corneal topography, biometry, anterior eye segment analysis",
    },
  },
  {
    slug: "ophthalmic-surgery",
    title: {
      ru: "Офтальмологическая хирургия",
      kz: "Офтальмологиялық хирургия",
      en: "Ophthalmic Surgery",
    },
    description: {
      ru: "Оборудование для хирургии глаза",
      kz: "Көз хирургиясына арналған жабдық",
      en: "Equipment for ophthalmic surgery",
    },
  },
  {
    slug: "surgical-microscopes",
    title: {
      ru: "Операционные микроскопы",
      kz: "Операциялық микроскоптар",
      en: "Surgical Microscopes",
    },
    description: {
      ru: "Операционные микроскопы и модули для хирургии",
      kz: "Хирургияға арналған операциялық микроскоптар мен модульдер",
      en: "Surgical microscopes and modules for ophthalmic surgery",
    },
  },
    {
    slug: "ophthalmic-consumables",
    title: {
      ru: "Расходные материалы и аксессуары",
      kz: "Шығын материалдары мен аксессуарлар",
      en: "Consumables & Accessories",
    },
    description: {
      ru: "Столики, принтеры и сопутствующее оборудование",
      kz: "Үстелдер, принтерлер және қосымша жабдықтар",
      en: "Tables, printers and auxiliary equipment",
    },
  },

  {
    slug: "airseal-insufflation",
    title: {
      ru: "AirSeal® Insufflation",
      kz: "AirSeal® инсуффляция жүйелері",
      en: "AirSeal® Insufflation",
    },
    description: {
      ru: "Системы инсуффляции AirSeal®",
      kz: "AirSeal® инсуффляция жүйелері",
      en: "AirSeal® Insufflation Systems",
    },
  },
  {
    slug: "electrosurgical-units",
    title: {
      ru: "Электрохирургические аппараты (ESU)",
      kz: "Электрохирургиялық аппараттар (ESU)",
      en: "Electrosurgical Units (ESUs)",
    },
    description: {
      ru: "Электрохирургические генераторы",
      kz: "Электрохирургиялық генераторлар",
      en: "Electrosurgical Units",
    },
  },
  {
    slug: "smoke-evacuation",
    title: {
      ru: "Системы дымоудаления",
      kz: "Түтінді жою жүйелері",
      en: "Smoke Evacuation",
    },
    description: {
      ru: "Системы удаления хирургического дыма",
      kz: "Хирургиялық түтінді жою жүйелері",
      en: "Smoke Evacuation Systems",
    },
  },
  {
    slug: "general-surgical-instruments",
    title: {
      ru: "Хирургические инструменты",
      kz: "Хирургиялық құралдар",
      en: "Surgical & Medical Instruments",
    },
    description: {
      ru: "Общие и лапароскопические хирургические инструменты",
      kz: "Жалпы және лапароскопиялық хирургиялық құралдар",
      en: "Surgical & Medical Instruments",
    },
  },
  {
    slug: "surgical-imaging",
    title: {
      ru: "Хирургическая визуализация",
      kz: "Хирургиялық бейнелеу",
      en: "Surgical Imaging",
    },
    description: {
      ru: "Камеры и системы хирургической визуализации",
      kz: "Хирургиялық бейнелеу жүйелері",
      en: "Surgical Imaging Systems",
    },
  },
];

export const products: Product[] = [
  {
    slug: "ark-7600",
    image: "/indikator.png",
    title: "Авторефкератометр ARK 7600",
    brand: "Shanghai Chang'E Optical",
    category: "ophthalmic-diagnostics",
    note: "Нужен столик",
    short: "Автоматический авторефкератометр для измерения рефракции и кератометрии. Цветной LCD 7\", встроенный термопринтер.",
    specs: [
      { k: "Сфера", v: "от -20Д до +20Д (шаг 0.01Д)" },
      { k: "Цилиндр", v: "от 0 до ±6Д (шаг 0.25Д)" },
      { k: "Ось цилиндра", v: "1°–180° (шаг 1°)" },
      { k: "Скорость измерения", v: "0.5 сек" },
      { k: "Монитор", v: "7\" LCD цветной" },
      { k: "Принтер", v: "57 мм термопринтер" },
      { k: "МЗР диапазон", v: "85 мм (шаг 0.1 мм)" },
    ],
  },
  {
    slug: "tonovue",
    image: "/tonometr.png",
    title: "Бесконтактный тонометр TonoVue",
    brand: "Crystalvue Medical Corporation",
    category: "ophthalmic-diagnostics",
    note: "Нужен столик",
    short: "Бесконтактный тонометр для измерения ВГД струёй воздуха. Сенсорный монитор, автовыравнивание по 3 направлениям, встроенный принтер.",
    specs: [
      { k: "Диапазон ВГД", v: "1–60 mmHg" },
      { k: "Режимы", v: "auto, 0–30, 0–60 mmHg" },
      { k: "Управление", v: "сенсорный монитор (без джойстика)" },
      { k: "Автовыравнивание", v: "по 3 направлениям" },
      { k: "Принтер", v: "встроенный, автоотрез" },
      { k: "Рабочая дистанция", v: "11 мм" },
      { k: "Питание", v: "100–240 В, 50–60 Гц" },
    ],
  },
  {
    slug: "v100-c901-set",
    image: "/proverka.png",
    title: "Устройство для проверки зрения V100 + таблица C-901",
    brand: "Shanghai MediWorks",
    category: "ophthalmic-diagnostics",
    short: "Детский авторефрактометр V100 в комплекте с жидкокристаллической таблицей C-901 для проверки остроты зрения.",
    specs: [
      { k: "Пациенты", v: "от 6 месяцев" },
      { k: "Сфера", v: "от -9Д до +7Д (шаг 0.25Д)" },
      { k: "Цилиндр", v: "от -3Д до +3Д" },
      { k: "Дистанция определения", v: "до 100 см" },
      { k: "Время определения", v: "1 сек" },
      { k: "Передача данных", v: "WiFi" },
      { k: "Экран", v: "4.3\" LCD" },
      { k: "Питание V100", v: "Li-ion, до 5 часов" },
      { k: "Вес V100", v: "800 г" },
    ],
  },
  {
    slug: "slit-lamp-s260s",
    image: "/lampa.png",
    title: "Щелевая лампа S-260S",
    brand: "Shanghai MediWorks",
    category: "slit-lamps",
    note: "Нужен столик",
    short: "Щелевая лампа для осмотра переднего отрезка глаза. 3 ступени увеличения (10×, 16×, 25×), LED-осветитель 10 000+ часов.",
    specs: [
      { k: "Увеличение", v: "3 ступени: 10×, 16×, 25×" },
      { k: "Окуляры", v: "12.5×, диаметр 18 мм" },
      { k: "Диоптрийная коррекция", v: "±8 дптр" },
      { k: "МЗР", v: "52–80 мм" },
      { k: "Осветитель", v: "LED 3В/3Вт, ресурс 10 000 ч" },
      { k: "Щель (ширина)", v: "0–14 мм, плавно" },
      { k: "Поворот щели", v: "0–180°" },
      { k: "Питание", v: "220 В, 50/60 Гц" },
      { k: "Вес", v: "до 21 кг" },
    ],
  },
  {
    slug: "slit-lamp-s260",
    image: "/lampa.png",
    title: "Щелевая лампа S-260",
    brand: "Shanghai MediWorks",
    category: "slit-lamps",
    note: "Нужен столик",
    short: "Щелевая лампа с 5 ступенями увеличения (6.3×–40×), LED-осветителем и расширенными возможностями для детальной диагностики.",
    specs: [
      { k: "Увеличение", v: "5 ступеней: 6.3×, 10×, 16×, 25×, 40×" },
      { k: "Окуляры", v: "12.5×, диаметр 18 мм" },
      { k: "Диоптрийная коррекция", v: "±8 дптр" },
      { k: "МЗР", v: "52–80 мм" },
      { k: "Осветитель", v: "LED 3В/3Вт, ресурс 10 000 ч" },
      { k: "Щель (ширина)", v: "0–14 мм, плавно" },
      { k: "Поворот щели", v: "0–180°" },
      { k: "Питание", v: "220 В, 50/60 Гц" },
      { k: "Вес", v: "до 21 кг" },
    ],
  },
  {
    slug: "keeler-professional",
    image: "/proftalmoskop.png",
    title: "Прямой офтальмоскоп Professional",
    brand: "Keeler Ltd",
    category: "ophthalmoscopes",
    short: "Прямой офтальмоскоп с LED-освещением, 6 диафрагмами и диском линз от +29 до -30 дптр. Литиевая батарея, компактное зарядное устройство.",
    specs: [
      { k: "Освещение", v: "LED" },
      { k: "Диафрагмы", v: "6 (широкое/среднее пятно, макула, щель, сетка, мишень)" },
      { k: "Диск линз", v: "от +29 до -30 дптр" },
      { k: "Быстрая установка", v: "+20 или -20 дптр" },
      { k: "Фильтр", v: "зелёный (бескрасный)" },
      { k: "Питание", v: "литиевая батарея" },
    ],
  },
  {
    slug: "keeler-vantage-plus",
    image: "/neproftalmoskop.png",
    title: "Непрямой офтальмоскоп Vantage Plus LED",
    brand: "Keeler Limited",
    category: "ophthalmoscopes",
    short: "Беспроводной непрямой налобный офтальмоскоп с LED-осветителем и встроенной литиевой батареей. Зарегистрирован в РК.",
    specs: [
      { k: "Тип", v: "непрямой налобный, беспроводной" },
      { k: "Осветитель", v: "LED (долгий ресурс)" },
      { k: "Батарея", v: "Li-ion, крепится к шлему" },
      { k: "Комплект", v: "офтальмоскоп, зарядное, батарея, линза 20Д" },
      { k: "Регистрация РК", v: "есть" },
    ],
  },
  {
    slug: "c901",
    image: "/table.png",
    title: "Жидкокристаллическая таблица C-901",
    brand: "Shanghai MediWorks",
    category: "ophthalmic-diagnostics",
    short: "LCD-таблица для проверки остроты зрения с набором оптотипов для взрослых и детей, тестами на контраст и цветное зрение.",
    specs: [
      { k: "Монитор", v: "17\", 1280×1024 пикс." },
      { k: "Проекционное расстояние", v: "2–7 м" },
      { k: "Оптотипы", v: "Снеллен, Ландольт, буквы, цифры, детские" },
      { k: "Спец. тесты", v: "контраст, Ишихара, макулодистрофии" },
      { k: "Управление", v: "беспроводной ИК-пульт" },
      { k: "Яркость", v: "160 Кд/м²" },
      { k: "Вес", v: "3.5 кг" },
      { k: "Питание", v: "110–230 В" },
    ],
  },
  {
    slug: "ivs-201b",
    image: "/analysator.png",
    title: "Анализатор поля зрения IVS 201B",
    brand: "Chongqing IRC Medical Equipment",
    category: "ophthalmic-diagnostics",
    note: "Нужен принтер ч/б и столик",
    short: "Автоматический анализатор поля зрения с 15\" сенсорным экраном, eye-tracking, анализом глаукомы и хранилищем ≥32 ГБ. Зарегистрирован в РК.",
    specs: [
      { k: "Диапазон анализа", v: "до 90° (виcочная сторона)" },
      { k: "Дистанция до стимулов", v: "30 см" },
      { k: "Стратегии", v: "полный порог, быстрый, HIS, стандартный" },
      { k: "Интерфейс", v: "15\" сенсорный ЖК" },
      { k: "Хранилище", v: "≥32 ГБ внутреннее" },
      { k: "Сеть", v: "Ethernet + WiFi" },
      { k: "Eye tracking", v: "Heijl-Krakau + Eye tracking" },
      { k: "Регистрация РК", v: "РК-МТ-5№020530" },
    ],
  },
  {
    slug: "vision-700",
    image: "/tomograf.png",
    title: "Оптический когерентный томограф VISION 700",
    brand: "Crystalvue Medical Corporation",
    category: "ophthalmic-diagnostics",
    note: "Нужен цветной принтер и столик",
    short: "Бесконтактный ОКТ с высоким разрешением и встроенной фундус-камерой. 80 000 А-сканов/сек, разрешение <6 мкм. Зарегистрирован в РК.",
    specs: [
      { k: "Скорость сканирования", v: "80 000 А-сканов/сек" },
      { k: "Глубина (разрешение)", v: "<6 мкм" },
      { k: "Источник ОКТ", v: "SLD 840 нм" },
      { k: "Угол съёмки", v: "≥45°" },
      { k: "Дисплей", v: "≥10.1\" сенсорный, 1280×800" },
      { k: "Разрешение фото", v: "≥12 Мпикс" },
      { k: "Интерфейсы", v: "HDMI, USB3.0, USB2.0, RJ45" },
      { k: "Размеры", v: "409×534×546 мм, 32 кг" },
      { k: "Питание", v: "AC100–240 В, 400 ВА" },
    ],
  },
  {
    slug: "al550",
    image: "/pribor.png",
    title: "Анализатор переднего отрезка AL550 (биометрия + миопия)",
    brand: "Shanghai MediWorks",
    category: "anterior-segment",
    note: "Нужен цветной принтер и столик",
    short: "Офтальмологический прибор для топографии роговицы, биометрии и 3D-анализа переднего сегмента. Длина волны 1060 нм, полный автомат.",
    specs: [
      { k: "Длина волны", v: "1060 нм" },
      { k: "Топография роговицы", v: "диаметр 16 мм" },
      { k: "Толщина роговицы", v: "0.2–1.2 мм" },
      { k: "Глубина передней камеры", v: "0.7–8 мм" },
      { k: "Осевая длина", v: "0–40 мм" },
      { k: "Диаметр зрачка", v: "1–13 мм" },
      { k: "Дисплей", v: "10.1\", сенсорный" },
    ],
  },
  {
    slug: "al550-iol",
    image: "/priborchina.png",
    title: "Анализатор переднего отрезка AL550 (биометрия + миопия + ИОЛ)",
    brand: "Shanghai MediWorks",
    category: "anterior-segment",
    note: "Нужен цветной принтер и столик",
    short: "Расширенная модификация AL550 с дополнительной функцией расчёта ИОЛ для планирования хирургии катаракты.",
    specs: [
      { k: "Длина волны", v: "1060 нм" },
      { k: "Расчёт ИОЛ", v: "есть" },
      { k: "Топография роговицы", v: "диаметр 16 мм" },
      { k: "Толщина роговицы", v: "0.2–1.2 мм" },
      { k: "Глубина передней камеры", v: "0.7–8 мм" },
      { k: "Осевая длина", v: "0–40 мм" },
      { k: "Дисплей", v: "10.1\", сенсорный" },
    ],
  },
  {
    slug: "scansys-ta517",
    image: "/analysator.png",
    title: "Анализатор переднего отрезка Scansys TA517",
    brand: "Shanghai MediWorks",
    category: "anterior-segment",
    note: "Нужен компьютер, цветной принтер и столик",
    short: "Профессиональный анализатор с камерой Шаймпфлюга. ИИ-анализ кератоконуса, оптимизация ИОЛ, симулятор контактных линз, аберрационный анализ.",
    specs: [
      { k: "Камера", v: "цифровая IR + CCD Шаймпфлюга" },
      { k: "Скорость сканирования", v: "28 кадр/сек (60 за 2 сек)" },
      { k: "Топография роговицы", v: "9 / 12 мм" },
      { k: "Толщина роговицы", v: "300–900 мкм" },
      { k: "Глубина передней камеры", v: "0.8–6 мм" },
      { k: "Рефракционная сила", v: "12–72 дптр" },
      { k: "Диаметр зрачка", v: "1–10 мм" },
      { k: "Габариты", v: "505×345×460 мм, 25 кг" },
      { k: "Питание", v: "240 В, 50 Гц" },
    ],
  },
  {
    slug: "instrument-table",
    image: "/stol.png",
    title: "Электрический инструментальный столик",
    brand: "Shanghai MediWorks",
    category: "ophthalmic-consumables",
    short: "Специализированный электрический столик для офтальмологического оборудования. Управление ножными педалями, тормоза, плавный подъём.",
    specs: [
      { k: "Высота", v: "600–850 мм" },
      { k: "Грузоподъёмность", v: "60 кг" },
      { k: "Столешница", v: "53×48 см" },
      { k: "Управление", v: "ножные педали" },
      { k: "Габариты упаковки", v: "61×50×26 см" },
    ],
  },
  {
    slug: "takagi-om9xz",
    image: "/microskop.png",
    title: "Операционный микроскоп Takagi OM-9XZ",
    brand: "Takagi Seiko Co., Ltd",
    category: "surgical-microscopes",
    short: "Операционный микроскоп максимальной комплектации с моторизованным непрерывным зумом и гибкими окулярами. Япония.",
    specs: [
      { k: "Смена увеличения", v: "моторизованная плавная, зум 1:5" },
      { k: "Общее увеличение", v: "4.1× — 20.4×" },
      { k: "Поле зрения", v: "52.5 — 10.5 мм" },
      { k: "Объектив", v: "F=200 мм, апохроматический" },
      { k: "Окуляры", v: "10×, широкоугольные" },
      { k: "Фокусировка", v: "моторизованная, ход 30 мм" },
      { k: "X-Y система", v: "±25 мм с центрированием" },
      { k: "Рабочее расстояние", v: "194 мм" },
      { k: "Осветитель", v: "LED, безволоконный" },
      { k: "Питание", v: "230 В, 50 Гц, 400 ВА" },
      { k: "Вес", v: "82 кг" },
    ],
  },
  {
    slug: "takagi-o06-19se",
    image: "/microskop.png",
    title: "Модуль ассистента O06-19SE",
    brand: "Takagi Seiko Co., Ltd",
    category: "surgical-microscopes",
    short: "Модуль ассистента для операционного микроскопа Takagi OM-9. Позволяет второму хирургу наблюдать за ходом операции.",
    specs: [
      { k: "Совместимость", v: "Takagi OM-9" },
      { k: "Тип", v: "модуль ассистента" },
    ],
  },
  {
    slug: "takagi-dis1",
    image: "/videodelitel.png",
    title: "Видеоделитель луча со встроенной камерой DIS 1",
    brand: "Takagi Seiko Co., Ltd",
    category: "surgical-microscopes",
    short: "Видеоделитель луча со встроенной цифровой камерой для операционного микроскопа Takagi OM-9. Запись и трансляция хода операции.",
    specs: [
      { k: "Совместимость", v: "Takagi OM-9" },
      { k: "Тип", v: "видеоделитель + цифровая камера" },
    ],
  },
  {
  slug: "airseal-ifs-system",
  image: "/products/airseal-ifs-system.jpg",
  title: "AirSeal® iFS System",
  brand: "CONMED",
  category: "airseal-insufflation",
  note: "Новинка",
  short: "Интеллектуальная система клинической инсуффляции для лапароскопической и роботизированной хирургии.",
  specs: [
    { k: "Производитель", v: "CONMED Corporation, США" },
    { k: "Тип", v: "Инсуффляционная система CO₂" },
    { k: "Применение", v: "Лапароскопия, роботизированная хирургия" },
    { k: "Особенности", v: "Стабильный пневмоперитонеум, активная эвакуация дыма, безклапанная технология" },
    { k: "Гарантия", v: "12 месяцев" },
  ],
},
{
  slug: "airseal-filter-tubing-3-channel",
  image: "/products/airseal-filter-tubing-3-channel.jpg",
  title: "AirSeal® 3-Channel Filtered Tube Set",
  brand: "CONMED",
  category: "airseal-insufflation",
  note: "",
  short: "Комплект трехканальных фильтрующих трубок для системы AirSeal iFS.",
  specs: [
    { k: "Назначение", v: "Для AirSeal® iFS" },
    { k: "Тип", v: "Трехканальный" },
    { k: "Комплектация", v: "6 шт." },
  ],
},
{
  slug: "airseal-filter-tubing-single",
  image: "/products/airseal-filter-tubing-single.jpg",
  title: "AirSeal® Single Channel Filtered Tube Set",
  brand: "CONMED",
  category: "airseal-insufflation",
  note: "",
  short: "Одноканальный фильтрованный комплект трубок.",
  specs: [
    { k: "Назначение", v: "Для AirSeal® iFS" },
    { k: "Тип", v: "Одноканальный" },
    { k: "Комплектация", v: "10 шт." },
  ],
},
{
  slug: "airseal-5mm-access-port",
  image: "/products/airseal-5mm-access-port.jpg",
  title: "AirSeal® 5 mm Access Port",
  brand: "CONMED",
  category: "airseal-insufflation",
  note: "",
  short: "5-миллиметровый порт доступа с низкопрофильным обтуратором.",
  specs: [
    { k: "Диаметр", v: "5 мм" },
    { k: "Тип", v: "Valve-Free Access" },
    { k: "Комплектация", v: "6 шт." },
  ],
},
{
  slug: "hyfrecator-2000",
  image: "/products/hyfrecator-2000.jpg",
  title: "Hyfrecator® 2000",
  brand: "CONMED",
  category: "electrosurgical-units",
  note: "Новинка",
  short: "Компактный электрохирургический генератор для амбулаторных процедур.",
  specs: [
    { k: "Производитель", v: "CONMED Corporation, США" },
    { k: "Монополярный режим", v: "0–35 Вт" },
    { k: "Биполярный режим", v: "0–35 Вт" },
    { k: "Низковольтный режим", v: "0–20 Вт" },
    { k: "Вес", v: "2.7 кг" },
  ],
},

{
  slug: "hyfrecator-handpiece-manual",
  image: "/products/hyfrecator-handpiece-manual.jpg",
  title: "Hyfrecator Autoclavable Handpiece",
  brand: "CONMED",
  category: "electrosurgical-units",
  note: "",
  short: "Многоразовая автоклавируемая ручка с ручным управлением.",
  specs: [
    { k: "Тип", v: "Многоразовая" },
    { k: "Управление", v: "Ручное" },
    { k: "Стерилизация", v: "Автоклав" },
  ],
},

{
  slug: "hyfrecator-handpiece-foot",
  image: "/products/hyfrecator-handpiece-foot.jpg",
  title: "Hyfrecator Foot Control Handpiece",
  brand: "CONMED",
  category: "electrosurgical-units",
  note: "",
  short: "Автоклавируемая ручка для ножного управления.",
  specs: [
    { k: "Тип", v: "Многоразовая" },
    { k: "Управление", v: "Ножная педаль" },
    { k: "Стерилизация", v: "Автоклав" },
  ],
},

{
  slug: "electrolase-sharp",
  image: "/products/electrolase-sharp.jpg",
  title: "Electrolase® Sharp Electrodes",
  brand: "CONMED",
  category: "electrosurgical-units",
  note: "",
  short: "Одноразовые электроды с острым наконечником.",
  specs: [
    { k: "Тип", v: "Острый наконечник" },
    { k: "Исполнение", v: "Стерильные / нестерильные" },
  ],
},

{
  slug: "electrolase-blunt",
  image: "/products/electrolase-blunt.jpg",
  title: "Electrolase® Blunt Electrodes",
  brand: "CONMED",
  category: "electrosurgical-units",
  note: "",
  short: "Одноразовые электроды с тупым наконечником.",
  specs: [
    { k: "Тип", v: "Тупой наконечник" },
    { k: "Исполнение", v: "Стерильные / нестерильные" },
  ],
},

{
  slug: "hyfrecator-bipolar-forceps",
  image: "/products/hyfrecator-bipolar-forceps.jpg",
  title: "Hyfrecator Bipolar Forceps",
  brand: "CONMED",
  category: "electrosurgical-units",
  note: "",
  short: "Биполярные щипцы для точной коагуляции тканей.",
  specs: [
    { k: "Тип", v: "Биполярные щипцы" },
    { k: "Назначение", v: "Коагуляция тканей" },
  ],
},

{
  slug: "hyfrecator-mobile-stand",
  image: "/products/hyfrecator-mobile-stand.jpg",
  title: "Hyfrecator Mobile Stand",
  brand: "CONMED",
  category: "electrosurgical-units",
  note: "",
  short: "Телескопическая мобильная стойка для аппарата Hyfrecator.",
  specs: [
    { k: "Тип", v: "Передвижная стойка" },
    { k: "Назначение", v: "Hyfrecator® 2000" },
  ],
},

{
  slug: "hyfrecator-footswitch",
  image: "/products/hyfrecator-footswitch.jpg",
  title: "Hyfrecator Foot Switch",
  brand: "CONMED",
  category: "electrosurgical-units",
  note: "",
  short: "Ножной переключатель для электрохирургического генератора.",
  specs: [
    { k: "Тип", v: "Ножная педаль" },
    { k: "Совместимость", v: "Hyfrecator® 2000" },
  ],
},
{
  slug: "system-2450-generator",
  image: "/products/system-2450-generator.jpg",
  title: "System 2450™",
  brand: "CONMED",
  category: "electrosurgical-units",
  note: "Новинка",
  short: "Высокочастотный электрохирургический генератор с технологией Dynamic Response.",
  specs: [
    { k: "Производитель", v: "CONMED Corporation, США" },
    { k: "Технология", v: "Dynamic Response" },
    { k: "Режимы", v: "Pure Cut, Blend, Spray Coag, Micro Bipolar, Macro Bipolar" },
    { k: "ARM", v: "Контроль качества контакта пациента" },
    { k: "Вес", v: "14.5 кг" },
  ],
},

{
  slug: "goldline-handpiece",
  image: "/products/goldline-handpiece.jpg",
  title: "GoldLine® Electrosurgical Handpiece",
  brand: "CONMED",
  category: "electrosurgical-units",
  note: "",
  short: "Электрохирургическая ручка GoldLine.",
  specs: [
    { k: "Тип", v: "Одноразовая / многоразовая" },
    { k: "Особенности", v: "Герметичные кнопки, шестигранный фиксатор" },
  ],
},

{
  slug: "ultraclean-electrodes",
  image: "/products/ultraclean-electrodes.jpg",
  title: "UltraClean® Electrodes",
  brand: "CONMED",
  category: "electrosurgical-units",
  note: "",
  short: "Электроды UltraClean с антипригарным покрытием.",
  specs: [
    { k: "Тип", v: "Электроды с покрытием UltraClean" },
    { k: "Особенности", v: "Изгиб до 90°" },
  ],
},

{
  slug: "tungsten-micro-needles",
  image: "/products/tungsten-micro-needles.jpg",
  title: "Tungsten Micro Needles",
  brand: "CONMED",
  category: "electrosurgical-units",
  note: "",
  short: "Вольфрамовые микроиглы для точной электрохирургии.",
  specs: [
    { k: "Материал", v: "Вольфрам" },
    { k: "Назначение", v: "Высокоточная коагуляция" },
  ],
},

{
  slug: "thermogard-electrodes",
  image: "/products/thermogard-electrodes.jpg",
  title: "ThermoGard® Patient Return Electrodes",
  brand: "CONMED",
  category: "electrosurgical-units",
  note: "",
  short: "Нейтральные электроды ThermoGard.",
  specs: [
    { k: "Тип", v: "Дисперсионные электроды" },
    { k: "Технология", v: "Blue Hydrogel" },
    { k: "Совместимость", v: "System 2450" },
  ],
},

{
  slug: "system-2450-footswitch",
  image: "/products/system-2450-footswitch.jpg",
  title: "System 2450 Foot Switch",
  brand: "CONMED",
  category: "electrosurgical-units",
  note: "",
  short: "Монополярная ножная педаль.",
  specs: [
    { k: "Тип", v: "Ножной переключатель" },
    { k: "Совместимость", v: "System 2450" },
  ],
},
{
  slug: "system-5000-generator",
  image: "/products/system-5000-generator.jpg",
  title: "System 5000™",
  brand: "CONMED",
  category: "electrosurgical-units",
  note: "Флагманская модель",
  short: "Высокочастотный электрохирургический генератор для общей, лапароскопической и роботизированной хирургии.",
  specs: [
    { k: "Производитель", v: "CONMED Corporation, США" },
    { k: "Технология", v: "Dynamic Response" },
    { k: "Память", v: "9 программируемых профилей" },
    { k: "Режимы", v: "General, Lap, Fluids, Pulse Coag, Pulse Cut, Micro Bipolar, Macro Bipolar" },
    { k: "Вес", v: "9.75 кг" },
  ],
},

{
  slug: "system-5000-monopolar-footswitch",
  image: "/products/system-5000-monopolar-footswitch.jpg",
  title: "System 5000 Monopolar Foot Switch",
  brand: "CONMED",
  category: "electrosurgical-units",
  note: "",
  short: "Монополярная ножная педаль для System 5000.",
  specs: [
    { k: "Тип", v: "Ножной переключатель" },
    { k: "Совместимость", v: "System 5000™" },
  ],
},

{
  slug: "system-5000-bipolar-footswitch",
  image: "/products/system-5000-bipolar-footswitch.jpg",
  title: "System 5000 Bipolar Foot Switch",
  brand: "CONMED",
  category: "electrosurgical-units",
  note: "",
  short: "Биполярная ножная педаль для System 5000.",
  specs: [
    { k: "Тип", v: "Биполярный ножной переключатель" },
    { k: "Совместимость", v: "System 5000™" },
  ],
},

{
  slug: "system-5000-ultraclean-electrode",
  image: "/products/system-5000-ultraclean-electrode.jpg",
  title: "UltraClean® Electrode",
  brand: "CONMED",
  category: "electrosurgical-units",
  note: "",
  short: "Электрод UltraClean с антипригарным покрытием.",
  specs: [
    { k: "Тип", v: "Одноразовый электрод" },
    { k: "Покрытие", v: "UltraClean®" },
    { k: "Совместимость", v: "System 5000™" },
  ],
},

{
  slug: "system-5000-thermogard",
  image: "/products/system-5000-thermogard.jpg",
  title: "ThermoGard® Return Electrode",
  brand: "CONMED",
  category: "electrosurgical-units",
  note: "",
  short: "Нейтральный электрод ThermoGard.",
  specs: [
    { k: "Тип", v: "Дисперсионный электрод" },
    { k: "Технология", v: "Blue Hydrogel" },
    { k: "Совместимость", v: "System 5000™" },
  ],
},

{
  slug: "system-5000-goldline",
  image: "/products/system-5000-goldline.jpg",
  title: "GoldLine® Handpiece",
  brand: "CONMED",
  category: "electrosurgical-units",
  note: "",
  short: "Электрохирургическая ручка GoldLine.",
  specs: [
    { k: "Тип", v: "Ручка GoldLine®" },
    { k: "Особенности", v: "Герметичные кнопки, надежный захват" },
    { k: "Совместимость", v: "System 5000™" },
  ],
},
];


export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getProductsByCategory(slug: string) {
  return products.filter((p) => p.category === slug);
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}