import Link from "next/link";
import { getCategory, getProductsByCategory, flatCategories } from "@/lib/basmData";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return flatCategories.map((c) => ({ category: c.slug }));
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const cat = getCategory(params.category);
  if (!cat) return notFound();

  const list = getProductsByCategory(params.category);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold">{cat.title}</h1>

      {list.length === 0 ? (
        <div className="mt-4 rounded-2xl border bg-white p-6 text-sm text-slate-600">
          Пока нет товаров в этой категории. Добавь позиции в <b>src/lib/basmData.ts</b>.
        </div>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <Link key={p.slug} href={`/product/${p.slug}`} className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="text-base font-semibold">{p.title}</div>
              <div className="mt-2 text-sm text-slate-600">{p.short}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
