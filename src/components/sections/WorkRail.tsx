"use client";

import { useEffect, useRef } from "react";
import type { Project } from "@/content/types";
import { ProjectCard } from "../ui/Cards";
import { getGsap, prefersReducedMotion } from "../motion/gsap";

/**
 * Selected work: on desktop the section pins and the row of projects
 * slides sideways as you scroll. On phones (or with reduced motion) it
 * is a normal swipeable row.
 */
export function WorkRail({ projects }: { projects: Project[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const { gsap, ScrollTrigger } = getGsap();
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const el = track.current!;
      const distance = () => Math.max(0, el.scrollWidth - window.innerWidth + 80);
      gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top+=80",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      ScrollTrigger.refresh();
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={wrap} className="overflow-hidden">
      <div
        ref={track}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:px-6 lg:snap-none lg:overflow-visible lg:pr-20 lg:pl-[max(40px,calc((100vw-1280px)/2))]"
      >
        {projects.map((p, i) => (
          <ProjectCard
            key={p.slug}
            project={p}
            index={i}
            className={i === 0 ? "w-[85vw] shrink-0 snap-start sm:w-[560px]" : "w-[78vw] shrink-0 snap-start sm:w-[400px]"}
            mediaClassName="h-[360px] lg:h-[420px]"
            sizes="(min-width: 640px) 560px, 85vw"
          />
        ))}
      </div>
    </div>
  );
}
