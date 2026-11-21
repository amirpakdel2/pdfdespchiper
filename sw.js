const CACHE_NAME = 'flight-study-pwa-0.5';
const CORE = ['./', './index.html', './manifest.webmanifest', './asset-list.json', './icons/icon-192.png', './icons/icon-512.png'];
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(CORE);
    try {
      const response = await fetch('./asset-list.json');
      if (response.ok) {
        const list = await response.json();
        const urls = list.map(name => './assets/' + name);
        for (let i = 0; i < urls.length; i += 15) {
          try { await cache.addAll(urls.slice(i, i + 15)); } catch (_) { /* retry individual items below */ }
        }
        for (const url of urls) {
          if (!(await cache.match(url))) { try { await cache.add(url); } catch (_) {} }
        }
      }
    } catch (_) { /* core app still installs */ }
  })());
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith('flight-study-pwa-') && k !== CACHE_NAME).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(req);
    if (cached) return cached;
    try {
      const res = await fetch(req);
      if (res.ok && new URL(req.url).origin === self.location.origin) cache.put(req, res.clone());
      return res;
    } catch (_) {
      return cache.match('./index.html');
    }
  })());
});
