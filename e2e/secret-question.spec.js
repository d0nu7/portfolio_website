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

  test('resuming mid-handoff (e.g. after closing the tab) reopens on the same private screen', async ({
    page,
  }) => {
    await seedAndResume(page, {
      phase: 'secret2',
      pending: 27,
      qIndex: 26,
      secretReady: [true, false],
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
});
