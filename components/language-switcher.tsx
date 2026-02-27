"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Lang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

function nextPath(pathname: string, targetLang: Lang) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return `/${targetLang}`;
  }

  segments[0] = targetLang;
  return `/${segments.join("/")}`;
}

export function LanguageSwitcher({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const targetLang: Lang = lang === "pt" ? "en" : "pt";
  const href = nextPath(pathname, targetLang);

  return (
    <Button asChild variant="outline" size="sm">
      <Link href={href} hrefLang={targetLang}>
        {targetLang.toUpperCase()}
      </Link>
    </Button>
  );
}
