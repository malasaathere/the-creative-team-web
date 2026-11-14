import type { Project } from "./types";

const placeholderBody = [
  "[The challenge: what the client needed and why.]",
  "[The idea: the direction we chose and how it answers the brief.]",
  "[The result: what was delivered and what changed for the client.]",
];

export const projects: Project[] = [
  {
    slug: "crentive-rebrand",
    title: "crentive rebrand",
    client: "The crentive Team",
    service: "graphic-design",
    discipline: "Brand identity · Signage",
    year: "2026",
    summary: "A new name, a new mark and one flowing line that ties every piece of the studio together.",
    body: [
      "Same people, bigger possibilities: the studio grew from a group of freelancers into one team, and the brand needed to say so.",
      "The \"en.\" mark is drawn as a single continuous line ending in a blue dot, the same gesture that runs through the reel, the stationery and this website.",
      "[Add the outcome: launch reach, client response, what the new identity made possible.]",
    ],
    cover: { alt: "crentive 3D logo signage", placeholder: "3D logo signage" },
    gallery: [
      { alt: "crentive letterhead and blue envelope", placeholder: "Stationery" },
      { alt: "Black crentive business cards", placeholder: "Business cards" },
      { alt: "Black tote bag with the crentive mark", placeholder: "Tote bag" },
    ],
    featured: true,
  },
  {
    slug: "stationery-system",
    title: "Stationery system",
    client: "The crentive Team",
    service: "graphic-design",
    discipline: "Graphic Design · Print",
    year: "2026",
    summary: "Letterheads, envelopes and cards in deep navy and electric blue.",
    body: placeholderBody,
    cover: { alt: "crentive letterhead and blue envelope", placeholder: "Letterhead & envelope" },
    gallery: [
      { alt: "", placeholder: "Detail" },
      { alt: "", placeholder: "Detail" },
    ],
    featured: true,
  },
  {
    slug: "moonlit-ascent",
    title: "[Project name]",
    service: "photography",
    discipline: "Photography · Landscape",
    year: "[Year]",
    summary: "[One-line summary of the shoot.]",
    body: placeholderBody,
    cover: { alt: "Climbers below a moonlit mountain", placeholder: "Moonlit mountain", position: "60% 50%" },
    gallery: [
      { alt: "", placeholder: "Photo" },
      { alt: "", placeholder: "Photo" },
      { alt: "", placeholder: "Photo" },
    ],
    featured: true,
  },
  {
    slug: "studio-merch",
    title: "Studio merch",
    client: "The crentive Team",
    service: "graphic-design",
    discipline: "Graphic Design · Merchandise",
    year: "2026",
    summary: "Totes, tees and stickers carrying the en. line.",
    body: placeholderBody,
    cover: { alt: "Black tote bag with the crentive mark", placeholder: "Tote bag" },
    gallery: [{ alt: "", placeholder: "Merch detail" }],
    featured: true,
  },
  {
    slug: "brand-reel",
    title: "[Brand reel]",
    service: "videography",
    discipline: "Motion · Brand film",
    year: "[Year]",
    summary: "[One-line summary of the film.]",
    body: placeholderBody,
    cover: { alt: "", placeholder: "Film still" },
    gallery: [{ alt: "", placeholder: "Frame" }, { alt: "", placeholder: "Frame" }],
  },
  {
    slug: "web-project",
    title: "[Website project]",
    service: "web-development",
    discipline: "Web · E-commerce",
    year: "[Year]",
    summary: "[One-line summary of the website.]",
    body: placeholderBody,
    cover: { alt: "", placeholder: "Website screens" },
    gallery: [{ alt: "", placeholder: "Screen" }, { alt: "", placeholder: "Screen" }],
  },
  {
    slug: "social-campaign",
    title: "[Social campaign]",
    service: "social-media",
    discipline: "Social · Campaign",
    year: "[Year]",
    summary: "[One-line summary of the campaign and its results.]",
    body: placeholderBody,
    cover: { alt: "Navy social template with the crentive mark", placeholder: "Social posts" },
    gallery: [{ alt: "", placeholder: "Post" }, { alt: "", placeholder: "Post" }],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function projectsForService(service: string) {
  return projects.filter((p) => p.service === service);
}

export function nextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
