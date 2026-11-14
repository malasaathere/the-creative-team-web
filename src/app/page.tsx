import Link from "next/link";
import { TravelLine } from "@/components/motion/TravelLine";
import { AwardsList } from "@/components/sections/AwardsList";
import { BookCTA, ClientMarquee, PhotoTrio, ServiceRows, Stats } from "@/components/sections/Blocks";
import { PackagesTabs } from "@/components/sections/PackagesTabs";
import { Testimonials } from "@/components/sections/Testimonials";
import { WorkRail } from "@/components/sections/WorkRail";
import { ProductCard } from "@/components/ui/Cards";
import { Media } from "@/components/ui/Media";
import { PillLink } from "@/components/ui/PillLink";
import { Container, Eyebrow, SectionHeader } from "@/components/ui/Section";
import { products } from "@/content/products";
import { featuredProjects } from "@/content/projects";
import { services } from "@/content/services";
import { awards, behindTheWork, clients, heroMedia, site, stats, testimonials } from "@/content/site";
import { vars } from "@/lib/utils";

export default function Home() {
  return (
    <div className="relative">
      <TravelLine />

      {/* HERO */}
      <section className="relative z-[2] px-2 pt-2 sm:px-4 sm:pt-4">
        <div className="relative flex min-h-[max(640px,calc(100svh-32px))] flex-col overflow-hidden rounded-[24px] bg-[#04080B] sm:rounded-hero lg:max-h-[960px]">
          <HeroVisual />

          <div className="relative flex max-w-[780px] grow flex-col justify-end gap-8 px-6 pt-32 pb-10 sm:px-10 lg:pb-13">
            <div>
              <p className="fade-up mb-6 text-[13px] tracking-[0.14em] text-[#B9C6DD] uppercase" style={vars({ "--delay": "0.1s" })}>
                {site.slogans.hero}
              </p>
              <h1 className="text-[clamp(60px,9vw,132px)] leading-[0.92] font-extrabold tracking-[-0.045em]">
                <span className="mask-line">
                  <span className="rise">Ideas move</span>
                </span>
                <span className="mask-line">
                  <span className="rise" style={vars({ "--i": 1 })}>
                    further<span className="dot-drop text-blue">.</span>
                  </span>
                </span>
              </h1>
            </div>
            <div className="fade-up flex max-w-[460px] flex-col gap-4.5" style={vars({ "--delay": "0.6s" })}>
              <p className="font-display text-[22px] leading-[1.3] font-semibold">
                Built from what we started. Ready for what&apos;s next.
              </p>
              <p className="text-[15px] leading-relaxed text-soft">{site.description}</p>
              <PillLink href="/book" className="self-start">
                Book a session
              </PillLink>
            </div>
          </div>

          <nav
            aria-label="Services"
            className="relative grid grid-cols-2 border-t border-white/14 bg-[#04080B]/45 backdrop-blur-md sm:grid-cols-3 lg:grid-cols-5"
          >
            {services.map((s, i) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group border-r border-b border-white/10 px-6 pt-5.5 pb-6.5 transition-colors last:border-r-0 hover:bg-white/5 lg:border-b-0 lg:first:pl-10"
              >
                <span className="mb-1.5 block text-xs text-blue-light">#{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[15px] font-medium">
                  {s.shortName}
                  <span aria-hidden="true" className="ml-1.5 inline-block opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <ClientMarquee clients={clients} />

      {/* BEHIND THE WORK */}
      <section className="relative z-[2]">
        <Container className="pt-24 pb-20 lg:pt-30">
          <SectionHeader
            eyebrow="Behind the work"
            title={"One team.\nEvery angle."}
            body="Designers, photographers, filmmakers and developers working as one studio, so your brand looks and sounds the same everywhere it shows up."
            action={
              <PillLink href="/about" variant="blue">
                Meet the team
              </PillLink>
            }
          />
          <PhotoTrio photos={behindTheWork} />
        </Container>
      </section>

      {/* SERVICES */}
      <section className="relative z-[2]">
        <Container className="pt-20 pb-24">
          <SectionHeader
            eyebrow="What we do"
            title="Five crafts. One line."
            body="Each service has its own blue. Together they make one studio, and one line runs through all of it."
          />
          <ServiceRows services={services} />
        </Container>
      </section>

      {/* SELECTED WORK */}
      <section className="relative z-[2] py-24">
        <Container>
          <SectionHeader
            eyebrow="Selected work"
            title={"Bringing brands to life\nthrough design"}
            action={<PillLink href="/work">All projects</PillLink>}
          />
        </Container>
        <WorkRail projects={featuredProjects} />
      </section>

      <Stats stats={stats} />

      {/* PACKAGES */}
      <section className="relative z-[2]">
        <Container className="pt-20 pb-24">
          <SectionHeader align="center" eyebrow="Packages" title="Simple packages for every stage" />
          <PackagesTabs services={services.map(({ slug, shortName, tone, packages }) => ({ slug, shortName, tone, packages }))} />
          <p className="mt-8 text-center text-sm text-muted">
            Need something different?{" "}
            <Link href="/contact" className="text-text underline underline-offset-4 hover:text-white">
              Ask for a custom quote
            </Link>
            .
          </p>
        </Container>
      </section>

      {/* PROUD MOMENTS */}
      <section className="relative z-[2]">
        <Container className="py-20">
          <div className="flex flex-wrap items-stretch gap-12">
            <div className="relative min-h-[380px] flex-[1_1_420px] overflow-hidden rounded-card bg-surface lg:min-h-[460px]" data-reveal="clip">
              <div className="absolute inset-0">
                <Media media={awards[0].media} sizes="(min-width: 1024px) 40vw, 100vw" />
              </div>
            </div>
            <div className="flex min-w-0 flex-[1_1_560px] flex-col">
              <Eyebrow>Proud moments</Eyebrow>
              <h2 className="mb-8 text-[clamp(32px,3.6vw,48px)] leading-[1.06] font-bold tracking-[-0.03em]" data-reveal>
                Milestones we&apos;re proud of
              </h2>
              <AwardsList awards={awards} />
            </div>
          </div>
        </Container>
      </section>

      {/* SHOP */}
      <section className="relative z-[2]">
        <Container className="py-20">
          <SectionHeader
            eyebrow="Shop"
            title="Take a piece of the studio home"
            action={
              <Link href="/shop" className="text-[15px] font-semibold hover:text-white">
                Visit the shop <span aria-hidden="true">→</span>
              </Link>
            }
          />
          <div className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
            {products.map((p, i) => (
              <div key={p.slug} className="w-[70vw] shrink-0 snap-start sm:w-auto">
                <ProductCard product={p} index={i} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative z-[2] mx-auto max-w-[1100px] px-6 py-24 text-center lg:px-10">
        <Eyebrow className="mb-7">Kind words</Eyebrow>
        <Testimonials items={testimonials} />
      </section>

      <BookCTA />
    </div>
  );
}

/** The hero's right-hand visual: the blue-cloth photo once added, a moving blue wash until then. */
function HeroVisual() {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-[14%] w-[114%] overflow-hidden [mask-image:linear-gradient(90deg,transparent_0%,#000_22%)]"
      >
        {heroMedia.src ? (
          <Media media={heroMedia} priority />
        ) : (
          <>
            <div
              className="drift absolute -inset-[15%]"
              style={{
                background:
                  "radial-gradient(38% 46% at 58% 38%, #0078FF 0%, transparent 70%), radial-gradient(30% 36% at 78% 62%, #2B93FF 0%, transparent 70%), radial-gradient(42% 50% at 40% 78%, #0047B3 0%, transparent 72%), radial-gradient(20% 26% at 68% 20%, #00C2FF99 0%, transparent 70%)",
                filter: "blur(10px)",
              }}
            />
            <div
              className="drift-slow absolute -inset-[15%] opacity-60 mix-blend-screen"
              style={{
                background:
                  "repeating-linear-gradient(115deg, transparent 0 46px, rgba(255,255,255,0.06) 60px, transparent 90px)",
              }}
            />
          </>
        )}
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(4,8,11,0.92) 0%, rgba(4,8,11,0.55) 38%, rgba(4,8,11,0) 62%), linear-gradient(0deg, rgba(4,8,11,0.9) 0%, rgba(4,8,11,0) 28%)",
        }}
      />
      <div
        aria-hidden="true"
        className="drift absolute -bottom-65 -left-55 size-[620px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(0,120,255,0.35), rgba(0,120,255,0) 65%)" }}
      />
    </>
  );
}
