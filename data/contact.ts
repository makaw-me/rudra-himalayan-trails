/**
 * Contact numbers. Separate from site.ts so client-safe slices (error pages,
 * later the sticky bar) can import them without the rest of the site data or Zod.
 * Store numbers in E.164, e.g. +919876543210.
 */
import { todo } from './todo.ts';
import type { ContactInput } from './types.ts';

export const contact = {
  phone: todo('client to supply phone number in E.164, e.g. +91XXXXXXXXXX'),
  whatsapp: todo('client to supply WhatsApp number in E.164'),
  email: todo('client to supply email address'),
} satisfies ContactInput;
