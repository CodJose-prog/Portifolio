export const languages = ["pt", "en"] as const;
export type Lang = (typeof languages)[number];

export const defaultLang: Lang = "pt";

export function isValidLang(value: string): value is Lang {
  return languages.includes(value as Lang);
}

export function normalizeLang(value: string): Lang {
  return isValidLang(value) ? value : defaultLang;
}

export function withLang(lang: Lang, route = ""): string {
  const normalizedRoute = route ? (route.startsWith("/") ? route : `/${route}`) : "";
  return `/${lang}${normalizedRoute}`;
}
