import Image from "next/image";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * The crentive wordmark. Until the real logo file is added (set `site.logo`),
 * this renders a typeset stand-in in the display font with the blue dot.
 */
export function Logo({ className, height = 30 }: { className?: string; height?: number }) {
  if (site.logo) {
    return (
      <Image
        src={site.logo}
        alt="crentive"
        width={height * 4.2}
        height={height}
        className={cn("w-auto", className)}
        style={{ height }}
        priority
      />
    );
  }
  return (
    <span
      className={cn("font-display leading-none font-extrabold tracking-[-0.05em] text-white", className)}
      style={{ fontSize: height }}
    >
      crentive<span className="text-blue">.</span>
    </span>
  );
}
