import type { Lang } from "@/lib/i18n";

type LocalizedString = Record<Lang, string>;
type LocalizedStringArray = Record<Lang, string[]>;

type InsightSection = {
  heading: LocalizedString;
  paragraphs: LocalizedStringArray;
};

export type InsightArticle = {
  slug: string;
  datePublished: string;
  dateModified: string;
  title: LocalizedString;
  description: LocalizedString;
  tags: LocalizedStringArray;
  sections: InsightSection[];
};

export const insights: InsightArticle[] = [
  {
    slug: "designing-tenant-isolation-with-postgresql-rls",
    datePublished: "2026-02-27",
    dateModified: "2026-02-27",
    title: {
      pt: "Como projetar isolamento de tenant com PostgreSQL RLS",
      en: "How to design tenant isolation with PostgreSQL RLS",
    },
    description: {
      pt: "Guia t\u00e9cnico sobre isolamento multi-tenant com PostgreSQL RLS, limites de aplica\u00e7\u00e3o e pr\u00e1ticas de valida\u00e7\u00e3o.",
      en: "Technical guide to multi-tenant isolation with PostgreSQL RLS, application boundaries, and validation practices.",
    },
    tags: {
      pt: ["multi-tenant", "PostgreSQL RLS", "arquitetura SaaS", "backend escal\u00e1vel"],
      en: ["multi-tenant", "PostgreSQL RLS", "SaaS architecture", "scalable backend"],
    },
    sections: [
      {
        heading: {
          pt: "Modelo de isolamento",
          en: "Isolation model",
        },
        paragraphs: {
          pt: [
            "O isolamento precisa ser pensado em camadas: aplica\u00e7\u00e3o, banco e observabilidade.",
            "RLS protege consultas sens\u00edveis quando combinado com contexto de sess\u00e3o confi\u00e1vel.",
          ],
          en: [
            "Isolation must be designed in layers: application, database, and observability.",
            "RLS protects sensitive queries when combined with reliable session context.",
          ],
        },
      },
      {
        heading: {
          pt: "Checklist de implementa\u00e7\u00e3o",
          en: "Implementation checklist",
        },
        paragraphs: {
          pt: [
            "Defina pol\u00edticas por tenant, valide acesso por papel e revise query plans com dados reais.",
            "Mantenha testes de seguran\u00e7a e regress\u00e3o para evitar vazamento de contexto.",
          ],
          en: [
            "Define tenant policies, validate role-based access, and review query plans with real data.",
            "Keep security and regression tests to avoid context leakage.",
          ],
        },
      },
    ],
  },
  {
    slug: "llm-output-reliability-in-backend-workflows",
    datePublished: "2026-02-27",
    dateModified: "2026-02-27",
    title: {
      pt: "Confiabilidade de output LLM em workflows backend",
      en: "LLM output reliability in backend workflows",
    },
    description: {
      pt: "Estrat\u00e9gias de Prompt Engineering, valida\u00e7\u00e3o com Zod e fallback para tornar sa\u00eddas de LLM seguras em produ\u00e7\u00e3o.",
      en: "Prompt Engineering strategies, Zod validation, and fallback patterns to make LLM outputs safe in production.",
    },
    tags: {
      pt: ["LLM engineering", "Prompt engineering", "OpenAI API", "structured output"],
      en: ["LLM engineering", "Prompt engineering", "OpenAI API", "structured output"],
    },
    sections: [
      {
        heading: {
          pt: "Contrato de sa\u00edda",
          en: "Output contract",
        },
        paragraphs: {
          pt: [
            "Fluxos de produ\u00e7\u00e3o precisam de contrato de dados claro, n\u00e3o apenas texto gerado.",
            "A valida\u00e7\u00e3o com schema evita persist\u00eancia de respostas amb\u00edguas ou incompletas.",
          ],
          en: [
            "Production flows require clear data contracts, not only generated text.",
            "Schema validation prevents persistence of ambiguous or incomplete responses.",
          ],
        },
      },
      {
        heading: {
          pt: "Orquestra\u00e7\u00e3o e fallback",
          en: "Orchestration and fallback",
        },
        paragraphs: {
          pt: [
            "Use etapas de classifica\u00e7\u00e3o, extra\u00e7\u00e3o e valida\u00e7\u00e3o para reduzir ru\u00eddo operacional.",
            "Fallback direcionado melhora previsibilidade quando a confian\u00e7a da resposta cai.",
          ],
          en: [
            "Use classification, extraction, and validation stages to reduce operational noise.",
            "Targeted fallback improves predictability when response confidence drops.",
          ],
        },
      },
    ],
  },
];
