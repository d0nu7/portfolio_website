/*
 * The pack registry. Pack content lives in packs/<id>.js; this module only
 * defines which packs the engine can resolve. Selector visibility is a UI
 * concern, so discreet packs remain registered for saved-game recovery.
 */

import {
  CLASSIC_ACTS,
  CLASSIC_MODES,
  CLASSIC_ACT_STYLE,
  CLASSIC_Q37,
  CLASSIC_SECRET_AT_INDEX,
  CLASSIC_ROUTES,
} from './packs/classic';
import {
  FIRST_DATE_ACTS,
  FIRST_DATE_MODES,
  FIRST_DATE_ACT_STYLE,
  FIRST_DATE_Q37,
  FIRST_DATE_SECRET_AT_INDEX,
  FIRST_DATE_ROUTES,
} from './packs/first-date';
import {
  DATE_NIGHT_ACTS,
  DATE_NIGHT_MODES,
  DATE_NIGHT_ACT_STYLE,
  DATE_NIGHT_Q37,
  DATE_NIGHT_SECRET_AT_INDEX,
  DATE_NIGHT_ROUTES,
} from './packs/date-night';
import {
  COUPLES_ACTS,
  COUPLES_MODES,
  COUPLES_ACT_STYLE,
  COUPLES_Q37,
  COUPLES_SECRET_AT_INDEX,
  COUPLES_ROUTES,
} from './packs/couples';
import {
  FRIENDS_ACTS,
  FRIENDS_MODES,
  FRIENDS_ACT_STYLE,
  FRIENDS_Q37,
  FRIENDS_SECRET_AT_INDEX,
  FRIENDS_ROUTES,
} from './packs/friends';
import {
  OLD_FRIENDS_ACTS,
  OLD_FRIENDS_MODES,
  OLD_FRIENDS_ACT_STYLE,
  OLD_FRIENDS_Q37,
  OLD_FRIENDS_SECRET_AT_INDEX,
  OLD_FRIENDS_ROUTES,
} from './packs/old-friends';
import {
  DEEP_ACTS,
  DEEP_MODES,
  DEEP_ACT_STYLE,
  DEEP_Q37,
  DEEP_SECRET_AT_INDEX,
  DEEP_ROUTES,
} from './packs/deep';
import {
  CHAOS_ACTS,
  CHAOS_MODES,
  CHAOS_ACT_STYLE,
  CHAOS_Q37,
  CHAOS_SECRET_AT_INDEX,
  CHAOS_ROUTES,
} from './packs/chaos';
import { LATE_NIGHT_PACK } from './packs/late-night';
import { POWER_BY_CHOICE_PACK } from './packs/power-by-choice';
import { SLOW_BURN_PACK } from './packs/slow-burn';
import { ROAD_TRIP_PACK, FAMILY_PACK, COLLEAGUES_PACK } from './packs/specialist';
import { OFF_SCRIPT_PACK } from './packs/off-script';
import { YOUTH_WORKSHOP_PACK } from './packs/youth-workshop';
import { STUDENTS_PACK, FH_SALZBURG_PACK } from './packs/students';
import {
  CLASSIC_PRIVATE_MOMENT,
  FIRST_DATE_PRIVATE_MOMENT,
  DATE_NIGHT_PRIVATE_MOMENT,
  COUPLES_PRIVATE_MOMENT,
  FRIENDS_PRIVATE_MOMENT,
  OLD_FRIENDS_PRIVATE_MOMENT,
  DEEP_PRIVATE_MOMENT,
  CHAOS_PRIVATE_MOMENT,
} from './privateMoments';

export const PACKS = {
  classic: {
    id: 'classic',
    title: { de: 'CLASSIC', en: 'CLASSIC' },
    meta: { de: 'Die 36 Fragen', en: 'The 36 questions' },
    blurb: {
      de: 'Die vollständige Route folgt eng einer Forschungsaufgabe zu unmittelbarer zwischenmenschlicher Nähe. Kürzere Routen sind CLOSER-Auszüge.',
      en: 'The Full route closely follows a research task on immediate interpersonal closeness. Shorter routes are CLOSER extracts.',
    },
    positioning: {
      de: 'CLASSIC Full folgt eng der 36-Fragen-Abfolge aus Aron et al. (1997). In einer Laborstudie berichteten Teilnehmende nach der vollständigen, etwa 45-minütigen Aufgabe mehr unmittelbare Nähe als nach Small Talk. Quick, Standard, die deutsche Redaktion und alle App-Mechaniken sind CLOSER-Adaptionen. Liebe, Kompatibilität oder dauerhafte Wirkung wurden nicht gezeigt.',
      en: 'CLASSIC Full closely follows the 36-question sequence in Aron et al. (1997). In a laboratory study, participants reported greater immediate closeness after the complete, approximately 45-minute task than after small talk. Quick, Standard, the German editorial version, and all app mechanics are CLOSER adaptations. Love, compatibility, and lasting effects were not demonstrated.',
    },
    acts: CLASSIC_ACTS,
    modes: CLASSIC_MODES,
    actStyle: CLASSIC_ACT_STYLE,
    q37: CLASSIC_Q37,
    privateMoment: CLASSIC_PRIVATE_MOMENT,
    secretAtIndex: CLASSIC_SECRET_AT_INDEX,
    routes: CLASSIC_ROUTES,
    defaultRouteId: 'full',
    libraryGroup: 'core',
  },
  'first-date': {
    id: 'first-date',
    title: { de: 'FIRST DATE', en: 'FIRST DATE' },
    meta: { de: 'Für ein erstes Date', en: 'For a first date' },
    blurb: {
      de: 'Neugier und Chemie entdecken – leicht, druckfrei.',
      en: 'Explore curiosity and chemistry — light, no pressure.',
    },
    acts: FIRST_DATE_ACTS,
    modes: FIRST_DATE_MODES,
    actStyle: FIRST_DATE_ACT_STYLE,
    q37: FIRST_DATE_Q37,
    privateMoment: FIRST_DATE_PRIVATE_MOMENT,
    secretAtIndex: FIRST_DATE_SECRET_AT_INDEX,
    routes: FIRST_DATE_ROUTES,
    defaultRouteId: 'quick',
    libraryGroup: 'relationships',
  },
  'date-night': {
    id: 'date-night',
    title: { de: 'DATE NIGHT', en: 'DATE NIGHT' },
    meta: { de: 'Für ein bestehendes Date', en: 'For a date already underway' },
    blurb: {
      de: 'Wärme und Anziehung – prickelnd, nie explizit.',
      en: 'Warmth and attraction — a spark, never explicit.',
    },
    acts: DATE_NIGHT_ACTS,
    modes: DATE_NIGHT_MODES,
    actStyle: DATE_NIGHT_ACT_STYLE,
    q37: DATE_NIGHT_Q37,
    privateMoment: DATE_NIGHT_PRIVATE_MOMENT,
    secretAtIndex: DATE_NIGHT_SECRET_AT_INDEX,
    routes: DATE_NIGHT_ROUTES,
    defaultRouteId: 'standard',
    libraryGroup: 'relationships',
  },
  couples: {
    id: 'couples',
    title: { de: 'COUPLES', en: 'COUPLES' },
    meta: { de: 'Für eine bestehende Beziehung', en: 'For an existing relationship' },
    blurb: {
      de: 'Wertschätzung, Reparatur und eine gemeinsame Zukunft. Kein Therapieersatz.',
      en: 'Appreciation, repair and a shared future. Not a substitute for therapy.',
    },
    acts: COUPLES_ACTS,
    modes: COUPLES_MODES,
    actStyle: COUPLES_ACT_STYLE,
    q37: COUPLES_Q37,
    privateMoment: COUPLES_PRIVATE_MOMENT,
    secretAtIndex: COUPLES_SECRET_AT_INDEX,
    routes: COUPLES_ROUTES,
    defaultRouteId: 'quick',
    libraryGroup: 'relationships',
  },
  friends: {
    id: 'friends',
    title: { de: 'FRIENDS', en: 'FRIENDS' },
    meta: { de: 'Für Freundschaft', en: 'For friendship' },
    blurb: {
      de: 'Humor, Wertschätzung und Zukunft – ausdrücklich freundschaftlich.',
      en: 'Humor, appreciation and shared plans — explicitly platonic.',
    },
    acts: FRIENDS_ACTS,
    modes: FRIENDS_MODES,
    actStyle: FRIENDS_ACT_STYLE,
    q37: FRIENDS_Q37,
    privateMoment: FRIENDS_PRIVATE_MOMENT,
    secretAtIndex: FRIENDS_SECRET_AT_INDEX,
    routes: FRIENDS_ROUTES,
    defaultRouteId: 'standard',
    libraryGroup: 'core',
  },
  'old-friends': {
    id: 'old-friends',
    title: { de: 'OLD FRIENDS', en: 'OLD FRIENDS' },
    meta: { de: 'Für eine alte Freundschaft', en: 'For an old friendship' },
    blurb: {
      de: 'Gemeinsame Geschichte und die Person, die heute vor dir steht.',
      en: 'Shared history and the person standing in front of you today.',
    },
    acts: OLD_FRIENDS_ACTS,
    modes: OLD_FRIENDS_MODES,
    actStyle: OLD_FRIENDS_ACT_STYLE,
    q37: OLD_FRIENDS_Q37,
    privateMoment: OLD_FRIENDS_PRIVATE_MOMENT,
    secretAtIndex: OLD_FRIENDS_SECRET_AT_INDEX,
    routes: OLD_FRIENDS_ROUTES,
    defaultRouteId: 'standard',
    libraryGroup: 'core',
  },
  deep: {
    id: 'deep',
    title: { de: 'DEEP', en: 'DEEP' },
    meta: { de: 'Für ein intensives Gespräch', en: 'For an intensive conversation' },
    blurb: {
      de: 'Identität, Bedeutung und Verstandenwerden. Kein Ersatz für Therapie.',
      en: 'Identity, meaning and being understood. Not a substitute for therapy.',
    },
    acts: DEEP_ACTS,
    modes: DEEP_MODES,
    actStyle: DEEP_ACT_STYLE,
    q37: DEEP_Q37,
    privateMoment: DEEP_PRIVATE_MOMENT,
    secretAtIndex: DEEP_SECRET_AT_INDEX,
    routes: DEEP_ROUTES,
    defaultRouteId: 'standard',
    libraryGroup: 'core',
  },
  chaos: {
    id: 'chaos',
    title: { de: 'CHAOS', en: 'CHAOS' },
    meta: { de: 'Für jede Beziehung', en: 'For any relationship' },
    blurb: {
      de: 'Gemeinsames Erfinden und Lachen. Niemand wird bloßgestellt.',
      en: 'Inventing things together and laughing. Nobody gets put on the spot.',
    },
    acts: CHAOS_ACTS,
    modes: CHAOS_MODES,
    actStyle: CHAOS_ACT_STYLE,
    q37: CHAOS_Q37,
    privateMoment: CHAOS_PRIVATE_MOMENT,
    secretAtIndex: CHAOS_SECRET_AT_INDEX,
    routes: CHAOS_ROUTES,
    defaultRouteId: 'quick',
    libraryGroup: 'core',
  },
  'power-by-choice': POWER_BY_CHOICE_PACK,
  'slow-burn': SLOW_BURN_PACK,
  'late-night': LATE_NIGHT_PACK,
  'road-trip': ROAD_TRIP_PACK,
  family: FAMILY_PACK,
  colleagues: COLLEAGUES_PACK,
  'off-script': OFF_SCRIPT_PACK,
  'youth-workshop': YOUTH_WORKSHOP_PACK,
  students: STUDENTS_PACK,
  'fh-salzburg': FH_SALZBURG_PACK,
};

export const DEFAULT_VISIBLE_PACK_IDS = Object.freeze([
  'classic',
  'friends',
  'old-friends',
  'deep',
  'chaos',
]);

export function normalizeVisiblePackIds(ids = DEFAULT_VISIBLE_PACK_IDS) {
  const requested = new Set(Array.isArray(ids) ? ids : DEFAULT_VISIBLE_PACK_IDS);
  const normalized = Object.keys(PACKS).filter((id) => requested.has(id));
  return normalized.length ? normalized : [...DEFAULT_VISIBLE_PACK_IDS];
}

export function isPackVisible(preferences, packId) {
  return normalizeVisiblePackIds(preferences?.visiblePackIds).includes(packId);
}

export {
  LATE_NIGHT_PACK,
  POWER_BY_CHOICE_PACK,
  SLOW_BURN_PACK,
  OFF_SCRIPT_PACK,
  YOUTH_WORKSHOP_PACK,
  STUDENTS_PACK,
  FH_SALZBURG_PACK,
};
