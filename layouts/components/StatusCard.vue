<template>
  <div class="bg-white rounded-2xl p-4 shadow-sm flex items-start gap-4">
    <div :class="iconBg" class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
      <Icon :name="iconName" size="20" :class="iconColor" />
    </div>
    <div class="flex-1 min-w-0">
      <p class="text-sm font-bold text-gray-800 truncate">{{ title }}</p>
      <p class="text-xs text-gray-500 mt-0.5">{{ description }}</p>
      <span :class="badgeClass" class="inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-bold">
        {{ statusLabel }}
      </span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  description: String,
  status: { type: String, default: 'available' }
})

const statusMap = {
  available: { label: 'Available', badge: 'bg-blue-100 text-blue-700', icon: 'mdi:file-document-outline', iconBg: 'bg-blue-50', iconColor: 'text-blue-800' },
  pending: { label: 'Pending Upload', badge: 'bg-orange-100 text-orange-600', icon: 'mdi:clock-outline', iconBg: 'bg-orange-50', iconColor: 'text-orange-600' },
  processing: { label: 'Processing', badge: 'bg-blue-100 text-blue-600', icon: 'mdi:loading', iconBg: 'bg-blue-50', iconColor: 'text-blue-600' },
  ready: { label: 'Ready', badge: 'bg-green-100 text-green-700', icon: 'mdi:check-circle-outline', iconBg: 'bg-green-50', iconColor: 'text-green-600' },
  rejected: { label: 'Rejected', badge: 'bg-red-100 text-red-600', icon: 'mdi:alert-circle-outline', iconBg: 'bg-red-50', iconColor: 'text-red-500' }
}

const current = computed(() => statusMap[props.status] || statusMap.available)
const statusLabel = computed(() => current.value.label)
const badgeClass = computed(() => current.value.badge)
const iconName = computed(() => current.value.icon)
const iconBg = computed(() => current.value.iconBg)
const iconColor = computed(() => current.value.iconColor)
</script>
