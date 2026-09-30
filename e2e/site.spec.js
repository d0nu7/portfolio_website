const { test, expect } = require('@playwright/test');

// A normal desktop Chrome UA for the redirect tests. Note that Playwright's
// device presets already send non-headless UAs, so the first-visit redirect
// is live in every test: pages are visited with a browser locale that
// matches their language unless a test is about the redirect itself.
const HUMAN_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36';

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

test('English footer labels', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Legal notice')).toBeVisible();
});

test.describe('German pages', () => {
  test.use({ locale: 'de-AT' });

  test('German footer labels', async ({ page }) => {
    await page.goto('/de/ki-schulungen/');
    await expect(page.getByText('Impressum')).toBeVisible();
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

test.describe('first-visit language redirect', () => {
  test.describe('German browser', () => {
    test.use({ locale: 'de-AT', userAgent: HUMAN_UA });

    test('is sent from the English page to the German one', async ({ page }) => {
      await page.goto('/ai-training/');
      await expect(page).toHaveURL(/\/de\/ki-schulungen\/$/);
    });

    test('a saved English choice wins and sticks across pages', async ({ page }) => {
      await page.goto('/de/');
      await page.getByRole('link', { name: 'EN', exact: true }).click();
      await expect(page).toHaveURL(/\/$/);
      await expect(page.locator('h1')).toHaveText('Games, AI & interactive systems.');
      await page.goto('/de/ki-schulungen/');
      await expect(page).toHaveURL(/\/ai-training\/$/);
    });
  });

  test.describe('other browser languages', () => {
    test.use({ locale: 'fr-FR', userAgent: HUMAN_UA });

    test('fall back to English', async ({ page }) => {
      await page.goto('/de/');
      await expect(page).toHaveURL(/\/$/);
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    });
  });

  test.describe('crawlers', () => {
    test.use({ locale: 'en-US', userAgent: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' });

    test('are never redirected', async ({ page }) => {
      await page.goto('/de/ki-schulungen/');
      await expect(page).toHaveURL(/\/de\/ki-schulungen\/$/);
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
