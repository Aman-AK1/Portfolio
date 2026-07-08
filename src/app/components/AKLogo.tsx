import { ImageWithFallback } from "./figma/ImageWithFallback";
import AKLo from "../../assests/images/PortfolioLogo.jpeg";// Sample brand image used inside the logo mark. Swap this out for the real
// AK logo asset whenever it's ready.
const LOGO_IMAGE = AKLo;
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
