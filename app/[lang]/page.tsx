import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MessageCircle,
} from "lucide-react";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionary";
import { education, experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { techIcons } from "@/content/skills";
import { isValidLang } from "@/lib/i18n";
import { buildPageMetadata, generateStructuredData, getFaqEntries } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { JsonLd } from "@/components/json-ld";
import { MotionFade } from "@/components/motion-fade";
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
  const featuredProjects = projects.slice(0, 3);
  const faqEntries = getFaqEntries(lang);
  const primaryEducation = education[0];
  const socialLinks = [
    { href: profile.linkedin, label: "LinkedIn", icon: Linkedin },
    { href: profile.github, label: "GitHub", icon: Github },
    { href: `mailto:${profile.email}`, label: "Email", icon: Mail },
  ];

  return (
    <article className="space-y-10 lg:space-y-14">
      <JsonLd
        data={generateStructuredData(lang, {
          page: "home",
          breadcrumb: [{ name: dictionary.breadcrumbs.home, path: "" }],
        })}
      />

      <MotionFade>
        <section className="section-shell surface overflow-hidden rounded-[2rem] border border-border/70 px-6 py-7 lg:px-8 lg:py-8">
          <div className="relative grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <Badge variant="secondary" className="rounded-full px-4 py-1.5">
                {profile.hero.badge[lang]}
              </Badge>

              <div className="space-y-4">
                <h1 className="max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl xl:text-6xl">
                  {profile.hero.headline[lang]}
                </h1>
                <p className="max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
                  {profile.hero.subheadline[lang]}
                </p>
                <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                  {profile.hero.availability[lang]}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href={`/${lang}/projects`}>
                    {dictionary.home.primaryCta}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href={`/${lang}/contact`}>{dictionary.home.secondaryCta}</Link>
                </Button>
              </div>

              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                {socialLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/70 px-3 py-2 transition hover:border-primary/45 hover:text-foreground"
                    >
                      <Icon className="size-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {profile.projectFit[lang].slice(0, 4).map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-border/70 bg-background/65 px-4 py-3 text-sm leading-6 text-muted-foreground"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr] xl:grid-cols-1">
              <div className="surface overflow-hidden rounded-[1.75rem] border border-border/70">
                <div className="relative">
                  <Image
                    src="/profile/jose-manoel.jpg"
                    alt="José Manoel Pereira - Backend Engineer"
                    width={560}
                    height={620}
                    priority
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#07111e] via-[#07111e]/72 to-transparent p-5 text-white">
                    <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/80">
                      Backend Engineer
                    </p>
                    <p className="mt-2 max-w-xs text-sm leading-6 text-slate-200">
                      Laravel, Node.js, APIs, PostgreSQL, Docker e CI/CD como base de entrega.
                    </p>
                  </div>
                </div>
              </div>

              <div className="code-panel panel-grid relative overflow-hidden rounded-[1.75rem] border border-cyan-400/14 p-5">
                <div className="flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.18em] text-cyan-200/70">
                  <span className="inline-block size-2 rounded-full bg-teal-300" />
                  backend operations map
                </div>

                <div className="mt-5 grid gap-3 text-sm">
                  <div className="rounded-2xl border border-cyan-400/16 bg-slate-950/34 p-4">
                    <p className="soft-label text-cyan-200/65">core stack</p>
                    <p className="mt-2 text-base font-medium text-slate-100">
                      Laravel • Node.js • PostgreSQL • Docker
                    </p>
                  </div>
                  <div className="rounded-2xl border border-cyan-400/16 bg-slate-950/34 p-4">
                    <p className="soft-label text-cyan-200/65">focus areas</p>
                    <div className="mt-3 space-y-2 text-slate-200/88">
                      <p>01. APIs REST e integrações externas</p>
                      <p>02. SaaS multi-tenant com RLS</p>
                      <p>03. Deploy, CI/CD e Linux VPS</p>
                      <p>04. Performance e evolução de sistemas reais</p>
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {profile.metrics.slice(0, 2).map((metric) => (
                      <div
                        key={metric.label[lang]}
                        className="rounded-2xl border border-cyan-400/16 bg-slate-950/34 p-4"
                      >
                        <p className="text-2xl font-semibold text-white">{metric.value}</p>
                        <p className="mt-1 text-sm text-slate-200">{metric.label[lang]}</p>
                        <p className="mt-2 text-xs leading-6 text-slate-400">{metric.detail[lang]}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </MotionFade>

      <MotionFade delay={0.04}>
        <section className="space-y-5">
          <div className="space-y-2">
            <p className="soft-label">{dictionary.home.metricsTitle}</p>
            <h2 className="text-3xl font-semibold">{dictionary.home.metricsSubtitle}</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {profile.metrics.map((metric) => (
              <Card key={metric.label[lang]} className="rounded-[1.5rem]">
                <CardHeader className="space-y-1">
                  <p className="text-3xl font-semibold text-foreground">{metric.value}</p>
                  <CardTitle className="text-lg">{metric.label[lang]}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-7 text-muted-foreground">
                  {metric.detail[lang]}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </MotionFade>

      <MotionFade delay={0.06}>
        <section className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
          <Card className="rounded-[1.75rem]">
            <CardHeader>
              <p className="soft-label">{dictionary.home.aboutTitle}</p>
              <CardTitle className="text-3xl">{profile.trajectory.title[lang]}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-base leading-8 text-muted-foreground">
              <p>{profile.trajectory.intro[lang]}</p>
              {profile.trajectory.paragraphs[lang].map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </CardContent>
          </Card>

          <div className="grid gap-5">
            <Card className="rounded-[1.75rem]">
              <CardHeader>
                <p className="soft-label">{dictionary.about.focusTitle}</p>
                <CardTitle>Backend engineering</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm leading-7 text-muted-foreground">
                  {profile.trajectory.currentFocus[lang].map((item) => (
                    <li key={item} className="rounded-2xl border border-border/70 bg-background/55 px-4 py-3">
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded-[1.75rem]">
              <CardHeader>
                <p className="soft-label">{dictionary.about.educationTitle}</p>
                <CardTitle>{primaryEducation.degree[lang]}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm leading-7 text-muted-foreground">
                <p>{primaryEducation.institution}</p>
                <p>
                  {lang === "pt" ? "Status" : "Status"}: {primaryEducation.completion[lang]}
                </p>
                <p>{profile.summary[lang]}</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </MotionFade>

      <MotionFade delay={0.08}>
        <section className="space-y-5">
          <div className="space-y-2">
            <p className="soft-label">{dictionary.home.specialtiesTitle}</p>
            <h2 className="text-3xl font-semibold">{dictionary.home.specialtiesSubtitle}</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {profile.specialtyGroups.map((group) => (
              <Card key={group.title[lang]} className="rounded-[1.5rem]">
                <CardHeader>
                  <CardTitle>{group.title[lang]}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm leading-7 text-muted-foreground">
                    {group.items[lang].map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="rounded-[1.75rem]">
            <CardHeader>
              <CardTitle>{dictionary.home.technologiesTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <TechIconsGrid lang={lang} items={techIcons} />
            </CardContent>
          </Card>
        </section>
      </MotionFade>

      <MotionFade delay={0.1}>
        <section className="space-y-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="space-y-2">
              <p className="soft-label">{dictionary.home.experienceTitle}</p>
              <h2 className="text-3xl font-semibold">{dictionary.home.experienceSubtitle}</h2>
            </div>
            <Button asChild variant="link" className="px-0">
              <Link href={`/${lang}/projects`}>{dictionary.home.viewAllCasesLabel}</Link>
            </Button>
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            {experience.map((entry) => (
              <Card key={entry.id} className="rounded-[1.75rem]">
                <CardHeader className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="soft-label">{entry.period[lang]}</p>
                      <CardTitle className="mt-2 text-2xl">{entry.company}</CardTitle>
                    </div>
                    <Badge variant="outline" className="rounded-full px-3 py-1">
                      {entry.context[lang]}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium text-foreground/90">{entry.role[lang]}</p>
                </CardHeader>
                <CardContent className="space-y-5">
                  <p className="text-sm leading-7 text-muted-foreground">{entry.summary[lang]}</p>

                  <ul className="space-y-3 text-sm leading-7 text-muted-foreground">
                    {entry.responsibilities[lang].slice(0, 3).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {entry.stack[lang].map((tech) => (
                      <Badge key={tech} variant="outline" className="rounded-full">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {entry.projectSlug ? (
                      <Button asChild size="sm">
                        <Link href={`/${lang}/projects/${entry.projectSlug}`}>
                          {dictionary.home.readCaseLabel}
                        </Link>
                      </Button>
                    ) : null}
                    {entry.liveUrl ? (
                      <Button asChild size="sm" variant="outline">
                        <Link href={entry.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="size-4" />
                          {dictionary.home.liveProjectLabel}
                        </Link>
                      </Button>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </MotionFade>

      <MotionFade delay={0.12}>
        <section className="space-y-5">
          <div className="space-y-2">
            <p className="soft-label">{dictionary.home.casesTitle}</p>
            <h2 className="text-3xl font-semibold">{dictionary.home.casesSubtitle}</h2>
          </div>

          <div className="grid gap-5 xl:grid-cols-3">
            {featuredProjects.map((project) => (
              <Card key={project.slug} className="overflow-hidden rounded-[1.75rem]">
                <div className="relative h-52 overflow-hidden border-b border-border/70">
                  <Image
                    src={project.image}
                    alt={project.title[lang]}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1280px) 100vw, 33vw"
                  />
                </div>
                <CardHeader className="space-y-3">
                  <div className="space-y-1">
                    <p className="soft-label">{project.company[lang]}</p>
                    <CardTitle className="text-2xl">{project.title[lang]}</CardTitle>
                  </div>
                  <p className="text-sm text-muted-foreground">{project.kicker[lang]}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm leading-7 text-muted-foreground">{project.summary[lang]}</p>
                  <ul className="space-y-2 text-sm leading-7 text-muted-foreground">
                    {project.impact[lang].slice(0, 2).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="outline" className="rounded-full">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="pt-2">
                    <Button asChild variant="outline">
                      <Link href={`/${lang}/projects/${project.slug}`}>
                        {dictionary.home.readCaseLabel}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </MotionFade>

      <MotionFade delay={0.14}>
        <section className="space-y-5">
          <div className="space-y-2">
            <p className="soft-label">{dictionary.home.differentiatorsTitle}</p>
            <h2 className="text-3xl font-semibold">{dictionary.home.differentiatorsSubtitle}</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {profile.differentiators.map((item) => (
              <Card key={item.title[lang]} className="rounded-[1.5rem]">
                <CardHeader>
                  <CardTitle className="text-xl">{item.title[lang]}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-7 text-muted-foreground">
                  {item.description[lang]}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </MotionFade>

      <MotionFade delay={0.16}>
        <section aria-labelledby="faq-title">
          <Card className="rounded-[1.75rem]">
            <CardHeader>
              <CardTitle id="faq-title">{dictionary.home.faqTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid gap-5 md:grid-cols-2">
                {faqEntries.map((entry) => (
                  <div key={entry.question} className="rounded-2xl border border-border/70 bg-background/55 p-4">
                    <dt className="text-sm font-semibold">{entry.question}</dt>
                    <dd className="mt-2 text-sm leading-7 text-muted-foreground">{entry.answer}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        </section>
      </MotionFade>

      <MotionFade delay={0.18}>
        <section className="section-shell surface rounded-[2rem] border border-border/70 p-6 lg:p-8">
          <div className="relative grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <p className="soft-label">{dictionary.home.finalCtaTitle}</p>
              <h2 className="text-3xl font-semibold">{dictionary.home.finalCtaText}</h2>
              <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                {lang === "pt"
                  ? "Se o desafio envolve APIs, integração de serviços, multi-tenant, dados, deploy ou evolução de backend em produção, faz sentido conversar."
                  : "If the challenge involves APIs, service integrations, multi-tenant architecture, data, deployment, or backend evolution in production, it makes sense to talk."}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href={`/${lang}/contact`}>{dictionary.home.finalCtaButton}</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="size-4" />
                    WhatsApp
                  </Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-3">
              {profile.contactChannels.map((channel) => {
                const Icon =
                  channel.label.en === "Email"
                    ? Mail
                    : channel.label.en === "LinkedIn"
                      ? Linkedin
                      : channel.label.en === "GitHub"
                        ? Github
                        : MessageCircle;

                return (
                  <Link
                    key={channel.href}
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-[1.4rem] border border-border/70 bg-background/60 px-4 py-4 transition hover:border-primary/45"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-full bg-primary/12 text-primary">
                        <Icon className="size-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{channel.label[lang]}</p>
                        <p className="text-sm text-muted-foreground">{channel.value}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </MotionFade>
    </article>
  );
}
