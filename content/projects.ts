export type Locale = "pt" | "en";
export type LocalizedString = Record<Locale, string>;
export type LocalizedStringArray = Record<Locale, string[]>;

export type ProjectCaseStudy = {
  slug: string;
  image: string;
  liveUrl?: string;
  dateCreated?: string;
  dateModified?: string;
  codeRepository?: string;
  company: LocalizedString;
  name: LocalizedString;
  kicker: LocalizedString;
  overview: LocalizedString;
  problem: LocalizedString;
  solution: LocalizedString;
  architecture: LocalizedString;
  impact: LocalizedStringArray;
  security: LocalizedString;
  performance: LocalizedString;
  devops: LocalizedString;
  responsibilities: LocalizedStringArray;
  technicalHighlights: LocalizedStringArray;
  technologiesUsed: LocalizedStringArray;
  seoKeywords: LocalizedStringArray;
  geoSummary: LocalizedString;
};

export const projectCaseStudies: ProjectCaseStudy[] = [
  {
    slug: "arena-calendar",
    image: "/projects/arenacalendar.png",
    liveUrl: "https://arena-calendar.com",
    company: {
      pt: "ArenaCalendar",
      en: "ArenaCalendar",
    },
    name: {
      pt: "ArenaCalendar",
      en: "ArenaCalendar",
    },
    kicker: {
      pt: "SaaS multi-tenant para operação de reservas",
      en: "Multi-tenant SaaS for booking operations",
    },
    overview: {
      pt: "Produto próprio com backend orientado a APIs, autenticação, reservas e gestão administrativa para negócios com operação baseada em agenda.",
      en: "Own product with an API-driven backend for authentication, bookings, and administrative management for schedule-based businesses.",
    },
    problem: {
      pt: "Era necessário estruturar um backend capaz de sustentar múltiplos tenants, proteger dados por contexto, lidar com horários concorrentes e manter fluidez operacional em picos de demanda.",
      en: "It was necessary to structure a backend able to support multiple tenants, protect data by context, handle concurrent time slots, and preserve operational fluidity during traffic peaks.",
    },
    solution: {
      pt: "Desenvolvi APIs REST em Laravel, arquitetura multi-tenant com PostgreSQL RLS, modelagem orientada a reservas e uma base preparada para evolução contínua do produto.",
      en: "I built REST APIs in Laravel, a multi-tenant architecture with PostgreSQL RLS, booking-oriented data modeling, and a foundation prepared for continuous product evolution.",
    },
    architecture: {
      pt: "O backend foi organizado em torno de autenticação, contexto de tenant, regras de reservas, gestão de usuários e separação clara de responsabilidades para suportar escala e manutenção sustentável.",
      en: "The backend was organized around authentication, tenant context, booking rules, user management, and clear separation of concerns to support scale and sustainable maintenance.",
    },
    impact: {
      pt: [
        "13 tenants ativos em operação real.",
        "Isolamento de dados em 100% das operações multi-tenant com PostgreSQL RLS.",
        "Deploy reduzido de até 5 minutos para cerca de 40-90 segundos com CI/CD.",
        "Backend preparado para picos de 10 a 15 reservas por tenant em períodos críticos.",
      ],
      en: [
        "13 active tenants in real operation.",
        "100% data isolation across multi-tenant operations with PostgreSQL RLS.",
        "Deployment reduced from up to 5 minutes to roughly 40-90 seconds with CI/CD.",
        "Backend prepared for peaks of 10 to 15 bookings per tenant during critical periods.",
      ],
    },
    security: {
      pt: "Isolamento por tenant com RLS, autenticação, controle de acesso e validação de operações críticas no backend.",
      en: "Tenant isolation with RLS, authentication, access control, and backend validation for critical operations.",
    },
    performance: {
      pt: "Otimização de consultas SQL, atenção à modelagem de dados e tratamento de fluxos críticos para reduzir latência em endpoints centrais.",
      en: "SQL query optimization, careful data modeling, and critical flow handling to reduce latency on core endpoints.",
    },
    devops: {
      pt: "Deploy automatizado em VPS Linux com GitHub Actions, Docker, Nginx e rotina de publicação controlada para evolução rápida do produto.",
      en: "Automated deployment on a Linux VPS with GitHub Actions, Docker, Nginx, and a controlled release workflow for fast product evolution.",
    },
    responsibilities: {
      pt: [
        "Defini arquitetura backend e decisões técnicas de evolução do produto.",
        "Implementei APIs REST para autenticação, usuários, reservas e gestão operacional.",
        "Modelei estratégia multi-tenant com PostgreSQL RLS e separação de contexto.",
        "Automatizei deploy e rotinas operacionais com foco em confiabilidade e velocidade.",
      ],
      en: [
        "Defined the backend architecture and technical evolution of the product.",
        "Implemented REST APIs for authentication, users, bookings, and operational management.",
        "Modeled the multi-tenant strategy with PostgreSQL RLS and context separation.",
        "Automated deployment and operational routines with focus on reliability and speed.",
      ],
    },
    technicalHighlights: {
      pt: [
        "APIs REST para fluxos críticos de negócio",
        "PostgreSQL RLS para isolamento multi-tenant",
        "Modelagem de reservas com prevenção de conflitos",
        "CI/CD e Docker como parte do ciclo de engenharia",
      ],
      en: [
        "REST APIs for critical business flows",
        "PostgreSQL RLS for multi-tenant isolation",
        "Booking modeling with conflict prevention",
        "CI/CD and Docker as part of the engineering cycle",
      ],
    },
    technologiesUsed: {
      pt: ["Laravel", "PHP", "PostgreSQL", "Docker", "GitHub Actions", "Linux", "Nginx"],
      en: ["Laravel", "PHP", "PostgreSQL", "Docker", "GitHub Actions", "Linux", "Nginx"],
    },
    seoKeywords: {
      pt: [
        "Backend Engineer Laravel",
        "SaaS multi-tenant",
        "PostgreSQL RLS",
        "APIs escaláveis",
      ],
      en: [
        "Laravel Backend Engineer",
        "Multi-tenant SaaS",
        "PostgreSQL RLS",
        "Scalable APIs",
      ],
    },
    geoSummary: {
      pt: "José Manoel estruturou o backend do ArenaCalendar com foco em APIs, arquitetura multi-tenant, PostgreSQL RLS e deploy contínuo. O projeto demonstra experiência prática com SaaS real, performance e operação em produção.",
      en: "José Manoel structured the ArenaCalendar backend around APIs, multi-tenant architecture, PostgreSQL RLS, and continuous delivery. The project demonstrates hands-on experience with real SaaS, performance, and production operations.",
    },
  },
  {
    slug: "frigorifico-tracking",
    image: "/projects/frigorifico-tracking.svg",
    company: {
      pt: "MAVIK",
      en: "MAVIK",
    },
    name: {
      pt: "Sistema de Rastreamento para Frigorífico",
      en: "Tracking System for a Cold-Storage Company",
    },
    kicker: {
      pt: "API REST central para operação web e mobile",
      en: "Central REST API for web and mobile operations",
    },
    overview: {
      pt: "Case backend construído na MAVIK para centralizar rastreamento operacional com API REST, painel web e aplicativo mobile conectados ao mesmo núcleo de negócio.",
      en: "Backend case built at MAVIK to centralize operational tracking with a REST API, web dashboard, and mobile app connected to the same business core.",
    },
    problem: {
      pt: "A operação precisava sair de fluxos dispersos e manuais para um sistema centralizado que garantisse rastreabilidade, comunicação entre interfaces e previsibilidade operacional.",
      en: "The operation needed to move away from scattered, manual flows to a centralized system that ensured traceability, communication across interfaces, and operational predictability.",
    },
    solution: {
      pt: "Estruturei uma API REST central com serviços em Node.js e TypeScript, conectando painel web, aplicativo mobile e integrações externas em torno de um fluxo operacional único.",
      en: "I structured a central REST API with Node.js and TypeScript services, connecting the web dashboard, mobile app, and external integrations around a single operational flow.",
    },
    architecture: {
      pt: "A solução foi pensada como backend centralizador: regras de negócio no núcleo, endpoints bem definidos para múltiplos clientes e desenho preparado para expansão com novas integrações.",
      en: "The solution was designed as a centralizing backend: business rules in the core, clearly defined endpoints for multiple clients, and an architecture prepared to expand with new integrations.",
    },
    impact: {
      pt: [
        "Entrega de sistema completo com API REST central, painel web e aplicativo mobile.",
        "Redução de processos manuais por meio de integrações com APIs externas.",
        "Padronização arquitetural para facilitar manutenção e evolução dos serviços backend.",
      ],
      en: [
        "Delivered a complete system with a central REST API, web dashboard, and mobile app.",
        "Reduced manual processes through external API integrations.",
        "Established architecture standards to improve maintenance and evolution of backend services.",
      ],
    },
    security: {
      pt: "A organização por serviços, contratos de API e separação clara das responsabilidades ajudou a reduzir fragilidade operacional entre interfaces e integrações.",
      en: "Service organization, API contracts, and clear separation of responsibilities helped reduce operational fragility across interfaces and integrations.",
    },
    performance: {
      pt: "A centralização da lógica no backend melhorou previsibilidade dos fluxos e simplificou a evolução das interfaces conectadas ao sistema.",
      en: "Centralizing the logic in the backend improved flow predictability and simplified the evolution of interfaces connected to the system.",
    },
    devops: {
      pt: "O case também envolveu padronização de arquitetura e organização de serviços para facilitar entregas e manutenção contínua em ambiente de cliente.",
      en: "The case also involved architecture standardization and service organization to support delivery and continuous maintenance in a client environment.",
    },
    responsibilities: {
      pt: [
        "Desenhei a API REST central para suportar diferentes interfaces de consumo.",
        "Implementei serviços backend e integrações externas em Node.js e TypeScript.",
        "Apoiei decisões arquiteturais para escalabilidade e manutenção de longo prazo.",
        "Conectei backend, painel web e app mobile ao mesmo fluxo operacional.",
      ],
      en: [
        "Designed the central REST API to support different consuming interfaces.",
        "Implemented backend services and external integrations in Node.js and TypeScript.",
        "Supported architecture decisions for scalability and long-term maintainability.",
        "Connected backend, web dashboard, and mobile app to the same operational flow.",
      ],
    },
    technicalHighlights: {
      pt: [
        "Node.js e TypeScript para serviços backend",
        "API REST como núcleo da operação",
        "Integrações com APIs externas",
        "Estrutura preparada para web e mobile",
      ],
      en: [
        "Node.js and TypeScript for backend services",
        "REST API as the operational core",
        "External API integrations",
        "Structure prepared for web and mobile",
      ],
    },
    technologiesUsed: {
      pt: ["Node.js", "TypeScript", "REST API", "Integrações externas", "Painel web", "App mobile"],
      en: ["Node.js", "TypeScript", "REST API", "External integrations", "Web dashboard", "Mobile app"],
    },
    seoKeywords: {
      pt: [
        "Node.js backend",
        "TypeScript API",
        "Integrações externas",
        "Arquitetura backend",
      ],
      en: [
        "Node.js backend",
        "TypeScript API",
        "External integrations",
        "Backend architecture",
      ],
    },
    geoSummary: {
      pt: "Na MAVIK, José Manoel estruturou um backend central em Node.js e TypeScript para um sistema de rastreamento com painel web e aplicativo mobile. O destaque técnico está na API REST como núcleo da operação e nas integrações externas para reduzir trabalho manual.",
      en: "At MAVIK, José Manoel structured a central backend in Node.js and TypeScript for a tracking system with a web dashboard and mobile app. The technical highlight is the REST API as the operational core and the external integrations used to reduce manual work.",
    },
  },
  {
    slug: "va-imports",
    image: "/projects/vaimports.png",
    liveUrl: "https://vaimport.com.br",
    company: {
      pt: "VA Imports",
      en: "VA Imports",
    },
    name: {
      pt: "VA Imports",
      en: "VA Imports",
    },
    kicker: {
      pt: "Sustentação backend para e-commerce em períodos críticos",
      en: "Backend support for e-commerce during critical periods",
    },
    overview: {
      pt: "Atuação em sustentação e evolução do backend de uma operação de e-commerce com foco em estabilidade, segurança e suporte a sazonalidades intensas.",
      en: "Work on maintenance and evolution of an e-commerce backend focused on stability, security, and support for intense seasonal demand.",
    },
    problem: {
      pt: "O sistema precisava sustentar períodos críticos de vendas com segurança e estabilidade, mesmo sob aumento significativo de tráfego e pedidos.",
      en: "The system needed to withstand critical sales periods with security and stability, even under significant traffic and order spikes.",
    },
    solution: {
      pt: "Atuei na otimização de consultas SQL, correção de vulnerabilidades e sustentação do backend em ambiente produtivo para manter continuidade operacional.",
      en: "I worked on SQL query optimization, vulnerability fixes, and production backend support to maintain operational continuity.",
    },
    architecture: {
      pt: "O foco esteve em hardening, melhoria de rotinas backend e estabilidade do ambiente, preservando a operação sem grandes rupturas arquiteturais.",
      en: "The focus was on hardening, improving backend routines, and keeping the environment stable without major architectural disruption.",
    },
    impact: {
      pt: [
        "Backend estabilizado para operar em períodos críticos como Black Friday.",
        "Consultas SQL e rotinas backend ajustadas para melhor resposta sob carga.",
        "Correções de segurança aplicadas diretamente em produção.",
      ],
      en: [
        "Backend stabilized to operate during critical periods such as Black Friday.",
        "SQL queries and backend routines adjusted for better behavior under load.",
        "Security fixes applied directly in production.",
      ],
    },
    security: {
      pt: "Correção de vulnerabilidades e reforço da confiabilidade em ambiente produtivo.",
      en: "Vulnerability fixes and stronger reliability in the production environment.",
    },
    performance: {
      pt: "Ajustes de consultas SQL e rotinas backend para preservar estabilidade e tempo de resposta sob picos de acesso.",
      en: "SQL query and backend routine adjustments to preserve stability and response time during access spikes.",
    },
    devops: {
      pt: "Atuação próxima da infraestrutura Linux e do servidor web para manter o e-commerce estável em produção.",
      en: "Worked close to Linux infrastructure and the web server to keep the e-commerce stable in production.",
    },
    responsibilities: {
      pt: [
        "Sustentei o backend em ambiente produtivo durante janelas de alta demanda.",
        "Otimizei consultas SQL e rotinas críticas da aplicação.",
        "Corrigi falhas de segurança com foco em continuidade operacional.",
        "Apoiei a operação em períodos com múltiplas requisições simultâneas.",
      ],
      en: [
        "Supported the backend in production during high-demand windows.",
        "Optimized SQL queries and critical application routines.",
        "Fixed security issues with focus on operational continuity.",
        "Supported operations during periods with multiple simultaneous requests.",
      ],
    },
    technicalHighlights: {
      pt: [
        "Otimização de SQL em produção",
        "Correções de segurança em ambiente real",
        "Suporte a picos de tráfego",
        "Manutenção backend com foco em estabilidade",
      ],
      en: [
        "Production SQL optimization",
        "Security fixes in a real environment",
        "Traffic spike support",
        "Backend maintenance focused on stability",
      ],
    },
    technologiesUsed: {
      pt: ["Laravel", "MySQL", "SQL", "Nginx", "Linux VPS"],
      en: ["Laravel", "MySQL", "SQL", "Nginx", "Linux VPS"],
    },
    seoKeywords: {
      pt: [
        "Backend em produção",
        "Otimização SQL",
        "Segurança backend",
        "Laravel e-commerce",
      ],
      en: [
        "Production backend",
        "SQL optimization",
        "Backend security",
        "Laravel e-commerce",
      ],
    },
    geoSummary: {
      pt: "Na VA Imports, José Manoel atuou na sustentação do backend de e-commerce com foco em segurança, SQL e estabilidade operacional em momentos críticos de venda.",
      en: "At VA Imports, José Manoel supported an e-commerce backend with emphasis on security, SQL, and operational stability during critical sales periods.",
    },
  },
  {
    slug: "barbearia-klp",
    image: "/projects/barbearia-klp.svg",
    company: {
      pt: "Barbearia KLP",
      en: "Barbershop KLP",
    },
    name: {
      pt: "Barbearia KLP",
      en: "Barbershop KLP",
    },
    kicker: {
      pt: "ERP enxuto para digitalizar operação",
      en: "Lean ERP to digitize operations",
    },
    overview: {
      pt: "Sistema de gestão desenvolvido para substituir processos manuais por fluxos digitais e melhorar a eficiência operacional do negócio.",
      en: "Management system built to replace manual processes with digital workflows and improve business operational efficiency.",
    },
    problem: {
      pt: "A operação dependia de controles manuais que geravam retrabalho, baixa previsibilidade e dificuldade de organização interna.",
      en: "Operations depended on manual controls that caused rework, low predictability, and difficulty in internal organization.",
    },
    solution: {
      pt: "Desenvolvi um ERP com regras de negócio, modelagem relacional e rotinas operacionais para digitalizar o fluxo principal do negócio.",
      en: "I built an ERP with business rules, relational modeling, and operational routines to digitize the core business workflow.",
    },
    architecture: {
      pt: "A aplicação foi estruturada com MVC e backend responsável por consolidar agenda, cadastro e fluxos administrativos em uma base única.",
      en: "The application was structured with MVC and a backend responsible for consolidating scheduling, records, and administrative flows in a single base.",
    },
    impact: {
      pt: [
        "Processos manuais substituídos por rotinas digitais.",
        "Melhoria direta na organização interna e redução de retrabalho.",
        "Base de dados relacional estruturada para continuidade da operação.",
      ],
      en: [
        "Manual processes replaced by digital routines.",
        "Direct improvement in internal organization and reduced rework.",
        "Relational data foundation structured for continued operation.",
      ],
    },
    security: {
      pt: "As regras de negócio no backend ajudaram a reduzir inconsistências e preservar integridade dos dados operacionais.",
      en: "Backend business rules helped reduce inconsistencies and preserve operational data integrity.",
    },
    performance: {
      pt: "A solução foi desenhada para fluidez operacional e uso simples em rotinas diárias do negócio.",
      en: "The solution was designed for operational fluidity and straightforward use in daily business routines.",
    },
    devops: {
      pt: "Entrega completa com ambiente simples e base preparada para manutenção contínua.",
      en: "Complete delivery with a simple environment and a codebase prepared for ongoing maintenance.",
    },
    responsibilities: {
      pt: [
        "Desenvolvi o sistema de gestão com foco em operação enxuta.",
        "Modelei banco de dados relacional e regras de negócio em backend.",
        "Estruturei funcionalidades administrativas para reduzir trabalho manual.",
        "Entreguei a solução completa com impacto direto no processo interno do negócio.",
      ],
      en: [
        "Built the management system focused on lean operations.",
        "Modeled the relational database and backend business rules.",
        "Structured administrative features to reduce manual work.",
        "Delivered the full solution with direct impact on internal business processes.",
      ],
    },
    technicalHighlights: {
      pt: [
        "ERP sob medida",
        "Modelagem relacional",
        "Regras de negócio no backend",
        "Digitalização de operação manual",
      ],
      en: [
        "Tailored ERP",
        "Relational modeling",
        "Backend business rules",
        "Digitization of manual operations",
      ],
    },
    technologiesUsed: {
      pt: ["Laravel", "PHP", "MySQL", "MVC"],
      en: ["Laravel", "PHP", "MySQL", "MVC"],
    },
    seoKeywords: {
      pt: [
        "ERP com Laravel",
        "Backend sob medida",
        "Sistema de gestão",
        "Modelagem de dados",
      ],
      en: [
        "Laravel ERP",
        "Custom backend",
        "Management system",
        "Data modeling",
      ],
    },
    geoSummary: {
      pt: "José Manoel desenvolveu um ERP para a Barbearia KLP com foco em backend, modelagem relacional e digitalização da operação diária.",
      en: "José Manoel built an ERP for Barbershop KLP focused on backend logic, relational modeling, and digitizing daily operations.",
    },
  },
];

export type Project = {
  slug: string;
  image: string;
  liveUrl?: string;
  company: LocalizedString;
  kicker: LocalizedString;
  stack: string[];
  title: LocalizedString;
  summary: LocalizedString;
  challenge: LocalizedString;
  solution: LocalizedString;
  impact: LocalizedStringArray;
  capabilities: LocalizedStringArray;
};

export const projects: Project[] = projectCaseStudies.map((project) => ({
  slug: project.slug,
  image: project.image,
  liveUrl: project.liveUrl,
  company: project.company,
  kicker: project.kicker,
  stack: project.technologiesUsed.en,
  title: project.name,
  summary: project.overview,
  challenge: project.problem,
  solution: project.solution,
  impact: project.impact,
  capabilities: project.technicalHighlights,
}));
