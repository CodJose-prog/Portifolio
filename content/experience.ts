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
  responsibilities: LocalizedStringArray;
  stack: LocalizedStringArray;
  projectSlug?: string;
  liveUrl?: string;
};

export type EducationEntry = {
  degree: LocalizedString;
  institution: string;
  completion: string;
};

export type CertificationEntry = {
  title: string;
};

export const experience: ExperienceEntry[] = [
  {
    id: "arenacalendar",
    company: "ArenaCalendar",
    context: {
      pt: "SaaS Próprio",
      en: "Own SaaS product",
    },
    role: {
      pt: "Engenheiro de Software e Líder Técnico",
      en: "Software Engineer and Technical Lead",
    },
    period: {
      pt: "Jan 2026 – Atual",
      en: "Jan 2026 – Present",
    },
    startDate: "2026-01",
    responsibilities: {
      pt: [
        "Liderança end-to-end do produto.",
        "Arquitetura SaaS multi-tenant escalável.",
        "Implementação de DevOps em VPS Linux.",
        "Automação de deploy via Git.",
        "Monitoramento de servidores.",
        "Isolamento de dados com PostgreSQL RLS.",
      ],
      en: [
        "End-to-end product leadership.",
        "Scalable multi-tenant SaaS architecture.",
        "DevOps implementation on Linux VPS.",
        "Git-based deployment automation.",
        "Server monitoring.",
        "Data isolation with PostgreSQL RLS.",
      ],
    },
    stack: {
      pt: ["Laravel", "Vue.js", "PostgreSQL", "Docker", "GitHub Actions", "Linux VPS"],
      en: ["Laravel", "Vue.js", "PostgreSQL", "Docker", "GitHub Actions", "Linux VPS"],
    },
    projectSlug: "arena-calendar",
    liveUrl: "https://arena-calendar.com",
  },
  {
    id: "mavik",
    company: "MAVIK",
    context: {
      pt: "Agência de Software",
      en: "Software agency",
    },
    role: {
      pt: "Desenvolvedor Full Stack e Consultor de Soluções",
      en: "Full Stack Developer and Solutions Consultant",
    },
    period: {
      pt: "Nov 2025 – Atual",
      en: "Nov 2025 – Present",
    },
    startDate: "2025-11",
    responsibilities: {
      pt: [
        "Desenvolvimento de soluções web para múltiplos clientes.",
        "Foco em performance (Core Web Vitals).",
        "SEO técnico.",
        "Definição de stack (Next.js + TypeScript).",
        "Padrões de projeto para escalabilidade.",
      ],
      en: [
        "Development of web solutions for multiple clients.",
        "Performance focus (Core Web Vitals).",
        "Technical SEO.",
        "Stack definition (Next.js + TypeScript).",
        "Project patterns for scalability.",
      ],
    },
    stack: {
      pt: ["Next.js", "TypeScript", "Laravel", "Vue.js", "Core Web Vitals", "SEO Técnico"],
      en: ["Next.js", "TypeScript", "Laravel", "Vue.js", "Core Web Vitals", "Technical SEO"],
    },
    projectSlug: "mavik",
    liveUrl: "https://mavik.cloud",
  },
  {
    id: "silva-souza",
    company: "Silva & Souza Tecnologia",
    context: {
      pt: "Projeto de Modernização",
      en: "Modernization project",
    },
    role: {
      pt: "Desenvolvedor Full Stack",
      en: "Full Stack Developer",
    },
    period: {
      pt: "Out 2025 – Nov 2025",
      en: "Oct 2025 – Nov 2025",
    },
    startDate: "2025-10",
    endDate: "2025-11",
    responsibilities: {
      pt: [
        "Migração de Blade para SPA com Vue.js + Inertia + TypeScript.",
        "Implementação de alternância multi-filial (Branch Switcher).",
        "Reestruturação de controle de acesso com Middleware.",
        "Privatização de rotas e reforço de segurança Laravel.",
        "MySQL centralizado.",
      ],
      en: [
        "Migration from Blade to SPA with Vue.js + Inertia + TypeScript.",
        "Implementation of multi-branch switching (Branch Switcher).",
        "Access control restructuring with Middleware.",
        "Route privatization and reinforced Laravel security.",
        "Centralized MySQL.",
      ],
    },
    stack: {
      pt: ["Laravel", "Vue.js", "Inertia.js", "TypeScript", "MySQL", "Middleware"],
      en: ["Laravel", "Vue.js", "Inertia.js", "TypeScript", "MySQL", "Middleware"],
    },
  },
  {
    id: "barbearia-klp",
    company: "Barbearia KLP",
    context: {
      pt: "Contrato PJ",
      en: "PJ contract",
    },
    role: {
      pt: "Desenvolvedor Full Stack",
      en: "Full Stack Developer",
    },
    period: {
      pt: "Mar 2025 – Mai 2025",
      en: "Mar 2025 – May 2025",
    },
    startDate: "2025-03",
    endDate: "2025-05",
    responsibilities: {
      pt: [
        "Desenvolvimento de ERP customizado.",
        "Substituição de processos manuais por automação.",
        "Modelagem de banco.",
        "Aplicação de padrão MVC.",
      ],
      en: [
        "Custom ERP development.",
        "Replacement of manual processes with automation.",
        "Database modeling.",
        "MVC pattern implementation.",
      ],
    },
    stack: {
      pt: ["Laravel", "PHP", "MySQL", "MVC"],
      en: ["Laravel", "PHP", "MySQL", "MVC"],
    },
    projectSlug: "barbearia-klp",
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
      pt: "Ago 2024 – Dez 2024",
      en: "Aug 2024 – Dec 2024",
    },
    startDate: "2024-08",
    endDate: "2024-12",
    responsibilities: {
      pt: [
        "Manutenção de infraestrutura produtiva.",
        "Correções de segurança.",
        "Otimização de consultas SQL.",
        "Suporte a picos de tráfego.",
      ],
      en: [
        "Maintenance of production infrastructure.",
        "Security fixes.",
        "SQL query optimization.",
        "Support during traffic spikes.",
      ],
    },
    stack: {
      pt: ["Laravel", "MySQL", "Nginx", "Linux VPS", "SQL"],
      en: ["Laravel", "MySQL", "Nginx", "Linux VPS", "SQL"],
    },
    projectSlug: "va-imports",
  },
];

export const education: EducationEntry[] = [
  {
    degree: {
      pt: "Análise e Desenvolvimento de Sistemas",
      en: "Systems Analysis and Development",
    },
    institution: "UNAMA – Universidade da Amazônia",
    completion: "2025",
  },
  {
    degree: {
      pt: "Técnico em Desenvolvimento de Sistemas",
      en: "Technical Degree in Systems Development",
    },
    institution: "IFPA – Instituto Federal do Pará",
    completion: "2023",
  },
];

export const certifications: CertificationEntry[] = [
  { title: "Maratona SBC de Programação – Fase Zero" },
  { title: "Java Foundations Certified Junior Associate (Preparatório) – Oracle Academy" },
  { title: "Desenvolvimento Web Moderno com PHP – Udemy" },
  { title: "Microservices Architecture with Golang – Workshop UNAMA" },
  { title: "AI & Machine Learning Concepts – Workshop Técnico" },
];
