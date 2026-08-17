import { createHash } from 'crypto';
import fs from 'fs';
import path from 'path';

import { compileRun, LATE_NIGHT_PACK, PACKS } from '../closer';

const CATALOG_PATH = path.join(
  process.cwd(),
  'docs',
  'closer',
  'content',
  'question-catalog.de-en.md'
);

// CLASSIC mirrors the original published protocol and is intentionally locked.
// Any deliberate source correction requires an explicit editorial decision and
// a corresponding fingerprint update; adding or editing other packs must not
// change this value.
const CLASSIC_QUESTION_FINGERPRINT =
  'c13e623df86a8b56bff40a3d26283548563e0b9767958d399e4bf575ae3329a6';

const HEADING_TO_PACK_ID = {
  CLASSIC: 'classic',
  'FIRST DATE': 'first-date',
  'DATE NIGHT': 'date-night',
  COUPLES: 'couples',
  FRIENDS: 'friends',
  'OLD FRIENDS': 'old-friends',
  DEEP: 'deep',
  CHAOS: 'chaos',
  'POWER, BY CHOICE (18+)': 'power-by-choice',
  'SLOW BURN (18+)': 'slow-burn',
  'LATE NIGHT (18+)': 'late-night',
  'ROAD TRIP': 'road-trip',
  FAMILY: 'family',
  COLLEAGUES: 'colleagues',
};

function parseCatalogQuestions(markdown) {
  const byPack = {};
  let currentPackId = null;

  markdown.split(/\r?\n/).forEach((line) => {
    const heading = line.match(/^## \d+\. (.+)$/);
    if (heading) {
      currentPackId = HEADING_TO_PACK_ID[heading[1]] || null;
      if (currentPackId) byPack[currentPackId] = [];
      return;
    }

    if (!currentPackId || !/^\| Q\d{2} \|/.test(line)) return;
    const cells = line
      .split('|')
      .slice(1, -1)
      .map((cell) => cell.trim());
    const [id] = cells;
    const routeIsSecondColumn = /^(Q\/S\/F|Q\/F|S\/F|F|Q\/S|S|Reserve|Q\/S\/U|S\/U|U)$/.test(cells[1]);
    const de = cells[routeIsSecondColumn ? 2 : 1];
    const en = cells[routeIsSecondColumn ? 3 : 2];
    byPack[currentPackId].push({
      id: id.toLowerCase(),
      route: routeIsSecondColumn ? cells[1] : null,
      de,
      en,
    });
  });

  return byPack;
}

function questionsFromPack(pack) {
  return pack.acts.flatMap((act) => act.questions).map((question, index) => ({
    id: `q${String(index + 1).padStart(2, '0')}`,
    de: question.de,
    en: question.en,
  }));
}

function questionText(questions) {
  return questions.map(({ id, de, en }) => ({ id, de, en }));
}

describe('catalog fidelity', () => {
  const markdown = fs.readFileSync(CATALOG_PATH, 'utf8');
  const catalog = parseCatalogQuestions(markdown);
  const implementation = { ...PACKS, 'late-night': LATE_NIGHT_PACK };
  const implementedPackIds = Object.keys(implementation);

  it('contains every implemented pack exactly once', () => {
    expect(Object.keys(catalog)).toHaveLength(implementedPackIds.length);
    expect(new Set(Object.keys(catalog))).toEqual(new Set(implementedPackIds));
  });

  it('keeps the published CLASSIC question set immutable', () => {
    const fingerprint = createHash('sha256')
      .update(JSON.stringify(questionText(catalog.classic)))
      .digest('hex');

    expect(fingerprint).toBe(CLASSIC_QUESTION_FINGERPRINT);
  });

  it.each(implementedPackIds)('%s keeps every catalog question synchronized', (packId) => {
    const catalogQuestions = catalog[packId];
    const codeQuestions = questionsFromPack(implementation[packId]);

    expect(catalogQuestions).toHaveLength(codeQuestions.length);
    expect(codeQuestions).toEqual(questionText(catalogQuestions));
  });

  it('keeps the editorial route contracts explicit', () => {
    const routeCounts = (packId) =>
      catalog[packId].reduce((counts, { route }) => {
        counts[route] = (counts[route] || 0) + 1;
        return counts;
      }, {});

    expect(routeCounts('road-trip')).toEqual({ 'Q/S/F': 12, 'S/F': 12, F: 12 });
    expect(routeCounts('family')).toEqual({ 'Q/S/F': 12, 'S/F': 12, F: 12 });
    expect(routeCounts('colleagues')).toEqual({ 'Q/S': 12, S: 12, Reserve: 12 });
    expect(routeCounts('power-by-choice')).toEqual({ 'Q/S/F': 12, 'S/F': 12, F: 12 });
    expect(routeCounts('slow-burn')).toEqual({ 'Q/S/U': 9, 'S/U': 6, U: 6 });

    ['road-trip', 'family'].forEach((packId) => {
      for (let act = 0; act < 3; act += 1) {
        const actRoutes = catalog[packId]
          .slice(act * 12, act * 12 + 12)
          .map(({ route }) => route);
        expect(actRoutes.filter((route) => route === 'Q/S/F')).toHaveLength(4);
        expect(actRoutes.filter((route) => route === 'S/F')).toHaveLength(4);
        expect(actRoutes.filter((route) => route === 'F')).toHaveLength(4);
      }
    });

    for (let act = 0; act < 3; act += 1) {
      const actRoutes = catalog.colleagues
        .slice(act * 12, act * 12 + 12)
        .map(({ route }) => route);
      expect(actRoutes.filter((route) => route === 'Q/S')).toHaveLength(4);
      expect(actRoutes.filter((route) => route === 'S')).toHaveLength(4);
      expect(actRoutes.filter((route) => route === 'Reserve')).toHaveLength(4);
    }
  });

  it('keeps every tabular route marker synchronized with compiled runtime membership', () => {
    const routesForMarker = {
      'Q/S/F': ['quick', 'standard', 'full'],
      'Q/F': ['quick', 'full'],
      'S/F': ['standard', 'full'],
      F: ['full'],
      'Q/S': ['quick', 'standard'],
      S: ['standard'],
      Reserve: [],
      'Q/S/U': ['quick', 'standard', 'unhurried'],
      'S/U': ['standard', 'unhurried'],
      U: ['unhurried'],
    };

    implementedPackIds.forEach((packId) => {
      const markedQuestions = catalog[packId].filter(({ route }) => route !== null);
      if (!markedQuestions.length) return;

      const compiledIds = Object.fromEntries(
        Object.keys(implementation[packId].routes).map((routeId) => [
          routeId,
          new Set(compileRun(packId, routeId).questions.map(({ id }) => id)),
        ])
      );

      markedQuestions.forEach(({ id, route }) => {
        const expectedRoutes = new Set(routesForMarker[route]);
        Object.entries(compiledIds).forEach(([routeId, ids]) => {
          expect(ids.has(`${packId}-${id}`)).toBe(expectedRoutes.has(routeId));
        });
      });
    });
  });

  it('does not duplicate question copy across packs', () => {
    const normalize = (value) => value.trim().toLocaleLowerCase('de');
    const priorGerman = new Set();
    const priorEnglish = new Set();

    implementedPackIds.forEach((packId) => {
      catalog[packId].forEach(({ de, en }) => {
        expect(priorGerman.has(normalize(de))).toBe(false);
        expect(priorEnglish.has(normalize(en))).toBe(false);
        priorGerman.add(normalize(de));
        priorEnglish.add(normalize(en));
      });
    });
  });
});
