import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionary";
import { isValidLang } from "@/lib/i18n";
import { buildPageMetadata, generateStructuredData } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { PortfolioTerminal } from "@/components/terminal/PortfolioTerminal";

type ProjectsPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: ProjectsPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang)) {
    return {};
  }

  const dictionary = getDictionary(lang);
  return buildPageMetadata({
    lang,
    route: "/projects",
    title: dictionary.projects.h1,
    description: dictionary.projects.intro,
  });
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { lang } = await params;
  if (!isValidLang(lang)) {
    notFound();
  }

  const dictionary = getDictionary(lang);

  return (
    <>
      <JsonLd
        data={generateStructuredData(lang, {
          page: "projects",
          breadcrumb: [
            { name: dictionary.breadcrumbs.home, path: "" },
            { name: dictionary.breadcrumbs.projects, path: "/projects" },
          ],
        })}
      />
      <PortfolioTerminal lang={lang} routePath="/projects" initialCommands={["projects"]} />
    </>
  );
}
