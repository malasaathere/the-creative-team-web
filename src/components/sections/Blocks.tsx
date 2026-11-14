import Link from "next/link";
import type { MediaRef, Service, Stat } from "@/content/types";
import { alpha, cn, toneHex, vars } from "@/lib/utils";
import { Counter } from "../motion/Counter";
import { Magnetic } from "../motion/Magnetic";
import { Media } from "../ui/Media";
import { PillLink } from "../ui/PillLink";
import { Container, Tag } from "../ui/Section";
import { ServiceIcon } from "../ui/ServiceIcon";

/* ------------------------------------------------------- Client marquee */

export function ClientMarquee({ clients }: { clients: string[] }) {
  const row = [...clients, ...clients];
  return (
    <section aria-label="Clients" className="relative z-[2] flex items-center gap-8 overflow-hidden px-4 py-9 sm:px-8 lg:gap-12 lg:px-14">
      <p className="shrink-0 text-[13px] leading-snug text-muted">
        Trusted by brands
        <br />
        we&apos;ve helped shape
      </p>
      <div className="marquee min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <ul className="marquee-track items-center gap-18 font-display text-xl font-bold text-muted">
          {row.map((c, i) => (
            <li key={i} aria-hidden={i >= clients.length} className="transition-colors hover:text-white">
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------- B&W photo trio */

export function PhotoTrio({ photos }: { photos: MediaRef[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-3">
      {photos.map((m, i) => (
        <figure
          key={i}
          className="group relative h-[360px] overflow-hidden rounded-card bg-card lg:h-[440px]"
          data-reveal="clip"
          style={vars({ "--i": i })}
        >
          <div className="absolute inset-0">
            <Media media={m} imgClassName="bw" sizes="(min-width: 640px) 33vw, 100vw" />
          </div>
        </figure>
      ))}
    </div>
  );
}

/* ------------------------------------------------------- Service rows */

/** Five full-width cards that zig-zag down the page, each in its own blue. */
export function ServiceRows({ services }: { services: Service[] }) {
  return (
    <div className="flex flex-col gap-6">
      {services.map((s, i) => {
        const tone = toneHex[s.tone];
        const right = i % 2 === 1;
        return (
          <article
            key={s.slug}
            data-reveal
            className={cn(
              "lift relative flex w-full max-w-[1000px] flex-wrap justify-between gap-8 overflow-hidden rounded-[28px] border border-white/8 bg-surface p-7 sm:p-10",
              right ? "self-end lg:flex-row-reverse" : "self-start",
            )}
          >
            <div
              aria-hidden="true"
              className={cn("absolute -top-40 size-[520px] rounded-full", right ? "-left-30" : "-right-30")}
              style={{ background: `radial-gradient(circle, ${alpha(tone, s.tone === "web" ? 0.8 : 0.55)}, transparent 65%)` }}
            />
            <div className="relative flex min-w-0 flex-[1_1_480px] flex-col gap-4.5">
              <span className="text-sm font-semibold" style={{ color: s.toneText }}>
                {s.number}
              </span>
              <h3 className="text-[clamp(30px,3.4vw,44px)] leading-[1.05] font-bold tracking-[-0.03em]">{s.name}</h3>
              <p className="max-w-[520px] text-base leading-relaxed text-soft">{s.summary}</p>
              <div className="flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </div>
            <div className={cn("relative flex flex-col justify-between gap-6", right ? "items-start" : "items-start sm:items-end")}>
              <ServiceIcon icon={s.icon} className="text-white" />
              <Link href={`/services/${s.slug}`} className="text-[15px] font-semibold hover:text-white">
                Explore {s.shortName} <span aria-hidden="true">→</span>
                <span className="absolute inset-0" aria-hidden="true" />
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------- Numbers */

export function Stats({ stats }: { stats: Stat[] }) {
  return (
    <Container className="relative z-[2] py-10 lg:pb-20">
      <dl className="grid grid-cols-2 gap-x-5 gap-y-10 border-t border-white/10 pt-12 md:grid-cols-4">
        {stats.map((s, i) => (
          <div key={s.label} data-reveal style={vars({ "--i": i })} className="flex flex-col-reverse">
            <dt className="mt-1.5 text-[15px] text-muted">{s.label}</dt>
            <dd className="font-display text-[clamp(44px,5vw,64px)] leading-none font-bold tracking-[-0.04em]">
              <Counter value={s.value} placeholder={s.label.startsWith("Years") ? "[0]" : "[00]"} />
              {s.suffix ? <span className="text-blue">{s.suffix}</span> : null}
            </dd>
          </div>
        ))}
      </dl>
    </Container>
  );
}

/* ------------------------------------------------------- Book CTA */

export function BookCTA({
  eyebrow = "Now open for projects & collaborations",
  title = "Let's create",
}: {
  eyebrow?: string;
  title?: string;
}) {
  return (
    <section className="relative z-[2] px-2 pt-10 sm:px-4">
      <div className="relative flex min-h-[460px] items-center justify-center overflow-hidden rounded-[24px] bg-[#0B2A66] text-center sm:rounded-hero lg:min-h-[520px]">
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <div
            className="drift absolute -inset-1/4"
            style={{
              background:
                "radial-gradient(40% 50% at 30% 40%, #0078FF 0%, transparent 70%), radial-gradient(35% 45% at 75% 65%, #00C2FF99 0%, transparent 70%), radial-gradient(60% 60% at 50% 120%, #0047B3 0%, transparent 70%)",
            }}
          />
          <div className="absolute inset-0 bg-bg/25" />
        </div>
        <div className="relative flex flex-col items-center gap-7 px-6 py-20">
          <p className="text-[13px] tracking-[0.14em] text-[#D4E3FA] uppercase" data-reveal>
            {eyebrow}
          </p>
          <h2
            className="text-[clamp(52px,7vw,110px)] leading-[0.95] font-extrabold tracking-[-0.045em]"
            data-reveal
            style={vars({ "--i": 1 })}
          >
            {title}
            <span className="text-white">.</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-3" data-reveal style={vars({ "--i": 2 })}>
            <Magnetic>
              <PillLink href="/book" size="lg">
                Book a session
              </PillLink>
            </Magnetic>
            <PillLink href="/contact" variant="outline" size="lg">
              Send an enquiry
            </PillLink>
          </div>
        </div>
      </div>
    </section>
  );
}
