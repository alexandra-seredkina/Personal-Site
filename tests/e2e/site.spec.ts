import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const pages = [
  "/",
  "/blog",
  "/blog/faust-ctf-2026-imc",
  "/blog/strict-csp-nextjs",
  "/blog/devsecops-gitlab-pipeline",
];
const locales = [
  { prefix: "", lang: "en" },
  { prefix: "/ru", lang: "ru" },
  { prefix: "/de", lang: "de" },
];

for (const { prefix, lang } of locales) {
  for (const path of pages) {
    const url = `${prefix}${path === "/" && prefix ? "" : path}`;

    test(`${url || "/"} renders without errors or a11y violations`, async ({ page }) => {
      const errors: string[] = [];
      page.on("console", (msg) => msg.type() === "error" && errors.push(msg.text()));
      page.on("pageerror", (err) => errors.push(err.message));

      // Contrast is judged on the settled design, not mid-way through scroll-reveal fades.
      await page.emulateMedia({ reducedMotion: "reduce" });
      const response = await page.goto(url || "/");
      expect(response?.status()).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", lang);
      await expect(page.locator("h1")).toBeVisible();

      const { violations } = await new AxeBuilder({ page }).analyze();
      expect(violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
      expect(errors).toEqual([]);
    });
  }
}

test("every script carries the per-request CSP nonce", async ({ page }) => {
  const response = await page.goto("/");
  const csp = response?.headers()["content-security-policy"] ?? "";
  const nonce = /'nonce-([^']+)'/.exec(csp)?.[1];
  expect(nonce).toBeTruthy();

  const scripts = await page
    .locator("script")
    .evaluateAll((nodes) => nodes.map((node) => (node as HTMLScriptElement).nonce));
  expect(scripts.length).toBeGreaterThan(0);
  for (const value of scripts) expect(value).toBe(nonce);
});

test("security headers are present and no cookies are set", async ({ request }) => {
  const response = await request.get("/");
  const headers = response.headers();
  expect(headers["strict-transport-security"]).toContain("max-age=");
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["x-frame-options"]).toBe("DENY");
  expect(headers["referrer-policy"]).toBeTruthy();
  expect(headers["x-powered-by"]).toBeUndefined();
  expect(headers["set-cookie"]).toBeUndefined();
});

test("unknown pages return 404 inside the site layout", async ({ page }) => {
  const response = await page.goto("/ru/does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.locator("html")).toHaveAttribute("lang", "ru");
});

test("machine-readable files and the CV are served", async ({ request }) => {
  for (const path of [
    "/robots.txt",
    "/sitemap.xml",
    "/feed.xml",
    "/.well-known/security.txt",
    "/cv/Aleksandra_Seredkina_CV.pdf",
  ]) {
    expect((await request.get(path)).status(), path).toBe(200);
  }
});

test("the default locale is reachable from any browser language", async ({ browser }) => {
  const context = await browser.newContext({ locale: "ru-RU" });
  const response = await (await context.newPage()).goto("/");
  expect(response?.url()).toMatch(/:\d+\/$/);
  await context.close();
});

test("content is visible in the server HTML, before any JavaScript runs", async ({ request }) => {
  const html = await (await request.get("/")).text();
  expect(html).not.toContain("opacity:0");
});

test("the social image resolves without redirects", async ({ page, request }) => {
  await page.goto("/de");
  const ogImage = await page.locator('meta[property="og:image"]').getAttribute("content");
  expect(ogImage).toBeTruthy();
  const response = await request.get(new URL(ogImage ?? "").pathname, { maxRedirects: 0 });
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toBe("image/png");
});

test.describe("on a phone", () => {
  test.use({ viewport: { width: 360, height: 780 } });

  for (const path of pages) {
    test(`${path} has no horizontal overflow`, async ({ page }) => {
      await page.goto(path);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBe(0);
    });
  }
});

test("animated character frames sit exactly on top of each other", async ({ page }) => {
  for (const path of ["/", "/blog"]) {
    await page.goto(path);
    const offsets = await page
      .locator('img[aria-hidden="true"][src*="character"]')
      .evaluateAll((overlays) =>
        overlays.map((overlay) => {
          const base = overlay.previousElementSibling as HTMLElement;
          const a = base.getBoundingClientRect();
          const b = overlay.getBoundingClientRect();
          return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.width - b.width);
        }),
      );
    expect(offsets.length).toBeGreaterThan(0);
    for (const offset of offsets) expect(offset).toBeLessThan(1);
  }
});
