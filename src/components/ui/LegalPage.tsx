import { Container } from "./Section";

/** Simple text page for policies. Content is a placeholder until the studio's own policy is written. */
export function LegalPage({ title, sections }: { title: string; sections: { heading: string; body: string }[] }) {
  return (
    <Container className="max-w-[860px] pt-36 pb-24">
      <h1 className="mb-4 text-[clamp(44px,6vw,80px)] leading-none font-extrabold tracking-[-0.04em]">
        {title}
        <span className="text-blue">.</span>
      </h1>
      <p className="mb-14 text-sm text-muted">[Last updated: date]</p>
      <div className="flex flex-col gap-10">
        {sections.map((s) => (
          <section key={s.heading}>
            <h2 className="mb-3 text-2xl font-bold tracking-[-0.02em]">{s.heading}</h2>
            <p className="text-[17px] leading-relaxed text-soft">{s.body}</p>
          </section>
        ))}
      </div>
    </Container>
  );
}
