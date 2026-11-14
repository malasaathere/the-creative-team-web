import Link from "next/link";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { vars } from "@/lib/utils";

const studio = [
  { label: "Work", href: "/work" },
  { label: "Packages", href: "/packages" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** Four columns, then the giant wordmark rising letter by letter. */
export function Footer() {
  const word = "crentive";
  return (
    <footer className="relative z-[2] mx-auto max-w-[1360px] overflow-hidden px-4 pt-24 pb-10 sm:px-6 lg:px-10">
      <div className="grid grid-cols-2 gap-x-6 gap-y-12 pb-16 md:grid-cols-4 md:gap-8 md:pb-20">
        <div className="col-span-2 flex flex-col gap-4 md:col-span-1">
          <p className="font-display text-[22px] leading-tight font-bold">
            Ideas move further<span className="text-blue">.</span>
          </p>
          <p className="text-sm text-muted">{site.slogans.team}</p>
        </div>
        <FooterCol title="Services">
          {services.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="hover:text-white">
              {s.shortName}
            </Link>
          ))}
        </FooterCol>
        <FooterCol title="Studio">
          {studio.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-white">
              {l.label}
            </Link>
          ))}
        </FooterCol>
        <FooterCol title="Say hello">
          <a href={`mailto:${site.contact.email}`} className="hover:text-white">
            {site.contact.email}
          </a>
          <a href={`tel:${site.contact.phone.replace(/[^+\d]/g, "")}`} className="hover:text-white">
            {site.contact.phone}
          </a>
          {site.social.slice(0, 2).map((s) => (
            <a key={s.label} href={s.href} className="hover:text-white" rel="noopener noreferrer">
              {s.label}
            </a>
          ))}
        </FooterCol>
      </div>

      <p
        aria-label="crentive"
        className="flex font-display text-[clamp(72px,21.5vw,300px)] leading-[0.8] font-extrabold tracking-[-0.06em] select-none"
      >
        {word.split("").map((ch, i) => (
          <span key={i} className="mask-line" aria-hidden="true">
            <span data-reveal className="block" style={vars({ "--i": i })}>
              {ch}
            </span>
          </span>
        ))}
        <span className="mask-line" aria-hidden="true">
          <span data-reveal className="block text-blue" style={vars({ "--i": word.length + 2 })}>
            .
          </span>
        </span>
      </p>

      <div className="mt-9 flex flex-wrap justify-between gap-4 border-t border-white/10 pt-6 text-[13px] text-muted">
        <span>
          © {site.year} {site.name}
        </span>
        <span>
          <Link href="/privacy" className="hover:text-white">
            Privacy
          </Link>{" "}
          ·{" "}
          <Link href="/terms" className="hover:text-white">
            Terms
          </Link>
        </span>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 text-[15px]">
      <p className="mb-1.5 text-[13px] text-muted">{title}</p>
      {children}
    </div>
  );
}
