import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionary";
import { isValidLang, languages } from "@/lib/i18n";
import { buildLocaleLayoutMetadata } from "@/lib/seo";
import { SecretaryWidget } from "@/components/assistant/SecretaryWidget";
import { SiteHeader } from "@/components/site-header";

type LangLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: Omit<LangLayoutProps, "children">): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang)) {
    return {};
  }
  return buildLocaleLayoutMetadata(lang);
}

export default async function LangLayout({ children, params }: LangLayoutProps) {
  const { lang } = await params;
  if (!isValidLang(lang)) {
    notFound();
  }

  const dictionary = getDictionary(lang);

  return (
    <div className="relative flex min-h-screen flex-col">
      <a
        href="#content"
        className="absolute left-2 top-2 -translate-y-20 rounded-md border border-border bg-background px-3 py-2 text-xs text-foreground focus:translate-y-0"
      >
        {lang === "pt" ? "Pular para o conteudo" : "Skip to content"}
      </a>
      <SiteHeader lang={lang} />
      <main
        id="content"
        lang={dictionary.locale}
        className="mx-auto flex w-full max-w-6xl flex-1 px-4 py-4 sm:px-6 lg:px-8"
      >
        {children}
      </main>
      <SecretaryWidget lang={lang} />
    </div>
  );
}
