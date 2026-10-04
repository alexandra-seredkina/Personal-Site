import type { ReactNode } from "react";

/** Mono "// label" shown above section titles. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-sm text-accent">
      <span aria-hidden="true">{"// "}</span>
      {children}
    </p>
  );
}
