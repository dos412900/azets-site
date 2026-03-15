import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const name = String(body.name ?? "");
  const phone = String(body.phone ?? "");
  const email = String(body.email ?? "");
  const company = String(body.company ?? "");
  const message = String(body.message ?? "");
  const lang = String(body.lang ?? "ru");

  // Если нет ключа Resend — просто не падаем
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log("[LEAD]", { name, phone, email, company, message, lang });
    return NextResponse.json({ ok: true, mocked: true });
  }

  const resend = new Resend(key);
  const to = process.env.LEADS_TO_EMAIL || "zukhra06@mail.ru";

  await resend.emails.send({
    from: "BAS-M <onboarding@resend.dev>",
    to,
    subject: "Новая заявка с сайта BAS-M",
    html: `
      <h2>Новая заявка</h2>
      <p><b>Имя:</b> ${escapeHtml(name)}</p>
      <p><b>Телефон:</b> ${escapeHtml(phone)}</p>
      <p><b>Email:</b> ${escapeHtml(email)}</p>
      <p><b>Компания:</b> ${escapeHtml(company)}</p>
      <p><b>Язык:</b> ${escapeHtml(lang)}</p>
      <hr />
      <p><b>Сообщение:</b><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
    `,
  });

  return NextResponse.json({ ok: true });
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
