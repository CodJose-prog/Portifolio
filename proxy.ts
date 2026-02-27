import { NextResponse, type NextRequest } from "next/server";
import type { Lang } from "@/lib/i18n";

function detectPreferredLang(request: NextRequest): Lang {
  const acceptLanguage = request.headers.get("accept-language")?.toLowerCase() ?? "";
  return acceptLanguage.includes("pt") ? "pt" : "en";
}

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    const lang = detectPreferredLang(request);
    return NextResponse.redirect(new URL(`/${lang}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
