// Shared project data — used by the archive (Projects.tsx), the detail page
// (ProjectDetail.tsx) and prev/next navigation so everything stays in sync.


//resumeIQ
import resumeIQHero from "../../assests/projects/resumeIQ/resumeIQHero.png";
import resumeIQDashboard from "../../assests/projects/resumeIQ/resumeIQDashboard.png"
import resumeIQLogin from "../../assests/projects/resumeIQ/resumeIQLogin.png"
import resumeIQReports from "../../assests/projects/resumeIQ/resumeIQReports.png"


//EVJoints
import EVJointsHero from "../../assests/projects/EVJoints/EVJointsHero.png";
import EVJointsBlog from "../../assests/projects/EVJoints/EVJointsBlog.jpeg"
import EVJointsFAQ from "../../assests/projects/EVJoints/EVJointsFAQ.png"
import EVJointsMobile from "../../assests/projects/EVJoints/EVJointsMobile.png"
import EVJointsTools from "../../assests/projects/EVJoints/EVJointsTools.png"

//GLOF Trcaker
import GLOFHero from "../../assests/projects/GLOF Tracker/GLOFHero.png";
import GLOFMap from "../../assests/projects/GLOF Tracker/GLOFMap.png"
import GLOFChat from "../../assests/projects/GLOF Tracker/GLOFChat.png"
import GLOFEmer from "../../assests/projects/GLOF Tracker/GLOFEmer.png"
import GLOFMobile from "../../assests/projects/GLOF Tracker/GLOFMobile.png"
import GLOFDon from "../../assests/projects/GLOF Tracker/GLOFDon.png"

//Travnir
import TravnirHero from "../../assests/projects/Travnir/travnirHero.png"
import TravnirList from "../../assests/projects/Travnir/TravnirListing.png"
import TravnirCreate from "../../assests/projects/Travnir/TravnirCreate.png"
import TravnirReview from "../../assests/projects/Travnir/TravnirReview.png"

//CuraAI
// import CuraAIHero from "../../"
import CuraAIHero from "../../assests/projects/CuraAI/CuraAIHero.jpeg"
import CuraAIServices from "../../assests/projects/CuraAI/CuraAIServices.jpeg"
import CuraAISchemes from "../../assests/projects/CuraAI/CuraAISchemes.jpeg"
import CuraAIAppointments from "../../assests/projects/CuraAI/CuraAIAppointments.jpeg"

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
  sectionTitle: string;
  architecture: string[];
  challenges: Challenge[];
  gallery: GalleryItem[];
  impact: string[];
  learnings: string;
  future: string[];
}

const resumeIQGallery: GalleryItem[] = [
  { label: "Desktop", image: resumeIQHero },
  { label: "Dashboard", image: resumeIQDashboard },
  {label: "Welcome", image : resumeIQLogin},
  // { label: "Mobile", image: resumeIQMobile },
  // { label: "Features", image: resumeIQFeatures },
  { label: "Reports", image: resumeIQReports },
];

const EVJointsGallery: GalleryItem[] = [
  { label: "Desktop", image: EVJointsHero },
  { label: "Guide", image: EVJointsBlog },
  {label: "FAQ", image : EVJointsFAQ},
  { label: "Mobile", image: EVJointsMobile },
  // { label: "Features", image: resumeIQFeatures },
  { label: "Tools", image: EVJointsTools },
];

const GLOFTrackerGallery: GalleryItem[] = [
  { label: "Desktop", image: GLOFHero },
  { label: "Chat", image: GLOFChat },
  {label: "Map", image : GLOFMap},
  { label: "Emergency", image: GLOFEmer },
  { label: "Mobile", image: GLOFMobile },
  { label: "Donations", image: GLOFDon },
];

const TravnirGallery: GalleryItem[] = [
  { label: "dashboard", image: TravnirHero },
  { label: "details", image: TravnirList },
  {label: "Create own", image : TravnirCreate},
  // { label: "Mobile", image: resumeIQMobile },
  // { label: "Features", image: resumeIQFeatures },
  { label: "Reviews", image: TravnirReview },
];

const CuraAIGallery: GalleryItem[] = [
  { label: "dashboard", image: CuraAIHero },
  { label: "Services", image: CuraAIServices },
  {label: "Schemes", image : CuraAISchemes},
  // { label: "Mobile", image: resumeIQMobile },
  // { label: "Features", image: resumeIQFeatures },
  { label: "Appointments", image: CuraAIAppointments },
];
// const IMG = {
//   code: hero,
//   dashboard: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwbW9kZSUyMGRhc2hib2FyZCUyMGludGVyZmFjZSUyMHNvZnR3YXJlfGVufDF8fHx8MTc4MTcyNDg4Nnww&ixlib=rb-4.1.0&q=80&w=1200",
//   mobile: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2UlMjBkYXJrJTIwZWxlZ2FudCUyMG1vY2t1cHxlbnwxfHx8fDE3ODE3MjQ4ODl8MA&ixlib=rb-4.1.0&q=80&w=1200",
//   design: "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGRlc2lnbiUyMHdvcmtzcGFjZSUyMGNvbG9yJTIwcGFsZXR0ZSUyMGRhcmt8ZW58MXx8fHwxNzgzMDgxNjE3fDA&ixlib=rb-4.1.0&q=80&w=1200",
//   reports: "https://images.unsplash.com/photo-1760548425425-e42e77fa38f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxoYWNrYXRob24lMjBjb2RpbmclMjB0ZWFtJTIwdGVjaG5vbG9neSUyMGRhcmslMjBhYnN0cmFjdHxlbnwxfHx8fDE3ODMwNzk3NTh8MA&ixlib=rb-4.1.0&q=80&w=1200",
// };

// const galleryPool = (): GalleryItem[] => [
//   { label: "Desktop", image: IMG.code },
//   { label: "Dashboard", image: IMG.dashboard },
//   { label: "Mobile", image: IMG.mobile },
//   { label: "Features", image: IMG.design },
//   { label: "Reports", image: IMG.reports },
// ];

export const projects: Project[] = [
  {
    id: "aether",
    title: "GLOF Tracker",
    subtitle: "A disaster monitoring platform that transforms complex geospatial data into an accessible experience for researchers, authorities, and the public.",
    year: "2026",
    role: "Frontend Developer & UI/UX Designer",
    category: "Web Application",
    tags: ["Final Year Project", "Frontend Development", ""],
    image: GLOFHero,
    meta: { type: "Solo Project", stack: "MERN + AI", duration: "6 Months", year: "2026" },
    context: "Final Year Engineering Project",
    timeline: "12 Months",
    stack: ["React", "Node.js", "Express", "MongoDB", "Figma"],
    liveUrl: "https://gloftracker-nextjs.vercel.app/dashboard",
    sourceUrl: "https://github.com/Aman-AK1/GlofTracker",
    caseStudy: {
      problem:
        "Understanding glacier-related flood risks often requires interpreting complex satellite imagery and scientific datasets. The goal of GLOF Tracker was to present this information through an intuitive interface that makes disaster monitoring easier to understand.",
      gap:
        "Most available platforms are research-focused and difficult for non-technical users to interpret. They often prioritize raw data over usability, making disaster information less accessible to decision-makers and the public.",
      approach:
        "My primary responsibility was designing and developing the user interface, creating interactive dashboards, integrating maps, and ensuring satellite data and flood information could be explored through a clean and responsive experience.",
      solution:
        "A responsive web application that visualizes glacial lake locations, flood risk information, and geospatial data using interactive maps, enabling users to explore disaster insights through an intuitive interface.",
    },
    sectionTitle: "Data Processing Flow",
    architecture: ["Satellite Images", "Backend APIs", "React Dashboard", "Interactive Maps", "Risk Visualization"],
    challenges: [
      {
        challenge: "Presenting complex geospatial information without overwhelming users.",
        solution: "Designed a clean dashboard with interactive maps, layered information, and intuitive navigation.",
        outcome: "Users could easily explore flood-prone regions without technical expertise.",
      },
      {
        challenge: "Rendering map data while maintaining smooth performance.",
        solution: "Optimized map rendering and loaded location data efficiently to reduce unnecessary re-renders.",
        outcome: "Responsive navigation and improved user experience across devices.",
      },
      {
        challenge: "Creating a responsive interface for desktop and mobile users.",
        solution: "Built reusable React components with responsive layouts and consistent design patterns.",
        outcome: "Delivered a seamless experience across different screen sizes.",
      },
    ],
    gallery: GLOFTrackerGallery,
    impact: [
      "Interactive Map Visualisation",
      "Responsive Dashboard",
      "Risk Zone Exploration",
      "Reusable Components",
      "Clean UI/UX",
      "Research Presentation Ready",
    ],
    learnings:
      "Working on GLOF Tracker improved my skills in designing data-intensive interfaces, building responsive React applications, integrating map-based visualizations, and collaborating within a multidisciplinary engineering team. It also strengthened my understanding of presenting complex information through user-centered design.",
    future: [
      "Add real-time satellite data updates",
      "Integrate weather and rainfall forecasting",
      "Support historical flood timeline analysis",
      "Introduce AI-powered flood risk predictions",
    ],
  },
  {
    id: "nexus",
    title: "ResumeIQ",
    subtitle: "An AI-powered platform that helps candidates prepare smarter by combining resume analysis, interview simulations, ATS optimization, and personalized learning.",
    year: "2026",
    role: "Full Stack Developer",
    category: "Web Applications",
    tags: ["Featured", "Full Stack", "Research"],
    image: resumeIQHero,
    meta: { type: "Solo Project", stack: "MERN + Gemini AI", duration: "2 Months", year: "2026" },
    context: "Personal Project",
    timeline: "2 Months",
    stack: ["React", "Node.js", "Express", "MongoDB", " Gemini AI", "Puppeteer"],
    liveUrl: "https://resume-iq-blond.vercel.app/",
    sourceUrl: "https://github.com/Aman-AK1/ResumeIQ",
    caseStudy: {
      problem:
        "Job seekers often struggle to understand whether their resume matches a specific role, what interview questions they should prepare for, and how to improve their chances of getting shortlisted. Most existing tools solve only one part of this journey, requiring users to switch between multiple platforms.",
      gap:
        "Most resume tools only provide ATS scores or keyword suggestions. They rarely explain skill gaps, generate role-specific interview preparation plans, or create customized resumes based on individual job descriptions.",
      approach:
        "I built ResumeIQ as an end-to-end career preparation platform where AI evaluates resumes, compares them against job descriptions, generates interview questions, highlights missing skills, and creates ATS-friendly resumes—all within a single workflow.",
      solution:
        "A full-stack MERN application powered by Google's Gemini AI that delivers resume analysis, AI-generated interview reports, personalized preparation plans, resume generation, secure authentication, and downloadable professional PDF resumes.",
    },
    sectionTitle: "Architecture",
    architecture: ["User", "React Frontend", "Node.js API", "Gemini AI", "Analysis Engine", "MongoDB Database", "PDF Generator"],
    challenges: [
      {
        challenge: "AI responses were inconsistent and sometimes returned malformed JSON.",
        solution: "Implemented structured prompts, validation layers, and fallback parsing to ensure reliable responses before presenting results.",
        outcome: "Consistent AI-generated reports with significantly fewer parsing failures.",
      },
      {
        challenge: "Generating professional ATS-friendly PDF resumes dynamically.",
        solution: "Built HTML resume templates and used Puppeteer to generate polished PDF documents with consistent layouts.",
        outcome: "Users can instantly download clean, printable resumes optimized for ATS systems.",
      },
      {
        challenge: "Managing authentication securely across frontend and backend deployments.",
        solution: "Implemented JWT authentication, protected routes, secure cookies, token blacklisting, and persistent login sessions.",
        outcome: "Secure user authentication with reliable session management.",
      },
    ],
    gallery: resumeIQGallery,
    impact: [
      "AI Resume Analysis",
      "ATS Resume Generator",
      "Personalized Interview Questions",
      "Skill Gap Detection",
      "Preparation Roadmaps",
      "Professional PDF Export",
    ],
    learnings:
      "This project strengthened my understanding of prompt engineering, backend architecture, authentication, PDF generation, and integrating large language models into production-ready web applications. I also learned how important error handling and structured AI outputs are for creating reliable user experiences.",
    future: [
      "Add support for multiple AI providers for automatic fallback",
      "Introduce real-time voice mock interviews",
      "Build recruiter dashboards with candidate analytics",
      "Add collaborative resume reviews and feedback sharing",
    ],
  },
  {
    id: "chronos",
    title: "EVJoints",
    subtitle: "Designing intuitive digital experiences that simplify electric vehicle adoption through thoughtful product design and user-focused interfaces.",
    year: "2026",
    role: "UI/UX Designer & Frontend Developer",
    category: "UI/UX",
    tags: ["Internship Project", "UI/UX Design","2 Months","2026"],
    image: EVJointsHero,
    meta: { type: "Internship Project", stack: "Figma", duration: "3 Months", year: "2026" },
    context: "Professional Internship",
    timeline: "3 Months",
    stack: ["Figma", "React", "Design System", "Tailwind CSS"],
    liveUrl: "https://fresco-silver-56729650.figma.site/",
    sourceUrl: "#",
    caseStudy: {
      problem:
        "Electric vehicle users often rely on multiple applications for trip planning, charging stations, vehicle information, and cost estimation. EVJoints aimed to bring these essential services together into one modern and user-friendly platform.",
      gap:
        "Many EV platforms prioritize functionality over usability, resulting in fragmented experiences and interfaces that make important information difficult to access. Users frequently switch between multiple apps to complete a single journey.",
      approach:
        "During my internship, I was responsible for designing intuitive user interfaces, building a scalable design system, and creating responsive frontend experiences across multiple product modules. My focus was on improving usability, maintaining visual consistency, and simplifying complex user flows.",
      solution:
        "A clean, modern EV platform featuring trip planning, charging station discovery, EV guides, pricing pages, cost calculators, and responsive dashboards designed to deliver a seamless user experience across devices.",
    },
    sectionTitle: "Design Process",
    architecture: ["Research","User Flows","Wireframes","High Fidelity UI","Design System","Developer Handoff",],
    challenges: [
      {
        challenge: "Creating a consistent experience across multiple product modules.",
        solution: "Designed a reusable design system with standardized typography, colors, spacing, buttons, cards, and reusable UI components.",
        outcome: "Improved design consistency and accelerated future feature development.",
      },
      {
        challenge: "Making complex EV information easy to understand.",
        solution: "Designed clear navigation, intuitive layouts, and visual hierarchy to simplify charging, trip planning, and educational content.",
        outcome: "Enhanced usability and reduced friction throughout the platform.",
      },
      {
        challenge: "Designing responsive interfaces for desktop and mobile devices.",
        solution: "Created adaptive layouts and reusable components optimized for different screen sizes while maintaining a premium user experience.",
        outcome: "Delivered a seamless and consistent experience across multiple devices.",
      },
    ],
    gallery: EVJointsGallery,
    impact: [
      "Design System",
      "15+ Product Screens",
      "Responsive UI",
      "Improved User Experience",
      "Production-Ready Design",
      
    ],
    learnings:
      "This internship strengthened my understanding of real-world product design, stakeholder collaboration, design systems, responsive UI development, and translating business requirements into user-centered digital experiences. It also taught me how to balance aesthetics with usability while working in a professional development environment.",
    future: [
      "Introduce personalized EV recommendations using AI",
      "Add real-time charging station availability",
      "Improve accessibility following WCAG guidelines",
      "Build a reusable component library with Storybook",
    ],
  },
  {
    id: "synapse",
    title: "Travnir",
    subtitle: "A full-stack vacation rental platform built with Node.js, Express, MongoDB, and vanilla JavaScript, offering a seamless experience for property listing and exploration.",
    year: "2025",
    role: "Full Stack Developer",
    category: "Web Applications",
    tags: ["AI", "Research"],
    image: TravnirHero,
    meta: { type: "Personal Project", stack: "MERN Stack", duration: "2 Months", year: "2025" },
    context: "Personal Project",
    timeline: "2 Months",
    stack: ["JavaScript","Node.js","Express.js", "MongoDB", "Mapbox", "Cloudinary"],
    liveUrl: "https://travnir.onrender.com/listings",
    sourceUrl: "https://github.com/Aman-AK1/Travnir",
    caseStudy: {
      problem:
        "Finding and listing vacation rentals should be simple, secure, and visually engaging. Travnir was developed to recreate the core experience of modern rental platforms while strengthening my understanding of backend development, authentication, database management, and RESTful architecture.",
      gap:
        "A vacation rental platform involves much more than displaying property listings. Secure authentication, media uploads, location services, user reviews, and efficient data management must work together to deliver a reliable user experience.",
      approach:
        "I developed the complete application from scratch, designing both the frontend and backend. I implemented authentication, CRUD operations, image uploads, interactive maps, and responsive layouts while maintaining a clean and modular project structure.",
      solution:
        "A responsive full-stack web application where users can browse destinations, publish rental listings, upload property images, leave reviews, and securely manage their properties through an intuitive interface.",
    },
    sectionTitle: "Architecture",
    architecture: ["User", "HTML • CSS • JavaScript","Express.js Server", "Authentication", "MongoDB Database", "Cloudinary + Mapbox APIs"],
    challenges: [
      {
        challenge: "Building a secure authentication and authorization system for multiple user actions.",
        solution: "Implemented session-based authentication with Passport.js, authorization middleware, and protected routes to ensure users could only manage their own listings and reviews.",
        outcome: "Created a secure and reliable user experience with proper access control throughout the platform.",
      },
      {
        challenge: "Managing property image uploads without storing files on the server.",
        solution: "Integrated Cloudinary to handle image uploads, storage, and optimization while simplifying media management.",
        outcome: "Delivered faster image loading and scalable cloud-based media storage.",
      },
      {
        challenge: "Helping users visualize property locations before booking.",
        solution: "Integrated Mapbox APIs to display interactive maps and location markers for every listing.",
        outcome: "Improved property discovery and provided users with better geographical context.",
      },
    ],
    gallery: TravnirGallery,
    impact: [
      "Authentication Systems",
      "CRUD Property Listings",
      "Cloud Image Storage",
      "Interactive Maps",
      "Review & Rating System",
      "Responsive Web Design",
    ],
    learnings:
      "Travnir strengthened my understanding of backend development, RESTful APIs, authentication, database relationships, cloud storage integration, and building scalable full-stack web applications. It also improved my ability to structure larger projects using the MVC architecture and write maintainable server-side code.",
    future: [
      "Migrate the frontend to React for better scalability",
      "Add real-time booking availability and reservation management",
      "Integrate Stripe for secure online payments",
      "Introduce wishlists and personalized property recommendations",
    ],
  },
  {
    id: "quantum",
    title: "CuraAI",
    subtitle: "An AI healthcare assistant conceptualized during hackathons to make medical guidance more accessible through thoughtful design, research, and conversational AI.",
    year: "2025",
    role: "UI/UX Designer • Researcher • Frontend Developer",
    category: "IIGC Winner",
    tags: ["MumbaiHacks Finalists", "IIGC Winner"],
    image: CuraAIHero,
    meta: { type: "Hackathon Project", stack: "UI/UX + Research", duration: "MumbaiHacks Finalist", year: "IIGC Winner" },
    context: "Hackathon Project",
    timeline: "48 Hours",
    stack: ["Figma", "React", "Node.js", "Gemini AI"],
    liveUrl: "https://www.figma.com/proto/Fg81byOiyYVxop1J3jxpPW/Untitled?node-id=1-2&t=7DvdwSXjo5ynZd0b-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A2",
    sourceUrl: "#",
    caseStudy: {
      problem:
        "Access to reliable medical guidance can be overwhelming, especially when users need quick answers or are unsure about the seriousness of their symptoms. CuraAI was created during a hackathon to explore how conversational AI could improve access to trustworthy health information through an intuitive digital experience.",
      gap:
        "Many healthcare platforms either overwhelm users with technical terminology or provide generic information without personalization. We wanted to create an experience that felt approachable, informative, and easy to navigate while encouraging users to seek professional care when necessary.",
      approach:
        "I led the product research, designed the complete user experience in Figma, and contributed to frontend development. My focus was on simplifying healthcare interactions through intuitive user flows, clean interfaces, and clear presentation of AI-generated responses.",
      solution:
        "A healthcare AI assistant capable of providing conversational medical guidance, symptom awareness, health education, and user-friendly interactions through a modern, responsive interface.",
    },
    sectionTitle: "User Journey",
    architecture: ["User Query", "AI Processing", "Medical Context", "Response Generation", "Healthcare Guidance"],
    challenges: [
      {
        challenge: "Designing a healthcare interface that felt trustworthy and easy to use.",
        solution: "Focused on clean visual hierarchy, calming colors, accessible layouts, and simplified navigation to reduce cognitive load for users.",
        outcome: "Created an intuitive experience suitable for presenting complex medical information.",
      },
      {
        challenge: "Understanding user needs within a limited hackathon timeframe.",
        solution: "Conducted rapid research, identified common healthcare pain points, and prioritized high-impact features before beginning the design process.",
        outcome: "Delivered a focused MVP that addressed real user problems while remaining achievable within the hackathon timeline.",
      },
      {
        challenge: "Coordinating design and development under strict deadlines.",
        solution: "Created reusable UI components, maintained consistent design patterns, and collaborated closely with teammates to streamline implementation.",
        outcome: "Successfully demonstrated a functional prototype during the hackathon.",
      },
    ],
    gallery: CuraAIGallery,
    impact: [
      "MumbaiHacks Finalist",
      "IIGC Winner",
      "Healthcare Research",
      "Rapid Prototyping",
      // "Well Documented",
      // "Community Driven",
    ],
    learnings:
      "Working on CuraAI taught me how to transform research into a functional product under tight deadlines. I strengthened my skills in product thinking, rapid UI/UX design, cross-functional collaboration, and balancing user needs with technical feasibility in a hackathon environment.",
    future: [
      "Integrate hospital and clinic APIs",
      "Support multilingual conversations",
      "Enable voice-based AI consultations",
      "Add personalized health history and reports",
    ],
  },
  // {
  //   id: "orbit",
  //   title: "Echo University Dashboard",
  //   subtitle: "A student dashboard unifying schedules, grades and campus resources.",
  //   year: "2022",
  //   role: "Frontend Engineer",
  //   category: "Academic Tool",
  //   tags: ["UI/UX", "Full Stack", "Hackathons"],
  //   image: resumeIQHero,
  //   meta: { type: "Hackathon", stack: "React + UIUX", duration: "48 Hours", year: "2022" },
  //   context: "Hackathon Project",
  //   timeline: "48 Hours",
  //   stack: ["React", "TypeScript", "Figma", "Tailwind"],
  //   liveUrl: "#",
  //   sourceUrl: "#",
  //   caseStudy: {
  //     problem:
  //       "Students checked five different portals for schedules, grades and announcements, each with its own login and layout.",
  //     gap:
  //       "The official systems were functional but fragmented, dated and painful to use on a phone.",
  //     approach:
  //       "In a 48-hour hackathon I focused on one calm, unified dashboard that surfaced only what a student needs today.",
  //     solution:
  //       "A responsive React dashboard designed in Figma first, aggregating schedules, grades and resources into a single glanceable view.",
  //   },
  //   sectionTitle: "Architecture",
  //   architecture: ["Student", "React Dashboard", "Aggregation Layer", "University APIs", "Cache", "Static Hosting"],
  //   challenges: [
  //     {
  //       challenge: "Data came from inconsistent sources.",
  //       solution: "Built an aggregation layer that normalised everything into one shape.",
  //       outcome: "A single, coherent data model for the UI.",
  //     },
  //     {
  //       challenge: "We had only 48 hours.",
  //       solution: "Designed in Figma first, then built against a fixed component set.",
  //       outcome: "Shipped a polished demo on time.",
  //     },
  //     {
  //       challenge: "It had to work on any device.",
  //       solution: "Adopted a mobile-first responsive layout from the start.",
  //       outcome: "Great experience on phones and laptops alike.",
  //     },
  //   ],
  //   gallery: resumeIQGallery,
  //   impact: [
  //     "Unified Dashboard",
  //     "Mobile Responsive",
  //     "Design-Led Build",
  //     "Accessible Layout",
  //     "Fast Prototype",
  //     "Hackathon Finalist",
  //   ],
  //   learnings:
  //     "Working under a hard deadline taught me to design before I code and to scope aggressively. I learned how a strong component system lets a small team move fast without sacrificing polish.",
  //   future: [
  //     "Add real authentication and live data",
  //     "Introduce notifications and reminders",
  //     "Improve accessibility to WCAG AA",
  //     "Add offline caching for schedules",
  //   ],
  // },
];

export const filters = ["All", "Featured", "AI", "Full Stack", "UI/UX", "Hackathons", "Research"] as const;

export function getProject(id: string | undefined) {
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) return { project: projects[0], prev: projects[projects.length - 1], next: projects[1] };
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return { project: projects[index], prev, next };
}
