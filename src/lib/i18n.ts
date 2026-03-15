export const LANGS = ["ru", "kz", "en"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "ru";

export function isLang(x: string): x is Lang {
  return (LANGS as readonly string[]).includes(x);
}

export const dict = {
  ru: {
    navCatalog: "Каталог",
    navService: "Сервис",
    navNews: "Новости",
    navAbout: "О компании",
    navContacts: "Контакты",
    search: "Поиск по каталогу…",
    heroTop: "Каталог • Подбор комплектации • Сервис",
    heroTitle: "BAS-M: медицинское оборудование и решения для клиник",
    heroDesc:
      "Подбираем конфигурации под задачи отделения, помогаем внедрять, обучаем персонал и поддерживаем в эксплуатации.",
    btnCatalog: "Перейти в каталог",
    btnQuote: "Запросить КП",
    p1t: "Подбор комплектации",
    p1d: "Под бюджет и клинический сценарий.",
    p2t: "Внедрение и обучение",
    p2d: "Инструктаж и ввод в практику.",
    p3t: "Сервис и поддержка",
    p3d: "Сопровождение на всех этапах.",
    categories: "Категории",
    viewAll: "Смотреть всё →",
    popular: "Популярные позиции",
    ctaT: "Нужно КП или консультация?",
    ctaD: "Опишите задачу — подготовим предложение и отправим на email.",
    ctaB: "Оставить заявку",
  },
  kz: {
    navCatalog: "Каталог",
    navService: "Сервис",
    navNews: "Жаңалықтар",
    navAbout: "Компания туралы",
    navContacts: "Байланыс",
    search: "Каталог бойынша іздеу…",
    heroTop: "Каталог • Жиынтықты таңдау • Сервис",
    heroTitle: "BAS-M: клиникаларға арналған медициналық жабдықтар мен шешімдер",
    heroDesc:
      "Бөлім қажеттілігіне сай конфигурация таңдаймыз, енгізуге көмектесеміз, оқытамыз және пайдалану кезінде қолдаймыз.",
    btnCatalog: "Каталогқа өту",
    btnQuote: "Коммерциялық ұсыныс",
    p1t: "Жиынтықты таңдау",
    p1d: "Бюджет пен клиникалық сценарийге сай.",
    p2t: "Енгізу және оқыту",
    p2d: "Нұсқаулық және практикаға енгізу.",
    p3t: "Сервис және қолдау",
    p3d: "Барлық кезеңде сүйемелдеу.",
    categories: "Санаттар",
    viewAll: "Барлығын көру →",
    popular: "Танымал позициялар",
    ctaT: "КП немесе кеңес керек пе?",
    ctaD: "Міндетті жазыңыз — ұсынысты дайындап, email-ға жібереміз.",
    ctaB: "Өтінім қалдыру",
  },
  en: {
    navCatalog: "Catalog",
    navService: "Service",
    navNews: "News",
    navAbout: "About",
    navContacts: "Contacts",
    search: "Search in catalog…",
    heroTop: "Catalog • Configuration • Service",
    heroTitle: "BAS-M: medical equipment and solutions for clinics",
    heroDesc:
      "We select configurations for your department needs, help with implementation, train staff, and provide ongoing support.",
    btnCatalog: "Open catalog",
    btnQuote: "Request a quote",
    p1t: "Configuration",
    p1d: "Aligned to budget and clinical scenario.",
    p2t: "Implementation & training",
    p2d: "Onboarding and practical training.",
    p3t: "Support",
    p3d: "Assistance at every stage.",
    categories: "Categories",
    viewAll: "View all →",
    popular: "Popular items",
    ctaT: "Need a quote or консультация?",
    ctaD: "Describe your task — we’ll prepare an offer and email it to you.",
    ctaB: "Send request",
  },
} as const;

export type Dict = (typeof dict)["ru"];

export function getDict(lang: Lang): Dict {
  return dict[lang] as unknown as Dict;
}
