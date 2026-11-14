import { PillLink } from "@/components/ui/PillLink";

export default function NotFound() {
  return (
    <section className="px-2 pt-2 sm:px-4 sm:pt-4">
      <div
        className="relative flex min-h-[80svh] flex-col items-start justify-end gap-8 overflow-hidden rounded-[24px] px-6 pt-32 pb-12 sm:rounded-hero sm:px-14 sm:pb-16"
        style={{ background: "radial-gradient(110% 100% at 0% 100%, #0078FF 0%, #0B2A66 40%, #070B18 80%)" }}
      >
        <p className="text-[13px] tracking-[0.14em] text-white/80 uppercase">Error 404</p>
        <h1 className="text-[clamp(52px,9vw,140px)] leading-[0.92] font-extrabold tracking-[-0.045em]">
          This page
          <br />
          moved further<span className="text-blue-light">.</span>
        </h1>
        <p className="max-w-md text-lg text-white/85">The link may be old or mistyped. Let&apos;s get you back on the line.</p>
        <PillLink href="/">Back to home</PillLink>
      </div>
    </section>
  );
}
