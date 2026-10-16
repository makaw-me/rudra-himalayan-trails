/**
 * next/image loader for the static export.
 * - NEXT_PUBLIC_IMAGE_LOADER=netlify (set for Netlify deploys in netlify.toml):
 *   Netlify Image CDN resizes and negotiates AVIF/WebP from the Accept header.
 * - Otherwise (local dev, CI, Lighthouse runs): the original file is served.
 *   The width parameter is kept so next/image's loader check passes; static
 *   hosts ignore it.
 * Verify on the first deploy preview (AGENTS.md "Hosting").
 */
import type { ImageLoaderProps } from 'next/image';

export const DEFAULT_QUALITY = 72;

export default function imageLoader({ src, width, quality }: ImageLoaderProps): string {
  const q = String(quality ?? DEFAULT_QUALITY);
  if (process.env.NEXT_PUBLIC_IMAGE_LOADER === 'netlify') {
    const params = new URLSearchParams({ url: src, w: String(width), q });
    return `/.netlify/images?${params.toString()}`;
  }
  const separator = src.includes('?') ? '&' : '?';
  return `${src}${separator}w=${width}`;
}
