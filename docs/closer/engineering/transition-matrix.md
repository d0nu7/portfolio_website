# CLOSER – persisted transition contract

**Updated:** 18 August 2026
**Status:** Implemented and characterized

This matrix covers persisted navigation. Countdown ticks, menu subviews, focus, animation frames, visibility, and Wake Lock are screen-local effects.

## Global and setup

| From | Event | Destination / invariant |
|---|---|---|
| any rendered phase | RESTART | canonical fresh start; retain permitted preferences only |
| any started run | END_RUN(reason) | ending; scrub private categorical state; reward only natural completion |
| valid saved phase | RESUME | reconstruct the same compiled run; private content resumes behind a named cover |
| any phase | SET_LANGUAGE, SET_TIMER | same phase/run with supported global setting |
| start | START_SETUP | players |
| players | CONTINUE / BACK | pack / start; preserve selections |
| pack | CONTINUE / BACK | duration / players |
| duration | CONTINUE / BACK | mode or intro / pack; skip singleton style |
| mode | CONTINUE / BACK | intro / duration |
| intro | BEGIN_RUN / BACK | act / mirrored setup destination |

The generic device-consent transition family remains characterized but dormant: no current pack sets requiresConsent.

## Acts and questions

| From | Event | Destination / invariant |
|---|---|---|
| act | START_ACT | q; first start records fingerprint and hasStarted |
| q | ANSWER_DONE | local deeper step or compiled destination |
| q | PASS | same compiled destination after neutral feedback; no penalty |
| compiled ordinary index | advance | q at the next route-relative index |
| compiled act boundary | advance | break with next act pending |
| configured trigger | advance | secretOffer only when the compiled route enables it |
| final question index | advance | lastIntro |
| past final index | advance | all36 completion routing |
| break | CONTINUE | configured Private Moment/use or next act; reset act time |
| lastIntro | REVEAL_LAST | q at the stored final index |

Question order, boundaries, triggers, and destinations come only from compileRun().

## Private Moments

| From | Event | Destination / invariant |
|---|---|---|
| secretOffer | START | named A handoff; collective state becomes in progress |
| any capture step | SKIP_ALL | configured return; Classic categories become discarded |
| A/B handoff | HANDOFF_CONFIRMED | corresponding private card |
| private card | SET_CARD_CHOICE | next handoff; non-Classic stores no individual choice, Classic stores categorical state only |
| return handoff | HANDOFF_CONFIRMED | configured question, act, or immediate use |
| privateUse | COMPLETE_USE | next act; private state consumed and discarded |
| configured question use | leave question | compiled destination; temporary private state discarded |

Spoken answers and private free text never enter state. Natural completion, restart, and every early end scrub remaining private categories.

## Finales

| From | Event | Destination / invariant |
|---|---|---|
| all36 | CONTINUE_AFTER_QUESTIONS | exactly one compiled outcome: Classic check, pack-private finale, direct finale, ordinary Q37, or ending |
| Classic check handoff | HANDOFF_CONFIRMED | private categorical check |
| Classic check | SET_QUESTION_STATUS | next role or shared return; store only asked, pending, or discarded |
| q37intro | accept / end | q37, q37a, or neutral ending |
| q37a | continue | q37b with stable role order |
| pack-private finale intro | accept / end | A turn or neutral ending |
| pack-private A | continue | B turn with a fresh exit |
| final private/direct/Q37 step | complete | ending; private state scrubbed |
| ending | ADVANCE_BEAT | same persisted phase; presentation beat only |

Quick never enters a Private Moment or extended Question 37 ceremony. Adult packs use direct finales and no device-mediated participation gate.

## State ownership

- Pure navigation: src/closer/engine/transitions.js
- Canonical state, migration, and validation: src/closer/engine/persistence.js
- Browser storage: src/closer/infrastructure/storage.js
- Compiled run identity: src/constants/closer.js
- Browser effects and event orchestration: src/components/Closer/CloserGame.js

Any new persisted phase or event requires a characterized matrix row, compatibility decision, parser invariant, and focused resume/early-exit tests.
