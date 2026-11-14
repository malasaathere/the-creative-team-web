import { products } from "@/content/products";
import { services } from "@/content/services";

/** Option lists for the enquiry form, built from the content files. */
export const serviceOptions = services.map((s) => ({ value: s.slug, label: s.name }));

export const packageLabels = Object.fromEntries(
  services.flatMap((s) => s.packages.map((p) => [p.id, `${s.shortName} · ${p.name}`])),
);

export const productLabels = Object.fromEntries(products.map((p) => [p.slug, p.name]));
