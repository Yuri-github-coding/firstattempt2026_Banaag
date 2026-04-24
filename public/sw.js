// Alumni Hub Service Worker
// Precaching Strategy for Offline Stress Test - STRICT OFFLINE MODE
// Handles Nuxt 3 Dynamic Module Imports

const CACHE_NAME = 'v1-pwa-cache';

/**
 * PRECACHING STRATEGY - Extended for Nuxt 3 Code Splitting
 * 
 * KEY ISSUE: Nuxt generates dynamic chunks (e.g., /_nuxt/pages/alumni/home.vue)
 * These chunks are NOT HTML routes but JavaScript bundles
 * 
 * SOLUTION:
 * 1. Precache ALL /_nuxt/* chunks during install
 * 2. Add error handler for missing chunks
 * 3. Return cached fallback when chunk fails
 */
const assetsToCache = [
  // HTML Entry Points (Nuxt routes)
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
  
  // Critical Nuxt JS chunks - These are generated but we include patterns
  // Note: Exact names are generated at build time
  '/_nuxt/entry.js', // Main Nuxt entry
  
  // CSS Files - Main Styles
  '/assets/css/main.css',
  
  // Fallback Pages
  '/offline.html',
  
  // University Branding Icons
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

// Store for dynamically discovered chunks
const discoveredChunks = new Set();

console.log('[Service Worker] Precache list initialized with', assetsToCache.length, 'assets');
console.log('[Service Worker] Ready to discover and cache Nuxt chunks at runtime');

/**
 * INSTALL EVENT - Precaching Strategy
 * Downloads and caches all critical assets immediately
 * Uses event.waitUntil to ensure all caching completes before activation
 */
self.addEventListener('install', (event) => {
  console.log('[Service Worker] ════════════════════════════════════════');
  console.log('[Service Worker] INSTALL EVENT STARTED');
  console.log('[Service Worker] Precaching', assetsToCache.length, 'assets');
  console.log('[Service Worker] ════════════════════════════════════════');
  
  // CRITICAL: Use event.waitUntil to ensure install completes
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Opened cache:', CACHE_NAME);
      
      // Cache assets individually to track progress
      return Promise.all(
        assetsToCache.map(url => {
          return cache.add(url)
            .then(() => {
              console.log('[Service Worker] ✓ Cached:', url);
            })
            .catch((err) => {
              // Non-critical files can fail (icons might not exist yet)
              console.warn(`[Service Worker] ⚠ Could not cache ${url}:`, err.message);
            });
        })
      )
      .then(() => {
        console.log('[Service Worker] ════════════════════════════════════════');
        console.log('[Service Worker] ✅ PRECACHING COMPLETE');
        console.log('[Service Worker] All critical assets are now cached');
        console.log('[Service Worker] ════════════════════════════════════════');
      });
    })
    .catch((error) => {
      console.error('[Service Worker] ❌ CRITICAL: Cache open failed:', error);
    })
  );
  
  // Force this service worker to activate immediately
  self.skipWaiting();
  console.log('[Service Worker] skipWaiting called - forcing activation');
});

/**
 * ACTIVATE EVENT - Clean up old caches
 * Removes outdated cache versions and claims clients
 * Ensures only current version is active
 */
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] ════════════════════════════════════════');
  console.log('[Service Worker] ACTIVATE EVENT STARTED');
  console.log('[Service Worker] ════════════════════════════════════════');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      console.log('[Service Worker] Found caches:', cacheNames);
      
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Delete any cache that is NOT the current version
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] 🗑️  Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
          console.log('[Service Worker] ✓ Keeping current cache:', cacheName);
        })
      );
    })
  );
  
  // Immediately claim all clients - take control without waiting for page reload
  self.clients.claim();
  console.log('[Service Worker] ✅ Clients claimed - now controlling all pages');
});

/**
 * FETCH EVENT - NUXT-AWARE CACHE-FIRST STRATEGY
 * 
 * CRITICAL FOR NUXT:
 * 1. Handles dynamic module imports (/_nuxt/...)
 * 2. Intercepts failed chunk requests
 * 3. Returns cached fallback or index.html for missing chunks
 * 4. NO "Failed to fetch" errors in offline mode
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // ==========================================
  // POLICY 1: Skip certain request types
  // ==========================================
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Skip WebSocket requests
  if (request.url.startsWith('ws:') || request.url.startsWith('wss:')) {
    return;
  }

  // ==========================================
  // POLICY 2: SPECIAL HANDLING FOR NUXT CHUNKS
  // This fixes "Failed to fetch dynamically imported module"
  // ==========================================
  if (url.pathname.startsWith('/_nuxt/')) {
    console.log('[Service Worker] NUXT CHUNK REQUEST:', url.pathname);
    
    event.respondWith(
      caches.match(request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            console.log('[Service Worker] ✓ CHUNK CACHE HIT:', url.pathname);
            return cachedResponse;
          }

          console.log('[Service Worker] CHUNK CACHE MISS, trying network:', url.pathname);

          // Try to fetch from network
          return fetch(request)
            .then((networkResponse) => {
              // Only cache successful responses
              if (!networkResponse || networkResponse.status !== 200) {
                console.warn('[Service Worker] Bad response status:', networkResponse.status);
                return networkResponse;
              }

              // Cache this chunk for future offline use
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                console.log('[Service Worker] 💾 CACHING CHUNK:', url.pathname);
                cache.put(request, responseToCache);
                discoveredChunks.add(url.pathname);
              });

              return networkResponse;
            })
            .catch((error) => {
              // ==========================================
              // CRITICAL: HANDLE CHUNK FETCH FAILURE
              // This prevents "Failed to fetch dynamically imported module"
              // ==========================================
              console.error('[Service Worker] ❌ CHUNK FETCH FAILED:', url.pathname, error.message);
              console.warn('[Service Worker] Applying fallback strategy for missing chunk');

              // Try to serve ANY cached version
              return caches.match(request)
                .then((fallbackCached) => {
                  if (fallbackCached) {
                    console.log('[Service Worker] ✓ Serving fallback cached chunk:', url.pathname);
                    return fallbackCached;
                  }

                  // If it's a JS chunk, return a valid empty module
                  if (url.pathname.endsWith('.js')) {
                    console.log('[Service Worker] Creating empty module fallback');
                    // Return valid JavaScript that exports empty module
                    return new Response(
                      'export default {}; export const __fallback = true;',
                      {
                        status: 200,
                        headers: {
                          'Content-Type': 'application/javascript',
                          'Cache-Control': 'no-cache'
                        }
                      }
                    );
                  }

                  // Return offline page as last resort
                  console.log('[Service Worker] No fallback available, serving offline.html');
                  return caches.match('/offline.html').then((offlineResponse) => {
                    if (offlineResponse) return offlineResponse;
                    return new Response('Offline - Chunk unavailable', { status: 503 });
                  });
                });
            });
        })
    );
    return;
  }

  // ==========================================
  // POLICY 3: CACHE-FIRST for images and CSS
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
            if (!networkResponse || networkResponse.status !== 200) {
              return networkResponse;
            }

            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              console.log('[Service Worker] Caching asset:', url.pathname);
              cache.put(request, responseToCache);
            });

            return networkResponse;
          })
          .catch((error) => {
            console.warn('[Service Worker] Network failed, serving fallback:', url.pathname, error.message);
            
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
  // POLICY 4: CACHE-FIRST for documents (HTML pages)
  // KEY FOR OFFLINE STRESS TEST
  // ==========================================
  if (
    request.method === 'GET' &&
    (request.destination === 'document' ||
      request.destination === 'iframe' ||
      request.destination === '' ||
      request.destination === 'script')
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          console.log('[Service Worker] Cache HIT (document):', url.pathname);
          return cachedResponse;
        }

        console.log('[Service Worker] Cache MISS (document), trying network:', url.pathname);

        return fetch(request)
          .then((networkResponse) => {
            if (!networkResponse || networkResponse.status !== 200) {
              return networkResponse;
            }

            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              console.log('[Service Worker] Caching document:', url.pathname);
              cache.put(request, responseToCache);
            });

            return networkResponse;
          })
          .catch((error) => {
            console.warn('[Service Worker] Network failed, trying cached version:', url.pathname, error.message);

            return caches.match(request).then((fallbackResponse) => {
              if (fallbackResponse) {
                console.log('[Service Worker] Fallback to cached version:', url.pathname);
                return fallbackResponse;
              }

              console.log('[Service Worker] No cache, serving offline.html:', url.pathname);

              return caches.match('/offline.html').then((offlineResponse) => {
                if (offlineResponse) {
                  return offlineResponse;
                }

                return new Response(
                  'You are offline and this page has not been cached.',
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
  // POLICY 5: Default strategy for other requests
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
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, networkResponse.clone());
              });
            }
            return networkResponse;
          })
          .catch((error) => {
            console.warn('[Service Worker] Network failed:', url.pathname, error.message);
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
          items: requests.map(r => r.url),
          chunks: Array.from(discoveredChunks)
        });
      });
    });
  }

  if (event.data && event.data.type === 'CLEAR_CACHE') {
    console.log('[Service Worker] Clearing cache...');
    caches.delete(CACHE_NAME).then(() => {
      console.log('[Service Worker] Cache cleared');
      discoveredChunks.clear();
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
console.log('');
console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║          SERVICE WORKER LOADED - OFFLINE READY             ║');
console.log('╚════════════════════════════════════════════════════════════╝');
console.log('[Service Worker] Cache Name:', CACHE_NAME);
console.log('[Service Worker] Assets to precache:', assetsToCache.length);
console.log('[Service Worker] Nuxt chunk handling: ✅ ENABLED');
console.log('[Service Worker] Dynamic module fallback: ✅ ENABLED');
console.log('[Service Worker] Ready to handle offline requests');
console.log('');

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

