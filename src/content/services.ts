import type { Service, ServiceSlug } from "./types";

const sharedFaqs = {
  reschedule: {
    q: "Can I reschedule a booking?",
    a: "Yes. Let us know at least 24 hours before the session and we'll move it to a free slot.",
  },
  pay: {
    q: "How do I pay?",
    a: "Bank transfer or cash. We send the details with your booking confirmation.",
  },
};

export const services: Service[] = [
  {
    slug: "graphic-design",
    number: "01",
    name: "Graphic Design",
    shortName: "Graphic Design",
    tone: "design",
    toneText: "#4FA3FF",
    summary: "Logos, identity systems, print and packaging that make a brand recognisable at a glance.",
    tags: ["Brand identity", "Logo design", "Print & packaging"],
    icon: "pen",
    bookLabel: "Start a project",
    offeringsHeading: {
      eyebrow: "What we design",
      title: "Three ways in,\none recognisable brand",
      body: "Every piece is built from the same system, so your logo, print and screens always look like they belong together.",
    },
    offerings: [
      {
        title: "Brand identity",
        body: "Logo, colour, type and the rules that hold them together.",
        media: { alt: "crentive logo as 3D signage", placeholder: "Identity work" },
      },
      {
        title: "Print & stationery",
        body: "Business cards, letterheads, flyers, menus and signage.",
        media: { alt: "crentive letterhead and blue envelope", placeholder: "Stationery" },
      },
      {
        title: "Packaging",
        body: "Labels, boxes and bags that look right on a shelf and in a photo.",
        media: { alt: "", placeholder: "Packaging" },
      },
    ],
    steps: [
      { title: "Brief", body: "We learn your business, audience and where the brand will appear." },
      { title: "Concepts", body: "You get two or three directions to react to." },
      { title: "Refine", body: "We develop the chosen route through rounds of changes." },
      { title: "Hand over", body: "Final files and a short guide for using them." },
    ],
    packages: [
      {
        id: "design-starter",
        name: "Starter",
        priceFrom: null,
        blurb: "For a new business that needs a clean, simple start.",
        features: ["Logo design, 2 concepts", "Colour palette and fonts", "2 rounds of changes"],
        cta: "Book Starter",
      },
      {
        id: "design-pro",
        name: "Pro",
        priceFrom: null,
        blurb: "A full identity your team can use everywhere.",
        features: [
          "Everything in Starter",
          "Brand guidelines",
          "Business cards and stationery",
          "Social media templates",
        ],
        highlighted: true,
        cta: "Book Pro",
      },
      {
        id: "design-studio",
        name: "Studio",
        priceFrom: null,
        blurb: "Design, photo, video and launch handled together.",
        features: ["Everything in Pro", "Brand photo shoot", "Launch video", "A dedicated project lead"],
        cta: "Talk to us",
      },
    ],
    faqs: [
      { q: "How long does a logo take?", a: "[Your timeline, for example: two to three weeks from brief to final files.]" },
      { q: "Which files do I get?", a: "Vector (SVG, PDF), PNG and JPG versions for print and screen, in colour and one-colour." },
      { q: "Do I own the design?", a: "Yes. Full rights pass to you once the final invoice is paid." },
      sharedFaqs.pay,
    ],
  },
  {
    slug: "photography",
    number: "02",
    name: "Photography",
    shortName: "Photography",
    tone: "photo",
    toneText: "#6FB4FF",
    summary: "Portraits, events and product shoots, lit and edited to match your brand.",
    tags: ["Portraits", "Events", "Products"],
    icon: "camera",
    bookLabel: "Book a shoot",
    offeringsHeading: {
      eyebrow: "What we shoot",
      title: "Three kinds of shoot,\none consistent look",
      body: "Every shoot is graded to your brand colours, so photos from different days still feel like one set.",
    },
    offerings: [
      {
        title: "Portraits",
        body: "Headshots, team photos and personal branding sessions.",
        media: { alt: "", placeholder: "Portrait photo" },
      },
      {
        title: "Events",
        body: "Launches, weddings, conferences and celebrations.",
        media: { alt: "", placeholder: "Event photo" },
      },
      {
        title: "Products",
        body: "Clean studio shots for your shop, menu or catalogue.",
        media: { alt: "Product shot of black business cards", placeholder: "Product photo" },
      },
    ],
    steps: [
      { title: "Book online", body: "Pick a package, a date and a time." },
      { title: "Plan the shoot", body: "We agree on the location, looks and shot list." },
      { title: "Shoot day", body: "We bring the lights and direct every frame." },
      { title: "Edit & deliver", body: "Edited photos arrive in a private online gallery." },
    ],
    packages: [
      {
        id: "photo-mini",
        name: "Mini session",
        priceFrom: null,
        blurb: "A short session for headshots or a few products.",
        features: ["[Length] hour session", "[00] edited photos", "Online gallery"],
        cta: "Book Mini",
      },
      {
        id: "photo-half",
        name: "Half day",
        priceFrom: null,
        blurb: "Enough time for a team, a space and a story.",
        features: ["[Length] hour session", "[00] edited photos", "2 locations", "Online gallery"],
        highlighted: true,
        cta: "Book Half day",
      },
      {
        id: "photo-full",
        name: "Full day / event",
        priceFrom: null,
        blurb: "Complete coverage from arrival to last dance.",
        features: ["Full day coverage", "[00]+ edited photos", "Second photographer", "Highlights within 48 hours"],
        cta: "Book Full day",
      },
    ],
    faqs: [
      { q: "How soon do I get my photos?", a: "[Your turnaround, for example: edited gallery within 7 working days.]" },
      { q: "Do you travel for shoots?", a: "[Your travel policy.]" },
      sharedFaqs.reschedule,
      sharedFaqs.pay,
    ],
  },
  {
    slug: "videography",
    number: "03",
    name: "Videography & Motion Graphics",
    shortName: "Videography & Motion",
    tone: "video",
    toneText: "#8EA6F5",
    summary: "Short films, documentaries and motion graphics that tell your story in seconds or minutes.",
    tags: ["Short films", "Documentaries", "Motion graphics"],
    icon: "play",
    bookLabel: "Plan a film",
    offeringsHeading: {
      eyebrow: "What we make",
      title: "Stories that move,\nfrom 6 seconds to 6 minutes",
      body: "Scripted, shot, edited and animated by one team, so the film and the brand speak with one voice.",
    },
    offerings: [
      {
        title: "Short films & reels",
        body: "Brand films, ads and vertical reels made for the feed.",
        media: { alt: "", placeholder: "Film still" },
      },
      {
        title: "Documentaries",
        body: "Longer stories about people, places and the work behind a brand.",
        media: { alt: "", placeholder: "Documentary still" },
      },
      {
        title: "Motion graphics",
        body: "Logo animations, explainers and titles that bring a brand to life.",
        media: { alt: "", placeholder: "Motion frame" },
      },
    ],
    steps: [
      { title: "Idea", body: "We shape the story, script and storyboard with you." },
      { title: "Pre-production", body: "Locations, cast, crew and a day-by-day shot plan." },
      { title: "Production", body: "We film with cinema cameras, lights and sound." },
      { title: "Post", body: "Edit, colour, sound and motion, with two rounds of changes." },
    ],
    packages: [
      {
        id: "video-reel",
        name: "Reel",
        priceFrom: null,
        blurb: "One short vertical video for social.",
        features: ["Up to 60 seconds", "Half-day shoot", "Music and captions", "1 round of changes"],
        cta: "Book Reel",
      },
      {
        id: "video-film",
        name: "Brand film",
        priceFrom: null,
        blurb: "A 1–3 minute film that tells your story.",
        features: ["Script and storyboard", "Full-day shoot", "Colour grade and sound mix", "3 social cut-downs"],
        highlighted: true,
        cta: "Book Brand film",
      },
      {
        id: "video-doc",
        name: "Documentary",
        priceFrom: null,
        blurb: "Longer, researched stories with interviews.",
        features: ["Research and interviews", "Multi-day shoot", "Motion graphics", "A dedicated producer"],
        cta: "Talk to us",
      },
    ],
    faqs: [
      { q: "How long does a film take?", a: "[Your timeline, for example: three to five weeks from first call to final cut.]" },
      { q: "Do you provide music?", a: "Yes. We license music for every project so it's safe to post anywhere." },
      { q: "Can you animate my existing logo?", a: "Yes. Send us the vector file and we'll bring it to life." },
      sharedFaqs.pay,
    ],
  },
  {
    slug: "web-development",
    number: "04",
    name: "Web Development",
    shortName: "Web Development",
    tone: "web",
    toneText: "#6FA0F0",
    summary: "Fast, animated websites and online shops, built to be easy for you to update.",
    tags: ["Websites", "E-commerce", "UI/UX"],
    icon: "browser",
    bookLabel: "Start a website",
    offeringsHeading: {
      eyebrow: "What we build",
      title: "Sites that load fast\nand feel alive",
      body: "Designed and built in-house, with motion that adds meaning and an admin you can actually use.",
    },
    offerings: [
      {
        title: "Websites",
        body: "Portfolio, company and campaign sites with smooth, considered motion.",
        media: { alt: "", placeholder: "Website screen" },
      },
      {
        title: "E-commerce",
        body: "Online shops with products, orders and local payment options.",
        media: { alt: "", placeholder: "Shop screen" },
      },
      {
        title: "UI/UX",
        body: "Research, wireframes and app screens ready for developers.",
        media: { alt: "", placeholder: "App screens" },
      },
    ],
    steps: [
      { title: "Plan", body: "Pages, features and content mapped out together." },
      { title: "Design", body: "Key screens designed and approved before any code." },
      { title: "Build", body: "Developed, animated and tested on phones and desktops." },
      { title: "Launch", body: "Hosting, domain and a walkthrough of your admin." },
    ],
    packages: [
      {
        id: "web-landing",
        name: "Landing page",
        priceFrom: null,
        blurb: "One focused page for a launch or campaign.",
        features: ["1 page, mobile-first", "Contact form", "Basic SEO", "1 month of support"],
        cta: "Book Landing",
      },
      {
        id: "web-site",
        name: "Business site",
        priceFrom: null,
        blurb: "A full website you can edit yourself.",
        features: ["Up to [00] pages", "Content admin", "Scroll animations", "3 months of support"],
        highlighted: true,
        cta: "Book Business site",
      },
      {
        id: "web-shop",
        name: "Online shop",
        priceFrom: null,
        blurb: "Products, cart, orders and payments.",
        features: ["Everything in Business site", "Product catalogue", "Order management", "Payment setup"],
        cta: "Talk to us",
      },
    ],
    faqs: [
      { q: "Can I update the site myself?", a: "Yes. Every site comes with an admin for text, images and products." },
      { q: "Do you handle hosting and domains?", a: "We can set up and manage both, or deploy to accounts you own." },
      { q: "How long does a website take?", a: "[Your timeline, for example: four to eight weeks depending on size.]" },
      sharedFaqs.pay,
    ],
  },
  {
    slug: "social-media",
    number: "05",
    name: "Social Media Marketing",
    shortName: "Social Media",
    tone: "social",
    toneText: "#5CD8FF",
    summary: "Content, campaigns and community management that keep people talking about you.",
    tags: ["Content", "Campaigns", "Growth"],
    icon: "growth",
    bookLabel: "Grow with us",
    offeringsHeading: {
      eyebrow: "What we run",
      title: "Always on,\nalways on brand",
      body: "Planned, made and posted by the same team that shapes your brand, so every post sounds like you.",
    },
    offerings: [
      {
        title: "Content",
        body: "Monthly posts, reels and stories designed and shot in-house.",
        media: { alt: "Navy social template with the crentive mark", placeholder: "Social posts" },
      },
      {
        title: "Campaigns",
        body: "Launches and promotions with paid ads and clear goals.",
        media: { alt: "", placeholder: "Campaign" },
      },
      {
        title: "Growth",
        body: "Community replies, reporting and steady improvements each month.",
        media: { alt: "", placeholder: "Growth report" },
      },
    ],
    steps: [
      { title: "Audit", body: "We review your pages, audience and competitors." },
      { title: "Plan", body: "A monthly calendar of posts, reels and campaigns." },
      { title: "Create & post", body: "We design, shoot, write and schedule everything." },
      { title: "Report", body: "A clear monthly report and next month's plan." },
    ],
    packages: [
      {
        id: "social-starter",
        name: "Starter",
        priceFrom: null,
        blurb: "A steady presence on one platform.",
        features: ["[00] posts a month", "1 platform", "Captions and hashtags", "Monthly report"],
        cta: "Book Starter",
      },
      {
        id: "social-growth",
        name: "Growth",
        priceFrom: null,
        blurb: "Posts, reels and community on two platforms.",
        features: ["[00] posts + [0] reels a month", "2 platforms", "Community replies", "Ad management"],
        highlighted: true,
        cta: "Book Growth",
      },
      {
        id: "social-campaign",
        name: "Campaign",
        priceFrom: null,
        blurb: "A launch or promotion from idea to results.",
        features: ["Campaign concept", "Photo and video content", "Paid ads", "Results report"],
        cta: "Talk to us",
      },
    ],
    faqs: [
      { q: "Which platforms do you manage?", a: "Instagram, Facebook, TikTok and LinkedIn." },
      { q: "Is ad spend included?", a: "No. Ad budget is paid directly to the platform; our fee covers planning and management." },
      { q: "Is there a minimum term?", a: "[Your minimum term, for example: three months.]" },
      sharedFaqs.pay,
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function getServiceOrThrow(slug: ServiceSlug) {
  const s = getService(slug);
  if (!s) throw new Error(`Unknown service ${slug}`);
  return s;
}

export function nextService(slug: ServiceSlug) {
  const i = services.findIndex((s) => s.slug === slug);
  return services[(i + 1) % services.length];
}
