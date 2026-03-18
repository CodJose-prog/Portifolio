import Link from "next/link";
import { Github, Linkedin, Mail, MapPin, MessageCircle } from "lucide-react";
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
      href: `mailto:${siteConfig.email}`,
      label: "Email",
      icon: Mail,
      ariaLabel: lang === "pt" ? "Enviar e-mail" : "Send email",
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
    {
      href: siteConfig.whatsapp,
      label: "WhatsApp",
      icon: MessageCircle,
      ariaLabel: lang === "pt" ? "Abrir conversa no WhatsApp" : "Open WhatsApp chat",
    },
  ];

  const copyright =
    lang === "pt"
      ? "© 2026 José Manoel Pereira. Portfólio focado em backend engineering."
      : "© 2026 José Manoel Pereira. Portfolio focused on backend engineering.";

  return (
    <footer className="mt-20 border-t border-border/80 bg-background/72 backdrop-blur-xl">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.3fr_0.85fr_0.85fr] lg:px-8">
        <section className="space-y-4">
          <div>
            <p className="text-base font-semibold">{siteConfig.name}</p>
            <p className="mt-1 text-sm text-muted-foreground">{siteConfig.role}</p>
          </div>
          <p className="max-w-md text-sm leading-7 text-muted-foreground">
            {lang === "pt"
              ? "Construo backend com foco em APIs, arquitetura, dados, integração de serviços e entrega contínua."
              : "I build backend systems focused on APIs, architecture, data, service integrations, and continuous delivery."}
          </p>
        </section>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-foreground">
            {lang === "pt" ? "Navegação" : "Navigation"}
          </h2>
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
          <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-foreground">
            {lang === "pt" ? "Contato" : "Contact"}
          </h2>
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
            <li className="pt-2">
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="size-4" />
                <span>{siteConfig.locationLabel}</span>
              </div>
            </li>
          </ul>
        </section>
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 border-t border-border/80 px-4 py-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <span>{copyright}</span>
        <Link
          href={siteConfig.sourceCodeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-primary"
        >
          {lang === "pt" ? "Código no GitHub" : "Source on GitHub"}
        </Link>
      </div>
    </footer>
  );
}
