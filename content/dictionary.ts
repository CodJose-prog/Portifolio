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
    badge: string;
    h1: string;
    subheadline: string;
    primaryCta: string;
    whatsAppCta: string;
    featuredTitle: string;
    featuredSubtitle: string;
    technologiesTitle: string;
    faqTitle: string;
    finalCtaTitle: string;
    finalCtaText: string;
    finalCtaButton: string;
  };
  about: {
    h1: string;
    intro: string;
    sections: {
      title: string;
      content: string[];
    }[];
  };
  contact: {
    h1: string;
    intro: string;
    directTitle: string;
    directItems: string[];
    responseTitle: string;
    responseItems: string[];
  };
  projects: {
    h1: string;
    intro: string;
    readCase: string;
    detailLabels: {
      challenge: string;
      solution: string;
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
      projects: "Projetos",
      about: "Sobre",
      contact: "Contato",
      cta: "Fale comigo",
    },
    footer: {
      text: "Portfólio profissional com foco em engenharia de software moderna.",
      sourceCode: "Código no GitHub",
    },
    breadcrumbs: {
      home: "Início",
      projects: "Projetos",
      about: "Sobre",
      contact: "Contato",
      blog: "Blog",
      insights: "Insights",
    },
    home: {
      badge: "Desenvolvedor Full Stack",
      h1: "Desenvolvedor Full Stack e Engenheiro de Software",
      subheadline: "Experiência em liderança técnica, SaaS multi-tenant e integração de sistemas com Laravel, Vue.js, Node.js e TypeScript.",
      primaryCta: "Ver projetos",
      whatsAppCta: "Falar comigo (WhatsApp)",
      featuredTitle: "Projetos em destaque",
      featuredSubtitle: "Casos reais com foco em produto, arquitetura e entrega.",
      technologiesTitle: "Tecnologias que domino",
      faqTitle: "FAQ",
      finalCtaTitle: "Vamos construir algo sólido?",
      finalCtaText: "Se você precisa evoluir um produto ou iniciar um sistema novo, posso apoiar da arquitetura à entrega.",
      finalCtaButton: "Ir para contato",
    },
    about: {
      h1: "Sobre José Manoel Pereira",
      intro:
        "Desenvolvedor Full Stack com experiência em liderança técnica de projetos e empreendedorismo de software. Especialista na arquitetura de soluções SaaS multi-tenant escaláveis utilizando o ecossistema PHP (Laravel) e JavaScript (Vue.js).",
      sections: [
        {
          title: "Resumo profissional",
          content: [
            "Desenvolvedor Full Stack com experiência em liderança técnica de projetos e empreendedorismo de software. Especialista na arquitetura de soluções SaaS Multi-tenant escaláveis utilizando oecossistema PHP (Laravel) e JavaScript (Vue.js). Focado em boas práticas de engenharia desoftware, incluindo documentação técnica, padrões de projeto (Design Patterns) e integração de sistemas complexos. Ativo em comunidades de tecnologia, buscando sempre compartilhar conhecimento e aplicar inovações em produtos reais.",
          ],
        },
        {
          title: "Formação acadêmica",
          content: [
            "Análise e Desenvolvimento de Sistemas - UNAMA (Conclusão: 2025).",
            "Técnico em Desenvolvimento de Sistemas - IFPA (Conclusão: 2023).",
          ],
        },
        {
          title: "Certificações e comunidade",
          content: [
            "Maratona SBC de Programação - Fase Zero.",
            "Java Foundations Certified Junior Associate (Preparatório) - Oracle Academy.",
            "Desenvolvimento Web Moderno com PHP - Udemy.",
            "Microservices Architecture with Golang - Workshop UNAMA.",
            "AI & Machine Learning Concepts - Workshop Técnico.",
          ],
        },
      ],
    },
    contact: {
      h1: "Contato profissional",
      intro:
        "Se você busca um engenheiro de software para construir ou evoluir um produto web, posso apoiar da descoberta técnica à entrega.",
      directTitle: "Canais diretos",
      directItems: [
        "Telefone: +55 93 99227-3046",
        "LinkedIn para propostas e alinhamento de escopo",
        "GitHub para avaliação de estilo de código e arquitetura",
        "WhatsApp para contato comercial direto",
      ],
      responseTitle: "Tipos de projeto",
      responseItems: [
        "Aplicações web e sistemas internos",
        "APIs, integrações e automações de processo",
        "Evolução de arquitetura e performance",
        "Projetos full stack com Laravel, Vue, React/Next.js e TypeScript",
      ],
    },
    projects: {
      h1: "Experiência profissional",
      intro:
        "Linha do tempo profissional em ordem cronológica descendente, baseada no currículo oficial.",
      readCase: "Ver case completo",
      detailLabels: {
        challenge: "Desafio",
        solution: "Solução",
        capabilities: "Capacidades técnicas",
        stack: "Stack utilizada",
        allProjects: "Todos os projetos",
      },
    },
  },
  en: {
    locale: "en-US",
    nav: {
      home: "Home",
      projects: "Projects",
      about: "About",
      contact: "Contact",
      cta: "Get in touch",
    },
    footer: {
      text: "Professional portfolio focused on modern software engineering.",
      sourceCode: "Source on GitHub",
    },
    breadcrumbs: {
      home: "Home",
      projects: "Projects",
      about: "About",
      contact: "Contact",
      blog: "Blog",
      insights: "Insights",
    },
    home: {
      badge: "Full Stack Developer",
      h1: "Full Stack Developer and Software Engineer",
      subheadline: "Experience in technical leadership, multi-tenant SaaS architecture, and system integration with Laravel, Vue.js, Node.js, and TypeScript.",
      primaryCta: "View projects",
      whatsAppCta: "Talk to me (WhatsApp)",
      featuredTitle: "Featured projects",
      featuredSubtitle: "Real cases focused on product, architecture, and delivery.",
      technologiesTitle: "Technologies I work with",
      faqTitle: "FAQ",
      finalCtaTitle: "Need a strong technical partner?",
      finalCtaText: "If you need to improve an existing product or start a new system, I can support architecture and delivery.",
      finalCtaButton: "Go to contact",
    },
    about: {
      h1: "About José Manoel Pereira",
      intro:
        "Full Stack Developer with experience in technical leadership and software entrepreneurship. Specialized in architecting scalable multi-tenant SaaS solutions using the PHP ecosystem (Laravel) and JavaScript (Vue.js).",
      sections: [
        {
          title: "Professional summary",
          content: [
            "Focused on software engineering best practices, technical documentation, design patterns, and complex system integration.",
            "Active in technology communities.",
          ],
        },
        {
          title: "Academic background",
          content: [
            "Systems Analysis and Development - UNAMA (Graduated: 2025).",
            "Technical Degree in Systems Development - IFPA (Graduated: 2023).",
          ],
        },
        {
          title: "Certifications and community",
          content: [
            "SBC Programming Marathon - Zero Phase.",
            "Java Foundations Certified Junior Associate (Preparatory) - Oracle Academy.",
            "Modern Web Development with PHP - Udemy.",
            "Microservices Architecture with Golang - UNAMA Workshop.",
            "AI & Machine Learning Concepts - Technical Workshop.",
          ],
        },
      ],
    },
    contact: {
      h1: "Professional contact",
      intro:
        "If you need a software engineer to build or evolve a web product, I can support technical discovery, architecture, and delivery.",
      directTitle: "Direct channels",
      directItems: [
        "Phone: +55 93 99227-3046",
        "LinkedIn for project discussion and scope alignment",
        "GitHub for code style and architecture references",
        "WhatsApp for direct hiring communication",
      ],
      responseTitle: "Project types",
      responseItems: [
        "Web applications and internal systems",
        "APIs, integrations, and process automation",
        "Architecture and performance improvements",
        "Full stack delivery with Laravel, Vue, React/Next.js, and TypeScript",
      ],
    },
    projects: {
      h1: "Professional experience",
      intro: "Professional timeline in descending chronological order, based on the official resume.",
      readCase: "View full case study",
      detailLabels: {
        challenge: "Challenge",
        solution: "Solution",
        capabilities: "Technical capabilities",
        stack: "Stack",
        allProjects: "All projects",
      },
    },
  },
};

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang];
}
