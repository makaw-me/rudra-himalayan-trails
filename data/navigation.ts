/** Primary navigation and site pages (BUILD-PLAN.md section 17). */
import type { NavigationInput } from './types.ts';

export const navigation = {
  primary: [
    { id: 'routes', label: 'Routes', href: '#routes' },
    { id: 'stays', label: 'Stays and camps', href: '#stays' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'reviews', label: 'Reviews', href: '#reviews', hideWhenEmpty: 'reviews' },
    { id: 'faq', label: 'FAQ', href: '#faq', hideWhenEmpty: 'faq' },
  ],
  cta: { label: 'Plan your trip', href: '#enquiry' },
  // Pages in the sitemap. /privacy and /terms are added in Phase 5 when they exist.
  pages: [{ path: '/', changeFrequency: 'monthly', priority: 1 }],
} satisfies NavigationInput;
