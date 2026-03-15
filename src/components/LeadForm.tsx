"use client";

import { useState } from "react";

export default function LeadForm() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      phone: String(fd.get("phone") || ""),
      email: String(fd.get("email") || ""),
      message: String(fd.get("message") || ""),
    };

    try {
      const r = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!r.ok) throw new Error("bad");
      setMsg("Заявка отправлена. Мы свяжемся с вами.");
      e.currentTarget.reset();
    } catch {
      setMsg("Ошибка отправки. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" placeholder="Имя *" className="h-11 rounded-xl border px-3" />
        <input name="phone" placeholder="Телефон *" className="h-11 rounded-xl border px-3" />
        <input name="email" placeholder="Email" className="h-11 rounded-xl border px-3 sm:col-span-2" />
        <textarea name="message" placeholder="Сообщение" rows={5} className="rounded-xl border px-3 py-2 sm:col-span-2" />
      </div>

      <button disabled={loading} className="mt-5 h-11 rounded-xl bg-slate-900 px-5 text-sm font-medium text-white disabled:opacity-60">
        {loading ? "Отправка..." : "Отправить"}
      </button>

      {msg ? <div className="mt-3 text-sm text-slate-700">{msg}</div> : null}
    </form>
  );
}
