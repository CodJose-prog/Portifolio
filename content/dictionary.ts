import type { Lang } from "@/lib/i18n";

export type Dictionary = {
  locale: string;
  nav: {
    home: string;
    projects: string;
    about: string;
    contact: string;
    cta: string;
  };
  footer: {
    text: string;
    sourceCode: string;
    contactTitle: string;
    locationTitle: string;
    navigationTitle: string;
  };
  breadcrumbs: {
    home: string;
    projects: string;
    about: string;
    contact: string;
    blog: string;
    insights: string;
  };
  home: {
    primaryCta: string;
    secondaryCta: string;
    metricsTitle: string;
    metricsSubtitle: string;
    aboutTitle: string;
    aboutSubtitle: string;
    specialtiesTitle: string;
    specialtiesSubtitle: string;
    experienceTitle: string;
    experienceSubtitle: string;
    casesTitle: string;
    casesSubtitle: string;
    differentiatorsTitle: string;
    differentiatorsSubtitle: string;
    technologiesTitle: string;
    faqTitle: string;
    finalCtaTitle: string;
    finalCtaText: string;
    finalCtaButton: string;
    liveProjectLabel: string;
    readCaseLabel: string;
    viewAllCasesLabel: string;
  };
  about: {
    h1: string;
    intro: string;
    trajectoryTitle: string;
    focusTitle: string;
    educationTitle: string;
    certificationsTitle: string;
  };
  contact: {
    h1: string;
    intro: string;
    directTitle: string;
    directText: string;
    responseTitle: string;
    responseText: string;
    primaryButton: string;
    secondaryButton: string;
  };
  projects: {
    h1: string;
    intro: string;
    overviewTitle: string;
    readCase: string;
    liveProject: string;
    detailLabels: {
      company: string;
      challenge: string;
      solution: string;
      architecture: string;
      impact: string;
      security: string;
      performance: string;
      devops: string;
      responsibilities: string;
      capabilities: string;
      stack: string;
      allProjects: string;
    };
  };
};

export const dictionaries: Record<Lang, Dictionary> = {
  pt: {
    locale: "pt-BR",
    nav: {
      home: "Início",
      projects: "Cases",
      about: "Sobre",
      contact: "Contato",
      cta: "Falar comigo",
    },
    footer: {
      text: "Portfólio de backend engineering com foco em APIs, arquitetura, operação e sistemas reais em produção.",
      sourceCode: "Código no GitHub",
      contactTitle: "Contato",
      locationTitle: "Base",
      navigationTitle: "Navegação",
    },
    breadcrumbs: {
      home: "Início",
      projects: "Cases",
      about: "Sobre",
      contact: "Contato",
      blog: "Blog",
      insights: "Insights",
    },
    home: {
      primaryCta: "Ver cases",
      secondaryCta: "Entrar em contato",
      metricsTitle: "Experiência aplicada em backend real",
      metricsSubtitle: "Indicadores extraídos do currículo e convertidos em sinais claros de maturidade técnica.",
      aboutTitle: "Quem eu sou",
      aboutSubtitle: "Trajetória, formação e foco atual em engenharia backend.",
      specialtiesTitle: "Stack e especialidades",
      specialtiesSubtitle: "Organização por domínio técnico, com ênfase em backend, dados, infraestrutura e arquitetura.",
      experienceTitle: "Experiência em produção",
      experienceSubtitle: "Projetos, produtos e operações que exigiram backend confiável, integrações e visão arquitetural.",
      casesTitle: "Cases em destaque",
      casesSubtitle: "Problema, solução, stack e impacto em experiências com maior densidade técnica.",
      differentiatorsTitle: "Diferenciais",
      differentiatorsSubtitle: "O que reforça meu posicionamento como backend engineer e não como full stack genérico.",
      technologiesTitle: "Tecnologias que sustentam minha entrega",
      faqTitle: "Perguntas rápidas",
      finalCtaTitle: "Se você precisa de backend sólido, posso ajudar",
      finalCtaText: "Atuo em APIs, SaaS multi-tenant, integrações, infraestrutura de aplicação e evolução técnica de sistemas já em produção.",
      finalCtaButton: "Ir para contato",
      liveProjectLabel: "Projeto online",
      readCaseLabel: "Ver case",
      viewAllCasesLabel: "Ver todos os cases",
    },
    about: {
      h1: "Sobre José Manoel Pereira",
      intro: "Backend Engineer com experiência prática em APIs, Laravel, Node.js, arquitetura backend, SaaS multi-tenant, PostgreSQL, Docker e CI/CD.",
      trajectoryTitle: "Trajetória e posicionamento",
      focusTitle: "Foco técnico atual",
      educationTitle: "Formação",
      certificationsTitle: "Certificações e comunidade",
    },
    contact: {
      h1: "Contato profissional",
      intro: "Se você está procurando alguém para construir ou evoluir backend com visão de produto, arquitetura e operação, este é o tipo de conversa que faz sentido para mim.",
      directTitle: "Canais diretos",
      directText: "LinkedIn, GitHub e e-mail como canais principais. WhatsApp pode ser usado para agilizar contato comercial quando necessário.",
      responseTitle: "Projetos em que consigo agregar mais valor",
      responseText: "APIs, integrações, sistemas Laravel e Node.js, SaaS multi-tenant, otimização de consultas, deploy, CI/CD e backend para produtos em evolução.",
      primaryButton: "Enviar e-mail",
      secondaryButton: "Abrir LinkedIn",
    },
    projects: {
      h1: "Experiência e cases",
      intro: "Recorte das experiências que melhor representam meu momento atual como backend engineer, com foco em APIs, arquitetura, dados e operação.",
      overviewTitle: "Visão geral",
      readCase: "Ver case completo",
      liveProject: "Ver projeto online",
      detailLabels: {
        company: "Contexto",
        challenge: "Problema",
        solution: "Solução",
        architecture: "Arquitetura backend",
        impact: "Impacto",
        security: "Segurança",
        performance: "Performance",
        devops: "Infra e entrega",
        responsibilities: "Responsabilidades",
        capabilities: "Destaques técnicos",
        stack: "Stack utilizada",
        allProjects: "Voltar para os cases",
      },
    },
  },
  en: {
    locale: "en-US",
    nav: {
      home: "Home",
      projects: "Cases",
      about: "About",
      contact: "Contact",
      cta: "Get in touch",
    },
    footer: {
      text: "Backend engineering portfolio focused on APIs, architecture, operations, and real production systems.",
      sourceCode: "Source on GitHub",
      contactTitle: "Contact",
      locationTitle: "Base",
      navigationTitle: "Navigation",
    },
    breadcrumbs: {
      home: "Home",
      projects: "Cases",
      about: "About",
      contact: "Contact",
      blog: "Blog",
      insights: "Insights",
    },
    home: {
      primaryCta: "View case studies",
      secondaryCta: "Get in touch",
      metricsTitle: "Applied experience in real backend systems",
      metricsSubtitle: "Signals extracted from the resume and translated into practical engineering evidence.",
      aboutTitle: "Who I am",
      aboutSubtitle: "Trajectory, education, and current focus on backend engineering.",
      specialtiesTitle: "Stack and specialties",
      specialtiesSubtitle: "Organized by technical domain, with emphasis on backend, data, infrastructure, and architecture.",
      experienceTitle: "Production experience",
      experienceSubtitle: "Products and operations that required reliable backend work, integrations, and architectural judgment.",
      casesTitle: "Featured case studies",
      casesSubtitle: "Problem, solution, stack, and impact from the most technically dense experiences.",
      differentiatorsTitle: "Differentiators",
      differentiatorsSubtitle: "What reinforces my positioning as a backend engineer rather than a generic full stack profile.",
      technologiesTitle: "Technologies behind my delivery",
      faqTitle: "Quick questions",
      finalCtaTitle: "If you need strong backend foundations, I can help",
      finalCtaText: "I work on APIs, multi-tenant SaaS, integrations, application infrastructure, and technical evolution for systems already in production.",
      finalCtaButton: "Go to contact",
      liveProjectLabel: "Live project",
      readCaseLabel: "View case",
      viewAllCasesLabel: "View all case studies",
    },
    about: {
      h1: "About José Manoel Pereira",
      intro: "Backend Engineer with hands-on experience in APIs, Laravel, Node.js, backend architecture, multi-tenant SaaS, PostgreSQL, Docker, and CI/CD.",
      trajectoryTitle: "Trajectory and positioning",
      focusTitle: "Current technical focus",
      educationTitle: "Education",
      certificationsTitle: "Certifications and community",
    },
    contact: {
      h1: "Professional contact",
      intro: "If you are looking for someone to build or evolve backend systems with product vision, architecture, and operations in mind, that is the kind of work I fit best.",
      directTitle: "Direct channels",
      directText: "LinkedIn, GitHub, and email are the primary channels. WhatsApp can be used when a faster commercial conversation makes sense.",
      responseTitle: "Projects where I add the most value",
      responseText: "APIs, integrations, Laravel and Node.js systems, multi-tenant SaaS, query optimization, deployment, CI/CD, and backend evolution for live products.",
      primaryButton: "Send email",
      secondaryButton: "Open LinkedIn",
    },
    projects: {
      h1: "Experience and case studies",
      intro: "A selection of experiences that best represent my current stage as a backend engineer, focused on APIs, architecture, data, and operations.",
      overviewTitle: "Overview",
      readCase: "View full case study",
      liveProject: "View live project",
      detailLabels: {
        company: "Context",
        challenge: "Problem",
        solution: "Solution",
        architecture: "Backend architecture",
        impact: "Impact",
        security: "Security",
        performance: "Performance",
        devops: "Infra and delivery",
        responsibilities: "Responsibilities",
        capabilities: "Technical highlights",
        stack: "Stack",
        allProjects: "Back to case studies",
      },
    },
  },
};

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang];
}
