/* Optional local HTTP server. No dependencies, telemetry or external requests. */
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const hostname = '127.0.0.1';
const port = Number(process.env.PORT || 4173);
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.svg':'image/svg+xml', '.webmanifest':'application/manifest+json', '.json':'application/json; charset=utf-8' };
const allow = new Set(['/', '/index.html', '/styles.css', '/src/main.js', '/src/terms.js', '/src/engine.js','/src/context.js','/src/extra-terms.js', '/icon.svg', '/manifest.webmanifest', '/service-worker.js']);
http.createServer((req, res) => {
  const target = new URL(req.url, `http://${hostname}:${port}`).pathname;
  if (!allow.has(target)) { res.writeHead(404); res.end('Not Found'); return; }
  const file = path.join(root, target === '/' ? 'index.html' : target.slice(1));
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not Found'); return; }
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff', 'Cache-Control': 'no-cache' });
    res.end(data);
  });
}).listen(port, hostname, () => console.log(`LoremWerk v0.3.0: http://${hostname}:${port}`));
