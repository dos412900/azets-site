import Link from "next/link";
import { DEFAULT_LANG, isLang, type Lang } from "@/lib/i18n";
import { categories, products } from "@/lib/azetsData";

type SearchParams = {
  [key: string]: string | string[] | undefined;
};

export default function CatalogPage({
  params,
}: {
  params: { lang: string };
}) {
  const lang: Lang = isLang(params.lang)
    ? (params.lang as Lang)
    : DEFAULT_LANG;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">
        Каталог
      </h1>

      {/* категории */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/${lang}/catalog/${c.slug}`}
            className="rounded-full border bg-white px-4 py-2 text-sm hover:bg-slate-100"
          >
            {c.title[lang]}
          </Link>
        ))}
      </div>

      {/* товары */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <Link
            key={p.slug}
            href={`/${lang}/product/${p.slug}`}
            className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="text-base font-semibold">
              {typeof p.title === "object" ? p.title[lang] : p.title}
            </div>
            <div className="mt-2 text-sm text-slate-600">
              {typeof p.short === "object" ? p.short[lang] : p.short}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}