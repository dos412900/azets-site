type Category = {
  slug: string;
  title: {
    ru: string;
    kz: string;
    en: string;
  };
  description: {
    ru: string;
    kz: string;
    en: string;
  };
};

export type Product = {
  slug: string;
  title: string;
  category: string; 
  short: string;
  brand?: string;
  specs?: Array<{ k: string; v: string }>;
};

export const categories = [
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
    slug: "ophthalmic-diagnostics",
    title: {
      ru: "Офтальмологическая диагностика",
      kz: "Офтальмологиялық диагностика",
      en: "Ophthalmic Diagnostics",
    },
    description: {
      ru: "Диагностическое оборудование для офтальмологии",
      kz: "Офтальмологияға арналған диагностикалық жабдық",
      en: "Diagnostic equipment for ophthalmology",
    },
  },
  {
    slug: "ophthalmic-consumables",
    title: {
      ru: "Офтальмологические расходные материалы",
      kz: "Офтальмологиялық шығын материалдары",
      en: "Ophthalmic Consumables",
    },
    description: {
      ru: "Расходные материалы для офтальмологических процедур",
      kz: "Офтальмологиялық процедураларға арналған материалдар",
      en: "Consumables for ophthalmic procedures",
    },
  },
];

export const products: Product[] = [
  {
    slug: "Azet-s-neuro-monitor-x",
    title: "Azet-s Neuro Monitor X",
    brand: "Azet-s",
    category: "neuromonitoring",
    short: "Система интраоперационного нейромониторинга для нейрохирургии.",
    specs: [
      { k: "Назначение", v: "ИОНМ" },
      { k: "Комплектация", v: "по запросу" },
    ],
  },
  {
    slug: "Azet-s-endoscopy-kit",
    title: "Azet-s Endoscopy Kit",
    brand: "Azet-s",
    category: "endoscopy",
    short: "Комплект решений для эндоскопии, конфигурация под клинику.",
    specs: [
      { k: "Сценарии", v: "эндоскопические вмешательства" },
      { k: "Сервис", v: "обучение + поддержка" },
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
