import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  use: {
    baseURL: process.env.E2E_BASE_URL ?? 'http://localhost:3000',
    headless: true,
  },
  webServer: {
    command: 'pnpm start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
    env: { NEXT_CF_DEV: '0' },
  },
  projects: [
    { name: 'desktop-chrome', use: { viewport: { width: 1440, height: 900 } } },
    { name: 'mobile-iphone',  use: { viewport: { width: 375,  height: 812 } } },
  ],
});
