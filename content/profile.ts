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
    pt: "Engenheiro de software com foco em backend, APIs e arquitetura de sistemas. Atuo com Laravel, Node.js, PostgreSQL, Docker e CI/CD para construir produtos robustos, integrações confiáveis e operações preparadas para escala.",
    en: "Software engineer focused on backend, APIs, and systems architecture. I work with Laravel, Node.js, PostgreSQL, Docker, and CI/CD to build robust products, reliable integrations, and operations prepared for scale.",
  } satisfies LocalizedString,
  hero: {
    badge: {
      pt: "Backend Engineer • Laravel • Node.js • APIs",
      en: "Backend Engineer • Laravel • Node.js • APIs",
    } satisfies LocalizedString,
    headline: {
      pt: "Backend Engineer focado em Laravel, Node.js, APIs e sistemas escaláveis",
      en: "Backend Engineer focused on Laravel, Node.js, APIs, and scalable systems",
    } satisfies LocalizedString,
    subheadline: {
      pt: "Experiência prática em SaaS multi-tenant, arquitetura backend, PostgreSQL, Docker, CI/CD e integração de serviços para sistemas reais em produção.",
      en: "Hands-on experience with multi-tenant SaaS, backend architecture, PostgreSQL, Docker, CI/CD, and service integration for real production systems.",
    } satisfies LocalizedString,
    availability: {
      pt: "Disponível para evoluir produtos, APIs e plataformas internas com base sólida de engenharia.",
      en: "Available to evolve products, APIs, and internal platforms with solid engineering foundations.",
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
        pt: "ArenaCalendar operando com fluxos reais de autenticação, reservas e gestão.",
        en: "ArenaCalendar running real authentication, booking, and management flows.",
      },
    },
    {
      value: "100%",
      label: {
        pt: "isolamento entre tenants",
        en: "tenant isolation coverage",
      },
      detail: {
        pt: "Políticas com PostgreSQL RLS aplicadas às operações multi-tenant.",
        en: "PostgreSQL RLS policies applied to multi-tenant operations.",
      },
    },
    {
      value: "~70%",
      label: {
        pt: "ganho em deploy",
        en: "faster deployments",
      },
      detail: {
        pt: "Publicações reduzidas de até 5 minutos para cerca de 40-90 segundos.",
        en: "Deploy time reduced from up to 5 minutes to roughly 40-90 seconds.",
      },
    },
    {
      value: "5",
      label: {
        pt: "clientes backend atendidos",
        en: "backend clients served",
      },
      detail: {
        pt: "Na MAVIK, com APIs, integrações e sistemas sob medida.",
        en: "At MAVIK, with APIs, integrations, and tailored systems.",
      },
    },
  ] satisfies ProfileMetric[],
  trajectory: {
    eyebrow: {
      pt: "Trajetória",
      en: "Trajectory",
    } satisfies LocalizedString,
    title: {
      pt: "Da base técnica ao foco claro em engenharia backend",
      en: "From technical foundations to a clear backend engineering focus",
    } satisfies LocalizedString,
    intro: {
      pt: "Minha trajetória combina formação técnica, construção de produtos reais e participação direta em decisões de arquitetura. Saí de uma base generalista de desenvolvimento para atuar com mais profundidade em backend, integrações, dados e operação em produção.",
      en: "My path combines technical education, real product building, and direct participation in architecture decisions. I moved from a generalist development foundation to deeper work in backend, integrations, data, and production operations.",
    } satisfies LocalizedString,
    paragraphs: {
      pt: [
        "Hoje meu posicionamento é claro: construir backend confiável para sistemas que precisam escalar, integrar serviços e sustentar operações reais.",
        "Tenho experiência com APIs REST, autenticação, multi-tenant, otimização de consultas, deploy automatizado em Linux, ambientes com Docker e pipelines de CI/CD.",
        "Também aplico IA de forma prática em automações e fluxos internos quando isso melhora eficiência operacional sem comprometer previsibilidade.",
      ],
      en: [
        "Today my positioning is clear: build reliable backend for systems that need to scale, integrate services, and sustain real operations.",
        "I have experience with REST APIs, authentication, multi-tenant setups, query optimization, automated Linux deployments, Docker-based environments, and CI/CD pipelines.",
        "I also apply AI pragmatically to internal automations and workflows when it improves operational efficiency without compromising predictability.",
      ],
    } satisfies LocalizedStringArray,
    currentFocus: {
      pt: [
        "Laravel e Node.js para APIs e serviços backend",
        "SaaS multi-tenant com PostgreSQL e RLS",
        "Deploy, observabilidade e rotinas de CI/CD",
        "Integrações com APIs externas e automações orientadas a negócio",
      ],
      en: [
        "Laravel and Node.js for APIs and backend services",
        "Multi-tenant SaaS with PostgreSQL and RLS",
        "Deployment, observability, and CI/CD routines",
        "External API integrations and business-oriented automations",
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
          "PHP (Laravel), Node.js e TypeScript",
          "Desenvolvimento de APIs REST",
          "Autenticação com JWT e Sanctum",
          "Regras de negócio, refatoração e organização de domínio",
        ],
        en: [
          "PHP (Laravel), Node.js, and TypeScript",
          "REST API development",
          "Authentication with JWT and Sanctum",
          "Business rules, refactoring, and domain organization",
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
          "PostgreSQL com RLS e foco em performance",
          "MySQL para sistemas operacionais e legado",
          "Modelagem relacional e otimização de consultas SQL",
        ],
        en: [
          "PostgreSQL with RLS and performance focus",
          "MySQL for operational systems and legacy workloads",
          "Relational modeling and SQL query optimization",
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
          "Docker para ambientes consistentes",
          "CI/CD com GitHub Actions",
          "Linux Ubuntu, VPS e Nginx",
          "Deploy automatizado e manutenção em produção",
        ],
        en: [
          "Docker for consistent environments",
          "CI/CD with GitHub Actions",
          "Linux Ubuntu, VPS, and Nginx",
          "Automated deployment and production maintenance",
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
          "System Design orientado a escalabilidade",
          "Separação de responsabilidades e evolução sustentável",
        ],
        en: [
          "Multi-tenant SaaS",
          "Clean Architecture and Design Patterns",
          "Scalability-oriented system design",
          "Separation of concerns and sustainable evolution",
        ],
      },
    },
    {
      title: {
        pt: "Integrações e Automação",
        en: "Integrations and Automation",
      },
      items: {
        pt: [
          "Consumo e integração de APIs externas",
          "Automação com IA aplicada a rotinas operacionais",
          "Testes com Jest e PHPUnit em nível básico",
          "Redis em estudo e aplicação prática",
        ],
        en: [
          "Consumption and integration of external APIs",
          "AI-driven automation for operational routines",
          "Basic automated testing with Jest and PHPUnit",
          "Redis in study and practical use",
        ],
      },
    },
  ] satisfies SpecialtyGroup[],
  differentiators: [
    {
      title: {
        pt: "SaaS próprio com visão de produto",
        en: "Own SaaS with product vision",
      },
      description: {
        pt: "Experiência construindo e operando o ArenaCalendar, com decisões de arquitetura, deploy e evolução contínua do backend.",
        en: "Experience building and operating ArenaCalendar, including architecture, deployment, and continuous backend evolution.",
      },
    },
    {
      title: {
        pt: "Multi-tenant com PostgreSQL RLS",
        en: "Multi-tenant with PostgreSQL RLS",
      },
      description: {
        pt: "Isolamento de dados aplicado em produção para proteger contexto entre tenants sem depender só da camada de aplicação.",
        en: "Production-grade data isolation protecting tenant context beyond application-layer checks alone.",
      },
    },
    {
      title: {
        pt: "APIs e integrações que resolvem operação",
        en: "APIs and integrations that solve operations",
      },
      description: {
        pt: "Experiência criando APIs REST, conectando serviços externos e reduzindo processos manuais em sistemas reais.",
        en: "Experience building REST APIs, connecting external services, and reducing manual processes in real systems.",
      },
    },
    {
      title: {
        pt: "Infra e entrega com viés de engenharia",
        en: "Infra and delivery with an engineering mindset",
      },
      description: {
        pt: "Deploy automatizado, Docker, Linux, Nginx e CI/CD tratados como parte do produto, não como etapa posterior.",
        en: "Automated deployment, Docker, Linux, Nginx, and CI/CD treated as part of the product, not an afterthought.",
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
      "APIs e serviços backend para novos produtos",
      "Evolução de sistemas Laravel e Node.js já em produção",
      "SaaS multi-tenant, autenticação e isolamento de dados",
      "Integrações com APIs externas, automações e rotinas operacionais",
      "Ajustes de performance, deploy e confiabilidade de ambiente",
    ],
    en: [
      "APIs and backend services for new products",
      "Evolution of Laravel and Node.js systems already in production",
      "Multi-tenant SaaS, authentication, and data isolation",
      "External API integrations, automations, and operational workflows",
      "Performance, deployment, and environment reliability improvements",
    ],
  } satisfies LocalizedStringArray,
};
