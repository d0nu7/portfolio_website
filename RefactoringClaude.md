# CLOSER – Refactoring- und Optimierungsplan

**Stand:** nach Abschluss der Iteration-8-Umsetzung (Commit `c0ba0bd`)
**Methode:** Alle Befunde unten sind **gemessen**, nicht geschätzt. Wo ich nichts
gefunden habe, steht das auch so da – ein Refactoring-Plan, der überall ein
Problem findet, ist ein schlechter Plan.

---

## 0. Zuerst: Was *kein* Problem ist

Ich habe das explizit geprüft, damit niemand hier Aufwand hineinsteckt:

| Vermutung | Messung | Urteil |
|---|---|---|
| Bundle zu groß durch 8 Packs | CLOSER-Chunk **142 KB roh / 39 KB gzip** | **Unkritisch.** Kein Handlungsbedarf. |
| LATE NIGHT wird mit ausgeliefert | Kein einziger LATE-NIGHT-String im Build | **Korrekt tree-geshaked.** Gate funktioniert. |
| Toter Code / ungenutzte Exports | 0 ungenutzte Exports in `closer.js`, 0 in `CloserStyles.js` | **Sauber.** |
| Phasen ohne Render-Zweig (Blank-Screen-Risiko) | Alle 33 Phasen in `VALID_PHASES` haben einen Zweig | **Sauber.** |

**Bundle-Splitting pro Pack wäre reine Beschäftigungstherapie** und würde dem
PWA-/Offline-Ziel sogar schaden. Nicht machen.

---

## 1. Aus der Distanz: die drei strukturellen Themen

### 1.1 `closer.js` ist zu 89 % Daten

```
Zeilen    1– 118   Header-Kommentar
Zeilen  119–3280   Pack-DATEN            ← 3.162 Zeilen (89 %)
Zeilen 3281–3530   Engine-LOGIK          ←   250 Zeilen (11 %)
```

Die gesamte Spiellogik – `getPack`, `resolvedActs`, `secretAtIndexFor`,
`runQuestionIdsFor` – liegt unter 3.100 Zeilen Fragentext begraben. Jede
Content-Änderung und jede Logik-Änderung fasst dieselbe Datei an. Das macht
Reviews unnötig schwer und Merge-Konflikte wahrscheinlich.

### 1.2 `CloserGame.js` ist eine 1.995-Zeilen-Komponente mit 20 Phasen-Zweigen

Zwanzig sequenzielle `if (s.phase === …)`-Blöcke, alle mit demselben Aufbau
(`return frame(<>…</>, { … })`). Darunter **vier fast identische
„Handy weitergeben"-Screens** (`secretPass`, `checkPass`, `consentGatePass`,
`consentAct2Pass`) – dieselbe Struktur, viermal getippt.

### 1.3 Der Katalog ist „verbindlich", aber nichts prüft das

324 Fragen wurden von Hand aus dem Markdown-Katalog in Code übertragen.
Automatisch abgesichert sind davon exakt **zwei Packs** (CLASSIC, FIRST DATE)
und auch nur deren *Routen-IDs*, nicht der Fragentext. Für die restlichen
288 Fragen gilt: ein Tippfehler fällt niemandem auf.

**Das ist die größte Lücke im ganzen Projekt** – bei einem Produkt, dessen
Kernwert exakt formulierter Text ist.

---

## 2. Aus der Nähe: konkrete Befunde

### BEFUND A — Content-Drift zwischen Katalog und Code ⚠️ **braucht RaDis Entscheidung**

Ich habe alle 324 Katalogfragen gegen den Code geprüft. **322 stimmen wörtlich
überein. Zwei nicht:**

**Q01 (CLASSIC, Akt I)**
- Katalog: „Wenn du **eine beliebige Person** auf der Welt einladen könntest …"
- Code: „Wenn du **jeden und jede** auf der Welt einladen könntest …"

**Q27 (CLASSIC, Akt III)**
- Katalog: „Wenn **du und dein Gegenüber enge Freundschaft schließen würdet**, was wäre wichtig, über dich zu wissen?"
- Code: „Wenn **du mit deinem Gegenüber eng befreundet wärst**: Was wäre für **diese Person** wichtig, über dich zu wissen?"

Beide Fassungen sind genderneutral und bedeutungsgleich – es ist eine reine
Formulierungsfrage. Die Code-Version stammt aus dem Iteration-7-Sweep, die
Katalog-Version ist die spätere, geschliffenere Fassung.

**Der Widerspruch ist dokumentarisch:** Der Katalog nennt sich „redaktionelle
Single Source of Truth" (präskriptiv), schreibt im CLASSIC-Abschnitt aber
„Die nachstehende Fassung entspricht dem aktuellen Branch" (deskriptiv). Für
diese zwei Fragen kann beides nicht gleichzeitig stimmen.

→ **Ich ändere das nicht eigenmächtig.** Das ist dieselbe Art redaktioneller
Entscheidung, die ich die ganze Zeit an dich weitergereicht habe. Sag mir,
welche Richtung gilt (Code an Katalog anpassen, oder Katalog an Code), dann
ist es in fünf Minuten erledigt.

### BEFUND B — Kein Katalog↔Code-Fidelity-Test

Der Prüfskript-Prototyp existiert bereits (habe ich für Befund A geschrieben)
und findet die Abweichung zuverlässig. Er gehört als Jest-Test ins Repo:
danach ist jede der 324 Fragen dauerhaft gegen den Katalog abgesichert, und
jedes künftige Pack ebenfalls, ohne Zusatzaufwand.

### BEFUND C — 24 tote `subtitle`-Felder

`resolvedActs()` überschreibt die Akt-Untertitel grundsätzlich mit
`actSubtitle(questions.length)`. Die 24 handgeschriebenen `subtitle:`-Felder in
den Akt-Definitionen erreichen **nie** den Bildschirm. Geprüft: `act.subtitle`
wird nirgends gelesen, nur `route.subtitle` (das ist live und korrekt).

Gefährlich ist das nicht – aber jede Person, die einen neuen Pack anlegt, pflegt
dort gutgläubig einen Wert, der wirkungslos ist.

### BEFUND D — Response-Card-Texte 2–3× kopiert *(mein eigener halber Job)*

Ich habe heute die *Labels* sauber nach `RESPONSE_CARD_LABEL` extrahiert – die
*Texte* daneben aber wörtlich dupliziert stehen lassen:

```
3×  „Keine Lösung und keine Bewertung. Zeig zuerst, dass du es gehört hast."
2×  „Keine Lösung nötig. Zeig zuerst, dass du es gehört hast."
2×  „Du musst nichts rechtfertigen oder reparieren. …"
2×  „Freu dich kurz mit, bevor du deine eigene Geschichte erzählst."
2×  „Frag nach einem einzigen Detail aus dieser Szene."
2×  „Würdige kurz, was dieser Moment die Person gekostet …"
```

Halb extrahiert ist schlechter als gar nicht extrahiert: Label und Text
gehören zusammen, sonst driften sie auseinander.

### BEFUND E — 5 fast identische E2E-Dateien *(ebenfalls meine von heute)*

`couples-pack.spec.js` und `friends-pack.spec.js` unterscheiden sich nach
Normalisierung von Pack- und Mode-Namen um **11 Zeilen** – überwiegend
Kommentare. Fünf Dateien à ~52 Zeilen (≈260 Zeilen) leisten das, was eine
tabellengetriebene Spec mit ~60 Zeilen leisten würde.

Das war Copy-Paste-Testing. Funktioniert, ist aber die Sorte Ballast, die bei
der nächsten UI-Änderung fünffachen Anpassungsaufwand erzeugt.

### BEFUND F — Struktur-Duplikate in den Pack-Daten

| Wiederholung | Anzahl |
|---|---|
| `numeral: { de: 'AKT I' … }` | 9× |
| `meta: { de: 'Alle 36 Fragen' … }` | 9× |
| `actIndices: [null, null, null]` (Full-Route) | 10× |
| `title: { de: 'KURZ', en: 'QUICK' }` | 8× |
| „Macht weiter, wenn ihr so weit seid." | 9× |

Akt-Numeralia sind aus dem Index ableitbar; die Full-Route ist für jeden Pack
identisch; Routen-Titel/-Meta sind reine Boilerplate.

### BEFUND G — `resolvedActs()` wird pro Render 5×+ neu berechnet

Auf Top-Level-Ebene der Komponente laufen `resolvedActs`, `totalQuestions`,
`actIndexFor`, `questionAt` und `finalQuestionIndex` – und **jede dieser
Funktionen ruft intern erneut `resolvedActs()` auf**. Keine davon ist memoisiert.
Der Akt-Timer rendert die Komponente zusätzlich **jede Sekunde** neu.

**Ehrliche Einordnung:** Bei 36 Objekten ist das absolut gesehen unmessbar
schnell. Das ist kein Nutzerproblem, sondern Garbage-Churn und ein Signal, dass
die Ableitungskette nicht durchdacht ist. **Niedrige Priorität** – ich führe es
auf, weil es real ist, nicht weil es dringend wäre.

---

## 3. Der Plan, nach Wert sortiert

### Phase 1 — Inhaltliche Absicherung *(höchster Wert, geringstes Risiko)*

| # | Maßnahme | Aufwand | Risiko |
|---|---|---|---|
| 1.1 | **Entscheidung zu Q01/Q27 einholen** (Befund A) | 5 Min (deine) | – |
| 1.2 | **Fidelity-Test** Katalog↔Code als Jest-Test (Befund B) | ~1 h | sehr gering |
| 1.3 | Tote `subtitle`-Felder entfernen + Kommentar, dass `actSubtitle()` das ableitet (Befund C) | ~20 Min | sehr gering |

**Warum zuerst:** 1.2 kostet fast nichts, weil das Skript schon existiert – und
sichert ab sofort *jede* künftige Content-Arbeit ab. Ohne diesen Test ist jedes
weitere Pack wieder ungeprüft.

### Phase 2 — Datei-Struktur *(hoher Wert, mechanisch)*

| # | Maßnahme | Aufwand | Risiko |
|---|---|---|---|
| 2.1 | `closer.js` aufteilen: `src/constants/closer/packs/{classic,first-date,…}.js` + `src/constants/closer/engine.js` + `index.js` als Re-Export | ~2–3 h | gering, aber breit |
| 2.2 | Pack-Boilerplate deduplizieren: `ACT_NUMERALS`, `FULL_ROUTE`, Routen-Titel-Presets (Befund F) | ~1 h | gering |
| 2.3 | Response-Card-Texte zu vollständigen Objekten zusammenziehen (Befund D) | ~30 Min | sehr gering |

**Wichtig zu 2.1:** Das ist eine reine Verschiebung. Die `index.js` hält die
öffentliche API exakt stabil, damit kein einziger Import in `CloserGame.js` oder
in den Tests angefasst werden muss. Nach jedem Teilschritt volle Suite laufen
lassen – 161 Unit- + 96 E2E-Tests sind genau dafür da.

### Phase 3 — Testpflege

| # | Maßnahme | Aufwand | Risiko |
|---|---|---|---|
| 3.1 | 5 Pack-E2E-Specs → eine tabellengetriebene Spec (Befund E) | ~1 h | gering |
| 3.2 | `closer.test.js` (702 Zeilen) nach Themen splitten: `packs.test.js`, `routes.test.js`, `secret.test.js` | ~45 Min | sehr gering |

### Phase 4 — Komponente *(höchstes Risiko, differenziert bewerten)*

| # | Maßnahme | Aufwand | Risiko |
|---|---|---|---|
| 4.1 | **Handoff-Screen extrahieren** – die 4 identischen „Handy weitergeben"-Screens zu einer `<HandoffScreen who accent onConfirm />` | ~1 h | gering |
| 4.2 | Reine Setup-Screens (`players`, `pack`, `duration`, `mode`) in eigene präsentationale Komponenten | ~2 h | mittel |
| 4.3 | Ableitungen memoisieren (Befund G) | ~45 Min | gering |

**Was ich *nicht* empfehle:** `CloserGame.js` komplett in 20 Einzelkomponenten
zu zersägen. Die Phasen teilen sich einen großen Zustand; eine vollständige
Aufteilung führt entweder zu massivem Prop-Drilling oder zu einem Context, der
die Sache eher verschleiert als klärt. **4.1 und 4.2 holen den Großteil des
Nutzens bei einem Bruchteil des Risikos.** 4.3 ist optional.

---

## 4. Reihenfolge-Empfehlung in einem Satz

**1.2 (Fidelity-Test) → 1.1 (deine Entscheidung) → 1.3 → 2.1 → 2.2/2.3 → 3.1/3.2 → 4.1 → Rest nach Bedarf.**

Phase 1 und 2 haben zusammen ~5 Stunden Aufwand und adressieren die beiden
Themen, die bei einem content-getriebenen Produkt tatsächlich zählen:
*stimmt der Text?* und *findet man ihn wieder?*

Phase 4 kann warten, bis es einen konkreten Anlass gibt – etwa den zweiten
Style pro Pack oder die LATE-NIGHT-Aktivierung.

---

## 5. Was dabei bewusst unangetastet bleibt

- **Die Engine-Architektur (Pack/Style/Route).** Sie hat acht Packs, drei
  Routen-Varianten, ein Consent-Gate und die Content-Versionierung ohne
  Änderung getragen. Sie funktioniert.
- **Der Consent-Gate-Codepfad.** Bleibt toter Code, bis die Rechtsprüfung da ist.
- **`feat/closer-voice`.** Unangetastet bis dein Stimmmodell fertig ist.
- **Bundle-Struktur.** Siehe Abschnitt 0.
