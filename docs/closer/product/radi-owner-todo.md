# CLOSER – RaDi owner TODO

**Updated:** 18 August 2026
**Purpose:** Only decisions, editorial work, external review, and real-world validation that cannot be completed by code alone. Technical scope lives in [feature requests](../reviews/feature-requests.md).

## Recommended order

1. Arrange the safeguarding, educator, bilingual, accessibility, privacy, and target-age reviews for Youth Workshop before institutional promotion.
2. Run OFF SCRIPT sessions across physical, quiet, public, seated, and limited-mobility settings.
3. Test the neutral first impression with people who have not seen CLOSER.
4. Review Students/FH Salzburg with adult peers and appoint a local FH content owner.
5. Curate replacement-question pools if FR-006 remains desirable.
6. Complete physical-device checks and decide whether a separate subdomain is worthwhile.

## Product decisions

### New content

- [ ] **FR-015 Students:** run bilingual and moderated adult-peer sessions; review pacing and question fit before broad promotion.
- [ ] **FH Salzburg:** appoint a local content owner, verify local references on a defined cadence, and obtain permission before institutional promotion or any use implying endorsement.
- [ ] **FR-021 OFF SCRIPT:** run physical/accessibility sessions before adding a longer route or broad promotion.
- [ ] **FR-022 neutral first run:** test whether first-time viewers understand CLOSER as a broad two-person experience rather than a pickup product.
- [ ] **FR-023 Youth Workshop:** commission youth/education, safeguarding, bilingual, accessibility, privacy, and moderated target-age review before broad institutional promotion.

### Replacement questions (FR-006)

- [ ] Confirm that **Another question** is still wanted and remains distinct from free Pass.
- [ ] Choose supported packs/routes and the per-run allowance.
- [ ] Approve replacement and exhaustion semantics.
- [ ] Commission complete bilingual pools with at least two alternatives per supported context.
- [ ] Review duplicates, intensity, sensitive topics, and pack fit before implementation.

### PLAYFUL and Private Moments

- [ ] Continue moderated comparison of default and PLAYFUL styles for pressure, fatigue, conversation quality, and attention to the phone.
- [ ] Validate Private Moments on physical devices and in real sessions.
- [ ] Approve any new pack/action pairing individually; do not enable Classic mechanics globally.

## Validation and release

### Physical devices (BUG-010)

- [x] Initial Android phone smoke test completed without a blocking issue.
- [ ] Android installed PWA with gesture navigation.
- [ ] Android installed PWA with three-button navigation.
- [ ] iOS Add to Home Screen, safe areas, and home indicator.
- [ ] TalkBack and VoiceOver smoke tests.
- [ ] Mid-range-phone milestone test in normal and reduced-motion settings.
- [ ] Deployed console, CSP, and asset check.

Record device, OS, browser/display mode, and result.

### Moderated sessions (FR-008)

- [ ] Define representative contexts for each tested pack.
- [ ] Use a short moderator script and never record spoken answers.
- [ ] Record route, elapsed time, prompts reached, Pass count, abandonment, pacing, and usability only.
- [ ] Include DE/EN and supported route lengths.
- [ ] File content feedback and interface defects separately.
- [ ] Update duration ranges only after reviewing observed evidence.

### Adult-pack release evidence

- [ ] Commission the external specialist, bilingual, accessibility, privacy/legal, physical-device, and moderated reviews named in the research index.
- [ ] Include kink/sexual-health and trauma-informed review for POWER, BY CHOICE.
- [ ] Include ethics, adverse-event, diverse-adult, and physical-interaction review for SLOW BURN.
- [ ] Revisit Austrian/EU legal and youth-protection review before broad promotion or material risk expansion.

Implementation is not validation. Current adult boundaries are documented in the [gameplay and safety contract](gameplay-and-safety.md).

## Infrastructure and legal triggers

### `closer.radi.solutions` (FR-010)

- [ ] Decide **stay** or **move**.
- [ ] If moving, choose canonical URL, timing, redirect, DNS/Vercel owner, and rollback.
- [ ] Accept that local progress and installed-PWA identity do not migrate across origins.

### Legal information

Current bilingual Imprint/Privacy content and supplied operator details are implemented. RaDi decided not to commission legal advice at the current stage.

- [ ] Confirm whether additional business, professional, trade, or regulatory identifiers apply.
- [ ] Reopen legal review before commercialization, material data-processing changes, new external services, or a meaningful product-risk change.

## Standing decisions

| Topic | Decision |
|---|---|
| Classic | Wording, translation, order, and route membership remain immutable. |
| Pass | Free, unlimited, immediate, and never replaced by a token mechanic. |
| TTS | Shelved indefinitely; the voice branch is not planned for merge. |
| Offline | Not planned; no service worker until offline play is a demonstrated need. |
| Adult interaction | One shared introduction; wishes, changes, pause, and stop are communicated directly between the people. |
| Data | Spoken answers, fantasies, body preferences, and private free text are never stored. |
| Legal advice | Not commissioned at the current stage; revisit on the triggers above. |
| Refactoring | FR-011 is complete; `modeId` terminology is a separate optional save migration. |

Detailed historical decisions remain available in Git history and the frozen research documents.
