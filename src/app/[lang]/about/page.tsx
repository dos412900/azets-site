import Link from "next/link";
import { ArrowRight, Shield, Users, Award, MapPin } from "lucide-react";
import { DEFAULT_LANG, isLang, type Lang } from "@/lib/i18n";

interface PageProps {
  params: Promise<{ lang: string }>;
}

const t = {
  ru: {
    kicker: "О компании",
    title: "Azet-S — медицинское оборудование для клиник Казахстана",
    subtitle: "Работаем с медицинскими учреждениями: подбираем оборудование, помогаем с внедрением, обучаем персонал и обеспечиваем сервисную поддержку.",
    stats: [
      { num: "500+", label: "Наименований в каталоге" },
      { num: "10+", label: "Лет на рынке" },
      { num: "100+", label: "Клиник-партнёров" },
      { num: "1", label: "Офис в Алматы" },
    ],
    missionTitle: "Наша миссия",
    missionText: "Обеспечивать медицинские учреждения Казахстана качественным оборудованием и профессиональной поддержкой — от подбора до сервиса. Мы работаем так, чтобы клиники могли сосредоточиться на главном — лечении пациентов.",
    valuesTitle: "Принципы работы",
    values: [
      { icon: "shield", title: "Надёжность", desc: "Работаем с проверенными производителями и поставщиками, предоставляем полную документацию." },
      { icon: "users", title: "Партнёрство", desc: "Выстраиваем долгосрочные отношения с клиниками, сопровождаем на всех этапах." },
      { icon: "award", title: "Качество", desc: "Подбираем оборудование под реальные задачи отделения, без лишних позиций." },
    ],
    addressTitle: "Где мы находимся",
    addressLines: ["Алматы, пересечение улиц Шаляпина и Саина", "Казахстан"],
    contactsTitle: "Контакты",
    phone: "+7 (701) 924 9910",
    email: "info@azetscom.com",
    hours: "Пн–Пт 10:00–19:00, Сб 11:00–15:00",
    ctaTitle: "Нужно оборудование для клиники?",
    ctaDesc: "Оставьте заявку — подберём комплектацию и подготовим КП.",
    ctaBtn: "Запросить КП",
  },
  kz: {
    kicker: "Компания туралы",
    title: "Azet-S — Қазақстан клиникаларына арналған медициналық жабдық",
    subtitle: "Медициналық мекемелермен жұмыс істейміз: жабдық таңдаймыз, енгізуге көмектесеміз, персоналды оқытамыз және сервистік қолдау көрсетеміз.",
    stats: [
      { num: "500+", label: "Каталогтағы атаулар" },
      { num: "10+", label: "Нарықтағы жылдар" },
      { num: "100+", label: "Клиника серіктестер" },
      { num: "1", label: "Алматыдағы офис" },
    ],
    missionTitle: "Біздің миссия",
    missionText: "Қазақстанның медициналық мекемелерін сапалы жабдықпен және кәсіби қолдаумен қамтамасыз ету — таңдаудан сервиске дейін. Клиникалар басты нәрсеге — пациенттерді емдеуге — шоғырлана алатындай жұмыс істейміз.",
    valuesTitle: "Жұмыс принциптері",
    values: [
      { icon: "shield", title: "Сенімділік", desc: "Тексерілген өндірушілер мен жеткізушілермен жұмыс істейміз, толық құжаттама береміз." },
      { icon: "users", title: "Серіктестік", desc: "Клиникалармен ұзақ мерзімді қарым-қатынас орнатамыз, барлық кезеңде сүйемелдейміз." },
      { icon: "award", title: "Сапа", desc: "Бөлімшенің нақты міндеттеріне жабдық таңдаймыз, артық позицияларсыз." },
    ],
    addressTitle: "Қайда орналасқанбыз",
    addressLines: ["Алматы, Шаляпина мен Саина көшелерінің қиылысы", "Қазақстан"],
    contactsTitle: "Байланыс",
    phone: "+7 (701) 924 9910",
    email: "info@azetscom.com",
    hours: "Дс–Жм 10:00–19:00, Сн 11:00–15:00",
    ctaTitle: "Клиникаға жабдық керек пе?",
    ctaDesc: "Өтінім қалдырыңыз — комплектация таңдап, КП дайындаймыз.",
    ctaBtn: "КП сұрау",
  },
  en: {
    kicker: "About us",
    title: "Azet-S — medical equipment for clinics in Kazakhstan",
    subtitle: "We work with medical institutions: selecting equipment, assisting with implementation, training staff and providing service support.",
    stats: [
      { num: "500+", label: "Catalog items" },
      { num: "10+", label: "Years on market" },
      { num: "100+", label: "Clinic partners" },
      { num: "1", label: "Office in Almaty" },
    ],
    missionTitle: "Our mission",
    missionText: "To provide Kazakhstan's medical institutions with quality equipment and professional support — from selection to service. We work so that clinics can focus on what matters most — treating patients.",
    valuesTitle: "Our principles",
    values: [
      { icon: "shield", title: "Reliability", desc: "We work with verified manufacturers and suppliers, providing full documentation." },
      { icon: "users", title: "Partnership", desc: "We build long-term relationships with clinics and support them at every stage." },
      { icon: "award", title: "Quality", desc: "We select equipment for real department needs, without unnecessary items." },
    ],
    addressTitle: "Where we are",
    addressLines: ["Almaty, Shalyapina & Saina intersection", "Kazakhstan"],
    contactsTitle: "Contacts",
    phone: "+7 (701) 924 9910",
    email: "info@azetscom.com",
    hours: "Mon–Fri 10:00–19:00, Sat 11:00–15:00",
    ctaTitle: "Need equipment for your clinic?",
    ctaDesc: "Leave a request — we'll select a configuration and prepare a quote.",
    ctaBtn: "Request a quote",
  },
};

function ValueIcon({ name }: { name: string }) {
  const cls = "h-5 w-5 stroke-[#0A4A6E] fill-none stroke-[1.8]";
  if (name === "shield") return <Shield className={cls} />;
  if (name === "users") return <Users className={cls} />;
  if (name === "award") return <Award className={cls} />;
  return <Shield className={cls} />;
}

export default async function AboutPage({ params }: PageProps) {
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
          <h1 className="font-serif text-[44px] font-bold leading-[1.15] mb-4 max-w-3xl">{tr.title}</h1>
          <p className="text-[16px] text-[#5a7080] font-light leading-[1.75] max-w-2xl">{tr.subtitle}</p>
        </div>

        {/* stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {tr.stats.map((s) => (
            <div key={s.label} className="bg-white border border-[#d0dde8] rounded-xl p-5 text-center">
              <div className="font-serif text-[36px] font-bold text-[#0A4A6E] leading-none mb-2">{s.num}</div>
              <div className="text-[12px] text-[#5a7080]">{s.label}</div>
            </div>
          ))}
        </div>

        {/* mission */}
        <div className="bg-[#0A4A6E] rounded-2xl p-10 mb-16">
          <div className="text-[12px] font-medium text-[#00A99D] tracking-[1.8px] uppercase mb-4">{tr.missionTitle}</div>
          <p className="text-[18px] text-white font-light leading-[1.8] max-w-3xl">{tr.missionText}</p>
        </div>

        {/* values */}
        <div className="mb-16">
          <div className="text-[12px] font-medium text-[#00A99D] tracking-[1.8px] uppercase mb-4">{tr.valuesTitle}</div>
          <div className="grid md:grid-cols-3 gap-5">
            {tr.values.map((v) => (
              <div key={v.title} className="bg-white border border-[#d0dde8] rounded-xl p-7">
                <div className="w-10 h-10 bg-[#E8F4FC] rounded-xl flex items-center justify-center mb-5">
                  <ValueIcon name={v.icon} />
                </div>
                <h3 className="text-[15px] font-medium mb-2">{v.title}</h3>
                <p className="text-[13px] text-[#5a7080] leading-[1.65] font-light">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* address + contacts */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="bg-white border border-[#d0dde8] rounded-xl p-7">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-[#E8F4FC] rounded-xl flex items-center justify-center">
                <MapPin className="h-4 w-4 stroke-[#0A4A6E] fill-none stroke-[1.8]" />
              </div>
              <div className="text-[12px] font-medium text-[#00A99D] tracking-[1.4px] uppercase">{tr.addressTitle}</div>
            </div>
            {tr.addressLines.map((line) => (
              <div key={line} className="text-[15px] font-medium leading-[1.7]">{line}</div>
            ))}
          </div>

          <div className="bg-white border border-[#d0dde8] rounded-xl p-7">
            <div className="text-[12px] font-medium text-[#00A99D] tracking-[1.4px] uppercase mb-5">{tr.contactsTitle}</div>
            <div className="flex flex-col gap-3">
              <a href={`tel:${tr.phone.replace(/\s/g, "")}`} className="text-[15px] font-medium text-[#0A4A6E] hover:underline no-underline">{tr.phone}</a>
              <a href={`mailto:${tr.email}`} className="text-[15px] font-medium text-[#0A4A6E] hover:underline no-underline">{tr.email}</a>
              <div className="text-[13px] text-[#5a7080] font-light">{tr.hours}</div>
            </div>
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