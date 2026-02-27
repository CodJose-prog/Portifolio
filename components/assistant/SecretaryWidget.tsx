"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ExternalLink,
  Github,
  Instagram,
  Linkedin,
  Loader2,
  MessageCircle,
  Send,
  Trash2,
  X,
} from "lucide-react";
import type { Lang } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";
import { extractLinksFromText, type ExtractedLink } from "@/lib/chat/extractLinks";
import { Button } from "@/components/ui/button";

type SecretaryWidgetProps = {
  lang: Lang;
};

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const quickPrompts: Record<Lang, string[]> = {
  pt: [
    "O que você faz?",
    "Quais tecnologias você domina?",
    "Fale do ArenaCalendar",
    "Como você trabalha?",
  ],
  en: [
    "What do you do?",
    "What technologies do you use?",
    "Tell me about ArenaCalendar",
    "How do you work?",
  ],
};

const labels: Record<
  Lang,
  {
    open: string;
    title: string;
    subtitle: string;
    clear: string;
    close: string;
    placeholder: string;
    send: string;
    loading: string;
    sensitiveHint: string;
    apiError: string;
  }
> = {
  pt: {
    open: "Secretária",
    title: "Secretária Virtual",
    subtitle: "Tire dúvidas sobre meu trabalho e projetos.",
    clear: "Limpar conversa",
    close: "Fechar conversa",
    placeholder: "Digite sua dúvida...",
    send: "Enviar mensagem",
    loading: "Respondendo...",
    sensitiveHint: "Não compartilhe senhas, documentos ou dados sensíveis.",
    apiError: "Não consegui responder agora. Fale com ele no WhatsApp ou LinkedIn.",
  },
  en: {
    open: "Assistant",
    title: "Virtual Assistant",
    subtitle: "Ask questions about my work and projects.",
    clear: "Clear chat",
    close: "Close chat",
    placeholder: "Type your question...",
    send: "Send message",
    loading: "Thinking...",
    sensitiveHint: "Do not share passwords, documents, or sensitive data.",
    apiError: "I could not answer right now. Please contact him on WhatsApp or LinkedIn.",
  },
};

export function SecretaryWidget({ lang }: SecretaryWidgetProps) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const listEndRef = useRef<HTMLDivElement>(null);
  const l = labels[lang];

  const payloadMessages = useMemo(
    () => messages.map(({ role, content }) => ({ role, content })),
    [messages],
  );

  useEffect(() => {
    if (!open) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }
    listEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading, open]);

  async function sendMessage(rawContent: string) {
    const content = rawContent.trim();
    if (!content || loading) {
      return;
    }

    const userMessage: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: content.slice(0, 800),
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lang,
          messages: [...payloadMessages, { role: "user", content: userMessage.content }],
        }),
      });

      const data = (await response.json()) as { reply?: string };
      const assistantReply = data.reply?.trim() || l.apiError;

      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          content: assistantReply,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          content: l.apiError,
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function renderLinkIcon(type: ExtractedLink["type"]) {
    if (type === "whatsapp") {
      return <MessageCircle className="size-3.5" aria-hidden />;
    }
    if (type === "linkedin") {
      return <Linkedin className="size-3.5" aria-hidden />;
    }
    if (type === "github") {
      return <Github className="size-3.5" aria-hidden />;
    }
    if (type === "instagram") {
      return <Instagram className="size-3.5" aria-hidden />;
    }
    return <ExternalLink className="size-3.5" aria-hidden />;
  }

  return (
    <>
      <button
        type="button"
        aria-label={l.open}
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-lg transition hover:scale-[1.02] hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
      >
        <MessageCircle className="size-4 text-primary" />
        <span>{l.open}</span>
      </button>

      {open ? (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label={l.close}
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/35 backdrop-blur-[1px]"
          />

          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="secretary-widget-title"
            className="absolute bottom-0 right-0 flex h-[78vh] w-full flex-col rounded-t-2xl border border-border bg-background shadow-2xl sm:bottom-6 sm:right-6 sm:h-[min(78vh,700px)] sm:max-w-md sm:rounded-2xl"
          >
            <header className="flex items-start justify-between gap-3 border-b border-border p-4">
              <div>
                <h2 id="secretary-widget-title" className="text-base font-semibold text-foreground">
                  {l.title}
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">{l.subtitle}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMessages([])}
                  aria-label={l.clear}
                  className="inline-flex items-center rounded-md border border-border px-2 py-1 text-xs text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Trash2 className="mr-1 size-3.5" />
                  {l.clear}
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={l.close}
                  className="inline-flex rounded-md p-1.5 text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <X className="size-4" />
                </button>
              </div>
            </header>

            <div className="border-b border-border px-4 py-3">
              <div className="flex flex-wrap gap-2">
                {quickPrompts[lang].map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => sendMessage(prompt)}
                    className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-foreground transition hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.length === 0 ? (
                <p className="rounded-xl border border-border bg-card p-3 text-xs text-muted-foreground">
                  {l.sensitiveHint}
                </p>
              ) : null}

              {messages.map((message) => {
                const isAssistant = message.role === "assistant";
                const { cleanText, links } = isAssistant
                  ? extractLinksFromText(message.content, siteConfig)
                  : { cleanText: message.content, links: [] };

                return (
                  <article
                    key={message.id}
                    className={
                      message.role === "user"
                        ? "ml-auto max-w-[90%] rounded-2xl rounded-br-md bg-primary px-3 py-2 text-sm text-primary-foreground"
                        : "max-w-[90%] rounded-2xl rounded-bl-md border border-border bg-card px-3 py-2 text-sm text-foreground"
                    }
                  >
                    {cleanText ? <p className="whitespace-pre-line">{cleanText}</p> : null}

                    {isAssistant && links.length > 0 ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {links.map((link) => (
                          <Button
                            key={`${message.id}-${link.type}-${link.url}`}
                            asChild
                            size="sm"
                            variant={link.type === "whatsapp" ? "default" : "outline"}
                          >
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={link.label[lang]}
                            >
                              {renderLinkIcon(link.type)}
                              {link.label[lang]}
                            </a>
                          </Button>
                        ))}
                      </div>
                    ) : null}
                  </article>
                );
              })}

              {loading ? (
                <div className="inline-flex items-center gap-2 rounded-2xl rounded-bl-md border border-border bg-card px-3 py-2 text-sm text-muted-foreground">
                  <Loader2 className="size-4 animate-spin" />
                  {l.loading}
                </div>
              ) : null}
              <div ref={listEndRef} />
            </div>

            <form
              className="border-t border-border p-4"
              onSubmit={(event) => {
                event.preventDefault();
                void sendMessage(input);
              }}
            >
              <label htmlFor="assistant-input" className="sr-only">
                {l.placeholder}
              </label>
              <div className="flex items-end gap-2">
                <textarea
                  id="assistant-input"
                  ref={inputRef}
                  value={input}
                  maxLength={800}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      void sendMessage(input);
                    }
                  }}
                  placeholder={l.placeholder}
                  className="min-h-11 flex-1 resize-none rounded-xl border border-input bg-card px-3 py-2 text-sm text-foreground outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
                  rows={2}
                />
                <button
                  type="submit"
                  aria-label={l.send}
                  disabled={loading || input.trim().length === 0}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground transition hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Send className="size-4" />
                </button>
              </div>
            </form>
          </section>
        </div>
      ) : null}
    </>
  );
}
