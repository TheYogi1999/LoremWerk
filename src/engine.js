/* LoremWerk — pure, dependency-free language engine. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.TWEngine = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const WORD = /[\p{L}\p{M}\p{N}]+(?:[-’'][\p{L}\p{M}\p{N}]+)*/gu;
  const BOUNDARY = /[\p{L}\p{M}\p{N}]/u;
  const normalize = (value) => String(value || '').normalize('NFKC').trim().toLocaleLowerCase();
  const isWordChar = (c) => Boolean(c && BOUNDARY.test(c));

  function createIndex(dictionary, custom = [], language = 'de') {
    const index = new Map();
    for (const term of dictionary.filter((item) => item.language === language)) {
      index.set(normalize(term.term), {
        ...term,
        alternatives: [...term.alternatives],
        translations: [...(term.translations || [])]
      });
    }
    for (const term of custom.filter((item) => item.language === language)) {
      const key = normalize(term.term);
      if (!key) continue;
      const prev = index.get(key);
      const combined = [...term.alternatives, ...(prev?.alternatives || [])];
      const seen = new Set();
      index.set(key, {
        language, term: term.term, category: term.category || prev?.category || 'Eigenes Wörterbuch',
        explanation: term.explanation || prev?.explanation || 'Eigener Fachbegriff',
        alternatives: combined.filter((alt) => {
          const normalized = normalize(alt.text);
          if (!normalized || seen.has(normalized)) return false;
          seen.add(normalized);
          return true;
        }),
        translations: [...new Set([...(term.translations || []), ...(prev?.translations || [])])]
      });
    }
    return index;
  }

  function findTarget(text, start, end, index) {
    text = String(text);
    start = Math.max(0, Math.min(start, text.length));
    end = Math.max(start, Math.min(end, text.length));
    if (end > start) {
      while (start < end && /\s/u.test(text[start])) start++;
      while (end > start && /\s/u.test(text[end - 1])) end--;
      if (start >= end) return null;
      const selected = text.slice(start, end);
      return { start, end, text: selected, entry: index.get(normalize(selected)) || null };
    }
    // Prefer multiword technical terms over individual words.
    const phraseEntries = [...index.values()]
      .filter((entry) => /\s/u.test(entry.term))
      .sort((a, b) => b.term.length - a.term.length);
    const lowered = text.toLocaleLowerCase();
    for (const entry of phraseEntries) {
      const phrase = entry.term.toLocaleLowerCase();
      let from = 0;
      while ((from = lowered.indexOf(phrase, from)) !== -1) {
        const to = from + phrase.length;
        if (start >= from && start <= to && !isWordChar(text[from - 1]) && !isWordChar(text[to])) {
          return { start: from, end: to, text: text.slice(from, to), entry };
        }
        from += 1;
      }
    }
    WORD.lastIndex = 0;
    let match;
    while ((match = WORD.exec(text))) {
      const to = match.index + match[0].length;
      if (start >= match.index && start <= to) {
        return { start: match.index, end: to, text: match[0], entry: index.get(normalize(match[0])) || null };
      }
    }
    return null;
  }

  function matchCase(original, replacement, language = 'de') {
    const letters = original.replace(/[^\p{L}]/gu, '');
    if (letters.length > 1 && letters === letters.toLocaleUpperCase(language)) return replacement.toLocaleUpperCase(language);
    if (/^\p{Lu}/u.test(original) && /^\p{Ll}/u.test(replacement)) {
      return replacement.charAt(0).toLocaleUpperCase(language) + replacement.slice(1);
    }
    return replacement;
  }

  function replaceTarget(text, target, newText, language = 'de') {
    if (!target || target.start < 0 || target.end > text.length || target.start >= target.end) return null;
    if (text.slice(target.start, target.end) !== target.text) return null;
    const replacement = matchCase(target.text, String(newText).trim(), language);
    if (!replacement) return null;
    return {
      text: text.slice(0, target.start) + replacement + text.slice(target.end),
      start: target.start,
      end: target.start + replacement.length,
      replacement
    };
  }

  function validateCustom(input) {
    if (!input || typeof input !== 'object') return null;
    if (!['de', 'en'].includes(input.language)) return null;
    const term = String(input.term || '').trim().slice(0, 100);
    if (!term || /[\r\n]/.test(term)) return null;
    const raw = Array.isArray(input.alternatives) ? input.alternatives : [];
    const alternatives = raw.slice(0, 20).map((v) => {
      const text = String(typeof v === 'string' ? v : v?.text || '').trim().slice(0, 100);
      const note = String(typeof v === 'string' ? '' : v?.note || '').trim().slice(0, 200);
      return { text, note };
    }).filter((v) => v.text && !/[\r\n]/.test(v.text));
    if (!alternatives.length) return null;
    const translations = (Array.isArray(input.translations) ? input.translations : [])
      .slice(0, 10).map((v) => String(v).trim().slice(0, 100)).filter(Boolean);
    return {
      language: input.language, term,
      category: String(input.category || 'Eigenes Wörterbuch').slice(0, 70),
      explanation: String(input.explanation || '').slice(0, 200),
      alternatives, translations
    };
  }

  return { normalize, createIndex, findTarget, matchCase, replaceTarget, validateCustom };
});
