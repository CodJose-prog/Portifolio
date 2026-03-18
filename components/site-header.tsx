"use client";

import Link from "next/link";
import type { Lang } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";
import { LanguageSwitcher } from "@/components/language-switcher";

type SiteHeaderProps = {
  lang: Lang;
};

export function SiteHeader({ lang }: SiteHeaderProps) {
  return (
    <header className="border-b border-border/70 bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href={`/${lang}`} className="flex items-center gap-3 text-sm text-foreground">
          <span className="terminal-dot" />
          <span className="terminal-prompt">jose@portfolio:~$</span>
          <span className="terminal-muted hidden sm:inline">{siteConfig.role}</span>
        </Link>

        <div className="flex items-center gap-3 text-xs">
          <span className="terminal-muted hidden sm:inline">type help</span>
          <span className="terminal-success hidden sm:inline">online</span>
          <LanguageSwitcher lang={lang} />
        </div>
      </div>
    </header>
  );
}
