"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNav, site } from "@/content/site";
import { cn } from "@/lib/utils";
import { PillLink } from "../ui/PillLink";
import { Logo } from "./Logo";

/**
 * Fixed header: logo, five links, "Book a call". Hides when scrolling down,
 * returns when scrolling up. On phones the menu opens full screen with the
 * links rising one by one.
 */
export function Header() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 160 && y > last);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu on navigation.
  // eslint-disable-next-line react-hooks/set-state-in-effect -- sync with route change
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <a
        href="#main"
        className="fixed top-3 left-3 z-[80] -translate-y-20 rounded-full bg-white px-4 py-2 text-sm font-semibold text-bg focus:translate-y-0"
      >
        Skip to content
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-(--ease-expo)",
          hidden && !open ? "-translate-y-full" : "translate-y-0",
        )}
      >
        <div
          className={cn(
            "mx-2 mt-2 flex items-center justify-between gap-6 rounded-full px-4 py-3 transition-[background-color,backdrop-filter] duration-500 sm:mx-4 sm:mt-4 sm:px-6 lg:px-8 lg:py-4",
            scrolled && !open ? "bg-bg/70 backdrop-blur-xl" : "bg-transparent",
          )}
        >
          <Link href="/" aria-label={`${site.name} home`} className="relative z-10 inline-flex">
            <Logo height={26} />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-9 text-[15px] font-medium lg:flex">
            {mainNav.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={cn(
                  "relative py-1 transition-colors hover:text-white",
                  isActive(l.href) ? "text-blue-light" : "text-text",
                  "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100",
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="relative z-10 flex items-center gap-3">
            <span className="hidden min-[360px]:block">
              <PillLink href="/book">Book a call</PillLink>
            </span>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="flex size-11 items-center justify-center rounded-full bg-white/10 backdrop-blur lg:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span aria-hidden="true" className="relative block h-3 w-5">
                <span
                  className={cn(
                    "absolute left-0 h-0.5 w-5 rounded bg-white transition-transform duration-300",
                    open ? "top-[5px] rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-0.5 w-5 rounded bg-white transition-transform duration-300",
                    open ? "top-[5px] -rotate-45" : "top-2.5",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-40 flex flex-col justify-between bg-bg px-6 pt-28 pb-10 transition-[opacity,visibility] duration-500 lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
        aria-hidden={!open}
      >
        <div
          aria-hidden="true"
          className="absolute -bottom-40 -left-40 size-[520px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,120,255,0.35), transparent 65%)" }}
        />
        <nav aria-label="Mobile" className="relative flex flex-col gap-1">
          {[...mainNav, { label: "Contact", href: "/contact" }].map((l, i) => (
            <span key={l.href} className="mask-line">
              <Link
                href={l.href}
                tabIndex={open ? 0 : -1}
                className={cn(
                  "block font-display text-[clamp(40px,12vw,64px)] leading-[1.05] font-bold tracking-[-0.04em] transition-transform duration-700 ease-(--ease-expo)",
                  open ? "translate-y-0" : "translate-y-full",
                  isActive(l.href) && "text-blue-light",
                )}
                style={{ transitionDelay: open ? `${0.1 + i * 0.06}s` : "0s" }}
              >
                {l.label}
              </Link>
            </span>
          ))}
        </nav>
        <div className="relative flex flex-col gap-6">
          <PillLink href="/book" size="lg" className="self-start" tabIndex={open ? 0 : -1}>
            Book a call
          </PillLink>
          <p className="text-sm text-muted">
            {site.contact.email} · {site.contact.phone}
          </p>
        </div>
      </div>
    </>
  );
}
