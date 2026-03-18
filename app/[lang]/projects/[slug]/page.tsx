import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionary";
import { projects } from "@/content/projects";
import { isValidLang, languages } from "@/lib/i18n";
import { getProjectBySlug, getProjectCaseStudyBySlug } from "@/lib/projects";
import { buildPageMetadata, generateStructuredData } from "@/lib/seo";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { JsonLd } from "@/components/json-ld";
import { MotionFade } from "@/components/motion-fade";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

  return (
    <article className="space-y-8">
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

      <BreadcrumbNav
        lang={lang}
        items={[
          { label: dictionary.breadcrumbs.home, href: "" },
          { label: dictionary.breadcrumbs.projects, href: "/projects" },
          { label: project.title[lang], href: `/projects/${project.slug}` },
        ]}
      />

      <MotionFade>
        <section className="section-shell surface rounded-[2rem] border border-border/70 p-6 lg:p-8">
          <div className="relative space-y-5">
            <div className="space-y-3">
              <p className="soft-label">{projectCaseStudy.company[lang]}</p>
              <h1 className="text-4xl font-semibold">{project.title[lang]}</h1>
              <p className="text-lg text-muted-foreground">{projectCaseStudy.kicker[lang]}</p>
              <p className="max-w-4xl text-base leading-8 text-muted-foreground">
                {project.summary[lang]}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <Badge key={tech} variant="outline" className="rounded-full">
                  {tech}
                </Badge>
              ))}
            </div>

            {project.liveUrl ? (
              <div>
                <Button asChild>
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={dictionary.projects.liveProject}
                  >
                    <ExternalLink className="size-4" />
                    {dictionary.projects.liveProject}
                  </Link>
                </Button>
              </div>
            ) : null}
          </div>
        </section>
      </MotionFade>

      <MotionFade delay={0.04}>
        <Image
          src={project.image}
          alt={project.title[lang]}
          width={1200}
          height={700}
          className="surface h-auto w-full rounded-[1.75rem] border border-border/70 object-cover"
        />
      </MotionFade>

      <MotionFade delay={0.06}>
        <section className="grid gap-5 lg:grid-cols-2">
          <Card className="rounded-[1.75rem]">
            <CardHeader>
              <CardTitle>{dictionary.projects.detailLabels.challenge}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-7 text-muted-foreground">
              <p>{project.challenge[lang]}</p>
            </CardContent>
          </Card>

          <Card className="rounded-[1.75rem]">
            <CardHeader>
              <CardTitle>{dictionary.projects.detailLabels.solution}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-7 text-muted-foreground">
              <p>{project.solution[lang]}</p>
            </CardContent>
          </Card>
        </section>
      </MotionFade>

      <MotionFade delay={0.08}>
        <section className="grid gap-5 lg:grid-cols-3">
          <Card className="rounded-[1.75rem] lg:col-span-2">
            <CardHeader>
              <CardTitle>{dictionary.projects.detailLabels.architecture}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-7 text-muted-foreground">
              <p>{projectCaseStudy.architecture[lang]}</p>
            </CardContent>
          </Card>

          <Card className="rounded-[1.75rem]">
            <CardHeader>
              <CardTitle>{dictionary.projects.detailLabels.capabilities}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm leading-7 text-muted-foreground">
                {project.capabilities[lang].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>
      </MotionFade>

      <MotionFade delay={0.1}>
        <section className="grid gap-5 lg:grid-cols-3">
          <Card className="rounded-[1.75rem]">
            <CardHeader>
              <CardTitle>{dictionary.projects.detailLabels.security}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-7 text-muted-foreground">
              <p>{projectCaseStudy.security[lang]}</p>
            </CardContent>
          </Card>

          <Card className="rounded-[1.75rem]">
            <CardHeader>
              <CardTitle>{dictionary.projects.detailLabels.performance}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-7 text-muted-foreground">
              <p>{projectCaseStudy.performance[lang]}</p>
            </CardContent>
          </Card>

          <Card className="rounded-[1.75rem]">
            <CardHeader>
              <CardTitle>{dictionary.projects.detailLabels.devops}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-7 text-muted-foreground">
              <p>{projectCaseStudy.devops[lang]}</p>
            </CardContent>
          </Card>
        </section>
      </MotionFade>

      <MotionFade delay={0.12}>
        <section className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <Card className="rounded-[1.75rem]">
            <CardHeader>
              <CardTitle>{dictionary.projects.detailLabels.impact}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm leading-7 text-muted-foreground">
                {projectCaseStudy.impact[lang].map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl border border-border/70 bg-background/55 px-4 py-3"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="grid gap-5">
            <Card className="rounded-[1.75rem]">
              <CardHeader>
                <CardTitle>{dictionary.projects.detailLabels.responsibilities}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm leading-7 text-muted-foreground">
                  {projectCaseStudy.responsibilities[lang].map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded-[1.75rem]">
              <CardHeader>
                <CardTitle>{dictionary.projects.detailLabels.stack}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <Badge key={tech} variant="outline" className="rounded-full">
                    {tech}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>
      </MotionFade>

      <Button asChild variant="outline">
        <Link href={`/${lang}/projects`}>{dictionary.projects.detailLabels.allProjects}</Link>
      </Button>
    </article>
  );
}
