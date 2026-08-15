# CLOSER – Produktdokumentation

## Verbindliche Inhalte

- [Vollständiger Fragenkatalog DE/EN](content/CLOSER_Fragenkatalog_DE_EN.md)
- [Literaturrecherche zum Fragendesign](content/CLOSER_Literaturrecherche_Fragendesign.md)

## Aktueller Review – Iteration 8

- [Ganzheitlicher Review](reviews/CLOSER_Ganzheitlicher_Review_Iteration8_2026-08-15.md)
- [Bugfix-Report](reviews/CLOSER_Bugfixes_Iteration8_2026-08-15.md)
- [Feature Requests](reviews/CLOSER_Feature_Requests_Iteration8_2026-08-15.md)

Der Fragenkatalog ist die redaktionelle Single Source of Truth für Pack-IDs, Fragen, Routen und pack-spezifische Finale. Produktcode und Tests bleiben die technische Source of Truth für den aktuell ausgelieferten Stand.

## Implementierungsstatus (Stand: siehe Git-Log von `src/constants/closer.js`)

- **BF8-01 bis BF8-06** (Bugfix-Report): geschlossen.
- **Pack-Auswahl-Screen** (FR8-03): live, zwischen Namenseingabe und Dauer-Wahl.
- **Live registrierte Packs** (`src/constants/closer.js`, `PACKS`): CLASSIC, FIRST DATE, DATE NIGHT, COUPLES, FRIENDS, OLD FRIENDS, DEEP, CHAOS – Inhalt jeweils wortgleich aus dem Fragenkatalog übernommen. Jedes der acht Packs hat inzwischen einen kleinen, bewusst sparsamen Satz an Twists (2–3 Fragen pro Pack, `deeper`/`stayEnabled`) – redaktionelle Entscheidung, in derselben Sitzung wie die Akzentfarben getroffen. PREDICT/BOTH/NO THINKING bleiben außerhalb von CLASSIC ungenutzt.
- **LATE NIGHT**: Inhalt vollständig in `closer.js` vorbereitet (`LATE_NIGHT_PACK`, exportiert für Tests), aber absichtlich **nicht** in `PACKS` registriert und damit im Spiel nicht erreichbar. Die Consent-Gate-UI (getrenntes 18+-Opt-in pro Person vor dem Pack, erneutes Opt-in vor Akt II) ist gebaut und generisch über `pack.consentGate` – aber toter Code, solange kein registriertes Pack dieses Feld setzt. Siehe TODOs unten für die verbleibende Voraussetzung.
- **FR8-04 – CLOSER PULSE**: live. Ruhige Meilenstein-Animation (`src/components/Closer/ClosePulse.js`) an Aktgrenzen, Secret-Übergabe und Finale – zwei Lichtpunkte, die sich annähern, ein gemeinsamer Puls bei der Geheimfrage, ein verblassender Halo im Finale. `prefers-reduced-motion` löst eine kurze Opacity-Blende statt der vollen Animation aus; Tippen überspringt sofort; die Continue-Steuerung des jeweiligen Screens bleibt nach ~350ms klickbar, auch wenn die Animation optisch noch ausklingt. Kein Sound, keine Bewertung, keine Animation bei Skip/Ablehnen/Beenden.
- **FR8-06 – Content-Versionierung**: live. `runQuestionIds[]` + `contentVersion` werden beim tatsächlichen Spielstart gespeichert; ein Resume vergleicht sie gegen den aktuell aufgelösten Lauf und verwirft den Spielstand, statt still auf verschobenem Content weiterzuspielen.
- **Response Cards**: live für FRIENDS, OLD FRIENDS und DEEP (19 Fragen). Ruhiger, immer sichtbarer Hinweis neben der Frage, nichts zum Antippen.

## Offene TODOs

### P1 – vor jedem öffentlichen Launch von CLOSER

- **Impressum/Datenschutz fehlen weiterhin.** `src/pages/` enthält keine entsprechende Seite (Stand dieses Commits). Das ist laut früherer rechtlicher Einordnung (ECG §5, MedienG §25, DSGVO Art. 13, TKG 2021 §165 Abs. 3) ein Launch-Gate, kein Nice-to-have – braucht RaDis echte Geschäfts-/Kontaktdaten, die keine Session bisher hatte und die nicht erfunden werden dürfen. Die unlistete URL begrenzt die praktische Exposition, ersetzt das Gate aber nicht.
- **Live-Deploy nicht verifiziert.** Ob `radi.solutions/closer` den aktuellen Stand (Pack-Auswahl, 8 Packs, alle BF8-Fixes) tatsächlich ausliefert, ist aus dem Repository nicht ersichtlich – letzter bekannter Befund war ein Build-ID-Unterschied zwischen live und lokal getestet. Braucht einen echten Smoke-Test nach dem nächsten Deploy: PWA-Install-Flow, Pack-Auswahl, mindestens ein Quick-Playthrough in einem neuen Pack.

### P1 – vor der Freigabe von LATE NIGHT speziell

- **Consent-Gate-UI ist gebaut, aber ungetestet im echten Klickpfad.** `CloserGame.js` hat jetzt einen generischen Mechanismus (`pack.consentGate`): (1) vor dem ersten Screen des Packs bestätigen beide Personen **getrennt** 18+ und Freiwilligkeit (`consentGatePassA/A/B/B`-Phasen, Text aus `LATE_NIGHT_CONSENT_NOTICE`); (2) vor Akt II ein zweites, ebenso gleichwertig sichtbares Opt-in (`consentAct2Pass...`-Phasen, Text aus `LATE_NIGHT_ACT_II_OPT_IN`), bevor Berührungs-/Fantasie-/Kink-Fragen erscheinen. Wird nicht zweimal aktiv zugestimmt, endet der Pack neutral. **Aber:** Da kein registriertes Pack `consentGate` setzt, ist dieser gesamte Codepfad tote, ungetestete Logik – kein E2E-Test kann ihn erreichen, ohne den Pack selbst zu registrieren (was genau das ist, was noch nicht passieren soll). Ein echter Klickpfad-Test kommt erst, wenn LATE NIGHT tatsächlich aktiviert wird.
- **Gesonderte österreichische Jugend-/Medien-/Datenschutzprüfung steht aus.** Der Fragenkatalog selbst sagt es explizit: "dieser Fragenkatalog ist keine rechtliche Freigabe." Das ist RaDis zu beauftragen, nicht etwas, das eine Coding-Session abhaken kann.
- Erst wenn das erledigt ist: `'late-night': LATE_NIGHT_PACK` in `PACKS` (in `closer.js`) eintragen. Ein Test in `closer.test.js` schlägt aktuell bewusst fehl, falls das versehentlich vorher passiert, ohne dass jemand diesen Kommentar liest.

### P2 – redaktionelle Entscheidung noch offen

- **Zweiter, twist-reicherer Style pro neuem Pack (PLAYFUL-Äquivalent).** Jedes der acht Packs außer CLASSIC hat aktuell nur einen einzigen Style. Ob und welcher zusätzliche Style (mit BOTH/NO THINKING) für DATE NIGHT, COUPLES etc. sinnvoll wäre, ist eine eigene redaktionelle Entscheidung, keine technische – die aktuelle sparsame Twist-Zuweisung deckt nur `deeper`/`stayEnabled` ab.

### P3 – Testing-Lücken

- **Reale Geräte-Tests weiterhin offen** (aus früheren Reviews, seither nicht erneut geprüft): PWA-Install-Flow unter `display: fullscreen` nach einem bestehenden Install, iOS "Add to Home Screen", echtes VoiceOver/TalkBack, Touch-Ziel-Komfort, CLOSER PULSE auf einem echten Android-Mittelklassegerät (FR8-04 verlangt das explizit als Akzeptanzkriterium).
- `feat/closer-voice` (TTS-Vorlesefunktion) bleibt wie besprochen unangetastet, bis RaDi sein eigenes Stimmmodell fertig hat.

### Kein offener Content-TODO mehr

Alle neun im Katalog geplanten Packs sind entweder live (8) oder vollständig vorbereitet und bewusst gesperrt (LATE NIGHT). Die nächste Content-Arbeit liegt bei den P2-Punkten oben, nicht bei weiteren Fragen-Packs.
