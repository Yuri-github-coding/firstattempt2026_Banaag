<template>
  <nav class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white border-t border-slate-100 z-30 shadow-[0_-4px_20px_rgba(30,58,110,0.08)]">
    <div class="flex justify-around px-2 py-2">
      <NuxtLink
        v-for="item in navItems"
        :key="item.id"
        :to="item.to"
        class="flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-all duration-200"
        :class="active === item.id
          ? 'text-royal-800'
          : 'text-slate-400 hover:text-slate-600'"
      >
        <div
          class="relative w-8 h-8 flex items-center justify-center rounded-xl transition-all duration-200"
          :class="active === item.id ? 'bg-royal-50' : ''"
        >
          <Icon :name="active === item.id ? item.activeIcon : item.icon" size="20" />
          <!-- Active dot -->
          <span v-if="active === item.id" class="absolute -top-0.5 -right-0.5 w-2 h-2 bg-gold-500 rounded-full border border-white"></span>
        </div>
        <span class="text-[10px] font-semibold tracking-wide" :class="active === item.id ? 'text-royal-800' : 'text-slate-400'">
          {{ item.label }}
        </span>
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup>
defineProps({
  active: { type: String, default: 'home' }
})

const navItems = [
  { id: 'home', to: '/alumni/home', label: 'Home', icon: 'mdi:home-outline', activeIcon: 'mdi:home' },
  { id: 'requests', to: '/alumni/request-documents', label: 'Requests', icon: 'mdi:file-document-outline', activeIcon: 'mdi:file-document' },
  { id: 'process', to: '/alumni/process-documents', label: 'Process', icon: 'mdi:download-circle-outline', activeIcon: 'mdi:download-circle' },
  { id: 'profile', to: '/alumni/profile', label: 'Profile', icon: 'mdi:account-circle-outline', activeIcon: 'mdi:account-circle' },
]
</script>
