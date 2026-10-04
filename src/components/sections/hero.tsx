import { getTranslations } from "next-intl/server";
import { heroOrbit } from "@/config/profile";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";
import { BrandIcon } from "../icons/brand-icon";
import { DownloadIcon, MailIcon, PinIcon } from "../icons/ui-icons";
import { Typewriter } from "../motion/typewriter";
import { ButtonLink } from "../ui/button";
import { Character } from "../ui/character";
import { Container } from "../ui/container";
import { SocialLinks } from "../ui/social-links";

/** Positions (relative to the artwork frame) for the `heroOrbit` logos, in order. */
const orbitSlots = [
  "top-[10%] left-[2%]",
  "top-[4%] right-[4%] [animation-delay:1.5s]",
  "top-[44%] -right-2 [animation-delay:3s] sm:-right-5",
  "bottom-[16%] left-0 [animation-delay:4.5s] sm:-left-3",
] as const;

function HeroScene({ alt }: { alt: string }) {
  return (
    <div className="relative mx-auto grid aspect-square w-full max-w-sm place-items-center lg:max-w-md">
      {/* Organic backdrop: a glow and two wobbly rings that morph out of phase while rotating. */}
      <div
        aria-hidden="true"
        className="absolute inset-[8%] rounded-[42%_58%_70%_30%/45%_45%_55%_55%] bg-linear-to-br from-accent/30 to-accent-2/25 blur-3xl motion-safe:animate-morph"
      />
      <div aria-hidden="true" className="absolute inset-[2%] motion-safe:animate-spin-slow">
        <div className="size-full rounded-[42%_58%_70%_30%/45%_45%_55%_55%] border-2 border-dashed border-accent/40 motion-safe:animate-morph" />
      </div>
      <div aria-hidden="true" className="absolute inset-[9%] motion-safe:animate-spin-reverse">
        <div className="size-full rounded-[58%_42%_35%_65%/55%_60%_40%_45%] border border-accent-2/40 motion-safe:animate-morph-alt" />
      </div>

      <div className="relative h-full motion-safe:animate-float">
        <Character
          pose="hero"
          alt={alt}
          priority
          sizes="(min-width: 1024px) 16rem, 14rem"
          className="h-full w-auto mask-[linear-gradient(to_bottom,black_82%,transparent)]"
        />
        {/* Laser sweep over the character. */}
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden motion-reduce:hidden">
          <div className="h-1/3 w-full animate-scan bg-linear-to-b from-transparent via-accent/10 to-accent/40 mask-[linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]" />
        </div>
      </div>

      {heroOrbit.map((icon, index) => (
        <span
          key={icon.slug}
          aria-hidden="true"
          className={cn(
            "card absolute grid size-12 place-items-center shadow-lg shadow-black/40 motion-safe:animate-float sm:size-14",
            orbitSlots[index],
          )}
        >
          <BrandIcon icon={icon} colored className="size-6 sm:size-7" />
        </span>
      ))}
    </div>
  );
}

export async function Hero() {
  const t = await getTranslations("Hero");

  return (
    <section aria-labelledby="hero-title" className="relative pt-10 pb-10 sm:pt-16">
      <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-ok/30 bg-ok/10 px-3.5 py-1.5 text-sm text-ok">
            <span className="size-2 rounded-full bg-ok motion-safe:animate-pulse-dot" />
            {t("available")}
          </p>

          <h1 id="hero-title" className="mt-6 font-display font-bold tracking-tight">
            <span className="block text-lg font-medium text-muted sm:text-xl">{t("greeting")}</span>
            <span className="mt-2 block text-[2.6rem] leading-[1.05] text-balance min-[400px]:text-5xl sm:text-6xl xl:text-7xl">
              <span className="text-gradient">{site.name}</span>
            </span>
          </h1>

          <p className="mt-5 font-display text-xl font-semibold sm:text-2xl">{t("role")}</p>
          <p className="mt-3 font-mono text-base text-muted sm:text-lg">
            <span className="text-accent">$</span> {t("specialtiesLead")}{" "}
            <Typewriter words={t.raw("specialties") as string[]} className="text-fg" />
            <span
              aria-hidden="true"
              className="ml-0.5 inline-block w-2 bg-accent motion-safe:animate-pulse"
            >
              &nbsp;
            </span>
          </p>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-pretty text-muted">
            {t("lede")}
          </p>
          <p className="mt-3 inline-flex items-center gap-2 text-sm text-muted">
            <PinIcon className="size-4 text-accent" />
            {t("location")}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href={site.cv.href} download={site.cv.fileName}>
              <DownloadIcon className="size-4" />
              {t("ctaCv")}
            </ButtonLink>
            <ButtonLink href={`mailto:${site.email}`} variant="secondary">
              <MailIcon className="size-4" />
              {t("ctaContact")}
            </ButtonLink>
          </div>

          <SocialLinks variant="compact" className="mt-6" />
        </div>

        <HeroScene alt={t("characterAlt")} />
      </Container>
    </section>
  );
}
