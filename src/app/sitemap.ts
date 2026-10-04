import type { MetadataRoute } from "next";
import { type Locale, routing } from "@/i18n/routing";
import { getPostLocales, getPosts } from "@/lib/posts";
import { absoluteUrl, languageAlternates, localizedPath } from "@/lib/seo";

type Entry = { path: string; locales: readonly Locale[]; lastModified?: string };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts(routing.defaultLocale);
  const latest = posts[0]?.meta.date;

  const entries: Entry[] = [
    { path: "/", locales: routing.locales, lastModified: latest },
    { path: "/blog", locales: routing.locales, lastModified: latest },
    ...(await Promise.all(
      posts.map(async ({ slug, meta }) => ({
        path: `/blog/${slug}`,
        locales: await getPostLocales(slug),
        lastModified: meta.date,
      })),
    )),
  ];

  // Only real translations are listed; fallback pages canonicalise to the original.
  return entries.flatMap(({ path, locales, lastModified }) =>
    locales.map((locale) => ({
      url: absoluteUrl(localizedPath(locale, path)),
      ...(lastModified ? { lastModified } : {}),
      alternates: { languages: languageAlternates(path, locales) },
    })),
  );
}
