import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionary";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { isValidLang } from "@/lib/i18n";
import { buildPageMetadata, generateStructuredData } from "@/lib/seo";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { JsonLd } from "@/components/json-ld";
import { MotionFade } from "@/components/motion-fade";
import { VerticalTimeline } from "@/components/vertical-timeline";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    summary: entry.summary[lang],
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

      <MotionFade>
        <section className="section-shell surface rounded-[2rem] border border-border/70 p-6 lg:p-8">
          <div className="relative grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <p className="soft-label">{dictionary.projects.h1}</p>
              <h1 className="text-4xl font-semibold">{dictionary.projects.intro}</h1>
              <p className="max-w-3xl text-base leading-8 text-muted-foreground">
                {lang === "pt"
                  ? "Aqui estão os contextos em que atuei com mais profundidade em backend, APIs, integrações, dados e operação em produção."
                  : "These are the contexts where I worked most deeply on backend, APIs, integrations, data, and production operations."}
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-1">
              {profile.metrics.slice(0, 4).map((metric) => (
                <Card key={metric.label[lang]} className="rounded-[1.5rem] border-border/70 bg-background/55">
                  <CardHeader className="space-y-1">
                    <p className="text-2xl font-semibold">{metric.value}</p>
                    <CardTitle className="text-base">{metric.label[lang]}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm leading-7 text-muted-foreground">
                    {metric.detail[lang]}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </MotionFade>

      <MotionFade delay={0.05}>
        <VerticalTimeline
          items={timelineItems}
          readCaseLabel={dictionary.projects.readCase}
          externalLabel={dictionary.projects.liveProject}
        />
      </MotionFade>
    </article>
  );
}
