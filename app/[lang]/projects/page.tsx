import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionary";
import { experience } from "@/content/experience";
import { isValidLang } from "@/lib/i18n";
import { buildPageMetadata, generateStructuredData } from "@/lib/seo";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { JsonLd } from "@/components/json-ld";
import { VerticalTimeline } from "@/components/vertical-timeline";

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

  const timelineItems = experience.map((entry) => ({
    slug: entry.id,
    period: entry.period[lang],
    title: entry.company,
    context: entry.context[lang],
    role: entry.role[lang],
    stack: entry.stack[lang],
    responsibilities: entry.responsibilities[lang],
    caseUrl: entry.projectSlug ? `/${lang}/projects/${entry.projectSlug}` : undefined,
    liveUrl: entry.liveUrl,
  }));

  return (
    <article className="space-y-8">
      <JsonLd
        data={generateStructuredData(lang, {
          page: "projects",
          breadcrumb: [
            { name: dictionary.breadcrumbs.home, path: "" },
            { name: dictionary.breadcrumbs.projects, path: "/projects" },
          ],
        })}
      />

      <BreadcrumbNav
        lang={lang}
        items={[
          { label: dictionary.breadcrumbs.home, href: "" },
          { label: dictionary.breadcrumbs.projects, href: "/projects" },
        ]}
      />

      <section>
        <h1 className="text-3xl font-semibold sm:text-4xl">{dictionary.projects.h1}</h1>
        <p className="mt-4 max-w-3xl text-base text-muted-foreground">{dictionary.projects.intro}</p>
      </section>

      <VerticalTimeline
        items={timelineItems}
        readCaseLabel={lang === "pt" ? "Ver case completo" : "View full case study"}
        externalLabel={lang === "pt" ? "Ver projeto online" : "View live project"}
      />
    </article>
  );
}
