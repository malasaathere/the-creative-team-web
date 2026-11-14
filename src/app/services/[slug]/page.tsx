import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PackageCard } from "@/components/ui/Cards";
import { Faq } from "@/components/ui/Faq";
import { Media } from "@/components/ui/Media";
import { PageHero } from "@/components/ui/PageHero";
import { PillLink } from "@/components/ui/PillLink";
import { Container, SectionHeader, Tag } from "@/components/ui/Section";
import { projectsForService } from "@/content/projects";
import { getService, nextService, services } from "@/content/services";
import { cn, toneHex, toneWash, vars } from "@/lib/utils";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return { title: s.name, description: s.summary };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const tone = toneHex[s.tone];
  const work = projectsForService(s.slug).slice(0, 4);
  const next = nextService(s.slug);

  return (
    <>
      <PageHero
        eyebrow={`Service ${s.number}`}
        title={s.shortName}
        dotColor={s.toneText}
        background={toneWash(s.tone)}
        breadcrumb={[{ label: "Services", href: "/services" }, { label: s.shortName }]}
        intro={s.summary}
        media={s.offerings[0].media}
        mediaTone={tone}
      >
        <div className="flex flex-wrap gap-2">
          {s.tags.map((t) => (
            <Tag key={t} className="border-white/30">
              {t}
            </Tag>
          ))}
        </div>
        <PillLink href={`/book?service=${s.slug}`} className="self-start" dotColor={tone}>
          {s.bookLabel}
        </PillLink>
      </PageHero>

      {/* OFFERINGS */}
      <Container className="pt-28 pb-20">
        <SectionHeader
          eyebrow={s.offeringsHeading.eyebrow}
          eyebrowColor={s.toneText}
          title={s.offeringsHeading.title}
          body={s.offeringsHeading.body}
        />
        <div className="grid gap-5 md:grid-cols-3">
          {s.offerings.map((o, i) => (
            <article key={o.title} className="lift flex flex-col gap-4.5" data-reveal style={vars({ "--i": i })}>
              <div className="relative h-[340px] overflow-hidden rounded-card lg:h-[420px]">
                <Media media={o.media} tone={tone} sizes="(min-width: 768px) 33vw, 100vw" />
              </div>
              <div>
                <h3 className="mb-1.5 font-sans text-[22px] font-semibold">{o.title}</h3>
                <p className="text-[15px] leading-normal text-muted">{o.body}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>

      {/* HOW IT WORKS */}
      <Container className="py-16 lg:pb-20">
        <SectionHeader
          eyebrow="How it works"
          eyebrowColor={s.toneText}
          title={`From first call to final ${s.slug === "photography" ? "gallery" : "files"}\nin four steps`}
        />
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {s.steps.map((st, i) => (
            <li
              key={st.title}
              data-reveal
              style={{ ...vars({ "--i": i }), borderColor: i === 0 ? tone : undefined }}
              className={cn("pt-6", i === 0 ? "border-t-2" : "border-t border-white/18")}
            >
              <p className="mb-3.5 font-display text-[40px] font-bold" style={{ color: i === 0 ? tone : "#8A94A6" }}>
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mb-2 font-sans text-[19px] font-semibold">{st.title}</h3>
              <p className="text-[15px] leading-normal text-muted">{st.body}</p>
            </li>
          ))}
        </ol>
      </Container>

      {/* PACKAGES */}
      <Container className="py-20">
        <SectionHeader align="center" eyebrow={`${s.shortName} packages`} eyebrowColor={s.toneText} title="Choose your package" />
        <div className="grid gap-5 md:grid-cols-3">
          {s.packages.map((p, i) => (
            <PackageCard key={p.id} pkg={p} index={i} accent={tone} href={`/book?package=${p.id}`} />
          ))}
        </div>
      </Container>

      {/* WORK */}
      {work.length ? (
        <Container className="py-20">
          <SectionHeader
            eyebrow="Recent work"
            eyebrowColor={s.toneText}
            title={`${s.shortName} work`}
            action={
              <Link href={`/work?service=${s.slug}`} className="text-[15px] font-semibold hover:text-white">
                See all {s.shortName.toLowerCase()} <span aria-hidden="true">→</span>
              </Link>
            }
          />
          <div className="grid auto-rows-[220px] grid-cols-2 gap-4 lg:grid-cols-4">
            {work.map((p, i) => (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                data-cursor="View"
                data-reveal="clip"
                style={vars({ "--i": i })}
                className={cn(
                  "group relative overflow-hidden rounded-card",
                  i === 0 && "col-span-2 row-span-2",
                  i === 3 && "col-span-2",
                )}
              >
                <div className="absolute inset-0">
                  <Media media={p.cover} tone={tone} sizes="(min-width: 1024px) 50vw, 100vw" />
                </div>
                <span className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="rounded-full bg-black/50 px-3 py-1.5 text-sm font-semibold backdrop-blur">{p.title}</span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      ) : null}

      <Faq items={s.faqs} />

      {/* NEXT SERVICE */}
      <section className="px-2 pt-10 sm:px-4">
        <Link
          href={`/services/${next.slug}`}
          className="group flex flex-wrap items-center justify-between gap-6 rounded-[24px] p-8 sm:rounded-hero sm:p-14"
          style={{ background: toneWash(next.tone, "tr") }}
        >
          <span>
            <span className="mb-3 block text-[13px] tracking-[0.14em] text-white/75 uppercase">
              Next service · {next.number}
            </span>
            <span className="font-display text-[clamp(36px,5vw,72px)] leading-none font-extrabold tracking-[-0.04em]">
              {next.shortName}
            </span>
          </span>
          <span
            aria-hidden="true"
            className="inline-flex size-18 items-center justify-center rounded-full bg-white transition-transform duration-500 ease-(--ease-expo) group-hover:translate-x-2"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#05070D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </Link>
      </section>
    </>
  );
}
