import type { Lang } from "@/lib/i18n";
import { profile } from "@/content/profile";
import type {
  TerminalEffect,
  TerminalLine,
  TerminalPresentation,
  TerminalStagedOutput,
  TerminalStagedStep,
  TerminalTone,
} from "@/content/terminal";

export type TerminalCommandOutput = {
  lines: TerminalLine[];
  presentation?: TerminalPresentation;
  staged?: TerminalStagedOutput;
  effect?: TerminalEffect;
};

function text(textValue: string, tone: TerminalTone = "default"): TerminalLine {
  return { kind: "text", text: textValue, tone };
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

export function getEasterEggOutput(lang: Lang, normalizedCommand: string): TerminalCommandOutput | null {
  switch (normalizedCommand) {
    case "sudo hire-me":
      return lang === "pt"
        ? {
            lines: [],
            staged: staged(
              stage(0, text("Requesting elevated permissions...", "muted")),
              stage(320, text("Access granted.", "success")),
              stage(
                280,
                text("Opening contact channels...", "accent"),
                linkLine("Email ->", `mailto:${profile.email}`, profile.email),
                linkLine("Contratar MAVIK ->", "https://mavik.cloud", "mavik.cloud"),
              ),
            ),
          }
        : {
            lines: [],
            staged: staged(
              stage(0, text("Requesting elevated permissions...", "muted")),
              stage(320, text("Access granted.", "success")),
              stage(
                280,
                text("Opening contact channels...", "accent"),
                linkLine("Email ->", `mailto:${profile.email}`, profile.email),
                linkLine("Hire MAVIK ->", "https://mavik.cloud", "mavik.cloud"),
              ),
            ),
          };
    case "rm -rf bugs":
      return {
        lines: [
          text("rm: cannot remove 'bugs': resource is part of the software ecosystem.", "warning"),
          text(
            lang === "pt"
              ? "A resposta real e engenharia, observabilidade e iteracao."
              : "The real answer is engineering, observability, and iteration.",
            "muted",
          ),
        ],
      };
    case "make coffee":
    case "coffee":
      return {
        lines: [],
        staged: staged(
          stage(0, text("Starting brew service...", "muted")),
          stage(240, text("Heating water...", "accent")),
          stage(
            320,
            text("Coffee ready.", "success"),
            text("Status: ready for another deployment.", "muted"),
          ),
        ),
      };
    case "hello world":
      return {
        lines:
          lang === "pt"
            ? [
                text("Hello, world.", "success"),
                text("Backend first. Full stack when the system needs it.", "accent"),
              ]
            : [
                text("Hello, world.", "success"),
                text("Backend first. Full stack when the system needs it.", "accent"),
              ],
      };
    case "hack the planet":
      return {
        lines:
          lang === "pt"
            ? [
                text("Request denied.", "warning"),
                text("Modo preferido: ship software, protect production, scale with control.", "accent"),
              ]
            : [
                text("Request denied.", "warning"),
                text("Preferred mode: ship software, protect production, scale with control.", "accent"),
              ],
      };
    case "uptime":
      return {
        lines: [],
        staged: staged(
          stage(0, text("Reading uptime counters...", "muted")),
          stage(
            260,
            text("Portfolio uptime: highly available", "success"),
            text("Backend pipelines stable. Consulting channels open.", "accent"),
          ),
        ),
      };
    case "ping production":
      return {
        lines: [],
        staged: staged(
          stage(0, text("PING production (backend-core): 56 data bytes", "muted")),
          stage(240, text("64 bytes from backend-core: icmp_seq=1 ttl=64 time=11.8 ms", "success")),
          stage(220, text("64 bytes from backend-core: icmp_seq=2 ttl=64 time=10.9 ms", "success")),
          stage(
            220,
            text("64 bytes from backend-core: icmp_seq=3 ttl=64 time=12.1 ms", "success"),
            text("production status: stable", "accent"),
          ),
        ),
      };
    case "ssh jose@backend":
      return lang === "pt"
        ? {
            lines: [],
            staged: staged(
              stage(0, text("Connecting to jose@backend...", "success")),
              stage(360, text("Establishing secure session...", "muted")),
              stage(360, text("Connection established.", "success")),
              stage(
                260,
                text("Welcome to Jose Manoel's backend environment.", "accent"),
                text("Role: Backend Engineer", "accent"),
                text("Focus: Laravel, Node.js, APIs, SaaS, multi-tenant", "muted"),
              ),
            ),
          }
        : {
            lines: [],
            staged: staged(
              stage(0, text("Connecting to jose@backend...", "success")),
              stage(360, text("Establishing secure session...", "muted")),
              stage(360, text("Connection established.", "success")),
              stage(
                260,
                text("Welcome to Jose Manoel's backend environment.", "accent"),
                text("Role: Backend Engineer", "accent"),
                text("Focus: Laravel, Node.js, APIs, SaaS, multi-tenant", "muted"),
              ),
            ),
          };
    case "easter-egg":
      return {
        lines:
          lang === "pt"
            ? [
                text("Hidden commands:", "success"),
                text("sudo hire-me   uptime   ssh jose@backend", "accent"),
                text("make coffee    rm -rf bugs   matrix", "accent"),
              ]
            : [
                text("Hidden commands:", "success"),
                text("sudo hire-me   uptime   ssh jose@backend", "accent"),
                text("make coffee    rm -rf bugs   matrix", "accent"),
              ],
      };
    case "matrix":
      return {
        presentation: {
          mode: "typewriter",
          charDelayMs: 5,
          lineDelayMs: 70,
          skippable: true,
        },
        lines: [
          text("01010000 01110010 01101111 01100100 01110101 01100011 01110100 01101001 01101111 01101110", "success"),
          text("Matrix mode refused. Clarity beats spectacle.", "accent"),
        ],
      };
    case "vim":
      return {
        lines:
          lang === "pt"
            ? [
                text('"E325: ATTENTION"', "warning"),
                text("Relaxa. Este terminal ainda aceita ':q!'.", "muted"),
              ]
            : [
                text('"E325: ATTENTION"', "warning"),
                text("Relax. This terminal still accepts ':q!'.", "muted"),
              ],
      };
    case "sudo apt install success":
      return {
        lines:
          lang === "pt"
            ? [
                text("Reading package lists... Done", "muted"),
                text("success is already the newest version.", "success"),
                text("0 upgraded, 0 newly installed, 0 removed.", "muted"),
              ]
            : [
                text("Reading package lists... Done", "muted"),
                text("success is already the newest version.", "success"),
                text("0 upgraded, 0 newly installed, 0 removed.", "muted"),
              ],
      };
    default:
      return null;
  }
}
