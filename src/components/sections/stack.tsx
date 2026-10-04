import { getTranslations } from "next-intl/server";
import { logos, stack, type Tech } from "@/config/profile";
import { BrandIcon } from "../icons/brand-icon";
import { Reveal } from "../motion/reveal";
import { Container } from "../ui/container";
import { SectionHeader } from "../ui/section-header";

function TechChip({ tech }: { tech: Tech }) {
  return (
    <li className="group flex items-center gap-2.5 rounded-xl border border-line bg-white/[0.03] px-3 py-2.5 transition hover:-translate-y-0.5 hover:border-accent/50 hover:bg-white/[0.06]">
      {tech.icon ? (
        <BrandIcon icon={tech.icon} colored className="size-5 shrink-0" />
      ) : (
        <span
          aria-hidden="true"
          className="grid size-5 shrink-0 place-items-center rounded bg-accent/15 font-mono text-[10px] font-bold text-accent"
        >
          {tech.name.charAt(0)}
        </span>
      )}
      <span className="text-sm font-medium">{tech.name}</span>
    </li>
  );
}

function LogoMarquee() {
  // The list is rendered twice so the -50% translate loops seamlessly.
  const track = [...logos, ...logos];
  return (
    <div
      aria-hidden="true"
      className="mt-14 overflow-hidden mask-[linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
    >
      <ul className="flex w-max motion-safe:animate-marquee gap-10 hover:[animation-play-state:paused]">
        {track.map((tech, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: duplicated track, position is the identity
          <li key={`${tech.name}-${index}`} className="text-muted/60 transition hover:text-fg">
            {tech.icon && <BrandIcon icon={tech.icon} className="size-9" />}
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function Stack() {
  const t = await getTranslations("Stack");

  return (
    <section id="stack" aria-labelledby="stack-title" className="py-10 sm:py-14">
      <Container>
        <SectionHeader
          id="stack"
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {stack.map((group) => (
            <Reveal key={group.id} className="card p-6">
              <h3 className="font-display text-lg font-semibold">{t(`groups.${group.id}`)}</h3>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {group.items.map((tech) => (
                  <TechChip key={tech.name} tech={tech} />
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
        <LogoMarquee />
      </Container>
    </section>
  );
}
