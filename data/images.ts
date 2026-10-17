/**
 * Image registry: sections look images up by key. Every entry needs width,
 * height, sizes and meaningful alt (or decorative: true with alt "").
 * Only one image may set priority (the hero LCP image).
 * TODO(client): real photos arrive in Phase 1 (EXIF stripped, plates blurred).
 */
import type { ImagesInput } from './types.ts';

export const images = {
  hero: {
    src: '/placeholders/hero.svg',
    alt: 'Himalayan mountain highway with scenic peaks under clear morning sky',
    decorative: false,
    width: 1200,
    height: 800,
    sizes: '(max-width: 768px) 100vw, 50vw',
    priority: true,
  },
  bhupinder: {
    src: '/placeholders/bhupinder.svg',
    alt: 'Bhupinder Thakur with expedition SUV in Himachal Pradesh',
    decorative: false,
    width: 1000,
    height: 1000,
    sizes: '(max-width: 768px) 100vw, 50vw',
    priority: false,
  },
} satisfies ImagesInput;
