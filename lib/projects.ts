import { projectCaseStudies, projects } from "@/content/projects";

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectCaseStudyBySlug(slug: string) {
  return projectCaseStudies.find((project) => project.slug === slug);
}
