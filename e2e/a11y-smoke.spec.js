const { test, expect } = require('./fixtures');

/*
 * Accessibility and keyboard smoke coverage (refactoring roadmap, phase 4).
 *
 * dialog-a11y.spec.js covers menu focus behavior in detail, while
 * ending.spec.js covers the ending screen's keyboard action. These tests
 * prove that the complete critical path, from Start to the first question,
 * is usable without a mouse. Seeded resume tests cannot prove that because
 * they deliberately bypass the interactions between screens.
 *
 * The tests intentionally avoid recreating a full Tab chain, which would
 * be brittle after layout changes. Each action instead uses a role-based
 * locator with `.press('Enter')` or `.press(' ')`, establishing real focus
 * and triggering the element's native keyboard behavior.
 */
test('the complete setup flow reaches the first question without a mouse', async ({ page }) => {
  await page.goto('/closer/');

  await page.getByRole('button', { name: 'Start' }).press('Enter');

  // PLAYERS: real labelled inputs that are reachable by keyboard.
  await page.getByLabel('Person 1 – Name (optional)').focus();
  await page.keyboard.type('Alex');
  await page.keyboard.press('Tab');
  await page.keyboard.type('Sam');
  await page.getByRole('button', { name: 'Weiter' }).press('Enter');

  // PACK: select a choice with Enter, not a pointer click.
  await page.getByRole('button', { name: /CLASSIC/i }).press('Enter');
  await page.getByRole('button', { name: 'Weiter' }).press('Enter');

  // DURATION
  await page.getByRole('button', { name: /VOLL/i }).press('Enter');
  await page.getByRole('button', { name: 'Weiter' }).press('Enter');

  // MODE: CLASSIC offers two style options.
  const modeButtons = page.getByRole('button', { name: /ORIGINAL|PLAYFUL/i });
  await modeButtons.first().press('Enter');
  await page.getByRole('button', { name: 'Weiter' }).press('Enter');

  // INTRO ("Los geht’s") -> ACT I INTRO ("Weiter")
  await page.getByRole('button', { name: 'Los geht’s' }).press('Enter');
  await page.getByRole('button', { name: 'Weiter' }).press('Enter');

  // The first real question is now on screen.
  await expect(page.getByText('Alex', { exact: false }).first()).toBeVisible();
});

/*
 * This focused sample checks that every visible button on the first
 * question screen has an accessible name. getByRole('button') only finds
 * elements exposed as buttons, but it still finds a button whose accessible
 * name is empty.
 */
test('every visible button on the first question has an accessible name', async ({ page }) => {
  await page.goto('/closer/');
  await page.getByRole('button', { name: 'Start' }).click();
  await page.getByRole('button', { name: 'Weiter' }).click();
  await page.getByRole('button', { name: /CLASSIC/i }).click();
  await page.getByRole('button', { name: 'Weiter' }).click();
  await page.getByRole('button', { name: /VOLL/i }).click();
  await page.getByRole('button', { name: 'Weiter' }).click();
  await page.getByRole('button', { name: /ORIGINAL|PLAYFUL/i }).first().click();
  await page.getByRole('button', { name: 'Weiter' }).click();
  await page.getByRole('button', { name: 'Los geht’s' }).click();
  await page.getByRole('button', { name: 'Weiter' }).click();

  const buttons = page.getByRole('button');
  const count = await buttons.count();
  expect(count).toBeGreaterThan(0);
  for (let i = 0; i < count; i += 1) {
    const btn = buttons.nth(i);
    if (!(await btn.isVisible())) continue;
    const name = await btn.evaluate((el) => el.getAttribute('aria-label') || el.textContent || '');
    expect(name.trim().length).toBeGreaterThan(0);
  }
});
