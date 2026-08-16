const { test, expect } = require('@playwright/test');
const { seedAndResume, STORAGE_KEY } = require('./helpers');

test.describe('Free pass', () => {
  test('there is one free opt-out and no token-skip control', async ({ page }) => {
    await seedAndResume(page, { qIndex: 2 });

    await expect(page.getByRole('button', { name: 'Lieber nicht' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Skip', exact: true })).toHaveCount(0);
    await expect(page.locator('[aria-label$="/3"]')).toHaveCount(0);
  });

  test('passing advances exactly one question after a neutral flash', async ({ page }) => {
    await seedAndResume(page, { qIndex: 2 });
    await page.getByRole('button', { name: 'Lieber nicht' }).click();

    await expect(page.getByText('Weiter ohne Antwort.')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Weiter' })).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Lieber nicht' })).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Menü' })).toHaveCount(0);

    await page.waitForTimeout(1800);
    const saved = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)), STORAGE_KEY);
    expect(saved.qIndex).toBe(3);
    await expect(page.getByRole('button', { name: 'Weiter' })).toBeVisible();
  });

  test('passing is available on the final regular question', async ({ page }) => {
    await seedAndResume(page, {
      qIndex: 35,
      secretSeen: [true, true],
      hasSecretQuestion: [true, true],
    });

    await page.getByRole('button', { name: 'Lieber nicht' }).click();
    await page.waitForTimeout(1800);
    await expect(page.getByText('Das waren alle 36.')).toBeVisible();
  });

  test('a fresh intro explains that passing is unlimited and free', async ({ page }) => {
    await page.goto('/closer/');
    await page.getByRole('button', { name: 'Start' }).click();
    await page.getByRole('button', { name: 'Weiter' }).click();
    await page.getByRole('button', { name: 'Weiter' }).click();
    await page.getByText('VOLL', { exact: true }).click();
    await page.getByRole('button', { name: 'Weiter' }).click();
    await page.getByRole('button', { name: 'Weiter' }).click();

    await expect(page.getByText(/Eine Grenze kostet nichts/)).toBeVisible();
    await expect(page.getByText(/Skip Token/)).toHaveCount(0);
  });
});
