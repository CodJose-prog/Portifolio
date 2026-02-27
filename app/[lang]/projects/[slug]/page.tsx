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
    keywords: [...project.stack, "Full Stack Developer", "Software Engineer"],
    type: "article",
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { lang, slug } = await params;
  if (!isValidLang(lang)) {
    notFound();
  }

  const project = getProjectBySlug(slug);
  if (!project) {
    notFound();
  }
  const projectCaseStudy = getProjectCaseStudyBySlug(slug);
  if (!projectCaseStudy) {
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

      <section className="space-y-4">
        <h1 className="text-3xl font-semibold sm:text-4xl">{project.title[lang]}</h1>
        <p className="max-w-3xl text-base text-muted-foreground">{project.summary[lang]}</p>
        {project.liveUrl ? (
          <Button asChild>
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={lang === "pt" ? "Ver projeto online" : "View live project"}
            >
              <ExternalLink className="size-4" />
              {lang === "pt" ? "Ver projeto online" : "View live project"}
            </Link>
          </Button>
        ) : null}
      </section>

      <Image
        src={project.image}
        alt={project.title[lang]}
        width={1200}
        height={680}
        className="surface h-auto w-full rounded-2xl object-cover"
      />

      <section className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{dictionary.projects.detailLabels.challenge}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>{project.challenge[lang]}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{dictionary.projects.detailLabels.solution}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>{project.solution[lang]}</p>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{dictionary.projects.detailLabels.capabilities}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {project.capabilities[lang].map((item) => (
                <li key={item} className="list-inside list-disc">
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{dictionary.projects.detailLabels.stack}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
          </CardContent>
        </Card>
      </section>

      <Button asChild variant="outline">
        <Link href={`/${lang}/projects`}>{dictionary.projects.detailLabels.allProjects}</Link>
      </Button>
    </article>
  );
}
