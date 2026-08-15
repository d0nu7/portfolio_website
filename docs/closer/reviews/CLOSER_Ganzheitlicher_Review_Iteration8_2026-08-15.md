# CLOSER – Ganzheitlicher Review Iteration 8

**Datum:** 15.08.2026  
**Repository:** `C:\Users\D0nu7\Desktop\Repos\portfolio_website`  
**Geprüfter Branch:** `feat/pack-architecture`  
**Geprüfter Commit:** `380bf84dc80d549afc51c2fb7a83ce19ffdefda5`  
**Live-Smoke-Test:** `https://radi.solutions/closer/`  
**Produktcode in diesem Review verändert:** Nein  
**Hinweis:** Die rechtliche Einordnung ist eine technische und redaktionelle Risikoprüfung, keine individuelle Rechtsberatung.

## Gesamturteil

CLOSER hat in dieser Iteration eine belastbare technische Grundlage für unterschiedliche Spielzeiten und spätere Content-Packs. Die App ist mobil stabil, responsiv, zweisprachig und als PWA schlüssig. Die bisher priorisierten Punkte – genderneutrale Namensfelder, freiwilliges Überspringen, NO THINKING mit sichtbarer Frage, Q37-Verzweigungen, Datenschutz-/Rechtszugang und Resume-Validierung – sind weitgehend sauber abgedeckt.

Der neue Engpass ist die **Konsistenz zwischen Route, Copy und kuratiertem Inhalt**. Quick funktioniert technisch, enthält derzeit aber zwei sehr schwere Akt-I-Fragen und wird einen Screen später wieder als 36-Fragen-/45-Minuten-Erlebnis beschrieben. Außerdem wird ein bloß begonnenes Setup schon als fortsetzbares Spiel gespeichert.

Der Merge der Architektur ist technisch vertretbar. Vor einer breiten Bewerbung der kurzen Routen sollten BF8-01 bis BF8-03 geschlossen werden. Für die nächste Content-Iteration liegt nun eine vollständige, implementierbare Quelle im Repository.

## Neue verbindliche Dokumente

- **Fragen und Routen:** [`../content/CLOSER_Fragenkatalog_DE_EN.md`](../content/CLOSER_Fragenkatalog_DE_EN.md)
- **Literatur und Designprinzipien:** [`../content/CLOSER_Literaturrecherche_Fragendesign.md`](../content/CLOSER_Literaturrecherche_Fragendesign.md)
- **Konkrete Fehler:** [`CLOSER_Bugfixes_Iteration8_2026-08-15.md`](CLOSER_Bugfixes_Iteration8_2026-08-15.md)
- **Neue Features und Animation:** [`CLOSER_Feature_Requests_Iteration8_2026-08-15.md`](CLOSER_Feature_Requests_Iteration8_2026-08-15.md)

Der Katalog enthält 9 Packs × 36 Fragen = **324 zweisprachige Masterfragen**. Er ist ab jetzt die redaktionelle Single Source of Truth für IDs, Reihenfolge, Zeitrouten, Q37 und LATE-NIGHT-Leitplanken.

## Testumfang und Ergebnisse

### Automatisiert

| Bereich | Ergebnis |
|---|---:|
| State-/Content-/Registry-Unit-Tests | **61/61** |
| Mobile E2E auf Pixel-7-Profil | **47/47** |
| ESLint | Bestanden |
| Next.js Production-Build und statischer Export | Bestanden |
| Dependency-Audit | **0 bekannte Schwachstellen** |

Die E2E-Suite deckt unter anderem ab:

- DE/EN und ORIGINAL/PLAYFUL;
- Quick, Standard und Full;
- alle drei Akte;
- PREDICT, BOTH, NO THINKING, GO DEEPER und STAY;
- Skip, unbegrenztes **Lieber nicht**, Skip an der letzten Frage;
- Secret Question und sämtliche Q37-Branches;
- Finale, Neustart, Resume, Datenlöschung und ungültige Save-States;
- PWA-/Mobile-Verhalten im Pixel-7-Viewport.

### Manuell

- Live-Smoke-Test unter `/closer/`;
- frischer lokaler Ursprung und bestehender lokaler Spielstand;
- 390 × 844 sowie 320 × 568;
- kompletter Setup-Flow bis Quick/PLAYFUL und Akt-II-Übergang;
- gezielte Reproduktion des Resume-Falls;
- Browser-Konsole ohne Fehler und Warnungen.

Der erste lokale Buildversuch traf auf veraltete installierte Abhängigkeiten. Nach einer sauberen Installation aus dem vorhandenen Lockfile liefen Build, Tests und Audit vollständig durch; dies ist kein Produktfehler.

## Was bereits sehr gut funktioniert

### Produkt und Gesprächsfokus

- Das gemeinsame Gerät bleibt Regisseur, nicht Gesprächspartner.
- Antworten werden nicht eingegeben, ausgewertet oder aufgenommen.
- Es gibt keine scheinpsychologische Auswertung und keinen Beziehungs-Score.
- **Lieber nicht** bleibt kostenlos, unbegrenzt und ohne negative Rückmeldung.
- NO THINKING zeigt die Frage vor und während des Countdowns.
- Die Oberfläche wird in den späteren Akten ruhiger.
- Question 37 hat mehrere sichere Endpfade und keinen erzwungenen Abschluss.

### Mobile/PWA

- Der Screen ist bei 320 × 568 noch vollständig bedienbar.
- 390 × 844 wirkt ausgewogen und lässt bewusst Luft für das Gespräch.
- Safe-Area-/PWA-Konzept, Installationshinweis und Offline-Rahmen sind vorhanden.
- Die Browser-Adresszeile wird im installierten Standalone-PWA-Modus entfernt. Die systemeigenen Android-/iOS-Navigationsgesten beziehungsweise Home-/Back-Leiste gehören zum Betriebssystem und dürfen von einer normalen PWA nicht zuverlässig versteckt werden; das ist kein CLOSER-Bug.

### Architektur

- `PACKS` trennt Inhalt von Style.
- Routen werden packbezogen aufgelöst und können unterschiedlich lang sein.
- Fehlende Routen können technisch ausgelassen werden.
- State-Normalisierung, Speicherversion und Tests sind deutlich robuster als in früheren Iterationen.
- Die vollständige Suite ist schnell genug, um jeden Pack-Rollout regressionssicher zu begleiten.

### Sprache, Recht und Sicherheit

- Namensfelder heißen neutral **Person 1/Person 2** statt „dein/Ihr Name“.
- DE und EN sind als echte Sprachvarianten angelegt.
- Impressum/Datenschutz und lokale Löschmöglichkeit wurden in vorherigen Iterationen sinnvoll nachgezogen.
- LATE NIGHT im neuen Katalog ist 18+, freiwillig, handlungsfrei und consent-basiert; vor Akt II ist ein erneuter Opt-in vorgesehen.

## Wichtigste Findings

### P1 – vor Content-Rollout

1. **Resume beginnt zu früh:** Schon Namens-Setup wird als fortsetzbares Spiel gespeichert.
2. **CLASSIC-Kurzrouten falsch kuratiert:** Quick zeigt Tod und Erziehung in den ersten vier Fragen; Standard weicht ebenfalls vom Katalog ab.
3. **Route-Copy widerspricht sich:** Nach 12/24 Fragen behauptet der Style-Screen wieder 36 Fragen/45 Minuten.

Details und Abnahmekriterien: [`CLOSER_Bugfixes_Iteration8_2026-08-15.md`](CLOSER_Bugfixes_Iteration8_2026-08-15.md).

### P2 – danach

- Aktpausen müssen zeitneutral oder route-aware werden.
- Secret Question braucht für **Heute keine** den Status `none | pending | asked`.
- Content-Version plus aufgelöste Frage-IDs müssen im Resume-State stabil bleiben.
- Die Code-Kommentare zur Pack-Größe sollten die aktuelle Validierung eindeutig widerspiegeln.

## Content-Einschätzung der neuen Modi

### CLASSIC

Die 36 Masterfragen bleiben genau die bestehende Erfahrung. Das ist richtig. Die kürzeren Routen dürfen aber nicht einfach die härtesten Themen komprimieren; die im Katalog festgelegten Auszüge lösen dieses Problem.

### FIRST DATE

Quick ist leicht, neugierig und druckfrei. Fragen nach Wiedersehen, Grenzen und Tempo sind so formuliert, dass keine öffentliche Interessensbekundung erzwungen wird. Keine Sexualität, Todes- oder Traumafragen.

### DATE NIGHT

Spürbar flirtender und sinnlicher als FIRST DATE, ohne in LATE NIGHT überzugehen. Küsse werden konditional formuliert, Agency und Richtungswechsel bleiben möglich. Positive Resonanz und ein schöner Ausklang verhindern, dass Akt III nur aus Grenzgesprächen besteht.

### COUPLES

Konkrete Wertschätzung, Bedürfnisse, gelungene Reparatur und gemeinsame nächste Schritte. Die Fragen vermeiden therapeutische Diagnosen und unterstellen nicht automatisch einen Konflikt.

### FRIENDS / OLD FRIENDS

FRIENDS fokussiert Gegenwart, Bedeutung und konkrete gemeinsame Pläne. OLD FRIENDS trennt Nostalgie, heutige Realität und freiwillige Zukunft; eine Wiederannäherung wird nicht vorausgesetzt.

### DEEP

Bewusst ohne Quick-Route. Der Spannungsbogen geht tiefer, ohne Schmerz als Beweis von Authentizität zu behandeln. Schwere Fragen liegen überwiegend in Full; Standard bleibt tragfähig.

### CHAOS

Affiliatives Lachen statt Bloßstellung: keine Demütigungen, Körperbewertungen oder öffentlichen Dares. Das Pack erzeugt Energie durch gemeinsames Erfinden und Überraschung, nicht auf Kosten einer Person.

### LATE NIGHT

Explizit und erwachsen, aber kein Aufgaben-/Dare-Modus. Die Fragen behandeln Wünsche, Fantasie, Sprache, Grenzen, Safer Sex und Aftercare. Antworten sind nie Handlungs-Consent. Das Pack darf erst nach dem separaten 18+- und Consent-Gate veröffentlicht werden.

## Empfehlung für „mehr Coolness“

Die beste Richtung ist kein Punktesystem, sondern **CLOSER PULSE**: kurze, bedeutungsvolle Meilenstein-Animationen nur an Aktgrenzen, Secret-Übergabe und Finale. Zwei Lichtpunkte oder Linien rücken pro Akt visuell näher zusammen; im Finale entsteht kurz ein gemeinsamer Halo und die Oberfläche zieht sich zurück.

Damit wird Fortschritt fühlbar, ohne das Gespräch zu bewerten. Während Fragen bleibt alles ruhig. Effekte sind kurz, überspringbar, offline, mit `prefers-reduced-motion` praktisch statisch und technisch auf `transform`/`opacity` begrenzt. Die vollständige Spezifikation steht in FR8-04 des Feature-Request-Dokuments.

## Empfohlene nächste Umsetzung

1. BF8-01 bis BF8-04 schließen und E2E ergänzen.
2. Secret-State auf `none | pending | asked` migrieren.
3. Pack-Auswahl einbauen und FIRST DATE als Pilot aus dem Katalog implementieren.
4. Danach DATE NIGHT, COUPLES, FRIENDS/OLD FRIENDS, CHAOS und DEEP.
5. CLOSER-PULSE-Prototyp für Start, Aktwechsel und Finale auf einem realen Android-Gerät testen.
6. LATE NIGHT zuletzt und nur mit 18+-/Consent-Abnahme aktivieren.
7. ElevenLabs/TTS erst nach stabilen IDs und Routen separat mergen.

## Merge-Empfehlung

Die getestete Nicht-Voice-Architektur kann auf `main` zusammengeführt werden. Enthalten sein sollen die Next.js-Aktualisierung, Pack-/Style-Architektur, Release-Fixes, Zeitrouten, flexible Pack-Größe und diese Dokumentation. Ausgeschlossen bleiben:

- `feat/closer-voice` und alle noch nicht abgeschlossenen ElevenLabs-Assets;
- der historische/unabhängige Branch `STARTER`.

Nach dem Merge bleibt die App technisch grün, die drei P1-Findings sind aber als bekannte nächste Korrekturen zu behandeln.
