import type { Metadata } from "next";
import { certifications, education, experience } from "@/content/experience";
import type { InsightArticle } from "@/content/insights";
import type { ProjectCaseStudy } from "@/content/projects";
import { type Lang, withLang } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

export type BreadcrumbItem = {
  name: string;
  path: string;
};

type JsonLdNode = Record<string, unknown>;

type StructuredDataOptions = {
  page?: "home" | "projects" | "project" | "about" | "contact" | "insight";
  breadcrumb?: BreadcrumbItem[];
  project?: ProjectCaseStudy;
  insight?: InsightArticle;
};

type BuildPageMetadataInput = {
  lang: Lang;
  route: string;
  title: string;
  description: string;
  keywords?: string[];
  type?: "website" | "article";
  noindex?: boolean;
};

const localizedSeo = {
  pt: {
    titleTemplate: "%s | José Manoel Pereira",
    defaultTitle: "José Manoel Pereira | Backend Engineer",
    description:
      "Backend Engineer com foco em Laravel, Node.js, APIs escaláveis, SaaS multi-tenant, PostgreSQL, Docker e CI/CD.",
    keywords: [
      "Backend Engineer",
      "Laravel",
      "Node.js",
      "APIs REST",
      "PostgreSQL",
      "SaaS multi-tenant",
      "Docker",
      "CI/CD",
      "Arquitetura backend",
      "Integrações externas",
    ],
    ogLocale: "pt_BR",
  },
  en: {
    titleTemplate: "%s | José Manoel Pereira",
    defaultTitle: "José Manoel Pereira | Backend Engineer",
    description:
      "Backend Engineer focused on Laravel, Node.js, scalable APIs, multi-tenant SaaS, PostgreSQL, Docker, and CI/CD.",
    keywords: [
      "Backend Engineer",
      "Laravel",
      "Node.js",
      "REST APIs",
      "PostgreSQL",
      "Multi-tenant SaaS",
      "Docker",
      "CI/CD",
      "Backend architecture",
      "External integrations",
    ],
    ogLocale: "en_US",
  },
} as const;

const personId = `${siteConfig.url}#person`;
const websiteId = `${siteConfig.url}#website`;

const personDescriptions: Record<Lang, string> = {
  pt: "Engenheiro de software com foco em backend, APIs, arquitetura de sistemas, PostgreSQL, Docker e CI/CD. Atua com Laravel, Node.js, SaaS multi-tenant e integração de serviços em produtos reais.",
  en: "Software engineer focused on backend, APIs, systems architecture, PostgreSQL, Docker, and CI/CD. Works with Laravel, Node.js, multi-tenant SaaS, and service integrations in real products.",
};

const websiteDescriptions: Record<Lang, string> = {
  pt: "Portfólio de backend engineering de José Manoel Pereira com experiência em APIs, SaaS multi-tenant, PostgreSQL e operação em produção.",
  en: "Backend engineering portfolio of José Manoel Pereira with experience in APIs, multi-tenant SaaS, PostgreSQL, and production operations.",
};

const faqEntries: Record<
  Lang,
  Array<{
    question: string;
    answer: string;
  }>
> = {
  pt: [
    {
      question: "No que você é mais forte hoje?",
      answer:
        "Minha base principal hoje está em backend com Laravel, Node.js, APIs REST, PostgreSQL, arquitetura multi-tenant, Docker e CI/CD.",
    },
    {
      question: "Que tipo de problema você costuma resolver?",
      answer:
        "Atuo em APIs, integrações, evolução de sistemas em produção, automações operacionais, modelagem de dados e estruturação de backend para novos produtos SaaS.",
    },
    {
      question: "Você já trabalhou com multi-tenant em produção?",
      answer:
        "Sim. No ArenaCalendar, estruturei isolamento de dados com PostgreSQL RLS e backend orientado a múltiplos tenants ativos.",
    },
    {
      question: "Você também cuida da entrega e infraestrutura?",
      answer:
        "Sim. Trabalho com Docker, Linux, Nginx e CI/CD via GitHub Actions para tornar o deploy parte natural do ciclo de engenharia.",
    },
  ],
  en: [
    {
      question: "What are you strongest at right now?",
      answer:
        "My main strength today is backend engineering with Laravel, Node.js, REST APIs, PostgreSQL, multi-tenant architecture, Docker, and CI/CD.",
    },
    {
      question: "What kind of problems do you usually solve?",
      answer:
        "I work on APIs, integrations, production system evolution, operational automations, data modeling, and backend structure for new SaaS products.",
    },
    {
      question: "Have you worked with multi-tenant in production?",
      answer:
        "Yes. In ArenaCalendar, I structured data isolation with PostgreSQL RLS and a backend designed for multiple active tenants.",
    },
    {
      question: "Do you also handle delivery and infrastructure?",
      answer:
        "Yes. I work with Docker, Linux, Nginx, and CI/CD through GitHub Actions so deployment becomes part of the engineering cycle.",
    },
  ],
};

function canonicalFor(lang: Lang, route: string) {
  return `${siteConfig.url}${withLang(lang, route)}`;
}

function alternateLanguages(route: string) {
  return {
    "pt-BR": `${siteConfig.url}${withLang("pt", route)}`,
    "en-US": `${siteConfig.url}${withLang("en", route)}`,
    "x-default": `${siteConfig.url}${withLang("en", route)}`,
  };
}

function defaultRobots(noindex = false): NonNullable<Metadata["robots"]> {
  return {
    index: !noindex,
    follow: !noindex,
    googleBot: {
      index: !noindex,
      follow: !noindex,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  };
}

function monthToDate(month: string) {
  return `${month}-01`;
}

function createWorkHistorySchema(lang: Lang): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: lang === "pt" ? "Experiência profissional" : "Professional experience",
    itemListElement: experience.map((entry, index) => {
      const item: Record<string, unknown> = {
        "@type": "Role",
        roleName: entry.role[lang],
        startDate: monthToDate(entry.startDate),
        description: entry.responsibilities[lang].join(" "),
        memberOf: {
          "@type": "Organization",
          name: entry.company,
        },
      };

      if (entry.endDate) {
        item.endDate = monthToDate(entry.endDate);
      }

      return {
        "@type": "ListItem",
        position: index + 1,
        item,
      };
    }),
  };
}

function createPersonSchema(lang: Lang): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    description: personDescriptions[lang],
    url: canonicalFor(lang, ""),
    image: `${siteConfig.url}/jose-hero.svg`,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    sameAs: [siteConfig.linkedin, siteConfig.github],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Santarém",
      addressRegion: "PA",
      addressCountry: "BR",
    },
    worksFor: Array.from(new Set(experience.map((entry) => entry.company))).map((company) => ({
      "@type": "Organization",
      name: company,
    })),
    knowsAbout: [
      "Backend Engineering",
      "Laravel",
      "Node.js",
      "REST APIs",
      "PostgreSQL",
      "MySQL",
      "Docker",
      "CI/CD",
      "Linux",
      "Nginx",
      "Multi-tenant SaaS",
      "PostgreSQL RLS",
      "External API integration",
      "System design",
    ],
    skills: [
      "Laravel and PHP backend development",
      "Node.js and TypeScript services",
      "REST API design",
      "Multi-tenant architecture",
      "PostgreSQL optimization and RLS",
      "MySQL and relational modeling",
      "Docker",
      "GitHub Actions",
      "Linux VPS management",
      "Nginx",
      "External API integrations",
      "AI automation workflows",
    ],
    alumniOf: education.map((item) => ({
      "@type": "EducationalOrganization",
      name: item.institution,
    })),
    hasCredential: certifications.map((item) => ({
      "@type": "EducationalOccupationalCredential",
      name: item.title,
    })),
    knowsLanguage: [
      {
        "@type": "Language",
        name: "Portuguese",
      },
      {
        "@type": "Language",
        name: "English",
      },
    ],
    areaServed: [
      {
        "@type": "Country",
        name: "Brazil",
      },
      {
        "@type": "Place",
        name: "Remote",
      },
    ],
  };
}

function createWebsiteSchema(lang: Lang): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: lang === "pt" ? "Portfólio de José Manoel Pereira" : "José Manoel Pereira Portfolio",
    url: canonicalFor(lang, ""),
    description: websiteDescriptions[lang],
    inLanguage: ["pt-BR", "en-US"],
    creator: {
      "@id": personId,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/${lang}/projects?query={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

function createBreadcrumbSchema(lang: Lang, items: BreadcrumbItem[]): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}/${lang}${item.path}`,
    })),
  };
}

function createFaqSchema(lang: Lang): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqEntries[lang].map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.answer,
      },
    })),
  };
}

function inferProgrammingLanguages(technologies: string[]): string[] {
  const set = new Set<string>();

  technologies.forEach((tech) => {
    const normalized = tech.toLowerCase();

    if (normalized.includes("laravel") || normalized.includes("php")) set.add("PHP");
    if (normalized.includes("node")) set.add("JavaScript");
    if (normalized.includes("typescript")) set.add("TypeScript");
    if (normalized.includes("sql") || normalized.includes("postgres") || normalized.includes("mysql")) {
      set.add("SQL");
    }
  });

  return Array.from(set);
}

function inferRuntimePlatforms(technologies: string[]): string[] {
  const set = new Set<string>();

  technologies.forEach((tech) => {
    const normalized = tech.toLowerCase();

    if (normalized.includes("node")) set.add("Node.js");
    if (normalized.includes("php") || normalized.includes("laravel")) set.add("PHP");
    if (normalized.includes("linux")) set.add("Linux VPS");
    if (normalized.includes("docker")) set.add("Docker");
    if (normalized.includes("mobile")) set.add("Android / iOS");
    if (normalized.includes("web")) set.add("Web Browser");
  });

  if (set.size === 0) {
    set.add("Web Browser");
  }

  return Array.from(set);
}

function createProjectSchema(lang: Lang, project: ProjectCaseStudy): JsonLdNode {
  const technologies = project.technologiesUsed[lang];
  const result: JsonLdNode = {
    "@context": "https://schema.org",
    "@type": ["SoftwareSourceCode", "SoftwareApplication"],
    name: project.name[lang],
    description: project.overview[lang],
    author: {
      "@id": personId,
    },
    programmingLanguage: inferProgrammingLanguages(technologies),
    runtimePlatform: inferRuntimePlatforms(technologies),
    keywords: project.seoKeywords[lang].join(", "),
    applicationCategory: "BusinessApplication",
    operatingSystem: "Windows, macOS, Linux, Android, iOS",
    about: project.problem[lang],
    audience: [
      {
        "@type": "Audience",
        audienceType: "Businesses",
      },
      {
        "@type": "Audience",
        audienceType: "Engineering teams",
      },
    ],
    url: canonicalFor(lang, `/projects/${project.slug}`),
  };

  if (project.dateCreated) {
    result.dateCreated = project.dateCreated;
  }

  if (project.dateModified) {
    result.dateModified = project.dateModified;
  }

  if (project.codeRepository) {
    result.codeRepository = project.codeRepository;
  }

  if (project.liveUrl) {
    result.sameAs = [project.liveUrl];
  }

  return result;
}

function createInsightArticleSchema(lang: Lang, insight: InsightArticle): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: insight.title[lang],
    description: insight.description[lang],
    author: {
      "@id": personId,
    },
    publisher: {
      "@id": websiteId,
    },
    datePublished: insight.datePublished,
    dateModified: insight.dateModified,
    inLanguage: lang === "pt" ? "pt-BR" : "en-US",
    articleSection: insight.tags[lang],
    keywords: insight.tags[lang].join(", "),
    mainEntityOfPage: canonicalFor(lang, `/insights/${insight.slug}`),
    url: canonicalFor(lang, `/insights/${insight.slug}`),
  };
}

export function buildLocaleLayoutMetadata(lang: Lang): Metadata {
  const seo = localizedSeo[lang];
  return {
    title: {
      default: seo.defaultTitle,
      template: seo.titleTemplate,
    },
    description: seo.description,
    robots: defaultRobots(),
    keywords: [...seo.keywords],
    alternates: {
      canonical: canonicalFor(lang, ""),
      languages: alternateLanguages(""),
    },
    openGraph: {
      type: "website",
      locale: seo.ogLocale,
      url: canonicalFor(lang, ""),
      title: seo.defaultTitle,
      description: seo.description,
      siteName: siteConfig.name,
      images: [
        {
          url: `${siteConfig.url}/og-cover.svg`,
          width: 1200,
          height: 630,
          alt: "José Manoel Pereira portfolio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.defaultTitle,
      description: seo.description,
      images: [`${siteConfig.url}/og-cover.svg`],
    },
  };
}

export function buildPageMetadata({
  lang,
  route,
  title,
  description,
  keywords,
  type = "website",
  noindex = false,
}: BuildPageMetadataInput): Metadata {
  const seo = localizedSeo[lang];
  const canonical = canonicalFor(lang, route);
  const pageKeywords = keywords ?? [...seo.keywords];

  return {
    title,
    description,
    robots: defaultRobots(noindex),
    keywords: pageKeywords,
    alternates: {
      canonical,
      languages: alternateLanguages(route),
    },
    openGraph: {
      type,
      locale: seo.ogLocale,
      url: canonical,
      title,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: `${siteConfig.url}/og-cover.svg`,
          width: 1200,
          height: 630,
          alt: "José Manoel Pereira portfolio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteConfig.url}/og-cover.svg`],
    },
  };
}

export function getFaqEntries(lang: Lang) {
  return faqEntries[lang];
}

export function generateStructuredData(
  lang: Lang,
  options: StructuredDataOptions = { page: "home" },
): JsonLdNode[] {
  const data: JsonLdNode[] = [];

  if (options.page === "home") {
    data.push(
      createPersonSchema(lang),
      createWebsiteSchema(lang),
      createFaqSchema(lang),
      createWorkHistorySchema(lang),
    );
  }

  if (options.breadcrumb && options.breadcrumb.length > 0) {
    data.push(createBreadcrumbSchema(lang, options.breadcrumb));
  }

  if (options.page === "project" && options.project) {
    data.push(createProjectSchema(lang, options.project));
  }

  if (options.page === "insight" && options.insight) {
    data.push(createInsightArticleSchema(lang, options.insight));
  }

  return data;
}
