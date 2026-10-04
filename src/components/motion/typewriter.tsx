"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

type Props = {
  words: string[];
  className?: string;
  typeMs?: number;
  deleteMs?: number;
  holdMs?: number;
};

/**
 * Types each word, holds it, erases it and moves on — terminal style.
 * Screen readers get the full list once; reduced motion shows the first word statically.
 */
export function Typewriter({ words, className, typeMs = 55, deleteMs = 30, holdMs = 1600 }: Props) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(words[0]?.length ?? 0);
  const [deleting, setDeleting] = useState(false);

  const word = words[index % words.length] ?? "";

  useEffect(() => {
    if (reduceMotion || words.length < 2) return;

    const finishedTyping = !deleting && length === word.length;
    const finishedDeleting = deleting && length === 0;
    const delay = finishedTyping ? holdMs : deleting ? deleteMs : typeMs;

    const id = setTimeout(() => {
      if (finishedTyping) setDeleting(true);
      else if (finishedDeleting) {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      } else setLength((n) => n + (deleting ? -1 : 1));
    }, delay);
    return () => clearTimeout(id);
  }, [reduceMotion, words.length, word.length, length, deleting, typeMs, deleteMs, holdMs]);

  return (
    <span className={className}>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden="true">{reduceMotion ? words[0] : word.slice(0, length)}</span>
    </span>
  );
}
