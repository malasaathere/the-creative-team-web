import type { MetadataRoute } from "next";
import { products } from "@/content/products";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const pages = ["", "/services", "/packages", "/work", "/shop", "/about", "/contact", "/book"];
  return [
    ...pages.map((p) => ({ url: `${base}${p}`, priority: p === "" ? 1 : 0.8 })),
    ...services.map((s) => ({ url: `${base}/services/${s.slug}`, priority: 0.7 })),
    ...projects.map((p) => ({ url: `${base}/work/${p.slug}`, priority: 0.6 })),
    ...products.map((p) => ({ url: `${base}/shop/${p.slug}`, priority: 0.5 })),
  ];
}
