export type ProjectId =
  | "smart-home-bridge"
  | "topicgate"
  | "clipstack"
  | "nova"
  | "portfolio-hub"
  | "serverless-portfolio";

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
    id: "topicgate",
    name: "TopicGate",
    status: "First release",
    purpose: "Provide a local-first MQTT observer and safe MCP gateway, giving people and AI agents the MQTT state they need without exposing broker credentials or device control by default.",
    result: "Secure MQTT context",
    technologies: ["Python", "MQTT 5", "MCP", "SQLite", "PySide6", "Keyring"],
    leftNodes: ["Broker profiles", "Topic filters", "Observed MQTT state"],
    rightNodes: ["Desktop observer", "Read-only MCP server", "Explicit control mode"],
    evidence: [
      "OS-backed credential storage",
      "Persisted local observation state",
      "Read-only MCP tools by default",
      "Explicit control-mode escalation",
    ],
    repository: "https://github.com/Dumdart/TopicGate",
  },
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
    id: "portfolio-hub",
    name: "PortfolioHub",
    purpose: "Build and operate this portfolio as a containerized Vue application on an Ubuntu homelab behind Caddy.",
    result: "Homelab delivery",
    technologies: ["Vue 3", "TypeScript", "Vite", "Docker", "Nginx", "Caddy"],
    leftNodes: ["Vue 3", "Vite build", "Docker image"],
    rightNodes: ["Nginx runtime", "Caddy proxy", "Ubuntu homelab"],
    evidence: [
      "Multi-stage Docker build",
      "Localhost-only container port",
      "Nginx health check",
      "Host-level Caddy proxy",
    ],
  },
  {
    id: "serverless-portfolio",
    name: "Serverless Portfolio Hub",
    status: "Alternative hosting study",
    purpose: "Explore a Vue and Azure Functions serverless deployment. It is a useful cloud reference, but not my preferred hosting platform: self-hosting at home is more convenient and gives me direct DevOps ownership.",
    result: "Azure reference build",
    technologies: ["Vue", "Azure Functions", "Cosmos DB", "Entra ID", "GitHub Actions", "App Insights"],
    leftNodes: ["Vue frontend", "GitHub Actions", "Environment config"],
    rightNodes: ["Azure Functions", "Cosmos DB", "App Insights"],
    evidence: [
      "Separate frontend and backend CI/CD",
      "Entra ID authentication",
      "Secure secret handling",
      "Alternative to homelab hosting",
    ],
    repository: "https://github.com/Dumdart/CCDEProject-SSPH",
  },
];

export const technologyAnchors = [".NET", "Vue", "Azure", "Python", "MQTT", "Kotlin"];
