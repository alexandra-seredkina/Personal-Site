import { getLocale, getTranslations } from "next-intl/server";
import { linkedinPosts } from "@/content/linkedin";
import { Link } from "@/i18n/navigation";
import { getPosts } from "@/lib/posts";
import { SocialIcon } from "../icons/social-icon";
import { LinkedinPostCard } from "../linkedin-post-card";
import { Reveal } from "../motion/reveal";
import { PostCard } from "../post-card";
import { Container } from "../ui/container";
import { SectionHeader } from "../ui/section-header";

const PREVIEW_COUNT = 3;

export async function Writing() {
  const t = await getTranslations("Writing");
  const locale = await getLocale();
  const [featured, ...rest] = (await getPosts(locale)).slice(0, PREVIEW_COUNT);

  return (
    <section id="writing" aria-labelledby="writing-title" className="py-10 sm:py-14">
      <Container>
        <SectionHeader id="writing" eyebrow={t("eyebrow")} title={t("title")} />
        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h3 className="font-display text-lg font-semibold">{t("blogTitle")}</h3>
            {featured && (
              <Reveal className="mt-4">
                <PostCard post={featured} locale={locale} variant="featured" />
              </Reveal>
            )}
            {rest.length > 0 && (
              <ul className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {rest.map((post) => (
                  <Reveal as="li" key={post.slug}>
                    <PostCard post={post} locale={locale} />
                  </Reveal>
                ))}
              </ul>
            )}
            <Link
              href="/blog"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
            >
              {t("allPosts")} →
            </Link>
          </div>

          <div>
            <h3 className="flex items-center gap-2.5 font-display text-lg font-semibold">
              <SocialIcon id="linkedin" className="size-5 text-[#0a66c2]" />
              {t("linkedinTitle")}
            </h3>
            <ul className="mt-4 space-y-5">
              {linkedinPosts.slice(0, PREVIEW_COUNT).map((post) => (
                <li key={post.id}>
                  <LinkedinPostCard post={post} locale={locale} variant="excerpt" />
                </li>
              ))}
            </ul>
            <Link
              href="/blog#linkedin"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
            >
              {t("allLinkedin")} →
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
