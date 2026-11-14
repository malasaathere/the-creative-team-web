import type { Metadata } from "next";
import { BookCTA } from "@/components/sections/Blocks";
import { ProductCard } from "@/components/ui/Cards";
import { PageHero } from "@/components/ui/PageHero";
import { Container, Eyebrow } from "@/components/ui/Section";
import { products } from "@/content/products";
import { toneWash } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Shop",
  description: "Prints, templates and studio goods from the crentive team.",
};

const how = [
  { title: "Choose", body: "Pick your products and send an order request." },
  { title: "Pay", body: "Bank transfer, cash on delivery or pay when you pick up." },
  { title: "Receive", body: "Island-wide delivery, studio pickup, or an instant download for digital items." },
];

export default function ShopPage() {
  const physical = products.filter((p) => p.type === "PHYSICAL");
  const digital = products.filter((p) => p.type === "DIGITAL");
  return (
    <>
      <PageHero
        eyebrow="Shop"
        title={"Take a piece of\nthe studio home"}
        background={toneWash("social")}
        intro="Prints, merch and ready-made templates, designed by the same team that builds brands."
      />

      {[
        { label: "Physical goods", items: physical },
        { label: "Digital downloads", items: digital },
      ].map((g) => (
        <Container key={g.label} className="pt-24">
          <Eyebrow>{g.label}</Eyebrow>
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
            {g.items.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </Container>
      ))}

      <Container className="py-24">
        <div className="grid gap-5 rounded-card border border-white/10 bg-surface p-8 sm:p-10 md:grid-cols-3" data-reveal>
          {how.map((h, i) => (
            <div key={h.title}>
              <p className="mb-2 font-display text-[32px] font-bold text-social">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="mb-1.5 font-sans text-lg font-semibold">{h.title}</h2>
              <p className="text-[15px] leading-normal text-muted">{h.body}</p>
            </div>
          ))}
        </div>
      </Container>

      <BookCTA />
    </>
  );
}
