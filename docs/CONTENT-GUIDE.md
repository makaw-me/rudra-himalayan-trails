# Content guide

How to change words, numbers and photos on the site. Everything lives in `/data`. You never need to touch `components/` or `app/`.

## The rules

1. **Edit one file in `/data`, then run `pnpm check-data`.** It tells you exactly which field is wrong. The build will not run with invalid content.
2. **Never guess a fact.** If you don't have a value yet, use `todo('what is missing')`. The check lists every TODO, so nothing gets forgotten.
3. **Phone numbers use the international format:** `+919876543210` (no spaces). The site formats them for display.
4. **Dates use `YYYY-MM-DD`**, for example `2026-10-16`. Money is whole rupees, for example `18000`. The site shows them as "16 Oct 2026" and "₹18,000".

## Where things live

| To change…                                     | Edit                   | Notes                                                                                     |
| ---------------------------------------------- | ---------------------- | ----------------------------------------------------------------------------------------- |
| Phone, WhatsApp, email                         | `data/contact.ts`      | E.164 format.                                                                             |
| Business name, tagline, hours, area, socials   | `data/site.ts`         | Also feeds Google search data, so keep it identical to the Google Business Profile.       |
| Page title and description (search results)    | `data/site.ts` → `seo` | Title ≤ 80 characters, description 70 to 160.                                             |
| Menu links                                     | `data/navigation.ts`   | Reviews and FAQ links hide themselves when those lists are empty.                         |
| Tour circuits (days, months, itinerary, notes) | `data/circuits.ts`     | Set `lastReviewed` every time you check the facts. `answer` must be 40 to 60 words.       |
| Stays, camps, custom trips                     | `data/stays.ts`        |                                                                                           |
| How it works (3 steps)                         | `data/steps.ts`        | Exactly 3.                                                                                |
| Trust strip (4 items)                          | `data/trust.ts`        | Exactly 4.                                                                                |
| Prices for the estimate                        | `data/pricing.ts`      | Ranges only (`from` and `to`). With no rules the estimate sends a plain enquiry.          |
| Reviews                                        | `data/reviews.ts`      | Real reviews only, with `consent: true` and `consentDate`. Empty list hides the section.  |
| FAQ                                            | `data/faq.ts`          | Question ends with "?"; answer ≤ 120 words, first sentence answers directly.              |
| Road closures and seasonal notices             | `data/notices.ts`      | Set `validFrom` and optionally `validUntil`; expired notices disappear on the next build. |
| Photos                                         | `data/images.ts`       | See below.                                                                                |
| Error page wording                             | `data/errors.ts`       |                                                                                           |
| Privacy and terms dates                        | `data/legal.ts`        |                                                                                           |

## Examples

**Change the price range for Spiti in an SUV** (`data/pricing.ts`):

```ts
rules: [
  { circuitSlug: 'spiti', vehicleId: 'suv', days: { min: 7, max: 9 }, from: 38000, to: 52000 },
],
```

**Add a review** (`data/reviews.ts`):

```ts
{
  id: 'asha-mumbai-2026',
  name: 'Asha',
  location: 'Mumbai',
  text: 'Exactly what they said on WhatsApp…',
  date: '2026-06-01',
  source: 'whatsapp',
  consent: true,
  consentDate: '2026-06-03',
},
```

## Photos

1. Keep originals outside the repo's `public/` folder (`/originals` is git-ignored).
2. Blur number plates and faces of anyone who has not agreed to be shown. Location data (GPS) is stripped by the image script (Phase 1).
3. Add an entry to `data/images.ts` with `src`, `alt` (what the photo shows, in a sentence), `width`, `height`, `sizes` and `priority` (only the hero image is `true`). Purely decorative images use `decorative: true` and `alt: ''`.

## Before launch

Run `CONTENT_STRICT=1 pnpm check-data`. It fails while any TODO remains.
