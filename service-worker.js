/* Optional offline shell for local HTTP(S) / GitHub Pages. No third-party resources. */
const CACHE = 'loremwerk-v0.3.0';
const ASSETS = ['./', './index.html', './styles.css', './src/engine.js','./src/extra-terms.js','./src/context.js', './src/terms.js', './src/main.js', './icon.svg', './manifest.webmanifest'];
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith('loremwerk-') && key !== CACHE).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(event.request.mode === 'navigate' ? fetch(event.request).then((response) => { if (response.ok) { const clone = response.clone(); caches.open(CACHE).then((cache) => cache.put(event.request, clone)); } return response; }).catch(() => caches.match(event.request).then((cached) => cached || caches.match('./index.html'))) : caches.match(event.request).then((cached) => cached || fetch(event.request)));
});
