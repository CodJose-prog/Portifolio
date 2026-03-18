type Locale = "pt" | "en";
type LocalizedString = Record<Locale, string>;
type LocalizedStringArray = Record<Locale, string[]>;

export type ProfileMetric = {
  value: string;
  label: LocalizedString;
  detail: LocalizedString;
};

export type SpecialtyGroup = {
  title: LocalizedString;
  items: LocalizedStringArray;
};

export type Differentiator = {
  title: LocalizedString;
  description: LocalizedString;
};

export type ContactChannel = {
  label: LocalizedString;
  href: string;
  value: string;
};

export const profile = {
  name: "José Manoel Pereira",
  role: {
    pt: "Backend Engineer",
    en: "Backend Engineer",
  } satisfies LocalizedString,
  location: {
    pt: "Santarém, PA - Brasil",
    en: "Santarém, Pará - Brazil",
  } satisfies LocalizedString,
  phone: "+55 93 99227-3046",
  email: "joseneto190306@gmail.com",
  linkedin: "https://linkedin.com/in/jose-manoel-dev",
  github: "https://github.com/CodJose-prog",
  summary: {
    pt: "Backend Engineer com foco em APIs, arquitetura e operação de sistemas reais.",
    en: "Backend Engineer focused on APIs, architecture, and real production systems.",
  } satisfies LocalizedString,
  hero: {
    badge: {
      pt: "Backend Engineer • Laravel • Node.js • APIs",
      en: "Backend Engineer • Laravel • Node.js • APIs",
    } satisfies LocalizedString,
    headline: {
      pt: "Backend Engineer focado em Laravel, Node.js, APIs e escala",
      en: "Backend Engineer focused on Laravel, Node.js, APIs, and scale",
    } satisfies LocalizedString,
    subheadline: {
      pt: "SaaS multi-tenant, PostgreSQL, Docker, CI/CD e integrações para sistemas em produção.",
      en: "Multi-tenant SaaS, PostgreSQL, Docker, CI/CD, and integrations for production systems.",
    } satisfies LocalizedString,
    availability: {
      pt: "Também construo software ponta a ponta quando o projeto exige.",
      en: "I also build end-to-end software when the project demands it.",
    } satisfies LocalizedString,
  },
  metrics: [
    {
      value: "13",
      label: {
        pt: "tenants ativos",
        en: "active tenants",
      },
      detail: {
        pt: "ArenaCalendar em operação real.",
        en: "ArenaCalendar in real operation.",
      },
    },
    {
      value: "100%",
      label: {
        pt: "isolamento entre tenants",
        en: "tenant isolation",
      },
      detail: {
        pt: "RLS aplicada ao ambiente multi-tenant.",
        en: "RLS applied to a multi-tenant environment.",
      },
    },
    {
      value: "~70%",
      label: {
        pt: "ganho em deploy",
        en: "faster deploys",
      },
      detail: {
        pt: "De até 5 min para 40-90s.",
        en: "From up to 5 min to 40-90s.",
      },
    },
    {
      value: "5",
      label: {
        pt: "clientes backend",
        en: "backend clients",
      },
      detail: {
        pt: "APIs e integrações entregues na MAVIK.",
        en: "APIs and integrations delivered at MAVIK.",
      },
    },
  ] satisfies ProfileMetric[],
  trajectory: {
    eyebrow: {
      pt: "Trajetória",
      en: "Trajectory",
    } satisfies LocalizedString,
    title: {
      pt: "Base prática, foco atual em backend",
      en: "Practical foundation, current backend focus",
    } satisfies LocalizedString,
    intro: {
      pt: "Comecei construindo software ponta a ponta e hoje concentro minha energia em backend, arquitetura, dados e operação.",
      en: "I started building end-to-end software and now focus my energy on backend, architecture, data, and operations.",
    } satisfies LocalizedString,
    paragraphs: {
      pt: [
        "Atuo com APIs REST, multi-tenant, SQL, Docker, Linux e CI/CD.",
        "Quando o projeto pede, também entrego web, mobile, integrações e automações com IA.",
      ],
      en: [
        "I work with REST APIs, multi-tenant systems, SQL, Docker, Linux, and CI/CD.",
        "When the project requires it, I also deliver web, mobile, integrations, and AI automations.",
      ],
    } satisfies LocalizedStringArray,
    currentFocus: {
      pt: [
        "Laravel e Node.js para APIs e serviços",
        "SaaS multi-tenant com PostgreSQL RLS",
        "Deploy, Docker e rotinas de CI/CD",
        "Integrações externas e automação com IA",
      ],
      en: [
        "Laravel and Node.js for APIs and services",
        "Multi-tenant SaaS with PostgreSQL RLS",
        "Deployment, Docker, and CI/CD routines",
        "External integrations and AI automation",
      ],
    } satisfies LocalizedStringArray,
  },
  specialtyGroups: [
    {
      title: {
        pt: "Backend",
        en: "Backend",
      },
      items: {
        pt: [
          "Laravel, Node.js e TypeScript",
          "APIs REST e autenticação",
          "Regras de negócio e organização de domínio",
        ],
        en: [
          "Laravel, Node.js, and TypeScript",
          "REST APIs and authentication",
          "Business rules and domain organization",
        ],
      },
    },
    {
      title: {
        pt: "Banco de Dados",
        en: "Databases",
      },
      items: {
        pt: [
          "PostgreSQL com RLS",
          "MySQL e modelagem relacional",
          "Otimização de consultas SQL",
        ],
        en: [
          "PostgreSQL with RLS",
          "MySQL and relational modeling",
          "SQL query optimization",
        ],
      },
    },
    {
      title: {
        pt: "Infraestrutura",
        en: "Infrastructure",
      },
      items: {
        pt: [
          "Docker e GitHub Actions",
          "Linux, VPS e Nginx",
          "Deploy e manutenção em produção",
        ],
        en: [
          "Docker and GitHub Actions",
          "Linux, VPS, and Nginx",
          "Deployment and production maintenance",
        ],
      },
    },
    {
      title: {
        pt: "Arquitetura",
        en: "Architecture",
      },
      items: {
        pt: [
          "SaaS multi-tenant",
          "Clean Architecture e Design Patterns",
          "Integrações e evolução sustentável",
        ],
        en: [
          "Multi-tenant SaaS",
          "Clean Architecture and Design Patterns",
          "Integrations and sustainable evolution",
        ],
      },
    },
  ] satisfies SpecialtyGroup[],
  differentiators: [
    {
      title: {
        pt: "SaaS próprio",
        en: "Own SaaS",
      },
      description: {
        pt: "Experiência real de produto, backend e operação.",
        en: "Real product, backend, and operations experience.",
      },
    },
    {
      title: {
        pt: "Multi-tenant com RLS",
        en: "Multi-tenant with RLS",
      },
      description: {
        pt: "Isolamento de dados aplicado em produção.",
        en: "Production-grade data isolation.",
      },
    },
    {
      title: {
        pt: "APIs e integrações",
        en: "APIs and integrations",
      },
      description: {
        pt: "Serviços conectados a operação real.",
        en: "Services connected to real operations.",
      },
    },
    {
      title: {
        pt: "Entrega com engenharia",
        en: "Engineering-minded delivery",
      },
      description: {
        pt: "Docker, Linux e CI/CD como parte do produto.",
        en: "Docker, Linux, and CI/CD as part of the product.",
      },
    },
  ] satisfies Differentiator[],
  contactChannels: [
    {
      label: {
        pt: "E-mail",
        en: "Email",
      },
      href: "mailto:joseneto190306@gmail.com",
      value: "joseneto190306@gmail.com",
    },
    {
      label: {
        pt: "LinkedIn",
        en: "LinkedIn",
      },
      href: "https://linkedin.com/in/jose-manoel-dev",
      value: "linkedin.com/in/jose-manoel-dev",
    },
    {
      label: {
        pt: "GitHub",
        en: "GitHub",
      },
      href: "https://github.com/CodJose-prog",
      value: "github.com/CodJose-prog",
    },
    {
      label: {
        pt: "WhatsApp",
        en: "WhatsApp",
      },
      href: "https://wa.me/5593992273046?text=Ol%C3%A1%2C%20Jos%C3%A9.%20Vi%20seu%20portf%C3%B3lio%20e%20quero%20conversar%20sobre%20um%20projeto.",
      value: "+55 93 99227-3046",
    },
  ] satisfies ContactChannel[],
  projectFit: {
    pt: [
      "APIs e serviços backend",
      "Sistemas Laravel e Node.js",
      "SaaS multi-tenant e integrações",
      "Deploy, performance e confiabilidade",
    ],
    en: [
      "APIs and backend services",
      "Laravel and Node.js systems",
      "Multi-tenant SaaS and integrations",
      "Deployment, performance, and reliability",
    ],
  } satisfies LocalizedStringArray,
};
