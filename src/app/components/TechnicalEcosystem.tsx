import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

type CategoryId = 'frontend' | 'backend' | 'design' | 'tools';

interface Category {
  id: CategoryId;
  name: string;
  color: string; // RGB values for rgba formatting
  radius: number;
  duration: number;
}

const categories: Record<CategoryId, Category> = {
  frontend: { id: 'frontend', name: 'Frontend', color: '168, 85, 247', radius: 150, duration: 40 }, // Purple
  backend: { id: 'backend', name: 'Backend', color: '59, 130, 246', radius: 230, duration: 55 },   // Blue
  design: { id: 'design', name: 'Design', color: '249, 115, 22', radius: 310, duration: 70 },      // Orange
  tools: { id: 'tools', name: 'Deployment & Tools', color: '34, 197, 94', radius: 390, duration: 85 }, // Green
};

type Technology = {
  id: string;
  name: string;
  categoryId: CategoryId;
  description: string;
  projects: string[];
  icon: string;
};

const technologies: Technology[] = [
  // Frontend
  { id: "react", name: "React", categoryId: "frontend", description: "Used for building modern user interfaces and scalable web applications.", projects: ["GLOF Tracker", "MedX", "Travnir"], icon: "https://cdn.simpleicons.org/react/white" },
  { id: "nextjs", name: "Next.js", categoryId: "frontend", description: "React framework for production-grade, server-rendered applications.", projects: ["AK Portfolio", "GLOF Tracker"], icon: "https://cdn.simpleicons.org/nextdotjs/white" },
  { id: "javascript", name: "JavaScript", categoryId: "frontend", description: "The foundation of my interactive web development workflow.", projects: ["All Projects"], icon: "https://cdn.simpleicons.org/javascript/white" },
  { id: "tailwindcss", name: "Tailwind CSS", categoryId: "frontend", description: "Utility-first CSS framework for rapid and consistent UI styling.", projects: ["AK Portfolio", "GLOF Tracker"], icon: "https://cdn.simpleicons.org/tailwindcss/white" },

  // Backend
  { id: "nodejs", name: "Node.js", categoryId: "backend", description: "Powering scalable and high-performance server-side applications.", projects: ["GLOF Tracker", "MedX"], icon: "https://cdn.simpleicons.org/nodedotjs/white" },
  { id: "express", name: "Express.js", categoryId: "backend", description: "Minimalist web framework for building robust RESTful APIs.", projects: ["GLOF Tracker", "MedX"], icon: "https://cdn.simpleicons.org/express/white" },
  { id: "mongodb", name: "MongoDB", categoryId: "backend", description: "Flexible NoSQL document-based storage for rapid development.", projects: ["Travnir", "MedX"], icon: "https://cdn.simpleicons.org/mongodb/white" },
  { id: "sql", name: "SQL", categoryId: "backend", description: "Structured query language for relational data modeling and queries.", projects: ["Enterprise Apps", "MedX"], icon: "https://cdn.simpleicons.org/mysql/white" },

  // Design
  { id: "figma", name: "Figma", categoryId: "design", description: "Primary tool for wireframing, prototyping, and design systems.", projects: ["All Projects"], icon: "https://cdn.simpleicons.org/figma/white" },
  { id: "uiux", name: "UI/UX Design", categoryId: "design", description: "Creating intuitive, accessible, and beautiful user experiences.", projects: ["All Projects"], icon: "https://cdn.simpleicons.org/framer/white" },

  // Tools
  { id: "git", name: "Git", categoryId: "tools", description: "Essential version control for tracking changes and collaborating.", projects: ["All Projects"], icon: "https://cdn.simpleicons.org/git/white" },
  { id: "vercel", name: "Vercel", categoryId: "tools", description: "Platform for frontend frameworks and static site deployment.", projects: ["AK Portfolio"], icon: "https://cdn.simpleicons.org/vercel/white" },
  { id: "render", name: "Render", categoryId: "tools", description: "Cloud platform for hosting web services, APIs, and databases.", projects: ["GLOF Tracker", "MedX"], icon: "https://cdn.simpleicons.org/render/white" },
  { id: "cloudinary", name: "Cloudinary", categoryId: "tools", description: "Image and video API for rendering and optimization.", projects: ["GLOF Tracker"], icon: "https://cdn.simpleicons.org/cloudinary/white" },
];

// ---------------------------------------------------------------------------
// Mobile-first redesign — a dedicated experience, not a scaled-down orbit.
// Category pills → simplified single-ring selector → large information card.
// ---------------------------------------------------------------------------

type MobileCategory = { id: string; name: string; color: string; techIds: string[] };

const mobileCategories: MobileCategory[] = [
  { id: 'frontend', name: 'Frontend', color: '168, 85, 247', techIds: ['react', 'nextjs', 'javascript', 'tailwindcss'] },
  { id: 'backend',  name: 'Backend',  color: '59, 130, 246', techIds: ['nodejs', 'express'] },
  { id: 'database', name: 'Database', color: '16, 185, 129', techIds: ['mongodb', 'sql'] },
  { id: 'design',   name: 'Design',   color: '249, 115, 22', techIds: ['figma', 'uiux'] },
  { id: 'tools',    name: 'Tools',    color: '34, 197, 94',  techIds: ['git', 'vercel', 'render', 'cloudinary'] },
];

const techById: Record<string, Technology> = Object.fromEntries(technologies.map(t => [t.id, t]));

function MobileArsenal() {
  const [activeCatId, setActiveCatId] = useState('frontend');
  const [activeTechId, setActiveTechId] = useState('react');

  const activeCat = mobileCategories.find(c => c.id === activeCatId)!;
  const catTechs = activeCat.techIds.map(id => techById[id]);
  const activeTech = techById[activeTechId];
  const color = activeCat.color;

  const selectCategory = (id: string) => {
    const cat = mobileCategories.find(c => c.id === id)!;
    setActiveCatId(id);
    setActiveTechId(cat.techIds[0]);
  };

  return (
    <div className="w-full max-w-md mx-auto px-1 relative z-10">

      {/* Category Tabs — horizontally scrollable pills */}
      <div className="flex gap-2.5 overflow-x-auto pb-3 -mx-4 px-4 mb-9 snap-x [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {mobileCategories.map(cat => {
          const active = cat.id === activeCatId;
          return (
            <button
              key={cat.id}
              onClick={() => selectCategory(cat.id)}
              className="snap-start shrink-0 px-5 py-2.5 rounded-full border backdrop-blur-xl transition-all duration-300 text-sm font-medium"
              style={{
                color: active ? `rgb(${cat.color})` : 'rgba(255,255,255,0.6)',
                borderColor: active ? `rgba(${cat.color},0.5)` : 'rgba(255,255,255,0.1)',
                backgroundColor: active ? `rgba(${cat.color},0.12)` : 'rgba(255,255,255,0.03)',
                boxShadow: active ? `0 0 24px rgba(${cat.color},0.25)` : 'none',
              }}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Orbit Selector — single ring, big center hub, generous spacing */}
      <div className="relative w-full max-w-[330px] mx-auto aspect-square mb-11">
        {/* Ambient category glow */}
        <div
          className="absolute inset-[6%] rounded-full blur-[70px] opacity-50 transition-colors duration-500 pointer-events-none"
          style={{ background: `radial-gradient(circle, rgba(${color},0.35), transparent 70%)` }}
        />
        {/* Decorative rotating dashed ring */}
        <div
          className="absolute inset-[7%] rounded-full border border-dashed animate-[spin-slow_60s_linear_infinite] transition-colors duration-500"
          style={{ borderColor: `rgba(${color},0.28)` }}
        />
        {/* Traveling glow on the ring */}
        <div className="absolute inset-[7%] animate-[spin-slow_16s_linear_infinite] pointer-events-none">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
            style={{ backgroundColor: `rgb(${color})`, boxShadow: `0 0 14px rgba(${color},0.9)` }}
          />
        </div>

        {/* Center Hub — focal point */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[47%] aspect-square z-20">
          <div
            className="absolute inset-0 rounded-full animate-ping opacity-30"
            style={{ backgroundColor: `rgba(${color},0.45)`, animationDuration: '3s' }}
          />
          <div
            className="absolute -inset-4 rounded-full blur-2xl opacity-70 transition-colors duration-500"
            style={{ background: `radial-gradient(circle, rgba(${color},0.5), transparent 70%)` }}
          />
          <div className="absolute inset-0 rounded-full bg-[#070707]/95 backdrop-blur-2xl border border-white/15 flex flex-col items-center justify-center text-center px-3 shadow-[0_0_55px_rgba(255,255,255,0.08)]">
            <h3 className="font-bold tracking-[0.12em] indent-[0.12em] text-white text-base leading-tight whitespace-nowrap">AMAN KHAN</h3>
            <div className="w-10 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent my-2" />
            <p className="text-white/55 text-[10px] font-mono tracking-[0.15em] uppercase leading-snug">Full Stack<br />Developer</p>
          </div>
        </div>

        {/* Technology Nodes */}
        {catTechs.map((tech, i) => {
          const angle = (i / catTechs.length) * 2 * Math.PI - Math.PI / 2; // start at top
          const r = 40; // percent radius
          const x = 50 + r * Math.cos(angle);
          const y = 50 + r * Math.sin(angle);
          const selected = tech.id === activeTechId;
          return (
            <motion.button
              key={tech.id}
              onClick={() => setActiveTechId(tech.id)}
              className="absolute z-30 rounded-full flex items-center justify-center backdrop-blur-xl border"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                x: '-50%',
                y: '-50%',
                width: 66,
                height: 66,
                backgroundColor: selected ? `rgba(${color},0.18)` : 'rgba(12,12,12,0.92)',
                borderColor: selected ? `rgba(${color},0.7)` : 'rgba(255,255,255,0.12)',
                boxShadow: selected ? `0 0 32px rgba(${color},0.5)` : '0 8px 20px rgba(0,0,0,0.5)',
              }}
              animate={{ scale: selected ? 1.14 : 1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            >
              <img
                src={selected ? tech.icon.replace('/white', '') : tech.icon}
                alt={tech.name}
                className="w-9 h-9 object-contain transition-all duration-300"
                style={{ opacity: selected ? 1 : 0.75 }}
              />
            </motion.button>
          );
        })}
      </div>

      {/* Information Card — primary focus */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTech.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3 }}
          className="relative rounded-[1.75rem] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-6 shadow-2xl overflow-hidden"
        >
          <div
            className="absolute -top-20 -right-16 w-48 h-48 rounded-full blur-[80px] opacity-30 pointer-events-none transition-colors duration-500"
            style={{ backgroundColor: `rgb(${color})` }}
          />
          <div className="relative">
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-16 h-16 rounded-2xl bg-[#0a0a0a] border flex items-center justify-center p-3.5 shrink-0"
                style={{ borderColor: `rgba(${color},0.35)`, boxShadow: `0 0 30px rgba(${color},0.2) inset` }}
              >
                <img src={activeTech.icon.replace('/white', '')} alt={activeTech.name} className="w-full h-full object-contain drop-shadow-lg" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold tracking-tight text-white mb-2">{activeTech.name}</h3>
                <span
                  className="inline-block text-xs font-mono px-3 py-1 rounded-full border"
                  style={{ color: `rgb(${color})`, borderColor: `rgba(${color},0.35)`, backgroundColor: `rgba(${color},0.12)` }}
                >
                  {activeCat.name}
                </span>
              </div>
            </div>

            <p className="text-base text-white/75 leading-relaxed font-light mb-7">{activeTech.description}</p>

            <div>
              <h4 className="text-xs font-mono text-white/40 uppercase tracking-widest mb-4">Projects Used In</h4>
              <ul className="space-y-3">
                {activeTech.projects.map((proj, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/85 text-base">
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: `rgb(${color})`, boxShadow: `0 0 8px rgba(${color},0.8)` }}
                    />
                    {proj}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function TechnicalEcosystem() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [activeTech, setActiveTech] = useState<Technology | null>(null);
  
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getResponsiveConfig = (width: number) => {
    if (width < 640) {
      // Calculate max radius dynamically so it perfectly fits any mobile screen
      const padding = 16;
      const nodeSize = 42; // slightly smaller nodes on mobile
      // Subtracting padding and half the node size from the edge to ensure full visibility
      const maxRadius = Math.min((width - (padding * 2) - nodeSize) / 2, 175);

      const minRadius = 66; // Inner most ring radius
      const step = (maxRadius - minRadius) / 3;

      return {
        radii: {
          frontend: minRadius,
          backend: minRadius + step,
          design: minRadius + step * 2,
          tools: maxRadius
        },
        nodeSize,
        imgSize: 26, // tighter fit inside the node on mobile
        centerSize: 88,
        titleSize: 'text-[11px]',
        subSize: 'text-[7px]',
      };
    } else if (width < 1024) {
      return {
        radii: { frontend: 100, backend: 155, design: 210, tools: 265 },
        nodeSize: 54,
        imgSize: 26,
        centerSize: 124,
        titleSize: 'text-base',
        subSize: 'text-[9px]',
      };
    }
    return {
      radii: { frontend: 116, backend: 179, design: 242, tools: 306 },
      nodeSize: 58,
      imgSize: 29,
      centerSize: 148,
      titleSize: 'text-lg',
      subSize: 'text-[10px]',
    };
  };

  const config = getResponsiveConfig(windowWidth);
  const maxDiameter = config.radii.tools * 2 + config.nodeSize;

  // Group technologies by category
  const groupedTechs = Object.values(categories).map(cat => ({
    category: cat,
    techs: technologies.filter(t => t.categoryId === cat.id)
  }));

  return (
    <section className="w-full bg-[#050505] relative overflow-hidden py-16 sm:py-20 lg:py-14 lg:min-h-screen flex flex-col items-center justify-center border-t border-white/[0.02]">
      {/* Global CSS for custom animations */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E");
        }
      `}</style>

      {/* Premium Background Effects */}
      <div className="absolute inset-0 bg-noise opacity-40 pointer-events-none mix-blend-overlay z-0" />
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

      {/* Section Header */}
      <div className="w-full max-w-7xl px-6 relative z-10 mb-10 sm:mb-12 lg:mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 text-center lg:text-left items-center lg:items-end">
        <div className="max-w-2xl">
          <h2 className="text-sm font-mono text-indigo-400 uppercase tracking-widest mb-3">Capabilities</h2>
          <p className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-4">Technical Arsenal</p>
          <p className="text-base md:text-lg text-white/60 font-light leading-relaxed">
            The technologies, frameworks, and tools I use to design, build, and deploy modern digital products.
          </p>
        </div>
      </div>

      {/* Mobile / Tablet Experience */}
      <div className="lg:hidden w-full px-6 relative z-10">
        <MobileArsenal />
      </div>

      {/* Desktop Content Grid */}
      <div className="hidden w-full max-w-7xl px-6 lg:grid lg:grid-cols-12 gap-10 lg:gap-8 relative z-10 items-center">

        {/* Left: Interactive Orbit System */}
        <div className="lg:col-span-7 flex items-center justify-center relative rounded-[2rem] lg:rounded-none bg-gradient-to-b from-white/[0.03] to-transparent lg:bg-none border border-white/[0.06] lg:border-0 px-2 py-6 lg:p-0"
          style={{ minHeight: maxDiameter + 24 }}
        >
          {/* Soft radial vignette behind orbit (premium depth) */}
          <div className="absolute inset-0 pointer-events-none rounded-[2rem] lg:rounded-none overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.10)_0%,rgba(59,130,246,0.06)_40%,transparent_70%)]" />
          </div>

          <div
            className="relative flex items-center justify-center transition-all duration-300"
            style={{ width: '100%', height: maxDiameter }}
          >
            {/* Base Canvas */}
            <div 
              className="relative flex items-center justify-center"
            >
              
              {/* Center Premium Node */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 group cursor-default pointer-events-auto"
                style={{ width: config.centerSize, height: config.centerSize }}
                onMouseEnter={() => setHoveredTech(null)}
              >
                {/* Soft pulse behind center */}
                <div className="absolute inset-0 rounded-full bg-white/5 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]" />
                
                {/* Core Node */}
                <div className="absolute inset-0 rounded-full bg-[#050505]/90 backdrop-blur-2xl border border-white/10 flex flex-col items-center justify-center text-center shadow-[0_0_60px_rgba(255,255,255,0.05)] transition-all duration-700 group-hover:border-white/20 group-hover:shadow-[0_0_80px_rgba(255,255,255,0.1)]">
                  <h3 className={`font-bold tracking-[0.15em] indent-[0.15em] text-white mb-1 text-center whitespace-nowrap ${config.titleSize}`}>AMAN KHAN</h3>
                  <div className="w-8 md:w-12 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent mb-1" />
                  <div className={`${config.subSize} text-white/50 font-mono tracking-[0.12em] indent-[0.12em] text-center leading-relaxed px-1`}>
                    FULL STACK DEV<br/>UI/UX DESIGNER
                  </div>
                </div>
              </div>

              {/* Orbital Rings */}
              {groupedTechs.map(({ category, techs }, ringIndex) => {
                const radius = config.radii[category.id];
                const duration = category.duration;
                const isAnyHovered = hoveredTech !== null;
                const isRingHovered = techs.some(t => t.id === hoveredTech);
                // All rings rotate in the same direction (clockwise)
                const ringSpin = 'spin-slow';
                const nodeSpin = 'spin-reverse';

                return (
                  <div 
                    key={category.id} 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" 
                    style={{ width: radius * 2, height: radius * 2 }}
                  >
                    {/* Orbit Path */}
                    <div
                      className="absolute inset-0 rounded-full border border-dashed transition-all duration-700"
                      style={{
                        borderColor: `rgba(${category.color}, ${isRingHovered ? 0.4 : (isAnyHovered ? 0.05 : 0.2)})`,
                        boxShadow: isRingHovered ? `0 0 30px rgba(${category.color}, 0.1) inset` : 'none'
                      }}
                    />

                    {/* Rotating Container */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        animation: `${ringSpin} ${duration}s linear infinite`,
                        animationPlayState: hoveredTech ? 'paused' : 'running'
                      }}
                    >
                      {/* Animated Particle on Path */}
                      <div 
                        className="absolute w-1.5 h-1.5 rounded-full transition-opacity duration-500"
                        style={{
                          left: radius * 2,
                          top: radius,
                          transform: 'translate(-50%, -50%)',
                          backgroundColor: `rgba(${category.color}, 1)`,
                          boxShadow: `0 0 10px rgba(${category.color}, 0.8), 0 0 20px rgba(${category.color}, 0.4)`,
                          opacity: isAnyHovered && !isRingHovered ? 0 : 1
                        }}
                      />

                      {/* Connecting Lines */}
                      <svg className="absolute inset-0 pointer-events-none" style={{ overflow: 'visible' }}>
                        {techs.map((tech, i) => {
                          const angle = (i / techs.length) * 360;
                          const angleRad = (angle * Math.PI) / 180;
                          const x = radius + radius * Math.cos(angleRad);
                          const y = radius + radius * Math.sin(angleRad);
                          const isHovered = hoveredTech === tech.id;

                          return (
                            <line
                              key={`line-${tech.id}`}
                              x1={radius} y1={radius}
                              x2={x} y2={y}
                              stroke={`rgba(${category.color}, ${isHovered ? 0.6 : 0.0})`}
                              strokeWidth={isHovered ? 2 : 1}
                              strokeDasharray="4 4"
                              className="transition-all duration-300"
                            />
                          );
                        })}
                      </svg>

                      {/* Tech Nodes */}
                      {techs.map((tech, i) => {
                        const angle = (i / techs.length) * 360;
                        const angleRad = (angle * Math.PI) / 180;
                        const x = radius + radius * Math.cos(angleRad);
                        const y = radius + radius * Math.sin(angleRad);
                        
                        const isHovered = hoveredTech === tech.id;
                        const isDimmed = isAnyHovered && !isHovered;

                        return (
                          <div
                            key={tech.id}
                            className="absolute"
                            style={{ left: x, top: y, transform: 'translate(-50%, -50%)', zIndex: isHovered ? 100 : 10 }}
                          >
                            {/* Counter-rotation to keep icons upright */}
                            <div
                              style={{
                                animation: `${nodeSpin} ${duration}s linear infinite`,
                                animationPlayState: hoveredTech ? 'paused' : 'running'
                              }}
                            >
                              <motion.div
                                className="relative rounded-full flex items-center justify-center cursor-pointer backdrop-blur-xl border transition-all duration-300 group pointer-events-auto"
                                style={{
                                  width: config.nodeSize,
                                  height: config.nodeSize,
                                  backgroundColor: isHovered ? `rgba(${category.color}, 0.15)` : 'rgba(10, 10, 10, 0.9)',
                                  borderColor: isHovered ? `rgba(${category.color}, 0.5)` : 'rgba(255, 255, 255, 0.1)',
                                  boxShadow: isHovered ? `0 0 30px rgba(${category.color}, 0.4)` : '0 10px 20px rgba(0,0,0,0.5)',
                                  opacity: isDimmed ? 0.2 : 1,
                                  scale: isHovered ? 1.2 : 1,
                                }}
                                onMouseEnter={() => { setHoveredTech(tech.id); setActiveTech(tech); }}
                                onMouseLeave={() => setHoveredTech(null)}
                                onClick={() => { setHoveredTech(tech.id); setActiveTech(tech); }}
                              >
                                <img
                                  src={isHovered ? tech.icon.replace('/white', '') : tech.icon}
                                  alt={tech.name}
                                  className="object-contain transition-all duration-300"
                                  style={{ 
                                    width: config.imgSize,
                                    height: config.imgSize,
                                    opacity: isHovered ? 1 : 0.7,
                                    filter: isHovered ? 'drop-shadow(0 0 8px rgba(255,255,255,0.3))' : 'none'
                                  }}
                                />

                                {/* Node Label Tooltip */}
                                <div
                                  className={`absolute -bottom-12 whitespace-nowrap text-sm font-semibold text-white bg-[#0a0a0a] px-4 py-2 rounded-xl border transition-all duration-300 shadow-2xl ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
                                  style={{ borderColor: `rgba(${category.color}, 0.3)` }}
                                >
                                  {tech.name}
                                </div>
                              </motion.div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Dynamic Information Panel */}
        <div className="lg:col-span-5 flex flex-col justify-center relative">
          
          {/* Panel Ambient Glow */}
          <div
            className="absolute inset-0 opacity-20 blur-[120px] transition-colors duration-700 pointer-events-none rounded-full"
            style={{ backgroundColor: activeTech ? `rgba(${categories[activeTech.categoryId].color}, 1)` : 'transparent' }}
          />

          <div className="relative w-full min-h-[320px] lg:min-h-[420px] bg-white/[0.02] border border-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl flex flex-col justify-center">
            
            <AnimatePresence mode="wait">
              {activeTech ? (
                <motion.div
                  key={activeTech.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col h-full justify-center"
                >
                  <div className="flex items-center gap-6 mb-8">
                    <div 
                      className="w-20 h-20 rounded-2xl bg-[#0a0a0a] border flex items-center justify-center p-5 shrink-0" 
                      style={{ 
                        borderColor: `rgba(${categories[activeTech.categoryId].color}, 0.3)`,
                        boxShadow: `0 0 40px rgba(${categories[activeTech.categoryId].color}, 0.2) inset` 
                      }}
                    >
                      <img 
                        src={activeTech.icon.replace('/white', '')} 
                        alt={activeTech.name} 
                        className="w-full h-full object-contain filter drop-shadow-lg" 
                      />
                    </div>
                    <div>
                      <h3 className="text-3xl font-semibold tracking-tight text-white mb-3">{activeTech.name}</h3>
                      <span
                        className="text-xs font-mono px-3 py-1.5 rounded-full border"
                        style={{
                          color: `rgba(${categories[activeTech.categoryId].color}, 1)`,
                          borderColor: `rgba(${categories[activeTech.categoryId].color}, 0.3)`,
                          backgroundColor: `rgba(${categories[activeTech.categoryId].color}, 0.1)`,
                        }}
                      >
                        {categories[activeTech.categoryId].name}
                      </span>
                    </div>
                  </div>

                  <div className="mb-10">
                    <h4 className="text-xs font-mono text-white/40 uppercase tracking-widest mb-4">Description</h4>
                    <p className="text-lg text-white/80 leading-relaxed font-light">
                      {activeTech.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono text-white/40 uppercase tracking-widest mb-4">Projects</h4>
                    <div className="flex flex-wrap gap-3">
                      {activeTech.projects.map((proj, i) => (
                        <span 
                          key={i} 
                          className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/80 text-sm font-medium hover:bg-white/10 hover:border-white/20 transition-all cursor-default"
                        >
                          {proj}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="empty-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center h-full opacity-60"
                >
                  <div className="relative w-20 h-20 mb-8 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/20 animate-[spin-slow_15s_linear_infinite]" />
                    <div className="absolute inset-2 rounded-full border border-white/10 animate-[spin-reverse_10s_linear_infinite]" />
                    <div className="w-2 h-2 rounded-full bg-white/50 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                  </div>
                  <h3 className="text-2xl font-medium text-white mb-4 tracking-tight">Interactive Ecosystem</h3>
                  <p className="text-white/60 max-w-sm mx-auto font-light leading-relaxed">
                    Hover over or tap any technology in the orbital diagram to explore my technical stack, categorizations, and associated projects.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}