import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { getProduct, getProductsByCategory, getCategory } from "@/lib/azetsData";
import { DEFAULT_LANG, isLang, type Lang } from "@/lib/i18n";

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

const t = {
  ru: {
    back: "Назад в каталог",
    specs: "Технические характеристики",
    related: "Похожие товары",
    requestBtn: "Запросить КП",
    requestDesc: "Уточните наличие и сроки поставки",
    ctaTitle: "Нужна консультация или КП?",
    ctaDesc: "Опишите задачу — подготовим предложение под ваш бюджет и сроки.",
    ctaBtn: "Оставить заявку",
    note: "Примечание",
    category: "Категория",
    brand: "Производитель",
    detailBtn: "Подробнее",
    notFound: "Товар не найден",
    notFoundDesc: "Вернитесь в каталог и выберите нужную позицию.",
    toCatalog: "Перейти в каталог",
  },
  kz: {
    back: "Каталогқа оралу",
    specs: "Техникалық сипаттамалар",
    related: "Ұқсас тауарлар",
    requestBtn: "КП сұрау",
    requestDesc: "Қолжетімділік пен жеткізу мерзімін нақтылаңыз",
    ctaTitle: "Кеңес немесе КП керек пе?",
    ctaDesc: "Міндетті сипаттаңыз — бюджет пен мерзімге сай ұсыныс дайындаймыз.",
    ctaBtn: "Өтінім қалдыру",
    note: "Ескертпе",
    category: "Санат",
    brand: "Өндіруші",
    detailBtn: "Толығырақ",
    notFound: "Тауар табылмады",
    notFoundDesc: "Каталогқа оралып, қажетті позицияны таңдаңыз.",
    toCatalog: "Каталогқа өту",
  },
  en: {
    back: "Back to catalog",
    specs: "Technical specifications",
    related: "Related products",
    requestBtn: "Request quote",
    requestDesc: "Check availability and delivery time",
    ctaTitle: "Need a consultation or quote?",
    ctaDesc: "Describe your task — we'll prepare a proposal for your budget and timeline.",
    ctaBtn: "Leave a request",
    note: "Note",
    category: "Category",
    brand: "Manufacturer",
    detailBtn: "Details",
    notFound: "Product not found",
    notFoundDesc: "Go back to the catalog and select a product.",
    toCatalog: "Go to catalog",
  },
};

export default async function ProductPage({ params }: PageProps) {
  const { lang: rawLang, slug } = await params;
  const lang: Lang = isLang(rawLang) ? rawLang : DEFAULT_LANG;
  const tr = t[lang];

  const product = getProduct(slug);

  if (!product) {
    return (
      <div className="bg-[#F5F8FA] min-h-screen flex items-center justify-center" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500&display=swap'); .font-serif{font-family:'Playfair Display',serif}`}</style>
        <div className="text-center">
          <h1 className="font-serif text-[32px] font-bold mb-3">{tr.notFound}</h1>
          <p className="text-[#5a7080] mb-8">{tr.notFoundDesc}</p>
          <Link href={`/${lang}/catalog`} className="inline-flex items-center gap-2 bg-[#0A4A6E] text-white px-6 py-3 rounded-xl text-[14px] font-medium no-underline">
            {tr.toCatalog} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  const category = getCategory(product.category);
  const related = getProductsByCategory(product.category)
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return (
    <div className="bg-[#F5F8FA] text-[#0D1F2D] min-h-screen" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }

        .spec-row {
          display: grid; grid-template-columns: 1fr 1fr;
          padding: 12px 0; border-bottom: 1px solid #f0f4f8;
          font-size: 14px;
        }
        .spec-row:last-child { border-bottom: none; }
        .spec-key { color: #7a8fa0; }
        .spec-val { color: #0D1F2D; font-weight: 500; }

        .related-card {
          background: #fff; border: 1px solid #d0dde8;
          border-radius: 12px; overflow: hidden;
          text-decoration: none; color: inherit;
          transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
          display: flex; flex-direction: column;
        }
        .related-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 28px rgba(10,74,110,0.10);
          border-color: #93c5e8;
        }
        .related-img {
          width: 100%; aspect-ratio: 4/3;
          background: #F0F5FA;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
        }
        .related-img img { width: 100%; height: 100%; object-fit: contain; padding: 12px; }
        .related-placeholder { color: #b0c4d4; }
      `}</style>

      <div className="max-w-6xl mx-auto px-8 py-12">

        {/* breadcrumb */}
        <Link
          href={`/${lang}/catalog`}
          className="inline-flex items-center gap-2 text-[13px] text-[#5a7080] hover:text-[#0A4A6E] no-underline mb-10 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {tr.back}
        </Link>

        {/* main grid */}
        <div className="grid lg:grid-cols-[1fr_380px] gap-12 mb-16">

          {/* left — image + specs */}
          <div>
            {/* image */}
            <div className="bg-white border border-[#d0dde8] rounded-2xl overflow-hidden mb-8"
              style={{ aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              {product.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.image}
                  alt={product.title}
                  style={{ width: "100%", height: "100%", objectFit: "contain", padding: "32px" }}
                />
              ) : (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, color: "#b0c4d4" }}>
                  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <rect x="2" y="3" width="20" height="14" rx="2"/>
                    <path d="M8 21h8M12 17v4"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span style={{ fontSize: 12, letterSpacing: "1px", textTransform: "uppercase" }}>
                    {product.brand ?? "Фото по запросу"}
                  </span>
                </div>
              )}
            </div>

            {/* specs */}
            {product.specs && product.specs.length > 0 && (
              <div className="bg-white border border-[#d0dde8] rounded-2xl p-8">
                <div className="text-[12px] font-medium text-[#00A99D] tracking-[1.8px] uppercase mb-6">
                  {tr.specs}
                </div>
                <div>
                  {product.specs.map((s) => (
                    <div key={s.k} className="spec-row">
                      <span className="spec-key">{s.k}</span>
                      <span className="spec-val">{s.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* right — info + CTA */}
          <div className="flex flex-col gap-5">

            {/* meta */}
            <div className="bg-white border border-[#d0dde8] rounded-2xl p-7">
              {/* category + brand */}
              <div className="flex flex-wrap gap-2 mb-5">
                {category && (
                  <span className="inline-block bg-[#E8F4FC] text-[#0A4A6E] text-[11px] font-medium px-3 py-1 rounded-full">
                    {category.title[lang]}
                  </span>
                )}
                {product.brand && (
                  <span className="inline-block bg-[#F5F8FA] text-[#5a7080] text-[11px] font-medium px-3 py-1 rounded-full border border-[#d0dde8]">
                    {product.brand}
                  </span>
                )}
              </div>

              <h1 className="font-serif text-[28px] font-bold leading-[1.2] mb-4">{product.title}</h1>
              <p className="text-[14px] text-[#5a7080] leading-[1.75] font-light">{product.short}</p>

              {/* note */}
              {product.note && (
                <div className="mt-5 flex items-start gap-2.5 bg-[#FFF4E0] rounded-xl px-4 py-3">
                  <CheckCircle className="h-4 w-4 text-[#8A6000] flex-shrink-0 mt-0.5" />
                  <span className="text-[13px] text-[#8A6000] font-medium">{product.note}</span>
                </div>
              )}
            </div>

            {/* request CTA */}
            <div className="bg-[#0A4A6E] rounded-2xl p-7">
              <div className="text-[12px] font-medium text-[#00A99D] tracking-[1.5px] uppercase mb-3">
                {tr.requestDesc}
              </div>
              <p className="text-[14px] text-white/75 font-light leading-[1.65] mb-5">{tr.ctaDesc}</p>
              <Link href={`/${lang}/contacts`} className="no-underline">
                <div
                  className="flex items-center justify-center gap-2 bg-white text-[#0A4A6E] text-[14px] font-medium px-6 py-3.5 rounded-xl w-full"
                  style={{ transition: "background 0.2s" }}
                >
                  {tr.requestBtn} <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            </div>

            {/* delivery info */}
            <div className="bg-white border border-[#d0dde8] rounded-2xl p-6">
              {[
                "Гарантия 12 месяцев с момента запуска",
                "Срок поставки — 90 дней",
                "Выезд инженера для установки",
                "Обучение персонала",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 py-2 border-b border-[#f0f4f8] last:border-0">
                  <CheckCircle className="h-3.5 w-3.5 text-[#00A99D] flex-shrink-0" />
                  <span className="text-[13px] text-[#5a7080]">{item}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* related products */}
        {related.length > 0 && (
          <section className="mb-16">
            <div className="text-[12px] font-medium text-[#00A99D] tracking-[1.8px] uppercase mb-6">
              {tr.related}
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((p) => (
                <Link key={p.slug} href={`/${lang}/product/${p.slug}`} className="related-card">
                  <div className="related-img">
                    {p.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.image} alt={p.title} />
                    ) : (
                      <div className="related-placeholder">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                          <rect x="2" y="3" width="20" height="14" rx="2"/>
                          <circle cx="12" cy="10" r="3"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  <div style={{ padding: "16px 20px 20px" }}>
                    {p.brand && (
                      <span className="inline-block bg-[#E8F4FC] text-[#0A4A6E] text-[11px] font-medium px-2.5 py-1 rounded-full mb-3">
                        {p.brand}
                      </span>
                    )}
                    <h3 className="text-[14px] font-medium leading-[1.4] mb-1">{p.title}</h3>
                    <p className="text-[12px] text-[#9aabb8] leading-[1.6]">{p.short?.slice(0, 80)}…</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* bottom CTA */}
        <div className="bg-[#0A4A6E] rounded-2xl p-12 grid md:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <h2 className="font-serif text-[28px] font-bold text-white leading-[1.3] mb-2">{tr.ctaTitle}</h2>
            <p className="text-[14px] text-white/75 font-light leading-[1.7]">{tr.ctaDesc}</p>
          </div>
          <Link href={`/${lang}/contacts`} className="no-underline">
            <div className="bg-white text-[#0A4A6E] text-[14px] font-medium px-8 py-3.5 rounded-xl whitespace-nowrap flex items-center gap-2">
              {tr.ctaBtn} <ArrowRight className="h-4 w-4" />
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
}