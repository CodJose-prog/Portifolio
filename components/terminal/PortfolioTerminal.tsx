"use client";

import {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Lang } from "@/lib/i18n";
import {
  terminalCopy,
  terminalMobileQuickCommands,
  terminalPromptPath,
  terminalQuickCommands,
  type TerminalLine,
  type TerminalPresentation,
  type TerminalStagedStep,
  type TerminalTone,
} from "@/content/terminal";
import {
  executeTerminalCommand,
  getBootOutput,
  getSuggestionCommands,
} from "@/lib/terminal/portfolioCommands";
import { runTerminalEffect } from "@/lib/terminal/downloads";
import { autocompleteCommand, findCommandMatches, normalizeCommand } from "@/lib/terminal/autocomplete";
import { TypewriterBlock } from "@/components/terminal/TypewriterBlock";

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
      presentation?: TerminalPresentation;
    };

type ActiveStagedRun = {
  outputId: string;
  steps: TerminalStagedStep[];
  stepIndex: number;
  skippable: boolean;
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
  const bootOutput = useMemo(() => getBootOutput(lang), [lang]);
  const suggestionCommands = useMemo(() => getSuggestionCommands(lang), [lang]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const commandIdRef = useRef(0);
  const historyDraftRef = useRef("");
  const initialCommandIndexRef = useRef(0);
  const bootEntryId = "boot-output";

  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      id: bootEntryId,
      type: "output",
      lines: bootOutput.lines,
      presentation: bootOutput.presentation,
    },
  ]);
  const [completedTypedIds, setCompletedTypedIds] = useState<string[]>([]);
  const [typingEntryId, setTypingEntryId] = useState<string | null>(
    bootOutput.presentation?.mode === "typewriter" ? bootEntryId : null,
  );
  const [activeStagedRun, setActiveStagedRun] = useState<ActiveStagedRun | null>(null);
  const [bootCompleted, setBootCompleted] = useState(
    bootOutput.presentation?.mode !== "typewriter",
  );
  const [skipVersion, setSkipVersion] = useState(0);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyCursor, setHistoryCursor] = useState<number | null>(null);

  const deferredInput = useDeferredValue(input);
  const normalizedDeferredInput = normalizeCommand(deferredInput);
  const isBusy = Boolean(typingEntryId || activeStagedRun);

  const autocompleteMatches = useMemo(() => {
    if (!normalizedDeferredInput || isBusy) {
      return [];
    }

    const matches = findCommandMatches(deferredInput, suggestionCommands, 8);
    if (
      matches.length === 1 &&
      normalizeCommand(matches[0]) === normalizedDeferredInput
    ) {
      return [];
    }

    return matches;
  }, [deferredInput, isBusy, normalizedDeferredInput, suggestionCommands]);

  const nextId = (prefix: string) => {
    commandIdRef.current += 1;
    return `${prefix}-${commandIdRef.current}`;
  };

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior,
    });
  }, []);

  const focusInput = useCallback(() => {
    if (!isBusy) {
      inputRef.current?.focus();
    }
  }, [isBusy]);

  const clearTerminal = useCallback(() => {
    setHistory([]);
    setCompletedTypedIds([]);
    setTypingEntryId(null);
    setActiveStagedRun(null);
    setInput("");
    setHistoryCursor(null);
    historyDraftRef.current = "";
  }, []);

  const appendLinesToOutput = useCallback((outputId: string, lines: TerminalLine[]) => {
    if (lines.length === 0) {
      return;
    }

    setHistory((previous) =>
      previous.map((entry) => {
        if (entry.type !== "output" || entry.id !== outputId) {
          return entry;
        }

        return {
          ...entry,
          lines: [...entry.lines, ...lines],
        };
      }),
    );
  }, []);

  const flushStagedRun = useCallback(
    (run: ActiveStagedRun) => {
      const remainingLines = run.steps.slice(run.stepIndex).flatMap((step) => step.lines);
      appendLinesToOutput(run.outputId, remainingLines);
      setActiveStagedRun(null);
    },
    [appendLinesToOutput],
  );

  const appendCommandExecution = useCallback(
    (
      command: string,
      options?: {
        recordInHistory?: boolean;
      },
    ) => {
      const result = executeTerminalCommand(lang, command, routePath);

      if (options?.recordInHistory !== false) {
        setCommandHistory((previous) => [...previous, command]);
      }

      if (result.kind === "clear") {
        clearTerminal();
        return;
      }

      const commandId = nextId("cmd");
      const outputId = nextId("out");

      setHistory((previous) => [
        ...previous,
        { id: commandId, type: "command", value: command },
        {
          id: outputId,
          type: "output",
          lines: result.lines,
          presentation: result.presentation,
        },
      ]);

      if (result.effect) {
        runTerminalEffect(result.effect);
      }

      if (result.staged?.steps.length) {
        setActiveStagedRun({
          outputId,
          steps: result.staged.steps,
          stepIndex: 0,
          skippable: result.staged.skippable !== false,
        });
      } else if (result.presentation?.mode === "typewriter") {
        setTypingEntryId(outputId);
      } else {
        setCompletedTypedIds((previous) =>
          previous.includes(outputId) ? previous : [...previous, outputId],
        );
      }

      setInput("");
      setHistoryCursor(null);
      historyDraftRef.current = "";
    },
    [clearTerminal, lang, routePath],
  );

  const requestSkipActive = useCallback(() => {
    if (typingEntryId) {
      setSkipVersion((value) => value + 1);
      return;
    }

    if (activeStagedRun?.skippable) {
      flushStagedRun(activeStagedRun);
    }
  }, [activeStagedRun, flushStagedRun, typingEntryId]);

  const handleTypewriterComplete = useCallback((entryId: string) => {
    setCompletedTypedIds((previous) =>
      previous.includes(entryId) ? previous : [...previous, entryId],
    );

    setTypingEntryId((current) => (current === entryId ? null : current));

    if (entryId === bootEntryId) {
      setBootCompleted(true);
    }
  }, [bootEntryId]);

  useEffect(() => {
    if (!activeStagedRun) {
      return;
    }

    const currentStep = activeStagedRun.steps[activeStagedRun.stepIndex];

    if (!currentStep) {
      const finishTimer = window.setTimeout(() => {
        setActiveStagedRun(null);
      }, 0);

      return () => window.clearTimeout(finishTimer);
    }

    const stepTimer = window.setTimeout(() => {
      appendLinesToOutput(activeStagedRun.outputId, currentStep.lines);
      setActiveStagedRun((current) => {
        if (!current || current.outputId !== activeStagedRun.outputId) {
          return current;
        }

        if (current.stepIndex >= current.steps.length - 1) {
          return null;
        }

        return {
          ...current,
          stepIndex: current.stepIndex + 1,
        };
      });
    }, currentStep.delayMs ?? 0);

    return () => window.clearTimeout(stepTimer);
  }, [activeStagedRun, appendLinesToOutput]);

  useEffect(() => {
    if (!bootCompleted || isBusy) {
      return;
    }

    const nextInitialCommand = initialCommands[initialCommandIndexRef.current];
    if (!nextInitialCommand) {
      return;
    }

    initialCommandIndexRef.current += 1;
    appendCommandExecution(nextInitialCommand);
  }, [appendCommandExecution, bootCompleted, initialCommands, isBusy]);

  useEffect(() => {
    scrollToBottom(history.length > 3 ? "smooth" : "auto");
  }, [history, scrollToBottom]);

  useEffect(() => {
    if (!typingEntryId) {
      focusInput();
      return;
    }

    const timer = window.setInterval(() => {
      scrollToBottom("auto");
    }, 70);

    return () => window.clearInterval(timer);
  }, [focusInput, scrollToBottom, typingEntryId]);

  useEffect(() => {
    focusInput();
  }, [focusInput]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isBusy && event.key === "Escape") {
        event.preventDefault();
        requestSkipActive();
        return;
      }

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "l") {
        event.preventDefault();
        if (isBusy) {
          requestSkipActive();
          return;
        }

        clearTerminal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [clearTerminal, isBusy, requestSkipActive]);

  function runCommand(rawCommand: string) {
    const command = rawCommand.trim();
    if (!command || isBusy) {
      return;
    }

    appendCommandExecution(command);
  }

  function renderStaticOutput(entry: Extract<HistoryEntry, { type: "output" }>) {
    return (
      <div className="grid gap-1">
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
  }

  return (
    <article
      className="terminal-shell w-full"
      onClick={() => {
        focusInput();
      }}
    >
      <section className="terminal-window w-full">
        <div className="terminal-titlebar">
          <div className="flex items-center gap-3">
            <span className="terminal-dot" />
            <span className="text-foreground">{copy.title}</span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="terminal-command-line">
              <span className="terminal-muted">jose@portfolio:{promptPath}</span>
              <span className="terminal-cursor" />
            </div>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                if (isBusy) {
                  requestSkipActive();
                  return;
                }
                clearTerminal();
              }}
              className="terminal-action"
            >
              {isBusy ? copy.skipLabel : copy.clearLabel}
            </button>
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

              if (
                entry.presentation?.mode === "typewriter" &&
                !completedTypedIds.includes(entry.id)
              ) {
                return (
                  <TypewriterBlock
                    key={entry.id}
                    entryId={entry.id}
                    lines={entry.lines}
                    presentation={entry.presentation}
                    skipVersion={skipVersion}
                    onComplete={handleTypewriterComplete}
                  />
                );
              }

              return <div key={entry.id}>{renderStaticOutput(entry)}</div>;
            })}
          </div>
        </div>

        <div className="terminal-footer">
          <div className="terminal-toolbar terminal-toolbar-desktop">
            <span className="terminal-muted">{copy.quickCommandsLabel}:</span>
            <div className="terminal-chip-row">
              {terminalQuickCommands.map((command) => (
                <button
                  key={command}
                  type="button"
                  onClick={() => runCommand(command)}
                  className="terminal-chip"
                  disabled={isBusy}
                >
                  {command}
                </button>
              ))}
            </div>
          </div>

          <div className="terminal-toolbar terminal-toolbar-mobile">
            <span className="terminal-muted">{copy.quickCommandsLabel}:</span>
            <div className="terminal-chip-row terminal-chip-row-mobile">
              {terminalMobileQuickCommands.map((command) => (
                <button
                  key={`mobile-${command}`}
                  type="button"
                  onClick={() => runCommand(command)}
                  className="terminal-chip"
                  disabled={isBusy}
                >
                  {command}
                </button>
              ))}
            </div>
          </div>

          {autocompleteMatches.length > 0 ? (
            <div className="terminal-toolbar">
              <span className="terminal-muted">{copy.suggestionsLabel}:</span>
              <div className="terminal-chip-row">
                {autocompleteMatches.map((command) => (
                  <button
                    key={`suggestion-${command}`}
                    type="button"
                    onClick={() => setInput(command)}
                    className="terminal-chip terminal-chip-suggestion"
                    disabled={isBusy}
                  >
                    {command}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

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
              onChange={(event) => {
                setInput(event.target.value);
                setHistoryCursor(null);
              }}
              onKeyDown={(event) => {
                if (event.key === "Tab") {
                  event.preventDefault();
                  const result = autocompleteCommand(input, suggestionCommands);
                  if (result.nextValue) {
                    setInput(result.nextValue);
                  }
                  return;
                }

                if (event.key === "ArrowUp") {
                  if (commandHistory.length === 0) {
                    return;
                  }

                  event.preventDefault();

                  if (historyCursor === null) {
                    historyDraftRef.current = input;
                    const nextCursor = commandHistory.length - 1;
                    setHistoryCursor(nextCursor);
                    setInput(commandHistory[nextCursor]);
                    return;
                  }

                  const nextCursor = Math.max(0, historyCursor - 1);
                  setHistoryCursor(nextCursor);
                  setInput(commandHistory[nextCursor]);
                  return;
                }

                if (event.key === "ArrowDown" && historyCursor !== null) {
                  event.preventDefault();

                  if (historyCursor >= commandHistory.length - 1) {
                    setHistoryCursor(null);
                    setInput(historyDraftRef.current);
                    return;
                  }

                  const nextCursor = historyCursor + 1;
                  setHistoryCursor(nextCursor);
                  setInput(commandHistory[nextCursor]);
                }
              }}
              placeholder={isBusy ? `${copy.skipLabel}: Esc` : copy.placeholder}
              className="terminal-input"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              disabled={isBusy}
            />
          </form>

          <div className="terminal-hint-row">
            <span className="terminal-muted">{copy.inputHint}</span>
            {isBusy ? (
              <button
                type="button"
                onClick={requestSkipActive}
                className="terminal-hint-action"
              >
                Esc {copy.skipLabel}
              </button>
            ) : null}
          </div>
        </div>
      </section>
    </article>
  );
}
