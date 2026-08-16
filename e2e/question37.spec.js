const { test, expect } = require('./fixtures');
const { seedAndResume } = require('./helpers');

/*
 * Question 37 branches on classifySecretAsked(secretAsked) -- see
 * src/constants/__tests__/closer.test.js for the unit-level truth table.
 * These four cover the same combinations end-to-end, through the actual
 * screens a player sees, ending at the real closing sequence each time.
 */
test.describe('Question 37', () => {
  test('neither asked -> two explicit sequential turns', async ({ page }) => {
    await seedAndResume(page, { phase: 'q37intro', secretAsked: [false, false] });
    await expect(page.getByText('NOCH EINE?')).toBeVisible();

    await page.getByRole('button', { name: 'FRAGE 37' }).click();
    await expect(page.getByText('stellt die vorgemerkte Frage')).toBeVisible();
    await page.getByRole('button', { name: 'Weiter' }).click();

    await expect(page.getByText('stellt die vorgemerkte Frage')).toBeVisible();
    await page.getByRole('button', { name: 'Fertig' }).click();

    await expect(page.getByText(/Das war.s\./)).toBeVisible();
  });

  test('exactly one pending -> single name-free shared prompt', async ({ page }) => {
    await seedAndResume(page, { phase: 'q37intro', secretAsked: [false, true] });
    await expect(page.getByText('EINE FRAGE FEHLT NOCH')).toBeVisible();
    await expect(page.getByText('Eine vorgemerkte Frage wartet noch.')).toBeVisible();

    await page.getByRole('button', { name: 'Weiter' }).click();
    await expect(page.getByText('FRAGE 37')).toBeVisible();
    await page.getByRole('button', { name: 'Fertig' }).click();

    await expect(page.getByText(/Das war.s\./)).toBeVisible();
  });

  test('both already asked -> optional bonus question', async ({ page }) => {
    await seedAndResume(page, { phase: 'q37intro', secretAsked: [true, true] });
    await expect(page.getByText('IHR HABT SIE SCHON GESTELLT.')).toBeVisible();

    await page.getByRole('button', { name: 'Ja' }).click();
    await expect(page.getByText('FRAGE 37')).toBeVisible();
    await page.getByRole('button', { name: 'Fertig' }).click();

    await expect(page.getByText(/Das war.s\./)).toBeVisible();
  });

  test('both already asked -> can end directly instead', async ({ page }) => {
    await seedAndResume(page, { phase: 'q37intro', secretAsked: [true, true] });
    await expect(page.getByText('IHR HABT SIE SCHON GESTELLT.')).toBeVisible();

    await page.getByRole('button', { name: 'Ende' }).click();
    await expect(page.getByText(/Das war.s\./)).toBeVisible();
  });

  /*
   * Iteration-6 content review, P1: a self-chosen secret question can be
   * more intimate than anything scripted in the game, so every q37intro
   * branch -- not just "both already asked" -- needs its own end option,
   * not only a "continue" path.
   */
  test('neither asked -> can end directly instead, without ever entering q37a/q37b', async ({ page }) => {
    await seedAndResume(page, { phase: 'q37intro', secretAsked: [false, false] });
    await expect(page.getByText('NOCH EINE?')).toBeVisible();

    await page.getByRole('button', { name: 'Ende' }).click();
    await expect(page.getByText(/Das war.s\./)).toBeVisible();
  });

  test('exactly one pending -> can end directly instead, without being asked', async ({ page }) => {
    await seedAndResume(page, { phase: 'q37intro', secretAsked: [false, true] });
    await expect(page.getByText('EINE FRAGE FEHLT NOCH')).toBeVisible();

    await page.getByRole('button', { name: 'Ende' }).click();
    await expect(page.getByText(/Das war.s\./)).toBeVisible();
  });

  /*
   * Bugfix-report iteration 7, BF-09: consent can change between the two
   * people's secret-question turns -- q37a used to only offer "continue"
   * into q37b, with no way to stop in between.
   */
  test('neither asked -> can end after the first person\'s turn, before the second', async ({
    page,
  }) => {
    await seedAndResume(page, { phase: 'q37intro', secretAsked: [false, false] });
    await page.getByRole('button', { name: 'FRAGE 37' }).click();
    await expect(page.getByText('stellt die vorgemerkte Frage')).toBeVisible();

    await page.getByRole('button', { name: 'Ende' }).click();
    await expect(page.getByText(/Das war.s\./)).toBeVisible();
  });

  /*
   * Bugfix-report iteration 7, BF-08/FR-07: when neither person formed a
   * secret question ("Heute keine" for both), the "still waiting" copy
   * would misdescribe what happened -- this is its own dedicated branch,
   * offering the ordinary shared bonus prompt instead.
   */
  test('neither has a secret question at all -> dedicated copy, optional bonus prompt', async ({
    page,
  }) => {
    await seedAndResume(page, {
      phase: 'q37intro',
      hasSecretQuestion: [false, false],
      secretAsked: [null, null],
    });
    await expect(page.getByText('KEINE GEHEIMFRAGEN')).toBeVisible();

    await page.getByRole('button', { name: 'Ja' }).click();
    await expect(page.getByText('FRAGE 37')).toBeVisible();
    await page.getByRole('button', { name: 'Fertig' }).click();
    await expect(page.getByText(/Das war.s\./)).toBeVisible();
  });
});
