export type ProjectId = "smart-home-bridge" | "clipstack" | "nova" | "serverless-portfolio";

export interface Project {
  id: ProjectId;
  name: string;
  status?: string;
  purpose: string;
  result: string;
  technologies: string[];
  leftNodes: string[];
  rightNodes: string[];
  evidence: string[];
  screenshot?: {
    src: string;
    alt: string;
  };
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
    status: "In development",
    purpose: "Building dependable booking workflows to replace paper calendars for independent barbershops.",
    result: "In development",
    technologies: [".NET", "Vue", "Kotlin", "Azure", "PostgreSQL"],
    leftNodes: ["Customer booking", "Manager web", "Staff mobile"],
    rightNodes: ["Azure Functions", "PostgreSQL", "Notifications"],
    evidence: [
      "Active product development",
      "Web and mobile delivery plan",
      "Booking conflict model",
      "Private working repository",
    ],
  },
  {
    id: "nova",
    name: "NOVA",
    purpose: "Backend-led event operations for the HTL Neufelden school association, still used from planning and invitations through billing.",
    result: "Event operations",
    technologies: ["ASP.NET Core", "EF Core", "C#", "MSSQL", "Angular"],
    leftNodes: ["Event planning", "Invitations", "Billing"],
    rightNodes: ["ASP.NET Core API", "EF Core", "MSSQL"],
    evidence: [
      "ASP.NET Core backend ownership",
      "EF Core data access",
      "Still used by the school association",
      "Diploma project · Sehr gut",
    ],
  },
  {
    id: "serverless-portfolio",
    name: "PortfolioHub",
    purpose: "Demonstrate DevOps ownership through separate CI/CD pipelines, serverless Azure services, and disciplined secret handling.",
    result: "DevOps & secure delivery",
    technologies: ["Vue", "GitHub Actions", "Azure Functions", "Entra ID", "Cosmos DB", "App Insights"],
    leftNodes: ["Vue frontend", "GitHub Actions", "Environment config"],
    rightNodes: ["Azure Functions", "Secret handling", "App Insights"],
    evidence: [
      "Separate frontend and backend CI/CD",
      "Environment-specific configuration",
      "Secure secret handling",
      "Serverless architecture",
    ],
    repository: "https://github.com/Dumdart/CCDEProject-SSPH",
  },
];

export const technologyAnchors = [".NET", "Vue", "Azure", "Python", "MQTT", "Kotlin"];
