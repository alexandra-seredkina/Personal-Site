/**
 * Single source of truth for identity, contacts and links.
 * Header, hero, footer, metadata and JSON-LD all read from here.
 */
export const site = {
  name: "Aleksandra Seredkina",
  initials: "AS",
  /** Other spellings people search for; helps search engines tie the profiles together. */
  alternateNames: ["Alexandra Seredkina", "Александра Серёдкина"],
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://seredkina.dev").replace(/\/$/, ""),
  /** `SITE_NOINDEX=1` at build time: private preview that search engines must not index. */
  noindex: process.env.SITE_NOINDEX === "1",
  email: "itsec.seredkina@gmail.com",
  cv: { href: "/cv/Aleksandra_Seredkina_CV.pdf", fileName: "Aleksandra_Seredkina_CV.pdf" },
  location: { city: "Tbilisi", country: "Georgia", countryCode: "GE" },
  employer: { name: "DvG Project", url: "https://www.dvg-project.com" },
} as const;

export const socials = [
  {
    id: "github",
    label: "GitHub",
    handle: "alexandra-seredkina",
    href: "https://github.com/alexandra-seredkina",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "alexandra-seredkina",
    href: "https://www.linkedin.com/in/alexandra-seredkina",
  },
  {
    id: "tryhackme",
    label: "TryHackMe",
    handle: "Meowness",
    href: "https://tryhackme.com/p/Meowness",
  },
  { id: "telegram", label: "Telegram", handle: "@meownesss", href: "https://t.me/meownesss" },
] as const;

export type Social = (typeof socials)[number];
export type SocialId = Social["id"];

export const sameAs = socials.map((social) => social.href);
