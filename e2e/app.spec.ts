import { test, expect } from '@playwright/test';

// Basic smoke test to verify the app renders and main navigation is visible
// Relies on playwright.config.ts webServer to launch CRA on http://localhost:3000

test('home page shows Now Playing tab', async ({ page, baseURL }) => {
  await page.goto(baseURL || 'http://localhost:3000');
  const nowPlaying = page.getByRole('link', { name: /now playing/i });
  await expect(nowPlaying).toBeVisible();
});
