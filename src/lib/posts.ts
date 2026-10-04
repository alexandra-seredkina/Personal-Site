import "server-only";

import { access, readdir } from "node:fs/promises";
import path from "node:path";
import type { ComponentType } from "react";
import { cache } from "react";
import { type Locale, routing } from "@/i18n/routing";
import { type PostMeta, parsePostMeta } from "./post-schema";

const POSTS_DIR = path.join(process.cwd(), "src", "content", "posts");
const COVERS_DIR = path.join(process.cwd(), "public", "posts");

/** Cover artwork size; every file in `public/posts/` is exported at this size. */
export const COVER_SIZE = { width: 1424, height: 752 } as const;

export type PostCover = { src: string; alt: string };

export type Post = {
  slug: string;
  /** Locale the content is actually written in (the default locale when not yet translated). */
  contentLocale: Locale;
  /** Every locale this post has a translation for. */
  locales: Locale[];
  meta: PostMeta;
  cover: PostCover | null;
  Content: ComponentType;
};

type MdxModule = { default: ComponentType; metadata?: unknown };

async function exists(file: string): Promise<boolean> {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

export const getPostSlugs = cache(async (): Promise<string[]> => {
  const entries = await readdir(POSTS_DIR, { withFileTypes: true });
  return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
});

/** Locales a post is translated into, based on `<slug>/<locale>.mdx` files. */
export const getPostLocales = cache(async (slug: string): Promise<Locale[]> => {
  const checks = await Promise.all(
    routing.locales.map(async (locale) =>
      (await exists(path.join(POSTS_DIR, slug, `${locale}.mdx`))) ? locale : null,
    ),
  );
  return checks.filter((locale): locale is Locale => locale !== null);
});

/** Loads a post in the requested locale, falling back to the default locale. */
export const getPost = cache(async (slug: string, locale: Locale): Promise<Post | null> => {
  if (!(await getPostSlugs()).includes(slug)) return null;

  const locales = await getPostLocales(slug);
  const contentLocale = locales.includes(locale) ? locale : routing.defaultLocale;
  if (!locales.includes(contentLocale)) return null;

  // Errors here are real (broken MDX), so they are allowed to surface.
  const mod = (await import(`@/content/posts/${slug}/${contentLocale}.mdx`)) as MdxModule;
  const file = `${slug}/${contentLocale}.mdx`;
  const meta = parsePostMeta(mod.metadata, file);

  let cover: PostCover | null = null;
  if (await exists(path.join(COVERS_DIR, `${slug}.jpg`))) {
    if (!meta.coverAlt)
      throw new Error(`Missing coverAlt in ${file} (public/posts/${slug}.jpg exists)`);
    cover = { src: `/posts/${slug}.jpg`, alt: meta.coverAlt };
  }

  return { slug, contentLocale, locales, meta, cover, Content: mod.default };
});

/** All published posts for a locale (with fallbacks), newest first. */
export const getPosts = cache(async (locale: Locale): Promise<Post[]> => {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(slugs.map((slug) => getPost(slug, locale)));
  return posts
    .filter((post): post is Post => post !== null && !post.meta.draft)
    .sort((a, b) => b.meta.date.localeCompare(a.meta.date));
});
