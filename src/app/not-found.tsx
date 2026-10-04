import { inter } from "@/lib/fonts";

// Requests outside any locale segment (rare: the proxy localises almost everything).
export default function GlobalNotFound() {
  return (
    <html lang="en" className={inter.variable}>
      <body className="grid min-h-dvh place-items-center p-6 text-center">
        <main>
          <h1 className="text-3xl font-bold">404</h1>
          <p className="mt-2 text-muted">This page does not exist.</p>
          <a href="/" className="mt-6 inline-block text-accent">
            ← Home
          </a>
        </main>
      </body>
    </html>
  );
}
