import Link from "next/link";
import { flatCategories, products } from "@/lib/basmData";

type SP = { [key: string]: string | string[] | undefined };

export default function CatalogPage({ searchParams }: { searchParams?: SP }) {
  const raw = searchParams?.q;
  const q = (Array.isArray(raw) ? raw[0] : raw || "").toLowerCase().trim();

  const list = q
    ? products.filter((p) => (p.title + " " + (p.short || "")).toLowerCase().includes(q))
    : products;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Каталог</h1>

      <div className="mt-4 flex flex-wrap gap-2">
        {flatCategories.map((c) => (
          <Link key={c.slug} href={`/catalog/${c.slug}`} className="rounded-full border bg-white px-4 py-2 text-sm">
            {c.title}
          </Link>
        ))}
      </div>

      <h2 className="mt-10 text-lg font-semibold">{q ? `Результаты: “${q}”` : "Товары"}</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <Link key={p.slug} href={`/product/${p.slug}`} className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="text-base font-semibold">{p.title}</div>
            <div className="mt-2 text-sm text-slate-600">{p.short}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
