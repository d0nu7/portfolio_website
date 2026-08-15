# CLOSER – Feature Requests Iteration 8

**Datum:** 15.08.2026  
**Status:** Produkt- und Implementierungsspezifikation  
**Produktcode in diesem Review verändert:** Nein  
**Fragen-Quelle:** [`../content/CLOSER_Fragenkatalog_DE_EN.md`](../content/CLOSER_Fragenkatalog_DE_EN.md)  
**Forschungsgrundlage:** [`../content/CLOSER_Literaturrecherche_Fragendesign.md`](../content/CLOSER_Literaturrecherche_Fragendesign.md)

## Prioritäten

| ID | Priorität | Feature |
|---|:---:|---|
| FR8-01 | P1 | Vollständigen Fragenkatalog als Single Source of Truth integrieren |
| FR8-02 | P1 | Secret Question um `none | pending | asked` erweitern |
| FR8-03 | P1 | Pack-Auswahl und pack-spezifische Zeitrouten ausliefern |
| FR8-04 | P2 | „CLOSER PULSE“: ruhige Belohnungsanimationen an Meilensteinen |
| FR8-05 | P2 | Route- und Style-Copy technisch entkoppeln |
| FR8-06 | P2 | Content-Versionierung für sichere Resume-Migration |
| FR8-07 | P3 | Anonyme, freiwillige Zeitkalibrierung ohne Gesprächsdaten |

---

## FR8-01 – Fragenkatalog als Single Source of Truth

Der vollständige, zweisprachige Katalog liegt im Repository unter:

> [`docs/closer/content/CLOSER_Fragenkatalog_DE_EN.md`](../content/CLOSER_Fragenkatalog_DE_EN.md)

Er enthält:

- 9 Packs: CLASSIC, FIRST DATE, DATE NIGHT, COUPLES, FRIENDS, OLD FRIENDS, DEEP, CHAOS und LATE NIGHT;
- exakt 36 Masterfragen pro Pack, 3 Akte mit je 12 Fragen;
- insgesamt 324 Fragen, jeweils DE und EN;
- kuratierte Quick-, Standard- und Full-Routen;
- pack-spezifische Q37-Texte für `neither`, `one` und `both`;
- Response Cards, Intensitätskurven und LATE-NIGHT-Sicherheitsregeln.

### Verbindliche Produktgrenzen

- **CLASSIC Full bleibt exakt die bestehende Fragenfolge.** Die fünf im Katalog neutralisierten deutschen Personenformulierungen verändern keine Bedeutung.
- Kürzere CLASSIC-Routen sind kuratierte Auszüge, nicht „die Studie in 12/24 Fragen“.
- Neue Packs sind forschungsinformiert, aber nicht wissenschaftlich validiert. Das Produkt darf nichts anderes behaupten.
- Pack = Inhalt; Style = Inszenierung. Keine duplizierten Fragenlisten für ORIGINAL/PLAYFUL.
- Keine Frage wird zur Laufzeit zufällig ausgewählt.
- Jede Frage bleibt ohne Begründung ablehnbar; Antwort und Handlung sind nie geschuldet.

### Empfohlene Lieferreihenfolge

1. FIRST DATE als kurzer Pilot
2. DATE NIGHT
3. COUPLES
4. FRIENDS und OLD FRIENDS
5. CHAOS
6. DEEP
7. LATE NIGHT nach separater Consent-/18+-Abnahme

TTS wird erst danach packweise ergänzt. Die ausstehende ElevenLabs-Voice-Arbeit gehört ausdrücklich nicht in diesen Merge.

### Abnahmekriterien

- Jede Frage besitzt eine stabile ID wie `first-date-q01`.
- Ein automatischer Konformitätstest prüft Pack-, Akt-, Sprach- und Routenvollständigkeit.
- Quick = 12 und Standard = 24, sofern die Route angeboten wird; Full = 36.
- DEEP bietet bewusst keine Quick-Route.
- Die in der App gezeigten Zeitspannen kommen aus dem Pack, nicht aus globaler Copy.
- Alle dynamischen Q37-Texte stammen aus dem jeweiligen Pack.

---

## FR8-02 – Secret Question: echte „Heute keine“-Option

Der Katalog erlaubt jeder Person, die Geheimfrage mit **Heute keine / Not tonight** abzulehnen. Das aktuelle boolesche Modell kann diesen Fall nicht korrekt ausdrücken.

### State-Vertrag

```text
secretStatusByPlayer = ["none" | "pending" | "asked", "none" | "pending" | "asked"]
pendingOwners = indices where status === "pending"
```

Branches:

- `neither`: zwei vorhandene Geheimfragen sind noch offen;
- `one`: genau eine vorhandene Geheimfrage ist noch offen;
- `both`: keine vorhandene Geheimfrage ist offen; nur freiwillige Bonusfrage.

`none` darf niemals wie eine offene Frage behandelt werden. In Quick/Standard zeigt das UI **Letzte Frage / Final Question**, nicht die falsche Nummer 37.

### LATE NIGHT zusätzlicher Gate

Vor Akt II erscheint ein eigener erneuter Opt-in-Screen, bevor Berührung, Fantasien oder Kinks thematisiert werden. Beide können:

- fortfahren;
- direkt zu einem sanfteren Pack wechseln oder neu starten;
- das Spiel ohne Rechtfertigung beenden.

Eine in der App gegebene Antwort ist nie Zustimmung zu einer Handlung. Consent wird außerhalb des Spiels konkret eingeholt und kann jederzeit zurückgezogen werden.

---

## FR8-03 – Pack-Auswahl und Zeitrouten

Die vorhandene Registry-/Routenarchitektur ist eine gute Basis, im aktuellen Branch ist aber weiterhin nur CLASSIC registriert. Nach dem Start folgt künftig:

```text
Start → Namen → Pack → Dauer/Route → Style → Intro → Spiel
```

Jede Pack-Karte zeigt in maximal drei kurzen Zeilen:

- für welche Situation sie gedacht ist;
- welche Intensität zu erwarten ist;
- welche Routendauer empfohlen wird.

LATE NIGHT ist sichtbar als **18+**, niemals Default und nicht als harmlose Erweiterung von DATE NIGHT dargestellt. DEEP ist nicht für einen schnellen Einstieg gedacht und bietet keine Quick-Route.

### Abnahmekriterien

- Pack-Wechsel ändert Fragebank, Q37, Akttexte, Zeitspannen und verfügbare Routen.
- Style-Wechsel ändert nur Twists/Inszenierung.
- Route und Pack bleiben im Resume-State stabil.
- Nicht verfügbare Routen werden nicht als deaktivierte Sackgasse gezeigt, sondern gar nicht angeboten.
- Pack-Beschreibungen sind in DE/EN vollständig und genderneutral.

---

## FR8-04 – CLOSER PULSE: Meilenstein-Animation statt Punkte

### Ziel

Die App soll sich lebendiger und belohnender anfühlen, ohne die Aufmerksamkeit während der Fragen vom Gegenüber zurück aufs Telefon zu ziehen. Die Belohnung ist deshalb kein Score, Badge oder Streak, sondern ein kurzer visueller **Meilenstein-Ritus**.

Der Begriff „Dopamin“ sollte nicht in Produktcopy oder Ticket stehen. Gemeint ist positives Feedback und ein spürbarer Rhythmus, keine neurobiologische Wirkbehauptung.

### Leitidee

Zwei kleine Lichtpunkte beziehungsweise organische Linien beginnen getrennt und rücken mit jedem Akt etwas näher zusammen:

1. **Start:** zwei ruhige Punkte erwachen;
2. **Akt I abgeschlossen:** zwei Bögen finden einen gemeinsamen Rhythmus;
3. **Akt II abgeschlossen:** die Bögen überlappen kurz;
4. **Secret-Übergabe:** ein sanfter gemeinsamer Puls bestätigt den abgeschlossenen privaten Schritt;
5. **Akt III / Finale:** ein gemeinsamer Halo entsteht und verblasst – die Oberfläche zieht sich wieder zurück.

Das visualisiert Fortschritt, ohne Nähe zu messen oder zu bewerten. Keine Prozentzahl sagt, wie „close“ zwei Menschen seien.

### Geeignete Trigger

- Start des eigentlichen Spiels;
- jeder Aktabschluss und die nächste Akt-Enthüllung;
- abgeschlossene Secret-Question-Übergabe;
- Eintritt in die letzte Frage;
- Finale/Neustart.

Keine Animation läuft während des Lesens oder Beantwortens einer Frage. Skip, **Lieber nicht** und **Hier enden** erhalten keine negative oder enttäuschte Animation.

### Motion-Spezifikation

- 600–1.000 ms pro Meilenstein, niemals länger als 1.200 ms blockierend;
- **Weiter** spätestens nach 300–400 ms bedienbar;
- Tippen überspringt den Effekt sofort;
- standardmäßig lautlos; keine automatischen Reward-Sounds;
- vorhandenes Haptic-Feedback nur sehr dezent, nur wenn unterstützt und nicht bei Reduced Motion;
- Inline-SVG plus CSS/Web Animations API; kein externer Lottie-Download für Version 1 nötig;
- nur `transform` und `opacity` animieren, keine layoutverändernden Eigenschaften;
- View Transition API nur als progressive Verbesserung, immer mit statischem Fallback;
- Assets vollständig lokal und offline verfügbar.

### Accessibility

Die Systempräferenz `prefers-reduced-motion: reduce` ist verpflichtend. Dann wird Bewegung durch eine höchstens 120–180 ms lange Opacity-/Farbblende oder einen sofortigen Zustandswechsel ersetzt. Zusätzlich kann im Menü **Bewegung reduzieren** angeboten werden; Systemvorgabe ist Default.

Der Fokus bleibt nach einer Transition sinnvoll gesetzt, Live-Regions kündigen nicht jede Animationsphase an, und es entsteht kein Layout Shift. W3C empfiehlt, nicht notwendige interaktionsbedingte Bewegung bei entsprechender Nutzendenpräferenz zu unterdrücken: <https://www.w3.org/WAI/WCAG21/Techniques/css/C39.html>. Für flüssige mobile Animationen sollten vor allem `transform` und `opacity` verwendet werden: <https://web.dev/articles/animations-and-performance>. Die View Transition API kann Screenwechsel progressiv verbessern, darf aber nie Voraussetzung sein: <https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API>.

### Was ausdrücklich nicht umgesetzt wird

- Punkte, Ranglisten, tägliche Streaks oder künstliche Knappheit;
- Konfetti nach jeder Frage;
- Bewertung einer Antwort oder der Beziehung;
- Animationen bei Ablehnung oder Abbruch;
- dauerhafte bewegte Hintergründe;
- Vollbild-Zooms, Parallax und hektische Swipe-Kaskaden.

### Akzeptanzkriterien

- Bei 320 × 568 bis 768 px kein Beschnitt und kein Layout Shift.
- Flüssiger Eindruck auf einem realen Android-Mittelklassegerät; Performance-Profiling dokumentiert.
- Alle Effekte sind überspringbar und unter Reduced Motion praktisch statisch.
- Keine zusätzliche Netzwerkabhängigkeit.
- Visuelle Regressionstests für jeden Meilenstein und beide Motion-Modi.
- Nutzertest fragt nicht nur „cool?“, sondern auch: „Hat der Effekt euch unterbrochen?“ und „Fühlte er sich wie eine Bewertung eures Gesprächs an?“

---

## FR8-05 – Route und Style konsequent entkoppeln

Route liefert Anzahl, Zeit, Progress-Berechnung und Routenbezeichnung. Style liefert nur Namen, Ton und aktivierte Twists. Die Style-Karte darf weder „36 Fragen“ noch „45 Minuten“ fest einbauen.

Empfohlenes Datenmodell:

```text
packId
contentVersion
routeId
styleId
runQuestionIds[]
currentRunIndex
actBoundaries[]
```

Alle Fortschritts- und Übergangstexte lesen `route` und `pack`; globale Copy enthält keine feste Anzahl oder Dauer.

---

## FR8-06 – Content-Versionierung

Sobald 324 Fragen und mehrere Routen ausgeliefert werden, darf ein späteres Content-Update ein laufendes Spiel nicht unbemerkt umsortieren.

### Lösung

- Beim Start `contentVersion` und die aufgelösten `runQuestionIds[]` speichern.
- Ein Resume verwendet diese IDs in der gespeicherten Reihenfolge.
- Entfernte IDs führen zu einer verständlichen Migrationsentscheidung, nicht zu einem falschen Fallback.
- Rein sprachliche Copy-Updates können dieselbe ID behalten; inhaltlich wesentlich neue Fragen erhalten eine neue ID oder Major-Version.

---

## FR8-07 – Zeitspannen nach echten Sessions kalibrieren

Die Katalogzeiten sind Pilotspannen. Optional kann CLOSER am Ende lokal die Gesamtdauer anzeigen und freiwillig fragen, ob die anonyme Dauerstatistik gesendet werden darf. Niemals übertragen werden Namen, Antworten, Secret-Status oder einzelne Fragezeiten.

Ohne explizite Einwilligung bleibt alles lokal. Eine einfache manuelle Testmatrix mit mindestens fünf Sessions je Pack/Route ist für Version 1 ausreichend und datenschutzärmer als voreilige Telemetrie.
