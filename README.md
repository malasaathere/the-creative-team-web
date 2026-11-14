# The crentive Team — website

The public site for The crentive Team: services, packages, portfolio, shop preview, about and
contact. Built from the [website plan](https://claude.ai/artifact/YTRxiEkRcbrQvGubhSpwr9) and
[UI concept](https://claude.ai/artifact/VWNR8qr9eDd4MQ7KWbgRXp).

**Stack:** Next.js 16 (App Router, Cache Components) · TypeScript · Tailwind CSS 4 · GSAP +
ScrollTrigger · Lenis · Zod. Fonts (Plus Jakarta Sans, Inter) are self-hosted.

## Run it

```bash
npm install
cp .env.example .env.local   # optional: only needed to email enquiries
npm run dev                  # http://localhost:3000
```

`npm run build` prerenders every page as static HTML. `npm run lint` checks the code.

## Where things live

| Path | What |
| --- | --- |
| `src/content/` | All site content: services, packages, projects, products, team, awards, slogans. Edit these to change copy, prices and images. Text in `[brackets]` is a placeholder. |
| `src/app/` | Pages: home, `services/[slug]`, `packages`, `work/[slug]`, `shop/[slug]`, `about`, `contact`, `book`, `privacy`, `terms`. |
| `src/app/contact/actions.ts` | Server Action for the enquiry form (contact, booking request, shop order request). |
| `src/components/sections/` | Page sections: work rail, package tabs, testimonials, awards list, service rows, CTA. |
| `src/components/motion/` | Smooth scroll, scroll reveals, travelling line, cursor, magnetic button, counters. |
| `src/app/globals.css` | Brand tokens (colours, fonts, radii) and the shared motion utilities. |
| `public/images`, `public/brand` | Photos and logo. See the README in each folder. |

## Brand tokens

`bg #05070D` · `surface #0B1020` · `card #111726` · `text #EEF1F6` · `muted #8A94A6` ·
`blue #0078FF`. Service tones: design `#0078FF`, photo `#2B93FF`, video `#4A6FE8`,
web `#0047B3`, social `#00C2FF`. Use them as Tailwind classes (`bg-surface`, `text-photo`…).

## Motion

- Scroll reveals: add `data-reveal` (fade + rise) or `data-reveal="clip"` (image wipe) to any
  element. Stagger with `style={vars({ "--i": index })}`.
- The travelling line on the home page is drawn by scroll (desktop only).
- Selected work pins and slides sideways on desktop; it is a swipe row on phones.
- Everything falls back to simple, static layout with **Reduce motion** switched on.

## Still to come (from the roadmap)

- Real logo, photos and copy in place of `[placeholders]`; decide prices.
- Phase 5 — booking with live time slots (PostgreSQL + Prisma, no-overlap constraint).
- Phase 6 — shop cart and checkout (order requests, bank transfer / COD / pickup).
- Admin area, auth, preloader and page transitions, footer line morphing into the "en." mark.

## Environment

See `.env.example`. Without `RESEND_API_KEY` and `CONTACT_TO_EMAIL`, enquiries are logged to
the server console instead of emailed.
