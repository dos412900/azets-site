"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Menu, Search, X, ArrowRight } from "lucide-react";
import { categories } from "@/lib/azetsData";
import { cn } from "@/lib/cn";
import { DEFAULT_LANG, getDict, isLang, type Lang } from "@/lib/i18n";

interface HeaderProps {
  lang?: Lang;
}

export default function Header({ lang: propLang }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

  // lang comes from [lang]/layout as a prop — fallback to pathname parsing
  const lang: Lang = propLang ?? (() => {
    const p = pathname.split("/").filter(Boolean);
    return (p[0] && isLang(p[0]) ? p[0] : DEFAULT_LANG) as Lang;
  })();

  const d = getDict(lang);

  const [mobile, setMobile] = useState(false);
  const [openCat, setOpenCat] = useState(false);
  const [openLang, setOpenLang] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

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
      if (e.key === "Escape") { setOpenCat(false); setOpenLang(false); }
    };
    const onScroll = () => setScrolled(window.scrollY > 8);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500&display=swap');

        .hdr-root { font-family: 'DM Sans', sans-serif; }

        /* nav link underline */
        .hdr-nav-link {
          position: relative;
          text-decoration: none;
          font-size: 14px;
          color: #5a7080;
          transition: color 0.2s ease;
        }
        .hdr-nav-link::after {
          content: '';
          position: absolute; left: 0; bottom: -2px;
          width: 0; height: 1.5px;
          background: #0A4A6E;
          transition: width 0.25s ease;
        }
        .hdr-nav-link:hover { color: #0A4A6E; }
        .hdr-nav-link:hover::after { width: 100%; }

        /* catalog button */
        .hdr-cat-btn {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 14px; font-weight: 500;
          color: #0D1F2D;
          background: #F5F8FA;
          border: 1px solid #d0dde8;
          border-radius: 8px;
          padding: 8px 14px;
          cursor: pointer;
          transition: background 0.2s ease, border-color 0.2s ease;
          white-space: nowrap;
        }
        .hdr-cat-btn:hover { background: #E8F4FC; border-color: #93c5e8; }
        .hdr-cat-btn svg { transition: transform 0.25s ease; }
        .hdr-cat-btn.open svg { transform: rotate(180deg); }

        /* search */
        .hdr-search {
          display: flex; align-items: center; gap: 8px;
          flex: 1;
          background: #F5F8FA;
          border: 1px solid #d0dde8;
          border-radius: 8px;
          padding: 8px 12px;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .hdr-search.focused {
          border-color: #0A4A6E;
          box-shadow: 0 0 0 3px rgba(10,74,110,0.08);
        }
        .hdr-search input {
          background: transparent;
          border: none;
          outline: none;
          font-size: 13px;
          font-family: 'DM Sans', sans-serif;
          color: #0D1F2D;
          width: 100%;
        }
        .hdr-search input::placeholder { color: #9aabb8; }

        /* dropdown panel */
        .hdr-panel {
          position: absolute; left: 0; top: calc(100% + 10px);
          width: 720px;
          background: #fff;
          border: 1px solid #d0dde8;
          border-radius: 16px;
          box-shadow: 0 8px 40px rgba(10,74,110,0.12);
          overflow: hidden;
          opacity: 0;
          transform: translateY(-6px);
          pointer-events: none;
          transition: opacity 0.2s ease, transform 0.2s ease;
          z-index: 100;
        }
        .hdr-panel.open {
          opacity: 1;
          transform: translateY(0);
          pointer-events: all;
        }

        /* category card inside panel */
        .hdr-cat-item {
          border-radius: 10px;
          border: 1px solid #e8eef4;
          padding: 14px;
          background: #F5F8FA;
          transition: background 0.18s ease, border-color 0.18s ease, transform 0.18s ease;
          cursor: pointer;
        }
        .hdr-cat-item:hover {
          background: #E8F4FC;
          border-color: #93c5e8;
          transform: translateY(-1px);
        }

        /* lang switcher */
        .hdr-lang-btn {
          font-size: 12px; font-weight: 500;
          color: #5a7080;
          background: #F5F8FA;
          border: 1px solid #d0dde8;
          border-radius: 8px;
          padding: 7px 12px;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
          letter-spacing: 0.5px;
        }
        .hdr-lang-btn:hover { background: #E8F4FC; border-color: #93c5e8; color: #0A4A6E; }

        .hdr-lang-dropdown {
          position: absolute; right: 0; top: calc(100% + 8px);
          width: 100px;
          background: #fff;
          border: 1px solid #d0dde8;
          border-radius: 10px;
          box-shadow: 0 4px 20px rgba(10,74,110,0.10);
          overflow: hidden;
          z-index: 100;
        }
        .hdr-lang-option {
          display: block; width: 100%;
          text-align: left;
          padding: 9px 16px;
          font-size: 13px; font-weight: 500;
          color: #5a7080;
          background: transparent;
          border: none; cursor: pointer;
          transition: background 0.15s, color 0.15s;
          font-family: 'DM Sans', sans-serif;
        }
        .hdr-lang-option:hover { background: #F5F8FA; color: #0A4A6E; }

        /* quote btn */
        .hdr-quote-btn {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 13px; font-weight: 500;
          color: #fff;
          background: #0A4A6E;
          border: none; border-radius: 8px;
          padding: 8px 18px;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
          font-family: 'DM Sans', sans-serif;
        }
        .hdr-quote-btn:hover {
          background: #1a6fa0;
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(10,74,110,0.22);
        }

        /* mobile menu */
        .hdr-mobile {
          border-top: 1px solid #d0dde8;
          background: #fff;
          padding: 20px;
          display: flex; flex-direction: column; gap: 16px;
        }
        .hdr-mobile-link {
          font-size: 15px; font-weight: 500;
          color: #0D1F2D;
          text-decoration: none;
          padding: 10px 0;
          border-bottom: 1px solid #f0f4f8;
          display: block;
          transition: color 0.2s;
        }
        .hdr-mobile-link:hover { color: #0A4A6E; }

        /* topbar */
        .hdr-topbar {
          background: #F5F8FA;
          border-bottom: 1px solid #e8eef4;
          font-size: 12px;
          color: #7a8fa0;
        }
      `}</style>

      <header
        className="hdr-root sticky top-0 z-50 bg-white"
        style={{
          borderBottom: "1px solid #d0dde8",
          transition: "box-shadow 0.3s ease",
          boxShadow: scrolled ? "0 2px 20px rgba(10,74,110,0.09)" : "none",
        }}
      >
        {/* topbar */}
        <div className="hdr-topbar">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2">
            <span style={{ color: "#0A4A6E", fontWeight: 500 }}>azets.kz</span>
            <div className="hidden sm:flex items-center gap-5">
              <a href="mailto:info@azetscom.com" style={{ textDecoration: "none", color: "inherit", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#0A4A6E")}
                onMouseLeave={e => (e.currentTarget.style.color = "")}
              >
                info@azetscom.com
              </a>
              <a href="tel:+77019249910" style={{ textDecoration: "none", color: "inherit", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#0A4A6E")}
                onMouseLeave={e => (e.currentTarget.style.color = "")}
              >
                +7 (701) 924 9910
              </a>
            </div>
          </div>
        </div>

        {/* main row */}
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-3">

          {/* logo */}
          <Link href={`/${lang}`} style={{ textDecoration: "none", flexShrink: 0 }}>
            <Image
              src="/logoa.png"
              alt="Azet-S"
              width={120}
              height={40}
              style={{ objectFit: "contain", display: "block" }}
              priority
            />
          </Link>

          {/* desktop row */}
          <div className="ml-2 hidden flex-1 items-center gap-3 md:flex">

            {/* catalog dropdown */}
            <div className="relative" ref={panelRef}>
              <button
                className={cn("hdr-cat-btn", openCat && "open")}
                onClick={() => setOpenCat((v) => !v)}
              >
                {d.navCatalog}
                <ChevronDown style={{ width: 15, height: 15 }} />
              </button>

              <div className={cn("hdr-panel", openCat && "open")}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 240px" }}>
                  {/* categories grid */}
                  <div style={{ padding: "20px" }}>
                    <div style={{ fontSize: 11, fontWeight: 500, color: "#00A99D", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 14 }}>
                      {d.navCatalog}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      {cats.map((c) => (
                        <div key={c.slug} className="hdr-cat-item">
                          <Link
                            href={`/${lang}/catalog/${c.slug}`}
                            onClick={() => setOpenCat(false)}
                            style={{ textDecoration: "none", fontSize: 13, fontWeight: 500, color: "#0D1F2D", display: "block", marginBottom: 4 }}
                          >
                            {c.title[lang]}
                          </Link>
                          <div style={{ fontSize: 12, color: "#7a8fa0", lineHeight: 1.5 }}>
                            {c.description[lang]}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* right panel */}
                  <div style={{ borderLeft: "1px solid #e8eef4", padding: "20px", background: "#F5F8FA", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 500, color: "#00A99D", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 10 }}>
                        Быстрый запрос
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 500, color: "#0D1F2D", marginBottom: 8 }}>{d.btnQuote}</div>
                      <p style={{ fontSize: 13, color: "#7a8fa0", lineHeight: 1.65, fontWeight: 300 }}>{d.ctaD}</p>
                    </div>
                    <Link
                      href={`/${lang}/contacts`}
                      onClick={() => setOpenCat(false)}
                      style={{ textDecoration: "none" }}
                    >
                      <button className="hdr-quote-btn" style={{ width: "100%", justifyContent: "center", marginTop: 16 }}>
                        {d.btnQuote}
                        <ArrowRight style={{ width: 14, height: 14 }} />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* search */}
            <form
              action={`/${lang}/catalog`}
              className={cn("hdr-search", searchFocused && "focused")}
            >
              <Search style={{ width: 15, height: 15, color: "#9aabb8", flexShrink: 0 }} />
              <input
                name="q"
                placeholder={d.search}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </form>

            {/* nav links */}
            <nav style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <Link href={`/${lang}/service`} className="hdr-nav-link">{d.navService}</Link>
              <Link href={`/${lang}/news`} className="hdr-nav-link">{d.navNews}</Link>
              <Link href={`/${lang}/about`} className="hdr-nav-link">{d.navAbout}</Link>
              <Link href={`/${lang}/contacts`} className="hdr-nav-link">{d.navContacts}</Link>
            </nav>

            {/* lang switcher */}
            <div className="relative" ref={langRef} style={{ flexShrink: 0 }}>
              <button className="hdr-lang-btn" onClick={() => setOpenLang((v) => !v)}>
                {lang.toUpperCase()}
              </button>
              {openLang && (
                <div className="hdr-lang-dropdown">
                  {(["ru", "kz", "en"] as Lang[]).map((l) => (
                    <button key={l} className="hdr-lang-option" onClick={() => setLang(l)}>
                      {l.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CTA */}
            <Link href={`/${lang}/contacts`} style={{ textDecoration: "none", flexShrink: 0 }}>
              <button className="hdr-quote-btn">{d.btnQuote}</button>
            </Link>
          </div>

          {/* mobile toggle */}
          <button
            onClick={() => setMobile((v) => !v)}
            className="ml-auto md:hidden"
            style={{ background: "none", border: "none", cursor: "pointer", color: "#0A4A6E", padding: 4 }}
          >
            {mobile ? <X style={{ width: 22, height: 22 }} /> : <Menu style={{ width: 22, height: 22 }} />}
          </button>
        </div>

        {/* mobile menu */}
        {mobile && (
          <div className="hdr-mobile md:hidden">
            {/* mobile search */}
            <form action={`/${lang}/catalog`} className="hdr-search">
              <Search style={{ width: 15, height: 15, color: "#9aabb8" }} />
              <input name="q" placeholder={d.search} />
            </form>

            {/* mobile nav links */}
            <Link href={`/${lang}/catalog`} className="hdr-mobile-link" onClick={() => setMobile(false)}>{d.navCatalog}</Link>
            <Link href={`/${lang}/service`} className="hdr-mobile-link" onClick={() => setMobile(false)}>{d.navService}</Link>
            <Link href={`/${lang}/news`} className="hdr-mobile-link" onClick={() => setMobile(false)}>{d.navNews}</Link>
            <Link href={`/${lang}/about`} className="hdr-mobile-link" onClick={() => setMobile(false)}>{d.navAbout}</Link>
            <Link href={`/${lang}/contacts`} className="hdr-mobile-link" onClick={() => setMobile(false)}>{d.navContacts}</Link>

            {/* lang switcher mobile */}
            <div style={{ display: "flex", gap: 8, paddingTop: 4 }}>
              {(["ru", "kz", "en"] as Lang[]).map((l) => (
                <button
                  key={l}
                  className="hdr-lang-btn"
                  onClick={() => { setLang(l); setMobile(false); }}
                  style={{ fontWeight: lang === l ? 600 : 400, color: lang === l ? "#0A4A6E" : undefined }}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            {/* mobile CTA */}
            <Link href={`/${lang}/contacts`} style={{ textDecoration: "none" }} onClick={() => setMobile(false)}>
              <button className="hdr-quote-btn" style={{ width: "100%", justifyContent: "center" }}>
                {d.btnQuote}
                <ArrowRight style={{ width: 14, height: 14 }} />
              </button>
            </Link>
          </div>
        )}
      </header>
    </>
  );
}