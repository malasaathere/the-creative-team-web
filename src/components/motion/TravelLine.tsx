"use client";

import { useEffect, useRef } from "react";
import { getGsap, prefersReducedMotion } from "./gsap";

// One continuous line that weaves through the home page sections (drawn
// on a 1440 × 9200 canvas and stretched to the page height).
const D =
  "M -40 1010 C 420 930 980 1130 1480 1040 C 1720 1000 1640 1700 1240 1760 C 760 1830 180 1760 110 2140 C 80 2260 1220 2200 1220 2340 C 1220 2480 220 2500 220 2655 C 220 2810 1220 2810 1220 2970 C 1220 3130 220 3130 220 3283 C 220 3440 1220 3440 1220 3597 C 1220 3760 1300 3950 1200 4010 C 700 4090 160 3990 90 4380 C 40 4700 760 4720 1380 4800 C 1620 4830 1500 5200 1100 5230 C 640 5260 200 5210 110 5480 C 30 5760 700 6380 1350 6420 C 1600 6440 1500 6950 1040 6980 C 600 7010 150 6990 100 7300 C 60 7600 800 7700 1360 7760 C 1600 7790 1450 8300 1000 8380 C 760 8420 660 8560 720 8700";

/**
 * The signature travelling line. Sits behind the home page content and is
 * drawn on as you scroll; its colour passes through each service's blue.
 * Desktop only — phones skip it to keep scrolling light.
 */
export function TravelLine() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const paths = svg.querySelectorAll("path");
    if (prefersReducedMotion()) {
      paths.forEach((p) => (p.style.strokeDashoffset = "0"));
      return;
    }
    const { gsap } = getGsap();
    const tween = gsap.fromTo(
      paths,
      { strokeDashoffset: 1 },
      {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: svg.parentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      viewBox="0 0 1440 9200"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 z-[1] hidden h-full w-full lg:block"
    >
      <defs>
        <linearGradient id="lineTone" gradientUnits="userSpaceOnUse" x1="0" y1="900" x2="0" y2="8800">
          <stop offset="0" stopColor="#0078FF" />
          <stop offset="0.22" stopColor="#2B93FF" />
          <stop offset="0.42" stopColor="#4A6FE8" />
          <stop offset="0.62" stopColor="#0047B3" />
          <stop offset="0.8" stopColor="#00C2FF" />
          <stop offset="1" stopColor="#0078FF" />
        </linearGradient>
      </defs>
      {[
        { w: 10, o: 0.25, blur: true },
        { w: 3, o: 1, blur: false },
      ].map((s) => (
        <path
          key={s.w}
          d={D}
          pathLength={1}
          fill="none"
          stroke="url(#lineTone)"
          strokeWidth={s.w}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          opacity={s.o}
          style={{ strokeDasharray: 1, strokeDashoffset: 1, filter: s.blur ? "blur(8px)" : undefined }}
        />
      ))}
    </svg>
  );
}
