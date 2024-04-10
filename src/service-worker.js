import { precacheAndRoute } from "workbox-precaching";
// eslint-disable-next-line no-restricted-globals
precacheAndRoute(self.__WB_MANIFEST);

const dynamicCacheName = "0.0.23";

// eslint-disable-next-line no-restricted-globals
self.addEventListener("install", (event) => {
  // eslint-disable-next-line no-restricted-globals
  event.waitUntil(self.skipWaiting());
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== dynamicCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
  // eslint-disable-next-line no-restricted-globals
  return self.clients.claim(); // Become available to all pages
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener("fetch", (event) => {
  // eslint-disable-next-line no-restricted-globals
  if (
    event.request.method !== "GET" ||
    // eslint-disable-next-line no-restricted-globals
    !event.request.url.startsWith(self.location.origin)
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then((fetchResponse) => {
        return caches.open(dynamicCacheName).then((cache) => {
          cache.put(event.request.url, fetchResponse.clone());
          return fetchResponse;
        });
      });
    })
  );
});
