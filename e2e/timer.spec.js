const { test, expect } = require('@playwright/test');
const { seedAndResume } = require('./helpers');

test.describe('Act timer', () => {
  test('timer off shows no elapsed indicator at all', async ({ page }) => {
    await seedAndResume(page, { qIndex: 2, timerEnabled: false, actStartedAt: null });
    await expect(page.locator('text=/^\\d+:\\d\\d$/')).toHaveCount(0);
    await expect(page.getByText('Der nächste Akt ist bereit')).toHaveCount(0);
  });

  test('timer on shows a running clock', async ({ page }) => {
    await seedAndResume(page, { qIndex: 2, timerEnabled: true, actStartedAt: Date.now() });
    await page.waitForTimeout(1200);
    await expect(page.locator('text=/^\\d+:\\d\\d$/')).toBeVisible();
  });

  test('overtime shows the restored full-sentence copy, wrapped within the screen', async ({ page }) => {
    await seedAndResume(page, {
      qIndex: 2,
      timerEnabled: true,
      actStartedAt: Date.now() - 20 * 60 * 1000, // well past the 15-minute act
    });
    await page.waitForTimeout(1200);

    const message = page.getByText('Der nächste Akt ist bereit, wenn ihr es seid.');
    await expect(message).toBeVisible();

    const messageBox = await message.boundingBox();
    const screenBox = await page.locator('main').boundingBox();
    expect(messageBox).not.toBeNull();
    expect(screenBox).not.toBeNull();
    expect(messageBox.x).toBeGreaterThanOrEqual(screenBox.x);
    expect(messageBox.x + messageBox.width).toBeLessThanOrEqual(screenBox.x + screenBox.width + 1);
  });
});
