# CLOSER – Code Review, Iteration 9

**Stand:** 15.08.2026  
**Basis:** `main` auf `a8ac798` zuzüglich des in diesem Review dokumentierten Cleanup-Diffs  
**Schwerpunkte:** Zustandsmodell, Persistenz, Content-Architektur, Tests, Accessibility, PWA, Security und Wartbarkeit

---

## 1. Kurzurteil

Der Code ist für den sichtbaren Funktionsumfang bemerkenswert gut getestet und produziert einen kleinen, stabilen Static Export. Die Risiken liegen nicht bei der Bundlegröße oder einem fehlenden Frameworkwechsel. Sie liegen in drei inzwischen miteinander gekoppelten Monolithen:

- `CloserGame.js`: rund 1.995 Zeilen Controller, Zustandsmaschine, Persistenz, Timer, Wake Lock, Animationen, Dialoge und sämtliche Screens;
- `closer.js`: rund 3.530 Zeilen Content, Packkonfiguration, Routen und Engine-Helfer;
- Markdown-Katalog plus manuell duplizierter JavaScript-Content ohne exakten strukturellen Abgleich.

Die hohe Testzahl darf nicht mit bewiesener Produkt- oder Zustandskorrektheit verwechselt werden. Mehrere P1-Fehler sind vollständig testgrün: Skip ist redundant, Content-Versionierung invalidiert nichts, Save-Arrays werden nur oberflächlich geprüft und packfremde Copy wird korrekt – aber falsch – gerendert.

**Empfehlung:** erst Korrektheit und Datenmodell stabilisieren, dann Private Moments, weitere Styles oder TTS. Ein Big-Bang-Rewrite ist nicht nötig; ein schrittweiser Reducer-/RunDefinition-Refactor ist inzwischen aber gerechtfertigt.

---

## 2. Positive technische Befunde

- Next.js Static Export ist für die App passend konfiguriert.
- Produktions-Build, Lint, 161 Jest-Tests und 96 Playwright-Tests sind grün.
- `npm audit --omit=dev` meldet keine bekannte Schwachstelle.
- Direkte Abhängigkeiten sind vollständig auflösbar.
- Der CLOSER-Chunk ist mit ungefähr 146 KB roh beziehungsweise rund 40 KB gzip unkritisch.
- Unregistriertes LATE NIGHT wird aus dem Produktions-Bundle entfernt.
- Die Pack-/Routen-Engine hat acht Packs ohne Copy-Paste-Komponenten aufgenommen.
- State-Version, Shape-Fallback, Content-Run-Snapshot und defensive `localStorage`-Fehlerbehandlung sind grundsätzlich gute Entscheidungen.
- Antworten verlassen die App nicht; es gibt kein Antwort-Backend und keine Tracker.
- Fonts werden lokal ausgeliefert.
- Safe Area, Reduced Motion, Fokus auf neue Fragen und eine ruhige Live-Region für Countdowns sind vorhanden.
- Die PWA-Ressourcen werden live korrekt und ohne Konsolenfehler geladen.

---

## 3. P1-Findings

### CR-P1-01: Skip und Ablehnen besitzen dieselbe Transition

**Stellen:**

- `src/components/Closer/CloserGame.js:626–646`
- `src/components/Closer/CloserGame.js:1718–1735`
- `src/components/Closer/CloserGame.js:1904–1913`
- `src/components/Closer/CloserGame.js:1960–1985`

Beide Pfade rufen nach demselben 1,6-Sekunden-Flash `goTo(qIndex + 1)` auf. Nur Skip benötigt einen Confirm-Sheet und reduziert `skipsRemaining`.

**Codeentscheidung:** einen neutralen `PASS_QUESTION`-Event behalten und einen getrennten `REROLL_QUESTION`-Event erst einführen, wenn kuratierte Alternativ-IDs vorhanden sind. Keine zwei UI-Aktionen auf denselben Effekt legen.

### CR-P1-02: Secret/Q37 besitzt widersprüchliche Zustandssemantik

**Stellen:**

- `src/constants/closerCopy.js:207–290`
- `src/components/Closer/CloserGame.js:1317–1649`
- `src/constants/closer.js:3496–3529`

Probleme:

- Wunschfrage wird semantisch in falscher Richtung gestellt.
- `pack.q37.neither` wird nicht gerendert.
- `butYouEachHad` behauptet unabhängig von `hasSecretQuestion`, beide hätten eine Frage.
- `passPhoneText` sagt nach Opt-out weiterhin, die nicht vorhandene Frage dürfe nicht verraten werden.
- generische Copy, Packcopy und Boolean-Bedeutungen sind über drei Dateien verteilt.
- Route und Pack können die Mechanik nicht abschalten oder ersetzen.

**Codeentscheidung:** universelle Boolean-Matrix nicht weiter ausbauen. Eine typisierte `privateMoment`-Konfiguration mit expliziten Varianten und Resolution-Strategien einführen.

### CR-P1-03: Das Zeitmodell überschreibt Packrealität mit CLASSIC-Pacing

**Stellen:**

- `src/constants/closer.js:3306–3317`
- `src/components/Closer/CloserGame.js:704–712`
- Routenobjekte in `src/constants/closer.js`

`MINUTES_PER_QUESTION = 15 / 12` wird für alle Packs verwendet. Die vorhandenen Gesamtschätzungen reichen jedoch von 10 bis 75 Minuten. Der Timer zählt außerdem reale Wandzeit seit `actStartedAt`, also auch Zeit auf dem Resume-Screen und im Hintergrund.

**Codeentscheidung:**

```ts
type RouteTiming = {
  totalMinutes: number;
  actMinutes: [number, number, number];
  source: 'pilot' | 'editorial';
};
```

Aktive Zeit als `elapsedActiveMs` persistieren und nur während eines sichtbaren aktiven Runs akkumulieren.

### CR-P1-04: Pack-spezifische Copy wird global aus CLASSIC bezogen

**Stellen:**

- `src/components/Closer/CloserGame.js:1146–1153`
- `src/constants/closerCopy.js:81–99`

`classicPositioning` wird unabhängig von `packId` gerendert. Das ist ein Symptom dafür, dass globale UI-Copy und Packpositionierung nicht getrennt modelliert sind.

**Codeentscheidung:** `pack.positioning`, `pack.mechanicsIntro`, `pack.safetyNote`; global nur neutrale UI-Texte.

### CR-P1-05: `CONTENT_VERSION` invalidiert keinen Save

**Stellen:**

- `src/components/Closer/CloserGame.js:162–197`
- `src/components/Closer/CloserGame.js:267–280`
- `src/constants/closer.js:3433–3470`

`contentVersion` wird nur auf `number` geprüft. Ein Vergleich mit der aktuellen Version fehlt. `runQuestionIdsFor()` verwendet IDs aus Pack und Position. Damit gilt:

- Umformulierung oder Austausch an gleicher Position bleibt unentdeckt.
- Reordering innerhalb einer Full-Liste kann dieselbe Sequenz `q01…q36` erzeugen.
- Ein Versions-Bump allein hat keine Wirkung.

Der Kommentar, ein Bump könne substanzielle Änderungen invalidieren, ist aktuell falsch.

**Fix:**

1. explizite stabile Frage-ID, die mit der Frage wandert;
2. geordneter Fingerprint der kompilierten RunDefinition;
3. tatsächlicher Vergleich von `saved.contentRevision` und aktueller Revision;
4. bewusste Migrationsentscheidung: Copyfix kompatibel, Bedeutungsänderung inkompatibel.

### CR-P1-06: Save-Prüfung validiert Shape, nicht Zustandsinvarianten

**Stelle:** `src/components/Closer/CloserGame.js:162–286`

Beispiele:

- `players` wird nur als Array der Länge 2 geprüft; Nicht-Strings können später bei Stringoperationen scheitern.
- `qIndex`, `pending`, `breakAct` und Tokens dürfen Bruchzahlen und unplausible Bereiche enthalten.
- Consent-Phasen gelten auch bei einem Pack ohne `consentGate` als formal gültig.
- Beziehungen zwischen Phase, Route, Frageindex, Secret-Status und Pack werden nicht geprüft.

**Fix:** versionierter Parser einer discriminated union. Jede Phase besitzt genau die Felder und Bereiche, die sie benötigt. Ein ungültiger Save führt auf einen erklärten Fresh-Start, nicht nur still auf `null`.

### CR-P1-07: Restart kann einen packfremden Style hinterlassen

**Stelle:** `src/components/Closer/CloserGame.js:663–682`

Restart erhält Pack und Route, übernimmt aber `modeId` aus `initialState`, also den CLASSIC-Default. Für einen anderen Pack ist dieser Wert bis zur nächsten Kanonisierung ungültig.

**Fix:** Restart über eine einzige `createInitialState({lang, packId, routeId})`-Factory erzeugen, die Route und Style gegen den Pack kanonisiert.

### CR-P1-08: Accessibility der Sicherheits- und Dialogpfade

**Stellen:**

- `src/components/Closer/CloserStyles.js:130–239, 289–431`
- `src/components/Closer/CloserGame.js:726–807`
- `src/components/Closer/CloserGame.js:1960–1990`

Probleme:

- `Small` etwa 2,63:1, `TextButton` etwa 3,26:1, `MenuTrigger` etwa 2,43:1, mehrere 45-%-Texte etwa 4,14:1 auf dem Hintergrund.
- Der DEEP-Akt-III-Akzent `#2E3A59` ist als Text-/Buttonfarbe auf dem dunklen Grund nicht ausreichend.
- Bottom Sheets sind keine semantischen Dialoge und managen Fokus nicht.
- `Lieber nicht` ist als kleine, blasse Aktion schwerer sichtbar als die spielerischen Primäraktionen.

**Fix:** semantische Farbrollen (`surface`, `textPrimary`, `textMuted`, `action`, `onAction`, `decorativeAccent`), gemeinsamer Dialog und A11y-Tests.

### CR-P1-09: Consent-Gate-Aktionen sind visuell nicht gleichwertig

**Stellen:**

- `src/constants/closerCopy.js:293–300`
- `src/components/Closer/CloserGame.js:1120–1137`
- `src/components/Closer/CloserGame.js:1281–1314`

Copy und Katalog verlangen gleichwertige Zustimmung-/Stop-Optionen. Die UI nutzt aber einen gefüllten Primärbutton für Zustimmung und einen sekundären GhostButton für Ende.

**Fix vor LATE NIGHT:** gleiches visuelles Gewicht, keine vorselektierte Zustimmung, keine farbliche Wertung des Abbruchs.

---

## 4. P2-Findings

### CR-P2-01: Monolithischer Controller

`CloserGame.js` besitzt persistente Run-Daten, flüchtige Screen-Daten, Side Effects, Flow und View in einer Komponente. Transitions entstehen teils direkt in Click-Handlern, teils verzögert in Effects. Die Komponente hat zwar für jede bekannte Phase einen Renderzweig, beweist aber nicht, dass nur zulässige Phasenfolgen entstehen.

Ein Reducer beziehungsweise eine explizite hierarchische State Machine ist inzwischen sinnvoll. Nicht jede Phase braucht eine eigene React-Komponente; entscheidend ist zuerst ein testbarer Transition-Kern.

### CR-P2-02: Content und Engine liegen in derselben 3.530-Zeilen-Datei

Rund 89 % der Datei sind Packdaten. Jede Textänderung und Engineänderung konkurriert in derselben Datei. Die Trennung in Packmodule und Engine ist ein mechanischer, risikoarmer Schritt, sofern die öffentliche Exportoberfläche stabil bleibt.

### CR-P2-03: Rohdaten werden mehrfach pro Render kompiliert

`resolvedActs`, `totalQuestions`, `actIndexFor`, `questionAt` und weitere Helfer lösen überlappend dieselbe Route auf. Bei 36 Fragen ist das kein Performanceproblem. Es zeigt aber, dass eine einmalige `RunDefinition` als fachliches Objekt fehlt.

### CR-P2-04: PULSE unterscheidet keinen Endgrund

**Stelle:** `src/components/Closer/CloserGame.js:396–422`

Der Kommentar behauptet, ein Endpfad löse keine Belohnungsanimation aus. Tatsächlich erzeugt jeder Übergang nach `ending` den Finale-Pulse, auch ein früher Menüabbruch oder Consent-Abbruch.

**Fix:** `endReason: completed | userEnded | consentDeclined | invalidated` und Pulse nur für `completed`.

### CR-P2-05: PULSE kann nach 350 ms Taps durchreichen

**Stelle:** `src/components/Closer/ClosePulse.js`

Das Overlay deaktiviert Pointer Events, bevor die sichtbare Animation vollständig verschwunden ist. Ein Tap auf die sichtbare Animation kann dadurch einen darunterliegenden Button treffen.

**Fix:** Hit-Target bis zum visuellen Ende behalten; erster Tap schließt nur das Overlay.

### CR-P2-06: Wake Lock wird nach Hintergrundwechsel nicht sicher erneuert

**Stelle:** `src/components/Closer/CloserGame.js:438–454`

Mobile Browser lösen Wake Locks beim Verbergen. Da kein `visibilitychange`-Handler existiert und sich die Effect-Dependencies beim Zurückkehren nicht ändern, wird der Lock nicht zuverlässig neu angefordert.

### CR-P2-07: Persistenz ist breiter als die Resume-Funktion

Setup-only-Phasen werden gespeichert, obwohl sie nicht fortgesetzt werden. Ein abgeschlossener Run bleibt mit Namen und Einstellungen lokal erhalten, obwohl `loadSaved()` ihn verwirft.

**Fix:** erst ab `hasStarted` persistieren; aktiven Run bei Abschluss entfernen. Dauerhafte Präferenzen getrennt und minimal speichern.

### CR-P2-08: Ending ist maus-/touchzentriert

Der Body wechselt automatisch alle zwei Sekunden und ist klickbar, aber kein semantischer Button. Ein expliziter `Weiter`/`Überspringen`-Button oder ein stabiler Abschlussscreen ist für Tastatur und Screenreader besser.

### CR-P2-09: Begriffe überlagern sich

Pack, Mode und Style werden nicht sauber getrennt. Der Nutzer wählt bereits einen Spielmodus über den Pack und sieht danach nochmals „Modus wählen“.

**Zielbegriffe:**

- Pack beziehungsweise Gesprächsart;
- Länge beziehungsweise Route;
- Spielstil;
- Private Moment als optionale Packmechanik.

Intern: `modes`/`modeId` schrittweise zu `styles`/`styleId` migrieren.

---

## 5. Bewertung von `a8ac798`

### 5.1 `scripts/check-catalog-fidelity.js`

Der Prototyp ist als Explorationsskript nützlich, aber nicht als Fidelity-Test geeignet:

- prüft nur Deutsch;
- verliert Pack-, Akt- und echte Frage-ID;
- sucht nur die ersten 45 Zeichen irgendwo im gesamten `closer.js`;
- kann durch dieselbe Formulierung in einem anderen Pack oder Kommentar falsch grün werden;
- erkennt Änderungen nach Zeichen 45 nicht;
- vergleicht Englisch überhaupt nicht;
- gibt bei Drift keinen Fehler-Exitcode zurück;
- Kommentar spricht von einem mittleren Slice, implementiert ist ein Präfix.

Das Skript meldete zwei Abweichungen, obwohl ein exakter Vergleich fünf CLASSIC-Drifts ergab: Q01, Q06, Q25, Q27 und Q36. Diese fünf Katalogzeilen wurden im Cleanup an den unverändert bleibenden aktuellen CLASSIC-Code angeglichen.

**Nicht unverändert in CI übernehmen.** Stattdessen strukturierten Exact-Match nach Pack-ID, stabiler Frage-ID, DE und EN verwenden. Nur ausdrücklich erlaubte Unicode-/Typografienormalisierung zulassen.

### 5.2 `RefactoringClaude.md`

Gute Punkte:

- belastbare Bundlemessung;
- richtige Erkennung der Content-Monolithik;
- richtige Hinweise auf tote Akt-Untertitel, Pack-Boilerplate und E2E-Duplikate;
- vernünftige mechanische Packaufteilung.

Korrekturbedarf:

- „Bundle Splitting schadet Offline“ ist zu pauschal; aktuell existiert kein Service Worker. Bundle Splitting ist trotzdem wegen der kleinen gzip-Größe keine Priorität.
- Die bestehende Engine ist funktional breit, aber wegen Save-, Timer-, Secret- und Transitionfehlern nicht ausreichend bewiesen.
- Die Ablehnung eines Reducers/einer State Machine unterschätzt die konkret gefundenen Zustandsinvarianten.
- Tote Akt-Untertitel sollten erst zusammen mit dem neuen Zeitmodell entfernt werden.
- Das Dokument sollte langfristig unter `docs/closer/reviews/` konsolidiert werden, nicht dauerhaft als parallele Wahrheit im Repo-Root bleiben.

---

## 6. Testreview

### Stärken

- 96 Playwright-Fälle auf einem Pixel-7-Chromium-Profil.
- alle registrierten Packs besitzen eigene Durchläufe;
- Resume, Routes, Countdown, Secret, Q37, PULSE, Timer, Skip und Response Cards werden geprüft;
- E2E läuft gegen den Static Export;
- Inhalts- und Routen-Invarianten sind umfangreich.

### Lücken

- nur Chromium; kein WebKit/iOS-Profil, Desktop oder echte installierte PWA;
- kein globales Fail bei `pageerror`/`console.error`;
- keine Axe-, Keyboard-, Fokusfallen- oder Kontrasttests;
- viele Tests springen über eingesäte State-Objekte in einen späteren Flow;
- kein echter vollständiger Standard-/Full-Run je Pack;
- Helper verwenden häufig Legacy-Saves ohne aktuelle Run-IDs;
- Component-Tests sind im Verhältnis zum Controller sehr klein;
- keine Reducer-/Transitionstests;
- keine CI-Workflow-Datei im Repo;
- `npm run test:e2e` baut nicht zwingend vorher – ein alter `out`-Ordner kann versehentlich getestet werden;
- Timer ist primär gegen CLASSIC statt gegen verschiedene Packgeschwindigkeiten abgesichert;
- Save-Tests prüfen weder Elementtypen noch packabhängige Phase-Invarianten.

### Empfohlenes CI-Minimum

1. `npm ci`
2. Lint
3. Unit-/Schema-/Transitionstests
4. exakter DE/EN-Contentabgleich
5. Production Build
6. Chromium Critical Paths
7. WebKit Critical Paths
8. `pageerror`/Console-Guard
9. Accessibility-Smoke

---

## 7. PWA, Security und Privacy

### PWA

- Manifest ist korrekt auf `/closer/`, Portrait und Fullscreen ausgerichtet.
- Kein Service Worker; `/sw.js` liefert 404.
- Installation ist möglich, Offline-Neuladen nicht robust.
- `start_url`, `scope`, `id` und Canonical müssen bei `closer.radi.solutions` auf `/` umgestellt werden.
- Bereits installierte PWA und lokale Saves migrieren wegen des neuen Origins nicht automatisch.

### Security

- positiv: HTTPS und HSTS live;
- positiv: keine Antwort-API, keine Tracker, lokale Fonts, React-Escaping;
- ergänzen: CSP, `Referrer-Policy`, `X-Content-Type-Options`, `Permissions-Policy`, Frame-Schutz;
- CLOSER-Menü braucht sichtbare Rechtslinks.

### Lokaler Static Server

Der nur für Entwicklung/E2E verwendete Server hatte drei Härtungslücken:

- Pfad blieb nach Decode/Resolve ungeprüft;
- fehlerhaftes URL-Encoding konnte werfen;
- Bindung war nicht explizit Loopback;
- WebP-/Font-MIME-Typen fehlten.

Diese Punkte wurden im Cleanup behoben. Sie betrafen nicht die Vercel-Produktion.

---

## 8. Abhängigkeiten

`npm outdated` zeigt keine unmittelbare Sicherheitslücke, aber mehrere mögliche Major-Upgrades:

| Paket | installiert | neueste Hauptlinie | Empfehlung |
|---|---:|---:|---|
| React / React DOM | 18.2 | 19.2 | erst nach CLOSER-Korrekturrunde, eigener Upgrade-Branch |
| styled-components | 5.3 | 6.5 | zusammen mit Design-Token-/A11y-Arbeit prüfen |
| react-icons | 4.2 | 5.7 | niedrige Priorität |
| `@svgr/cli` | 6.5 | 8.1 | nur falls SVG-Workflow weiter genutzt wird |
| ESLint | 9.39 | 10.8 | auf Next-/Plugin-Kompatibilität warten/prüfen |

Kleine kompatible Updates (`react-burger-menu`, `styled-normalize`) können separat erfolgen. Keine breite Dependency-Migration mit dem Flow-Refactor mischen.

---

## 9. Durchgeführter sicherer Cleanup

- veraltetes, seit 2022 nicht gepflegtes `yarn.lock` entfernt; npm/`package-lock.json` bleibt verbindlich;
- ungenutztes Create-Next-App-Asset `public/vercel.svg` entfernt;
- ungenutztes `Head`-Import aus `src/pages/index.js` entfernt;
- auskommentierten `VR Patient`-Platzhalter mit `Bla.`/Google-URLs entfernt;
- bedeutungslose `wip`/`done`- und auskommentierte CSS-Zeilen entfernt;
- ungenutztes `src/CustomIcons/index.js`-Barrel entfernt; `RadiFace.js` und Quell-SVG bleiben;
- `npm start` auf den tatsächlichen Static-Export-Preview umgestellt;
- lokalen Static Server gegen Path Traversal/Decode-Fehler gehärtet, an Loopback gebunden und MIME-Typen ergänzt;
- veralteten Jest-Kommentar über eine nicht vorhandene `.babelrc` korrigiert;
- fünf CLASSIC-Katalogzeilen exakt an den aktuellen, ausdrücklich unverändert bleibenden Code angeglichen.

Bewusst **nicht** entfernt oder gemergt:

- LATE NIGHT Content und Consent-Code;
- `feat/closer-voice`;
- `public/CustomIcons/RadiFace.svg`;
- historische Reviews;
- der neue Fidelity-Prototyp, bis sein strukturierter Ersatz implementiert ist;
- Git-Branches und Git-Objekte ohne gesonderte Freigabe.

---

## 10. Verweise

- [Ganzheitlicher Review](CLOSER_Ganzheitlicher_Review_Iteration9_2026-08-15.md)
- [Refactoring und Spielmechanik](CLOSER_Refactoring_und_Spielmechanik_Iteration9_2026-08-15.md)
- [Fragenkatalog](../content/CLOSER_Fragenkatalog_DE_EN.md)

