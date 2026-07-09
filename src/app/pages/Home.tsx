import { Link } from "react-router";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { ArrowRight, ChevronRight, Code2, Database, Layout, Smartphone, Github, ExternalLink, Star, GitMerge, FileCode2, Terminal, Briefcase, ArrowUpRight, MonitorPlay, Download, Mail } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { TechnicalEcosystem } from "../components/TechnicalEcosystem";
import { useRef, useEffect, useState } from "react";
import heroImage from "../../assests/images/HeroImage.png"
//projects 
import resumeIQDesktop from "../../assests/projects/resumeIQ/resumeIQHero.png"
import GLOFHero from "../../assests/projects/GLOF Tracker/GLOFHero.png"
import EVJointsHero from "../../assests/projects/EVJoints/EVJointsHero.png"


const AnimatedNumber = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const duration = 2000;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        setDisplayValue(Math.floor(easeProgress * value));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [value, isInView]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
};

const projects = [
  {
    id: "nexus",
    title: "ResumeIQ",
    category: "Full Stack Project",
    metrics: "AI-Powered Resume Analysis",
    image: resumeIQDesktop,
    tags: ["Node.js", "React", "MongoDB", "puppeteer"],
    description: "An AI-powered interview preparation platform that analyzes resumes against job descriptions, generates personalized interview questions, identifies skill gaps, and creates ATS-optimized resumes with intelligent PDF generation.",
  },
  {
    id: "aether",
    title: "GLOF Tracker",
    category: "RESEARCH & MAJOR PROJECT",
    metrics: "Disaster Management",
    image: GLOFHero,
    tags: ["React", "Node.js", "Tailwind CSS", "REST APIs"],
    description: "A web platform designed to visualize Glacial Lake Outburst Flood (GLOF) risk zones using satellite imagery, terrain data, and interactive maps. Built to help users understand potential flood threats through an intuitive interface.",
  },
  {
    id: "chronos",
    title: "EVJoints",
    category: "INTERNSHIP PROJECT",
    metrics: "UI/UX • Product Design",
    image: EVJointsHero,
    tags: ["React ", "Figma", "UI/UX", "Tailwind"],
    description: "Designed and developed modern, user-centric interfaces for an EV ecosystem platform featuring trip planning, charging discovery, EV tools, and educational resources to improve the electric vehicle experience.",
  },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section */}
      <section className="relative pt-24 pb-10 md:pt-32 md:pb-10 px-6 z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8 flex flex-col items-center md:items-start text-center md:text-left space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/70"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Open to Software Engineering Opportunities
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50 text-center md:text-left w-full"
            >
              Building robust systems <br />
              <span className="text-white/40 italic font-light">&</span> seamless experiences.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-white/60 max-w-2xl font-light leading-relaxed"
            >
              I'm Aman Khan, a Computer Engineering graduate passionate about building scalable web
              applications and intuitive digital experiences. From full-stack development to UI/UX design,
              I enjoy transforming complex ideas into products that are fast, clean, and impactful.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 md:flex md:flex-wrap items-center gap-3 md:gap-4 w-full md:w-auto"
            >
              <Link to="/projects" className="justify-center w-full md:w-auto px-4 md:px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-all flex items-center gap-2 text-sm md:text-base">
                <Briefcase className="w-4 h-4" /> View My Work
              </Link>
              <a href="https://github.com/Aman-AK1" target="_blank" rel="noreferrer" className="justify-center w-full md:w-auto px-4 md:px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2 font-medium text-white text-sm md:text-base">
                <Github className="w-4 h-4" /> GitHub
              </a>
              <a href="/ResumeCon.pdf" download className="justify-center w-full md:w-auto px-4 md:px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2 font-medium text-white text-sm md:text-base">
                <Download className="w-4 h-4" /> Resume
              </a>
              <Link to="/contact" className="justify-center w-full md:w-auto px-4 md:px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2 font-medium text-white text-sm md:text-base">
                <Mail className="w-4 h-4" /> Contact Me
              </Link>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
            className="lg:col-span-4 relative hidden md:block"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-fuchsia-500/20 blur-2xl rounded-full" />
            <div className="relative rounded-xl border border-white/10 bg-[#111113]/80 backdrop-blur-xl p-2 shadow-2xl overflow-hidden">
               <ImageWithFallback 
                 src={heroImage}
                 alt="Profile"
                 className="w-full
h-auto
aspect-[4/5]
object-cover
rounded-xl
grayscale
hover:grayscale-0
hover:scale-[1.02]
transition-all
duration-700
ease-out"
               />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Proof of Work Strip */}
      <section className="border-y border-white/5 bg-white/[0.01] relative z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5">
            <div className="flex flex-col items-center justify-center text-center px-4">
              <span className="text-3xl font-bold text-white mb-1 font-mono"><AnimatedNumber value={6} suffix="+" /></span>
              <span className="text-sm text-white/50 uppercase tracking-wider">Projects Built</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-4">
              <span className="text-3xl font-bold text-white mb-1 font-mono"><AnimatedNumber value={15} suffix="+" /></span>
              <span className="text-sm text-white/50 uppercase tracking-wider">Technologies</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-4">
              <span className="text-3xl font-bold text-white mb-1 font-mono"><AnimatedNumber value={4} suffix="+" /></span>
              <span className="text-sm text-white/50 uppercase tracking-wider">Hackathon Finals</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-4">
              <span className="text-3xl font-bold text-white mb-1 font-mono"><AnimatedNumber value={1} /></span>
              <span className="text-sm text-white/50 uppercase tracking-wider">Industry Internship</span>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Case Studies */}
      <section className="py-10 relative z-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 gap-6 text-center md:text-left">
            <div>
              <h2 className="text-sm font-mono text-indigo-400 uppercase tracking-widest mb-3">Case Studies</h2>
              <p className="text-3xl md:text-5xl font-semibold tracking-tight text-white">Proof of Work</p>
            </div>
            <Link to="/projects" className="group hidden md:flex items-center gap-2 text-white/60 hover:text-white transition-colors">
              <span className="font-medium">View All Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="flex flex-col gap-6 pb-6 relative">
            {projects.map((project, idx) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="sticky flex flex-col md:flex-row gap-6 md:gap-8 items-center bg-[#111113] border border-white/10 p-4 md:p-8 rounded-3xl shadow-2xl origin-top"
                style={{
                  top: `calc(120px + ${idx * 30}px)`,
                  zIndex: 10 + idx,
                }}
              >
                {/* Project Info */}
                <div className="w-full md:w-1/2 flex flex-col justify-center space-y-4 md:pr-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] uppercase tracking-wider font-mono text-white/70">
                      {project.category}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-mono text-green-400">
                      <Star className="w-3 h-3" /> {project.metrics}
                    </span>
                  </div>
                  <Link to={`/projects/${project.id}`}>
                    <h3 className="text-2xl md:text-3xl font-semibold text-white group hover:text-indigo-400 transition-colors inline-flex items-center gap-2">
                      {project.title} <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
                    </h3>
                  </Link>
                  <p className="text-white/60 text-sm md:text-base leading-relaxed font-light line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 rounded-md bg-[#1a1a1c] border border-white/5 text-xs text-white/80">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4 pt-4">
                    <Link to={`/projects/${project.id}`} className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-all">
                      Read More
                    </Link>
                  </div>
                </div>

                {/* Project Image */}
                <Link to={`/projects/${project.id}`} className="w-full md:w-1/2 group block overflow-hidden rounded-2xl border border-white/10 bg-white/5 relative">
                  {/* <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10 duration-500" />
                  <div className="relative overflow-hidden aspect-[16/10] md:aspect-[4/3] bg-[#111113]">
                    <ImageWithFallback 
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div> */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10 duration-500" />
<div className="relative overflow-hidden bg-[#111113] p-2.5">
  <div className="relative overflow-hidden rounded-lg">
    <ImageWithFallback 
      src={project.image}
      alt={project.title}
      className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
    />
  </div>
</div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 flex justify-center md:hidden pb-4 relative z-20">
            <Link to="/projects" className="group flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white/90 hover:bg-white/10 transition-colors">
              <span className="font-medium">View All Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Tech Stack & Skills */}
      <section className="py-10 relative z-10 border-t border-white/5 bg-[#050505]/80 backdrop-blur-3xl px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="w-full flex justify-center">
            <TechnicalEcosystem />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 relative z-10 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-12 md:p-16 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent pointer-events-none" />
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6 relative z-10">Let's build something meaningful.</h2>
            <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto relative z-10">
              Whether you're hiring, collaborating, or simply want to discuss an exciting idea, I'd love to hear from you. Let's build products that people genuinely enjoy using.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
              <Link to="/contact" className="px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-all flex items-center gap-2">
                Let's Talk
              </Link>
              <a href="mailto:amannkhan1204@gmail.com" className="px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2 text-white">
                amannkhan1204@gmail.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
