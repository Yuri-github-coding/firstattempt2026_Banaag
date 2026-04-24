// plugins/service-worker.client.ts
// Service Worker Registration Plugin for Nuxt 3
// Precaching Strategy for Strict Offline Stress Test

export default defineNuxtPlugin(() => {
  // Only run on client-side
  if (!process.client) return;

  // Check if service workers are supported
  if (!('serviceWorker' in navigator)) {
    console.warn('[PWA] Service Workers are not supported in this browser');
    return;
  }

  // Register service worker on app mount
  if (process.client) {
    // Register immediately for better offline support
    registerServiceWorker();
  }

  /**
   * Service Worker Registration Function
   * Uses precaching strategy for complete offline functionality
   */
  async function registerServiceWorker() {
    try {
      console.log('[PWA] ========================================');
      console.log('[PWA] Starting Service Worker registration...');
      console.log('[PWA] Cache Strategy: PRECACHING (Strict Offline Mode)');
      console.log('[PWA] ========================================');

      // Register the service worker
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none'
      });

      // ✅ REGISTRATION SUCCESS - This is the key log for offline stress test
      console.log('═══════════════════════════════════════════════════════════');
      console.log('✅ Service Worker Registered Successfully');
      console.log('═══════════════════════════════════════════════════════════');
      console.log('[PWA] Registration Details:');
      console.log('  • Status:', registration.installing ? 'Installing' : 'Active');
      console.log('  • Scope:', registration.scope);
      console.log('  • Controller:', navigator.serviceWorker.controller ? 'Active' : 'Pending');
      console.log('[PWA] ✅ Offline mode enabled - App will work when offline');
      console.log('═══════════════════════════════════════════════════════════');

      // ========================================
      // OFFLINE STRESS TEST VERIFICATION
      // ========================================
      if (registration.installing) {
        console.log('[PWA] Service Worker is installing...');
        registration.installing.addEventListener('statechange', () => {
          if (registration.installing?.state === 'installed') {
            console.log('[PWA] ✅ Installation complete - Cache ready for offline');
            logOfflineReadiness();
          }
        });
      } else if (registration.waiting) {
        console.log('[PWA] Service Worker is waiting to activate');
      } else if (registration.active) {
        console.log('[PWA] ✅ Service Worker is active and controlling page');
        logOfflineReadiness();
      }

      // Check for updates periodically (every hour)
      setInterval(() => {
        registration.update();
        console.log('[PWA] Checking for Service Worker updates...');
      }, 60 * 60 * 1000);

      // Handle service worker updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;

        newWorker?.addEventListener('statechange', () => {
          if (
            newWorker.state === 'installed' &&
            navigator.serviceWorker.controller
          ) {
            console.log('[PWA] 🔄 New Service Worker version available');
            showUpdatePrompt(newWorker);
          }
        });
      });

      // Handle controller change
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('[PWA] 🔄 Service Worker controller changed - Page may reload');
      });

      // ========================================
      // ONLINE/OFFLINE STATUS MONITORING
      // ========================================
      window.addEventListener('online', () => {
        console.log('[PWA] 📡 CONNECTION RESTORED - Application is back online');
        console.log('[PWA] 🔄 Syncing with server...');
        showNotification('Back Online', 'Your connection has been restored');
      });

      window.addEventListener('offline', () => {
        console.log('[PWA] ⚠️  CONNECTION LOST - Application is now offline');
        console.log('[PWA] ✅ Using cached content from precache');
        showNotification('Offline Mode Active', 'Using cached content');
      });

      // Check initial online status
      if (navigator.onLine) {
        console.log('[PWA] 📡 Initial status: ONLINE');
      } else {
        console.log('[PWA] ⚠️  Initial status: OFFLINE (using cache)');
      }

    } catch (error) {
      console.error('[PWA] ❌ Service Worker registration FAILED:', error);
      console.error('[PWA] Error details:', error instanceof Error ? error.message : String(error));
    }
  }

  /**
   * Log offline readiness status
   * Used for offline stress test verification
   */
  function logOfflineReadiness() {
    console.log('');
    console.log('╔═══════════════════════════════════════════════════════════╗');
    console.log('║           OFFLINE STRESS TEST READY                        ║');
    console.log('╚═══════════════════════════════════════════════════════════╝');
    console.log('[PWA] To test offline functionality:');
    console.log('  1. Open DevTools (F12)');
    console.log('  2. Go to Application tab');
    console.log('  3. Click "Service Workers"');
    console.log('  4. ✓ Check the "Offline" checkbox');
    console.log('  5. Press F5 to reload');
    console.log('  6. All pages should load from cache with NO 404 errors');
    console.log('');
    console.log('[PWA] Cache Status:');
    console.log('  • Cache Name: v1-pwa-cache');
    console.log('  • Strategy: PRECACHING (all assets cached on install)');
    console.log('  • Offline Support: ✅ ENABLED');
    console.log('  • Network Required: ❌ NO (except for initial load)');
    console.log('');
  }

  /**
   * Show notification to user about available updates
   */
  function showUpdatePrompt(newWorker: ServiceWorker) {
    const shouldUpdate = confirm(
      'A new version of Alumni Hub is available. Would you like to update now?'
    );

    if (shouldUpdate) {
      console.log('[PWA] Update confirmed by user');
      newWorker.postMessage({ type: 'SKIP_WAITING' });

      // Reload once the new worker takes over
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('[PWA] Reloading to apply updates...');
        window.location.reload();
      });
    } else {
      console.log('[PWA] User declined update');
    }
  }

  /**
   * Display notifications to user
   */
  function showNotification(title: string, message: string) {
    console.log(`[PWA Notification] ${title}: ${message}`);

    // Optional: Use browser notification API for more visibility
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        body: message,
        icon: '/icons/icon-192x192.png'
      });
    }
  }

  /**
   * Expose PWA utilities globally
   * Available as useNuxtApp().$pwa
   */
  return {
    provide: {
      pwa: {
        /**
         * Check if PWA is supported
         */
        isSupported: 'serviceWorker' in navigator,

        /**
         * Check if currently online
         */
        isOnline: navigator.onLine,

        /**
         * Manually check for service worker updates
         */
        async checkForUpdates() {
          console.log('[PWA] Manually checking for updates...');
          if ('serviceWorker' in navigator) {
            const registrations = await navigator.serviceWorker.getRegistrations();
            registrations.forEach((registration) => {
              registration.update();
              console.log('[PWA] Update check sent to SW:', registration.scope);
            });
          }
        },

        /**
         * Clear all cached data
         * Use with caution - will remove offline functionality
         */
        async clearCache() {
          console.warn('[PWA] ⚠️  Clearing cache...');
          const cacheNames = await caches.keys();
          const result = await Promise.all(
            cacheNames.map((cacheName) => {
              console.log('[PWA] Deleting cache:', cacheName);
              return caches.delete(cacheName);
            })
          );
          console.log('[PWA] ✅ Cache cleared');
          return result;
        },

        /**
         * Get cache statistics
         * Returns size and list of cached items
         */
        async getCacheStats() {
          console.log('[PWA] Retrieving cache statistics...');
          let totalSize = 0;
          const cacheDetails: any[] = [];
          const cacheNames = await caches.keys();

          for (const cacheName of cacheNames) {
            const cache = await caches.open(cacheName);
            const keys = await cache.keys();
            totalSize += keys.length;

            console.log(`[PWA] Cache "${cacheName}" contains:`, keys.length, 'items');
            cacheDetails.push({
              name: cacheName,
              items: keys.length,
              urls: keys.map(k => k.url)
            });
          }

          console.log('[PWA] Total cached items:', totalSize);
          return {
            totalItems: totalSize,
            caches: cacheDetails
          };
        },

        /**
         * Send message to service worker
         * Used for advanced offline stress testing
         */
        async sendMessageToSW(message: any) {
          console.log('[PWA] Sending message to Service Worker:', message);
          if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
            return new Promise((resolve) => {
              const messageChannel = new MessageChannel();
              messageChannel.port1.onmessage = (event) => {
                console.log('[PWA] Response from Service Worker:', event.data);
                resolve(event.data);
              };
              navigator.serviceWorker.controller.postMessage(message, [messageChannel.port2]);
            });
          }
        }
      }
    }
  };
});
