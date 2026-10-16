import { describe, expect, it } from 'vitest';
import { computeIndexable, parseEnv } from '@/lib/env';

describe('parseEnv', () => {
  it('treats empty strings as unset and defaults the image loader', () => {
    expect(parseEnv({ NEXT_PUBLIC_SITE_URL: '', CONTEXT: '' })).toEqual({
      NEXT_PUBLIC_SITE_URL: undefined,
      CONTEXT: undefined,
      NEXT_PUBLIC_IMAGE_LOADER: 'none',
    });
  });

  it('strips trailing slashes from the site URL', () => {
    const env = parseEnv({ NEXT_PUBLIC_SITE_URL: 'https://www.rudrahimalayantrails.com/' });
    expect(env.NEXT_PUBLIC_SITE_URL).toBe('https://www.rudrahimalayantrails.com');
  });

  it('rejects invalid values', () => {
    expect(() => parseEnv({ NEXT_PUBLIC_SITE_URL: 'not a url' })).toThrow(/NEXT_PUBLIC_SITE_URL/);
    expect(() => parseEnv({ CONTEXT: 'staging' })).toThrow(/CONTEXT/);
    expect(() => parseEnv({ NEXT_PUBLIC_IMAGE_LOADER: 'cloudinary' })).toThrow();
  });
});

describe('computeIndexable', () => {
  const url = 'https://www.rudrahimalayantrails.com';

  it('indexes only production with a site URL', () => {
    expect(computeIndexable({ CONTEXT: 'production', NEXT_PUBLIC_SITE_URL: url })).toBe(true);
  });

  it.each([
    { CONTEXT: 'production' as const, NEXT_PUBLIC_SITE_URL: undefined },
    { CONTEXT: 'deploy-preview' as const, NEXT_PUBLIC_SITE_URL: url },
    { CONTEXT: 'branch-deploy' as const, NEXT_PUBLIC_SITE_URL: url },
    { CONTEXT: 'dev' as const, NEXT_PUBLIC_SITE_URL: url },
    { CONTEXT: undefined, NEXT_PUBLIC_SITE_URL: url },
  ])('noindex for %o', (env) => {
    expect(computeIndexable(env)).toBe(false);
  });
});
