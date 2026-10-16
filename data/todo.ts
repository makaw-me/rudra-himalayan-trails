/**
 * TODO markers for content the client has not supplied yet.
 * Dependency-free so client-safe data slices can import it without pulling Zod.
 */
export const TODO_PREFIX = 'TODO:';

/** Marks a value the client has not supplied yet. Never invent the real value. */
export const todo = (reason: string) => `${TODO_PREFIX} ${reason}` as const;

export type Todo = ReturnType<typeof todo>;

export const isTodo = (value: unknown): value is Todo =>
  typeof value === 'string' && value.startsWith(TODO_PREFIX);
