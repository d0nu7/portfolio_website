const { test, expect } = require('./fixtures');
const { seedAndResume, BASE_STATE, STORAGE_KEY } = require('./helpers');

/*
 * Milestone celebrations are deliberately large and perceptible, but never
 * block access to the global menu. Covered scene controls are deliberately
 * inert until the celebration clears. These tests cover triggers, duration,
 * timing isolation, mobile geometry, real movement, reduced motion, and the
 * absence of reward language on decline or early exit.
 */
const PULSE = '[data-testid="close-pulse"]';

test.describe('CLOSER PULSE', () => {
  test('fires at the Act I -> Act II boundary (stage "actI")', async ({ page }) => {
    // Quick route (4 questions/act) so index 3 -> 4 is actually a boundary,
    // not just the next of 12 (as it would be on the default full route).
    await seedAndResume(page, { routeId: 'quick', modeId: 'original', qIndex: 3 });
    await page.getByRole('button', { name: 'Weiter' }).click();
    await expect(page.locator(`${PULSE}[data-stage="actI"]`)).toBeVisible();
    await expect(page.getByText('ABGESCHLOSSEN')).toBeVisible();
  });

  test('fires at the Act II -> Act III boundary (stage "actII")', async ({ page }) => {
    await seedAndResume(page, { qIndex: 23 });
    await page.getByRole('button', { name: 'Weiter' }).click();
    await expect(page.locator(`${PULSE}[data-stage="actII"]`)).toBeVisible();
    await expect(page.getByText('ABGESCHLOSSEN')).toBeVisible();
  });

  test('stays quiet when a Private Moment handoff completes', async ({ page }) => {
    await page.goto('/closer/');
    await page.evaluate(
      ({ key, value }) => window.localStorage.setItem(key, JSON.stringify(value)),
      {
        key: STORAGE_KEY,
        value: {
          ...BASE_STATE,
          phase: 'secretPassBack',
          qIndex: 26,
          pending: 27,
          privateMomentStatus: 'in-progress',
          privateQuestionState: ['pending', 'pending'],
        },
      }
    );
    await page.reload();
    await page.getByText('Spiel fortsetzen').click();
    await page.getByRole('button', { name: 'Weiter' }).click();
    await expect(page.locator(PULSE)).toHaveCount(0);
    await expect(page.getByText('28', { exact: true })).toBeVisible();
  });

  test('fires after a naturally completed finale (stage "finale")', async ({ page }) => {
    await seedAndResume(page, {
      phase: 'q37',
      privateMomentStatus: 'armed',
      privateQuestionState: ['asked', 'asked'],
    });
    await page.getByRole('button', { name: 'Fertig' }).click();
    const pulse = page.locator(`${PULSE}[data-stage="finale"]`);
    await expect(pulse).toBeVisible();
    await expect(page.getByText('Das war’s.')).toBeVisible();

    // The first ending beat must not elapse behind the opaque celebration.
    // The compact finale remains visible beyond its first ending beat.
    await page.waitForTimeout(2200);
    await expect(pulse).toBeVisible();
    await expect(page.getByText('Das war’s.')).toBeVisible();
    await expect(pulse).toHaveCount(0, { timeout: 1500 });
    await expect(page.getByText('Das war’s.')).toBeVisible();
  });

  test('does not reward an early menu exit with a finale pulse', async ({ page }) => {
    await seedAndResume(page, { qIndex: 2 });
    await page.getByRole('button', { name: 'Menü' }).click();
    await page.getByRole('button', { name: 'Spiel jetzt beenden' }).click();
    await page.getByRole('button', { name: 'Spiel jetzt beenden', exact: true }).click();
    await expect(page.locator(PULSE)).toHaveCount(0);
    await expect(page.getByText('Das war’s.')).toBeVisible();
  });

  test('is large, moves, blocks covered controls, and never blocks the menu', async ({ page }) => {
    await seedAndResume(page, { routeId: 'quick', modeId: 'original', qIndex: 3 });
    await page.getByRole('button', { name: 'Weiter' }).click();
    const pulse = page.locator(PULSE);
    await expect(pulse).toBeVisible();

    const visual = page.getByTestId('milestone-visual');
    const box = await visual.boundingBox();
    expect(box).not.toBeNull();
    expect(box.width).toBeGreaterThanOrEqual(280);
    await expect(pulse).toHaveAttribute('data-duration', '2100');
    expect(await pulse.evaluate((node) => getComputedStyle(node).pointerEvents)).toBe('none');

    const scene = page.getByTestId('closer-frame-content');
    await expect(scene).toHaveAttribute('inert', '');
    await expect(scene).toHaveAttribute('aria-hidden', 'true');

    const left = page.getByTestId('milestone-left-light');
    const startX = (await left.boundingBox()).x;
    await page.waitForTimeout(700);
    const laterX = (await left.boundingBox()).x;
    expect(laterX).toBeGreaterThan(startX + 12);

    // A tap where the visually covered Continue button sits must not advance
    // the act-break screen. The global Menu is a separate, usable sibling.
    const coveredContinue = scene.locator('button').filter({ hasText: 'Weiter' });
    const coveredBox = await coveredContinue.boundingBox();
    expect(coveredBox).not.toBeNull();
    await page.mouse.click(
      coveredBox.x + coveredBox.width / 2,
      coveredBox.y + coveredBox.height / 2
    );
    await expect(page.getByText('ABGESCHLOSSEN')).toBeVisible();

    await page.getByRole('button', { name: 'Menü' }).click();
    await expect(page.getByRole('dialog', { name: 'Menü' })).toBeVisible();
  });

  test('starts active conversation time immediately after a quiet private handoff', async ({ page }) => {
    await page.goto('/closer/');
    await page.evaluate(
      ({ key, value }) => window.localStorage.setItem(key, JSON.stringify(value)),
      {
        key: STORAGE_KEY,
        value: {
          ...BASE_STATE,
          phase: 'secretPassBack',
          qIndex: 26,
          pending: 27,
          timerEnabled: true,
          actElapsedMs: 0,
          privateMomentStatus: 'in-progress',
          privateQuestionState: ['pending', 'pending'],
        },
      }
    );
    await page.reload();
    await page.getByText('Spiel fortsetzen').click();
    await page.getByRole('button', { name: 'Weiter' }).click();

    const scene = page.getByTestId('closer-frame-content');
    await expect(page.locator(PULSE)).toHaveCount(0);
    await expect(scene.getByText('0:00', { exact: true })).toBeVisible();
    await page.waitForTimeout(1300);
    await expect(scene.getByText('0:01', { exact: true })).toBeVisible();
  });

  test('reduced motion shows a full-sized stable scene', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await seedAndResume(page, { routeId: 'quick', modeId: 'original', qIndex: 3 });
    await page.getByRole('button', { name: 'Weiter' }).click();
    const pulse = page.locator(`${PULSE}[data-reduced="true"]`);
    await expect(pulse).toBeVisible();
    await expect(pulse).toHaveAttribute('data-duration', '1200');
    const box = await page.getByTestId('milestone-visual').boundingBox();
    expect(box).not.toBeNull();
    expect(box.width).toBeGreaterThanOrEqual(280);
    expect(await pulse.evaluate((node) => Number(getComputedStyle(node).opacity))).toBeGreaterThan(0.9);
  });

  test('does not fire on a plain resume/reload', async ({ page }) => {
    await seedAndResume(page, { qIndex: 3 });
    await expect(page.locator(PULSE)).toHaveCount(0);
  });

  test('does not fire on the free "Lieber nicht" decline', async ({ page }) => {
    await seedAndResume(page, { qIndex: 3 });
    await page.getByRole('button', { name: 'Lieber nicht' }).click();
    await expect(page.locator(PULSE)).toHaveCount(0);
  });
});
