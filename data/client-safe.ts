/**
 * Client-safe data slice for client components that cannot receive props from a
 * server parent (app/error.tsx, app/global-error.tsx).
 * Imports only plain modules: no Zod, no other datasets. Values are validated by
 * check-data and by data/index.ts at build time.
 */
export { contact } from './contact.ts';
export { errorPages } from './errors.ts';
export { isTodo } from './todo.ts';
