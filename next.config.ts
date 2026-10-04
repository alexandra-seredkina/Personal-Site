import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import { site } from "./src/config/site";

/**
 * Static security headers for every response (pages, assets, files in /public).
 * The Content-Security-Policy is per-request (nonce-based) and is set in `src/proxy.ts`.
 */
const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"], qualities: [75, 90] },
  reactStrictMode: true,
  turbopack: {
    // Wires next-intl's request config without its plugin (which pulls in a native SWC binary
    // only needed for message extraction).
    resolveAlias: { "next-intl/config": "./src/i18n/request.ts" },
  },
  async headers() {
    const headers = site.noindex
      ? [...securityHeaders, { key: "X-Robots-Tag", value: "noindex, nofollow" }]
      : securityHeaders;
    return [{ source: "/:path*", headers }];
  },
};

const withMDX = createMDX({
  options: {
    // Plugins are referenced by name so the config stays serializable for Turbopack.
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [["rehype-pretty-code", { theme: "github-dark-dimmed", keepBackground: false }]],
  },
});

export default withMDX(nextConfig);
