import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { DEFAULT_LANG, isLang, type Lang } from "@/lib/i18n";

interface PageProps {
  params: Promise<{ lang: string }>;
}

const t = {
  ru: {
    kicker: "Новости",
    title: "Последние обновления",
    subtitle: "Новинки оборудования, обновления каталога, полезные материалы для специалистов клиник.",
    emptyTitle: "Скоро здесь появятся новости",
    emptyDesc: "Следите за обновлениями — публикуем новинки оборудования и полезные материалы.",
    ctaTitle: "Есть вопросы по оборудованию?",
    ctaDesc: "Оставьте заявку — подберём комплектацию и подготовим КП.",
    ctaBtn: "Запросить КП",
    news: [
      { date: "Март 2025", tag: "Каталог", title: "Расширение каталога хирургического оборудования", desc: "Добавили новые позиции операционных столов и хирургических светильников от ведущих производителей." },
      { date: "Февраль 2025", tag: "Сервис", title: "Запуск выездного сервисного обслуживания", desc: "Теперь принимаем заявки на выезд специалиста для диагностики и обслуживания оборудования." },
      { date: "Январь 2025", tag: "Компания", title: "Azet-S: новый сайт и обновлённый каталог", desc: "Запустили обновлённый сайт с удобным поиском по каталогу и быстрой формой запроса КП." },
    ],
  },
  kz: {
    kicker: "Жаңалықтар",
    title: "Соңғы жаңартулар",
    subtitle: "Жаңа жабдықтар, каталог жаңартулары, клиника мамандарына арналған пайдалы материалдар.",
    emptyTitle: "Жақында жаңалықтар пайда болады",
    emptyDesc: "Жаңартуларды қадағалаңыз — жаңа жабдықтар мен пайдалы материалдарды жариялаймыз.",
    ctaTitle: "Жабдық туралы сұрақтарыңыз бар ма?",
    ctaDesc: "Өтінім қалдырыңыз — комплектация таңдап, КП дайындаймыз.",
    ctaBtn: "КП сұрау",
    news: [
      { date: "Наурыз 2025", tag: "Каталог", title: "Хирургиялық жабдық каталогын кеңейту", desc: "Жетекші өндірушілердің жаңа операциялық үстелдері мен хирургиялық шамдарын қостық." },
      { date: "Ақпан 2025", tag: "Сервис", title: "Үйге шығу сервисін іске қосу", desc: "Диагностика және қызмет көрсету үшін маманның шығуына өтінім қабылдаймыз." },
      { date: "Қаңтар 2025", tag: "Компания", title: "Azet-S: жаңа сайт және жаңартылған каталог", desc: "Ыңғайлы каталог іздеуі мен жылдам КП сұрау формасы бар жаңартылған сайтты іске қостық." },
    ],
  },
  en: {
    kicker: "News",
    title: "Latest updates",
    subtitle: "New equipment, catalog updates, and useful materials for clinic specialists.",
    emptyTitle: "News coming soon",
    emptyDesc: "Stay tuned — we publish new equipment and useful materials.",
    ctaTitle: "Questions about equipment?",
    ctaDesc: "Leave a request — we'll select a configuration and prepare a quote.",
    ctaBtn: "Request a quote",
    news: [
      { date: "March 2025", tag: "Catalog", title: "Surgical equipment catalog expansion", desc: "Added new operating tables and surgical lights from leading manufacturers." },
      { date: "February 2025", tag: "Service", title: "On-site service visits launched", desc: "Now accepting requests for specialist visits for diagnostics and equipment maintenance." },
      { date: "January 2025", tag: "Company", title: "Azet-S: new website and updated catalog", desc: "Launched an updated website with convenient catalog search and a quick quote request form." },
    ],
  },
};

const tagColors: Record<string, string> = {
  "Каталог": "bg-[#E8F4FC] text-[#0A4A6E]",
  "Catalog": "bg-[#E8F4FC] text-[#0A4A6E]",
  "Сервис": "bg-[#E6F7F5] text-[#0A7A72]",
  "Service": "bg-[#E6F7F5] text-[#0A7A72]",
  "Компания": "bg-[#FFF4E0] text-[#8A6000]",
  "Company": "bg-[#FFF4E0] text-[#8A6000]",
  "Каталог (kz)": "bg-[#E8F4FC] text-[#0A4A6E]",
};

export default async function NewsPage({ params }: PageProps) {
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
          <h1 className="font-serif text-[44px] font-bold leading-[1.15] mb-4">{tr.title}</h1>
          <p className="text-[16px] text-[#5a7080] font-light leading-[1.75] max-w-2xl">{tr.subtitle}</p>
        </div>

        {/* news grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {tr.news.map((item) => (
            <div key={item.title} className="bg-white border border-[#d0dde8] rounded-xl overflow-hidden flex flex-col" style={{ transition: "transform 0.2s ease, box-shadow 0.2s ease" }}>
              {/* top color bar */}
              <div className="h-1 bg-[#0A4A6E]" />
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${tagColors[item.tag] ?? "bg-[#E8F4FC] text-[#0A4A6E]"}`}>
                    {item.tag}
                  </span>
                  <span className="flex items-center gap-1 text-[12px] text-[#9aabb8]">
                    <Calendar className="h-3 w-3" />
                    {item.date}
                  </span>
                </div>
                <h3 className="text-[15px] font-medium mb-2 leading-[1.4]">{item.title}</h3>
                <p className="text-[13px] text-[#5a7080] leading-[1.65] font-light flex-1">{item.desc}</p>
                <div className="mt-4 pt-4 border-t border-[#f0f4f8]">
                  <button className="text-[13px] text-[#0A4A6E] font-medium flex items-center gap-1 hover:gap-2 transition-all">
                    Читать далее <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
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