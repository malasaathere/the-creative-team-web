import Link from "next/link";
import type { ReactNode } from "react";
import type { MediaRef } from "@/content/types";
import { cn, vars } from "@/lib/utils";
import { Media } from "./Media";

type Props = {
  eyebrow: string;
  title: string;
  /** Colour of the trailing dot. */
  dotColor?: string;
  intro?: ReactNode;
  children?: ReactNode;
  /** CSS background for the card (see toneWash). */
  background: string;
  breadcrumb?: { label: string; href?: string }[];
  media?: MediaRef;
  mediaTone?: string;
  className?: string;
};

/**
 * The rounded hero card that opens every inner page: colour wash on navy,
 * giant title rising from a mask, short statement and CTA, optional image.
 */
export function PageHero({
  eyebrow,
  title,
  dotColor = "#4FA3FF",
  intro,
  children,
  background,
  breadcrumb,
  media,
  mediaTone,
  className,
}: Props) {
  const words = title.split("\n");
  return (
    <section className={cn("px-2 pt-2 sm:px-4 sm:pt-4", className)}>
      <div
        className="relative flex min-h-[560px] flex-wrap items-stretch overflow-hidden rounded-[24px] sm:rounded-hero lg:min-h-[640px]"
        style={{ background }}
      >
        <div className="relative flex min-w-0 flex-[1_1_560px] flex-col justify-between gap-12 px-6 pt-28 pb-10 sm:px-10 lg:px-14 lg:pt-32 lg:pb-14">
          {breadcrumb ? (
            <nav aria-label="Breadcrumb" className="flex items-center gap-2.5 text-sm text-white/75">
              {breadcrumb.map((b, i) => (
                <span key={b.label} className="flex items-center gap-2.5">
                  {i > 0 ? <span aria-hidden="true">/</span> : null}
                  {b.href ? (
                    <Link href={b.href} className="hover:text-white">
                      {b.label}
                    </Link>
                  ) : (
                    <span aria-current="page">{b.label}</span>
                  )}
                </span>
              ))}
            </nav>
          ) : (
            <span />
          )}
          <div>
            <p className="mb-4.5 text-[13px] tracking-[0.14em] text-white/80 uppercase">{eyebrow}</p>
            <h1
              className={cn(
                "leading-[0.92] font-extrabold tracking-[-0.045em]",
                media ? "text-[clamp(48px,6.2vw,100px)]" : "text-[clamp(52px,8vw,128px)]",
              )}
            >
              {words.map((w, i) => (
                <span key={i} className="mask-line">
                  <span className="rise" style={vars({ "--i": i })}>
                    {w}
                    {i === words.length - 1 ? (
                      <span className="dot-drop" style={{ color: dotColor }}>
                        .
                      </span>
                    ) : null}
                  </span>
                </span>
              ))}
            </h1>
          </div>
          {intro || children ? (
            <div className="fade-up flex max-w-[480px] flex-col gap-5.5">
              {intro ? <div className="text-lg leading-relaxed text-white/85">{intro}</div> : null}
              {children}
            </div>
          ) : null}
        </div>
        {media ? (
          <div className="relative min-h-[360px] flex-[1_1_480px] p-3 sm:p-4">
            <div className="relative h-full min-h-[340px] overflow-hidden rounded-card" data-reveal="clip">
              <div className="absolute inset-0">
                <Media media={media} tone={mediaTone} priority sizes="(min-width: 1024px) 45vw, 100vw" />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
