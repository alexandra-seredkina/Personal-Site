import type { ReactNode } from "react";

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-lg border border-line bg-white/5 px-2.5 py-1 font-mono text-xs text-muted">
      {children}
    </span>
  );
}
