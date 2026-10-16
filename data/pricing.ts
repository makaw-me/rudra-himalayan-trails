/**
 * Indicative price ranges for the estimate (BUILD-PLAN.md section 5.7).
 * Whole rupees, shown as "from" ranges with the disclaimer.
 * With no rules, the estimate ships without numbers and sends a plain enquiry.
 */
import { todo } from './todo.ts';
import type { PricingInput } from './types.ts';

export const pricing = {
  currency: 'INR',
  disclaimer: todo('client to approve pricing disclaimer'),
  // TODO(client): vehicle types offered.
  vehicles: [],
  // TODO(client): price ranges per circuit, duration and vehicle.
  rules: [],
} satisfies PricingInput;
