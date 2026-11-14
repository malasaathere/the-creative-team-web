import type { Product } from "./types";

export const products: Product[] = [
  {
    slug: "crentive-tote",
    name: "crentive tote",
    type: "PHYSICAL",
    price: null,
    description: "A heavy cotton tote in black, printed with the en. line in white.",
    details: ["[Size]", "[Material]", "Ships island-wide or pick up from the studio"],
    images: [{ alt: "crentive tote bag", placeholder: "Tote bag" }],
  },
  {
    slug: "art-print",
    name: "Art print [placeholder]",
    type: "PHYSICAL",
    price: null,
    description: "[A limited print from one of our shoots.]",
    details: ["[Paper and size]", "[Edition size]", "Ships rolled in a tube"],
    images: [{ alt: "Mountain art print", placeholder: "Art print", position: "63% 50%" }],
  },
  {
    slug: "social-template-pack",
    name: "Social template pack",
    type: "DIGITAL",
    price: null,
    description: "Editable post and story templates in the crentive style, ready for Canva and Figma.",
    details: ["[00] post templates", "[00] story templates", "Instant download after payment is confirmed"],
    images: [{ alt: "Navy social template with the crentive mark", placeholder: "Template pack" }],
  },
  {
    slug: "brand-starter-kit",
    name: "Brand starter kit",
    type: "DIGITAL",
    price: null,
    description: "Business card, letterhead and invoice templates to get a new business looking sharp.",
    details: ["Print-ready files", "Editable source files", "Instant download after payment is confirmed"],
    images: [{ alt: "Brand starter kit stationery", placeholder: "Starter kit" }],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
