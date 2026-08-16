# CLOSER – Refactoring- und Spielmechanikplan, Iteration 9

**Stand:** 15.08.2026  
**Ziel:** Produktlogik vereinfachen, Consent und Gamification sauber trennen, echte packabhängige Private Moments ermöglichen und den Code für weitere Styles, LATE NIGHT und TTS stabilisieren

---

## 1. Fünf verbindliche Produktprinzipien

### 1. Consent ist kostenlos

Eine Person darf jede Frage ohne Begründung ablehnen. Diese Aktion ist nie limitiert, kostet kein Herz und erzeugt keine enttäuschte Animation.

### 2. Gamification muss einen positiven Zusatznutzen liefern

Ein begrenzter Token ist nur sinnvoll, wenn er etwas ermöglicht, das die kostenlose Sicherheitsaktion nicht kann: beispielsweise eine neue, gleichwertig kuratierte Frage ziehen.

### 3. Ein Auswahl-Screen braucht eine echte Wahl

Eine Option wird automatisch gewählt. Zwei oder mehr Optionen werden gezeigt. Null Optionen sind ein Konfigurationsfehler.

### 4. Privat muss inhaltlich asymmetrisch sein

Das Weiterreichen des Handys ist nur dann spannend, wenn unterschiedliche Personen tatsächlich unterschiedliche Informationen, Aufgaben oder Intentionen sehen. Derselbe gespiegelte Standardtext rechtfertigt die Zeremonie nicht.

### 5. Belohnt wird die gemeinsam geschaffene Zeit, nicht Offenbarung

Animationen dürfen einen Aktabschluss oder den gemeinsamen Raum feiern. Sie bewerten niemals, wie tief, intim, schnell oder vollständig jemand geantwortet hat.

---

## 2. Sofortige Produktentscheidung: Pass und Joker

### Aktueller Zustand

```text
Skip         → nächste Frage → 1 Herz verloren
Lieber nicht → nächste Frage → kein Verlust
```

Das ist keine taktische Entscheidung. Es ist derselbe Effekt mit einem schlechteren Preis.

### Empfohlenes Zielmodell

```text
PASSEN
  kostenlos
  unbegrenzt
  nächste Routenslot
  keine Begründung
  keine negative Visualisierung

ANDERE FRAGE · ✦✦✦
  gemeinsame, begrenzte Ressource
  gleiche Routenslot bleibt aktiv
  kuratierte Ersatzfrage aus demselben Pack/Akt/Intensitätsniveau
  bereits gezogene Frage in diesem Run nicht erneut verwenden
```

### Warum diese Trennung funktioniert

- Eine Grenze bleibt immer leicht zugänglich.
- Der Joker hat einen echten spielerischen Wert.
- Drei Tokens erzeugen eine gemeinsame Entscheidung, ohne Verletzlichkeit zu bestrafen.
- Die geplante Anzahl und Dramaturgie der Route bleiben beim Reroll erhalten.
- Ein neutrales ✦- oder ↻-Symbol wirkt nicht wie verlorenes Leben oder verlorene Nähe.

### Abgelehnte Alternativen

**Individueller Pass, während die andere Person noch antworten muss:** kann sozialen Druck erhöhen und unklare Gesprächssituationen erzeugen.

**Kostenloser Pass plus kostenpflichtiger gemeinsamer Skip:** bleibt semantisch zu ähnlich.

**Consent ebenfalls limitieren:** unzulässig für das Produktprinzip und besonders für DEEP/LATE NIGHT falsch.

### Benötigte Contentdaten

Eine Ersatzfrage darf nicht zufällig aus allen 36 Fragen kommen. Sie braucht dieselben wesentlichen Tags:

```ts
type Question = {
  id: string;
  packId: string;
  act: 1 | 2 | 3;
  intensity: 1 | 2 | 3 | 4 | 5;
  estimatedSeconds: number;
  sensitiveTopics: string[];
  routeTags: ('quick' | 'standard' | 'full')[];
  alternateIds: string[];
};
```

Bis diese Alternativen redaktionell freigegeben sind, soll nur `Passen` sichtbar sein.

---

## 3. PRIVATE MOMENTS statt universeller Geheimfrage

### 3.1 Ziel

Das Handy-Weiterreichen soll ein echter kleiner Überraschungsmoment sein. Beide Personen sehen nicht zwingend denselben Auftrag. Eine private Karte soll das Zuhören, eine sichere spielerische Aufgabe oder einen späteren freiwilligen Impuls unterstützen.

Die App speichert nur Karten-ID und Status, niemals Antwort, Beobachtung oder private Notiz.

### 3.2 Grundablauf

1. Ein Pack und eine Route entscheiden, ob ein Private Moment überhaupt vorkommt.
2. Die erste Person erhält privat eine von zwei bis vier passenden Karten.
3. `Hab ich` und `Heute keine` sind gleichwertig.
4. Die zweite Person erhält eine andere Karte; Duplikate im selben Run sind ausgeschlossen.
5. Die Aufgabe wird entweder selbstständig im Gespräch ausgeführt oder am Finale freiwillig aufgedeckt.
6. Kein privater Ja/Nein-Verhörbaum ist nötig.
7. Am Finale reicht: „Möchtet ihr eure Private Moments auflösen?“ – `Ja`, `Nicht heute`, `Ende`.

### 3.3 Routeabhängigkeit

| Route | Empfehlung |
|---|---|
| Quick | standardmäßig kein mehrteiliger Private Moment; CHAOS darf einen sehr kurzen Secret Spark verwenden |
| Standard | maximal eine private Karte pro Person, kompakter Reveal |
| Full | eine Karte pro Person und packabhängiger Finalimpuls möglich |

Private Moments sind eine **Capability**, kein Pflichtfeld jedes Packs.

### 3.4 Packkonfiguration

```ts
type PrivateMomentConfig = {
  enabledByRoute: {
    quick: boolean;
    standard: boolean;
    full: boolean;
  };
  checkpoint: 'before-act-2' | 'before-act-3' | 'none';
  resolution: 'self-triggered' | 'optional-reveal' | 'shared-finale';
  cardIds: string[];
  allowOptOut: true;
};
```

### 3.5 Konkrete sichere Kartenideen

#### CLASSIC

- „Merke dir einen Satz, der dich ehrlich überrascht hat. Wenn es passt, sag am Ende, welcher es war.“
- „Achte auf einen Wert, der hinter mehreren Antworten sichtbar wird. Frage später neugierig nach, statt ihn zu deuten.“
- „Bewahre eine echte Anschlussfrage für das Finale auf. Die andere Person darf passen.“

Für CLASSIC Full kann die Wunschfrage als historischer Sonderfall bleiben – dann aber logisch richtig: Die Person denkt an eine Frage, die sie später **stellen** möchte.

#### FIRST DATE

- „Achte auf ein Thema, bei dem dein Gegenüber sichtbar auflebt. Frag später nach einem konkreten Detail, wenn es sich natürlich anfühlt.“
- „Merke dir eine unerwartete Gemeinsamkeit. Teile sie am Ende als Beobachtung, nicht als Versprechen.“
- „Formuliere ein spezifisches Kompliment, das nichts mit Aussehen und nichts mit einem weiteren Date zu tun haben muss.“

#### DATE NIGHT

- „Achte auf einen Moment, der sich heute warm oder besonders leicht anfühlt. Benenne ihn später ohne Erwartung.“
- „Merke dir einen kleinen Wunsch aus einer Antwort. Frag später, ob die Person mehr darüber erzählen möchte.“
- „Entwirf aus einer Antwort eine optionale kleine Date-Idee. Formuliere sie am Ende als Einladung, nicht als Plan.“

#### COUPLES

- „Achte auf eine alltägliche Bemühung, die du vielleicht zu selten bemerkst. Würdige sie später konkret.“
- „Bei einer schwierigen Antwort: Spiegle zuerst einen Satz, bevor du deine eigene Sicht teilst.“
- „Merke dir eine Form von Unterstützung, die dein Gegenüber genannt hat. Frage später, ob sie diese Woche hilfreich wäre.“

#### FRIENDS

- „Merke dir etwas, das du in den nächsten Wochen mitfeiern oder unterstützen möchtest.“
- „Achte auf eine Stärke hinter einer konkreten Geschichte. Benenne später Geschichte und Stärke zusammen.“
- „Bewahre eine echte Anschlussfrage zu einem Detail auf, das du noch nicht kanntest.“

#### OLD FRIENDS

- „Merke dir einen Satz, der zeigt, wer die Person heute ist – unabhängig von deinem alten Bild.“
- „Achte auf eine Sache, die gleich geblieben ist, und eine, die sich verändert hat. Frag später, ob dein Eindruck passt.“
- „Wähle eine alte Annahme, die du neugierig aktualisieren möchtest. Stelle eine Frage, statt die Annahme auszusprechen.“

#### DEEP

- „Merke dir eine Formulierung möglichst genau. Spiegle sie später zurück, ohne sie zu interpretieren.“
- „Bevor du tiefer nachfragst, frage zuerst, ob eine Nachfrage gerade willkommen ist.“
- „Achte auch auf Hoffnung, Kraft oder Stolz – nicht nur auf Schmerz. Benenne eine davon später konkret.“

#### CHAOS

- „Merke dir die absurdeste Idee und gib ihr am Ende einen völlig übertriebenen Filmtitel.“
- „Baue später harmlos einen Callback zu einer früheren Antwort ein.“
- „Erfinde einen Preis für etwas Sympathisches, das die andere Person heute gesagt hat. Die Verleihung bleibt freundlich, nicht peinlich.“
- „Wähle eine absurde Idee, die überraschend machbar wäre. Pitch sie am Ende in einem Satz.“

#### LATE NIGHT

Keine geheime körperliche, sexuelle oder manipulative Mission.

Stattdessen nur ein privater Readiness-Check:

- „Weiter mit diesem Pack“
- „Lieber zu DATE NIGHT wechseln“
- „Hier gut enden“

Die sicherste Auswahl bestimmt den Flow; es wird nicht angezeigt, wer sie gewählt hat. Vor Akt II wird erneut gefragt.

### 3.6 Verbotene Private-Moment-Muster

- Berührung ohne vorherige transparente Zustimmung;
- versteckte Tests oder Eifersuchtsprovokation;
- absichtliche Täuschung;
- Körper-, Attraktivitäts- oder Performancebewertung;
- Diagnose oder Interpretation der anderen Person;
- erzwungene Offenlegung;
- öffentliche Aufgabe oder Bloßstellung;
- Belohnung für ein Ja oder Sanktion für ein Nein;
- sexuelle Handlung als Abschlussziel.

---

## 4. Routeabhängiges Finale

### Quick

- letzte reguläre Frage;
- kurzer CLOSER PULSE;
- optional: eine gemeinsame Bonusfrage **oder** Secret-Spark-Reveal;
- `Hier gut aufhören` ist Primäroption;
- keine fünf privaten Check-Screens.

### Standard

- „Finale“ statt „Frage 37“;
- optionaler Private-Moment-Reveal;
- ein pack-spezifischer Schlussimpuls;
- Ende jederzeit sichtbar.

### Full

- CLASSIC darf `Frage 37` als Referenz auf das 36-Fragen-Format behalten;
- andere Packs verwenden ihr eigenes Finale;
- 0/1/2 Private Moments werden explizit korrekt klassifiziert;
- vor dem zweiten persönlichen Reveal erneut freiwillig entscheiden.

### Finale-Labels

```ts
route.finale = {
  label: { de: 'FINALE', en: 'FINALE' },
  lastQuestionLabel: { de: 'LETZTE FRAGE', en: 'FINAL QUESTION' },
  allowBonus: true
};
```

---

## 5. Coolness und Belohnung ohne Gesprächsstörung

CLOSER PULSE ist bereits die richtige Richtung. Die nächste Stufe sollte kein Konfetti, kein Level und kein Streak sein. Empfohlen wird ein ruhiges **CLOSER THREAD**-Motiv.

### 5.1 CLOSER THREAD

- Zu Beginn zwei getrennte Lichtpunkte.
- Nach Akt I entsteht eine feine Verbindungslinie.
- Nach Akt II kreuzen oder umkreisen sich zwei Linien.
- Beim Private Moment erscheint kurz ein verdeckter dritter Funke.
- Im Finale bilden die Linien für einen Moment das CLOSER-Zeichen und lösen sich wieder in Ruhe auf.

Die Animation lebt nur an Übergängen. Während einer Frage bleibt die Oberfläche still.

### 5.2 Packabhängige Bewegungssprache

| Packfamilie | Bewegung |
|---|---|
| CLASSIC / DEEP | langsam, konzentrisch, viel Dunkelraum |
| FIRST DATE / DATE NIGHT | wärmeres Annähern, weiche Orbit-Bewegung |
| COUPLES / FRIENDS | zwei Linien bilden kurz eine gemeinsame Form |
| OLD FRIENDS | zwei getrennte Spuren finden wieder einen gemeinsamen Abschnitt |
| CHAOS | kurzer elastischer Impuls oder unerwarteter Richtungswechsel, trotzdem nicht hektisch |

### 5.3 Copy als Belohnung

Keine Bewertung wie „Großartig!“ oder „Ihr seid euch näher gekommen“. Besser:

- „Akt I liegt hinter euch.“
- „Ihr habt euch Zeit genommen.“
- „Das Spiel wird leiser.“
- „Nehmt den nächsten Akt in eurem Tempo.“

### 5.4 Haptik

Optional ein einzelner kurzer Vibrationsimpuls bei einem Aktabschluss. Kein Haptiksignal bei Pass, Opt-out oder Ende. Geräusch bleibt standardmäßig aus.

### 5.5 Akzeptanzkriterien

- Reduced Motion zeigt nur einen kurzen Fade.
- erster Tap schließt nur die sichtbare Animation und trifft keinen Button darunter;
- keine Animation blockiert länger als etwa 350 ms, außer sie ist sofort überspringbar;
- Abschluss durch `userEnded` oder `consentDeclined` zeigt keinen Completion-Pulse;
- Animation hängt nie davon ab, ob oder wie ausführlich geantwortet wurde.

---

## 6. Vereinfachter Setup-Flow

### Ziel

```text
START
  ↓
PERSONEN
  ↓
PACK
  ↓
LÄNGE + ZEITANZEIGE
  ↓
[SPIELSTIL, nur wenn >1]
  ↓
PACK-INTRO
  ↓
SPIEL
```

### Regeln

- `styles.length === 1`: automatisch auswählen.
- `routes.length === 1`: automatisch auswählen.
- Timer-Toggle auf die Routen-Seite.
- sichtbarer Zurück-Pfad oder kompakter Summary-Screen.
- Packliste mobil kompakter; ausgewählte Karte darf Details expandieren.
- `WEITER` bleibt sticky, ohne die letzte Karte zu verdecken.
- intern `Pack`, `Route`, `Style` konsequent verwenden.

---

## 7. Zielarchitektur

### 7.1 Ordnerstruktur

```text
src/features/closer/
  engine/
    createRunDefinition.ts
    reducer.ts
    transitions.ts
    selectors.ts
    persistence.ts
    schemas.ts
  content/
    registry.ts
    shared.ts
    packs/
      classic.ts
      firstDate.ts
      dateNight.ts
      couples.ts
      friends.ts
      oldFriends.ts
      deep.ts
      chaos.ts
      lateNight.ts
  copy/
    ui.ts
  screens/
    StartScreen.tsx
    SetupScreen.tsx
    ActScreen.tsx
    QuestionScreen.tsx
    PrivateMomentScreen.tsx
    FinaleScreen.tsx
  components/
    Dialog.tsx
    HandoffScreen.tsx
    CloserPulse.tsx
```

Ein schrittweiser TypeScript-Einstieg nur für CLOSER ist sinnvoll; das restliche Portfolio muss dafür nicht sofort migriert werden.

### 7.2 Strukturierter Content als einzige Wahrheit

Derzeit sind Markdown und JavaScript zwei manuell gepflegte Wahrheiten. Ziel:

1. strukturierte Packmodule sind maschinenlesbare redaktionelle Quelle;
2. Schema validiert DE/EN, IDs, Routen, Zeiten, Intensität und Guardrails;
3. Markdown-Fragenkatalog wird daraus generiert;
4. Tests vergleichen den generierten Katalog beziehungsweise Snapshot exakt;
5. TTS verwendet dieselben stabilen IDs.

Wichtig: Der aktuelle Fidelity-Prototyp reicht dafür nicht. Er sucht nur deutsche Präfixe irgendwo im Gesamtcode.

### 7.3 RunDefinition

Nach Setup wird einmalig ein unveränderlicher Run kompiliert:

```ts
type RunDefinition = {
  id: string;
  contentRevision: number;
  packId: string;
  routeId: string;
  styleId: string;
  questionSlots: {
    slotId: string;
    questionId: string;
    alternateIds: string[];
    act: 1 | 2 | 3;
  }[];
  actBoundaries: number[];
  timing: RouteTiming;
  privateMoment?: ResolvedPrivateMoment;
  finale: ResolvedFinale;
  fingerprint: string;
};
```

Der persistierte Run verweist auf stabile IDs. Resume vergleicht Revision und Fingerprint.

### 7.4 Reducer/State Machine

```text
setup
  start
  players
  pack
  route
  style?
  consent?
  intro

playing
  actIntro
  question
  reroll?
  actBreak
  privateMoment?

finale
  privateReveal?
  bonus?
  ending
```

Events sind fachlich benannt:

```text
SELECT_PACK
SELECT_ROUTE
START_RUN
ANSWERED
PASS_QUESTION
REROLL_QUESTION
ENTER_PRIVATE_MOMENT
DECLINE_PRIVATE_MOMENT
END_RUN
COMPLETE_RUN
```

Side Effects wie Save, Wake Lock, Haptik und PULSE reagieren auf Events/Transitionen, nicht auf zufällige Kombinationen von React-Effects.

---

## 8. Refactoring-Phasen

### Phase 0 – Release-Korrektheit, 0,5–1,5 Tage

- pack-spezifisches Intro;
- Skip vorübergehend entfernen oder klar in Pass umbenennen;
- falsche Secret-/Opt-out-Copy korrigieren;
- Singleton-Style-Screen überspringen, Timer verlagern;
- Gesamtzeitcopy und `Frage 37` korrigieren;
- Timer bei Resume/Hintergrund pausieren;
- Kontrast der Sicherheitsaktionen erhöhen.

### Phase 1 – Contentschema und IDs, 1–3 Tage

- Packdateien extrahieren;
- stabile explizite IDs;
- exakte DE/EN-Schemavalidierung;
- strukturiertes Timing;
- generierter Markdown-Katalog;
- funktionierender Revision-/Fingerprint-Abgleich.

### Phase 2 – RunDefinition und Reducer, 2–4 Tage

- einmalige Run-Kompilierung;
- Transitionen aus der React-Komponente ziehen;
- versionierten Save-Parser bauen;
- Transition-/Propertytests;
- Restart, Endgründe und Resume vereinheitlichen.

### Phase 3 – UI-Komponenten und A11y, 1–3 Tage

- gemeinsamer Dialog/Bottom Sheet;
- HandoffScreen;
- Setup-/Question-/Finale-Screens extrahieren;
- Fokus, Escape, inert, Kontrast und zugängliche Timernamen;
- WebKit- und A11y-Smokes.

### Phase 4 – neue Spielmechaniken, 2–5 Tage plus Redaktion

- kuratierte Ersatzfragen;
- Joker;
- packabhängige Private Moments;
- routeabhängige Finale;
- CLOSER THREAD/Milestone-Animationen.

### Phase 5 – PWA und Deployment, 0,5–2 Tage

- Service Worker mit Update-Strategie;
- Security Headers;
- echte Android-/iOS-Tests;
- optional eigenes Vercel-Projekt/Subdomain;
- Rechtsseiten innerhalb des App-Scopes.

### Phase 6 – TTS

Erst nach stabilen Frage-IDs und Contentstruktur. So müssen Dateinamen, Cache und Voice-Mapping nicht zweimal migriert werden.

---

## 9. Eigenes Projekt auf `closer.radi.solutions`

Das Routing ist technisch kein großes Problem. Der saubere Zeitpunkt ist nach Phase 1 oder 2, wenn CLOSER bereits eine klare Modulgrenze besitzt.

### Empfohlene Zielstruktur

```text
apps/
  portfolio/
  closer/
packages/
  closer-content/
```

Ein eigenes Vercel-Projekt baut `apps/closer`, verwendet `closer.radi.solutions` und hat `/` als App-Root.

### Notwendige Änderungen

- DNS/Subdomain im Vercel-Projekt zuweisen;
- Manifest: `id`, `start_url`, `scope` auf `/`;
- Icons, Meta, Canonical und OG-URL auf neuen Origin;
- Impressum und Datenschutz innerhalb des Root-Scopes;
- Security Headers im Projekt;
- altes `radi.solutions/closer/` zunächst mit Hinweis, später per 308 weiterleiten;
- PWA-Installationshinweis auf Neuinstallation anpassen.

### Migrationsfolge

1. neue Subdomain parallel deployen;
2. vollständige E2E-/PWA-Prüfung;
3. Hinweis auf alter URL für eine Übergangszeit;
4. aktive Spiele auslaufen lassen;
5. dauerhaften Redirect aktivieren.

### Wichtige Einschränkung

`localStorage` ist origin-gebunden. Laufende Spiele, Install-Hint-Status und eine bereits installierte PWA wandern nicht automatisch von `radi.solutions` zu `closer.radi.solutions`. Für dieses Produkt ist ein sauber kommunizierter Neustart wahrscheinlich besser als ein komplizierter Datentransfer.

---

## 10. Abnahmekriterien

### Setup

- kein Screen mit nur einer Option;
- Timer bleibt vor Start erreichbar;
- jede Setup-Stufe hat einen Rückweg;
- Pack-CTA ist bei 320 px und Tabletbreite erreichbar, ohne 1.400 px Scrollweg;
- Begriffe Pack/Route/Style sind einheitlich.

### Pass/Joker

- Pass ist immer kostenlos und sichtbar;
- Joker und Pass haben unterschiedliche Effekte;
- Ersatzfrage entspricht Pack, Akt und Intensität;
- kein Reroll-Duplikat im Run;
- Reroll ist resumefest;
- keine Herzen als Consent-Währung.

### Private Moments

- Pack und Route können Mechanik deaktivieren;
- zwei Personen erhalten unterschiedliche Karten;
- `Heute keine` bleibt gleichwertig;
- keine Antwort wird gespeichert;
- Quick hat keine lange Checksequenz;
- Reveal ist freiwillig;
- verbotene Aufgaben sind per redaktioneller Checkliste ausgeschlossen;
- LATE NIGHT verwendet ausschließlich Readiness-/Consent-Checks.

### Zeit

- Route besitzt numerische Gesamt- und Aktwerte;
- sichtbare Schätzung und Overtime verwenden dieselbe Quelle;
- Background und Resume zählen nicht als aktive Gesprächszeit;
- echte Pilotsessions kalibrieren die Werte.

### Save

- stabile Frage-IDs;
- Contentrevision wird wirklich verglichen;
- Fingerprint erkennt Reordering und Rerolls;
- ungültige Phase-/Pack-Kombinationen werden sicher verworfen;
- abgeschlossener Run löscht personenbezogene lokale Run-Daten.

### Accessibility

- Dialoge besitzen Semantik, Fokusfalle, Escape und Fokusrückgabe;
- normale Kleinschrift erreicht mindestens 4,5:1;
- alle Aktionen haben sichtbaren `focus-visible`-Zustand;
- Timer hat lokalisierten zugänglichen Namen;
- Chromium- und WebKit-Critical-Paths sind grün;
- Reduced Motion bleibt vollständig funktionsfähig.

---

## 11. Verweise

- [Ganzheitlicher Review](CLOSER_Ganzheitlicher_Review_Iteration9_2026-08-15.md)
- [Code Review](CLOSER_Code_Review_Iteration9_2026-08-15.md)
- [Fragenkatalog](../content/CLOSER_Fragenkatalog_DE_EN.md)
- [Literaturrecherche](../content/CLOSER_Literaturrecherche_Fragendesign.md)

