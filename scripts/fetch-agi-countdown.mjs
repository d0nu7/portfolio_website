// Pre-build step: refreshes Dr Alan D. Thompson's "conservative countdown to
// AGI" (lifearchitect.ai/agi) for the radi.takeover() console easter egg.
// The page has no API, so this reads the newest milestone from its HTML.
// Never breaks the build: on any failure the committed snapshot is kept.
import { readFile, writeFile } from 'node:fs/promises';

const FILE = new URL('../src/constants/generated/agiCountdown.json', import.meta.url);
const SOURCE = 'https://lifearchitect.ai/agi/';

const decode = (s) => s
  .replace(/<[^>]+>/g, '')
  .replace(/&#8217;|&rsquo;/g, "'")
  .replace(/&#8211;|&#8212;|&ndash;|&mdash;/g, '-')
  .replace(/&amp;/g, '&')
  .replace(/&quot;|&#8220;|&#8221;/g, '"')
  .replace(/&nbsp;/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const snapshot = JSON.parse(await readFile(FILE, 'utf8'));

try {
  const res = await fetch(SOURCE, { signal: AbortSignal.timeout(8000), headers: { 'user-agent': 'radi.solutions build (easter egg)' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const html = await res.text();
  // Milestones look like <strong><code>99%</code>: Title.</strong>
  const m = html.match(/<code>\s*(\d{1,3})\s*%\s*<\/code>\s*:?\s*([\s\S]{0,300}?)<\/(?:strong|b|p|td|li)>/i);
  if (!m) throw new Error('milestone pattern not found');
  const percent = Number(m[1]);
  const milestone = decode(m[2]).replace(/\.$/, '');
  if (!(percent >= 0 && percent <= 100) || !milestone) throw new Error(`implausible value ${percent} / "${milestone}"`);
  const next = { percent, milestone, asOf: new Date().toISOString().slice(0, 7), source: SOURCE };
  await writeFile(FILE, `${JSON.stringify(next, null, 2)}\n`);
  console.log(`agi countdown: ${percent}% (${milestone})`);
} catch (err) {
  console.warn(`agi countdown: kept snapshot ${snapshot.percent}% from ${snapshot.asOf} (${err.message})`);
}
