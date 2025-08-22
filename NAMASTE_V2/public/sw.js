const CACHE = 'iyck-v1';
const CORE = [
  '/',
  '/index.html',
  '/manifest.webmanifest'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(()=> self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k!==CACHE).map(k => caches.delete(k)))).then(()=> self.clients.claim())
  );
});
self.addEventListener('fetch', e => {
  const { request } = e;
  if(request.method !== 'GET') return;
  e.respondWith(
    caches.match(request).then(cached => {
      if(cached) return cached;
      return fetch(request).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(request, copy));
        return res;
      }).catch(()=> caches.match('/index.html'));
    })
  );
});
