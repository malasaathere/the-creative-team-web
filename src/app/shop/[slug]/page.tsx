import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ui/Cards";
import { Media } from "@/components/ui/Media";
import { PillLink } from "@/components/ui/PillLink";
import { Container, Eyebrow } from "@/components/ui/Section";
import { getProduct, products } from "@/content/products";
import { formatLKR } from "@/lib/utils";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/shop/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return { title: p.name, description: p.description };
}

export default async function ProductPage({ params }: PageProps<"/shop/[slug]">) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const others = products.filter((x) => x.slug !== p.slug).slice(0, 4);
  const digital = p.type === "DIGITAL";

  return (
    <>
      <Container className="pt-28 lg:pt-32">
        <nav aria-label="Breadcrumb" className="mb-8 flex gap-2.5 text-sm text-muted">
          <Link href="/shop" className="hover:text-white">
            Shop
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="text-text">
            {p.name}
          </span>
        </nav>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <div className="grid gap-4">
            {p.images.map((m, i) => (
              <div key={i} className="relative aspect-4/5 overflow-hidden rounded-card bg-card" data-reveal="clip">
                <div className="absolute inset-0">
                  <Media media={m} priority={i === 0} sizes="(min-width: 1024px) 55vw, 100vw" />
                </div>
              </div>
            ))}
          </div>
          <div className="flex h-fit flex-col gap-6 lg:sticky lg:top-28">
            <Eyebrow className="mb-0">{digital ? "Digital download" : "Physical product"}</Eyebrow>
            <h1 className="text-[clamp(40px,5vw,64px)] leading-[1] font-extrabold tracking-[-0.04em]">{p.name}</h1>
            <p className="font-display text-3xl font-bold">
              <span className="mr-1.5 font-sans text-base font-medium text-muted">LKR</span>
              {formatLKR(p.price, "[0,000]")}
            </p>
            <p className="text-[17px] leading-relaxed text-soft">{p.description}</p>
            <ul className="flex flex-col gap-3 border-y border-white/10 py-6 text-[15px] text-soft">
              {p.details.map((d) => (
                <li key={d} className="flex gap-2.5">
                  <span aria-hidden="true" className="text-blue-light">
                    ✓
                  </span>
                  {d}
                </li>
              ))}
            </ul>
            <PillLink href={`/contact?topic=order&product=${p.slug}`} size="lg" className="self-start">
              Request this item
            </PillLink>
            <p className="text-sm leading-relaxed text-muted">
              Online checkout is on its way. For now, send a request and we&apos;ll reply with payment details: bank
              transfer, {digital ? "and your download link once paid" : "cash on delivery, or pay on pickup"}.
            </p>
          </div>
        </div>
      </Container>

      <Container className="py-24">
        <h2 className="mb-10 text-[clamp(28px,3vw,40px)] font-bold tracking-[-0.03em]">You might also like</h2>
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
          {others.map((o, i) => (
            <ProductCard key={o.slug} product={o} index={i} />
          ))}
        </div>
      </Container>
    </>
  );
}
