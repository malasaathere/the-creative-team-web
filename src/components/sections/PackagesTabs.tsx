"use client";

import { useId, useState } from "react";
import type { Service } from "@/content/types";
import { cn, toneHex } from "@/lib/utils";
import { PackageCard } from "../ui/Cards";

type Lite = Pick<Service, "slug" | "shortName" | "tone" | "packages">;

/** Service tabs above three package cards; the middle card takes the service's blue. */
export function PackagesTabs({ services }: { services: Lite[] }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const s = services[active];

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (active + (e.key === "ArrowRight" ? 1 : -1) + services.length) % services.length;
    setActive(next);
    document.getElementById(`${id}-tab-${next}`)?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="Service" className="mb-10 flex flex-wrap justify-center gap-2" onKeyDown={onKey}>
        {services.map((svc, i) => (
          <button
            key={svc.slug}
            id={`${id}-tab-${i}`}
            role="tab"
            type="button"
            aria-selected={i === active}
            aria-controls={`${id}-panel`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className={cn(
              "rounded-full px-4.5 py-2.5 text-sm transition-colors",
              i === active ? "bg-white font-semibold text-bg" : "border border-line-strong hover:bg-white/10",
            )}
          >
            {svc.shortName}
          </button>
        ))}
      </div>
      <div
        key={s.slug}
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${active}`}
        className="grid gap-5 md:grid-cols-3"
      >
        {s.packages.map((p, i) => (
          <PackageCard key={p.id} pkg={p} index={i} accent={toneHex[s.tone]} href={`/book?package=${p.id}`} />
        ))}
      </div>
    </div>
  );
}
