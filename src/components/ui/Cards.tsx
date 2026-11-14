import Link from "next/link";
import type { Package, Product, Project } from "@/content/types";
import { getService } from "@/content/services";
import { cn, formatLKR, toneHex, vars } from "@/lib/utils";
import { Media } from "./Media";

/* ---------------------------------------------------------------- Package */

export function PackageCard({
  pkg,
  href,
  accent = "#0078FF",
  index = 0,
}: {
  pkg: Package;
  href: string;
  /** Background of the highlighted card (a service tone). */
  accent?: string;
  index?: number;
}) {
  const hi = pkg.highlighted;
  // Light tones (photo, social) need dark text on the highlighted card.
  const lightAccent = ["#2B93FF", "#00C2FF"].includes(accent.toUpperCase());
  const hiText = lightAccent ? "#05070D" : "#FFFFFF";

  return (
    <div
      data-reveal
      style={{ ...vars({ "--i": index }), ...(hi ? { background: accent, color: hiText } : {}) }}
      className={cn(
        "lift flex flex-col gap-5 rounded-card p-8",
        hi ? "" : "border border-white/10 bg-surface",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-[15px] font-semibold">{pkg.name}</p>
        {hi ? (
          <span
            className="rounded-full px-3 py-1.5 text-xs font-semibold"
            style={{ background: lightAccent ? "#05070D" : "#FFFFFF", color: lightAccent ? "#FFFFFF" : "#0047B3" }}
          >
            Most popular
          </span>
        ) : null}
      </div>
      <p className="font-display text-[40px] leading-none font-bold tracking-[-0.03em]">
        <span className={cn("font-sans text-[15px] font-medium tracking-normal", hi ? "" : "text-muted")}>
          from LKR{" "}
        </span>
        {formatLKR(pkg.priceFrom)}
      </p>
      <p className={cn("text-sm leading-normal", hi ? "opacity-90" : "text-muted")}>{pkg.blurb}</p>
      <ul
        className={cn(
          "flex flex-grow flex-col gap-3 border-t pt-5 text-sm",
          hi ? (lightAccent ? "border-black/20" : "border-white/30") : "border-white/10 text-soft",
        )}
      >
        {pkg.features.map((f) => (
          <li key={f} className="flex gap-2.5">
            <span aria-hidden="true">✓</span>
            {f}
          </li>
        ))}
      </ul>
      <Link
        href={href}
        className={cn(
          "rounded-full p-3.5 text-center text-[15px] font-semibold transition-colors",
          hi
            ? lightAccent
              ? "bg-bg text-white hover:bg-black"
              : "bg-white text-web hover:bg-white/90"
            : "border border-white/25 hover:bg-white/10",
        )}
      >
        {pkg.cta}
      </Link>
    </div>
  );
}

/* ---------------------------------------------------------------- Project */

export function ProjectCard({
  project,
  className,
  mediaClassName = "h-[400px]",
  sizes = "(min-width: 1024px) 33vw, 90vw",
  index = 0,
}: {
  project: Project;
  className?: string;
  mediaClassName?: string;
  sizes?: string;
  index?: number;
}) {
  const service = getService(project.service);
  const tone = service ? toneHex[service.tone] : "#0078FF";
  return (
    <article className={cn("group", className)} data-reveal style={vars({ "--i": index })}>
      <Link href={`/work/${project.slug}`} className="block" data-cursor="View">
        <div className={cn("relative overflow-hidden rounded-card bg-card", mediaClassName)}>
          <div className="absolute inset-0 transition-transform duration-700 ease-(--ease-expo) group-hover:scale-[1.04]">
            <Media media={project.cover} tone={tone} sizes={sizes} />
          </div>
        </div>
        <div className="flex items-start justify-between gap-4 px-1 pt-4.5">
          <div>
            <h3 className="font-sans text-xl font-semibold">{project.title}</h3>
            <p className="mt-1 text-sm text-muted">{project.discipline}</p>
          </div>
          <span className="text-[13px] text-muted">{project.year}</span>
        </div>
      </Link>
    </article>
  );
}

/* ---------------------------------------------------------------- Product */

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <article className="group" data-reveal style={vars({ "--i": index })}>
      <Link href={`/shop/${product.slug}`} className="block">
        <div className="relative aspect-4/5 overflow-hidden rounded-media bg-card">
          <div className="absolute inset-0 transition-transform duration-700 ease-(--ease-expo) group-hover:scale-[1.04]">
            <Media media={product.images[0]} sizes="(min-width: 1024px) 25vw, 70vw" />
          </div>
          <span className="absolute top-3 left-3 rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-semibold tracking-[0.12em] uppercase backdrop-blur">
            {product.type === "DIGITAL" ? "Digital" : "Physical"}
          </span>
          <span className="absolute inset-x-3 bottom-3 translate-y-3 rounded-full bg-white py-3 text-center text-sm font-semibold text-bg opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            View product
          </span>
        </div>
        <div className="flex justify-between gap-3 px-1 pt-3.5 text-[15px]">
          <span className="font-semibold">{product.name}</span>
          <span className="shrink-0 text-muted">LKR {formatLKR(product.price, "[0,000]")}</span>
        </div>
      </Link>
    </article>
  );
}
