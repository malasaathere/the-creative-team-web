import type { Award, MediaRef, Stat, TeamMember, Testimonial } from "./types";

export const site = {
  name: "The crentive Team",
  shortName: "crentive",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  tagline: "Ideas move further.",
  slogans: {
    hero: "Seen. Heard. Remembered.",
    team: "One team. Every angle.",
  },
  description:
    "We turn ideas into visual identities, meaningful content and digital experiences built to move brands forward.",
  /** Set to "/brand/crentive-logo.svg" (or .png) once the logo file is in /public/brand. */
  logo: null as string | null,
  contact: {
    email: "[hello@yourdomain.com]",
    phone: "[+94 00 000 0000]",
    location: "Sri Lanka",
    hours: "[Mon–Fri, 9:00–18:00]",
  },
  social: [
    { label: "Instagram", href: "#" },
    { label: "TikTok", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "LinkedIn", href: "#" },
  ],
  year: "2026",
};

export const mainNav = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Packages", href: "/packages" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
] as const;

export const heroMedia: MediaRef = {
  // The blue-cloth image from the teaser flyer goes here.
  alt: "",
  placeholder: "Hero visual — blue cloth from the teaser flyer",
};

export const behindTheWork: MediaRef[] = [
  { alt: "Climbers below a moonlit mountain peak", placeholder: "Moonlit mountain" },
  { alt: "crentive logo as 3D signage on a concrete wall", placeholder: "3D logo signage" },
  { alt: "Black crentive business cards", placeholder: "Business cards" },
];

export const clients: string[] = Array.from({ length: 8 }, () => "[Client logo]");

export const stats: Stat[] = [
  { value: null, suffix: "+", label: "Projects delivered" },
  { value: null, suffix: "+", label: "Brands we work with" },
  { value: 5, label: "Crafts under one roof" },
  { value: null, label: "Years creating together" },
];

export const awards: Award[] = [
  {
    kind: "Studio",
    title: "A new chapter: The crentive Team",
    year: "2026",
    media: { alt: "The crentive mark on a blue gradient", placeholder: "crentive mark" },
  },
  { kind: "Award", title: "[Award or feature name]", year: "[Year]", media: { alt: "", placeholder: "Award" } },
  { kind: "Feature", title: "[Press or exhibition]", year: "[Year]", media: { alt: "", placeholder: "Feature" } },
  { kind: "Milestone", title: "[Milestone]", year: "[Year]", media: { alt: "", placeholder: "Milestone" } },
];

export const testimonials: Testimonial[] = [
  {
    quote: "[A short quote from a client about working with the team, one or two sentences.]",
    name: "[Client name]",
    company: "[Company]",
  },
  {
    quote: "[A second client quote. Keep it specific: what changed for their brand after working with you.]",
    name: "[Client name]",
    company: "[Company]",
  },
];

export const team: TeamMember[] = [
  { name: "[Name]", role: "Creative Director", photo: { alt: "", placeholder: "Team photo" } },
  { name: "[Name]", role: "Lead Designer", photo: { alt: "", placeholder: "Team photo" } },
  { name: "[Name]", role: "Photographer & Filmmaker", photo: { alt: "", placeholder: "Team photo" } },
  { name: "[Name]", role: "Web Developer", photo: { alt: "", placeholder: "Team photo" } },
];

export const values = [
  {
    title: "Seen",
    body: "Work that stops the scroll. Every frame, page and post is made to be noticed first.",
  },
  {
    title: "Heard",
    body: "A voice that sounds like you. We listen before we design, so the message stays yours.",
  },
  {
    title: "Remembered",
    body: "Consistency that sticks. One team keeps your brand the same everywhere it shows up.",
  },
];
