"use client";

import { useRef, useState } from "react";
import type { Award } from "@/content/types";
import { Media } from "../ui/Media";
import { isFinePointer, prefersReducedMotion } from "../motion/gsap";

/** "Proud moments" list. Hovering a row shows its image, which follows the cursor. */
export function AwardsList({ awards }: { awards: Award[] }) {
  const box = useRef<HTMLDivElement>(null);
  const float = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);

  const onMove = (e: React.PointerEvent) => {
    if (!float.current || !box.current || !isFinePointer() || prefersReducedMotion()) return;
    const r = box.current.getBoundingClientRect();
    float.current.style.transform = `translate3d(${e.clientX - r.left - 110}px, ${e.clientY - r.top - 140}px, 0)`;
  };

  return (
    <div ref={box} className="relative" onPointerMove={onMove} onPointerLeave={() => setHover(null)}>
      <div
        ref={float}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 z-10 hidden h-[280px] w-[220px] overflow-hidden rounded-media transition-opacity duration-300 lg:block"
        style={{ opacity: hover === null ? 0 : 1 }}
      >
        {awards.map((a, i) => (
          <div key={i} className="absolute inset-0 transition-opacity duration-300" style={{ opacity: hover === i ? 1 : 0 }}>
            <Media media={a.media} sizes="220px" />
          </div>
        ))}
      </div>
      <ul className="border-b border-white/10">
        {awards.map((a, i) => (
          <li
            key={i}
            onPointerEnter={() => setHover(i)}
            data-reveal
            className="flex justify-between gap-6 border-t border-white/10 px-3 py-5.5 transition-colors hover:bg-surface"
          >
            <span>
              <span className="mb-1 block text-[13px] text-blue-light">{a.kind}</span>
              <span className="text-lg font-semibold">{a.title}</span>
            </span>
            <span className="text-sm text-muted">{a.year}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
