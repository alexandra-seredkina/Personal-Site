"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/cn";

export function LocaleSwitcher() {
  const t = useTranslations("Nav");
  const active = useLocale();
  const pathname = usePathname();

  return (
    <nav
      aria-label={t("language")}
      className="flex rounded-lg border border-line bg-white/5 p-0.5 font-mono text-xs"
    >
      {routing.locales.map((locale) => (
        <Link
          key={locale}
          href={pathname}
          locale={locale}
          hrefLang={locale}
          aria-current={locale === active ? "true" : undefined}
          className={cn(
            "rounded-md px-2 py-1 uppercase transition",
            locale === active ? "bg-accent/15 text-accent" : "text-muted hover:text-fg",
          )}
        >
          {locale}
        </Link>
      ))}
    </nav>
  );
}
