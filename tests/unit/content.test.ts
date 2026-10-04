import { describe, expect, it } from "vitest";
import { serializeJsonLd } from "@/lib/json-ld";
import { parsePostMeta } from "@/lib/post-schema";

describe("serializeJsonLd", () => {
  it("cannot break out of the script element", () => {
    const out = serializeJsonLd({ name: "</script><script>alert(1)</script>" });
    expect(out).not.toContain("<");
    expect(out).not.toContain(">");
    expect(JSON.parse(out)).toEqual({ name: "</script><script>alert(1)</script>" });
  });
});

describe("parsePostMeta", () => {
  const valid = {
    title: "Title",
    description: "Description",
    date: "2026-10-03",
    readingMinutes: 5,
  };

  it("applies defaults", () => {
    expect(parsePostMeta(valid, "x.mdx")).toEqual({ ...valid, tags: [], draft: false });
  });

  it("rejects invalid metadata with the file name", () => {
    expect(() => parsePostMeta({ ...valid, date: "yesterday" }, "bad.mdx")).toThrow(/bad\.mdx/);
  });
});
