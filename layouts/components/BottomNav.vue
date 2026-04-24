<template>
  <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex justify-around z-30">
    <NuxtLink to="/alumni/home" class="flex flex-col items-center gap-1" :class="active === 'home' ? 'text-blue-800' : 'text-gray-400'">
      <Icon :name="active === 'home' ? 'mdi:home' : 'mdi:home-outline'" size="22" />
      <span class="text-xs" :class="active === 'home' ? 'font-medium' : ''">Home</span>
    </NuxtLink>
    <NuxtLink to="/alumni/request-documents" class="flex flex-col items-center gap-1" :class="active === 'requests' ? 'text-blue-800' : 'text-gray-400'">
      <Icon :name="active === 'requests' ? 'mdi:file-document' : 'mdi:file-document-outline'" size="22" />
      <span class="text-xs" :class="active === 'requests' ? 'font-medium' : ''">Requests</span>
    </NuxtLink>
    <NuxtLink to="/alumni/process-documents" class="flex flex-col items-center gap-1" :class="active === 'process' ? 'text-blue-800' : 'text-gray-400'">
      <Icon :name="active === 'process' ? 'mdi:download' : 'mdi:download-outline'" size="22" />
      <span class="text-xs" :class="active === 'process' ? 'font-medium' : ''">Process</span>
    </NuxtLink>
    <NuxtLink to="/alumni/profile" class="flex flex-col items-center gap-1" :class="active === 'profile' ? 'text-blue-800' : 'text-gray-400'">
      <Icon :name="active === 'profile' ? 'mdi:account' : 'mdi:account-outline'" size="22" />
      <span class="text-xs" :class="active === 'profile' ? 'font-medium' : ''">Profile</span>
    </NuxtLink>
  </div>
</template>

<script setup>
defineProps({
  active: {
    type: String,
    default: 'home' // 'home' | 'requests' | 'process' | 'profile'
  }
})
</script>
