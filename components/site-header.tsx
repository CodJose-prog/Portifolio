"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary } from "@/content/dictionary";
import type { Lang } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";


type SiteHeaderProps = {
  lang: Lang;
  nav: Dictionary["nav"];
};

export function SiteHeader({ lang, nav }: SiteHeaderProps) {
  const pathname = usePathname();

  const links = [
    { href: `/${lang}`, label: nav.home },
    { href: `/${lang}/projects`, label: nav.projects },
    { href: `/${lang}/about`, label: nav.about },
    { href: `/${lang}/contact`, label: nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href={`/${lang}`} className="min-w-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <p className="truncate text-base font-semibold">{siteConfig.name}</p>
          <p className="truncate text-xs text-muted-foreground">{siteConfig.city}</p>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
          {links.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== `/${lang}` && pathname.startsWith(`${item.href}/`));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive ? "bg-muted text-foreground" : "text-muted-foreground hover:text-primary",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher lang={lang} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
