import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionary";
import { isValidLang } from "@/lib/i18n";
import { buildPageMetadata, generateStructuredData } from "@/lib/seo";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { JsonLd } from "@/components/json-ld";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type BlogPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang)) return {};

  return buildPageMetadata({
    lang,
    route: "/blog",
    title: lang === "pt" ? "Blog técnico" : "Technical blog",
    description:
      lang === "pt"
        ? "Estrutura base para artigos técnicos sobre SaaS, multi-tenant, LLM, backend e performance com SEO."
        : "Base structure for technical articles about SaaS, multi-tenant, LLM, backend, and performance with SEO.",
    keywords:
      lang === "pt"
        ? ["blog técnico", "arquitetura moderna", "backend escalável", "engenharia de LLM"]
        : ["technical blog", "modern software architecture", "scalable backend", "LLM engineering"],
  });
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();

  const dictionary = getDictionary(lang);

  return (
    <article className="space-y-8">
      <JsonLd
        data={generateStructuredData(lang, {
          page: "projects",
          breadcrumb: [
            { name: dictionary.breadcrumbs.home, path: "" },
            { name: dictionary.breadcrumbs.blog, path: "/blog" },
          ],
        })}
      />

      <BreadcrumbNav
        lang={lang}
        items={[
          { label: dictionary.breadcrumbs.home, href: "" },
          { label: dictionary.breadcrumbs.blog, href: "/blog" },
        ]}
      />

      <section>
        <h1 className="text-3xl font-semibold sm:text-4xl">{dictionary.breadcrumbs.blog}</h1>
        <p className="mt-4 max-w-3xl text-base text-muted-foreground">
          {lang === "pt"
            ? "Estrutura pronta para artigos técnicos de longo prazo, com URL semântica, dados estruturados e clusters de tags para autoridade temática."
            : "Structure ready for long-term technical articles with semantic URLs, structured data, and tag clusters for topical authority."}
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{lang === "pt" ? "URL semântica" : "Semantic URL"}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>{lang === "pt" ? "Padrão recomendado: /insights/[slug-técnico]" : "Recommended pattern: /insights/[technical-slug]"}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{lang === "pt" ? "Dados estruturados" : "Structured Data"}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>{lang === "pt" ? "Cada artigo com schema Article e BreadcrumbList." : "Each article includes Article schema and BreadcrumbList."}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{lang === "pt" ? "Clusters de tags" : "Tag clusters"}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>{lang === "pt" ? "Clusters por SaaS, multi-tenant, LLM, Prompt Engineering, Backend e Performance SEO." : "Clusters by SaaS, multi-tenant, LLM, Prompt Engineering, Backend, and Performance SEO."}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{lang === "pt" ? "Hub ativo" : "Active hub"}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <Link href={`/${lang}/insights`} className="text-primary underline-offset-4 hover:underline">
              {lang === "pt" ? "Ver insights técnicos" : "View technical insights"}
            </Link>
          </CardContent>
        </Card>
      </section>
    </article>
  );
}


