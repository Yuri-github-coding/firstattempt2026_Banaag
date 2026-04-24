# Offline Stress Test Guide - Alumni Hub PWA

## 🎯 Goal
Verify that your Alumni Hub PWA passes a **strict offline stress test** where the entire site—including images—loads without ANY 404 errors when offline.

---

## ✅ Pre-Test Checklist

Before starting the offline stress test, ensure:

- [ ] Service Worker is registered (check console for "✅ Service Worker Registered")
- [ ] `v1-pwa-cache` appears in DevTools → Application → Cache Storage
- [ ] All pages have been visited at least once (to be precached)
- [ ] No errors in browser console
- [ ] Icons are added to `public/icons/` (or will be cached as missing)

---

## 🧪 Offline Stress Test Procedure

### Step 1: Open Your App
```
1. Visit http://localhost:3000 in Chrome or Edge
2. Open DevTools: Press F12 or Ctrl+Shift+I
```

### Step 2: Verify Service Worker Registration
```
1. Go to DevTools → Application tab
2. Click "Service Workers" on the left sidebar
3. Check the console at the bottom of DevTools
```

**Expected Console Output:**
```
═══════════════════════════════════════════════════════════
✅ Service Worker Registered Successfully
═══════════════════════════════════════════════════════════
[PWA] Registration Details:
  • Status: Active
  • Scope: /
  • Controller: Active
[PWA] ✅ Offline mode enabled - App will work when offline
═══════════════════════════════════════════════════════════

[PWA] To test offline functionality:
  1. Open DevTools (F12)
  2. Go to Application tab
  3. Click "Service Workers"
  4. ✓ Check the "Offline" checkbox
  5. Press F5 to reload
  6. All pages should load from cache with NO 404 errors
```

### Step 3: Pre-cache All Assets
Navigate to each page to ensure they're cached:
```
Visit these pages (to precache them):
1. http://localhost:3000 (home)
2. http://localhost:3000/alumni/home
3. http://localhost:3000/alumni/login
4. http://localhost:3000/alumni/dashboard
5. http://localhost:3000/alumni/profile
6. http://localhost:3000/alumni/settings
```

**In DevTools Console**, you should see logs like:
```
[Service Worker] Cache HIT: /alumni/home
[Service Worker] Caching document: /alumni/home
```

### Step 4: Check Cache Storage
```
1. In DevTools → Application tab
2. Expand "Cache Storage" on the left
3. Click on "v1-pwa-cache"
4. You should see all cached pages and assets
```

**Expected Cache Contents:**
```
v1-pwa-cache
├── / (root HTML)
├── /alumni/home
├── /alumni/login
├── /alumni/dashboard
├── /assets/css/main.css
├── /offline.html
├── /manifest.json
└── [Other pages you visited]
```

### Step 5: ACTIVATE OFFLINE MODE ⚠️

This is the critical test:

```
1. In DevTools → Application tab
2. Click "Service Workers" on left
3. Look for the checkbox labeled "Offline" ✓
4. CHECK the "Offline" checkbox
5. Press F5 to reload the page
```

**What should happen:**
- Page reloads without network errors
- All previously cached pages load correctly
- NO 404 errors in console
- App functions normally with cached content

### Step 6: Test Navigation While Offline

With offline mode ACTIVE:

```
1. Click different links/navigate to different pages
2. Check that:
   ✅ Pages load from cache
   ✅ Styling appears correctly
   ✅ No 404 errors in console
   ✅ Images display (or show placeholder SVG)
```

**In Console, you should see:**
```
[Service Worker] Cache HIT (document): /alumni/profile
[Service Worker] Cache HIT: /assets/css/main.css
[Service Worker] Cache HIT (image): /icons/icon-192x192.png
```

### Step 7: Go Back Online

```
1. In DevTools → Service Workers
2. UNCHECK the "Offline" checkbox
3. Network connection restored
4. Press F5 to reload
```

**Expected Result:**
```
[PWA] 📡 CONNECTION RESTORED - Application is back online
[PWA] 🔄 Syncing with server...
```

---

## 🔍 Console Logs - What to Look For

### ✅ GOOD - Service Worker Logs

```javascript
// REGISTRATION SUCCESS
✅ Service Worker Registered Successfully
[PWA] ✅ Offline mode enabled

// CACHE HITS (serving from cache)
[Service Worker] Cache HIT (document): /alumni/home
[Service Worker] Cache HIT: /assets/css/main.css

// ONLINE/OFFLINE TRANSITIONS
[PWA] 📡 CONNECTION RESTORED
[PWA] ⚠️  CONNECTION LOST - Using cached content

// CACHE OPERATIONS
[Service Worker] Caching document: /alumni/home
[Service Worker] Precaching 50 assets
```

### ❌ PROBLEMS - Error Logs to Watch For

```javascript
// SERVICE WORKER REGISTRATION FAILED
❌ Service Worker registration FAILED

// 404 ERRORS
404 Not Found: /path/to/asset
GET /missing-file.js 404

// CACHE NOT WORKING
[Service Worker] Cache MISS: (should be cached)

// OFFLINE ISSUES
Uncaught TypeError: fetch failed
XMLHttpRequest: Network error
```

---

## 🎮 Interactive Console Commands

While in DevTools Console, you can test PWA utilities:

### Check PWA Status
```javascript
// Check if online
navigator.onLine
// Output: true or false

// Get all service worker registrations
navigator.serviceWorker.getRegistrations().then(regs => {
  regs.forEach(reg => console.log(reg))
})

// Get cache size
caches.keys().then(names => {
  console.log('Caches:', names)
  names.forEach(name => {
    caches.open(name).then(cache => {
      cache.keys().then(requests => {
        console.log(name + ':', requests.length, 'items')
      })
    })
  })
})
```

### Manual Cache Operations
```javascript
// View all cached URLs
caches.open('v1-pwa-cache').then(cache => {
  cache.keys().then(requests => {
    requests.forEach(request => console.log(request.url))
  })
})

// Clear cache (destroys offline functionality)
caches.keys().then(names => {
  Promise.all(names.map(name => caches.delete(name)))
})

// Unregister service worker (forces re-install)
navigator.serviceWorker.getRegistrations().then(regs => {
  regs.forEach(reg => reg.unregister())
})
```

### Using $pwa Utilities (in app)
```javascript
// In any Vue component or browser console:

// Check cache statistics
const $pwa = useNuxtApp().$pwa
$pwa.getCacheStats().then(stats => console.log(stats))

// Manually check for updates
$pwa.checkForUpdates()

// Send message to Service Worker
$pwa.sendMessageToSW({ type: 'GET_CACHE_SIZE' })
```

---

## 📊 Precaching Configuration

### Current Assets to Cache (`assetsToCache` in sw.js):

```javascript
const assetsToCache = [
  // HTML Entry Points
  '/',
  '/index.html',
  '/alumni/home',
  '/alumni/login',
  // ... all pages

  // CSS
  '/assets/css/main.css',

  // Icons & Images
  '/icons/icon-*.png',

  // Fallback
  '/offline.html',

  // Manifest
  '/manifest.json'
];
```

### Caching Strategies:

1. **HTML/Documents** - Cache-First
   - Serve cached version immediately
   - Update cache if network available
   - Show offline.html if not cached

2. **CSS/Images/Fonts** - Cache-First
   - Serve from cache
   - Update cache on network success
   - Show SVG placeholder for images if offline

3. **API Calls** - Cache fallback
   - Try network first
   - Fall back to cache if offline
   - Handle gracefully if neither available

---

## ⚠️ Common Issues During Offline Test

### Issue 1: "Service Worker Registered" Not Appearing

**Problem:** Console doesn't show registration success

**Solution:**
```
1. Check if plugins/service-worker.client.ts exists
2. Verify service worker file: public/sw.js
3. Clear browser cache: DevTools → Application → Clear Storage
4. Hard reload: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
```

### Issue 2: Cache Storage Empty

**Problem:** `v1-pwa-cache` appears but contains no items

**Solution:**
1. Visit each page to trigger caching
2. Check console for cache logs
3. Manually visit: `http://localhost:3000/alumni/home`
4. Wait 2-3 seconds for cache to complete

### Issue 3: 404 Errors in Offline Mode

**Problem:** Getting 404 errors when offline

**Causes:**
- Asset not in `assetsToCache` array
- Page not visited before going offline (not precached)
- Icon file missing from `public/icons/`

**Solutions:**
```
1. Add missing asset to assetsToCache in sw.js
2. Pre-visit all pages before offline test
3. Check if icon files exist in public/icons/
4. For icons, they show SVG placeholder if missing
```

### Issue 4: Images Not Showing Offline

**Problem:** Images appear broken/missing when offline

**Solution:**
1. Ensure image paths are in `assetsToCache`
2. Create placeholder SVG (already built into SW)
3. Check cache in DevTools for image requests
4. All image requests should show SVG placeholder

### Issue 5: Offline Page Not Showing

**Problem:** Getting blank page or error instead of offline.html

**Solution:**
```javascript
// In DevTools Console, check if offline.html is cached:
caches.open('v1-pwa-cache').then(cache => {
  cache.match('/offline.html').then(response => {
    if (response) console.log('offline.html is cached')
    else console.log('offline.html NOT cached')
  })
})
```

---

## ✅ Success Criteria - Offline Stress Test Pass

Your PWA **PASSES** the offline stress test when:

- [x] Service Worker registers without errors
- [x] "✅ Service Worker Registered Successfully" appears in console
- [x] `v1-pwa-cache` appears in DevTools Cache Storage
- [x] Offline checkbox can be enabled without errors
- [x] Offline page reloads without network errors
- [x] All links navigate correctly while offline
- [x] No 404 errors in DevTools console
- [x] Images display (or show placeholder SVG)
- [x] Back online transition works smoothly
- [x] No "Uncaught (in promise)" errors

---

## 📱 Testing on Mobile

### Android Device

1. **Enable Developer Options**
   - Settings → About phone → Tap "Build number" 7 times
   - Settings → Developer options → Enable "USB debugging"

2. **Connect to Computer**
   ```
   adb devices
   ```

3. **Forward DevTools**
   ```
   adb forward tcp:9222 localservice:/webview_devtools_remote_0
   ```

4. **Open Chrome on Mobile**
   - Visit `http://192.168.x.x:3000` (your computer IP)

5. **Test Offline**
   - Enable airplane mode on device
   - Or use DevTools offline checkbox (if Chrome DevTools open)

### iOS Device

iOS PWA support is limited. You can still test:

1. Open app in Safari
2. Add to Home Screen: Share → Add to Home Screen
3. Open app
4. Enable airplane mode to test offline

---

## 🔧 Debugging Service Worker Issues

### View Service Worker Source

In DevTools:
```
Sources → Service Workers → [Your SW name]
```

### Live Debug

```javascript
// In console while offline checkbox is enabled:

// 1. Check if SW is active
navigator.serviceWorker.controller
// Output: ServiceWorker { ... } or null

// 2. Send test message
const messageChannel = new MessageChannel()
navigator.serviceWorker.controller.postMessage(
  { type: 'GET_CACHE_SIZE' },
  [messageChannel.port2]
)

// 3. Listen for response
messageChannel.port1.onmessage = (e) => console.log(e.data)
```

---

## 📚 Files Involved in Offline Test

```
alumni-hub-improved/
├── public/
│   ├── sw.js                    ← Service Worker (cache logic)
│   ├── manifest.json            ← PWA manifest
│   └── offline.html             ← Offline fallback page
├── plugins/
│   └── service-worker.client.ts ← Registration script
├── nuxt.config.ts               ← PWA config
└── package.json
```

---

## 🎓 Understanding the Precaching Strategy

```
PRECACHING STRATEGY FLOW:

1. USER VISITS APP
   ↓
2. SERVICE WORKER INSTALLS
   • Opens cache "v1-pwa-cache"
   • Downloads ALL assets from assetsToCache
   • Stores in IndexedDB
   ↓
3. APP GOES OFFLINE
   ↓
4. USER REQUESTS PAGE
   • Service Worker intercepts fetch
   • Checks cache first
   • Returns cached version
   • NO network request needed
   ↓
5. NO 404 ERRORS ✅
```

---

## 🚀 Production Deployment

When deploying to production:

1. **Enable HTTPS** (required for PWA)
2. **Verify manifest.json** loads correctly
3. **Test on real device** (Android/iOS)
4. **Check DevTools** on production site
5. **Monitor performance** (cache size, update frequency)

---

## 📞 Support

If the offline stress test fails, check:

1. **Browser Console** - Look for red errors
2. **DevTools Application Tab** - Verify SW and cache
3. **Service Worker source** - Check for syntax errors
4. **Cache Storage** - Verify assets are cached
5. **Network** - Ensure offline mode is actually enabled

---

**Test Date:** _______________
**Result:** ✅ PASSED / ❌ FAILED
**Notes:** ___________________________

---

**Version:** 1.0
**Updated:** April 24, 2026
**Status:** Ready for Offline Stress Testing
