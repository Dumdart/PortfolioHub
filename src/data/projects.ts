import type { Project, ProjectId } from "./projectTypes";
export type { Project, ProjectId, AdvancedBlock } from "./projectTypes";
import { validateProjects } from "./projectValidation";
import order from "./projects/index.json";
import project0 from "./projects/topicgate.json";
import project1 from "./projects/nova.json";
import project2 from "./projects/clipstack.json";
import project3 from "./projects/smart-home-bridge.json";
import project4 from "./projects/homelab.json";
import project5 from "./projects/serverless-portfolio.json";
import project6 from "./projects/portfolio-hub.json";

export const projects: Project[] = validateProjects(order, [project0, project1, project2, project3, project4, project5, project6]);

export const technologyAnchors = [".NET", "Vue", "Azure", "Python", "MQTT", "Kotlin"];

export function resolveProjectId(value: unknown): ProjectId {
  return typeof value === "string" && projects.some((project) => project.id === value)
    ? value as ProjectId
    : "topicgate";
}

export function nextProjectId(id: ProjectId): ProjectId {
  return projects[(projects.findIndex((project) => project.id === id) + 1) % projects.length].id;
}

export function projectViews(project: Project): ("product" | "architecture")[] {
  const views: ("product" | "architecture")[] = [];
  if (project.media?.some((media) => media.kind !== "architecture")) views.push("product");
  if (project.architecture || project.media?.some((media) => media.kind === "architecture")) views.push("architecture");
  return views;
}
