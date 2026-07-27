export type ProjectId = "smart-home-bridge" | "clipstack" | "nova" | "serverless-portfolio";

export interface Project {
  id: ProjectId;
  name: string;
  purpose: string;
  result: string;
  technologies: string[];
  leftNodes: string[];
  rightNodes: string[];
  evidence: string[];
  repository?: string;
}

export const projects: Project[] = [
  {
    id: "smart-home-bridge",
    name: "SmartHomeBridge",
    purpose: "Connect LAN smart-home systems to devices through stable MQTT topics.",
    result: "Connected devices",
    technologies: ["Python", "MQTT", "Docker", "YOLO", "PySide6"],
    leftNodes: ["Omlet door", "ESP32-CAM", "Python bridge"],
    rightNodes: ["MQTT", "Loxone", "YOLO inference"],
    evidence: [
      "Docker runtimes",
      "LoxBerry plugins",
      "PySide6 diagnostics",
      "Human-controlled model promotion",
    ],
    repository: "https://github.com/Dumdart/SmartHomeBridge",
  },
  {
    id: "clipstack",
    name: "ClipStack",
    purpose: "Replace paper calendars with dependable booking workflows for independent barbershops.",
    result: "Reliable booking",
    technologies: [".NET", "Vue", "Kotlin", "Azure", "PostgreSQL"],
    leftNodes: ["Customer booking", "Manager web", "Staff mobile"],
    rightNodes: ["Azure Functions", "PostgreSQL", "Notifications"],
    evidence: [
      "Mobile-first booking",
      "Explicit conflict handling",
      "Offline-ready staff app",
      "Reusable booking module",
    ],
  },
  {
    id: "nova",
    name: "NOVA",
    purpose: "Centralize membership, billing, forms, calendars, and email campaigns for a school association.",
    result: "School administration",
    technologies: ["Angular", "ASP.NET Core", "C#", "EF Core", "MSSQL"],
    leftNodes: ["Members", "Invoices", "Forms"],
    rightNodes: ["Calendar", "Email campaigns", "Azure DevOps"],
    evidence: [
      "Diploma project",
      "Backend and API ownership",
      "Full-stack team delivery",
      "Assessment: Sehr gut",
    ],
  },
  {
    id: "serverless-portfolio",
    name: "Serverless Portfolio Hub",
    purpose: "Demonstrate cloud-native delivery with a Vue frontend and serverless Azure backend.",
    result: "Cloud-native delivery",
    technologies: ["Vue", "Azure Functions", "Cosmos DB", "Entra ID", "GitHub Actions"],
    leftNodes: ["Vue frontend", "Visitor analytics", "Entra ID"],
    rightNodes: ["Azure Functions", "Cosmos DB", "App Insights"],
    evidence: [
      "Separate CI/CD pipelines",
      "Serverless architecture",
      "Secure secret handling",
      "Production monitoring",
    ],
    repository: "https://github.com/Dumdart/CCDEProject-SSPH",
  },
];

export const technologyAnchors = [".NET", "Vue", "Azure", "Python", "MQTT", "Kotlin"];
