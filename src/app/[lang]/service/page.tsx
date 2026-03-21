import Link from "next/link";
import { ArrowRight, Wrench, Clock, Phone, CheckCircle } from "lucide-react";
import { DEFAULT_LANG, isLang, type Lang } from "@/lib/i18n";

interface PageProps {
  params: Promise<{ lang: string }>;
}

const t = {
  ru: {
    kicker: "Сервис и поддержка",
    title: "Сопровождение на каждом этапе",
    subtitle: "Помогаем не только с поставкой — обеспечиваем запуск, обучение персонала и техническую поддержку в процессе эксплуатации.",
    cards: [
      { icon: "wrench", title: "Техническое обслуживание", desc: "Плановое и внеплановое обслуживание оборудования, диагностика и устранение неисправностей." },
      { icon: "clock", title: "Оперативный выезд", desc: "Выезд специалиста в удобное время. Решаем задачи на месте без лишних ожиданий." },
      { icon: "phone", title: "Горячая линия", desc: "Консультации по оборудованию и расходным материалам в рабочее время по телефону и email." },
    ],
    steps: [
      { num: "01", title: "Ввод в эксплуатацию", desc: "Монтаж, настройка и проверка оборудования на месте." },
      { num: "02", title: "Обучение персонала", desc: "Инструктаж по работе с оборудованием, ответы на вопросы." },
      { num: "03", title: "Техподдержка", desc: "Консультации и помощь в процессе эксплуатации." },
      { num: "04", title: "Обслуживание", desc: "Плановые работы для поддержания исправности оборудования." },
    ],
    includes: [
      "Диагностика и устранение неисправностей",
      "Поставка запчастей и расходных материалов",
      "Обучение и переобучение персонала",
      "Консультации по эксплуатации",
      "Плановое техническое обслуживание",
      "Документация и акты выполненных работ",
    ],
    ctaTitle: "Нужен сервис или выезд специалиста?",
    ctaDesc: "Оставьте заявку — свяжемся и обсудим задачу.",
    ctaBtn: "Оставить заявку",
    stepsTitle: "Как строится сопровождение",
    includesTitle: "Что входит в сервис",
  },
  kz: {
    kicker: "Сервис және қолдау",
    title: "Әр кезеңде сүйемелдеу",
    subtitle: "Тек жеткізумен шектелмейміз — іске қосуды, персоналды оқытуды және пайдалану кезінде техникалық қолдауды қамтамасыз етеміз.",
    cards: [
      { icon: "wrench", title: "Техникалық қызмет көрсету", desc: "Жоспарлы және жоспардан тыс қызмет көрсету, диагностика және ақауларды жою." },
      { icon: "clock", title: "Жедел шығу", desc: "Ыңғайлы уақытта маман шығады. Мәселелерді орнында шешеміз." },
      { icon: "phone", title: "Байланыс желісі", desc: "Жұмыс уақытында телефон және email арқылы кеңестер." },
    ],
    steps: [
      { num: "01", title: "Іске қосу", desc: "Орнату, баптау және жабдықты орнында тексеру." },
      { num: "02", title: "Персоналды оқыту", desc: "Жабдықпен жұмыс бойынша нұсқаулық." },
      { num: "03", title: "Техникалық қолдау", desc: "Пайдалану кезінде кеңестер мен көмек." },
      { num: "04", title: "Қызмет көрсету", desc: "Жабдықтың жұмысқа қабілеттілігін сақтауға арналған жоспарлы жұмыстар." },
    ],
    includes: [
      "Диагностика және ақауларды жою",
      "Қосалқы бөлшектер мен шығын материалдарын жеткізу",
      "Персоналды оқыту және қайта оқыту",
      "Пайдалану бойынша кеңестер",
      "Жоспарлы техникалық қызмет көрсету",
      "Құжаттама және орындалған жұмыстар актілері",
    ],
    ctaTitle: "Сервис немесе маман шығуы керек пе?",
    ctaDesc: "Өтінім қалдырыңыз — хабарласып, міндетті талқылаймыз.",
    ctaBtn: "Өтінім қалдыру",
    stepsTitle: "Сүйемелдеу қалай құрылады",
    includesTitle: "Сервиске не кіреді",
  },
  en: {
    kicker: "Service & Support",
    title: "Support at every stage",
    subtitle: "We don't just deliver — we ensure installation, staff training, and technical support throughout the equipment lifecycle.",
    cards: [
      { icon: "wrench", title: "Technical maintenance", desc: "Scheduled and emergency servicing, diagnostics and troubleshooting." },
      { icon: "clock", title: "On-site visits", desc: "A specialist visits at a convenient time. Issues resolved on-site." },
      { icon: "phone", title: "Support line", desc: "Equipment and consumables consultations during business hours by phone and email." },
    ],
    steps: [
      { num: "01", title: "Commissioning", desc: "Installation, configuration and on-site equipment testing." },
      { num: "02", title: "Staff training", desc: "Equipment operation briefing and Q&A." },
      { num: "03", title: "Technical support", desc: "Consultations and assistance during operation." },
      { num: "04", title: "Maintenance", desc: "Scheduled works to keep equipment in working order." },
    ],
    includes: [
      "Diagnostics and troubleshooting",
      "Spare parts and consumables supply",
      "Staff training and retraining",
      "Operation consultations",
      "Scheduled technical maintenance",
      "Documentation and work completion reports",
    ],
    ctaTitle: "Need service or an on-site visit?",
    ctaDesc: "Leave a request — we'll reach out and discuss your needs.",
    ctaBtn: "Leave a request",
    stepsTitle: "How support is structured",
    includesTitle: "What's included in service",
  },
};

function ServiceIcon({ name }: { name: string }) {
  const cls = "h-5 w-5 stroke-[#0A4A6E] fill-none stroke-[1.8]";
  if (name === "wrench") return <Wrench className={cls} />;
  if (name === "clock") return <Clock className={cls} />;
  if (name === "phone") return <Phone className={cls} />;
  return <Wrench className={cls} />;
}

export default async function ServicePage({ params }: PageProps) {
  const { lang: rawLang } = await params;
  const lang: Lang = isLang(rawLang) ? rawLang : DEFAULT_LANG;
  const tr = t[lang];

  return (
    <div className="bg-[#F5F8FA] text-[#0D1F2D]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500&display=swap'); .font-serif{font-family:'Playfair Display',serif}`}</style>

      <div className="max-w-6xl mx-auto px-8 py-16">

        {/* header */}
        <div className="mb-14">
          <span className="inline-block bg-[#E8F4FC] text-[#1a6fa0] text-[12px] font-medium tracking-[1.5px] uppercase px-4 py-1.5 rounded-full mb-5">
            {tr.kicker}
          </span>
          <h1 className="font-serif text-[44px] font-bold leading-[1.15] mb-4 max-w-2xl">{tr.title}</h1>
          <p className="text-[16px] text-[#5a7080] font-light leading-[1.75] max-w-2xl">{tr.subtitle}</p>
        </div>

        {/* cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {tr.cards.map((c) => (
            <div key={c.title} className="bg-white border border-[#d0dde8] rounded-xl p-7">
              <div className="w-10 h-10 bg-[#E8F4FC] rounded-xl flex items-center justify-center mb-5">
                <ServiceIcon name={c.icon} />
              </div>
              <h3 className="text-[15px] font-medium mb-2">{c.title}</h3>
              <p className="text-[13px] text-[#5a7080] leading-[1.65] font-light">{c.desc}</p>
            </div>
          ))}
        </div>

        {/* steps */}
        <div className="bg-white border border-[#d0dde8] rounded-2xl p-10 mb-16">
          <div className="text-[12px] font-medium text-[#00A99D] tracking-[1.8px] uppercase mb-3">{tr.stepsTitle}</div>
          <div className="grid md:grid-cols-4 gap-0 relative mt-8">
            <div className="absolute top-[20px] left-[12.5%] right-[12.5%] h-px bg-[#d0dde8] z-0 hidden md:block" />
            {tr.steps.map((s) => (
              <div key={s.num} className="text-center relative z-10 px-4">
                <div className="w-10 h-10 rounded-full bg-[#0A4A6E] text-white font-serif text-[15px] font-bold flex items-center justify-center mx-auto mb-4">
                  {s.num}
                </div>
                <div className="text-[14px] font-medium mb-1.5">{s.title}</div>
                <div className="text-[12px] text-[#5a7080] leading-[1.6]">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* includes */}
        <div className="mb-16">
          <div className="text-[12px] font-medium text-[#00A99D] tracking-[1.8px] uppercase mb-4">{tr.includesTitle}</div>
          <div className="grid md:grid-cols-2 gap-3">
            {tr.includes.map((item) => (
              <div key={item} className="flex items-center gap-3 bg-white border border-[#d0dde8] rounded-xl px-5 py-4">
                <CheckCircle className="h-4 w-4 text-[#00A99D] flex-shrink-0" />
                <span className="text-[14px]">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#0A4A6E] rounded-2xl p-12 grid md:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <h2 className="font-serif text-[28px] font-bold text-white leading-[1.3] mb-2">{tr.ctaTitle}</h2>
            <p className="text-[14px] text-white/75 font-light leading-[1.7]">{tr.ctaDesc}</p>
          </div>
          <Link href={`/${lang}/contacts`}>
            <button className="bg-white text-[#0A4A6E] text-[14px] font-medium px-8 py-3.5 rounded-xl whitespace-nowrap flex items-center gap-2">
              {tr.ctaBtn} <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}