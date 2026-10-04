import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { JsonLd } from "@/components/json-ld";
import { Contact } from "@/components/sections/contact";
import { Ctf } from "@/components/sections/ctf";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Stack } from "@/components/sections/stack";
import { Stats } from "@/components/sections/stats";
import { Writing } from "@/components/sections/writing";
import type { Locale } from "@/i18n/routing";
import { personJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return pageMetadata({ locale, path: "/", description: t("description"), type: "profile" });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const hero = await getTranslations("Hero");
  const meta = await getTranslations("Meta");

  return (
    <>
      <JsonLd data={personJsonLd(hero("role"), meta("description"))} />
      <Hero />
      <Stats />
      <Stack />
      <Experience />
      <Ctf />
      <Projects />
      <Writing />
      <Contact />
    </>
  );
}
