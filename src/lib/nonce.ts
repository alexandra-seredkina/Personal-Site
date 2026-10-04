import "server-only";

import { headers } from "next/headers";

/** Per-request CSP nonce set by `src/proxy.ts`. Reading it opts the route into dynamic rendering. */
export async function getNonce(): Promise<string | undefined> {
  return (await headers()).get("x-nonce") ?? undefined;
}
