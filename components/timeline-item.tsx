"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type TimelineEntry = {
  slug: string;
  period: string;
  title: string;
  context?: string;
  role: string;
  stack?: string[];
  summary?: string;
  responsibilities?: string[];
  caseUrl?: string;
  liveUrl?: string;
};

type TimelineItemProps = {
  item: TimelineEntry;
  index: number;
  readCaseLabel: string;
  externalLabel: string;
};

export function TimelineItem({
  item,
  index,
  readCaseLabel,
  externalLabel,
}: TimelineItemProps) {
  const alignLeftOnDesktop = index % 2 === 0;

  return (
    <li className="group grid grid-cols-[1.75rem_minmax(0,1fr)] gap-4 md:grid-cols-[minmax(0,1fr)_2.5rem_minmax(0,1fr)] md:gap-8">
      <div
        className={cn(
          "col-start-2 md:row-start-1",
          alignLeftOnDesktop ? "md:col-start-1" : "md:col-start-3",
        )}
      >
        <motion.article
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.35, ease: "easeOut", delay: Math.min(index * 0.05, 0.25) }}
          className={cn(
            "surface rounded-2xl border border-border/70 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/35",
            alignLeftOnDesktop ? "md:ml-8" : "md:mr-8",
          )}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/90">{item.period}</p>
          <h2 className="mt-3 text-2xl font-semibold leading-tight">{item.title}</h2>
          {item.context ? (
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">{item.context}</p>
          ) : null}
          <p className="mt-2 text-sm font-medium text-muted-foreground">{item.role}</p>

          {item.stack && item.stack.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {item.stack.map((tech) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>
          ) : null}

          {item.summary ? <p className="mt-5 text-sm leading-7 text-muted-foreground">{item.summary}</p> : null}

          {item.responsibilities && item.responsibilities.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
              {item.responsibilities.map((responsibility) => (
                <li key={responsibility} className="list-inside list-disc">
                  {responsibility}
                </li>
              ))}
            </ul>
          ) : null}

          {item.caseUrl || item.liveUrl ? (
            <div className="mt-6 flex flex-wrap gap-3">
              {item.caseUrl ? (
                <Button asChild size="sm">
                  <Link href={item.caseUrl}>{readCaseLabel}</Link>
                </Button>
              ) : null}
              {item.liveUrl ? (
                <Button asChild variant="outline" size="sm">
                  <Link href={item.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="size-4" />
                    {externalLabel}
                  </Link>
                </Button>
              ) : null}
            </div>
          ) : null}
        </motion.article>
      </div>

      <div className="col-start-1 row-start-1 flex justify-center pt-8 md:col-start-2">
        <span className="mt-0.5 block size-4 rounded-full border-2 border-primary/70 bg-background shadow-[0_0_0_4px_var(--background)] transition-colors duration-300 group-hover:border-primary group-hover:bg-primary/15" />
      </div>
    </li>
  );
}
