import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionary";
import { insights } from "@/content/insights";
import { isValidLang, languages } from "@/lib/i18n";
import { getInsightBySlug } from "@/lib/insights";
import { buildPageMetadata, generateStructuredData } from "@/lib/seo";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { JsonLd } from "@/components/json-ld";
import { Badge } from "@/components/ui/badge";


type InsightDetailPageProps = {
  params: Promise<{ lang: string; slug: string }>;
};

export function generateStaticParams() {
  return languages.flatMap((lang) => insights.map((insight) => ({ lang, slug: insight.slug })));
}

export async function generateMetadata({ params }: InsightDetailPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isValidLang(lang)) return {};

  const insight = getInsightBySlug(slug);
  if (!insight) return {};

  return buildPageMetadata({
    lang,
    route: `/insights/${insight.slug}`,
    title: insight.title[lang],
    description: insight.description[lang],
    keywords: insight.tags[lang],
    type: "article",
  });
}

export default async function InsightDetailPage({ params }: InsightDetailPageProps) {
  const { lang, slug } = await params;
  if (!isValidLang(lang)) notFound();

  const insight = getInsightBySlug(slug);
  if (!insight) notFound();

  const dictionary = getDictionary(lang);

  return (
    <article className="space-y-8">
      <JsonLd
        data={generateStructuredData(lang, {
          page: "insight",
          breadcrumb: [
            { name: dictionary.breadcrumbs.home, path: "" },
            { name: dictionary.breadcrumbs.insights, path: "/insights" },
            { name: insight.title[lang], path: `/insights/${insight.slug}` },
          ],
          insight,
        })}
      />

      <BreadcrumbNav
        lang={lang}
        items={[
          { label: dictionary.breadcrumbs.home, href: "" },
          { label: dictionary.breadcrumbs.insights, href: "/insights" },
          { label: insight.title[lang], href: `/insights/${insight.slug}` },
        ]}
      />

      <section className="space-y-4">
        <h1 className="text-3xl font-semibold sm:text-4xl">{insight.title[lang]}</h1>
        <p className="max-w-3xl text-base text-muted-foreground">{insight.description[lang]}</p>
        <div className="flex flex-wrap gap-2">
          {insight.tags[lang].map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </section>

      {insight.sections.map((section) => (
        <section key={section.heading[lang]} className="space-y-3">
          <h2 className="text-2xl font-semibold">{section.heading[lang]}</h2>
          <div className="space-y-2 text-sm text-muted-foreground">
            {section.paragraphs[lang].map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>
      ))}
    </article>
  );
}

