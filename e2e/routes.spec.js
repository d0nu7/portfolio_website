const { test, expect } = require('./fixtures');
const { seedAndResume, STORAGE_KEY } = require('./helpers');

async function enableFirstDate(page) {
  await page.goto('/closer/');
  await page.getByRole('button', { name: 'Menü' }).click();
  await page.getByRole('button', { name: 'Zusätzliche Inhalte' }).click();
  await page.getByRole('button', { name: /^FIRST DATE/ }).click();
  await page.getByRole('button', { name: 'Zurück' }).click();
  await page.getByRole('button', { name: 'Schließen' }).click();
}

/*
 * Iteration 7, Phase 2 (FR-01/FR-02): curated time routes replacing the
 * assumption that every playthrough is the full 36 questions. These pin
 * the new Duration screen in the setup flow, and that a shorter route
 * actually behaves shorter end-to-end -- act break position, the "that's
 * all N" copy, and Private Moment eligibility all move with the
 * route, not just the question count.
 */
test.describe('Duration / route selection', () => {
  test('the setup flow now goes players -> duration -> mode, and a chosen route carries into the game', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 720 });
    await page.goto('/closer/');
    await page.getByRole('button', { name: 'Start' }).click();
    await page.getByRole('button', { name: 'Weiter' }).click(); // players -> pack
    await page.getByRole('button', { name: 'Weiter' }).click(); // pack (default CLASSIC) -> duration

    await expect(page.getByText('Wie viel Zeit habt ihr?')).toBeVisible();
    // All three routes are offered, with their curated question counts.
    await expect(page.getByText('Quick · CLOSER-Auszug')).toBeVisible();
    await expect(page.getByText('Standard · CLOSER-Auszug')).toBeVisible();
    await expect(page.getByText('Full · vollständige 36-Fragen-Abfolge')).toBeVisible();
    await expect(page.getByText('12 Fragen · 3 Akte · etwa 15 Minuten')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth))
      .toBe(true);

    await page.getByText('Quick · CLOSER-Auszug').click();
    await page.getByRole('button', { name: 'Weiter' }).click();

    // Lands on the mode screen next, same as before this screen existed.
    await expect(page.getByText('Modus wählen')).toBeVisible();

    // Setup-only choices are not stored as a resumable run. Once the first
    // real question starts, the chosen route is persisted.
    await page.getByRole('button', { name: 'Weiter' }).click();
    await page.getByRole('button', { name: 'Los geht’s' }).click();
    await page.getByRole('button', { name: 'Weiter' }).click();
    const stored = await page.evaluate((key) => {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    }, STORAGE_KEY);
    expect(stored.routeId).toBe('quick');
  });

  test('a save from before routes existed (no routeId key) resumes as the full route', async ({
    page,
  }) => {
    // BASE_STATE deliberately omits routeId, exercising the same
    // migration path a real pre-Phase-2 save takes.
    await seedAndResume(page, { qIndex: 35 });
    await page.getByRole('button', { name: 'Lieber nicht' }).click();
    await page.waitForTimeout(1800);
    // Question 35 is the LAST question only on the full (36-question)
    // route -- landing on "all 36" here proves the missing routeId
    // defaulted to full, not some shorter route.
    await expect(page.getByText("Das waren alle 36.")).toBeVisible();
  });

  test('a pack with one style skips the redundant mode screen', async ({ page }) => {
    await enableFirstDate(page);
    await page.getByRole('button', { name: 'Start' }).click();
    await page.getByRole('button', { name: 'Weiter' }).click();
    await page.getByText('FIRST DATE', { exact: true }).click();
    await page.getByRole('button', { name: 'Weiter' }).click();

    await expect(page.getByText('Wie viel Zeit habt ihr?')).toBeVisible();
    await expect(page.getByRole('button', { name: /Zeit anzeigen/ })).toBeVisible();
    await page.getByRole('button', { name: 'Weiter' }).click();

    await expect(page.getByText('Modus wählen')).toHaveCount(0);
    await expect(page.getByText(/Neugier und Chemie entdecken/)).toBeVisible();
  });
});

test.describe('Quick route (12 questions, 4 per act)', () => {
  test('the act break fires after only 4 questions, not 12', async ({ page }) => {
    await seedAndResume(page, {
      routeId: 'quick',
      modeId: 'original',
      qIndex: 3,
    });
    await page.getByRole('button', { name: 'Weiter' }).click();
    // qIndex 3 -> 4 is quick's own Act I/II boundary (actStartIndices =
    // [0, 4, 8]), not question 12's -- landing on the act-break screen
    // here, not a plain question 5, proves the boundary is route-aware.
    await expect(page.getByText('ABGESCHLOSSEN')).toBeVisible();
  });

  test('finishing all 12 shows the route-aware "that\'s all 12" copy', async ({ page }) => {
    await seedAndResume(page, {
      routeId: 'quick',
      modeId: 'original',
      qIndex: 11,
      privateMomentStatus: 'consumed',
    });
    // Index 11 is quick's own last question (no chrome, "Fertig" instead
    // of "Weiter" -- same as the pack's real last question always does).
    await page.getByRole('button', { name: 'Fertig' }).click();
    await expect(page.getByText('Das waren alle 12.')).toBeVisible();
  });

  test('quick omits the multi-screen Private Moment', async ({
    page,
  }) => {
    await seedAndResume(page, {
      routeId: 'quick',
      modeId: 'original',
      qIndex: 9,
      privateMomentStatus: 'not-started',
    });
    // Quick's question at index 9 is Q26 (BF8-02's corrected curation),
    // which carries the 'deeper' twist -- the first "Weiter" only opens
    // that question's own optional follow-up screen (still not a question
    // navigation), so it takes a second "Weiter" (the follow-up screen's
    // own skip-it option) to actually advance.
    await page.getByRole('button', { name: 'Weiter' }).click();
    await page.getByRole('button', { name: 'Weiter' }).click();
    // Quick intentionally stays in the question flow; the longer private
    // sequence remains available to Standard and Full only.
    await expect(page.getByText(/GIB DAS HANDY AN ALEX/i)).toHaveCount(0);
    await expect(page.getByRole('button', { name: /Weiter|Fertig/ })).toBeVisible();
  });

  test('quick ends directly after its 12 regular questions', async ({ page }) => {
    await seedAndResume(page, {
      routeId: 'quick',
      modeId: 'original',
      qIndex: 11,
    });
    await page.getByRole('button', { name: 'Fertig' }).click();
    await page.waitForTimeout(1800);
    await page.getByRole('button', { name: 'Ende' }).click();

    await expect(page.getByText(/Das war.s\./)).toBeVisible();
    await expect(page.getByText(/GEHEIMFRAGEN|FRAGE 37/)).toHaveCount(0);
  });
});
