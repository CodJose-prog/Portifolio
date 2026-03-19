import type { Lang } from "@/lib/i18n";
import { education, experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { projectCaseStudies } from "@/content/projects";
import {
  terminalCopy,
  type TerminalEffect,
  getLocalizedDownloadCommand,
  getTerminalAutocompleteSeeds,
  getTerminalHelpSections,
  terminalMobileQuickCommands,
  terminalQuickCommands,
  terminalWorkingDirectory,
  type TerminalLine,
  type TerminalPresentation,
  type TerminalStagedOutput,
  type TerminalStagedStep,
  type TerminalTone,
} from "@/content/terminal";
import { getResumeDownloadEffect } from "@/lib/terminal/downloads";
import { getEasterEggOutput, type TerminalCommandOutput } from "@/lib/terminal/easterEggs";

export type TerminalExecution =
  | {
      kind: "output";
      command: string;
      lines: TerminalLine[];
      presentation?: TerminalPresentation;
      staged?: TerminalStagedOutput;
      effect?: TerminalEffect;
    }
  | {
      kind: "clear";
      command: string;
    };

const commandAliases = new Map<string, string>([
  ["help", "help"],
  ["whoami", "whoami"],
  ["about", "about"],
  ["experience", "experience"],
  ["timeline", "timeline"],
  ["projects", "projects"],
  ["mavik", "mavik"],
  ["golden-project", "golden-project"],
  ["golden", "golden-project"],
  ["stack", "stack"],
  ["skills", "stack"],
  ["education", "education"],
  ["social", "social"],
  ["contact", "contact"],
  ["hire", "hire"],
  ["status", "status"],
  ["pwd", "pwd"],
  ["ls", "ls"],
  ["neofetch", "neofetch"],
  ["php artisan serve", "php-artisan-serve"],
  ["npm run dev", "npm-run-dev"],
  ["docker ps", "docker-ps"],
  ["git status", "git-status"],
  ["clear", "clear"],
  ["cls", "clear"],
]);

const catAliases = new Map<string, string>([
  ["about", "about.txt"],
  ["about.txt", "about.txt"],
  ["golden-project", "golden-project.md"],
  ["golden-project.md", "golden-project.md"],
  ["golden.md", "golden-project.md"],
]);

const projectSlugAliases = new Set(
  projectCaseStudies.map((project) => project.slug.toLowerCase()),
);

const typewriterBoot: TerminalPresentation = {
  mode: "typewriter",
  charDelayMs: 16,
  lineDelayMs: 140,
  skippable: true,
};

function text(textValue: string, tone: TerminalTone = "default"): TerminalLine {
  return { kind: "text", text: textValue, tone };
}

function spacer(): TerminalLine {
  return { kind: "spacer" };
}

function linkLine(textLabel: string, href: string, linkLabel?: string): TerminalLine {
  return { kind: "text", text: textLabel, href, linkLabel, external: true };
}

function stage(delayMs: number, ...lines: TerminalLine[]): TerminalStagedStep {
  return { delayMs, lines };
}

function staged(...steps: TerminalStagedStep[]): TerminalStagedOutput {
  return {
    steps,
    skippable: true,
  };
}

function output(command: string, payload: TerminalCommandOutput): TerminalExecution {
  return {
    kind: "output",
    command,
    lines: payload.lines,
    presentation: payload.presentation,
    staged: payload.staged,
    effect: payload.effect,
  };
}

function findProject(slug: string) {
  return projectCaseStudies.find((project) => project.slug === slug);
}

function getWhatsAppChannel() {
  return profile.contactChannels.find((channel) => channel.value === profile.phone);
}

function sectionHeader(title: string) {
  return text(title, "success");
}

function commandHelpLine(command: string, description: string) {
  return text(`${command.padEnd(22, " ")} ${description}`, "accent");
}

function statusLine(label: string, value: string, tone: TerminalTone = "accent") {
  return text(`${label.padEnd(20, " ")} ${value}`, tone);
}

function unknownLines(lang: Lang, command: string): TerminalLine[] {
  const copy = terminalCopy[lang];
  return [
    text(copy.unknownTitle(command), "error"),
    text(copy.unknownHint, "muted"),
  ];
}

function helpLines(lang: Lang): TerminalLine[] {
  const copy = terminalCopy[lang];
  const helpSections = getTerminalHelpSections(lang);

  return [
    text(copy.helpIntro, "success"),
    ...helpSections.flatMap((section) => [
      spacer(),
      sectionHeader(`[${section.title[lang]}]`),
      ...section.commands.map((command) =>
        commandHelpLine(command.command, command.description[lang]),
      ),
    ]),
  ];
}

function whoAmILines(lang: Lang): TerminalLine[] {
  return lang === "pt"
    ? [
        text("Jose Manoel Pereira", "success"),
        text("Backend Engineer", "accent"),
        text("Foco atual: Laravel, Node.js, APIs REST, SaaS multi-tenant, PostgreSQL e Docker."),
        text("Atua com backend, arquitetura, dados, CI/CD, Linux e integracoes reais."),
        text("Tambem entrega sistemas completos quando o projeto pede web, mobile ou IA.", "muted"),
      ]
    : [
        text("Jose Manoel Pereira", "success"),
        text("Backend Engineer", "accent"),
        text("Current focus: Laravel, Node.js, REST APIs, multi-tenant SaaS, PostgreSQL, and Docker."),
        text("Works across backend, architecture, data, CI/CD, Linux, and real integrations."),
        text("Also delivers complete systems when the project needs web, mobile, or AI.", "muted"),
      ];
}

function aboutLines(lang: Lang): TerminalLine[] {
  return lang === "pt"
    ? [
        text("Profile overview", "success"),
        text(`${profile.name} | ${profile.role.pt}`, "accent"),
        text(`Location: ${profile.location.pt}`),
        text("Backend-first perfil com experiencia pratica em SaaS proprio, APIs e operacao em producao."),
        text("Construiu ArenaCalendar, entrega projetos pela MAVIK e atua forte em arquitetura, dados e integracoes."),
        text("Capacidade full stack continua ativa para sistemas ponta a ponta, apps, web, SaaS e IA.", "muted"),
      ]
    : [
        text("Profile overview", "success"),
        text(`${profile.name} | ${profile.role.en}`, "accent"),
        text(`Location: ${profile.location.en}`),
        text("Backend-first profile with practical experience in own SaaS, APIs, and production operations."),
        text("Built ArenaCalendar, delivers projects through MAVIK, and works strongly in architecture, data, and integrations."),
        text("Full stack capability stays available for end-to-end systems, apps, web, SaaS, and AI.", "muted"),
      ];
}

function experienceLines(lang: Lang): TerminalLine[] {
  return [
    text(lang === "pt" ? "Main experience modules:" : "Main experience modules:", "success"),
    ...experience.flatMap((entry) => [
      text(`${entry.company} | ${entry.role[lang]} | ${entry.period[lang]}`, "accent"),
      text(entry.summary[lang]),
      text(`Stack: ${entry.stack[lang].join(", ")}`, "muted"),
      spacer(),
    ]),
  ];
}

function timelineLines(lang: Lang): TerminalLine[] {
  const sortedEntries = [...experience].sort((left, right) =>
    right.startDate.localeCompare(left.startDate),
  );

  return [
    text("Timeline:", "success"),
    ...sortedEntries.map((entry) =>
      text(`${entry.period[lang].padEnd(18, " ")} ${entry.company} | ${entry.role[lang]}`, "accent"),
    ),
  ];
}

function projectsLines(lang: Lang): TerminalLine[] {
  const arena = findProject("arena-calendar");
  const golden = findProject("frigorifico-tracking");
  const mavik = findProject("mavik");

  if (!arena || !golden || !mavik) {
    return [text(lang === "pt" ? "Projetos indisponiveis." : "Projects unavailable.", "error")];
  }

  return lang === "pt"
    ? [
        text("Featured systems:", "success"),
        text(`ArenaCalendar      ${arena.overview.pt}`, "accent"),
        text(`Golden Project     ${golden.overview.pt}`, "accent"),
        text(`MAVIK              ${mavik.overview.pt}`, "accent"),
        spacer(),
        text("Use 'project arena-calendar' ou 'cat golden-project.md' para aprofundar.", "muted"),
      ]
    : [
        text("Featured systems:", "success"),
        text(`ArenaCalendar      ${arena.overview.en}`, "accent"),
        text(`Golden Project     ${golden.overview.en}`, "accent"),
        text(`MAVIK              ${mavik.overview.en}`, "accent"),
        spacer(),
        text("Use 'project arena-calendar' or 'cat golden-project.md' for more detail.", "muted"),
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
        text("Software house e consultoria de Jose Manoel.", "accent"),
        text("Entrega backend, APIs, sistemas web/mobile, integracoes e software sob medida."),
        text("Tambem funciona como canal institucional e comercial para novos projetos.", "muted"),
        linkLine("Contratar MAVIK ->", mavik.liveUrl ?? "https://mavik.cloud", "mavik.cloud"),
      ]
    : [
        text("MAVIK", "success"),
        text("Jose Manoel's software house and consulting company.", "accent"),
        text("Delivers backend, APIs, web/mobile systems, integrations, and tailored software."),
        text("Also acts as the institutional and commercial gateway for new projects.", "muted"),
        linkLine("Hire MAVIK ->", mavik.liveUrl ?? "https://mavik.cloud", "mavik.cloud"),
      ];
}

function goldenProjectLines(lang: Lang): TerminalLine[] {
  const golden = findProject("frigorifico-tracking");
  if (!golden) {
    return [text(lang === "pt" ? "Projeto indisponivel." : "Project unavailable.", "error")];
  }

  return lang === "pt"
    ? [
        text("Golden Project | Plataforma de Rastreamento Operacional", "success"),
        text("Projeto desenvolvido pela MAVIK para cliente do setor frigorifico.", "accent"),
        text("Atuacao direta em backend, API central, modelagem de dados e arquitetura da solucao."),
        text("A plataforma conecta backend, painel web e app mobile para operacao real.", "muted"),
      ]
    : [
        text("Golden Project | Operational Tracking Platform", "success"),
        text("Project delivered by MAVIK for a client in the cold-storage sector.", "accent"),
        text("Direct work on backend, central API, data modeling, and solution architecture."),
        text("The platform connects backend, web dashboard, and mobile app for real operations.", "muted"),
      ];
}

function stackLines(lang: Lang): TerminalLine[] {
  return lang === "pt"
    ? [
        text("Stack ecosystem:", "success"),
        statusLine("Backend", "Laravel, Node.js, TypeScript, REST APIs", "accent"),
        statusLine("Data", "PostgreSQL, MySQL, SQL, RLS, multi-tenant", "accent"),
        statusLine("Infra", "Docker, CI/CD, Linux, VPS, Nginx", "accent"),
        statusLine("Security", "JWT, Sanctum, auth, context isolation", "accent"),
        statusLine("Other", "Integracoes externas, testes basicos, Redis, IA", "muted"),
      ]
    : [
        text("Stack ecosystem:", "success"),
        statusLine("Backend", "Laravel, Node.js, TypeScript, REST APIs", "accent"),
        statusLine("Data", "PostgreSQL, MySQL, SQL, RLS, multi-tenant", "accent"),
        statusLine("Infra", "Docker, CI/CD, Linux, VPS, Nginx", "accent"),
        statusLine("Security", "JWT, Sanctum, auth, context isolation", "accent"),
        statusLine("Other", "External integrations, basic tests, Redis, AI", "muted"),
      ];
}

function educationLines(lang: Lang): TerminalLine[] {
  return [
    text("Education:", "success"),
    ...education.map((entry) =>
      text(`${entry.degree[lang]} | ${entry.institution} | ${entry.completion[lang]}`, "accent"),
    ),
  ];
}

function socialLines(): TerminalLine[] {
  const whatsApp = getWhatsAppChannel();

  return [
    text("Social channels:", "success"),
    linkLine("LinkedIn ->", profile.linkedin, "linkedin.com/in/jose-manoel-dev"),
    linkLine("GitHub   ->", profile.github, "github.com/CodJose-prog"),
    ...(whatsApp ? [linkLine("WhatsApp ->", whatsApp.href, whatsApp.value)] : []),
  ];
}

function contactLines(): TerminalLine[] {
  const whatsApp = getWhatsAppChannel();

  return [
    text("Contact channels:", "success"),
    linkLine("Email    ->", `mailto:${profile.email}`, profile.email),
    linkLine("LinkedIn ->", profile.linkedin, "linkedin.com/in/jose-manoel-dev"),
    linkLine("GitHub   ->", profile.github, "github.com/CodJose-prog"),
    ...(whatsApp ? [linkLine("WhatsApp ->", whatsApp.href, whatsApp.value)] : []),
    linkLine("MAVIK    ->", "https://mavik.cloud", "mavik.cloud"),
  ];
}

function hireLines(lang: Lang): TerminalLine[] {
  return lang === "pt"
    ? [
        text("Hiring gateway:", "success"),
        text("Para backend, APIs, SaaS, integracoes ou sistemas completos, os canais estao abertos.", "accent"),
        linkLine("Email ->", `mailto:${profile.email}`, profile.email),
        linkLine("Contratar MAVIK ->", "https://mavik.cloud", "mavik.cloud"),
      ]
    : [
        text("Hiring gateway:", "success"),
        text("For backend, APIs, SaaS, integrations, or complete systems, channels are open.", "accent"),
        linkLine("Email ->", `mailto:${profile.email}`, profile.email),
        linkLine("Hire MAVIK ->", "https://mavik.cloud", "mavik.cloud"),
      ];
}

function downloadResumeOutput(lang: Lang): TerminalCommandOutput {
  if (lang === "pt") {
    return {
      lines: [],
      staged: staged(
        stage(0, text("Preparando download do curriculo...", "muted")),
        stage(220, text("Curriculo pronto. Download iniciado.", "success")),
      ),
      effect: getResumeDownloadEffect(lang),
    };
  }

  return {
    lines: [],
    staged: staged(
      stage(0, text("Preparing resume download...", "muted")),
      stage(220, text("Resume ready. Download started.", "success")),
    ),
    effect: getResumeDownloadEffect(lang),
  };
}

function statusOutput(lang: Lang): TerminalCommandOutput {
  return {
    lines: [],
    staged: staged(
      stage(0, text("Gathering service metrics...", "muted")),
      stage(260, text("Checking API health, tenant isolation, and CI/CD status...", "muted")),
      stage(
        280,
        text("Professional system status:", "success"),
        statusLine("Backend", "active", "success"),
        statusLine("APIs", "running", "success"),
        statusLine("Multi-tenant", "online", "success"),
        statusLine("CI/CD", "deployed", "success"),
        statusLine("Consulting", lang === "pt" ? "available" : "available", "accent"),
        statusLine("Full stack mode", lang === "pt" ? "on demand" : "on demand", "muted"),
      ),
    ),
  };
}

function pwdLines(routePath: string): TerminalLine[] {
  return [text(terminalWorkingDirectory(routePath), "accent")];
}

function lsLines(lang: Lang): TerminalLine[] {
  return [
    text(lang === "pt" ? "Portfolio modules:" : "Portfolio modules:", "success"),
    text("about/  experience/  projects/  mavik/  stack/  contact/", "accent"),
    text("about.txt  golden-project.md  neofetch.conf", "muted"),
  ];
}

function catAboutLines(lang: Lang): TerminalLine[] {
  return lang === "pt"
    ? [
        text("about.txt", "success"),
        text("Backend Engineer focado em Laravel, Node.js, APIs, multi-tenant e operacao real.", "accent"),
        text("Tambem atua em sistemas completos com web, mobile, integracoes e IA quando necessario.", "muted"),
      ]
    : [
        text("about.txt", "success"),
        text("Backend Engineer focused on Laravel, Node.js, APIs, multi-tenant systems, and real operations.", "accent"),
        text("Also works on complete systems with web, mobile, integrations, and AI when needed.", "muted"),
      ];
}

function catGoldenProjectLines(lang: Lang): TerminalLine[] {
  return lang === "pt"
    ? [
        text("golden-project.md", "success"),
        text("Case MAVIK para cliente do setor frigorifico.", "accent"),
        text("Backend, API central, modelagem de dados e arquitetura conectando web + mobile.", "muted"),
      ]
    : [
        text("golden-project.md", "success"),
        text("MAVIK case for a client in the cold-storage sector.", "accent"),
        text("Backend, central API, data modeling, and architecture connecting web + mobile.", "muted"),
      ];
}

function neofetchOutput(lang: Lang): TerminalCommandOutput {
  return {
    lines: [],
    staged: staged(
      stage(0, text("Loading system profile...", "muted")),
      stage(220, text("Resolving backend identity...", "muted")),
      stage(
        260,
        text("jose@portfolio", "success"),
        text("----------------", "muted"),
        statusLine("role", "Backend Engineer", "accent"),
        statusLine(
          "focus",
          lang === "pt"
            ? "Laravel, Node.js, APIs, SaaS multi-tenant"
            : "Laravel, Node.js, APIs, multi-tenant SaaS",
          "accent",
        ),
        statusLine("location", profile.location[lang], "accent"),
        statusLine("company", "MAVIK", "accent"),
        statusLine("status", "shipping backend systems", "success"),
        statusLine("bridge", "full stack when the product needs it", "muted"),
      ),
    ),
  };
}

function phpArtisanServeOutput(): TerminalCommandOutput {
  return {
    lines: [],
    staged: staged(
      stage(0, text("Starting Laravel development server...", "success")),
      stage(240, text("Loading application config and routes...", "muted")),
      stage(
        280,
        text("Application running on [http://127.0.0.1:8000]", "accent"),
        text("Backend services: online", "success"),
        text("API routes: loaded", "success"),
        text("Multi-tenant layer: active", "muted"),
      ),
    ),
  };
}

function npmRunDevOutput(): TerminalCommandOutput {
  return {
    lines: [],
    staged: staged(
      stage(0, text("Starting development environment...", "success")),
      stage(220, text("Frontend bridge initialized", "accent")),
      stage(
        260,
        text("Vite dev server running on [http://localhost:5173]", "success"),
        text("UI connected to backend services", "success"),
        text("Full stack mode: available on demand", "muted"),
      ),
    ),
  };
}

function dockerPsOutput(): TerminalCommandOutput {
  return {
    lines: [],
    staged: staged(
      stage(0, text("Checking active containers...", "muted")),
      stage(
        300,
        text("CONTAINER ID   IMAGE              STATUS   PORTS", "success"),
        text("api-core       laravel-app        Up       8000", "accent"),
        text("db-main        postgres:latest    Up       5432", "accent"),
        text("cache-layer    redis:latest       Up       6379", "accent"),
        text("proxy          nginx:stable       Up       80/443", "accent"),
      ),
    ),
  };
}

function gitStatusLines(): TerminalLine[] {
  return [
    text("On branch main", "success"),
    text("Your portfolio is up to date with 'origin/main'.", "accent"),
    text("nothing to commit, working tree clean", "muted"),
  ];
}

function projectDetailsLines(lang: Lang, slug: string): TerminalLine[] {
  const project = findProject(slug);

  if (!project) {
    return unknownLines(lang, `project ${slug}`);
  }

  return [
    text("Detailed case:", "success"),
    text(`${project.name[lang]} | ${project.company[lang]}`, "accent"),
    text(project.overview[lang]),
    text(project.architecture[lang], "muted"),
    ...(project.liveUrl
      ? [
          linkLine(
            "Link ->",
            project.liveUrl,
            project.liveUrl.replace(/^https?:\/\//, ""),
          ),
        ]
      : []),
  ];
}

function catFileLines(lang: Lang, target: string): TerminalLine[] {
  const normalizedTarget = target.toLowerCase();
  const canonicalTarget = catAliases.get(normalizedTarget);

  if (!canonicalTarget) {
    return [
      text(`cat: ${target}: No such file or directory`, "error"),
      text(
        lang === "pt"
          ? "Arquivos disponiveis: about.txt, golden-project.md"
          : "Available files: about.txt, golden-project.md",
        "muted",
      ),
    ];
  }

  switch (canonicalTarget) {
    case "about.txt":
      return catAboutLines(lang);
    case "golden-project.md":
      return catGoldenProjectLines(lang);
    default:
      return unknownLines(lang, `cat ${target}`);
  }
}

export function getBootOutput(lang: Lang): TerminalCommandOutput {
  return {
    lines: terminalCopy[lang].boot.map((message, index) =>
      text(message, index < terminalCopy[lang].boot.length - 1 ? "success" : "muted"),
    ),
    presentation: typewriterBoot,
  };
}

export function getSuggestionCommands(lang: Lang) {
  const projectCommands = projectCaseStudies.map((project) => `project ${project.slug}`);

  return Array.from(
    new Set([
      ...terminalQuickCommands,
      ...terminalMobileQuickCommands,
      ...getTerminalAutocompleteSeeds(lang),
      ...projectCommands,
    ]),
  );
}

export function executeTerminalCommand(
  lang: Lang,
  rawCommand: string,
  routePath = "/",
): TerminalExecution {
  const trimmed = rawCommand.trim();
  const normalized = trimmed.toLowerCase().replace(/\s+/g, " ");

  if (!normalized) {
    return { kind: "output", command: trimmed, lines: [] };
  }

  const easterEgg = getEasterEggOutput(lang, normalized);
  if (easterEgg) {
    return output(trimmed, easterEgg);
  }

  if (normalized.startsWith("project ")) {
    const slug = normalized.slice(8).trim();

    if (projectSlugAliases.has(slug)) {
      return {
        kind: "output",
        command: trimmed,
        lines: projectDetailsLines(lang, slug),
      };
    }

    return {
      kind: "output",
      command: trimmed,
      lines: unknownLines(lang, trimmed),
    };
  }

  if (normalized.startsWith("cat ")) {
    return {
      kind: "output",
      command: trimmed,
      lines: catFileLines(lang, normalized.slice(4).trim()),
    };
  }

  if (normalized === getLocalizedDownloadCommand(lang)) {
    return output(trimmed, downloadResumeOutput(lang));
  }

  const canonical = commandAliases.get(normalized);

  if (!canonical) {
    return {
      kind: "output",
      command: trimmed,
      lines: unknownLines(lang, trimmed),
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
    case "about":
      return { kind: "output", command: trimmed, lines: aboutLines(lang) };
    case "experience":
      return { kind: "output", command: trimmed, lines: experienceLines(lang) };
    case "timeline":
      return { kind: "output", command: trimmed, lines: timelineLines(lang) };
    case "projects":
      return { kind: "output", command: trimmed, lines: projectsLines(lang) };
    case "mavik":
      return { kind: "output", command: trimmed, lines: mavikLines(lang) };
    case "golden-project":
      return { kind: "output", command: trimmed, lines: goldenProjectLines(lang) };
    case "stack":
      return { kind: "output", command: trimmed, lines: stackLines(lang) };
    case "education":
      return { kind: "output", command: trimmed, lines: educationLines(lang) };
    case "social":
      return { kind: "output", command: trimmed, lines: socialLines() };
    case "contact":
      return { kind: "output", command: trimmed, lines: contactLines() };
    case "hire":
      return { kind: "output", command: trimmed, lines: hireLines(lang) };
    case "status":
      return output(trimmed, statusOutput(lang));
    case "pwd":
      return { kind: "output", command: trimmed, lines: pwdLines(routePath) };
    case "ls":
      return { kind: "output", command: trimmed, lines: lsLines(lang) };
    case "neofetch":
      return output(trimmed, neofetchOutput(lang));
    case "php-artisan-serve":
      return output(trimmed, phpArtisanServeOutput());
    case "npm-run-dev":
      return output(trimmed, npmRunDevOutput());
    case "docker-ps":
      return output(trimmed, dockerPsOutput());
    case "git-status":
      return { kind: "output", command: trimmed, lines: gitStatusLines() };
    default:
      return {
        kind: "output",
        command: trimmed,
        lines: unknownLines(lang, trimmed),
      };
  }
}
