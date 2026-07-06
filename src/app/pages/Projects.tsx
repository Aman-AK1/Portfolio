import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../data/projects";

export default function Projects() {
  const visible = projects;

  return (
    <div className="pt-24 md:pt-28 pb-10 text-white/90 relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-10"
        >
          <h1 className="text-4xl md:text-6xl font-semibold text-white mb-6 tracking-tight">
            Project Archive
          </h1>
          <p className="text-lg md:text-xl text-white/50 font-light leading-relaxed">
            A comprehensive index of my hackathon builds, open-source tools, side projects, and academic assignments.
          </p>
        </motion.div>

        <div className="border-t border-white/10">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
              >
                <Link
                  to={`/projects/${project.id}`}
                  className="group relative flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-white/5 hover:border-white/20 transition-colors overflow-hidden"
                >
                  {/* Glass highlight sweeping across the row on hover */}
                  <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

                  <div className="relative flex flex-col md:flex-row md:items-center gap-2 md:gap-12 mb-4 md:mb-0">
                    <span className="text-white/30 font-mono text-sm w-12">{project.year}</span>
                    <h2 className="text-2xl md:text-3xl font-medium text-white/80 group-hover:text-white transition-all duration-300 group-hover:translate-x-1.5">
                      {project.title}
                    </h2>
                  </div>
                  <div className="relative flex items-center gap-8 text-white/50 text-sm font-mono">
                    <span className="hidden md:block w-32 group-hover:text-white/70 transition-colors">{project.role}</span>
                    <span className="w-32 group-hover:text-white/70 transition-colors">{project.category}</span>
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
