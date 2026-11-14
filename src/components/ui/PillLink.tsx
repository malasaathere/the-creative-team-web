import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Variant = "white" | "blue" | "outline" | "dark";

const styles: Record<Variant, { pill: string; dot: string; arrow: string }> = {
  white: { pill: "bg-white text-bg", dot: "bg-blue", arrow: "#FFFFFF" },
  blue: { pill: "bg-blue text-white", dot: "bg-white", arrow: "#0078FF" },
  dark: { pill: "bg-bg text-white", dot: "bg-white", arrow: "#05070D" },
  outline: { pill: "border border-white/40 text-white", dot: "", arrow: "" },
};

export function Arrow({ color = "currentColor", size = 14 }: { color?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

type Props = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  size?: "md" | "lg";
  className?: string;
  /** Overrides the dot colour (e.g. a service tone). */
  dotColor?: string;
};

/** Pill button with the round arrow on the right, as in the mockups. */
export function PillLink({ variant = "white", size = "md", className, dotColor, children, ...rest }: Props) {
  const s = styles[variant];
  const lg = size === "lg";
  if (variant === "outline") {
    return (
      <Link
        {...rest}
        className={cn(
          "inline-flex items-center rounded-full font-semibold transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-white/10",
          lg ? "px-6.5 py-4 text-[17px]" : "px-5 py-3 text-[15px]",
          s.pill,
          className,
        )}
      >
        {children}
      </Link>
    );
  }
  return (
    <Link
      {...rest}
      className={cn(
        "group/pill inline-flex items-center gap-3 rounded-full font-semibold transition-transform duration-300 hover:-translate-y-0.5",
        lg ? "py-2.25 pr-2.25 pl-6.5 text-[17px]" : "py-1.75 pr-1.75 pl-5 text-[15px]",
        s.pill,
        className,
      )}
    >
      {children}
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-full transition-transform duration-300 group-hover/pill:rotate-45",
          lg ? "size-10" : "size-8",
          s.dot,
        )}
        style={dotColor ? { background: dotColor } : undefined}
      >
        <Arrow color={dotColor ? "#05070D" : s.arrow} size={lg ? 16 : 14} />
      </span>
    </Link>
  );
}
