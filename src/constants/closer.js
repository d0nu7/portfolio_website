/*
 * CLOSER -- game data.
 *
 * The 36 questions are RaDi's list, in his wording, with an English rendering
 * alongside. Every user-visible string in this file is a { de, en } pair; the
 * interface strings live in closerCopy.js.
 *
 * Per the spec, a question carries at most ONE twist plus an independent
 * stayEnabled flag, and twists are deliberately sparse: five in Act I, three
 * in Act II, one in Act III (six in Act I originally -- see the content-
 * review note on the "how will you die" question below, which lost its
 * PREDICT twist without losing the question itself). The game is not
 * supposed to be more interesting than the conversation.
 *
 *   twist: 'predict'    -- the other person guesses the answer first
 *          'both'       -- the question appears, then a 3-2-1, then answer together
 *          'nothinking' -- the question appears, then a 5-4-3-2-1, then answer immediately
 *          'deeper'     -- afterwards, offers one follow-up of your own
 *   stayEnabled         -- afterwards, offers STAY instead of only NEXT
 *
 * ORIGINAL mode runs 'predict', 'deeper' and stayEnabled -- a restrained
 * enough twist that it still fits ORIGINAL's tone (spec feedback 11). 'both'
 * and 'nothinking' stay more playful and exclusive to the other style
 * (id `'datenight'`, displayed as PLAYFUL since the content review -- see
 * PACKS.classic.modes below for why only the label changed, not the id).
 *
 * --- Pack architecture (added ahead of further game packs) ----------------
 *
 * "Pack" (this file's PACKS registry) and "Style" (a pack's own `modes`,
 * formerly the top-level MODES) are two separate axes and were previously
 * conflated -- there was only ever one pack, so nobody had to say so.
 *   pack  = WHAT is being asked: the questions, their acts, their per-act
 *           look, the secret-question placement, the question-37 wording.
 *           E.g. classic, first-date, friends.
 *   style = HOW those questions play: which twists are active. This is the
 *           existing ORIGINAL/PLAYFUL distinction, now scoped inside a
 *           pack's `modes` rather than global, since a future pack may want
 *           its own style options rather than reusing ORIGINAL/PLAYFUL
 *           verbatim.
 * All of CLOSER's original content now lives under PACKS.classic unchanged
 * -- this refactor is additive, not a content change. New packs are added by
 * inserting another entry into PACKS.
 *
 * The current, single binding schema for any pack in PACKS (iteration 8
 * holistic review, BF8-06 -- consolidated here after two earlier passes on
 * this comment drifted out of sync with each other):
 *   - Every pack has exactly ACTS_PER_PACK (3) acts. No exceptions today;
 *     if a pack ever genuinely needs a different act count, that's the
 *     trigger to revisit ACTS_PER_PACK itself, not to special-case around
 *     it (regression-test iteration 5, P1.1/P1.3).
 *   - Each act may have 1 to QUESTIONS_PER_ACT (12) master questions --
 *     12 is a ceiling, not a mandate (iteration 7, Phase 3, per FR-01's
 *     "bis zu zwölf Fragen pro Akt" / "up to twelve questions per act").
 *     CLASSIC itself has exactly 12 per act, 36 total, unchanged; a newer
 *     pack (e.g. a FIRST DATE pilot) can have fewer.
 *   - A pack only offers the routes it actually has curated content for
 *     (e.g. DEEP intentionally has no `quick` route) -- see getRoute()'s
 *     fallback-to-first-defined-route behavior below. A route that IS
 *     offered must still satisfy both invariants above CLASSIC_ROUTES'
 *     own comment describes (ends on the real closing question; secret
 *     interrupt lands strictly inside its own bounds).
 *   - Every pack MUST define its own secret-question placement
 *     (`secretAtIndex`) and its own question-37 wording (`q37`) -- these
 *     are per-pack, never inherited or defaulted from CLASSIC.
 *   - `full` (every question, unrouted) is only required if the pack ships
 *     as a complete 36-question pack; a pack that's deliberately launched
 *     smaller (e.g. a quick-route-only pilot) is not required to define it
 *     -- see getRoute()'s fallback chain.
 * All of this is enforced by the registry-conformance tests in
 * closer.test.js, not just assumed -- a pack that doesn't fit isn't added
 * to PACKS.
 *
 * See questionAt/actIndexFor/totalQuestions/finalQuestionIndex below, all
 * of which take a packId as their first argument (kept pack-aware even
 * though every pack is the same shape, since packId is still how a pack's
 * own question wording/acts/style/secret index/Q37 copy differ), and
 * CloserGame.js's `packId` field in saved state (defaults to 'classic' for
 * any save written before this existed, and is canonicalized on load --
 * see loadSaved()).
 *
 * --- Time routes (bugfix/feature-request iteration 7, Phase 2, FR-01/
 * FR-02) --------------------------------------------------------------
 *
 * A pack's fixed 3x12 schema above is still exactly what its full content
 * looks like -- a route does not change that. What a route adds is a
 * second, optional axis: which curated subset of a pack's questions a
 * given playthrough actually uses, and how long that takes. Every pack
 * MUST define a `routes` map with at least a `full` entry (every question,
 * in original order -- the only route that existed before this, and still
 * the default for any save or call site that doesn't ask for another one).
 * `standard` and `quick` are hand-curated subsets, not an algorithmic
 * sample -- picking, say, "every third question" would flatten CLASSIC's
 * deliberate escalation instead of preserving it at a shorter length. Each
 * route's `actIndices` is an array with one entry per act: either `null`
 * (use every question in that act, unchanged -- what `full` does for all
 * three) or an array of local indices (0-based, into that act's own
 * `questions` array) listing exactly which ones to use and in what order.
 *
 * Two invariants every curated route (including any added for a future
 * pack) must keep, enforced by the registry-conformance tests in
 * closer.test.js:
 *   1. The last act's local index carrying `last: true` must be the LAST
 *      entry of that act's own actIndices -- the closing question has to
 *      stay the actual last question of the route, not just of the pack.
 *   2. secretAtIndexFor() (below) must land strictly inside the resolved
 *      route (not at or past its end) -- see that function's own comment
 *      for how a route-relative interrupt point is derived automatically
 *      from the pack's own absolute secretAtIndex, rather than needing to
 *      be hand-computed and kept in sync per route.
 *
 * resolvedActs()/totalQuestions()/finalQuestionIndex()/actIndexFor()/
 * questionAt()/actStartIndices() all take an optional trailing `routeId`
 * (defaulting to DEFAULT_ROUTE_ID, `'full'`) rather than reordering their
 * existing packId-first parameters -- every pre-Phase-2 call site (and
 * every pre-Phase-2 test) that only ever cared about the full 36 keeps
 * working completely unchanged.
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

// Shared by every iteration-8 pack's single style (FIRST DATE, DATE
// NIGHT, COUPLES, FRIENDS, OLD FRIENDS, DEEP, CHAOS, LATE NIGHT): no
// question in any of them carries a twist yet (see e.g. the block
// comment above FIRST_DATE_ACTS for why), so their one style has nothing
// to turn on, and its route-neutral blurb (matching CLASSIC ORIGINAL's
// own BF8-03 wording) is identical every time. Extracted here rather
// than repeated eight times so a future twist added to any one pack
// doesn't require also remembering to touch this boilerplate.

import { PACKS, LATE_NIGHT_PACK } from '../closer/content';

export { PACKS, LATE_NIGHT_PACK };

export const DEFAULT_PACK_ID = 'classic';
export const DEFAULT_ROUTE_ID = 'full';

export function getPack(packId) {
  return PACKS[packId] || PACKS[DEFAULT_PACK_ID];
}

// Falls back the same way getPack() does: an unrecognised or missing
// routeId (including every save written before routes existed) resolves
// to DEFAULT_ROUTE_ID -- the full, unshortened game, so nobody's
// in-progress or already-bookmarked game gets silently cut short by this
// existing. A pack that doesn't (yet) define DEFAULT_ROUTE_ID itself --
// e.g. a pilot pack with only a hand-curated `quick` set so far, iteration
// 7 Phase 3 -- falls back further, to whichever route it DOES define
// (Object.values() order == declaration order, so this is that pack's
// first/only route) rather than crashing on a route that doesn't exist for
// it. Every pack must still define at least one route -- see
// closer.test.js's registry-conformance coverage.
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
 * A pack's acts, filtered down to whichever route is active. For
 * DEFAULT_ROUTE_ID this reproduces the original, pre-Phase-2 acts exactly
 * (same questions, same order, same count) -- routes are additive, not a
 * replacement for the pack's own full content.
 */
export function resolvedActs(packId, routeId = DEFAULT_ROUTE_ID) {
  const pack = getPack(packId);
  const route = getRoute(packId, routeId);
  const timing = routeTimingFor(packId, routeId);
  return pack.acts.map((act, actNum) => {
    const questions = resolvedLocalIndices(act, route, actNum).map((li) => act.questions[li]);
    return { ...act, questions, subtitle: actSubtitle(questions.length, timing.actMinutes[actNum]) };
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
 * Maps a route-relative question index back to its absolute index in the
 * pack's full, unrouted question list -- e.g. so a future caller (the
 * voice branch, per its documented pack-namespaced contract) can still key
 * off the actual question asked (questionIdFor(packId, originalIndex))
 * rather than its position within whichever route happened to be playing.
 * Not yet called anywhere at runtime -- feat/closer-voice is untouched and
 * on hold -- but kept here rather than reinvented later, next to the
 * function that shares its logic.
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
 * Die stabile ID einer Frage -- z. B. 'classic-q01'.
 *
 * Seit Refactoringplan Phase 1 traegt jede Frage ihre ID explizit als
 * `id`-Feld. Vorher wurde sie aus der Position abgeleitet, was den
 * Resume-Schutz wirkungslos machte: wird eine Frage an derselben Position
 * ersetzt oder werden zwei Fragen getauscht, bleibt die abgeleitete
 * Sequenz identisch, und ein laufendes Spiel merkt die Aenderung nicht
 * (Code Review CR-P1-05).
 *
 * Der positionsbasierte Ausdruck bleibt als Fallback stehen, damit die
 * Funktion fuer einen Index ohne hinterlegte Frage (z. B. ein Aufruf mit
 * einem Index jenseits des Packs) weiterhin einen Wert liefert statt zu
 * werfen. Ein Pack mit fehlenden IDs faellt in der Registry-Konformitaet
 * durch, nicht erst hier.
 */
export function questionIdFor(packId, questionIndex) {
  const question = questionAt(packId, questionIndex, DEFAULT_ROUTE_ID);
  if (question?.id) return question.id;
  return `${packId}-q${String(questionIndex + 1).padStart(2, '0')}`;
}

/*
 * FR8-06 (iteration 8 feature requests): once several packs with several
 * routes are all in play, a later content edit (a question reordered,
 * removed, or moved to a different route) must never silently re-sort a
 * game someone already has open in a browser tab. The fix isn't a
 * separate version *number* comparison -- it's cheaper and more direct to
 * just snapshot the actual resolved run, once, when a game truly starts
 * (the same moment BF8-01's hasStarted flips true), and re-derive the
 * same list on every resume to compare against. If they no longer match,
 * the content underneath this save has changed since it was written, and
 * CloserGame.js's loadSaved() rejects the resume outright (the same
 * "reject the whole save rather than guess" precedent BF-12/BF8-01 already
 * established) instead of continuing on content that's shifted under it.
 * CONTENT_VERSION is still stored on the save alongside the resolved IDs,
 * per FR8-06's own spec -- useful metadata for a future migration screen,
 * even though the ID-array comparison is what actually gates resumability
 * today. Bump it only for a content change substantial enough to want to
 * invalidate saves outright (a question's meaning changed, a route was
 * recurated); a copy-only fix (spelling, a genderneutral reword) doesn't
 * need to -- the ID it's attached to hasn't changed.
 */
export const CONTENT_VERSION = 2;

export function runQuestionIdsFor(packId, routeId = DEFAULT_ROUTE_ID) {
  const total = totalQuestions(packId, routeId);
  return Array.from({ length: total }, (_, i) =>
    questionIdFor(packId, originalIndexFor(packId, i, routeId))
  );
}

/*
 * Der geordnete Run-Fingerprint (Refactoringplan Phase 1).
 *
 * Er verdichtet alles, was einen konkreten Lauf inhaltlich ausmacht, zu
 * einem kurzen Wert: Contentrevision, Pack, Route und die Reihenfolge der
 * aufgeloesten Frage-IDs. Gespeichert wird ab jetzt dieser eine String
 * statt der vollen ID-Liste.
 *
 * Warum das mehr traegt als die bisherige Listenpruefung:
 *   - Pack und Route stecken mit drin. Vorher wurden sie getrennt
 *     kanonisiert und die Liste separat verglichen; jetzt kann beides
 *     nicht mehr auseinanderlaufen.
 *   - CONTENT_VERSION steckt mit drin. Ein Versions-Bump aendert damit
 *     tatsaechlich den Fingerprint -- vorher war der Bump wirkungslos,
 *     genau der Befund aus CR-P1-05.
 *   - Die Reihenfolge ist signifikant: Zwei vertauschte Fragen ergeben
 *     einen anderen Wert, obwohl dieselbe Menge an IDs vorkommt.
 *
 * Was er bewusst NICHT einschliesst: den Fragentext. Eine reine
 * Tippfehlerkorrektur soll laufende Spiele nicht wegwerfen. Eine
 * Bedeutungsaenderung wird ueber eine neue ID oder einen Bump von
 * CONTENT_VERSION signalisiert -- das ist eine redaktionelle
 * Entscheidung, keine automatisch ableitbare.
 *
 * FNV-1a, 32 Bit: klein, ohne Abhaengigkeit, stabil ueber Sessions und
 * Plattformen. Kein Sicherheitsmerkmal -- es geht um versehentliche
 * Drift, nicht um Manipulationsschutz.
 */
export function runFingerprintFor(packId, routeId = DEFAULT_ROUTE_ID) {
  const payload = [
    CONTENT_VERSION,
    packId,
    routeId,
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
 * The agreed contract for pack-namespaced voice audio, so the voice branch
 * (feat/closer-voice, developed separately and not touched by this change)
 * has a fixed path convention to adopt once further packs exist. Before
 * this, audio was implicitly single-pack; new TTS generation should target
 * this layout going forward.
 */
export function voiceSrc(packId, lang, questionId) {
  return `/audio/closer/${packId}/${lang}/${questionId}.mp3`;
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

/*
 * Classifies the two answers from the private "did they ask your secret
 * "did you ask your saved question?" check (secretAsked =
 * [person0Answer, person1Answer], each
 * true/false/null) into the cases question 37 branches on:
 *  - neither: neither person asked their saved question -- each gets an explicit
 *    turn to ask it now (spec: double-NO sequential turns).
 *  - bothAsked: both were already asked, question 37 is a pure bonus.
 *  - pendingPlayer: exactly one is still unasked -- its owner asks it.
 *  - noneHaveSecretQuestion: neither person formed a secret question in the
 *    first place (bugfix-report iteration 7, BF-08/FR-07 -- "Heute keine"
 *    is an equally valid choice at the secret-question step, tracked
 *    separately in hasSecretQuestion). Distinct from `neither`: `neither`
 *    means two real questions exist and are still waiting; this means
 *    there is nothing to ask about, so Q37's "still waiting" copy would be
 *    false.
 * secretAsked defaults to [null, null] before either check completes.
 * hasSecretQuestion defaults to [null, null] before the secret-question
 * step; null there is treated the same as true (has one, not yet resolved)
 * so a save from before this option existed still classifies exactly as it
 * did before -- only an explicit `false` opts a person out of this
 * accounting.
 */
export function classifySecretAsked(secretAsked, hasSecretQuestion) {
  const [a0, a1] = secretAsked || [null, null];
  const [h0, h1] = hasSecretQuestion || [null, null];
  const noneHaveSecretQuestion = h0 === false && h1 === false;
  // A person who opted out has nothing pending -- treat their slot as
  // "resolved" so they never register as a still-waiting turn.
  const effective0 = h0 === false ? true : a0;
  const effective1 = h1 === false ? true : a1;
  const neither = !noneHaveSecretQuestion && effective0 === false && effective1 === false;
  const bothAsked = !noneHaveSecretQuestion && effective0 === true && effective1 === true;
  const pendingPlayer = effective0 === false ? 0 : effective1 === false ? 1 : null;
  return { neither, bothAsked, pendingPlayer, noneHaveSecretQuestion };
}
