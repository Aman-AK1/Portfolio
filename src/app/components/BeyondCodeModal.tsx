import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Trophy, Medal } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export type InterestCertificate = { id: string; title: string; subtitle: string; image: string };

export type Interest = {
  id: string;
  title: string;
  emoji: string;
  chip: string;
  accent: string; // "r, g, b"
  story: string;
  images?: string[];
  achievements?: { label: string; icon: "trophy" | "medal" }[];
  certificates?: InterestCertificate[];
};

interface BeyondCodeModalProps {
  interest: Interest | null;
  onClose: () => void;
}

export function BeyondCodeModal({ interest, onClose }: BeyondCodeModalProps) {
  const [slide, setSlide] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const open = interest !== null;
  const images = interest?.images ?? [];
  const certs = interest?.certificates ?? [];
  const accent = interest?.accent ?? "168, 85, 247";

  // Reset internal state whenever a new interest opens/closes
  useEffect(() => {
    setSlide(0);
    setLightbox(null);
  }, [interest?.id]);

  const nextSlide = useCallback(() => {
    if (!images.length) return;
    setSlide((s) => (s + 1) % images.length);
  }, [images.length]);
  const prevSlide = useCallback(() => {
    if (!images.length) return;
    setSlide((s) => (s - 1 + images.length) % images.length);
  }, [images.length]);

  const nextCert = useCallback(() => {
    setLightbox((i) => (i === null ? i : (i + 1) % certs.length));
  }, [certs.length]);
  const prevCert = useCallback(() => {
    setLightbox((i) => (i === null ? i : (i - 1 + certs.length) % certs.length));
  }, [certs.length]);

  // Keyboard handling
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightbox !== null) setLightbox(null);
        else onClose();
      } else if (lightbox !== null) {
        if (e.key === "ArrowRight") nextCert();
        if (e.key === "ArrowLeft") prevCert();
      } else if (images.length) {
        if (e.key === "ArrowRight") nextSlide();
        if (e.key === "ArrowLeft") prevSlide();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, lightbox, images.length, nextSlide, prevSlide, nextCert, prevCert, onClose]);

  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && interest && (
        <motion.div
          key="beyond-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-2xl" onClick={onClose} />

          {/* Glass modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: "spring", stiffness: 240, damping: 24 }}
            className="relative w-full max-w-4xl max-h-[92vh] sm:max-h-[88vh] overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0c]/85 backdrop-blur-2xl shadow-2xl flex flex-col"
          >
            {/* Ambient glow */}
            <div
              className="absolute -top-24 left-1/4 w-[420px] h-[420px] rounded-full blur-[150px] pointer-events-none opacity-40"
              style={{ backgroundColor: `rgb(${accent})` }}
            />

            {/* Header */}
            <div className="relative flex items-center justify-between px-5 sm:px-8 py-5 border-b border-white/5 shrink-0">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{interest.emoji}</span>
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white leading-none">{interest.title}</h3>
                  <span
                    className="mt-1.5 inline-block text-[11px] font-mono uppercase tracking-wider"
                    style={{ color: `rgb(${accent})` }}
                  >
                    {interest.chip}
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-colors shrink-0"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="relative overflow-y-auto px-5 sm:px-8 py-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {/* ---- Image carousel ---- */}
              {images.length > 0 && (
                <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#111113] h-[240px] sm:h-[300px] lg:h-[340px] group select-none">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                      key={slide}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.18}
                      onDragEnd={(_, info) => {
                        if (info.offset.x < -60) nextSlide();
                        else if (info.offset.x > 60) prevSlide();
                      }}
                      initial={{ opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 cursor-grab active:cursor-grabbing"
                    >
                      <ImageWithFallback
                        src={images[slide]}
                        alt={`${interest.title} ${slide + 1}`}
                        loading="lazy"
                        className="w-full h-full object-cover pointer-events-none"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </motion.div>
                  </AnimatePresence>

                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevSlide}
                        className="absolute top-1/2 -translate-y-1/2 left-3 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 border border-white/15 backdrop-blur-md flex items-center justify-center text-white/80 hover:bg-black/60 hover:text-white transition-colors"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextSlide}
                        className="absolute top-1/2 -translate-y-1/2 right-3 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 border border-white/15 backdrop-blur-md flex items-center justify-center text-white/80 hover:bg-black/60 hover:text-white transition-colors"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>

                      {/* Dots */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
                        {images.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setSlide(i)}
                            aria-label={`Go to image ${i + 1}`}
                            className="h-1.5 rounded-full transition-all duration-300"
                            style={{
                              width: i === slide ? 20 : 6,
                              backgroundColor: i === slide ? `rgb(${accent})` : "rgba(255,255,255,0.4)",
                            }}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* ---- Certificate gallery ---- */}
              {certs.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {certs.map((cert, i) => (
                    <motion.button
                      key={cert.id}
                      onClick={() => setLightbox(i)}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      whileHover={{ y: -6 }}
                      className="group text-left rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] hover:border-white/25 transition-colors shadow-lg"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-[#111113]">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />
                        <ImageWithFallback
                          src={cert.image}
                          alt={cert.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-3.5">
                        <h4 className="text-white font-medium text-sm truncate">{cert.title}</h4>
                        <p className="text-white/50 text-xs truncate">{cert.subtitle}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* ---- Achievements ---- */}
              {interest.achievements && interest.achievements.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-6">
                  {interest.achievements.map((a) => (
                    <span
                      key={a.label}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-white/85 text-sm font-medium"
                      style={{ boxShadow: `0 0 24px rgba(${accent},0.12)` }}
                    >
                      {a.icon === "trophy" ? (
                        <Trophy className="w-4 h-4 text-amber-300" />
                      ) : (
                        <Medal className="w-4 h-4" style={{ color: `rgb(${accent})` }} />
                      )}
                      {a.label}
                    </span>
                  ))}
                </div>
              )}

              {/* ---- Story ---- */}
              <p className="text-white/70 text-base sm:text-lg leading-relaxed font-light mt-6">
                {interest.story}
              </p>
            </div>
          </motion.div>

          {/* ---- Certificate lightbox ---- */}
          <AnimatePresence>
            {lightbox !== null && certs[lightbox] && (
              <motion.div
                key="cert-lightbox"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 z-[110] flex items-center justify-center p-4 sm:p-8"
              >
                <div className="absolute inset-0 bg-black/90 backdrop-blur-2xl" onClick={() => setLightbox(null)} />

                <button
                  onClick={() => setLightbox(null)}
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-colors backdrop-blur-md"
                  aria-label="Close preview"
                >
                  <X className="w-5 h-5" />
                </button>
                <button
                  onClick={prevCert}
                  className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-6 z-30 w-11 h-11 md:w-14 md:h-14 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-white transition-colors backdrop-blur-md shadow-lg"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                <button
                  onClick={nextCert}
                  className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-6 z-30 w-11 h-11 md:w-14 md:h-14 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-white transition-colors backdrop-blur-md shadow-lg"
                  aria-label="Next"
                >
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                </button>

                <motion.div
                  key={certs[lightbox].id}
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 26 }}
                  className="relative z-20 flex flex-col items-center w-full max-w-3xl px-12 sm:px-16"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="rounded-[1.25rem] overflow-hidden border border-white/15 bg-[#0a0a0c] shadow-2xl ring-1 ring-white/5">
                    <ImageWithFallback
                      src={certs[lightbox].image}
                      alt={certs[lightbox].title}
                      className="block w-auto max-w-full max-h-[62vh] sm:max-h-[68vh] object-contain"
                    />
                  </div>
                  <div className="text-center mt-5 sm:mt-6 max-w-lg">
                    <h4 className="text-lg sm:text-2xl font-semibold text-white leading-snug">{certs[lightbox].title}</h4>
                    <p className="text-white/50 mt-1 text-sm sm:text-base">{certs[lightbox].subtitle}</p>
                    <div className="inline-flex items-center gap-2 mt-4 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                      <span className="text-white/40 text-xs font-mono">
                        {lightbox + 1} / {certs.length}
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
