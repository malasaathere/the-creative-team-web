import type React from "react";
import clsx, { type ClassValue } from "clsx";
import type { Tone } from "@/content/types";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** "LKR 45,000" — or a bracketed placeholder while the studio decides prices. */
export function formatLKR(value: number | null, placeholder = "[00,000]") {
  if (value === null) return placeholder;
  return new Intl.NumberFormat("en-LK", { maximumFractionDigits: 0 }).format(value);
}

export const toneHex: Record<Tone, string> = {
  design: "#0078FF",
  photo: "#2B93FF",
  video: "#4A6FE8",
  web: "#0047B3",
  social: "#00C2FF",
};

/** Hero-card colour wash for a tone, as in the Photography mockup. */
export function toneWash(tone: Tone, corner: "bl" | "tr" = "bl") {
  const hex = toneHex[tone];
  const at = corner === "bl" ? "0% 100%" : "100% 0%";
  return `radial-gradient(110% 100% at ${at}, ${hex} 0%, color-mix(in oklab, ${hex} 38%, #070B18) 40%, #070B18 80%)`;
}

/** Hex to rgba string, for glows. */
export function alpha(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

/** Inline CSS custom properties, typed for React's style prop. */
export function vars(v: Record<`--${string}`, string | number>) {
  return v as React.CSSProperties;
}
