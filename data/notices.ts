/**
 * Seasonal notices (road closures, winter access). Rendered in normal page flow,
 * so they never cause layout shift. Expired notices are filtered by the getter.
 */
import type { NoticesInput } from './types.ts';

export const notices = [] satisfies NoticesInput;
