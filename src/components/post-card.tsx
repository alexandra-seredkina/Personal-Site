import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";
import { formatDate } from "@/lib/format";
import { COVER_SIZE, type Post } from "@/lib/posts";

type Props = {
  post: Post;
  locale: Locale;
  /** `featured`: wide card with the title over the cover; `compact`: cover on top, title below. */
  variant?: "featured" | "compact";
  headingLevel?: 3 | 4;
};

/** Blog post teaser built around the cover artwork; posts without a cover get a plain card. */
export async function PostCard({ post, locale, variant = "compact", headingLevel = 4 }: Props) {
  const Heading = `h${headingLevel}` as const;
  const t = await getTranslations("Blog");
  const { slug, meta, cover } = post;
  const featured = variant === "featured";

  return (
    <Link
      href={`/blog/${slug}`}
      className="group card relative flex h-full flex-col overflow-hidden transition hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/10"
    >
      {cover && (
        <div className="relative overflow-hidden">
          <Image
            src={cover.src}
            // Decorative here: the title already names the link.
            alt=""
            {...COVER_SIZE}
            sizes={
              featured ? "(min-width: 1024px) 760px, 100vw" : "(min-width: 1024px) 380px, 100vw"
            }
            className="w-full transition duration-700 motion-safe:group-hover:scale-105"
          />
          {featured && (
            <div className="absolute inset-0 hidden bg-linear-to-t from-bg from-5% via-bg/75 via-35% to-transparent to-70% sm:block" />
          )}
        </div>
      )}

      <div
        className={cn(
          "flex flex-1 flex-col p-5",
          featured && cover && "sm:absolute sm:inset-x-0 sm:bottom-0 sm:max-w-[62%] sm:p-7",
        )}
      >
        <p className={cn("font-mono text-xs text-muted", featured && cover && "sm:text-fg/80")}>
          <time dateTime={meta.date}>{formatDate(meta.date, locale)}</time> ·{" "}
          {t("readingTime", { minutes: meta.readingMinutes })}
        </p>
        <Heading
          className={cn(
            "mt-2 font-semibold text-balance group-hover:text-accent",
            featured ? "font-display text-xl sm:text-2xl" : "text-base",
          )}
        >
          {meta.title}
        </Heading>
        {featured && meta.description && (
          <p className="mt-2 line-clamp-2 text-sm text-muted sm:text-fg/75">{meta.description}</p>
        )}
      </div>
    </Link>
  );
}
