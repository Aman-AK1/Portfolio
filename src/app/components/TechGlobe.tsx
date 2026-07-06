import { motion } from "motion/react";

const technologies = [
  { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/white", radius: 120, angle: 0, size: 40 },
  { name: "React", icon: "https://cdn.simpleicons.org/react/white", radius: 120, angle: 72, size: 48 },
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/white", radius: 120, angle: 144, size: 40 },
  { name: "Tailwind", icon: "https://cdn.simpleicons.org/tailwindcss/white", radius: 120, angle: 216, size: 44 },
  { name: "Framer", icon: "https://cdn.simpleicons.org/framer/white", radius: 120, angle: 288, size: 36 },

  { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/white", radius: 220, angle: 30, size: 44 },
  { name: "Go", icon: "https://cdn.simpleicons.org/go/white", radius: 220, angle: 90, size: 48 },
  { name: "Python", icon: "https://cdn.simpleicons.org/python/white", radius: 220, angle: 150, size: 40 },
  { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/white", radius: 220, angle: 210, size: 46 },
  { name: "Redis", icon: "https://cdn.simpleicons.org/redis/white", radius: 220, angle: 270, size: 40 },
  { name: "GraphQL", icon: "https://cdn.simpleicons.org/graphql/white", radius: 220, angle: 330, size: 38 },

  { name: "Docker", icon: "https://cdn.simpleicons.org/docker/white", radius: 320, angle: 15, size: 48 },
  { name: "AWS", icon: "https://cdn.simpleicons.org/amazonaws/white", radius: 320, angle: 75, size: 44 },
  { name: "Vercel", icon: "https://cdn.simpleicons.org/vercel/white", radius: 320, angle: 135, size: 40 },
  { name: "Java", icon: "https://cdn.simpleicons.org/java/white", radius: 320, angle: 195, size: 42 },
  { name: "C++", icon: "https://cdn.simpleicons.org/cplusplus/white", radius: 320, angle: 255, size: 38 },
  { name: "Express", icon: "https://cdn.simpleicons.org/express/white", radius: 320, angle: 315, size: 42 },
];

export function TechGlobe() {
  return (
    <div className="relative w-full max-w-[800px] h-[400px] sm:h-[600px] lg:h-[800px] mx-auto flex items-center justify-center overflow-hidden">
      <div className="relative w-full h-full flex items-center justify-center scale-[0.5] sm:scale-75 md:scale-90 lg:scale-100 origin-center">
        {/* Background Rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[240px] h-[240px] rounded-full border border-white/5 absolute animate-[spin_60s_linear_infinite]" />
        <div className="w-[440px] h-[440px] rounded-full border border-white/5 absolute animate-[spin_80s_linear_infinite_reverse]" />
        <div className="w-[640px] h-[640px] rounded-full border border-white/5 absolute animate-[spin_100s_linear_infinite]" />
      </div>

      {/* Central Node */}
      <div className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20 border border-white/10 flex items-center justify-center backdrop-blur-md shadow-[0_0_40px_rgba(99,102,241,0.2)]">
        <div className="w-16 h-16 rounded-full bg-[#111113] flex items-center justify-center font-mono text-sm font-semibold text-white/90">
          Core
        </div>
      </div>

      {/* Orbiting Technologies */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {technologies.map((tech, idx) => {
          // Calculate initial position based on radius and angle
          const rad = (tech.angle * Math.PI) / 180;
          const x = Math.cos(rad) * tech.radius;
          const y = Math.sin(rad) * tech.radius;
          
          return (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.5, 
                delay: idx * 0.05,
                type: "spring",
                bounce: 0.4
              }}
              className="absolute group pointer-events-auto flex flex-col items-center justify-center"
              style={{
                x,
                y,
              }}
            >
              <div 
                className="flex items-center justify-center rounded-2xl bg-[#111113]/80 border border-white/10 backdrop-blur-md shadow-xl hover:border-white/30 hover:scale-110 hover:-translate-y-1 transition-all cursor-pointer"
                style={{ width: tech.size + 16, height: tech.size + 16 }}
              >
                <img 
                  src={tech.icon} 
                  alt={tech.name} 
                  className="w-auto h-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity" 
                  style={{ width: tech.size * 0.6, height: tech.size * 0.6 }}
                />
              </div>
              <span className="absolute -bottom-6 text-[10px] font-mono text-white/50 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black/50 px-2 py-0.5 rounded">
                {tech.name}
              </span>
            </motion.div>
          );
        })}
      </div>
      
      {/* Decorative center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />
      </div>
    </div>
  );
}