# CLOSER – Bugfix-Report Iteration 8

**Datum:** 15.08.2026  
**Geprüfter Branch:** `feat/pack-architecture`  
**Geprüfter Commit:** `380bf84dc80d549afc51c2fb7a83ce19ffdefda5`  
**Produktcode in diesem Review verändert:** Nein  
**Verbindlicher Content:** [`../content/CLOSER_Fragenkatalog_DE_EN.md`](../content/CLOSER_Fragenkatalog_DE_EN.md)

## Kurzstatus

Die Iteration ist technisch stabil. Es gibt keinen P0-Absturz und keine blockierte Hauptstrecke.

| Prüfung | Ergebnis |
|---|---:|
| Unit-Tests | **61/61 bestanden** |
| Mobile End-to-End-Tests (Pixel 7) | **47/47 bestanden** |
| ESLint | Bestanden |
| Production-Build / Static Export | Bestanden |
| Dependency-Audit | **0 bekannte Schwachstellen** |
| Browser-Konsole im manuellen Durchlauf | Keine Fehler oder Warnungen |
| Manuelle Viewports | 320 × 568 und 390 × 844 ohne Layoutbruch |

Offen sind zwei P1-UX-Fehler und zwei P2-Copy-/Wartbarkeitspunkte. Der gemeldete Resume-Effekt ist reproduzierbar, aber präziser als ursprünglich vermutet: Ein wirklich leerer Erstbesuch zeigt korrekt **Start**. Bereits nach einem einzigen Klick auf **Start** wird jedoch ein noch gar nicht begonnenes Setup als fortsetzbares Spiel gespeichert.

## Prioritätsübersicht

| ID | Priorität | Finding |
|---|:---:|---|
| BF8-01 | P1 | „Spiel fortsetzen“ erscheint schon nach begonnenem Setup statt erst nach tatsächlichem Spielstart |
| BF8-02 | P1 | Quick- und Standard-Route von CLASSIC weichen vom freigegebenen Fragenkatalog ab |
| BF8-03 | P1 | Style-Auswahl behauptet nach Quick/Standard weiterhin 36 Fragen und 45 Minuten |
| BF8-04 | P2 | Akt-I-Pause behauptet auch in Quick „vor 15 Minuten“ |
| BF8-05 | P2 | Hilfe-/Lösch-Copy sollte Cache und lokale Spieldaten klar trennen |
| BF8-06 | P3 | Architekturkommentar widerspricht teilweise der inzwischen flexibleren Pack-Validierung |

---

## BF8-01 – Verfrühtes „Spiel fortsetzen“

**Priorität:** P1  
**Fundstellen:** `src/components/Closer/CloserGame.js:291–298`, `src/components/Closer/CloserGame.js:303–318`

### Reproduktion

1. CLOSER auf einem Ursprung ohne vorhandene lokale Daten öffnen.
2. Der Startscreen zeigt korrekt **Start**.
3. Einmal auf **Start** tippen; die Namenseingabe erscheint.
4. Ohne Namen, Routenauswahl oder Beginn der ersten Frage neu laden.
5. Der Startscreen zeigt **Willkommen zurück**, **Spiel fortsetzen** und **Von vorne**.

### Ursache

Der Persistenz-Effekt speichert jede Phase außer `start`. Damit werden bereits `players`, `duration` und `mode` als Spielstand behandelt. Zusätzlich wird der Wake Lock schon während dieses Setups angefordert, weil auch dort `phase !== 'start'` gilt.

Das erklärt auch die Beobachtung nach „Cache leeren“: Der normale Browser-Cache und `localStorage` sind getrennte Speicher. Cache-Löschung entfernt den CLOSER-Spielstand in vielen Browsern nicht. Ein vollständig leerer Site-Storage zeigte im Test keinen falschen Resume-Screen.

### Empfohlene Korrektur

- Einen expliziten Marker wie `hasStarted` oder `startedAt` erst beim Übergang in `intro` beziehungsweise spätestens beim Start der ersten Frage setzen.
- `loadSaved()` darf nur Zustände mit diesem Marker als fortsetzbares Spiel anbieten.
- Setup-Werte können entweder gar nicht persistiert oder als getrennte Präferenzen gespeichert werden; sie dürfen aber keinen Resume-Screen auslösen.
- Wake Lock ebenfalls erst für tatsächlich laufende Spielphasen aktivieren.
- Alte Setup-only-Saves beim Laden verwerfen, damit der Fix auch für bestehende Geräte greift.

### Abnahmekriterien

- Frischer Besuch → **Start**.
- Start → Namenseingabe → Reload → weiterhin normaler Einstieg, kein **Spiel fortsetzen**.
- Erste Frage begonnen → Reload → **Spiel fortsetzen**.
- Abgeschlossenes oder bewusst zurückgesetztes Spiel → kein Resume-Angebot.
- Je ein E2E-Test für DE und EN sowie ein Migrationstest für einen alten Setup-only-State.

---

## BF8-02 – CLASSIC-Routen stimmen nicht mit dem Content-Review überein

**Priorität:** P1 – vor Bewerbung der Kurzfassungen  
**Fundstelle:** `src/constants/closer.js:440–477`  
**Quelle:** [`../content/CLOSER_Fragenkatalog_DE_EN.md`](../content/CLOSER_Fragenkatalog_DE_EN.md), Abschnitt CLASSIC

### Ist-Zustand

Die aktuelle Quick-Route verwendet in Akt I die lokalen Indizes `[0, 3, 6, 9]`, also Q01, Q04, Q07 und Q10. Damit folgen in einer als kurzer Einstieg angebotenen Runde direkt:

- Q07: Vorahnung zum eigenen Tod
- Q10: gewünschte Änderung an der eigenen Erziehung

Im manuellen Durchlauf war Q07 bereits die dritte angezeigte Frage. Das ist für eine 12-Fragen-Route ein unnötig harter Intensitätssprung. Auch die Standard-Auswahl entspricht nicht der inzwischen redaktionell geprüften Route.

### Verbindliche Route

Die Frageinhalte von CLASSIC bleiben unverändert. Nur die Auswahl der gekürzten Routen wird korrigiert:

| Route | Akt I | Akt II | Akt III |
|---|---|---|---|
| Quick | Q01, Q04, Q09, Q12 | Q13, Q14, Q16, Q17 | Q25, Q26, Q31, Q36 |
| Standard | Q01, Q02, Q03, Q04, Q08, Q09, Q11, Q12 | Q13, Q14, Q15, Q16, Q17, Q18, Q20, Q21 | Q25, Q26, Q27, Q28, Q29, Q30, Q31, Q36 |
| Full | Q01–Q12 | Q13–Q24 | Q25–Q36 |

### Abnahmekriterien

- Routen referenzieren stabile Frage-IDs statt nur schwer prüfbarer lokaler Array-Indizes oder werden zumindest gegen diese IDs getestet.
- Quick enthält exakt 4 Fragen je Akt, Standard 8, Full 12.
- Reihenfolge entspricht exakt dem Katalog.
- CLASSIC Full bleibt in Inhalt und Reihenfolge vollständig unverändert.
- Automatisierter Snapshot-/Konformitätstest vergleicht alle Route-IDs mit dem Katalog.

---

## BF8-03 – Falsche Umfangsangabe auf der Style-Auswahl

**Priorität:** P1  
**Fundstellen:** `src/constants/closer.js:381–418`, `src/components/Closer/CloserGame.js:851–867`

### Reproduktion

1. **Kurz – 12 Fragen – etwa 15 Minuten** wählen.
2. Weiter zur Style-Auswahl.
3. ORIGINAL behauptet **36 Fragen · 3 Akte · etwa 45 Minuten**.
4. PLAYFUL behauptet **Dieselben 36 tiefen Fragen**.

Dasselbe Problem besteht für Standard mit 24 Fragen. Sprache EN ist durch dieselben Konstanten ebenfalls betroffen.

### Empfohlene Korrektur

Style-Copy darf keine fest kodierte Route beschreiben. Empfohlen:

- ORIGINAL: „Zurückhaltende Inszenierung, ausgewählte Route.“ / “Understated presentation for your selected route.”
- PLAYFUL: „Dieselben ausgewählten Fragen – mit spielerischeren Twists.“ / “The same selected questions — with more playful twists.”
- Umfang und Zeit nur einmal separat aus dem gewählten `route`-Objekt anzeigen.

### Abnahmekriterien

- Quick zeigt auf jedem Setup-Screen 12 Fragen.
- Standard zeigt 24, Full 36.
- Style-Wechsel verändert weder Fragenzahl noch Route.
- DE und EN sind semantisch gleich.

---

## BF8-04 – Pausentext ist nicht routenfähig

**Priorität:** P2  
**Fundstelle:** `src/constants/closer.js:140–146`

Nach vier Quick-Fragen lautet der Akt-I-Übergang weiterhin sinngemäß „Dinge, die ihr vor 15 Minuten noch nicht wusstet“. Ein Quick-Akt ist mit etwa fünf Minuten geplant; bei unterschiedlichem Gesprächstempo kann jede konkrete Minutenbehauptung falsch sein.

**Empfehlung:** zeitneutral formulieren:

> „Ihr wisst jetzt wahrscheinlich Dinge voneinander, die ihr vor diesem Akt noch nicht wusstet.“  
> “You probably know things about each other now that you didn’t know before this act.”

Alternativ darf die Copy ausdrücklich aus `route.actTargetMinutes` berechnet werden, aber keine exakte vergangene Zeit behaupten.

---

## BF8-05 – Cache und lokale Spieldaten verständlich trennen

**Priorität:** P2

„Cache leeren“ ist für Nutzende kein zuverlässiger Weg, einen CLOSER-Spielstand zu entfernen. Das vorhandene **Lokale Spieldaten löschen** ist der richtige Produktweg und sollte in Hilfe/Datenschutz als solcher benannt werden.

**Empfohlene Copy:**

> „Browser-Cache und lokaler Spielstand sind getrennt. Mit ‚Lokale Spieldaten löschen‘ entfernst du Namen, Einstellungen und Fortschritt dieses Spiels von diesem Gerät.“

Kein technischer Begriff ist auf dem Hauptscreen nötig; dort reichen **Von vorne** und die Löschfunktion im Menü.

---

## BF8-06 – Veraltete Architekturkommentare

**Priorität:** P3  
**Fundstelle:** `src/constants/closer.js:44–66`

Der Kommentar sagt zunächst, jedes Pack müsse eine starre Form erfüllen, erklärt wenige Zeilen später aber korrekt, dass 12 Fragen pro Akt nur noch eine Obergrenze sind und einzelne Routen fehlen dürfen. Das Laufzeitverhalten ist nicht kaputt, die Dokumentation erhöht aber die Fehlerrate beim Einbau der neuen Packs.

**Empfehlung:** Einen einzigen verbindlichen Schema-Kommentar beibehalten:

- derzeit exakt 3 Akte pro Pack;
- 1–12 Masterfragen pro Akt technisch zulässig;
- nur vorhandene, redaktionell vollständige Routen anbieten;
- Q37- und Secret-State pro Pack verpflichtend;
- Full ist nur dann verpflichtend, wenn das Pack als vollständiges 36-Fragen-Pack ausgeliefert wird.

## Release-Einschätzung

Die Findings blockieren keinen technischen Merge der getesteten Architektur. BF8-01 bis BF8-03 sollten jedoch vor einer breiten Bewerbung von Quick/Standard beziehungsweise vor der nächsten Content-Rollout-Iteration geschlossen werden. Für alle neuen Packs ist der Fragenkatalog die Abnahmegrundlage.
