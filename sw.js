// Service Worker de Red Directa (Evita bloqueos de caché persistentes)
const CACHE_NAME = 'tecnoplagas-v26';

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
});

self.addEventListener('fetch', (e) => {
  // Estrategia: Ir directamente a internet siempre para evitar congelamiento de datos
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
