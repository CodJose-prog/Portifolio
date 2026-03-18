"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Lang } from "@/lib/i18n";
import { terminalCopy, terminalPromptPath, type TerminalLine, type TerminalTone } from "@/content/terminal";
import {
  executeTerminalCommand,
  getBootLines,
  getSuggestionCommands,
} from "@/lib/terminal/portfolioCommands";

type PortfolioTerminalProps = {
  lang: Lang;
  initialCommands?: string[];
  routePath?: string;
};

type HistoryEntry =
  | {
      id: string;
      type: "command";
      value: string;
    }
  | {
      id: string;
      type: "output";
      lines: TerminalLine[];
    };

function toneClass(tone: TerminalTone | undefined) {
  switch (tone) {
    case "muted":
      return "terminal-muted";
    case "accent":
      return "terminal-accent";
    case "success":
      return "terminal-success";
    case "warning":
      return "terminal-warning";
    case "error":
      return "terminal-error";
    default:
      return "text-foreground";
  }
}

function lineKey(line: TerminalLine, index: number) {
  return line.kind === "spacer" ? `spacer-${index}` : `${line.text}-${index}`;
}

export function PortfolioTerminal({
  lang,
  initialCommands = [],
  routePath = "/",
}: PortfolioTerminalProps) {
  const sessionKey = `${lang}:${routePath}:${initialCommands.join("||")}`;

  return (
    <PortfolioTerminalSession
      key={sessionKey}
      lang={lang}
      initialCommands={initialCommands}
      routePath={routePath}
    />
  );
}

function PortfolioTerminalSession({
  lang,
  initialCommands = [],
  routePath = "/",
}: PortfolioTerminalProps) {
  const copy = terminalCopy[lang];
  const promptPath = terminalPromptPath(lang, routePath);
  const suggestionCommands = useMemo(() => getSuggestionCommands(), []);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const buildInitialHistory = () => {
    const nextHistory: HistoryEntry[] = [
      {
        id: "boot",
        type: "output",
        lines: getBootLines(lang),
      },
    ];

    initialCommands.forEach((command, index) => {
      const result = executeTerminalCommand(lang, command);
      if (result.kind === "clear") {
        nextHistory.length = 0;
        return;
      }

      nextHistory.push({ id: `cmd-${index}-${command}`, type: "command", value: command });
      nextHistory.push({ id: `out-${index}-${command}`, type: "output", lines: result.lines });
    });

    return nextHistory;
  };

  const [history, setHistory] = useState<HistoryEntry[]>(() => buildInitialHistory());
  const [input, setInput] = useState("");

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function runCommand(rawCommand: string) {
    const command = rawCommand.trim();
    if (!command) {
      return;
    }

    const result = executeTerminalCommand(lang, command);

    if (result.kind === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    setHistory((prev) => [
      ...prev,
      { id: `cmd-${Date.now()}`, type: "command", value: command },
      { id: `out-${Date.now()}`, type: "output", lines: result.lines },
    ]);
    setInput("");
  }

  return (
    <article className="terminal-shell w-full">
      <section className="terminal-window w-full">
        <div className="terminal-titlebar">
          <div className="flex items-center gap-3">
            <span className="terminal-dot" />
            <span className="text-foreground">{copy.title}</span>
          </div>
          <div className="terminal-command-line">
            <span className="terminal-muted">jose@portfolio:{promptPath}</span>
            <span className="terminal-cursor" />
          </div>
        </div>

        <div ref={scrollRef} className="terminal-body">
          <div className="terminal-output">
            {history.map((entry) => {
              if (entry.type === "command") {
                return (
                  <div key={entry.id} className="terminal-command-line">
                    <span className="terminal-prompt">jose@portfolio:{promptPath}$</span>
                    <span>{entry.value}</span>
                  </div>
                );
              }

              return (
                <div key={entry.id} className="grid gap-1">
                  {entry.lines.map((line, index) => {
                    if (line.kind === "spacer") {
                      return <div key={lineKey(line, index)} className="h-3" />;
                    }

                    return (
                      <div key={lineKey(line, index)} className={`terminal-command-line ${toneClass(line.tone)}`}>
                        <span>{line.text}</span>
                        {line.href ? (
                          <>
                            <span className="terminal-muted"> </span>
                            <a
                              href={line.href}
                              target={line.external ? "_blank" : undefined}
                              rel={line.external ? "noopener noreferrer" : undefined}
                              className="terminal-link"
                            >
                              {line.linkLabel ?? line.href}
                            </a>
                          </>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        <div className="border-t border-border/70">
          <div className="flex flex-wrap items-center gap-2 px-4 py-3 text-xs">
            <span className="terminal-muted">{copy.suggestionsLabel}:</span>
            {suggestionCommands.map((command) => (
              <button
                key={command}
                type="button"
                onClick={() => runCommand(command)}
                className="terminal-chip"
              >
                {command}
              </button>
            ))}
          </div>

          <form
            className="terminal-input-row"
            onSubmit={(event) => {
              event.preventDefault();
              runCommand(input);
            }}
          >
            <span className="terminal-prompt">jose@portfolio:{promptPath}$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={copy.placeholder}
              className="terminal-input"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
            />
          </form>
        </div>
      </section>
    </article>
  );
}
