const test = require('node:test');
const assert = require('node:assert/strict');
const engine = require('../src/engine.js');
const terms = require('../src/terms.js');
const index = engine.createIndex(terms, [], 'de');
test('German technical term has contextual alternatives', () => {
 const entry = index.get('überprüft');
 assert.ok(entry);
 assert.ok(entry.alternatives.some(a=>a.text==='geprüft'));
 assert.ok(entry.translations.includes('verified'));
});
test('click selects exact word and replaces it', () => {
 const s='Das Gerät wird überprüft.';
 const target=engine.findTarget(s,18,18,index);
 assert.equal(target.text,'überprüft');
 assert.equal(engine.replaceTarget(s,target,'geprüft').text,'Das Gerät wird geprüft.');
});
test('multiword technical term selection', () => {
 const s='Bitte jetzt in Betrieb nehmen und dokumentieren.';
 const target=engine.findTarget(s,17,17,index);
 assert.equal(target.text,'in Betrieb nehmen');
 assert.ok(target.entry.alternatives.some(a=>a.text==='in Betrieb setzen'));
});
test('explicit phrase selection',()=>{
 const s='Bitte in Betrieb nehmen.';
 assert.equal(engine.findTarget(s,6,23,index).text,'in Betrieb nehmen');
});
test('unknown word is not invented',()=>{
 const t=engine.findTarget('Quantenhydraulik unbekannt',3,3,index);
 assert.equal(t.text,'Quantenhydraulik');
 assert.equal(t.entry,null);
});
test('case of all-uppercase word preserved',()=>{
 const s='ÜBERPRÜFT';const t=engine.findTarget(s,4,4,index);
 assert.equal(engine.replaceTarget(s,t,'geprüft').text,'GEPRÜFT');
});
test('stale selection is not replaced',()=>{
 const t=engine.findTarget('Das Gerät',5,5,index);
 assert.equal(engine.replaceTarget('Das Motor',t,'Einheit'),null);
});
test('custom terms override default entries',()=>{
 const c=[engine.validateCustom({language:'de',term:'Sensor',alternatives:['Messfühler'],translations:['sensor head']})];
 assert.equal(engine.createIndex(terms,c,'de').get('sensor').translations[0],'sensor head');
});
test('invalid custom entry rejected',()=>{
 assert.equal(engine.validateCustom({language:'fr',term:'essai',alternatives:['test']}),null);
 assert.equal(engine.validateCustom({language:'de',term:'Prüfung',alternatives:[]}),null);
});
test('English mode has alternatives',()=>{
 const en=engine.createIndex(terms,[],'en');
 const t=engine.findTarget('The device was inspected.',19,19,en);
 assert.equal(t.text,'inspected');
 assert.ok(t.entry.alternatives.some(a=>a.text==='checked'));
});
test('selection trims whitespace',()=>{
 const s=' vor der Inbetriebnahme ';
 assert.equal(engine.findTarget(s,8,s.length,index).text,'Inbetriebnahme');
});
