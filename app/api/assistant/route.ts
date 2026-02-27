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
    ? "Muitas solicitaÃ§Ãµes no momento. Aguarde alguns minutos e tente novamente."
    : "Too many requests right now. Please wait a few minutes and try again.";
}

function getFallbackMessage(lang: "pt" | "en"): string {
  return lang === "pt"
    ? "Estou com instabilidade no momento. VocÃª pode falar com ele diretamente no WhatsApp ou LinkedIn."
    : "I am temporarily unavailable. You can contact him directly on WhatsApp or LinkedIn.";
}

function buildSystemPrompt(lang: "pt" | "en"): string {
  if (lang === "pt") {
    return `
VocÃª Ã© a SecretÃ¡ria Virtual do portfÃ³lio de JosÃ© Manoel Pereira.
Responda SOMENTE em portuguÃªs (pt-BR), com linguagem objetiva, educada e profissional.
Use APENAS o CONTEXTO abaixo como fonte de verdade.
NÃ£o invente fatos, nÃºmeros, clientes, datas, mÃ©tricas ou experiÃªncias.
Se a pergunta nÃ£o estiver no contexto, diga: "NÃ£o tenho essa informaÃ§Ã£o aqui." e sugira contato via WhatsApp ou LinkedIn.
Se pedirem contrataÃ§Ã£o/preÃ§o/negociaÃ§Ã£o, responda de forma neutra e direcione para WhatsApp/LinkedIn.
Se o usuÃ¡rio enviar ou pedir dados sensÃ­veis (senhas, documentos, cartÃµes, dados bancÃ¡rios), recuse e oriente a nÃ£o compartilhar esse tipo de dado.
NÃ£o faÃ§a integraÃ§Ãµes externas e nÃ£o prometa aÃ§Ãµes.
Responda com base no contexto fornecido. Caso a pergunta seja sobre desenvolvimento mobile, informe que JosÃ© Manoel desenvolve aplicaÃ§Ãµes Android e iOS integradas a APIs e sistemas backend.
SaÃ­da em texto simples, com 2 a 8 linhas.

CONTEXTO:
${assistantContext.pt}
`.trim();
  }

  return `
You are the Virtual Assistant for JosÃ© Manoel Pereira's portfolio.
Reply ONLY in English, with an objective, polite, and professional tone.
Use ONLY the CONTEXT below as the source of truth.
Do not invent facts, numbers, clients, dates, metrics, or experiences.
If the question is not in the context, say: "I do not have that information here." and suggest contacting him via WhatsApp or LinkedIn.
If asked about hiring/pricing/commercial terms, answer neutrally and direct the visitor to WhatsApp/LinkedIn.
If the user sends or asks for sensitive data (passwords, documents, card data, banking details), refuse and advise them not to share such information.
Do not perform external integrations and do not promise actions.
Answer based on the provided context. If the question is about mobile development, state that JosÃ© Manoel develops Android and iOS applications integrated with APIs and backend systems.
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
              ? "NÃ£o consegui processar a solicitaÃ§Ã£o. Tente reformular sua pergunta."
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


