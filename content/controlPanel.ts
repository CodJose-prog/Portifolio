export type Locale = "pt" | "en";
type LocalizedString = Record<Locale, string>;

type ServiceSignal = {
  name: LocalizedString;
  status: LocalizedString;
  detail: LocalizedString;
};

type ModuleLink = {
  title: LocalizedString;
  summary: LocalizedString;
  href: string;
  status: LocalizedString;
};

type StackGroup = {
  title: LocalizedString;
  items: Record<Locale, string[]>;
};

type PageCopy = {
  eyebrow: LocalizedString;
  title: LocalizedString;
  description: LocalizedString;
};

export const controlPanelContent = {
  home: {
    intro: {
      pt: "Control center para recrutadores, clientes e times que precisam entender valor tecnico em segundos.",
      en: "Control center for recruiters, clients, and teams who need to understand technical value in seconds.",
    } satisfies LocalizedString,
    commandDeckTitle: {
      pt: "System overview",
      en: "System overview",
    } satisfies LocalizedString,
    commandDeckDescription: {
      pt: "Backend-first, operacao real, capacidade full stack quando o produto exige.",
      en: "Backend-first, real operations, full stack capability when the product requires it.",
    } satisfies LocalizedString,
    statusLabel: {
      pt: "Sistema profissional online",
      en: "Professional system online",
    } satisfies LocalizedString,
    statusValue: {
      pt: "Shipping backend, APIs e arquitetura",
      en: "Shipping backend, APIs, and architecture",
    } satisfies LocalizedString,
    heroHighlights: {
      pt: [
        "Experiencia pratica em SaaS, APIs, multi-tenant e integracoes.",
        "Atuacao forte em Laravel, Node.js, TypeScript e bancos relacionais.",
        "Entrega ponta a ponta quando o escopo pede web, mobile e operacao conectada.",
      ],
      en: [
        "Hands-on experience with SaaS, APIs, multi-tenant systems, and integrations.",
        "Strong execution with Laravel, Node.js, TypeScript, and relational databases.",
        "End-to-end delivery when scope requires web, mobile, and connected operations.",
      ],
    } as Record<Locale, string[]>,
    systemSignals: [
      {
        name: {
          pt: "APIs",
          en: "APIs",
        },
        status: {
          pt: "Running",
          en: "Running",
        },
        detail: {
          pt: "Laravel e Node.js para fluxos centrais, autenticacao e integracoes.",
          en: "Laravel and Node.js for core flows, authentication, and integrations.",
        },
      },
      {
        name: {
          pt: "Multi-tenant engine",
          en: "Multi-tenant engine",
        },
        status: {
          pt: "Active",
          en: "Active",
        },
        detail: {
          pt: "ArenaCalendar com PostgreSQL RLS e isolamento de tenant aplicado.",
          en: "ArenaCalendar with PostgreSQL RLS and applied tenant isolation.",
        },
      },
      {
        name: {
          pt: "CI/CD",
          en: "CI/CD",
        },
        status: {
          pt: "Deployed",
          en: "Deployed",
        },
        detail: {
          pt: "Pipelines, Docker, Linux VPS e deploys curtos em producao.",
          en: "Pipelines, Docker, Linux VPS, and short production deployments.",
        },
      },
      {
        name: {
          pt: "Integrations",
          en: "Integrations",
        },
        status: {
          pt: "Online",
          en: "Online",
        },
        detail: {
          pt: "APIs externas, automacoes e fluxos com IA aplicados quando agregam valor.",
          en: "External APIs, automations, and AI flows applied when they add value.",
        },
      },
      {
        name: {
          pt: "Database layer",
          en: "Database layer",
        },
        status: {
          pt: "Optimized",
          en: "Optimized",
        },
        detail: {
          pt: "PostgreSQL, MySQL e SQL tuning para ambientes reais.",
          en: "PostgreSQL, MySQL, and SQL tuning for real environments.",
        },
      },
      {
        name: {
          pt: "Architecture",
          en: "Architecture",
        },
        status: {
          pt: "Scalable",
          en: "Scalable",
        },
        detail: {
          pt: "Contexto, dominio, padroes, manutencao e evolucao sustentavel.",
          en: "Context, domain, patterns, maintainability, and sustainable evolution.",
        },
      },
    ] satisfies ServiceSignal[],
    modules: [
      {
        title: {
          pt: "Overview",
          en: "Overview",
        },
        summary: {
          pt: "Posicionamento, status e sinais principais do sistema profissional.",
          en: "Positioning, status, and the main signals of the professional system.",
        },
        href: "#overview",
        status: {
          pt: "Primary panel",
          en: "Primary panel",
        },
      },
      {
        title: {
          pt: "Experience",
          en: "Experience",
        },
        summary: {
          pt: "Deployment history com contexto, stack e impacto escaneavel.",
          en: "Deployment history with context, stack, and scannable impact.",
        },
        href: "#experience",
        status: {
          pt: "Live records",
          en: "Live records",
        },
      },
      {
        title: {
          pt: "Projects",
          en: "Projects",
        },
        summary: {
          pt: "Cases com foco em backend, arquitetura e resultado tecnico.",
          en: "Case studies focused on backend, architecture, and technical results.",
        },
        href: "#projects",
        status: {
          pt: "Value mapped",
          en: "Value mapped",
        },
      },
      {
        title: {
          pt: "Golden Project",
          en: "Golden Project",
        },
        summary: {
          pt: "Case premium da MAVIK com API central, web e mobile conectados.",
          en: "MAVIK premium case with a central API, web, and mobile connected.",
        },
        href: "/projects/frigorifico-tracking",
        status: {
          pt: "Featured system",
          en: "Featured system",
        },
      },
      {
        title: {
          pt: "MAVIK",
          en: "MAVIK",
        },
        summary: {
          pt: "Modulo institucional da software house e porta de entrada comercial.",
          en: "Institutional module for the software house and commercial entry point.",
        },
        href: "#mavik",
        status: {
          pt: "Business module",
          en: "Business module",
        },
      },
      {
        title: {
          pt: "Stack",
          en: "Stack",
        },
        summary: {
          pt: "Mapa de backend, dados, infra, arquitetura e ferramentas de suporte.",
          en: "Map of backend, data, infra, architecture, and supporting tools.",
        },
        href: "#stack",
        status: {
          pt: "Core services",
          en: "Core services",
        },
      },
      {
        title: {
          pt: "Contact",
          en: "Contact",
        },
        summary: {
          pt: "Canais diretos para contratacao, networking e projetos sob medida.",
          en: "Direct channels for hiring, networking, and tailored projects.",
        },
        href: "#contact",
        status: {
          pt: "Open channel",
          en: "Open channel",
        },
      },
    ] satisfies ModuleLink[],
    stackGroups: [
      {
        title: {
          pt: "Backend",
          en: "Backend",
        },
        items: {
          pt: [
            "Laravel, Node.js e TypeScript",
            "APIs REST, JWT e Sanctum",
            "Regras de negocio, dominio e integracoes externas",
          ],
          en: [
            "Laravel, Node.js, and TypeScript",
            "REST APIs, JWT, and Sanctum",
            "Business rules, domain structure, and external integrations",
          ],
        },
      },
      {
        title: {
          pt: "Database",
          en: "Database",
        },
        items: {
          pt: [
            "PostgreSQL com RLS e contexto multi-tenant",
            "MySQL, modelagem relacional e SQL tuning",
            "Redis em estudo e aplicacao pratica",
          ],
          en: [
            "PostgreSQL with RLS and multi-tenant context",
            "MySQL, relational modeling, and SQL tuning",
            "Redis in active study and practical use",
          ],
        },
      },
      {
        title: {
          pt: "Infrastructure",
          en: "Infrastructure",
        },
        items: {
          pt: [
            "Docker, Linux, VPS e Nginx",
            "GitHub Actions e rotinas de CI/CD",
            "Deploy, monitoramento e manutencao em producao",
          ],
          en: [
            "Docker, Linux, VPS, and Nginx",
            "GitHub Actions and CI/CD routines",
            "Deployment, monitoring, and production maintenance",
          ],
        },
      },
      {
        title: {
          pt: "Architecture",
          en: "Architecture",
        },
        items: {
          pt: [
            "SaaS multi-tenant",
            "Clean Architecture e Design Patterns",
            "Performance, testes automatizados basicos e evolucao sustentavel",
          ],
          en: [
            "Multi-tenant SaaS",
            "Clean Architecture and Design Patterns",
            "Performance, basic automated tests, and sustainable evolution",
          ],
        },
      },
      {
        title: {
          pt: "Other / Tools",
          en: "Other / Tools",
        },
        items: {
          pt: [
            "Capacidade full stack quando o projeto exige",
            "Web, mobile e paineis conectados ao backend",
            "Automacoes com IA e fluxos orientados a produto",
          ],
          en: [
            "Full stack capability when the project requires it",
            "Web, mobile, and dashboards connected to the backend",
            "AI automations and product-oriented workflows",
          ],
        },
      },
    ] satisfies StackGroup[],
    pages: {
      about: {
        eyebrow: {
          pt: "Operator profile",
          en: "Operator profile",
        },
        title: {
          pt: "Trajetoria, formacao e criterio tecnico por tras do painel",
          en: "Career path, education, and technical judgment behind the panel",
        },
        description: {
          pt: "Resumo da evolucao de Jose Manoel saindo de entregas ponta a ponta para um foco cada vez mais forte em backend, arquitetura e operacao.",
          en: "Summary of Jose Manoel's evolution from end-to-end delivery to an increasingly strong focus on backend, architecture, and operations.",
        },
      } satisfies PageCopy,
      projects: {
        eyebrow: {
          pt: "Case registry",
          en: "Case registry",
        },
        title: {
          pt: "Projetos e historico operacional organizados como um backend control center",
          en: "Projects and operational history organized as a backend control center",
        },
        description: {
          pt: "Cases priorizados por valor tecnico, contexto de negocio e tipo de sistema entregue.",
          en: "Case studies prioritized by technical value, business context, and system type delivered.",
        },
      } satisfies PageCopy,
      contact: {
        eyebrow: {
          pt: "Open channel",
          en: "Open channel",
        },
        title: {
          pt: "Contato direto para backend, arquitetura, integracoes e software sob medida",
          en: "Direct contact for backend, architecture, integrations, and tailored software",
        },
        description: {
          pt: "Canal rapido para oportunidades, contratacao via MAVIK ou conversas tecnicas sobre produto e operacao.",
          en: "Fast channel for opportunities, hiring through MAVIK, or technical conversations about product and operations.",
        },
      } satisfies PageCopy,
    },
    finalPrompt: {
      pt: "Pronto para conversar sobre APIs, SaaS, operacao real ou uma nova solucao sob medida.",
      en: "Ready to talk about APIs, SaaS, real operations, or a new tailored solution.",
    } satisfies LocalizedString,
  },
} as const;
