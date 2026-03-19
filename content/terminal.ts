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

export type TerminalPresentation = {
  mode?: "instant" | "typewriter";
  charDelayMs?: number;
  lineDelayMs?: number;
  skippable?: boolean;
};

export type TerminalStagedStep = {
  delayMs?: number;
  lines: TerminalLine[];
};

export type TerminalStagedOutput = {
  steps: TerminalStagedStep[];
  skippable?: boolean;
};

export type TerminalEffect =
  | {
      kind: "download";
      href: string;
      filename: string;
    };

export type TerminalHelpSection = {
  id: string;
  title: Record<Lang, string>;
  commands: Array<{
    command: string;
    description: Record<Lang, string>;
  }>;
};

export const terminalQuickCommands = [
  "help",
  "whoami",
  "projects",
  "stack",
  "contact",
  "clear",
] as const;

export const terminalMobileQuickCommands = terminalQuickCommands;

const terminalAutocompleteBaseSeeds = [
  "help",
  "whoami",
  "about",
  "experience",
  "timeline",
  "projects",
  "golden-project",
  "mavik",
  "stack",
  "skills",
  "education",
  "social",
  "contact",
  "hire",
  "status",
  "pwd",
  "ls",
  "cat about.txt",
  "cat golden-project.md",
  "neofetch",
  "php artisan serve",
  "npm run dev",
  "docker ps",
  "git status",
  "clear",
  "sudo hire-me",
  "rm -rf bugs",
  "make coffee",
  "coffee",
  "hello world",
  "hack the planet",
  "uptime",
  "ping production",
  "ssh jose@backend",
  "easter-egg",
  "matrix",
  "vim",
  "sudo apt install success",
] as const;

const terminalHelpSectionsBase: TerminalHelpSection[] = [
  {
    id: "core",
    title: {
      pt: "Core",
      en: "Core",
    },
    commands: [
      {
        command: "help",
        description: {
          pt: "lista comandos e atalhos",
          en: "lists commands and shortcuts",
        },
      },
      {
        command: "whoami",
        description: {
          pt: "resumo profissional rapido",
          en: "quick professional summary",
        },
      },
      {
        command: "about",
        description: {
          pt: "versao estendida do perfil",
          en: "extended profile overview",
        },
      },
      {
        command: "experience",
        description: {
          pt: "experiencias principais",
          en: "main experience entries",
        },
      },
      {
        command: "timeline",
        description: {
          pt: "linha do tempo resumida",
          en: "compact career timeline",
        },
      },
      {
        command: "projects",
        description: {
          pt: "projetos e cases principais",
          en: "main projects and cases",
        },
      },
      {
        command: "golden-project",
        description: {
          pt: "case premium do frigorifico",
          en: "flagship cold-storage case",
        },
      },
      {
        command: "mavik",
        description: {
          pt: "empresa e consultoria",
          en: "company and consulting module",
        },
      },
    ],
  },
  {
    id: "profile",
    title: {
      pt: "Profile",
      en: "Profile",
    },
    commands: [
      {
        command: "stack",
        description: {
          pt: "stack backend e infraestrutura",
          en: "backend and infrastructure stack",
        },
      },
      {
        command: "skills",
        description: {
          pt: "alias enxuto para stack",
          en: "short alias for stack",
        },
      },
      {
        command: "education",
        description: {
          pt: "formacao academica",
          en: "academic background",
        },
      },
      {
        command: "social",
        description: {
          pt: "links sociais e github",
          en: "social links and github",
        },
      },
      {
        command: "contact",
        description: {
          pt: "canais de contato completos",
          en: "full contact channels",
        },
      },
      {
        command: "hire",
        description: {
          pt: "cta comercial e link da MAVIK",
          en: "commercial CTA and MAVIK link",
        },
      },
      {
        command: "status",
        description: {
          pt: "status do sistema profissional",
          en: "professional system status",
        },
      },
    ],
  },
  {
    id: "shell",
    title: {
      pt: "Shell",
      en: "Shell",
    },
    commands: [
      {
        command: "pwd",
        description: {
          pt: "mostra o diretorio atual",
          en: "shows current working directory",
        },
      },
      {
        command: "ls",
        description: {
          pt: "lista modulos do portfolio",
          en: "lists portfolio modules",
        },
      },
      {
        command: "cat about.txt",
        description: {
          pt: "abre um resumo curto sobre mim",
          en: "opens a short about file",
        },
      },
      {
        command: "cat golden-project.md",
        description: {
          pt: "abre um resumo do case premium",
          en: "opens the flagship case summary",
        },
      },
      {
        command: "project <slug>",
        description: {
          pt: "abre um case especifico por slug",
          en: "opens a specific case by slug",
        },
      },
      {
        command: "clear",
        description: {
          pt: "limpa o terminal",
          en: "clears the terminal",
        },
      },
    ],
  },
  {
    id: "dev",
    title: {
      pt: "Dev",
      en: "Dev",
    },
    commands: [
      {
        command: "neofetch",
        description: {
          pt: "perfil tecnico em formato shell",
          en: "technical profile in shell format",
        },
      },
      {
        command: "php artisan serve",
        description: {
          pt: "simula bootstrap de backend Laravel",
          en: "simulates Laravel backend bootstrap",
        },
      },
      {
        command: "npm run dev",
        description: {
          pt: "simula ambiente full stack local",
          en: "simulates local full stack environment",
        },
      },
      {
        command: "docker ps",
        description: {
          pt: "containers principais online",
          en: "main running containers",
        },
      },
      {
        command: "git status",
        description: {
          pt: "estado atual do portfolio",
          en: "current portfolio state",
        },
      },
    ],
  },
  {
    id: "extras",
    title: {
      pt: "Extras",
      en: "Extras",
    },
    commands: [
      {
        command: "sudo hire-me",
        description: {
          pt: "atalho discreto para contratacao",
          en: "discreet shortcut to hiring",
        },
      },
      {
        command: "uptime",
        description: {
          pt: "disponibilidade do portfolio",
          en: "portfolio availability check",
        },
      },
      {
        command: "ssh jose@backend",
        description: {
          pt: "entra no ambiente jose@backend",
          en: "connects to jose@backend",
        },
      },
      {
        command: "make coffee",
        description: {
          pt: "produtividade com cafeina",
          en: "productivity with caffeine",
        },
      },
      {
        command: "easter-egg",
        description: {
          pt: "lista curiosidades escondidas",
          en: "lists hidden curiosities",
        },
      },
      {
        command: "matrix",
        description: {
          pt: "efeito especial bem contido",
          en: "contained special effect",
        },
      },
    ],
  },
];

export function getLocalizedDownloadCommand(lang: Lang) {
  return lang === "pt" ? "download curriculo" : "download resume";
}

export function getTerminalAutocompleteSeeds(lang: Lang) {
  return [...terminalAutocompleteBaseSeeds, getLocalizedDownloadCommand(lang)];
}

export function getTerminalHelpSections(lang: Lang): TerminalHelpSection[] {
  return terminalHelpSectionsBase.map((section) => {
    if (section.id !== "shell") {
      return section;
    }

    return {
      ...section,
      commands: [
        {
          command: getLocalizedDownloadCommand(lang),
          description: {
            pt: "baixa o curriculo em PDF",
            en: "downloads the PDF resume",
          },
        },
        ...section.commands,
      ],
    };
  });
}

export const terminalCopy: Record<
  Lang,
  {
    title: string;
    placeholder: string;
    quickCommandsLabel: string;
    suggestionsLabel: string;
    inputHint: string;
    skipLabel: string;
    clearLabel: string;
    boot: string[];
    helpIntro: string;
    unknownTitle: (command: string) => string;
    unknownHint: string;
    promptPathHome: string;
  }
> = {
  pt: {
    title: "portfolio.terminal",
    placeholder: "Digite um comando",
    quickCommandsLabel: "Quick",
    suggestionsLabel: "Autocomplete",
    inputHint: "TAB autocomplete  |  ↑↓ history  |  Ctrl+L clear",
    skipLabel: "skip",
    clearLabel: "clear",
    boot: [
      "Booting portfolio system...",
      "Loading Jose Manoel environment...",
      "Initializing backend modules...",
      "System ready.",
      "Type 'help' to see available commands.",
    ],
    helpIntro: "Command registry loaded:",
    unknownTitle: (command) => `Command not found: ${command}`,
    unknownHint: "Type 'help' to list available commands.",
    promptPathHome: "~",
  },
  en: {
    title: "portfolio.terminal",
    placeholder: "Type a command",
    quickCommandsLabel: "Quick",
    suggestionsLabel: "Autocomplete",
    inputHint: "TAB autocomplete  |  ↑↓ history  |  Ctrl+L clear",
    skipLabel: "skip",
    clearLabel: "clear",
    boot: [
      "Booting portfolio system...",
      "Loading Jose Manoel environment...",
      "Initializing backend modules...",
      "System ready.",
      "Type 'help' to see available commands.",
    ],
    helpIntro: "Command registry loaded:",
    unknownTitle: (command) => `Command not found: ${command}`,
    unknownHint: "Type 'help' to list available commands.",
    promptPathHome: "~",
  },
};

export function terminalPromptPath(lang: Lang, route: string) {
  if (!route || route === "/") {
    return terminalCopy[lang].promptPathHome;
  }

  return `~${route}`;
}

export function terminalWorkingDirectory(route: string) {
  if (!route || route === "/") {
    return "/home/jose/portfolio";
  }

  return `/home/jose/portfolio${route}`;
}
