/*
 * radi.takeover(): a status report on the "AI takeover" with real numbers.
 * - AGI countdown: snapshot refreshed at build time (scripts/fetch-agi-countdown.mjs)
 * - day counters: computed live in the browser
 * - headlines: fetched live from the public Hacker News search API, only
 *   when someone runs the command (the page itself makes no such request)
 */
import agi from './generated/agiCountdown.json';

const DAY = 24 * 60 * 60 * 1000;
const daysBetween = (a, b) => Math.round((b - a) / DAY);

export const MILESTONES = {
  chatgpt: Date.UTC(2022, 10, 30),        // ChatGPT public launch
  aiLiteracy: Date.UTC(2025, 1, 2),       // Art. 4 EU AI Act applies
  highRisk: Date.UTC(2027, 11, 2),        // Annex III high-risk rules (after the 2026 Digital Omnibus)
};

export const agiCountdown = agi;

export const dayCounters = (now = Date.now()) => ({
  sinceChatGPT: daysBetween(MILESTONES.chatgpt, now),
  sinceAiLiteracy: daysBetween(MILESTONES.aiLiteracy, now),
  untilHighRisk: daysBetween(now, MILESTONES.highRisk),
});

// Top AI stories on Hacker News from the last 48 hours, by points.
export const fetchHeadlines = async (limit = 5) => {
  const since = Math.floor((Date.now() - 2 * DAY) / 1000);
  const url = `https://hn.algolia.com/api/v1/search?tags=story&query=AI&hitsPerPage=60&numericFilters=created_at_i>${since}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const { hits } = await res.json();
  // Algolia prefix-matches "AI" ("Airbus", "aiming"), so keep only real AI titles.
  const isAi = /\b(AI|AGI|LLMs?|GPT[-\w]*|OpenAI|Anthropic|Claude|Gemini|DeepMind|Mistral|Llama|machine learning|neural)\b/i;
  return hits
    .filter((h) => h.title && isAi.test(h.title))
    .sort((a, b) => (b.points || 0) - (a.points || 0))
    .slice(0, limit)
    .map((h) => ({
      title: h.title,
      points: h.points || 0,
      url: h.url || `https://news.ycombinator.com/item?id=${h.objectID}`,
    }));
};
