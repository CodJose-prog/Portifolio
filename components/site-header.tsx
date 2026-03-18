"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
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
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: `/${lang}`, label: nav.home },
    { href: `/${lang}/projects`, label: nav.projects },
    { href: `/${lang}/about`, label: nav.about },
    { href: `/${lang}/contact`, label: nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/78 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href={`/${lang}`}
          className="min-w-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <p className="truncate text-base font-semibold">{siteConfig.name}</p>
          <p className="truncate text-xs text-muted-foreground">
            {siteConfig.role} • {siteConfig.city}
          </p>
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
                  "rounded-full px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive
                    ? "bg-primary/14 text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex md:items-center md:gap-2">
            <LanguageSwitcher lang={lang} />
            <ThemeToggle />
            <Link
              href={`/${lang}/contact`}
              className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-[var(--primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {nav.cta}
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher lang={lang} />
            <ThemeToggle />
            <button
              type="button"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((value) => !value)}
              className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen ? (
        <div className="border-t border-border/70 bg-background/95 px-4 py-4 sm:px-6 md:hidden">
          <nav aria-label="Mobile navigation" className="grid gap-2">
            {links.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== `/${lang}` && pathname.startsWith(`${item.href}/`));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-2xl border px-4 py-3 text-sm transition-colors",
                    isActive
                      ? "border-primary/40 bg-primary/10 text-foreground"
                      : "border-border bg-card text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}

            <Link
              href={`/${lang}/contact`}
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-2xl bg-primary px-4 py-3 text-center text-sm font-medium text-primary-foreground transition hover:bg-[var(--primary-hover)]"
            >
              {nav.cta}
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
