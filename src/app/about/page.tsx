import type { Metadata } from "next";
import { AwardsList } from "@/components/sections/AwardsList";
import { BookCTA, PhotoTrio, Stats } from "@/components/sections/Blocks";
import { Media } from "@/components/ui/Media";
import { PageHero } from "@/components/ui/PageHero";
import { Container, Eyebrow, SectionHeader } from "@/components/ui/Section";
import { awards, behindTheWork, site, stats, team, values } from "@/content/site";
import { toneWash, vars } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description: "Designers, photographers, filmmakers and developers working as one studio.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the studio"
        title={"One team.\nEvery angle"}
        background={toneWash("web")}
        intro={site.description}
        media={behindTheWork[1]}
      />

      {/* STORY */}
      <Container className="py-24 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-20">
          <Eyebrow>Our story</Eyebrow>
          <div className="flex flex-col gap-8">
            <p className="font-display text-[clamp(26px,3vw,40px)] leading-[1.2] font-semibold tracking-[-0.02em]" data-reveal>
              The crentive Team grew from a group of friends who designed, shot and built for the same clients — and
              kept noticing how much better the work was when they did it together.
            </p>
            <div className="grid gap-6 text-[17px] leading-relaxed text-soft md:grid-cols-2">
              <p data-reveal>
                So we became one studio. Design, photography, film, web and social now sit under one roof, with one
                brief, one plan and one line running through everything we make.
              </p>
              <p data-reveal style={vars({ "--i": 1 })}>
                [Add the studio&apos;s own story here: when it started, who founded it, a project that changed things,
                and what the team cares about.]
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* VALUES */}
      <Container className="pb-24">
        <SectionHeader eyebrow="What we stand for" title={"Seen. Heard.\nRemembered."} />
        <div className="grid gap-5 md:grid-cols-3">
          {values.map((v, i) => (
            <div
              key={v.title}
              data-reveal
              style={vars({ "--i": i })}
              className="lift relative overflow-hidden rounded-card border border-white/8 bg-surface p-8 sm:p-10"
            >
              <div
                aria-hidden="true"
                className="absolute -top-32 -right-24 size-80 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(0,120,255,0.4), transparent 65%)" }}
              />
              <p className="relative mb-12 text-sm font-semibold text-blue-light">0{i + 1}</p>
              <h3 className="relative mb-3 text-[32px] font-bold tracking-[-0.03em]">
                {v.title}
                <span className="text-blue">.</span>
              </h3>
              <p className="relative text-[15px] leading-relaxed text-soft">{v.body}</p>
            </div>
          ))}
        </div>
      </Container>

      <Stats stats={stats} />

      {/* TEAM */}
      <Container className="py-24">
        <SectionHeader
          eyebrow="The team"
          title="The people behind the work"
          body="A small crew with five crafts. Every project gets a lead who stays with it from first call to final file."
        />
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
          {team.map((m, i) => (
            <figure key={i} className="group" data-reveal style={vars({ "--i": i })}>
              <div className="relative aspect-3/4 overflow-hidden rounded-card bg-card">
                <Media media={m.photo} imgClassName="bw" sizes="(min-width: 1024px) 25vw, 50vw" />
              </div>
              <figcaption className="px-1 pt-4">
                <span className="block text-lg font-semibold">{m.name}</span>
                <span className="text-sm text-muted">{m.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>

      <Container className="pb-20">
        <PhotoTrio photos={behindTheWork} />
      </Container>

      <Container className="py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Proud moments</Eyebrow>
            <h2 className="text-[clamp(32px,3.6vw,48px)] leading-[1.06] font-bold tracking-[-0.03em]" data-reveal>
              Milestones we&apos;re proud of
            </h2>
          </div>
          <AwardsList awards={awards} />
        </div>
      </Container>

      <BookCTA title="Work with us" />
    </>
  );
}
