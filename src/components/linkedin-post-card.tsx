import { getTranslations } from "next-intl/server";
import { type LinkedinPost, linkedinPostUrl } from "@/content/linkedin";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";
import { formatDate } from "@/lib/format";
import { SocialIcon } from "./icons/social-icon";
import { ArrowUpRightIcon } from "./icons/ui-icons";

type Props = {
  post: LinkedinPost;
  locale: Locale;
  /** `excerpt` clamps the text for previews; `full` renders the whole post. */
  variant?: "excerpt" | "full";
};

/** A LinkedIn post mirrored on the site. Posts are written in English, hence `lang="en"`. */
export async function LinkedinPostCard({ post, locale, variant = "full" }: Props) {
  const t = await getTranslations("Blog");
  const paragraphs = post.text.split(/\n{2,}/);

  return (
    <article lang="en" className="rounded-xl border border-line bg-white/[0.03] p-5">
      <header className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-sm font-semibold">
          <SocialIcon id="linkedin" className="size-4 text-[#0a66c2]" />
          LinkedIn
        </span>
        <time dateTime={post.date} className="font-mono text-xs text-muted" lang={locale}>
          {formatDate(post.date, locale)}
        </time>
      </header>

      <div
        className={cn(
          "mt-3 space-y-3 text-sm leading-relaxed",
          variant === "excerpt" && "line-clamp-4",
        )}
      >
        {(variant === "excerpt" ? paragraphs.slice(0, 2) : paragraphs).map((paragraph) => (
          <p key={paragraph} className="whitespace-pre-line">
            {paragraph}
          </p>
        ))}
      </div>

      {post.tags.length > 0 && (
        <p className="mt-3 flex flex-wrap gap-x-2 font-mono text-xs text-accent">
          {post.tags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </p>
      )}

      <footer className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold" lang={locale}>
        <a
          href={linkedinPostUrl(post.id)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-accent hover:underline"
        >
          {t("viewOnLinkedin")}
          <ArrowUpRightIcon className="size-3.5" />
        </a>
        {variant === "full" &&
          post.links?.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              lang="en"
              className="inline-flex items-center gap-1 text-muted hover:text-fg"
            >
              {link.label}
              <ArrowUpRightIcon className="size-3.5" />
            </a>
          ))}
      </footer>
    </article>
  );
}
