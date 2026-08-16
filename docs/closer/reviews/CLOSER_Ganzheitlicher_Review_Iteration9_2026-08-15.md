# CLOSER – ganzheitlicher Review, Iteration 9

**Stand:** 15.08.2026  
**geprüfte Basis:** `main`, zuerst `c0ba0bd`, während des Reviews aktualisiert auf `a8ac798`  
**Live-Ziel:** `https://radi.solutions/closer/`  
**Scope:** Produktlogik, alle Packs und Routen, DE/EN, Live-Konsole, mobile UX, PWA, Datenschutz-/Rechtsschnittstellen sowie automatisierte Tests

---

## 1. Entscheidung in Kurzform

CLOSER hat inzwischen eine starke inhaltliche Grundlage. Die acht erreichbaren Packs sind klarer voneinander abgegrenzt, die zweisprachigen Fragen sind überwiegend sorgfältig formuliert, Quick/Standard/Full sind kuratiert statt zufällig, LATE NIGHT bleibt korrekt gesperrt und CLOSER PULSE belohnt Übergänge ohne das Gespräch zu stören.

Die nächste Iteration sollte trotzdem **nicht** einfach weitere Packs oder Animationen ergänzen. Die gemeinsame Spiellogik wurde zu direkt von CLASSIC auf alle Packs und Routen übertragen. Dadurch sind derzeit fünf Kernprobleme offen:

1. Die Geheimfragen-/Q37-Mechanik ist logisch verkehrt herum und für Quick unverhältnismäßig lang.
2. `Skip` und `Lieber nicht` tun dasselbe; nur Skip kostet ein Herz. Skip ist damit objektiv sinnlos.
3. Sieben von acht Packs zeigen eine Modus-/Style-Auswahl ohne echte Wahl.
4. Zeitangaben, Akt-Timer und Startversprechen widersprechen sich.
5. Jeder Pack zeigt einen CLASSIC-spezifischen Introtext.

Zusätzlich bleiben fehlende erreichbare Rechtsinformationen ein Launch-Gate. Die Live-Version zeigt keine Konsolenfehler, aber `/impressum/` und `/datenschutz/` liefern weiterhin 404.

**Gesamturteil:** technisch stabil, inhaltlich gut, aber in der übergeordneten Produktlogik noch nicht stimmig genug für eine breite Veröffentlichung.

---

## 2. Nachweise und Prüfumfang

| Prüfung | Ergebnis |
|---|---:|
| Jest | 161/161 grün |
| Playwright Mobile E2E | 96/96 grün |
| Produktions-Build | grün |
| ESLint | grün |
| `npm audit --omit=dev` | 0 bekannte Schwachstellen |
| direkte Abhängigkeiten | vollständig auflösbar, keine `invalid`/`missing`-Einträge |
| Live-Konsole, Fehler/Warnungen | 0 beobachtet |
| Live `/closer/` | HTTP 200 |
| Manifest und vier PWA-Icons | HTTP 200 |
| Live `/impressum/` | HTTP 404 |
| Live `/datenschutz/` | HTTP 404 |
| registrierte Packs | 8 |
| erreichbare Fragen | 288 DE + 288 EN |
| Katalog inklusive LATE NIGHT | 324 DE + 324 EN |

Die E2E-Abdeckung ist funktional breit, ersetzt aber keine Produktprüfung. Ein automatisierter Test kann korrekt bestätigen, dass `Skip` ein Herz verbraucht und `Lieber nicht` keines verbraucht, obwohl gerade diese Kombination spielerisch keinen Sinn ergibt.

---

## 3. Was bereits sehr gut funktioniert

### Inhalt und Modi

- CLASSIC bleibt inhaltlich bei der aktuellen Fragenfassung, wie festgelegt.
- FIRST DATE baut Druck langsam auf und endet ohne öffentliche Interessensabfrage.
- DATE NIGHT ist spürbar romantischer und prickelnder, aber nicht explizit.
- COUPLES beginnt positiv und enthält konkrete Support-/Reparaturimpulse.
- FRIENDS ist klar platonisch und wertschätzend.
- OLD FRIENDS nutzt konkrete gemeinsame Erinnerungen statt nur allgemeiner Nostalgie.
- DEEP vermeidet Diagnose-, Heilungs- oder Therapieversprechen.
- CHAOS erzeugt gemeinsame Absurdität statt Bloßstellung oder Mutproben.
- LATE NIGHT ist vollständig vorbereitet, aber weder registriert noch im Produktions-Bundle auffindbar.
- Zwischen den 324 Katalogfragen gibt es keine exakt identischen DE-Fragen.

### Sicherheit und Privatsphäre

- Antworten werden nicht eingegeben, aufgenommen oder an ein Backend gesendet.
- Namen sind optional und genderneutral als `Person 1`/`Person 2` bezeichnet.
- `Heute keine`, freies Beenden und eine kostenlose Antwortablehnung sind vorhanden.
- Lokale Daten können explizit gelöscht werden.
- Reduced Motion wird berücksichtigt.
- Riskante Twists wie PREDICT und NO THINKING bleiben außerhalb von CLASSIC deaktiviert.
- LATE NIGHT besitzt vorbereitete getrennte Opt-ins pro Person und einen erneuten Check vor Akt II.

### Technik und UX

- Resume, Content-Routen, alle vier Q37-Zustände, Skip/Ablehnen, Timer, PULSE und Response Cards sind automatisiert abgedeckt.
- Der zuvor gemeldete Fehler „Spiel fortsetzen“ nach einem frischen Start wurde nicht mehr reproduziert. Ein Spiel gilt erst nach Beginn der ersten echten Frage als fortsetzbar.
- Safe-Area-Inset, `100dvh`, große Hauptbuttons und ein 44-px-Menü-Touchziel sind vorhanden.
- CLOSER PULSE ist ruhig, überspringbar, rein dekorativ und zeigt bei Ablehnung oder Abbruch keine negative Reaktion.
- Live wurden keine JavaScript-Konsolenfehler oder Warnungen beobachtet.

---

## 4. P0 – vor breiter Veröffentlichung

### P0-01: Impressum und Datenschutz sind aus CLOSER nicht erreichbar

CLOSER verwendet absichtlich weder Portfolio-Header noch Footer. Die Startseite des Portfolios enthält zwar einen kleinen Impressumsblock, dieser ist aus der App nicht erreichbar. Eigene Seiten existieren nicht; die beiden naheliegenden URLs liefern live 404.

Das `noindex`-Meta-Tag, eine unlistete URL oder eine installierte PWA ändern die Informationspflichten nicht. § 5 ECG verlangt die einschlägigen Anbieterinformationen ständig leicht und unmittelbar zugänglich. Die WKO weist ausdrücklich darauf hin, dass die Regeln auch für Apps gelten.

**Erforderlich:**

- echte Seite oder erreichbares In-App-Panel für Impressum/Offenlegung;
- eigene Datenschutzerklärung mit Hosting, technischen Zugriffsdaten und lokal gespeicherten Daten;
- dauerhafter Link im Startscreen und im In-Game-Menü;
- echte geschäftliche Angaben prüfen, nicht aus dem Code erraten;
- bei einem eigenen Subdomain-Projekt die Rechtsseiten innerhalb des PWA-Scopes halten;
- finale Freigabe durch eine in Österreich qualifizierte Person.

Relevante Primär-/Fachquellen:

- [§ 5 E-Commerce-Gesetz – RIS](https://ris.bka.gv.at/NormDokument.wxe?Abfrage=Bundesnormen&Gesetzesnummer=20001703&Paragraf=5)
- [WKO: Informationspflichten nach dem ECG](https://www.wko.at/internetrecht/informationspflichten-nach-dem-e-commerce-gesetz--dem-unte)
- [Art. 13 DSGVO – EUR-Lex](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32016R0679)
- [Österreichische Datenschutzbehörde: Datenschutz und Cookies](https://dsb.gv.at/faqs/datenschutz-cookies)

**Hinweis:** Dieser Review ist keine Rechtsberatung.

### P0-02: LATE NIGHT bleibt gesperrt

Der Pack darf erst registriert werden, wenn folgende Punkte gemeinsam erfüllt sind:

- separate österreichische Jugend-/Medien-/Datenschutzprüfung;
- echter E2E-Pfad durch beide Consent-Gates;
- routeabhängiges, sicherheitskonformes Finale;
- keine generische Secret-/Q37-Fallback-Copy;
- echte Tests mit freiwilligen erwachsenen Testpersonen;
- keine geheime Aufgabe, die Berührung oder sexuelle Handlung verlangt.

Der aktuelle Zustand – Content vorbereitet, Codepfad vorbereitet, Pack nicht erreichbar – ist richtig.

---

## 5. P1 – zentrale Produkt- und Logikfehler

### P1-01: Die Geheimfrage wird am Ende von der falschen Person gestellt

Der private Auftrag lautet:

> Denk an eine Frage, von der du hoffst, dass die andere Person sie dir stellt.

Im Finale wird anschließend die Person, die sich diese Frage gemerkt hat, aufgefordert, „die Geheimfrage“ selbst zu stellen.

Beispiel:

1. Alex hofft, dass Sam fragt: „Wovor hast du gerade Angst?“
2. Sam stellt diese Frage während des Spiels nicht.
3. Q37 fordert Alex auf, die eigene Geheimfrage Sam zu stellen.
4. Damit beantwortet Sam die Frage, die ursprünglich an Alex gerichtet sein sollte.

Das ist eine inhaltliche Verkehrung des Mechanismus, keine reine Textnuance.

Zusätzlich wird `pack.q37.neither` im aktuellen Renderpfad überhaupt nicht ausgegeben. Pack-spezifische und teilweise sicherheitsrelevante Finale-Texte existieren zwar im Content, sind in diesem Branch aber toter Inhalt.

Die Zustands-Copy ist auch bei Opt-out inkonsistent:

- Nach `Heute keine` steht bei der Übergabe trotzdem „Verrate deine Frage nicht.“
- Vor den privaten Checks heißt es immer „Aber ihr hattet beide eine Frage im Kopf.“
- Bei genau einer vorhandenen Frage kann das Finale anschließend fälschlich von „einer eurer Fragen“ sprechen, obwohl die zweite Person ausdrücklich keine gewählt hat.

**Kurzfristiger Fix, falls die Mechanik bleiben soll:**

- Auftrag umdrehen: „Denk an eine Frage, die du deinem Gegenüber später gern stellen möchtest.“
- Check umdrehen: „Hast du deine Frage bereits gestellt?“
- `neither`, `one`, `both` tatsächlich pack-spezifisch rendern.

**Empfehlung:** nicht nur umtexten, sondern durch route- und packabhängige Private Moments ersetzen. Siehe Refactoring-/Mechanikdokument.

### P1-02: Skip ist durch „Lieber nicht“ vollständig entwertet

Beide Aktionen:

- beenden die aktuelle Frage;
- zeigen „Übersprungen“;
- gehen danach zur nächsten Frage;
- benötigen keine Begründung.

Nur Skip kostet eines von drei Herzen und benötigt zusätzlich eine Bestätigung. Ein rationaler Spielzug ist deshalb immer `Lieber nicht`; Skip ist strikt schlechter.

Die Herzmetapher verschärft das Problem: Eine persönliche Grenze sieht aus wie der Verlust eines Lebens oder von Nähe. Consent darf nicht bestraft werden.

**Empfohlene Trennung:**

- `Lieber nicht` beziehungsweise `Passen`: jederzeit kostenlos, kein Verlust, keine Begründung.
- `Andere Frage` beziehungsweise `Joker`: drei gemeinsame neutrale ✦-Tokens; ersetzt die Frage durch eine vorab kuratierte Alternative aus demselben Pack, Akt und Intensitätsniveau; die Routenlänge bleibt gleich.

Falls die Alternativfragen noch nicht redaktionell vorhanden sind, sollen Skip-Tokens und Herzen vorübergehend entfernt werden. Zwei gleich wirkende Buttons zu behalten ist schlechter als nur ein ehrlicher Pass-Button.

### P1-03: Jeder Pack zeigt den CLASSIC-Introtext

Unabhängig vom gewählten Pack erscheint:

> CLASSIC ist ein bewusst persönliches Gespräch für zwei Erwachsene …

Das ist bei FIRST DATE, FRIENDS und insbesondere CHAOS falsch. Die Aussage „Spielt nur, wenn ihr beide Tiefe wollt“ widerspricht der gewählten Stimmung von CHAOS.

**Fix:** `pack.positioning` und optional `pack.safetyNote` in DE/EN einführen. Ein neutraler globaler Fallback darf nur verwendet werden, wenn kein Packtext existiert.

### P1-04: Zeitversprechen, Routen und Akt-Timer widersprechen sich

Die Startseite behauptet `12–45 Minuten`. Die erreichbaren Routen reichen tatsächlich von CHAOS Quick mit etwa 10 Minuten bis DEEP Full mit etwa 75 Minuten. Die Pilotspannen im Katalog reichen noch weiter.

Der Akt-Timer verwendet für jeden Pack pauschal 1,25 Minuten pro Frage. Dadurch passiert beispielsweise Folgendes:

- DEEP Full verspricht 75 Minuten gesamt, also grob 25 Minuten je Akt.
- Die App zeigt aber etwa 15 Minuten je Akt und meldet nach 15 Minuten Overtime.

CLASSIC Standard enthält außerdem die Lebensgeschichten-Frage, die allein bis zu acht Minuten beanspruchen kann. Ein globales Fragen-pro-Minute-Modell ist fachlich nicht haltbar.

**Fix:**

```js
route: {
  estimatedMinutes: 38,
  actEstimatedMinutes: [10, 13, 15]
}
```

Gesamtcopy, Akt-Untertitel und Overtime müssen dieselben numerischen Werte verwenden. Bis echte Pilotdaten vorliegen, sind Zeitkorridore besser als eine scheinpräzise Zahl.

### P1-05: „Frage 37“ ist bei Quick und Standard begrifflich falsch

Nach zwölf Fragen zeigt die App ebenfalls `FRAGE 37`. Außerdem kündigt sie die zwölfte Frage bereits als „eine letzte Frage“ an und bietet danach noch eine weitere „letzte“ Frage an.

**Fix:**

- Full CLASSIC darf historisch `Frage 37` verwenden.
- Quick/Standard und neue Packs verwenden `Finale`, `Bonusfrage` oder `Letzter Impuls`.
- Nur eine Frage pro Route darf als „letzte Frage“ angekündigt werden.

### P1-06: Die vollständige Secret-Sequenz ist für Quick zu lang

Der Schwellenwert liegt bei Frage 27 der Full-Route und wird technisch auf kürzere Routen projiziert. Bei Quick erscheint die Secret-Erfassung dadurch erst vor Frage 10 oder 11. Es bleiben nur zwei bis drei Fragen, in denen die erhoffte Frage noch zufällig vorkommen könnte.

Zu zwölf eigentlichen Fragen kommen je nach Branch ungefähr ebenso viele Übergabe-, Check-, Akt-, Last-Question- und Finale-Zustände. In CHAOS Quick mit rund zehn Minuten zerstört das den Spielfluss.

**Fix:**

- Quick: keine mehrteilige Secret-/Q37-Sequenz; höchstens ein kurzer freiwilliger Finalimpuls.
- Standard: ein kompakter Private Moment, pack-spezifisch.
- Full: ausführlichere private Mechanik zulässig.
- Trigger pro Route konfigurieren statt aus einem absoluten Full-Index ableiten.

### P1-07: Wichtige Sicherheitsaktionen sind visuell zu kontrastarm

`TextButton` verwendet kleine 13-px-Schrift mit ungefähr 38 % Weiß auf `#08090c`. Der berechnete Kontrast liegt bei etwa 3,26:1. Damit ist ausgerechnet `Lieber nicht`, also die zentrale Consent-Aktion, schwerer lesbar als der Primärbutton. Auch mehrere Small-/Menütexte liegen unter 4,5:1.

**Fix:**

- normale kleine Texte und Textbuttons mindestens auf einen geprüften kontrastreichen Muted-Token anheben;
- niedrige Opacity nur für tatsächlich deaktivierte oder rein dekorative Elemente;
- Fokuszustände mit `:focus-visible` explizit gestalten;
- automatisierten Axe-/Kontrast-Smoke-Test ergänzen.

### P1-08: Content-Versionierung schützt nicht vor Inhaltsänderungen

`contentVersion` wird gespeichert, aber beim Laden nur auf den Typ `number` geprüft. Ein Versions-Bump invalidiert keinen Spielstand. Die zusätzliche Run-Prüfung verwendet IDs, die aus Pack und aktueller Position entstehen. Wird eine Frage an derselben Position ersetzt oder umformuliert, bleibt ihre ID gleich; auch ein Reordering innerhalb der Full-Liste kann unentdeckt bleiben.

**Fix:** stabile explizite Frage-IDs, geordneter Run-Fingerprint und ein tatsächlicher Vergleich der Content-Revision. Eine reine Tippfehlerkorrektur kann dieselbe ID behalten; eine Bedeutungsänderung braucht Revision oder neue ID.

### P1-09: Der Timer zählt Pausen außerhalb des Spiels weiter

Live reproduziert: Nach Reload auf den Resume-Screen lief die Aktzeit während des Wartens weiter. Nach einer längeren Unterbrechung zeigt ein fortgesetztes Spiel deshalb sofort eine unbrauchbare Overtime-Meldung.

**Fix:** aktive Gesprächszeit akkumulieren und bei `visibilitychange`, Resume-Screen, Menü und App-Hintergrund pausieren. Alternativ beim Resume bewusst fragen, ob die Aktzeit neu beginnen soll.

---

## 6. P2 – wichtige Verbesserungen

### P2-01: Auswahlseiten nach Kardinalität rendern

Nur CLASSIC hat zwei echte Styles. Alle anderen registrierten Packs besitzen genau einen Style, zeigen aber trotzdem „Modus wählen“ mit einer bereits vorausgewählten Einzelkarte.

Verbindliche Regel:

- 0 Optionen: Konfigurationsfehler;
- 1 Option: automatisch wählen und Screen überspringen;
- mehr als 1 Option: Auswahl zeigen.

Der Timer gehört auf die Längen-Seite oder ins Menü. Intern sollte `modeId` mittelfristig `styleId` heißen, weil der Pack selbst aus Produktsicht bereits der Modus ist.

Dieselbe Regel gilt künftig für Routen. DEEP hat zwei Routen und braucht die Auswahl; ein Pack mit nur einer Route nicht.

### P2-02: Setup bietet keinen internen Rückweg

Pack, Länge und Style werden nur in eine Richtung durchlaufen. Die App legt keine Browser-History-Zustände an; die System-Zurück-Taste ist deshalb kein verlässlicher Setup-Back-Button.

**Fix:** sichtbares `Zurück`, ein kompakter Setup-Summary mit `Ändern`, oder Pack/Länge/Timer in einen einzigen kontextabhängigen Screen zusammenführen.

### P2-03: Die Packliste ist auf kleinen Displays unnötig lang

Acht große Karten plus CTA ergeben viel Scrollweg; die Bestätigung steht erst nach der letzten Karte. Besser:

- gemessen lag `WEITER` bei 320 × 568 erst ungefähr bei y=1434, bei 390 × 844 bei y=1339;

- kompakte Packzeilen oder Zweispalten-Tiles;
- nur die ausgewählte Karte zeigt die ausführliche Beschreibung;
- klarer, nicht überdeckender Sticky-Footer;
- keine Vorauswahl oder eine deutlich sichtbare Vorauswahl, damit CLASSIC nicht versehentlich weiterläuft.

### P2-04: Response Cards wirken verpflichtender als dokumentiert

Sie heißen im Katalog optionale Zuhörimpulse, erscheinen aber dauerhaft neben der Frage. DEEP Standard hat eine hohe Dichte genau dort, wo die App eigentlich zurücktreten soll.

**Fix:** mit „Optionaler Zuhörimpuls“ kennzeichnen, seltener einsetzen oder erst nach der ersten Antwort dezent aufdecken.

### P2-05: Timer ist optional nützlich, aber derzeit zu präsent

Eine laufende Uhr kann bei einem Gespräch Tempo- und Leistungsdruck erzeugen. Empfehlung:

- standardmäßig aus oder nur als kleine Option bei der Routenwahl;
- kein Overtime-Wording, das zum Abarbeiten drängt;
- stattdessen am Aktende freiwillig „Hier gut aufhören“ oder „Weiter“.

### P2-06: Installierbar, aber nicht offlinefähig

Manifest, Icons, HTTPS, Scope und `display: fullscreen` sind vorhanden. Es gibt aber keinen Service Worker. Die App kann installiert werden, ein Offline-Neuladen nach Verbindungsverlust ist jedoch nicht abgesichert.

Ein Service Worker ist heute keine zwingende Installationsvoraussetzung, aber für ein geteiltes, 45- bis 75-minütiges Spiel ein sinnvoller Qualitätsgewinn.

### P2-07: Android-/iOS-Systemleisten lassen sich nicht garantiert entfernen

`display: fullscreen` ist bereits die stärkste Manifest-Anforderung. Browser und Betriebssystem dürfen sie aus Sicherheits- oder Plattformgründen überschreiben. Die Android-Systemnavigation oder der iOS-Home-Indikator ist nicht vollständig von einer Web-App kontrollierbar.

- Android unterstützt Fullscreen-PWAs am weitesten; OEM-, Browser- und Navigationsmodus können trotzdem abweichen.
- iOS-Home-Screen-Web-Apps entfernen die Browser-Toolbar im Standalone-Modus, unterstützen Manifest-Fullscreen aber nicht einheitlich.
- Die Fullscreen API kann auf unterstützten Geräten nach einer Nutzeraktion optional angeboten werden, ist aber kein zuverlässiger plattformübergreifender Ersatz.

Quellen: [MDN `display`](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/display), [web.dev App Design](https://web.dev/learn/pwa/app-design/), [Apple: Home Screen Web Apps](https://developer.apple.com/videos/play/wwdc2023/10120/).

### P2-08: Modale Sheets benötigen Dialog-Semantik

Menü und Skip-Bestätigung haben kein `role="dialog"`, kein `aria-modal`, keinen Fokus-Trap und keine Escape-Behandlung. Hintergrundbedienelemente können für Tastatur-/Screenreader-Nutzung problematisch bleiben.

### P2-09: Wake Lock wird nach App-Wechsel nicht neu angefordert

Ein Screen Wake Lock kann beim Verbergen der Seite automatisch freigegeben werden. Der Code reagiert nicht auf `visibilitychange`; nach dem Zurückkehren kann das Display wieder schlafen.

### P2-10: Security Headers ergänzen

Live ist HSTS vorhanden. Nicht beobachtet wurden unter anderem CSP, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` und ein explizites `frame-ancestors`/Frame-Schutzkonzept. Das ist bei einer statischen App ohne Form-Backend kein P0, sollte aber im eigenen Vercel-Projekt sauber konfiguriert werden.

### P2-11: PREDICT ist in CLASSIC Quick repetitiv und rollenasymmetrisch

Im geprüften Quick-/Playful-Lauf erschien PREDICT auf Q1, Q5 und Q7. In allen drei Fällen riet dieselbe Person die Antwort der anderen. Technisch ist das korrekt aus Frageindex und Start-Offset abgeleitet, spielerisch aber monoton.

**Fix:** maximal einmal je Akt und Prediction-Rolle unabhängig vom normalen Frage-Starter alternieren.

### P2-12: Kleine Copy-/Präferenzdetails

- Mehrere sichtbare Akttexte verwenden `--` statt eines typografischen Gedankenstrichs.
- Nach Abschluss eines englischen Spiels fällt ein Reload wieder auf Deutsch zurück. Sprache als minimale globale Präferenz getrennt vom Run speichern.
- Die reine Timeranzeige `0:26` benötigt einen zugänglichen Namen wie „Aktzeit: 26 Sekunden“.

---

## 7. Review der einzelnen Packs

| Pack | Default | Urteil | Nächste redaktionelle Entscheidung |
|---|---|---|---|
| CLASSIC | Full · 45 Min. | Inhalt beibehalten; Forschungsnähe ist sein Wert. | Claim nicht auf „jede Beziehung/jede Intensität“ ausweiten; nur Full eng mit dem Originalprotokoll verbinden. |
| FIRST DATE | Quick · 18 Min. | Sehr guter, druckarmer Einstieg. | Standard Akt III bündelt viele Grenzen-/Tempo-/Verlässlichkeitsfragen und kann interviewartig wirken; 1–2 wärmere Gegenwartsfragen erwägen. |
| DATE NIGHT | Standard · 32 Min. | Eigenständig, romantisch und prickelnd, ohne Late Night vorwegzunehmen. | Beschreibung „bestehendes Date“ präzisieren, etwa „bestehende romantische Verbindung“. |
| COUPLES | Quick · 15 Min. | Gute Check-in-Route, konstruktiver Ton. | Akt II `REPARIEREN` klingt defizitorientierter als sein Inhalt; `VERSTEHEN`/`AUFEINANDER EINGEHEN` prüfen. Nicht als Akut-Streittool positionieren. |
| FRIENDS | Standard · 35 Min. | Klar platonisch, wertschätzend und handlungsnah. | Quick ist eher warm als lustig; das ist stimmig, sollte aber in der Beschreibung ehrlich sein. |
| OLD FRIENDS | Standard · 32 Min. | Sehr gutes Reconnection-Pack. | Name kann auch langjährige, weiterhin enge Freundschaften meinen; `WIEDERSEHEN`/`RECONNECT` oder klaren Untertitel prüfen. |
| DEEP | Standard · 38 Min. | Kein Quick ist richtig; Tiefe wird nicht nur mit Trauma verwechselt. | Full wiederholt Motive wie Gehörtwerden, Support und Missverstandenwerden; etwas mehr motivische Vielfalt erwägen. |
| CHAOS | Quick · 10 Min. | Fragen sind lebendig, gemeinsam und nicht beschämend. | Ernstes universelles Secret-/Q37-Ritual entfernen; Private Moment humorvoll und kurz machen. |
| LATE NIGHT | nicht live | Inhalt vorsichtig und Consent-orientiert. | Externe Freigabe, echter Gate-Test und eigenes Finale vor Registrierung. Keine gamifizierte geheime Berührungsaufgabe. |

---

## 8. Feature-Audit: behalten, ändern oder entfernen?

| Feature | Entscheidung | Begründung |
|---|---|---|
| Pack-Auswahl | behalten, verdichten | Acht sinnvolle Anwendungsfälle, aber zu viel Scrollen. |
| Quick/Standard/Full | behalten | Eigene Dramaturgien sind fachlich sinnvoll; Zeiten neu modellieren. |
| Style-Auswahl | nur bei echter Wahl zeigen | Nur CLASSIC benötigt sie aktuell. |
| Zeit anzeigen | optional behalten | Hilfreich in begrenzten Situationen, aber kein Leistungs-Timer. |
| PREDICT/BOTH/NO THINKING | CLASSIC-only behalten | Funktionieren als bewusster Playful-Style; nicht auf sensible Packs ausrollen. |
| GO DEEPER | sparsam behalten | Sinnvolle Einladung, solange Ablehnen gleichwertig bleibt. |
| STAY | behalten | Unterstützt das Kernprinzip, das Handy zurücktreten zu lassen. |
| Response Cards | behalten, als optional markieren | Forschungsinformierte Responsivität, derzeit etwas zu präsent. |
| drei Herz-Skips | entfernen/umbauen | Durch kostenloses Ablehnen redundant und semantisch negativ. |
| Lieber nicht | unbedingt behalten | Consent- und Sicherheitsfunktion, visuell besser sichtbar machen. |
| universelle Geheimfrage | ersetzen | Logisch falsch, route-unabhängig und packfremd. |
| Q37 | routeabhängig neu benennen | Nur CLASSIC Full ist tatsächlich Frage 37. |
| CLOSER PULSE | behalten und behutsam ausbauen | Passende Belohnung ohne Score oder Offenbarungsdruck. |
| Resume | behalten | Praktisch; Content-Versionierung technisch korrigieren. |
| PWA | behalten | Passt zu gemeinsamem Gerät und Vollbild; Offline ergänzen. |
| LATE NIGHT | vorbereitet lassen, nicht freischalten | Richtige Reihenfolge: Safety und Recht vor Reichweite. |
| TTS/Voice | weiter isoliert lassen | Wie vereinbart erst mit fertigen Stimmen integrieren. |

---

## 9. Priorisierte Umsetzung

### Sofort

1. Impressum/Datenschutz erreichbar machen.
2. falschen CLASSIC-Introtext pro Pack beheben.
3. Secret-/Q37-Semantik korrigieren oder Mechanik vorübergehend deaktivieren.
4. Skip-Herzen entfernen, bis echte Fragewechsel-Joker existieren.
5. Zeitmodell und Startcopy korrigieren.
6. `Frage 37` routeabhängig benennen.
7. Kontrast von `Lieber nicht`, Menü- und Kleinteksten erhöhen.

### Danach

1. Einzel-Style-Screens überspringen und Timer verlagern.
2. Quick-Flows von langen Private-/Finale-Sequenzen befreien.
3. echte Private Moments pro Pack einführen.
4. modale A11y, WebKit-E2E, Wake-Lock-Reacquire und Offline-Shell ergänzen.
5. reale Sessions zur Zeitkalibrierung und Packqualität durchführen.

### Erst dann

1. zweiter Style für ausgewählte Packs, wenn er einen echten Regelunterschied erzeugt;
2. LATE NIGHT nach externer Freigabe;
3. Voice-Integration nach Abschluss der Stimmen;
4. optionaler Umzug auf `closer.radi.solutions` als eigenes Projekt.

---

## 10. Verweise

- [Vollständiger Fragenkatalog DE/EN](../content/CLOSER_Fragenkatalog_DE_EN.md)
- [Literaturrecherche](../content/CLOSER_Literaturrecherche_Fragendesign.md)
- [Code Review Iteration 9](CLOSER_Code_Review_Iteration9_2026-08-15.md)
- [Refactoring und neue Spielmechanik](CLOSER_Refactoring_und_Spielmechanik_Iteration9_2026-08-15.md)
