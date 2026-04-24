# Service Worker Registration Reference

## Current Implementation (Nuxt Plugin)

The Alumni Hub uses Nuxt's plugin system for automatic Service Worker registration:

**File:** `plugins/service-worker.client.ts`

**Auto-registers on app startup** with console logs:
```
✅ Service Worker Registered Successfully
[PWA] Offline mode enabled - App will work when offline
```

---

## Standalone Script Version (Reference)

If you want to use a standalone `<script>` tag instead of the Nuxt plugin:

### Option 1: Inline Script in HTML

```html
<!-- In your index.html head or before closing </body> -->
<script>
  // Service Worker Registration Script
  
  // 1. Check if Service Workers are supported
  if ('serviceWorker' in navigator) {
    console.log('[PWA] Service Worker supported');
    
    // 2. Register the Service Worker
    navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none'
    })
    .then(registration => {
      // ✅ SUCCESS - Key log for offline stress test
      console.log('═══════════════════════════════════════════════════════════');
      console.log('✅ Service Worker Registered Successfully');
      console.log('═══════════════════════════════════════════════════════════');
      console.log('[PWA] Registration scope:', registration.scope);
      console.log('[PWA] ✅ Offline mode enabled - App will work when offline');
      
      // Check for updates hourly
      setInterval(() => {
        registration.update();
      }, 60 * 60 * 1000);
    })
    .catch(error => {
      // ❌ FAILURE
      console.error('❌ Service Worker registration failed:', error);
    });
    
    // 3. Monitor online/offline status
    window.addEventListener('online', () => {
      console.log('[PWA] 📡 Application is back online');
    });
    
    window.addEventListener('offline', () => {
      console.log('[PWA] ⚠️  Application is offline (using cache)');
    });
  } else {
    console.warn('[PWA] Service Workers not supported');
  }
</script>
```

### Option 2: External Script File

**Create file:** `public/register-sw.js`

```javascript
// register-sw.js - Service Worker Registration Script

(function() {
  'use strict';
  
  // Check support
  if (!('serviceWorker' in navigator)) {
    console.warn('[PWA] Service Workers not supported');
    return;
  }
  
  // Configuration
  const SW_PATH = '/sw.js';
  const SW_SCOPE = '/';
  const UPDATE_INTERVAL = 60 * 60 * 1000; // 1 hour
  
  // Register
  async function registerServiceWorker() {
    try {
      console.log('[PWA] Registering Service Worker...');
      
      const registration = await navigator.serviceWorker.register(SW_PATH, {
        scope: SW_SCOPE,
        updateViaCache: 'none'
      });
      
      // Success
      console.log('═══════════════════════════════════════════════════════════');
      console.log('✅ Service Worker Registered Successfully');
      console.log('═══════════════════════════════════════════════════════════');
      console.log('[PWA] Scope:', registration.scope);
      console.log('[PWA] Status:', registration.active ? 'Active' : 'Installing');
      console.log('[PWA] ✅ Offline mode enabled');
      
      // Update checker
      setInterval(() => {
        registration.update();
      }, UPDATE_INTERVAL);
      
    } catch (error) {
      console.error('❌ Registration failed:', error);
    }
  }
  
  // Monitor status
  function setupStatusMonitoring() {
    window.addEventListener('online', () => {
      console.log('[PWA] 📡 Online');
    });
    
    window.addEventListener('offline', () => {
      console.log('[PWA] ⚠️  Offline (using cache)');
    });
  }
  
  // Initialize
  registerServiceWorker();
  setupStatusMonitoring();
})();
```

**Then in HTML:**
```html
<script src="/register-sw.js"></script>
```

---

## Using Nuxt Plugin (Current Method) ✅

The Nuxt plugin method is recommended because it:

1. **Integrates with Nuxt lifecycle** - Registers when app is ready
2. **Provides typed utilities** - TypeScript support with `$pwa`
3. **Cleaner code** - No global script pollution
4. **Better maintenance** - Centralized registration logic

### Accessing PWA Utilities in Components

In any Vue component:

```vue
<script setup lang="ts">
// Get PWA utilities
const { $pwa } = useNuxtApp()

// Check if online
onMounted(() => {
  console.log('Online:', $pwa.isOnline)
  
  // Get cache statistics
  $pwa.getCacheStats().then(stats => {
    console.log('Cached items:', stats.totalItems)
  })
})

// Check for updates
const checkUpdates = () => {
  $pwa.$pwa.checkForUpdates()
}
</script>
```

---

## Manual Console Testing

While app is running, test in DevTools console:

```javascript
// 1. Check if Service Worker is registered
navigator.serviceWorker.getRegistrations()
// Should return: Array [ServiceWorkerRegistration]

// 2. Get active service worker
navigator.serviceWorker.controller
// Should return: ServiceWorkerContainer { ... } or active SW object

// 3. View all caches
caches.keys().then(keys => console.log(keys))
// Should return: Array ['v1-pwa-cache']

// 4. View cached items
caches.open('v1-pwa-cache').then(cache => {
  cache.keys().then(requests => {
    requests.forEach(req => console.log(req.url))
  })
})

// 5. Send message to Service Worker
const channel = new MessageChannel()
navigator.serviceWorker.controller.postMessage(
  { type: 'GET_CACHE_SIZE' },
  [channel.port2]
)
channel.port1.onmessage = (e) => console.log('SW response:', e.data)

// 6. Simulate offline
navigator.onLine = false // In some cases

// 7. Clear all caches (use cautiously!)
caches.keys().then(names => {
  Promise.all(names.map(name => caches.delete(name)))
})

// 8. Unregister all service workers
navigator.serviceWorker.getRegistrations().then(regs => {
  regs.forEach(reg => reg.unregister())
})
```

---

## Troubleshooting Registration

### Service Worker Not Registered

Check console for:
```
❌ Service Worker registration failed: TypeError: Invalid URL
```

**Solutions:**
1. Verify `public/sw.js` exists
2. Check file path is `/sw.js` (from root)
3. Ensure manifest.json is linked in head

### Service Worker File Returns 404

**Error:**
```
GET /sw.js 404 Not Found
```

**Fix:**
```
1. Make sure public/sw.js exists
2. Restart dev server: npm run dev
3. Check file is not in wrong directory
4. Verify path is relative to root: /sw.js (not /public/sw.js)
```

### Service Worker Stays in Installing State

**Error:**
```
Service Worker status: Installing (never becomes Active)
```

**Causes & Fixes:**
1. **Syntax errors in sw.js** - Check console
2. **Missing import statements** - Verify all imports exist
3. **Infinite loop** - Check install event doesn't hang
4. **Cache.addAll() failing** - Missing files in precache list

**Debug:**
```javascript
// In DevTools Console
navigator.serviceWorker.getRegistrations().then(regs => {
  regs[0].installing?.addEventListener('error', (e) => {
    console.error('SW Error:', e.error)
  })
})
```

---

## Console Log Reference

### ✅ Good Logs (Success)

```
✅ Service Worker Registered Successfully
[PWA] ✅ Offline mode enabled
[Service Worker] Cache HIT: /alumni/home
[Service Worker] Precaching 50 assets
[PWA] 📡 CONNECTION RESTORED
```

### ❌ Bad Logs (Errors)

```
❌ Service Worker registration FAILED
404 Not Found: /sw.js
[Service Worker] Cache MISS: [should be cached]
TypeError: fetch failed
Uncaught (in promise)
```

---

## Version Info

**Current Implementation:** Nuxt Plugin (plugins/service-worker.client.ts)
**Cache Name:** v1-pwa-cache
**Strategy:** Precaching (strict offline mode)
**Last Updated:** April 24, 2026

---

## Quick Links

- [Service Worker Docs](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Cache API Docs](https://developer.mozilla.org/en-US/docs/Web/API/Cache)
- [Offline Stress Test Guide](./OFFLINE_STRESS_TEST.md)
- [PWA Setup Guide](./PWA_SETUP_GUIDE.md)
