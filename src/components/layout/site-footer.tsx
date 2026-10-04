import { getTranslations } from "next-intl/server";
import { site } from "@/config/site";
import { Container } from "../ui/container";
import { SocialLinks } from "../ui/social-links";

export async function SiteFooter() {
  const t = await getTranslations("Footer");
  const year = new Date().getUTCFullYear();

  return (
    <footer className="border-t border-line">
      <Container className="flex flex-col gap-6 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p>
            © {year} {site.name}
          </p>
          <p className="font-mono text-xs">{t("privacy")}</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
          <SocialLinks variant="icon" />
          <a href="/feed.xml" className="hover:text-fg">
            {t("rss")}
          </a>
          <a href="/.well-known/security.txt" className="font-mono text-xs hover:text-fg">
            {t("security")}
          </a>
        </div>
      </Container>
    </footer>
  );
}
