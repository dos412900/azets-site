import type { ReactNode } from "react";
import Header from "@/components/Header";
import { DEFAULT_LANG, isLang, type Lang } from "@/lib/i18n";

export default function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: string };
}) {
  // безопасно: не даём 404 из-за кривого lang
  const lang: Lang = isLang(params.lang) ? (params.lang as Lang) : DEFAULT_LANG;

  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
