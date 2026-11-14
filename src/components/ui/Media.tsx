import Image from "next/image";
import type { MediaRef } from "@/content/types";
import { cn } from "@/lib/utils";

type Props = {
  media: MediaRef;
  /** Hex used to tint the placeholder. */
  tone?: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * Shows a real image when `media.src` is set, otherwise a branded
 * placeholder (navy with a soft tone glow and a label) so the layout is
 * complete before the photos arrive. Always fills its parent.
 */
export function Media({ media, tone = "#0078FF", className, imgClassName, sizes = "100vw", priority }: Props) {
  if (media.src) {
    return (
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", imgClassName, className)}
        style={media.position ? { objectPosition: media.position } : undefined}
      />
    );
  }

  return (
    <div
      role={media.alt ? "img" : undefined}
      aria-label={media.alt || undefined}
      aria-hidden={media.alt ? undefined : true}
      className={cn("absolute inset-0 overflow-hidden bg-card", imgClassName, className)}
    >
      <div
        className="absolute -inset-1/4"
        style={{
          background: `radial-gradient(60% 55% at 70% 25%, ${tone}55, transparent 70%), radial-gradient(50% 45% at 15% 90%, ${tone}33, transparent 70%)`,
        }}
      />
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.18]"
        viewBox="0 0 400 300"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M-20 220 C 80 140, 160 260, 240 170 S 360 60, 420 120"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {media.placeholder ? (
        <span className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs text-white/70 backdrop-blur">
          [{media.placeholder}]
        </span>
      ) : null}
    </div>
  );
}
