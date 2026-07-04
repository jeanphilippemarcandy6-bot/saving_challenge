const CACHE = 'saving-v8500'; // Version mise à jour pour forcer le rafraîchissement
const FILES = ['/', '/index.html', '/manifest.json']; // Ajout du manifest pour un cache complet

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(FILES))
  );
});

// Nettoyage automatique des anciens caches (v2, etc.) pour libérer de l'espace
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
