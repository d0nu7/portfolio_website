# CLOSER – finaler Refactoringplan

**Stand:** 16.08.2026  
**Basis:** `main` ab `a8ac798`, `RefactoringClaude.md`, Iteration-9-Produktreview und Iteration-9-Code-Review  
**Ziel:** nachweisbare Produktfehler zuerst beheben, danach Content und Engine schrittweise entkoppeln – ohne Big-Bang-Rewrite und ohne den laufenden TTS-/ElevenLabs-Branch anzufassen

## Abschlussstand (16.08.2026, autonome Umsetzung Phase 0–4)

Phasen 0, 1, 2 und 4 sind vollständig abgearbeitet; Phase 3 bis auf die
Reducer-Extraktion (s. u.). Phasen 5–7 sind nicht begonnen – sie brauchen
RaDis redaktionelle Ersatzfragen (5), echte Rechts-/Kontaktdaten und
Geräte-/WebKit-Zugriff (6) beziehungsweise sein eigenes Stimmmodell (7,
Entscheidung 10) und wurden deshalb bewusst nicht autonom angefasst.

Einzig offen gebliebene, bewusst nicht in einer Sitzung durchgezogene
Position: **Events und erlaubte Phasenwechsel in einen reinen Reducer
verschieben** (Phase 3). `compileRun()` existiert bereits als additive,
getestete RunDefinition-Funktion (siehe unten); sie ist aber noch nicht
die Laufzeitquelle von `CloserGame.js`, und dessen ~50 inline
`if (s.phase === 'x')`-Zweige rufen weiterhin direkt `set()`/`setS()`
auf statt zu dispatchen. Diese Umstellung berührt genau die Übergänge,
die die Iteration-9-Reviews als fragil markiert haben (Geheimfrage-
Richtung, LATE-NIGHT-Consent-Pfad), und lässt sich anders als der
Content-Modul-Split (Phase 2, per Byte-für-Byte-JSON-Diff verifiziert)
nicht mechanisch beweisen – genau der Big-Bang-Rewrite, den dieses
Dokument in seiner eigenen Zielsetzung ausschließt. Bleibt ein eigener,
sorgfältig geprüfter Aufwand.

Jede abgeschlossene Position wurde gemessen, nicht behauptet: Content-
Umzug per Byte-Diff, jeder neue Regressionstest per `git stash`-
Gegenprobe gegen den alten Stand verifiziert, der neue E2E-Console-Guard
per Selbsttest bewiesen. Endstand: 232 Jest-Tests, 114 Playwright-E2E-
Tests, Lint und Build grün.

---

## 1. Verbindliche Entscheidungen

1. **Consent bleibt kostenlos.** Jede Frage kann ohne Begründung gepasst werden.
2. **Der bisherige Herz-Skip wird entfernt**, solange keine redaktionell freigegebenen Ersatzfragen existieren. Später kann daraus ein neutraler „Andere Frage“-Joker werden.
3. **Auswahlseiten erscheinen nur bei echter Auswahl.** Eine Option wird automatisch übernommen; null Optionen sind ein Konfigurationsfehler.
4. **Private Inhalte müssen pack- und routeabhängig sein.** Die universelle Geheimfrage wird nicht weiter ausgebaut, sondern später durch optionale Private Moments ersetzt.
5. **Quick bleibt quick.** Keine lange Secret-/Q37-Zeremonie in einer 12-Fragen-Route.
6. **Zeitangaben haben eine numerische Quelle.** Sichtbare Schätzung, Aktbudget und Overtime dürfen nicht getrennt berechnet werden.
7. **Saves werden gegen Zustandsinvarianten und Contentrevision geprüft**, nicht nur gegen oberflächliche Feldtypen.
8. **Belohnt wird der gemeinsame Meilenstein, nicht persönliche Offenlegung.** CLOSER PULSE/THREAD darf Aktgrenzen feiern, aber nie Tiefe, Tempo oder ein Ja bewerten.
9. **LATE NIGHT bleibt nicht registriert**, bis Consent-UI, eigenes Finale, rechtliche Prüfung und WebKit-/Gerätetests abgeschlossen sind.
10. **TTS folgt stabilen Content-IDs.** `feat/closer-voice` und ElevenLabs-Artefakte bleiben bis dahin unangetastet.

---

## 2. Warum dieser Plan von `RefactoringClaude.md` abweicht

`RefactoringClaude.md` misst Bundlegröße, Content-Anteil, tote Felder und Testduplikate sinnvoll. Diese Punkte bleiben im Plan. Drei Schlussfolgerungen werden korrigiert:

- Die bestehende Engine ist nicht nur ein großer, aber stimmiger Controller. Skip/Pass, Timer, Secret/Q37, Restart und Save-Invalidierung enthalten reproduzierbare Zustandsfehler.
- Ein testbarer Reducer beziehungsweise Transition-Kern ist deshalb gerechtfertigt. Nicht jeder Screen muss dafür eine eigene Komponente werden.
- Tote Akt-Untertitel werden nicht blind entfernt. Sie werden zusammen mit einem neuen numerischen Zeitmodell konsolidiert.

Die gzip-Größe bleibt unkritisch. Pack-Splitting dient Wartbarkeit und Reviewbarkeit, nicht einer behaupteten Performanceoptimierung.

---

## 3. Zielarchitektur

```text
src/closer/
  content/
    schema.js
    shared.js
    packs/
      classic.js
      first-date.js
      date-night.js
      couples.js
      friends.js
      old-friends.js
      deep.js
      chaos.js
      late-night.js
  engine/
    run-definition.js
    reducer.js
    persistence.js
    timing.js
    selectors.js
  copy/
    ui.js
  components/
    Dialog.js
    HandoffScreen.js
  screens/
    setup/
    game/
    finale/
```

Die öffentliche API von `src/constants/closer.js` bleibt während der Migration kompatibel. Erst wenn alle Imports umgestellt sind, wird die alte Fassade entfernt.

### RunDefinition

Nach Pack-, Routen- und Stylewahl wird einmalig ein unveränderlicher Lauf kompiliert:

```js
{
  packId,
  routeId,
  styleId,
  questions: [{ id, actIndex, sourceIndex, content }],
  actStarts: [0, 4, 8],
  timing: { totalMinutes, actMinutes },
  privateMoment: null,
  contentRevision,
  fingerprint
}
```

Alle Navigation, Persistenz, Timer und TTS-Zuordnung beziehen sich danach auf dieses Objekt.

**Status:** `compileRun()` ist implementiert und getestet (`src/constants/closer.js`, benannt `modeId` statt `styleId` – konsistent mit dem bestehenden Namen im übrigen Code). `CloserGame.js` liest weiterhin einzeln aus `resolvedActs()`/`routeTimingFor()`/`runFingerprintFor()`; die Umstellung auf dieses eine Objekt als Quelle ist an die noch offene Reducer-Extraktion (Phase 3) gebunden.

---

## 4. Umsetzungsphasen

### Phase 0 – Release-Korrektheit

Status dieser Iteration:

- [x] Herz-Skip und doppelte Skip-UI entfernen; kostenloses Passen als einzigen Sicherheitsweg behalten
- [x] Timer-Schalter auf den Dauer-Screen verschieben; Singleton-Style-Screen überspringen
- [x] packabhängige Positionierung im Intro anzeigen
- [x] Restart über eine kanonisierende Initial-State-Factory führen
- [x] `CONTENT_VERSION` beim Resume tatsächlich vergleichen
- [x] Save-Felder und packabhängige Phasen strenger validieren
- [x] Secret/Q37 kurzfristig semantisch korrekt und opt-out-konsistent machen
- [x] Quick von der bisherigen Secret-/Q37-Sequenz befreien und mit einem kompakten Finale beenden
- [x] frühes Ende von natürlichem Abschluss unterscheiden; Finale-Pulse nur bei Abschluss
- [x] Fokus-/Dialog-Grundlagen für Menü und Bestätigung korrigieren

**Abnahme:** Lint, Unit, Build und vollständige E2E-Suite grün; neue Regressionstests für jeden geänderten Pfad.

### Phase 1 – Inhalt und Identität

- [x] Fragen erhalten explizite stabile IDs
- [x] strukturierter DE/EN-Katalogabgleich nach Pack, Akt und ID
- [x] der Prototyp `scripts/check-catalog-fidelity.js` wird durch einen CI-tauglichen Exact-Match ersetzt
- [x] Contentrevision und geordneter Run-Fingerprint einführen
- [x] Response Cards als vollständige wiederverwendbare Objekte deduplizieren
- [x] Routenzeiten numerisch modellieren und aus einer Quelle rendern

**Abnahme:** Jede der 324 DE-/EN-Fragen und jede Routenzuordnung wird exakt geprüft; Drift beendet Tests mit Fehlerstatus.

### Phase 2 – Content modularisieren

- [x] `closer.js` in Packmodule, Shared Content und Engine-Fassade aufteilen
- [x] Akt-Numeralia, Full-Route und Routentitel deduplizieren
- [x] LATE NIGHT bleibt eigener, nicht registrierter Pack
- [x] öffentliche Exports während der Migration stabil halten

**Abnahme:** kein sichtbarer oder gespeicherter Flow ändert sich; Bundle bleibt in derselben Größenordnung; alle Tests grün.

### Phase 3 – Transition-Kern und Persistenz

- [x] `createInitialState(options)` zentralisiert (bereits seit Phase 0); `compileRun(options)` implementiert (`src/constants/closer.js`, additive RunDefinition, acht Tests) – **aber noch nicht die Laufzeitquelle** von `CloserGame.js`; diese Umstellung ist an den Reducer-Punkt darunter gebunden
- [ ] Events und erlaubte Phasenwechsel in einen reinen Reducer verschieben – bewusst offen, siehe „Abschlussstand“ oben für die Risikoabwägung
- [x] versionierten Save-Parser als diskriminierte Zustände implementieren
- [x] aktive statt verstrichener Wandzeit speichern; Background/Resume pausieren
- [x] abgeschlossene Runs löschen (Persistenz erst ab `hasStarted`); getrennte Präferenzspeicherung steht noch aus
- [x] Wake Lock nach `visibilitychange` erneut anfordern

**Abnahme:** Transition-Matrix, ungültige Saves, Background-Timer und Restart sind als Unit-Tests beweisbar.

### Phase 4 – UI und Accessibility

- [x] gemeinsames semantisches Dialog-/Bottom-Sheet mit Fokusfalle, Escape und Fokusrückgabe (`src/components/Closer/CloserDialog.js`; in Phase 0 vorgezogen, weil das Menü ohnehin darauf umgestellt werden musste – der Consent-Gate-Pfad nutzt es noch nicht)
- [x] wiederholte Handoff-Screens extrahieren
- [x] reine Setup-Screens extrahieren, ohne Flowlogik in Präsentationskomponenten zu verteilen
- [x] Text-/Aktionsfarben auf mindestens 4,5:1 bringen (+ :focus-visible-Ring). Erste Runde traf nur die im Plan genannten Fälle plus den namentlich genannten DEEP-Akt-III-Akzent; eine anschließende Vollprüfung aller neun Packs fand fünf weitere Werte darunter (DEEP Akt I/II, LATE NIGHT alle drei Akte) sowie das Field-Label – alle nachträglich auf ≥5:1 angehoben, `contrast.test.js` prüft jetzt alle 27 Pack-Akzente
- [x] Ending mit expliziter Tastaturaktion und stabiler Live-Region
- [x] Keyboard- und Accessibility-Smokes ergänzt, globaler Console-Guard; WebKit lokal nicht installiert (Download nicht ungefragt ausgelöst) -- als Folgeposten offen

### Phase 5 – neue Spielmechanik

- [ ] kuratierte Ersatzfragen pro Pack/Akt/Intensität erstellen
- [ ] neutralen „Andere Frage“-Joker mit resumefester Auswahl einführen
- [ ] pack- und routeabhängige Private Moments implementieren
- [ ] Quick ohne mehrteiligen Private Moment; CHAOS höchstens mit kurzem Secret Spark
- [ ] LATE NIGHT nur mit privaten Readiness-/Consent-Checks
- [ ] CLOSER THREAD als zurückhaltendes Akt-Meilensteinritual ausbauen

### Phase 6 – PWA, Recht und Deployment

- [ ] erreichbare Impressum-/Datenschutzlinks innerhalb des App-Kontexts
- [ ] Security Header im Vercel-Projekt
- [ ] optionaler Service Worker mit klarer Update-/Cache-Strategie
- [ ] WebKit/iOS- und reale Android-PWA-Abnahme
- [ ] optional `closer.radi.solutions` als eigenes Vercel-Projekt

Beim Originwechsel werden bestehende `localStorage`-Runs und installierte PWA-Identitäten nicht automatisch migriert. Der Wechsel braucht daher eine Übergangscopy und einen Redirect von `/closer/`.

### Phase 7 – TTS

- [ ] erst nach stabilen Frage-IDs und Contentrevision
- [ ] Audio manifest-/ID-basiert zuordnen
- [ ] ElevenLabs-Voice-Arbeit getrennt integrieren und testen

---

## 5. Teststrategie

Pflichtpipeline:

1. `npm ci`
2. `npm run lint`
3. `npm test -- --runInBand`
4. exakter Katalog-/Schemaabgleich
5. `npm run build`
6. Chromium Critical Paths
7. WebKit Critical Paths
8. Fail bei `pageerror` und unerwartetem `console.error`
9. Accessibility-Smoke

E2E-Tests für Packs werden tabellengetrieben konsolidiert. Ein alter `out`-Ordner darf nie ohne vorherigen Build getestet werden.

**Status (16.08.2026):** Schritte 1–6, 8 und 9 sind eingerichtet und laufen bei jeder Phase (`e2e/fixtures.js` für Schritt 8, `e2e/a11y-smoke.spec.js` für Schritt 9). Schritt 7 (WebKit) fehlt – WebKit ist in dieser Umgebung nicht installiert, ein automatischer Download wurde bewusst nicht ausgelöst.

---

## 6. Cleanup-Regeln

- Nur nachweislich unbenutzte Dateien, Exports, Kommentare und Duplikate entfernen.
- Keine Branches, Git-Objekte, Voice-Artefakte oder historische Reviews ohne eigene Freigabe löschen.
- `RefactoringClaude.md` wurde nach Übernahme der relevanten Befunde entfernt; dieses Dokument ist die einzige operative Refactoring-Roadmap.
- Der experimentelle Fidelity-Checker wurde nach 324-fachem DE/EN-Exact-Match durch den grünen Jest-Test ersetzt.
- Keine Dependency-Major-Upgrades mit Flow-/State-Refactoring mischen.
- Jede Phase endet mit vollständiger Verifikation und sauberem `git diff --check`.

---

## 7. Referenzen

- [`docs/closer/reviews/CLOSER_Ganzheitlicher_Review_Iteration9_2026-08-15.md`](docs/closer/reviews/CLOSER_Ganzheitlicher_Review_Iteration9_2026-08-15.md)
- [`docs/closer/reviews/CLOSER_Code_Review_Iteration9_2026-08-15.md`](docs/closer/reviews/CLOSER_Code_Review_Iteration9_2026-08-15.md)
- [`docs/closer/reviews/CLOSER_Refactoring_und_Spielmechanik_Iteration9_2026-08-15.md`](docs/closer/reviews/CLOSER_Refactoring_und_Spielmechanik_Iteration9_2026-08-15.md)
- [`docs/closer/content/CLOSER_Fragenkatalog_DE_EN.md`](docs/closer/content/CLOSER_Fragenkatalog_DE_EN.md)
