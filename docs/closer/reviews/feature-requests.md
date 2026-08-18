# CLOSER – feature requests

**Updated:** 18 August 2026
**Rule:** Delivered work is summarized here; Git history and regression tests preserve implementation detail. Open work retains enough specification to implement safely.

## Delivered features

| ID | Feature | Current contract | Remaining check |
|---|---|---|---|
| FR-001 | Discreet Late Night discovery | Adult packs are hidden in the collapsed 18+ library until enabled. Visibility is not consent. | Physical-device smoke test |
| FR-002 | In-app legal information | Bilingual Imprint and Privacy views are reachable throughout the app. | Revisit after material legal, business, or processing changes |
| FR-003 | Deployment security headers | Production headers are configured and verified. | Recheck when external origins or services are added |
| FR-004 | Milestone celebration | Shared milestones receive a non-scoring, non-blocking visual celebration; private handoffs remain quiet. | Mid-range device and reduced-motion check |
| FR-005 | Pack-specific Private Moments | Eligible Standard/Full routes use asymmetric pack-specific moments; Quick and adult/specialist exclusions are enforced. No answer text is stored. | Moderated and physical-device sessions |
| FR-011 | Run definition and transition core | `compileRun()`, pure persisted transitions, validated persistence, guarded storage, and focused views are in production. | None; device checks are release validation |
| FR-013 | Configurable pack library | Pack visibility is a versioned preference; at least one pack remains visible and resumable hidden-pack runs remain valid. | Physical-device check |
| FR-014 | Road Trip, Family, and Colleagues | Three bilingual specialist packs ship with curated routes, direct finales, and no Private Moments. | Moderated sessions and timing calibration |
| FR-017 | Extensible 18+ library | Adult packs are metadata-grouped, collapsed, hidden by default, and independently enabled. | Reassess for every future adult pack |
| FR-018 | POWER, BY CHOICE | A 36-question conversation-only adult pack ships without assigned roles or physical tasks. | Named external reviews before broad promotion |
| FR-019 | SLOW BURN | A 21-card touch-forward adult guide ships in the ordinary low-attention prompt flow. | Named external reviews and moderated sessions |
| FR-020 | Cross-pack evidence audit | All approved bilingual content changes are synchronized; Classic remains immutable. | External validation remains separate from implementation |
| FR-021 | OFF SCRIPT | A bilingual 24-card cooperative activity bank ships with Quick/Standard routes, environmental alternatives, no sensors, no contact assumption, and no Private Moment. | Physical, quiet, public, and varied-access sessions |
| FR-022 | Neutral first-run library | Fresh/reset preferences show Classic, Friends, Old Friends, Deep, and Chaos; the grouped library exposes all optional packs while version-2 choices migrate unchanged. | First-impression testing |
| FR-023 | Youth Workshop (14–17) | A bilingual 24-question peer pack ships with Icebreaker/Workshop routes, no Private Moment or twists, and no resumable personal run. | Safeguarding, educator, bilingual, accessibility, and moderated review before broad promotion |

The exact Private Moment matrix and adult-pack boundaries live in the [gameplay and safety contract](../product/gameplay-and-safety.md). Exact questions and routes live in the [bilingual catalog](../content/question-catalog.de-en.md).

## Active product work

### FR-006 – Curated replacement-question joker

**Status:** Planned; blocked by approved bilingual replacement pools

Add an optional **Another question** action without changing the unlimited free Pass action.

Requirements:

- key alternatives by pack, act, intensity, route, and language;
- provide at least two alternatives for each supported context;
- use stable bilingual IDs and reject exact or semantic duplicates;
- select deterministically, persist the choice, and never reroll on resume;
- replace the current slot without extending route length or advertised time;
- permit at most one replacement per slot initially;
- show a neutral unavailable state when no valid alternative exists;
- define eligible packs and a per-run allowance before implementation.

Done when RaDi has approved complete pools and the runtime can replace a prompt without repeats, language fallback, intensity drift, pressure, or ambiguity with Pass.

### FR-007 – Setup terminology cleanup

**Status:** Navigation delivered; terminology migration remains optional

Setup Back navigation and singleton-screen skipping are complete. The remaining concern is the legacy persisted field name `modeId`, which represents a style rather than a pack or route.

Rename it only as a dedicated save migration covering compatibility, fingerprints, fixtures, analytics-free preferences, and unknown older saves. This is not required for current user-facing correctness.

### FR-008 – Duration calibration

**Status:** Proposed

Run moderated sessions for every relevant pack and route. Record only operational observations: route, elapsed time, prompts reached, Pass count, abandonment point, perceived pacing, and usability issues. Do not record spoken answers.

Include DE/EN, all supported route lengths, and default versus PLAYFUL where relevant. Treat five completed sessions per pack/route as an early pilot, not representative evidence. Update catalog ranges only after reviewing observed medians and spread.

### FR-010 – Dedicated `closer.radi.solutions` project

**Status:** Proposed; owner decision required

A separate Vercel project can isolate deployments, PWA identity, and release cadence but is not required technically. If approved:

- choose the canonical URL and transition date;
- preserve static export, security headers, metadata, and legal links;
- update manifest scope/start URL and automated tests;
- redirect or explain `/closer/` intentionally;
- accept that `localStorage` progress and installed-PWA identity cannot migrate across origins;
- verify DNS, Vercel access, and rollback behavior.

### FR-015 – Students pack and FH Salzburg variant

**Status:** Planned; research, bilingual editorial content, and institutional decisions pending

Build a general pack for two voluntarily participating adult peers in higher education. Suggested arc: everyday student life → learning, collaboration, and belonging → strengths, support preferences, and a self-directed future. Research should decide whether Quick 12 and Standard 24 are sufficient.

Exclude grades, ranking, finances, health details, protected characteristics, named conflicts, misconduct, and confidential study/work/client information. Do not use lecturer–student, assessor–assessed, supervisor–supervisee, admissions, scholarship, or other dependent pairings.

Treat FH Salzburg as a small versioned overlay or curated route, not a duplicate 36-question bank. It requires a local content owner, review cadence, and explicit permission for institutional name/branding. No answer may be recorded, reported, or used for an academic or employment decision.

Before implementation, decide whether the local layer is a separate pack, setup option, or event route. Keep it hidden outside an intentionally selected FH context.

### FR-016 – Pack-aware PLAYFUL expansion

**Status:** Initial rollout delivered; further pack pilots remain

Classic retains ORIGINAL and PLAYFUL. Date Night, Couples, and Friends currently expose approved optional PLAYFUL styles; Chaos keeps its thematic PLAYFUL presentation. Further expansion must remain pack- and question-specific.

Rules:

- a style is shown only when it creates a meaningfully different experience;
- each exact question declares permitted actions; pack-level permission alone is insufficient;
- Pass remains available before and during every action;
- no scores, winners, streaks, penalties, dares, public performance, or rewards for disclosure;
- `NO THINKING` is light and question-first;
- `PREDICT` covers harmless preferences, alternates roles, and is never a relationship test;
- `BOTH` never covers consent, boundaries, conflict, support, identity, difficult memories, or proxy perspectives;
- Quick has at most three actions; longer routes have at most two per act, no consecutive actions, and no repeated high-intervention type within an act;
- Deep, adult packs, moving-vehicle Road Trip, and Colleagues do not inherit Classic pressure mechanics.

Done when every added assignment has an editorial rationale, deterministic compilation, density/role-balance tests, resume coverage, DE/EN UI coverage, and moderated comparison with the default style.

## Deferred or shelved

| ID | Decision | Reopen when |
|---|---|---|
| FR-009 | Offline support is not planned; no service worker. | Offline play becomes a demonstrated requirement with an owned update/cache strategy. |
| FR-012 | TTS is shelved indefinitely; the voice branch is not planned for merge. | RaDi explicitly commissions a separate TTS effort. |

## Verification for feature delivery

Every implemented feature must update its authoritative product/content contract, preserve save compatibility or bump the appropriate version, add focused regression coverage, and pass:

```text
npm run content:generate
npm run lint
npm test -- --runInBand
npm run test:e2e
git diff --check
```
