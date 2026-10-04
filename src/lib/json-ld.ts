import { sameAs, site } from "@/config/site";
import { absoluteUrl } from "./seo";

type JsonLd = Record<string, unknown>;

/** Serialises JSON-LD safely for embedding in a <script> tag (no `</script>` breakout). */
export function serializeJsonLd(data: JsonLd): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

export function personJsonLd(jobTitle: string, description: string): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: site.name,
    alternateName: site.alternateNames,
    url: site.url,
    email: `mailto:${site.email}`,
    jobTitle,
    description,
    worksFor: { "@type": "Organization", name: site.employer.name, url: site.employer.url },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressCountry: site.location.countryCode,
    },
    knowsAbout: [
      "Penetration testing",
      "Web application security",
      "API security",
      "OSINT",
      "React",
      "Next.js",
    ],
    knowsLanguage: ["ru", "en", "de"],
    sameAs,
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  locale: string;
  /** Absolute image URL; the shared site image by default. */
  image?: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.description,
    url: input.url,
    mainEntityOfPage: input.url,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    inLanguage: input.locale,
    image: input.image ?? absoluteUrl("/opengraph-image"),
    author: { "@id": `${site.url}/#person`, "@type": "Person", name: site.name, url: site.url },
    publisher: { "@id": `${site.url}/#person` },
  };
}
