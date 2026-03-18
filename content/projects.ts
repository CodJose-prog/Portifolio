export type Locale = "pt" | "en";
export type LocalizedString = Record<Locale, string>;
export type LocalizedStringArray = Record<Locale, string[]>;

export type ProjectCaseStudy = {
  slug: string;
  image: string;
  liveUrl?: string;
  primaryLinkLabel?: LocalizedString;
  dateCreated?: string;
  dateModified?: string;
  codeRepository?: string;
  company: LocalizedString;
  name: LocalizedString;
  badge?: LocalizedString;
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
      pt: "SaaS multi-tenant para reservas",
      en: "Multi-tenant SaaS for bookings",
    },
    overview: {
      pt: "Backend de produto próprio com APIs, autenticação e reservas.",
      en: "Own-product backend with APIs, authentication, and bookings.",
    },
    problem: {
      pt: "Escalar reservas com múltiplos tenants e dados isolados.",
      en: "Scale bookings with multiple tenants and isolated data.",
    },
    solution: {
      pt: "Laravel + PostgreSQL RLS com modelagem orientada a reservas.",
      en: "Laravel + PostgreSQL RLS with booking-oriented modeling.",
    },
    architecture: {
      pt: "Contexto de tenant, autenticação, reservas e gestão em um backend preparado para evolução contínua.",
      en: "Tenant context, authentication, bookings, and management in a backend prepared for continuous evolution.",
    },
    impact: {
      pt: [
        "13 tenants ativos.",
        "100% de isolamento com PostgreSQL RLS.",
        "Deploy de 40-90s com CI/CD.",
      ],
      en: [
        "13 active tenants.",
        "100% isolation with PostgreSQL RLS.",
        "40-90s deployment with CI/CD.",
      ],
    },
    security: {
      pt: "RLS, autenticação e controle de acesso por contexto.",
      en: "RLS, authentication, and context-based access control.",
    },
    performance: {
      pt: "SQL e endpoints críticos otimizados para operação real.",
      en: "SQL and critical endpoints optimized for real operations.",
    },
    devops: {
      pt: "Docker, GitHub Actions, Linux VPS e Nginx.",
      en: "Docker, GitHub Actions, Linux VPS, and Nginx.",
    },
    responsibilities: {
      pt: [
        "Arquitetura backend do produto.",
        "APIs REST para autenticação, usuários e reservas.",
        "Deploy e rotinas operacionais automatizadas.",
      ],
      en: [
        "Backend architecture of the product.",
        "REST APIs for authentication, users, and bookings.",
        "Automated deployment and operational routines.",
      ],
    },
    technicalHighlights: {
      pt: [
        "APIs REST",
        "PostgreSQL RLS",
        "Modelagem de reservas",
        "CI/CD",
      ],
      en: [
        "REST APIs",
        "PostgreSQL RLS",
        "Booking modeling",
        "CI/CD",
      ],
    },
    technologiesUsed: {
      pt: ["Laravel", "PHP", "PostgreSQL", "Docker", "GitHub Actions", "Linux"],
      en: ["Laravel", "PHP", "PostgreSQL", "Docker", "GitHub Actions", "Linux"],
    },
    seoKeywords: {
      pt: ["Backend Engineer Laravel", "SaaS multi-tenant", "PostgreSQL RLS", "APIs escaláveis"],
      en: ["Laravel Backend Engineer", "Multi-tenant SaaS", "PostgreSQL RLS", "Scalable APIs"],
    },
    geoSummary: {
      pt: "José Manoel estruturou o backend do ArenaCalendar com APIs, multi-tenant, PostgreSQL RLS e entrega contínua.",
      en: "José Manoel structured the ArenaCalendar backend around APIs, multi-tenant architecture, PostgreSQL RLS, and continuous delivery.",
    },
  },
  {
    slug: "mavik",
    image: "/projects/mavik.png",
    liveUrl: "https://mavik.cloud",
    primaryLinkLabel: {
      pt: "Contratar MAVIK",
      en: "Hire MAVIK",
    },
    company: {
      pt: "MAVIK",
      en: "MAVIK",
    },
    name: {
      pt: "MAVIK",
      en: "MAVIK",
    },
    badge: {
      pt: "Empresa",
      en: "Company",
    },
    kicker: {
      pt: "Software house e consultoria para soluções sob medida",
      en: "Software house and consulting company for tailored solutions",
    },
    overview: {
      pt: "A MAVIK é a empresa de software e consultoria do José, responsável por desenvolver soluções sob medida com foco em backend, APIs, web, mobile e integrações.",
      en: "MAVIK is José's software and consulting company, responsible for building tailored solutions focused on backend, APIs, web, mobile, and integrations.",
    },
    problem: {
      pt: "Empresas precisam de um parceiro técnico capaz de transformar operação, integração e produto em software utilizável.",
      en: "Companies need a technical partner able to turn operations, integrations, and product ideas into usable software.",
    },
    solution: {
      pt: "A MAVIK atua com desenvolvimento sob medida, arquitetura, APIs, sistemas web/mobile e integração entre serviços para clientes reais.",
      en: "MAVIK works with tailored development, architecture, APIs, web/mobile systems, and service integration for real clients.",
    },
    architecture: {
      pt: "O papel da MAVIK no portfólio é institucional: mostrar operação real, capacidade de entrega e porta de entrada comercial para novos projetos.",
      en: "MAVIK's role in the portfolio is institutional: to show real operations, delivery capability, and a commercial entry point for new projects.",
    },
    impact: {
      pt: [
        "Empresa responsável por projetos sob medida.",
        "Atuação em backend, APIs, sistemas web/mobile e integrações.",
        "Operação real com presença online em mavik.cloud.",
      ],
      en: [
        "Company responsible for tailored software projects.",
        "Work across backend, APIs, web/mobile systems, and integrations.",
        "Real operation with an online presence at mavik.cloud.",
      ],
    },
    security: {
      pt: "Projetos conduzidos com foco em arquitetura, clareza técnica e sustentabilidade de longo prazo.",
      en: "Projects led with focus on architecture, technical clarity, and long-term sustainability.",
    },
    performance: {
      pt: "Entregas orientadas a performance, manutenção e evolução contínua de produto.",
      en: "Deliveries oriented toward performance, maintainability, and continuous product evolution.",
    },
    devops: {
      pt: "Deploy, integração de serviços e entrega contínua fazem parte da operação.",
      en: "Deployment, service integration, and continuous delivery are part of the operation.",
    },
    responsibilities: {
      pt: [
        "Desenvolvimento de soluções sob medida para clientes.",
        "Arquitetura de APIs, backends e sistemas conectados.",
        "Atuação comercial e técnica por meio da MAVIK.",
        "Base para contratação direta via mavik.cloud.",
      ],
      en: [
        "Development of tailored solutions for clients.",
        "Architecture of APIs, backends, and connected systems.",
        "Commercial and technical operation through MAVIK.",
        "Direct hiring entry point through mavik.cloud.",
      ],
    },
    technicalHighlights: {
      pt: [
        "Software house real",
        "Backend e APIs",
        "Web + mobile",
        "Integrações e consultoria",
      ],
      en: [
        "Real software house",
        "Backend and APIs",
        "Web + mobile",
        "Integrations and consulting",
      ],
    },
    technologiesUsed: {
      pt: ["Laravel", "Node.js", "TypeScript", "APIs REST", "Web", "Mobile", "Integrações"],
      en: ["Laravel", "Node.js", "TypeScript", "REST APIs", "Web", "Mobile", "Integrations"],
    },
    seoKeywords: {
      pt: ["MAVIK software house", "Desenvolvimento sob medida", "APIs e backend", "Consultoria em software"],
      en: ["MAVIK software house", "Tailored software development", "APIs and backend", "Software consulting"],
    },
    geoSummary: {
      pt: "A MAVIK é a software house do José Manoel, usada para entregar soluções sob medida em backend, APIs, sistemas web/mobile e integrações para clientes reais.",
      en: "MAVIK is José Manoel's software house, used to deliver tailored backend, API, web/mobile, and integration solutions for real clients.",
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
      pt: "Plataforma de Rastreamento Operacional",
      en: "Operational Tracking Platform",
    },
    badge: {
      pt: "Projeto de Ouro",
      en: "Flagship Project",
    },
    kicker: {
      pt: "Case premium desenvolvido pela MAVIK para cliente do setor frigorífico",
      en: "Premium case delivered by MAVIK for a client in the cold-storage sector",
    },
    overview: {
      pt: "Sistema desenvolvido pela MAVIK para um cliente do setor frigorífico, com foco em rastreamento, controle operacional e integração entre backend, web e mobile.",
      en: "System delivered by MAVIK for a client in the cold-storage sector, focused on tracking, operational control, and integration across backend, web, and mobile.",
    },
    problem: {
      pt: "Falta de visibilidade operacional, dados descentralizados e necessidade de controle em tempo real da operação e da logística.",
      en: "Lack of operational visibility, decentralized data, and the need for real-time control over operations and logistics.",
    },
    solution: {
      pt: "A MAVIK desenvolveu uma plataforma completa com API central, painel web para gestão e aplicativo mobile para operação em campo.",
      en: "MAVIK developed a complete platform with a central API, a web dashboard for management, and a mobile app for field operations.",
    },
    architecture: {
      pt: "Minha atuação via MAVIK foi no backend e na arquitetura da solução: API central, modelagem de dados, integração entre serviços e conexão entre as interfaces web e mobile.",
      en: "My role through MAVIK was in backend and solution architecture: the central API, data modeling, service integration, and the connection between web and mobile interfaces.",
    },
    impact: {
      pt: [
        "Informações centralizadas em um único fluxo.",
        "Melhoria no controle operacional.",
        "Maior eficiência no processo.",
        "Base escalável e estruturada para evolução.",
      ],
      en: [
        "Information centralized in a single flow.",
        "Improved operational control.",
        "Greater process efficiency.",
        "A scalable and structured foundation for evolution.",
      ],
    },
    security: {
      pt: "Contratos de API e separação clara de responsabilidades entre backend, web e mobile.",
      en: "API contracts and clear separation of responsibilities between backend, web, and mobile.",
    },
    performance: {
      pt: "Lógica centralizada para tornar rastreamento e operação mais previsíveis.",
      en: "Centralized logic to make tracking and operations more predictable.",
    },
    devops: {
      pt: "Serviços organizados para evolução contínua dentro da operação da MAVIK.",
      en: "Services organized for continuous evolution within MAVIK's delivery flow.",
    },
    responsibilities: {
      pt: [
        "Desenvolvimento backend da API central.",
        "Construção de APIs e modelagem de dados.",
        "Integração entre serviços, painel web e app mobile.",
        "Participação na arquitetura geral da solução.",
      ],
      en: [
        "Backend development of the central API.",
        "API implementation and data modeling.",
        "Integration across services, web dashboard, and mobile app.",
        "Participation in the overall solution architecture.",
      ],
    },
    technicalHighlights: {
      pt: [
        "Desenvolvido pela MAVIK",
        "API central para operação",
        "Integração entre web, mobile e backend",
        "Modelagem e arquitetura de solução",
      ],
      en: [
        "Case delivered by MAVIK",
        "Central API for operations",
        "Integration across web, mobile, and backend",
        "Solution modeling and architecture",
      ],
    },
    technologiesUsed: {
      pt: ["Node.js", "TypeScript", "REST API", "Integrações", "Web", "Mobile"],
      en: ["Node.js", "TypeScript", "REST API", "Integrations", "Web", "Mobile"],
    },
    seoKeywords: {
      pt: ["Node.js backend", "TypeScript API", "Integrações externas", "Arquitetura backend"],
      en: ["Node.js backend", "TypeScript API", "External integrations", "Backend architecture"],
    },
    geoSummary: {
      pt: "Case desenvolvido pela MAVIK para um cliente do setor frigorífico. José Manoel atuou diretamente no backend, na API central, na modelagem de dados e no apoio à arquitetura da solução.",
      en: "Case delivered by MAVIK for a client in the cold-storage sector. José Manoel worked directly on the backend, central API, data modeling, and support for the solution architecture.",
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
      pt: "Backend de e-commerce em alta demanda",
      en: "E-commerce backend under high demand",
    },
    overview: {
      pt: "Sustentação backend com foco em estabilidade e segurança.",
      en: "Backend support focused on stability and security.",
    },
    problem: {
      pt: "Manter operação estável em períodos críticos de vendas.",
      en: "Keep operations stable during critical sales periods.",
    },
    solution: {
      pt: "SQL otimizado, falhas corrigidas e rotina produtiva estabilizada.",
      en: "Optimized SQL, fixed issues, and stabilized production routines.",
    },
    architecture: {
      pt: "Hardening e melhorias backend sem romper a operação.",
      en: "Hardening and backend improvements without breaking operations.",
    },
    impact: {
      pt: [
        "Operação estável em períodos críticos.",
        "Melhor resposta sob carga.",
        "Correções de segurança em produção.",
      ],
      en: [
        "Stable operation during critical periods.",
        "Better behavior under load.",
        "Security fixes in production.",
      ],
    },
    security: {
      pt: "Falhas corrigidas em ambiente real.",
      en: "Issues fixed in a real production environment.",
    },
    performance: {
      pt: "Consultas e rotinas ajustadas para picos de acesso.",
      en: "Queries and routines tuned for traffic spikes.",
    },
    devops: {
      pt: "Atuação próxima da infraestrutura Linux e Nginx.",
      en: "Worked close to Linux and Nginx infrastructure.",
    },
    responsibilities: {
      pt: [
        "Sustentação do backend em produção.",
        "Otimização de SQL e rotinas críticas.",
        "Correções com foco em continuidade.",
      ],
      en: [
        "Production backend support.",
        "Optimization of SQL and critical routines.",
        "Fixes focused on continuity.",
      ],
    },
    technicalHighlights: {
      pt: ["SQL em produção", "Segurança", "Alta demanda", "Estabilidade"],
      en: ["Production SQL", "Security", "High demand", "Stability"],
    },
    technologiesUsed: {
      pt: ["Laravel", "MySQL", "SQL", "Nginx", "Linux VPS"],
      en: ["Laravel", "MySQL", "SQL", "Nginx", "Linux VPS"],
    },
    seoKeywords: {
      pt: ["Backend em produção", "Otimização SQL", "Segurança backend", "Laravel e-commerce"],
      en: ["Production backend", "SQL optimization", "Backend security", "Laravel e-commerce"],
    },
    geoSummary: {
      pt: "Na VA Imports, José Manoel atuou na sustentação do backend de e-commerce com foco em segurança, SQL e estabilidade.",
      en: "At VA Imports, José Manoel supported an e-commerce backend focused on security, SQL, and stability.",
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
      pt: "ERP para substituir processos manuais.",
      en: "ERP built to replace manual processes.",
    },
    problem: {
      pt: "Reduzir retrabalho e organizar a operação.",
      en: "Reduce rework and organize operations.",
    },
    solution: {
      pt: "Sistema com regras de negócio e base relacional.",
      en: "System with business rules and a relational data layer.",
    },
    architecture: {
      pt: "MVC com backend consolidando agenda e fluxos administrativos.",
      en: "MVC with a backend consolidating scheduling and admin workflows.",
    },
    impact: {
      pt: [
        "Processos manuais digitalizados.",
        "Mais organização interna.",
        "Menos retrabalho operacional.",
      ],
      en: [
        "Manual processes digitized.",
        "Better internal organization.",
        "Less operational rework.",
      ],
    },
    security: {
      pt: "Regras de negócio protegendo consistência dos dados.",
      en: "Business rules protecting data consistency.",
    },
    performance: {
      pt: "Fluxos simples para uso rápido no dia a dia.",
      en: "Simple flows for fast daily usage.",
    },
    devops: {
      pt: "Entrega preparada para manutenção contínua.",
      en: "Delivery prepared for continuous maintenance.",
    },
    responsibilities: {
      pt: [
        "ERP customizado para a operação.",
        "Modelagem relacional e regras de negócio.",
        "Fluxos administrativos digitalizados.",
      ],
      en: [
        "Custom ERP for the operation.",
        "Relational modeling and business rules.",
        "Digitized administrative workflows.",
      ],
    },
    technicalHighlights: {
      pt: ["ERP sob medida", "Modelagem relacional", "Regras de negócio", "Operação digital"],
      en: ["Tailored ERP", "Relational modeling", "Business rules", "Digital operations"],
    },
    technologiesUsed: {
      pt: ["Laravel", "PHP", "MySQL", "MVC"],
      en: ["Laravel", "PHP", "MySQL", "MVC"],
    },
    seoKeywords: {
      pt: ["ERP com Laravel", "Backend sob medida", "Sistema de gestão", "Modelagem de dados"],
      en: ["Laravel ERP", "Custom backend", "Management system", "Data modeling"],
    },
    geoSummary: {
      pt: "José Manoel desenvolveu um ERP para a Barbearia KLP com foco em backend, modelagem relacional e digitalização da operação.",
      en: "José Manoel built an ERP for Barbershop KLP focused on backend logic, relational modeling, and digital operations.",
    },
  },
];

export type Project = {
  slug: string;
  image: string;
  liveUrl?: string;
  primaryLinkLabel?: LocalizedString;
  company: LocalizedString;
  badge?: LocalizedString;
  kicker: LocalizedString;
  stack: string[];
  title: LocalizedString;
  summary: LocalizedString;
  challenge: LocalizedString;
  solution: LocalizedString;
  impact: LocalizedStringArray;
  capabilities: LocalizedStringArray;
};

const projectOrder = [
  "frigorifico-tracking",
  "mavik",
  "arena-calendar",
  "va-imports",
  "barbearia-klp",
] as const;

export const projects: Project[] = projectOrder
  .map((slug) => projectCaseStudies.find((project) => project.slug === slug))
  .filter((project): project is ProjectCaseStudy => Boolean(project))
  .map((project) => ({
    slug: project.slug,
    image: project.image,
    liveUrl: project.liveUrl,
    primaryLinkLabel: project.primaryLinkLabel,
    company: project.company,
    badge: project.badge,
    kicker: project.kicker,
    stack: project.technologiesUsed.en,
    title: project.name,
    summary: project.overview,
    challenge: project.problem,
    solution: project.solution,
    impact: project.impact,
    capabilities: project.technicalHighlights,
  }));
