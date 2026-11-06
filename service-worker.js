/* Optional offline cache for localhost and GitHub Pages; all processing stays in the browser. */
const CACHE = 'loremwerk-v0.2.0';
const ASSETS = ['./','./index.html','./styles.css','./src/engine.js','./src/terms.js','./src/main.js','./icon.svg','./manifest.webmanifest'];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('loremwerk-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
  if(event.request.mode==='navigate'){
    event.respondWith(fetch(event.request).then(r=>{
      if(r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(event.request,copy));}
      return r;
    }).catch(()=>caches.match(event.request).then(hit=>hit||caches.match('./index.html'))));
  } else {
    event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request)));
  }
});
