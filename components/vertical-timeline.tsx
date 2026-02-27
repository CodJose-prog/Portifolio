"use client";

import { motion } from "framer-motion";
import { TimelineItem, type TimelineEntry } from "@/components/timeline-item";

type VerticalTimelineProps = {
  items: TimelineEntry[];
  readCaseLabel: string;
  externalLabel: string;
};

export function VerticalTimeline({
  items,
  readCaseLabel,
  externalLabel,
}: VerticalTimelineProps) {
  return (
    <section className="relative pb-1 pt-2">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-[0.875rem] top-0 w-px bg-gradient-to-b from-primary/50 via-border to-border md:left-1/2 md:-translate-x-1/2"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ transformOrigin: "top" }}
      />

      <ol className="space-y-10 md:space-y-12">
        {items.map((item, index) => (
          <TimelineItem
            key={item.slug}
            item={item}
            index={index}
            readCaseLabel={readCaseLabel}
            externalLabel={externalLabel}
          />
        ))}
      </ol>
    </section>
  );
}
