import { describe, expect, it } from "vitest";
import { isAuthorized } from "@/lib/basic-auth";

const basic = (credentials: string) => `Basic ${btoa(credentials)}`;

describe("isAuthorized", () => {
  it("accepts the right password with any user name", () => {
    expect(isAuthorized(basic("anyone:s3cret"), "s3cret")).toBe(true);
    expect(isAuthorized(basic(":s3cret"), "s3cret")).toBe(true);
  });

  it("rejects a wrong, missing or malformed header", () => {
    expect(isAuthorized(basic("anyone:wrong"), "s3cret")).toBe(false);
    expect(isAuthorized(basic("anyone:s3cret!"), "s3cret")).toBe(false);
    expect(isAuthorized(basic("no-separator"), "s3cret")).toBe(false);
    expect(isAuthorized(null, "s3cret")).toBe(false);
    expect(isAuthorized("Bearer s3cret", "s3cret")).toBe(false);
    expect(isAuthorized("Basic %%%", "s3cret")).toBe(false);
  });
});
