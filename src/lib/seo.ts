import type { Metadata } from "next";
import { site } from "@/config/site";
import { type Locale, routing } from "@/i18n/routing";

/**
 * Shared social image (`app/opengraph-image.tsx`). Listed explicitly because metadata merges
 * shallowly: a page-level `openGraph` object would otherwise drop the inherited image.
 */
const ogImage = { url: "/opengraph-image", width: 1200, height: 630, alt: site.name };

/** Open Graph expects `language_TERRITORY`. */
const ogLocales: Record<Locale, string> = { en: "en_US", ru: "ru_RU", de: "de_DE" };

/** Public path for a locale with the `as-needed` prefix strategy (`/` for the default locale). */
export function localizedPath(locale: Locale, path = "/"): string {
  const clean = path === "/" ? "" : path.replace(/\/$/, "");
  return locale === routing.defaultLocale ? clean || "/" : `/${locale}${clean}`;
}

export function absoluteUrl(path: string): string {
  return new URL(path, `${site.url}/`).toString();
}

/** hreflang alternates for the given locales (all by default) plus `x-default`. */
export function languageAlternates(
  path = "/",
  locales: readonly Locale[] = routing.locales,
): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = absoluteUrl(localizedPath(locale, path));
  }
  languages["x-default"] = absoluteUrl(localizedPath(routing.defaultLocale, path));
  return languages;
}

type PageMetadataInput = {
  locale: Locale;
  path: string;
  title?: string;
  description: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  /** Locales the page exists in; defaults to all. */
  locales?: readonly Locale[];
  /** Locale whose URL is canonical — differs from `locale` for untranslated fallbacks. */
  canonicalLocale?: Locale;
  /** Social image for this page; the shared site image by default. */
  image?: { url: string; width: number; height: number; alt: string };
};

export function pageMetadata({
  locale,
  path,
  title,
  description,
  type = "website",
  publishedTime,
  locales = routing.locales,
  canonicalLocale = locale,
  image = ogImage,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(localizedPath(canonicalLocale, path));
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: url, languages: languageAlternates(path, locales) },
    openGraph: {
      type,
      url,
      siteName: site.name,
      locale: ogLocales[locale],
      alternateLocale: locales.filter((other) => other !== locale).map((other) => ogLocales[other]),
      description,
      images: [image],
      ...(title ? { title } : {}),
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: { card: "summary_large_image", images: [image.url] },
  };
}
