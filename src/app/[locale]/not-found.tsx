import { getTranslations } from "next-intl/server";
import { buttonClassName } from "@/components/ui/button";
import { Character } from "@/components/ui/character";
import { Container } from "@/components/ui/container";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <Container className="flex flex-col items-center py-20 text-center">
      <Character
        pose="lost"
        alt={t("lostAlt")}
        sizes="12rem"
        className="h-auto w-48 motion-safe:animate-float"
      />
      <p className="mt-8 font-mono text-sm text-accent">$ curl -I {"<path>"} → 404 Not Found</p>
      <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-3 text-muted">{t("body")}</p>
      <Link href="/" className={buttonClassName("primary", "mt-8")}>
        ← {t("home")}
      </Link>
    </Container>
  );
}
