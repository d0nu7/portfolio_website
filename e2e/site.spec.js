const { test, expect } = require('@playwright/test');

// Pages are visited with a browser locale that matches their language, so
// the language hint stays hidden unless a test is about the hint itself.

// Collects console errors/warnings and uncaught exceptions for a page.
const watchConsole = (page) => {
  const problems = [];
  page.on('console', (m) => { if (['error', 'warning'].includes(m.type())) problems.push(m.text()); });
  page.on('pageerror', (e) => problems.push(e.message));
  return problems;
};

const jsonLdTypes = async (page) => {
  const raw = await page.locator('script[type="application/ld+json"]').textContent();
  return JSON.parse(raw)['@graph'].map((node) => node['@type']);
};

const hreflang = (page, lang) => page.locator(`link[rel="alternate"][hreflang="${lang}"]`);

const PAGES = [
  { path: '/', lang: 'en', h1: 'Games, AI & interactive systems.', other: '/de/', types: ['WebSite', 'Person'] },
  { path: '/de/', lang: 'de', h1: 'Games, KI & interaktive Systeme.', other: '/', types: ['WebSite', 'Person'] },
  { path: '/ai-training/', lang: 'en', h1: /Understand AI/, other: '/de/ki-schulungen/', types: ['Service', 'FAQPage'] },
  { path: '/de/ki-schulungen/', lang: 'de', h1: /KI verstehen/, other: '/ai-training/', types: ['Service', 'FAQPage'] },
];

for (const p of PAGES) {
  test.describe(p.path, () => {
    test.use({ locale: p.lang === 'de' ? 'de-AT' : 'en-US' });

    test('renders its language with one h1, SEO tags and a clean console', async ({ page }) => {
      const problems = watchConsole(page);
      await page.goto(p.path);
      await expect(page.locator('html')).toHaveAttribute('lang', p.lang);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('h1')).toHaveText(p.h1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://radi.solutions${p.path}`);
      const [en, de] = p.lang === 'en' ? [p.path, p.other] : [p.other, p.path];
      await expect(hreflang(page, 'en')).toHaveAttribute('href', `https://radi.solutions${en}`);
      await expect(hreflang(page, 'de')).toHaveAttribute('href', `https://radi.solutions${de}`);
      await expect(hreflang(page, 'x-default')).toHaveAttribute('href', `https://radi.solutions${en}`);
      expect(await jsonLdTypes(page)).toEqual(expect.arrayContaining(p.types));
      expect(problems).toEqual([]);
    });

    test('the language switch links to the other version', async ({ page }) => {
      await page.goto(p.path);
      const target = p.lang === 'en' ? 'DE' : 'EN';
      await expect(page.getByRole('link', { name: target, exact: true })).toHaveAttribute('href', p.other);
    });
  });
}

test('English footer links to the legal pages', async ({ page }) => {
  await page.goto('/');
  const footer = page.locator('footer, section').filter({ hasText: 'Legal notice' }).last();
  await expect(footer.getByRole('link', { name: 'Legal notice' })).toHaveAttribute('href', '/legal-notice/');
  await expect(footer.getByRole('link', { name: 'Privacy' })).toHaveAttribute('href', '/privacy/');
});

const LEGAL = [
  { path: '/legal-notice/', lang: 'en', h1: 'Legal notice', other: '/de/impressum/', locale: 'en-US' },
  { path: '/de/impressum/', lang: 'de', h1: 'Impressum', other: '/legal-notice/', locale: 'de-AT' },
  { path: '/privacy/', lang: 'en', h1: 'Privacy policy', other: '/de/datenschutz/', locale: 'en-US' },
  { path: '/de/datenschutz/', lang: 'de', h1: 'Datenschutzerklärung', other: '/privacy/', locale: 'de-AT' },
];

for (const p of LEGAL) {
  test.describe(p.path, () => {
    test.use({ locale: p.locale });

    test('renders in its language with hreflang and the right contact', async ({ page }) => {
      const problems = watchConsole(page);
      await page.goto(p.path);
      await expect(page.locator('html')).toHaveAttribute('lang', p.lang);
      await expect(page.locator('h1')).toHaveText(p.h1);
      const [en, de] = p.lang === 'en' ? [p.path, p.other] : [p.other, p.path];
      await expect(hreflang(page, 'en')).toHaveAttribute('href', `https://radi.solutions${en}`);
      await expect(hreflang(page, 'de')).toHaveAttribute('href', `https://radi.solutions${de}`);
      await expect(page.locator('main').getByRole('link', { name: 'contact@radi.solutions' })).toBeVisible();
      // Only the contact address is published: no phone number, no bank details.
      await expect(page.locator('main')).not.toContainText(/\+43|IBAN|AT16/);
      expect(problems).toEqual([]);
    });
  });
}

test.describe('German pages', () => {
  test.use({ locale: 'de-AT' });

  test('German footer links to the legal pages', async ({ page }) => {
    await page.goto('/de/ki-schulungen/');
    await expect(page.getByRole('link', { name: 'Impressum', exact: true })).toHaveAttribute('href', '/de/impressum/');
    await expect(page.getByRole('link', { name: 'Datenschutz', exact: true })).toHaveAttribute('href', '/de/datenschutz/');
  });

  test('fine print is excluded from search snippets', async ({ page }) => {
    await page.goto('/de/ki-schulungen/');
    await expect(page.locator('[data-nosnippet]')).toHaveCount(3);
  });
});

test('exposes the console easter egg', async ({ page }) => {
  await page.goto('/');
  const commands = await page.evaluate(() => Object.keys(window.radi || {}));
  expect(commands).toEqual(expect.arrayContaining(['help', 'hire', 'takeover', 'whoami']));
});

test.describe('language hint (no redirects)', () => {
  const hint = (page) => page.getByRole('complementary', { name: /Sprache|Language/ });

  test.describe('German browser', () => {
    test.use({ locale: 'de-AT' });

    test('keeps the English URL and offers German', async ({ page }) => {
      await page.goto('/ai-training/');
      await expect(page).toHaveURL(/\/ai-training\/$/);
      await expect(hint(page)).toContainText('auch auf Deutsch');
      await hint(page).getByRole('link', { name: 'Auf Deutsch lesen' }).click();
      await expect(page).toHaveURL(/\/de\/ki-schulungen\/$/);
      await expect(hint(page)).toHaveCount(0);
    });

    test('dismissing it sticks', async ({ page }) => {
      await page.goto('/');
      await hint(page).getByRole('button', { name: 'Hinweis schließen' }).click();
      await expect(hint(page)).toHaveCount(0);
      await page.goto('/ai-training/');
      await expect(page.locator('h1')).toBeVisible();
      await expect(hint(page)).toHaveCount(0);
    });

    test('a saved English choice never redirects a German URL', async ({ page }) => {
      await page.goto('/de/');
      await page.getByRole('link', { name: 'EN', exact: true }).click();
      await expect(page).toHaveURL(/\/$/);
      await page.goto('/de/ki-schulungen/');
      await expect(page).toHaveURL(/\/de\/ki-schulungen\/$/);
      await expect(hint(page)).toContainText('also available in English');
    });
  });

  test.describe('other browser languages', () => {
    test.use({ locale: 'fr-FR' });

    test('get no hint and no redirect', async ({ page }) => {
      await page.goto('/de/');
      await expect(page.locator('h1')).toHaveText('Games, KI & interaktive Systeme.');
      await expect(page).toHaveURL(/\/de\/$/);
      await expect(hint(page)).toHaveCount(0);
    });
  });
});

test.describe('/closer (moving notice)', () => {
  test('points to the new address, is not indexed and has a clean console', async ({ page }) => {
    const problems = watchConsole(page);
    await page.goto('/closer/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('CLOSER ist umgezogen.');
    await expect(page.getByRole('link', { name: 'Zu CLOSER' })).toHaveAttribute('href', 'https://closer.radi.solutions/');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'de');
    expect(problems).toEqual([]);
  });
});

test.describe('menu', () => {
  test('opens, closes with Escape and returns focus', async ({ page }) => {
    await page.goto('/');
    const toggle = page.getByRole('button', { name: 'Menu', exact: true });
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(page.getByRole('navigation', { name: 'Menu' })).toBeHidden();

    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    const nav = page.getByRole('navigation', { name: 'Menu' });
    await expect(nav).toBeVisible();
    await expect(nav.getByRole('link', { name: 'AI training' })).toHaveAttribute('href', '/ai-training/');

    await page.keyboard.press('Escape');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle).toBeFocused();
  });
});

test.describe('German menu', () => {
  test.use({ locale: 'de-AT' });

  test('German menu links stay on the German pages', async ({ page }) => {
    await page.goto('/de/');
    await page.getByRole('button', { name: 'Menü', exact: true }).click();
    const nav = page.getByRole('navigation', { name: 'Menü' });
    await expect(nav.getByRole('link', { name: 'KI-Schulungen' })).toHaveAttribute('href', '/de/ki-schulungen/');
    await nav.getByRole('link', { name: 'Ausgewählte Projekte' }).click();
    await expect(page).toHaveURL(/\/de\/#projects$/);
    await expect(page.getByRole('button', { name: 'Menü', exact: true })).toHaveAttribute('aria-expanded', 'false');
  });
});
