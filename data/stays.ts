/** Stays, camps and custom trips (BUILD-PLAN.md sections 5.6 and 17). */
import { todo } from './todo.ts';
import type { StaysInput } from './types.ts';

export const stays = [
  {
    slug: 'homestays',
    title: 'Homestays',
    summary: todo('client to approve copy'),
    details: todo('client to approve copy'),
  },
  {
    slug: 'camps',
    title: 'Camps',
    summary: todo('client to approve copy'),
    details: todo('client to approve copy'),
  },
  {
    slug: 'custom-trips',
    title: 'Custom trips',
    summary: todo('client to approve copy'),
    details: todo('client to approve copy'),
  },
] satisfies StaysInput;
