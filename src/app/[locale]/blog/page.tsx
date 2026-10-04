import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LinkedinPostCard } from "@/components/linkedin-post-card";
import { Reveal } from "@/components/motion/reveal";
import { PostList } from "@/components/post-list";
import { Character } from "@/components/ui/character";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { linkedinPosts } from "@/content/linkedin";
import type { Locale } from "@/i18n/routing";
import { getPosts } from "@/lib/posts";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });
  return pageMetadata({ locale, path: "/blog", title: t("title"), description: t("description") });
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Blog");
  const posts = await getPosts(locale);

  return (
    <Container className="max-w-4xl py-12 sm:py-16">
      <Reveal className="flex items-end justify-between gap-6">
        <div>
          <Eyebrow>blog</Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted">{t("description")}</p>
        </div>
        <Character
          pose="reading"
          alt={t("readingAlt")}
          sizes="9rem"
          className="hidden h-auto w-36 sm:block"
        />
      </Reveal>

      <section aria-labelledby="articles-title" className="mt-10">
        <h2 id="articles-title" className="font-display text-2xl font-semibold">
          {t("articlesTitle")}
        </h2>
        <Reveal className="card mt-4 p-6 sm:p-8">
          <PostList posts={posts} locale={locale} headingLevel={3} />
        </Reveal>
      </section>

      <section id="linkedin" aria-labelledby="linkedin-title" className="mt-12">
        <h2 id="linkedin-title" className="font-display text-2xl font-semibold">
          {t("linkedinTitle")}
        </h2>
        <p className="mt-2 text-muted">{t("linkedinDescription")}</p>
        <ol className="mt-5 space-y-4">
          {linkedinPosts.map((post) => (
            <Reveal as="li" key={post.id}>
              <LinkedinPostCard post={post} locale={locale} />
            </Reveal>
          ))}
        </ol>
      </section>
    </Container>
  );
}
