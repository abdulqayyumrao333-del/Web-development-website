// Service worker for the Abdul Qayyum portfolio PWA.
// Strategy: network-first for navigations (so content stays fresh while
// online), cache-first for static assets (fonts/icons/images), with an
// offline fallback page when a navigation request fails entirely.

const CACHE_VERSION = "aq-portfolio-v2";
const OFFLINE_URL = "/offline";
const PRECACHE_URLS = [OFFLINE_URL, "/icons/aq-icon-dark.svg", "/icons/aq-icon-light.svg"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(PRECACHE_URLS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_VERSION).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  // Admin/login navigations are never cached or served from cache — a stale
  // cached admin dashboard would be actively misleading for content
  // management, and caching authenticated admin HTML is a privacy risk on
  // a shared/public device. These always go straight to the network.
  const url = new URL(request.url);
  const isPrivateRoute = url.pathname.startsWith("/admin") || url.pathname.startsWith("/login");

  // Navigations: network-first, fall back to cache, then offline page.
  if (request.mode === "navigate") {
    if (isPrivateRoute) {
      event.respondWith(fetch(request));
      return;
    }

    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match(OFFLINE_URL)))
    );
    return;
  }

  // Static assets: cache-first.
  if (["style", "script", "image", "font"].includes(request.destination)) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            const clone = response.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(request, clone));
            return response;
          })
      )
    );
  }
});

// Lets the client trigger skipWaiting from the UpdateNotification banner.
self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});
