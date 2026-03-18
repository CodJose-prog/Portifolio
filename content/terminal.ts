import type { Lang } from "@/lib/i18n";

export type TerminalTone =
  | "default"
  | "muted"
  | "accent"
  | "success"
  | "warning"
  | "error";

export type TerminalLine =
  | {
      kind: "text";
      text: string;
      tone?: TerminalTone;
      href?: string;
      linkLabel?: string;
      external?: boolean;
    }
  | {
      kind: "spacer";
    };

export const terminalCommands = [
  "help",
  "whoami",
  "experience",
  "projects",
  "mavik",
  "golden-project",
  "stack",
  "contact",
  "clear",
] as const;

export type TerminalCommandName = (typeof terminalCommands)[number];

export const terminalCopy: Record<
  Lang,
  {
    title: string;
    placeholder: string;
    suggestionsLabel: string;
    boot: string[];
    helpIntro: string;
    unknown: (command: string) => string;
    promptPathHome: string;
    commandDescriptions: Record<TerminalCommandName, string>;
  }
> = {
  pt: {
    title: "portfolio.terminal",
    placeholder: "Digite um comando",
    suggestionsLabel: "Comandos",
    boot: [
      "Booting system...",
      "Loading Jose Manoel portfolio...",
      "Type 'help' to see available commands.",
    ],
    helpIntro: "Comandos disponiveis:",
    unknown: (command) => `Comando nao encontrado: ${command}. Digite 'help'.`,
    promptPathHome: "~",
    commandDescriptions: {
      help: "lista os comandos disponiveis",
      whoami: "mostra resumo profissional",
      experience: "lista experiencias principais",
      projects: "lista projetos principais",
      mavik: "mostra a MAVIK como empresa",
      "golden-project": "mostra o case do frigorifico",
      stack: "lista stack e capacidades tecnicas",
      contact: "mostra canais de contato",
      clear: "limpa o terminal",
    },
  },
  en: {
    title: "portfolio.terminal",
    placeholder: "Type a command",
    suggestionsLabel: "Commands",
    boot: [
      "Booting system...",
      "Loading Jose Manoel portfolio...",
      "Type 'help' to see available commands.",
    ],
    helpIntro: "Available commands:",
    unknown: (command) => `Command not found: ${command}. Type 'help'.`,
    promptPathHome: "~",
    commandDescriptions: {
      help: "lists available commands",
      whoami: "shows professional summary",
      experience: "lists main experience",
      projects: "lists main projects",
      mavik: "shows MAVIK as a company",
      "golden-project": "shows the cold-storage case",
      stack: "lists stack and technical capabilities",
      contact: "shows contact channels",
      clear: "clears the terminal",
    },
  },
};

export function terminalPromptPath(lang: Lang, route: string) {
  if (!route || route === "/") {
    return terminalCopy[lang].promptPathHome;
  }

  return route;
}
