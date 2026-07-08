import { useRef, useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import {
  ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink, Github,
  ChevronRight, ChevronDown, ChevronLeft, X, Check, Sparkles,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { getProject } from "../data/projects";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
};

/* Lightweight magnetic button wrapper. */
function Magnetic({ children, className = "", href }: { children: React.ReactNode; className?: string; href?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const move = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({ x: (e.clientX - (r.left + r.width / 2)) * 0.2, y: (e.clientY - (r.top + r.height / 2)) * 0.3 });
  };
  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={move}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 220, damping: 14 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

export default function ProjectDetail() {
  const { id } = useParams();
  const { project, prev, next } = getProject(id);

  // Hero parallax
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Gallery lightbox
  const [lightbox, setLightbox] = useState<number | null>(null);
  const gallery = project.gallery;
  const nextImg = () => setLightbox((i) => (i === null ? i : (i + 1) % gallery.length));
  const prevImg = () => setLightbox((i) => (i === null ? i : (i - 1 + gallery.length) % gallery.length));

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") nextImg();
      if (e.key === "ArrowLeft") prevImg();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox]);

  const caseStudy = [
    { label: "The Problem", body: project.caseStudy.problem },
    { label: "Why Existing Solutions Weren't Enough", body: project.caseStudy.gap },
    { label: "My Approach", body: project.caseStudy.approach },
    { label: "Final Solution", body: project.caseStudy.solution },
  ];

  return (
    <div className="pt-24 md:pt-28 pb-10 text-white/90 relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Link to="/projects" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-10 text-sm font-medium group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Archive</span>
        </Link>

        {/* ===== HERO ===== */}
        <div ref={heroRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mb-10"
          >
            <h1 className="text-4xl md:text-6xl font-semibold text-white mb-6 tracking-tight">{project.title}</h1>
            <p className="text-xl text-white/60 font-light leading-relaxed mb-8">{project.subtitle}</p>

            {/* Compact metadata pills */}
            <div className="flex flex-wrap gap-2.5">
              {[project.meta.type, project.meta.stack, project.meta.duration, project.meta.year].map((m) => (
                <span
                  key={m}
                  className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-xl text-sm text-white/75"
                >
                  {m}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Hero image — browser window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mb-14"
          >
            {/* Slow gradient glow behind */}
            <motion.div
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-6 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.25),transparent_65%)] blur-2xl pointer-events-none"
            />
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="relative rounded-2xl border border-white/10 bg-[#0e0e10]/70 backdrop-blur-xl shadow-2xl overflow-hidden"
            >
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                <span className="w-3 h-3 rounded-full bg-white/15" />
                <span className="w-3 h-3 rounded-full bg-white/15" />
                <span className="w-3 h-3 rounded-full bg-white/15" />
                <div className="ml-3 flex-1 max-w-md h-6 rounded-md bg-white/[0.04] border border-white/5 hidden sm:block" />
              </div>
              <div className="relative overflow-hidden bg-[#0a0a0c] p-3 sm:p-4">
  <motion.div style={{ y: imageY }} className="relative rounded-xl overflow-hidden">
    <ImageWithFallback src={project.image} alt={project.title} className="w-full h-auto object-contain" />
  </motion.div>
  <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/40 to-transparent pointer-events-none" />
</div>
            </motion.div>
          </motion.div>
        </div>

        {/* ===== MAIN GRID ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* LEFT — info card (sticky on desktop, compact horizontal on mobile) */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-6">
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
                <div className="flex flex-row lg:flex-col gap-6 overflow-x-auto lg:overflow-visible [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  <div className="shrink-0">
                    <h4 className="text-white/40 text-xs font-mono tracking-widest uppercase mb-1">Context</h4>
                    <p className="text-white font-medium whitespace-nowrap lg:whitespace-normal">{project.context}</p>
                  </div>
                  <div className="shrink-0">
                    <h4 className="text-white/40 text-xs font-mono tracking-widest uppercase mb-1">Role</h4>
                    <p className="text-white font-medium whitespace-nowrap lg:whitespace-normal">{project.role}</p>
                  </div>
                  <div className="shrink-0">
                    <h4 className="text-white/40 text-xs font-mono tracking-widest uppercase mb-1">Timeline</h4>
                    <p className="text-white font-medium whitespace-nowrap lg:whitespace-normal">{project.timeline}</p>
                  </div>
                  <div className="shrink-0 lg:shrink">
                    <h4 className="text-white/40 text-xs font-mono tracking-widest uppercase mb-3">Stack</h4>
                    <div className="flex flex-nowrap lg:flex-wrap gap-2">
                      {project.stack.map((t) => (
                        <span key={t} className="px-3 py-1 rounded-md bg-[#1a1a1c] border border-white/10 text-white/80 text-sm whitespace-nowrap">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-3">
                <Magnetic
                  href={project.liveUrl}
                  className="w-full px-4 py-3 bg-white text-black rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-white/90 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </Magnetic>
                <Magnetic
                  href={project.sourceUrl}
                  className="w-full px-4 py-3 bg-white/5 text-white border border-white/10 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
                >
                  <Github className="w-4 h-4" /> Source Code
                </Magnetic>
              </div>
            </div>
          </div>

          {/* RIGHT — story */}
          <div className="lg:col-span-8 space-y-20">
            {/* Case Study */}
            <section className="space-y-10">
              {caseStudy.map((block, i) => (
                <motion.div key={block.label} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.05 }}>
                  <h3 className="text-sm font-mono text-indigo-400 uppercase tracking-widest mb-3">{block.label}</h3>
                  <p className="text-lg text-white/65 font-light leading-relaxed">{block.body}</p>
                </motion.div>
              ))}
            </section>

            {/* Architecture */}
            <section>
              <motion.h3 {...fadeUp} transition={{ duration: 0.5 }} className="text-2xl font-semibold text-white mb-8">
                 {project.sectionTitle}
              </motion.h3>
              <div className="flex flex-col md:flex-row md:flex-wrap md:items-stretch gap-3">
                {project.architecture.map((node, i) => (
                  <div key={node} className="flex flex-col md:flex-row md:items-stretch gap-3">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.4, delay: i * 0.08, type: "spring", stiffness: 260, damping: 22 }}
                      className="flex items-center justify-center text-center px-5 py-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm text-white font-medium min-w-[120px] hover:border-indigo-400/40 hover:bg-white/[0.06] transition-colors"
                    >
                      {node}
                    </motion.div>
                    {i < project.architecture.length - 1 && (
                      <div className="flex items-center justify-center text-white/30">
                        <ChevronDown className="w-5 h-5 md:hidden" />
                        <ChevronRight className="w-5 h-5 hidden md:block" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Challenges & Solutions */}
            <section>
              <motion.h3 {...fadeUp} transition={{ duration: 0.5 }} className="text-2xl font-semibold text-white mb-8">
                Challenges &amp; Solutions
              </motion.h3>
              <div className="space-y-5">
                {project.challenges.map((c, i) => (
                  <motion.div
                    key={i}
                    {...fadeUp}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:border-white/20 transition-colors"
                  >
                    <div className="grid sm:grid-cols-3 gap-5">
                      <div>
                        <h4 className="text-xs font-mono text-rose-300/80 uppercase tracking-widest mb-2">Challenge</h4>
                        <p className="text-white/75 text-sm leading-relaxed">{c.challenge}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-mono text-indigo-300/80 uppercase tracking-widest mb-2">Solution</h4>
                        <p className="text-white/75 text-sm leading-relaxed">{c.solution}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-mono text-emerald-300/80 uppercase tracking-widest mb-2">Outcome</h4>
                        <p className="text-white/75 text-sm leading-relaxed">{c.outcome}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Gallery */}
            <section>
              <motion.h3 {...fadeUp} transition={{ duration: 0.5 }} className="text-2xl font-semibold text-white mb-8">
                Gallery
              </motion.h3>
              <div className="flex md:grid md:grid-cols-2 gap-4 overflow-x-auto md:overflow-visible snap-x pb-2 -mx-6 px-6 md:mx-0 md:px-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {gallery.map((g, i) => (
                  <motion.button
                    key={g.label}
                    onClick={() => setLightbox(i)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    className="group relative shrink-0 w-[80%] sm:w-[60%] md:w-auto snap-start rounded-2xl overflow-hidden border border-white/10 bg-[#111113] shadow-lg"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />
                      <ImageWithFallback src={g.image} alt={g.label} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <span className="absolute bottom-3 left-3 z-20 text-sm font-medium text-white px-2.5 py-1 rounded-full bg-black/40 border border-white/15 backdrop-blur-md">
                        {g.label}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </section>

            {/* Impact */}
            <section>
              <motion.h3 {...fadeUp} transition={{ duration: 0.5 }} className="text-2xl font-semibold text-white mb-8">
                Impact
              </motion.h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.impact.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    whileHover={{ y: -4 }}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:border-emerald-400/30 transition-colors"
                  >
                    <span className="w-8 h-8 rounded-full bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-emerald-300" />
                    </span>
                    <span className="text-white/85 font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* What I Learned */}
            <motion.section {...fadeUp} transition={{ duration: 0.5 }} className="p-8 rounded-2xl bg-indigo-500/5 border border-indigo-500/20">
              <h3 className="text-2xl font-semibold text-white mb-4">What I Learned</h3>
              <p className="text-white/70 leading-relaxed font-light">{project.learnings}</p>
            </motion.section>

            {/* If I Rebuilt This Today */}
            <section>
              <motion.h3 {...fadeUp} transition={{ duration: 0.5 }} className="text-2xl font-semibold text-white mb-6">
                If I Rebuilt This Today
              </motion.h3>
              <div className="space-y-3">
                {project.future.map((f, i) => (
                  <motion.div
                    key={f}
                    {...fadeUp}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="flex items-start gap-3"
                  >
                    <Sparkles className="w-4 h-4 text-indigo-300 mt-1 shrink-0" />
                    <p className="text-white/70">{f}</p>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* ===== PREV / NEXT ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-20">
          <Link
            to={`/projects/${prev.id}`}
            className="group relative p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/25 backdrop-blur-sm transition-colors overflow-hidden"
          >
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex items-center gap-2 text-white/40 text-sm font-mono mb-3">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Previous Project
            </div>
            <p className="relative text-xl md:text-2xl font-semibold text-white/70 group-hover:text-white transition-colors">{prev.title}</p>
          </Link>
          <Link
            to={`/projects/${next.id}`}
            className="group relative p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/25 backdrop-blur-sm transition-colors overflow-hidden text-right"
          >
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-l from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex items-center justify-end gap-2 text-white/40 text-sm font-mono mb-3">
              Next Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="relative text-xl md:text-2xl font-semibold text-white/70 group-hover:text-white transition-colors">{next.title}</p>
          </Link>
        </div>

        {/* ===== FINAL CTA ===== */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6 }}
          className="relative mt-16 p-10 md:p-16 rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent overflow-hidden text-center"
        >
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent pointer-events-none"
          />
          <h2 className="relative text-3xl md:text-5xl font-semibold tracking-tight text-white mb-6">
            Interested in working together?
          </h2>
          <p className="relative text-white/60 text-lg mb-10 max-w-xl mx-auto font-light">
            If this project caught your attention and you'd like to collaborate, discuss ideas, or explore
            opportunities, I'd love to hear from you.
          </p>
          <div className="relative flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link to="/contact" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors flex items-center justify-center gap-2">
              Let's Talk
            </Link>
            <Link to="/projects" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
              View More Projects <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* ===== GALLERY LIGHTBOX ===== */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-2xl" onClick={() => setLightbox(null)} />
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-colors backdrop-blur-md"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <button
              onClick={prevImg}
              className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-6 z-30 w-11 h-11 md:w-14 md:h-14 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-white transition-colors backdrop-blur-md shadow-lg"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={nextImg}
              className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-6 z-30 w-11 h-11 md:w-14 md:h-14 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-white transition-colors backdrop-blur-md shadow-lg"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <motion.div
              key={gallery[lightbox].label}
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="relative z-20 flex flex-col items-center w-full max-w-4xl px-12 sm:px-16"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="rounded-2xl overflow-hidden border border-white/15 bg-[#0a0a0c] shadow-2xl ring-1 ring-white/5">
                <ImageWithFallback
                  src={gallery[lightbox].image}
                  alt={gallery[lightbox].label}
                  className="block w-auto max-w-full max-h-[70vh] object-contain"
                />
              </div>
              <p className="text-center mt-5 text-white font-medium">{gallery[lightbox].label}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
