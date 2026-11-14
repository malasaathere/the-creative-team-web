"use client";

import { useEffect, useRef, useState } from "react";
import { isFinePointer, prefersReducedMotion } from "./gsap";

/**
 * A blue circle that follows the pointer and shows a label ("View",
 * "Drag", "Play") over anything marked `data-cursor="Label"`.
 * Desktop mice only; the normal cursor stays visible for accessibility.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!isFinePointer() || prefersReducedMotion()) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- enable only after we know the device
    setEnabled(true);

    let x = 0,
      y = 0,
      cx = 0,
      cy = 0,
      raf = 0;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const target = (e.target as Element | null)?.closest?.("[data-cursor]");
      setLabel(target ? target.getAttribute("data-cursor") : null);
    };
    const loop = () => {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      if (ref.current) ref.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none fixed top-0 left-0 z-[70]">
      <div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-blue text-sm font-semibold text-white transition-[width,height,opacity] duration-300 ease-(--ease-expo)"
        style={{ width: label ? 92 : 0, height: label ? 92 : 0, opacity: label ? 1 : 0 }}
      >
        {label}
      </div>
    </div>
  );
}
