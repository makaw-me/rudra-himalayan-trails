/** How it works: three steps (BUILD-PLAN.md section 17). */
import { todo } from './todo.ts';
import type { StepsInput } from './types.ts';

export const steps = [
  {
    id: 'tell-us-your-plan',
    title: 'Tell us your plan',
    description: todo('client to approve copy'),
  },
  {
    id: 'get-itinerary-and-quote',
    title: 'Get an itinerary and quote',
    description: todo('client to approve copy'),
  },
  {
    id: 'travel-with-local-driver',
    title: 'Travel with a local driver',
    description: todo('client to approve copy'),
  },
] satisfies StepsInput;
