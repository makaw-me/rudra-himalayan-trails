/** Legal pages metadata. Pages themselves ship in Phase 5. */
import { todo } from './todo.ts';
import type { LegalInput } from './types.ts';

export const legal = {
  privacy: {
    title: 'Privacy policy',
    lastUpdated: todo('set when the client approves the privacy policy'),
  },
  terms: {
    title: 'Terms',
    lastUpdated: todo('set when the client approves the terms (cancellation, payment)'),
  },
} satisfies LegalInput;
