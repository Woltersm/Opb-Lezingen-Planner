const CACHE_NAME = 'ol-pwa-v49';
const SHELL_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './handleiding/handleiding.html',
  './handleiding/snelstart.html'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(SHELL_ASSETS).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  // Laat iframe-requests direct doorgaan naar Google Apps Script
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
