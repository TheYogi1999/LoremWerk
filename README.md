# LoremWerk

**Version 0.3.0** · Deutsch / English · Technical Writing · Browser-first · Offline

LoremWerk is a local, privacy-conscious technical writing editor. **Click a word or select a technical phrase, pick a meaning-labeled synonym, and replace only that selection.** No external translation API, AI provider, tracker, login or backend. It is not yet a neural full-document translator.

## Use it

- **GitHub Pages:** When enabled at [Repository Settings → Pages](https://github.com/TheYogi1999/LoremWerk/settings/pages), open **https://theyogi1999.github.io/LoremWerk/**.
- **Offline:** Download the repository and open `index.html` directly in a modern browser. For a single-file offline build run `npm run build` and open `dist/LoremWerk-v0.3.0.html`.
- **Local server:** Node.js 18+: `npm start`, then `http://127.0.0.1:4173` (localhost only).

## Features

- 456 bundled DE/EN technical and writing entries (91 original + 365 new) with meaning notes spanning mechanical engineering, electricity, automation, IT, safety and documentation.
- Select text or tap/click inside a word. For recognized German nouns, a change of grammatical gender can also propose article, simple adjective endings and the nearest unambiguous pronoun in the following sentence. Every related edit is previewed and requires confirmation. Undo is supported.
- Full-document scan warns about additional possible references without rewriting them automatically.
- Copy terminology translations for individual entries and phrases (**no automatic complete text translation**).
- Local glossary with add/import/export in JSON; TXT import/export and browser autosave.
- Responsive desktop/mobile UI, keyboard accessible buttons, no runtime package dependencies.
- PWA shell cached after first online visit on HTTPS; installation may depend on browser.
- Visible `v0.3.0` in header/footer; changelog and Git history.

## GitHub Pages activation

The repository includes `.github/workflows/pages.yml`, which publishes the root static site on every push to `main`. To activate it **once**, open [Settings → Pages](https://github.com/TheYogi1999/LoremWerk/settings/pages) and set **Build and deployment → Source → GitHub Actions**. GitHub Actions should run and the site appear at https://theyogi1999.github.io/LoremWerk/. The workflow cannot bypass this initial repo setting; do not treat the URL as live until Pages reports a successful deployment.

## Development & versioning

```sh
npm test
npm run check
npm run build
npm start
```

We use SemVer (`MAJOR.MINOR.PATCH`) with `VERSION`, `package.json`, HTML `meta[name=app-version]`, PWA cache name, `CHANGELOG.md` and release branches. A release should update these together; version is displayed in the editor and its version dialog.

Project structure: `index.html`, `styles.css`, `src/main.js` (UI), `src/engine.js` (text selection/replacements), `src/terms.js` and `src/extra-terms.js` (DE/EN vocabulary), `src/context.js` (conservative grammatical previews), `service-worker.js` (offline shell), `tests/` (Node native tests), `.github/workflows/` (CI, Pages), `tools/build-standalone.cjs` (one-file offline build).

## Privacy and limitations

Document text and glossary are stored in browser `localStorage`; neither is sent to GitHub Pages by the application. When you **visit the hosted site**, GitHub serves the static program files, which requires an internet connection for the first visit; cached app shell can later work offline. Private browsing, browser storage clearing, or different devices will not retain saved text; export your glossary as a backup.

Synonyms are curated and not always equivalent in specialist contexts. **Grammar is rule-based and incomplete:** a safe correction can require reviewing surrounding sentences, sentence structure and co-reference; feminine “sie” and distant pronouns are not silently reassigned. Longer document-wide reference chains are scanned for warnings, not automatically rewritten. Never use changes without technical review. **No neural full-text translation or complete AI grammar correction.**

## License

MIT, see [LICENSE](LICENSE).
