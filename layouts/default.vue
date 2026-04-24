<template>
  <div class="app-layout">
    <!-- Sidebar (hidden on auth pages via isAuthPage) -->
    <SideNav v-if="!isAuthPage" :active="activeNav" />

    <!-- Page content -->
    <div :class="isAuthPage ? 'w-full' : 'main-content'">
      <slot />
    </div>
  </div>
</template>

<script setup>
const route = useRoute()

/* Pages that should NOT show the sidebar (full-screen auth pages) */
const authRoutes = [
  '/alumni/login',
  '/alumni/register',
  '/alumni/forgot-password',
  '/alumni/biometric',
  '/alumni',
  '/',
]
const isAuthPage = computed(() => authRoutes.includes(route.path))

/* Map routes → active sidebar key */
const navMap = {
  '/alumni/home':              'home',
  '/alumni/request-documents': 'requests',
  '/alumni/process-documents': 'process',
  '/alumni/dashboard':         'dashboard',
  '/alumni/guide':             'guide',
  '/alumni/support':           'support',
  '/alumni/profile':           'profile',
  '/alumni/settings':          'settings',
}
const activeNav = computed(() => navMap[route.path] || 'home')
</script>