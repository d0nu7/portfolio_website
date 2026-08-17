# CLOSER – gameplay and safety contract

**Updated:** 17 August 2026
**Audience:** product, editorial, design, engineering, and QA
**Status:** authoritative product behavior; implementation status is tracked separately in [bugs.md](../reviews/bugs.md) and [feature-requests.md](../reviews/feature-requests.md)

## 1. Product boundary

CLOSER is a mobile-first conversation game for exactly two people who share one device in the same place. The phone acts as a game master; the conversation happens between the people.

The app may control question order, starting person, optional twists, transitions, progress, and duration guidance. It must not collect, transcribe, grade, or infer answers. Answers are spoken and remain outside the app.

The central design principle is:

> The closer you get, the less you need the game.

Intervention should therefore decrease across the three acts. A milestone may briefly celebrate shared progress, but it must not compete with the conversation.

## 2. Vocabulary

| Term | Meaning |
|---|---|
| Pack | The question domain: Classic, First Date, Date Night, Couples, Friends, Old Friends, Deep, Chaos, Late Night, Road Trip, Family, or Colleagues. |
| Route | The curated duration/length: Quick, Standard, or Full where supported. |
| Style | Optional rules that change presentation or twists without changing the question bank. |
| Twist | A sparse question-level variation such as answering together or without deliberation. |
| Pass | A safety action that skips the current question with no cost or explanation. |
| Replacement | A future optional mechanic that swaps in another curated question. It is not the safety action. |
| Private moment | A pack-specific asymmetric instruction shown to one person during a device handoff. |
| Question 37 | An internal finale mechanic. Only Full should display the literal Question 37 label. |

Do not use “mode” for both pack and style in new code or documentation.

## 3. Setup flow

1. Landing screen: new game or a valid resumable game.
2. Optional names with gender-neutral labels and neutral defaults.
3. Pack selection.
4. Route selection only when more than one route exists.
5. Style selection only when more than one style exists.
6. Pack-specific introduction and, if required, consent.
7. Start.

Every setup screen needs a safe route back. The global menu must be reachable before and during a game. A selector with one valid option is skipped; zero valid options produce a controlled configuration error.

## 4. Route contract

Every route is a fixed editorial sequence. It is never a random sample.

- **Quick:** 12 regular questions, four per act, with a self-contained beginning, middle, and ending. No Private Moment or extended Question 37 ceremony. Late Night still requires its safety gates.
- **Standard:** normally 24 regular questions, eight per act. It may include one short pack-appropriate private moment.
- **Full:** 36 regular questions, 12 per act, with room for the complete finale.

Pack-specific pilot ranges are defined in the [question catalog](../content/question-catalog.de-en.md). They are soft estimates, not targets. A timer never advances the game automatically, and worthwhile follow-up conversation takes priority over completing the route.

## 5. Passing and game mechanics

Either person can pass on any question at any time:

- no token;
- no lost life or heart;
- no explanation;
- no confirmation designed to induce guilt;
- no negative animation or copy.

A future **Another question** joker may provide a curated replacement. It must be visibly distinct from Pass because it represents optional variety rather than permission to withhold an answer. Do not add the joker until replacements exist for each relevant pack, act, intensity, and route.

Twists remain sparse and pack-appropriate:

- `NO THINKING` shows the question before or together with its countdown; it must never ask for an immediate answer to unseen text.
- `PREDICT` must be role-balanced, uncommon, and excluded from sensitive topics.
- `BOTH` is excluded when simultaneous or proxy answers could undermine consent, boundaries, or emotional safety.
- Any twist may be bypassed through the ordinary Pass action.

## 6. Private moments and finales

A device handoff is valuable only when the hidden information differs meaningfully between the two people. Repeating the same generic saved-question instruction in every pack is not sufficient. The approved route/trigger/use matrix and exact localized copy live in the [question catalog](../content/question-catalog.de-en.md#private-moments-fr-005).

Private moments must be:

- optional and route-specific;
- asymmetric in content or role;
- safe to decline without explanation;
- non-manipulative and non-diagnostic;
- explicit about whether the instruction should remain private;
- absent from Quick;
- introduced by a shared offer that can skip the moment for both people;
- dismissible on either private card through **Heute nicht / Not today**, without showing that choice to the other person.

The person selected to open Q1 is role A; the other person is role B. That mapping remains stable for cards, use points, checks, and finales even when the named players are stored in the opposite array order.

### Lifecycle and persistence

1. At the route-specific trigger, show a shared explanation with equally understandable **show cards** and **skip for both** actions.
2. Cover the screen before each named handoff. A background/app switch immediately replaces any visible private card or private check with its handoff cover.
3. Show different A and B cards. No text field, microphone, transcription, or spoken-answer capture exists.
4. A non-Classic card choice only advances the handoff; accept and decline produce identical durable state. The app retains only the collective lifecycle status needed to route the later use point.
5. Classic Full may retain only a categorical per-person state: `none | pending | asked | discarded`. It never retains the question itself.
6. Late Night’s individual readiness decisions exist only in memory until both people have decided. They are excluded from local storage. Reloading an incomplete gate restarts it from A, and the shared result never identifies who declined.
7. Resume always covers direct private content. It must never reopen a saved private card or private check without another named handoff.
8. Use or discard the moment only at its approved point. Early exit and natural completion replace any remaining private categorical state with discarded/consumed values; completed games are removed from storage.

### Threat-model review

| Threat | Required control |
|---|---|
| Pressure or relationship obligation | Shared skip, private decline, ordinary Pass, and End require no reason; copy disclaims promises, reciprocity, plans, reconciliation, and consent. |
| Assumed attraction or consent | First Date and Date Night copy does not infer attraction or another date; Late Night answers are explicitly not consent to action. |
| Covert observation, touch, sex, or boundary testing | No card asks someone to watch, touch, test, perform, or conceal an action. Late Night has no secret sexual/physical card. |
| Humiliation, public performance, or deception | All tasks remain between two people and cannot require embarrassment, lying, guessing the other card, or public behavior. |
| Diagnosis or manufactured disclosure | Listening prompts forbid interpretation/diagnosis and never demand deeper disclosure, explanation, repair, or resolution. |
| Loyalty testing or conflict escalation | Appreciation/memory cards cannot demand agreement, matching memories, gratitude, exclusivity, forgiveness, or a “correct” account. |
| Workplace/family power | Road Trip, Family, and Colleagues remain `privateMoment: 'none'`; reopening requires a separate safety decision. |
| Shoulder surfing, app-switcher snapshots, or unsafe resume | Named covers precede private content; background and resume return to a cover; copy warns against screenshots and data entry. |

Do not use covert touch, sexual, public, humiliating, deceptive, diagnostic, or boundary-testing tasks.

Finales follow the route:

- Quick ends directly after its final regular question, except that Late Night shows its direct safety reminder first.
- Standard uses a neutral **Finale** label and a short optional closer.
- Full may use **Question 37** and any unresolved saved questions when the pack contract supports them.
- Late Night does not use secret sexual or physical tasks, does not inherit the saved-question flow, and does not enter generic Question 37.

## 7. Late Night (18+)

Late Night is explicit adult conversation content. Its visibility preference and in-game consent are independent:

1. The pack is hidden from the normal selector by default.
2. A person may reveal it through **Menu → Additional content** after reading a neutral 18+ explanation.
3. The visibility preference is stored separately from game progress and can be hidden again.
4. Selecting the pack still requires each person to confirm 18+ and voluntary participation separately before any question appears.
5. Both people opt in again before Act II, where content becomes more explicit.
6. Each decision remains private until both have answered. The app then shows only a collective accepted screen or ends the path neutrally; it never identifies who declined.
7. The action to decline and the action to agree have equal visual prominence.
8. Reloading a partial gate restarts it for both people because individual decisions are never stored.
9. Every question remains passable and ending remains available throughout.
10. Every route ends with a direct reminder that answers create no expectation of action; Late Night never enters generic Question 37.

An answer describes thoughts, feelings, or preferences. It never constitutes consent to an action. Consent outside the game must be specific, informed, voluntary, and withdrawable at any time.

Forbidden mechanics include `NO THINKING`, countdown pressure, `PREDICT`, proxy answers, simultaneous boundary answers, forced eye contact, touch tasks, dares, or any prompt to enact or confirm an activity.

## 8. Milestone celebration

The milestone animation should create a brief sense of reward at the start, act transitions, and natural completion. Private handoffs and consent decisions remain quiet and do not trigger a celebration.

It must:

- fill enough of a mobile viewport to read as a deliberate scene rather than a tiny icon;
- have a clear arrival, connection, and release over roughly 4.2–5 seconds (RaDi, 2026-08-16: the original 1.8–2.5s read as beautiful but cleared before it could be taken in);
- use pack color and restrained copy;
- never activate controls that are visually covered by the celebration;
- leave the separate global Menu operable while the covered scene is inert;
- avoid confetti, points, streaks, disclosure scores, or pressure;
- provide a stable, meaningful reduced-motion version rather than a millisecond flash.

The animation celebrates time spent together, never how personal an answer was.

## 9. Privacy and local data

CLOSER stores settings and progress locally to support resume and installed-PWA behavior. It does not store answers. The menu must make the following available in both languages:

- imprint/operator information;
- privacy information;
- a plain-language list of local data;
- an action that deletes all CLOSER local data, including visibility preferences;
- a distinction between deleting local app data and browser/device cache controls.

Any future analytics, remote persistence, account system, speech processing, or TTS telemetry changes this privacy baseline and requires a new review before release.

## 10. PWA and system UI limits

Installed PWA display modes can remove normal browser chrome such as the address bar. They cannot reliably remove Android system navigation controls or iOS system gestures/home indicators. Immersive or fullscreen APIs are platform-dependent and are not a safe product assumption.

The UI must therefore respect safe-area insets, leave bottom controls clear of system UI, remain usable with gesture and three-button navigation, and never rely on hidden operating-system controls.

## 11. Release acceptance

Before a public release:

- all supported pack/route/style combinations compile to valid runs;
- DE/EN content matches the catalog exactly;
- Quick, Standard, and Full reach the correct finale;
- Pass, resume, restart, early end, saved-question branches, and all consent declines are tested;
- menu, timer, and safety actions do not overlap from 320–430 px;
- dialogs pass keyboard and focus tests;
- the celebration passes normal- and reduced-motion visual checks;
- unexpected console and page errors fail E2E tests;
- real Android and iOS installed-PWA smoke tests are complete;
- imprint and privacy information are directly reachable;
- Late Night has a separate editorial, consent, safety, and legal review.
