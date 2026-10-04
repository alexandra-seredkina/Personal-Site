import { Reveal } from "../motion/reveal";
import { Eyebrow } from "./eyebrow";

type Props = { id: string; eyebrow: string; title: string; description?: string };

/** Section heading with a mono "eyebrow"; `id` + `-title` labels the parent <section>. */
export function SectionHeader({ id, eyebrow, title, description }: Props) {
  return (
    <Reveal className="mb-8 max-w-2xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2
        id={`${id}-title`}
        className="mt-3 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl"
      >
        {title}
      </h2>
      {description && <p className="mt-4 text-lg text-muted">{description}</p>}
    </Reveal>
  );
}
