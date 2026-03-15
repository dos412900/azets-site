import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { ArrowRight, CheckCircle2, Shield, Wrench, GraduationCap } from "lucide-react";
import { categories } from "@/lib/basmData";
import { DEFAULT_LANG, getDict, isLang, type Lang } from "@/lib/i18n";

export default function HomePage({ params }: { params: { lang: string } }) {
  const lang: Lang = isLang(params.lang) ? params.lang : DEFAULT_LANG;
  const d = getDict(lang);

  const t = {
    ru: {
      kicker: "Медицинское оборудование • комплексные решения • сервис",
      title1: "BAS-M",
      title2: "медицинское оборудование и решения для клиник",
      desc:
        "Подбираем комплектации под задачи отделения, помогаем внедрять, обучаем персонал и поддерживаем в эксплуатации.",
      primary: "Перейти в каталог",
      secondary: "Запросить КП",
      blocksTitle: "Почему BAS-M",
      blocksDesc: "Закрываем весь цикл: подбор → поставка → внедрение → обучение → сервис.",
      cards: [
        {
          icon: "shield",
          title: "Подбор комплектации",
          desc: "Под бюджет и клинический сценарий.",
        },
        {
          icon: "grad",
          title: "Внедрение и обучение",
          desc: "Инструктаж и ввод в практику.",
        },
        {
          icon: "wrench",
          title: "Сервис и поддержка",
          desc: "Сопровождение на всех этапах.",
        },
      ],
      catTitle: "Категории",
      catMore: "Смотреть все",
      stepsTitle: "Как мы работаем",
      steps: [
        { title: "Заявка", desc: "Понимаем задачу, сроки, бюджет." },
        { title: "Подбор", desc: "Формируем комплектацию и альтернативы." },
        { title: "КП", desc: "Отправляем предложение и спецификацию." },
        { title: "Внедрение", desc: "Поставка, запуск, обучение, поддержка." },
      ],
      trustTitle: "Гарантии и качество",
      trust: [
        "Понятные спецификации и прозрачное КП",
        "Поддержка по оборудованию и расходникам",
        "Обучение персонала и сопровождение внедрения",
      ],
      ctaTitle: "Нужна комплектация под отделение?",
      ctaDesc:
        "Опишите задачу — подготовим КП, предложим варианты под ваш бюджет и сроки.",
      ctaBtn: "Оставить заявку",
    },
    kz: {
      kicker: "Медициналық жабдық • кешенді шешім • сервис",
      title1: "BAS-M",
      title2: "клиникаларға арналған медициналық жабдық және шешімдер",
      desc:
        "Бөлімше міндетіне сай комплектация таңдаймыз, енгізуге көмектесеміз, персоналды оқытамыз және қызмет көрсетеміз.",
      primary: "Каталогқа өту",
      secondary: "КП сұрау",
      blocksTitle: "Неліктен BAS-M",
      blocksDesc: "Толық цикл: таңдау → жеткізу → енгізу → оқыту → сервис.",
      cards: [
        { icon: "shield", title: "Комплектация таңдау", desc: "Бюджет пен сценарийге сай." },
        { icon: "grad", title: "Енгізу және оқыту", desc: "Нұсқаулық және практикаға енгізу." },
        { icon: "wrench", title: "Сервис және қолдау", desc: "Барлық кезеңде сүйемелдеу." },
      ],
      catTitle: "Санаттар",
      catMore: "Барлығын көру",
      stepsTitle: "Қалай жұмыс істейміз",
      steps: [
        { title: "Өтінім", desc: "Мақсат, мерзім, бюджетті нақтылаймыз." },
        { title: "Таңдау", desc: "Комплектация және баламалар." },
        { title: "КП", desc: "Ұсыныс пен спецификация." },
        { title: "Енгізу", desc: "Жеткізу, іске қосу, оқыту, қолдау." },
      ],
      trustTitle: "Кепілдік және сапа",
      trust: [
        "Түсінікті спецификация және ашық КП",
        "Жабдық пен шығын материалдары бойынша қолдау",
        "Персоналды оқыту және енгізуді сүйемелдеу",
      ],
      ctaTitle: "Бөлімше үшін комплектация керек пе?",
      ctaDesc:
        "Міндетті жазыңыз — бюджет пен мерзімге сай КП дайындаймыз.",
      ctaBtn: "Өтінім қалдыру",
    },
    en: {
      kicker: "Medical equipment • turnkey solutions • service",
      title1: "BAS-M",
      title2: "medical equipment & solutions for clinics",
      desc:
        "We select configurations for your department, help with implementation, train staff, and provide service support.",
      primary: "Open catalog",
      secondary: "Request a quote",
      blocksTitle: "Why BAS-M",
      blocksDesc: "Full cycle: selection → delivery → implementation → training → service.",
      cards: [
        { icon: "shield", title: "Configuration подбор", desc: "For budget and clinical scenario." },
        { icon: "grad", title: "Implementation & training", desc: "Onboarding and practical launch." },
        { icon: "wrench", title: "Service & support", desc: "Support at every stage." },
      ],
      catTitle: "Categories",
      catMore: "View all",
      stepsTitle: "How it works",
      steps: [
        { title: "Request", desc: "We clarify needs, timing, budget." },
        { title: "Selection", desc: "We propose configuration options." },
        { title: "Quote", desc: "We send a proposal & specification." },
        { title: "Launch", desc: "Delivery, setup, training, support." },
      ],
      trustTitle: "Quality & guarantees",
      trust: [
        "Clear specs and transparent quote",
        "Support for equipment and consumables",
        "Staff training and implementation support",
      ],
      ctaTitle: "Need a department configuration?",
      ctaDesc:
        "Describe your request — we’ll prepare a quote and options for your budget and timeline.",
      ctaBtn: "Leave a request",
    },
  }[lang];

  const topCats = (categories ?? []).slice(0, 6);

  return (
    <div className="bg-slate-50 text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute -top-40 left-[-120px] h-[520px] w-[520px] rounded-full blur-3xl opacity-40"
            style={{ background: "radial-gradient(circle at 30% 30%, #60a5fa, transparent 60%)" }}
          />
          <div
            className="absolute -top-56 right-[-160px] h-[640px] w-[640px] rounded-full blur-3xl opacity-35"
            style={{ background: "radial-gradient(circle at 30% 30%, #34d399, transparent 60%)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 to-slate-50" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pt-10 pb-10">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                {t.kicker}
              </div>

              <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl">
                {t.title1}: <span className="text-slate-800">{t.title2}</span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                {t.desc}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button href={`/${lang}/catalog`} variant="primary">
                  {t.primary} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button href={`/${lang}/contacts`} variant="outline">
                  {t.secondary}
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <Card className="p-6">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {t.blocksTitle}
                </div>
                <div className="mt-2 text-sm text-slate-600">{t.blocksDesc}</div>

                <div className="mt-5 grid gap-3">
                  {t.cards.map((c) => (
                    <div
                      key={c.title}
                      className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <Icon name={c.icon} />
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{c.title}</div>
                        <div className="mt-1 text-sm text-slate-600">{c.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-6xl px-4 pb-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">{t.catTitle}</h2>
            <p className="mt-1 text-sm text-slate-600">{d?.search ? "" : ""}</p>
          </div>
          <Link
            href={`/${lang}/catalog`}
            className="text-sm font-semibold text-slate-700 hover:text-slate-900"
          >
            {t.catMore} →
          </Link>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topCats.map((c: any) => (
            <Link key={c.slug} href={`/${lang}/catalog/${c.slug}`}>
              <Card className="group p-6 hover:shadow-md transition">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-slate-900">{c.title}</div>
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-slate-700 transition" />
                </div>
                <div className="mt-2 text-sm text-slate-600">
                  {c.children?.length ? `${c.children.length} подраздел(ов)` : "Открыть категорию"}
                </div>

                <div className="mt-4 h-[1px] bg-slate-200" />

                <div className="mt-3 flex flex-wrap gap-2">
                  {(c.children ?? []).slice(0, 3).map((ch: any) => (
                    <span
                      key={ch.slug}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600"
                    >
                      {ch.title}
                    </span>
                  ))}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* STEPS */}
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-2xl font-semibold text-slate-900">{t.stepsTitle}</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Сбор требований, подбор оборудования, КП и спецификация, внедрение и обучение — без “хаоса”.
            </p>

            <Card className="mt-5 p-6">
              <div className="text-sm font-semibold text-slate-900">{t.trustTitle}</div>
              <div className="mt-4 grid gap-3">
                {t.trust.map((x) => (
                  <div key={x} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" />
                    <div>{x}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              {t.steps.map((s, idx) => (
                <Card key={s.title} className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-800">
                      {idx + 1}
                    </div>
                    <div className="text-sm font-semibold text-slate-900">{s.title}</div>
                  </div>
                  <div className="mt-3 text-sm text-slate-600 leading-7">{s.desc}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-14">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8">
          <div
            className="absolute -top-24 right-[-80px] h-[360px] w-[360px] rounded-full blur-3xl opacity-40"
            style={{ background: "radial-gradient(circle at 30% 30%, #34d399, transparent 60%)" }}
          />
          <div
            className="absolute -bottom-28 left-[-80px] h-[420px] w-[420px] rounded-full blur-3xl opacity-35"
            style={{ background: "radial-gradient(circle at 30% 30%, #60a5fa, transparent 60%)" }}
          />

          <div className="relative grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <div className="text-2xl font-semibold text-slate-900">{t.ctaTitle}</div>
              <div className="mt-2 text-sm text-slate-600 leading-7">{t.ctaDesc}</div>
            </div>
            <div className="lg:col-span-4 lg:flex lg:justify-end">
              <Button href={`/${lang}/contacts`} variant="primary" className="w-full lg:w-auto">
                {t.ctaBtn} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-600">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>© {new Date().getFullYear()} BAS-M</div>
            <div className="flex gap-4">
              <Link className="hover:text-slate-900" href={`/${lang}/contacts`}>Контакты</Link>
              <Link className="hover:text-slate-900" href={`/${lang}/catalog`}>Каталог</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Icon({ name }: { name: "shield" | "grad" | "wrench" | string }) {
  const base = "h-5 w-5 text-slate-700";
  if (name === "shield") return <Shield className={base} />;
  if (name === "grad") return <GraduationCap className={base} />;
  if (name === "wrench") return <Wrench className={base} />;
  return <Shield className={base} />;
}
