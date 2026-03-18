import type { Metadata } from "next";
import Link from "next/link";
import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionary";
import { profile } from "@/content/profile";
import { isValidLang } from "@/lib/i18n";
import { buildPageMetadata, generateStructuredData } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { JsonLd } from "@/components/json-ld";
import { MotionFade } from "@/components/motion-fade";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

  const contactCards = [
    {
      href: `mailto:${siteConfig.email}`,
      label: "Email",
      value: siteConfig.email,
      icon: Mail,
    },
    {
      href: siteConfig.linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/jose-manoel-dev",
      icon: Linkedin,
    },
    {
      href: siteConfig.github,
      label: "GitHub",
      value: "github.com/CodJose-prog",
      icon: Github,
    },
    {
      href: siteConfig.whatsapp,
      label: "WhatsApp",
      value: siteConfig.phone,
      icon: MessageCircle,
    },
  ];

  return (
    <article className="space-y-8">
      <JsonLd
        data={generateStructuredData(lang, {
          page: "contact",
          breadcrumb: [
            { name: dictionary.breadcrumbs.home, path: "" },
            { name: dictionary.breadcrumbs.contact, path: "/contact" },
          ],
        })}
      />

      <BreadcrumbNav
        lang={lang}
        items={[
          { label: dictionary.breadcrumbs.home, href: "" },
          { label: dictionary.breadcrumbs.contact, href: "/contact" },
        ]}
      />

      <MotionFade>
        <section className="section-shell surface rounded-[2rem] border border-border/70 p-6 lg:p-8">
          <div className="relative grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-5">
              <p className="soft-label">{dictionary.contact.h1}</p>
              <h1 className="text-4xl font-semibold">{profile.hero.headline[lang]}</h1>
              <p className="max-w-3xl text-base leading-8 text-muted-foreground">
                {dictionary.contact.intro}
              </p>
              <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
                {lang === "pt"
                  ? "Prefiro conversas objetivas sobre backend, integrações, arquitetura, evolução de produto e desafios reais de operação."
                  : "I prefer objective conversations about backend, integrations, architecture, product evolution, and real operational challenges."}
              </p>

              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href={`mailto:${siteConfig.email}`}>{dictionary.contact.primaryButton}</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer">
                    {dictionary.contact.secondaryButton}
                  </Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-3">
              {contactCards.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-[1.4rem] border border-border/70 bg-background/60 px-4 py-4 transition hover:border-primary/45"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex size-11 items-center justify-center rounded-full bg-primary/12 text-primary">
                        <Icon className="size-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{item.label}</p>
                        <p className="text-sm text-muted-foreground">{item.value}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </MotionFade>

      <MotionFade delay={0.04}>
        <section className="grid gap-5 xl:grid-cols-2">
          <Card className="rounded-[1.75rem]">
            <CardHeader>
              <CardTitle>{dictionary.contact.directTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-7 text-muted-foreground">
              <p>{dictionary.contact.directText}</p>
              <ul className="space-y-3">
                {profile.contactChannels.map((channel) => (
                  <li key={channel.href}>{channel.label[lang]}: {channel.value}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="rounded-[1.75rem]">
            <CardHeader>
              <CardTitle>{dictionary.contact.responseTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-7 text-muted-foreground">
              <p>{dictionary.contact.responseText}</p>
              <ul className="space-y-3">
                {profile.projectFit[lang].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>
      </MotionFade>
    </article>
  );
}
