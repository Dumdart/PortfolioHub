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
    status: "Published on PyPI · Listed in the MCP Registry",

    purpose:
      "Local MQTT developer tooling for people and AI agents. TopicGate keeps broker credentials and observed state on the user's machine, exposes inspection through a read-only-by-default MCP server, and makes device control explicitly opt-in.",

    result: "Safe MQTT inspection for humans and agents",

    technologies: [
      "Python",
      "MQTT 5",
      "MCP",
      "SQLite",
      "PySide6",
      "Keyring"
    ],

    leftNodes: [
      "MQTT brokers",
      "Topic filters",
      "Observed messages"
    ],

    rightNodes: [
      "Local state store",
      "Desktop observer",
      "Read-only MCP"
    ],
    media: [
      {
        src: "/assets/projects/topicgate/desktop-app.png",
        alt: "TopicGate desktop observer showing MQTT topics, payload details, and publishing controls",
        title: "Desktop observer",
        surface: "light",
      },
      {
        src: "/assets/projects/topicgate/plugin_in_codex.png",
        alt: "TopicGate plugin for agents providing secure MQTT inspection skills",
        title: "Plugin for agents",
        surface: "dark",
      },
      {
        src: "/assets/projects/topicgate/topicgate_architecture.png",
        alt: "TopicGate architecture connecting MQTT brokers, local state, desktop observation, and MCP inspection",
        title: "System architecture",
        surface: "light",
      },
    ],
  },
  {
    id: "nova",
    name: "NOVA",

    purpose:
      "Production-used operations system for the HTL Neufelden school association, covering members, event planning, invitations, email workflows, billing, and exports. The backend was built for reliable day-to-day use beyond the diploma project.",

    result: "Operational backend for a real organization",

    technologies: [
      "ASP.NET Core",
      "EF Core",
      "C#",
      "MSSQL",
      "Angular"
    ],

    leftNodes: [
      "Members & events",
      "Invitations & email",
      "Billing & exports"
    ],

    rightNodes: [
      "Authentication & roles",
      "ASP.NET Core + EF Core",
      "MSSQL"
    ],
    media: [
      {
        src: "/assets/projects/nova/nova_dashboard.png",
        alt: "NOVA dashboard showing event-management functions for the HTL Neufelden school association",
        title: "Operations dashboard",
        surface: "light",
      },
      {
        src: "/assets/projects/nova/nova_architecture.png",
        alt: "NOVA application architecture diagram",
        title: "Application architecture",
        surface: "light",
      },
    ],
  },
  {
    id: "clipstack",
    name: "ClipStack",
    status: "In development",

    purpose:
      "Booking platform for independent barbershops moving from paper calendars to low-friction customer booking and dependable staff workflows. The architecture is designed around explicit booking conflicts, minimal customer data, and offline-first mobile sync.",

    result: "Conflict-aware booking platform",

    technologies: [
      ".NET",
      "Azure Functions",
      "PostgreSQL",
      "Vue",
      "Kotlin Multiplatform"
    ],

    leftNodes: [
      "Customer booking",
      "Manager operations",
      "Offline staff app"
    ],

    rightNodes: [
      "Versioned REST API",
      "PostgreSQL",
      "Idempotent sync"
    ],
  },
  {
    id: "smart-home-bridge",
    name: "SmartHomeBridge",
    status: "Released as a LoxBerry plugin",

    purpose:
      "Integrate an Omlet smart coop door with MQTT and Loxone without coupling the automation controller to the vendor API. The bridge normalizes device telemetry, publishes retained state, and validates commands behind a stable local MQTT contract.",

    result: "Stable MQTT contract for a vendor device",

    technologies: [
      "Python",
      "MQTT",
      "LoxBerry",
      "Loxone",
      "Docker",
      "Omlet API"
    ],

    leftNodes: [
      "Omlet API",
      "Door telemetry",
      "MQTT commands"
    ],

    rightNodes: [
      "Retained MQTT state",
      "Loxone automation",
      "LoxBerry deployment"
    ],
    media: [
      {
        src: "/assets/projects/smarthomebridge/chicken_camerar_loxberry_plugin.png",
        alt: "Experimental SmartHomeBridge chicken camera LoxBerry plugin configuration",
        title: "Experimental camera integration",
        surface: "light",
      },
      {
        src: "/assets/projects/smarthomebridge/chicken_door_loxberry_plugin.png",
        alt: "SmartHomeBridge chicken door LoxBerry plugin controls",
        title: "Door control",
        surface: "light",
      },
    ],
  },
  {
    id: "homelab",
    name: "HomeLab Platform",
    status: "Side project",

    purpose:
      "Repurpose spare hardware into an Ubuntu-based container host for personal services and portfolio projects, with Docker Compose, reverse proxying, and hands-on ownership of deployment and operations.",

    result: "Self-hosted container platform",

    technologies: [
      "Ubuntu",
      "Docker",
      "Docker Compose",
      "Caddy",
      "Nginx"
    ],

    leftNodes: [
      "Repurposed hardware",
      "Ubuntu host",
      "Docker Compose"
    ],

    rightNodes: [
      "Reverse proxy",
      "Hosted services",
      "Operational ownership"
    ],
  },
  {
    id: "portfolio-hub",
    name: "PortfolioHub",

    purpose:
      "Build and operate this portfolio as a containerized Vue application on an Ubuntu homelab behind Caddy.",

    result: "Homelab delivery",

    technologies: [
      "Vue 3",
      "TypeScript",
      "Vite",
      "Docker",
      "Nginx",
      "Caddy"
    ],

    leftNodes: [
      "Vue 3",
      "Vite build",
      "Docker image"
    ],

    rightNodes: [
      "Nginx runtime",
      "Caddy proxy",
      "Ubuntu homelab"
    ],
  },
  {
    id: "serverless-portfolio",
    name: "Serverless Portfolio Hub",
    status: "Cloud architecture study",

    purpose:
      "Build a serverless Azure application to explore cloud deployment, identity, observability, and CI/CD in practice. Vue is hosted on Azure Static Web Apps and backed by .NET Azure Functions, Cosmos DB, Entra ID, and Application Insights.",

    result: "Azure serverless reference architecture",

    technologies: [
      "Vue",
      "Azure Static Web Apps",
      "Azure Functions",
      "Cosmos DB",
      "Entra ID",
      "Application Insights"
    ],

    leftNodes: [
      "Vue frontend",
      "GitHub Actions",
      "Entra ID"
    ],

    rightNodes: [
      "Azure Functions",
      "Cosmos DB",
      "Application Insights"
    ],
    media: [
      {
        src: "/assets/projects/serverless-portfolio/architecture-diagram.png",
        alt: "Serverless Portfolio Hub deployment architecture from GitHub Actions to Azure services",
        title: "Deployment architecture",
        surface: "dark",
      },
    ],
  },
];

export const technologyAnchors = [".NET", "Vue", "Azure", "Python", "MQTT", "Kotlin"];
