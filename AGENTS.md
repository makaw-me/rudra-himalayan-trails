# AGENTS.md: Rudra Himalayan Trails

One-page marketing site for a Himalayan driver and trip-planning business. Conversions: WhatsApp enquiry and phone call. Full spec: `/docs/BUILD-PLAN.md` (read the relevant section before starting each phase).

## Priorities (in order)
1. Accessibility: WCAG 2.2 AA
2. Performance: Core Web Vitals, Lighthouse and PageSpeed near 100
3. SEO and AEO
4. Visual polish

If two conflict, the higher one wins. Record any deviation from the plan in `/docs/DECISIONS.md`.

## Stack
Next.js (App Router, static export), React, TypeScript (strict), Tailwind CSS (tokens in `@theme`), semantic HTML, Radix UI primitives only where native HTML is not enough, Motion (`LazyMotion` + `m.*`), Zod, Vitest, Playwright + axe, Lighthouse CI. pnpm. Pin Node via `.nvmrc`.

## Commands
- `pnpm dev`: local server
- `pnpm build`: runs `check-data` first, then builds
- `pnpm lint` / `pnpm typecheck` / `pnpm test` / `pnpm test:e2e`
- `pnpm check-data`: validates `/data` against Zod schemas
- `pnpm lhci`: Lighthouse CI against the budgets

Run lint, typecheck and check-data before finishing any task.

## Structure and data flow
- `/app` routes and metadata. `/components/layout`, `/components/sections`, `/components/ui`, `/components/motion`. `/data` all content and config. `/lib` helpers. `/hooks`, `/styles`, `/scripts`, `/docs`, `/tests`.
- All copy, prices, contacts, URLs and image references live in `/data`. Components never hardcode them.
- Read data only through the getters in `/data/index.ts`.
- Flow is one way: `app/page.tsx` (server) -> `sections/*` (server) -> `ui/*`.
- `components/ui/*` never imports from `/data`.
- Client islands receive only the data slice they need. Never import a whole dataset into a client component.
- New content type = Zod schema + data check first, then the component.

## React and Next rules
- Server Components by default. Every `use client` needs a one-line reason in a comment.
- No runtime data fetching, no API routes. Everything is static at build time.
- Add a dependency only with a bundle-size and accessibility justification.
- Load non-critical code with `next/dynamic` (trays, estimate logic).

## Accessibility (non-negotiable)
- Semantic landmarks, one `h1`, no skipped heading levels, skip link first.
- Native elements before ARIA (`button`, `details`, `select`, `a`).
- Visible focus on everything. Trays and menus trap focus, close on Esc and return focus to the trigger.
- Targets at least 44px. Sticky header or bar must never hide focused elements (WCAG 2.4.11).
- Respect `prefers-reduced-motion`. No autoplay, no auto-rotating carousels, no drag-only interaction.
- Visible labels on every field. Errors linked with `aria-describedby`.
- Descriptive link text. Meaningful `alt`, or `alt=""` for decorative images.

## Design tokens
- Teal `#164653` (nav, headings, footer, primary buttons, focus ring), Cloud White `#FFFFFF`, Glacier Mist `#EAF2F3`, Sunrise Gold `#FFBD3D` (CTA background only), Slate Charcoal `#344B53` (body text).
- Mountain Sage `#64816B` is decorative only. It fails AA for text.
- Text on gold is always teal. Never white on gold. Never gold text or gold-only focus rings.
- Fonts: Montserrat (variable, 600 to 800) for headings and labels, Mukta (400, 600) for body. Weights: h1 800, h2 700, h3 600. Nothing lighter than 400 for body or 600 for Montserrat. Real weights only.

## Performance budgets
- LCP at most 2.0s, CLS at most 0.02, INP at most 150ms, TBT at most 100ms (mobile, throttled).
- First-load JS at most 100KB gzipped. Hero image at most 120KB on mobile.
- Hero image: `next/image` with `priority`, no entrance animation on it.
- Every image has width and height. Below-the-fold images are lazy. AVIF or WebP only.
- No third-party scripts in the critical path. No map embeds or video players until click.
- Animate only `transform` and `opacity`.

## SEO and AEO
- Unique title and description, canonical, Open Graph, sitemap, robots.
- JSON-LD generated from `/data/site.ts` (TravelAgency, Person, FAQPage) and must match visible content exactly.
- Answer-first copy: a direct 40 to 60 word answer, then detail.
- All content, including trays and accordions, must be present in server-rendered HTML.
- Staging and preview deployments are `noindex`.

## Content rules
- No lorem ipsum, fake reviews or stock people in production.
- Reviews need `consent: true` and `consentDate`.
- Prices are ranges ("from") with a disclaimer. Route facts (altitude, permits, seasons) come from the client, never guessed. If a fact is missing, leave a clearly marked TODO in `/data` and tell the user.
- Strip EXIF and GPS from photos. Blur number plates.
- Money and dates formatted with `Intl` in `en-IN`.

## Security
- Hash-based CSP (no nonces). Set `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, HSTS.
- No secrets in the repo. Validate env vars in `lib/env.ts`. Keep `.env.example` current.

## Workflow
- Work phase by phase as in the plan. Keep each phase green: lint, types, data check, axe, Lighthouse budgets.
- Before starting a task, state the plan in a few lines. Ask when copy, prices or facts are missing instead of inventing them.
- Small, focused commits (conventional commits). Do not refactor unrelated code.
- After UI changes, test keyboard flow, 320px width, 200% text zoom and reduced motion.
- Never mark a task done if a budget or axe check fails. Fix it or explain why.

## Hosting (Netlify, static export)
- Deploy to Netlify with `output: 'export'` (publish `out`). Full details: `docs/BUILD-PLAN.md` section 18.
- No Next server features: no middleware, route handlers, `revalidate`, or `headers()`/`redirects()` in `next.config`.
- Security headers, caching and redirects go in `netlify.toml`. Start CSP as Report-Only, then enforce.
- Index only when `CONTEXT === 'production'` and `NEXT_PUBLIC_SITE_URL` is set. Previews emit `noindex` and `Disallow: /`.
- Production domain: `https://www.rudrahimalayantrails.com` is a TODO until the client confirms it. Read it from `NEXT_PUBLIC_SITE_URL`.
- Images: `next/image` with a custom loader calling Netlify Image CDN in production and plain files in dev. Verify on a deploy preview.

## Design ambition (read before building any section)
The mockup is a rough starting point and a minimum bar, not the final design or the source of truth. Build each section better than the mockup: more refined, more interactive, subtle and professional. Full guidance: `docs/BUILD-PLAN.md` section 19.
- **Fixed:** logo, palette and contrast rules, fonts and weights, facts in `/data`, WCAG 2.2 AA, performance budgets, no layout shift, section order (propose changes in `docs/DECISIONS.md` first).
- **Free to improve:** layout, spacing, hierarchy, cards, crops, icons, microcopy structure, states (empty, error, success), interactions, motion, light decorative detail.
- **Style:** restrained, calm, lots of whitespace, one primary action per viewport, hairline borders, soft shadows, no generic template look.
- **Motion:** 150 to 250ms feedback, 400 to 600ms reveals, fade plus at most 16px translate, once only. No parallax, bounce, scroll-jacking, autoplay, or motion on the LCP element. CSS first; Motion (`LazyMotion`) only for trays, accordions, sheets and reveals. Honour `prefers-reduced-motion`.
- **Every interactive element:** keyboard operable, with hover, focus, pressed and disabled states, and a sensible no-JavaScript fallback.
- **Per section:** write a 3-bullet design intent before coding. Build mobile first. Screenshot at 375, 768 and 1280px. Run the critique checklist in section 19 and fix failures (maximum two iterations, then ask). Report what you improved beyond the mockup and what you are unsure about.
- **Guardrails:** no new dependency for polish without a bundle-size and accessibility justification. No new sections or claims without a note in `docs/DECISIONS.md`. If a nicer idea costs performance or accessibility, drop it or find a lighter way.

## Design references
- `docs/design/logo-final.png`: the logo is final. Never change, recolour or stretch it. Use SVG versions in production, not the PNG.
- `docs/design/mockup-v1-desktop.png`, `mockup-v1-mobile.png` and `docs/design/sections/*.png` are rough references for the content and structure. The old `mockup-v0.png` is obsolete; do not use it.
- Where they differ, `docs/BUILD-PLAN.md` sections 17 and 19 win, and `docs/design/DESIGN-REFERENCE.md` explains the corrections.
- Anything in square brackets in the mockup (days, months, prices, phone, answers, reviews) is a placeholder. Never invent values. Read them from `/data`, and leave a marked TODO when the client has not supplied one.
- Mockup photos are placeholders. Never copy stock or generated images of people, vehicles or reviewers.
- No floating buttons, auto-rotating carousels or off-palette colours. Mobile uses the sticky bottom contact bar.
- The reviews section is hidden when there are no real reviews.