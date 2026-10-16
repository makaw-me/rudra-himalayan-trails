import type { NextConfig } from 'next';

/**
 * Static export for Netlify (see AGENTS.md "Hosting").
 * No server features: headers, redirects and caching live in netlify.toml,
 * and the build-specific CSP is written to out/_headers by scripts/csp-headers.ts.
 */
const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // A static export cannot use the default optimiser. The custom loader calls
    // the Netlify Image CDN on deploys and serves plain files elsewhere.
    loader: 'custom',
    loaderFile: './lib/image-loader.ts',
  },
};

export default nextConfig;
