import { getTranslations } from "next-intl/server";
import type { ComponentType, SVGProps } from "react";
import { type StatId, stats } from "@/config/profile";
import { CodeIcon, FlameIcon, TerminalIcon, TrophyIcon } from "../icons/ui-icons";
import { CountUp } from "../motion/count-up";
import { Reveal } from "../motion/reveal";
import { Container } from "../ui/container";

const icons: Record<StatId, ComponentType<SVGProps<SVGSVGElement>>> = {
  years: CodeIcon,
  rank: TrophyIcon,
  rooms: TerminalIcon,
  streak: FlameIcon,
};

export async function Stats() {
  const t = await getTranslations("Stats");

  return (
    <section aria-labelledby="stats-title">
      <Container>
        <h2 id="stats-title" className="sr-only">
          {t("title")}
        </h2>
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = icons[stat.id];
            return (
              <Reveal
                as="li"
                key={stat.id}
                className="card flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:gap-4 sm:p-5"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent sm:size-11">
                  <Icon className="size-5" />
                </span>
                <p className="min-w-0">
                  <span className="block font-display text-2xl leading-none font-bold whitespace-nowrap sm:text-3xl">
                    <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  </span>
                  <span className="mt-1.5 block text-sm leading-snug text-muted">{t(stat.id)}</span>
                </p>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
