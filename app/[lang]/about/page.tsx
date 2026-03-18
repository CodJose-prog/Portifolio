import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionary";
import { isValidLang } from "@/lib/i18n";
import { buildPageMetadata, generateStructuredData } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { PortfolioTerminal } from "@/components/terminal/PortfolioTerminal";

type AboutPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang)) {
    return {};
  }

  const dictionary = getDictionary(lang);
  return buildPageMetadata({
    lang,
    route: "/about",
    title: dictionary.about.h1,
    description: dictionary.about.intro,
  });
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { lang } = await params;
  if (!isValidLang(lang)) {
    notFound();
  }

  const dictionary = getDictionary(lang);

  return (
    <>
      <JsonLd
        data={generateStructuredData(lang, {
          page: "about",
          breadcrumb: [
            { name: dictionary.breadcrumbs.home, path: "" },
            { name: dictionary.breadcrumbs.about, path: "/about" },
          ],
        })}
      />
      <PortfolioTerminal lang={lang} routePath="/about" initialCommands={["whoami"]} />
    </>
  );
}
