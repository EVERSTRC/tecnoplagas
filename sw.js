/**
 * ARCHIVO: sw.js (Service Worker)
 * Propósito: Forzar al navegador a omitir el almacenamiento persistente 
 * para garantizar la lectura de las respuestas directas de Google Sheets.
 */

const NOMBRE_CACHE = 'tecnoplagas-pwa-v26';

self.addEventListener('install', (event) => {
  self.skipWaiting(); 
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((listaCaches) => {
      return Promise.all(
        listaCaches.map((cache) => {
          if (cache !== NOMBRE_CACHE) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Estrategia Network-Only: Bypass de caché para datos vivos de Google
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
