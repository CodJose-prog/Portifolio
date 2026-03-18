import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const systemPanelVariants = cva(
  "system-panel relative overflow-hidden rounded-[1.75rem] border p-5 text-card-foreground sm:p-6",
  {
    variants: {
      tone: {
        default: "border-border/70",
        muted: "system-panel-muted border-border/60",
        strong: "system-panel-strong border-primary/20",
        grid: "system-panel-grid border-border/70",
      },
    },
    defaultVariants: {
      tone: "default",
    },
  },
);

type SystemPanelProps<C extends React.ElementType> = {
  as?: C;
  className?: string;
} & VariantProps<typeof systemPanelVariants> &
  Omit<React.ComponentPropsWithoutRef<C>, "as" | "className">;

export function SystemPanel<C extends React.ElementType = "section">({
  as,
  tone,
  className,
  ...props
}: SystemPanelProps<C>) {
  const Component = as ?? "section";

  return <Component className={cn(systemPanelVariants({ tone }), className)} {...props} />;
}
