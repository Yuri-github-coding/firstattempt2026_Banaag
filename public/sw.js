// Alumni Hub Service Worker
// Cache-First Strategy for offline functionality

const CACHE_NAME = 'alumni-hub-v1';
const urlsToCache = [
  '/',
  '/alumni/login',
  '/alumni/home',
  '/alumni/dashboard',
  '/offline.html'
];

// Install Event - Cache essential resources
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching app shell');
      return cache.addAll(urlsToCache).catch((error) => {
        console.warn('[Service Worker] Cache addAll error:', error);
        // Continue even if some URLs fail to cache
        return Promise.resolve();
      });
    })
  );
  
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// Activate Event - Clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  // Take control of all pages immediately
  self.clients.claim();
});

// Fetch Event - Cache-First Strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Skip WebSocket requests
  if (request.url.startsWith('ws:') || request.url.startsWith('wss:')) {
    return;
  }

  // Cache-First strategy for images and CSS
  if (
    request.destination === 'image' ||
    request.destination === 'style' ||
    request.destination === 'font'
  ) {
    event.respondWith(
      caches.match(request).then((response) => {
        if (response) {
          return response;
        }

        return fetch(request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200) {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });

            return response;
          })
          .catch(() => {
            // Return a placeholder or cached version on error
            if (request.destination === 'image') {
              return new Response(
                '<svg role="img" aria-label="Image placeholder" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect fill="#f0f0f0" width="100" height="100"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="sans-serif" font-size="12" fill="#999">No Image</text></svg>',
                {
                  headers: { 'Content-Type': 'image/svg+xml' }
                }
              );
            }
            
            return new Response('Offline - Resource not available', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain'
              })
            });
          });
      })
    );
  }

  // Network-First strategy for documents and API calls
  if (
    request.method === 'GET' &&
    (request.destination === 'document' ||
      request.destination === 'iframe' ||
      request.url.includes('/api/'))
  ) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Only cache successful responses
          if (!response || response.status !== 200) {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });

          return response;
        })
        .catch(() => {
          // Fall back to cache on network error
          return caches.match(request).then((response) => {
            if (response) {
              return response;
            }

            // Return offline page
            return caches.match('/offline.html').then((offlineResponse) => {
              if (offlineResponse) {
                return offlineResponse;
              }

              return new Response(
                'You are offline. Please check your internet connection.',
                {
                  status: 503,
                  statusText: 'Service Unavailable',
                  headers: new Headers({
                    'Content-Type': 'text/plain'
                  })
                }
              );
            });
          });
        })
    );
  }

  // Default: Use network first for other requests
  event.respondWith(
    fetch(request)
      .then((response) => {
        return response;
      })
      .catch(() => {
        return caches.match(request);
      })
  );
});

// Handle messages from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'GET_CACHE_SIZE') {
    caches.open(CACHE_NAME).then((cache) => {
      cache.keys().then((requests) => {
        event.ports[0].postMessage({
          type: 'CACHE_SIZE',
          size: requests.length
        });
      });
    });
  }
});

console.log('[Service Worker] Loaded successfully');
