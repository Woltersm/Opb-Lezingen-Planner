const CACHE_NAME = 'ol-pwa-v5';

self.addEventListener('install', (e) => {
  self.skipWaiting();
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
