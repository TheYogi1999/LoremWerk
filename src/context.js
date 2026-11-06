/* LoremWerk context engine — conservative, reviewable DE agreement rules.
   This is not a full parser. Ambiguous references are never rewritten silently. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.LWContext = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const nounGenders = {
    'gerät':'n','messgerät':'n','prüfgerät':'n','apparat':'m','einheit':'f','sensor':'m',
    'messfühler':'m','aufnehmer':'m','sensorelement':'n','system':'n','gesamtsystem':'n',
    'anlage':'f','produktionsanlage':'f','einrichtung':'f','komponente':'f','bauteil':'n',
    'modul':'n','baugruppe':'f','steuerung':'f','steuereinheit':'f','steuerungssystem':'n',
    'regler':'m','reglerkreis':'m','regelkreis':'m','fehlfunktion':'f','fehler':'m',
    'störung':'f','betriebsstörung':'f','defekt':'m','abweichung':'f','spannung':'f',
    'potenzialdifferenz':'f','strom':'m','stromfluss':'m','leistung':'f','schnittstelle':'f',
    'interface':'n','verbindung':'f','kupplung':'f','netzwerk':'n','leitung':'f','kabel':'n',
    'messung':'f','prüfung':'f','kontrolle':'f','inspektion':'f','messwert':'m','wert':'m',
    'vorgang':'m','prozess':'m','verfahren':'n','methode':'f','analyse':'f','auswertung':'f',
    'betriebsaufnahme':'f','inbetriebnahme':'f','inbetriebsetzung':'f','wartung':'f',
    'instandhaltung':'f','reparatur':'f','instandsetzung':'f','schaden':'m','qualität':'f',
    'anzeige':'f','display':'n','bildschirm':'m','meldung':'f','hinweis':'m','information':'f',
    'dokumentation':'f','handbuch':'n','anleitung':'f','beschreibung':'f','bericht':'m',
    'anforderung':'f','vorgabe':'f','bedingung':'f','parameter':'m','variable':'f',
    'ergebnis':'n','resultat':'n','ausgabe':'f','eingabe':'f','funktion':'f','fähigkeit':'f',
    'aufgabe':'f','auftrag':'m','datenpunkt':'m','datensatz':'m','datenbank':'f',
    'fehlercode':'m','protokoll':'n','logdatei':'f','ereignis':'n',
    'motor':'m','antrieb':'m','maschine':'f','aggregat':'n','ventil':'n','pumpe':'f',
    'schalter':'m','taster':'m','knopf':'m','kontakt':'m','gehäuse':'n',
    'schraube':'f','befestigung':'f','halterung':'f','schaltung':'f',
    'schaltkreis':'m','stromkreis':'m','widerstand':'m','impedanz':'f',
    'batterie':'f','akku':'m','akku-pack':'m','spannungsspitze':'f',
    'temperatur':'f','wärme':'f','druck':'m','druckwert':'m','kraft':'f',
    'drehmoment':'n','geschwindigkeit':'f','drehzahl':'f','frequenz':'f',
    'bereich':'m','intervall':'n','zeitraum':'m','abschnitt':'m',
    'prüfstand':'m','messaufbau':'m','aufbau':'m','konfiguration':'f',
    'struktur':'f','architektur':'f','spezifikation':'f','norm':'f','standard':'m',
    'sicherheit':'f','schutz':'m','schutzmaßnahme':'f','gefahr':'f','risiko':'n',
    'fehlerursache':'f','ursache':'f','ausfall':'m','stillstand':'m',
    'signal':'n','impuls':'m','sensorwert':'m','status':'m',
    'test':'m','versuch':'m','versuchsaufbau':'m','testfall':'m',
    'prüfschritt':'m','prüfverfahren':'n','prozedur':'f',
    'anwendung':'f','software':'f','programm':'n','dienst':'m','service':'m',
    'systemkomponente':'f','bauelement':'n','bestandteil':'m'
  };
  const forms = {
    definite: {
      m: {nom:'der',acc:'den',dat:'dem',gen:'des'},
      f: {nom:'die',acc:'die',dat:'der',gen:'der'},
      n: {nom:'das',acc:'das',dat:'dem',gen:'des'}
    },
    indefinite: {
      m: {nom:'ein',acc:'einen',dat:'einem',gen:'eines'},
      f: {nom:'eine',acc:'eine',dat:'einer',gen:'einer'},
      n: {nom:'ein',acc:'ein',dat:'einem',gen:'eines'}
    },
    negative: {
      m: {nom:'kein',acc:'keinen',dat:'keinem',gen:'keines'},
      f: {nom:'keine',acc:'keine',dat:'keiner',gen:'keiner'},
      n: {nom:'kein',acc:'kein',dat:'keinem',gen:'keines'}
    }
  };
  const pronounNom = {m:'er',f:'sie',n:'es'};
  const normalize = (s) => String(s||'').trim().toLocaleLowerCase('de');
  const wordBoundary = (s) => new RegExp('(?<![\\p{L}\\p{N}])'+s+'(?![\\p{L}\\p{N}])','iu');
  const nounGender = (word) => nounGenders[normalize(word)] || null;

  function calculateArticle(old, fromGender, toGender) {
    const lower = normalize(old);
    for (const [style, genderForms] of Object.entries(forms)) {
      const possible = Object.keys(genderForms[fromGender]).filter(c=>genderForms[fromGender][c]===lower);
      if (possible.length) {
        const replacements=[...new Set(possible.map(c=>genderForms[toGender][c]))];
        return replacements.length===1 ? replacements[0] : null;
      }
    }
    return undefined;
  }

  const adjectiveStems = ['defekt','neu','alt','klein','groß','gross','technisch','elektrisch','mechanisch','sicher','modern','wichtig','geeignet','zuverlässig','beschädigt','korrekt','erforderlich','regelmäßig','präzis','genau','einfach','komplex','stabil','beschränkt','robust','kritisch'];
  const suffixes = ['','e','en','er','es','em'];
  function adjectiveParts(word) {
    const lower=normalize(word);
    for(const stem of adjectiveStems) {
      if (!lower.startsWith(stem)) continue;
      const tail=lower.slice(stem.length);
      if (suffixes.includes(tail)) return {stem,tail};
    }
    return null;
  }
  function adjectiveEnding(style,gender,grammaticalCase) {
    if(style==='definite') return ['nom','acc'].includes(grammaticalCase) && !(gender==='m' && grammaticalCase==='acc') ? 'e' : 'en';
    if(style==='indefinite'||style==='negative') {
      if(grammaticalCase==='nom') return {m:'er',f:'e',n:'es'}[gender];
      if(grammaticalCase==='acc') return {m:'en',f:'e',n:'es'}[gender];
      return 'en';
    }
    return null;
  }
  function calculateAgreement(text,target,oldGender,newGender) {
    const changes=[];const warnings=[];
    const before = text.slice(Math.max(0,target.start-75),target.start);
    const candidate = /(?<![\p{L}])(?<article>der|die|das|den|dem|des|eine|einen|einem|einer|eines|ein|keine|keinen|keinem|keiner|keines|kein)\s+(?:(?<adjective>[\p{L}äöüß-]+)\s+)?$/iu.exec(before);
    if(!candidate) {
      warnings.push('Kein eindeutiger Artikel vor dem Substantiv erkannt. Grammatik bitte prüfen.');
      return {changes,warnings};
    }
    const article=candidate.groups.article;
    const adjective=candidate.groups.adjective;
    const style=/^kein/.test(normalize(article))?'negative': /^ein/.test(normalize(article))?'indefinite':'definite';
    const cases=Object.keys(forms[style][oldGender]).filter(c=>forms[style][oldGender][c]===normalize(article));
    const replacements=[...new Set(cases.map(c=>forms[style][newGender][c]))];
    if(replacements.length!==1) {
      warnings.push('Der Kasus ist mehrdeutig; Artikel und Adjektiv müssen manuell geprüft werden.');
      return {changes,warnings};
    }
    const articleStart = target.start-before.length+candidate.index;
    const newArticle=replacements[0];
    if(normalize(article)!==newArticle) changes.push({start:articleStart,end:articleStart+article.length,before:article,after:matchCase(article,newArticle),reason:'Artikel an Genus/Kasus angepasst'});
    if(adjective) {
      const parts=adjectiveParts(adjective);
      const possibleEnds=[];
      if(parts) for (const c of cases) {
        if(parts.tail===adjectiveEnding(style,oldGender,c)) possibleEnds.push(adjectiveEnding(style,newGender,c));
      }
      const resulting=[...new Set(possibleEnds)];
      if(parts && resulting.length===1) {
        const newAdj=matchCase(adjective,parts.stem+resulting[0]);
        if(newAdj!==adjective) {
          const adjStart=target.start-adjective.length-1;
          changes.push({start:adjStart,end:adjStart+adjective.length,before:adjective,after:newAdj,reason:'Adjektivendung an Genus/Kasus angepasst'});
        }
      } else warnings.push('Adjektivendung vor dem Substantiv bitte kontrollieren.');
    }
    return {changes,warnings};
  }
  function matchCase(original,replacement) {
    if(!original) return replacement;
    if(original===original.toLocaleUpperCase('de'))return replacement.toLocaleUpperCase('de');
    if(original[0]===original[0].toLocaleUpperCase('de'))return replacement[0].toLocaleUpperCase('de')+replacement.slice(1);
    return replacement;
  }
  function findPronounChanges(text,target,fromGender,toGender) {
    const warnings=[];const changes=[];
    // Only check the start of the *immediately following sentence*.
    const following=text.slice(target.end);
    const boundary=/[.!?](?:[\u201d"”']?\s+)([\u201e"“'()]*)(Er|Es|Sie|Seine|Sein|Seinen|Seinem|Seiner|Seines|Ihre|Ihr|Ihren|Ihrem|Ihres)\b/gu;
    const candidate=boundary.exec(following.slice(0,350));
    if(!candidate) return {changes,warnings};
    const pron=candidate[2];
    const nom=pronounNom[fromGender];
    const samePerson=normalize(pron)===nom;
    const possessive=fromGender==='n'||fromGender==='m'
      ? /^sein(?:e|en|em|er|es)?$/iu.test(pron)
      : /^ihr(?:e|en|em|er|es)?$/iu.test(pron);
    if(!samePerson&&!possessive) return {changes,warnings};
    const span=following.slice(0,candidate.index);
    const compatible = [...span.matchAll(/\b\p{Lu}[\p{L}]{2,}\b/gu)]
       .some(m=>!nounGender(m[0])||nounGender(m[0])===fromGender);
    if(compatible) {
      warnings.push('Ein weiteres passendes Substantiv steht vor dem Pronomen; Bezug ist unklar.');
      return {changes,warnings};
    }
    if(fromGender==='f') {
      warnings.push('„Sie/Ihr“ kann sich auf weitere Personen oder Dinge beziehen. Pronomen bitte selbst prüfen.');
      return {changes,warnings};
    }
    const contextBeforePron=following.slice(candidate.index+candidate[0].length).slice(0,32);
    if(possessive && !/^\s+\p{Lu}/u.test(contextBeforePron)) {
      warnings.push('Possessivpronomen nicht eindeutig erkannt; bitte prüfen.');
      return {changes,warnings};
    }
    const converted = possessive
      ? (toGender==='f'?'ihr':'sein')+pron.toLocaleLowerCase('de').slice(4)
      : pronounNom[toGender];
    if (normalize(pron)===converted) return {changes,warnings};
    const at=target.end+candidate.index+candidate[0].lastIndexOf(pron);
    changes.push({start:at,end:at+pron.length,before:pron,after:matchCase(pron,converted),reason:'Pronomen im folgenden Satz angepasst (bitte Bezug bestätigen)'});
    return {changes,warnings};
  }
  function planReplacement(text,target,option,language='de') {
    text=String(text);
    const replacementText=typeof option==='string'?option:option?.text;
    if(!target || text.slice(target.start,target.end)!==target.text || !String(replacementText||'').trim())return null;
    const primary={start:target.start,end:target.end,before:target.text,after:matchCase(target.text,String(replacementText).trim()),reason:'Ausgewähltes Synonym'};
    const changes=[primary];const warnings=[];
    if(language==='de') {
      const oldGender=nounGender(target.text),newGender=nounGender(replacementText);
      if(oldGender && newGender && oldGender!==newGender) {
        const agreement=calculateAgreement(text,target,oldGender,newGender);
        changes.push(...agreement.changes);warnings.push(...agreement.warnings);
        const pron=findPronounChanges(text,target,oldGender,newGender);
        changes.push(...pron.changes);warnings.push(...pron.warnings);
        // Scan the entire remaining document for possible references. We intentionally
        // do not rewrite distant pronouns whose antecedent cannot be determined safely.
        const rest=text.slice(target.end);
        const sourcePronouns=oldGender==='m'?/\b(?:er|ihn|ihm|sein(?:e|en|em|er|es)?)\b/giu
          :oldGender==='n'?/\b(?:es|ihm|sein(?:e|en|em|er|es)?)\b/giu
          :/\b(?:sie|ihr(?:e|en|em|er|es)?)\b/giu;
        const extra=[...rest.matchAll(sourcePronouns)].filter(m=>!pron.changes.some(c=>c.start===target.end+m.index));
        if(extra.length) warnings.push(`${extra.length} mögliche weitere Pronomen-Bezüge im restlichen Text gefunden; deren Bezug muss geprüft werden.`);
        warnings.push('Genuswechsel erkannt: Bezüge im übrigen Dokument werden nicht pauschal geändert.');
      } else if(oldGender && !newGender && /^\p{Lu}/u.test(replacementText)) {
        warnings.push('Genus des Ersatzbegriffs unbekannt. Artikel und Pronomen manuell prüfen.');
      }
    }
    const sorted=changes.sort((a,b)=>a.start-b.start);
    if(sorted.some((c,i)=>i>0&&c.start<sorted[i-1].end))return null;
    let result='';let cursor=0;
    for(const c of sorted){result+=text.slice(cursor,c.start)+c.after;cursor=c.end;}
    result+=text.slice(cursor);
    const start=primary.start+sorted.filter(c=>c.start<primary.start).reduce((n,c)=>n+c.after.length-c.before.length,0);
    return {text:result,replacement:primary.after,changes:sorted,warnings,start,end:start+primary.after.length,requiresReview:sorted.length>1 || warnings.length>0};
  }
  return {nounGender, calculateArticle, planReplacement};
});
