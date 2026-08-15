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
- **Live registrierte Packs** (`src/constants/closer.js`, `PACKS`): CLASSIC, FIRST DATE, DATE NIGHT, COUPLES, FRIENDS, OLD FRIENDS, DEEP, CHAOS – Inhalt jeweils wortgleich aus dem Fragenkatalog übernommen. Keine der neuen Packs hat bisher einen Twist zugewiesen (nur ein Style pro Pack); das ist eine bewusste redaktionelle Leerstelle, keine technische Einschränkung.
- **LATE NIGHT**: Inhalt vollständig in `closer.js` vorbereitet (`LATE_NIGHT_PACK`), aber absichtlich **nicht** in `PACKS` registriert und damit im Spiel nicht erreichbar. Siehe TODOs unten für die zwei offenen Voraussetzungen.

## Offene TODOs

### P1 – vor jedem öffentlichen Launch von CLOSER

- **Impressum/Datenschutz fehlen weiterhin.** `src/pages/` enthält keine entsprechende Seite (Stand dieses Commits). Das ist laut früherer rechtlicher Einordnung (ECG §5, MedienG §25, DSGVO Art. 13, TKG 2021 §165 Abs. 3) ein Launch-Gate, kein Nice-to-have – braucht RaDis echte Geschäfts-/Kontaktdaten, die keine Session bisher hatte und die nicht erfunden werden dürfen. Die unlistete URL begrenzt die praktische Exposition, ersetzt das Gate aber nicht.
- **Live-Deploy nicht verifiziert.** Ob `radi.solutions/closer` den aktuellen Stand (Pack-Auswahl, 8 Packs, alle BF8-Fixes) tatsächlich ausliefert, ist aus dem Repository nicht ersichtlich – letzter bekannter Befund war ein Build-ID-Unterschied zwischen live und lokal getestet. Braucht einen echten Smoke-Test nach dem nächsten Deploy: PWA-Install-Flow, Pack-Auswahl, mindestens ein Quick-Playthrough in einem neuen Pack.

### P1 – vor der Freigabe von LATE NIGHT speziell

- **Consent-Gate-UI existiert noch nicht.** `CloserGame.js` hat aktuell keinen generischen Mechanismus für ein pack-spezifisches Vorab-Gate. LATE NIGHT braucht laut Katalog zwei Stufen: (1) vor dem ersten Screen des Packs bestätigen beide Personen **getrennt** 18+ und Freiwilligkeit (`LATE_NIGHT_CONSENT_NOTICE` in `closer.js`, bereits transkribiert); (2) vor Akt II ein zweites, ebenso gleichwertig sichtbares Opt-in (`LATE_NIGHT_ACT_II_OPT_IN`), bevor Berührungs-/Fantasie-/Kink-Fragen erscheinen. Wird nicht zweimal aktiv zugestimmt, endet der Pack neutral.
- **Gesonderte österreichische Jugend-/Medien-/Datenschutzprüfung steht aus.** Der Fragenkatalog selbst sagt es explizit: "dieser Fragenkatalog ist keine rechtliche Freigabe." Das ist RaDis zu beauftragen, nicht etwas, das eine Coding-Session abhaken kann.
- Erst wenn beide Punkte erledigt sind: `'late-night': LATE_NIGHT_PACK` in `PACKS` (in `closer.js`) eintragen. Ein Test in `closer.test.js` schlägt aktuell bewusst fehl, falls das versehentlich vorher passiert, ohne dass jemand diesen Kommentar liest.

### P2 – nächste Feature-Arbeit (aus den Feature Requests, iteration 8)

- **FR8-04 – CLOSER PULSE.** Ruhige Meilenstein-Animationen an Aktgrenzen, Secret-Übergabe und Finale statt Punktesystem. Vollständige Motion-Spec liegt im Feature-Request-Dokument vor (Timing, `prefers-reduced-motion`, kein Sound). Eigenständiges visuelles Feature, keine reine Dateneingabe – noch nicht begonnen.
- **FR8-06 – Content-Versionierung.** Sobald mehrere Packs mit je eigenen Routen im Umlauf sind, darf ein späteres Content-Update ein laufendes Spiel nicht unbemerkt umsortieren. Lösung skizziert (siehe Feature-Request-Dokument: `contentVersion` + aufgelöste `runQuestionIds[]` im Resume-State), aber nicht implementiert.
- **Response Cards als UI-Feature.** Für FRIENDS, OLD FRIENDS und DEEP empfiehlt der Katalog optionale Zuhörimpulse nach bestimmten Fragen (z. B. "Nach Q36: REFLECT"). Der Text liegt als Kommentar bei den jeweiligen Packs in `closer.js`, wird aber nirgends gerendert – noch kein UI-Konzept dafür vorhanden.
- **Twist-Zuweisung für die neuen Packs.** Alle acht live registrierten Packs außer CLASSIC laufen aktuell mit einem einzigen, twist-freien Style. Ob und welche Fragen in DATE NIGHT, COUPLES etc. später PREDICT/BOTH/NO THINKING/GO DEEPER bekommen sollen, ist eine redaktionelle Entscheidung, die noch aussteht.

### P3 – Testing-Lücken

- **Kein dediziertes E2E pro neuem Pack.** Nur FIRST DATE hat eine eigene Playwright-Suite (`e2e/first-date-pack.spec.js`). DATE NIGHT, COUPLES, FRIENDS, OLD FRIENDS, DEEP und CHAOS sind ausschließlich über die generischen Registry-Konformitätstests in `closer.test.js` abgedeckt (Fragenanzahl, Routen-Grenzen, Geheimfrage-Platzierung) – nicht über einen echten Browser-Klickpfad wie bei FIRST DATE.
- **Reale Geräte-Tests weiterhin offen** (aus früheren Reviews, seither nicht erneut geprüft): PWA-Install-Flow unter `display: fullscreen` nach einem bestehenden Install, iOS "Add to Home Screen", echtes VoiceOver/TalkBack, Touch-Ziel-Komfort.
- `feat/closer-voice` (TTS-Vorlesefunktion) bleibt wie besprochen unangetastet, bis RaDi sein eigenes Stimmmodell fertig hat.

### Kein offener Content-TODO mehr

Alle neun im Katalog geplanten Packs sind entweder live (8) oder vollständig vorbereitet und bewusst gesperrt (LATE NIGHT). Die nächste Content-Arbeit liegt bei den P2-Punkten oben, nicht bei weiteren Fragen-Packs.
