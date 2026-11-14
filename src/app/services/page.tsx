import type { Metadata } from "next";
import { BookCTA, ServiceRows } from "@/components/sections/Blocks";
import { PageHero } from "@/components/ui/PageHero";
import { PillLink } from "@/components/ui/PillLink";
import { Container, SectionHeader } from "@/components/ui/Section";
import { services } from "@/content/services";
import { toneWash, vars } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Graphic design, photography, videography and motion, web development and social media marketing from one studio.",
};

const process = [
  { title: "Talk", body: "A free call to understand what you need and what it should achieve." },
  { title: "Plan", body: "A clear proposal with scope, timeline and price before any work starts." },
  { title: "Make", body: "One team designs, shoots, films and builds, with you reviewing along the way." },
  { title: "Launch", body: "Final files, a live site or a running campaign, plus support afterwards." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title={"Five crafts.\nOne line"}
        background={toneWash("design")}
        intro="From the first logo sketch to the last post of a campaign, every service is handled by the same team, so your brand never loses its voice between suppliers."
      >
        <PillLink href="/book" className="self-start">
          Book a call
        </PillLink>
      </PageHero>

      <Container className="py-24">
        <ServiceRows services={services} />
      </Container>

      <Container className="pb-24">
        <SectionHeader eyebrow="How we work" title={"Same four steps,\nwhatever the project"} />
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((s, i) => (
            <li key={s.title} data-reveal style={vars({ "--i": i })} className="border-t border-white/18 pt-6">
              <p className="mb-3.5 font-display text-[40px] font-bold text-blue">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mb-2 font-sans text-[19px] font-semibold">{s.title}</h3>
              <p className="text-[15px] leading-normal text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </Container>

      <BookCTA />
    </>
  );
}
