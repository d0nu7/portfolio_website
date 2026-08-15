const { test, expect } = require('@playwright/test');
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
    await expect(page.getByText('stellt die Geheimfrage')).toBeVisible();
    await page.getByRole('button', { name: 'Weiter' }).click();

    await expect(page.getByText('stellt die Geheimfrage')).toBeVisible();
    await page.getByRole('button', { name: 'Fertig' }).click();

    await expect(page.getByText(/Das war.s\./)).toBeVisible();
  });

  test('exactly one pending -> single name-free shared prompt', async ({ page }) => {
    await seedAndResume(page, { phase: 'q37intro', secretAsked: [false, true] });
    await expect(page.getByText('EINE FRAGE FEHLT NOCH')).toBeVisible();
    await expect(page.getByText('Eine deiner Fragen wurde gestellt.')).toBeVisible();

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
});
