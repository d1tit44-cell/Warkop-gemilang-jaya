// Service worker sederhana agar aplikasi bisa diinstal.
const CACHE = 'kasir-warkop-v2';
const FILES = ['./', './index.html', './manifest.json', './icon.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return; // aplikasi Google tidak disimpan, selalu ambil terbaru
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
