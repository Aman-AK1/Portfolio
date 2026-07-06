import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export type Certificate = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
};

interface CertificatesModalProps {
  open: boolean;
  onClose: () => void;
  certificates: Certificate[];
  activeIndex: number | null;
  setActiveIndex: (i: number | null) => void;
}

export function CertificatesModal({
  open,
  onClose,
  certificates,
  activeIndex,
  setActiveIndex,
}: CertificatesModalProps) {
  const isLightbox = activeIndex !== null;

  const next = useCallback(() => {
    setActiveIndex(((activeIndex ?? 0) + 1) % certificates.length);
  }, [activeIndex, certificates.length, setActiveIndex]);

  const prev = useCallback(() => {
    setActiveIndex(((activeIndex ?? 0) - 1 + certificates.length) % certificates.length);
  }, [activeIndex, certificates.length, setActiveIndex]);

  // Keyboard controls
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isLightbox) setActiveIndex(null);
        else onClose();
      } else if (isLightbox && e.key === "ArrowRight") {
        next();
      } else if (isLightbox && e.key === "ArrowLeft") {
        prev();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, isLightbox, next, prev, onClose, setActiveIndex]);

  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  const active = isLightbox ? certificates[activeIndex as number] : null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="cert-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-2xl"
            onClick={() => (isLightbox ? setActiveIndex(null) : onClose())}
          />

          {/* Glass Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="relative w-full max-w-6xl max-h-[88vh] overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0c]/80 backdrop-blur-2xl shadow-2xl flex flex-col"
          >
            {/* Ambient glow */}
            <div className="absolute -top-24 left-1/4 w-[400px] h-[400px] bg-purple-500/15 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute -bottom-24 right-1/4 w-[360px] h-[360px] bg-blue-500/15 rounded-full blur-[140px] pointer-events-none" />

            {/* Header */}
            <div className="relative flex items-center justify-between px-6 md:px-10 py-6 border-b border-white/5 shrink-0">
              <div>
                <h3 className="text-sm font-mono text-indigo-400 uppercase tracking-widest mb-1">Proof of the Journey</h3>
                <p className="text-xl md:text-2xl font-semibold tracking-tight text-white">All Certificates</p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Gallery Grid */}
            <div className="relative overflow-y-auto p-6 md:p-10 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {certificates.map((cert, i) => (
                  <motion.button
                    key={cert.id}
                    onClick={() => setActiveIndex(i)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    whileHover={{ y: -6 }}
                    className="group text-left rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] hover:border-white/20 transition-colors shadow-lg"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#111113]">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />
                      <ImageWithFallback
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="text-white font-medium text-sm md:text-base truncate">{cert.title}</h4>
                      <p className="text-white/50 text-xs md:text-sm truncate">{cert.subtitle}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Fullscreen Lightbox */}
          <AnimatePresence>
            {active && (
              <motion.div
                key="lightbox"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 z-[110] flex items-center justify-center p-4 sm:p-8"
              >
                <div
                  className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
                  onClick={() => setActiveIndex(null)}
                />

                {/* Ambient glow */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[160px] pointer-events-none" />

                {/* Close */}
                <button
                  onClick={() => setActiveIndex(null)}
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-colors backdrop-blur-md"
                  aria-label="Close preview"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Prev */}
                <button
                  onClick={prev}
                  className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-6 z-30 w-11 h-11 md:w-14 md:h-14 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-white transition-colors backdrop-blur-md shadow-lg"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                </button>

                {/* Next */}
                <button
                  onClick={next}
                  className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-6 z-30 w-11 h-11 md:w-14 md:h-14 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-white transition-colors backdrop-blur-md shadow-lg"
                  aria-label="Next"
                >
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                </button>

                {/* Image + caption */}
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 26 }}
                  className="relative z-20 flex flex-col items-center w-full max-w-3xl px-12 sm:px-16"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Certificate — fully visible, never cropped */}
                  <div className="rounded-[1.25rem] overflow-hidden border border-white/15 bg-[#0a0a0c] shadow-2xl ring-1 ring-white/5">
                    <ImageWithFallback
                      src={active.image}
                      alt={active.title}
                      className="block w-auto max-w-full max-h-[62vh] sm:max-h-[68vh] object-contain"
                    />
                  </div>

                  {/* Caption */}
                  <div className="text-center mt-5 sm:mt-6 max-w-lg">
                    <h4 className="text-lg sm:text-2xl font-semibold text-white leading-snug">{active.title}</h4>
                    <p className="text-white/50 mt-1 text-sm sm:text-base">{active.subtitle}</p>
                    <div className="inline-flex items-center gap-2 mt-4 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                      <span className="text-white/40 text-xs font-mono">
                        {(activeIndex as number) + 1} / {certificates.length}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
