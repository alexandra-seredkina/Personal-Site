import { getTranslations } from "next-intl/server";
import { projects } from "@/config/profile";
import { ArrowUpRightIcon } from "../icons/ui-icons";
import { Reveal } from "../motion/reveal";
import { Character } from "../ui/character";
import { Container } from "../ui/container";
import { SectionHeader } from "../ui/section-header";
import { Tag } from "../ui/tag";

export async function Projects() {
  const t = await getTranslations("Projects");

  return (
    <section id="projects" aria-labelledby="projects-title" className="py-10 sm:py-14">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <SectionHeader id="projects" eyebrow={t("eyebrow")} title={t("title")} />
          <Character
            pose="laptop"
            alt={t("laptopAlt")}
            sizes="7rem"
            className="mb-6 hidden h-auto w-28 sm:block"
          />
        </div>
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <Reveal
              as="li"
              key={project.id}
              className="group card relative flex flex-col overflow-hidden p-7 transition hover:border-accent/40"
            >
              <div
                aria-hidden="true"
                className="absolute -top-24 -right-24 size-48 rounded-full bg-accent/0 blur-3xl transition duration-500 group-hover:bg-accent/25"
              />
              <h3 className="font-display text-xl font-semibold">
                {t(`items.${project.id}.title`)}
              </h3>
              <p className="mt-3 flex-1 leading-relaxed text-muted">
                {t(`items.${project.id}.body`)}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li key={tag}>
                    <Tag>{tag}</Tag>
                  </li>
                ))}
              </ul>
              {project.href && (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
                >
                  {t("source")}
                  <ArrowUpRightIcon className="size-4" />
                </a>
              )}
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
