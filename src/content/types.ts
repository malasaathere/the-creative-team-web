/**
 * Content types. They mirror the Prisma models in the website plan
 * (Service, Package, Project, Product, Testimonial, Award, ClientLogo)
 * so the static files in this folder can later be replaced by database
 * reads without touching the pages.
 *
 * Any value written in [square brackets] is a placeholder for the studio
 * to fill in. Prices are whole LKR (rupees); `null` shows a placeholder.
 */

export type ServiceSlug =
  | "graphic-design"
  | "photography"
  | "videography"
  | "web-development"
  | "social-media";

export type Tone = "design" | "photo" | "video" | "web" | "social";

/** An image on disk under /public. Leave `src` out to show a branded placeholder. */
export type MediaRef = {
  src?: string;
  alt: string;
  /** Label shown on the placeholder until a real image is added. */
  placeholder?: string;
  position?: string;
};

export type Package = {
  id: string;
  name: string;
  /** Starting price in LKR. `null` renders "[00,000]". */
  priceFrom: number | null;
  blurb: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
};

export type Offering = { title: string; body: string; media: MediaRef };
export type Step = { title: string; body: string };
export type Faq = { q: string; a: string };

export type Service = {
  slug: ServiceSlug;
  number: string;
  name: string;
  shortName: string;
  tone: Tone;
  /** Lighter version of the tone, for small text on navy. */
  toneText: string;
  summary: string;
  tags: string[];
  icon: "pen" | "camera" | "play" | "browser" | "growth";
  bookLabel: string;
  offeringsHeading: { eyebrow: string; title: string; body: string };
  offerings: Offering[];
  steps: Step[];
  packages: Package[];
  faqs: Faq[];
};

export type Project = {
  slug: string;
  title: string;
  client?: string;
  service: ServiceSlug;
  discipline: string;
  year: string;
  summary: string;
  body: string[];
  cover: MediaRef;
  gallery: MediaRef[];
  featured?: boolean;
};

export type Product = {
  slug: string;
  name: string;
  type: "PHYSICAL" | "DIGITAL";
  /** LKR. `null` renders "[0,000]". */
  price: number | null;
  description: string;
  details: string[];
  images: MediaRef[];
};

export type Testimonial = { quote: string; name: string; company: string };
export type Award = { kind: string; title: string; year: string; media: MediaRef };
export type Stat = { value: number | null; suffix?: string; label: string };
export type TeamMember = { name: string; role: string; photo: MediaRef };
