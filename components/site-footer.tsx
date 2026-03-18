import Link from "next/link";
import { Github, Linkedin, Mail, MapPin, MessageCircle } from "lucide-react";
import type { Dictionary } from "@/content/dictionary";
import type { Lang } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { StatusPill } from "@/components/system/status-pill";
import { SystemPanel } from "@/components/system/system-panel";

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
    <footer className="mt-20 pb-8">
      <div className="mx-auto w-full max-w-[92rem] px-4 sm:px-6 lg:px-8">
        <SystemPanel tone="muted" className="space-y-8 p-6 lg:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.85fr_0.85fr_0.9fr]">
            <section className="space-y-4">
              <StatusPill
                tone="success"
                label={lang === "pt" ? "system online" : "system online"}
                pulse
              />
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
              <h2 className="soft-label">{lang === "pt" ? "Navegacao" : "Navigation"}</h2>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
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
              <h2 className="soft-label">{lang === "pt" ? "Contato" : "Contact"}</h2>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
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
                <li className="pt-1">
                  <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="size-4" />
                    <span>{siteConfig.locationLabel}</span>
                  </div>
                </li>
              </ul>
            </section>

            <section className="space-y-4 rounded-[1.4rem] border border-border/70 bg-background/45 p-4">
              <p className="soft-label">{lang === "pt" ? "MAVIK module" : "MAVIK module"}</p>
              <p className="text-sm leading-7 text-muted-foreground">
                {lang === "pt"
                  ? "Software house para backend, integrações e produtos sob medida."
                  : "Software house for backend, integrations, and tailored products."}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="sm">
                  <Link href="https://mavik.cloud" target="_blank" rel="noopener noreferrer">
                    {lang === "pt" ? "Contratar MAVIK" : "Hire MAVIK"}
                  </Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link
                    href={siteConfig.sourceCodeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {lang === "pt" ? "Codigo" : "Source"}
                  </Link>
                </Button>
              </div>
            </section>
          </div>

          <div className="dashboard-divider flex flex-col gap-3 pt-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span>{copyright}</span>
            <Link
              href={siteConfig.sourceCodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-primary"
            >
              {lang === "pt" ? "Codigo no GitHub" : "Source on GitHub"}
            </Link>
          </div>
        </SystemPanel>
      </div>
    </footer>
  );
}
