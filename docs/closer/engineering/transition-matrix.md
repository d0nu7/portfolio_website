# CLOSER – transition matrix

**Updated:** 16 August 2026
**Scope:** persisted game phases and the events that may leave them
**Product state:** frozen while FR-011 is in progress

This matrix is the behavioral contract for the transition-core migration. A
transition family moves only after its current behavior has characterization
coverage. Screen-local presentation state such as a countdown tick, a menu
subview, or an animation frame is not persisted and is listed only where it
changes the next game event.

Implementation status: setup/entry, consent, act-entry/break, private-moment
capture/resolution, final-question reveal, Question 37, end-run reasons, and
compiled question destinations, language, and timer changes are pure and characterized in
`src/closer/engine/transitions.js`. Canonical state creation and discriminated
save parsing are pure and characterized in `src/closer/engine/persistence.js`;
the guarded browser-storage boundary is isolated in
`src/closer/infrastructure/storage.js`. Canonical restart and resume-state
preparation are pure; their screen-local effects remain in the controller.

## Global events

| Event | Valid from | Result |
|---|---|---|
| `RESTART` | Every rendered phase | Canonical fresh `start` state; retain allowed preferences only |
| `END_RUN(userEnded)` | Any started run through Menu | `ending`, completed, no completion reward |
| `END_RUN(consentDeclined)` | Either consent decision screen | Neutral `ending`, completed, no completion reward |
| `RESUME` | Valid persisted phase | Restore the same compiled run and phase; otherwise reject safely |
| `SET_LANGUAGE` | Every rendered phase | Pure `transitionGlobal()` patch; same phase and run, different supported language |
| `SET_TIMER` | Every phase where Menu exposes it | Pure `transitionGlobal()` patch; same phase and run, updated timer preference |

## Setup and entry

| Current phase | Event | Next phase | Required state/effect |
|---|---|---|---|
| `start` | `START_SETUP` | `players` | No resumable progress yet |
| `players` | `CONTINUE` | `pack` | Persist names and one random starter offset |
| `players` | `BACK` | `start` | Preserve setup selections |
| `pack` | `CONTINUE` | `duration` | Selected pack owns default route and style |
| `pack` | `BACK` | `players` | Preserve setup selections |
| `duration` | `CONTINUE` | `mode`, `consentGatePassA`, or `intro` | Skip singleton style; enter consent gate only when configured |
| `duration` | `BACK` | `pack` | Preserve setup selections |
| `mode` | `CONTINUE` | `consentGatePassA` or `intro` | Preserve selected style |
| `mode` | `BACK` | `duration` | Preserve setup selections |
| `consentGatePassA` | `HANDOFF_CONFIRMED` | `consentGateA` | Person A receives the phone |
| `consentGateA` | `CONFIRM_CONSENT` | `consentGatePassB` | No run progress yet |
| `consentGatePassB` | `HANDOFF_CONFIRMED` | `consentGateB` | Person B receives the phone |
| `consentGateB` | `CONFIRM_CONSENT` | `intro` | Both people opted in |
| `consentGateA/B` | `DECLINE_CONSENT` | `ending` | `endReason=consentDeclined` |
| `intro` | `BEGIN_RUN` | `act` | `pending=0`, `qIndex=0` |
| `intro` | `BACK` | `mode` or `duration` | Not available after a completed consent gate |

## Acts and questions

| Current phase | Event | Next phase | Required state/effect |
|---|---|---|---|
| `act` | `START_ACT` | `q` | Enter `pending`; first start records run fingerprint and `hasStarted=true` |
| `q` | `ANSWER_DONE` | local deeper step or compiled destination | Deeper is screen-local; otherwise advance one route-relative index |
| `q` | `PASS` | compiled destination after neutral flash | Same destination as answer completion; no penalty |
| compiled destination | ordinary index | `q` | Set `qIndex`; initialize question-local twist state |
| compiled destination | act boundary | `break` | Set `breakAct`, `pending`; act-break feedback only |
| compiled destination | eligible private-moment index | `secretPass1` | Only non-Quick runs with an enabled private moment not yet seen |
| compiled destination | final question index | `lastIntro` | Set `pending`; final-question feedback only |
| compiled destination | past final index | `all36` | Begin completion sequence |
| `break` | `CONTINUE` | `consentAct2PassA` or `act` | Renew consent before Act II when configured; reset act time |
| `consentAct2PassA` | `HANDOFF_CONFIRMED` | `consentAct2A` | Person A receives the phone |
| `consentAct2A` | `CONFIRM_CONSENT` | `consentAct2PassB` | Keep current break context |
| `consentAct2PassB` | `HANDOFF_CONFIRMED` | `consentAct2B` | Person B receives the phone |
| `consentAct2B` | `CONFIRM_CONSENT` | `act` | Reset act time |
| `consentAct2A/B` | `DECLINE_CONSENT` | `ending` | `endReason=consentDeclined` |
| `lastIntro` | `REVEAL_LAST` | `q` | Enter the stored `pending` index |

Setup/entry, consent, act-entry/break, private-moment capture/resolution,
final-question reveal, Question 37, end-run reasons, and compiled question
destinations are implemented in `src/closer/engine/transitions.js`. Canonical
state creation and save validation are implemented in
`src/closer/engine/persistence.js`, while browser storage is isolated in
`src/closer/infrastructure/storage.js`. Restart and resume state decisions are
also pure; their screen-local effects, global preference events, and the ending
timeline remain outside the transition core.

## Private moment and finale

| Current phase | Event | Next phase | Required state/effect |
|---|---|---|---|
| `secretPass1` | `HANDOFF_CONFIRMED` | `secret1` | Person A reads privately |
| `secret1` | `PRIVATE_CHOICE` | `secretPass2` | Mark A seen and record whether a question exists |
| `secretPass2` | `HANDOFF_CONFIRMED` | `secret2` | Person B reads privately |
| `secret2` | `PRIVATE_CHOICE` | `secretPassBack` | Mark B seen and record whether a question exists |
| `secretPassBack` | `HANDOFF_CONFIRMED` | `q` | Enter stored `pending` question |
| `all36` | `CONTINUE` | first applicable check or `q37intro` | Quick ends directly; skip checks for opted-out people |
| `all36` | `END_RUN(completed)` | `ending` | Quick only; completion reward allowed |
| `checkPass1/2` | `HANDOFF_CONFIRMED` | `check1/2` | Applicable person reads privately |
| `check1` | `PRIVATE_ANSWER` | `checkPass2` or `checkPassBack` | Record A's answer; skip B when not applicable |
| `check2` | `PRIVATE_ANSWER` | `checkPassBack` | Record B's answer |
| `checkPassBack` | `HANDOFF_CONFIRMED` | `q37intro` | Return to shared phone state |
| `q37intro` | `CONTINUE` | `q37`, `q37a`, or `q37b` | Branch derives from applicable private answers |
| `q37intro` | `END_RUN(userEnded)` | `ending` | Offered on optional-bonus branches |
| `q37a` | `CONTINUE` | `q37b` | Preserve strict starter alternation |
| `q37b` | `END_RUN(completed)` | `ending` | Completion reward allowed |
| `q37` | `END_RUN(completed)` | `ending` | Completion reward allowed |
| `ending` | `ADVANCE_BEAT` | `ending` | Screen-local beat advances; persisted phase unchanged |
| `ending` | `RESTART` | `start` | Canonical fresh state |

## Migration rule

For each remaining family:

1. add characterization tests for every row and branch;
2. implement a pure transition returning a state patch plus named effects;
3. keep vibration, focus, timers, and animation outside the pure function;
4. integrate only that family;
5. run lint, all unit/catalog tests, a fresh static build, and the complete E2E suite;
6. update this matrix and the refactoring roadmap in the same commit.
