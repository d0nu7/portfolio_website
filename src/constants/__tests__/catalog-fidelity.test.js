import fs from 'fs';
import path from 'path';

import { LATE_NIGHT_PACK, PACKS } from '../closer';

const CATALOG_PATH = path.join(
  process.cwd(),
  'docs',
  'closer',
  'content',
  'question-catalog.de-en.md'
);

const HEADING_TO_PACK_ID = {
  CLASSIC: 'classic',
  'FIRST DATE': 'first-date',
  'DATE NIGHT': 'date-night',
  COUPLES: 'couples',
  FRIENDS: 'friends',
  'OLD FRIENDS': 'old-friends',
  DEEP: 'deep',
  CHAOS: 'chaos',
  'LATE NIGHT (18+)': 'late-night',
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
    const routeIsSecondColumn = /^(Q\/S\/F|S\/F|F)$/.test(cells[1]);
    const de = cells[routeIsSecondColumn ? 2 : 1];
    const en = cells[routeIsSecondColumn ? 3 : 2];
    byPack[currentPackId].push({ id: id.toLowerCase(), de, en });
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

describe('catalog fidelity', () => {
  const markdown = fs.readFileSync(CATALOG_PATH, 'utf8');
  const catalog = parseCatalogQuestions(markdown);
  const implementation = { ...PACKS, 'late-night': LATE_NIGHT_PACK };

  it('contains exactly the nine expected packs', () => {
    expect(Object.keys(catalog)).toEqual(Object.keys(implementation));
  });

  it.each(Object.keys(implementation))('%s has 36 exact DE/EN question pairs', (packId) => {
    const catalogQuestions = catalog[packId];
    const codeQuestions = questionsFromPack(implementation[packId]);

    expect(catalogQuestions).toHaveLength(36);
    expect(codeQuestions).toHaveLength(36);
    expect(codeQuestions).toEqual(catalogQuestions);
  });
});
