import type { Metadata } from "next";
import type { ReactNode } from "react";
import { site } from "@/config/site";
import "./globals.css";

// Also covers routes outside `[locale]` (the global 404), which inherit the root OG image.
export const metadata: Metadata = { metadataBase: new URL(site.url) };

// The <html> element lives in `[locale]/layout.tsx` so `lang` matches the active locale.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
