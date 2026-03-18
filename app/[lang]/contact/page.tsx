import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionary";
import { isValidLang } from "@/lib/i18n";
import { buildPageMetadata, generateStructuredData } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { PortfolioTerminal } from "@/components/terminal/PortfolioTerminal";

type ContactPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang)) {
    return {};
  }

  const dictionary = getDictionary(lang);
  return buildPageMetadata({
    lang,
    route: "/contact",
    title: dictionary.contact.h1,
    description: dictionary.contact.intro,
  });
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { lang } = await params;
  if (!isValidLang(lang)) {
    notFound();
  }

  const dictionary = getDictionary(lang);

  return (
    <>
      <JsonLd
        data={generateStructuredData(lang, {
          page: "contact",
          breadcrumb: [
            { name: dictionary.breadcrumbs.home, path: "" },
            { name: dictionary.breadcrumbs.contact, path: "/contact" },
          ],
        })}
      />
      <PortfolioTerminal lang={lang} routePath="/contact" initialCommands={["contact"]} />
    </>
  );
}
