const { test, expect } = require('@playwright/test');
const { seedAndResume } = require('./helpers');

/*
 * The secret question has to stay actually private: capturing it (between
 * question 27 and 28) and resolving it (the two YES/NO checks after "that's
 * all 36") both go through a phone handoff before anyone sees the private
 * screen, mirroring the same choreography on both ends.
 */
test.describe('Secret question -- capture', () => {
  test('walks through both private handoffs and lands back on the game', async ({ page }) => {
    await seedAndResume(page, { phase: 'secretPass1', pending: 27, qIndex: 26 });

    await expect(page.getByText(/GIB DAS HANDY AN ALEX/i)).toBeVisible();
    await page.getByRole('button', { name: 'Ich bin Alex' }).click();

    await expect(page.getByText('NUR FÜR ALEX')).toBeVisible();
    await page.getByRole('button', { name: 'Ich hab eine' }).click();

    await expect(page.getByText('GIB DAS HANDY WEITER')).toBeVisible();
    await expect(page.getByText(/Gib das Handy an Sam/)).toBeVisible();
    await page.getByRole('button', { name: 'Fertig' }).click();

    await expect(page.getByText('NUR FÜR SAM')).toBeVisible();
    await page.getByRole('button', { name: 'Ich hab eine' }).click();

    await expect(page.getByText('GIB DAS HANDY ZURÜCK')).toBeVisible();
    await page.getByRole('button', { name: 'Weiter' }).click();

    // Back in the normal question flow -- no more secret-capture chrome.
    await expect(page.getByText('NUR FÜR')).toHaveCount(0);
    await expect(page.getByRole('button', { name: /Weiter|Fertig/ })).toBeVisible();
  });

  /*
   * Bugfix-report iteration 7, BF-08/FR-07: "Heute keine" is an equally
   * valid choice, not a fallback -- nobody has to pretend a question exists
   * to move the handoff sequence along.
   */
  test('"Heute keine" is offered alongside "Ich hab eine" and advances the handoff just the same', async ({
    page,
  }) => {
    await seedAndResume(page, { phase: 'secretPass1', pending: 27, qIndex: 26 });
    await page.getByRole('button', { name: 'Ich bin Alex' }).click();

    await expect(page.getByText('NUR FÜR ALEX')).toBeVisible();
    await page.getByRole('button', { name: 'Heute keine' }).click();

    // Same next screen as choosing "Ich hab eine" would have produced.
    await expect(page.getByText('GIB DAS HANDY WEITER')).toBeVisible();
  });

  test('resuming mid-handoff (e.g. after closing the tab) reopens on the same private screen', async ({
    page,
  }) => {
    await seedAndResume(page, {
      phase: 'secret2',
      pending: 27,
      qIndex: 26,
      secretSeen: [true, false],
      hasSecretQuestion: [true, null],
    });
    await expect(page.getByText('NUR FÜR SAM')).toBeVisible();
    // Alex's screen must not leak through on resume.
    await expect(page.getByText('NUR FÜR ALEX')).toHaveCount(0);
  });
});

test.describe('Secret question -- resolution', () => {
  test('the post-36 check has its own handoffs before Question 37', async ({ page }) => {
    await seedAndResume(page, { phase: 'checkPass1', qIndex: 35, secretAsked: [null, null] });

    await expect(page.getByText(/GIB DAS HANDY AN ALEX/i)).toBeVisible();
    await page.getByRole('button', { name: 'Ich bin Alex' }).click();

    await expect(page.getByText(/Hat Sam die Frage gestellt/)).toBeVisible();
    await page.getByRole('button', { name: 'Nein' }).click();

    await expect(page.getByText(/GIB DAS HANDY AN SAM/i)).toBeVisible();
    await page.getByRole('button', { name: 'Ich bin Sam' }).click();

    await expect(page.getByText(/Hat Alex die Frage gestellt/)).toBeVisible();
    await page.getByRole('button', { name: 'Nein' }).click();

    await expect(page.getByText('GIB DAS HANDY ZURÜCK')).toBeVisible();
    await page.getByRole('button', { name: 'Weiter' }).click();

    // Both said no -> "neither" branch of Question 37.
    await expect(page.getByText('NOCH EINE?')).toBeVisible();
  });

  /*
   * Bugfix-report iteration 7, BF-08/FR-07: a person who chose "Heute
   * keine" has nothing to ask about, so their own private check screen is
   * skipped entirely -- the "that's all 36" continue button, and check1's
   * own answer, both route around them.
   */
  test('a person who declined the secret question skips straight past their own check screen', async ({
    page,
  }) => {
    // Alex (0) declined; Sam (1) has one and hasn't had it asked yet.
    await seedAndResume(page, {
      phase: 'all36',
      qIndex: 35,
      hasSecretQuestion: [false, true],
      secretAsked: [null, null],
    });
    await page.waitForTimeout(1800); // the "but you each had..." reveal beat
    await page.getByRole('button', { name: 'Weiter' }).click();

    // Skips straight to Sam's own handoff -- never Alex's.
    await expect(page.getByText(/GIB DAS HANDY AN SAM/i)).toBeVisible();
    await page.getByRole('button', { name: 'Ich bin Sam' }).click();
    await expect(page.getByText(/Hat Alex die Frage gestellt/)).toBeVisible();
    await page.getByRole('button', { name: 'Nein' }).click();

    // Sam's own check resolves through the shared handoff-back screen;
    // Alex's absence still leads to Question 37, not a dead end.
    await expect(page.getByText('GIB DAS HANDY ZURÜCK')).toBeVisible();
    await page.getByRole('button', { name: 'Weiter' }).click();
    await expect(page.getByText('EINE FRAGE FEHLT NOCH')).toBeVisible();
  });

  test('both declining the secret question skips the whole check sequence entirely', async ({
    page,
  }) => {
    await seedAndResume(page, {
      phase: 'all36',
      qIndex: 35,
      hasSecretQuestion: [false, false],
      secretAsked: [null, null],
    });
    await page.waitForTimeout(1800);
    await page.getByRole('button', { name: 'Weiter' }).click();

    // Straight to Question 37's dedicated "no secret questions" branch --
    // never a checkPass/check screen for either person.
    await expect(page.getByText('KEINE GEHEIMFRAGEN')).toBeVisible();
    await expect(page.getByText(/GIB DAS HANDY AN/i)).toHaveCount(0);
  });
});
