import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Github, Instagram, Linkedin, MessageCircle } from "lucide-react";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionary";
import { projects } from "@/content/projects";
import { techIcons } from "@/content/skills";
import { isValidLang } from "@/lib/i18n";
import { buildPageMetadata, generateStructuredData, getFaqEntries } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { JsonLd } from "@/components/json-ld";
import { TechIconsGrid } from "@/components/tech/TechIconsGrid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type HomePageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang)) {
    return {};
  }

  const dictionary = getDictionary(lang);
  return buildPageMetadata({
    lang,
    route: "",
    title: dictionary.home.h1,
    description: dictionary.home.subheadline,
  });
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;
  if (!isValidLang(lang)) {
    notFound();
  }

  const dictionary = getDictionary(lang);
  const featuredProjects = projects.slice(0, 3);
  const faqEntries = getFaqEntries(lang);

  return (
    <article className="space-y-12">
      <JsonLd
        data={generateStructuredData(lang, {
          page: "home",
          breadcrumb: [{ name: dictionary.breadcrumbs.home, path: "" }],
        })}
      />

      <section className="grid gap-8 rounded-3xl border border-border/70 bg-card/80 p-6 lg:grid-cols-[1.3fr_0.7fr] lg:p-8">
        <div className="space-y-5">
          <Badge variant="secondary">{dictionary.home.badge}</Badge>
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">{dictionary.home.h1}</h1>
          <p className="max-w-3xl text-base text-muted-foreground">{dictionary.home.subheadline}</p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href={`/${lang}/projects`}>{dictionary.home.primaryCta}</Link>
            </Button>
            <Button asChild variant="outline">
              <Link
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={lang === "pt" ? "Abrir conversa no WhatsApp" : "Open WhatsApp chat"}
              >
                <MessageCircle className="size-4" />
                {dictionary.home.whatsAppCta}
              </Link>
            </Button>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <Link href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-foreground">
              <Linkedin className="size-4" />
              LinkedIn
            </Link>
            <Link href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-foreground">
              <Github className="size-4" />
              GitHub
            </Link>
            <Link href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-foreground">
              <Instagram className="size-4" />
              Instagram
            </Link>
          </div>
        </div>

        <div className="surface mx-auto max-w-xs overflow-hidden rounded-3xl border border-border/70">
          <Image
            src="/profile/jose-manoel.jpg"
            alt="José Manoel Pereira - Full Stack Developer"
            width={420}
            height={420}
            priority
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      <section className="space-y-5">
        <header className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold">{dictionary.home.featuredTitle}</h2>
            <Button asChild variant="link" className="px-0">
              <Link href={`/${lang}/projects`}>
                {lang === "pt" ? "Ver todos os projetos" : "View all projects"}
              </Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">{dictionary.home.featuredSubtitle}</p>
        </header>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredProjects.map((project) => (
            <Card key={project.slug} className="transition-colors hover:border-primary/35">
              <CardHeader>
                <CardTitle className="text-lg">
                  <Link href={`/${lang}/projects/${project.slug}`} className="hover:underline">
                    {project.title[lang]}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{project.summary[lang]}</p>
                <Button asChild variant="link" className="px-0">
                  <Link href={`/${lang}/projects/${project.slug}`}>{dictionary.projects.readCase}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="technologies-title" className="space-y-4">
        <h2 id="technologies-title" className="text-2xl font-semibold">
          {dictionary.home.technologiesTitle}
        </h2>
        <TechIconsGrid lang={lang} items={techIcons} />
      </section>

      <section aria-labelledby="faq-title">
        <Card>
          <CardHeader>
            <CardTitle id="faq-title">{dictionary.home.faqTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-5">
              {faqEntries.map((entry) => (
                <div key={entry.question}>
                  <dt className="text-sm font-semibold">{entry.question}</dt>
                  <dd className="mt-1 text-sm text-muted-foreground">{entry.answer}</dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>
      </section>

      <section className="surface rounded-2xl border border-border/70 p-6">
        <h2 className="text-2xl font-semibold">{dictionary.home.finalCtaTitle}</h2>
        <p className="mt-3 max-w-3xl text-sm text-muted-foreground">{dictionary.home.finalCtaText}</p>
        <div className="mt-5">
          <Button asChild>
            <Link href={`/${lang}/contact`}>{dictionary.home.finalCtaButton}</Link>
          </Button>
        </div>
      </section>
    </article>
  );
}
