const { test, expect } = require('./fixtures');
const { seedAndResume } = require('./helpers');

test.describe('Classic Full Question 37', () => {
  test('two pending questions produce explicit A and B turns with an exit between them', async ({
    page,
  }) => {
    await seedAndResume(page, {
      phase: 'q37intro',
      privateMomentStatus: 'armed',
      privateQuestionState: ['pending', 'pending'],
    });
    await expect(page.getByText('NOCH EINE?')).toBeVisible();
    await expect(page.getByText(/Zwei vorgemerkte Fragen sind noch offen/)).toBeVisible();

    await page.getByRole('button', { name: 'FRAGE 37' }).click();
    await expect(page.getByText(/Alex, du darfst deine vorgemerkte Frage stellen/)).toBeVisible();
    await expect(page.getByRole('button', { name: 'Hier enden' })).toBeVisible();
    await page.getByRole('button', { name: 'Weiter zu Sam' }).click();

    await expect(page.getByText(/Sam, du darfst deine vorgemerkte Frage stellen/)).toBeVisible();
    await page.getByRole('button', { name: 'Fertig' }).click();
    await expect(page.getByText(/Das war.s\./)).toBeVisible();
  });

  test('one pending question names its owner and remains optional', async ({ page }) => {
    await seedAndResume(page, {
      phase: 'q37intro',
      privateMomentStatus: 'armed',
      privateQuestionState: ['pending', 'asked'],
    });
    await expect(page.getByText('EINE FRAGE FEHLT NOCH')).toBeVisible();
    await expect(page.getByText(/Alex darf sie Sam stellen/)).toBeVisible();

    await page.getByRole('button', { name: 'Weiter' }).click();
    await expect(page.getByText(/Alex, du darfst deine vorgemerkte Frage stellen/)).toBeVisible();
    await page.getByRole('button', { name: 'Fertig' }).click();
    await expect(page.getByText(/Das war.s\./)).toBeVisible();
  });

  test('no pending question offers only the approved optional shared bonus', async ({ page }) => {
    await seedAndResume(page, {
      phase: 'q37intro',
      privateMomentStatus: 'armed',
      privateQuestionState: ['asked', 'discarded'],
    });
    await expect(page.getByText('KEINE GEHEIMFRAGEN')).toBeVisible();
    await expect(page.getByText(/Keine vorgemerkte Frage ist mehr offen/)).toBeVisible();

    await page.getByRole('button', { name: 'Weiter' }).click();
    await expect(page.getByText(/Welche Frage hätte dieses Gespräch gut abgerundet/)).toBeVisible();
    await page.getByRole('button', { name: 'Fertig' }).click();
    await expect(page.getByText(/Das war.s\./)).toBeVisible();
  });

  test('the intro can end without opening any saved question', async ({ page }) => {
    await seedAndResume(page, {
      phase: 'q37intro',
      privateMomentStatus: 'armed',
      privateQuestionState: ['pending', 'pending'],
    });
    await page.getByRole('button', { name: 'Hier enden' }).click();
    await expect(page.getByText(/Das war.s\./)).toBeVisible();
  });
});
