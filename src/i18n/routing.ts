import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ru", "de"],
  defaultLocale: "en",
  // English lives at `/`, other languages at `/ru`, `/de`.
  localePrefix: "as-needed",
  // The URL is the only source of truth: no cookies, no Accept-Language redirects
  // (which would make `/` unreachable for e.g. Russian browsers and confuse crawlers).
  localeCookie: false,
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
