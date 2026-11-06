# Changelog

## [0.3.0] — 2026-11-06

### Added
- Substantially expanded the bundled local DE/EN terminology database to **456 curated records** (91 original + 365 new) across mechanical engineering, electrical engineering, process control, software, quality, safety and technical writing.
- Context-aware *conservative* German replacement previews: article, simple adjective endings and an unambiguous pronoun at the beginning of the following sentence can be adapted when noun gender changes.
- Full-document scan for additional pronouns that might require manual review. Distant or ambiguous references are not automatically rewritten.
- Confirmation dialog shows the original passage, resulting passage, individual grammatical adjustments and warnings before applying any connected changes.
- Expanded Node tests for grammatical agreement, competing noun references, ambiguous feminine pronouns, possessives and the enlarged dictionary.

### Limitations
- Heuristic local context checks **do not provide full grammatical analysis or coreference resolution**. The user must confirm suggested changes, especially in technical or safety-related writing.
- A general dictionary or neural model is not bundled. Some word forms and technical fields still have no entry.

## [0.2.0] — 2026-11-06

- Application renamed **LoremWerk** with GitHub Pages workflow, responsive local editor, visible version history and CI tests.

## [0.1.0] — 2026-11-06

- Initial local German/English technical synonym editor with glossary, import/export, undo, and browser-only processing.
