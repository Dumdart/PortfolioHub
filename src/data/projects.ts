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

export const projects: Project[] = [
  {
    id: "topicgate",
    summary: "Local MQTT tooling for people and AI agents.",
    roleSummary: "Python core, desktop UI & MCP integration",
    contribution: "Built a local MQTT developer tool with a desktop interface, persistent observations, and an MCP interface for agents.",
    decisions: [
      { title: "Keep state and credentials local", reason: "SQLite stores observed state; the operating system keyring holds broker credentials. Inspection does not require a hosted service." },
      { title: "Separate inspection from control", reason: "MCP access is read-only by default. Publishing can affect physical devices, so control requires an explicit opt-in." },
      { title: "Make observation limits visible", reason: "Freshness and health metadata put payloads in context. Stored observations describe what TopicGate has seen, rather than claiming to be complete broker history." },
    ],
    lesson: "Published on PyPI and listed in the MCP Registry. The engineering focus is a clear boundary between observed data, its freshness, and actions that change a device.",
    architecture: {
      description: "MQTT messages enter a local observation layer backed by SQLite. The desktop and MCP interfaces expose this state; broker credentials stay in the system keyring. Device control is opt-in.",
      source: `flowchart LR
        broker[MQTT broker] -->|messages| core[Local observation layer]
        core <--> store[(SQLite observations)]
        keys[System keyring] -. credentials .-> core
        core --> desktop[Desktop observer]
        core --> mcp[Read-only MCP]
        mcp --> agents[AI agents]
        control[Opt-in control] -->|publish| broker`,
    },
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
        kind: "architecture",
        alt: "TopicGate architecture connecting MQTT brokers, local state, desktop observation, and MCP inspection",
        title: "System architecture",
        surface: "light",
      },
    ],
  },
  {
    id: "nova",
    summary: "Day-to-day operations for the HTL Neufelden school association.",
    roleSummary: "Backend, data modelling & full-stack teamwork",
    documentation: { href: "/documents/diploma-thesis.pdf", label: "Read diploma thesis" },
    status: "In use by the school association · Diploma project",
    contribution: "Started with API and backend development, then took on full-stack work in the team: data modelling, authentication and permissions, email, exports, and association workflows.",
    decisions: [
      { title: "Model the association's workflows", reason: "Members, events, invitations, and billing belong in a shared relational model so that staff can work from the same records." },
      { title: "Put permissions in the backend", reason: "Authentication and authorization support controlled access to administrative operations, beyond what the Angular interface displays." },
      { title: "Build beyond data entry", reason: "Email and exports connect the stored data to the association's everyday work. These outputs are part of the product, alongside the management screens." },
    ],
    lesson: "Used by the HTL Neufelden school association beyond the diploma project. Working on a system for an actual organization made data consistency and usable administrative workflows central to the implementation.",
    architecture: {
      description: "An Angular client accesses the ASP.NET Core backend with authentication and roles. EF Core persists association data in MSSQL; the backend also supports email and exports.",
      source: `flowchart LR
        ui[Angular client] --> api[ASP.NET Core API]
        api --> auth[Authentication and roles]
        api --> workflows[Association workflows]
        workflows --> ef[EF Core]
        ef --> db[(MSSQL)]
        workflows --> mail[Email]
        workflows --> exports[Billing and exports]`,
    },
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
        kind: "architecture",
        alt: "NOVA application architecture diagram",
        title: "Application architecture",
        surface: "light",
      },
    ],
  },
  {
    id: "clipstack",
    summary: "Booking workflows designed for conflicts, retries, and offline use.",
    roleSummary: "Backend architecture & synchronization design",
    contribution: "Designing the backend and synchronization model for customer booking, a manager web interface, and an offline-capable staff app. The project is still in development.",
    decisions: [
      { title: "Make booking conflicts explicit", reason: "The design uses optimistic concurrency and conflict responses so competing edits can be resolved rather than silently overwriting a booking." },
      { title: "Plan for repeated requests", reason: "Idempotent requests are part of the sync design: retrying after an interrupted connection should not create duplicate operations." },
      { title: "Keep customer data focused", reason: "The booking model aims to collect only the information needed for the appointment and staff workflow." },
    ],
    lesson: "Architecture in development, not a claim of a finished production system. The key design challenge is preserving booking correctness when clients disconnect, retry, or edit the same record.",
    architecture: {
      planned: true,
      description: "Planned architecture: customer and manager Vue clients and a Kotlin Multiplatform staff app access a .NET Azure Functions REST API backed by PostgreSQL. Mobile synchronization is designed around retries and conflict handling.",
      source: `flowchart LR
        web[Customer and manager web] --> api[.NET REST API]
        mobile[Kotlin staff app] <-->|offline sync| api
        api --> rules[Conflict and retry handling]
        rules --> db[(PostgreSQL)]
        hosting[Azure Functions] -. hosts .-> api`,
    },
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
    summary: "A stable MQTT bridge between an Omlet smart door and Loxone.",
    roleSummary: "Python integration, MQTT contract & packaging",
    contribution: "Built a Python integration between an Omlet smart door, MQTT, and Loxone, packaged for Docker and LoxBerry.",
    decisions: [
      { title: "Use MQTT as the integration boundary", reason: "Normalizing vendor data into stable topics keeps Loxone automation independent of the Omlet API's representation." },
      { title: "Treat state and commands differently", reason: "Retained telemetry gives consumers the latest published state, while commands are validated before they reach the device." },
    ],
    lesson: "Released as a LoxBerry plugin. The core work is the device adapter and MQTT contract; the camera integration is a separate experiment.",
    architecture: {
      description: "The Python bridge translates Omlet API telemetry into retained MQTT state for Loxone. Commands travel back through the bridge for validation.",
      source: `flowchart LR
        omlet[Omlet API] -->|telemetry| bridge[Python bridge]
        bridge -->|retained state| mqtt[MQTT broker]
        mqtt --> loxone[Loxone]
        loxone -->|commands| mqtt
        mqtt -->|validate commands| bridge
        bridge -->|device control| omlet`,
    },
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
        src: "/assets/projects/smarthomebridge/chicken_door_loxberry_plugin.png",
        alt: "SmartHomeBridge chicken door LoxBerry plugin controls",
        title: "Door control",
        surface: "light",
      },
      {
        src: "/assets/projects/smarthomebridge/chicken_camerar_loxberry_plugin.png",
        alt: "Experimental SmartHomeBridge chicken camera LoxBerry plugin configuration",
        title: "Experimental camera integration",
        surface: "light",
      },
    ],
  },
  {
    id: "homelab",
    summary: "A self-hosted platform for personal services and projects.",
    roleSummary: "Linux host, containers & service delivery",
    contribution: "Set up an Ubuntu container host on repurposed hardware and operate personal services using Docker Compose and reverse proxying.",
    decisions: [
      { title: "Make deployment repeatable", reason: "Docker Compose describes the services together, while Caddy provides the entry point to hosted applications." },
    ],
    lesson: "Hands-on experience taking responsibility for the host, container configuration, and delivery of personal services.",
    architecture: {
      description: "Incoming requests reach Caddy on the Ubuntu host and are routed to Docker services, including Nginx serving this portfolio. Docker Compose describes the services.",
      source: `flowchart LR
        internet[Internet] --> caddy[Caddy reverse proxy]
        subgraph host[Ubuntu host]
          caddy --> nginx[Nginx portfolio container]
          caddy --> services[Other Docker services]
          compose[Docker Compose] -. configures .-> nginx
          compose -. configures .-> services
        end`,
    },
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
    id: "serverless-portfolio",
    summary: "A serverless Azure portfolio with analytics and Gemini-powered analysis.",
    roleSummary: "Cloud architecture, AI integration & automated deployment",
    contribution: "Built and extended an Azure application with serverless APIs, persistence, identity, telemetry, file workflows, and a Gemini-powered assistant routed through the backend.",
    decisions: [
      { title: "Learn the cloud service boundaries", reason: "Static Web Apps, Functions, Cosmos DB, and Entra ID provided practical experience connecting hosting, compute, data, and identity." },
      { title: "Keep Gemini behind the API boundary", reason: "The Vue client sends chat, portfolio statistics, and uploaded document text to an Azure Function; only the backend reads the Gemini API key and calls Gemini." },
      { title: "Reassess the operational cost", reason: "The Azure architecture was useful for learning, but the requirements of this portfolio fit a simpler self-hosted deployment." },
    ],
    lesson: "A cloud architecture study covering CI/CD, observability, and a secure backend boundary for third-party AI, followed by a deliberate move to simpler hosting for this portfolio.",
    name: "Serverless Portfolio Hub",
    status: "Cloud architecture study",

    purpose:
      "Build a serverless Azure application to explore cloud deployment, identity, observability, and CI/CD in practice. After meeting the original assignment requirements, I extended it with file workflows and a lightweight Gemini-powered assistant that could discuss portfolio statistics and analyze uploaded document text. The Vue client routes AI requests through .NET Azure Functions, keeping the Gemini API key in backend environment configuration.",

    result: "Serverless portfolio with AI-assisted analysis",

    technologies: [
      "Vue",
      "Azure Static Web Apps",
      "Azure Functions",
      "Cosmos DB",
      "Entra ID",
      "Application Insights",
      "Gemini API"
    ],

    leftNodes: [
      "Vue frontend",
      "GitHub Actions",
      "Entra ID"
    ],

    rightNodes: [
      "Azure Functions",
      "Cosmos DB",
      "Gemini via backend"
    ],
    media: [
      {
        src: "/assets/projects/serverless-portfolio/architecture-diagram.png",
        kind: "architecture",
        alt: "Serverless Portfolio Hub deployment architecture from GitHub Actions to Azure services",
        title: "Deployment architecture",
        surface: "dark",
      },
    ],
  },
  {
    id: "portfolio-hub",
    summary: "This portfolio, from a Vue build to a self-hosted deployment.",
    roleSummary: "Vue application & container deployment",
    architecture: {
      description: "Vite builds the Vue application into static files. A Docker image serves them through Nginx behind Caddy on the Ubuntu host.",
      source: `flowchart LR
        vue[Vue and TypeScript] --> vite[Vite build]
        vite --> image[Docker image]
        image --> nginx[Nginx]
        caddy[Caddy reverse proxy] --> nginx
        browser[Browser] --> caddy`,
    },
    contribution: "Built and deployed this Vue and TypeScript portfolio, from the Vite build to the Nginx container behind Caddy.",
    decisions: [
      { title: "Match the infrastructure to the task", reason: "A static portfolio can be served by a small container without adding a database or application backend to operate." },
    ],
    lesson: "A complete build-to-deployment workflow, with infrastructure sized to the needs of a personal portfolio.",
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
];

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
