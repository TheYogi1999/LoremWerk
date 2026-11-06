# LoremWerk

**v0.2.0** · Deutsch / English · Technical writing · Browser-only processing · Offline

LoremWerk ist ein technischer Schreibeditor für Deutsch und Englisch: **Wort anklicken, passende Synonyme vergleichen und nur das gewählte Wort ersetzen.** Ausdrücke können ebenfalls markiert werden.

## Online & offline nutzen

- GitHub Pages: Nach einmaliger Aktivierung unter [Settings → Pages](https://github.com/TheYogi1999/LoremWerk/settings/pages) kann die Anwendung unter **https://theyogi1999.github.io/LoremWerk/** aufgerufen werden.
- Ohne Internet: Repository herunterladen und `index.html` im Browser öffnen.
- Lokal als Server (Node.js 18+): `npm start` und http://127.0.0.1:4173 öffnen.
- Einzeldatei offline: `npm run build` erzeugt `dist/LoremWerk-v0.2.0.html`.

## Funktionen

- DE/EN-Synonyme mit Hinweisen zu Bedeutung und technischem Kontext (Maschinenbau, Automation, Elektrotechnik, IT).
- Wort anklicken oder längere Begriffe markieren; Vorschlag auswählen und den Text ersetzen.
- Letzte Ersetzungen rückgängig machen.
- Fachwortübersetzungen einzelner Begriffe kopieren; **keine automatische Volltextübersetzung**.
- Eigenes Fachwörterbuch ergänzen und JSON importieren/exportieren.
- TXT öffnen/speichern, Text kopieren, lokale automatische Speicherung.
- Mobil- und Desktopansicht, kein externes API oder Tracking.
- Sichtbare Version in der App, Changelog, Git-Historie und automatische Tests.

## GitHub Pages aktivieren

Die Datei `.github/workflows/pages.yml` veröffentlicht die statische Website bei jedem Push auf `main`.

1. Öffne **https://github.com/TheYogi1999/LoremWerk/settings/pages**.
2. Wähle bei **Build and deployment → Source** die Option **GitHub Actions**.
3. Kontrolliere [Actions](https://github.com/TheYogi1999/LoremWerk/actions) und starte ggf. *Publish LoremWerk to GitHub Pages* mit **Run workflow**.
4. Nach erfolgreichem Deployment: https://theyogi1999.github.io/LoremWerk/.

Die einmalige Pages-Einstellung kann über die verbundene GitHub-Funktion nicht automatisch gesetzt werden. Die URL ist erst nach einem erfolgreichen Deployment online.

## Entwicklung / Testen

```bash
npm run check
npm test
npm run build
npm start
```

Node 18+ benötigt, **keine npm-Paketinstallation**. Quellcode liegt in `src/`, der Begriffskatalog in `src/terms.js`, Tests in `tests/`. `index.html` ist der GitHub-Pages-Einstieg; der Service Worker ermöglicht Offline-Caching nach dem ersten Besuch.

## Versionierung

[CHANGELOG.md](CHANGELOG.md) enthält alle Änderungen. Wir verwenden [SemVer](https://semver.org/). Versionsnummern stehen in `VERSION`, `package.json`, `index.html` und im Cache-Namen des Service Workers sowie sichtbar im Versionsdialog.

## Datenschutz / Einschränkungen

Beim Aufrufen von GitHub Pages lädt dein Browser Programmdateien von GitHub. **Eingegebene Texte, eigene Wörterbucheinträge und Synonymersetzungen verarbeitet die App ausschließlich im Browser**, ohne sie an einen Server zu übermitteln. Die Daten bleiben im jeweiligen Browser im `localStorage`; Private Browsing oder gelöschte Websitedaten können sie entfernen. Eigene Begriffe kannst du als JSON sichern.

Synonyme sind kuratierte Vorschläge und nicht in jedem technischen Kontext gleichbedeutend. Noch **keine neuralen Volltextübersetzungen, keine automatische Grammatik-KI**.

MIT-Lizenz, siehe [LICENSE](LICENSE).
