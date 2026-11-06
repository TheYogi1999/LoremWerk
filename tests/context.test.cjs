const test=require('node:test');
const assert=require('node:assert/strict');
const ctx=require('../src/context.js');
const extras=require('../src/extra-terms.js');
const existing=require('../src/terms.js');
const engine=require('../src/engine.js');
const plan=(text,source,alt)=>{const i=text.indexOf(source);assert.ok(i>=0);return ctx.planReplacement(text,{start:i,end:i+source.length,text:source},alt);};

test('full example: German article and linked pronoun',()=>{
 const r=plan('Das Gerät ist defekt. Es muss geprüft werden.','Gerät','Einheit');
 assert.equal(r.text,'Die Einheit ist defekt. Sie muss geprüft werden.');
 assert.equal(r.changes.length,3);assert.equal(r.requiresReview,true);
});
test('adjective ending and article under indef article',()=>{
 const r=plan('Ein defektes Gerät ist defekt. Es wird ersetzt.','Gerät','Einheit');
 assert.equal(r.text,'Eine defekte Einheit ist defekt. Sie wird ersetzt.');
 assert.equal(r.changes.length,4);
});
test('dative article agrees with selected noun',()=>{
 const r=plan('Mit dem Sensor wird gemessen. Er ist neu.','Sensor','Einheit');
 assert.equal(r.text,'Mit der Einheit wird gemessen. Sie ist neu.');
});
test('ambiguity leaves pronoun unchanged and produces warning',()=>{
 const r=plan('Das Gerät steht neben dem Bauteil. Es ist defekt.','Gerät','Einheit');
 assert.equal(r.text,'Die Einheit steht neben dem Bauteil. Es ist defekt.');
 assert.match(r.warnings.join(' '),/unklar/);
});
test('feminine sie is not silently reassigned',()=>{
 const r=plan('Die Einheit ist neu. Sie wird geprüft.','Einheit','Gerät');
 assert.equal(r.text,'Das Gerät ist neu. Sie wird geprüft.');
 assert.match(r.warnings.join(' '),/Pronomen/);
});
test('possessive pronoun is updated only for changed gender',()=>{
 const r=plan('Das Gerät wurde geprüft. Seine Anzeige funktioniert.','Gerät','Einheit');
 assert.equal(r.text,'Die Einheit wurde geprüft. Ihre Anzeige funktioniert.');
 const stillMasc=plan('Der Sensor wurde geprüft. Seine Anzeige funktioniert.','Sensor','Gerät');
 assert.equal(stillMasc.text,'Das Gerät wurde geprüft. Seine Anzeige funktioniert.');
});
test('distant reference is warned but not blindly replaced',()=>{
 const r=plan('Das Gerät ist defekt. Die Anlage wird geprüft. Es ist wichtig.','Gerät','Einheit');
 assert.ok(r.text.includes('Es ist wichtig.'));
 assert.match(r.warnings.join(' '),/restlichen Text/);
});
test('English has no German grammatical mutation',()=>{
 const r=ctx.planReplacement('The device is broken. It needs inspection.',{start:4,end:10,text:'device'},'unit','en');
 assert.equal(r.text,'The unit is broken. It needs inspection.');
 assert.equal(r.requiresReview,false);
});
test('unknown noun gender is not guessed',()=>{
 const r=plan('Die Antriebswelle ist rot. Sie dreht sich.','Antriebswelle','Welle');
 assert.equal(r.text,'Die Welle ist rot. Sie dreht sich.');
});
test('version 0.3 expands the integrated dictionary significantly',()=>{
 const all=[...existing,...extras];
 assert.ok(all.length>=400,`Got ${all.length} terms`);
 const de=engine.createIndex(all,[],'de'),en=engine.createIndex(all,[],'en');
 assert.ok(de.has('messwert')&&de.has('betriebsanleitung')&&en.has('flow rate'));
});
test('stale selection cannot be applied',()=>{
 assert.equal(ctx.planReplacement('Das System',{start:4,end:9,text:'Gerät'},'Einheit'),null);
});
