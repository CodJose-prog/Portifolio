import type { Lang } from "@/lib/i18n";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { projectCaseStudies } from "@/content/projects";
import {
  terminalCommands,
  terminalCopy,
  type TerminalCommandName,
  type TerminalLine,
  type TerminalTone,
} from "@/content/terminal";

export type TerminalExecution =
  | {
      kind: "output";
      command: string;
      lines: TerminalLine[];
    }
  | {
      kind: "clear";
      command: string;
    };

const commandAliases = new Map<string, TerminalCommandName>([
  ["help", "help"],
  ["whoami", "whoami"],
  ["experience", "experience"],
  ["projects", "projects"],
  ["mavik", "mavik"],
  ["golden-project", "golden-project"],
  ["golden", "golden-project"],
  ["stack", "stack"],
  ["contact", "contact"],
  ["clear", "clear"],
  ["cls", "clear"],
]);

const projectSlugAliases = new Set(
  projectCaseStudies.map((project) => project.slug.toLowerCase()),
);

function text(text: string, tone: TerminalTone = "default"): TerminalLine {
  return { kind: "text", text, tone };
}

function spacer(): TerminalLine {
  return { kind: "spacer" };
}

function linkLine(textLabel: string, href: string, linkLabel?: string): TerminalLine {
  return { kind: "text", text: textLabel, href, linkLabel, external: true };
}

function findProject(slug: string) {
  return projectCaseStudies.find((project) => project.slug === slug);
}

function helpLines(lang: Lang): TerminalLine[] {
  const copy = terminalCopy[lang];
  return [
    { kind: "text", text: copy.helpIntro, tone: "success" },
    ...terminalCommands.map((command) => ({
      kind: "text" as const,
      text: `${command.padEnd(14, " ")} ${copy.commandDescriptions[command]}`,
      tone: "accent" as const,
    })),
    spacer(),
    text(
      lang === "pt"
        ? "Opcional: use 'project <slug>' para abrir um case especifico."
        : "Optional: use 'project <slug>' to open a specific case.",
      "muted",
    ),
  ];
}

function whoAmILines(lang: Lang): TerminalLine[] {
  return lang === "pt"
    ? [
        text("Jose Manoel Pereira", "success"),
        text("Backend Engineer", "accent"),
        text("Foco atual: Laravel, Node.js, APIs REST, SaaS, multi-tenant, PostgreSQL, Docker e CI/CD."),
        text("Atuacao principal em backend, arquitetura, dados, integracoes e operacao real."),
        text("Tambem entrega sistemas completos ponta a ponta quando o projeto exige.", "muted"),
      ]
    : [
        text("Jose Manoel Pereira", "success"),
        text("Backend Engineer", "accent"),
        text("Current focus: Laravel, Node.js, REST APIs, SaaS, multi-tenant, PostgreSQL, Docker, and CI/CD."),
        text("Primary work in backend, architecture, data, integrations, and real operations."),
        text("Also ships complete end-to-end systems when the project requires it.", "muted"),
      ];
}

function experienceLines(lang: Lang): TerminalLine[] {
  const intro =
    lang === "pt" ? "Experiencias principais:" : "Main experience:";

  return [
    text(intro, "success"),
    ...experience.flatMap((entry) => [
      text(`${entry.company} | ${entry.role[lang]} | ${entry.period[lang]}`, "accent"),
      text(entry.summary[lang], "muted"),
      spacer(),
    ]),
  ];
}

function projectsLines(lang: Lang): TerminalLine[] {
  const arena = findProject("arena-calendar");
  const golden = findProject("frigorifico-tracking");
  const mavik = findProject("mavik");

  if (!arena || !golden || !mavik) {
    return [text(lang === "pt" ? "Nao consegui carregar os projetos." : "Could not load projects.", "error")];
  }

  return lang === "pt"
    ? [
        text("Projetos principais:", "success"),
        text(`ArenaCalendar | ${arena.overview.pt}`, "accent"),
        text(`Projeto de Ouro | ${golden.overview.pt}`, "accent"),
        text(`MAVIK | ${mavik.overview.pt}`, "accent"),
        spacer(),
        text("Dica: use 'golden-project' ou 'mavik' para detalhes.", "muted"),
      ]
    : [
        text("Main projects:", "success"),
        text(`ArenaCalendar | ${arena.overview.en}`, "accent"),
        text(`Flagship Project | ${golden.overview.en}`, "accent"),
        text(`MAVIK | ${mavik.overview.en}`, "accent"),
        spacer(),
        text("Tip: use 'golden-project' or 'mavik' for details.", "muted"),
      ];
}

function mavikLines(lang: Lang): TerminalLine[] {
  const mavik = findProject("mavik");
  if (!mavik) {
    return [text(lang === "pt" ? "MAVIK indisponivel." : "MAVIK unavailable.", "error")];
  }

  return lang === "pt"
    ? [
        text("MAVIK", "success"),
        text("Empresa de software e consultoria do Jose Manoel.", "accent"),
        text("Atua com backend, APIs, sistemas web/mobile, integracoes e solucoes sob medida."),
        text("Tambem funciona como porta de entrada comercial para novos projetos.", "muted"),
        linkLine("Contratar MAVIK ->", mavik.liveUrl ?? "https://mavik.cloud", "mavik.cloud"),
      ]
    : [
        text("MAVIK", "success"),
        text("Jose Manoel's software and consulting company.", "accent"),
        text("Works across backend, APIs, web/mobile systems, integrations, and tailored solutions."),
        text("Also serves as the commercial entry point for new projects.", "muted"),
        linkLine("Hire MAVIK ->", mavik.liveUrl ?? "https://mavik.cloud", "mavik.cloud"),
      ];
}

function goldenProjectLines(lang: Lang): TerminalLine[] {
  const golden = findProject("frigorifico-tracking");
  if (!golden) {
    return [text(lang === "pt" ? "Projeto de ouro indisponivel." : "Flagship project unavailable.", "error")];
  }

  return lang === "pt"
    ? [
        text("Projeto de Ouro | Plataforma de Rastreamento Operacional", "success"),
        text("Case desenvolvido pela MAVIK para cliente do setor frigorifico.", "accent"),
        text("Minha atuacao foi no backend, na API central, na modelagem de dados e na arquitetura da solucao."),
        text("A solucao conecta backend, painel web e app mobile para operacao real.", "muted"),
      ]
    : [
        text("Flagship Project | Operational Tracking Platform", "success"),
        text("Case delivered by MAVIK for a client in the cold-storage sector.", "accent"),
        text("My role was focused on backend, the central API, data modeling, and solution architecture."),
        text("The solution connects backend, web dashboard, and mobile app for real operations.", "muted"),
      ];
}

function stackLines(lang: Lang): TerminalLine[] {
  return lang === "pt"
    ? [
        text("Stack principal:", "success"),
        text("Backend   | Laravel, Node.js, TypeScript, APIs REST, JWT, Sanctum", "accent"),
        text("Dados     | PostgreSQL, MySQL, SQL, multi-tenant, RLS", "accent"),
        text("Infra     | Docker, CI/CD, Linux, Nginx", "accent"),
        text("Outros    | Integracoes externas, testes basicos, Redis em estudo/aplicacao, IA", "accent"),
      ]
    : [
        text("Main stack:", "success"),
        text("Backend   | Laravel, Node.js, TypeScript, REST APIs, JWT, Sanctum", "accent"),
        text("Data      | PostgreSQL, MySQL, SQL, multi-tenant, RLS", "accent"),
        text("Infra     | Docker, CI/CD, Linux, Nginx", "accent"),
        text("Other     | External integrations, basic tests, Redis in study/practical use, AI", "accent"),
      ];
}

function contactLines(lang: Lang): TerminalLine[] {
  return lang === "pt"
    ? [
        text("Contato:", "success"),
        linkLine("LinkedIn ->", profile.linkedin, "linkedin.com/in/jose-manoel-dev"),
        linkLine("GitHub   ->", profile.github, "github.com/CodJose-prog"),
        linkLine("Email    ->", `mailto:${profile.email}`, profile.email),
        linkLine("MAVIK    ->", "https://mavik.cloud", "mavik.cloud"),
      ]
    : [
        text("Contact:", "success"),
        linkLine("LinkedIn ->", profile.linkedin, "linkedin.com/in/jose-manoel-dev"),
        linkLine("GitHub   ->", profile.github, "github.com/CodJose-prog"),
        linkLine("Email    ->", `mailto:${profile.email}`, profile.email),
        linkLine("MAVIK    ->", "https://mavik.cloud", "mavik.cloud"),
      ];
}

function projectDetailsLines(lang: Lang, slug: string): TerminalLine[] {
  const project = findProject(slug);

  if (!project) {
    return [text(terminalCopy[lang].unknown(`project ${slug}`), "error")];
  }

  const liveUrl = project.liveUrl;
  const heading = lang === "pt" ? "Case detalhado:" : "Detailed case:";

  return [
    text(heading, "success"),
    text(`${project.name[lang]} | ${project.company[lang]}`, "accent"),
    text(project.overview[lang]),
    text(project.architecture[lang], "muted"),
    ...(liveUrl ? [linkLine(lang === "pt" ? "Link ->" : "Link ->", liveUrl, liveUrl.replace(/^https?:\/\//, ""))] : []),
  ];
}

export function getBootLines(lang: Lang): TerminalLine[] {
  return terminalCopy[lang].boot.map((message, index) =>
    text(message, index === terminalCopy[lang].boot.length - 1 ? "muted" : "success"),
  );
}

export function getSuggestionCommands() {
  return [...terminalCommands];
}

export function executeTerminalCommand(lang: Lang, rawCommand: string): TerminalExecution {
  const trimmed = rawCommand.trim();
  const normalized = trimmed.toLowerCase();

  if (normalized.startsWith("project ")) {
    const slug = normalized.slice(8).trim();
    if (projectSlugAliases.has(slug)) {
      return { kind: "output", command: trimmed, lines: projectDetailsLines(lang, slug) };
    }
  }

  const canonical = commandAliases.get(normalized);

  if (!canonical) {
    return {
      kind: "output",
      command: trimmed,
      lines: [text(terminalCopy[lang].unknown(trimmed), "error")],
    };
  }

  if (canonical === "clear") {
    return { kind: "clear", command: trimmed };
  }

  switch (canonical) {
    case "help":
      return { kind: "output", command: trimmed, lines: helpLines(lang) };
    case "whoami":
      return { kind: "output", command: trimmed, lines: whoAmILines(lang) };
    case "experience":
      return { kind: "output", command: trimmed, lines: experienceLines(lang) };
    case "projects":
      return { kind: "output", command: trimmed, lines: projectsLines(lang) };
    case "mavik":
      return { kind: "output", command: trimmed, lines: mavikLines(lang) };
    case "golden-project":
      return { kind: "output", command: trimmed, lines: goldenProjectLines(lang) };
    case "stack":
      return { kind: "output", command: trimmed, lines: stackLines(lang) };
    case "contact":
      return { kind: "output", command: trimmed, lines: contactLines(lang) };
    default:
      return {
        kind: "output",
        command: trimmed,
        lines: [text(terminalCopy[lang].unknown(trimmed), "error")],
      };
  }
}
