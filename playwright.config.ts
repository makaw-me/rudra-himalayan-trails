import { defineConfig, devices } from '@playwright/test';

/** E2E and axe run against the static export in out/ (run `pnpm build` first). */
const PORT = 4173;
const isCI = Boolean(process.env.CI);

export default defineConfig({
  testDir: 'tests',
  testMatch: /(e2e|a11y)\/.*\.spec\.ts$/,
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  reporter: isCI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: `pnpm exec serve out -l ${PORT} --no-clipboard`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !isCI,
    timeout: 30_000,
  },
});
