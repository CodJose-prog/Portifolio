import type { Metadata } from "next";
import Link from "next/link";
import { Github, Instagram, Linkedin, MessageCircle } from "lucide-react";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionary";
import { isValidLang } from "@/lib/i18n";
import { buildPageMetadata, generateStructuredData } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { JsonLd } from "@/components/json-ld";
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

      <section>
        <h1 className="text-3xl font-semibold sm:text-4xl">{dictionary.contact.h1}</h1>
        <p className="mt-4 max-w-3xl text-base text-muted-foreground">{dictionary.contact.intro}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          {lang === "pt" ? "Telefone: " : "Phone: "}
          <Link href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`} className="text-primary underline-offset-4 hover:underline">
            {siteConfig.phone}
          </Link>
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{dictionary.contact.directTitle}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <ul className="space-y-2">
              {dictionary.contact.directItems.map((item) => (
                <li key={item} className="list-inside list-disc">
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={lang === "pt" ? "Abrir conversa no WhatsApp" : "Open WhatsApp chat"}
                >
                  <MessageCircle className="size-4" />
                  WhatsApp
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram profile">
                  <Instagram className="size-4" />
                  Instagram
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
                  <Linkedin className="size-4" />
                  LinkedIn
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={siteConfig.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
                  <Github className="size-4" />
                  GitHub
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{dictionary.contact.responseTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {dictionary.contact.responseItems.map((item) => (
                <li key={item} className="list-inside list-disc">
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>
    </article>
  );
}
