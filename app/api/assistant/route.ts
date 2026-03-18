import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { assistantContext } from "@/content/assistantContext";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 20;
const MAX_HISTORY = 12;
const MAX_MESSAGE_LENGTH = 800;
const REQUEST_TIMEOUT_MS = 15_000;

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

const requestSchema = z.object({
  lang: z.enum(["pt", "en"]),
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1),
      }),
    )
    .min(1),
});

function normalizeMessageContent(content: string): string {
  return content.trim().slice(0, MAX_MESSAGE_LENGTH);
}

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }
  return "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  if (rateLimitStore.size > 500) {
    for (const [key, entry] of rateLimitStore.entries()) {
      if (entry.resetAt <= now) {
        rateLimitStore.delete(key);
      }
    }
  }

  const entry = rateLimitStore.get(ip);
  if (!entry || entry.resetAt <= now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  entry.count += 1;
  rateLimitStore.set(ip, entry);
  return false;
}

function getRateLimitMessage(lang: "pt" | "en"): string {
  return lang === "pt"
    ? "Muitas solicitações no momento. Aguarde alguns minutos e tente novamente."
    : "Too many requests right now. Please wait a few minutes and try again.";
}

function getFallbackMessage(lang: "pt" | "en"): string {
  return lang === "pt"
    ? "Estou com instabilidade no momento. Você pode falar com ele por e-mail, LinkedIn ou WhatsApp."
    : "I am temporarily unavailable. You can contact him by email, LinkedIn, or WhatsApp.";
}

function buildSystemPrompt(lang: "pt" | "en"): string {
  if (lang === "pt") {
    return `
Você é a assistente virtual do portfólio de José Manoel Pereira.
Responda SOMENTE em português (pt-BR), com linguagem objetiva, educada e profissional.
Use APENAS o CONTEXTO abaixo como fonte de verdade.
Não invente fatos, números, clientes, datas, métricas ou experiências.
Se a pergunta não estiver no contexto, diga: "Não tenho essa informação aqui." e sugira contato por e-mail, LinkedIn ou WhatsApp.
Se pedirem contratação, preço ou negociação, responda de forma neutra e direcione para e-mail, LinkedIn ou WhatsApp.
Ao sugerir contato, prefira citar os canais sem colar URLs cruas no texto.
Se o usuário enviar ou pedir dados sensíveis (senhas, documentos, cartões, dados bancários), recuse e oriente a não compartilhar esse tipo de dado.
Não faça integrações externas e não prometa ações.
Responda com base no contexto fornecido.
Saída em texto simples, com 2 a 8 linhas.

CONTEXTO:
${assistantContext.pt}
`.trim();
  }

  return `
You are the virtual assistant for José Manoel Pereira's portfolio.
Reply ONLY in English, with an objective, polite, and professional tone.
Use ONLY the CONTEXT below as the source of truth.
Do not invent facts, numbers, clients, dates, metrics, or experiences.
If the question is not in the context, say: "I do not have that information here." and suggest contacting him by email, LinkedIn, or WhatsApp.
If asked about hiring, pricing, or commercial terms, answer neutrally and direct the visitor to email, LinkedIn, or WhatsApp.
When suggesting contact, prefer naming the channels without pasting raw URLs in the text.
If the user sends or asks for sensitive data (passwords, documents, card data, banking details), refuse and advise them not to share such information.
Do not perform external integrations and do not promise actions.
Answer based on the provided context.
Return plain text only, with 2 to 8 lines.

CONTEXT:
${assistantContext.en}
`.trim();
}

export async function POST(request: NextRequest) {
  const acceptLanguage = request.headers.get("accept-language")?.toLowerCase() || "";
  let lang: "pt" | "en" = acceptLanguage.includes("pt") ? "pt" : "en";

  try {
    const json = await request.json();
    const parsed = requestSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        {
          reply:
            lang === "pt"
              ? "Não consegui processar a solicitação. Tente reformular sua pergunta."
              : "I could not process this request. Please rephrase your question.",
        },
        { status: 400 },
      );
    }

    lang = parsed.data.lang;

    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json({ reply: getRateLimitMessage(lang) }, { status: 429 });
    }

    const messages = parsed.data.messages
      .slice(-MAX_HISTORY)
      .map((message) => ({
        role: message.role,
        content: normalizeMessageContent(message.content),
      }))
      .filter((message) => message.content.length > 0);

    if (messages.length === 0) {
      return NextResponse.json(
        {
          reply:
            lang === "pt"
              ? "Envie uma pergunta para eu te ajudar."
              : "Send a question and I will help you.",
        },
        { status: 400 },
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ reply: getFallbackMessage(lang) }, { status: 500 });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
          temperature: 0.2,
          max_tokens: 320,
          messages: [
            { role: "system", content: buildSystemPrompt(lang) },
            ...messages.map((message) => ({
              role: message.role,
              content: message.content,
            })),
          ],
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        return NextResponse.json({ reply: getFallbackMessage(lang) }, { status: 500 });
      }

      const data = (await response.json()) as {
        choices?: Array<{ message?: { content?: string } }>;
      };

      const reply = data.choices?.[0]?.message?.content?.trim();
      if (!reply) {
        return NextResponse.json({ reply: getFallbackMessage(lang) }, { status: 500 });
      }

      return NextResponse.json({ reply }, { status: 200 });
    } finally {
      clearTimeout(timeout);
    }
  } catch (error) {
    const errorName = error instanceof Error ? error.name : "UnknownError";
    console.error("assistant_route_error", { errorName });
    return NextResponse.json({ reply: getFallbackMessage(lang) }, { status: 500 });
  }
}
