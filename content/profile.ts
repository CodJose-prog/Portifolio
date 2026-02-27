type Locale = "pt" | "en";
type LocalizedString = Record<Locale, string>;

export const profile = {
  name: "José Manoel Pereira",
  location: {
    pt: "Santarém, PA - Brasil",
    en: "Santarém, Pará - Brazil",
  } satisfies LocalizedString,
  phone: "+55 93 99227-3046",
  linkedin: "https://linkedin.com/in/jose-manoel-dev",
  github: "https://github.com/CodJose-prog",
  summary: {
    pt: "Desenvolvedor Full Stack com experiência em liderança técnica de projetos e empreendedorismo de software. Especialista na arquitetura de soluções SaaS multi-tenant escaláveis utilizando o ecossistema PHP (Laravel) e JavaScript (Vue.js). Focado em boas práticas de engenharia de software, documentação técnica, Design Patterns e integração de sistemas complexos. Ativo em comunidades de tecnologia.",
    en: "Full Stack Developer with experience in technical leadership and software entrepreneurship. Specialized in architecting scalable multi-tenant SaaS solutions using the PHP ecosystem (Laravel) and JavaScript (Vue.js). Focused on software engineering best practices, technical documentation, design patterns, and complex system integration. Active in technology communities.",
  } satisfies LocalizedString,
};
