<p align="center">
  <img src="public/logo.png" width="72" alt="seredkina.dev">
</p>

<h1 align="center">seredkina.dev</h1>

<p align="center">
  Personal site — <strong>Aleksandra Seredkina</strong>, Application Security Engineer.<br>
  <a href="https://seredkina.dev">seredkina.dev</a>
  · EN / <a href="https://seredkina.dev/ru">RU</a> / <a href="https://seredkina.dev/de">DE</a>
  · <a href="assets/video/site-scroll.mp4">walkthrough</a>
</p>

<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16.3.8-000?logo=nextdotjs&logoColor=white">
  <img alt="React" src="https://img.shields.io/badge/React-19.3.0-087EA4?logo=react&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-7.0.2-3178C6?logo=typescript&logoColor=white">
  <img alt="Tailwind" src="https://img.shields.io/badge/Tailwind-4.3.3-06B6D4?logo=tailwindcss&logoColor=white">
  <img alt="next-intl" src="https://img.shields.io/badge/next--intl-4.14.8-black?logo=nextdotjs&logoColor=white">
  <img alt="MDX" src="https://img.shields.io/badge/MDX-3.1.1-F9AC00?logo=mdx&logoColor=black">
  <img alt="Motion" src="https://img.shields.io/badge/Motion-13.4.6-black?logo=framer&logoColor=white">
  <img alt="Zod" src="https://img.shields.io/badge/Zod-4.6.5-3E67B1?logo=zod&logoColor=white">
  <img alt="Biome" src="https://img.shields.io/badge/Biome-2.5.15-60A5FA?logo=biome&logoColor=white">
  <img alt="Vitest" src="https://img.shields.io/badge/Vitest-5.0.3-6E9F18?logo=vitest&logoColor=white">
  <img alt="Playwright" src="https://img.shields.io/badge/Playwright-1.63.0-2EAD33?logo=playwright&logoColor=white">
  <img alt="Node" src="https://img.shields.io/badge/Node-22+-339933?logo=nodedotjs&logoColor=white">
  <img alt="pnpm" src="https://img.shields.io/badge/pnpm-12.8.1-F69220?logo=pnpm&logoColor=white">
</p>

## Screenshots

[![Hero](assets/video/stills/hero.jpg)](assets/video/site-scroll.mp4)

| Stack & experience | CTF | Writing |
| :---: | :---: | :---: |
| [![Stack](assets/video/stills/stack.jpg)](assets/video/site-scroll.mp4) | [![CTF](assets/video/stills/ctf.jpg)](assets/video/site-scroll.mp4) | [![Writing](assets/video/stills/writing.jpg)](assets/video/site-scroll.mp4) |

Full scroll: [`assets/video/site-scroll.mp4`](assets/video/site-scroll.mp4) (54s, 1440×900).

## What's here

- One-page portfolio: stack, experience, CTFs, projects, writing, contact
- Blog in MDX — `en` / `ru` / `de` per post, optional cover, drafts
- Locale in the URL only — no cookies, no `Accept-Language` redirects
- Copy in `messages/`, facts in `src/config/` — components stay dumb

## Stack

Next.js 16 App Router + RSC · React 19 · TypeScript (strict) · Tailwind 4 · Motion · next-intl · MDX + Shiki · Zod · Biome · Vitest · Playwright + axe.

Also: `remark-gfm`, `rehype-pretty-code`, `simple-icons` (SVG sprite, no icon CDN).

## Security

No cookies. No analytics. No third-party scripts. Fonts self-hosted via `next/font`.

**CSP** — new nonce every request (`src/proxy.ts` + `src/lib/csp.ts`). Production scripts: nonce + `strict-dynamic`, no `unsafe-inline` / `unsafe-eval`. E2E asserts every `<script>` carries that response's nonce.

```
default-src 'self'
script-src 'self' 'nonce-…' 'strict-dynamic'
style-src 'self' 'nonce-…'
style-src-attr 'unsafe-inline'   # Shiki inline styles only
object-src 'none'; base-uri 'self'; frame-ancestors 'none'
upgrade-insecure-requests        # HTTPS only
```

**Headers** (`next.config.ts`): HSTS 2y + preload · `X-Frame-Options: DENY` · `nosniff` · COOP/CORP `same-origin` · locked `Permissions-Policy` · no `X-Powered-By`.

**Other**

- Optional Basic auth (`SITE_PASSWORD`) — constant-time password check
- `SITE_NOINDEX=1` for private previews
- Escaped JSON-LD (no `</script>` breakout)
- [`/.well-known/security.txt`](https://seredkina.dev/.well-known/security.txt)

## Layout

```
src/
├── app/[locale]/     # pages + OG image
├── components/       # sections · motion · ui · icons
├── config/           # site, profile, character
├── content/posts/    # <slug>/{en,ru,de}.mdx
├── i18n/ · lib/ · proxy.ts
messages/             # en · ru · de
public/ · assets/ · tests/
```

## Commands

```bash
pnpm dev        # localhost:3000
pnpm check      # lint + types + unit + build
pnpm test:e2e   # Playwright + axe (prod build on :3100)
```

| Env | |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin (default `https://seredkina.dev`) |
| `SITE_PASSWORD` | Basic auth for the whole site |
| `SITE_NOINDEX` | `1` → noindex + robots disallow |
| `PW_CHANNEL` | `chrome` → local Chrome for e2e |

## Artwork

Site character — poses in `public/character/`.

| hero | wave | laptop | reading | lost |
| :---: | :---: | :---: | :---: | :---: |
| <img src="public/character/hero.webp" alt="hero"> | <img src="public/character/wave.webp" alt="wave"> | <img src="public/character/laptop.webp" alt="laptop"> | <img src="public/character/reading.webp" alt="reading"> | <img src="public/character/lost.webp" alt="lost"> |
