"use client";

import type { ComponentType, SVGProps } from "react";
import Link from "next/link";
import type { TechIcon } from "@/content/skills";
import type { Lang } from "@/lib/i18n";
import DockerIcon from "@/public/icons/docker.svg";
import GithubActionsIcon from "@/public/icons/githubactions.svg";
import JavaScriptIcon from "@/public/icons/javascript.svg";
import LaravelIcon from "@/public/icons/laravel.svg";
import LinuxIcon from "@/public/icons/linux.svg";
import MySqlIcon from "@/public/icons/mysql.svg";
import NextJsIcon from "@/public/icons/nextdotjs.svg";
import NginxIcon from "@/public/icons/nginx.svg";
import NodeJsIcon from "@/public/icons/nodedotjs.svg";
import PhpIcon from "@/public/icons/php.svg";
import PostgreSqlIcon from "@/public/icons/postgresql.svg";
import ReactIcon from "@/public/icons/react.svg";
import TailwindCssIcon from "@/public/icons/tailwindcss.svg";
import TypeScriptIcon from "@/public/icons/typescript.svg";
import VueIcon from "@/public/icons/vuedotjs.svg";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const inlineIconMap: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  php: PhpIcon,
  laravel: LaravelIcon,
  nodejs: NodeJsIcon,
  typescript: TypeScriptIcon,
  javascript: JavaScriptIcon,
  vue: VueIcon,
  react: ReactIcon,
  nextjs: NextJsIcon,
  tailwindcss: TailwindCssIcon,
  postgresql: PostgreSqlIcon,
  mysql: MySqlIcon,
  docker: DockerIcon,
  githubactions: GithubActionsIcon,
  linux: LinuxIcon,
  nginx: NginxIcon,
};

type TechIconsGridProps = {
  lang: Lang;
  items: TechIcon[];
};

export function TechIconsGrid({ lang, items }: TechIconsGridProps) {
  return (
    <TooltipProvider>
      <ul className="grid grid-cols-4 gap-3 md:grid-cols-6 lg:grid-cols-8">
        {items.map((item) => {
          const label = item.label[lang];
          const isNextJs = item.key === "nextjs";
          const InlineIcon = item.mode === "inline" ? inlineIconMap[item.key] : undefined;

          const commonClassName =
            "group inline-flex size-14 items-center justify-center rounded-xl border border-border bg-card shadow-sm transition duration-200 ease-out motion-reduce:transition-none motion-reduce:transform-none motion-reduce:hover:scale-100 motion-reduce:focus-visible:scale-100 hover:scale-[1.04] hover:border-primary/60 hover:shadow-[0_14px_24px_-18px_var(--primary)] focus-visible:scale-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer";

          const iconNode =
            item.mode === "inline" && InlineIcon ? (
              <span
                className={
                  isNextJs
                    ? "inline-flex size-9 items-center justify-center rounded-md border border-border/80 bg-white/95 shadow-[inset_0_0_0_1px_rgba(15,23,42,0.06)] dark:bg-slate-100"
                    : undefined
                }
              >
                <InlineIcon
                  aria-hidden="true"
                  focusable="false"
                  style={{ color: item.color ?? "#6D28D9" }}
                  className="size-7 shrink-0 fill-current stroke-current opacity-85 transition-opacity duration-200 motion-reduce:transition-none group-hover:opacity-100 group-focus-visible:opacity-100 [&_path]:fill-current [&_path]:stroke-current [&_rect]:fill-current [&_rect]:stroke-current [&_circle]:fill-current [&_circle]:stroke-current [&_polygon]:fill-current [&_polygon]:stroke-current [&_ellipse]:fill-current [&_ellipse]:stroke-current"
                />
              </span>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.src}
                alt=""
                aria-hidden="true"
                width={32}
                height={32}
                loading="lazy"
                decoding="async"
                className="size-8 object-contain opacity-90 transition-opacity duration-200 motion-reduce:transition-none group-hover:opacity-100 group-focus-visible:opacity-100"
              />
            );

          return (
            <li key={item.key} className="flex items-center justify-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  {item.href ? (
                    <Link
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className={commonClassName}
                    >
                      {iconNode}
                      <span className="sr-only">{label}</span>
                    </Link>
                  ) : (
                    <button type="button" aria-label={label} className={commonClassName}>
                      {iconNode}
                      <span className="sr-only">{label}</span>
                    </button>
                  )}
                </TooltipTrigger>
                <TooltipContent side="top" className="text-center">
                  <p>{label}</p>
                  {item.href ? (
                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                      {lang === "pt" ? "Abrir docs" : "Open docs"}
                    </p>
                  ) : null}
                </TooltipContent>
              </Tooltip>
            </li>
          );
        })}
      </ul>
    </TooltipProvider>
  );
}
