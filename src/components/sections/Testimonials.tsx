"use client";

import { useEffect, useState } from "react";
import type { Testimonial } from "@/content/types";
import { cn, vars } from "@/lib/utils";
import { prefersReducedMotion } from "../motion/gsap";

/** One large quote at a time; words fade in one by one; auto-advances. */
export function Testimonials({ items }: { items: Testimonial[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const t = items[i];

  useEffect(() => {
    if (items.length < 2 || paused || prefersReducedMotion()) return;
    const id = window.setTimeout(() => setI((n) => (n + 1) % items.length), 7000);
    return () => window.clearTimeout(id);
  }, [i, paused, items.length]);

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)}>
      <figure key={i} aria-live="polite">
        <blockquote className="font-display text-[clamp(26px,3vw,40px)] leading-[1.25] font-semibold tracking-[-0.02em]">
          “
          {t.quote.split(" ").map((w, k, all) => (
            <span key={k} className="fade-up inline-block" style={vars({ "--delay": `${k * 0.03}s` })}>
              {w}
              {k < all.length - 1 ? "\u00a0" : null}
            </span>
          ))}
          ”
        </blockquote>
        <figcaption className="mt-7 text-[15px] text-muted">
          {t.name} · {t.company}
        </figcaption>
      </figure>
      {items.length > 1 ? (
        <div className="mt-10 flex justify-center gap-2">
          {items.map((_, k) => (
            <button
              key={k}
              type="button"
              onClick={() => setI(k)}
              aria-label={`Show quote ${k + 1} of ${items.length}`}
              aria-current={k === i}
              className={cn("h-1.5 rounded-full transition-all duration-500", k === i ? "w-8 bg-blue" : "w-1.5 bg-white/30")}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
