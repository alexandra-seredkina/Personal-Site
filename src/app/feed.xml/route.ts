import { getTranslations } from "next-intl/server";
import { site } from "@/config/site";
import { routing } from "@/i18n/routing";
import { getPosts } from "@/lib/posts";
import { absoluteUrl, localizedPath } from "@/lib/seo";

const escapeXml = (value: string) =>
  value.replace(/[<>&'"]/g, (char) => `&#${char.charCodeAt(0)};`);

// Content only changes on deploy, so the feed is generated once at build time.
export const dynamic = "force-static";

/** RSS 2.0 feed of English posts. */
export async function GET() {
  const locale = routing.defaultLocale;
  const [posts, t] = await Promise.all([
    getPosts(locale),
    getTranslations({ locale, namespace: "Blog" }),
  ]);

  const items = posts
    .map(({ slug, meta }) => {
      const url = absoluteUrl(localizedPath(locale, `/blog/${slug}`));
      return `<item>
  <title>${escapeXml(meta.title)}</title>
  <link>${url}</link>
  <guid isPermaLink="true">${url}</guid>
  <description>${escapeXml(meta.description)}</description>
  <pubDate>${new Date(`${meta.date}T00:00:00Z`).toUTCString()}</pubDate>
</item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${escapeXml(site.name)}</title>
  <link>${site.url}</link>
  <description>${escapeXml(t("description"))}</description>
  <language>${locale}</language>
  <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
