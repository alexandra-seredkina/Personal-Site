import { notFound } from "next/navigation";

// Catch-all so unknown localized paths render `[locale]/not-found.tsx` inside the site layout.
export default function CatchAllPage() {
  notFound();
}
