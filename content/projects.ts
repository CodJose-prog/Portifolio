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
  name: LocalizedString;
  overview: LocalizedString;
  problem: LocalizedString;
  solution: LocalizedString;
  architecture: LocalizedString;
  security: LocalizedString;
  performance: LocalizedString;
  devops: LocalizedString;
  responsibilities: LocalizedStringArray;
  technical_highlights: LocalizedStringArray;
  technologies_used: LocalizedStringArray;
  seo_keywords: LocalizedStringArray;
  geo_summary: LocalizedString;
};

export const projectCaseStudies: ProjectCaseStudy[] = [
  {
    slug: "arena-calendar",
    image: "/projects/arenacalendar.png",
    liveUrl: "https://arena-calendar.com",
    name: {
      pt: "ArenaCalendar",
      en: "ArenaCalendar",
    },
    overview: {
      pt: "Plataforma de agendamento e operação para negócios baseados em horários, com foco em controle administrativo e experiência do usuário final.",
      en: "Scheduling and operations platform for time-based businesses, focused on administrative control and end-user experience.",
    },
    problem: {
      pt: "O fluxo de reservas e confirmações era fragmentado entre canais, o que dificultava consistência operacional e rastreabilidade das ações.",
      en: "Reservation and confirmation flows were fragmented across channels, which made operational consistency and action traceability difficult.",
    },
    solution: {
      pt: "Desenvolvimento de um fluxo centralizado com regras claras de agenda, estados de reserva e integração de notificações para reduzir inconsistências.",
      en: "Development of a centralized flow with clear scheduling rules, booking states, and notification integration to reduce inconsistencies.",
    },
    architecture: {
      pt: "Arquitetura full stack em Laravel e Vue com separação entre domínio de agenda, camada de aplicação e interfaces operacionais.",
      en: "Full stack architecture with Laravel and Vue, separating scheduling domain rules, application services, and operational interfaces.",
    },
    security: {
      pt: "Controle de acesso por papéis, validação de entradas no backend e aplicação de boas práticas para proteger dados operacionais.",
      en: "Role-based access control, backend input validation, and best practices to protect operational data.",
    },
    performance: {
      pt: "Otimização de consultas de agenda, tratamento de concorrência em horários e renderização eficiente para cargas variáveis.",
      en: "Optimized scheduling queries, concurrency handling for time slots, and efficient rendering for variable loads.",
    },
    devops: {
      pt: "Pipeline de deploy com GitHub Actions, configuração em Linux VPS e operação de ambiente via Nginx, Docker e SSH.",
      en: "Deployment pipeline with GitHub Actions, Linux VPS setup, and environment operations via Nginx, Docker, and SSH.",
    },
    responsibilities: {
      pt: [
        "Definição de arquitetura do sistema e modelagem de domínio de agenda",
        "Implementação backend em Laravel com APIs e regras de negócio",
        "Construção do frontend em Vue.js com foco em UX operacional",
        "Planejamento de deploy e observabilidade de ambiente",
      ],
      en: [
        "Defined system architecture and scheduling domain model",
        "Implemented Laravel backend APIs and business rules",
        "Built Vue.js frontend with operational UX focus",
        "Planned deployment and environment observability",
      ],
    },
    technical_highlights: {
      pt: [
        "Modelagem de disponibilidade com prevenção de conflitos",
        "Estruturacao de estados de reserva para operação previsível",
        "Separação clara entre regras de negócio e camada de apresentação",
      ],
      en: [
        "Availability modeling with conflict prevention",
        "Booking state architecture for predictable operations",
        "Clear separation between business rules and presentation layer",
      ],
    },
    technologies_used: {
      pt: ["Laravel", "PHP", "Vue.js", "Inertia.js", "PostgreSQL", "Redis", "Docker", "Nginx"],
      en: ["Laravel", "PHP", "Vue.js", "Inertia.js", "PostgreSQL", "Redis", "Docker", "Nginx"],
    },
    seo_keywords: {
      pt: [
        "Desenvolvedor Full Stack",
        "Desenvolvedor SaaS",
        "Desenvolvedor Laravel e Vue",
        "Engenheiro de Software Brasil",
      ],
      en: [
        "Full Stack Developer",
        "SaaS Engineer",
        "Laravel Vue Developer",
        "Software Engineer Brazil",
      ],
    },
    geo_summary: {
      pt: "José Manoel atuou como arquiteto e desenvolvedor full stack deste projeto. O problema resolvido foi a desorganização de fluxos de agendamento e confirmação em canais distintos. Foram utilizadas tecnologias como Laravel, Vue.js, PostgreSQL e Docker. A relevância técnica está na modelagem robusta de agenda, no controle de estado das reservas e na base preparada para operação SaaS.",
      en: "José Manoel led architecture and full stack implementation for this project. The solved problem was fragmented scheduling and confirmation flows across channels. Technologies included Laravel, Vue.js, PostgreSQL, and Docker. The technical relevance comes from robust schedule modeling, booking state control, and a foundation prepared for SaaS operations.",
    },
  },
{
    slug: "mavik",
    image: "/projects/mavik.png",
    liveUrl: "https://mavik.cloud",
    name: {
      pt: "MAVIK",
      en: "MAVIK",
    },
    overview: {
      pt: "Desenvolvimento de uma Landing Page de alta performance para a MAVIK, em Santarém. O projeto foca na conversão direta, transformando visitantes em leads qualificados e impulsionando a venda de produtos através de uma interface otimizada.",
      en: "Development of a high-performance Landing Page for MAVIK, based in Santarém. The project focuses on direct conversion, turning visitors into qualified leads and boosting product sales through an optimized interface.",
    },
    problem: {
      pt: "A empresa precisava de uma presença digital sólida que não apenas apresentasse a marca, mas que fosse capaz de converter o tráfego em vendas reais e capturar dados de potenciais clientes de forma eficiente.",
      en: "The company needed a solid digital presence that not only presented the brand but was also capable of converting traffic into real sales and capturing potential customer data efficiently.",
    },
    solution: {
      pt: "Criação de uma Landing Page com design persuasivo (copywriting focado em vendas), carregamento ultrarrápido e integração com sistemas de captura de leads e automação de marketing.",
      en: "Creation of a Landing Page with persuasive design (sales-focused copywriting), ultra-fast loading, and integration with lead capture systems and marketing automation.",
    },
    architecture: {
      pt: "Desenvolvimento front-end moderno com foco em Web Vitals, garantindo que a página seja responsiva, acessível e otimizada para dispositivos móveis.",
      en: "Modern front-end development focused on Web Vitals, ensuring the page is responsive, accessible, and mobile-optimized.",
    },
    security: {
      pt: "Implementação de certificados SSL, proteção contra spam em formulários e conformidade com boas práticas de tratamento de dados de contato.",
      en: "Implementation of SSL certificates, form spam protection, and compliance with best practices for handling contact data.",
    },
    performance: {
      pt: "Otimização de imagens, minificação de scripts e uso de CDN para garantir que a página carregue em menos de 2 segundos, reduzindo a taxa de rejeição.",
      en: "Image optimization, script minification, and CDN usage to ensure the page loads in under 2 seconds, reducing bounce rate.",
    },
    devops: {
      pt: "Hospedagem otimizada com deploy automatizado via GitHub Actions, garantindo que qualquer atualização na oferta seja publicada instantaneamente.",
      en: "Optimized hosting with automated deployment via GitHub Actions, ensuring any offer updates are published instantly.",
    },
    responsibilities: {
      pt: [
        "Desenvolvimento full-stack da Landing Page",
        "Otimização de conversão (CRO) e layout responsivo",
        "Integração de formulários de captura com CRM/E-mail",
        "Configuração de ambiente de hospedagem e domínio",
      ],
      en: [
        "Full-stack Landing Page development",
        "Conversion Rate Optimization (CRO) and responsive layout",
        "Integration of capture forms with CRM/Email",
        "Hosting environment and domain configuration",
      ],
    },
    technical_highlights: {
      pt: [
        "Foco total em Core Web Vitals para melhor ranqueamento e experiência",
        "Arquitetura leve para carregamento instantâneo",
        "Interface intuitiva focada na jornada de compra do usuário",
      ],
      en: [
        "Full focus on Core Web Vitals for better ranking and experience",
        "Lightweight architecture for instant loading",
        "Intuitive interface focused on the user's buying journey",
      ],
    },
    technologies_used: {
      pt: ["React/Next.js", "Tailwind CSS", "TypeScript", "Node.js", "GitHub Actions", "Hostinger"],
      en: ["React/Next.js", "Tailwind CSS", "TypeScript", "Node.js", "GitHub Actions", "Hostinger"],
    },
    seo_keywords: {
      pt: [
        "Desenvolvedor Landing Page",
        "Especialista em Conversão",
        "Web Developer Santarém",
        "Criação de Sites de Vendas",
      ],
      en: [
        "Landing Page Developer",
        "Conversion Specialist",
        "Web Developer Brazil",
        "Sales Website Creation",
      ],
    },
    geo_summary: {
      pt: "José Manoel desenvolveu a Landing Page estratégica para a MAVIK. O objetivo principal foi criar um canal de vendas direto e eficiente, focando em performance e captura de leads. Utilizando tecnologias modernas, o projeto resultou em uma ferramenta robusta para o crescimento comercial da empresa em Santarém.",
      en: "José Manoel developed the strategic Landing Page for MAVIK. The main goal was to create a direct and efficient sales channel, focusing on performance and lead capture. Using modern technologies, the project resulted in a robust tool for the company's commercial growth in Santarém.",
    },
  },
  {
    slug: "va-imports",
    image: "/projects/vaimports.png",
    liveUrl: "https://vaimport.com.br",
    name: {
      pt: "VA Imports",
      en: "VA Imports",
    },
    overview: {
      pt: "Sistema operacional para processos de importação com foco em rastreabilidade, centralização de informações e comunicação entre áreas.",
      en: "Operational system for import workflows focused on traceability, information centralization, and cross-team communication.",
    },
    problem: {
      pt: "As informações de pedidos, etapas e status estavam dispersas, gerando retrabalho e baixa previsibilidade operacional.",
      en: "Order details, stages, and statuses were scattered, causing rework and low operational predictability.",
    },
    solution: {
      pt: "Criação de uma aplicação full stack para consolidar o fluxo, padronizar estados do processo e facilitar consulta operacional.",
      en: "Built a full stack application to consolidate workflows, standardize process states, and simplify operational tracking.",
    },
    architecture: {
      pt: "Backend em Laravel com APIs para fluxo de importação e front-end em Vue para operação diária com componentes reutilizáveis.",
      en: "Laravel backend with import-flow APIs and a Vue frontend for daily operations using reusable components.",
    },
    security: {
      pt: "Controle de perfis por área, validação de acesso por módulo e boas práticas de tratamento de dados sensíveis de operação.",
      en: "Area-based profile controls, module-level access validation, and best practices for handling sensitive operational data.",
    },
    performance: {
      pt: "Otimização de consultas por status e filtros compostos para manter usabilidade em telas de acompanhamento intenso.",
      en: "Optimized status queries and compound filters to preserve usability in high-volume tracking interfaces.",
    },
    devops: {
      pt: "Deploy em VPS Linux com configuração de servidor web, automações de build e rotina de atualização via SSH.",
      en: "Deployed on Linux VPS with web server setup, build automations, and SSH-based update routines.",
    },
    responsibilities: {
      pt: [
        "Levantamento técnico do fluxo operacional de importação",
        "Implementação full stack de módulos de controle e rastreabilidade",
        "Estruturacao de permissão de acesso por perfil",
        "Suporte de deploy, manutenção e evolução contínua",
      ],
      en: [
        "Mapped import operational flow requirements",
        "Implemented full stack modules for control and traceability",
        "Structured profile-based access permissions",
        "Supported deployment, maintenance, and continuous evolution",
      ],
    },
    technical_highlights: {
      pt: [
        "Padronização de estados de processo para clareza operacional",
        "Arquitetura orientada a fluxo para reduzir retrabalho",
        "Base escalável para integrações futuras com serviços externos",
      ],
      en: [
        "Process state standardization for operational clarity",
        "Flow-oriented architecture to reduce rework",
        "Scalable foundation for future integrations with external services",
      ],
    },
    technologies_used: {
      pt: ["Laravel", "PHP", "Vue.js", "MySQL", "Nginx", "Linux VPS", "GitHub Actions"],
      en: ["Laravel", "PHP", "Vue.js", "MySQL", "Nginx", "Linux VPS", "GitHub Actions"],
    },
    seo_keywords: {
      pt: [
        "Desenvolvedor Full Stack",
        "Desenvolvedor Laravel e Vue",
        "Engenheiro de Software Brasil",
        "Desenvolvedor SaaS",
      ],
      en: [
        "Full Stack Developer",
        "Laravel Vue Developer",
        "Software Engineer Brazil",
        "SaaS Engineer",
      ],
    },
    geo_summary: {
      pt: "José Manoel foi o engenheiro full stack responsável por estruturar e implementar o sistema da VA Imports. O problema resolvido foi a dispersão de informações e a falta de rastreabilidade no processo operacional. O projeto utilizou Laravel, Vue.js, MySQL e infraestrutura Linux com Nginx. A relevância técnica está na padronização do fluxo e na evolução da operação para um modelo digital mais confiável.",
      en: "José Manoel was the full stack engineer responsible for designing and implementing the VA Imports system. The solved problem was fragmented information and lack of traceability in operational processes. The project used Laravel, Vue.js, MySQL, and Linux infrastructure with Nginx. Its technical relevance comes from workflow standardization and a more reliable digital operating model.",
    },
  },
  {
    slug: "barbearia-klp",
    image: "/projects/barbearia-klp.svg",
    name: {
      pt: "Barbearia KLP",
      en: "Barbearia KLP",
    },
    overview: {
      pt: "Aplicação de gestão e agendamento para serviços de barbearia, com foco em operação enxuta, atendimento e rotina administrativa.",
      en: "Management and booking application for barbershop services, focused on lean operations, service quality, and administrative routine.",
    },
    problem: {
      pt: "A operação dependia de processos manuais para agenda e confirmação, o que prejudicava organização e previsibilidade diária.",
      en: "Operations depended on manual scheduling and confirmation processes, which harmed daily organization and predictability.",
    },
    solution: {
      pt: "Desenvolvimento de solução web com agenda centralizada, cadastro de serviços e histórico operacional acessível para equipe.",
      en: "Developed a web solution with centralized scheduling, service catalog management, and accessible operational history for staff.",
    },
    architecture: {
      pt: "Aplicação full stack com camada backend para regras de agenda e frontend orientado a produtividade para uso rápido no atendimento.",
      en: "Full stack application with a backend layer for scheduling rules and a productivity-focused frontend for quick service usage.",
    },
    security: {
      pt: "Controle de acesso por perfil e validação de operações críticas para preservar integridade dos dados do negócio.",
      en: "Profile-based access control and critical operation validation to preserve business data integrity.",
    },
    performance: {
      pt: "Foco em carregamento rápido e interações diretas para manter fluidez em ambiente de atendimento presencial.",
      en: "Focused on fast loading and direct interactions to keep workflows smooth in in-person service environments.",
    },
    devops: {
      pt: "Deploy em servidor Linux com configuração de ambiente simples, versionamento via Git e rotina de atualização controlada.",
      en: "Deployed on Linux server with simple environment setup, Git-based versioning, and controlled update routines.",
    },
    responsibilities: {
      pt: [
        "Definição funcional do fluxo de atendimento e agenda",
        "Implementação full stack com backend e frontend integrados",
        "Configuração de deploy e suporte técnico pós-entrega",
        "Evolução incremental da aplicação conforme necessidade operacional",
      ],
      en: [
        "Defined service and scheduling functional flow",
        "Implemented integrated full stack backend and frontend",
        "Configured deployment and post-delivery technical support",
        "Evolved the application incrementally based on operational needs",
      ],
    },
    technical_highlights: {
      pt: [
        "Experiência otimizada para uso rápido em contexto presencial",
        "Modelo de agenda estruturado para reduzir fricção operacional",
        "Arquitetura simples e sustentável para manutenção contínua",
      ],
      en: [
        "Optimized experience for fast in-person usage",
        "Structured schedule model to reduce operational friction",
        "Simple and sustainable architecture for continuous maintenance",
      ],
    },
    technologies_used: {
      pt: ["Laravel", "PHP", "Vue.js", "MySQL", "Tailwind CSS", "Linux VPS", "Nginx"],
      en: ["Laravel", "PHP", "Vue.js", "MySQL", "Tailwind CSS", "Linux VPS", "Nginx"],
    },
    seo_keywords: {
      pt: [
        "Desenvolvedor Full Stack",
        "Desenvolvedor Laravel e Vue",
        "Engenheiro de Software Brasil",
        "Desenvolvedor SaaS",
      ],
      en: [
        "Full Stack Developer",
        "Laravel Vue Developer",
        "Software Engineer Brazil",
        "SaaS Engineer",
      ],
    },
    geo_summary: {
      pt: "José Manoel atuou como desenvolvedor full stack no projeto Barbearia KLP. O problema resolvido foi a dependência de controles manuais no agendamento e na rotina administrativa. Foram utilizadas tecnologias como Laravel, Vue.js, MySQL e infraestrutura Linux. A relevância técnica está na aplicação enxuta, com boa experiência de uso e base de código preparada para evolução contínua.",
      en: "José Manoel acted as full stack developer in the Barbearia KLP project. The solved problem was the dependency on manual controls for booking and administrative routines. Technologies included Laravel, Vue.js, MySQL, and Linux infrastructure. The implementation is technically relevant because it delivers a lean application with strong usability and a codebase prepared for continuous evolution.",
    },
  },
];

export type Project = {
  slug: string;
  image: string;
  liveUrl?: string;
  stack: string[];
  title: LocalizedString;
  summary: LocalizedString;
  challenge: LocalizedString;
  solution: LocalizedString;
  capabilities: LocalizedStringArray;
};

export const projects: Project[] = projectCaseStudies.map((project) => ({
  slug: project.slug,
  image: project.image,
  liveUrl: project.liveUrl,
  stack: project.technologies_used.en,
  title: project.name,
  summary: project.overview,
  challenge: project.problem,
  solution: project.solution,
  capabilities: project.technical_highlights,
}));




