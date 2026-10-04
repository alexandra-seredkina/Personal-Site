import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

const variants = {
  primary:
    "bg-accent-strong text-white shadow-[0_0_40px_-8px] shadow-accent/70 hover:shadow-accent hover:brightness-110",
  secondary: "border border-line bg-white/5 text-fg hover:border-accent/60 hover:bg-white/10",
} as const;

export type ButtonVariant = keyof typeof variants;

export function buttonClassName(variant: ButtonVariant = "primary", className?: string) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition duration-200",
    variants[variant],
    className,
  );
}

type Props = ComponentProps<"a"> & { variant?: ButtonVariant };

/** Anchor styled as a button, for external links, downloads and `mailto:`. */
export function ButtonLink({ variant, className, ...props }: Props) {
  return <a className={buttonClassName(variant, className)} {...props} />;
}
