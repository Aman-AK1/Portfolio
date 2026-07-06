// Shared project data — used by the archive (Projects.tsx), the detail page
// (ProjectDetail.tsx) and prev/next navigation so everything stays in sync.

export interface GalleryItem {
  label: string;
  image: string;
}

export interface Challenge {
  challenge: string;
  solution: string;
  outcome: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  role: string;
  category: string;
  /** Tags used by the archive filter bar. */
  tags: string[];
  image: string;
  /** Compact hero metadata pills. */
  meta: { type: string; stack: string; duration: string; year: string };
  /** Left information card (do not add fields beyond these). */
  context: string;
  timeline: string;
  stack: string[];
  liveUrl: string;
  sourceUrl: string;
  caseStudy: { problem: string; gap: string; approach: string; solution: string };
  architecture: string[];
  challenges: Challenge[];
  gallery: GalleryItem[];
  impact: string[];
  learnings: string;
  future: string[];
}

const IMG = {
  code: "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RlJTIwZWRpdG9yJTIwdHlwZXNjcmlwdCUyMHJlYWN0JTIwZGFyayUyMHRoZW1lJTIwc2NyZWVufGVufDF8fHx8MTc4MTcyNDg5Mnww&ixlib=rb-4.1.0&q=80&w=1200",
  dashboard: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwbW9kZSUyMGRhc2hib2FyZCUyMGludGVyZmFjZSUyMHNvZnR3YXJlfGVufDF8fHx8MTc4MTcyNDg4Nnww&ixlib=rb-4.1.0&q=80&w=1200",
  mobile: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2UlMjBkYXJrJTIwZWxlZ2FudCUyMG1vY2t1cHxlbnwxfHx8fDE3ODE3MjQ4ODl8MA&ixlib=rb-4.1.0&q=80&w=1200",
  design: "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGRlc2lnbiUyMHdvcmtzcGFjZSUyMGNvbG9yJTIwcGFsZXR0ZSUyMGRhcmt8ZW58MXx8fHwxNzgzMDgxNjE3fDA&ixlib=rb-4.1.0&q=80&w=1200",
  reports: "https://images.unsplash.com/photo-1760548425425-e42e77fa38f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxoYWNrYXRob24lMjBjb2RpbmclMjB0ZWFtJTIwdGVjaG5vbG9neSUyMGRhcmslMjBhYnN0cmFjdHxlbnwxfHx8fDE3ODMwNzk3NTh8MA&ixlib=rb-4.1.0&q=80&w=1200",
};

const galleryPool = (): GalleryItem[] => [
  { label: "Desktop", image: IMG.code },
  { label: "Dashboard", image: IMG.dashboard },
  { label: "Mobile", image: IMG.mobile },
  { label: "Features", image: IMG.design },
  { label: "Reports", image: IMG.reports },
];

export const projects: Project[] = [
  {
    id: "aether",
    title: "Aether AI Workspace",
    subtitle: "An AI-powered collaborative workspace that helps students research, write and cite faster.",
    year: "2024",
    role: "Full Stack Lead",
    category: "Web Application",
    tags: ["Featured", "AI", "Full Stack"],
    image: IMG.dashboard,
    meta: { type: "Solo Project", stack: "MERN + AI", duration: "3 Months", year: "2024" },
    context: "Personal Project",
    timeline: "3 Months",
    stack: ["React", "Node.js", "Express", "MongoDB", "OpenAI"],
    liveUrl: "#",
    sourceUrl: "#",
    caseStudy: {
      problem:
        "Students juggle dozens of tabs, PDFs and notes while writing research papers, losing hours to context switching and manual citation formatting.",
      gap:
        "Existing tools either focus purely on note-taking or purely on citations, and none understood the content well enough to summarise sources or draft alongside the writer.",
      approach:
        "I designed a single workspace where documents, sources and an AI assistant live side by side, so context never leaves the screen. The assistant is grounded in the user's own uploaded material.",
      solution:
        "A MERN application with real-time collaborative editing, AI-generated summaries, automatic citation generation and a source library — all in a distraction-free, keyboard-first interface.",
    },
    architecture: ["User", "React Frontend", "Express API", "OpenAI + MongoDB", "Object Storage", "Vercel Deploy"],
    challenges: [
      {
        challenge: "AI responses were slow and blocked the writing flow.",
        solution: "Streamed tokens over Server-Sent Events and optimistically rendered partial output.",
        outcome: "Perceived response time dropped to near-instant, keeping writers in flow.",
      },
      {
        challenge: "Citations from different sources were inconsistent.",
        solution: "Normalised metadata into a single schema and generated citations from that source of truth.",
        outcome: "One-click, consistent citations across APA, MLA and IEEE.",
      },
      {
        challenge: "Real-time editing caused conflicting updates.",
        solution: "Introduced debounced, version-checked syncing with a last-write-wins fallback.",
        outcome: "Smooth multi-cursor collaboration without lost edits.",
      },
    ],
    gallery: galleryPool(),
    impact: [
      "AI Generated Reports",
      "Real-time Collaboration",
      "Automatic Citations",
      "Authentication",
      "Mobile Responsive",
      "Live Deployment",
    ],
    learnings:
      "This project pushed me deep into streaming APIs and state synchronisation. I learned that AI features live or die on latency, and that grounding a model in the user's own data produces far more trustworthy output. I initially over-engineered the editor and later simplified it dramatically — a reminder that clarity beats cleverness.",
    future: [
      "Move to CRDT-based syncing for true offline-first collaboration",
      "Add response caching to cut AI cost and latency",
      "Introduce end-to-end testing across the editor and API",
      "Improve keyboard accessibility and screen-reader support",
    ],
  },
  {
    id: "nexus",
    title: "Nexus API Gateway",
    subtitle: "A high-performance, lightweight API gateway focused on developer experience.",
    year: "2024",
    role: "Solo Developer",
    category: "Distributed Systems",
    tags: ["Featured", "Full Stack", "Research"],
    image: IMG.code,
    meta: { type: "Solo Project", stack: "Go + Redis", duration: "2 Months", year: "2024" },
    context: "Personal Project",
    timeline: "2 Months",
    stack: ["Go", "Redis", "Docker", "JWT", "GitHub Actions"],
    liveUrl: "#",
    sourceUrl: "#",
    caseStudy: {
      problem:
        "Small and medium projects need rate limiting, auth and load balancing, but standing up a full gateway felt disproportionately heavy.",
      gap:
        "Kong and Envoy are powerful but complex to configure, with a steep learning curve and a large operational footprint for modest use cases.",
      approach:
        "I focused on developer experience: a single YAML file, sensible defaults and a tiny footprint, while keeping the core primitives production-grade.",
      solution:
        "A reverse proxy in Go with token-bucket rate limiting backed by Redis, JWT auth, and hot-reloading configuration — all shipped in a minimal Docker image.",
    },
    architecture: ["Client", "Gateway (Go)", "Auth + Rate Limit", "Upstream Services", "Redis Store", "Docker Deploy"],
    challenges: [
      {
        challenge: "Config changes required restarting the server.",
        solution: "Built a file watcher that atomically swaps routing rules at runtime.",
        outcome: "Zero-downtime config updates.",
      },
      {
        challenge: "Rate limiting needed to be accurate under load.",
        solution: "Implemented a distributed token bucket in Redis with atomic Lua scripts.",
        outcome: "Consistent limits across many concurrent instances.",
      },
      {
        challenge: "Latency overhead had to stay minimal.",
        solution: "Reused connections and avoided allocations on the hot path.",
        outcome: "Sub-2ms overhead at 10k concurrent connections.",
      },
    ],
    gallery: galleryPool(),
    impact: [
      "<2ms Latency Overhead",
      "Hot Config Reload",
      "JWT Authentication",
      "Distributed Rate Limiting",
      "Dockerised Deployment",
      "Secure Backend",
    ],
    learnings:
      "Building this deepened my understanding of HTTP/2, reverse proxies and Go's concurrency model. I learned to profile before optimising and that great defaults are a feature. Open-sourcing it taught me how much documentation matters to adoption.",
    future: [
      "Add a plugin system for custom middleware",
      "Support gRPC and WebSocket upstreams",
      "Add distributed tracing out of the box",
      "Expand the test suite with fuzzing",
    ],
  },
  {
    id: "chronos",
    title: "Chronos Task Manager",
    subtitle: "An offline-first, keyboard-driven task manager designed for minimal friction.",
    year: "2023",
    role: "Mobile Engineer",
    category: "iOS / Android",
    tags: ["Full Stack", "UI/UX"],
    image: IMG.mobile,
    meta: { type: "Solo Project", stack: "React Native", duration: "6 Weeks", year: "2023" },
    context: "Personal Project",
    timeline: "6 Weeks",
    stack: ["React Native", "Zustand", "SQLite", "Tailwind"],
    liveUrl: "#",
    sourceUrl: "#",
    caseStudy: {
      problem:
        "Most task apps are heavy, cloud-dependent and slow to capture a quick thought before it's forgotten.",
      gap:
        "Popular managers require accounts, sync and several taps to add a task, and many break the moment you lose connection.",
      approach:
        "I prioritised speed and offline reliability, with a keyboard-first capture flow and a calm, focused interface.",
      solution:
        "An offline-first React Native app backed by SQLite, with instant capture, gesture-based actions and a clean design system.",
    },
    architecture: ["User", "React Native UI", "Zustand Store", "SQLite (local)", "Optional Sync", "App Stores"],
    challenges: [
      {
        challenge: "Offline data had to feel instant yet stay consistent.",
        solution: "Wrote through to SQLite immediately and reconciled optional sync in the background.",
        outcome: "Zero-latency interactions with reliable persistence.",
      },
      {
        challenge: "Gestures conflicted with scrolling.",
        solution: "Tuned gesture thresholds and added haptic confirmation.",
        outcome: "Fluid swipe actions that never fight the list.",
      },
      {
        challenge: "The UI risked feeling cluttered.",
        solution: "Built a strict spacing and type scale and removed anything non-essential.",
        outcome: "A calm interface that keeps focus on the task.",
      },
    ],
    gallery: galleryPool(),
    impact: [
      "Offline-First",
      "Instant Capture",
      "Gesture Actions",
      "Mobile Responsive",
      "Design System",
      "App Store Ready",
    ],
    learnings:
      "I learned how much perceived performance comes from doing local work first and syncing later. Designing for mobile forced ruthless prioritisation of features, and I grew a lot in building a consistent, reusable component system.",
    future: [
      "Add end-to-end encrypted sync",
      "Introduce widgets and quick actions",
      "Improve accessibility with dynamic type",
      "Add automated UI tests",
    ],
  },
  {
    id: "synapse",
    title: "Synapse Algorithmic Trader",
    subtitle: "A research platform for backtesting and visualising trading strategies.",
    year: "2023",
    role: "Backend Engineer",
    category: "Finance / Data",
    tags: ["AI", "Research"],
    image: IMG.reports,
    meta: { type: "Solo Project", stack: "Python + Data", duration: "10 Weeks", year: "2023" },
    context: "Research Project",
    timeline: "10 Weeks",
    stack: ["Python", "Pandas", "FastAPI", "PostgreSQL"],
    liveUrl: "#",
    sourceUrl: "#",
    caseStudy: {
      problem:
        "Testing a trading idea meant stitching together messy scripts, with no reliable way to compare strategies.",
      gap:
        "Existing backtesters were either closed platforms or fragile notebooks that were hard to reproduce.",
      approach:
        "I built a reproducible pipeline that ingests market data, runs strategies against it and visualises results consistently.",
      solution:
        "A Python engine with a FastAPI layer and a dashboard for comparing strategy performance, drawdown and risk metrics.",
    },
    architecture: ["Data Source", "Ingestion Pipeline", "Strategy Engine", "PostgreSQL", "FastAPI", "Dashboard"],
    challenges: [
      {
        challenge: "Backtests were slow over large datasets.",
        solution: "Vectorised computations with Pandas and cached intermediate results.",
        outcome: "Backtests ran an order of magnitude faster.",
      },
      {
        challenge: "Results were hard to trust.",
        solution: "Added deterministic seeds and a fixed data-versioning scheme.",
        outcome: "Fully reproducible experiments.",
      },
      {
        challenge: "Comparing strategies was tedious.",
        solution: "Standardised metrics and built a side-by-side comparison view.",
        outcome: "Faster, clearer decision-making.",
      },
    ],
    gallery: galleryPool(),
    impact: [
      "Reproducible Backtests",
      "Risk Analytics",
      "Data Versioning",
      "REST API",
      "Interactive Charts",
      "Secure Backend",
    ],
    learnings:
      "This project taught me the importance of reproducibility and clean data pipelines. I learned to treat data as a first-class input with versioning, and that good visualisation is what turns numbers into decisions.",
    future: [
      "Add live paper-trading mode",
      "Introduce a caching layer for repeated runs",
      "Expand statistical test coverage",
      "Improve performance with async ingestion",
    ],
  },
  {
    id: "quantum",
    title: "Quantum React CLI",
    subtitle: "An open-source CLI that scaffolds production-ready React apps in seconds.",
    year: "2023",
    role: "Open Source",
    category: "Developer Tooling",
    tags: ["Full Stack", "Research"],
    image: IMG.code,
    meta: { type: "Open Source", stack: "Node.js CLI", duration: "4 Weeks", year: "2023" },
    context: "Open Source",
    timeline: "4 Weeks",
    stack: ["Node.js", "TypeScript", "Vite", "Inquirer"],
    liveUrl: "#",
    sourceUrl: "#",
    caseStudy: {
      problem:
        "Starting a new React project means repeating the same setup — routing, linting, styling — every single time.",
      gap:
        "Generic scaffolders produce bloated defaults that rarely match how a team actually wants to work.",
      approach:
        "I built an interactive CLI that asks a few questions and generates a lean, opinionated but customisable starting point.",
      solution:
        "A TypeScript CLI with composable templates, sensible defaults and zero leftover boilerplate.",
    },
    architecture: ["Developer", "CLI Prompt", "Template Engine", "File Generator", "Local Project", "npm Registry"],
    challenges: [
      {
        challenge: "Templates drifted out of date quickly.",
        solution: "Generated files from composable fragments instead of static copies.",
        outcome: "Easy to keep templates current.",
      },
      {
        challenge: "Different users wanted different stacks.",
        solution: "Made every choice a prompt with clean conditional generation.",
        outcome: "One tool, many valid setups.",
      },
      {
        challenge: "Onboarding new contributors was hard.",
        solution: "Documented the architecture and added contribution guides.",
        outcome: "Faster community contributions.",
      },
    ],
    gallery: galleryPool(),
    impact: [
      "Composable Templates",
      "Interactive Prompts",
      "TypeScript First",
      "Published to npm",
      "Well Documented",
      "Community Driven",
    ],
    learnings:
      "Maintaining an open-source tool taught me that developer experience and documentation are the product. I learned to design for extensibility from day one and to value small, well-scoped releases.",
    future: [
      "Add a plugin ecosystem",
      "Support monorepo scaffolding",
      "Add snapshot tests for generated output",
      "Improve performance of file generation",
    ],
  },
  {
    id: "orbit",
    title: "Echo University Dashboard",
    subtitle: "A student dashboard unifying schedules, grades and campus resources.",
    year: "2022",
    role: "Frontend Engineer",
    category: "Academic Tool",
    tags: ["UI/UX", "Full Stack", "Hackathons"],
    image: IMG.design,
    meta: { type: "Hackathon", stack: "React + UIUX", duration: "48 Hours", year: "2022" },
    context: "Hackathon Project",
    timeline: "48 Hours",
    stack: ["React", "TypeScript", "Figma", "Tailwind"],
    liveUrl: "#",
    sourceUrl: "#",
    caseStudy: {
      problem:
        "Students checked five different portals for schedules, grades and announcements, each with its own login and layout.",
      gap:
        "The official systems were functional but fragmented, dated and painful to use on a phone.",
      approach:
        "In a 48-hour hackathon I focused on one calm, unified dashboard that surfaced only what a student needs today.",
      solution:
        "A responsive React dashboard designed in Figma first, aggregating schedules, grades and resources into a single glanceable view.",
    },
    architecture: ["Student", "React Dashboard", "Aggregation Layer", "University APIs", "Cache", "Static Hosting"],
    challenges: [
      {
        challenge: "Data came from inconsistent sources.",
        solution: "Built an aggregation layer that normalised everything into one shape.",
        outcome: "A single, coherent data model for the UI.",
      },
      {
        challenge: "We had only 48 hours.",
        solution: "Designed in Figma first, then built against a fixed component set.",
        outcome: "Shipped a polished demo on time.",
      },
      {
        challenge: "It had to work on any device.",
        solution: "Adopted a mobile-first responsive layout from the start.",
        outcome: "Great experience on phones and laptops alike.",
      },
    ],
    gallery: galleryPool(),
    impact: [
      "Unified Dashboard",
      "Mobile Responsive",
      "Design-Led Build",
      "Accessible Layout",
      "Fast Prototype",
      "Hackathon Finalist",
    ],
    learnings:
      "Working under a hard deadline taught me to design before I code and to scope aggressively. I learned how a strong component system lets a small team move fast without sacrificing polish.",
    future: [
      "Add real authentication and live data",
      "Introduce notifications and reminders",
      "Improve accessibility to WCAG AA",
      "Add offline caching for schedules",
    ],
  },
];

export const filters = ["All", "Featured", "AI", "Full Stack", "UI/UX", "Hackathons", "Research"] as const;

export function getProject(id: string | undefined) {
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) return { project: projects[0], prev: projects[projects.length - 1], next: projects[1] };
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return { project: projects[index], prev, next };
}
