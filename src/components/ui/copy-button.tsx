"use client";

import { useEffect, useState } from "react";
import { CheckIcon, CopyIcon } from "../icons/ui-icons";

type Props = { value: string; label: string; copiedLabel: string };

export function CopyButton({ value, label, copiedLabel }: Props) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      // Clipboard access can be denied; the address stays visible and selectable.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? copiedLabel : label}
      title={copied ? copiedLabel : label}
      className="grid size-10 place-items-center rounded-lg border border-line text-muted transition hover:border-accent/60 hover:text-fg"
    >
      {copied ? <CheckIcon className="size-4 text-ok" /> : <CopyIcon className="size-4" />}
      <span className="sr-only" aria-live="polite">
        {copied ? copiedLabel : ""}
      </span>
    </button>
  );
}
