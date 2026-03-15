import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  Send,
} from "lucide-react";
import { DEFAULT_LANG, isLang, type Lang } from "@/lib/i18n";

export default function ContactsPage({ params }: { params: { lang: string } }) {
  const lang: Lang = isLang(params.lang) ? params.lang : DEFAULT_LANG;

  const t = {
    ru: {
      title: "Контакты",
      subtitle:
        "Оставьте заявку — подберём комплектацию и подготовим коммерческое предложение.",
      blocks: {
        phone: "Телефон",
        email: "Email",
        hours: "График",
        address: "Адрес",
      },
      hoursLines: ["Пн–Пт 10:00–19:00", "Сб 11:00–15:00"],
      addressLines: ["Алматы, Шаляпина Саина", "Казахстан"],
      formTitle: "Заявка",
      name: "Имя",
      phone: "Телефон",
      email: "Email",
      org: "Компания / клиника",
      message: "Комментарий (что нужно подобрать)",
      btn: "Отправить заявку",
      note:
        "Нажимая «Отправить», вы соглашаетесь на обработку персональных данных.",
    },
    kz: {
      title: "Байланыс",
      subtitle:
        "Өтінім қалдырыңыз — комплектация ұсынып, коммерциялық ұсыныс дайындаймыз.",
      blocks: {
        phone: "Телефон",
        email: "Email",
        hours: "Жұмыс уақыты",
        address: "Мекенжай",
      },
      hoursLines: ["Дс–Жм 10:00–19:00", "Сн 11:00–15:00"],
      addressLines: ["Алматы, Шаляпина Саина", "Қазақстан"],
      formTitle: "Өтінім",
      name: "Аты-жөні",
      phone: "Телефон",
      email: "Email",
      org: "Компания / клиника",
      message: "Комментарий (не таңдау керек)",
      btn: "Өтінім жіберу",
      note:
        "«Жіберу» батырмасын басу арқылы деректерді өңдеуге келісесіз.",
    },
    en: {
      title: "Contacts",
      subtitle:
        "Leave a request — we’ll suggest a configuration and prepare a quote.",
      blocks: {
        phone: "Phone",
        email: "Email",
        hours: "Hours",
        address: "Address",
      },
      hoursLines: ["Mon–Fri 10:00–19:00", "Sat 11:00–15:00"],
      addressLines: ["Almaty, Shalyapina–Saina", "Kazakhstan"],
      formTitle: "Request",
      name: "Name",
      phone: "Phone",
      email: "Email",
      org: "Company / clinic",
      message: "Message (what do you need?)",
      btn: "Send request",
      note:
        "By clicking “Send”, you consent to processing of personal data.",
    },
  }[lang];

  return (
    <div className="bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">{t.title}</h1>
          <p className="max-w-2xl text-sm leading-7 text-slate-600">
            {t.subtitle}
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          {/* LEFT: CONTACT CARDS */}
          <div className="lg:col-span-5">
            <Card className="p-6">
              <div className="grid gap-4">
                <InfoRow icon={<Phone className="h-5 w-5" />} title={t.blocks.phone}>
                  <a className="font-semibold text-slate-900 hover:underline" href="tel:+77019249910">
                    +7 (701) 924 9910
                  </a>
                </InfoRow>

                <Divider />

                <InfoRow icon={<Mail className="h-5 w-5" />} title={t.blocks.email}>
                  <a className="font-semibold text-slate-900 hover:underline" href="mailto:zukhra06@mail.ru">
                    zukhra06@mail.ru
                  </a>
                </InfoRow>

                <Divider />

                <InfoRow icon={<Clock className="h-5 w-5" />} title={t.blocks.hours}>
                  <div className="text-sm text-slate-700">
                    {t.hoursLines.map((x) => (
                      <div key={x}>{x}</div>
                    ))}
                  </div>
                </InfoRow>

                <Divider />

                <InfoRow icon={<MapPin className="h-5 w-5" />} title={t.blocks.address}>
                  <div className="text-sm text-slate-700">
                    {t.addressLines.map((x) => (
                      <div key={x}>{x}</div>
                    ))}
                  </div>
                </InfoRow>
              </div>
            </Card>

            {/* optional map placeholder */}
            <Card className="mt-6 overflow-hidden">
              <div className="h-[220px] bg-gradient-to-br from-slate-100 to-slate-200" />
              <div className="p-4 text-xs text-slate-600">
                Карта (можем подключить 2GIS/Google Maps позже)
              </div>
            </Card>
          </div>

          {/* RIGHT: FORM */}
          <div className="lg:col-span-7">
            <Card className="p-6">
              <div className="text-sm font-semibold text-slate-900">{t.formTitle}</div>

              <form className="mt-4 grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label={t.name} placeholder={t.name} />
                  <Field label={t.phone} placeholder="+7 (___) ___-__-__" />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label={t.email} placeholder="name@email.com" type="email" />
                  <Field label={t.org} placeholder={t.org} />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700">{t.message}</label>
                  <textarea
                    className="mt-2 h-36 w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                    placeholder={t.message}
                  />
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-xs text-slate-500">{t.note}</div>
                  <Button variant="primary" className="w-full sm:w-auto" href={`/${lang}/contacts`}>
                    <span className="inline-flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      {t.btn}
                    </span>
                  </Button>
                </div>
              </form>
            </Card>

            {/* trust row */}
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <MiniStat title="Ответим быстро" desc="Обычно в течение дня" />
              <MiniStat title="КП прозрачно" desc="Спецификация + варианты" />
              <MiniStat title="Поддержка" desc="Внедрение и сервис" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Divider() {
  return <div className="h-px w-full bg-slate-200" />;
}

function InfoRow({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </div>
        <div className="mt-1">{children}</div>
      </div>
    </div>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-slate-700">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
      />
    </div>
  );
}

function MiniStat({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="text-sm font-semibold text-slate-900">{title}</div>
      <div className="mt-1 text-sm text-slate-600">{desc}</div>
    </div>
  );
}
