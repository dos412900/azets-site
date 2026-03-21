"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Shield, GraduationCap, Wrench } from "lucide-react";
import { categories } from "@/lib/azetsData";
import { DEFAULT_LANG, isLang, type Lang } from "@/lib/i18n";

// ─── hook: fade-in on scroll ───────────────────────────────────────────────
function useFadeIn(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

// ─── animated counter ──────────────────────────────────────────────────────
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, visible } = useFadeIn(0.3);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 30);
    return () => clearInterval(timer);
  }, [visible, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── fade wrapper ──────────────────────────────────────────────────────────
function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── translations ──────────────────────────────────────────────────────────
const translations = {
  ru: {
    kicker: "Медицинское оборудование · Сервис · Обучение",
    title1: "Азет-С ",
    title2: "медицинское оборудование и решения для клиник",
    titleAccent: "решения",
    desc: "Подбираем комплектации под задачи отделения, помогаем внедрять, обучаем персонал и поддерживаем в эксплуатации.",
    primary: "Перейти в каталог",
    secondary: "Запросить КП",
    stats: [
      { num: 500, suffix: "+", label: "Наименований оборудования" },
      { num: 5, suffix: "+", label: "Лет на рынке" },
      { num: 100, suffix: "+", label: "Клиник-партнёров" },
    ],
    cardTag: "Коммерческое предложение",
    cardTitle: "Комплектация хирургического отделения",
    cardItems: [
      { name: "Операционный стол", status: "В наличии", type: "green" },
      { name: "Хирургический светильник", status: "В наличии", type: "green" },
      { name: "Анестезиологическая система", status: "Под заказ", type: "blue" },
      { name: "Мониторинг пациента", status: "Уточнить", type: "amber" },
    ],
    cardFooterLabel: "Итоговое КП готово",
    cardFooterVal: "4 позиции · ₸ по запросу",
    whyEyebrow: "Почему Азет-С",
    whyTitle: "Полный цикл — от подбора до сервиса",
    whySub: "Закрываем весь цикл: подбор → поставка → внедрение → обучение → сервис.",
    cards: [
      { icon: "shield", title: "Подбор комплектации", desc: "Подбираем оборудование под бюджет и клинический сценарий — без лишних позиций и переплат." },
      { icon: "grad", title: "Внедрение и обучение", desc: "Проводим инструктаж персонала и обеспечиваем ввод оборудования в клиническую практику." },
      { icon: "wrench", title: "Сервис и поддержка", desc: "Сопровождаем на всех этапах эксплуатации — по оборудованию и расходным материалам." },
    ],
    catEyebrow: "Каталог",
    catTitle: "Категории оборудования",
    catMore: "Смотреть все",
    stepsEyebrow: "Как мы работаем",
    stepsTitle: "Четыре шага до готового решения",
    steps: [
      { title: "Заявка", desc: "Понимаем задачу, сроки, бюджет" },
      { title: "Подбор", desc: "Формируем комплектацию и альтернативы" },
      { title: "КП", desc: "Отправляем предложение и спецификацию" },
      { title: "Внедрение", desc: "Поставка, запуск, обучение, поддержка" },
    ],
    trust: [
      "Понятные спецификации и прозрачное КП",
      "Поддержка по оборудованию и расходникам",
      "Обучение персонала и сопровождение внедрения",
    ],
    ctaTitle: "Нужна комплектация под отделение?",
    ctaDesc: "Опишите задачу — подготовим КП, предложим варианты под ваш бюджет и сроки.",
    ctaBtn: "Оставить заявку",
    nav: ["Каталог", "Услуги", "О компании", "Контакты"],
  },
  kz: {
    kicker: "Медициналық жабдық · Сервис · Оқыту",
    title1: "Азет-С —",
    title2: "клиникаларға арналған медициналық жабдық және шешімдер",
    titleAccent: "шешімдер",
    desc: "Бөлімше міндетіне сай комплектация таңдаймыз, енгізуге көмектесеміз, персоналды оқытамыз және қызмет көрсетеміз.",
    primary: "Каталогқа өту",
    secondary: "КП сұрау",
    stats: [
      { num: 500, suffix: "+", label: "Жабдық атауы" },
      { num: 5, suffix: "+", label: "Нарықтағы жылдар" },
      { num: 100, suffix: "+", label: "Клиника серіктестер" },
    ],
    cardTag: "Коммерциялық ұсыныс",
    cardTitle: "Хирургиялық бөлімшені жарақтандыру",
    cardItems: [
      { name: "Операциялық үстел", status: "Қолда бар", type: "green" },
      { name: "Хирургиялық шам", status: "Қолда бар", type: "green" },
      { name: "Анестезиологиялық жүйе", status: "Тапсырыс бойынша", type: "blue" },
      { name: "Пациент мониторингі", status: "Нақтылау", type: "amber" },
    ],
    cardFooterLabel: "КП дайын",
    cardFooterVal: "4 позиция · ₸ сұрау бойынша",
    whyEyebrow: "Неліктен Азет-С",
    whyTitle: "Таңдаудан сервиске дейін толық цикл",
    whySub: "Толық цикл: таңдау → жеткізу → енгізу → оқыту → сервис.",
    cards: [
      { icon: "shield", title: "Комплектация таңдау", desc: "Бюджет пен клиникалық сценарийге сай жабдық таңдаймыз." },
      { icon: "grad", title: "Енгізу және оқыту", desc: "Нұсқаулық жүргіземіз және жабдықты клиникалық тәжірибеге енгіземіз." },
      { icon: "wrench", title: "Сервис және қолдау", desc: "Барлық пайдалану кезеңдерінде сүйемелдейміз." },
    ],
    catEyebrow: "Каталог",
    catTitle: "Жабдық санаттары",
    catMore: "Барлығын көру",
    stepsEyebrow: "Қалай жұмыс істейміз",
    stepsTitle: "Дайын шешімге дейін төрт қадам",
    steps: [
      { title: "Өтінім", desc: "Мақсат, мерзім, бюджетті нақтылаймыз" },
      { title: "Таңдау", desc: "Комплектация және баламалар" },
      { title: "КП", desc: "Ұсыныс пен спецификация" },
      { title: "Енгізу", desc: "Жеткізу, іске қосу, оқыту, қолдау" },
    ],
    trust: [
      "Түсінікті спецификация және ашық КП",
      "Жабдық пен шығын материалдары бойынша қолдау",
      "Персоналды оқыту және енгізуді сүйемелдеу",
    ],
    ctaTitle: "Бөлімше үшін комплектация керек пе?",
    ctaDesc: "Міндетті жазыңыз — бюджет пен мерзімге сай КП дайындаймыз.",
    ctaBtn: "Өтінім қалдыру",
    nav: ["Каталог", "Қызметтер", "Компания туралы", "Байланыс"],
  },
  en: {
    kicker: "Medical Equipment · Service · Training",
    title1: "Азет-С ",
    title2: "medical equipment & solutions for clinics",
    titleAccent: "solutions",
    desc: "We select configurations for your department, help with implementation, train staff, and provide service support.",
    primary: "Open catalog",
    secondary: "Request a quote",
    stats: [
      { num: 500, suffix: "+", label: "Equipment items" },
      { num: 5, suffix: "+", label: "Years on market" },
      { num: 100, suffix: "+", label: "Clinic partners" },
    ],
    cardTag: "Commercial Proposal",
    cardTitle: "Surgical department configuration",
    cardItems: [
      { name: "Operating table", status: "In stock", type: "green" },
      { name: "Surgical light", status: "In stock", type: "green" },
      { name: "Anesthesia system", status: "On order", type: "blue" },
      { name: "Patient monitoring", status: "Clarify", type: "amber" },
    ],
    cardFooterLabel: "Quote is ready",
    cardFooterVal: "4 items · price on request",
    whyEyebrow: "Why Азет-С",
    whyTitle: "Full cycle — from selection to service",
    whySub: "Full cycle: selection → delivery → implementation → training → service.",
    cards: [
      { icon: "shield", title: "Configuration selection", desc: "We select equipment for your budget and clinical scenario — no extras." },
      { icon: "grad", title: "Implementation & training", desc: "We brief your staff and ensure smooth clinical onboarding." },
      { icon: "wrench", title: "Service & support", desc: "We support you at every stage of operation." },
    ],
    catEyebrow: "Catalog",
    catTitle: "Equipment categories",
    catMore: "View all",
    stepsEyebrow: "How it works",
    stepsTitle: "Four steps to a ready solution",
    steps: [
      { title: "Request", desc: "We clarify needs, timing, budget" },
      { title: "Selection", desc: "We propose configuration options" },
      { title: "Quote", desc: "We send proposal & specification" },
      { title: "Launch", desc: "Delivery, setup, training, support" },
    ],
    trust: [
      "Clear specs and transparent quote",
      "Support for equipment and consumables",
      "Staff training and implementation support",
    ],
    ctaTitle: "Need a department configuration?",
    ctaDesc: "Describe your request — we'll prepare a quote and options for your budget and timeline.",
    ctaBtn: "Leave a request",
    nav: ["Catalog", "Services", "About", "Contacts"],
  },
} as const;

type TranslationKey = keyof typeof translations;

const badgeStyles: Record<string, string> = {
  green: "bg-[#E6F7F5] text-[#0A7A72]",
  blue: "bg-[#E8F4FC] text-[#0A4A6E]",
  amber: "bg-[#FFF4E0] text-[#8A6000]",
};

function FeatureIcon({ name }: { name: string }) {
  const cls = "h-5 w-5 stroke-[#0A4A6E] fill-none stroke-[1.8]";
  if (name === "shield") return <Shield className={cls} />;
  if (name === "grad") return <GraduationCap className={cls} />;
  if (name === "wrench") return <Wrench className={cls} />;
  return <Shield className={cls} />;
}

// ─── page ──────────────────────────────────────────────────────────────────
export default function HomePage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  const currentLang: Lang = isLang(lang) ? lang : DEFAULT_LANG;
  const t = translations[currentLang as TranslationKey] ?? translations.ru;
  const topCats = (categories ?? []).slice(0, 6);

  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => { const timer = setTimeout(() => setHeroVisible(true), 80); return () => clearTimeout(timer); }, []);

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-[#F5F8FA] text-[#0D1F2D]" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }

        .card-lift {
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .card-lift:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 28px rgba(10,74,110,0.10);
          border-color: #93c5e8 !important;
        }

        .step-circle { transition: transform 0.2s ease, background 0.2s ease; }
        .step-wrap:hover .step-circle { transform: scale(1.12); background: #1a6fa0 !important; }

        .nav-link { position: relative; text-decoration: none; }
        .nav-link::after {
          content: ''; position: absolute; left: 0; bottom: -2px;
          width: 0; height: 1.5px; background: #0A4A6E;
          transition: width 0.25s ease;
        }
        .nav-link:hover::after { width: 100%; }

        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .btn-shimmer:hover {
          background: linear-gradient(90deg, #fff 35%, #d4edf7 50%, #fff 65%);
          background-size: 200% auto;
          animation: shimmer 1.2s linear infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.4); }
        }
        .trust-dot { animation: pulse-dot 2.8s ease-in-out infinite; }

        .cat-card { transition: border-color 0.2s ease; }
        .cat-card .cat-arrow { transition: transform 0.2s ease, color 0.2s ease; }
        .cat-card:hover .cat-arrow { transform: translateX(4px); color: #0A4A6E !important; }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(5px); }
        }
        .scroll-indicator { animation: bounce 1.8s ease-in-out infinite; }
      `}</style>

      

      <div className="max-w-6xl mx-auto px-8">

        {/* HERO */}
        <section className="max-w-3xl py-20">
          <div>
            {/* staggered hero entrance */}
            {[
              <span key="kicker" className="inline-block bg-[#E8F4FC] text-[#1a6fa0] text-[12px] font-medium tracking-[1.5px] uppercase px-4 py-1.5 rounded-full mb-6">
                {t.kicker}
              </span>,
              <h1 key="h1" className="font-serif text-[48px] leading-[1.15] font-bold mb-5">
                {t.title1}{" "}<br />
                {t.title2.split(t.titleAccent).map((part, i, arr) =>
                  i < arr.length - 1
                    ? <span key={i}>{part}<em className="not-italic text-[#00A99D]">{t.titleAccent}</em></span>
                    : <span key={i}>{part}</span>
                )}
              </h1>,
              <p key="desc" className="text-[16px] text-[#5a7080] leading-[1.75] font-light mb-9 max-w-lg">{t.desc}</p>,
              <div key="btns" className="flex gap-4 flex-wrap">
                <Link href={`/${lang}/catalog`}>
                  <button
                    className="flex items-center gap-2 bg-[#0A4A6E] text-white text-[14px] font-medium px-7 py-3.5 rounded-lg"
                    style={{ transition: "background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease" }}
                    onMouseEnter={e => { const b = e.currentTarget; b.style.background = "#1a6fa0"; b.style.transform = "translateY(-1px)"; b.style.boxShadow = "0 4px 16px rgba(10,74,110,0.25)"; }}
                    onMouseLeave={e => { const b = e.currentTarget; b.style.background = "#0A4A6E"; b.style.transform = ""; b.style.boxShadow = ""; }}
                  >
                    {t.primary}<ArrowRight className="h-4 w-4" />
                  </button>
                </Link>
                <Link href={`/${lang}/contacts`}>
                  <button
                    className="text-[14px] font-medium text-[#0A4A6E] px-7 py-3.5 rounded-lg border-[1.5px] border-[#0A4A6E]"
                    style={{ transition: "background 0.2s ease, transform 0.15s ease" }}
                    onMouseEnter={e => { const b = e.currentTarget; b.style.background = "#E8F4FC"; b.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={e => { const b = e.currentTarget; b.style.background = ""; b.style.transform = ""; }}
                  >
                    {t.secondary}
                  </button>
                </Link>
              </div>,
            ].map((el, i) => (
              <div
                key={i}
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(22px)",
                  transition: `opacity 0.7s ease ${i * 110}ms, transform 0.7s ease ${i * 110}ms`,
                }}
              >
                {el}
              </div>
            ))}

            {/* animated counters */}
            <div
              className="grid grid-cols-3 gap-4 mt-10"
              style={{ opacity: heroVisible ? 1 : 0, transition: "opacity 0.7s ease 480ms" }}
            >
              {t.stats.map((s) => (
                <div key={s.label} className="bg-white border border-[#d0dde8] rounded-xl p-4">
                  <div className="font-serif text-[28px] font-bold text-[#0A4A6E] leading-none">
                    <Counter target={s.num} suffix={s.suffix} />
                  </div>
                  <div className="text-[12px] text-[#5a7080] mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* scroll hint */}
        <div className="flex justify-center pb-8 -mt-6">
          <div className="scroll-indicator w-5 h-8 border-[1.5px] border-[#c0cdd8] rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-1.5 bg-[#0A4A6E] rounded-full" />
          </div>
        </div>

        <div className="h-px bg-[#d0dde8]" />

        {/* WHY */}
        <section className="py-16">
          <FadeIn className="mb-12">
            <div className="text-[12px] font-medium text-[#00A99D] tracking-[1.8px] uppercase mb-3">{t.whyEyebrow}</div>
            <h2 className="font-serif text-[34px] font-bold leading-[1.2] mb-3">{t.whyTitle}</h2>
            <p className="text-[15px] text-[#5a7080] font-light leading-[1.7] max-w-lg">{t.whySub}</p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-5">
            {t.cards.map((c, i) => (
              <FadeIn key={c.title} delay={i * 100}>
                <div className="card-lift bg-white border border-[#d0dde8] rounded-xl p-7 h-full">
                  <div className="w-10 h-10 bg-[#E8F4FC] rounded-xl flex items-center justify-center mb-5">
                    <FeatureIcon name={c.icon} />
                  </div>
                  <h3 className="text-[15px] font-medium mb-2">{c.title}</h3>
                  <p className="text-[13px] text-[#5a7080] leading-[1.65] font-light">{c.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="pb-16">
          <FadeIn className="mb-10">
            <div className="text-[12px] font-medium text-[#00A99D] tracking-[1.8px] uppercase mb-3">{t.catEyebrow}</div>
            <h2 className="font-serif text-[34px] font-bold leading-[1.2]">{t.catTitle}</h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-4">
            {topCats.map((c, i) => (
              <FadeIn key={c.slug} delay={i * 60}>
                <Link href={`/${lang}/catalog/${c.slug}`} className="no-underline block">
                  <div className="cat-card bg-white border border-[#d0dde8] rounded-xl p-5 flex items-center justify-between hover:border-[#1a6fa0]">
                    <span className="text-[14px] font-medium">{c.title[currentLang as Lang] ?? c.title[DEFAULT_LANG]}</span>
                    <ArrowRight className="cat-arrow h-4 w-4 text-[#5a7080]" />
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
          <FadeIn className="mt-6 text-center">
            <Link href={`/${lang}/catalog`}>
              <button className="text-[14px] text-[#0A4A6E] font-medium hover:underline">{t.catMore} →</button>
            </Link>
          </FadeIn>
        </section>

        {/* STEPS */}
        <section className="pb-16">
          <FadeIn>
            <div className="bg-white border border-[#d0dde8] rounded-2xl p-12">
              <div className="text-[12px] font-medium text-[#00A99D] tracking-[1.8px] uppercase mb-3">{t.stepsEyebrow}</div>
              <h2 className="font-serif text-[34px] font-bold leading-[1.2] mb-10">{t.stepsTitle}</h2>
              <div className="grid grid-cols-4 gap-0 relative">
                <div className="absolute top-[22px] left-[12.5%] right-[12.5%] h-px bg-[#d0dde8] z-0" />
                {t.steps.map((s, i) => (
                  <div key={s.title} className="step-wrap text-center relative z-10 cursor-default">
                    <div className="step-circle w-11 h-11 rounded-full bg-[#0A4A6E] text-white font-serif text-[18px] font-bold flex items-center justify-center mx-auto mb-4">
                      {i + 1}
                    </div>
                    <div className="text-[14px] font-medium mb-1.5">{s.title}</div>
                    <div className="text-[12px] text-[#5a7080] leading-[1.6] px-2">{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </section>

        {/* TRUST */}
        <FadeIn>
          <div className="flex flex-wrap gap-8 justify-center py-8 border-t border-b border-[#d0dde8] mb-8">
            {t.trust.map((item, i) => (
              <div key={item} className="flex items-center gap-2 text-[13px] text-[#5a7080]">
                <div
                  className="trust-dot w-1.5 h-1.5 rounded-full bg-[#00A99D] flex-shrink-0"
                  style={{ animationDelay: `${i * 0.9}s` }}
                />
                {item}
              </div>
            ))}
          </div>
        </FadeIn>

        {/* CTA */}
        <FadeIn>
          <div className="bg-[#0A4A6E] rounded-2xl p-14 grid md:grid-cols-[1fr_auto] gap-10 items-center mb-16">
            <div>
              <h2 className="font-serif text-[30px] font-bold text-white leading-[1.3] mb-2.5">{t.ctaTitle}</h2>
              <p className="text-[14px] text-white/75 font-light leading-[1.7] max-w-lg">{t.ctaDesc}</p>
            </div>
            <Link href={`/${lang}/contacts`}>
              <button
                className="btn-shimmer bg-white text-[#0A4A6E] text-[14px] font-medium px-8 py-3.5 rounded-xl whitespace-nowrap"
                style={{ transition: "transform 0.15s ease, box-shadow 0.2s ease" }}
                onMouseEnter={e => { const b = e.currentTarget; b.style.transform = "translateY(-2px)"; b.style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)"; }}
                onMouseLeave={e => { const b = e.currentTarget; b.style.transform = ""; b.style.boxShadow = ""; }}
              >
                {t.ctaBtn}
              </button>
            </Link>
          </div>
        </FadeIn>

      </div>
    </div>
  );
}