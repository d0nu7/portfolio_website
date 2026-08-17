/*
 * Pure content-resolution helpers for CLOSER.
 *
 * A pack defines what is asked: its acts, questions, routes, visual style,
 * private-moment policy and Question 37 copy. A pack's modes define how those
 * questions play by enabling twists. Every pack currently has three acts,
 * with at most twelve master questions per act.
 *
 * Routes are editorially curated subsets. `actIndices` contains one entry per
 * act: `null` keeps every question, while an array selects local zero-based
 * indices in order. A resolved route must keep its private-moment interrupt
 * inside the route. The complete route must end on the pack's closing question.
 *
 * User-visible content uses { de, en } pairs. General interface copy lives in
 * closerCopy.js; pack content and the PACKS registry live under closer/content.
 */

export const ACTS_PER_PACK = 3;
export const QUESTIONS_PER_ACT = 12;

export const LANGS = ['de', 'en'];

export function pick(value, lang) {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value[lang] ?? value.en ?? '';
  }
  return value;
}

import { PACKS, LATE_NIGHT_PACK } from '../closer/content';
import { ACT_NUMERALS } from '../closer/content/shared';
import { classifySecretAsked } from '../closer/engine/transitions';

export { PACKS, LATE_NIGHT_PACK };
export { classifySecretAsked };

export const DEFAULT_PACK_ID = 'classic';
export const DEFAULT_ROUTE_ID = 'full';

export function getPack(packId) {
  return PACKS[packId] || PACKS[DEFAULT_PACK_ID];
}

// Prefer the requested route, then the default route, then the pack's first
// declared route. This keeps legacy saves compatible with smaller packs.
export function getRoute(packId, routeId) {
  const pack = getPack(packId);
  const requested = pack.routes && pack.routes[routeId];
  if (requested) return requested;
  return pack.routes[DEFAULT_ROUTE_ID] || Object.values(pack.routes)[0];
}

function actSubtitle(count, minutes) {
  return {
    de: `${count} Fragen · etwa ${minutes} Minuten`,
    en: `${count} question${count === 1 ? '' : 's'} · about ${minutes} minutes`,
  };
}

function resolvedLocalIndices(act, route, actNum) {
  return route.actIndices[actNum] || act.questions.map((_, i) => i);
}

// A route owns its editorial time promise. Allocate that exact total across
// its acts in proportion to their question counts, then distribute the
// remaining whole minutes from the first act onward. This keeps every visible
// act estimate and the overtime threshold aligned with the selected pack --
// including deliberately slower packs such as DEEP and faster ones like CHAOS.
export function routeTimingFor(packId, routeId = DEFAULT_ROUTE_ID) {
  const pack = getPack(packId);
  const route = getRoute(packId, routeId);
  const counts = pack.acts.map((act, actNum) => resolvedLocalIndices(act, route, actNum).length);
  const questionTotal = counts.reduce((sum, count) => sum + count, 0);
  const raw = counts.map((count) => (route.minutes * count) / questionTotal);
  const actMinutes = raw.map(Math.floor);
  let remainder = route.minutes - actMinutes.reduce((sum, minutes) => sum + minutes, 0);

  for (let actNum = 0; remainder > 0; actNum = (actNum + 1) % actMinutes.length) {
    actMinutes[actNum] += 1;
    remainder -= 1;
  }

  return { totalMinutes: route.minutes, actMinutes, totalQuestions: questionTotal };
}

export function routeSubtitleFor(packId, routeId = DEFAULT_ROUTE_ID) {
  const timing = routeTimingFor(packId, routeId);
  return {
    de: `${timing.totalQuestions} Fragen · ${ACTS_PER_PACK} Akte · etwa ${timing.totalMinutes} Minuten`,
    en: `${timing.totalQuestions} questions · ${ACTS_PER_PACK} acts · about ${timing.totalMinutes} minutes`,
  };
}

/*
 * A pack's acts filtered to the active route. The default full route preserves
 * the pack's original questions, order and count.
 */
export function resolvedActs(packId, routeId = DEFAULT_ROUTE_ID) {
  const pack = getPack(packId);
  const route = getRoute(packId, routeId);
  const timing = routeTimingFor(packId, routeId);
  return pack.acts.map((act, actNum) => {
    const questions = resolvedLocalIndices(act, route, actNum).map((li) => act.questions[li]);
    return {
      ...act,
      questions,
      subtitle: actSubtitle(questions.length, timing.actMinutes[actNum]),
      // Supply the shared numeral unless this pack defines its own.
      numeral: act.numeral ?? ACT_NUMERALS[actNum],
    };
  });
}

export function totalQuestions(packId, routeId = DEFAULT_ROUTE_ID) {
  return resolvedActs(packId, routeId).reduce((n, a) => n + a.questions.length, 0);
}

export function finalQuestionIndex(packId, routeId = DEFAULT_ROUTE_ID) {
  return totalQuestions(packId, routeId) - 1;
}

// The resolved question index each act starts at -- e.g. [0, 8, 16] for a
// route with 8 questions per act. Route-length-agnostic on purpose (unlike
// the old bare `% QUESTIONS_PER_ACT`), so CloserGame.js's act-break check
// works the same way whether every act is the pack's full 12 or a route's
// own, possibly uneven, curated count.
export function actStartIndices(packId, routeId = DEFAULT_ROUTE_ID) {
  const acts = resolvedActs(packId, routeId);
  let n = 0;
  return acts.map((a) => {
    const start = n;
    n += a.questions.length;
    return start;
  });
}

export function actIndexFor(packId, questionIndex, routeId = DEFAULT_ROUTE_ID) {
  const acts = resolvedActs(packId, routeId);
  let n = 0;
  for (let i = 0; i < acts.length; i += 1) {
    n += acts[i].questions.length;
    if (questionIndex < n) return i;
  }
  return acts.length - 1;
}

export function questionAt(packId, questionIndex, routeId = DEFAULT_ROUTE_ID) {
  const acts = resolvedActs(packId, routeId);
  let n = questionIndex;
  for (let i = 0; i < acts.length; i += 1) {
    if (n < acts[i].questions.length) return acts[i].questions[n];
    n -= acts[i].questions.length;
  }
  return null;
}

// Flat, route-relative-index -> original-pack-absolute-index mapping.
// Shared by originalIndexFor() and secretAtIndexFor() below; kept private
// since both of those already say everything a caller needs.
function flattenOriginalIndices(pack, route) {
  const result = [];
  let actStart = 0;
  pack.acts.forEach((act, actNum) => {
    resolvedLocalIndices(act, route, actNum).forEach((li) => result.push(actStart + li));
    actStart += act.questions.length;
  });
  return result;
}

/*
 * Maps a route-relative question index to its absolute index in the pack's
 * full question list. Stable content and voice IDs use the absolute position.
 */
export function originalIndexFor(packId, questionIndex, routeId = DEFAULT_ROUTE_ID) {
  const pack = getPack(packId);
  const route = getRoute(packId, routeId);
  const flat = flattenOriginalIndices(pack, route);
  return flat[questionIndex] ?? null;
}

/*
 * The route-relative point at which the secret question interrupts,
 * derived automatically from the pack's own absolute secretAtIndex rather
 * than hand-computed per route (and so kept correct even if a route's
 * curated selection ever changes): it's the resolved position of the
 * first question, in route order, whose original absolute index is at or
 * past the pack's secretAtIndex. For DEFAULT_ROUTE_ID this always equals
 * the pack's own secretAtIndex unchanged (every original index is present,
 * in order). If a route's curation ever failed to include anything at or
 * past that threshold (not true of any route defined above), this falls
 * back to the route's own length -- registry-conformance tests assert
 * that never actually happens.
 */
export function secretAtIndexFor(packId, routeId = DEFAULT_ROUTE_ID) {
  const pack = getPack(packId);
  const route = getRoute(packId, routeId);
  const flat = flattenOriginalIndices(pack, route);
  const pos = flat.findIndex((absoluteIndex) => absoluteIndex >= pack.secretAtIndex);
  return pos === -1 ? flat.length : pos;
}

/*
 * Returns the question's stable content ID. The positional fallback keeps
 * out-of-range callers deterministic; registry tests reject missing real IDs.
 */
export function questionIdFor(packId, questionIndex) {
  const question = questionAt(packId, questionIndex, DEFAULT_ROUTE_ID);
  if (question?.id) return question.id;
  return `${packId}-q${String(questionIndex + 1).padStart(2, '0')}`;
}

/*
 * Bump CONTENT_VERSION when a meaning or route curation change should
 * invalidate active saves. Copy-only corrections keep their existing ID and
 * version. The resolved ID list lets the save parser detect content drift.
 */
export const CONTENT_VERSION = 4;

export function runQuestionIdsFor(packId, routeId = DEFAULT_ROUTE_ID) {
  const total = totalQuestions(packId, routeId);
  return Array.from({ length: total }, (_, i) =>
    questionIdFor(packId, originalIndexFor(packId, i, routeId))
  );
}

/*
 * Hashes content revision, pack, route, style and ordered question IDs into a
 * stable run fingerprint. Question text is intentionally excluded so copy
 * fixes do not invalidate saves. FNV-1a is used for compact deterministic
 * drift detection, not as a security mechanism.
 *
 * modeId (BUG-007) is included because it is behavior-defining: it turns
 * twists on and off, so a resumed run under a different style would silently
 * play by different rules even though pack/route/questions still match. An
 * omitted or invalid modeId resolves to the pack's first style, matching
 * compileRun()'s own resolution, so callers that do not track style yet
 * (or pass an unrecognised one) still get a stable, well-defined fingerprint.
 */
export function runFingerprintFor(packId, routeId = DEFAULT_ROUTE_ID, modeId) {
  const pack = getPack(packId);
  const resolvedModeId = pack.modes.some((m) => m.id === modeId) ? modeId : pack.modes[0].id;
  const payload = [
    CONTENT_VERSION,
    packId,
    routeId,
    resolvedModeId,
    runQuestionIdsFor(packId, routeId).join(','),
  ].join('|');

  let hash = 0x811c9dc5;
  for (let i = 0; i < payload.length; i += 1) {
    hash ^= payload.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return `r${CONTENT_VERSION}-${hash.toString(36)}`;
}

/*
 * Pack-namespaced path contract for generated voice audio.
 */
export function voiceSrc(packId, lang, questionId) {
  return `/audio/closer/${packId}/${lang}/${questionId}.mp3`;
}

/*
 * Compiles pack, route and style into the immutable RunDefinition targeted by
 * the engine architecture. CloserGame can adopt this pure API incrementally.
 * Question content stays intact, while sourceIndex points to its position in
 * the full pack for stable persistence and content identity.
 */
export function compileRun(packId, routeId = DEFAULT_ROUTE_ID, modeId) {
  const pack = getPack(packId);
  const route = getRoute(packId, routeId);
  const acts = resolvedActs(pack.id, route.id);
  const actStarts = actStartIndices(pack.id, route.id);
  const timing = routeTimingFor(pack.id, route.id);
  const resolvedModeId = pack.modes.some((m) => m.id === modeId) ? modeId : pack.modes[0].id;

  const questions = [];
  acts.forEach((act, actIndex) => {
    act.questions.forEach((q, localIndex) => {
      const routeRelativeIndex = actStarts[actIndex] + localIndex;
      questions.push(Object.freeze({
        id: q.id,
        actIndex,
        sourceIndex: originalIndexFor(pack.id, routeRelativeIndex, route.id),
        content: q,
      }));
    });
  });

  return Object.freeze({
    packId: pack.id,
    routeId: route.id,
    modeId: resolvedModeId,
    hasStyleChoice: pack.modes.length > 1,
    requiresConsent: Boolean(pack.consentGate),
    questions: Object.freeze(questions),
    acts: Object.freeze(acts),
    actStarts: Object.freeze(actStarts),
    timing: Object.freeze(timing),
    secretAtIndex: secretAtIndexFor(pack.id, route.id),
    privateMoment: pack.privateMoment ?? null,
    contentRevision: CONTENT_VERSION,
    fingerprint: runFingerprintFor(pack.id, route.id, resolvedModeId),
  });
}

/*
 * Strict alternation: the same person never opens two questions running.
 * starterOffset is the one coin flip (made once, at player setup) that
 * decides who goes first overall; every question after that just walks the
 * parity forward. Question 37, which has no qIndex of its own, reuses this
 * with qIndex = totalQuestions(packId) to continue the same sequence rather
 * than flipping a fresh coin.
 */
export function starterFor(questionIndex, starterOffset) {
  return (questionIndex + starterOffset) % 2;
}
