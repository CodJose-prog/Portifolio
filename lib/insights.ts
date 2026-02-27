import { insights } from "@/content/insights";

export function getAllInsights() {
  return insights;
}

export function getInsightBySlug(slug: string) {
  return insights.find((insight) => insight.slug === slug);
}
