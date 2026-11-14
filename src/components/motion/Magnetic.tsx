"use client";

import { useRef, type ReactNode } from "react";
import { isFinePointer, prefersReducedMotion } from "./gsap";

/** Leans its child up to `strength` px toward the cursor. */
export function Magnetic({ children, strength = 12 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || !isFinePointer() || prefersReducedMotion()) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className="inline-block transition-transform duration-500 ease-(--ease-expo)"
    >
      {children}
    </span>
  );
}
