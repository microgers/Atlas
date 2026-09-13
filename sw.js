/* Atlas service worker — offline-first, everything precached. */
const VERSION = 'atlas-v1.8.1';
const ASSETS = [
  './', './index.html', './manifest.json', './privacy.html', './support.html', './shared.css',
  './audio/voices.json', './audio/m10.mp3', './audio/m11.mp3', './audio/m12.mp3', './audio/m13.mp3', './audio/m14.mp3', './audio/m4.mp3', './audio/m5.mp3', './audio/m6.mp3', './audio/m7.mp3', './audio/m8.mp3', './audio/m9.mp3', 
  './icon-192.png', './icon-512.png', './icon-180.png',
  './maskable-192.png', './maskable-512.png', './icon-1024.png', './favicon-32.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then(hit => {
      if (hit) return hit;
      return fetch(req).then(res => {
        if (res && res.ok && res.type === 'basic') {
          const copy = res.clone();
          caches.open(VERSION).then(c => c.put(req, copy));
        }
        return res;
      }).catch(() => caches.match('./index.html', { ignoreSearch: true }));
    })
  );
});
