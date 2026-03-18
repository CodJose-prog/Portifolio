import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionary";
import { projects } from "@/content/projects";
import { isValidLang, languages } from "@/lib/i18n";
import { getProjectBySlug, getProjectCaseStudyBySlug } from "@/lib/projects";
import { buildPageMetadata, generateStructuredData } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { PortfolioTerminal } from "@/components/terminal/PortfolioTerminal";

type ProjectPageProps = {
  params: Promise<{ lang: string; slug: string }>;
};

export function generateStaticParams() {
  return languages.flatMap((lang) => projects.map((project) => ({ lang, slug: project.slug })));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isValidLang(lang)) {
    return {};
  }

  const project = getProjectBySlug(slug);
  if (!project) {
    return {};
  }

  return buildPageMetadata({
    lang,
    route: `/projects/${slug}`,
    title: project.title[lang],
    description: project.summary[lang],
    keywords: [...project.stack, "Backend Engineer", "API architecture"],
    type: "article",
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { lang, slug } = await params;
  if (!isValidLang(lang)) {
    notFound();
  }

  const project = getProjectBySlug(slug);
  const projectCaseStudy = getProjectCaseStudyBySlug(slug);
  if (!project || !projectCaseStudy) {
    notFound();
  }

  const dictionary = getDictionary(lang);
  const initialCommand =
    slug === "frigorifico-tracking"
      ? "golden-project"
      : slug === "mavik"
        ? "mavik"
        : `project ${slug}`;

  return (
    <>
      <JsonLd
        data={generateStructuredData(lang, {
          page: "project",
          breadcrumb: [
            { name: dictionary.breadcrumbs.home, path: "" },
            { name: dictionary.breadcrumbs.projects, path: "/projects" },
            { name: project.title[lang], path: `/projects/${project.slug}` },
          ],
          project: projectCaseStudy,
        })}
      />
      <PortfolioTerminal
        lang={lang}
        routePath={`/projects/${slug}`}
        initialCommands={[initialCommand]}
      />
    </>
  );
}
