import type { Service } from "@/content/types";
import { cn } from "@/lib/utils";

const paths: Record<Service["icon"], React.ReactNode> = {
  pen: (
    <>
      <path pathLength={1} d="M30 8l10 10-20 20H10V28z" />
      <path pathLength={1} d="M26 12l10 10" />
      <path pathLength={1} d="M10 38l8-2" />
    </>
  ),
  camera: (
    <>
      <rect pathLength={1} x="6" y="14" width="36" height="26" rx="5" />
      <path pathLength={1} d="M17 14l3-5h8l3 5" />
      <circle pathLength={1} cx="24" cy="27" r="7" />
    </>
  ),
  play: (
    <>
      <circle pathLength={1} cx="24" cy="24" r="18" />
      <path pathLength={1} d="M20 16l12 8-12 8z" />
    </>
  ),
  browser: (
    <>
      <rect pathLength={1} x="5" y="9" width="38" height="28" rx="4" />
      <path pathLength={1} d="M5 16h38" />
      <path pathLength={1} d="M19 27l-4-3 4-3M29 21l4 3-4 3" />
      <path pathLength={1} d="M17 42h14" />
    </>
  ),
  growth: (
    <>
      <path pathLength={1} d="M6 38l11-12 8 7 17-19" />
      <path pathLength={1} d="M32 14h10v10" />
    </>
  ),
};

/** Line icon that draws itself when its parent is revealed (see .draw-icon in globals.css). */
export function ServiceIcon({ icon, size = 88, className }: { icon: Service["icon"]; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("draw-icon", className)}
    >
      {paths[icon]}
    </svg>
  );
}
