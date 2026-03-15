import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["ru", "kz", "en"] as const;
type Locale = (typeof LOCALES)[number];
const DEFAULT_LOCALE: Locale = "ru";

function isLocale(x: string): x is Locale {
  return (LOCALES as readonly string[]).includes(x);
}

function pickLocale(req: NextRequest): Locale {
  const cookie = req.cookies.get("lang")?.value;
  if (cookie && isLocale(cookie)) return cookie;

  const al = req.headers.get("accept-language") || "";
  const first = al.split(",")[0]?.toLowerCase() || "";
  if (first.startsWith("kk")) return "kz";
  if (first.startsWith("en")) return "en";
  if (first.startsWith("ru")) return "ru";
  return DEFAULT_LOCALE;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // исключения
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    /\.[a-zA-Z0-9]+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  // если уже есть /ru|/kz|/en — пропускаем и обновляем cookie
  if (first && isLocale(first)) {
    const res = NextResponse.next();
    res.cookies.set("lang", first, { path: "/", maxAge: 60 * 60 * 24 * 365 });
    return res;
  }

  // иначе редиректим на язык
  const locale = pickLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
