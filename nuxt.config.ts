export default defineNuxtConfig({
  compatibilityDate: '2026-04-24',
  css: ['~/assets/css/main.css'],
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon'],
  
  // PWA Configuration
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
})