/* LoremWerk v0.3.0 — all processing stays in this browser. */
(() => {
  'use strict';
  const Engine = window.TWEngine;
  const Terms = [...window.TWTerms, ...(window.LWExtraTerms || [])];
  const Context = window.LWContext;
  const VERSION = document.querySelector('meta[name="app-version"]').content;
  const STORAGE_KEY = 'loremwerk:workspace:v1';
  const GLOSSARY_KEY = 'loremwerk:glossary:v1';
  const DE_EXAMPLE = 'Das Gerät muss vor der Inbetriebnahme überprüft werden.\nDie Spannung muss gemessen werden. Die Steuerung meldet eine Störung.\nEine regelmäßige Wartung ist erforderlich.';
  const EN_EXAMPLE = 'The device must be inspected before commissioning.\nThe control system reports a fault and requires maintenance.\nThe measured voltage must be verified before operation.';
  const byId = (id) => document.getElementById(id);
  const editor = byId('editor');
  const suggestionContainer = byId('suggestions-content');
  const matchingIndicator = byId('matching-indicator');
  let language = 'de';
  let custom = [];
  let selected = null;
  let pendingPlan = null;
  let undoStack = [];
  let toastTimer;

  function readStorage(key, fallback) {
    try { const value = localStorage.getItem(key); return value === null ? fallback : JSON.parse(value); }
    catch { return fallback; }
  }
  function saveStorage(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); }
    catch { /* Private mode / disabled storage: keep state in memory. */ }
  }
  function element(tag, className = '', text = '') {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.textContent = text;
    return el;
  }
  function notify(message) {
    const toast = byId('toast');
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.hidden = true; }, 2800);
  }
  function currentIndex() { return Engine.createIndex(Terms, custom, language); }
  function saveWorkspace() { saveStorage(STORAGE_KEY, { language, text: editor.value }); }
  function countWords(value) { return (value.match(/[\p{L}\p{N}]+(?:[-’'][\p{L}\p{N}]+)*/gu) || []).length; }
  function updateCounters() {
    const n = countWords(editor.value);
    byId('word-count').textContent = `${n} ${n === 1 ? 'Wort' : 'Wörter'} · ${editor.value.length} Zeichen`;
    byId('undo-btn').disabled = undoStack.length === 0;
  }
  function clearSuggestions() {
    selected = null;
    matchingIndicator.textContent = 'Bereit';
    suggestionContainer.replaceChildren();
    const empty = element('div', 'empty-suggestions');
    empty.append(element('div', 'empty-icon', '✦'), element('h3', '', 'Ein Wort genügt.'), element('p', '', 'Klicke oder tippe im Texteditor auf ein Wort, um passende Alternativen zu entdecken.'), element('div', 'tip-chip', '↖ Hier starten'));
    suggestionContainer.append(empty);
  }
  function showSuggestions(target, canReplace = true) {
    suggestionContainer.replaceChildren();
    selected = canReplace ? target : null;
    if (!target) return clearSuggestions();
    const entry = target.entry;
    matchingIndicator.textContent = entry ? `${entry.alternatives.length} Optionen` : 'Kein Eintrag';
    suggestionContainer.append(element('div', 'selected-subtitle', canReplace ? 'AUSGEWÄHLTER AUSDRUCK' : 'WÖRTERBUCHEINTRAG'));
    suggestionContainer.append(element('div', 'selected-word', target.text));
    if (entry) {
      suggestionContainer.append(element('span', 'selected-category', entry.category));
      if (entry.explanation) suggestionContainer.append(element('p', 'selected-explanation', entry.explanation));
      const divider = element('div', 'options-divider');
      divider.append(element('span', '', 'ALTERNATIVE FORMULIERUNGEN'), element('span', '', `${entry.alternatives.length} Treffer`));
      suggestionContainer.append(divider);
      for (const option of entry.alternatives) {
        const plan = canReplace ? Context.planReplacement(editor.value, target, option, language) : null;
        const button = element('button', 'suggestion');
        button.type = 'button';
        const content = element('span', 'suggestion-main');
        content.append(element('span', 'suggestion-name', option.text));
        if (option.note) content.append(element('span', 'suggestion-note', option.note));
        if (plan?.changes?.length > 1) content.append(element('span', 'context-adjusted', `✓ ${plan.changes.length-1} Grammatik-Anpassung(en) möglich`));
        if (plan?.warnings?.length) content.append(element('span', 'context-warning', '⚠ Mehrdeutige Bezüge prüfen'));
        button.append(content, element('span', 'suggestion-plus', canReplace ? '＋' : '⧉'));
        button.title = canReplace ? `„${target.text}“ durch „${option.text}“ ersetzen` : `„${option.text}“ kopieren`;
        button.addEventListener('click', () => canReplace ? replaceSelected(target, option) : copyText(option.text));
        suggestionContainer.append(button);
      }
      if (entry.translations && entry.translations.length) {
        const line = element('div', 'translation-line');
        line.append(element('div', 'translation-label', `FACHÜBERSETZUNG · ${language === 'de' ? 'ENGLISCH' : 'DEUTSCH'}`));
        for (const translation of entry.translations) {
          const chip = element('button', 'translation-chip', translation);
          chip.type = 'button';
          chip.title = 'Fachübersetzung kopieren';
          chip.addEventListener('click', () => copyText(translation));
          line.append(chip);
        }
        suggestionContainer.append(line);
      }
    } else {
      suggestionContainer.append(element('p', 'no-results-note', 'Für diesen Ausdruck sind noch keine geprüften Alternativen hinterlegt. Du kannst ihn in dein eigenes Wörterbuch aufnehmen.'));
      const button = element('button', 'primary-button', '＋ Begriff hinzufügen');
      button.type = 'button';
      button.addEventListener('click', () => openTermDialog(target.text));
      suggestionContainer.append(button);
    }
  }
  function detectSelection() {
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const target = Engine.findTarget(editor.value, start, end, currentIndex());
    if (!target) return clearSuggestions();
    showSuggestions(target);
    editor.setSelectionRange(target.start, target.end);
  }
  function replaceSelected(target, alternative) {
    const plan = Context.planReplacement(editor.value, target, alternative, language);
    if (!plan) return notify('Text wurde verändert. Bitte das Wort erneut auswählen.');
    if (plan.requiresReview) {
      pendingPlan = { plan, target, original: editor.value };
      const changed = plan.changes.filter((c) => c.reason !== 'Ausgewähltes Synonym');
      byId('context-summary').textContent = changed.length ? `${changed.length} zusätzliche Wortform(en) werden vorgeschlagen.` : 'Der Satz enthält einen mehrdeutigen Bezug.';
      byId('context-before').textContent = snippetAround(editor.value, target.start, target.end);
      byId('context-after').textContent = snippetAround(plan.text, plan.start, plan.end);
      const details = byId('context-details');
      details.replaceChildren();
      for (const c of changed) details.append(element('li', 'context-ok', `${c.before} → ${c.after} · ${c.reason}`));
      for (const warning of plan.warnings) details.append(element('li', 'context-caution', `⚠ ${warning}`));
      byId('context-dialog').showModal();
      return;
    }
    commitPlan(plan, target);
  }
  function snippetAround(text, start, end) {
    const from = Math.max(0, text.lastIndexOf('\n', start - 1) + 1);
    const nextNewline = text.indexOf('\n', end);
    const to = Math.min(text.length, nextNewline >= 0 ? nextNewline : text.length);
    const snippet = text.slice(from, to);
    return snippet.length <= 600 ? snippet : text.slice(Math.max(from, start - 140), Math.min(to, end + 300));
  }
  function commitPlan(plan, target) {
    undoStack.push({ text: editor.value, selectionStart: target.start, selectionEnd: target.end });
    if (undoStack.length > 30) undoStack.shift();
    editor.value = plan.text;
    saveWorkspace();
    updateCounters();
    editor.focus();
    editor.setSelectionRange(plan.start, plan.end);
    showSuggestions(Engine.findTarget(editor.value, plan.start, plan.end, currentIndex()));
    const related = plan.changes.length - 1;
    notify(related ? `„${plan.replacement}“ und ${related} Grammatik-Anpassung(en) eingesetzt` : `„${plan.replacement}“ eingesetzt`);
  }
  function acceptContextChange() {
    if (!pendingPlan) return;
    const {plan, target, original} = pendingPlan;
    pendingPlan = null;
    byId('context-dialog').close();
    if (editor.value !== original) return notify('Text wurde verändert. Bitte erneut auswählen.');
    commitPlan(plan, target);
  }
  function undoReplacement() {
    const last = undoStack.pop();
    if (!last) return;
    editor.value = last.text;
    editor.focus();
    editor.setSelectionRange(last.selectionStart, last.selectionEnd);
    saveWorkspace();
    updateCounters();
    showSuggestions(Engine.findTarget(editor.value, last.selectionStart, last.selectionEnd, currentIndex()));
    notify('Änderung rückgängig gemacht');
  }
  async function copyText(text) {
    try {
      if (!navigator.clipboard) throw new Error('No clipboard API');
      await navigator.clipboard.writeText(text);
      notify('In die Zwischenablage kopiert');
    } catch {
      const helper = document.createElement('textarea');
      helper.value = text;
      helper.style.position = 'fixed'; helper.style.opacity = '0';
      document.body.append(helper);
      helper.select();
      const ok = document.execCommand('copy');
      helper.remove();
      notify(ok ? 'In die Zwischenablage kopiert' : 'Kopieren nicht unterstützt');
    }
  }
  function download(name, contents, type = 'text/plain;charset=utf-8') {
    const blob = new Blob([contents], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }
  function setLanguage(value) {
    language = value;
    document.documentElement.lang = value;
    for (const btn of document.querySelectorAll('[data-language]')) {
      const isActive = btn.dataset.language === value;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    }
    byId('custom-language').value = value;
    clearSuggestions();
    renderTermCards();
    saveWorkspace();
  }
  function renderTermCards() {
    const query = Engine.normalize(byId('term-search').value);
    const all = [...Engine.createIndex(Terms, custom, 'de').values(), ...Engine.createIndex(Terms, custom, 'en').values()];
    // Show current language first; match translation and synonym text as well.
    all.sort((a, b) => Number(b.language === language) - Number(a.language === language) || a.term.localeCompare(b.term));
    const matches = all.filter((entry) => {
      if (!query) return true;
      return [entry.term, entry.category, ...entry.translations, ...entry.alternatives.map((a) => a.text)].some((value) => Engine.normalize(value).includes(query));
    });
    const container = byId('term-results');
    container.replaceChildren();
    for (const entry of matches.slice(0, query ? 36 : 9)) {
      const card = element('button', 'term-card');
      card.type = 'button';
      card.title = `Synonyme und Übersetzungen zu „${entry.term}“ anzeigen`;
      const topline = element('div', 'term-topline');
      topline.append(element('span', 'term-type', entry.category.toLocaleUpperCase()), element('span', 'term-language', entry.language.toLocaleUpperCase()));
      card.append(topline, element('div', 'term-title', entry.term), element('div', 'term-alts', entry.alternatives.slice(0, 3).map((a) => a.text).join(' · ')), element('div', 'term-translations', `↔ ${entry.translations.slice(0, 2).join(' · ') || 'Keine Übersetzung hinterlegt'}`));
      card.addEventListener('click', () => {
        // Reference view only: do not silently replace text selected in the editor.
        showSuggestions({ text: entry.term, entry }, false);
        document.querySelector('.workspace').scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      container.append(card);
    }
    if (!matches.length) container.append(element('p', 'no-results-note', 'Keine passenden Begriffe gefunden. Du kannst einen eigenen Begriff ergänzen.'));
    byId('term-result-count').textContent = `${matches.length} ${matches.length === 1 ? 'Begriff' : 'Begriffe'} gefunden${matches.length > (query ? 36 : 9) ? ' · weitere über Suche' : ''}`;
  }
  function openTermDialog(prefill = '') {
    byId('term-form').reset();
    byId('custom-language').value = language;
    byId('custom-term').value = prefill;
    byId('term-dialog').showModal();
    (prefill ? byId('custom-synonyms') : byId('custom-term')).focus();
  }
  function addCustomTerm(event) {
    event.preventDefault();
    const record = Engine.validateCustom({
      language: byId('custom-language').value,
      term: byId('custom-term').value,
      alternatives: byId('custom-synonyms').value.split(',').map((s) => ({ text: s.trim(), note: byId('custom-note').value.trim() })),
      translations: byId('custom-translation').value.split(',').map((s) => s.trim()),
      explanation: byId('custom-note').value.trim()
    });
    if (!record) return notify('Bitte Begriff und mindestens ein Synonym eingeben.');
    custom = custom.filter((item) => !(item.language === record.language && Engine.normalize(item.term) === Engine.normalize(record.term)));
    custom.push(record);
    saveStorage(GLOSSARY_KEY, custom);
    byId('term-dialog').close();
    renderTermCards();
    notify(`„${record.term}“ lokal gespeichert`);
    if (selected) showSuggestions(Engine.findTarget(editor.value, selected.start, selected.end, currentIndex()));
  }
  async function importGlossary(file) {
    if (!file || file.size > 2_000_000) return notify('Bitte eine JSON-Datei unter 2 MB auswählen.');
    try {
      const data = JSON.parse(await file.text());
      const input = Array.isArray(data) ? data : data.entries;
      if (!Array.isArray(input)) throw new Error('Falsches Format');
      const valid = input.slice(0, 500).map(Engine.validateCustom).filter(Boolean);
      if (!valid.length) throw new Error('Keine gültigen Begriffe');
      const merged = new Map(custom.map((item) => [`${item.language}:${Engine.normalize(item.term)}`, item]));
      for (const item of valid) merged.set(`${item.language}:${Engine.normalize(item.term)}`, item);
      custom = [...merged.values()];
      saveStorage(GLOSSARY_KEY, custom);
      renderTermCards();
      notify(`${valid.length} Fachbegriffe importiert`);
    } catch { notify('Die Datei enthält kein gültiges Wörterbuch.'); }
  }
  function attachEvents() {
    editor.addEventListener('pointerup', () => detectSelection());
    editor.addEventListener('keyup', (event) => {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) detectSelection();
    });
    editor.addEventListener('input', () => {
      undoStack = [];
      updateCounters();
      saveWorkspace();
      // Do not reselect while typing; user can tap a word at any time.
      if (selected && editor.value.slice(selected.start, selected.end) !== selected.text) clearSuggestions();
    });
    byId('example-btn').addEventListener('click', () => {
      if (editor.value.trim() && !confirm('Den aktuellen Text durch einen Beispieltext ersetzen?')) return;
      editor.value = language === 'de' ? DE_EXAMPLE : EN_EXAMPLE;
      undoStack = [];
      saveWorkspace(); updateCounters(); clearSuggestions(); editor.focus();
    });
    byId('undo-btn').addEventListener('click', undoReplacement);
    byId('clear-btn').addEventListener('click', () => {
      if (editor.value.trim() && !confirm('Den gesamten Text wirklich löschen?')) return;
      editor.value = ''; undoStack = []; saveWorkspace(); updateCounters(); clearSuggestions(); editor.focus();
    });
    document.querySelectorAll('[data-language]').forEach((btn) => btn.addEventListener('click', () => setLanguage(btn.dataset.language)));
    byId('copy-text').addEventListener('click', () => copyText(editor.value));
    byId('export-text').addEventListener('click', () => download(`LoremWerk-${language}.txt`, editor.value));
    byId('import-text').addEventListener('change', async (event) => {
      const file = event.target.files?.[0];
      if (!file) return;
      if (file.size > 2_000_000) return notify('TXT-Datei darf maximal 2 MB groß sein.');
      if (editor.value.trim() && !confirm('Aktuellen Text durch den Dateiinhalt ersetzen?')) return;
      editor.value = await file.text(); undoStack = []; saveWorkspace(); updateCounters(); clearSuggestions();
      event.target.value = '';
      notify('Textdatei geladen');
    });
    byId('term-search').addEventListener('input', renderTermCards);
    byId('add-term').addEventListener('click', () => openTermDialog());
    byId('term-form').addEventListener('submit', addCustomTerm);
    byId('export-glossary').addEventListener('click', () => download('LoremWerk-glossar.json', JSON.stringify({ format: 'loremwerk-glossary', version: 1, entries: custom }, null, 2), 'application/json;charset=utf-8'));
    byId('import-glossary').addEventListener('change', async (event) => { await importGlossary(event.target.files?.[0]); event.target.value = ''; });
    byId('version-button').addEventListener('click', () => byId('version-dialog').showModal());
    byId('context-accept').addEventListener('click', acceptContextChange);
    byId('context-dialog').addEventListener('close', () => { pendingPlan = null; });
    document.querySelectorAll('[data-close]').forEach((btn) => btn.addEventListener('click', () => byId(btn.dataset.close).close()));
    // Browser default Escape closes dialogs; no external keyboard dependency.
  }
  function init() {
    document.querySelectorAll('[data-version]').forEach((el) => { el.textContent = VERSION; });
    const savedCustom = readStorage(GLOSSARY_KEY, []);
    custom = Array.isArray(savedCustom) ? savedCustom.slice(0, 500).map(Engine.validateCustom).filter(Boolean) : [];
    const workspace = readStorage(STORAGE_KEY, null);
    if (workspace && typeof workspace.text === 'string') editor.value = workspace.text;
    else editor.value = DE_EXAMPLE;
    attachEvents();
    setLanguage(workspace?.language === 'en' ? 'en' : 'de');
    updateCounters();
    clearSuggestions();
    if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
      navigator.serviceWorker.register('./service-worker.js').catch(() => { /* Can still run fully locally. */ });
    }
  }
  init();
})();
