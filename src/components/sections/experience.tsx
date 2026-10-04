import { getLocale, getTranslations } from "next-intl/server";
import { siTryhackme } from "simple-icons";
import { certifications, education, experience } from "@/config/profile";
import { formatMonth, formatMonthNumeric } from "@/lib/format";
import { BrandIcon } from "../icons/brand-icon";
import { ArrowUpRightIcon } from "../icons/ui-icons";
import { Reveal } from "../motion/reveal";
import { Container } from "../ui/container";
import { SectionHeader } from "../ui/section-header";
import { Tag } from "../ui/tag";

export async function Experience() {
  const t = await getTranslations("Experience");
  const locale = await getLocale();

  return (
    <section id="experience" aria-labelledby="experience-title" className="py-10 sm:py-14">
      <Container>
        <SectionHeader id="experience" eyebrow={t("eyebrow")} title={t("title")} />

        <ol className="relative space-y-8 border-l border-line pl-5 sm:pl-8">
          {experience.map((job) => (
            <Reveal as="li" key={job.id} className="relative">
              <span
                aria-hidden="true"
                className="absolute top-2 -left-[1.65rem] sm:-left-[2.4rem] size-3.5 rounded-full border-2 border-accent bg-bg shadow-[0_0_16px] shadow-accent"
              />
              <article className="card p-5 sm:p-8">
                <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                  <div>
                    <h3 className="font-display text-xl font-semibold">
                      {t(`items.${job.id}.role`)}
                    </h3>
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1 font-semibold text-accent hover:underline"
                    >
                      {job.company}
                      <ArrowUpRightIcon className="size-4" />
                    </a>
                  </div>
                  <p className="font-mono text-sm text-muted">
                    <time dateTime={job.start}>{formatMonth(job.start, locale)}</time> —{" "}
                    {job.end ? (
                      <time dateTime={job.end}>{formatMonth(job.end, locale)}</time>
                    ) : (
                      t("present")
                    )}
                  </p>
                </header>
                <p className="mt-4 text-muted">{t(`items.${job.id}.summary`)}</p>
                <ul className="mt-5 space-y-3">
                  {(t.raw(`items.${job.id}.highlights`) as string[]).map((highlight) => (
                    <li key={highlight} className="flex gap-3 leading-relaxed">
                      <span
                        aria-hidden="true"
                        className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent"
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {job.tags.map((tag) => (
                    <li key={tag}>
                      <Tag>{tag}</Tag>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </ol>

        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <Reveal className="card p-6">
            <h3 className="font-display text-lg font-semibold">{t("certsTitle")}</h3>
            <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {certifications.map((cert) => (
                <li key={cert.id}>
                  <a
                    href={cert.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${cert.name} — ${t("view")}`}
                    className="group flex h-full gap-3 rounded-xl border border-line bg-white/[0.03] p-4 transition hover:-translate-y-0.5 hover:border-accent/50"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-white/5">
                      <BrandIcon icon={siTryhackme} className="size-5 text-[#9fef00]" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-start justify-between gap-2 font-semibold group-hover:text-accent">
                        {cert.name}
                        <ArrowUpRightIcon className="mt-0.5 size-4 shrink-0 text-muted transition group-hover:text-accent" />
                      </span>
                      <span className="mt-1 block text-sm text-muted">
                        {cert.issuer} ·{" "}
                        {t("issued", { date: formatMonthNumeric(cert.issued, locale) })}
                        {cert.expires &&
                          `, ${t("expires", { date: formatMonthNumeric(cert.expires, locale) })}`}
                      </span>
                      <span className="mt-1.5 block truncate font-mono text-xs text-muted">
                        {t("credential")}: {cert.credentialId}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="card p-6">
            <h3 className="font-display text-lg font-semibold">{t("educationTitle")}</h3>
            <ul className="mt-5 space-y-3">
              {education.map((item) => (
                <li key={item.id}>
                  <p className="font-medium">{t(`education.${item.id}.title`)}</p>
                  <p className="text-sm text-muted">{t(`education.${item.id}.school`)}</p>
                  <p className="mt-1 font-mono text-sm text-muted">
                    {item.start} — {item.end}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
