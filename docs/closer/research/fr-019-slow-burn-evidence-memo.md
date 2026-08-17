# FR-019 — SLOW BURN evidence and product-safety memo

**Status:** decision memo for product, content, design, engineering, safety, privacy, accessibility, and legal review
**Evidence search current through:** 17 August 2026
**Scope:** a touch-forward, two-person, one-device CLOSER experience for independently consenting adults
**Decision:** **conditional GO for a small, moderated prototype; NO-GO for public release until the expert-review, adverse-event, privacy, accessibility, and legal gates in this memo pass.**

This memo is not medical advice, a clinical protocol, a substitute for consent, or evidence that an app can make sexual activity safe. It translates an uneven literature into conservative product constraints. Where evidence is indirect, correlational, clinical, population-limited, or absent, that limitation is explicit.

## 1. Executive decision

### What can responsibly be built

CLOSER can test an adult-only experience that helps two people choose, communicate about, enact, adjust, and end **non-penetrative external touch**. The defensible product value is not “causing arousal.” It is reducing interactional ambiguity and screen burden while making autonomous choice, recipient direction, adjustment, and stopping easy.

The first prototype should:

- live behind the collapsed 18+ library and require each adult to confirm age eligibility and present willingness independently;
- treat route length, touch category, body area, clothing, pressure, pace, position, and kissing as separate choices;
- begin with no-touch and low-intensity options, use a three-act arc, and let a pair finish any act without escalating;
- ask for a fresh bilateral choice before the first touch, first kiss, any new touch/body-area category, bare-skin change, and the Act III intimate-touch category;
- resolve two independently entered, interface-masked choices to the **least permissive shared result**: any Pause or End overrides; any Skip skips; any Adjust opens a neutral adjustment menu; only Yes plus Yes opens the exact proposition;
- keep Pause and End immediately reachable throughout, never infer agreement from silence, stillness, prior participation, arousal, relationship status, or an earlier yes;
- use the phone as a brief gateway, then recede during the touch interval;
- remain non-resumable and ephemeral: no answers, body-area choices, consent choices, inferred preferences, route history, completion state, analytics, session replay, or sexual-profile data leave volatile runtime memory;
- end with neutral care and space options, not sex, orgasm, escalation, or “completion” as a presumed reward;
- exclude all hazardous practices and keep penetration, genital/oral/anal technique, toys, restraints, impact, breath/neck play, and other specialist domains outside the product.

### What cannot presently be claimed

Do not claim that SLOW BURN:

- increases genital or other physiological arousal;
- reliably creates desire, orgasm, sexual function, relationship quality, attachment, hormone release, nervous-system regulation, synchronization, healing, or trauma recovery;
- is sensate focus, sex therapy, tantra, mindfulness treatment, exposure therapy, or an evidence-based intervention;
- makes any action safe, makes a yes valid, detects coercion, or replaces ongoing interpersonal consent;
- works similarly across genders, sexual orientations, relationship structures, cultures, disabilities, neurotypes, pain conditions, trauma histories, or ages within adulthood.

### Release boundary

The recommended V1 ceiling is **kissing plus recipient-selected, non-penetrative external touch**, with clothing remaining an always-valid option. The moderated prototype may test a clearly isolated “personally named intimate external area” category, initially **over clothing only**, but that category should not ship until a sexual-health clinician, trauma specialist, disability/accessibility reviewers, privacy counsel, and Austrian/EU legal and youth-protection counsel approve the exact content and gates.

If the team cannot implement independently entered and masked bilateral choices, plain-language privacy limits, persistent Pause/End, fail-closed state resolution, non-resumable state, and the adverse-event stop rules, the feature is a **NO-GO**.

## 2. Product fit and non-negotiable context

This memo incorporates the existing CLOSER contract in:

- docs/closer/content/question-design-research.md;
- docs/closer/content/question-catalog.de-en.md;
- docs/closer/reviews/feature-requests.md;
- docs/closer/product/gameplay-and-safety.md; and
- docs/closer/product/radi-owner-todo.md.

CLOSER is a shared-device experience for exactly two physically present people. Spoken answers are not stored, transcribed, scored, or inferred. Passing is free, unlimited, immediate, and explanation-free. The phone should progressively recede as the two people engage with each other.

FR-019 is materially different from an ordinary conversation pack. It asks people to do things to each other's bodies. Therefore:

1. Late Night's 18+ entry rule is necessary but not sufficient.
2. An answer about a wish is not consent to enact it.
3. Pack visibility, age eligibility, willingness to enter, consent to a category, consent to a specific action, and willingness to continue are distinct states.
4. Existing global PLAYFUL mechanics are not safe defaults here because prediction, simultaneous answers, countdowns, dares, surprise, or social pressure can undermine autonomous action.
5. Existing “private moment” mechanics must not carry secret touch instructions. Secrecy is incompatible with a shared action that requires specific bilateral agreement.

## 3. Research method and confidence language

### Search and selection approach

This is a source-driven rapid evidence review, not a registered systematic review. Searches prioritized peer-reviewed systematic reviews and meta-analyses, randomized or controlled studies, dyadic and experimental work, large observational studies, qualitative studies where experience and accessibility matter, and official guidance. Stable DOI, PubMed, publisher, WHO, SAMHSA, EU, or national-health links were preferred. Sources were followed through references and related records; claims were checked against abstracts or full text where available.

The search used PubMed/MEDLINE records, Crossref metadata, publisher and open-repository full text, backward/forward citation trails, and official W3C, WHO, UNFPA, SAMHSA, CDC, NHS, Canadian-government, and EUR-Lex material. Query families combined terms for: dual control/responsive desire/incentive motivation; subjective/genital arousal concordance; sexual communication/responsiveness/satisfaction; affectionate/slow/pleasant touch and kissing; sensate focus, mindfulness, internet interventions, and tantra; consent/willingness/freezing/tonic immobility/trauma-informed sexual education; body image; disability/chronic pain/autism/sensory processing/sexuality; phones/phubbing/mere presence; strangulation/breath play; and privacy/data minimization. Searches and citation chasing ran through 17 August 2026. English-language and bilingual-product-relevant sources were prioritized; this can miss relevant non-English evidence.

DOI metadata were checked against Crossref and paired PubMed records where available. All 100-plus unique DOI, PubMed, publisher, and official URLs in the completed memo received a mechanical resolution check on 17 August 2026; a resolvable link is not itself evidence of study quality. Some publisher/official endpoints reject automated clients, so their DOI or indexed record and an alternate authoritative link are also supplied where possible.

The literature is fragmented across sexual desire/arousal, sexual communication, affectionate touch, sensory pleasantness, consent, body image, trauma, disability, chronic pain, autism, digital interruption, and clinical sex therapy. Very little directly evaluates a shared-phone, in-the-moment, touch-sequencing product for a diverse nonclinical population. Product recommendations therefore combine evidence, the existing CLOSER safety contract, and precautionary design judgment.

The date range was database inception through 17 August 2026. Included sources had to bear directly on a proposed mechanism, outcome, interaction risk, population/access need, implementation analogue, or binding product context. Clinical studies were retained only as indirect analogues and are labeled as such. Adolescent trauma-informed-education evidence was retained solely to characterize the evidence gap, not to justify adult physical actions. Commercial wellness copy, unsourced popular articles, pornography, purely spiritual claims, animal/neurochemical findings without a defensible human-product bridge, and technique pages without peer review or public-health authority were excluded as evidence. Community practices were eligible only if clearly labeled community-developed rather than empirically validated; no community convention overrides the prohibited-action boundary.

### Confidence labels

- **Supported:** replicated evidence, a relevant systematic review/meta-analysis, or converging controlled and observational evidence supports the bounded claim.
- **Promising but indirect:** credible evidence exists in a different population, clinical context, task, or outcome; it can justify a prototype hypothesis, not a product claim.
- **Speculative:** plausible theory or weak/limited evidence; do not market as an effect.
- **Safety/product rule:** a conservative normative constraint. It need not await proof of harm to be required.

For alignment with the larger CLOSER audit, those labels map as follows: **established evidence** means “Supported” only within the stated population/outcome; **limited or indirect evidence** means “Promising but indirect”; **community practice** is descriptive and not efficacy evidence; **expert recommendation** means a qualified reviewer must approve the implementation; **editorial inference** means the CLOSER team is translating evidence or product values into unvalidated copy/flow; and **unresolved question** means the answer belongs in the staged pilot or specialist review. Every candidate card in Section 14 is editorial inference, not a validated prompt.

| Source type | What it can support | Transfer caution for SLOW BURN |
|---|---|---|
| Systematic review/meta-analysis | Overall evidence pattern and heterogeneity | Pooled association is not app causation; review quality and included populations still matter |
| Randomized/controlled experiment | Causal effect of the tested manipulation on the measured short-term outcome | Laboratory brush touch, erotic films, wait-list therapy, or one population does not equal this product |
| Dyadic, diary, longitudinal observational study | Within-pair patterns, temporal covariation, partner/actor distinctions | Confounding and reverse causation remain |
| Cross-sectional survey | Prevalence/association at one time in the sampled population | Cannot establish direction; self-selection and measurement limits are common |
| Qualitative study | Language, barriers, variation, mechanisms as experienced | Does not estimate prevalence or effect size; context and researcher interpretation matter |
| Clinical protocol/trial | Feasibility or outcome in a defined treatment population and dose | Do not rebrand a brief consumer experience as treatment or transplant the effect size |
| Official public-health/legal/standards guidance | Normative safety, rights, accessibility, or compliance frame | Not efficacy evidence; law and guidance are jurisdiction- and time-sensitive |
| Community/spiritual/commercial practice | Vocabulary or lived-practice context when clearly attributed | Not scientific validation; unsafe content remains excluded regardless of popularity |

Every transfer judgment asks: Was the sample relevant and inclusive? Was the design causal? Was the tested activity the same? Was the dose/facilitation similar? Was the outcome the one being claimed? Was it measured immediately or over time? Could the shared phone alter the mechanism? If any answer is no or unknown, copy stays descriptive and the feature remains a testable design hypothesis.

### Outcome taxonomy: never collapse these measures

| Outcome | What it means here | What it does not establish |
|---|---|---|
| Subjective desire | Self-reported wanting or interest | Genital response, consent, enjoyment, or relationship benefit |
| Subjective arousal | Self-reported feeling turned on | Genital response, desire, consent, orgasm, or safety |
| Physiological/genital arousal | Instrument-measured bodily response | Desire, pleasure, willingness, consent, satisfaction, or love |
| Pleasantness/comfort | Momentary evaluation of a sensation or interaction | Sexual arousal, therapeutic benefit, or future willingness |
| Sexual satisfaction | Evaluation of sexual life or an encounter | Sexual function, relationship satisfaction, or causation |
| Sexual function | A multidomain clinical/research construct | Satisfaction, consent, relationship quality, or a diagnosis from an app |
| Communication | Frequency, content, quality, disclosure, or observed behavior | Consent validity or a causal relationship improvement |
| Perceived responsiveness | Feeling understood, validated, and cared for | Safety, absence of coercion, or durable relationship change |
| Relationship satisfaction/quality | Evaluation of the relationship | Sexual satisfaction, causation, or universal benefit |
| Usability | Comprehension, findability, burden, and error rate | Safety or efficacy |

This separation is not academic bookkeeping. A meta-analysis of 132 laboratory studies (2,505 women and 1,918 men) found much stronger subjective–genital correspondence in men than women on average, with substantial heterogeneity; the measures cannot be treated as interchangeable ([Chivers et al., 2010, DOI 10.1007/s10508-009-9556-9](https://doi.org/10.1007/s10508-009-9556-9)). A 2026 preregistered laboratory experiment with 110 partnered adults found improved subjective pleasantness/affective valence from romantic-partner touch without corresponding heart-rate, heart-rate-variability, or respiration effects ([Erdélyi et al., 2026, DOI 10.1016/j.ijpsycho.2026.113441](https://doi.org/10.1016/j.ijpsycho.2026.113441)). SLOW BURN must not translate “felt pleasant” into “regulated the nervous system” or “increased physiological arousal.”

## 4. Evidence-to-claim map

| Proposed claim or mechanism | Evidence assessment | Product implication | Permitted claim language |
|---|---|---|---|
| Desire can be contextual and need not always precede activity | Supported as heterogeneity, not a universal sequence | Do not require desire at entry or promise it will emerge; offer low-pressure discovery and an easy end | “Explore what feels welcome now” |
| Excitation and inhibition jointly shape sexual response | Supported theoretical/review framework; individual differences are large | Reduce pressure, distraction, ambiguity, and unwanted stimulation; do not assume adding stimulation wins | “Choose the conditions and pace together” |
| Responsive partner behavior can relate to desire | Promising; one experimental program plus observational work, not an app trial | Recipient-led adjustments and prompt compliance are reasonable design hypotheses | “Practice noticing and responding to each other's choices” |
| Better sexual communication is associated with satisfaction and function | Supported association across many studies; causality and populations vary | Make communication quality, not disclosure quantity, central | “Make it easier to say what fits” — not “improves your relationship” |
| Touch can support positive affect/intimacy | Promising but largely observational and context-dependent | Touch is the content medium, not a guaranteed effect | “A guided touch experience” |
| Slow, light touch is universally more sensual | Not supported as a universal claim; laboratory brush-touch findings are site/task-specific | Offer pace and pressure choices; never prescribe one “correct” speed | “Choose pace together; no speed is expected” |
| A body-area ladder is universal | Contradicted by strong relational/personal variation | Ladder represents consent categories, not inherent erotic rank; recipient names/limits areas | No body map claims |
| Kissing causes relationship or sexual satisfaction | Observational associations only | Kissing may be an optional category with its own gate | “Kissing, if both want it” |
| Mindful attention can improve sexual outcomes | Promising in multi-session clinical interventions; high heterogeneity and population limits | Neutral attention cues may be tested; do not call them mindfulness treatment | “Notice your own comfort; no need to perform” |
| Sensate focus is an evidence-proven template for this app | Not supported | Do not use the name or imply equivalence; clinician-led protocols and evidence differ | None |
| Tantra reliably creates arousal, intimacy, healing, or synchronization | Unsupported | Exclude tantra/energy/chakra claims and ritual authority | None |
| Phone removal itself improves intimacy | Mixed: active use/phubbing has clearer negative evidence than mere presence | Keep active screen interactions brief and test burden directly | “The screen will dim so you can focus on each other” |
| Repeated consent gates guarantee safety | Unsupported and conceptually false | Gates supplement, never replace, ongoing interpersonal consent; measure pressure and errors | “Either person can change or stop at any time” |
| Silence or stillness means yes | False and unsafe; involuntary immobility can inhibit movement/vocalization | Require an active choice at gates; fail closed on timeout/no response | “No clear choice means the action does not begin” |
| A trauma-informed interface prevents trauma or treats survivors | Unsupported | Apply safety, trust, choice, collaboration, and transparency as design principles without clinical claims | “You stay in control of your participation” |
| The experience works equally across bodies and neurotypes | Unsupported | Design adaptable inputs/positions and recruit diverse pilot participants | “Choose any accessible position and reachable place” |

### Direct answers to the thirteen FR-019 questions

1. **No factor reliably creates sexual interest, pleasure, connection, or reduced inhibition for everyone.** The best-supported bounded levers are context, lower inhibition/pressure, high-quality communication, perceived responsiveness, and person-specific sensory fit. Their outcome associations do not promise an effect in this app.
2. **Sensate-focus-style progression outside supervised therapy has thin direct evidence.** A small online couple RCT is promising for selected clinical outcomes, while the broader critical review finds major evidence and implementation gaps. CLOSER must not claim equivalence.
3. **Subjective desire, subjective arousal, genital/physiological arousal, pleasantness, sexual satisfaction, communication, and relationship quality are separate constructs.** Section 3 defines them; the pilot measures them separately and does not use physiology.
4. **Yes, a three-act sequence can avoid a required endpoint** if each act is branch-complete: stay, repeat, step down, no touch, close, and End are equally valid act outcomes.
5. **Use categories 0–6 for the expert-reviewed consumer envelope**—presence, nearness, hands/forearms, recipient-classified non-intimate external areas, embrace/body contact, recipient-named sensual external areas, and kissing. The ladder is a consent taxonomy, not a universal intensity map. Category 7 is pilot-only; category 8+ is out of product.
6. **Interrupt at entry and material category/condition changes, not between repetitions of an unchanged action.** Use recipient direction during touch and a phone gate before a new area class, kissing, bare skin, full-body contact, or any unopened category.
7. **Use one stable low-load vocabulary:** More, Softer, Slower, Not there, Different, Pause, Stop, plus persistent End. Every term has an immediate defined response.
8. **Choose at both times:** masked independent per-category eligibility before starting, then specific just-in-time bilateral gates. The eligible set can be non-contiguous; neither step replaces ongoing interpersonal checking, and masking is not a guarantee of secrecy on a shared physical device.
9. **Not there** removes contact from that area; **Different** stops movement and requires Yes + Yes on one revised proposition; **Slower** changes only pace downward; **More** stops for clarification and a bilateral re-gate before any increase; **Stop** ends the action; **Pause** freezes the experience and expires authorization; **End** unilaterally closes and clears the session.
10. **All sexual interaction state is transient.** Never persist individual choices, shared eligible-category set, body areas, adjustments, role, progress, completion, spoken content, inferred preferences, or incident details in product telemetry.
11. **Appropriate general-consumer suggestions are non-penetrative external touch and optional kissing**, with recipient-named areas, clothing choice, accessible positioning, specific gates, and a no-touch path. Exact sensual/bare-skin copy still requires expert review.
12. **Specialist-only/out-of-product activities** include penetration; exposed genital/breast or oral/anal technique; toys and safer-sex/hygiene decisions; kink/BDSM technique; restraints, impact, breath/neck play; hazardous sensation; medical treatment; and trauma processing.
13. **SLOW BURN is evocative but mis-specifies the model.** Test TOUCH & TEMPO first, with SLOW BURN retained only as a codename until expectation testing.

## 5. Evidence synthesis

### 5.1 Desire and arousal are variable, contextual, and not a staircase

The dual-control model treats sexual response as the balance of excitatory and inhibitory processes, with meaningful individual and contextual variation. A 2023 scoping review mapped 152 papers and also documented gaps and measurement problems; it does not validate a particular app sequence ([Janssen & Bancroft, 2023, DOI 10.1080/00224499.2023.2219247](https://doi.org/10.1080/00224499.2023.2219247)). The incentive-motivation account likewise emphasizes an active motive state, sexually meaningful stimuli, and contextual/cognitive evaluation, rather than a stimulus mechanically causing desire ([Ågmo & Laan, 2023, DOI 10.1080/00224499.2022.2134978](https://doi.org/10.1080/00224499.2022.2134978)). Anticipation may be part of how a personally meaningful incentive is appraised, but no source located establishes that standardized suspense, waiting, dim lighting, music, or a “slow burn” cadence reliably increases desire. Atmosphere remains a user-chosen condition, not a mechanism claim.

Responsive-desire models are useful correctives to the idea that spontaneous desire must always arrive first, but they are not universal rules. Basson's clinical review describes desire that may emerge after willingness and arousal in some women ([Basson, 2008, PMID 18548081](https://pubmed.ncbi.nlm.nih.gov/18548081/)). Yet cross-sectional work finds linear, circular/responsive, mixed, and other patterns rather than one model fitting everyone: one study included 174 heterosexual women, including clinical and nonclinical groups; a Danish online population study analyzed 401 partnered men and 429 partnered women ([Nowosielski et al., 2016, DOI 10.1007/s10508-015-0611-4](https://doi.org/10.1007/s10508-015-0611-4); [Giraldi et al., 2015, PMID 25363341](https://pubmed.ncbi.nlm.nih.gov/25363341/)).

**Design conclusion:** the three acts are a dramaturgical structure, not a biological response curve. “Burn,” “build,” and “closer” must never imply that arousal should rise. Each act needs a stable, lower, and end branch. A person can be willing to try a touch without feeling desire; can feel arousal without wanting more; can enjoy closeness without sexual arousal; and can revoke willingness despite any bodily response.

### 5.2 Communication and responsiveness are the strongest plausible mechanisms—but effects must not be overstated

A meta-analysis of 93 studies and 38,499 partnered people found sexual communication associated with relationship satisfaction (approximately r = .37) and sexual satisfaction (approximately r = .43). Communication quality showed stronger associations than frequency or self-disclosure. The literature was predominantly correlational and moderator patterns cautioned against assuming culture-free effects ([Mallory, 2022, DOI 10.1037/fam0000946](https://doi.org/10.1037/fam0000946)). A separate 48-study meta-analysis found small-to-moderate associations between sexual communication and domains of sexual function, with an overall association around r = .35; again, association does not establish that an app-generated conversation causes improvement ([Mallory et al., 2019, DOI 10.1080/00224499.2019.1568375](https://doi.org/10.1080/00224499.2019.1568375)).

Experimental, couple, and diary studies suggest that perceived partner responsiveness can increase or accompany desire, especially when a partner is experienced as understanding and caring ([Birnbaum et al., 2016, DOI 10.1037/pspi0000069](https://doi.org/10.1037/pspi0000069)). Approach-oriented sexual motives are generally associated with better personal and relational outcomes than avoidance motives such as acting to avoid disappointing a partner; this makes pressure-laden progression especially counterproductive ([Muise et al., 2013, PMID 23812928](https://pubmed.ncbi.nlm.nih.gov/23812928/)).

Communication is also difficult in precisely the moments SLOW BURN enters. An observed-interaction study of 115 established couples found greater anticipatory anxiety around sexual than nonsexual conflict discussions and systematic behavioral differences ([Rehman et al., 2017, DOI 10.1007/s10508-017-1006-5](https://doi.org/10.1007/s10508-017-1006-5)). Thematic analysis of 27 interviews in committed different-gender relationships described verbal, vocal, and bodily communication during sex and barriers to speaking because of mood disruption or anticipated judgment ([Séguin et al., 2024, DOI 10.1080/00224499.2022.2134284](https://doi.org/10.1080/00224499.2022.2134284)). A 2026 dyadic survey of 112 queer couples found communication quality a unique actor-level correlate after multiple dimensions were considered, while partner effects did not remain; it usefully expands representation but does not establish a causal universal ([Sorg et al., 2026, DOI 10.1080/00224499.2026.2630962](https://doi.org/10.1080/00224499.2026.2630962)).

**Design conclusion:** the mechanism to test is a small interactional loop: propose → choose independently → resolve conservatively → recipient directs → giver responds → either person can stop. Do not make disclosure, vulnerability, arousal, or escalation the success condition. Measure whether choices were understood, enacted, and easy to revise.

### 5.3 Touch findings support choice, not a universal technique

A systematic review of 18 experimental studies found that texture, force, velocity, duration, and site shape perceived pleasantness. In a common laboratory paradigm, soft brush strokes around 3 cm/s on the forearm were often rated more pleasant than much faster strokes ([Taneja et al., 2021, DOI 10.1007/s00426-019-01253-8](https://doi.org/10.1007/s00426-019-01253-8)). That finding concerns controlled brush stimulation on particular skin sites. It is not evidence that 3 cm/s is an erotic optimum, that hand touch works the same way, or that slow is always better.

Cross-cultural body-touch maps from 1,368 participants show that which body regions are acceptable to touch varies strongly by relationship and person ([Suvilehto et al., 2015, DOI 10.1073/pnas.1519231112](https://doi.org/10.1073/pnas.1519231112)). This supports a category-and-choice model, not a fixed body map. Hands, face, hips, thighs, or kissing can be low intensity for one person and highly intimate or unwelcome for another.

A one-week, four-times-daily diary study of 102 dating couples associated touch with momentary affect and intimacy; a cross-sectional survey of 1,156 partnered women associated affectionate-touch frequency with body and relationship outcomes. Neither design establishes direction or rules out relationship quality as a common cause ([Debrot et al., 2013, DOI 10.1177/0146167213497592](https://doi.org/10.1177/0146167213497592); [Campbell et al., 2025, DOI 10.1080/00224499.2024.2310705](https://doi.org/10.1080/00224499.2024.2310705)). Post-sex affectionate behavior was associated with sexual and relationship satisfaction in a cross-sectional sample of 335 people and a 101-couple daily/follow-up study, not proven to produce it ([Muise et al., 2014, DOI 10.1007/s10508-014-0305-3](https://doi.org/10.1007/s10508-014-0305-3)). Kissing frequency is associated with sexual and relationship satisfaction in observational samples, including a national survey of 878 people in relationships of at least two years, but kissing is culturally variable and causal claims are unwarranted ([Busby et al., 2022, DOI 10.1080/0092623X.2021.1977747](https://doi.org/10.1080/0092623X.2021.1977747); [Wlodarski & Dunbar, 2013, DOI 10.1007/s10508-013-0190-1](https://doi.org/10.1007/s10508-013-0190-1)).

**Design conclusion:** every card presents variables, not prescriptions. The receiver may propose still/moving, lighter/firmer, slower/faster, shorter/longer, clothed/direct-skin where eligible, or no touch; a material change begins only after the exact revision receives Yes + Yes. “Slow” is a selectable pacing aesthetic, not a scientifically optimal technique.

### 5.4 Sensate focus, mindfulness, and digital interventions do not validate this product

Sensate focus originated as a structured component of Masters and Johnson's intensive clinical program. A critical review found sparse efficacy evidence and limited reporting of what was actually implemented; early samples were disproportionately reasonably functional, financially stable, White, heterosexual, and able-bodied couples ([Linschoten et al., 2016, DOI 10.1080/14681994.2015.1127909](https://doi.org/10.1080/14681994.2015.1127909)). A small 2024 wait-list randomized trial of an eleven-video online sensate-focus program in 35 Chinese heterosexual couples reported selected improvements, particularly in women and low-baseline subgroups. It remains a small clinical-style, multi-session intervention and does not validate a brief enrichment pack ([Huang et al., 2024, DOI 10.1080/0092623X.2024.2355229](https://doi.org/10.1080/0092623X.2024.2355229)).

Internet/mobile interventions for sexual dysfunction show promising but heterogeneous results. A meta-analysis of 12 RCTs (n = 952) reported improvements for some female outcomes, high heterogeneity, smaller or nonsignificant male outcomes, and dropout/bias concerns ([Zarski et al., 2022, DOI 10.1038/s41746-022-00670-1](https://doi.org/10.1038/s41746-022-00670-1)). These programs generally include education, cognitive/behavioral exercises, clinician or program support, and repeated sessions. They are not evidence for one live touch session.

Mindfulness-based cognitive interventions may improve self-reported sexual function or distress in treatment-seeking women, but studies are multicomponent and heterogeneous ([Çuvadar et al., 2025, DOI 10.1080/19317611.2024.2414064](https://doi.org/10.1080/19317611.2024.2414064); [Brotto & Basson, 2014, DOI 10.1016/j.brat.2014.04.001](https://doi.org/10.1016/j.brat.2014.04.001)). In one laboratory study, a mindfulness task increased subjective arousal while genital response moved differently, again showing why outcomes must remain separate ([Velten et al., 2018, PMID 29261339](https://pubmed.ncbi.nlm.nih.gov/29261339/)).

**Design conclusion:** neutral attention cues such as “notice your own comfort” or “there is no need to match” are reasonable editorial choices. Avoid “mindfulness,” “sensate focus,” “somatic,” “nervous-system,” “therapeutic,” and clinical outcome claims unless the product itself is evaluated under an appropriate protocol.

#### Attention, interoception, “spectatoring,” and non-goal orientation

A systematic review of 67 eligible studies found consistent associations between sexual function/dysfunction and cognitive distraction, attentional focus, automatic thoughts, causal attributions, efficacy expectations, and perceived performance demands in women and men. The review concerns prediction and clinical formulation, not a consumer-app manipulation, and included heterogeneous methods ([Tavares et al., 2020, DOI 10.1016/j.sxmr.2020.03.002](https://doi.org/10.1016/j.sxmr.2020.03.002)). “Spectatoring” is a clinical/theoretical label for monitoring oneself as if from an observer's perspective; body surveillance and sexual self-consciousness are associated with worse sexual outcomes in some samples, but self-focus is not uniformly harmful and the causal account remains more complex than the label suggests.

Interoceptive attention is likewise not an instruction to search for genital response. In the 41-woman laboratory experiment cited above, a brief body-focused task moved subjective and genital arousal in different directions. Clinical mindfulness programs combine repeated attention practice with education and therapy. CLOSER therefore may invite awareness of **comfort, pain, tension, desire for space, and preference**, but should not ask users to detect arousal, match breathing, close their eyes, report bodily changes, or interpret a response as readiness.

“Non-goal-oriented” is an editorial/safety principle here: cards do not set arousal, orgasm, penetration, disclosure, reciprocity, or maximum intensity as a target. The evidence does not show that removing a goal will reliably improve experience; the design value is that it removes a source of product-created performance pressure.

### 5.5 Tantra is a naming and claims hazard, not an evidence base

Searches did not identify robust controlled evidence for a standardized “tantric” package that supports SLOW BURN's intended effects. An older clinical article proposed tantra-derived exercises rather than testing a product effect ([Voigt, 1991, DOI 10.1080/00926239108404345](https://doi.org/10.1080/00926239108404345)). Wade's systematic review of sex-triggered altered/spiritual experiences—journal volume dated 2021 and online metadata dated 2022—characterized empirical work as being in its infancy and drew on small, scattered studies; it does not validate tantric techniques or commercial promises ([Wade, DOI 10.24972/ijts.2021.40.1.58](https://doi.org/10.24972/ijts.2021.40.1.58)).

**Design conclusion:** do not use tantra, energy flow, chakra, sacred sexuality, breath synchronization, polarity, awakening, detoxification, hormone, or extended-orgasm claims. Slow pacing, attention, ritualized entry, and recipient direction can be selected on their own merits without borrowing spiritual or clinical authority.

### 5.6 Consent: an interface can support communication but cannot manufacture valid consent

Consent research distinguishes internal willingness from external communication and documents ambiguity, nonverbal behavior, social scripts, and contextual pressure ([Muehlenhard et al., 2016, DOI 10.1080/00224499.2016.1146651](https://doi.org/10.1080/00224499.2016.1146651); [Jozkowski et al., 2014, DOI 10.1007/s10508-013-0225-7](https://doi.org/10.1007/s10508-013-0225-7)). A product can make an active choice easier to express, but a tap can still occur under coercion, fear, dependency, intoxication, deception, or misunderstanding.

Silence, freezing, or lack of resistance must never resolve to yes. A systematic review and meta-analysis of 27 tonic-immobility studies describes involuntary motor and vocal inhibition in trauma contexts; tonic immobility was associated with post-traumatic symptoms, though the literature has important limitations and does not estimate what occurs in this product context ([Coimbra et al., 2023, DOI 10.1016/j.janxdis.2023.102730](https://doi.org/10.1016/j.janxdis.2023.102730)). Official Canadian guidance describes sexual consent as specific and ongoing, and withdrawn consent as effective at any time ([Women and Gender Equality Canada](https://www.canada.ca/en/women-gender-equality/campaigns/gender-based-violence-its-not-just/sexual-violence-and-consent.html)).

SAMHSA's trauma-informed principles—safety; trustworthiness/transparency; peer support; collaboration/mutuality; empowerment/voice/choice; and cultural, historical, and gender considerations—are useful design lenses, not proof that an app prevents or treats trauma ([SAMHSA, 2014, official PDF](https://library.samhsa.gov/sites/default/files/sma14-4884.pdf)). A 2025 systematic review found only three trauma-informed sexuality-education interventions meeting its criteria, underscoring the evidence gap ([Evans-Mitchell et al., 2025, DOI 10.1080/19317611.2025.2464565](https://doi.org/10.1080/19317611.2025.2464565)).

WHO's working definition frames sexual health through a positive and respectful approach and the possibility of pleasurable and safe experiences free of coercion, discrimination, and violence ([WHO, Defining sexual health](https://www.who.int/teams/sexual-and-reproductive-health-and-research/key-areas-of-work/sexual-health/defining-sexual-health)). This is a normative public-health frame, not evidence that SLOW BURN delivers pleasure or safety.

**Design conclusion:** require an active bilateral choice before every exact physical start or restart and every materially changed action or condition, but state plainly that the people—not the app—must keep checking and responding. A gate opens only the displayed exact action under its displayed conditions. It expires when contact stops, any condition changes, either person hesitates or shows distress, Pause or End is used, or screen visibility/session continuity is lost.

### 5.7 Body image and exposure

A review of 57 studies in women links body-image cognitions and self-consciousness with sexual functioning and experience, although much of the evidence is observational and gender-limited ([Woertman & van den Brink, 2012, DOI 10.1080/00224499.2012.658586](https://doi.org/10.1080/00224499.2012.658586)). A cross-sectional study of 243 adults reporting a recent app-facilitated hookup also associated body self-consciousness during partnered encounters with lower sexual-function domains in women and greater erection difficulty in men, without establishing causation ([Ramseyer Winter et al., 2020, DOI 10.1016/j.bodyim.2020.05.010](https://doi.org/10.1016/j.bodyim.2020.05.010)).

**Design conclusion:** never rate bodies, request appearance comparisons, force eye contact or observation, require undressing, prescribe mirrors or light levels, or imply that discomfort about exposure should be overcome. Remaining clothed, changing light, looking away, and choosing a non-touch branch remain available throughout.

### 5.8 Disability, chronic pain, and neurodivergence require adaptable interaction—not an “edge-case” mode

WHO and UNFPA affirm that people with disabilities have the same sexual and reproductive health needs while facing substantial informational, attitudinal, and service barriers ([WHO/UNFPA, 2009](https://www.who.int/publications/i/item/9789241598682)). Systematic reviews associate chronic musculoskeletal pain with changes in sexual function, intimacy, relationships, and body image, while noting that evidence is frequently cross-sectional and methodologically limited ([Briggs et al., 2022, DOI 10.1002/acr.24711](https://doi.org/10.1002/acr.24711); [Katz et al., 2021, DOI 10.1093/pm/pnaa451](https://doi.org/10.1093/pm/pnaa451)).

Qualitative research drawing on five books, 13 forums (72 unique usernames), and 49 survey narratives describes autistic sensory sensitivity and sensation seeking across touch, sound, sight, and smell. Separate interviews with 24 autistic adults describe explicit, intentional communication and individualized sensory/script adaptations ([Gray et al., 2021, DOI 10.1089/aut.2020.0049](https://doi.org/10.1089/aut.2020.0049); [Barnett & Maticka-Tyndale, 2015, PMID 26418175](https://pubmed.ncbi.nlm.nih.gov/26418175/)). These qualitative sources illuminate variation but do not estimate prevalence. Evidence for autism-specific sensory-sexuality curricula remains thin; an exploratory 2026 survey of 29 licensed professionals across nine disciplines identified training/resource gaps and no known sexuality curriculum specific to autistic sensory-processing needs ([Gray et al., 2026, DOI 10.1007/s10803-026-07380-7](https://doi.org/10.1007/s10803-026-07380-7)).

**Design conclusion:** avoid assumed positions, anatomy, handedness, vision, hearing, speech, stamina, pain tolerance, mobility, or sensory preferences. Use “a reachable place” rather than left/right; allow sit/lie/stand/reposition; give text, icon, and tappable alternatives; remove countdowns; support long processing time; make scent/music optional rather than atmospheric defaults; and treat pain as a stop/adjust signal, never something to breathe or stretch through.

### 5.9 The phone should recede because active use is disruptive; mere-presence claims are weak

A 43-study meta-analysis found relatively consistent negative associations between active phone use/phubbing and partner perceptions, while its six “mere presence” studies showed no reliable effect ([Courtright & Caplan, 2020, DOI 10.17161/hct.v1i2.13412](https://doi.org/10.17161/hct.v1i2.13412)). An influential phone-presence experiment ([Przybylski & Weinstein, 2013, DOI 10.1177/0265407512453827](https://doi.org/10.1177/0265407512453827)) failed a later direct replication ([Linares & Sellier, 2021, DOI 10.1371/journal.pone.0251451](https://doi.org/10.1371/journal.pone.0251451)). Randomized field work finds active phone use can reduce enjoyment through distraction ([Dwyer et al., 2018, DOI 10.1016/j.jesp.2017.10.007](https://doi.org/10.1016/j.jesp.2017.10.007)), and a 14-day diary study of 173 couples found worse daily relational outcomes on higher-technoference days, which remains observational at the day level ([McDaniel & Drouin, 2019, DOI 10.1016/j.chb.2019.04.027](https://doi.org/10.1016/j.chb.2019.04.027)).

Digital couple interventions can have beneficial outcomes, but a 2025 meta-analysis concerns multi-component relationship programs, not in-the-moment touch prompts ([Kernová et al., 2025, DOI 10.1186/s40359-025-03444-y](https://doi.org/10.1186/s40359-025-03444-y)).

**Design conclusion:** minimize active screen time and handoffs, but do not market “putting the phone away” as scientifically proven to create intimacy. Test whether the specific screen cadence interrupts or supports this experience.

## 6. Supported mechanism model versus speculation

### Testable mechanism chain

The most defensible causal hypothesis for the prototype is deliberately narrow:

1. A clear proposal reduces uncertainty about what is being considered.
2. Independently entered, interface-masked choices may reduce immediate face-to-face performance pressure relative to one person answering for both.
3. Conservative resolution prevents one person's higher preference from setting the shared action.
4. A small vocabulary makes adjustment easier during touch.
5. Immediate, non-defensive response to adjustment may increase perceived responsiveness.
6. Brief screens and self-paced intervals may reduce distraction.
7. These changes may improve immediate autonomy, comfort, pleasantness, perceived communication, and satisfaction with the session.

Steps 2, 3, 4, and 6 are product hypotheses and must be tested. Step 5 is grounded in responsiveness/communication literature but has not been established for this interface. Step 7 is an empirical question.

### Speculative chains that must not enter copy

- Slow touch → C-tactile activation → vagal tone/oxytocin → bonding.
- Eye contact or matched breathing → physiological synchrony → intimacy.
- Gradual escalation → responsive desire → orgasm.
- A consent tap → safe or trauma-informed sex.
- A body-first exercise → bypasses anxiety or heals sexual difficulty.
- Kissing → relationship satisfaction.
- Tantra/mindfulness language → evidence-based benefit.

These may sound plausible, but the cited evidence does not validate them as a product mechanism. No physiological sensing, scoring, inference, or “readiness” model should be built.

## 7. Interaction architecture

### 7.1 Core rule: the shared minimum, not the average

At every decision, the product resolves to the least permissive shared option. It never averages preferences, lets the more eager participant choose, reveals who selected the lower option, or frames non-escalation as a failed round.

Three dimensions must remain independent:

| Dimension | Examples | Rule |
|---|---|---|
| Route length | Quick, Standard, Unhurried | Changes number of invitations and dwell opportunities, never the maximum touch intensity |
| Eligible-category set | No touch, hands/arms, embrace, kissing, sensual external, pilot-only intimate external | Chosen independently per category; the shared set is the intersection and may be non-contiguous |
| Current action details | Receiver, location, clothing, pace, pressure, movement, duration, position | Specific to one action; changes require confirmation where material |

A long route can remain entirely no-touch or use only one low-intensity category. A short route may propose kissing when kissing is in the shared eligibility set; unrelated categories do not have to be opened first. Neither route is “more complete.”

### 7.2 Touch-category ladder

This is a **consent and content taxonomy**, not a universal intensity or arousal ranking. The UI should call it “touch choices,” not a “heat level.” Each participant privately marks categories they are willing to have proposed. The active shared eligibility set is the intersection of those choices and may be non-contiguous: kissing can be eligible while scalp touch is not, for example. Eligibility is not authorization; every proposed action still needs its just-in-time gate.

| Category | Candidate content | Gate | V1 status |
|---|---|---|---|
| 0 — Presence | Environment, distance, eye direction, conversation, no touch | Entry only | Core |
| 1 — Nearness/gesture | Sit or lie nearer/farther; mirror a hand gesture without contact | Before moving closer if proposed | Core |
| 2 — Hands/forearms | Palm contact, still hand, traced forearm, receiver demonstrates pace/pressure | First-touch gate | Core |
| 3 — Recipient-classified non-intimate external areas | Shoulder, upper back, scalp, face, or another reachable place only when the recipient classifies that exact place as non-intimate for this action | New-area gate | Core |
| 4 — Embrace/body contact | Side-by-side contact, hug, cuddle, or another accessible form in which each person supports their own weight and controls their movement | Body-contact gate | Core |
| 5 — Sensual external areas | Abdomen, side of torso, hips, outer legs, or another recipient-named area; over clothing by default; excludes chest/breasts, buttocks, inner thighs, genitals, and anus in public V1 | Sensual-area gate; direct skin is a separate, restricted gate | Expert-reviewed core candidate |
| 6 — Kissing | Forehead/cheek/another named non-mouth kiss; mouth kiss; single or continuing | First-kiss gate; mouth is distinct | Expert-reviewed core candidate |
| 7 — Personally named intimate external area | Recipient explicitly names a place; no penetration; prototype over clothing only | Dedicated Act III gate and exact conditions | Moderated pilot only |
| 8+ — Specialist domain | Exposed genital/breast technique, oral/anal/genital contact, penetration, toys, kink/BDSM technique, safer-sex decisions | Not offered | Out of product |

Body areas are not inherently neutral or intimate. Category labels are editorial routing aids. If a person treats a proposed area as more intimate than its product category, their classification wins. “Another place” always means an explicitly named, reachable external place that is both jointly eligible and specifically opened—not an invitation to improvise beyond it.

Do not preselect face, hair/scalp, chest, breasts, abdomen, hips, buttocks, inner thighs, genitals, prostheses, mobility devices, scars, tattoos, or assistive-device interfaces as welcome. Hair and face touch can be intensely personal; hips or legs may be painful; a device can be part of personal space. All require recipient selection.

### 7.3 Three-act physical model

The acts create rhythm and narrative orientation. They are not a promise of rising desire and do not correspond to physiological stages.

#### Act I — ARRIVE / ANKOMMEN

**Purpose:** establish accessible conditions, individual awareness, easy communication, and low-intensity contact if chosen.

**Content envelope:** categories 0–3. Environment; distance; position; no-touch baseline; hands/forearms; receiver demonstration; one selected external area that the recipient classifies as non-intimate for this action. Eye contact, matched breathing, undressing, and disclosure are never required.

**Required gates:** entry; shared eligible-category set; first touch; first new body-area category.

**Exit branches:** stay with no touch, repeat a welcome action, step back, proceed to Act II, Pause, or End.

**Editorial test:** an Act I card should still work for clothed participants seated apart, for a participant using one hand, and for a pair who never make eye contact.

#### Act II — BUILD / AUFBAU

**Purpose:** let the receiving person shape pace, pressure, movement, area, and closeness; practice visible responsiveness without requiring escalation.

**Content envelope:** categories already opened, plus an optional embrace/body-contact gate, sensual-external gate, and first-kiss gate. Cards vary one dimension at a time. Repetition and return are legitimate choices.

**Required gates:** every unopened category; first kiss; first mouth kiss if earlier kiss was elsewhere; clothing-to-bare-skin change; any newly named more-intimate area.

**Exit branches:** keep the currently open choices, repeat a favorite, step back, proceed to Act III, Pause, or End.

**Editorial test:** “build” must be satisfied by richer information or responsiveness—not greater sexual intensity. A pair who learns that a still hand on a forearm feels best has successfully completed the act.

#### Act III — CHOOSE / WÄHLEN

**Purpose:** make the final direction explicit: stay, vary something within an opened category, consider a different eligible category, de-escalate, or close.

**Content envelope:** any earlier category; optional longer kissing; optional sensual external touch; and, only in a moderated prototype, one personally named intimate external area over clothing. The app does not name anatomy or give intimate technique.

**Required gates:** Act III direction; every unopened category; any change in clothing or body-area conditions.

**Exit branches:** repeat, step down, move to care/space finale, or End immediately.

**Editorial test:** Act III must not read like a climax. No action assumes erection, lubrication, orgasm, penetration, removal of clothing, or sex after the app.

### 7.4 Route design and pacing

The current conversation-pack convention of 12/24/36 prompts is too screen-heavy for enacted touch if each item interrupts the pair. Prototype a lower card count with longer participant-controlled intervals:

| Route | Target experience, not timer | Suggested action invitations | Act allocation | Notes |
|---|---|---:|---:|---|
| Quick | roughly 15–25 minutes if the pair chooses | 9 | 3/3/3 | All three acts; Act III can be a close-only choice |
| Standard | roughly 30–50 minutes | 15 | 5/5/5 | Recommended first moderated prototype |
| Unhurried | roughly 45–70 minutes | 21 | 7/7/7 | Only after burden testing; avoid the label “Full,” which may imply maximum intensity |

These are planning ranges, not countdowns. No card auto-advances. No elapsed-time target is shown. The pair can tap “Ready” whenever they are finished, skip any action, repeat one, or end early. The route should dynamically avoid reopening already declined categories during the same volatile session.

Use a small number of physical action invitations, each with its exact-action gate. A gate is not entertainment content and should not be counted as a “round.” Uninterrupted repetition within one unchanged accepted action should happen away from the phone; do not generate a new card merely to sustain activity. Once contact stops, any restart requires a newly stated exact proposition and fresh Yes + Yes.

### 7.5 Bilateral choice protocol

#### Choice vocabulary

At an exact-action gate, each participant gets the same three masked one-at-a-time options:

- **YES / JA** — this displayed exact action under these displayed conditions is welcome to try now;
- **ADJUST / ANPASSEN** — willing only if something changes; and
- **SKIP / AUSLASSEN** — do not do this; move to an equal-status alternative.

Persistent controls add:

- **PAUSE / PAUSE** — stop the current interaction now and show only continuation/de-escalation/end choices; and
- **END / BEENDEN** — end immediately without asking why.

“Next” should not be used as the English negative choice because it can mean “advance/escalate.” If product vocabulary must retain “Next,” pair it with “Skip this / Überspringen” and an unmistakable next-card icon; do not label it as “Not ready yet,” which can imply future obligation.

#### Masked one-at-a-time shared-device sequence

1. Show the exact proposed action and conditions to both people.
2. Participant A takes the phone and chooses while Participant B looks away.
3. The app immediately masks the choice and shows a neutral handoff screen.
4. Participant B chooses while Participant A looks away.
5. Alternate who chooses first at the next gate.
6. Resolve without revealing either individual selection.
7. Clear both raw choices immediately after resolution.

The handoff screen must not leak the first choice through color, animation, sound, haptics, button position, delay, disabled options, or accessible labels. Screen-reader announcements must also be neutral. Throughout this memo, “private” means **entered independently and masked by the interface**, not guaranteed secret from a person physically beside the device. Shoulder-surfing, body language, sequence, or a later route can still permit inference. The entry preview must say so; if a participant cannot shield or independently operate the choice screen, offer a reviewed accessible alternative or a spoken bilateral check rather than claiming privacy.

#### Resolution table

| A | B | Shared result | Copy behavior |
|---|---|---|---|
| Yes | Yes | Open this exact action under its displayed conditions now | “This exact option is open to try now. Either person can still decline or stop; every restart or material change needs a fresh exact Yes + Yes.” |
| Yes | Adjust | Adjust | Show neutral adjustment menu; do not identify who chose Adjust |
| Adjust | Adjust | Adjust | Same neutral menu |
| Any | Skip | Skip | Move to an equal-status alternative or close; no reason request |
| Any | Pause | Pause | Freeze interaction; show Pause state only |
| Any | End | End | Clear volatile state; go to neutral end screen |
| No response | Any | Unresolved/closed to action | Never infer yes and never start a countdown; either person can choose, abandon the proposal, Pause, or End |
| App backgrounded / visibility lost / device locked / refresh / crash | Any | Session ended | Clear all volatile state; returning starts again at adult entry, never at the gate or action |

There should be no timeout that pressures a response. “No response” is an engineering state rule, not a visible countdown.

#### Adjustment dimensions

The adjustment screen offers independent, nonjudgmental choices:

- different area;
- over clothing / no clothing change;
- lighter / firmer;
- slower / faster;
- still / moving;
- shorter / no duration target;
- more distance / different position;
- switch receiver / keep receiver;
- non-touch alternative;
- skip; or
- end.

After adjustments, both choose Yes/Adjust/Skip again on the revised proposition. There is no negotiation screen that asks one person to persuade the other.

### 7.6 In-action vocabulary

Every action card carries the same compact spoken/tappable vocabulary:

| English | German | Required response |
|---|---|---|
| More | Mehr | Stop and clarify what is proposed; never increase automatically. If pressure, pace, duration, movement, closeness, area, clothing, or combined actions would change, show the revised proposition and obtain Yes + Yes first |
| Softer | Sanfter | Reduce pressure/intensity immediately |
| Slower | Langsamer | Slow the movement immediately |
| Not there | Nicht dort | Leave that body area immediately; do not move to an adjacent place; return to area adjustment or Skip |
| Different | Anders | Stop movement, identify one proposed change, and obtain Yes + Yes on the revised proposition before resuming; a request for less, more space, Pause, or Stop takes effect immediately |
| Pause | Pause | Hands/body stop; create space if requested; open Pause state |
| Stop | Stopp | End that action immediately; no why, persuasion, or automatic substitute |

This vocabulary is not a replacement for any other word, sound, gesture, communication aid, or removal of contact. The entry card says: “Any sign of hesitation or discomfort means stop and check; silence is not a yes.” Participants can preselect a personal stop signal or use the persistent on-screen controls.

### 7.7 Check-in cadence: enough to be specific, not so much that it becomes performative

Always gate:

1. entry into the adult experience;
2. the shared per-category eligibility set for this session;
3. first touch;
4. first use of a new body-area/content category;
5. first embrace/full-body-contact category;
6. first kiss, and first mouth kiss if different;
7. any clothing-to-bare-skin change;
8. entry into Act III's pilot-only intimate external category; and
9. any material change after Pause or uncertainty.

Do not force a phone handoff between every repeated stroke or unchanged moment. Within a currently agreed action, either person may request less, more space, Pause, or Stop immediately. A request for any other material change—including more pressure, faster pace, longer duration, movement, greater closeness, a different area, clothing change, or combined action—stops the action and returns to a bilateral gate. Recipient direction never overrides the giver's willingness.

At natural act transitions, ask privately:

- stay with the currently open choices;
- consider another eligible category;
- step back; or
- end.

No transition copy should say “ready for more?” because “more” frames escalation as expected. Prefer “What fits now?”

## 8. Full experience flow

### 8.1 Entry

1. **Adult-library disclosure.** SLOW BURN is hidden under the existing collapsed 18+ library. The library screen explains touch-forward content before launch.
2. **Privacy preview.** “Your choices and actions are not saved, and this session cannot be resumed. On-screen choices are masked but cannot be guaranteed secret from someone beside the phone. Shield the screen and turn off notification previews if you wish.”
3. **Eligibility and capacity statement.** Each participant independently confirms: adult under applicable law; awake; able to decide; not pressured; free to stop; willing to consider this experience now. The app cannot verify these conditions and must say so.
4. **Health/environment check.** Neutral prompts: choose a private lawful place; stop for pain, numbness, dizziness, breathing difficulty, distress, or feeling unwell; do not use the experience while driving or responsible for a safety-critical task. The app does not ask for diagnoses.
5. **Access setup.** Choose text size/contrast, reduced motion, screen reader, read-aloud only if privacy-safe, tap/keyboard/switch input, no audio, and any sensory setup change. Either person can reposition at any time.
6. **Personal stop signal.** Offer the common Pause/Stop vocabulary plus “use any signal you already share.” Do not require disclosure of why it may be needed.
7. **Independent category eligibility.** Each person privately marks every category they are willing to have proposed, independently rather than as one maximum level. The app computes the intersection, deletes the individual selections, and retains only that shared set in volatile memory. It does not reveal who excluded a category. The shared set controls routing only; it grants no action.
8. **Baseline.** Offer “begin with space/no touch” and require a separate first-touch gate even when touch categories are in the shared eligible set.

The capacity statement must not become a liability waiver or imply that a tap proves capacity. Legal counsel must review age, jurisdiction, intoxication, and duty-of-care copy.

### 8.2 Card microcycle

Each action follows the same predictable loop:

1. **Orient:** one sentence names the action and receiver role.
2. **Choose:** if the category/condition is new, both privately choose Yes/Adjust/Skip.
3. **Set:** receiver names or demonstrates area, pace, pressure, position, and clothing condition as relevant.
4. **Act:** phone shifts to a dim, low-information safety surface; participants proceed at their own pace.
5. **Respond:** giver changes/stops immediately on any cue.
6. **Return:** either person taps Ready, Repeat, Change, Step back, or End.
7. **Clear:** transient choices from the action are erased before the next card.

Avoid ambiguous reciprocal wording such as “touch each other.” Name one receiver and one giver, then offer a separately chosen role switch. This reduces simultaneous-action confusion and lets the receiver focus on sensation and direction.

### 8.3 Pause state

Pause must be available from every screen and during the dim interval. It is not a skip and is not scored.

On Pause:

1. all touch stops;
2. the display becomes visually calm and shows only **Continue / Step back / End**;
3. “Continue” requires both people to choose it privately;
4. any prior action authorization is expired; continuing reopens the exact action or a lower alternative through a new gate;
5. no timer, breathing exercise, reassurance script, or reason request appears; and
6. a device lock/background/crash is treated as closed, not continued.

The screen may add: “Take the space you need. You do not have to decide together.” This is especially important if one participant wants to leave.

### 8.4 Adjust and de-escalate

Adjustment is successful use, not a near-failure. “Different” stops movement first, then shows one-variable changes. “Step back” lowers the current category without revealing who requested it. The route engine offers an equal-status alternative such as no touch, hands, or space; it never immediately reproposes the declined category.

The content model should enforce a cooldown. After Skip, the declined action/category is removed from automatic routing for the remainder of the act. After Step back, the category that prompted it and all unopened categories close for the remainder of the act unless both participants deliberately choose “review our range.” After a distress or pain signal, all unopened categories and all intensity increases remain closed for the rest of the session; offer only no touch, space, End, or a separately reconfirmed previously comfortable action.

### 8.5 End

End is one tap from any screen, requires no bilateral confirmation, and immediately:

- terminates the action;
- clears all volatile session data;
- suppresses celebratory animation, streaks, completion scores, and “you made it” language;
- displays neutral practical choices: space, quiet, water, a check-in, an already-opened low-intensity touch, or close the app;
- provides urgent-help language only when a participant deliberately opens Help; and
- does not ask why, who ended, what happened, or whether they had sex.

If a person selects “check in later,” do not schedule a notification by default. A device notification could expose sensitive context. At most provide a non-persisted suggestion for the people to agree on their own reminder.

## 9. Screen, handoff, and phone-presence specification

### 9.1 Screen states

| State | Visible content | Brightness/attention | Safety controls |
|---|---|---|---|
| Orientation | One concise card; role; eligible alternatives | Normal readable | Pause and End fixed |
| Private choice | Proposal plus Yes/Adjust/Skip for one participant | Normal readable; privacy shield guidance | Pause and End fixed |
| Handoff | “Pass the phone” only; no result cues | Neutral | End fixed; Pause if action already active |
| Shared result | Open/adjust/skip result; no attribution | Brief | Pause and End fixed |
| Touch interval | Minimal current action summary; compact cue words | Dim, no animation, no countdown | Large Pause and End; Ready/Change |
| Pause | Continue/Step back/End only | Calm, high contrast | End fixed |
| End | Neutral close/care choices | Calm; no celebration | Close/help |

The persistent controls must remain accessible without holding the phone. Place the device on a stable, reachable surface. Do not instruct placing it out of reach. Do not use a hardware volume key as the only stop control because platform behavior and accessibility vary.

### 9.2 Handoff rules

- Alternate first chooser at gates to avoid a stable leader/follower role.
- Never hand off during touch; stop contact first.
- Mask the prior choice before handoff, including in the accessibility tree.
- Use no haptic/audio confirmation that reveals a choice.
- Do not show a “both said yes” celebration; use neutral state copy.
- Keep handoffs to category transitions, not every action repetition.
- Offer a tabletop mode with 180-degree rotation or two-sided readable confirmation so participants with limited reach need not pass the device.
- Ensure the flow works with one participant operating the device for accessibility while choices remain private through headphones/screen-reader routing or a reviewed alternative. If privacy cannot be preserved in that configuration, say so and use spoken bilateral checking rather than pretending choices are private.

### 9.3 Interruptions

Before entry, suggest Do Not Disturb and hidden notification previews as optional operating-system settings. Never change them without explicit OS-level authorization. No autoplay audio, notification, vibration, confetti, or screen flash should interrupt a touch interval. On an incoming interruption, the action authorization closes; returning shows a new Continue/Step back/End gate.

## 10. Private moments, finales, and PLAYFUL mode

### Private moments

**Do not use secret or asymmetric action cards.** A hidden instruction to touch, surprise, withhold information from, test, observe, or manipulate the other person is incompatible with specific consent. The only private interaction is an independent readiness/category choice, and the output is a shared conservative result.

An optional private reflection may ask “What range fits you now?” solely to set the gate. It must not ask for a fantasy, body preference, trauma history, diagnosis, sexual orientation, or reason; must not be retained; and must not generate personalized content.

### Finales

The finale is not a physical escalation or reward. Offer a bilateral menu:

- quiet space with no touch;
- sit or lie near each other;
- hold hands;
- an already-opened embrace/cuddle;
- water or a practical comfort step;
- say one simple check-in sentence; or
- close now.

If one chooses space and the other chooses touch, space wins. There is no secret finale and no Q37-style extra prompt. Do not say “aftercare” by default because it can import kink/clinical assumptions; “close” or “care and space” is clearer.

### PLAYFUL mode

SLOW BURN should **not inherit the existing PLAYFUL modifier**. Exclude:

- countdowns or speed pressure;
- PREDICT, BOTH, SAME, simultaneous reveal, scores, streaks, or competition;
- dares, penalties, forfeits, chance-based escalation, spin/random mechanics, and “be brave” language;
- surprise touch, eyes-closed touch by default, guessing who/where/how, or concealed props; and
- teasing a participant for Skip, Pause, adjustments, or a narrower/lower range.

If the team later tests a lighter presentation, call it “Sensory choices,” not PLAYFUL, and limit it to benign selection among texture, still/moving, music/no music, light, distance, or position. It must preserve the same gates and must be separately reviewed.

## 11. Prohibited and specialist-only content

### 11.1 Always prohibited in product prompts

The app must never instruct, encourage, sequence, randomize, time, score, or normalize:

- pressure on the neck, strangulation, choking, breath restriction, suffocation, smothering, gagging, or restricting airway/blood flow;
- restraint, bondage, tying, trapping, pinning, blocking exits, or making movement/communication harder;
- hitting, impact, slapping, punching, kicking, biting that may break skin, or pain as a target;
- cutting, needles, blood, burning, fire, electrical stimulation, hot wax, ice/extreme temperature, irritants, allergens, or caustic substances;
- intoxicants or substances as a facilitator; activity with an asleep, unconscious, incapacitated, or unaware person;
- surprise physical/sexual contact, consensual-non-consent scripts, resistance play, coercion roleplay, humiliation, threats, degradation, or blackmail;
- filming, photography, audio recording, streaming, location sharing, or creation/exchange of sexual media;
- public, unlawful, driving, machinery, water-submersion, height, traffic, or other unsafe-environment activity;
- medical maneuvers, diagnosis, treatment, pain endurance, circulation/nerve claims, massage therapy, or adjustment of a medical/assistive device; and
- involving any third person, animal, minor, or person whose adult status and capacity are not independently established.

Neck compression is a categorical exclusion. A systematic review describes potentially severe neurological outcomes including arterial dissection and stroke, although incidence evidence is limited ([Bichard et al., 2022, DOI 10.1080/09602011.2020.1868537](https://doi.org/10.1080/09602011.2020.1868537)). Forensic case literature cannot estimate population risk but documents fatalities, frequently involving erotic asphyxiation and sometimes substances ([Schori et al., 2022, DOI 10.1007/s00414-021-02674-0](https://doi.org/10.1007/s00414-021-02674-0)). NHS Inform states there is no safe way to apply pressure to the neck ([NHS Inform, non-fatal strangulation](https://www.nhsinform.scot/?healthy-living=non-fatal-strangulation-nfs)).

### 11.2 Specialist-only and outside SLOW BURN

Do not prompt technique or progression for:

- exposed genital or breast stimulation;
- oral–genital, oral–anal, anal, vaginal, or other penetrative contact;
- fingers, toys, devices, lubricants, barriers, contraception, STI prevention/testing, fertility, pregnancy, postpartum, menopause, erectile/orgasm/pain conditions, pelvic-floor issues, or post-surgical care;
- kink/BDSM power exchange, restraint, impact, sensation play, or negotiated roleplay; or
- trauma processing or treatment of sexual concerns.

These domains require anatomy-, health-, material-, hygiene-, risk-, and context-specific education that a short generic card cannot safely supply. Oral sex, for example, can transmit sexually transmitted infections and requires a real safer-sex discussion rather than a playful cue ([CDC, About STI Risk and Oral Sex](https://www.cdc.gov/sti/about/about-sti-risk-and-oral-sex.html)). Cold sores are another simple illustration of context the app cannot infer; NHS guidance advises avoiding kissing while a cold sore is present ([NHS, Cold sores](https://www.nhs.uk/conditions/cold-sores/)).

“Outside SLOW BURN” is not a moral judgment or claim that adults should not choose these actions independently. It means the product does not have sufficient scope, expertise, context, or evidence to instruct them. Do not place a wink, euphemism, or “continue on your own” card that effectively sequences an excluded action.

## 12. Inclusion and accessibility requirements

### 12.1 Language and representation

- Use “two people,” “partner,” “giver,” and “receiver,” never man/woman or penetrator/receiver assumptions.
- Do not assume romantic status, monogamy, relationship duration, cohabitation, marriage, sexual orientation, gender, anatomy, hormone status, sexual experience, or a shared label.
- Do not infer body parts from gender or pronouns. Let the receiver name a place in their own words.
- Do not assume both people want sex, orgasm, nudity, penetration, reciprocity, equal intensity, or the same type of touch.
- Avoid “normal,” “real sex,” “foreplay,” “finish,” “perform,” “give your partner what they need,” “let go,” and “surrender.”
- Use plain, literal DE/EN copy. Sexual euphemisms are especially hard to translate and interpret.
- Have native speakers with sexual-health and inclusive-language competence review both languages; translation is not complete when grammar alone is correct.

### 12.2 Motor and mobility access

- Every position instruction is optional: sit, lie, stand, or use another supported position.
- Never require kneeling, floor transfer, standing balance, twisting, reaching behind, weight bearing, prolonged posture, two hands, fine motor control, or switching sides.
- Use “a place you can comfortably reach” and allow a tool-free alternative. Never direct movement of a prosthesis, brace, catheter, ostomy, wheelchair, or other device.
- Provide generous targets, keyboard/switch navigation, visible focus, no drag-only controls, and no gesture-only actions.
- A single participant may operate the device, but the consent design must not let that operator answer for both.

### 12.3 Sensory and cognitive access

- Text and icons together; never color alone.
- Screen-reader labels must disclose no prior private choice.
- High contrast, text reflow at narrow widths, user zoom, reduced motion, no flicker, no parallax, no forced orientation, no rapidly disappearing content.
- No countdowns. Allow unlimited processing time without a warning tone.
- Offer optional setup choices: brighter/dimmer, quieter/no music, warmer/cooler, different fabric/surface, no scent, more space.
- Never add scent, audio, spoken instructions, haptics, or rhythmic cues by default.
- Keep each card to one action and one primary variable. Repeat the common control vocabulary verbatim.
- Allow a preview of all category names before entry so participants are not surprised.

Conformance should target [WCAG 2.2 AA](https://www.w3.org/TR/WCAG22/) for the interface, while recognizing that WCAG conformance alone does not validate the physical experience or meet every disabled person's needs; W3C itself notes the guideline's coverage limits. Test with screen-reader, switch, keyboard, magnification, motor, cognitive, deaf/hard-of-hearing, blind/low-vision, chronic-pain, mobility-disabled, and neurodivergent participants or paid expert reviewers.

### 12.4 Pain, fatigue, and sensory boundaries

- “Pain, numbness, dizziness, breathing difficulty, distress, or feeling unwell: stop.”
- Do not advise breathing through pain, stretching farther, holding a position, or trying again.
- Allow frequent repositioning and rest without leaving the route.
- “No touch” and “over clothing” remain visible at every relevant adjustment.
- Avoid body-weight pressure unless the receiver explicitly directs it and can end it immediately; conservative V1 should omit it entirely.
- Do not ask why a scar, device, area, sound, scent, texture, or position is avoided.
- Do not frame sensory sensitivity as anxiety to overcome.

## 13. Privacy and data-minimization architecture

### 13.1 Why zero retention is the correct default

Under the GDPR, data must be adequate, relevant, and limited to what is necessary (Article 5(1)(c)); data concerning a person's sex life or sexual orientation are special-category data (Article 9); and privacy by design/default requires technical and organizational safeguards and processing only what is necessary (Article 25) ([Regulation (EU) 2016/679, official EUR-Lex text](https://eur-lex.europa.eu/eli/reg/2016/679/oj)). This memo is not a legal opinion. The product conclusion is nevertheless straightforward: SLOW BURN can fulfill its live interaction purpose without retaining sexual choices.

“CLOSER does not retain this session” must not be presented as absolute environmental privacy. The operating system, browser, device owner, a nearby person, a screenshot, notification preview, network intermediary, or study protocol may create separate exposure. Minimize those surfaces technically and explain the remaining limits in plain language.

### 13.2 Permitted volatile state

Only the following may exist in process memory during the active screen session:

- anonymous participant turn: A or B;
- current act and card identifier;
- categories already jointly opened in this active session;
- categories skipped/closed for this act/session;
- whether an unresolved gate is waiting for A or B;
- one raw choice long enough to mask and collect the second;
- the shared resolved result;
- current accessibility/display settings if already global and nonsexual; and
- whether the current action is open, paused, or ended.

Raw individual choices are cleared immediately after resolution. Body-area words, spoken content, reasons, physical responses, partner roles, and adjustment details should not be typed into the app. Prefer selecting generic on-device dimensions and naming the body area aloud.

### 13.3 Prohibited storage and transmission

Do not place SLOW BURN state or events in:

- localStorage, IndexedDB, cookies, URL/query/hash, clipboard, autofill, service-worker cache, browser history labels, or persisted application stores;
- server requests, database records, account profiles, backups, CDNs, feature-flag payloads, message queues, or data warehouses;
- analytics, product telemetry, A/B testing, heatmaps, session replay, screen recordings, screenshots, feedback widgets, or advertising systems;
- console logs, structured logs, network traces, crash reports, error breadcrumbs, memory dumps, or support attachments;
- notifications, lock-screen previews, email, calendar, share sheets, deep links, or “continue where you left off” surfaces; or
- recommendation, personalization, risk, relationship, orientation, desire, consent, compatibility, or “heat” models.

No completion badge, run history, recent-pack tile, streak, favorites entry, “last played,” or resumable checkpoint should identify this pack. If the app's general adult-library visibility preference is stored, disclose it and keep it independent of SLOW BURN launch/history.

### 13.4 Lifecycle and failure behavior

- Set resume policy to none.
- On End, route exit, tab/app background, visibility loss, lock, crash recovery, refresh, update, or inactivity termination: clear all SLOW BURN runtime state.
- Returning begins at the adult entry disclosure, never an in-progress action.
- A network outage must not block Pause/End; the experience should be local/static after assets load.
- Bundle or fetch content through a generic non-descriptive path so ordinary server/CDN access logs do not identify a SLOW BURN launch; confirm this in the data-flow audit.
- Sensitive copy/assets should not create descriptive browser-history titles or OS recent-item previews.
- Error messages must omit state and choices: “This session closed. Nothing was saved.”
- Disable third-party scripts on the experience route where feasible; perform a data-flow and SDK audit before pilot.

### 13.5 Pilot data exception

Research data, if collected, must be separated from the product implementation and pass ethics/privacy/legal review. Collect the minimum at post-session, ideally on a study system with coded IDs:

- route and language;
- broad accessibility modes used, only when freely disclosed and needed for analysis;
- comprehension/usability task results;
- whether Pause/End/Adjust was used, without body area or action content;
- felt pressure, autonomy, comfort, pleasantness, screen burden, and session satisfaction ratings;
- adverse-event severity category and product relatedness; and
- optional free text with an explicit warning not to include names, diagnoses, sexual details, or partner disclosures.

Do not collect recordings of touch, audio of the pair, physiological measurements, sexual answers, exact body choices, orientation/gender/anatomy by default, or identifiable incident narratives in ordinary product telemetry. A safety incident requiring follow-up needs a separately controlled record with strict access, retention, and counsel-approved handling.

## 14. Content system and bilingual candidate bank

### 14.1 Editorial rules for every action card

Every release card must pass all of these checks:

1. It is an invitation, never an imperative or challenge.
2. It names one receiver and one giver or explicitly offers no touch.
3. It stays inside the jointly eligible categories and the exact conditions already opened.
4. It says who chooses the location/pace/pressure/clothing condition.
5. It varies at most one main dimension after the action begins.
6. It preserves Skip, Adjust, Pause, Stop, and End.
7. It does not rely on silence, arousal, body response, relationship status, or earlier participation as agreement.
8. It has no assumed body part, anatomy, ability, gender, orientation, role, reciprocity, or endpoint.
9. It has a clothed or non-touch alternative where relevant.
10. It contains no hidden task, prediction, score, countdown, “both at once,” surprise, or persuasion.
11. It contains no clinical, physiological, spiritual, safety, performance, or relationship-outcome claim.
12. German and English communicate the same choice and level of directness; neither translation adds pressure or euphemism.

The cards below are **candidate copy for expert review and moderated testing**, not validated interventions or production-ready medical/legal copy. **C06 is the only card intentionally beyond the recommended general-consumer V1 ceiling and is marked pilot-only in both languages.** All other cards are possible V1 candidates only when their category has passed the expert, legal, accessibility, privacy, and pilot gates; this label does not pre-approve kissing, sensual external areas, or bare-skin contact.

### 14.2 System and gate cards

#### S00 — Pack preview

**EN**
SLOW BURN is a touch-forward experience for two adults. It includes optional closeness, external touch, and kissing. It does not include penetration, breath or neck play, restraint, impact, or surprise touch. You can keep all touch over clothing—or choose no touch.

**DE**
SLOW BURN ist ein berührungsorientiertes Erlebnis für zwei erwachsene Personen. Es enthält optionale Nähe, äußerliche Berührungen und Küsse. Penetration, Atem- oder Halsspiele, Fesseln, Schläge und überraschende Berührungen sind nicht enthalten. Alle Berührungen können über der Kleidung bleiben – oder ihr wählt keine Berührung.

#### S01 — Adult, capacity, and willingness

**EN**
Continue only if each of you is an adult under the law that applies, awake, able to decide, free from pressure, and willing to consider this experience now. The app cannot verify that. Either person can end at any time.

**DE**
Macht nur weiter, wenn ihr beide nach dem geltenden Recht erwachsen, wach, entscheidungsfähig, frei von Druck und jetzt bereit seid, dieses Erlebnis in Betracht zu ziehen. Die App kann das nicht überprüfen. Beide Personen können jederzeit beenden.

#### S02 — Privacy

**EN**
CLOSER does not save your choices or actions, and this session cannot be resumed. On-screen choices are masked, but they cannot be guaranteed secret from someone beside the phone. Shield the screen and hide notification previews if you wish.

**DE**
CLOSER speichert eure Entscheidungen und Handlungen nicht; diese Session kann nicht fortgesetzt werden. Entscheidungen werden auf dem Bildschirm verdeckt, können vor einer Person neben dem Smartphone aber nicht garantiert geheim bleiben. Schirmt den Bildschirm ab und blendet auf Wunsch Benachrichtigungsvorschauen aus.

#### S03 — Shared rule

**EN**
This is an invitation, not an instruction. Either of you can Skip, Adjust, Pause, Stop, or End—without explaining. No clear yes means the action does not begin. A yes applies only to the option on screen and can change at any time.

**DE**
Das ist eine Einladung, keine Anweisung. Ihr könnt beide jederzeit auslassen, anpassen, pausieren, stoppen oder beenden – ohne Erklärung. Ohne klares Ja beginnt die Handlung nicht. Ein Ja gilt nur für die angezeigte Option und kann jederzeit geändert werden.

#### S04 — In-action words

**EN**
Use any words or signals that work for you. These seven are always available: More · Softer · Slower · Not there · Different · Pause · Stop. On Not there, Pause, or Stop, contact stops immediately. More or Different proposes a change; it does not authorize one. Any physical restart—including an unchanged action—requires the exact proposition and a fresh Yes + Yes.

**DE**
Nutzt alle Wörter oder Signale, die für euch funktionieren. Diese sieben stehen immer zur Verfügung: Mehr · Sanfter · Langsamer · Nicht dort · Anders · Pause · Stopp. Bei Nicht dort, Pause oder Stopp endet der Kontakt sofort. Mehr oder Anders schlägt eine Änderung vor; es erlaubt sie nicht. Jede körperliche Wiederaufnahme – auch einer unveränderten Handlung – erfordert die genau benannte Option und ein neues Ja + Ja.

#### S05 — Exact action gate

**EN**
Choose separately on the masked choice screen for this option now: **Yes · Adjust · Skip**. Only Yes + Yes opens it. The app masks each individual choice but cannot guarantee secrecy from someone beside the device.

**DE**
Wählt jetzt getrennt am verdeckten Auswahlbildschirm für diese Option: **Ja · Anpassen · Auslassen**. Nur Ja + Ja öffnet sie. Die App blendet die einzelnen Entscheidungen aus, kann aber gegenüber einer Person neben dem Gerät keine Geheimhaltung garantieren.

#### S06 — Shared result: open

**EN**
This exact option is open to try now. It is not a promise to continue. The receiver directs within its displayed bounds; either person can decline or stop. After contact stops, every restart—and every material change—needs a newly stated exact option and fresh Yes + Yes.

**DE**
Diese genaue Option ist jetzt zum Ausprobieren offen. Das ist kein Versprechen weiterzumachen. Die empfangende Person gibt innerhalb der angezeigten Grenzen die Richtung vor; beide Personen können ablehnen oder stoppen. Nach einem Kontaktende braucht jede Wiederaufnahme – und jede wesentliche Änderung – eine neu benannte genaue Option und ein neues Ja + Ja.

#### S07 — Shared result: adjust

**EN**
Change something before this option can fit. Choose without explaining: area · clothing · pressure · pace · movement · duration · position · role · no touch · skip. State the revised exact option, then return to the masked gate; only fresh Yes + Yes opens it.

**DE**
Ändert etwas, damit diese Option passen kann. Wählt ohne Erklärung: Bereich · Kleidung · Druck · Tempo · Bewegung · Dauer · Position · Rolle · keine Berührung · auslassen. Benennt die geänderte genaue Option und kehrt dann zur verdeckten Auswahl zurück; nur ein neues Ja + Ja öffnet sie.

#### S08 — Shared result: skip

**EN**
Skip this. Nothing is lost. Choose a no-touch card or End, or take one previously eligible option through a fresh exact Yes + Yes gate.

**DE**
Lasst das aus. Es geht nichts verloren. Wählt eine Karte ohne Berührung oder Beenden. Für eine zuvor wählbare Option nennt ihr die genaue Handlung neu und braucht ein neues Ja + Ja.

#### S09 — Pause

**EN**
Pause. Contact stops now. Take the space you need; you do not have to decide together. Choose separately: Consider one exact action through a fresh Yes + Yes gate · More space or no touch · End. Contact does not restart without that fresh exact Yes + Yes.

**DE**
Pause. Der Kontakt endet jetzt. Nehmt euch den Raum, den ihr braucht; ihr müsst nicht gemeinsam entscheiden. Wählt getrennt: eine genau benannte Handlung mit einem neuen Ja + Ja prüfen · mehr Abstand oder keine Berührung · beenden. Ohne dieses neue genaue Ja + Ja beginnt der Kontakt nicht erneut.

#### S10 — Health and environment

**EN**
Choose a private, lawful place where either person can move away. Stop for pain, numbness, dizziness, breathing difficulty, distress, or feeling unwell. Kissing can transmit infections; if either person has a cold sore or another health concern, choose no kissing and seek appropriate health guidance. Do not use this while driving or during any safety-critical task.

**DE**
Wählt einen privaten, rechtlich zulässigen Ort, an dem beide Personen Abstand nehmen können. Stoppt bei Schmerzen, Taubheit, Schwindel, Atemproblemen, Belastung oder Unwohlsein. Küsse können Infektionen übertragen; bei Lippenherpes oder anderen gesundheitlichen Bedenken wählt kein Küssen und holt passende Gesundheitsinformationen ein. Nutzt das nicht beim Fahren oder während sicherheitskritischer Aufgaben.

### 14.3 Act I candidates — ARRIVE / ANKOMMEN

#### A01 — Change the setting

**EN**
Before any touch, each choose one: quieter · brighter or dimmer · warmer or cooler · more space · different surface · no change. Use only changes that work for both.

**DE**
Vor jeder Berührung wählt ihr jeweils eine Option: ruhiger · heller oder dunkler · wärmer oder kühler · mehr Abstand · andere Unterlage · keine Änderung. Nutzt nur Änderungen, die für euch beide passen.

#### A02 — Find an accessible position

**EN**
Each choose a position you can leave or change easily: sitting, lying, standing, or another supported position. No position is part of the challenge.

**DE**
Wählt jeweils eine Position, die ihr leicht verlassen oder ändern könnt: sitzend, liegend, stehend oder eine andere gut gestützte Position. Keine Position ist Teil einer Herausforderung.

#### A03 — Choose distance

**EN**
With no touch, each person chooses a distance. Use the greater requested distance. Either person can create more space at any time. Looking at each other is optional.

**DE**
Ohne Berührung wählt jede Person einen Abstand. Verwendet den größeren gewünschten Abstand. Beide Personen können jederzeit mehr Abstand schaffen. Blickkontakt ist optional.

#### A04 — Notice without matching

**EN**
Optional: notice your own comfort, support, and wish for space. You do not need to focus on breathing, slow down, match each other, close your eyes, or report anything. Choose Ready when you want another card.

**DE**
Optional: Nehmt euer eigenes Wohlbefinden, eure Stütze und euren Wunsch nach Abstand wahr. Ihr müsst euch nicht auf den Atem konzentrieren, langsamer werden, euch angleichen, die Augen schließen oder etwas berichten. Wählt Weiter, wenn ihr eine andere Karte möchtet.

#### A05 — Near hands, no contact

**EN**
Place one hand somewhere comfortable and reachable. The other person may place a hand nearby without touching. Each person may request a distance; use the greater distance.

**DE**
Legt eine Hand an eine bequeme, gut erreichbare Stelle. Die andere Person kann eine Hand in die Nähe legen, ohne zu berühren. Beide Personen können einen Abstand wünschen; verwendet den größeren Abstand.

#### A06 — First-touch gate: still hands

**EN**
Consider one still hand-to-hand touch. Before choosing, the receiver names palm, back of hand, or another reachable part of the hand and a maximum duration. Only Yes + Yes opens that exact proposition. Either person may stop sooner.

**DE**
Zieht eine ruhige Berührung von Hand zu Hand in Betracht. Vor der Entscheidung benennt die empfangende Person Handfläche, Handrücken oder eine andere gut erreichbare Stelle der Hand sowie eine Höchstdauer. Nur Ja + Ja öffnet diesen genauen Vorschlag. Beide Personen können früher stoppen.

#### A07 — Show the pressure

**EN**
The receiver shows on their own hand—or says or taps—how light or firm feels welcome. Demonstrating is optional. If both choose Yes, the giver tries that exact pressure on the chosen hand area. “Different” stops movement; name the revised pressure and obtain Yes + Yes before resuming.

**DE**
Die empfangende Person zeigt an der eigenen Hand – oder sagt bzw. tippt –, wie sanft oder fest es angenehm ist. Vormachen ist optional. Wenn beide Ja wählen, probiert die gebende Person genau diesen Druck an der gewählten Stelle der Hand. Bei „Anders“ stoppt die Bewegung; benennt den geänderten Druck und holt vor dem Fortsetzen Ja + Ja ein.

#### A08 — Forearm: still or moving

**EN**
Consider touch on one comfortably reachable part of the forearm, over clothing if present. Before choosing, the receiver names the exact place, still or one movement, and a maximum duration. Only Yes + Yes opens that exact proposition. Either person may stop sooner.

**DE**
Zieht eine Berührung an einer bequem erreichbaren Stelle des Unterarms in Betracht – über der Kleidung, falls dort Kleidung ist. Vor der Entscheidung benennt die empfangende Person die genaue Stelle, ruhig oder eine Bewegung sowie eine Höchstdauer. Nur Ja + Ja öffnet diesen genauen Vorschlag. Beide Personen können früher stoppen.

#### A09 — One short path

**EN**
On an already-open hand or forearm area, the receiver shows, describes, or guides one short path using an accessible method. After both understand it and choose Yes, the giver follows it once, then stops. Exact Repeat needs both to choose it; Change returns to a bilateral gate; Next card adds nothing.

**DE**
An einer bereits geöffneten Stelle an Hand oder Unterarm zeigt, beschreibt oder führt die empfangende Person mit einer zugänglichen Methode einen kurzen Weg. Wenn beide ihn verstanden und Ja gewählt haben, folgt die gebende Person ihm einmal und stoppt. Für eine genaue Wiederholung wählen beide; Ändern führt zu einer beidseitigen Entscheidung zurück; Nächste Karte fügt nichts hinzu.

#### A10 — New-area gate

**EN**
Consider one new external area: shoulder · upper back · scalp/hair · face · another reachable place · none. Use this card only for an exact place the receiver classifies as non-intimate for this action. The receiver names it before both choose; only Yes + Yes opens that place, not the whole category.

**DE**
Zieht eine neue äußerliche Stelle in Betracht: Schulter · oberer Rücken · Kopfhaut/Haare · Gesicht · eine andere gut erreichbare Stelle · keine. Verwendet diese Karte nur für eine genaue Stelle, welche die empfangende Person für diese Handlung als nicht intim einstuft. Sie benennt die Stelle vor der Entscheidung; nur Ja + Ja öffnet diese Stelle, nicht die gesamte Kategorie.

#### A11 — Still contact in a chosen area

**EN**
For an already-open area, the receiver places, guides, points to, or describes one exact spot using an accessible method. Obtain Yes + Yes for still contact at that spot before beginning. If the receiver proposes movement, name it and obtain a new Yes + Yes before it starts.

**DE**
Für eine bereits geöffnete Stelle legt oder führt die empfangende Person die Hand der gebenden Person an einen genauen Punkt oder zeigt bzw. beschreibt ihn mit einer zugänglichen Methode. Holt vor dem Beginn Ja + Ja für einen ruhigen Kontakt an diesem Punkt ein. Wenn die empfangende Person eine Bewegung vorschlägt, benennt sie und holt vor dem Beginn ein neues Ja + Ja ein.

#### A12 — Act I direction

**EN**
What fits now? Choose separately: stay with no touch · repeat an open touch · consider another jointly eligible category · create more space · end.

**DE**
Was passt jetzt? Wählt getrennt: ohne Berührung bleiben · eine offene Berührung wiederholen · eine andere gemeinsam verfügbare Kategorie in Betracht ziehen · mehr Abstand schaffen · beenden.

### 14.4 Act II candidates — BUILD / AUFBAU

#### B01 — Keep what works

**EN**
Choose one already-open action that felt comfortable or easy to direct. Repeat it exactly without making it stronger. If either person proposes changing a detail, stop and return to a bilateral gate.

**DE**
Wählt eine bereits offene Handlung, die angenehm oder leicht zu steuern war. Wiederholt sie genau so, ohne sie zu verstärken. Wenn eine Person ein Detail ändern möchte, stoppt und kehrt zu einer beidseitigen Entscheidung zurück.

#### B02 — One variable

**EN**
On an already-open area, the receiver proposes one variable: lighter or firmer · slower or faster · still or moving · shorter or no set duration. Name the exact revised action and obtain Yes + Yes before changing it. Keep every other detail the same.

**DE**
An einer bereits geöffneten Stelle schlägt die empfangende Person eine Variable vor: sanfter oder fester · langsamer oder schneller · ruhig oder bewegt · kürzer oder ohne festgelegte Dauer. Benennt die genaue geänderte Handlung und holt vor der Änderung Ja + Ja ein. Alle anderen Details bleiben gleich.

#### B03 — Recipient-guided hand

**EN**
For an already-open area, the receiver may guide, point out, or describe one movement using an accessible method. Name that movement, then obtain Yes + Yes before the giver follows it once. At the end, the giver stops.

**DE**
Für eine bereits geöffnete Stelle kann die empfangende Person eine Bewegung mit einer zugänglichen Methode führen, zeigen oder beschreiben. Benennt diese Bewegung und holt Ja + Ja ein, bevor die gebende Person ihr einmal folgt. Am Ende stoppt die gebende Person.

#### B04 — Stillness or motion

**EN**
Try the already-open touch in one exact form chosen before the gate: a still hand or one repeated movement. “Different” stops the action; name the other form and obtain a new Yes + Yes before switching.

**DE**
Probiert die bereits offene Berührung in einer genauen Form, die ihr vor der Entscheidung wählt: eine ruhige Hand oder eine wiederholte Bewegung. „Anders“ stoppt die Handlung; benennt die andere Form und holt vor dem Wechsel ein neues Ja + Ja ein.

#### B05 — Role switch is optional

**EN**
Consider switching giver and receiver for the same already-open action. Name the exact switched proposition; only Yes + Yes opens it. Reciprocity is optional, and Skip keeps or closes the action.

**DE**
Zieht in Betracht, für dieselbe bereits offene Handlung gebende und empfangende Person zu wechseln. Benennt den genauen Vorschlag mit getauschten Rollen; nur Ja + Ja öffnet ihn. Gegenseitigkeit ist optional; Auslassen bedeutet, die Handlung beizubehalten oder zu schließen.

#### B06 — Embrace gate

**EN**
Consider one form of body contact: side-by-side contact · a brief embrace · another accessible form where each person supports their own weight · none. Name the exact position and maximum duration; only Yes + Yes opens it. Both keep full control of movement, and either person may stop sooner.

**DE**
Zieht eine Form von Körperkontakt in Betracht: seitlicher Kontakt · eine kurze Umarmung · eine andere zugängliche Form, bei der beide das eigene Gewicht tragen · keine. Benennt die genaue Position und eine Höchstdauer; nur Ja + Ja öffnet sie. Beide behalten die volle Kontrolle über ihre Bewegung und können früher stoppen.

#### B07 — Space inside closeness

**EN**
In an already-open embrace or side-by-side position, either person may create more space immediately. To move closer, name the exact position and obtain Yes + Yes before moving. Either person may stop.

**DE**
In einer bereits geöffneten Umarmung oder Position nebeneinander können beide Personen sofort mehr Abstand schaffen. Wenn ihr euch näher bewegen möchtet, benennt die genaue Position und holt vor der Bewegung Ja + Ja ein. Beide Personen können stoppen.

#### B08 — Face, scalp, or hair gate

**EN**
Consider one place on the face, scalp, or hair—or skip this category. Before choosing, the receiver names the exact place and either still contact or one gentle movement. Only Yes + Yes opens that proposition. Avoid pulling and stop before changing place.

**DE**
Zieht eine Stelle im Gesicht, an der Kopfhaut oder an den Haaren in Betracht – oder lasst diese Kategorie aus. Vor der Entscheidung benennt die empfangende Person die genaue Stelle und entweder ruhigen Kontakt oder eine sanfte Bewegung. Nur Ja + Ja öffnet diesen Vorschlag. Nicht ziehen; vor einem Stellenwechsel stoppen.

#### B09 — Sensual-external gate

**EN**
Consider one external area on the abdomen, side of the torso, hips, or outer legs, over clothing. This card excludes chest/breasts, buttocks, inner thighs, genitals, and anus. The receiver names one exact place before both choose; only Yes + Yes opens it. Naming one place does not open nearby areas. No place is expected.

**DE**
Zieht eine äußerliche Stelle an Bauch, seitlichem Oberkörper, Hüften oder Außenseiten der Beine über der Kleidung in Betracht. Brust/Brüste, Gesäß, Innenseiten der Oberschenkel, Genitalien und Anus sind bei dieser Karte ausgeschlossen. Die empfangende Person benennt vor der Entscheidung eine genaue Stelle; nur Ja + Ja öffnet sie. Das Benennen einer Stelle öffnet keine angrenzenden Stellen. Keine Stelle wird erwartet.

#### B10 — Non-mouth kiss gate

**EN**
Consider one kiss in a place such as forehead, cheek, hand, shoulder, or another already-open external area—or choose no kiss. The receiver names the exact place before both choose; only Yes + Yes opens one kiss there. Either person may stop before contact; stop after one.

**DE**
Zieht einen Kuss an einer Stelle in Betracht, zum Beispiel Stirn, Wange, Hand, Schulter oder eine andere bereits geöffnete äußerliche Stelle – oder wählt keinen Kuss. Die empfangende Person benennt vor der Entscheidung die genaue Stelle; nur Ja + Ja öffnet dort einen Kuss. Beide Personen können vor dem Kontakt stoppen; stoppt nach einem Kuss.

#### B11 — Mouth-kiss gate

**EN**
Consider one kiss on the mouth. This is a separate choice even if another kiss was open. Only Yes + Yes opens it. Kiss once and stop; either person may stop before or during contact.

**DE**
Zieht einen Kuss auf den Mund in Betracht. Das ist eine eigene Entscheidung, auch wenn ein anderer Kuss geöffnet war. Nur Ja + Ja öffnet ihn. Küsst euch einmal und stoppt; beide Personen können vor oder während des Kontakts stoppen.

#### B12 — Kiss adjustment

**EN**
For an already-open kiss, either person may create more distance or close kissing immediately. To repeat once or change place, pressure, or pace, name the exact proposition and obtain Yes + Yes before contact.

**DE**
Bei einem bereits geöffneten Kuss können beide Personen sofort mehr Abstand schaffen oder das Küssen beenden. Für eine Wiederholung oder eine Änderung von Stelle, Druck oder Tempo benennt den genauen Vorschlag und holt vor dem Kontakt Ja + Ja ein.

#### B13 — Return, not rise

**EN**
Name one earlier no-touch or touch action to return to. For touch, obtain a new Yes + Yes on the exact action before contact. Returning is not a step backward; it is the direction that fits now.

**DE**
Benennt eine frühere Handlung ohne Berührung oder mit Berührung, zu der ihr zurückkehren möchtet. Holt bei Berührung vor dem Kontakt ein neues Ja + Ja für die genaue Handlung ein. Zurückzukehren ist kein Rückschritt, sondern die Richtung, die jetzt passt.

#### B14 — Act II direction

**EN**
What fits now? Choose separately: stay here · repeat an exact favorite · consider Act III choices · create more space · end.

**DE**
Was passt jetzt? Wählt getrennt: hier bleiben · etwas Angenehmes genau wiederholen · Optionen aus Akt III in Betracht ziehen · mehr Abstand schaffen · beenden.

### 14.5 Act III candidates — CHOOSE / WÄHLEN

Act III contains alternatives, not a mandatory escalation sequence. C06 is prototype-only and must remain inaccessible in public V1 until all release gates pass.

#### C01 — Set the direction

**EN**
Choose separately: stay with the currently open choices · consider one different jointly eligible category · create more space · move to a close · end now. No direction is the “higher” result.

**DE**
Wählt getrennt: bei den derzeit geöffneten Optionen bleiben · eine andere gemeinsam verfügbare Kategorie in Betracht ziehen · mehr Abstand schaffen · zum Abschluss wechseln · jetzt beenden. Keine Richtung ist das „höhere“ Ergebnis.

#### C02 — Favorite, unchanged

**EN**
Choose one already-open action to repeat exactly as it was. Do not intensify it. The receiver sets the maximum duration; either person may stop sooner.

**DE**
Wählt eine bereits offene Handlung und wiederholt sie genauso wie zuvor. Verstärkt sie nicht. Die empfangende Person legt die Höchstdauer fest; beide Personen können früher stoppen.

#### C03 — Clothing-condition gate

**EN**
For one already-open external area, consider only this change: stay over clothing · touch directly on skin · close this area. Direct skin contact excludes chest/breasts, buttocks, inner thighs, genitals, anus, and any pilot-only area. It begins only with Yes + Yes and an exact receiver-named place. Staying clothed is always complete.

**DE**
Zieht für eine bereits geöffnete äußerliche Stelle nur diese Änderung in Betracht: über der Kleidung bleiben · direkt auf der Haut berühren · diese Stelle schließen. Direkter Hautkontakt schließt Brust/Brüste, Gesäß, Innenseiten der Oberschenkel, Genitalien, Anus und alle nur im Pilot vorgesehenen Stellen aus. Er beginnt nur mit Ja + Ja und einer genau benannten Stelle. Bekleidet zu bleiben ist immer vollständig.

#### C04 — Receiver names the boundary

**EN**
Within an already-open external category, the receiver names one already-open place and a narrower boundary: “only here,” “not past here,” or another clear limit. The giver repeats it back before contact. A different place requires a new bilateral gate.

**DE**
Innerhalb einer bereits geöffneten äußerlichen Kategorie benennt die empfangende Person eine bereits geöffnete Stelle und eine engere Grenze: „nur hier“, „nicht weiter als hier“ oder eine andere klare Grenze. Die gebende Person wiederholt sie vor dem Kontakt. Eine andere Stelle braucht eine neue beidseitige Entscheidung.

#### C05 — Guided path

**EN**
For one already-open external area, the receiver may guide, point out, or describe one path using an accessible method. Name the exact path and obtain Yes + Yes before contact. The giver does not continue beyond it and stops when the guidance ends.

**DE**
Für eine bereits geöffnete äußerliche Stelle kann die empfangende Person einen Weg mit einer zugänglichen Methode führen, zeigen oder beschreiben. Benennt den genauen Weg und holt vor dem Kontakt Ja + Ja ein. Die gebende Person geht nicht darüber hinaus und stoppt, wenn die Führung endet.

#### C06 — Pilot-only intimate external gate, over clothing

**EN**
**Moderated prototype only.** Consider one more intimate external place, explicitly named by the receiver, over clothing only. No penetration and no app-suggested anatomy. After the receiver names the exact place and the screen states “one short contact,” both choose again; only Yes + Yes opens it. Either person may stop before or during contact.

**DE**
**Nur im moderierten Prototyp.** Zieht eine intimere äußerliche Stelle in Betracht, die die empfangende Person ausdrücklich benennt – nur über der Kleidung. Keine Penetration und keine von der App vorgeschlagene Anatomie. Nachdem die empfangende Person die genaue Stelle benannt hat und der Bildschirm „ein kurzer Kontakt“ anzeigt, wählen beide erneut; nur Ja + Ja öffnet die Option. Beide Personen können vor oder während des Kontakts stoppen.

#### C07 — Longer kissing, self-paced

**EN**
For an already-open mouth kiss, consider continuing without a timer. Obtain a new Yes + Yes before continuing. Either person can create distance at any moment; distance means stop and check, not follow.

**DE**
Zieht bei einem bereits geöffneten Kuss auf den Mund in Betracht, ohne Zeitvorgabe weiterzumachen. Holt vor dem Fortsetzen ein neues Ja + Ja ein. Beide Personen können jederzeit Abstand schaffen; Abstand bedeutet stoppen und nachfragen, nicht folgen.

#### C08 — One opened touch with kissing

**EN**
Consider combining one already-open kiss with one already-open external touch. Name both before the gate. If Yes + Yes opens the combination, begin one action first; add the second only after a second masked bilateral choice also resolves to Yes + Yes.

**DE**
Zieht in Betracht, einen bereits geöffneten Kuss mit einer bereits geöffneten äußerlichen Berührung zu verbinden. Benennt beides vor der Entscheidung. Wenn Ja + Ja die Kombination öffnet, beginnt mit einer Handlung; fügt die zweite erst hinzu, nachdem auch eine zweite verdeckte beidseitige Entscheidung zu Ja + Ja geführt hat.

#### C09 — Change one detail, not intensity

**EN**
Choose an already-open action. A request for less, slower, more space, or Stop takes effect immediately. For more, faster, movement, longer duration, or another place—even inside an open boundary—name the revised action and obtain Yes + Yes before resuming.

**DE**
Wählt eine bereits offene Handlung. Eine Bitte um weniger, langsamer, mehr Abstand oder Stopp gilt sofort. Für mehr, schneller, Bewegung, längere Dauer oder eine andere Stelle – auch innerhalb einer geöffneten Grenze – benennt die geänderte Handlung und holt vor dem Fortsetzen Ja + Ja ein.

#### C10 — Optional role switch

**EN**
Would switching roles for one already-open action fit now? Name the exact switched action and choose separately; only Yes + Yes opens it. One person's wish for reciprocity never creates an obligation for the other.

**DE**
Würde ein Rollenwechsel für eine bereits offene Handlung jetzt passen? Benennt die genaue Handlung mit getauschten Rollen und wählt getrennt; nur Ja + Ja öffnet sie. Der Wunsch einer Person nach Gegenseitigkeit verpflichtet die andere Person nicht.

#### C11 — No-touch reset

**EN**
Choose a no-touch pause. Each person finds a comfortable position and distance. Nothing needs to happen next. If an exact open action is proposed again, it resumes only after a new Yes + Yes; Close and End remain equal choices.

**DE**
Wählt eine Pause ohne Berührung. Beide Personen finden eine bequeme Position und einen passenden Abstand. Danach muss nichts passieren. Wenn eine genaue offene Handlung erneut vorgeschlagen wird, beginnt sie erst nach einem neuen Ja + Ja; Abschließen und Beenden bleiben gleichwertige Optionen.

#### C12 — Choose the close

**EN**
Move to a close without adding a new touch category. Choose separately: space · quiet nearness · an already-open handhold · an already-open embrace · water or practical comfort · one check-in sentence · end now.

**DE**
Wechselt zum Abschluss, ohne eine neue Berührungskategorie hinzuzufügen. Wählt getrennt: Abstand · ruhige Nähe · bereits geöffnetes Händehalten · eine bereits geöffnete Umarmung · Wasser oder praktische Bequemlichkeit · ein kurzer Check-in-Satz · jetzt beenden.

### 14.6 Finale candidates — CARE AND SPACE / FÜRSORGE UND RAUM

#### F01 — Space

**EN**
Choose the amount of space that fits now. No touch and leaving the room are valid. You do not need to discuss the session before closing.

**DE**
Wählt den Abstand, der jetzt passt. Keine Berührung und den Raum zu verlassen sind gültige Optionen. Ihr müsst die Session vor dem Schließen nicht besprechen.

#### F02 — Quiet nearness

**EN**
If both choose it, stay near each other without adding touch. Look wherever is comfortable. End whenever either person wants.

**DE**
Wenn beide es wählen, bleibt ohne zusätzliche Berührung beieinander. Schaut dorthin, wo es angenehm ist. Beendet, sobald eine Person möchte.

#### F03 — Already-open touch

**EN**
If both choose it, use one already-open handhold or embrace. Do not introduce a new place or stronger version. Either person ends first.

**DE**
Wenn beide es wählen, nutzt ein bereits geöffnetes Händehalten oder eine bereits geöffnete Umarmung. Führt keine neue Stelle und keine stärkere Variante ein. Beide Personen können zuerst beenden.

#### F04 — One check-in sentence

**EN**
Optional: each may complete one sentence—“Right now, I would like ___.” Passing is equal. Listen without fixing, defending, or asking for details.

**DE**
Optional: Beide können einen Satz vervollständigen – „Im Moment wünsche ich mir ___.“ Auslassen ist gleichwertig. Hört zu, ohne etwas lösen oder verteidigen zu müssen und ohne nach Details zu fragen.

#### F05 — Neutral end

**EN**
This session is closed. Nothing was saved. What happens next is a new choice; the session does not authorize any further action.

**DE**
Diese Session ist beendet. Es wurde nichts gespeichert. Was danach passiert, ist eine neue Entscheidung; die Session erlaubt keine weitere Handlung.

### 14.7 Content routing notes

- Quick should use A01/A02 plus one opened touch candidate, one recipient-direction candidate, a direction gate, one Act II action inside the shared eligible set, C01, and a close. It must not use C06.
- Standard should deliberately alternate physical and choice/rest cards; do not place two new physical-action invitations back-to-back without a choice/rest card.
- Unhurried should add repetition and no-touch space, not merely more intense candidates.
- A route compiler must validate prerequisite categories. For example, B12 requires an opened kiss; C03 requires one exact opened external area; C08 requires both components separately opened.
- Rejected, adjusted-away, or closed categories are removed from automatic routing. No random fallback can select them.
- Card order should be curated and reviewed in DE and EN. Random shuffle is unsafe because prerequisites and recovery spacing matter.

## 15. Moderated prototype and adverse-event protocol

### 15.1 Purpose

The first study is a **safety and usability pilot**, not an efficacy trial. It cannot establish that SLOW BURN improves arousal, sexual satisfaction, communication, or relationship quality, and its sample will be far too small to estimate the incidence of uncommon harms.

Primary questions:

1. Can both participants explain that a gate is specific, temporary, and revocable?
2. Can each independently choose a lower option without attribution or social penalty?
3. Does the resolver always produce the conservative shared result, while keeping a non-contiguous eligibility set distinct from action authorization?
4. Can either participant stop contact and find Pause/End immediately?
5. Are adjustment words understood and acted on without negotiation?
6. Does the phone cadence support rather than interrupt the interaction?
7. Do language, disability, pain, sensory, gender, orientation, or relationship-context differences reveal exclusion or pressure?
8. Does any card produce unwanted action, distress, pain, disclosure pressure, unsafe improvisation, or misunderstanding?

### 15.2 Governance before participant contact

Before recruitment:

- appoint one product safety lead with authority to pause the study and one independent escalation contact;
- obtain review of the full protocol, exact cards, recruitment, compensation, privacy notice, incident handling, and support resources by an appropriately qualified sexual-health clinician/sex therapist, trauma specialist, disability/accessibility reviewers, privacy/security lead, and Austrian/EU legal and youth-protection counsel;
- determine whether institutional or independent research-ethics review is required; when uncertain, seek it rather than relabeling the work as ordinary usability testing;
- complete a threat model and DPIA screening, including shared-device privacy, logs, crash reporting, researcher data, and inadvertent disclosure;
- test every state transition and prerequisite automatically, including app background, lock, refresh, offline, crash, assistive-technology, and two simultaneous or rapid inputs;
- prepare site-specific emergency and sexual/domestic-violence resources that can be accessed privately; and
- train moderators not to act as therapists, consent arbiters, relationship mediators, or investigators.

### 15.3 Staged plan

#### Stage 0 — Expert walkthrough

Use at least five paid reviewers spanning sexual health/sex therapy, trauma, disability/mobility/pain, neurodivergence/sensory access, digital accessibility, privacy/security, and DE/EN inclusive language. More than one perspective can be represented by a reviewer, but no single reviewer substitutes for lived-experience participation.

Walk every route and failure branch. No participant touch occurs. Resolve all severity-2/3 findings and repeat the walkthrough before Stage 1.

#### Stage 1 — Tabletop and low-contact usability

Recruit approximately 8–12 existing adult pairs. Test eligibility, private handoff, non-contiguous category sets, Adjust, Pause, End, interruption recovery, accessibility, and selected no-touch/hand/forearm cards only. Use scripted mismatched choices so every resolver branch is observed.

The moderator can observe the interface, not private touch or spoken sexual content. Each participant separately completes comprehension and pressure checks. Fix all critical errors before Stage 2.

#### Stage 2 — Moderated private-use pilot

Recruit approximately 24–40 existing adult pairs in cohorts of 4–6, with a formal safety review between cohorts. “Moderated” means a trained researcher briefs and debriefs participants, is immediately reachable, and monitors product/system status; it does **not** mean watching, listening to, or recording intimate interaction.

Use an accessible private room with an obvious unlocked exit, a participant-controlled door, neutral supplies, and no camera or microphone. Participants can summon the moderator or leave independently. The first cohort should be capped at categories 0–4. Open kissing/sensual-external candidates only after a cohort review. C06, if approved at all, is isolated in a later cohort and remains over clothing.

Recruit for variation deliberately, without turning identity into sensitive product data. A recruitment service may purposively recruit against an ethics-approved matrix without passing identities to product telemetry. If voluntary research demographics are necessary to evaluate inclusion, keep them coded, separate, minimally granular, access-limited, and subject to the approved retention schedule. Across the pilot seek paid input from:

- DE-first and EN-first participants;
- queer, trans/nonbinary, heterosexual, and diverse relationship-structure perspectives;
- a range of adult ages and relationship durations;
- disabled and nondisabled participants, including mobility, vision, hearing, dexterity, chronic-pain/fatigue, and neurodivergent/sensory perspectives; and
- people who choose only no-touch or a narrow category set as well as people interested in broader eligible categories.

Do not claim representativeness. Small subgroup counts can reveal usability failures but cannot prove equality or absence of harm.

#### Stage 3 — Closed field reliability test

Only after Stage 2 passes, run a limited invitation-only field test with conservative core cards and no C06. The purpose is reliability in real devices/environments and post-session safety signals, not efficacy. Predetermine sample, duration, stop rules, data deletion, and safety-review cadence with the reviewers and counsel. Public discovery and open enrollment remain disabled.

### 15.4 Recruitment and participant protections

- Recruit existing pairs; do not match strangers for physical interaction.
- State the categories before enrollment so no one must join to learn the sexual content.
- Compensate each person independently and fully even if they decline, skip all touch, withdraw, or their partner continues a debrief alone.
- Obtain study consent from each person privately. Research consent is separate from consent to every action.
- Privately screen for immediate pressure, inability to say no safely, impaired capacity, researcher/manager/teacher/clinician dependency, or participation primarily to prevent a partner's anger. Do not ask for trauma or abuse narratives. A concerning answer ends participation neutrally and offers private resources.
- Do not enroll anyone currently intoxicated or otherwise unable to decide, anyone below the applicable adult age, or anyone for whom the study team's risk review identifies a contraindicated dependency or safety context.
- Permit either participant to withdraw data to the extent described in the approved protocol, without informing the partner which response led to withdrawal.
- Do not tell participants that the product is “safe,” “trauma-informed,” therapeutic, or likely to improve their relationship.

### 15.5 Measures

Collect each participant's ratings privately and analyze actor-level as well as pair-level disagreement. Predetermine exact items and analysis before Stage 2.

Use behaviorally specific, cognitively tested items rather than a proprietary “safety score.” A five-point response can be used for pressure, autonomy, comfort, ease of adjustment, screen interruption, pleasantness, and session satisfaction, but report each item separately with its wording and distribution. Comprehension should use scenario-based right/wrong or explain-back tasks, not agreement with “I understand consent.” Timing is appropriate for finding Pause/End, never for deciding consent. The internal/external consent measures cited earlier were developed as research scales in particular college samples; they do not validate a product gate and should not be repurposed as a safety certificate.

#### Primary safety/autonomy outcomes

- any app-prompted action that occurred without the participant wanting it at the time;
- felt pressure to say Yes, continue, reciprocate, escalate, explain, or protect the partner's feelings;
- ability to stop or adjust when wanted;
- whether the partner stopped/changed immediately;
- pain, distress, panic, dissociation-like experience, shame, conflict, or lingering discomfort;
- comprehension that each yes was category/action-specific, condition-specific, and revocable; and
- perceived privacy of individual choices.

#### Primary usability outcomes

- Pause and End discovery and activation time in a scripted task;
- gate/resolver comprehension;
- error rate for masking/handoff and assistive technology;
- perceived screen interruption and handoff burden;
- action-card readability and DE/EN semantic equivalence;
- ability to use no-touch/clothed/accessible-position alternatives; and
- route duration and abandonment, without interpreting early ending as failure.

#### Secondary immediate-experience outcomes

- comfort;
- autonomy;
- pleasantness;
- perceived partner responsiveness;
- perceived communication quality;
- satisfaction with this session; and
- desire to use the experience again.

These remain separate outcomes. Do not combine them into a “connection,” “chemistry,” “heat,” or safety score.

#### Qualitative evidence

Conduct private, separate semi-structured interviews after the session. Use cognitive interviewing on exact copy (“What did this gate authorize?”), critical-incident prompts (“When was it easiest or hardest to change direction?”), and counterfactuals (“What would you do if you wanted the area but not the pressure?”). Ask about pressure, privacy, interruption, access, language, cultural assumptions, and anything that felt absent or overstepping. Passing a question is always allowed.

Offer one privacy-safe, separately opted-in 24–72-hour follow-up for lingering discomfort, conflict, benefit, or changed interpretation; compensation must not depend on responding. Do not conduct a joint reconciliation interview. Analyze EN and DE material in the original language with trained coders, preserve negative/disconfirming cases and within-pair disagreement, and report when a theme comes from only a small subgroup. Prefer participant-reviewed notes to audio; if recording is scientifically necessary, obtain separate consent, minimize content, encrypt, restrict access, and delete on the approved schedule.

#### Exploratory outcomes only

Subjective desire or arousal may be studied only if the ethics/privacy review finds a specific research need. Ask privately after the session, make omission explicit, do not feed responses back to the partner or product, do not use them to determine success, and do not retain them in ordinary telemetry. **Do not collect genital response, heart rate, HRV, respiration, skin conductance, camera-derived affect, voice, touch pressure, or other physiology in this pilot.**

Sexual satisfaction and relationship quality are not appropriate immediate efficacy endpoints for a single safety/usability pilot. A later controlled study would need validated constructs, adequate power, follow-up, comparison condition, attrition handling, dyadic analysis, and a preregistered analysis.

### 15.6 Adverse-event taxonomy

| Severity | Definition/examples | Immediate action | Study action |
|---|---|---|---|
| 0 — No adverse event | No harm; ordinary Skip/Adjust/Pause with no lingering discomfort | Continue if both choose | Record ordinary usability only |
| 1 — Mild, transient | Brief discomfort/confusion resolved immediately by stop/adjust; no unwanted action, injury, or lingering distress | Stop action; offer private check; participant chooses continue at lower category or end | Record minimal category and product relatedness; review at cohort end |
| 2 — Moderate/significant | Unwanted app-prompted contact; felt unable to stop; notable pain; panic/dissociation-like response; conflict or distress persisting beyond immediate stop; privacy breach | End session; separate private check-ins if safe; offer appropriate support/resources; no joint processing required | Notify safety lead same day; suspend implicated card/flow; written review before any further cohort |
| 3 — Serious | Injury requiring medical assessment; breathing/neurological symptoms; assault or credible immediate danger; severe psychological crisis; exposure of identifiable sexual data; any event meeting applicable serious-adverse-event definition | Stop; follow site emergency/safeguarding protocol; prioritize participant-directed immediate safety and medical care | Halt the entire study; notify ethics/legal/data-protection authorities as required; independent root-cause review before any restart |

Ordinary “No,” Skip, Pause, End, lack of arousal, or choosing no touch is **not** an adverse event. An unwanted action is an adverse event even if no injury occurs and even if a participant earlier chose Yes.

### 15.7 Moderator response protocol

1. **Stop and create choice.** End the product session. Ask privately whether the person wants space, to leave, a support person, medical help, or a resource. Do not require a narrative.
2. **Address urgent needs.** For breathing difficulty, neck symptoms, neurological signs, loss of consciousness, serious pain/injury, or immediate danger, activate the site emergency protocol. Do not provide improvised medical advice.
3. **Do not investigate in the moment.** Avoid leading questions, blame, forced reconciliation, or determining whether consent was “really” present. Preserve each person's independent access to exit and support.
4. **Minimize documentation.** Record severity, time, product state/card, immediate action, product relatedness assessment, and required follow-up. Keep identifying/support records separate from research data.
5. **Escalate.** The safety lead decides card suspension, cohort pause, or full halt under the predetermined rules. Legal/ethics reporting duties override the ordinary study timeline.
6. **Follow up only as approved.** Contact occurs through the participant's privately chosen channel and schedule. No notification should expose SLOW BURN or the event.

### 15.8 Predetermined stop rules

Stop the affected session immediately for any participant request, unwanted action, notable pain/distress, loss of capacity, privacy failure, resolver error, or failure of Pause/End.

Pause enrollment and convene the safety review before another pair if any of these occurs:

- one severity-3 event;
- one app-prompted unwanted action attributable to ambiguous, incorrect, or out-of-order content;
- one resolver failure that displays or permits a more permissive result than either person's choice;
- one exposure of a private individual choice to the partner;
- Pause or End unavailable/unresponsive during an action;
- a card bypasses its prerequisite gate; or
- two severity-2 product-related events, whether or not they share a cause.

No patch-and-continue on the same day for these events. Correct the cause, rerun automated and expert walkthroughs, update the risk record, and obtain reviewer authorization before restarting.

### 15.9 Prototype pass thresholds

These are conservative internal decision thresholds, not validated clinical cutoffs or proof of safety:

- zero severity-3 events;
- zero known app-prompted unwanted actions;
- zero fail-open resolver, privacy-mask, prerequisite, or Pause/End failures;
- at least 95% of individual scripted Pause/End tasks succeed without moderator help, with every failure investigated; target 100% before release;
- at least 90% of participants explain that yes is specific, changeable, and not implied by silence or prior participation; target 100% after copy correction;
- at least 90% can identify a non-touch and clothed path in every act;
- at least 85% report that adjustments were easy to express and acted on immediately;
- no more than 10% report any pressure from the interface to continue/escalate, and no recurring pressure theme; the release target is materially lower;
- no meaningful DE/EN comprehension divergence; and
- no unresolved access blocker or concentrated adverse signal in a recruited group.

Passing only permits the next bounded stage. It does not establish efficacy or guarantee safety.

## 16. Go/no-go matrix

| Gate | Prototype | Closed field | Public release |
|---|---|---|---|
| Existing CLOSER adult-library separation | Required | Required | Required |
| Independent age/capacity/willingness entry | Required | Required | Required plus counsel approval |
| Fail-closed bilateral resolver and prerequisite tests | Required | Required | Required with security/reliability sign-off |
| Persistent Pause/End and no-resume lifecycle | Required | Required | Required |
| Zero-retention data-flow audit | Required | Required | Required plus privacy/DPIA determination |
| Sexual-health/sex-therapy review | Required | Required | Final exact-copy approval |
| Trauma/safeguarding review | Required | Required | Final protocol/copy approval |
| Disability/accessibility review and testing | Required | Required | WCAG 2.2 AA plus physical-flow findings resolved |
| DE/EN native inclusive-language review | Required | Required | Final approval |
| Austrian/EU legal and youth-protection review | Protocol review | Closed-test review | Required before public availability |
| Staged adverse-event thresholds | Stage 0/1 then 2 | Stage 2 passed | Stage 3 passed; unresolved safety signals = no-go |
| C06 intimate external over-clothing category | Isolated later cohort only, if approved | Excluded by default | Separate future decision; not in recommended V1 |
| Penetration/genital/oral/anal technique, toys, hazardous/kink content | No-go | No-go | No-go |
| Arousal, therapy, tantra, physiology, relationship-improvement claims | No-go | No-go | No-go absent a separate adequate evidence program |

### Current decision by maturity

- **Design prototype:** GO, provided architecture uses only static/simulated data until expert review.
- **Stage 1 low-contact usability:** conditional GO after expert, automated-state, privacy, accessibility, legal/ethics-screening, and moderator-readiness gates.
- **Stage 2 private touch pilot:** NO-GO today; becomes conditional only after Stage 1 passes and the study protocol is approved.
- **Closed field test:** NO-GO until Stage 2 passes.
- **Public release:** NO-GO until all public-release gates pass.

## 17. Naming assessment

### 17.1 SLOW BURN

**Strengths:** familiar, compact, suggestive without naming anatomy, aligned with gradual pacing, and distinct from Date Night/Late Night.

**Risks:** “burn” can evoke pain, irritation, infection, heat, or hazardous sensation; “slow burn” implies a rising endpoint and may make staying low-intensity feel off-script; it is an English idiom/anglicism in German; and it can carry romance/erotica genre expectations the product does not fulfill. The evidence does not justify a promised “burn.”

**Recommendation:** retain only as the internal codename until comprehension and expectation testing. Do not let the name drive a linear escalation model.

### 17.2 Candidate names

| Candidate | EN/DE usability | Advantages | Risks |
|---|---|---|---|
| **TOUCH & TEMPO** | The same words are understandable in both languages | Names the actual medium and user-controlled variable; non-anatomical; does not promise arousal | “Touch” is English in German; “tempo” can sound performance-oriented unless subtitle stresses self-pacing |
| **CLOSER TOUCH** | English product-style name | Clear family linkage; straightforward | Generic; may imply touch is required |
| **NEARER / NÄHER** | Localizable | Emphasizes relational distance rather than heat | Can imply emotional outcome; name differs across languages |
| **UNHURRIED / OHNE EILE** | Localizable descriptor | Strong pacing and anti-pressure signal | Less erotic; translation is not a shared brand name |
| **YOUR PACE / EUER TEMPO** | Clear localized pair | Agency-focused | Plural/formality and brand consistency need review; touch is not explicit |
| **CONTACT / KONTAKT** | Clear | Literal, neutral | Can sound clinical or technical |

**Recommended test leader:** **TOUCH & TEMPO**, with a local-language descriptor rather than a promised outcome:

- **EN:** “A touch-forward experience with a fresh shared choice before every physical action or restart.”
- **DE:** “Ein berührungsorientiertes Erlebnis mit einer neuen gemeinsamen Entscheidung vor jeder körperlichen Handlung oder Wiederaufnahme.”

Test at least SLOW BURN, TOUCH & TEMPO, and YOUR PACE/EUER TEMPO. Ask what content, level, endpoint, safety, and pressure each name implies before revealing the description. Reject any name that makes a meaningful share of participants expect pain, forced escalation, tantra, explicit technique, orgasm, or therapeutic benefit.

## 18. Open decisions that require named owners

| Decision | Recommended owner(s) | Default until decided |
|---|---|---|
| Final name and DE/EN descriptor | Product + content + native-language reviewers | TOUCH & TEMPO test leader; SLOW BURN internal only |
| Whether kissing is V1 core | Sexual-health reviewer + safety lead + legal | Expert-reviewed candidate, not assumed |
| Whether sensual torso/hips/legs are V1 core | Same plus accessibility/trauma reviewers | Over clothing, receiver-named, gated |
| Whether C06 is ever public | Executive safety decision after evidence, not content alone | No-go |
| Exact adult-age/jurisdiction language | Austrian/EU legal and youth-protection counsel | Hidden prototype only |
| Ethics-review pathway | Research lead + counsel/independent ethics body | Treat as review-required |
| Emergency/support resources by locale | Safety lead + counsel + safeguarding reviewer | No participant pilot without them |
| Accessibility target and test matrix | Accessibility owner | WCAG 2.2 AA plus physical-flow testing |
| Data-flow/DPIA determination | Privacy lead/DPO/counsel | Zero retention; third-party scripts disabled |
| Pilot instrumentation | Research + privacy + safety | Separate minimal study system; no product analytics |
| Route labels/counts | Product + research | Quick/Standard/Unhurried; length never intensity |

## 19. Final recommendation

FR-019 has a plausible, differentiated product: not another question deck, and not a pseudo-clinical “arousal protocol,” but a **recipient-led touch experience organized around shared minimums, specific gates, easy adjustment, and a phone that recedes**.

The literature supports four bounded premises:

1. desire and arousal are heterogeneous and context-sensitive;
2. communication quality and perceived responsiveness are associated with useful sexual/relationship outcomes, though much evidence is correlational;
3. touch pleasantness depends on person, relationship, body area, pace, pressure, and context; and
4. subjective pleasantness, subjective/genital arousal, satisfaction, communication, and relationship quality are distinct outcomes.

It does **not** establish that a three-act app sequence generates arousal, improves relationships, regulates physiology, reproduces sensate focus, or makes intimate behavior safe. Accordingly, the right success criterion is not “did the pair get hotter?” It is:

> Could each person choose freely, understand the exact scope, guide what happened, be responded to, remain included, and stop without friction—and did the product avoid prompting harm or retaining intimate data?

Proceed only in staged, moderated form with the V1 ceiling at non-penetrative external touch and optional kissing, the fail-closed resolver, zero-retention architecture, specialist exclusions, and predetermined halt rules. Public release remains a no-go until the full gate matrix passes.

## 20. Source register and evidence limitations

Links below are stable DOI, PubMed, publisher, or official-source destinations. Material claims are cited at the point of use above.

### Desire, arousal, and response models

- Janssen & Bancroft (2023), dual-control-model scoping review: [DOI 10.1080/00224499.2023.2219247](https://doi.org/10.1080/00224499.2023.2219247); [PubMed](https://pubmed.ncbi.nlm.nih.gov/37267113/).
- Bancroft et al. (2009), dual control and individual differences review: [DOI 10.1080/00224490902747222](https://doi.org/10.1080/00224490902747222); [PubMed](https://pubmed.ncbi.nlm.nih.gov/19308839/).
- Ågmo & Laan (2023), incentive-motivation account: [DOI 10.1080/00224499.2022.2134978](https://doi.org/10.1080/00224499.2022.2134978); [PubMed](https://pubmed.ncbi.nlm.nih.gov/36378887/).
- Basson (2008), women's sexual response review: [DOI 10.1038/ijir.2008.23](https://doi.org/10.1038/ijir.2008.23); [PubMed](https://pubmed.ncbi.nlm.nih.gov/18548081/).
- Nowosielski et al. (2016), response-model heterogeneity: [DOI 10.1007/s10508-015-0611-4](https://doi.org/10.1007/s10508-015-0611-4); [PubMed](https://pubmed.ncbi.nlm.nih.gov/26601676/).
- Giraldi et al. (2015), Danish response-model study: [DOI 10.1111/jsm.12720](https://doi.org/10.1111/jsm.12720); [PubMed](https://pubmed.ncbi.nlm.nih.gov/25363341/).
- Chivers et al. (2010), subjective/genital agreement meta-analysis: [DOI 10.1007/s10508-009-9556-9](https://doi.org/10.1007/s10508-009-9556-9); [PubMed](https://pubmed.ncbi.nlm.nih.gov/20049519/).
- Velten et al. (2018), subjective and genital response under a mindfulness manipulation: [DOI 10.1080/00224499.2017.1408768](https://doi.org/10.1080/00224499.2017.1408768); [PubMed](https://pubmed.ncbi.nlm.nih.gov/29261339/).

### Communication, responsiveness, and outcomes

- Mallory (2022), communication and satisfaction meta-analysis: [DOI 10.1037/fam0000946](https://doi.org/10.1037/fam0000946); [PubMed](https://pubmed.ncbi.nlm.nih.gov/34968095/).
- Mallory et al. (2019), communication and sexual function meta-analysis: [DOI 10.1080/00224499.2019.1568375](https://doi.org/10.1080/00224499.2019.1568375); [PubMed](https://pubmed.ncbi.nlm.nih.gov/30777780/).
- Birnbaum et al. (2016), partner responsiveness and desire: [DOI 10.1037/pspi0000069](https://doi.org/10.1037/pspi0000069); [PubMed](https://pubmed.ncbi.nlm.nih.gov/27399250/).
- Muise et al. (2013), approach/avoidance sexual motives: [DOI 10.1177/0146167213490963](https://doi.org/10.1177/0146167213490963); [PubMed](https://pubmed.ncbi.nlm.nih.gov/23812928/).
- Rehman et al. (2017), observed sexual versus nonsexual conflict: [DOI 10.1007/s10508-017-1006-5](https://doi.org/10.1007/s10508-017-1006-5); [PubMed](https://pubmed.ncbi.nlm.nih.gov/28681190/).
- Séguin et al. (2024), during-sex communication qualitative study: [DOI 10.1080/00224499.2022.2134284](https://doi.org/10.1080/00224499.2022.2134284); [PubMed](https://pubmed.ncbi.nlm.nih.gov/36269285/).
- Sorg et al. (2026), multidimensional sexual communication in queer couples: [DOI 10.1080/00224499.2026.2630962](https://doi.org/10.1080/00224499.2026.2630962); [PubMed](https://pubmed.ncbi.nlm.nih.gov/41805159/).

### Touch and kissing

- Taneja et al. (2021), affective-touch systematic review: [DOI 10.1007/s00426-019-01253-8](https://doi.org/10.1007/s00426-019-01253-8); [PubMed](https://pubmed.ncbi.nlm.nih.gov/31630220/).
- Suvilehto et al. (2015), relationship-specific body-touch maps: [DOI 10.1073/pnas.1519231112](https://doi.org/10.1073/pnas.1519231112); [PubMed](https://pubmed.ncbi.nlm.nih.gov/26504228/); [correction record](https://pubmed.ncbi.nlm.nih.gov/26598682/).
- Debrot et al. (2013), touch, affect, and intimacy daily diary: [DOI 10.1177/0146167213497592](https://doi.org/10.1177/0146167213497592); [PubMed](https://pubmed.ncbi.nlm.nih.gov/23885034/).
- Campbell et al. (2025), affectionate touch in partnered women: [DOI 10.1080/00224499.2024.2310705](https://doi.org/10.1080/00224499.2024.2310705); [PubMed](https://pubmed.ncbi.nlm.nih.gov/38363343/).
- Muise et al. (2014), post-sex affectionate behavior: [DOI 10.1007/s10508-014-0305-3](https://doi.org/10.1007/s10508-014-0305-3); [PubMed](https://pubmed.ncbi.nlm.nih.gov/24777441/).
- Erdélyi et al. (2026), partner slow touch and subjective versus physiological outcomes: [DOI 10.1016/j.ijpsycho.2026.113441](https://doi.org/10.1016/j.ijpsycho.2026.113441); [PubMed](https://pubmed.ncbi.nlm.nih.gov/42520858/).
- Busby et al. (2022), kissing and couple satisfaction: [DOI 10.1080/0092623X.2021.1977747](https://doi.org/10.1080/0092623X.2021.1977747); [PubMed](https://pubmed.ncbi.nlm.nih.gov/34521316/).
- Wlodarski & Dunbar (2013), kissing attitudes/functions: [DOI 10.1007/s10508-013-0190-1](https://doi.org/10.1007/s10508-013-0190-1); [PubMed](https://pubmed.ncbi.nlm.nih.gov/24114390/).
- Fisher et al. (2015), affection and satisfaction across five countries: [DOI 10.1007/s10508-014-0426-8](https://doi.org/10.1007/s10508-014-0426-8); [PubMed](https://pubmed.ncbi.nlm.nih.gov/25370356/).

### Clinical and digital intervention analogues

- Linschoten et al. (2016), sensate-focus critical review: [DOI 10.1080/14681994.2015.1127909](https://doi.org/10.1080/14681994.2015.1127909); [author-hosted peer-reviewed paper](https://www.draveryclark.com/wp-content/uploads/2016/11/2016-01-04-Sensate-Focus-A-Critical-Literature-Review.pdf).
- Huang et al. (2024), online sensate-focus wait-list RCT: [DOI 10.1080/0092623X.2024.2355229](https://doi.org/10.1080/0092623X.2024.2355229); [PubMed](https://pubmed.ncbi.nlm.nih.gov/38853443/).
- Zarski et al. (2022), internet/mobile sexual-dysfunction intervention meta-analysis: [DOI 10.1038/s41746-022-00670-1](https://doi.org/10.1038/s41746-022-00670-1); [PubMed](https://pubmed.ncbi.nlm.nih.gov/36085306/).
- Çuvadar et al. (2025), mindfulness-based cognitive intervention meta-analysis: [DOI 10.1080/19317611.2024.2414064](https://doi.org/10.1080/19317611.2024.2414064); [PubMed](https://pubmed.ncbi.nlm.nih.gov/39935902/).
- Brotto & Basson (2014), mindfulness-based group treatment trial: [DOI 10.1016/j.brat.2014.04.001](https://doi.org/10.1016/j.brat.2014.04.001); [PubMed](https://pubmed.ncbi.nlm.nih.gov/24814472/).
- Tavares et al. (2020), cognitive-processing factors and sexual function/dysfunction systematic review: [DOI 10.1016/j.sxmr.2020.03.002](https://doi.org/10.1016/j.sxmr.2020.03.002); [PubMed](https://pubmed.ncbi.nlm.nih.gov/32402763/).
- Kernová et al. (2025), digital relationship-intervention meta-analysis: [DOI 10.1186/s40359-025-03444-y](https://doi.org/10.1186/s40359-025-03444-y); [PubMed](https://pubmed.ncbi.nlm.nih.gov/41024307/).
- Voigt (1991), tantra-derived clinical proposal: [DOI 10.1080/00926239108404345](https://doi.org/10.1080/00926239108404345); [PubMed](https://pubmed.ncbi.nlm.nih.gov/1758004/).
- Wade (journal volume 40(1), 2021; Crossref/online publication metadata 2022), sex-triggered altered/spiritual experiences review: [DOI 10.24972/ijts.2021.40.1.58](https://doi.org/10.24972/ijts.2021.40.1.58); [publisher issue record](https://digitalcommons.ciis.edu/ijts-transpersonalstudies/vol40/iss1/8/).

### Consent, trauma, body image, disability, pain, and neurodivergence

- Muehlenhard et al. (2016), complexities of consent review: [DOI 10.1080/00224499.2016.1146651](https://doi.org/10.1080/00224499.2016.1146651); [PubMed](https://pubmed.ncbi.nlm.nih.gov/27044475/).
- Jozkowski et al. (2014), internal/external consent scales: [DOI 10.1007/s10508-013-0225-7](https://doi.org/10.1007/s10508-013-0225-7); [PubMed](https://pubmed.ncbi.nlm.nih.gov/24452630/).
- Coimbra et al. (2023), tonic-immobility systematic review/meta-analysis: [DOI 10.1016/j.janxdis.2023.102730](https://doi.org/10.1016/j.janxdis.2023.102730); [PubMed](https://pubmed.ncbi.nlm.nih.gov/37229971/).
- SAMHSA (2014), trauma-informed approach concept and guidance: [official PDF](https://library.samhsa.gov/sites/default/files/sma14-4884.pdf).
- Evans-Mitchell et al. (2025), trauma-informed sexuality-education systematic review: [DOI 10.1080/19317611.2025.2464565](https://doi.org/10.1080/19317611.2025.2464565); [PubMed](https://pubmed.ncbi.nlm.nih.gov/40400560/).
- Woertman & van den Brink (2012), body image and women's sexual functioning review: [DOI 10.1080/00224499.2012.658586](https://doi.org/10.1080/00224499.2012.658586).
- Ramseyer Winter et al. (2020), body self-consciousness and sexual function: [DOI 10.1016/j.bodyim.2020.05.010](https://doi.org/10.1016/j.bodyim.2020.05.010); [PubMed](https://pubmed.ncbi.nlm.nih.gov/32574984/).
- WHO/UNFPA (2009), sexual and reproductive health for people with disabilities: [official publication](https://www.who.int/publications/i/item/9789241598682).
- Briggs et al. (2022), chronic musculoskeletal pain and sexuality systematic review: [DOI 10.1002/acr.24711](https://doi.org/10.1002/acr.24711); [PubMed](https://pubmed.ncbi.nlm.nih.gov/34057305/).
- Katz et al. (2021), chronic pain and sexual functioning systematic review: [DOI 10.1093/pm/pnaa451](https://doi.org/10.1093/pm/pnaa451); [PubMed](https://pubmed.ncbi.nlm.nih.gov/33576430/).
- Gray et al. (2021), autistic sensory experiences and sexuality: [DOI 10.1089/aut.2020.0049](https://doi.org/10.1089/aut.2020.0049); [PubMed](https://pubmed.ncbi.nlm.nih.gov/36605373/).
- Barnett & Maticka-Tyndale (2015), autistic adults' sexual-health narratives: [DOI 10.1363/47e5715](https://doi.org/10.1363/47e5715); [PubMed](https://pubmed.ncbi.nlm.nih.gov/26418175/).
- Gray et al. (2026), professional survey on autism, sexuality, and sensory curricula: [DOI 10.1007/s10803-026-07380-7](https://doi.org/10.1007/s10803-026-07380-7); [PubMed](https://pubmed.ncbi.nlm.nih.gov/42228235/).

### Phone use, high-risk exclusions, and official health/legal guidance

- Courtright & Caplan (2020), phones and relationship outcomes meta-analysis: [DOI 10.17161/hct.v1i2.13412](https://doi.org/10.17161/hct.v1i2.13412).
- Przybylski & Weinstein (2013), phone-presence experiments: [DOI 10.1177/0265407512453827](https://doi.org/10.1177/0265407512453827).
- Linares & Sellier (2021), direct replication: [DOI 10.1371/journal.pone.0251451](https://doi.org/10.1371/journal.pone.0251451); [PubMed](https://pubmed.ncbi.nlm.nih.gov/34106931/).
- Dwyer et al. (2018), phone-use field experiment: [DOI 10.1016/j.jesp.2017.10.007](https://doi.org/10.1016/j.jesp.2017.10.007).
- McDaniel & Drouin (2019), daily technoference: [DOI 10.1016/j.chb.2019.04.027](https://doi.org/10.1016/j.chb.2019.04.027); [PubMed](https://pubmed.ncbi.nlm.nih.gov/32831467/).
- Bichard et al. (2022), strangulation neurological-outcomes systematic review: [DOI 10.1080/09602011.2020.1868537](https://doi.org/10.1080/09602011.2020.1868537); [PubMed](https://pubmed.ncbi.nlm.nih.gov/33432860/).
- Schori et al. (2022), forensic BDSM fatality case review: [DOI 10.1007/s00414-021-02674-0](https://doi.org/10.1007/s00414-021-02674-0); [PubMed](https://pubmed.ncbi.nlm.nih.gov/34383118/).
- WHO, working definition and scope of sexual health: [official page](https://www.who.int/teams/sexual-and-reproductive-health-and-research/key-areas-of-work/sexual-health/defining-sexual-health).
- Women and Gender Equality Canada, sexual consent guidance: [official page](https://www.canada.ca/en/women-gender-equality/campaigns/gender-based-violence-its-not-just/sexual-violence-and-consent.html).
- CDC, STI risk and oral sex: [official page](https://www.cdc.gov/sti/about/about-sti-risk-and-oral-sex.html).
- NHS, cold sores: [official page](https://www.nhs.uk/conditions/cold-sores/).
- NHS Inform, non-fatal strangulation: [official page](https://www.nhsinform.scot/?healthy-living=non-fatal-strangulation-nfs).
- European Union, General Data Protection Regulation: [official EUR-Lex text](https://eur-lex.europa.eu/eli/reg/2016/679/oj).
- W3C, Web Content Accessibility Guidelines 2.2: [official Recommendation](https://www.w3.org/TR/WCAG22/).

### Generalizability and interpretation limits

- Many sexual-communication, touch, kissing, and body-image studies are cross-sectional or diary-based; happier relationships may communicate/touch more, rather than communication/touch producing the observed satisfaction.
- Experimental touch studies often use standardized brush strokes, brief laboratory tasks, or narrow skin sites. They do not establish real-world erotic technique.
- A large share of foundational sex-research samples are heterosexual, cisgender, White/Western, able-bodied, educated, coupled, or treatment-seeking. Later queer, cross-cultural, disability, and neurodivergence work improves coverage but does not eliminate the gap.
- Clinical interventions are multi-session, selected for symptoms, and often facilitated; effect sizes do not transfer to a single consumer experience.
- Safety and consent principles are ethically important but do not prove that an interface prevents coercion or adverse events.
- No study located directly tests CLOSER's combination of a shared phone, masked bilateral choices, physical sequencing, bilingual content, and an adult nonclinical audience.
- The 2026 studies cited are recent and should be rechecked during expert review; one recent result never overrides the broader pattern or product-safety boundary.

For these reasons, all efficacy language should remain at the level of **what the product offers**—choices, prompts, pacing, and controls—not **what it causes**.
