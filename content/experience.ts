type Locale = "pt" | "en";
type LocalizedString = Record<Locale, string>;
type LocalizedStringArray = Record<Locale, string[]>;

export type ExperienceEntry = {
  id: string;
  company: string;
  context: LocalizedString;
  role: LocalizedString;
  period: LocalizedString;
  startDate: string;
  endDate?: string;
  summary: LocalizedString;
  responsibilities: LocalizedStringArray;
  stack: LocalizedStringArray;
  projectSlug?: string;
  liveUrl?: string;
};

export type EducationEntry = {
  degree: LocalizedString;
  institution: string;
  completion: LocalizedString;
};

export type CertificationEntry = {
  title: string;
};

export const experience: ExperienceEntry[] = [
  {
    id: "arenacalendar",
    company: "ArenaCalendar",
    context: {
      pt: "SaaS próprio",
      en: "Own SaaS",
    },
    role: {
      pt: "Engenheiro de Software Backend",
      en: "Backend Software Engineer",
    },
    period: {
      pt: "Jan 2026 - Atual",
      en: "Jan 2026 - Present",
    },
    startDate: "2026-01",
    summary: {
      pt: "Backend de SaaS multi-tenant em produção.",
      en: "Production multi-tenant SaaS backend.",
    },
    responsibilities: {
      pt: [
        "APIs REST para autenticação, usuários e reservas.",
        "PostgreSQL RLS com 100% de isolamento entre tenants.",
        "Deploy em 40-90s com CI/CD em VPS Linux.",
        "SQL otimizado e automações com IA.",
      ],
      en: [
        "REST APIs for authentication, users, and bookings.",
        "PostgreSQL RLS with 100% tenant isolation.",
        "40-90s deployment flow with CI/CD on Linux VPS.",
        "Optimized SQL and AI-driven automations.",
      ],
    },
    stack: {
      pt: ["Laravel", "PHP", "PostgreSQL", "Docker", "GitHub Actions", "Linux"],
      en: ["Laravel", "PHP", "PostgreSQL", "Docker", "GitHub Actions", "Linux"],
    },
    projectSlug: "arena-calendar",
    liveUrl: "https://arena-calendar.com",
  },
  {
    id: "mavik",
    company: "MAVIK",
    context: {
      pt: "Agência própria",
      en: "Own agency",
    },
    role: {
      pt: "Desenvolvedor Backend",
      en: "Backend Developer",
    },
    period: {
      pt: "Nov 2025 - Atual",
      en: "Nov 2025 - Present",
    },
    startDate: "2025-11",
    summary: {
      pt: "APIs e serviços backend entregues pela MAVIK para clientes reais.",
      en: "APIs and backend services delivered by MAVIK for real clients.",
    },
    responsibilities: {
      pt: [
        "Backend e APIs REST para 5 clientes.",
        "Projeto da MAVIK para cliente do setor frigorífico com API central, web e mobile.",
        "Integrações externas em Node.js e TypeScript.",
        "Arquitetura e padrões para escala e manutenção.",
      ],
      en: [
        "Backend and REST APIs for 5 clients.",
        "MAVIK project for a cold-storage sector client with a central API, web, and mobile.",
        "External integrations in Node.js and TypeScript.",
        "Architecture standards for scale and maintenance.",
      ],
    },
    stack: {
      pt: ["Node.js", "TypeScript", "APIs REST", "Integrações", "Arquitetura backend"],
      en: ["Node.js", "TypeScript", "REST APIs", "Integrations", "Backend architecture"],
    },
    projectSlug: "mavik",
    liveUrl: "https://mavik.cloud",
  },
  {
    id: "silva-souza",
    company: "Silva & Souza Tecnologia",
    context: {
      pt: "Modernização",
      en: "Modernization",
    },
    role: {
      pt: "Desenvolvedor Backend",
      en: "Backend Developer",
    },
    period: {
      pt: "Out 2025 - Nov 2025",
      en: "Oct 2025 - Nov 2025",
    },
    startDate: "2025-10",
    endDate: "2025-11",
    summary: {
      pt: "Regras de negócio, auth e contexto multi-filial em Laravel.",
      en: "Business rules, auth, and multi-branch context in Laravel.",
    },
    responsibilities: {
      pt: [
        "Refatoração de regras de negócio em Laravel.",
        "Multi-filial com base unificada.",
        "Autenticação e middleware reforçados.",
        "Consultas e operações backend otimizadas.",
      ],
      en: [
        "Laravel business rule refactoring.",
        "Multi-branch context on a unified database.",
        "Stronger authentication and middleware.",
        "Optimized backend queries and operations.",
      ],
    },
    stack: {
      pt: ["Laravel", "PHP", "Middleware", "Autenticação", "MySQL"],
      en: ["Laravel", "PHP", "Middleware", "Authentication", "MySQL"],
    },
  },
  {
    id: "va-imports",
    company: "VA Imports",
    context: {
      pt: "E-commerce",
      en: "E-commerce",
    },
    role: {
      pt: "Desenvolvedor Backend",
      en: "Backend Developer",
    },
    period: {
      pt: "Ago 2024 - Dez 2024",
      en: "Aug 2024 - Dec 2024",
    },
    startDate: "2024-08",
    endDate: "2024-12",
    summary: {
      pt: "Sustentação backend em períodos críticos.",
      en: "Backend support during critical periods.",
    },
    responsibilities: {
      pt: [
        "Operação em produção com alta demanda.",
        "SQL e rotinas backend otimizadas.",
        "Falhas de segurança corrigidas.",
        "Continuidade garantida em picos de acesso.",
      ],
      en: [
        "Production support under heavy demand.",
        "Optimized SQL and backend routines.",
        "Security issues fixed in production.",
        "Continuity maintained during traffic spikes.",
      ],
    },
    stack: {
      pt: ["Laravel", "MySQL", "SQL", "Nginx", "Linux VPS"],
      en: ["Laravel", "MySQL", "SQL", "Nginx", "Linux VPS"],
    },
    projectSlug: "va-imports",
    liveUrl: "https://vaimport.com.br",
  },
  {
    id: "barbearia-klp",
    company: "Barbearia KLP",
    context: {
      pt: "ERP sob medida",
      en: "Tailored ERP",
    },
    role: {
      pt: "Desenvolvedor Backend",
      en: "Backend Developer",
    },
    period: {
      pt: "Mar 2025 - Mai 2025",
      en: "Mar 2025 - May 2025",
    },
    startDate: "2025-03",
    endDate: "2025-05",
    summary: {
      pt: "ERP para digitalizar operação e reduzir retrabalho.",
      en: "ERP to digitize operations and reduce rework.",
    },
    responsibilities: {
      pt: [
        "ERP customizado com fluxos digitais.",
        "Modelagem relacional e regras de negócio.",
        "Operação interna mais organizada.",
        "Impacto direto na eficiência do negócio.",
      ],
      en: [
        "Custom ERP with digital workflows.",
        "Relational modeling and business rules.",
        "More organized internal operations.",
        "Direct impact on business efficiency.",
      ],
    },
    stack: {
      pt: ["Laravel", "PHP", "MySQL", "MVC"],
      en: ["Laravel", "PHP", "MySQL", "MVC"],
    },
    projectSlug: "barbearia-klp",
  },
];

export const education: EducationEntry[] = [
  {
    degree: {
      pt: "Pós Tech em Software Architecture",
      en: "Postgraduate Tech in Software Architecture",
    },
    institution: "FIAP",
    completion: {
      pt: "Em andamento",
      en: "In progress",
    },
  },
  {
    degree: {
      pt: "Análise e Desenvolvimento de Sistemas",
      en: "Systems Analysis and Development",
    },
    institution: "UNAMA - Universidade da Amazônia",
    completion: {
      pt: "2025",
      en: "2025",
    },
  },
  {
    degree: {
      pt: "Técnico em Desenvolvimento de Sistemas",
      en: "Technical Degree in Systems Development",
    },
    institution: "IFPA - Instituto Federal do Pará",
    completion: {
      pt: "2023",
      en: "2023",
    },
  },
];

export const certifications: CertificationEntry[] = [
  { title: "Maratona SBC de Programação - Fase Zero" },
  { title: "Java Foundations Certified Junior Associate (Preparatório) - Oracle Academy" },
  { title: "Desenvolvimento Web Moderno com PHP - Udemy" },
  { title: "Microservices Architecture with Golang - Workshop Intensivo UNAMA" },
  { title: "AI & Machine Learning Concepts - Workshop Técnico" },
];
