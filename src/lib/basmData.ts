export type Category = {
  slug: string;
  title: string;
  children?: Category[];
};

export type Product = {
  slug: string;
  title: string;
  category: string; // slug категории (может быть нижнего уровня)
  short: string;
  brand?: string;
  specs?: Array<{ k: string; v: string }>;
};

export const categories: Category[] = [
  { slug: "neuromonitoring", title: "Нейромониторинг" },
  { slug: "neuromodulation", title: "Нейромодуляция" },
  { slug: "neurointervention", title: "Нейроинтервенция" },
  { slug: "functional-neurosurgery", title: "Функциональная нейрохирургия" },
  { slug: "cranioplasty", title: "Краниопластика" },
  {
    slug: "diagnostics",
    title: "Диагностика",
    children: [
      { slug: "mri-ct", title: "МРТ и КТ" },
      { slug: "ultrasound", title: "УЗИ аппараты" },
      { slug: "endoscopy", title: "Эндоскопия" },
      { slug: "cerebral", title: "Церебральная диагностика" },
    ],
  },
  { slug: "tools", title: "Инструменты" },
  { slug: "medical-furniture", title: "Медицинская мебель" },
];

export const products: Product[] = [
  {
    slug: "basm-neuro-monitor-x",
    title: "BAS-M Neuro Monitor X",
    brand: "BAS-M",
    category: "neuromonitoring",
    short: "Система интраоперационного нейромониторинга для нейрохирургии.",
    specs: [
      { k: "Назначение", v: "ИОНМ" },
      { k: "Комплектация", v: "по запросу" },
    ],
  },
  {
    slug: "basm-endoscopy-kit",
    title: "BAS-M Endoscopy Kit",
    brand: "BAS-M",
    category: "endoscopy",
    short: "Комплект решений для эндоскопии, конфигурация под клинику.",
    specs: [
      { k: "Сценарии", v: "эндоскопические вмешательства" },
      { k: "Сервис", v: "обучение + поддержка" },
    ],
  },
];

function flattenCats(list: Category[]): Category[] {
  const out: Category[] = [];
  for (const c of list) {
    out.push({ slug: c.slug, title: c.title });
    if (c.children?.length) out.push(...flattenCats(c.children));
  }
  return out;
}

export const flatCategories = flattenCats(categories);

export function getCategory(slug: string) {
  return flatCategories.find((c) => c.slug === slug);
}

export function getProductsByCategory(slug: string) {
  return products.filter((p) => p.category === slug);
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
