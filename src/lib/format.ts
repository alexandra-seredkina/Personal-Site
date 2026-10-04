import type { Locale } from "@/i18n/routing";

/** "2022-06" → "June 2022" in the given locale. */
export function formatMonth(isoMonth: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(new Date(`${isoMonth}-01T00:00:00Z`));
}

/** "2026-05" → "05.2026" / "05/2026": compact and grammatical in every locale. */
export function formatMonthNumeric(isoMonth: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "2-digit",
    timeZone: "UTC",
  }).format(new Date(`${isoMonth}-01T00:00:00Z`));
}

export function formatDate(isoDate: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}
