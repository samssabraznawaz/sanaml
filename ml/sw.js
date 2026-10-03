/* SaNaML service worker (generated at build time from src/sw-template.js). Works offline after the first visit. */
const CACHE = 'sanaml-6ff48dd51005';
const FILES = ["assets/check.worker-Blje9Lgl.js","assets/index-BS3WJkX7.js","assets/index-h2Cjitkf.css","assets/lightgbm-CoV27Mzo.wasm","assets/ml.worker-Ee2XCAi0.js","assets/xgboost-DIaTZYvc.wasm","favicon.svg","./","licenses/dmlc-core-LICENSE.txt","licenses/eigen-MPL-2.0.txt","licenses/fast_double_parser-LICENSE.BSL.txt","licenses/fast_double_parser-LICENSE.txt","licenses/fmt-LICENSE.txt","licenses/lightgbm-LICENSE.txt","licenses/xgboost-LICENSE.txt"];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES.map((f) => new URL(f, self.registration.scope)))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k.startsWith('sanaml-') && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  if (req.mode === 'navigate') {
    // Pages: the network first (to pick up new versions), the stored copy when offline.
    event.respondWith(fetch(req).catch(() => caches.match(req, { ignoreSearch: true }).then((r) => r || caches.match(new URL('./', self.registration.scope)))));
    return;
  }
  // Scripts, styles, the stored copy first (they are versioned), then the network.
  event.respondWith(caches.match(req, { ignoreSearch: true }).then((hit) => hit || fetch(req).then((res) => {
    if (res.ok && res.type === 'basic') { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
    return res;
  })));
});
