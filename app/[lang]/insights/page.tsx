import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionary";
import { isValidLang } from "@/lib/i18n";
import { getAllInsights } from "@/lib/insights";
import { buildPageMetadata, generateStructuredData } from "@/lib/seo";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { JsonLd } from "@/components/json-ld";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type InsightsPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: InsightsPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang)) return {};

  return buildPageMetadata({
    lang,
    route: "/insights",
    title: lang === "pt" ? "Insights técnicos" : "Technical insights",
    description:
      lang === "pt"
        ? "Artigos técnicos sobre arquitetura SaaS, multi-tenant, engenharia de LLM, engenharia de prompt e backend escalável."
        : "Technical articles on SaaS architecture, multi-tenant systems, LLM engineering, Prompt Engineering, and scalable backend design.",
    keywords:
      lang === "pt"
        ? ["insights técnicos", "engenharia de LLM", "backend escalável", "arquitetura moderna"]
        : ["technical insights", "LLM Engineering", "scalable backend", "modern software architecture"],
  });
}

export default async function InsightsPage({ params }: InsightsPageProps) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();

  const dictionary = getDictionary(lang);
  const insights = getAllInsights();

  return (
    <article className="space-y-8">
      <JsonLd
        data={generateStructuredData(lang, {
          page: "projects",
          breadcrumb: [
            { name: dictionary.breadcrumbs.home, path: "" },
            { name: dictionary.breadcrumbs.insights, path: "/insights" },
          ],
        })}
      />

      <BreadcrumbNav
        lang={lang}
        items={[
          { label: dictionary.breadcrumbs.home, href: "" },
          { label: dictionary.breadcrumbs.insights, href: "/insights" },
        ]}
      />

      <section>
        <h1 className="text-3xl font-semibold sm:text-4xl">{dictionary.breadcrumbs.insights}</h1>
        <p className="mt-4 max-w-3xl text-base text-muted-foreground">
          {lang === "pt"
            ? "Conteúdo técnico voltado para autoridade temática em SaaS, arquitetura multi-tenant, engenharia de LLM e performance em SEO técnico."
            : "Technical content focused on Topical Authority in SaaS, multi-tenant architecture, LLM Engineering, and performance SEO."}
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        {insights.map((insight) => (
          <Card key={insight.slug}>
            <CardHeader>
              <CardTitle>
                <Link href={`/${lang}/insights/${insight.slug}`} className="hover:underline">
                  {insight.title[lang]}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{insight.description[lang]}</p>
              <div className="flex flex-wrap gap-2">
                {insight.tags[lang].map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </article>
  );
}


