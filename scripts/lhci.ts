/**
 * Local and CI Lighthouse run against the budgets in lighthouserc.json.
 *   pnpm lhci             -> production-like build served on :4173, then lhci autorun
 *   pnpm lhci --no-build  -> reuse the existing out/ (CI builds once)
 *
 * The build uses CONTEXT=production and NEXT_PUBLIC_SITE_URL=http://localhost:4173 so
 * robots, canonical and meta robots match the served origin (Lighthouse's SEO audits
 * fail a canonical pointing at another host, or a noindex page).
 * Cross-platform: env is set here rather than with shell syntax in package.json.
 */
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';

const LHCI_ORIGIN = 'http://localhost:4173';

function run(command: string, env: Record<string, string> = {}): void {
  const result = spawnSync(command, {
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, ...env },
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

if (!process.argv.includes('--no-build')) {
  run('pnpm build', {
    CONTEXT: 'production',
    NEXT_PUBLIC_SITE_URL: LHCI_ORIGIN,
    NEXT_PUBLIC_IMAGE_LOADER: 'none',
  });
}

// Use an installed Chrome if CHROME_PATH is set, otherwise Playwright's Chromium.
const env: Record<string, string> = {};
if (!process.env.CHROME_PATH) {
  try {
    const { chromium } = await import('@playwright/test');
    const path = chromium.executablePath();
    if (existsSync(path)) env.CHROME_PATH = path;
  } catch {
    // Fall back to chrome-launcher's own discovery.
  }
}

run('pnpm exec lhci autorun', env);
