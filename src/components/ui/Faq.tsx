import type { Faq as FaqItem } from "@/content/types";

export function Faq({ items, title = "Questions, answered" }: { items: FaqItem[]; title?: string }) {
  return (
    <section className="relative z-[2] mx-auto max-w-[900px] px-4 py-20 sm:px-6 lg:px-10">
      <h2 className="mb-8 text-center text-[clamp(30px,3.4vw,44px)] font-bold tracking-[-0.03em]" data-reveal>
        {title}
      </h2>
      <div className="border-b border-white/12">
        {items.map((f, i) => (
          <details key={f.q} className="group border-t border-white/12 px-1 py-5.5" open={i === 0}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold [&::-webkit-details-marker]:hidden">
              {f.q}
              <span
                aria-hidden="true"
                className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/20 text-lg transition-transform duration-300 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3.5 max-w-[720px] text-[15px] leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
