import { getTranslations } from "next-intl/server";
import { site } from "@/config/site";
import { DownloadIcon, MailIcon } from "../icons/ui-icons";
import { Reveal } from "../motion/reveal";
import { ButtonLink } from "../ui/button";
import { Character } from "../ui/character";
import { Container } from "../ui/container";
import { CopyButton } from "../ui/copy-button";
import { Eyebrow } from "../ui/eyebrow";
import { SocialLinks } from "../ui/social-links";

export async function Contact() {
  const t = await getTranslations("Contact");
  const nav = await getTranslations("Nav");

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-10 sm:py-14">
      <Container>
        <Reveal className="card relative overflow-hidden p-5 sm:p-10 md:p-12">
          <div
            aria-hidden="true"
            className="absolute -top-32 -left-32 size-96 rounded-full bg-accent/12 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -right-32 -bottom-32 size-96 rounded-full bg-accent-2/20 blur-3xl"
          />

          <div className="relative grid grid-cols-1 items-center gap-10 md:grid-cols-[minmax(0,1fr)_auto]">
            <div>
              <Eyebrow>{t("eyebrow")}</Eyebrow>
              <h2
                id="contact-title"
                className="mt-3 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl"
              >
                {t("title")}
              </h2>
              <p className="mt-4 max-w-xl text-lg text-muted">{t("body")}</p>

              <div className="mt-8 flex max-w-md items-center gap-2 rounded-xl border border-line bg-bg/60 p-2 pl-4">
                <MailIcon className="size-5 shrink-0 text-accent" />
                <a
                  href={`mailto:${site.email}`}
                  className="min-w-0 flex-1 truncate font-mono text-sm hover:text-accent"
                >
                  {site.email}
                </a>
                <CopyButton value={site.email} label={t("copy")} copiedLabel={t("copied")} />
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href={`mailto:${site.email}`}>
                  <MailIcon className="size-4" />
                  {nav("contact")}
                </ButtonLink>
                <ButtonLink href={site.cv.href} download={site.cv.fileName} variant="secondary">
                  <DownloadIcon className="size-4" />
                  {nav("cv")}
                </ButtonLink>
              </div>

              <SocialLinks variant="compact" className="mt-8" />
            </div>

            <Character
              pose="wave"
              alt={t("waveAlt")}
              sizes="14rem"
              className="mx-auto h-auto w-44 md:w-56"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
