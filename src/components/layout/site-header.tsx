import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { site } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { DownloadIcon } from "../icons/ui-icons";
import { buttonClassName } from "../ui/button";
import { Container } from "../ui/container";
import { LocaleSwitcher } from "./locale-switcher";

const sections = ["stack", "experience", "ctf", "projects", "writing", "contact"] as const;

const navLinkClass =
  "rounded-lg px-3 py-2 text-sm text-muted transition hover:bg-white/5 hover:text-fg";

export async function SiteHeader() {
  const t = await getTranslations("Nav");

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/70 backdrop-blur-xl">
      <Container className="flex h-16 items-center gap-6">
        <Link href="/" className="flex items-center gap-2.5 font-display text-sm font-bold">
          <Image src="/logo.png" alt="" width={96} height={96} priority className="size-8" />
          <span className="sr-only sm:not-sr-only">{site.name}</span>
        </Link>

        <nav aria-label={t("menu")} className="hidden flex-1 lg:block">
          <ul className="flex items-center justify-center gap-1">
            {sections.map((id) => (
              <li key={id}>
                <Link href={`/#${id}`} className={navLinkClass}>
                  {t(id)}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/blog" className={navLinkClass}>
                {t("blog")}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Link href="/blog" className="px-2 text-sm text-muted hover:text-fg lg:hidden">
            {t("blog")}
          </Link>
          <LocaleSwitcher />
          <a
            href={site.cv.href}
            download={site.cv.fileName}
            aria-label={t("cv")}
            className={buttonClassName("primary", "px-3.5 py-2")}
          >
            <DownloadIcon className="size-4" />
            <span className="hidden sm:inline">{t("cv")}</span>
          </a>
        </div>
      </Container>
    </header>
  );
}
