import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookCTA } from "@/components/sections/Blocks";
import { Media } from "@/components/ui/Media";
import { Container, Eyebrow } from "@/components/ui/Section";
import { getProject, nextProject, projects } from "@/content/projects";
import { getService } from "@/content/services";
import { cn, toneHex, vars } from "@/lib/utils";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return { title: p.title, description: p.summary };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const service = getService(p.service)!;
  const tone = toneHex[service.tone];
  const next = nextProject(p.slug);

  return (
    <>
      <section className="px-2 pt-2 sm:px-4 sm:pt-4">
        <div className="relative flex min-h-[640px] flex-col justify-end overflow-hidden rounded-[24px] sm:rounded-hero lg:min-h-[86svh]">
          <div className="absolute inset-0">
            <Media media={p.cover} tone={tone} priority />
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: "linear-gradient(0deg, rgba(5,7,13,0.92) 0%, rgba(5,7,13,0.2) 55%, rgba(5,7,13,0.5) 100%)" }}
          />
          <div className="relative px-6 pt-32 pb-10 sm:px-10 lg:px-14 lg:pb-14">
            <nav aria-label="Breadcrumb" className="mb-8 flex gap-2.5 text-sm text-white/75">
              <Link href="/work" className="hover:text-white">
                Work
              </Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{p.title}</span>
            </nav>
            <h1 className="max-w-[1000px] text-[clamp(48px,7.5vw,120px)] leading-[0.94] font-extrabold tracking-[-0.045em]">
              <span className="mask-line">
                <span className="rise">
                  {p.title}
                  <span className="dot-drop" style={{ color: service.toneText }}>
                    .
                  </span>
                </span>
              </span>
            </h1>
          </div>
        </div>
      </section>

      <Container className="py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-20">
          <dl className="grid h-fit grid-cols-2 gap-6 border-t border-white/12 pt-6 text-[15px]" data-reveal>
            {[
              ["Client", p.client ?? "[Client]"],
              ["Year", p.year],
              ["Service", service.shortName],
              ["Discipline", p.discipline],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="mb-1 text-[13px] text-muted">{k}</dt>
                <dd className="font-medium">{k === "Service" ? <Link href={`/services/${service.slug}`} className="underline underline-offset-4 hover:text-white">{v}</Link> : v}</dd>
              </div>
            ))}
          </dl>
          <div>
            <Eyebrow color={service.toneText}>Overview</Eyebrow>
            <p className="mb-10 font-display text-[clamp(24px,2.6vw,34px)] leading-[1.25] font-semibold tracking-[-0.02em]" data-reveal>
              {p.summary}
            </p>
            <div className="flex max-w-[680px] flex-col gap-5 text-[17px] leading-relaxed text-soft">
              {p.body.map((para, i) => (
                <p key={i} data-reveal>
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {p.gallery.length ? (
        <Container className="pb-24">
          <div className="grid gap-5 md:grid-cols-2">
            {p.gallery.map((m, i) => (
              <figure
                key={i}
                data-reveal="clip"
                style={vars({ "--i": i % 2 })}
                className={cn(
                  "relative overflow-hidden rounded-card",
                  p.gallery.length % 2 === 1 && i === 0 ? "h-[420px] md:col-span-2 lg:h-[640px]" : "h-[360px] lg:h-[520px]",
                )}
              >
                <div className="absolute inset-0">
                  <Media media={m} tone={tone} sizes="(min-width: 768px) 50vw, 100vw" />
                </div>
              </figure>
            ))}
          </div>
        </Container>
      ) : null}

      <section className="px-2 sm:px-4">
        <Link
          href={`/work/${next.slug}`}
          data-cursor="Next"
          className="group relative flex min-h-[340px] flex-col justify-end overflow-hidden rounded-[24px] p-8 sm:rounded-hero sm:p-14"
        >
          <div className="absolute inset-0 transition-transform duration-700 ease-(--ease-expo) group-hover:scale-[1.03]">
            <Media media={next.cover} tone={toneHex[getService(next.service)!.tone]} sizes="100vw" />
          </div>
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-bg/90 to-bg/20" />
          <span className="relative">
            <span className="mb-3 block text-[13px] tracking-[0.14em] text-white/75 uppercase">Next project</span>
            <span className="font-display text-[clamp(36px,5vw,72px)] leading-none font-extrabold tracking-[-0.04em]">
              {next.title}
            </span>
          </span>
        </Link>
      </section>

      <BookCTA />
    </>
  );
}
