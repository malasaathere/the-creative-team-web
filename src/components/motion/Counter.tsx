"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "./gsap";

/** Counts up from 0 when it scrolls into view. `null` shows a placeholder. */
export function Counter({ value, placeholder = "[00]" }: { value: number | null; placeholder?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(value ?? 0);

  useEffect(() => {
    if (value === null || prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const dur = 1600;
      const step = (t: number) => {
        const p = Math.min(1, (t - start) / dur);
        setN(Math.round(value * (1 - Math.pow(1 - p, 4))));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      setN(0);
      raf = requestAnimationFrame(step);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return <span ref={ref}>{value === null ? placeholder : n}</span>;
}
