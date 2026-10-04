import { describe, expect, it } from "vitest";
import { site } from "@/config/site";
import { languageAlternates, localizedPath, pageMetadata } from "@/lib/seo";

describe("localizedPath", () => {
  it("omits the prefix for the default locale", () => {
    expect(localizedPath("en", "/")).toBe("/");
    expect(localizedPath("en", "/about")).toBe("/about");
  });

  it("prefixes other locales", () => {
    expect(localizedPath("ru", "/")).toBe("/ru");
    expect(localizedPath("de", "/blog/post/")).toBe("/de/blog/post");
  });
});

describe("languageAlternates", () => {
  it("lists every locale plus x-default", () => {
    expect(languageAlternates("/about")).toEqual({
      en: `${site.url}/about`,
      ru: `${site.url}/ru/about`,
      de: `${site.url}/de/about`,
      "x-default": `${site.url}/about`,
    });
  });
});

describe("pageMetadata", () => {
  it("sets a canonical URL for the requested locale", () => {
    const meta = pageMetadata({ locale: "de", path: "/blog", description: "d" });
    expect(meta.alternates?.canonical).toBe(`${site.url}/de/blog`);
  });
});
