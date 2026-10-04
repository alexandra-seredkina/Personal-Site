import { describe, expect, it } from "vitest";
import { buildCsp, createNonce } from "@/lib/csp";

const directive = (csp: string, name: string) =>
  csp.split("; ").find((part) => part.startsWith(`${name} `) || part === name);

describe("buildCsp", () => {
  it("allows scripts only with the nonce in production", () => {
    const csp = buildCsp("abc");
    expect(directive(csp, "script-src")).toBe("script-src 'self' 'nonce-abc' 'strict-dynamic'");
    expect(csp).not.toContain("unsafe-eval");
    expect(directive(csp, "script-src")).not.toContain("unsafe-inline");
  });

  it("locks down framing, plugins and base URI", () => {
    const csp = buildCsp("abc");
    expect(directive(csp, "frame-ancestors")).toBe("frame-ancestors 'none'");
    expect(directive(csp, "object-src")).toBe("object-src 'none'");
    expect(directive(csp, "base-uri")).toBe("base-uri 'self'");
  });

  it("adds eval only in development", () => {
    expect(buildCsp("abc", { isDev: true })).toContain("'unsafe-eval'");
  });

  it("upgrades insecure requests only when asked", () => {
    expect(buildCsp("abc")).toContain("upgrade-insecure-requests");
    expect(buildCsp("abc", { upgradeInsecure: false })).not.toContain("upgrade-insecure-requests");
  });
});

describe("createNonce", () => {
  it("is unique and base64", () => {
    const a = createNonce();
    expect(a).toMatch(/^[A-Za-z0-9+/=]+$/);
    expect(a).not.toBe(createNonce());
  });
});
