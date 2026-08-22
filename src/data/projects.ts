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
  media?: {
    src: string;
    alt: string;
    title: string;
    fit?: "contain" | "cover";
    surface?: "light" | "dark";
  }[];
  repository?: string;
  documentation?: {
    href: string;
    label: string;
  };
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
    media: [
      {
        src: "/assets/projects/topicgate/desktop-app.png",
        alt: "TopicGate desktop observer showing MQTT topics, payload details, and publishing controls",
        title: "Desktop observer",
        surface: "light",
      },
      {
        src: "/assets/projects/topicgate/plugin_in_codex.png",
        alt: "TopicGate plugin installed in Codex with MQTT inspection skills",
        title: "Codex integration",
        surface: "dark",
      },
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
    media: [
      {
        src: "/assets/projects/smarthomebridge/chicken_camerar_loxberry_plugin.png",
        alt: "SmartHomeBridge chicken camera LoxBerry plugin configuration",
        title: "Camera integration",
        surface: "light",
      },
      {
        src: "/assets/projects/smarthomebridge/chicken_door_loxberry_plugin.png",
        alt: "SmartHomeBridge chicken door LoxBerry plugin controls",
        title: "Door control",
        surface: "light",
      },
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
  },
  {
    id: "nova",
    name: "NOVA",
    purpose: "Backend-led event operations for the HTL Neufelden school association, still used from planning and invitations through billing.",
    result: "Event operations",
    technologies: ["ASP.NET Core", "EF Core", "C#", "MSSQL", "Angular"],
    leftNodes: ["Event planning", "Invitations", "Billing"],
    rightNodes: ["ASP.NET Core API", "EF Core", "MSSQL"],
    media: [
      {
        src: "/assets/projects/nova/nova_dashboard.png",
        alt: "NOVA dashboard showing event-management functions for the HTL Neufelden school association",
        title: "Operations dashboard",
        surface: "light",
      },
    ],
    documentation: {
      href: "/documents/diploma-thesis.pdf",
      label: "View diploma thesis",
    },
  },
  {
    id: "portfolio-hub",
    name: "PortfolioHub",
    purpose: "Build and operate this portfolio as a containerized Vue application on an Ubuntu homelab behind Caddy.",
    result: "Homelab delivery",
    technologies: ["Vue 3", "TypeScript", "Vite", "Docker", "Nginx", "Caddy"],
    leftNodes: ["Vue 3", "Vite build", "Docker image"],
    rightNodes: ["Nginx runtime", "Caddy proxy", "Ubuntu homelab"],
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
    media: [
      {
        src: "/assets/projects/serverless-portfolio/architecture-diagram.png",
        alt: "Serverless Portfolio Hub deployment architecture from GitHub Actions to Azure services",
        title: "Deployment architecture",
        surface: "dark",
      },
    ],
    repository: "https://github.com/Dumdart/CCDEProject-SSPH",
  },
];

export const technologyAnchors = [".NET", "Vue", "Azure", "Python", "MQTT", "Kotlin"];
