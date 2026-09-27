export type ProjectId =
  | "smart-home-bridge"
  | "topicgate"
  | "clipstack"
  | "nova"
  | "homelab"
  | "portfolio-hub"
  | "serverless-portfolio";

export interface Project {
  coreStory: string[];
  links: { kind: "repository" | "document" | "package" | "site"; label: string; url: string }[];
  icon?: { src: string; repository?: string };
  primaryMedia?: number;
  advancedBlocks: AdvancedBlock[];
  id: ProjectId;
  name: string;
  status: string;
  purpose: string;
  summary: string;
  roleSummary: string;
  result: string;
  contribution: string;
  decisions: { title: string; reason: string }[];
  lesson: string;
  architecture?: { source: string; description: string; planned?: boolean };
  technologies: string[];
  leftNodes: string[];
  rightNodes: string[];
  media?: {
    src: string;
    alt: string;
    title: string;
    fit?: "contain" | "cover";
    surface?: "light" | "dark";
    kind?: "product" | "architecture";
  }[];
  repository?: string;
  documentation?: {
    href: string;
    label: string;
  };
}


export type AdvancedBlock =
  | { id: string; type: "text"; heading: string; paragraphs: string[] }
  | { id: string; type: "decision"; heading: string; reason: string }
  | { id: string; type: "list"; heading: string; items: string[] }
  | { id: string; type: "architecture"; heading: string; architecture: NonNullable<Project["architecture"]> }
  | { id: string; type: "media"; heading: string; media: NonNullable<Project["media"]> };
