/**
 * Image registry: sections look images up by key. Every entry needs width,
 * height, sizes and meaningful alt (or decorative: true with alt "").
 * Only one image may set priority (the hero LCP image).
 * TODO(client): real photos arrive in Phase 1 (EXIF stripped, plates blurred).
 */
import type { ImagesInput } from './types.ts';

export const images = {} satisfies ImagesInput;
