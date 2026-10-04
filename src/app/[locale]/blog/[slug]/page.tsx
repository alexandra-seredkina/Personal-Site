import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeftIcon } from "@/components/icons/ui-icons";
import { JsonLd } from "@/components/json-ld";
import { Container } from "@/components/ui/container";
import { Tag } from "@/components/ui/tag";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { formatDate } from "@/lib/format";
import { articleJsonLd } from "@/lib/json-ld";
import { COVER_SIZE, getPost } from "@/lib/posts";
import { absoluteUrl, localizedPath, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: Locale; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPost(slug, locale);
  if (!post || post.meta.draft) return {};
  return pageMetadata({
    locale,
    path: `/blog/${slug}`,
    title: post.meta.title,
    description: post.meta.description,
    type: "article",
    publishedTime: post.meta.date,
    locales: post.locales,
    // Untranslated fallbacks point search engines at the original instead of duplicating it.
    canonicalLocale: post.contentLocale,
    ...(post.cover ? { image: { url: post.cover.src, ...COVER_SIZE, alt: post.cover.alt } } : {}),
  });
}

export default async function PostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = await getPost(slug, locale);
  if (!post || post.meta.draft) notFound();

  const t = await getTranslations("Blog");
  const { meta, cover, Content } = post;
  const url = absoluteUrl(localizedPath(post.contentLocale, `/blog/${slug}`));

  return (
    <Container className="max-w-3xl py-16 sm:py-24">
      <JsonLd
        data={articleJsonLd({
          title: meta.title,
          description: meta.description,
          url,
          datePublished: meta.date,
          locale: post.contentLocale,
          ...(cover ? { image: absoluteUrl(cover.src) } : {}),
        })}
      />
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 font-mono text-sm text-muted hover:text-accent"
      >
        <ArrowLeftIcon className="size-4" />
        {t("back")}
      </Link>

      <article className="mt-8" lang={post.contentLocale}>
        {cover && (
          <Image
            src={cover.src}
            alt={cover.alt}
            {...COVER_SIZE}
            priority
            sizes="(min-width: 768px) 720px, 100vw"
            className="mb-10 w-full rounded-2xl border border-line shadow-2xl shadow-accent/10"
          />
        )}
        <header>
          <p className="font-mono text-sm text-muted">
            <time dateTime={meta.date}>{formatDate(meta.date, locale)}</time> ·{" "}
            {t("readingTime", { minutes: meta.readingMinutes })}
          </p>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-balance sm:text-5xl">
            {meta.title}
          </h1>
          {meta.description && <p className="mt-4 text-lg text-muted">{meta.description}</p>}
          {meta.tags.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {meta.tags.map((tag) => (
                <li key={tag}>
                  <Tag>#{tag}</Tag>
                </li>
              ))}
            </ul>
          )}
        </header>

        {post.contentLocale !== locale && (
          <p className="card mt-8 px-4 py-3 text-sm text-muted" lang={locale}>
            {t("fallbackNotice")}
          </p>
        )}

        <div className="prose mt-10 max-w-none prose-headings:tracking-tight prose-a:no-underline hover:prose-a:underline">
          <Content />
        </div>
      </article>
    </Container>
  );
}
