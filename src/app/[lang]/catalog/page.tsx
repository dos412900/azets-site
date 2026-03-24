import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Search, Package } from "lucide-react";
import { categories, products } from "@/lib/azetsData";
import { DEFAULT_LANG, isLang, type Lang } from "@/lib/i18n";

interface PageProps {
  params: Promise<{ lang: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

const t = {
  ru: {
    kicker: "Каталог",
    title: "Медицинское оборудование",
    subtitle: "Подбираем комплектацию под задачи отделения. Уточните позицию — подготовим КП.",
    searchPlaceholder: "Поиск по каталогу…",
    resultsFor: "Результаты по запросу",
    all: "Все категории",
    products: "Товары",
    empty: "Ничего не найдено",
    emptyDesc: "Попробуйте изменить запрос или выберите категорию.",
    requestBtn: "Запросить КП",
    detailBtn: "Подробнее",
    ctaTitle: "Не нашли нужное?",
    ctaDesc: "Опишите задачу — подберём оборудование под ваш запрос и бюджет.",
    ctaBtn: "Оставить заявку",
    specsLabel: "Характеристики",
  },
  kz: {
    kicker: "Каталог",
    title: "Медициналық жабдық",
    subtitle: "Бөлімше міндеттеріне сай комплектация таңдаймыз. Позицияны нақтылаңыз — КП дайындаймыз.",
    searchPlaceholder: "Каталог бойынша іздеу…",
    resultsFor: "Сұраныс бойынша нәтижелер",
    all: "Барлық санаттар",
    products: "Тауарлар",
    empty: "Ештеңе табылмады",
    emptyDesc: "Сұранысты өзгертіп көріңіз немесе санатты таңдаңыз.",
    requestBtn: "КП сұрау",
    detailBtn: "Толығырақ",
    ctaTitle: "Қажеттісін таппадыңыз ба?",
    ctaDesc: "Міндетті сипаттаңыз — сұранысыңыз бен бюджетіңізге сай жабдық таңдаймыз.",
    ctaBtn: "Өтінім қалдыру",
    specsLabel: "Сипаттамалар",
  },
  en: {
    kicker: "Catalog",
    title: "Medical equipment",
    subtitle: "We select configurations for your department. Clarify a position — we'll prepare a quote.",
    searchPlaceholder: "Search catalog…",
    resultsFor: "Results for",
    all: "All categories",
    products: "Products",
    empty: "Nothing found",
    emptyDesc: "Try changing your query or select a category.",
    requestBtn: "Request quote",
    detailBtn: "Details",
    ctaTitle: "Didn't find what you need?",
    ctaDesc: "Describe your task — we'll select equipment for your request and budget.",
    ctaBtn: "Leave a request",
    specsLabel: "Specs",
  },
};

export default async function CatalogPage({ params, searchParams }: PageProps) {
  const { lang: rawLang } = await params;
  const lang: Lang = isLang(rawLang) ? rawLang : DEFAULT_LANG;
  const tr = t[lang];

  const sp = searchParams ? await searchParams : {};
  const raw = sp?.q;
  const q = (Array.isArray(raw) ? raw[0] : raw || "").toLowerCase().trim();

  const catFilter = sp?.cat;
  const activeCat = Array.isArray(catFilter) ? catFilter[0] : catFilter || "";

  const list = products.filter((p) => {
    const matchesQ = q ? (p.title + " " + (p.short || "")).toLowerCase().includes(q) : true;
    const matchesCat = activeCat ? p.category === activeCat : true;
    return matchesQ && matchesCat;
  });

  return (
    <div className="bg-[#F5F8FA] text-[#0D1F2D] min-h-screen" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }

        .cat-pill {
          font-size: 13px; font-weight: 400;
          padding: 7px 16px; border-radius: 20px;
          border: 1px solid #d0dde8; background: #fff; color: #5a7080;
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
          white-space: nowrap;
        }
        .cat-pill:hover { background: #E8F4FC; border-color: #93c5e8; color: #0A4A6E; }
        .cat-pill.active { background: #0A4A6E; border-color: #0A4A6E; color: #fff; font-weight: 500; }

        .product-card {
          background: #fff; border: 1px solid #d0dde8; border-radius: 12px;
          overflow: hidden; display: flex; flex-direction: column;
          transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
        }
        .product-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 28px rgba(10,74,110,0.10);
          border-color: #93c5e8;
        }

        .product-img-wrap {
          width: 100%; aspect-ratio: 4/3;
          background: #F0F5FA;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden; flex-shrink: 0;
        }
        .product-img-wrap img {
          width: 100%; height: 100%;
          object-fit: contain; padding: 16px;
        }
        .product-img-placeholder {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 8px; color: #b0c4d4; width: 100%; height: 100%;
        }

        .product-body { padding: 20px; display: flex; flex-direction: column; flex: 1; }

        .spec-row { display: flex; gap: 8px; font-size: 12px; color: #5a7080; }
        .spec-key { color: #9aabb8; }

        .detail-btn {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 13px; font-weight: 500; color: #0A4A6E;
          text-decoration: none; transition: gap 0.2s ease;
        }
        .detail-btn:hover { gap: 8px; }

        .search-wrap {
          display: flex; align-items: center; gap: 8px;
          background: #fff; border: 1px solid #d0dde8;
          border-radius: 10px; padding: 10px 16px; max-width: 420px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .search-wrap:focus-within {
          border-color: #0A4A6E;
          box-shadow: 0 0 0 3px rgba(10,74,110,0.08);
        }
        .search-wrap input {
          border: none; outline: none; background: transparent;
          font-size: 14px; font-family: 'DM Sans', sans-serif;
          color: #0D1F2D; width: 100%;
        }
        .search-wrap input::placeholder { color: #9aabb8; }

        .req-btn {
          font-size: 12px; font-weight: 500;
          color: #fff; background: #0A4A6E;
          border-radius: 8px; padding: 6px 14px;
          text-decoration: none; transition: background 0.2s ease;
          font-family: 'DM Sans', sans-serif;
        }
        .req-btn:hover { background: #1a6fa0; }

        .cta-btn {
          background: #fff; color: #0A4A6E;
          font-size: 14px; font-weight: 500;
          padding: 14px 32px; border-radius: 12px; border: none; cursor: pointer;
          display: inline-flex; align-items: center; gap: 8px; white-space: nowrap;
          font-family: 'DM Sans', sans-serif; text-decoration: none;
          transition: background 0.2s ease, transform 0.15s ease;
        }
        .cta-btn:hover { background: #E8F4FC; transform: translateY(-1px); }
      `}</style>

      <div className="max-w-6xl mx-auto px-8 py-16">

        {/* header */}
        <div className="mb-10">
          <span className="inline-block bg-[#E8F4FC] text-[#1a6fa0] text-[12px] font-medium tracking-[1.5px] uppercase px-4 py-1.5 rounded-full mb-5">
            {tr.kicker}
          </span>
          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-0 justify-between">
            <div>
              <h1 className="font-serif text-[44px] font-bold leading-[1.15] mb-3">{tr.title}</h1>
              <p className="text-[15px] text-[#5a7080] font-light leading-[1.7] max-w-xl">{tr.subtitle}</p>
            </div>
            <form action={`/${lang}/catalog`} className="search-wrap">
              <Search style={{ width: 16, height: 16, color: "#9aabb8", flexShrink: 0 }} />
              <input name="q" defaultValue={q} placeholder={tr.searchPlaceholder} />
            </form>
          </div>
        </div>

        {/* category pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          <Link href={`/${lang}/catalog`} className={`cat-pill${!activeCat && !q ? " active" : ""}`}>
            {tr.all}
          </Link>
          {categories.map((c) => (
            <Link key={c.slug} href={`/${lang}/catalog?cat=${c.slug}`} className={`cat-pill${activeCat === c.slug ? " active" : ""}`}>
              {c.title[lang]}
            </Link>
          ))}
        </div>

        {/* section label */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-[12px] font-medium text-[#00A99D] tracking-[1.8px] uppercase">
            {q ? `${tr.resultsFor}: "${q}"` : tr.products}
          </div>
          <div className="text-[13px] text-[#9aabb8]">{list.length}</div>
        </div>

        {/* products grid */}
        {list.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {list.map((p) => (
              <div key={p.slug} className="product-card">

                {/* image */}
                <div className="product-img-wrap">
                  {p.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.image} alt={p.title} />
                  ) : (
                    <div className="product-img-placeholder">
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                        <rect x="2" y="3" width="20" height="14" rx="2"/>
                        <path d="M8 21h8M12 17v4"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      <span style={{ fontSize: 11, letterSpacing: "0.5px", textTransform: "uppercase" }}>
                        {p.brand ?? "Фото"}
                      </span>
                    </div>
                  )}
                </div>

                {/* body */}
                <div className="product-body">
                  {p.brand && (
                    <span className="inline-block bg-[#E8F4FC] text-[#0A4A6E] text-[11px] font-medium px-2.5 py-1 rounded-full mb-3 self-start">
                      {p.brand}
                    </span>
                  )}

                  <h3 className="text-[15px] font-medium leading-[1.4] mb-2">{p.title}</h3>
                  <p className="text-[13px] text-[#5a7080] leading-[1.65] font-light flex-1 mb-4">{p.short}</p>

                  {p.specs && p.specs.length > 0 && (
                    <div className="flex flex-col gap-1.5 mb-5 pt-4 border-t border-[#f0f4f8]">
                      {p.specs.slice(0, 3).map((s) => (
                        <div key={s.k} className="spec-row">
                          <span className="spec-key">{s.k}:</span>
                          <span>{s.v}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-[#f0f4f8] mt-auto">
                    <Link href={`/${lang}/product/${p.slug}`} className="detail-btn">
                      {tr.detailBtn} <ArrowRight style={{ width: 13, height: 13 }} />
                    </Link>
                    <Link href={`/${lang}/contacts`} className="req-btn">
                      {tr.requestBtn}
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-[#d0dde8] rounded-2xl p-16 text-center mb-16">
            <Package className="h-10 w-10 text-[#d0dde8] mx-auto mb-4" />
            <h3 className="text-[16px] font-medium mb-2">{tr.empty}</h3>
            <p className="text-[14px] text-[#9aabb8] font-light">{tr.emptyDesc}</p>
          </div>
        )}

        {/* CTA */}
        <div className="bg-[#0A4A6E] rounded-2xl p-12 grid md:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <h2 className="font-serif text-[28px] font-bold text-white leading-[1.3] mb-2">{tr.ctaTitle}</h2>
            <p className="text-[14px] text-white/75 font-light leading-[1.7]">{tr.ctaDesc}</p>
          </div>
          <Link href={`/${lang}/contacts`} className="cta-btn">
            {tr.ctaBtn} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}