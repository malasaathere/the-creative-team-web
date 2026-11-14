import type { Metadata } from "next";
import Link from "next/link";
import { BookCTA } from "@/components/sections/Blocks";
import { PackageCard } from "@/components/ui/Cards";
import { Faq } from "@/components/ui/Faq";
import { PageHero } from "@/components/ui/PageHero";
import { Container, Eyebrow } from "@/components/ui/Section";
import { services } from "@/content/services";
import { toneHex, toneWash } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Packages",
  description: "Three packages for each of our five services, with starting prices in LKR.",
};

const faqs = [
  {
    q: "Are these final prices?",
    a: "They are starting prices. We confirm the exact price in writing after a short call about your project.",
  },
  {
    q: "Can I mix services?",
    a: "Yes. Many clients combine design, photo and video. Ask for a custom quote and we'll bundle them.",
  },
  { q: "Do I pay up front?", a: "[Your payment terms, for example: 50% to start and 50% on delivery.]" },
  { q: "How do I pay?", a: "Bank transfer or cash. Online card payments are coming soon." },
];

export default function PackagesPage() {
  return (
    <>
      <PageHero
        eyebrow="Packages"
        title={"Simple packages\nfor every stage"}
        background={toneWash("photo")}
        intro="Pick a starting point for any service. Every package can be adjusted, and the middle one is where most clients land."
      >
        <nav aria-label="Jump to service" className="flex flex-wrap gap-2">
          {services.map((s) => (
            <a
              key={s.slug}
              href={`#${s.slug}`}
              className="rounded-full border border-white/30 px-3.5 py-2 text-[13px] transition-colors hover:bg-white/10"
            >
              {s.shortName}
            </a>
          ))}
        </nav>
      </PageHero>

      {services.map((s) => (
        <section key={s.slug} id={s.slug} className="scroll-mt-24">
          <Container className="pt-24">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-6" data-reveal>
              <div>
                <Eyebrow color={s.toneText}>
                  {s.number} · {s.shortName}
                </Eyebrow>
                <h2 className="text-[clamp(30px,3.4vw,48px)] leading-[1.05] font-bold tracking-[-0.03em]">{s.name}</h2>
              </div>
              <Link href={`/services/${s.slug}`} className="text-[15px] font-semibold hover:text-white">
                About this service <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {s.packages.map((p, i) => (
                <PackageCard key={p.id} pkg={p} index={i} accent={toneHex[s.tone]} href={`/book?package=${p.id}`} />
              ))}
            </div>
          </Container>
        </section>
      ))}

      <div className="pt-12">
        <Faq items={faqs} />
      </div>
      <BookCTA title="Let's talk it through" eyebrow="Not sure which package fits?" />
    </>
  );
}
