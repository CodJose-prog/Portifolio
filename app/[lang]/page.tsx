import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionary";
import { profile } from "@/content/profile";
import { isValidLang } from "@/lib/i18n";
import { buildPageMetadata, generateStructuredData } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { PortfolioTerminal } from "@/components/terminal/PortfolioTerminal";

type HomePageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang)) {
    return {};
  }

  return buildPageMetadata({
    lang,
    route: "",
    title: profile.hero.headline[lang],
    description: profile.hero.subheadline[lang],
  });
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;
  if (!isValidLang(lang)) {
    notFound();
  }

  const dictionary = getDictionary(lang);

  return (
    <>
      <JsonLd
        data={generateStructuredData(lang, {
          page: "home",
          breadcrumb: [{ name: dictionary.breadcrumbs.home, path: "" }],
        })}
      />
      <PortfolioTerminal lang={lang} />
    </>
  );
}
