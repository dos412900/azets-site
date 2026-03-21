// src/app/[lang]/api/lead/route.ts
import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const name = String(body?.name || "").trim();
    const phone = String(body?.phone || "").trim();
    const email = String(body?.email || "").trim();
    const message = String(body?.message || "").trim();

    if (!name || !phone) {
      return NextResponse.json(
        { ok: false, error: "name/phone required" },
        { status: 400 }
      );
    }

    const to = process.env.LEADS_TO_EMAIL!;
    const from = process.env.LEADS_FROM_EMAIL!;

    const subject = `Заявка BAS-M: ${name} (${phone})`;

    const html = `
      <h2>Новая заявка с сайта BAS-M</h2>
      <p><b>Имя:</b> ${escapeHtml(name)}</p>
      <p><b>Телефон:</b> ${escapeHtml(phone)}</p>
      <p><b>Email:</b> ${escapeHtml(email)}</p>
      <p><b>Сообщение:</b><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
      <hr/>
      <p style="color:#666;font-size:12px">Источник: форма сайта</p>
    `;

    await resend.emails.send({
      from,
      to,
      subject,
      html,
      replyTo: email || undefined,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Lead API error:", err);
    return NextResponse.json({ ok: false, error: "Internal Server Error" }, { status: 500 });
  }
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}