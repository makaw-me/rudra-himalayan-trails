/**
 * Real, permissioned reviews only. Each needs consent: true and a consentDate.
 * While this list is empty the Reviews section and its nav link are hidden.
 * TODO(client): supply testimonials with written permission.
 */
import type { ReviewsInput } from './types.ts';

export const reviews = [] satisfies ReviewsInput;
