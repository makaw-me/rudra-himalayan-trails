# Rudra Himalayan Trails: Website Build Plan

Build spec for the implementing agent. Custom one-page marketing site. Priorities, in order: **accessibility (WCAG 2.2 AA), performance (Core Web Vitals, Lighthouse/PSI \~100), SEO, AEO**, then visual polish.

## 1. Goals and constraints

- Primary conversions: WhatsApp enquiry and phone call. Everything funnels to these.
- Audience: mostly mobile, often on slow or patchy mobile data. Design and test mobile first.
- One page (`/`) plus `/privacy` and `/terms`. No CMS, no database, no user accounts.
- Content is static and typed in the repo. The client edits via developer for now.
- Budget discipline: no paid services required. Google Business Profile is the client's separate task.

## 2. Tech stack

Use latest stable versions at scaffold time and pin them.

- **Next.js (App Router) + React + TypeScript (strict).** Server Components by default. Static generation only (`output: 'export'` or static on Vercel). Client components only for true interactivity.
- **Tailwind CSS (v4 preferred)** with design tokens in `@theme`. No component library CSS.
- **Semantic HTML first.** Native elements (`details`, `button`, `a`, `form`, `dialog`) before ARIA.
- **Accessible primitives:** Radix UI (Accordion, Dialog/Sheet, Select, Checkbox) only where native elements are insufficient. Import per-primitive for tree-shaking.
- **Motion (framer-motion):** use `LazyMotion` with `domAnimation` and the `m` component to keep the bundle small. Respect `prefers-reduced-motion` via `MotionConfig reducedMotion="user"`.
- **Forms:** plain controlled React or native form with Zod validation. No form library unless needed.
- **Icons:** `lucide-react`, imported individually, or inline SVGs. No icon fonts.
- **Fonts:** `next/font` self-hosted, subsetted, `display: swap`, max 2 families: Montserrat as one variable file (weights 600 to 800) and Mukta as two static files (400 and 600). Chosen to match the logo: Montserrat (600 to 800) for headings and labels, because its wide, heavy geometric capitals mirror the RUDRA wordmark, and Mukta (400 and 600) for body text, close to the tagline's humanist sans and ready for Devanagari if a Hindi version is added later. Plus one script font only if used as a decorative image/SVG, not as a webfont.
- **Images:** `next/image`, AVIF/WebP, explicit width/height, correct `sizes`.
- **Analytics (optional phase):** Plausible or GA4 loaded after interaction/idle, never blocking. WhatsApp and Call click events only.
- **Tooling:** ESLint (`eslint-plugin-jsx-a11y`, Next core-web-vitals config), Prettier, TypeScript strict, Vitest (utilities), Playwright + `@axe-core/playwright`, Lighthouse CI, `next-sitemap` or native `sitemap.ts`.
- **Hosting:** Netlify with static export (see section 18) (global CDN, Brotli, HTTP/2+). Custom domain, HTTPS, HSTS.

## 3. Design tokens

| Token | Hex | Use |
| --- | --- | --- |
| `teal` | #164653 | Nav, headings, footer, primary buttons, focus ring |
| `white` | #FFFFFF | Page and card background |
| `mist` | #EAF2F3 | Alternate sections, panels, form fields |
| `sage` | #64816B | Decorative accents and icons only |
| `gold` | #FFBD3D | CTA background, highlights, selected states |
| `charcoal` | #344B53 | Body text, labels |

**Contrast rules (enforce in code review):**

- Text on gold must be teal (#164653). Never white on gold.
- Teal and charcoal on white or mist pass AA for all text sizes.
- **Sage (about 4.3:1 on white) fails AA for normal text.** Use it for icons, borders and decoration only, never body text or small labels.
- **Gold on white fails 3:1.** Never use gold alone as a focus ring, border-only indicator, or text. Selected states need a second cue (checkmark, border in teal, or weight).
- Focus ring: 3px teal outline with 2px white offset, visible on every background; on teal backgrounds use white/gold ring with a teal offset.
- Placeholder text must meet 4.5:1 (use charcoal at full opacity or a darker tint). Labels are always visible, never placeholder-only.

**Type scale:** fluid with `clamp()`, body minimum 16px (18px on large screens), line-height 1.6, max line length about 65ch. Support 200% text zoom and 320px reflow.

**Typography (matches the logo).** The logo has three voices: a heavy, wide geometric wordmark ("RUDRA"), widely spaced medium-weight capitals ("HIMALAYAN TRAILS"), and a friendly humanist sans for the tagline. The site mirrors them.

- **Headings (h1 to h3):** a stepped weight hierarchy: h1 in Montserrat 800 (the display weight, closest to the logo), h2 in 700, h3 in 600; line-height 1.1 to 1.2, sentence case, teal, tracking about -0.01em on the h1 and h2. This echoes the weight and width of "RUDRA".
- **Eyebrow labels and nav:** Montserrat 600, tracking 0.15 to 0.2em, uppercase for short labels only (for example "POPULAR TOUR CIRCUITS"), echoing "HIMALAYAN TRAILS". Buttons use Montserrat 600 in sentence case. Never set paragraphs in all caps.
- **Body, cards, forms:** Mukta 400 and 600, 16 to 18px, charcoal, echoing the tagline.
- **Rules:** real font weights only (no faux bold or stretching); nothing lighter than 400 for body text or 600 for Montserrat, since light weights lose contrast on photos and small mobile screens, so elegance comes from size contrast, whitespace and the weight steps above, not thin type; no gold text, fallbacks tuned with `size-adjust` via `next/font` to avoid layout shift, tokens defined once in `@theme` so a font swap is a one-line change.
- **Verify in Phase 0:** render the h1 and an eyebrow label next to the logo and compare. If Montserrat reads too wide or too plain, test Poppins 800 or Outfit 800 and record the choice in `/docs/DECISIONS.md`. If the designer can name the logo's actual typeface and it is licensed for web, prefer it, self-hosted and subsetted.
- **Script tagline:** the handwritten "Mountains, Stories, Meaningful Journeys" accent from the mockup is a decorative SVG, hidden from screen readers, not a webfont.

**Spacing and layout:** 8px grid, container max-width 1200px, section padding fluid. Radius 12px cards, 8px inputs. Touch targets at least 44x44px (WCAG 2.2 minimum is 24px, we exceed it).

## 4. Project structure

```
/app
  layout.tsx            # fonts, metadata base, JSON-LD, skip link, MotionProvider
  page.tsx              # server component: reads /data, composes sections
  privacy/page.tsx  terms/page.tsx
  sitemap.ts  robots.ts  manifest.ts  not-found.tsx  error.tsx  global-error.tsx
/components
  layout/    Header, MobileMenu, Footer, StickyContactBar, SkipLink
  sections/  Hero, TrustStrip, MeetBhupinder, Circuits, StaysCamps,
             Estimate, Reviews, Faq, EnquiryForm   # receive typed data as props
  ui/        Button, Card, Section, Heading, Disclosure, Sheet, Field,
             Select, Badge, Icon, VisuallyHidden   # presentational, data-agnostic
  motion/    MotionProvider, Reveal
/data                   # all content and config: no React, no side effects
  site.ts  navigation.ts  trust.ts  circuits.ts  stays.ts  reviews.ts
  faq.ts  pricing.ts  notices.ts  legal.ts  images.ts
  schema.ts             # Zod schemas, validated at build time
  types.ts              # types inferred from the schemas
  index.ts              # typed getters: getCircuits(), getFaq(), ...
/lib       whatsapp.ts, jsonld.ts, seo.ts, format.ts, analytics.ts, env.ts
/hooks     useDeepLink.ts, useDisclosure.ts
/styles    globals.css   # Tailwind @theme tokens
/scripts   optimise-images.mjs, check-data.mjs
/public    optimised images, logo SVGs, favicons, llms.txt
/tests     e2e, a11y, unit
/docs      CONTENT-GUIDE.md, DECISIONS.md
```

**Data layer (`/data`).** Content and structure are kept apart: `/data` holds every string, number, URL, image reference and config; `components/` and `components/ui/` hold presentation only.

- **One source of truth.** `/data/site.ts` (name, phone, WhatsApp, address, service area, social links) also feeds JSON-LD, metadata, the sitemap, `llms.txt` and the footer, so on-page and schema data never drift.
- **Typed and validated.** Each file is a pure module (no React, no side effects) typed from Zod schemas in `schema.ts`. `scripts/check-data.mjs` runs in `prebuild` and CI and fails the build on a missing `alt`, malformed phone number, duplicate slug, FAQ answer over its length limit, or a review without `consent`.
- **Access through getters only.** Components call `data/index.ts` (`getCircuits()`, `getFaq()`), never the raw files. Moving to a CMS later changes that one file, not the components.
- **One-way flow.** `app/page.tsx` (server) reads data and passes it to `sections/*` (server), which compose `ui/*`. `ui/*` never imports from `/data`, so it stays reusable and testable.
- **Small client payloads.** Client islands receive only the slice they need (the tray gets one circuit, the estimate gets its pricing rules). Never import a whole dataset into a client component.
- **Static at build time.** Data is imported and rendered during the build. No runtime fetching, no API routes.
- **Images in data.** `images.ts` maps a key to `src`, `alt`, `width`, `height`, `sizes` and a `priority` flag; sections look images up by key.

## 5. Page sections

One `<main>`; each section is a `<section aria-labelledby>` with an `id` for anchors. Exactly one `<h1>`; sections use `<h2>`; sub-items `<h3>`.

1. **Header.** Sticky, `<header>` + `<nav aria-label="Primary">`. Logo links to `#top`. Desktop: links and gold "Plan Your Trip" CTA. Mobile: icon + "RUDRA" only, menu button opens a Sheet (focus trap, Esc closes, focus returns). Active section highlighted with `aria-current`.
2. **Hero.** `<h1>`: "The Himalayas, at your own pace." Subcopy, two CTAs (Plan Your Trip, Explore Routes). The hero image is the LCP element: static `next/image` with `priority`, `fetchpriority="high"`, AVIF/WebP, sized per breakpoint, low-bytes (target under 120KB mobile). Desktop: text on the left and photo on the right, so no text sits on the image. Mobile: photo on top, text below. Contrast is therefore guaranteed without a scrim. No video in hero, no parallax.
3. **Trust strip.** Four items (local knowledge, personalised itineraries, stays arranged, direct contact). Static, no hidden content.
4. **Meet Bhupinder.** Photo (real, plate blurred or cropped), short story, three trust points, secondary "Meet Bhupinder" link to an expandable longer bio (disclosure). Person schema reference.
5. **Tour circuits.** Four cards (Spiti, Himachal Escapes, Leh-Ladakh, Uttarakhand). Each card shows a title, 1-line summary, key facts (typical days, best months) visibly. "Explore this circuit" opens a **tray** (Radix Dialog/Sheet) with: day-by-day itinerary (accordion), inclusions/exclusions, best time, altitude and permit notes, and a WhatsApp CTA prefilled with that circuit. Deep links: `#spiti`, `#leh-ladakh` open the tray on load and are shareable. Tray content is in the HTML (server-rendered, hidden via `hidden`/`inert`) so it is crawlable.
6. **Stays and camps.** Three cards (Homestays, Camps, Custom Trips) with short copy and image; expandable detail.
7. **Get an estimate.** Selects: trip, days, vehicle. Output is a **range** ("Indicative: from ₹X to ₹Y") computed from `/data/pricing.ts`, with disclaimer, plus a button "Confirm on WhatsApp" prefilling the choices. Result announced via `aria-live="polite"`. Native `<select>` styled with Tailwind (best a11y and mobile UX). Pricing data supplied by client; if missing, ship without numbers and send a pure enquiry.
8. **Reviews.** Only real, permissioned testimonials. Render as a **plain scroll-snap list or static grid**, not an auto-rotating carousel (WCAG 2.2.2, 2.5.7). If a carousel is wanted: manual prev/next buttons, no autoplay, `aria-roledescription="carousel"`. Video testimonials use a click-to-load facade (poster image + button; loads the player only on click; captions required). Review schema only if genuinely first-party and policy-compliant; otherwise omit.
9. **FAQ (optional phase, but built into the architecture).** Native `<details>`/`<summary>` or Radix Accordion; answers always in DOM. 8 to 12 questions (permits, altitude sickness, payments, cancellation, vehicle types, best season, safety, customising trips).
10. **Enquiry form.** Fields: name, pickup, destination, dates, travellers, checkbox "I need help with stays and camps". Visible labels, `autocomplete` tokens, inline errors linked by `aria-describedby`, error summary focusable on submit, no redundant re-entry (WCAG 3.3.7). Submit builds a `wa.me` URL with a URL-encoded prefilled message and opens WhatsApp. **No backend.** Secondary "Call Now" is a `tel:` link. Include consent line linking to Privacy Policy. Date input uses native `type="date"` (accessible, mobile-friendly); a custom date picker is out of scope.
11. **Footer.** Quick links, contact (NAP), social links with accessible names, privacy/terms, dynamic copyright year computed at build.
12. **Sticky contact bar (mobile).** Bottom bar with WhatsApp and Call. Must not obscure focused elements (WCAG 2.4.11): add `scroll-padding-bottom` equal to bar height, and page bottom padding. Hide the floating WhatsApp/call buttons from the mockup on mobile in favour of this single bar to avoid overlap.

## 6. Accessibility (WCAG 2.2 AA)

Build requirements:

- **Structure:** landmarks (`header`, `nav`, `main`, `footer`), logical heading order, `lang="en"`, skip-to-content link (first focusable), unique `<title>`.
- **Keyboard:** everything operable, visible focus (2.4.7), logical order, no traps, Esc closes trays/menus, focus moves into a tray on open and returns to the trigger on close.
- **WCAG 2.2 additions:** Focus Not Obscured (2.4.11) with sticky header/bar, Target Size minimum (2.5.8), Dragging Movements (2.5.7: no drag-only interactions), Consistent Help (3.2.6: WhatsApp/Call in the same place on every page), Redundant Entry (3.3.7), Focus Appearance as a best-practice target.
- **Perceivable:** meaningful `alt` text (decorative images `alt=""`), text over images with guaranteed contrast, no information by colour alone, captions for any video, reflow at 320px (1.4.10), 200% zoom, text spacing overrides (1.4.12), orientation not locked.
- **Motion:** all animation off or reduced under `prefers-reduced-motion`; nothing flashes; no autoplay or auto-rotation. Animate only `transform` and `opacity`.
- **Forms:** programmatic labels, required indicated in text, error identification and suggestion, `aria-live` for the estimate result and submit status.
- **ARIA:** only when no native equivalent; no redundant roles; names for icon-only buttons; `aria-expanded`/`aria-controls` on disclosures.
- **Links:** descriptive text ("Explore Spiti Valley circuit", not "Explore"); external links open in the same tab unless required, WhatsApp link labelled as such.
- **Touch:** targets at least 44px, adequate spacing.

Verification: axe in CI on every state (menu open, tray open, form error), manual keyboard pass, VoiceOver (iOS) and TalkBack/NVDA spot checks, 400% zoom, forced-colors mode sanity check. Publish a short accessibility statement in the footer/privacy area.

## 7. Performance and Core Web Vitals

**Targets (mobile, throttled 4G, Moto-G-class):**

| Metric | Target |
| --- | --- |
| LCP | ≤ 2.0s (budget 2.5s hard cap) |
| CLS | ≤ 0.02 (hard cap 0.1) |
| INP | ≤ 150ms (hard cap 200ms) |
| TBT | ≤ 100ms |
| FCP | ≤ 1.5s |
| TTFB | ≤ 300ms (static CDN) |
| Lighthouse (Perf, A11y, Best Practices, SEO) | 95+ mobile, 100 target on a11y/BP/SEO |
| First-load JS | ≤ 100KB gz total, aim lower |
| Total page weight above fold | ≤ 500KB |

**Rules:**

- Static prerender everything; no client-side data fetching, no runtime API.
- Server Components by default; isolate interactivity in small client islands (menu, tray, estimate, form, reveal). Never mark `page.tsx` or large sections `use client`.
- **LCP:** hero image preloaded with `priority`, correct `sizes`, AVIF primary, no lazy-load on it, no JS-dependent rendering, no entrance animation on the hero (it must paint immediately).
- **CLS:** every image has width/height or `aspect-ratio`; reserve space for fonts via `size-adjust` fallback (next/font handles this); skeleton-free static layout; no late-injected banners; sticky bar has reserved padding.
- **INP:** no long tasks; keep handlers light; defer non-critical code with `next/dynamic` (tray contents, estimate logic, Motion `domAnimation` features) and load after idle/interaction.
- **Images:** all below-fold images lazy, responsive `srcset`, max 1600px wide source, quality \~70 to 75, descriptive file names. Use blur placeholders only for non-LCP images.
- **Fonts:** subset Latin, preload only the primary weights, `display: swap`.
- **Third parties:** none in the critical path. Analytics loads after `requestIdleCallback`/first interaction. No chat widgets, no map embeds on load (use a static map image or a link; embeds only on click).
- **Video:** click-to-load facade, `loading="lazy"` iframes, `youtube-nocookie` if YouTube; never autoplay.
- **Animation:** `LazyMotion` + `m.*`, scroll reveals via `whileInView` with `once: true`, `transform/opacity` only, off-screen cost minimal. Cap on animated elements per viewport.
- **Caching and headers:** immutable long-cache for hashed assets, Brotli, `Content-Security-Policy` (strict and hash-based; avoid nonces, which force dynamic rendering and hurt TTFB), `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, HSTS.
- **CSS:** Tailwind purged output, no unused CSS, no `@import` chains; critical CSS inlined by Next.
- **Budgets enforced in CI** (Lighthouse CI assertions; fail the build on regression).

## 8. SEO

- **Metadata API:** unique `title` (about 55 chars) and `description` (about 150 chars), canonical, `metadataBase`, Open Graph and Twitter cards (1200x630 image), theme-color, `lang`. Suggested title: "Himachal, Spiti and Ladakh Taxi and Tour Planner | Rudra Himalayan Trails".
- **Primary keywords to reflect naturally in copy and headings:** Spiti Valley taxi, Himachal tour by cab, Manali to Leh cab, Ladakh trip planning, Uttarakhand tour driver, local driver Himalayas, homestays and camps Spiti. Write for people; no keyword stuffing.
- **Technical:** `sitemap.xml`, `robots.txt` (allow all, link sitemap), clean semantic URLs, `alt` text, descriptive anchors, internal anchor links, 404 page, favicon set, web manifest, mobile-friendly viewport, HTTPS-only, `www` redirect to one canonical host.
- **Structured data (JSON-LD, generated from `/data/site.ts`):**
  - `TravelAgency` (or `LocalBusiness`) with name, logo, url, phone, WhatsApp, `areaServed`, `sameAs`, opening hours, address/service area, price range.
  - `Person` (Bhupinder Thakur) linked as founder.
  - `WebSite`, `WebPage`, `BreadcrumbList` if relevant.
  - `FAQPage` matching the visible FAQ exactly.
  - Optional `TouristTrip` per circuit, only with accurate data.
  - Validate with Google Rich Results Test and Schema.org validator in CI where possible.
- **Local SEO consistency:** business name, phone and service area must match exactly across the site, schema and the client's Google Business Profile (his separate task).
- **Off-page (non-dev):** Google Search Console + sitemap submission, Bing Webmaster Tools, Google Business Profile, backlinks via travel directories.

## 9. AEO (answer engine optimisation)

- **Answer-first writing:** each circuit and FAQ item opens with a direct 40 to 60 word answer (e.g. "The best time to visit Spiti Valley by road is..."), then detail. Question-style `<h3>`s.
- **Facts in plain HTML:** distances, typical durations, altitude, best months, permit needs, vehicle options, inclusions. Use lists and simple tables (real `<table>` with headers) so they are extractable.
- **FAQPage and entity schema** as above; consistent entity naming ("Rudra Himalayan Trails", "Bhupinder Thakur") across page, schema, social and GBP.
- **Crawlability:** all content (including trays and accordions) present in server-rendered HTML; no content that exists only after JS interaction. Use `hidden="until-found"` or `<details>` so in-page find works and text is indexable.
- **E-E-A-T signals:** named person, real photos, real reviews, years of experience, specific local knowledge, last-updated date on route info, clear contact and policies.
- **AI crawler policy:** allow reputable crawlers in `robots.txt` (Googlebot, Bingbot, GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot) unless the client opts out. Add `/llms.txt` summarising the business, services, routes and contact (low cost, optional benefit).
- **Freshness:** `dateModified` in schema, reviewed seasonally for road/permit/season info.

## 10. Content and data rules

- All content typed in `/data/*.ts` with TypeScript interfaces; components are pure renderers.
- No placeholder copy, lorem ipsum, fake reviews, or stock people shipped to production. Mockup reviews and names are stand-ins only.
- Real vehicle photos; number plates blurred or cropped.
- Prices: only ranges or "from", approved by client; disclaimer visible.
- Privacy Policy covers: what the form collects (it opens WhatsApp, nothing is stored by the site), analytics if used, cookies, contact for data requests. Terms cover indicative pricing, cancellation (client to supply), liability.

## 11. Build phases and acceptance criteria

**Phase 0: Scaffold (day 1).** Next.js + TS + Tailwind, tokens, fonts, ESLint/a11y lint, Prettier, CI with Lighthouse CI and axe, folder structure, `/data/site.ts`, base layout with skip link, landmarks, metadata, robots, sitemap. *Done when:* empty shell scores 100/100/100/100 and CI passes.

**Phase 1: Static page, no JS.** Build every section as server-rendered HTML with real content structure, responsive, accessible, no animation. Optimise images. *Done when:* page is fully usable and readable with JS disabled; Lighthouse 95+ across categories; no CLS.

**Phase 2: Interactivity.** Mobile menu, circuit trays with deep links, accordions, estimate, enquiry form to WhatsApp, sticky contact bar, review list, video facade. *Done when:* axe clean in all states, full keyboard and screen-reader flows work, focus management verified, INP within target.

**Phase 3: Motion.** Add `LazyMotion` reveals, tray transitions, hover/press feedback. Reduced-motion verified. *Done when:* bundle increase ≤ 15KB gz, no LCP/CLS/INP regression, reduced-motion disables all non-essential movement.

**Phase 4: SEO and AEO.** JSON-LD, OG images, FAQ content, llms.txt, validations, Search Console setup instructions. *Done when:* Rich Results Test passes, schema matches visible content, sitemap and robots verified.

**Phase 5: Hardening and launch.** Security headers and CSP, 404, favicons, privacy/terms, real-device testing (low-end Android, iPhone Safari), slow 3G/4G testing, cross-browser (Chrome, Safari, Firefox, Samsung Internet), PageSpeed Insights on production URL, analytics events, redirects (`www`), uptime check. *Done when:* the global definition of done below is met on the live URL.

## 12. Definition of done

- PageSpeed Insights (mobile and desktop) on the production URL: Performance 95+ (target 100), Accessibility 100, Best Practices 100, SEO 100.
- Core Web Vitals pass on lab data; field data monitored via Search Console after launch.
- Zero axe violations; manual keyboard, screen-reader and 400% zoom checks completed; accessibility statement published.
- Valid HTML (W3C validator), valid JSON-LD, no console errors, no broken links.
- Works with JS disabled for all content; forms and trays are progressive enhancements.
- Dynamic copyright year, real content only, plates blurred, legal pages live.
- README documents setup, content editing, pricing updates, deployment, and the performance/a11y budgets.

## 13. Inputs needed from the client

- Final WhatsApp and phone number, email, service area, business hours.
- Real photos of vehicles, Bhupinder, and routes (high resolution, rights confirmed); real testimonials with written permission (and videos with captions or transcripts).
- Itinerary details per circuit (days, highlights, inclusions, exclusions, best season, permits).
- Pricing ranges per trip, duration and vehicle type; cancellation and payment policy.
- Stays and camps details, approved descriptions.
- Social profile URLs; domain access; Google Business Profile (client task) so details match.
- FAQ answers (draft provided by agent, reviewed by client).

## 14. Out of scope for now

Blog, multiple route landing pages, CMS, booking/payments, user accounts, multi-language, live chat, map embeds, A/B testing. The architecture (typed content, route-ready components) should make route landing pages and a blog easy to add later.

## 15. Working rules for the agent

1. Do not add a dependency without a bundle-size and accessibility justification.
2. Default to Server Components; every `use client` needs a reason in a comment.
3. Never ship a feature that fails its budget; fix or cut it.
4. Prefer native HTML over ARIA and libraries.
5. Commit in small phases with the CI gates green at each step.
6. If the mockup conflicts with accessibility or performance (autoplay carousels, floating buttons, tiny taglines, low-contrast text), accessibility and performance win; note the deviation in the README.

## 16. Additional safeguards and recommendations

Fold these into the phases above (most belong in Phase 0 and Phase 5).

**Content integrity and trust**

- **Review consent.** Each review in `/data/reviews.ts` carries `consent: true` and a `consentDate`; the data check fails without them.
- **Route facts need a source.** Altitude, permits, road and pass status, and best seasons come from the client or official sources, never guessed. Each circuit shows a "Last reviewed" date. Add `/data/notices.ts` for seasonal notices (road closures, winter access) rendered in normal page flow, so no layout shift.
- **Safety copy.** Short, plain notes on altitude sickness, weather delays and road closures, with a line that itineraries can change for safety.
- **Business credentials.** Optional fields in `site.ts` for registration, GSTIN or tourism licence numbers, shown in the footer if the client has them. Real credentials are a strong trust signal.

**WhatsApp and contact reliability (most conversions happen here)**

- Store the number in E.164 form (`+91...`); build links as `https://wa.me/<digits>?text=` with `encodeURIComponent`, in one helper (`lib/whatsapp.ts`) with unit tests.
- Prefill the message with trip, dates, travellers and the page section it came from. Keep it under about 1,000 characters.
- Test in Instagram, Facebook and Chrome/Safari in-app browsers, which often break deep links, and on devices without WhatsApp installed.
- Show the phone number as visible text next to the Call button, because desktop users cannot dial `tel:` links.
- Without JavaScript, the form area still shows plain WhatsApp and call links.
- Format money and dates with `Intl` in `en-IN` (for example ₹1,20,000).

**Images and media**

- Keep originals outside `/public`; `scripts/optimise-images.mjs` (sharp) outputs AVIF/WebP at set widths, and CI fails on any file over its budget (hero under 120KB on mobile, cards under 60KB).
- **Strip EXIF metadata, including GPS location,** from every photo, and blur or crop number plates and faces of non-consenting people.
- Ask the client for a clean SVG logo with a transparent background, plus an icon-only mark. The supplied logo is a raster file and the tagline is unreadable at small sizes.
- Check licences for all photos and fonts (prefer OFL fonts). Record sources in `/docs/DECISIONS.md`.
- Create a social preview image (1200x630, under 300KB). WhatsApp link previews use Open Graph tags, and your traffic will share the link there often.

**Privacy and analytics**

- Use a cookieless analytics tool (Plausible or Umami) so no cookie banner is needed. Avoid GA4 unless the client insists, since it adds weight, consent handling and layout risk.
- The privacy policy should be accurate to what is collected (nothing is stored by the site) and consider India's DPDP Act. The client should have it reviewed before launch.

**Resilience and environments**

- Add `error.tsx`, `global-error.tsx` and `not-found.tsx`, with WhatsApp and call links on each.
- Keep staging and preview deployments `noindex` (`X-Robots-Tag` header) with `robots.txt` disallow, so only production is indexed.
- `.env.example` and a Zod-validated `lib/env.ts` for `NEXT_PUBLIC_SITE_URL` and analytics keys. No secrets in the repo.
- Redirect `www` to the one canonical host; set a 301 for any old URLs.

**Engineering hygiene**

- Pin Node (`.nvmrc`) and package manager (pnpm), with a committed lockfile.
- Husky and lint-staged (ESLint, Prettier, typecheck) on commit; conventional commits; Dependabot or Renovate for updates; `pnpm audit` in CI.
- Run Lighthouse CI against each preview deployment, not just locally. Run it several times and use the median, as scores vary run to run.
- Add `@next/bundle-analyzer` and fail CI if first-load JS exceeds budget.
- Write `/docs/CONTENT-GUIDE.md` so the client or another developer can change a price, review or FAQ by editing one file in `/data`.

**Realistic scoring expectations**

- Lab scores of 95 to 100 are achievable for a static site like this. A perfect 100 on mobile Performance depends on test conditions and the hero image.
- PageSpeed Insights field data (the Core Web Vitals pass or fail) only appears after real traffic over about 28 days. Monitor it in Search Console after launch, and add the `web-vitals` library to catch regressions.
- Never trade accessibility for a score point. If they conflict, accessibility wins.

**Rules added for the agent (continuing section 15)**

- Rule 7: Components never hardcode copy, prices, contacts or image paths. They read from `/data` through the getters.
- Rule 8: Any new content type gets a Zod schema and a data check before it gets a component.
- Rule 9: Record every deviation from this plan, with the reason, in `/docs/DECISIONS.md`.

## 17. Corrected mockup alignment

The corrected mockup (desktop 1280 and mobile 390) is the visual reference. It follows `DESIGN-REFERENCE.md`. Where it differs from section 5 above, **this section wins**.

- **Final section order:** Header, Hero, Trust strip, Meet Bhupinder, Tour circuits, **How it works (new)**, Stays and camps and custom trips, Estimate, Reviews, FAQ, Enquiry, Footer, plus the mobile-only sticky contact bar.
- **Header and nav:** Routes, Stays and camps, About, Reviews, FAQ, and a gold "Plan your trip" button. Both the header and footer use the same logo (the full lockup).
- **Hero:** two columns on desktop (text left, photo right); on mobile, photo first and text below. Both headline lines are teal.
- **Trust strip:** overlaps the hero on desktop, 2x2 grid on mobile, no overlap.
- **Circuit cards:** each shows typical days and best months, and a unique link such as "Explore Spiti Valley". There is no "View all" link.
- **How it works:** three numbered steps (tell us your plan, get an itinerary and quote, travel with a local driver). Data lives in `/data/steps.ts`.
- **Reviews:** a static grid (desktop) or scroll-snap list (mobile). No arrows, dots or autoplay. If `reviews.length === 0`, the section and its nav link are hidden.
- **Estimate:** includes the result state: an indicative range, a disclaimer, and a "Confirm on WhatsApp" button, announced with `aria-live`. The disclaimer box uses Glacier Mist, not blue.
- **Floating buttons removed.** No floating WhatsApp, call or back-to-top circles. Mobile uses the sticky bottom bar; desktop uses the header CTA and enquiry section. The footer has a plain "Back to top" link.
- **Footer:** full lockup (same logo as the header), quick links, phone, WhatsApp, email, service area, privacy and terms, social links with accessible names, and the current year computed at build.
- **Placeholders:** every `[BRACKETED]` item in the mockup (days, months, prices, phone, answers, reviews, photos) must come from `/data` and be supplied by the client. The agent must not invent them. Missing values stay as marked TODOs.
- **Logo in the mockup:** a cropped PNG stands in for the logo. Production uses the SVG versions of the final logo for both header and footer.
- **Intentional differences from the mockup:** photos are placeholders; icons are a simple Lucide-style line set; the FAQ is shown (it remains an optional phase in section 11).

## 18. Hosting on Netlify (overrides earlier hosting notes)

- **Static export.** Use `output: 'export'` and deploy the `out` folder. Pin Node with `.nvmrc` and pnpm with the `packageManager` field in `package.json` (Netlify detects pnpm from the lockfile).
- **Not used:** Netlify Forms, Functions, Edge Functions, and any Next server feature (middleware, route handlers, `revalidate`, `headers()` or `redirects()` in `next.config`). None of these apply to a static export.
- **Headers and caching live in `netlify.toml`** (`[[headers]]`): security headers, HSTS, and `Cache-Control: public, max-age=31536000, immutable` for `/_next/static/*` and hashed assets. Start the Content-Security-Policy in `Content-Security-Policy-Report-Only`, check the browser console, then enforce it. Static export needs hashes or `'self'` rules for Next's inline scripts, so generate hashes with a post-build script rather than using nonces.
- **Indexing control without headers.** Next reads Netlify's `CONTEXT` variable at build time. Only when `CONTEXT === 'production'` and `NEXT_PUBLIC_SITE_URL` is set does the site emit an index-allowing robots tag and an allowing `robots.txt`. Deploy previews and branch deploys emit `noindex` and `Disallow: /`. Verify with `curl -I` and by viewing the built HTML.
- **Domain.** Expected production domain: `https://www.rudrahimalayantrails.com` (TODO: client to confirm and register it). Read it from `NEXT_PUBLIC_SITE_URL` and fall back to a clearly marked TODO in `/data/site.ts`. Canonical, Open Graph URLs, sitemap and JSON-LD all use it. Make `www` the primary domain in Netlify so the apex redirects to it, and confirm the `.netlify.app` address redirects to the primary domain (add a forced redirect in `netlify.toml` if it does not).
- **Images on a static export.** The default `next/image` optimiser is not available. Set `images.loader: 'custom'` with a loader that calls Netlify Image CDN (`/.netlify/images?url=<path>&w=<width>&q=<quality>`, with AVIF/WebP negotiated) in production, and returns the plain file in local dev. `scripts/optimise-images.mjs` still caps originals at 2000px and strips EXIF. On a deploy preview, verify that AVIF or WebP is served, that the hero is preloaded, and that nothing regresses LCP. Fallback if the CDN loader misbehaves: pre-generate fixed widths in the script and use `unoptimized` with a hand-written `srcset`.
- **Redirects and 404.** Put redirects in `netlify.toml`. `app/not-found.tsx` produces `404.html`, which Netlify serves automatically.
- **Previews and CI.** Connect the Git repo, production branch `main`, deploy previews on pull requests. Run Lighthouse CI against the deploy preview URL.
- **Analytics.** Plausible or Umami, loaded after idle. Netlify Analytics is optional and paid.
