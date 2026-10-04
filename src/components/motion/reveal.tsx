import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "section" | "article";
};

/**
 * Fades content in as it scrolls into view using CSS scroll-driven animations (`.reveal`
 * in globals.css). No JavaScript: content is fully visible in the server HTML, and browsers
 * without `animation-timeline` support or with reduced motion simply show it statically.
 */
export function Reveal({ children, className, as: Component = "div" }: Props) {
  return <Component className={cn("reveal", className)}>{children}</Component>;
}
