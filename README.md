# Alumni Hub - Banaag

## Overview
Alumni Hub is a comprehensive web application designed to manage and facilitate communication between alumni members. The platform provides secure authentication, profile management, document processing, and academic record verification for alumni users.

---

## Framework
**Nuxt.js 3.13.0** (Vue 3 Framework)

---

## Module
Nuxt.JS Framework

---

## Features
- **User Authentication**: Secure login and registration system
- **Alumni Dashboard**: Personalized dashboard with verified academic records
- **Profile Management**: Complete profile setup and management
- **Document Processing**: Request and process academic documents
- **Biometric Support**: Biometric verification capabilities
- **Settings & Support**: User settings and support portal
- **Responsive Design**: Mobile-first responsive UI with Tailwind CSS
- **Navigation**: Bottom navigation for easy mobile access

---

## Installation

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn package manager
- Git

### Step-by-Step Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Yuri-github-coding/firstattempt2026_Banaag.git
   cd alumni-hub-improved
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`

4. **Build for Production**
   ```bash
   npm run build
   ```

5. **Preview Production Build**
   ```bash
   npm run preview
   ```

### Project Structure
```
alumni-hub-improved/
├── pages/
│   ├── index.vue
│   └── alumni/
│       ├── index.vue
│       ├── home.vue
│       ├── login.vue
│       ├── register.vue
│       ├── dashboard.vue
│       ├── profile.vue
│       ├── settings.vue
│       ├── support.vue
│       ├── guide.vue
│       ├── biometric.vue
│       ├── process-documents.vue
│       ├── request-documents.vue
│       ├── forgot-password.vue
│       ├── profile/
│       │   └── index.vue
│       └── request/
│           ├── index.vue
│           └── status.vue
├── components/
│   ├── AppHeader.vue
│   ├── BottomNav.vue
│   └── StatusCard.vue
├── layouts/
│   └── default.vue
├── assets/
│   └── css/
│       └── main.css
├── app.vue
├── nuxt.config.ts
├── tailwind.config.js
└── package.json
```

---

## Technologies Used

### Core Framework
- **Nuxt.js 3.13.0** - Vue 3 full-stack framework
- **Vue 3** - Progressive JavaScript framework

### Styling & UI
- **Tailwind CSS 6.12.0** - Utility-first CSS framework
- **nuxt-icon 0.6.10** - Icon component library

### Development
- Module system for extensibility
- File-based routing
- Server-side rendering capabilities

---

## AI Tools Used
- **GitHub Copilot** - Code generation and development assistance
- **Claude** - Project structure planning and documentation

---

## Key Pages

| Page | Route | Purpose |
|------|-------|---------|
| Home | `/` | Landing page |
| Login | `/alumni/login` | User authentication |
| Register | `/alumni/register` | New account creation |
| Dashboard | `/alumni/dashboard` | Main user dashboard |
| Profile | `/alumni/profile` | User profile management |
| Settings | `/alumni/settings` | User preferences and settings |
| Support | `/alumni/support` | Customer support portal |
| Biometric | `/alumni/biometric` | Biometric verification |
| Document Processing | `/alumni/process-documents` | Process academic documents |
| Document Requests | `/alumni/request-documents` | Request documents |
| Guide | `/alumni/guide` | User guide and help |
| Request Status | `/alumni/request/status` | View request status |

---

## Development

### Available Scripts

```bash
# Start development server with hot module replacement
npm run dev

# Build application for production
npm run build

# Preview production build locally
npm run preview
```

### Configuration
The project is configured in `nuxt.config.ts` with:
- Custom CSS imports
- Tailwind CSS integration
- nuxt-icon module
- Compatibility date: 2026-04-24

---

## Progressive Web App (PWA) Configuration

Alumni Hub has been converted into a fully functional Progressive Web App with offline capabilities and installability.

### PWA Features Implemented

✅ **Service Worker** - Cache-First strategy for offline functionality
✅ **Web Manifest** - App manifest with university branding (Deep Blue #1e3a6e & Gold #c9a84c)
✅ **Offline Support** - Complete offline functionality with cached resources
✅ **Installable** - "Add to Home Screen" functionality on mobile and desktop
✅ **Responsive** - Mobile-first responsive design
✅ **Standalone Mode** - Runs without browser chrome

### PWA File Structure

```
alumni-hub-improved/
├── public/
│   ├── manifest.json           # PWA manifest file
│   ├── sw.js                   # Service Worker
│   ├── offline.html            # Offline fallback page
│   └── icons/                  # App icons (to be added)
│       ├── icon-72x72.png
│       ├── icon-96x96.png
│       ├── icon-128x128.png
│       ├── icon-144x144.png
│       ├── icon-152x152.png
│       ├── icon-192x192.png
│       ├── icon-384x384.png
│       └── icon-512x512.png
└── plugins/
    └── service-worker.client.ts # Service Worker registration plugin
```

### Setup Instructions

#### 1. **Create Application Icons** (Required)

You need to generate icons in the `public/icons/` folder with the following sizes:
- 72x72 px
- 96x96 px
- 128x128 px
- 144x144 px
- 152x152 px
- 192x192 px
- 384x384 px
- 512x512 px

**University Branding Colors:**
- Primary (Deep Blue): `#1e3a6e`
- Secondary (Gold): `#c9a84c`

**Steps to generate icons:**
1. Create a folder: `public/icons/`
2. Place your branded PNG icons with names like `icon-192x192.png`
3. For maskable icons (adaptive icons), create versions like `icon-192x192-maskable.png`

**Quick Icon Generation Tips:**
- Use services like [PWA Builder](https://www.pwabuilder.com/) to generate icons from a single source
- Use design tools like Figma, Adobe XD, or Photoshop to create branded icons
- Ensure transparency on the background for best results

#### 2. **Run Development Server**

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:3000`

#### 3. **Build for Production**

```bash
npm run build
npm run preview
```

### Testing PWA Functionality

#### Method 1: Test with DevTools (Chrome/Edge)

1. Open your app in Chrome or Edge
2. Press `F12` or `Ctrl+Shift+I` to open DevTools
3. Go to **Application** tab → **Manifest**
   - Verify the manifest is loaded and valid
4. Go to **Application** tab → **Service Workers**
   - You should see your service worker registered and active
   - **Look for console log**: ✅ Service Worker Registered Successfully
5. Go to **Application** tab → **Cache Storage**
   - You should see `v1-pwa-cache` with all precached assets

#### Method 2: Offline Stress Test ⚠️ CRITICAL

This is the main offline stress test to verify complete offline functionality:

1. In DevTools → **Application** tab → **Service Workers**
2. **CHECK the "Offline" checkbox** ✓
3. Reload the page (press `F5`)
4. **Verify NO 404 errors** in console
5. **Navigate between pages** - all should work from cache
6. **Check cache logs** in console - should show "Cache HIT"

**Expected Console Output During Offline Test:**
```
[Service Worker] Cache HIT (document): /alumni/home
[Service Worker] Cache HIT: /assets/css/main.css
[PWA] Application is now offline
[PWA] Using cached content from precache
```

**If you see 404 errors, the test FAILED - check troubleshooting below**

For detailed offline stress test instructions, see: [OFFLINE_STRESS_TEST.md](./OFFLINE_STRESS_TEST.md)

#### Method 3: Test Installation (Chrome/Edge Desktop)

1. Visit `http://localhost:3000` (must be localhost or HTTPS for production)
2. Look for the **"Install App"** icon in the address bar
3. Click the icon → Click "Install"
4. The app will install like a native application
5. Access it from your applications menu or desktop shortcut

#### Method 4: Test on Android

1. Build the project: `npm run build && npm run preview`
2. Deploy to a server with HTTPS (or use localhost on same network)
3. Open on Android device
4. Look for the **"Install App"** prompt
5. Click "Install" → Add to home screen
6. The app icon will appear on your home screen

### Precaching Strategy (Updated)

Alumni Hub now uses a **PRECACHING STRATEGY** for strict offline functionality:

**What is Precaching?**
- All critical assets are downloaded and cached during Service Worker installation
- App works 100% offline without requiring prior visits
- No assets are fetched from network during offline mode
- All pages, CSS, images are cached upfront

**Assets Precached:**
- All HTML pages (/, /alumni/home, /alumni/login, etc.)
- CSS files (/assets/css/main.css)
- Application manifest and metadata
- University branding icons (when added)
- Offline fallback page (/offline.html)

**Cache Configuration:**
```javascript
// In public/sw.js
const CACHE_NAME = 'v1-pwa-cache'

const assetsToCache = [
  '/',
  '/alumni/home',
  '/alumni/login',
  '/alumni/dashboard',
  // ... more pages
  '/assets/css/main.css',
  '/offline.html',
  '/manifest.json',
  '/icons/icon-*.png'
]
```

**Fetch Strategy:**
1. **Cache First**: Check cache before network
2. **If cached**: Serve from cache immediately
3. **If not cached**: Try network
4. **If offline**: Use offline.html fallback
5. **Result**: NO 404 errors offline ✅

### Browser Support for PWA

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Service Worker | ✅ | ✅ | ⚠️ | ✅ |
| Web Manifest | ✅ | ✅ | ⚠️ | ✅ |
| Installation | ✅ | ✅ | ⚠️ | ✅ |
| Offline Support | ✅ | ✅ | ⚠️ | ✅ |

*⚠️ Safari has limited PWA support. iOS 16.4+ has basic support.*

---

## Common Issues & Troubleshooting

### Issue 1: "Service Worker Registration Failed" Error

**Error Message:** `404 error for Service Worker registration`

**Cause:** The `sw.js` file is not found at the root public folder.

**Solution:**
1. Ensure `sw.js` exists in `public/sw.js`
2. Check the file path in `plugins/service-worker.client.ts` - should be `/sw.js`
3. Verify that Nuxt is serving static files from the `public` folder
4. Try clearing browser cache and reloading

**Code Fix:**
```typescript
// In plugins/service-worker.client.ts
await navigator.serviceWorker.register('/sw.js', {
  scope: '/',
  updateViaCache: 'none'
});
```

### Issue 2: Manifest File Not Loading

**Error Message:** Manifest warning in DevTools

**Cause:** `manifest.json` path is incorrect or file doesn't exist.

**Solution:**
1. Verify `public/manifest.json` exists
2. Check `nuxt.config.ts` has the correct link: `{ rel: 'manifest', href: '/manifest.json' }`
3. Ensure `public` folder is at the root level
4. Restart dev server after changes

### Issue 3: "Install App" Icon Not Appearing

**Causes & Solutions:**
1. **Not on localhost or HTTPS** - PWAs only install on secure contexts
   - Use `localhost:3000` or deploy with HTTPS
   
2. **Manifest invalid** - Check manifest validity
   - Go to DevTools → Application → Manifest
   - Look for validation errors

3. **Service Worker not active** - Check DevTools → Application → Service Workers
   - Should show "activated and running"
   - Manually stop and refresh: Check "Offline" and uncheck it, then reload

4. **Missing required fields** - Verify manifest has:
   - `name` or `short_name`
   - `start_url`
   - `display` (should be "standalone" or "fullscreen")
   - `icons` with at least 192x192 and 512x512

### Issue 4: Offline Mode Not Working

**Cause:** Service Worker not properly caching resources.

**Solution:**
1. Check Cache Storage in DevTools
2. Verify all required assets are cached
3. Check browser console for errors
4. Try different offline test:
   - Disable network in DevTools instead of using "Offline" checkbox
   - Open DevTools → Network → Check "Offline" dropdown

### Issue 5: Icons Not Showing

**Cause:** Icon files don't exist or are in wrong location.

**Solution:**
1. Create `public/icons/` folder
2. Add properly named PNG files (e.g., `icon-192x192.png`)
3. Ensure file extensions are lowercase
4. Use real images, not placeholders
5. Verify image dimensions match filename

### Issue 6: App Not Updating After Changes

**Cause:** Old service worker still cached.

**Solution:**
```javascript
// In DevTools → Application → Service Workers
// Click "Unregister"

// Or programmatically clear cache:
// In browser console:
caches.keys().then(names => {
  names.forEach(name => caches.delete(name))
})
```

---

## Hallucinations/Errors Encountered During Development

### Error 1: CRLF/LF Line Endings

**What Happened:** Git warnings about line endings during commit.

**Fix:** Already handled by `.gitignore` configuration.

```
# Added to .gitignore:
*.swp
*.swo
*~
.DS_Store
```

### Error 2: Node Modules Not in .gitignore

**What Happened:** Git tried to commit `node_modules` folder.

**Fix:** Ensured `.gitignore` includes:
```
node_modules/
npm-debug.log*
```

### Error 3: Service Worker File Path Issues

**What Happened:** Initially tried to place `sw.js` in wrong location.

**Solution:**
- ❌ Wrong: `/assets/sw.js` (won't be served as static file)
- ✅ Correct: `/public/sw.js` (served from root)

### Error 4: Manifest Link in Wrong Location

**What Happened:** Added manifest link to template instead of config.

**Solution:**
- ❌ Wrong: In individual page templates
- ✅ Correct: In `nuxt.config.ts` under `app.head.link`

---

## Development Notes - "Vibe Coding"

### Key Takeaway: Always Verify File Paths

When working with PWAs, the most common issue is incorrect file paths. Always check:
1. DevTools Network tab to see if files are loading (404 = missing)
2. DevTools Application tab for manifest and service worker status
3. Browser console for specific error messages
4. Nuxt dev server output for build warnings

### Best Practices Implemented

1. **Cache-First for Assets** - Images, CSS, fonts use cache-first
2. **Network-First for Data** - API calls and documents use network-first
3. **Fallback Pages** - Offline page for unsupported URLs
4. **Error Handling** - Try/catch blocks with meaningful logs
5. **Version Control** - Cache versioning for updates

### Icon Generation Workflow

The recommended workflow for icon generation:
```
1. Create high-res base image (512x512 or higher)
2. Export as PNG with transparent background
3. Use PWA Builder or ImageMagick to auto-generate sizes
4. Place in public/icons/ folder
5. Update manifest.json paths if needed
```

---

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design for all device sizes
- PWA support on Chrome, Edge, Firefox, and Samsung Internet

---

## Project Status
This is an improved version of the Alumni Hub application with PWA capabilities, enhanced features, and UI/UX improvements.

---

## License
This project is private and intended for institutional use only.

---

## Contact & Support
For issues, questions, or feature requests, please use the support portal within the application or contact the development team.

---

**Last Updated**: April 24, 2026
**Version**: 1.1 (PWA-Enabled)
**Repository**: https://github.com/Yuri-github-coding/firstattempt2026_Banaag.git
**PWA Status**: ✅ Complete - Ready for Testing
