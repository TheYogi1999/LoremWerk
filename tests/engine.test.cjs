const test = require('node:test');
const assert = require('node:assert/strict');
const engine = require('../src/engine.js');
const terms = require('../src/terms.js');
const index = engine.createIndex(terms, [], 'de');

test('German technical term has contextual alternatives', () => {
  const entry = index.get('überprüft');
  assert.ok(entry);
  assert.ok(entry.alternatives.some((a) => a.text === 'geprüft'));
  assert.ok(entry.translations.includes('verified'));
});
test('click into a word resolves the exact range', () => {
  const text = 'Das Gerät wird überprüft.';
  const selection = engine.findTarget(text, 18, 18, index);
  assert.equal(selection.text, 'überprüft');
  const changed = engine.replaceTarget(text, selection, 'geprüft');
  assert.equal(changed.text, 'Das Gerät wird geprüft.');
});
test('longest multiword term is detected by caret', () => {
  const text = 'Bitte jetzt in Betrieb nehmen und dokumentieren.';
  const sel = engine.findTarget(text, 17, 17, index);
  assert.equal(sel.text, 'in Betrieb nehmen');
  assert.ok(sel.entry.alternatives.some((a) => a.text === 'in Betrieb setzen'));
});
test('selected phrase is used as a phrase', () => {
  const text = 'Bitte in Betrieb nehmen.';
  const sel = engine.findTarget(text, 6, 23, index);
  assert.equal(sel.text, 'in Betrieb nehmen');
});
test('unknown words are not invented', () => {
  const sel = engine.findTarget('Quantenhydraulik unbekannt', 3, 3, index);
  assert.equal(sel.text, 'Quantenhydraulik');
  assert.equal(sel.entry, null);
});
test('capitalization is preserved for upper-case source', () => {
  const text = 'ÜBERPRÜFT';
  const sel = engine.findTarget(text, 4, 4, index);
  assert.equal(engine.replaceTarget(text, sel, 'geprüft').text, 'GEPRÜFT');
});
test('source text mismatch prevents accidental replacement', () => {
  const sel = engine.findTarget('Das Gerät', 5, 5, index);
  assert.equal(engine.replaceTarget('Das Motor', sel, 'Einheit'), null);
});
test('user vocabulary extends and overrides term options', () => {
  const custom = [engine.validateCustom({ language: 'de', term: 'Sensor', alternatives: ['Messfühler'], translations: ['sensor head'] })];
  const extended = engine.createIndex(terms, custom, 'de');
  assert.equal(extended.get('sensor').translations[0], 'sensor head');
});
test('malformed or empty glossary entries are discarded', () => {
  assert.equal(engine.validateCustom({ language: 'fr', term: 'essai', alternatives: ['test'] }), null);
  assert.equal(engine.validateCustom({ language: 'de', term: 'Prüfung', alternatives: [] }), null);
});
test('English mode uses English words', () => {
  const en = engine.createIndex(terms, [], 'en');
  const selected = engine.findTarget('The device was inspected.', 19, 19, en);
  assert.equal(selected.text, 'inspected');
  assert.ok(selected.entry.alternatives.some((a) => a.text === 'checked'));
});
test('explicit selection including whitespace is trimmed', () => {
  const text = ' vor der Inbetriebnahme '; 
  const selected = engine.findTarget(text, 8, text.length, index);
  assert.equal(selected.text, 'Inbetriebnahme');
});
