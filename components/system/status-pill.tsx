import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statusPillVariants = cva(
  "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em]",
  {
    variants: {
      tone: {
        success: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200 dark:text-emerald-200",
        info: "border-sky-400/30 bg-sky-400/10 text-sky-200 dark:text-sky-200",
        warning: "border-amber-400/30 bg-amber-400/10 text-amber-200 dark:text-amber-200",
        neutral: "border-border/70 bg-background/60 text-muted-foreground",
      },
    },
    defaultVariants: {
      tone: "neutral",
    },
  },
);

type StatusPillProps = {
  label: string;
  pulse?: boolean;
  className?: string;
} & VariantProps<typeof statusPillVariants>;

export function StatusPill({ label, tone, pulse = false, className }: StatusPillProps) {
  return (
    <span className={cn(statusPillVariants({ tone }), className)}>
      <span
        className={cn(
          "inline-block size-2 rounded-full",
          tone === "success"
            ? "bg-emerald-300"
            : tone === "info"
              ? "bg-sky-300"
              : tone === "warning"
                ? "bg-amber-300"
                : "bg-muted-foreground/70",
          pulse ? "animate-pulse" : "",
        )}
      />
      {label}
    </span>
  );
}
