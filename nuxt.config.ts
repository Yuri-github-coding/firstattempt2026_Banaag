export default defineNuxtConfig({
  compatibilityDate: '2026-04-24',
  css: ['~/assets/css/main.css'],
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon'],
  
  // ==========================================
  // PWA & OFFLINE CONFIGURATION
  // ==========================================
  app: {
    head: {
      title: 'Alumni Hub - University App',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Alumni Hub - Secure alumni academic records verification platform' },
        { name: 'theme-color', content: '#1e3a6e' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'apple-mobile-web-app-title', content: 'Alumni Hub' },
      ],
      link: [
        { rel: 'manifest', href: '/manifest.json' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/icons/icon-192x192.png' },
        { rel: 'mask-icon', href: '/icons/icon-512x512.png', color: '#1e3a6e' },
      ],
    },
  },

  // ==========================================
  // NITRO CONFIGURATION FOR OFFLINE SUPPORT
  // ==========================================
  nitro: {
    // Precompile routes to ensure all chunks are accessible
    precompile: [],
    
    // Improve caching headers for Service Worker
    headers: {
      'Cache-Control': 'public, max-age=3600, must-revalidate'
    },
    
    // Output format for better Service Worker integration
    static: true,
    
    // Enable compression for smaller cache storage
    compressPublicAssets: {
      gzip: true,
      brotli: false
    }
  },

  // ==========================================
  // BUILD CONFIGURATION
  // ==========================================
  build: {
    // Ensure chunks are properly named and tracked
    rollupOptions: {
      // This helps identify chunks in Service Worker
      output: {
        manualChunks: undefined
      }
    }
  },

  // ==========================================
  // EXPERIMENTAL FEATURES (OPTIONAL)
  // ==========================================
  experimental: {
    // Helps with preloading in offline scenarios
    // Enable if you want better chunk preloading
    // payloadExtraction: true,
    
    // Track rendering for debugging
    renderJsonPayloads: false
  },

  // ==========================================
  // ROUTE RULES (CACHE HINTS)
  // ==========================================
  routeRules: {
    // Cache static assets
    '/_nuxt/**': { cache: { maxAge: 60 * 60 * 24 * 365 } }, // 1 year
    '/assets/**': { cache: { maxAge: 60 * 60 * 24 * 30 } }, // 30 days
    '/manifest.json': { cache: { maxAge: 60 * 60 * 24 } }, // 1 day
    '/offline.html': { cache: { maxAge: 60 * 60 } }, // 1 hour
    
    // Don't cache API routes (if you add them later)
    '/api/**': { cache: false }
  }
})