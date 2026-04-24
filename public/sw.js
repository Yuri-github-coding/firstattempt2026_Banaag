// Alumni Hub Service Worker
// Precaching Strategy for Offline Stress Test - STRICT OFFLINE MODE

const CACHE_NAME = 'v1-pwa-cache';

/**
 * PRECACHING STRATEGY
 * All assets are defined upfront and cached during install event
 * This ensures complete offline functionality with zero 404 errors
 */
const assetsToCache = [
  // HTML Entry Points
  '/',
  '/index.html',
  '/alumni/home',
  '/alumni/login',
  '/alumni/register',
  '/alumni/dashboard',
  '/alumni/profile',
  '/alumni/settings',
  '/alumni/support',
  '/alumni/guide',
  '/alumni/biometric',
  '/alumni/process-documents',
  '/alumni/request-documents',
  '/alumni/forgot-password',
  '/alumni/profile/index',
  '/alumni/request/index',
  '/alumni/request/status',
  
  // CSS Files - Main Styles
  '/_nuxt/entry.js', // Nuxt entry point (dynamically generated)
  '/assets/css/main.css',
  
  // Fallback Pages
  '/offline.html',
  
  // University Branding Icons (add actual files when available)
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png',
  '/icons/icon-192x192-maskable.png',
  '/icons/icon-512x512-maskable.png',
  
  // Manifest and Metadata
  '/manifest.json',
  '/favicon.ico'
];

console.log('[Service Worker] Precache list initialized with', assetsToCache.length, 'assets');

/**
 * INSTALL EVENT - Precaching Strategy
 * Downloads and caches all critical assets immediately
 * Ensures app works completely offline
 */
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Install event started');
  console.log('[Service Worker] Precaching', assetsToCache.length, 'assets');
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Opened cache:', CACHE_NAME);
      
      // Precache all assets - fail gracefully for missing files
      return cache.addAll(assetsToCache)
        .then(() => {
          console.log('[Service Worker] ✓ All assets precached successfully');
        })
        .catch((error) => {
          console.warn('[Service Worker] ⚠ Precache error (continuing):', error.message);
          
          // Try caching assets individually to avoid total failure
          return Promise.all(
            assetsToCache.map(url => {
              return cache.add(url).catch((err) => {
                // Log but don't fail - some assets might not exist yet
                console.warn(`[Service Worker] Could not cache ${url}:`, err.message);
              });
            })
          );
        });
    })
  );
  
  // Force this service worker to activate immediately
  self.skipWaiting();
  console.log('[Service Worker] skipWaiting called');
});
/**
 * ACTIVATE EVENT - Clean up old caches
 * Removes outdated cache versions and claims clients
 * Ensures only current version is active
 */
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activate event started');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      console.log('[Service Worker] Found caches:', cacheNames);
      
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Delete any cache that is NOT the current version
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
          console.log('[Service Worker] Keeping current cache:', cacheName);
        })
      );
    })
  );
  
  // Immediately claim all clients - take control without waiting for page reload
  self.clients.claim();
  console.log('[Service Worker] Clients claimed - now controlling all pages');
});

/**
 * FETCH EVENT - STRICT OFFLINE CACHE-FIRST STRATEGY
 * Priority: Cache > Network > Offline Fallback
 * 
 * This ensures:
 * 1. Cached assets are served immediately (fast offline experience)
 * 2. Network failures don't break the app
 * 3. All images load from cache or fallback SVG placeholder
 * 4. No 404 errors in offline mode
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // ==========================================
  // POLICY 1: Skip certain request types
  // ==========================================
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    console.log('[Service Worker] Skipping non-GET request:', request.method, url.pathname);
    return;
  }

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    console.log('[Service Worker] Skipping cross-origin request:', url.origin);
    return;
  }

  // Skip WebSocket requests
  if (request.url.startsWith('ws:') || request.url.startsWith('wss:')) {
    console.log('[Service Worker] Skipping WebSocket request');
    return;
  }

  // ==========================================
  // POLICY 2: CACHE-FIRST for images, CSS, fonts
  // ==========================================
  if (
    request.destination === 'image' ||
    request.destination === 'style' ||
    request.destination === 'font'
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          console.log('[Service Worker] Cache HIT:', request.destination, url.pathname);
          return cachedResponse;
        }

        console.log('[Service Worker] Cache MISS, trying network:', request.destination, url.pathname);

        return fetch(request)
          .then((networkResponse) => {
            // Only cache successful responses
            if (!networkResponse || networkResponse.status !== 200) {
              console.log('[Service Worker] Non-200 response, not caching:', networkResponse.status);
              return networkResponse;
            }

            // Cache the successful response
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              console.log('[Service Worker] Caching asset:', url.pathname);
              cache.put(request, responseToCache);
            });

            return networkResponse;
          })
          .catch((error) => {
            console.warn('[Service Worker] Network failed, serving fallback:', url.pathname, error.message);
            
            // Network failed - serve SVG placeholder for images
            if (request.destination === 'image') {
              return new Response(
                '<svg role="img" aria-label="Image unavailable" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">' +
                '<rect fill="#e5e7eb" width="200" height="200"/>' +
                '<rect fill="#1e3a6e" x="10" y="10" width="180" height="180" rx="10"/>' +
                '<circle fill="#c9a84c" cx="100" cy="80" r="30"/>' +
                '<path fill="#c9a84c" d="M 60 150 Q 100 120 140 150 L 140 180 Q 100 190 60 180 Z"/>' +
                '</svg>',
                {
                  headers: { 
                    'Content-Type': 'image/svg+xml',
                    'Cache-Control': 'no-cache'
                  }
                }
              );
            }

            // For CSS/fonts, return error response
            return new Response('CSS/Font unavailable offline', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({ 'Content-Type': 'text/plain' })
            });
          });
      })
    );
    return;
  }

  // ==========================================
  // POLICY 3: CACHE-FIRST for documents (HTML pages)
  // This is the KEY for offline stress test
  // ==========================================
  if (
    request.method === 'GET' &&
    (request.destination === 'document' ||
      request.destination === 'iframe' ||
      request.destination === '' || // Default for navigation
      request.destination === 'script')
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        // Cache hit - return immediately
        if (cachedResponse) {
          console.log('[Service Worker] Cache HIT (document):', url.pathname);
          return cachedResponse;
        }

        console.log('[Service Worker] Cache MISS (document), trying network:', url.pathname);

        // Try network
        return fetch(request)
          .then((networkResponse) => {
            // Only cache successful responses
            if (!networkResponse || networkResponse.status !== 200) {
              console.log('[Service Worker] Non-200 response:', networkResponse.status);
              return networkResponse;
            }

            // Cache successful response
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              console.log('[Service Worker] Caching document:', url.pathname);
              cache.put(request, responseToCache);
            });

            return networkResponse;
          })
          .catch((error) => {
            console.warn('[Service Worker] Network failed, trying cached version:', url.pathname, error.message);

            // Network failed - try to serve ANY cached version of this request
            return caches.match(request).then((fallbackResponse) => {
              if (fallbackResponse) {
                console.log('[Service Worker] Fallback to cached version:', url.pathname);
                return fallbackResponse;
              }

              console.log('[Service Worker] No cache, serving offline.html:', url.pathname);

              // No cache available - serve offline page
              return caches.match('/offline.html').then((offlineResponse) => {
                if (offlineResponse) {
                  return offlineResponse;
                }

                // Offline page not available either
                return new Response(
                  'You are offline and this page has not been cached. Please check your internet connection.',
                  {
                    status: 503,
                    statusText: 'Service Unavailable',
                    headers: new Headers({ 'Content-Type': 'text/plain' })
                  }
                );
              });
            });
          });
      })
    );
    return;
  }

  // ==========================================
  // POLICY 4: Default strategy for other requests
  // ==========================================
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          console.log('[Service Worker] Cache HIT (default):', url.pathname);
          return cachedResponse;
        }

        console.log('[Service Worker] Cache MISS (default), trying network:', url.pathname);

        return fetch(request)
          .then((networkResponse) => {
            // Cache successful responses
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, networkResponse.clone());
              });
            }
            return networkResponse;
          })
          .catch((error) => {
            console.warn('[Service Worker] Network failed:', url.pathname, error.message);
            // Try cached version as fallback
            return caches.match(request).catch(() => {
              return new Response('Offline', { status: 503 });
            });
          });
      })
  );
});

/**
 * MESSAGE EVENT - Handle messages from clients
 * Allows pages to communicate with the service worker
 */
self.addEventListener('message', (event) => {
  console.log('[Service Worker] Message received:', event.data);

  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('[Service Worker] SKIP_WAITING signal received');
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'GET_CACHE_SIZE') {
    caches.open(CACHE_NAME).then((cache) => {
      cache.keys().then((requests) => {
        console.log('[Service Worker] Cache size:', requests.length, 'items');
        event.ports[0].postMessage({
          type: 'CACHE_SIZE',
          size: requests.length,
          items: requests.map(r => r.url)
        });
      });
    });
  }

  if (event.data && event.data.type === 'CLEAR_CACHE') {
    console.log('[Service Worker] Clearing cache...');
    caches.delete(CACHE_NAME).then(() => {
      console.log('[Service Worker] Cache cleared');
      event.ports[0].postMessage({ type: 'CACHE_CLEARED' });
    });
  }
});

/**
 * ERROR HANDLING
 * Log any uncaught errors
 */
self.addEventListener('error', (event) => {
  console.error('[Service Worker] Error:', event.message, event.error);
});

// ==========================================
// SERVICE WORKER INITIALIZATION
// ==========================================
console.log('[Service Worker] Service Worker Loaded Successfully');
console.log('[Service Worker] Cache Name:', CACHE_NAME);
console.log('[Service Worker] Assets to cache:', assetsToCache.length);
console.log('[Service Worker] Ready to handle offline requests');

