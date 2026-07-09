import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Send, Loader2, Check, Sparkles, AlertCircle } from "lucide-react";

type Status = "idle" | "loading" | "sent" | "error";

const openTo = [
  "Software Engineering",
  "Frontend Development",
  "UI/UX Design",
  "Remote & On-site Opportunities",
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

function Confetti() {
  const colors = ["#a855f7", "#6366f1", "#3b82f6", "#ffffff", "#f0abfc"];
  const pieces = Array.from({ length: 14 });
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-visible">
      {pieces.map((_, i) => {
        const angle = (i / pieces.length) * Math.PI * 2;
        const dist = 60 + Math.random() * 40;
        const x = Math.cos(angle) * dist;
        const y = Math.sin(angle) * dist - 10;
        return (
          <motion.span
            key={i}
            initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            animate={{ opacity: 0, x, y, scale: 0.4, rotate: Math.random() * 240 - 120 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="absolute w-1.5 h-1.5 rounded-[1px]"
            style={{ backgroundColor: colors[i % colors.length] }}
          />
        );
      })}
    </div>
  );
}

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [fieldErrors, setFieldErrors] = useState<{ [k: string]: string }>({});

  const btnRef = useRef<HTMLButtonElement>(null);
  const [magnet, setMagnet] = useState({ x: 0, y: 0 });
  const handleMagnet = (e: React.MouseEvent) => {
    const el = btnRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setMagnet({ x: (e.clientX - (r.left + r.width / 2)) * 0.2, y: (e.clientY - (r.top + r.height / 2)) * 0.35 });
  };
  const resetMagnet = () => setMagnet({ x: 0, y: 0 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // clear error for that field as user types
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const errors: { [k: string]: string } = {};
    if (!form.name.trim()) errors.name = "Please enter your name";
    if (!form.email.trim()) {
      errors.email = "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = "Please enter a valid email";
    }
    if (!form.message.trim()) errors.message = "Please tell me a bit about why you're reaching out";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading" || status === "sent") return;

    if (!validate()) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY, // get free at web3forms.com
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `New portfolio message from ${form.name}`,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 4400);
      } else {
        throw new Error(data.message || "Something went wrong");
      }
    } catch (err: any) {
      setStatus("error");
      setErrorMsg("Couldn't send your message. Please try again or email me directly.");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const inputClass = (field: string) =>
    `w-full bg-white/[0.03] border rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:ring-4 transition-all duration-300 ${
      fieldErrors[field]
        ? "border-red-400/60 focus:border-red-400/60 focus:ring-red-500/10"
        : "border-white/10 focus:border-indigo-400/50 focus:bg-white/[0.05] focus:ring-indigo-500/10 focus:shadow-[0_0_30px_rgba(99,102,241,0.15)]"
    }`;

  return (
    <div className="pt-24 md:pt-28 pb-10 text-white/90 relative">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* ---------------- LEFT ---------------- */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-xl mb-8 shadow-[0_0_25px_rgba(99,102,241,0.12)]"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="text-sm font-medium text-white/80">Open to Software Engineering Opportunities</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-semibold text-white mb-6 tracking-tight leading-[1.05]">
              Let's build <br /> something <br /> exceptional.
            </h1>

            <p className="text-lg md:text-xl text-white/55 font-light mb-12 max-w-md leading-relaxed">
              Whether you're looking for a software engineer, frontend developer, UI/UX designer, or
              simply want to discuss an exciting idea, I'd love to hear from you.
            </p>

            <div className="space-y-8">
              <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                <div className="flex items-start gap-4 lg:flex-1">
                  <div className="size-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 shrink-0">
                    <Mail className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Email</h3>
                    <a href="mailto:amannkhan1204@gmail.com" className="text-white/60 hover:text-white transition-colors">
                      amannkhan1204@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 lg:flex-1">
                  <div className="size-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 shrink-0">
                    <Sparkles className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-3">Open To</h3>
                    <ul className="space-y-2.5">
                      {openTo.map((item) => (
                        <li key={item} className="flex items-center gap-2.5 text-white/60">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)] shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ---------------- RIGHT (FORM) ---------------- */}
          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.15 }} className="relative">
            <div className="absolute -inset-8 pointer-events-none">
              <div className="absolute top-0 right-0 w-72 h-72 bg-purple-600/20 rounded-full blur-[110px]" />
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-600/15 rounded-full blur-[110px]" />
            </div>

            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="relative bg-white/[0.03] border border-white/10 rounded-3xl p-7 md:p-10 backdrop-blur-xl shadow-2xl overflow-hidden"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              <div className="absolute -top-1/2 -right-1/4 w-1/2 h-full bg-gradient-to-b from-white/[0.06] to-transparent rotate-12 pointer-events-none" />

              <form className="relative z-10 space-y-6" onSubmit={handleSubmit} noValidate>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={inputClass("name")}
                    placeholder="Jane Doe"
                  />
                  {fieldErrors.name && (
                    <p className="text-red-400 text-xs flex items-center gap-1.5 mt-1">
                      <AlertCircle className="size-3.5" /> {fieldErrors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass("email")}
                    placeholder="jane@company.com"
                  />
                  {fieldErrors.email && (
                    <p className="text-red-400 text-xs flex items-center gap-1.5 mt-1">
                      <AlertCircle className="size-3.5" /> {fieldErrors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">What brings you here?</label>
                  <textarea
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    className={`${inputClass("message")} resize-none`}
                    placeholder="Tell me a bit about the role, project, or idea..."
                  />
                  {fieldErrors.message && (
                    <p className="text-red-400 text-xs flex items-center gap-1.5 mt-1">
                      <AlertCircle className="size-3.5" /> {fieldErrors.message}
                    </p>
                  )}
                </div>

                <motion.button
                  ref={btnRef}
                  type="submit"
                  disabled={status === "loading" || status === "sent"}
                  onMouseMove={status === "idle" ? handleMagnet : undefined}
                  onMouseLeave={resetMagnet}
                  animate={{ x: magnet.x, y: magnet.y }}
                  transition={{ type: "spring", stiffness: 220, damping: 14 }}
                  className={`relative w-full py-4 rounded-xl font-medium flex items-center justify-center gap-2 overflow-hidden transition-colors duration-500 ${
                    status === "sent"
                      ? "bg-green-500 text-white"
                      : status === "error"
                      ? "bg-red-500 text-white"
                      : "bg-white text-black hover:bg-white/90"
                  }`}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {status === "idle" && (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-2"
                      >
                        Send Message <Send className="size-4" />
                      </motion.span>
                    )}

                    {status === "loading" && (
                      <motion.span
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-2"
                      >
                        <Loader2 className="size-4 animate-spin" />
                        Sending
                      </motion.span>
                    )}

                    {status === "sent" && (
                      <motion.span
                        key="sent"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 18 }}
                        className="flex items-center gap-2"
                      >
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 14, delay: 0.05 }}
                        >
                          <Check className="size-5" />
                        </motion.span>
                        Message Sent
                      </motion.span>
                    )}

                    {status === "error" && (
                      <motion.span
                        key="error"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-2"
                      >
                        <AlertCircle className="size-4" />
                        Failed — Try Again
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {status === "sent" && <Confetti />}
                </motion.button>

                {status === "error" && errorMsg && (
                  <p className="text-red-400 text-sm text-center">{errorMsg}</p>
                )}
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}