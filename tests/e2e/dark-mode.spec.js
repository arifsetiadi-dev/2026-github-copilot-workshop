const { test, expect } = require('@playwright/test');

function themeToggle(page) {
  return page.locator('.theme-toggle');
}

test.describe('dark mode toggle', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('toggles page between light and dark mode', async ({ page }) => {
    const toggle = themeToggle(page);
    await expect(toggle).toBeVisible();

    const html = page.locator('html');
    await expect(html).not.toHaveAttribute('data-theme', 'dark');

    await toggle.click();
    await expect(html).toHaveAttribute('data-theme', 'dark');
    await expect(page.getByRole('button', { name: /switch to light mode/i })).toBeVisible();

    await toggle.click();
    await expect(html).not.toHaveAttribute('data-theme', 'dark');
    await expect(page.getByRole('button', { name: /switch to dark mode/i })).toBeVisible();
  });

  test('remembers dark mode across reloads', async ({ page }) => {
    const toggle = themeToggle(page);
    await toggle.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await expect(page.getByRole('button', { name: /switch to light mode/i })).toBeVisible();
  });
});
