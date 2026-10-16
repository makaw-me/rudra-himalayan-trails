/** Trust strip: four items (BUILD-PLAN.md section 5.3). Descriptions pending client copy. */
import { todo } from './todo.ts';
import type { TrustInput } from './types.ts';

export const trust = [
  {
    id: 'local-knowledge',
    title: 'Local knowledge',
    description: todo('client to approve copy'),
    icon: 'mountain',
  },
  {
    id: 'personalised-itineraries',
    title: 'Personalised itineraries',
    description: todo('client to approve copy'),
    icon: 'route',
  },
  {
    id: 'stays-arranged',
    title: 'Stays arranged',
    description: todo('client to approve copy'),
    icon: 'tent',
  },
  {
    id: 'direct-contact',
    title: 'Direct contact',
    description: todo('client to approve copy'),
    icon: 'message-circle',
  },
] satisfies TrustInput;
