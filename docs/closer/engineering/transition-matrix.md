# CLOSER – transition matrix

**Updated:** 17 August 2026
**Scope:** persisted game phases and the events that may leave them
**Product state:** FR-011 delivered; retained as the behavioral contract

This matrix is the behavioral contract for the transition-core migration. A
transition family moves only after its current behavior has characterization
coverage. Screen-local presentation state such as a countdown tick, a menu
subview, or an animation frame is not persisted and is listed only where it
changes the next game event.

Implementation status: setup/entry, consent, act-entry/break, private-moment
capture/resolution, final-question reveal, Question 37, end-run reasons, and
compiled question destinations, question completion/pass, language, and timer changes are pure and characterized in
`src/closer/engine/transitions.js`. Canonical state creation and discriminated
save parsing are pure and characterized in `src/closer/engine/persistence.js`;
the guarded browser-storage boundary is isolated in
`src/closer/infrastructure/storage.js`. Canonical restart and resume-state
preparation are pure; their screen-local effects remain in the controller. All
phase presentation is isolated in focused view components that emit callbacks
to this event layer.

## Global events

| Event | Valid from | Result |
|---|---|---|
| `RESTART` | Every rendered phase | Canonical fresh `start` state; retain allowed preferences only |
| `END_RUN(userEnded)` | Any started run through Menu | `ending`, completed, scrub private categories/decisions, no completion reward |
| `END_RUN(consentDeclined)` | After both consent decisions | Neutral `ending`, completed, scrub private categories/decisions, no completion reward |
| `RESUME` | Valid persisted phase | Restore the compiled run; direct private content returns to its named cover; a partial consent gate restarts from A |
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
| `consentGateA` | yes or no | `consentGatePassB` | Hold A's choice in memory only; never persist it |
| `consentGatePassB` | `HANDOFF_CONFIRMED` | `consentGateB` | Person B receives the phone |
| `consentGateB` | yes or no | `consentGateAccepted` or `ending` | Evaluate only after both decisions; expose collective result, never who declined |
| `consentGateAccepted` | `CONTINUE_AFTER_CONSENT` | `intro` | Both independently opted in; decisions already cleared |
| `intro` | `BEGIN_RUN` | `act` | `pending=0`, `qIndex=0` |
| `intro` | `BACK` | `mode` or `duration` | Not available after a completed consent gate |

## Acts and questions

| Current phase | Event | Next phase | Required state/effect |
|---|---|---|---|
| `act` | `START_ACT` | `q` | Enter `pending`; first start records run fingerprint and `hasStarted=true` |
| `q` | `ANSWER_DONE` | local deeper step or compiled destination | Deeper is screen-local; otherwise pure `transitionQuestion()` advances one route-relative index |
| `q` | `PASS` | compiled destination after neutral flash | Pure `transitionQuestion()` uses the same destination as answer completion; no penalty |
| compiled destination | ordinary index | `q` | Set `qIndex`; initialize question-local twist state |
| compiled destination | act boundary | `break` | Set `breakAct`, `pending`; act-break feedback only |
| compiled destination | configured before-question trigger | `secretOffer` | Enabled route, stable question ID, status `not-started` |
| compiled destination | final question index | `lastIntro` | Set `pending`; final-question feedback only |
| compiled destination | past final index | `all36` | Begin completion sequence |
| `break` | `CONTINUE` | `consentAct2PassA`, `secretOffer`, `privateUse`, or `act` | Apply Late Night gate first, then configured after-act trigger/use; reset act time |
| `consentAct2PassA` | `HANDOFF_CONFIRMED` | `consentAct2A` | Person A receives the phone |
| `consentAct2A` | yes or no | `consentAct2PassB` | Hold A's choice in memory only; keep break context |
| `consentAct2PassB` | `HANDOFF_CONFIRMED` | `consentAct2B` | Person B receives the phone |
| `consentAct2B` | yes or no | `consentAct2Accepted` or `ending` | Evaluate only after both decisions; expose collective result only |
| `consentAct2Accepted` | `CONTINUE_AFTER_CONSENT` | `act` | Clear decisions and reset act time |
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
| `secretOffer` | `START` | `secretPass1` | Begin optional handoff; set collective status `in-progress` |
| `secretOffer` or either card/handoff | `SKIP_ALL` | triggered `q` or next `act` | Shared skip; Classic discards both categories |
| `secretPass1` | `HANDOFF_CONFIRMED` | `secret1` | Person A reads privately |
| `secret1` | `SET_CARD_CHOICE` | `secretPass2` | Non-Classic choices collapse to identical state; Classic records only `pending` or `none` |
| `secretPass2` | `HANDOFF_CONFIRMED` | `secret2` | Person B reads privately |
| `secret2` | `SET_CARD_CHOICE` | `secretPassBack` | Same storage rule as A; choices are never shown to the other person |
| `secretPassBack` | `HANDOFF_CONFIRMED` | triggered `q`, next `act`, or `privateUse` | Set status `armed`; resume by configured use kind |
| `privateUse` | `COMPLETE_USE` | `act` | Immediate/after-act use is consumed and discarded |
| configured question use | leave the question | compiled destination | CHAOS becomes `consumed` when Q16 ends |
| `all36` | `CONTINUE_AFTER_QUESTIONS` | first Classic check, `privateFinaleIntro`, `privateFinaleSkipped`, `directFinale`, `q37intro`, or `ending` | Route and pack metadata choose exactly one outcome; Quick has no Private Moment |
| `checkPass1/2` | `HANDOFF_CONFIRMED` | `check1/2` | Applicable person reads privately |
| `check1/2` | `SET_QUESTION_STATUS` | next role check or `checkPassBack` | Store only `asked`, `pending`, or `discarded`; follow stable A/B order |
| `checkPassBack` | `HANDOFF_CONFIRMED` | `q37intro` | Return to shared phone state |
| `q37intro` | `ACCEPT_FINALE` | `q37` or `q37a` | Classic uses pending categorical count; other packs use their ordinary closer |
| `q37intro` | `END_RUN(userEnded)` | `ending` | Offered on optional-bonus branches |
| `q37a` | `CONTINUE` | `q37b` | Preserve strict starter alternation |
| `q37b` | `END_RUN(completed)` | `ending` | Completion reward allowed |
| `q37` | `END_RUN(completed)` | `ending` | Completion reward allowed |
| `privateFinaleIntro` | `ACCEPT_FINALE` | `privateFinaleA` | Start pack-specific optional finale |
| `privateFinaleA` | `CONTINUE_SECOND_TURN` | `privateFinaleB` | Offer a fresh exit before B |
| `privateFinaleB`, `privateFinaleSkipped`, or `directFinale` | `COMPLETE` | `ending` | Scrub private categories and complete |
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
