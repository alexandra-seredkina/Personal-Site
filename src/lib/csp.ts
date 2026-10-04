/**
 * Strict, nonce-based Content-Security-Policy.
 *
 * - Scripts: only those carrying the per-request nonce (Next.js adds it to its own scripts).
 * - `style-src-attr 'unsafe-inline'` is needed because syntax highlighting (Shiki) emits
 *   `style` attributes; attributes cannot execute script, `<style>` elements still need the nonce.
 */
type CspOptions = {
  /** Allow `eval` and dev-server websockets. */
  isDev?: boolean;
  /** Only meaningful on HTTPS; on plain-HTTP localhost it would break same-origin requests. */
  upgradeInsecure?: boolean;
};

export function buildCsp(
  nonce: string,
  { isDev = false, upgradeInsecure = true }: CspOptions = {},
): string {
  const directives: Record<string, string[]> = {
    "default-src": ["'self'"],
    "script-src": [
      "'self'",
      `'nonce-${nonce}'`,
      "'strict-dynamic'",
      ...(isDev ? ["'unsafe-eval'"] : []),
    ],
    "style-src": ["'self'", `'nonce-${nonce}'`],
    "style-src-attr": ["'unsafe-inline'"],
    "img-src": ["'self'", "data:", "blob:"],
    "font-src": ["'self'"],
    "connect-src": ["'self'", ...(isDev ? ["ws:"] : [])],
    "object-src": ["'none'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"],
    "frame-ancestors": ["'none'"],
    "manifest-src": ["'self'"],
    ...(upgradeInsecure ? { "upgrade-insecure-requests": [] } : {}),
  };

  return Object.entries(directives)
    .map(([name, values]) => [name, ...values].join(" "))
    .join("; ");
}

export function createNonce(): string {
  return btoa(crypto.randomUUID());
}
