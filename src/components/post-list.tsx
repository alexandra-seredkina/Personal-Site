import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { formatDate } from "@/lib/format";
import { COVER_SIZE, type Post } from "@/lib/posts";

type Props = {
  posts: Post[];
  locale: Locale;
  /** Heading level of each post title, so the outline stays valid in every context. */
  headingLevel?: 2 | 3 | 4;
};

export async function PostList({ posts, locale, headingLevel = 3 }: Props) {
  const Heading = `h${headingLevel}` as const;
  const t = await getTranslations("Blog");

  if (posts.length === 0) return <p className="text-muted">{t("empty")}</p>;

  return (
    <ul className="divide-y divide-line border-y border-line">
      {posts.map(({ slug, meta, cover }) => (
        <li key={slug}>
          <Link href={`/blog/${slug}`} className="group flex flex-col gap-4 py-5 sm:flex-row">
            {cover && (
              <div className="shrink-0 self-start overflow-hidden rounded-xl border border-line sm:w-40">
                <Image
                  src={cover.src}
                  // Decorative here: the title next to it already names the link.
                  alt=""
                  {...COVER_SIZE}
                  sizes="(min-width: 640px) 160px, 100vw"
                  className="w-full transition duration-500 motion-safe:group-hover:scale-105"
                />
              </div>
            )}
            <div className="min-w-0">
              <p className="font-mono text-xs text-muted">
                <time dateTime={meta.date}>{formatDate(meta.date, locale)}</time> ·{" "}
                {t("readingTime", { minutes: meta.readingMinutes })}
              </p>
              <Heading className="mt-1 text-lg font-semibold group-hover:text-accent">
                {meta.title}
              </Heading>
              {meta.description && <p className="mt-1 text-muted">{meta.description}</p>}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
