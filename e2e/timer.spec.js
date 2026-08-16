const { test, expect } = require('./fixtures');
const { seedAndResume } = require('./helpers');

test.describe('Act timer', () => {
  test('timer off shows no elapsed indicator at all', async ({ page }) => {
    await seedAndResume(page, { qIndex: 2, timerEnabled: false, actElapsedMs: 0 });
    await expect(page.locator('text=/^\\d+:\\d\\d$/')).toHaveCount(0);
    await expect(page.getByText('Ihr seid über der geplanten Zeit')).toHaveCount(0);
  });

  test('timer on shows a running clock', async ({ page }) => {
    await seedAndResume(page, { qIndex: 2, timerEnabled: true, actElapsedMs: 0 });
    await page.waitForTimeout(1200);
    await expect(page.locator('text=/^\\d+:\\d\\d$/')).toBeVisible();
  });

  for (const width of [320, 360, 390, 430]) {
    test(`timer and menu never overlap at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: width === 320 ? 568 : 844 });
      await seedAndResume(page, { qIndex: 2, timerEnabled: true, actElapsedMs: 0 });

      const timer = page.locator('text=/^\\d+:\\d\\d$/');
      const menu = page.getByRole('button', { name: 'Menü' });
      await expect(timer).toBeVisible();
      const [timerBox, menuBox] = await Promise.all([timer.boundingBox(), menu.boundingBox()]);
      expect(timerBox).not.toBeNull();
      expect(menuBox).not.toBeNull();
      expect(timerBox.x + timerBox.width).toBeLessThanOrEqual(menuBox.x - 8);
    });
  }

  // Bugfix-report iteration 7, BF-05: the previous wording falsely implied
  // the next act was ready regardless of how far through the current one
  // the couple actually was. This pins the corrected, honest copy.
  test('overtime shows the corrected, honest copy, wrapped within the screen', async ({ page }) => {
    await seedAndResume(page, {
      qIndex: 2,
      timerEnabled: true,
      // Active time, not a wall-clock start timestamp: comfortably beyond
      // this act's 15-minute budget.
      actElapsedMs: 20 * 60 * 1000,
    });
    await page.waitForTimeout(1200);

    const message = page.getByText('Ihr seid über der geplanten Zeit. Spielt in eurem Tempo weiter.');
    await expect(message).toBeVisible();

    const messageBox = await message.boundingBox();
    const screenBox = await page.locator('main').boundingBox();
    expect(messageBox).not.toBeNull();
    expect(screenBox).not.toBeNull();
    expect(messageBox.x).toBeGreaterThanOrEqual(screenBox.x);
    expect(messageBox.x + messageBox.width).toBeLessThanOrEqual(screenBox.x + screenBox.width + 1);
  });

  /*
   * Iteration 9 review P1-09: act time used to advance as wall-clock time
   * from `actStartedAt`, including while the game waited on the resume screen
   * or remained in the background. A resumed game could therefore show
   * overtime immediately.
   *
   * Only active play time now counts. These tests cover both sides: the clock
   * pauses outside play and continues once a question is open again.
   */
  test('act time does not advance on the resume screen', async ({ page }) => {
    // Check the visible clock rather than only the stored field. The old
    // wall-clock implementation also preserved actElapsedMs unchanged; the
    // player-visible value after the pause is what matters.
    const clock = page.locator('text=/^\\d+:\\d\\d$/');

    await seedAndResume(page, { qIndex: 2, timerEnabled: true, actElapsedMs: 0 });
    await page.waitForTimeout(1200);
    const beforePause = await clock.textContent();

    // Return to the resume screen and wait much longer than the active play.
    await page.reload();
    await expect(page.getByText('Spiel fortsetzen')).toBeVisible();
    await page.waitForTimeout(4000);
    await page.getByText('Spiel fortsetzen').click();

    const afterPause = await clock.textContent();
    const seconds = (v) => Number(v.split(':')[0]) * 60 + Number(v.split(':')[1]);
    // Allow two seconds for the brief active periods around the reload.
    expect(seconds(afterPause)).toBeLessThanOrEqual(seconds(beforePause) + 2);
  });

  test('act time advances again once a question is open', async ({ page }) => {
    await seedAndResume(page, { qIndex: 2, timerEnabled: true, actElapsedMs: 0 });
    await page.waitForTimeout(1200);
    const first = await page.locator('text=/^\\d+:\\d\\d$/').textContent();
    await page.waitForTimeout(2200);
    const second = await page.locator('text=/^\\d+:\\d\\d$/').textContent();
    expect(second).not.toBe(first);
  });
});
