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
      pt: "Liderança técnica do backend de um SaaS multi-tenant em produção, com foco em APIs, isolamento de dados, performance e deploy contínuo.",
      en: "Technical backend leadership for a production multi-tenant SaaS, focused on APIs, data isolation, performance, and continuous delivery.",
    },
    responsibilities: {
      pt: [
        "Desenvolvi APIs REST para autenticação, reservas, gestão de usuários e fluxos centrais do produto.",
        "Estruturei arquitetura multi-tenant com PostgreSQL RLS, garantindo isolamento de dados em 100% das operações entre tenants.",
        "Projetei backend preparado para picos de 10 a 15 reservas por tenant em períodos de alta demanda.",
        "Implementei pipeline de deploy automatizado em VPS Linux com CI/CD, reduzindo publicações de até 5 minutos para cerca de 40-90 segundos.",
        "Otimizei consultas SQL e modelagem de dados para melhorar latência de endpoints críticos.",
        "Automatizei rotinas operacionais com uso de IA e participei das decisões de arquitetura visando escalabilidade horizontal.",
      ],
      en: [
        "Built REST APIs for authentication, booking, user management, and core product flows.",
        "Structured multi-tenant architecture with PostgreSQL RLS, ensuring data isolation across 100% of tenant operations.",
        "Designed a backend prepared for peaks of 10 to 15 bookings per tenant during high-demand periods.",
        "Implemented an automated Linux VPS deployment pipeline with CI/CD, reducing releases from up to 5 minutes to roughly 40-90 seconds.",
        "Optimized SQL queries and data modeling to improve latency on critical endpoints.",
        "Automated operational routines with AI and contributed to architecture decisions focused on horizontal scalability.",
      ],
    },
    stack: {
      pt: ["Laravel", "PHP", "PostgreSQL", "Docker", "GitHub Actions", "Linux", "Nginx"],
      en: ["Laravel", "PHP", "PostgreSQL", "Docker", "GitHub Actions", "Linux", "Nginx"],
    },
    projectSlug: "arena-calendar",
    liveUrl: "https://arena-calendar.com",
  },
  {
    id: "mavik",
    company: "MAVIK",
    context: {
      pt: "Agência de software própria",
      en: "Own software agency",
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
      pt: "Entrega de sistemas backend e APIs REST para múltiplos clientes, incluindo integrações, padronização arquitetural e serviços em Node.js e TypeScript.",
      en: "Delivered backend systems and REST APIs for multiple clients, including integrations, architecture standards, and services in Node.js and TypeScript.",
    },
    responsibilities: {
      pt: [
        "Desenvolvi sistemas backend e APIs REST para 5 clientes com aplicações web e mobile sob medida.",
        "Estruturei um sistema completo de rastreamento para frigorífico com API REST central, painel web e aplicativo mobile.",
        "Implementei integrações com APIs externas para automatizar fluxos e reduzir processos manuais.",
        "Defini arquitetura e padrões de projeto para melhorar organização, escalabilidade e manutenção do backend.",
        "Atuei com Node.js e TypeScript no desenvolvimento de serviços e integrações entre sistemas.",
      ],
      en: [
        "Developed backend systems and REST APIs for 5 clients across tailored web and mobile applications.",
        "Structured a complete tracking system for a cold-storage company with a central REST API, web dashboard, and mobile app.",
        "Implemented external API integrations to automate flows and reduce manual processes.",
        "Defined architecture and project standards to improve backend organization, scalability, and maintainability.",
        "Worked with Node.js and TypeScript to build services and integrations between systems.",
      ],
    },
    stack: {
      pt: ["Node.js", "TypeScript", "APIs REST", "Integrações externas", "Arquitetura backend"],
      en: ["Node.js", "TypeScript", "REST APIs", "External integrations", "Backend architecture"],
    },
    projectSlug: "frigorifico-tracking",
  },
  {
    id: "silva-souza",
    company: "Silva & Souza Tecnologia",
    context: {
      pt: "Projeto de modernização",
      en: "Modernization project",
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
      pt: "Refatoração de regras de negócio em Laravel com reforço de autenticação, middleware e contexto multi-filial para operação unificada.",
      en: "Refactored Laravel business rules with stronger authentication, middleware, and multi-branch context for unified operations.",
    },
    responsibilities: {
      pt: [
        "Desenvolvi e refatorei regras de negócio no backend em Laravel, melhorando organização e consistência da aplicação.",
        "Implementei funcionalidade de multi-filial com alternância de contexto sobre base de dados unificada.",
        "Reestruturei autenticação e middleware para proteger rotas sensíveis e elevar segurança de dados.",
        "Contribuí para a modernização do sistema com redução de recarregamentos completos em fluxos críticos.",
        "Otimizei consultas e operações backend para melhorar o desempenho geral da aplicação.",
      ],
      en: [
        "Developed and refactored Laravel backend business rules, improving organization and application consistency.",
        "Implemented multi-branch context switching on top of a unified database.",
        "Restructured authentication and middleware to protect sensitive routes and improve data security.",
        "Contributed to system modernization by reducing full page reloads in critical flows.",
        "Optimized backend queries and operations to improve overall application performance.",
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
      pt: "E-commerce em produção",
      en: "Production e-commerce",
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
      pt: "Sustentação e evolução do backend de e-commerce com foco em estabilidade, segurança e suporte a períodos críticos como Black Friday.",
      en: "Maintenance and evolution of an e-commerce backend with focus on stability, security, and support for critical periods such as Black Friday.",
    },
    responsibilities: {
      pt: [
        "Atuei na sustentação do backend em ambiente produtivo com operação nacional em períodos de alta demanda.",
        "Otimizei consultas SQL e rotinas backend para aumentar estabilidade em picos de acesso e volume de pedidos.",
        "Corrigi vulnerabilidades e falhas de segurança em produção, elevando confiabilidade da plataforma.",
        "Garanti continuidade operacional em períodos críticos com múltiplas requisições simultâneas.",
      ],
      en: [
        "Supported a production backend operating nationally during high-demand periods.",
        "Optimized SQL queries and backend routines to improve stability under traffic and order spikes.",
        "Fixed production vulnerabilities and security issues, increasing platform reliability.",
        "Helped maintain operational continuity during critical periods with multiple simultaneous requests.",
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
      pt: "Construção de um sistema de gestão para substituir processos manuais por fluxos digitais com regras de negócio e modelagem relacional.",
      en: "Built a management system to replace manual processes with digital flows backed by business rules and relational modeling.",
    },
    responsibilities: {
      pt: [
        "Desenvolvi um ERP customizado para substituir tarefas manuais por fluxos digitais automatizados.",
        "Modelei banco de dados relacional e implementei regras de negócio utilizando padrão MVC.",
        "Estruturei funcionalidades operacionais para melhorar organização interna e reduzir retrabalho.",
        "Entreguei uma solução com impacto direto na eficiência operacional do negócio.",
      ],
      en: [
        "Developed a custom ERP to replace manual tasks with automated digital workflows.",
        "Modeled a relational database and implemented business rules using the MVC pattern.",
        "Structured operational features to improve internal organization and reduce rework.",
        "Delivered a solution with direct impact on the business operational efficiency.",
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
