# GitHub Pages für LoremWerk

1. Öffne https://github.com/TheYogi1999/LoremWerk/settings/pages
2. Wähle **Build and deployment → Source → GitHub Actions**.
3. Öffne https://github.com/TheYogi199/LoremWerk/actions und kontrolliere den Workflow **Publish LoremWerk to GitHub Pages**. Gegebenenfalls **Run workflow** starten.
4. Sobald die Veröffentlichung erfolgreich ist: https://theyogi1999.github.io/LoremWerk/

Bei einer Fehlermeldung in `configure-pages`: Prüfe, ob GitHub Pages wirklich auf **GitHub Actions** gestellt ist. Wenn GitHub Apps keine Pages-Einstellung ändern dürfen, ist Schritt 2 einmalig manuell erforderlich.

**Datenschutz:** Der HTML/CSS/JS-Quellcode wird von GitHub gehostet. Deine eingegebenen Texte werden von der App nicht hochgeladen; sie bleiben in deinem Browser gespeichert.

## Falls die Website noch v0.2.0 oder 404 zeigt

Im GitHub-Actions-Protokoll vom 06.11.2026 war der erste eigene Workflow auf `main` fehlgeschlagen, weil Pages noch nicht eingerichtet war. Ein von GitHub gestarteter **branchbasierter** Pages-Lauf aus `release/v0.2.0` war danach erfolgreich. Prüfe deshalb die aktuell eingestellte Veröffentlichungsquelle.

Empfohlen: Wähle bei **Source** `GitHub Actions`, damit `.github/workflows/pages.yml` bei jedem Push auf `main` veröffentlicht. Wenn du stattdessen **Deploy from a branch** nutzt, wähle **main** und **/(root)**, nicht den unveränderlichen Release-Branch. Dann kann GitHub den Branch ohne unseren eigenen Actions-Workflow veröffentlichen.

Wenn GitHub Actions als Quelle eingestellt sind, starte über **Actions → Publish LoremWerk to GitHub Pages → Run workflow** den Workflow bei Bedarf neu.
