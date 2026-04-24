// plugins/service-worker.client.ts
// Service Worker Registration Plugin for Nuxt 3

export default defineNuxtPlugin(() => {
  // Only run on client-side
  if (!process.client) return;

  // Check if service workers are supported
  if (!('serviceWorker' in navigator)) {
    console.warn('Service Workers are not supported in this browser');
    return;
  }

  // Register service worker on app mount
  if (process.client) {
    // Use setTimeout to ensure the app is fully loaded
    setTimeout(() => {
      registerServiceWorker();
    }, 1000);
  }

  // Service Worker Registration Function
  async function registerServiceWorker() {
    try {
      console.log('[PWA] Starting Service Worker registration...');

      // Register the service worker
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none'
      });

      console.log('[PWA] Service Worker registered successfully:', registration);

      // Check for updates periodically (every hour)
      setInterval(() => {
        registration.update();
      }, 60 * 60 * 1000);

      // Handle service worker updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;

        newWorker?.addEventListener('statechange', () => {
          if (
            newWorker.state === 'installed' &&
            navigator.serviceWorker.controller
          ) {
            console.log('[PWA] New Service Worker available');
            
            // Notify user about update
            showUpdatePrompt(newWorker);
          }
        });
      });

      // Handle controller change
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('[PWA] Service Worker controller changed');
        // Optionally reload the page
        // window.location.reload();
      });

      // Log online/offline status
      window.addEventListener('online', () => {
        console.log('[PWA] Application is back online');
        showNotification('Back Online', 'Your connection has been restored');
      });

      window.addEventListener('offline', () => {
        console.log('[PWA] Application is offline');
        showNotification('Offline Mode', 'You are now working offline');
      });

    } catch (error) {
      console.error('[PWA] Service Worker registration failed:', error);
    }
  }

  // Show notification to user about available updates
  function showUpdatePrompt(newWorker: ServiceWorker) {
    const shouldUpdate = confirm(
      'A new version of Alumni Hub is available. Would you like to update now?'
    );

    if (shouldUpdate) {
      newWorker.postMessage({ type: 'SKIP_WAITING' });
      
      // Reload once the new worker takes over
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      });
    }
  }

  // Display notifications
  function showNotification(title: string, message: string) {
    // You can integrate this with your notification system
    console.log(`[PWA Notification] ${title}: ${message}`);
    
    // Optional: Show toast notification
    // Your toast notification logic here
  }

  // Expose PWA utilities globally
  return {
    provide: {
      pwa: {
        isSupported: 'serviceWorker' in navigator,
        isOnline: navigator.onLine,
        
        async checkForUpdates() {
          if ('serviceWorker' in navigator) {
            const registrations = await navigator.serviceWorker.getRegistrations();
            registrations.forEach((registration) => {
              registration.update();
            });
          }
        },

        async clearCache() {
          const cacheNames = await caches.keys();
          return Promise.all(
            cacheNames.map((cacheName) => caches.delete(cacheName))
          );
        },

        async getCacheSize() {
          let totalSize = 0;
          const cacheNames = await caches.keys();
          
          for (const cacheName of cacheNames) {
            const cache = await caches.open(cacheName);
            const keys = await cache.keys();
            totalSize += keys.length;
          }
          
          return totalSize;
        }
      }
    }
  };
});
