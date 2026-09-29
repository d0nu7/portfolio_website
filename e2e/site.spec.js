const { test, expect } = require('@playwright/test');

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

test.describe('homepage', () => {
  test('renders one h1, the main sections and a clean console', async ({ page }) => {
    const problems = watchConsole(page);
    await page.goto('/');
    await expect(page.locator('h1')).toHaveCount(1);
    for (const id of ['about', 'projects']) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }
    await expect(page.locator('html')).toHaveAttribute('lang', /^en/);
    expect(problems).toEqual([]);
  });

  test('ships SEO metadata and structured data', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://radi.solutions/');
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /\/og\/home\.png$/);
    expect(await jsonLdTypes(page)).toEqual(expect.arrayContaining(['WebSite', 'Person']));
  });

  test('uses English labels in the shared footer', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Legal notice')).toBeVisible();
    await expect(page.getByText('Impressum')).toHaveCount(0);
  });

  test('exposes the console easter egg', async ({ page }) => {
    await page.goto('/');
    const commands = await page.evaluate(() => Object.keys(window.radi || {}));
    expect(commands).toEqual(expect.arrayContaining(['help', 'hire', 'takeover', 'whoami']));
  });
});

test.describe('/ki-schulungen', () => {
  // The page picks German or English from the browser language on first visit.
  test.use({ locale: 'de-AT' });

  test('starts in German with a clean console and Service/FAQ data', async ({ page }) => {
    const problems = watchConsole(page);
    await page.goto('/ki-schulungen/');
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('html')).toHaveAttribute('lang', 'de');
    await expect(page.getByText('Impressum')).toBeVisible();
    expect(await jsonLdTypes(page)).toEqual(expect.arrayContaining(['Service', 'FAQPage']));
    expect(problems).toEqual([]);
  });

  test('the DE/EN switch translates page and footer', async ({ page }) => {
    await page.goto('/ki-schulungen/');
    await page.getByRole('button', { name: 'EN', exact: true }).click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.getByText('Legal notice')).toBeVisible();
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

test.describe('language', () => {
  test.describe('German browser', () => {
    test.use({ locale: 'de-AT' });

    test('homepage switches to German and the choice carries over', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('h1')).toHaveText('Games, KI & interaktive Systeme.');
      await expect(page.locator('html')).toHaveAttribute('lang', 'de');
      await page.getByRole('button', { name: 'EN', exact: true }).click();
      await expect(page.locator('h1')).toHaveText('Games, AI & interactive systems.');
      await page.goto('/ki-schulungen/');
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Understand AI/);
    });
  });

  test.describe('neither German nor English', () => {
    test.use({ locale: 'fr-FR' });

    test('falls back to English on both pages', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('h1')).toHaveText('Games, AI & interactive systems.');
      await page.goto('/ki-schulungen/');
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    });
  });
});
