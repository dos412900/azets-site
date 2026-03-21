import { getProduct, products } from "@/lib/azetsData";
import { notFound } from "next/navigation";
import Link from "next/link";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const p = getProduct(params.slug);
  if (!p) return notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="rounded-3xl border bg-white p-8 shadow-sm">
        <div className="text-sm text-slate-500">{p.brand || "BAS-M"}</div>
        <h1 className="mt-1 text-2xl font-semibold">{p.title}</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">{p.short}</p>

        {p.specs?.length ? (
          <div className="mt-6 grid gap-2">
            {p.specs.map((s) => (
              <div key={s.k} className="flex items-center justify-between rounded-xl border bg-slate-50 px-4 py-3 text-sm">
                <span className="text-slate-600">{s.k}</span>
                <span className="font-medium">{s.v}</span>
              </div>
            ))}
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/contacts" className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white">
            Запросить КП / консультацию
          </Link>
          <Link href="/catalog" className="rounded-xl border bg-white px-5 py-3 text-sm font-medium">
            Назад в каталог
          </Link>
        </div>
      </div>
    </div>
  );
}
