import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { ctfs } from "@/config/profile";
import { linkedinPostUrl } from "@/content/linkedin";
import { formatMonth } from "@/lib/format";
import { ArrowUpRightIcon, AwardIcon, FlagIcon } from "../icons/ui-icons";
import { Reveal } from "../motion/reveal";
import { Container } from "../ui/container";
import { SectionHeader } from "../ui/section-header";
import { Tag } from "../ui/tag";

const linkClass =
  "inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline";

export async function Ctf() {
  const t = await getTranslations("Ctf");
  const locale = await getLocale();

  return (
    <section id="ctf" aria-labelledby="ctf-title" className="py-10 sm:py-14">
      <Container>
        <SectionHeader
          id="ctf"
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />
        <ol className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ctfs.map((ctf) => (
            <Reveal
              as="li"
              key={ctf.id}
              className="card group relative flex flex-col overflow-hidden p-5 sm:p-6 transition hover:border-accent/40"
            >
              <div
                aria-hidden="true"
                className="absolute -top-20 -right-20 size-40 rounded-full bg-accent/0 blur-3xl transition duration-500 group-hover:bg-accent/25"
              />
              <div className="flex items-center justify-between gap-3">
                {ctf.logo ? (
                  // Decorative: the competition name is right below.
                  <Image
                    src={ctf.logo}
                    alt=""
                    width={150}
                    height={150}
                    sizes="3rem"
                    className="size-12 rounded-xl ring-1 ring-line"
                  />
                ) : (
                  <span className="grid size-12 place-items-center rounded-xl bg-accent/10 text-accent">
                    <FlagIcon className="size-6" />
                  </span>
                )}
                <time dateTime={ctf.date} className="font-mono text-sm text-muted">
                  {formatMonth(ctf.date, locale)}
                </time>
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{ctf.name}</h3>
              <p className="text-sm text-muted">{ctf.organizer}</p>
              <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ok">
                <AwardIcon className="size-4 shrink-0" />
                {t(`items.${ctf.id}.result`)}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {t(`items.${ctf.id}.summary`)}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {ctf.tags.map((tag) => (
                  <li key={tag}>
                    <Tag>{tag}</Tag>
                  </li>
                ))}
              </ul>
              {(ctf.certificate || ctf.scoreboard || ctf.post) && (
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                  {ctf.certificate && (
                    <a
                      href={ctf.certificate}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      {t("certificate")}
                      <ArrowUpRightIcon className="size-4" />
                    </a>
                  )}
                  {ctf.scoreboard && (
                    <a
                      href={ctf.scoreboard}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      {t("scoreboard")}
                      <ArrowUpRightIcon className="size-4" />
                    </a>
                  )}
                  {ctf.post && (
                    <a
                      href={linkedinPostUrl(ctf.post)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      {t("post")}
                      <ArrowUpRightIcon className="size-4" />
                    </a>
                  )}
                </div>
              )}
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
