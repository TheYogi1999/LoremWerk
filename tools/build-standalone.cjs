/* Build standalone offline HTML without runtime dependencies. */
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const version=fs.readFileSync(path.join(root,'VERSION'),'utf8').trim();
let html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const css=fs.readFileSync(path.join(root,'styles.css'),'utf8');
const icon=fs.readFileSync(path.join(root,'icon.svg'));
html=html.replace('<link rel="stylesheet" href="./styles.css">',`<style>\n${css}\n</style>`);
html=html.replace('<link rel="icon" href="./icon.svg" type="image/svg+xml">',`<link rel="icon" href="data:image/svg+xml;base64,${icon.toString('base64')}" type="image/svg+xml">`);
html=html.replace('  <link rel="manifest" href="./manifest.webmanifest">\n','');
for(const f of ['src/terms.js','src/engine.js','src/main.js']){
 const content=fs.readFileSync(path.join(root,f),'utf8');
 const tag=`<script src="./${f}" defer></script>`;
 if(!html.includes(tag))throw new Error('Missing '+f);
 html=html.replace(tag,`<script>
${content}
</script>`);
}
const dest=path.join(root,'dist',`LoremWerk-v${version}.html`);
fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,html);console.log('Created '+dest);
