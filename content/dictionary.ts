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
      engineering: string;
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
      text: "Portfólio com foco em backend, APIs, arquitetura e produção.",
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
      metricsTitle: "Sinais de produção",
      metricsSubtitle: "Experiência real em backend.",
      aboutTitle: "Quem eu sou",
      aboutSubtitle: "Base prática, foco atual em backend.",
      specialtiesTitle: "Stack",
      specialtiesSubtitle: "Backend, dados, infra e arquitetura.",
      experienceTitle: "Experiência",
      experienceSubtitle: "Produtos e operações reais.",
      casesTitle: "Cases",
      casesSubtitle: "Problema, solução e impacto.",
      differentiatorsTitle: "Diferenciais",
      differentiatorsSubtitle: "Valor técnico em poucos segundos.",
      technologiesTitle: "Tecnologias",
      finalCtaTitle: "Backend forte, entrega ponta a ponta quando precisa",
      finalCtaText: "APIs, multi-tenant, integrações, performance e evolução de produto.",
      finalCtaButton: "Ir para contato",
      liveProjectLabel: "Projeto online",
      readCaseLabel: "Ver case",
      viewAllCasesLabel: "Ver todos os cases",
    },
    about: {
      h1: "Sobre José Manoel Pereira",
      intro: "Backend Engineer com experiência prática em APIs, arquitetura e operação.",
      trajectoryTitle: "Trajetória",
      focusTitle: "Foco atual",
      educationTitle: "Formação",
      certificationsTitle: "Certificações",
    },
    contact: {
      h1: "Contato profissional",
      intro: "Conversa certa para APIs, backend, arquitetura, integrações e evolução de produto.",
      directTitle: "Canais diretos",
      directText: "E-mail, LinkedIn e GitHub como base. WhatsApp quando faz sentido acelerar o contato.",
      responseTitle: "Onde agrego mais valor",
      responseText: "Backend, integrações, SaaS, dados, deploy e evolução técnica de sistemas.",
      primaryButton: "Enviar e-mail",
      secondaryButton: "Abrir LinkedIn",
    },
    projects: {
      h1: "Experiência e cases",
      intro: "Recorte do que melhor representa meu momento atual em backend.",
      overviewTitle: "Visão geral",
      readCase: "Ver case completo",
      liveProject: "Ver projeto online",
      detailLabels: {
        company: "Contexto",
        challenge: "Problema",
        solution: "Solução",
        architecture: "Arquitetura",
        impact: "Impacto",
        engineering: "Notas de engenharia",
        responsibilities: "O que entreguei",
        capabilities: "Destaques",
        stack: "Stack",
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
      text: "Portfolio focused on backend, APIs, architecture, and production systems.",
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
      metricsTitle: "Production signals",
      metricsSubtitle: "Real backend experience.",
      aboutTitle: "Who I am",
      aboutSubtitle: "Practical background, current backend focus.",
      specialtiesTitle: "Stack",
      specialtiesSubtitle: "Backend, data, infra, and architecture.",
      experienceTitle: "Experience",
      experienceSubtitle: "Real products and operations.",
      casesTitle: "Case studies",
      casesSubtitle: "Problem, solution, and impact.",
      differentiatorsTitle: "Differentiators",
      differentiatorsSubtitle: "Technical value, quickly understood.",
      technologiesTitle: "Technologies",
      finalCtaTitle: "Strong backend, end-to-end delivery when needed",
      finalCtaText: "APIs, multi-tenant SaaS, integrations, performance, and product evolution.",
      finalCtaButton: "Go to contact",
      liveProjectLabel: "Live project",
      readCaseLabel: "View case",
      viewAllCasesLabel: "View all case studies",
    },
    about: {
      h1: "About José Manoel Pereira",
      intro: "Backend Engineer with hands-on experience in APIs, architecture, and operations.",
      trajectoryTitle: "Trajectory",
      focusTitle: "Current focus",
      educationTitle: "Education",
      certificationsTitle: "Certifications",
    },
    contact: {
      h1: "Professional contact",
      intro: "Best fit for APIs, backend, architecture, integrations, and product evolution.",
      directTitle: "Direct channels",
      directText: "Email, LinkedIn, and GitHub first. WhatsApp when a faster conversation helps.",
      responseTitle: "Where I add the most value",
      responseText: "Backend, integrations, SaaS, data, deployment, and technical evolution of live systems.",
      primaryButton: "Send email",
      secondaryButton: "Open LinkedIn",
    },
    projects: {
      h1: "Experience and case studies",
      intro: "A focused selection of work that best represents my current backend stage.",
      overviewTitle: "Overview",
      readCase: "View full case study",
      liveProject: "View live project",
      detailLabels: {
        company: "Context",
        challenge: "Problem",
        solution: "Solution",
        architecture: "Architecture",
        impact: "Impact",
        engineering: "Engineering notes",
        responsibilities: "What I delivered",
        capabilities: "Highlights",
        stack: "Stack",
        allProjects: "Back to case studies",
      },
    },
  },
};

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang];
}
