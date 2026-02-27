import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionary";
import { isValidLang } from "@/lib/i18n";
import { buildPageMetadata, generateStructuredData } from "@/lib/seo";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { JsonLd } from "@/components/json-ld";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type AboutPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang)) {
    return {};
  }

  const dictionary = getDictionary(lang);
  return buildPageMetadata({
    lang,
    route: "/about",
    title: dictionary.about.h1,
    description: dictionary.about.intro,
  });
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { lang } = await params;
  if (!isValidLang(lang)) {
    notFound();
  }

  const dictionary = getDictionary(lang);

  return (
    <article className="space-y-8">
      <JsonLd
        data={generateStructuredData(lang, {
          page: "about",
          breadcrumb: [
            { name: dictionary.breadcrumbs.home, path: "" },
            { name: dictionary.breadcrumbs.about, path: "/about" },
          ],
        })}
      />

      <BreadcrumbNav
        lang={lang}
        items={[
          { label: dictionary.breadcrumbs.home, href: "" },
          { label: dictionary.breadcrumbs.about, href: "/about" },
        ]}
      />

      <section className="grid gap-6 rounded-3xl border border-border/70 bg-card/80 p-6 md:grid-cols-[0.9fr_1.1fr]">
        <div className="mx-auto max-w-xs overflow-hidden rounded-3xl border border-border/70 bg-muted/20">
          <Image
            src="/profile/jose-manoel.jpg"
            alt="José Manoel Pereira - Full Stack Developer and Software Engineer"
            width={420}
            height={420}
            className="h-full w-full object-cover"
            priority
          />
        </div>
        <div>
          <h1 className="text-3xl font-semibold sm:text-4xl">{dictionary.about.h1}</h1>
          <p className="mt-4 max-w-3xl text-base text-muted-foreground">{dictionary.about.intro}</p>
        </div>
      </section>

      <section className="grid gap-5">
        {dictionary.about.sections.map((section) => (
          <Card key={section.title}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              {section.content.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </CardContent>
          </Card>
        ))}
      </section>
    </article>
  );
}
