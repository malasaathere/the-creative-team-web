import type { ReactNode } from "react";
import { cn, vars } from "@/lib/utils";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-10", className)}>{children}</div>;
}

export function Eyebrow({ children, className, color }: { children: ReactNode; className?: string; color?: string }) {
  return (
    <p className={cn("mb-4 text-sm font-semibold text-photo", className)} style={color ? { color } : undefined}>
      {children}
    </p>
  );
}

/** Splits "Line one\nLine two" into <br/>-separated lines. */
export function Lines({ text }: { text: string }) {
  const parts = text.split("\n");
  return (
    <>
      {parts.map((p, i) => (
        <span key={i}>
          {p}
          {i < parts.length - 1 ? <br /> : null}
        </span>
      ))}
    </>
  );
}

type HeaderProps = {
  eyebrow: string;
  title: string;
  body?: string;
  action?: ReactNode;
  align?: "split" | "center";
  className?: string;
  eyebrowColor?: string;
};

/** The two-column section header used on every section (eyebrow + heading left, text + CTA right). */
export function SectionHeader({ eyebrow, title, body, action, align = "split", className, eyebrowColor }: HeaderProps) {
  if (align === "center") {
    return (
      <div className={cn("mb-10 text-center", className)} data-reveal>
        <Eyebrow color={eyebrowColor}>{eyebrow}</Eyebrow>
        <h2 className="text-[clamp(34px,4.4vw,60px)] leading-[1.04] font-bold tracking-[-0.03em]">
          <Lines text={title} />
        </h2>
        {body ? <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted">{body}</p> : null}
      </div>
    );
  }
  return (
    <div className={cn("mb-12 flex flex-wrap items-end justify-between gap-8", className)}>
      <div className="min-w-0 flex-[1_1_520px]" data-reveal>
        <Eyebrow color={eyebrowColor}>{eyebrow}</Eyebrow>
        <h2 className="text-[clamp(34px,4.4vw,60px)] leading-[1.04] font-bold tracking-[-0.03em]">
          <Lines text={title} />
        </h2>
      </div>
      {body || action ? (
        <div className="flex flex-[0_1_420px] flex-col justify-end gap-6" data-reveal style={vars({ "--i": 1 })}>
          {body ? <p className="text-base leading-relaxed text-muted md:text-lg md:text-soft">{body}</p> : null}
          {action ? <div>{action}</div> : null}
        </div>
      ) : null}
    </div>
  );
}

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("rounded-full border border-line-strong px-3.5 py-2 text-[13px] leading-none", className)}>
      {children}
    </span>
  );
}
