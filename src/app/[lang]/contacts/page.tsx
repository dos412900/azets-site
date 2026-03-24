"use client";

import { useEffect, useRef, useState } from "react";
import { Phone, Mail, Clock, MapPin, Send } from "lucide-react";
import { DEFAULT_LANG, isLang, type Lang } from "@/lib/i18n";

// ─── fade-in on scroll ─────────────────────────────────────────────────────
function useFadeIn(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useFadeIn();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(18px)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

// ─── translations ──────────────────────────────────────────────────────────
const translations = {
  ru: {
    kicker: "Свяжитесь с нами",
    title: "Контакты",
    subtitle: "Оставьте заявку — подберём комплектацию и подготовим коммерческое предложение.",
    blocks: { phone: "Телефон", email: "Email", hours: "График", address: "Адрес" },
    hoursLines: ["Пн–Пт 09:00–18:00"],
    addressLines: ["г.Алматы, мкр.10А, д.13, оф.1"],
    formTitle: "Оставить заявку",
    formSub: "Опишите задачу — ответим в течение рабочего дня.",
    name: "Имя", phone: "Телефон", email: "Email", org: "Компания / клиника",
    message: "Комментарий (что нужно подобрать)",
    btn: "Отправить заявку",
    note: "Нажимая «Отправить», вы соглашаетесь на обработку персональных данных.",
    nav: ["Каталог", "Услуги", "О компании", "Контакты"],
  },
  kz: {
    kicker: "Бізбен байланысыңыз",
    title: "Байланыс",
    subtitle: "Өтінім қалдырыңыз — комплектация ұсынып, коммерциялық ұсыныс дайындаймыз.",
    blocks: { phone: "Телефон", email: "Email", hours: "Жұмыс уақыты", address: "Мекенжай" },
    hoursLines: ["Дс–Жм 09:00–18:00"],
    addressLines: ["Алматы қ., 10А шағын ауданы, 13 үй, оф.1"],
    formTitle: "Өтінім қалдыру",
    formSub: "Міндетті жазыңыз — жұмыс күні ішінде жауап береміз.",
    name: "Аты-жөні", phone: "Телефон", email: "Email", org: "Компания / клиника",
    message: "Комментарий (не таңдау керек)",
    btn: "Өтінім жіберу",
    note: "«Жіберу» батырмасын басу арқылы деректерді өңдеуге келісесіз.",
    nav: ["Каталог", "Қызметтер", "Компания туралы", "Байланыс"],
  },
  en: {
    kicker: "Get in touch",
    title: "Contacts",
    subtitle: "Leave a request — we'll suggest a configuration and prepare a quote.",
    blocks: { phone: "Phone", email: "Email", hours: "Hours", address: "Address" },
    hoursLines: ["Mon–Fri 09:00–18:00"],
    addressLines: ["Almaty, microdistrict 10A, building 13, office 1"],
    formTitle: "Leave a request",
    formSub: "Describe your task — we'll reply within one business day.",
    name: "Name", phone: "Phone", email: "Email", org: "Company / clinic",
    message: "Message (what do you need?)",
    btn: "Send request",
    note: "By clicking Send, you consent to processing of personal data.",
    nav: ["Catalog", "Services", "About", "Contacts"],
  },
} as const;

type TKey = keyof typeof translations;

// ─── page ──────────────────────────────────────────────────────────────────
export default function ContactsPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  const currentLang: Lang = isLang(lang) ? lang : DEFAULT_LANG;
  const t = translations[currentLang as TKey] ?? translations.ru;

  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => { const timer = setTimeout(() => setHeroVisible(true), 80); return () => clearTimeout(timer); }, []);

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="bg-[#F5F8FA] text-[#0D1F2D] min-h-screen" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }

        .nav-link { position: relative; text-decoration: none; }
        .nav-link::after {
          content: ''; position: absolute; left: 0; bottom: -2px;
          width: 0; height: 1.5px; background: #0A4A6E;
          transition: width 0.25s ease;
        }
        .nav-link:hover::after { width: 100%; }

        .info-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .info-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(10,74,110,0.09);
          border-color: #93c5e8 !important;
        }

        .form-input {
          width: 100%;
          background: #F5F8FA;
          border: 1px solid #d0dde8;
          border-radius: 10px;
          padding: 11px 16px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          color: #0D1F2D;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          margin-top: 6px;
        }
        .form-input:focus {
          border-color: #0A4A6E;
          box-shadow: 0 0 0 3px rgba(10,74,110,0.08);
        }
        .form-input::placeholder { color: #9aabb8; }

        .form-label {
          font-size: 12px;
          font-weight: 500;
          color: #5a7080;
          letter-spacing: 0.3px;
        }

        @keyframes pulse-icon {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        .icon-wrap:hover { animation: pulse-icon 0.4s ease; }

        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .btn-submit:hover {
          background: linear-gradient(90deg, #0A4A6E 30%, #1a6fa0 50%, #0A4A6E 70%);
          background-size: 200% auto;
          animation: shimmer 1.4s linear infinite;
        }
      `}</style>

      

      <div className="max-w-6xl mx-auto px-8 py-16">

        {/* HEADER */}
        <div className="mb-12">
          <div
            style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(18px)", transition: "opacity 0.6s ease 0ms, transform 0.6s ease 0ms" }}
          >
            <span className="inline-block bg-[#E8F4FC] text-[#1a6fa0] text-[12px] font-medium tracking-[1.5px] uppercase px-4 py-1.5 rounded-full mb-5">
              {t.kicker}
            </span>
          </div>
          <div
            style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(18px)", transition: "opacity 0.6s ease 100ms, transform 0.6s ease 100ms" }}
          >
            <h1 className="font-serif text-[44px] font-bold leading-[1.15] mb-4">{t.title}</h1>
            <p className="text-[16px] text-[#5a7080] font-light leading-[1.75] max-w-xl">{t.subtitle}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* LEFT — info blocks */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {[
              {
                icon: <Phone className="h-5 w-5 stroke-[#0A4A6E] fill-none" />,
                label: t.blocks.phone,
                content: <a className="text-[15px] font-medium text-[#0A4A6E] hover:underline no-underline" href="tel:+77019249910">+7 (701) 924 9910</a>,
                delay: 150,
              },
              {
                icon: <Mail className="h-5 w-5 stroke-[#0A4A6E] fill-none" />,
                label: t.blocks.email,
                content: <a className="text-[15px] font-medium text-[#0A4A6E] hover:underline no-underline" href="mailto:info@azetscom.com">info@azetscom.com</a>,
                delay: 220,
              },
              {
                icon: <Clock className="h-5 w-5 stroke-[#0A4A6E] fill-none" />,
                label: t.blocks.hours,
                content: <div className="flex flex-col gap-0.5">{t.hoursLines.map(x => <span key={x} className="text-[15px] font-medium">{x}</span>)}</div>,
                delay: 290,
              },
              {
                icon: <MapPin className="h-5 w-5 stroke-[#0A4A6E] fill-none" />,
                label: t.blocks.address,
                content: <div className="flex flex-col gap-0.5">{t.addressLines.map(x => <span key={x} className="text-[15px] font-medium">{x}</span>)}</div>,
                delay: 360,
              },
            ].map(({ icon, label, content, delay }) => (
              <FadeIn key={label} delay={delay}>
                <div className="info-card bg-white border border-[#d0dde8] rounded-xl p-5 flex items-start gap-4">
                  <div className="icon-wrap w-10 h-10 bg-[#E8F4FC] rounded-xl flex items-center justify-center flex-shrink-0">
                    {icon}
                  </div>
                  <div>
                    <div className="text-[11px] font-medium text-[#00A99D] tracking-[1.4px] uppercase mb-1">{label}</div>
                    {content}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* RIGHT — form */}
          <FadeIn delay={200} className="lg:col-span-7">
            <div className="bg-white border border-[#d0dde8] rounded-2xl p-8"
              style={{ boxShadow: "0 4px 32px rgba(10,74,110,0.06)" }}
            >
              <div className="mb-6">
                <div className="text-[12px] font-medium text-[#00A99D] tracking-[1.8px] uppercase mb-2">{t.formTitle}</div>
                <p className="text-[13px] text-[#5a7080] font-light">{t.formSub}</p>
              </div>

              <div className="grid gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField label={t.name} placeholder={t.name} />
                  <FormField label={t.phone} placeholder="+7 (701) 924 99 10" type="tel" />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField label={t.email} placeholder="name@email.com" type="email" />
                  <FormField label={t.org} placeholder={t.org} />
                </div>
                <div>
                  <label className="form-label">{t.message}</label>
                  <textarea
                    className="form-input"
                    placeholder={t.message}
                    rows={5}
                    style={{ resize: "none", marginTop: "6px" }}
                  />
                </div>

                <div>
                  <button
                    className="btn-submit w-full flex items-center justify-center gap-2 bg-[#0A4A6E] text-white text-[14px] font-medium px-7 py-3.5 rounded-xl"
                    style={{ transition: "transform 0.15s ease, box-shadow 0.2s ease" }}
                    onMouseEnter={e => { const b = e.currentTarget; b.style.transform = "translateY(-1px)"; b.style.boxShadow = "0 4px 16px rgba(10,74,110,0.25)"; }}
                    onMouseLeave={e => { const b = e.currentTarget; b.style.transform = ""; b.style.boxShadow = ""; }}
                  >
                    <Send className="h-4 w-4" />
                    {t.btn}
                  </button>
                  <p className="text-[11px] text-[#9aabb8] mt-3 text-center leading-[1.6]">{t.note}</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}

function FormField({ label, placeholder, type = "text" }: { label: string; placeholder?: string; type?: string }) {
  return (
    <div>
      <label className="form-label">{label}</label>
      <input type={type} placeholder={placeholder} className="form-input" />
    </div>
  );
}