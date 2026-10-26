const CACHE_NAME = 'ol-pwa-v3';

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', (e) => {
  // Laat iframe-requests direct doorgaan naar Google Apps Script
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});