import { ImageWithFallback } from "./figma/ImageWithFallback";

// Sample brand image used inside the logo mark. Swap this out for the real
// AK logo asset whenever it's ready.
const LOGO_IMAGE =
  "https://images.unsplash.com/photo-1658998765622-962cb51e7888?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdyYWRpZW50JTIwcHVycGxlJTIwYmx1ZSUyMGxvZ28lMjBtYXJrJTIwbWluaW1hbHxlbnwxfHx8fDE3ODMwOTg1Nzl8MA&ixlib=rb-4.1.0&q=80&w=400";

interface AKLogoProps {
  /** Pixel size of the square logo mark. Defaults to 32. */
  size?: number;
  /** Whether to show the "AK" wordmark next to the mark. Defaults to true. */
  showWordmark?: boolean;
  className?: string;
}

/**
 * AK brand mark — a premium glassmorphism image tile matching the site's
 * dark, luxury SaaS aesthetic. Used everywhere the brand identity appears.
 */
export function AKLogo({ size = 32, showWordmark = true, className = "" }: AKLogoProps) {
  return (
    <span className={`flex items-center gap-2.5 group ${className}`}>
      <span
        className="relative flex items-center justify-center rounded-xl border border-white/10 overflow-hidden shrink-0 transition-all duration-300 group-hover:border-white/25 shadow-lg shadow-black/30"
        style={{ width: size, height: size }}
      >
        {/* Soft accent glow */}
        <span className="absolute -inset-2 bg-gradient-to-br from-purple-500/40 via-indigo-500/20 to-blue-500/40 blur-lg opacity-60 transition-opacity duration-300 group-hover:opacity-90" />
        {/* Brand image */}
        <ImageWithFallback
          src={LOGO_IMAGE}
          alt="AK logo"
          className="relative w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Inner sheen + subtle vignette */}
        <span className="absolute inset-0 rounded-xl bg-gradient-to-tr from-black/30 via-transparent to-white/15 pointer-events-none" />
      </span>
      {showWordmark && (
        <span className="font-semibold text-lg tracking-tight text-white">AK</span>
      )}
    </span>
  );
}
