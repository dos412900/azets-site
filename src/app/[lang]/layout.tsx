import type { ReactNode } from "react";
import Header from "@/components/Header";
import { DEFAULT_LANG, isLang, type Lang } from "@/lib/i18n";

type Props = {
  children: ReactNode;
  params: Promise<{ lang: string }>;
};

export default async function LangLayout({ children, params }: Props) {
  const { lang: rawLang } = await params;

  const lang: Lang = isLang(rawLang) ? (rawLang as Lang) : DEFAULT_LANG;

  return (
    <>
      <Header lang={lang} />
      <main>{children}</main>
    </>
  );
}