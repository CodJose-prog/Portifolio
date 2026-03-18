"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ExternalLink,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MessageCircle,
  Send,
  Trash2,
  X,
} from "lucide-react";
import type { Lang } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";
import { extractLinksFromText, type ExtractedLink } from "@/lib/chat/extractLinks";
import { StatusPill } from "@/components/system/status-pill";
import { Button } from "@/components/ui/button";

type SecretaryWidgetProps = { lang: Lang };

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const quickPrompts: Record<Lang, string[]> = {
  pt: [
    "Qual e seu foco em backend hoje?",
    "Fale da MAVIK",
    "Explique o Projeto de Ouro",
    "Voce entrega sistemas completos?",
  ],
  en: [
    "What is your backend focus today?",
    "Tell me about MAVIK",
    "Explain the flagship project",
    "Do you ship complete systems?",
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
    open: "Assistente",
    title: "Assistente terminal",
    subtitle: "Curriculo, stack, cases, MAVIK e foco atual em backend.",
    clear: "Limpar conversa",
    close: "Fechar conversa",
    placeholder: "Digite sua duvida...",
    send: "Enviar mensagem",
    loading: "Respondendo...",
    sensitiveHint: "Nao compartilhe senhas, documentos ou dados sensiveis.",
    apiError: "Nao consegui responder agora. Fale com ele por e-mail, LinkedIn ou WhatsApp.",
  },
  en: {
    open: "Assistant",
    title: "Terminal assistant",
    subtitle: "Resume, stack, case studies, MAVIK, and current backend focus.",
    clear: "Clear chat",
    close: "Close chat",
    placeholder: "Type your question...",
    send: "Send message",
    loading: "Thinking...",
    sensitiveHint: "Do not share passwords, documents, or sensitive data.",
    apiError: "I could not answer right now. Please contact him by email, LinkedIn, or WhatsApp.",
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
    if (!open) return;
    const frame = window.requestAnimationFrame(() => inputRef.current?.focus());
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    listEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading, open]);

  async function sendMessage(rawContent: string) {
    const content = rawContent.trim();
    if (!content || loading) return;

    const userMessage: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: content.slice(0, 800),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lang,
          messages: [...payloadMessages, { role: "user", content: userMessage.content }],
        }),
      });

      const data = (await response.json()) as { reply?: string };
      const assistantReply = data.reply?.trim() || l.apiError;
      setMessages((prev) => [...prev, { id: `a-${Date.now()}`, role: "assistant", content: assistantReply }]);
    } catch {
      setMessages((prev) => [...prev, { id: `a-${Date.now()}`, role: "assistant", content: l.apiError }]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function renderLinkIcon(type: ExtractedLink["type"]) {
    if (type === "whatsapp") return <MessageCircle className="size-3.5" aria-hidden />;
    if (type === "linkedin") return <Linkedin className="size-3.5" aria-hidden />;
    if (type === "github") return <Github className="size-3.5" aria-hidden />;
    if (type === "url" && lang === "pt") return <Mail className="size-3.5" aria-hidden />;
    return <ExternalLink className="size-3.5" aria-hidden />;
  }

  return (
    <>
      <button
        type="button"
        aria-label={l.open}
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
            className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
          />

          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="secretary-widget-title"
            className="absolute bottom-0 right-0 flex h-[78vh] w-full flex-col border border-border bg-background sm:bottom-6 sm:right-6 sm:h-[min(78vh,700px)] sm:max-w-md"
          >
            <header className="flex items-start justify-between gap-3 border-b border-border/70 p-4">
              <div>
                <StatusPill tone="success" pulse label={lang === "pt" ? "online" : "online"} />
                <h2 id="secretary-widget-title" className="mt-3 text-base font-semibold text-foreground">
                  {l.title}
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">{l.subtitle}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMessages([])}
                  aria-label={l.clear}
                  className="inline-flex items-center rounded-md border border-border/70 px-2.5 py-1.5 text-xs text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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

            <div className="border-b border-border/70 px-4 py-3">
              <div className="flex flex-wrap gap-2">
                {quickPrompts[lang].map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => sendMessage(prompt)}
                    className="rounded-md border border-border/70 bg-background px-3 py-1.5 text-xs text-foreground transition hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.length === 0 ? (
                <p className="rounded-md border border-border/70 bg-background p-3 text-xs text-muted-foreground">
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
                        ? "ml-auto max-w-[90%] rounded-md border border-primary/40 bg-primary/10 px-3 py-2 text-sm text-primary"
                        : "max-w-[90%] rounded-md border border-border/70 bg-background px-3 py-2 text-sm text-foreground"
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
                            <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.label[lang]}>
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
                <div className="inline-flex items-center gap-2 rounded-md border border-border/70 bg-background px-3 py-2 text-sm text-muted-foreground">
                  <Loader2 className="size-4 animate-spin" />
                  {l.loading}
                </div>
              ) : null}

              <div ref={listEndRef} />
            </div>

            <form
              className="border-t border-border/70 p-4"
              onSubmit={(event) => {
                event.preventDefault();
                void sendMessage(input);
              }}
            >
              <label htmlFor="assistant-input" className="sr-only">{l.placeholder}</label>
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
                  className="min-h-11 flex-1 resize-none rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
                  rows={2}
                />
                <button
                  type="submit"
                  aria-label={l.send}
                  disabled={loading || input.trim().length === 0}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-primary/35 bg-transparent text-primary transition hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
