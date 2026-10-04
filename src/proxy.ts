import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { isAuthorized } from "./lib/basic-auth";
import { buildCsp, createNonce } from "./lib/csp";

const intl = createIntlMiddleware(routing);

/** Next internals, the OG image and files with an extension (robots.txt, feed.xml, /cv/…). */
const PASSTHROUGH = /^\/(?:api|_next|_vercel|opengraph-image|.*\..*)/;

/** `SITE_PASSWORD` set: the whole site, files included, sits behind HTTP Basic auth. */
const password = process.env.SITE_PASSWORD;

/**
 * Raw artwork stays open even with a password: the image optimizer (`/_next/image`, which is
 * protected) fetches these files from the server itself without the visitor's credentials.
 */
const PUBLIC_IMAGE = /\.(?:avif|webp|png|jpe?g|ico|svg)$/;

export default function proxy(request: NextRequest) {
  if (
    password &&
    !PUBLIC_IMAGE.test(request.nextUrl.pathname) &&
    !isAuthorized(request.headers.get("authorization"), password)
  ) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="seredkina-preview", charset="UTF-8"' },
    });
  }
  if (PASSTHROUGH.test(request.nextUrl.pathname)) return NextResponse.next();

  const nonce = createNonce();
  const isHttps =
    (request.headers.get("x-forwarded-proto") ?? request.nextUrl.protocol.replace(":", "")) ===
    "https";
  const csp = buildCsp(nonce, {
    isDev: process.env.NODE_ENV === "development",
    upgradeInsecure: isHttps,
  });

  // Next.js reads the nonce from the request's CSP header and applies it to its scripts;
  // next-intl forwards these request headers to the render.
  const headers = new Headers(request.headers);
  headers.set("x-nonce", nonce);
  headers.set("Content-Security-Policy", csp);

  const response = intl(new NextRequest(request.url, { headers, method: request.method }));
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  // Everything except hashed build assets, so the optional password also covers /public files
  // and the image optimizer;
  // `PASSTHROUGH` paths skip the locale and CSP handling.
  // Prefetch requests must pass through too: next-intl rewrites them to the right locale.
  matcher: ["/((?!_next/static).*)"],
};
