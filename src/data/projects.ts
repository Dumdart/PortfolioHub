export type ProjectId =
  | "smart-home-bridge"
  | "topicgate"
  | "clipstack"
  | "nova"
  | "homelab"
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
  documentation?: {
    href: string;
    label: string;
  };
}

export const projects: Project[] = [
  {
    id: "topicgate",
    name: "TopicGate",
    status: "Published on PyPI · Listed in the MCP Registry",
    purpose: "Provide secure local access to MQTT state through a desktop observer and a read-only-by-default MCP server for people and AI agents, while keeping broker credentials on the user's machine and device control explicitly opt-in. TopicGate is distributed through PyPI and listed in the official MCP Registry.",
    result: "Secure local MQTT access",
    technologies: ["Python", "MQTT 5", "MCP", "SQLite", "PySide6", "Keyring"],
    leftNodes: ["Broker profiles", "Topic filters", "Local persistence"],
    rightNodes: ["Desktop observer", "Agent-ready MCP server", "Explicit control mode"],
    evidence: [
      "Published Python package",
      "Official MCP Registry listing",
      "Plugin for agents",
      "Read-only safety boundary",
    ],
    screenshot: {
      src: "/assets/projects/topicgate/desktop-app.png",
      alt: "TopicGate desktop observer showing MQTT topics, payload details, and publishing controls",
    },
    repository: "https://github.com/Dumdart/TopicGate",
  },
  {
    id: "smart-home-bridge",
    name: "SmartHomeBridge",
    status: "Stable LoxBerry plugin",
    purpose: "Connect an Omlet Smart Automatic Chicken Coop Door to MQTT and Loxone through a local bridge that publishes stable, retained door state and accepts remote commands without exposing the vendor API to the home-automation controller.",
    result: "Connected Omlet chicken door",
    technologies: ["Python", "MQTT", "LoxBerry", "Loxone", "Docker", "Omlet API"],
    leftNodes: ["Omlet chicken door", "Door telemetry", "Manual commands"],
    rightNodes: ["Retained MQTT topics", "Loxone automation", "LoxBerry plugin"],
    evidence: [
      "Published LoxBerry plugin",
      "Stable retained MQTT contract",
      "Manual door controls",
      "Experimental camera integration",
    ],
    screenshot: {
      src: "/assets/projects/smarthomebridge/chicken_door_loxberry_plugin.png",
      alt: "SmartHomeBridge chicken door LoxBerry plugin controls",
    },
    repository: "https://github.com/Dumdart/SmartHomeBridge",
    documentation: {
      href: "https://wiki.loxberry.de/plugins/omlet_chicken_door_plugin/start",
      label: "View published LoxBerry plugin",
    },
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
    id: "homelab",
    name: "HomeLab Platform",
    status: "Side project",
    purpose: "Turn spare compute on my sister's PC into a small self-hosted platform while setting up her system, giving useful hardware a second role as the home for my containerized projects.",
    result: "Repurposed project hosting",
    technologies: ["Ubuntu", "Docker", "Docker Compose", "Caddy", "Nginx"],
    leftNodes: ["Repurposed PC", "Containerized projects", "Local network"],
    rightNodes: ["Caddy reverse proxy", "Self-hosted services", "Hands-on operations"],
    evidence: [
      "Repurposed spare compute",
      "Containerized project hosting",
      "Caddy reverse proxy",
      "Hands-on service operations",
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
