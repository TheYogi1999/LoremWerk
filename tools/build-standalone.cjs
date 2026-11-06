/* Produce one self-contained HTML file that works directly with file://. */
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const version = fs.readFileSync(path.join(root, 'VERSION'), 'utf8').trim();
let html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
const icon = fs.readFileSync(path.join(root, 'icon.svg'));
html = html.replace('<link rel="stylesheet" href="./styles.css">', `<style>\n${css}\n</style>`);
html = html.replace('<link rel="icon" href="./icon.svg" type="image/svg+xml">', `<link rel="icon" href="data:image/svg+xml;base64,${icon.toString('base64')}" type="image/svg+xml">`);
html = html.replace('  <link rel="manifest" href="./manifest.webmanifest">\n', '');
for (const filename of ['src/terms.js', 'src/engine.js', 'src/main.js']) {
  const javascript = fs.readFileSync(path.join(root, filename), 'utf8');
  const tag = `<script src="./${filename}" defer></script>`;
  if (!html.includes(tag)) throw new Error(`Script reference missing: ${filename}`);
  html = html.replace(tag, `<script>\n${javascript}\n</script>`);
}
const target = path.join(root, 'dist', `LoremWerk-v${version}.html`);
fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(target, html);
console.log(`Created ${target}`);
