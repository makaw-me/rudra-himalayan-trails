/**
 * Single source of truth for business identity. Feeds metadata, robots,
 * sitemap, footer and (Phase 4) JSON-LD and llms.txt.
 *
 * Values marked todo(...) have not been supplied by the client. Do not guess them.
 */
import { contact } from './contact.ts';
import { todo } from './todo.ts';
import type { SiteInput } from './types.ts';

export const site = {
  name: 'Rudra Himalayan Trails',
  // The mobile header shows "RUDRA" (BUILD-PLAN.md section 5.1).
  shortName: 'Rudra',
  legalName: 'Rudra Himalayan Trails',
  tagline: 'Mountains, Stories, Meaningful Journeys',
  founder: {
    name: 'Bhupinder Thakur',
    role: 'Founder, driver and trip planner',
  },

  // TODO(client): confirm the production domain. Until then domainConfirmed stays
  // false and check-data warns. The live origin is read from NEXT_PUBLIC_SITE_URL.
  domain: 'https://www.rudrahimalayantrails.com',
  domainConfirmed: false,

  locale: 'en-IN',
  language: 'en',

  // Defined in contact.ts (client-safe slice).
  contact,
  // TODO(client): placeholder monogram until the SVG logo mark arrives.
  icons: { favicon: '/favicon.svg' },
  serviceArea: todo('client to confirm service area (states / regions covered)'),
  baseLocation: todo('client to confirm base town for NAP and schema'),
  hours: todo('client to confirm business hours'),
  // TODO(client): social profile URLs. Empty list renders nothing.
  social: [],
  // Optional. Shown in the footer only if the client supplies them.
  credentials: {},

  seo: {
    // Suggested in BUILD-PLAN.md section 8.
    title: 'Himachal, Spiti and Ladakh Taxi and Tour Planner | Rudra Himalayan Trails',
    // DRAFT: written from the plan's service list; pending client approval.
    description:
      'Plan a Himalayan road trip with Bhupinder Thakur, a local driver and trip planner for Spiti, Himachal, Leh-Ladakh and Uttarakhand. Enquire on WhatsApp.',
  },

  hero: {
    // From BUILD-PLAN.md section 5.
    headline: 'The Himalayas, at your own pace.',
    subcopy: todo('client to approve hero subcopy'),
  },

  ui: {
    skipLink: 'Skip to main content',
    homeLinkLabel: 'Rudra Himalayan Trails, back to top',
    backToTop: 'Back to top',
    copyright: 'All rights reserved.',
  },

  // BUILD-PLAN.md section 9: allow reputable search and AI crawlers unless the client opts out.
  crawlers: ['Googlebot', 'Bingbot', 'GPTBot', 'OAI-SearchBot', 'PerplexityBot', 'ClaudeBot'],

  lastUpdated: '2026-10-16',
} satisfies SiteInput;
