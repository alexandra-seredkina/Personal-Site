import { serializeJsonLd } from "@/lib/json-ld";
import { getNonce } from "@/lib/nonce";

export async function JsonLd({ data }: { data: Record<string, unknown> }) {
  const nonce = await getNonce();
  return (
    <script
      type="application/ld+json"
      nonce={nonce}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: payload is escaped by serializeJsonLd
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
