import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Dojo Academy/);
});

test('navigation links work', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Click the News link.
  await page.getByRole('link', { name: 'News', exact: true }).click();

  // Expects page to have a heading with the name of News & Updates.
  await expect(page.getByRole('heading', { name: 'News & Updates' })).toBeVisible();
});
