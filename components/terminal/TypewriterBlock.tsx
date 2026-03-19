"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { TerminalLine, TerminalPresentation, TerminalTone } from "@/content/terminal";

type TypewriterBlockProps = {
  entryId: string;
  lines: TerminalLine[];
  presentation: TerminalPresentation;
  skipVersion: number;
  onComplete: (entryId: string) => void;
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

function lineText(line: Extract<TerminalLine, { kind: "text" }>) {
  if (!line.href) {
    return line.text;
  }

  return `${line.text} ${line.linkLabel ?? line.href}`;
}

export function TypewriterBlock({
  entryId,
  lines,
  presentation,
  skipVersion,
  onComplete,
}: TypewriterBlockProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const completedRef = useRef(false);

  const charDelayMs = presentation.charDelayMs ?? 12;
  const lineDelayMs = presentation.lineDelayMs ?? 100;

  const finishTyping = useCallback(() => {
    if (completedRef.current) {
      return;
    }

    completedRef.current = true;
    setFinished(true);
    onComplete(entryId);
  }, [entryId, onComplete]);

  useEffect(() => {
    if (finished) {
      return;
    }

    const currentLine = lines[lineIndex];

    if (!currentLine) {
      const finishTimer = window.setTimeout(() => {
        finishTyping();
      }, 0);

      return () => window.clearTimeout(finishTimer);
    }

    if (currentLine.kind === "spacer") {
      const spacerTimer = window.setTimeout(() => {
        setLineIndex((value) => value + 1);
        setCharCount(0);
      }, lineDelayMs);

      return () => window.clearTimeout(spacerTimer);
    }

    const currentText = lineText(currentLine);

    if (charCount < currentText.length) {
      const charTimer = window.setTimeout(() => {
        setCharCount((value) => value + 1);
      }, charDelayMs);

      return () => window.clearTimeout(charTimer);
    }

    const lineTimer = window.setTimeout(() => {
      setLineIndex((value) => value + 1);
      setCharCount(0);
    }, lineDelayMs);

    return () => window.clearTimeout(lineTimer);
  }, [charCount, charDelayMs, finishTyping, finished, lineDelayMs, lineIndex, lines]);

  useEffect(() => {
    if (!presentation.skippable || skipVersion === 0 || finished) {
      return;
    }

    const skipTimer = window.setTimeout(() => {
      finishTyping();
    }, 0);

    return () => window.clearTimeout(skipTimer);
  }, [finishTyping, finished, presentation.skippable, skipVersion]);

  const renderedLines = finished ? lines : lines.slice(0, lineIndex + 1);

  return (
    <div className="grid gap-1">
      {renderedLines.map((line, index) => {
        if (line.kind === "spacer") {
          return <div key={lineKey(line, index)} className="h-3" />;
        }

        const isActiveLine = !finished && index === lineIndex;
        const fullText = lineText(line);
        const visibleText = isActiveLine ? fullText.slice(0, charCount) : fullText;

        if (isActiveLine) {
          return (
            <div key={lineKey(line, index)} className={`terminal-command-line ${toneClass(line.tone)}`}>
              <span>{visibleText}</span>
              <span className="terminal-cursor terminal-cursor-inline" />
            </div>
          );
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
