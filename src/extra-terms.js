/* LoremWerk additional curated entries. Suggestions are not universal equivalents. */
(function (root, factory) {
  const entries=factory();
  if(typeof module==='object' && module.exports) module.exports=entries;
  if(root) root.LWExtraTerms=entries;
})(typeof globalThis!=='undefined'?globalThis:this, function(){
  'use strict';
  const rows = String.raw`
de|Messwert|Messtechnik|Messgröße;ermittelter Wert|measured value;reading
de|Messung|Messtechnik|Messvorgang;Messwerterfassung|measurement
de|Messbereich|Messtechnik|Messspanne;Messintervall|measurement range
de|Messabweichung|Messtechnik|Messfehler;Abweichung vom Sollwert|measurement deviation
de|Kalibrierung|Messtechnik|Justierung (nicht gleichwertig);messtechnischer Abgleich|calibration
de|Toleranz|Qualität|zulässige Abweichung;Grenzabweichung|tolerance
de|Grenzwert|Sicherheit|Schwellenwert (nur falls definiert);zulässiger Höchstwert (nur für obere Grenze)|limit value;threshold
de|Nennwert|Spezifikation|vorgesehener Wert;Bemessungswert (kontextabhängig)|rated value;nominal value
de|Sollwert|Regelung|Referenzwert;Führungsgröße (regelungstechnisch)|setpoint;target value
de|Istwert|Regelung|aktueller Messwert;Rückführgröße (regelungstechnisch)|actual value;process value
de|Temperatur|Physik|Temperaturwert;thermischer Zustand|temperature
de|Druck|Physik|Druckwert;Pressung (anderer Fachkontext)|pressure
de|Drehzahl|Mechanik|Rotationsgeschwindigkeit;Umdrehungsfrequenz (nicht immer gleiche Einheit)|rotational speed;RPM
de|Geschwindigkeit|Physik|Tempo (allgemein);Bewegungsgeschwindigkeit|speed;velocity
de|Frequenz|Elektrotechnik|Schwingungsfrequenz;Wiederholrate (kontextabhängig)|frequency
de|Drehmoment|Mechanik|Moment;Torsionsmoment (Spezialfall)|torque
de|Kraft|Mechanik|Krafteinwirkung;Belastung (nicht direkt gleichwertig)|force
de|Energie|Elektrotechnik|Energiebedarf (Verbrauch);Energiemenge|energy
de|Widerstand|Elektrotechnik|elektrischer Widerstand;Impedanz (nur Wechselstrom-Kontext)|resistance
de|Stromkreis|Elektrotechnik|elektrischer Kreis;Schaltung (kontextabhängig)|circuit
de|Schaltung|Elektrotechnik|Stromkreis (nur elektrischer Kreis);Schaltanordnung|circuit;switching
de|Leitung|Elektrotechnik|elektrische Leitung;Kabel (nicht immer gleichbedeutend)|line;wire
de|Kabel|Elektrotechnik|Leitung (allgemeiner);Anschlusskabel (Spezialfall)|cable
de|Anschluss|Elektrotechnik|Verbindungspunkt;Kontaktierung (technischer Vorgang)|connection;terminal
de|Klemme|Elektrotechnik|Anschlussklemme;Klemmstelle|terminal;clamp
de|Stecker|Elektrotechnik|Steckverbinder;Anschlussstecker|plug;connector
de|Steckverbinder|Elektrotechnik|Stecker (Teilbegriff);Verbindungselement|connector
de|Schalter|Elektrotechnik|Schaltelement;Bedienelement (allgemeiner)|switch
de|Taster|Elektrotechnik|Drucktaster;Betätigungstaster|pushbutton
de|Relais|Elektrotechnik|Schaltrelais;elektromechanisches Schaltgerät (nur zutreffender Typ)|relay
de|Sicherung|Elektrotechnik|Schutzelement;Überstromschutzeinrichtung (Spezialfall)|fuse;protection
de|Netzteil|Elektronik|Stromversorgungseinheit;Versorgungsmodul|power supply
de|Batterie|Elektronik|Energiespeicher (allgemeiner);Primärzelle (nur nicht wiederaufladbar)|battery
de|Akku|Elektronik|Akkumulator;wiederaufladbare Batterie|rechargeable battery
de|Signal|Automation|Signalwert;Meldesignal (nur Meldungsfunktion)|signal
de|Eingang|Automation|Eingangssignal (elektronisch);Eingangskanal (elektronisch)|input
de|Ausgang|Automation|Ausgangssignal (elektronisch);Ausgangskanal (elektronisch)|output
de|Rückmeldung|Automation|Rückmeldesignal;Statusmeldung|feedback
de|Stellgröße|Regelung|Reglerausgang;Manipulationsgröße (Fachsprache)|manipulated variable
de|Regelkreis|Regelung|geschlossener Regelkreis;Regelschleife|control loop
de|Regler|Regelung|Regeleinheit;Regelalgorithmus (Softwareanteil)|controller;regulator
de|Schwellwert|Automation|Grenzwert (kontextabhängig);Schaltschwelle|threshold
de|Zustand|Diagnose|Status (IT);Betriebszustand (technisch)|state;condition
de|Status|Diagnose|Zustand;Betriebsstatus|status;state
de|Fehlercode|Diagnose|Diagnosecode;Störungscode|error code
de|Fehlerursache|Diagnose|Ursache der Störung;Auslöser (nicht immer Ursache)|root cause;fault cause
de|Ausfall|Diagnose|Funktionsausfall;Betriebsausfall|failure;outage
de|Stillstand|Diagnose|Betriebsunterbrechung;Produktionsstillstand (Spezialfall)|downtime;standstill
de|Schaden|Diagnose|Beschädigung;Defekt (technisch)|damage
de|Prüfung|Qualität|Überprüfung;Kontrolle (weniger formal)|inspection;test
de|Kontrolle|Qualität|Überprüfung;Inspektion (speziell vor Ort)|check;inspection
de|Inspektion|Instandhaltung|Sichtprüfung (nur Sicht);Zustandsprüfung (nur Zustand)|inspection
de|Reparatur|Instandhaltung|Instandsetzung;Behebung eines Defekts|repair
de|Instandsetzung|Instandhaltung|Reparatur;Wiederherstellung der Funktion|repair;restoration
de|Austausch|Instandhaltung|Ersetzung;Bauteilwechsel (Spezialfall)|replacement;exchange
de|Verschleiß|Instandhaltung|Abnutzung;Materialverschleiß|wear
de|Lebensdauer|Qualität|Nutzungsdauer;Betriebslebensdauer|service life;lifetime
de|Zuverlässigkeit|Qualität|Betriebssicherheit (anders definiert);Funktionszuverlässigkeit|reliability
de|Verfügbarkeit|Qualität|Einsatzbereitschaft (kontextabhängig);Systemverfügbarkeit|availability
de|Belastbarkeit|Mechanik|Tragfähigkeit (mechanischer Bezug);Beanspruchbarkeit|load capacity
de|Belastung|Mechanik|Beanspruchung (nicht identisch);Last|load;stress
de|Festigkeit|Mechanik|Materialfestigkeit;mechanische Widerstandsfähigkeit|strength
de|Dichtigkeit|Mechanik|Dichtheit;Leckagefreiheit (nur wenn vollständig)|tightness;leak tightness
de|Gehäuse|Mechanik|Umhausung;Schutzgehäuse (Spezialfall)|housing;enclosure
de|Halterung|Mechanik|Befestigung;Aufnahme (mechanisch)|mount;bracket
de|Befestigung|Mechanik|Fixierung;Montagepunkt (nur Ort)|fastening;mounting
de|Montage|Mechanik|Zusammenbau;Installation (anderer Vorgang)|assembly;mounting
de|Demontage|Mechanik|Zerlegung;Abbau|disassembly;dismantling
de|Schraube|Mechanik|Befestigungsschraube;Gewindeschraube|screw;bolt
de|Dichtung|Mechanik|Dichtelement;Abdichtung (Vorgang/Material)|seal;gasket
de|Ventil|Fluidtechnik|Stellventil (nur bei Stellfunktion);Absperrventil (Spezialfall)|valve
de|Pumpe|Fluidtechnik|Förderpumpe;Druckpumpe (je nach Typ)|pump
de|Motor|Antriebstechnik|Antriebsmotor;Elektromotor (nur elektrisch)|motor;engine
de|Antrieb|Antriebstechnik|Antriebseinheit;Antriebssystem|drive;actuator
de|Getriebe|Antriebstechnik|Übersetzungsgetriebe;Antriebsgetriebe|gearbox;transmission
de|Lager|Mechanik|Maschinenlager (mechanisch);Lagerstelle (Ort der Lagerung)|bearing;storage
de|Welle|Mechanik|Antriebswelle (Spezialfall);rotierende Welle (technisch)|shaft
de|Werkstoff|Materialtechnik|Material;Konstruktionswerkstoff|material
de|Material|Materialtechnik|Werkstoff (technisch);Rohmaterial|material
de|Oberfläche|Materialtechnik|Außenfläche;Materialoberfläche|surface
de|Beschichtung|Materialtechnik|Oberflächenbeschichtung;Überzug|coating
de|Korrosion|Materialtechnik|Materialangriff;Rostbildung (nur Eisenwerkstoff)|corrosion
de|Reibung|Mechanik|Reibkraft (physikalisch andere Größe);Kontaktreibung|friction
de|Durchfluss|Fluidtechnik|Volumenstrom (nur Volumen);Massenstrom (nur Masse)|flow rate
de|Volumenstrom|Fluidtechnik|volumetrischer Durchfluss;Fördervolumenstrom|volumetric flow rate
de|Druckverlust|Fluidtechnik|Druckabfall;Strömungsverlust (physikalisch anders)|pressure drop
de|Betriebsanleitung|Dokumentation|Bedienungsanleitung (nur Bedienung);Handbuch (allgemeiner)|operating instructions
de|Handbuch|Dokumentation|Dokumentation (allgemeiner);Benutzerhandbuch|manual;handbook
de|Anleitung|Dokumentation|Handlungsanweisung;Schritt-für-Schritt-Anweisung|instructions;guide
de|Beschreibung|Dokumentation|Erläuterung;Darstellung|description
de|Spezifikation|Dokumentation|Anforderungskatalog (nur Anforderungen);technische Vorgabe|specification
de|Vorgabe|Dokumentation|Anforderung;Richtlinie (allgemeiner)|requirement;directive
de|Kriterium|Qualität|Prüfkriterium (für Prüfung);Bewertungsmaßstab|criterion
de|Nachweis|Qualität|Beleg;Verifikationsnachweis|evidence;proof
de|Freigabe|Qualität|Genehmigung;Zulassung (regulatorisch)|approval;release
de|Abnahme|Qualität|Abnahmeprüfung (nur Prüfteil);formelle Bestätigung|acceptance
de|Prüfprotokoll|Qualität|Prüfbericht;Testprotokoll|test report;test record
de|Bericht|Dokumentation|Protokoll (anders);Dokumentation (allgemeiner)|report
de|Ergebnis|Dokumentation|Resultat;Auswertungsergebnis|result;outcome
de|Verfahren|Prozess|Methode;Vorgehensweise|procedure;method
de|Vorgang|Prozess|Ablauf;Prozessschritt|process;operation
de|Prozess|Prozess|Ablauf;Verfahren (kontextabhängig)|process
de|Ablauf|Prozess|Vorgang;Sequenz|sequence;workflow
de|Schritt|Prozess|Arbeitsschritt;Prozessschritt|step
de|Arbeitsschritt|Prozess|Vorgangsschritt;Teilaufgabe|process step
de|Test|Prüfung|Prüfversuch;Versuch (je nach Zweck)|test
de|Testfall|Prüfung|Prüfszenario;Testszenario|test case
de|Testlauf|Prüfung|Prüfdurchlauf;Testdurchgang|test run
de|Testdaten|IT|Prüfdaten;Versuchsdaten|test data
de|Software|IT|Programm (nur Einzelprogramm);Anwendungssoftware (Spezialfall)|software
de|Anwendung|IT|Applikation (Software);Programm (Software)|application
de|Programm|IT|Software (allgemeiner);Anwendung (funktional)|program
de|Dienst|IT|Service;Hintergrunddienst (Spezialfall)|service
de|Schnittstellenbeschreibung|IT|API-Dokumentation (wenn API);Interface-Spezifikation|interface documentation
de|Datenbank|IT|Datenspeicher (allgemeiner);Datenbanksystem|database
de|Datensatz|IT|Datenrecord;Dateneintrag|record;dataset
de|Protokoll|IT|Log (bei Ereignissen);Kommunikationsprotokoll (anderer Sinn)|log;protocol
de|Logdatei|IT|Protokolldatei;Ereignisprotokoll (wenn Ereignisse)|log file
de|Fehlersuche|IT|Fehlerdiagnose;Debugging (Software)|troubleshooting;debugging
de|Konfiguration|IT|Einstellung;Parametrierung|configuration
de|Parameter|IT|Einstellwert;Kenngröße|parameter
de|Variable|IT|veränderliche Größe;Programmvariable|variable
de|Funktion|IT|Operation (Software);Funktionalität (allgemeiner)|function
de|Datenübertragung|IT|Datentransfer;Übermittlung von Daten|data transfer
de|Verschlüsselung|IT|Kryptografische Absicherung;Chiffrierung|encryption
de|Authentifizierung|IT|Identitätsprüfung;Anmeldung (nur Teilprozess)|authentication
de|Autorisierung|IT|Berechtigungsprüfung;Zugriffsgenehmigung|authorization
de|Zugriff|IT|Datenzugriff;Abruf (je nach Handlung)|access
de|Sicherheitslücke|IT|Schwachstelle;Vulnerabilität|vulnerability
de|Ausführung|IT|Durchführung;Programmausführung (Software)|execution
de|Fehlerbehandlung|IT|Ausnahmebehandlung (Software);Störungsbehandlung|error handling
de|Absturz|IT|Programmabbruch;Systemabsturz|crash
de|Neustart|IT|Wiederanlauf;Reboot (Computer)|restart;reboot
de|Verzögerung|IT|Latenz (Kommunikation);Zeitverzug|delay;latency
de|Latenz|IT|Antwortverzögerung;Verarbeitungsverzögerung|latency
de|Durchsatz|IT|Datenrate (IT);Verarbeitungsrate|throughput
de|Bandbreite|IT|Übertragungskapazität;Frequenzbereich (Funktechnik)|bandwidth
de|Verbindungspunkt|IT|Schnittstelle;Anschlusspunkt|connection point
de|stabil|Qualität|robust (je nach Belastung);dauerhaft funktionsfähig|stable
de|robust|Qualität|widerstandsfähig;belastbar|robust
de|präzise|Qualität|genau;exakt|precise;accurate
de|exakt|Qualität|genau;präzise|exact
 de|eindeutig|Schreibstil|unmissverständlich;klar definiert|unambiguous
 de|verständlich|Schreibstil|nachvollziehbar;leicht verständlich|understandable
 de|einfach|Schreibstil|unkompliziert;leicht handhabbar|simple
 de|komplex|Schreibstil|vielschichtig;aufwendig|complex
 de|wesentlich|Schreibstil|maßgeblich;entscheidend|essential
 de|zusätzlich|Schreibstil|ergänzend;außerdem|additional
 de|vorhanden|Schreibstil|verfügbar;gegeben|existing
 de|notwendig|Schreibstil|erforderlich;unerlässlich|necessary
 de|möglich|Schreibstil|durchführbar;realisierbar|possible
 de|ungefähr|Schreibstil|etwa;näherungsweise|approximately
 de|grundsätzlich|Schreibstil|im Prinzip;im Allgemeinen|generally
 de|insbesondere|Schreibstil|vor allem;speziell|particularly
 de|nachfolgend|Schreibstil|im Folgenden;anschließend|following
 de|bezüglich|Schreibstil|hinsichtlich;in Bezug auf|regarding
 de|während|Schreibstil|im Verlauf von;solange (zeitlich)|during
 de|mittels|Schreibstil|mithilfe von;unter Verwendung von|by means of
 de|erzeugen|Prozess|generieren;herstellen|generate;produce
 de|bereitstellen|Prozess|zur Verfügung stellen;liefern (je nach Zusammenhang)|provide
 de|aktivieren|Prozess|einschalten;freischalten (IT)|enable;activate
 de|deaktivieren|Prozess|ausschalten;sperren (anderer Kontext)|disable;deactivate
 de|erfassen|Prozess|aufzeichnen;registrieren|record;capture
 de|speichern|IT|ablegen;sichern|save;store
 de|laden|IT|einlesen;abrufen (IT)|load
 de|übertragen|IT|übermitteln;senden (Kommunikation)|transfer;transmit
 de|verarbeiten|IT|bearbeiten;auswerten (Daten)|process
 de|analysieren|Analyse|untersuchen;auswerten|analyze
 de|bewerten|Analyse|beurteilen;einschätzen|evaluate
 de|bestätigen|Qualität|verifizieren (Nachweis);belegen|confirm
 de|nachweisen|Qualität|belegen;verifizieren|demonstrate;verify
 de|dokumentieren|Dokumentation|festhalten;protokollieren|document
 de|beschreiben|Dokumentation|darstellen;erläutern|describe
 de|festlegen|Spezifikation|definieren;bestimmen|specify
 de|definieren|Spezifikation|festlegen;präzisieren|define
 de|anpassen|Entwicklung|modifizieren;abstimmen|adjust;adapt
 de|ändern|Entwicklung|verändern;modifizieren|change
 de|reduzieren|Entwicklung|verringern;senken|reduce
 de|erhöhen|Entwicklung|steigern;anheben|increase
 de|verhindern|Sicherheit|unterbinden;vorbeugen (anders konstruiert)|prevent
 de|sicherstellen|Sicherheit|gewährleisten;dafür sorgen, dass (andere Grammatik)|ensure
 de|erkennen|Diagnose|identifizieren;feststellen|detect;identify
 de|beheben|Diagnose|beseitigen;reparieren (nur Defekte)|resolve;fix
 de|ersetzen|Instandhaltung|austauschen;auswechseln|replace
 de|austauschen|Instandhaltung|ersetzen;wechseln|replace
 de|lösen|Mechanik|lockern (Verbindung);entfernen (Befestigung)|loosen
 de|befestigen|Mechanik|fixieren;anbringen|fasten;mount
 de|verbinden|Mechanik|koppeln;zusammenfügen|connect;join
 de|trennen|Mechanik|lösen;entkoppeln|disconnect;separate
 de|starten|Betrieb|anlaufen lassen;in Gang setzen|start
 de|stoppen|Betrieb|anhalten;abschalten (System)|stop
 de|herunterfahren|Betrieb|abschalten;geordnet beenden|shut down
 de|auswählen|Schreibstil|selektieren;bestimmen|select
 de|verwenden|Schreibstil|nutzen;einsetzen|use
 de|einsetzen|Schreibstil|verwenden;anwenden|use
 de|gewährleisten|Schreibstil|sicherstellen;garantieren (rechtlich stärker)|ensure
 de|beeinflussen|Schreibstil|verändern;Auswirkung haben auf|influence
 de|beinhalten|Schreibstil|enthalten;umfassen|include
 de|umfassen|Schreibstil|beinhalten;einschließen|encompass
 de|anzeigen|IT|darstellen;einblenden|display
 de|melden|Diagnose|signalisieren;anzeigen (System)|report
 en|measurement|Metrology|reading;measurement process|Messung
 en|reading|Metrology|measured value;measurement result|Messwert
 en|deviation|Quality|difference;discrepancy|Abweichung
 en|calibration|Metrology|instrument calibration;measurement adjustment|Kalibrierung
 en|tolerance|Quality|permissible deviation;allowed variation|Toleranz
 en|threshold|Safety|limit (context-dependent);trigger level|Schwellenwert
 en|setpoint|Automation|target value;reference value|Sollwert
 en|actual value|Automation|measured value;process value|Istwert
 en|torque|Mechanics|turning moment;rotational force (informal)|Drehmoment
 en|rotation speed|Mechanics|rotational speed;RPM (unit dependent)|Drehzahl
 en|rotational speed|Mechanics|rotation rate;RPM (unit dependent)|Drehzahl
 en|pressure|Physics|pressure value;fluid pressure (specific)|Druck
 en|temperature|Physics|temperature reading;thermal state|Temperatur
 en|frequency|Electronics|signal frequency;oscillation rate|Frequenz
 en|resistance|Electrical|electrical resistance;ohmic resistance (specific)|Widerstand
 en|circuit|Electrical|electrical circuit;switching network (specific)|Stromkreis
 en|wiring|Electrical|electrical wiring;cabling (related)|Verdrahtung
 en|wire|Electrical|conductor;cable (different)|Leitung
 en|cable|Electrical|power cable (specific);signal cable (specific)|Kabel
 en|connector|Electrical|electrical connector;plug (one side)|Steckverbinder
 en|terminal|Electrical|connection terminal;terminal block (different)|Klemme
 en|switch|Electrical|switching element;selector switch (specific)|Schalter
 en|pushbutton|Electrical|push-button switch;momentary switch (specific)|Taster
 en|relay|Electrical|switching relay;electromechanical relay (specific)|Relais
 en|fuse|Electrical|overcurrent fuse;circuit protection (general)|Sicherung
 en|power supply|Electrical|supply unit;PSU (computing)|Netzteil
 en|battery|Electrical|battery pack;cell (component)|Batterie
 en|signal|Automation|input signal (specific);output signal (specific)|Signal
 en|input|Automation|input signal;input port|Eingang
 en|output|Automation|output signal;output port|Ausgang
 en|feedback|Automation|feedback signal;response (broader)|Rückmeldung
 en|control loop|Automation|closed-loop system;feedback loop|Regelkreis
 en|controller|Automation|control unit;regulator (context-dependent)|Regler
 en|state|Diagnostics|condition;status|Zustand
 en|status|Diagnostics|state;operational state|Status
 en|error code|Diagnostics|diagnostic code;fault code|Fehlercode
 en|root cause|Diagnostics|underlying cause;failure cause|Fehlerursache
 en|failure|Diagnostics|malfunction;breakdown (system)|Ausfall
 en|downtime|Diagnostics|outage;service interruption|Stillstand
 en|damage|Diagnostics|physical damage;deterioration|Schaden
 en|inspection|Quality|examination;visual check (limited)|Inspektion
 en|testing|Quality|verification (different);test procedure|Prüfung
 en|repair|Maintenance|fix;restoration of function|Reparatur
 en|replacement|Maintenance|substitution;component exchange|Austausch
 en|wear|Maintenance|abrasion;deterioration|Verschleiß
 en|service life|Maintenance|operating life;useful life|Lebensdauer
 en|reliability|Quality|dependability;operating reliability|Zuverlässigkeit
 en|availability|Quality|uptime (IT context);system availability|Verfügbarkeit
 en|load capacity|Mechanics|load-bearing capacity;rated load (specific)|Belastbarkeit
 en|strength|Mechanics|material strength;mechanical strength|Festigkeit
 en|seal|Mechanics|sealing element;gasket (specific)|Dichtung
 en|housing|Mechanics|enclosure;casing|Gehäuse
 en|mount|Mechanics|mounting bracket;support|Halterung
 en|fastening|Mechanics|fixing;attachment|Befestigung
 en|assembly process|Mechanics|assembling;mounting procedure|Montage
 en|disassembly|Mechanics|dismantling;taking apart|Demontage
 en|valve|Fluid|control valve (specific);shut-off valve (specific)|Ventil
 en|pump|Fluid|feed pump (specific);pressure pump (specific)|Pumpe
 en|motor|Mechanical engineering|drive motor;electric motor (specific)|Motor
 en|drive|Mechanical engineering|drive unit;drive system|Antrieb
 en|gearbox|Mechanical engineering|transmission;gear unit|Getriebe
 en|bearing|Mechanical engineering|machine bearing;support bearing (specific)|Lager
 en|shaft|Mechanical engineering|drive shaft (specific);rotating shaft|Welle
 en|material|Materials|engineering material;raw material (specific)|Werkstoff
 en|surface|Materials|outer surface;material surface|Oberfläche
 en|coating|Materials|surface coating;protective layer (specific)|Beschichtung
 en|corrosion|Materials|material corrosion;chemical attack|Korrosion
 en|friction|Mechanics|contact friction;frictional resistance|Reibung
 en|flow rate|Fluid|volumetric flow (specific);mass flow (specific)|Durchfluss
 en|pressure drop|Fluid|pressure loss;pressure reduction|Druckverlust
 en|operating instructions|Documentation|user instructions;operating manual|Betriebsanleitung
 en|manual|Documentation|handbook;user guide|Handbuch
 en|instructions|Documentation|directions;procedure guide|Anleitung
 en|description|Documentation|explanation;specification (more formal)|Beschreibung
 en|specification|Documentation|technical specification;requirements document (broader)|Spezifikation
 en|guideline|Documentation|recommendation;policy (stronger)|Richtlinie
 en|criterion|Quality|assessment criterion;acceptance criterion (specific)|Kriterium
 en|evidence|Quality|proof;supporting evidence|Nachweis
 en|approval|Quality|authorization;sign-off|Freigabe
 en|acceptance|Quality|formal acceptance;customer sign-off|Abnahme
 en|test report|Quality|inspection report;test record|Prüfbericht
 en|report|Documentation|document;assessment report (specific)|Bericht
 en|result|Documentation|outcome;finding (analysis)|Ergebnis
 en|procedure|Process|process;method|Verfahren
 en|process|Process|procedure;workflow|Prozess
 en|workflow|Process|sequence;process flow|Ablauf
 en|step|Process|stage;process step|Schritt
 en|test case|Quality|test scenario;verification case (different)|Testfall
 en|test run|Quality|test execution;testing pass|Testlauf
 en|test data|IT|test dataset;sample data (different)|Testdaten
 en|application|IT|software application;program|Anwendung
 en|program|IT|software application;executable (specific)|Programm
 en|service|IT|background service;system service|Dienst
 en|database|IT|data store (broader);database system|Datenbank
 en|record|IT|data record;entry|Datensatz
 en|log file|IT|event log;system log (specific)|Logdatei
 en|troubleshooting|IT|fault finding;debugging (software)|Fehlersuche
 en|configuration|IT|setup;parameterization|Konfiguration
 en|parameter|IT|setting;configuration parameter|Parameter
 en|variable|IT|program variable;changing quantity|Variable
 en|function|IT|operation;software function|Funktion
 en|data transfer|IT|data transmission;data exchange|Datenübertragung
 en|encryption|IT|cryptographic protection;data encryption|Verschlüsselung
 en|authentication|IT|identity verification;sign-in (step)|Authentifizierung
 en|authorization|IT|access permission;access control (related)|Autorisierung
 en|access|IT|data access;system access|Zugriff
 en|vulnerability|Security|security weakness;security flaw|Sicherheitslücke
 en|exception handling|IT|error handling (broader);fault handling (different)|Ausnahmebehandlung
 en|crash|IT|system failure;application crash|Absturz
 en|restart|IT|reboot (computer);start again|Neustart
 en|latency|IT|delay;response latency|Latenz
 en|throughput|IT|processing rate;data throughput|Durchsatz
 en|bandwidth|IT|transmission capacity;frequency band (radio)|Bandbreite
 en|stable|Quality|robust (in some contexts);consistent|stabil
 en|robust|Quality|resilient;durable|robust
 en|exact|Quality|precise;accurate (not always identical)|exakt
 en|clear|Writing style|unambiguous;easy to understand|klar
 en|understandable|Writing style|comprehensible;accessible|verständlich
 en|simple|Writing style|straightforward;uncomplicated|einfach
 en|complex|Writing style|intricate;complicated (often negative)|komplex
 en|essential|Writing style|necessary;fundamental|wesentlich
 en|additional|Writing style|extra;supplementary|zusätzlich
 en|existing|Writing style|present;available (if accessible)|vorhanden
 en|necessary|Writing style|required;essential|notwendig
 en|possible|Writing style|feasible;achievable|möglich
 en|approximately|Writing style|about;roughly|ungefähr
 en|especially|Writing style|particularly;specifically|insbesondere
 en|regarding|Writing style|concerning;with respect to|bezüglich
 en|using|Writing style|with;by means of|mittels
 en|generate|Process|produce;create|erzeugen
 en|provide|Process|supply;make available|bereitstellen
 en|activate|Process|enable;turn on (device)|aktivieren
 en|deactivate|Process|disable;turn off (device)|deaktivieren
 en|capture|Process|record;acquire (measurements)|erfassen
 en|save|IT|store;write to disk (specific)|speichern
 en|load|IT|read;retrieve (different operation)|laden
 en|transfer|IT|transmit;send (communication)|übertragen
 en|process|IT|handle;execute (operation)|verarbeiten
 en|analyze|Analysis|examine;evaluate|analysieren
 en|evaluate|Analysis|assess;review|bewerten
 en|confirm|Quality|verify (stronger);acknowledge (different)|bestätigen
 en|demonstrate|Quality|prove;show|nachweisen
 en|document|Documentation|record;write down|dokumentieren
 en|describe|Documentation|explain;outline|beschreiben
 en|specify|Specifications|define;state|festlegen
 en|define|Specifications|specify;establish|definieren
 en|adjust|Development|adapt;fine-tune|anpassen
 en|modify|Development|change;alter|ändern
 en|reduce|Development|decrease;lower|reduzieren
 en|increase|Development|raise;grow (intransitive)|erhöhen
 en|prevent|Safety|avoid;stop (context-dependent)|verhindern
 en|ensure|Safety|make sure;guarantee (stronger)|sicherstellen
 en|detect|Diagnostics|identify;discover|erkennen
 en|resolve|Diagnostics|remedy;fix (software/problem)|beheben
 en|replace|Maintenance|exchange;substitute|ersetzen
 en|connect|Mechanics|join;link|verbinden
 en|disconnect|Mechanics|separate;unplug (electrical)|trennen
 en|start|Operation|begin;initiate|starten
 en|stop|Operation|halt;shut down (different process)|stoppen
 en|shut down|Operation|power down;switch off (system)|herunterfahren
 en|select|Writing style|choose;pick (informal)|auswählen
 en|use|Writing style|employ;utilize (formal)|verwenden
 en|display|IT|show;render|anzeigen
 en|report|Diagnostics|indicate;signal|melden
`;
  const result=[];
  for (const row of rows.trim().split(/\n/)) {
    const cells=row.trim().split('|');
    if(cells.length!==5) continue;
    const [language,term,category,alt,translation]=cells;
    const alternatives=alt.split(';').map(x=>x.trim()).filter(Boolean).map(text=>{
      const i=text.indexOf(' (');
      return i>0?{text:text.slice(0,i),note:text.slice(i+2,-1)}:{text,note:'Kontextabhängig – Bedeutung und Grammatik prüfen'};
    });
    if(!alternatives.length)continue;
    result.push({language,term,category,explanation:'Fach- und Schreibstilvorschläge. Nur bei passender Bedeutung verwenden.',alternatives,translations:translation.split(';').map(s=>s.trim())});
  }
  return result;
});
