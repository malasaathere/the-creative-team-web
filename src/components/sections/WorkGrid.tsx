"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Project } from "@/content/types";
import { cn } from "@/lib/utils";
import { ProjectCard } from "../ui/Cards";

type Filter = { slug: string; label: string };

/** Portfolio grid with a category filter kept in the URL (?service=photography). */
export function WorkGrid({ projects, filters }: { projects: Project[]; filters: Filter[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const active = params.get("service") ?? "all";

  const select = (slug: string) => {
    const q = new URLSearchParams(params);
    if (slug === "all") q.delete("service");
    else q.set("service", slug);
    const qs = q.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  return <WorkGridView projects={projects} filters={filters} active={active} onSelect={select} />;
}

export function WorkGridView({
  projects,
  filters,
  active = "all",
  onSelect,
}: {
  projects: Project[];
  filters: Filter[];
  active?: string;
  onSelect?: (slug: string) => void;
}) {
  const shown = active === "all" ? projects : projects.filter((p) => p.service === active);
  const all = [{ slug: "all", label: "All work" }, ...filters];

  return (
    <div>
      <div role="group" aria-label="Filter by service" className="mb-12 flex flex-wrap gap-2">
        {all.map((f) => {
          const count = f.slug === "all" ? projects.length : projects.filter((p) => p.service === f.slug).length;
          return (
            <button
              key={f.slug}
              type="button"
              aria-pressed={active === f.slug}
              onClick={() => onSelect?.(f.slug)}
              className={cn(
                "rounded-full px-4.5 py-2.5 text-sm transition-colors",
                active === f.slug ? "bg-white font-semibold text-bg" : "border border-line-strong hover:bg-white/10",
              )}
            >
              {f.label} <span className="ml-1 opacity-60">{count}</span>
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {shown.length} projects
      </p>
      <div className="grid gap-x-5 gap-y-12 md:grid-cols-2">
        {shown.map((p, i) => (
          <ProjectCard
            key={p.slug}
            project={p}
            index={i % 2}
            mediaClassName={i % 4 === 0 || i % 4 === 3 ? "h-[420px] lg:h-[520px]" : "h-[420px] lg:h-[520px] md:mt-16"}
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        ))}
      </div>
      {shown.length === 0 ? <p className="py-20 text-center text-muted">No projects in this category yet.</p> : null}
    </div>
  );
}
