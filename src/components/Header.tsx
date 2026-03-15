"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { categories } from "@/lib/basmData";
import { cn } from "@/lib/cn";
import { DEFAULT_LANG, getDict, isLang, type Lang } from "@/lib/i18n";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const parts = pathname.split("/").filter(Boolean);
  const lang: Lang = parts[0] && isLang(parts[0]) ? parts[0] : DEFAULT_LANG;
  const d = getDict(lang);

  const [mobile, setMobile] = useState(false);
  const [openCat, setOpenCat] = useState(false);
  const [openLang, setOpenLang] = useState(false);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const langRef = useRef<HTMLDivElement | null>(null);

  const cats = useMemo(() => categories, []);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (panelRef.current && !panelRef.current.contains(t)) setOpenCat(false);
      if (langRef.current && !langRef.current.contains(t)) setOpenLang(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenCat(false);
        setOpenLang(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  function buildPath(nextLang: Lang) {
    const p = pathname.split("/").filter(Boolean);
    const rest = p.length && isLang(p[0]) ? p.slice(1) : p;
    const tail = rest.length ? `/${rest.join("/")}` : "";
    return `/${nextLang}${tail}`;
  }

  function setLang(nextLang: Lang) {
    document.cookie = `lang=${nextLang}; path=/; max-age=31536000`;
    router.push(buildPath(nextLang));
    setOpenLang(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/85 backdrop-blur">
      {/* top info */}
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 text-xs text-slate-600">
          <div>bas-m.kz</div>
          <div className="hidden items-center gap-4 sm:flex">
            <span>zukhra06@mail.ru</span>
            <span>+7 (___) ___-__-__</span>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <Link href={`/${lang}`} className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-slate-100 border border-slate-200" />
          <div className="leading-tight">
            <div className="text-sm font-semibold text-slate-900">BAS-M</div>
            <div className="text-[11px] text-slate-500">medical solutions</div>
          </div>
        </Link>

        <div className="ml-2 hidden flex-1 items-center gap-3 md:flex">
          {/* Catalog dropdown */}
          <div className="relative" ref={panelRef}>
            <button
              onClick={() => setOpenCat((v) => !v)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-800 hover:bg-slate-100"
            >
              {d.navCatalog} <ChevronDown className="h-4 w-4 opacity-80" />
            </button>

            <div
              className={cn(
                "absolute left-0 mt-3 w-[760px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl",
                openCat ? "block" : "hidden"
              )}
            >
              <div className="grid grid-cols-3">
                <div className="col-span-2 p-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {cats.map((c) => (
                      <div
                        key={c.slug}
                        className="rounded-2xl border border-slate-200 bg-slate-50 p-4 hover:bg-slate-100"
                      >
                        <Link
                          href={`/${lang}/catalog/${c.slug}`}
                          onClick={() => setOpenCat(false)}
                          className="text-sm font-semibold text-slate-900 hover:underline"
                        >
                          {c.title}
                        </Link>

                        {c.children?.length ? (
                          <div className="mt-2 grid gap-1">
                            {c.children.map((ch) => (
                              <Link
                                key={ch.slug}
                                href={`/${lang}/catalog/${ch.slug}`}
                                onClick={() => setOpenCat(false)}
                                className="text-sm text-slate-600 hover:text-slate-900"
                              >
                                {ch.title}
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <div className="mt-2 text-xs text-slate-500">
                            Открыть категорию
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-l border-slate-200 p-5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Быстрый запрос
                  </div>
                  <div className="mt-2 text-slate-900 text-sm font-semibold">
                    {d.btnQuote}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {d.ctaD}
                  </p>
                  <Link
                    href={`/${lang}/contacts`}
                    onClick={() => setOpenCat(false)}
                    className="mt-4 inline-flex rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 px-4 py-2 text-sm text-white hover:opacity-95"
                  >
                    {d.btnQuote}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Search */}
          <form
            action={`/${lang}/catalog`}
            className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 hover:bg-slate-100"
          >
            <Search className="h-4 w-4 text-slate-500" />
            <input
              name="q"
              className="w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-500 outline-none"
              placeholder={d.search}
            />
          </form>

          {/* Nav */}
          <nav className="flex items-center gap-5 text-sm text-slate-700">
            <Link href={`/${lang}/service`} className="hover:text-slate-900">
              {d.navService}
            </Link>
            <Link href={`/${lang}/news`} className="hover:text-slate-900">
              {d.navNews}
            </Link>
            <Link href={`/${lang}/about`} className="hover:text-slate-900">
              {d.navAbout}
            </Link>
            <Link href={`/${lang}/contacts`} className="hover:text-slate-900">
              {d.navContacts}
            </Link>
          </nav>

          {/* Lang switch */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setOpenLang((v) => !v)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700 hover:bg-slate-100"
            >
              {lang.toUpperCase()} / KZ / EN
            </button>

            {openLang ? (
              <div className="absolute right-0 mt-2 w-36 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                {(["ru", "kz", "en"] as Lang[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={cn(
                      "w-full px-4 py-3 text-left text-sm hover:bg-slate-50",
                      l === lang ? "text-slate-900" : "text-slate-700"
                    )}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {/* Mobile */}
        <button
          onClick={() => setMobile((v) => !v)}
          className="ml-auto inline-flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-2 md:hidden"
          aria-label="menu"
        >
          {mobile ? <X className="h-5 w-5 text-slate-900" /> : <Menu className="h-5 w-5 text-slate-900" />}
        </button>
      </div>

      {mobile ? (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="mx-auto grid max-w-6xl gap-2 px-4 py-3 text-sm">
            <Link href={`/${lang}/catalog`} onClick={() => setMobile(false)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 hover:bg-slate-100">
              {d.navCatalog}
            </Link>
            <Link href={`/${lang}/service`} onClick={() => setMobile(false)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 hover:bg-slate-100">
              {d.navService}
            </Link>
            <Link href={`/${lang}/news`} onClick={() => setMobile(false)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 hover:bg-slate-100">
              {d.navNews}
            </Link>
            <Link href={`/${lang}/about`} onClick={() => setMobile(false)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 hover:bg-slate-100">
              {d.navAbout}
            </Link>
            <Link href={`/${lang}/contacts`} onClick={() => setMobile(false)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 hover:bg-slate-100">
              {d.navContacts}
            </Link>

            <div className="mt-2 grid grid-cols-3 gap-2">
              {(["ru", "kz", "en"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={cn(
                    "rounded-xl border border-slate-200 px-3 py-3 text-xs hover:bg-slate-100",
                    l === lang ? "bg-slate-100 text-slate-900" : "bg-slate-50 text-slate-700"
                  )}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
