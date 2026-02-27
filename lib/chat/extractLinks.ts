export type ExtractedLink = {
  type: "whatsapp" | "linkedin" | "github" | "instagram" | "url";
  url: string;
  label: { pt: string; en: string };
};

type SiteConfigLinks = {
  whatsapp?: string;
  whatsappUrl?: string;
  linkedin?: string;
  github?: string;
  instagram?: string;
};

const URL_REGEX = /\b((?:https?:\/\/|www\.)[^\s<>"'`)\]}]+)/gi;

const defaultLabels: Record<ExtractedLink["type"], ExtractedLink["label"]> = {
  whatsapp: { pt: "Falar no WhatsApp", en: "Chat on WhatsApp" },
  linkedin: { pt: "Abrir LinkedIn", en: "Open LinkedIn" },
  github: { pt: "Ver GitHub", en: "View GitHub" },
  instagram: { pt: "Ver Instagram", en: "Open Instagram" },
  url: { pt: "Abrir link", en: "Open link" },
};

function trimTrailingPunctuation(url: string): string {
  return url.replace(/[.,;:!?]+$/g, "");
}

function normalizeUrl(url: string): string {
  const base = url.startsWith("www.") ? `https://${url}` : url;
  return trimTrailingPunctuation(base);
}

function toAbsoluteUrl(url: string | undefined): string | undefined {
  if (!url) {
    return undefined;
  }
  const normalized = normalizeUrl(url.trim());
  if (!normalized) {
    return undefined;
  }
  if (/^https?:\/\//i.test(normalized)) {
    return normalized;
  }
  if (/^wa\.me\//i.test(normalized)) {
    return `https://${normalized}`;
  }
  if (/^\+?\d[\d\s()-]{7,}$/.test(normalized)) {
    const digits = normalized.replace(/\D/g, "");
    return digits ? `https://wa.me/${digits}` : undefined;
  }
  if (normalized.includes(".")) {
    return `https://${normalized}`;
  }
  return undefined;
}

function detectLinkType(hostname: string): ExtractedLink["type"] {
  const host = hostname.toLowerCase();
  if (
    host.includes("wa.me") ||
    host.includes("whatsapp.com") ||
    host.includes("api.whatsapp.com")
  ) {
    return "whatsapp";
  }
  if (host.includes("linkedin.com")) {
    return "linkedin";
  }
  if (host.includes("github.com")) {
    return "github";
  }
  if (host.includes("instagram.com")) {
    return "instagram";
  }
  return "url";
}

function hasPlatformMention(
  text: string,
): Record<"whatsapp" | "linkedin" | "github" | "instagram", boolean> {
  return {
    whatsapp: /\b(whatsapp|what['’`]?s?\s*app|wpp)\b/i.test(text),
    linkedin: /\blinked\s*in\b/i.test(text),
    github: /\bgithub\b/i.test(text),
    instagram: /\binstagram\b/i.test(text),
  };
}

function hasContactIntent(text: string): boolean {
  const patterns = [
    /\bposso te direcionar\b/i,
    /\bte direcionar\b/i,
    /\bentrar em contato\b/i,
    /\b(me chama|me chame)\b/i,
    /\b(orçamento|orcamento)\b/i,
    /\bcontato\b/i,
    /\bconversar\b/i,
    /\bfalar\b/i,
    /\bcontact\b/i,
    /\breach out\b/i,
    /\bmessage\b/i,
    /\bchat with\b/i,
    /\btalk to\b/i,
    /\bquote\b/i,
    /\bpricing\b/i,
    /\b(can|could)\s+direct you\b/i,
  ];

  return patterns.some((pattern) => pattern.test(text));
}

function cleanupText(text: string): string {
  const lines = text
    .replace(/[ \t]+\n/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .replace(
      /\b(whatsapp|linkedin|github|instagram)\s*:\s*(?=$|\n|[.,;!?])/gi,
      "$1",
    )
    .replace(/\s+([.,;!?])/g, "$1")
    .split("\n")
    .map((line) => line.trimEnd())
    .filter((line) => !/^(whatsapp|linkedin|github|instagram)\s*:?\s*$/i.test(line.trim()));

  return lines.join("\n").replace(/\n{3,}/g, "\n\n").replace(/\s+$/g, "").trim();
}

export function extractLinksFromText(
  text: string,
  siteConfig: SiteConfigLinks,
): { cleanText: string; links: ExtractedLink[] } {
  if (!text) {
    return { cleanText: "", links: [] };
  }

  const rawMatches: string[] = [];
  const textWithoutUrls = text.replace(URL_REGEX, (match) => {
    rawMatches.push(match);
    return "";
  });

  const knownLinksByType: Partial<Record<ExtractedLink["type"], string>> = {
    whatsapp: toAbsoluteUrl(siteConfig.whatsappUrl ?? siteConfig.whatsapp),
    linkedin: toAbsoluteUrl(siteConfig.linkedin),
    github: toAbsoluteUrl(siteConfig.github),
    instagram: toAbsoluteUrl(siteConfig.instagram),
  };

  const seen = new Set<string>();
  const seenTypes = new Set<ExtractedLink["type"]>();
  const links: ExtractedLink[] = [];

  const pushLink = (type: ExtractedLink["type"], rawUrl: string | undefined) => {
    const absolute = toAbsoluteUrl(rawUrl);
    if (!absolute) {
      return;
    }

    const key = absolute.toLowerCase();
    if (seen.has(key)) {
      return;
    }

    if (type !== "url" && seenTypes.has(type)) {
      return;
    }

    seen.add(key);
    if (type !== "url") {
      seenTypes.add(type);
    }

    links.push({
      type,
      url: absolute,
      label: defaultLabels[type],
    });
  };

  for (const rawMatch of rawMatches) {
    const normalized = normalizeUrl(rawMatch);
    let parsed: URL;

    try {
      parsed = new URL(normalized);
    } catch {
      continue;
    }

    const type = detectLinkType(parsed.hostname);
    const preferred = knownLinksByType[type] ?? parsed.toString();
    pushLink(type, preferred);
  }

  const mentionSource = textWithoutUrls.toLowerCase();
  const platformMention = hasPlatformMention(mentionSource);
  const contactIntent = hasContactIntent(mentionSource);

  if (platformMention.whatsapp) {
    pushLink("whatsapp", knownLinksByType.whatsapp);
  }
  if (platformMention.linkedin) {
    pushLink("linkedin", knownLinksByType.linkedin);
  }
  if (platformMention.github) {
    pushLink("github", knownLinksByType.github);
  }
  if (platformMention.instagram) {
    pushLink("instagram", knownLinksByType.instagram);
  }

  const hasMentionedPlatform =
    platformMention.whatsapp ||
    platformMention.linkedin ||
    platformMention.github ||
    platformMention.instagram;

  if (contactIntent && !hasMentionedPlatform) {
    pushLink("whatsapp", knownLinksByType.whatsapp);
    pushLink("linkedin", knownLinksByType.linkedin);
  }

  const cleanText = cleanupText(textWithoutUrls);
  return { cleanText, links };
}
