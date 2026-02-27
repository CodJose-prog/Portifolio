import Link from "next/link";
import { Github, Instagram, Linkedin, MapPin, MessageCircle } from "lucide-react";
import type { Dictionary } from "@/content/dictionary";
import type { Lang } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

type SiteFooterProps = {
  lang: Lang;
  nav: Dictionary["nav"];
};

export function SiteFooter({ lang, nav }: SiteFooterProps) {
  const navigation = [
    { href: `/${lang}`, label: nav.home },
    { href: `/${lang}/projects`, label: nav.projects },
    { href: `/${lang}/about`, label: nav.about },
    { href: `/${lang}/contact`, label: nav.contact },
  ];

  const contactLinks = [
    {
      href: siteConfig.whatsapp,
      label: "WhatsApp",
      icon: MessageCircle,
      ariaLabel: lang === "pt" ? "Abrir conversa no WhatsApp" : "Open WhatsApp chat",
    },
    {
      href: siteConfig.instagram,
      label: "Instagram",
      icon: Instagram,
      ariaLabel: "Instagram",
    },
    {
      href: siteConfig.linkedin,
      label: "LinkedIn",
      icon: Linkedin,
      ariaLabel: "LinkedIn",
    },
    {
      href: siteConfig.github,
      label: "GitHub",
      icon: Github,
      ariaLabel: "GitHub",
    },
  ];

  const navigationTitle = lang === "pt" ? "Navegação" : "Navigation";
  const contactTitle = lang === "pt" ? "Contato" : "Contact";
  const locationTitle = lang === "pt" ? "Localização" : "Location";
  const copyright =
    lang === "pt"
      ? "© 2026 José Manoel Pereira. Todos os direitos reservados."
      : "© 2026 José Manoel Pereira. All rights reserved.";

  return (
    <footer className="mt-14 border-t border-border/80 bg-background/75">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-foreground">{navigationTitle}</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-foreground">{contactTitle}</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {contactLinks.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.ariaLabel}
                    className="inline-flex items-center gap-2 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Icon className="size-4" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-foreground">{locationTitle}</h2>
          <div className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="size-4" />
            <span>{siteConfig.locationLabel}</span>
          </div>
        </section>
      </div>
      <div className="mx-auto w-full max-w-6xl border-t border-border/80 px-4 py-4 text-sm text-muted-foreground sm:px-6 lg:px-8">
        {copyright}
      </div>
    </footer>
  );
}
