import type { MetadataRoute } from "next";
import { insights } from "@/content/insights";
import { projects } from "@/content/projects";
import { languages } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

const staticRoutes = ["", "/about", "/projects", "/blog", "/insights", "/contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries = languages.flatMap((lang) =>
    staticRoutes.map((route) => ({
      url: `${siteConfig.url}/${lang}${route}`,
      lastModified: now,
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : 0.8,
    })),
  );

  const projectEntries = languages.flatMap((lang) =>
    projects.map((project) => ({
      url: `${siteConfig.url}/${lang}/projects/${project.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  );

  const insightEntries = languages.flatMap((lang) =>
    insights.map((insight) => ({
      url: `${siteConfig.url}/${lang}/insights/${insight.slug}`,
      lastModified: insight.dateModified,
      changeFrequency: "monthly" as const,
      priority: 0.68,
    })),
  );

  return [...staticEntries, ...projectEntries, ...insightEntries];
}
