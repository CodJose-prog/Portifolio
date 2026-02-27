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
    defaultTitle: "José Manoel Pereira | Desenvolvedor Full Stack e Engenheiro de Software",
    description:
      "Desenvolvedor Full Stack com experiência em liderança técnica, arquitetura SaaS multi-tenant e integração de sistemas complexos.",
    keywords: [
      "Desenvolvedor Full Stack",
      "Engenheiro de Software",
      "Laravel",
      "Vue.js",
      "Next.js",
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "MySQL",
      "Docker",
    ],
    ogLocale: "pt_BR",
  },
  en: {
    titleTemplate: "%s | José Manoel Pereira",
    defaultTitle: "José Manoel Pereira | Full Stack Developer and Software Engineer",
    description:
      "Full Stack Developer with experience in technical leadership, multi-tenant SaaS architecture, and complex systems integration.",
    keywords: [
      "Full Stack Developer",
      "Software Engineer",
      "Laravel",
      "Vue.js",
      "Next.js",
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "MySQL",
      "Docker",
    ],
    ogLocale: "en_US",
  },
} as const;

const personId = `${siteConfig.url}#person`;
const websiteId = `${siteConfig.url}#website`;

const personDescriptions: Record<Lang, string> = {
  pt: "Desenvolvedor Full Stack com experiência em liderança técnica de projetos e empreendedorismo de software. Especialista na arquitetura de soluções SaaS multi-tenant escaláveis utilizando o ecossistema PHP (Laravel) e JavaScript (Vue.js). Focado em boas práticas de engenharia de software, documentação técnica, Design Patterns e integração de sistemas complexos. Ativo em comunidades de tecnologia.",
  en: "Full Stack Developer with experience in technical leadership and software entrepreneurship. Specialized in architecting scalable multi-tenant SaaS solutions using the PHP ecosystem (Laravel) and JavaScript (Vue.js). Focused on software engineering best practices, technical documentation, design patterns, and complex system integration. Active in technology communities.",
};

const websiteDescriptions: Record<Lang, string> = {
  pt: "Portfólio técnico de José Manoel Pereira com foco em desenvolvimento full stack, arquitetura de software e entrega em produção.",
  en: "Technical portfolio of José Manoel Pereira focused on full stack development, software architecture, and production delivery.",
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
      question: "O que você faz hoje?",
      answer:
        "Atuo como Desenvolvedor Full Stack e Engenheiro de Software em produtos web. Projeto arquitetura, construo frontend e backend, e entrego em produção com foco em clareza técnica.",
    },
    {
      question: "Qual é sua stack principal?",
      answer:
        "Trabalho com PHP/Laravel, JavaScript (Node.js), TypeScript, Java, Python, Vue.js, React/Next.js, Tailwind CSS, PostgreSQL, MySQL, Docker, Linux e CI/CD com GitHub Actions.",
    },
    {
      question: "Você atende remoto?",
      answer:
        "Sim. Atendo remoto para empresas no Brasil e no exterior, incluindo times dos Estados Unidos. A colaboração é objetiva, com comunicação direta e entregas iterativas.",
    },
    {
      question: "Quais projetos você costuma assumir?",
      answer:
        "Assumo web apps, sistemas internos, APIs, integrações e automações de processo. Também atuo em modernização de sistemas legados.",
    },
    {
      question: "Você trabalha com LLM e Prompt Engineering?",
      answer:
        "Sim, quando há necessidade real de produto. Estruturo prompts, validação de saída e integração de APIs para manter previsibilidade e segurança operacional.",
    },
  ],
  en: [
    {
      question: "What do you do?",
      answer:
        "I work as a Full Stack Developer and Software Engineer building web products. I handle architecture, frontend, backend, and production delivery with a strong focus on technical clarity.",
    },
    {
      question: "What is your main stack?",
      answer:
        "I work with PHP/Laravel, JavaScript (Node.js), TypeScript, Java, Python, Vue.js, React/Next.js, Tailwind CSS, PostgreSQL, MySQL, Docker, Linux, and CI/CD with GitHub Actions.",
    },
    {
      question: "Do you work remotely?",
      answer:
        "Yes. I work remotely with companies in Brazil and internationally, including US teams. Collaboration is direct, async-friendly, and delivery-oriented.",
    },
    {
      question: "What kinds of projects do you take?",
      answer:
        "I take on web apps, internal systems, APIs, integrations, and process automation. I also work on legacy modernization projects.",
    },
    {
      question: "Do you work with LLM and Prompt Engineering?",
      answer:
        "Yes, when it solves a real product need. I design prompts, output validation, and API orchestration to keep behavior predictable in production.",
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
      "Full Stack Development",
      "Software Engineering",
      "Laravel",
      "Vue.js",
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "Java",
      "Python",
      "PostgreSQL",
      "MySQL",
      "Docker",
      "CI/CD",
      "Linux",
      "Nginx",
      "Apache",
      "SaaS Multi-tenant Architecture",
      "PostgreSQL RLS",
    ],
    skills: [
      "PHP 8+ (Laravel ecosystem)",
      "JavaScript (Node.js)",
      "TypeScript",
      "Java",
      "Python",
      "Vue.js (Inertia.js, Composition API)",
      "React.js (Next.js)",
      "Tailwind CSS",
      "Docker",
      "CI/CD (GitHub Actions)",
      "Linux (Ubuntu / Debian)",
      "Nginx / Apache",
      "VPS management",
      "PostgreSQL (optimization and RLS)",
      "MySQL",
      "Relational modeling",
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
    availableLanguage: [
      {
        "@type": "Language",
        name: "Portuguese",
      },
      {
        "@type": "Language",
        name: "English",
      },
    ],
    nationality: {
      "@type": "Country",
      name: "Brazil",
    },
    areaServed: [
      {
        "@type": "Country",
        name: "Brazil",
      },
      {
        "@type": "Country",
        name: "United States",
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
    if (normalized.includes("typescript")) set.add("TypeScript");

    if (
      normalized.includes("vue") ||
      normalized.includes("react") ||
      normalized.includes("next.js") ||
      normalized.includes("nextjs") ||
      normalized.includes("inertia")
    ) {
      set.add("JavaScript");
    }

    if (normalized.includes("python")) set.add("Python");
    if (normalized.includes("java")) set.add("Java");
    if (normalized.includes("sql") || normalized.includes("postgres") || normalized.includes("mysql")) {
      set.add("SQL");
    }
  });

  return Array.from(set);
}

function inferRuntimePlatforms(technologies: string[]): string[] {
  const set = new Set<string>();
  set.add("Web Browser");

  technologies.forEach((tech) => {
    const normalized = tech.toLowerCase();

    if (normalized.includes("node")) set.add("Node.js");
    if (normalized.includes("php") || normalized.includes("laravel")) set.add("PHP");
    if (normalized.includes("linux")) set.add("Linux VPS");
    if (normalized.includes("docker")) set.add("Docker");
  });

  return Array.from(set);
}

function createProjectSchema(lang: Lang, project: ProjectCaseStudy): JsonLdNode {
  const technologies = project.technologies_used[lang];
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
    keywords: project.seo_keywords[lang].join(", "),
    applicationCategory: "BusinessApplication",
    operatingSystem: "Windows, macOS, Linux, Android, iOS",
    about: project.problem[lang],
    audience: [
      {
        "@type": "Audience",
        audienceType: "Developers",
      },
      {
        "@type": "Audience",
        audienceType: "Businesses",
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
