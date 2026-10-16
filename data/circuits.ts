/**
 * Tour circuits (BUILD-PLAN.md section 5.5). Names come from the plan.
 * Every route fact (days, months, altitude, permits, itinerary) must come from
 * the client or an official source. Never guess them.
 */
import { todo } from './todo.ts';
import type { CircuitsInput } from './types.ts';

const pending = () => ({
  summary: todo('client to supply one-line summary'),
  answer: todo('client to supply 40 to 60 word answer-first paragraph'),
  typicalDays: todo('client to supply typical number of days (min and max)'),
  bestMonths: todo('client to supply best months'),
  altitudeNote: todo('client to supply altitude notes'),
  permitNote: todo('client to supply permit requirements'),
  itinerary: [],
  inclusions: [],
  exclusions: [],
  lastReviewed: todo('date the client last reviewed these facts'),
});

export const circuits = [
  { slug: 'spiti', name: 'Spiti Valley', linkLabel: 'Explore Spiti Valley', ...pending() },
  {
    slug: 'himachal-escapes',
    name: 'Himachal Escapes',
    linkLabel: 'Explore Himachal Escapes',
    ...pending(),
  },
  { slug: 'leh-ladakh', name: 'Leh-Ladakh', linkLabel: 'Explore Leh-Ladakh', ...pending() },
  { slug: 'uttarakhand', name: 'Uttarakhand', linkLabel: 'Explore Uttarakhand', ...pending() },
] satisfies CircuitsInput;
