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
- **LATE NIGHT**: Inhalt vollständig in `closer.js` vorbereitet (`LATE_NIGHT_PACK`), aber absichtlich **nicht** in `PACKS` registriert und damit im Spiel nicht erreichbar. Fehlt noch: (1) die im Katalog verbindlich geforderte Consent-Gate-UI (separates 18+-Opt-in pro Person vor dem Pack, erneutes Opt-in vor Akt II) – dafür existiert aktuell kein generischer Mechanismus in `CloserGame.js`; (2) die im Katalog selbst benannte gesonderte österreichische Jugend-/Medien-/Datenschutzprüfung, die noch aussteht.
- **Noch nicht umgesetzt**: FR8-04 (CLOSER PULSE, Meilenstein-Animationen), FR8-06 (Content-Versionierung), Response Cards als eigenes UI-Feature (Text liegt als Kommentar in `closer.js` bei den jeweiligen Packs).
