<template>
  <div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 card-hover flex items-start gap-3.5">
    <div :class="iconBg" class="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0">
      <Icon :name="iconName" size="22" :class="iconColor" />
    </div>
    <div class="flex-1 min-w-0">
      <div class="flex items-start justify-between gap-2">
        <p class="text-sm font-bold text-slate-800 leading-tight">{{ title }}</p>
        <span :class="badgeClass" class="flex-shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold">
          {{ statusLabel }}
        </span>
      </div>
      <p class="text-xs text-slate-400 mt-0.5 leading-relaxed">{{ description }}</p>
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
  available: {
    label: 'Available',
    badge: 'bg-royal-50 text-royal-800',
    icon: 'mdi:file-document-outline',
    iconBg: 'bg-royal-50',
    iconColor: 'text-royal-800'
  },
  pending: {
    label: 'Pending Upload',
    badge: 'bg-amber-50 text-amber-700',
    icon: 'mdi:clock-outline',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600'
  },
  processing: {
    label: 'Processing',
    badge: 'bg-blue-50 text-blue-700',
    icon: 'mdi:progress-clock',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600'
  },
  ready: {
    label: 'Ready',
    badge: 'bg-emerald-50 text-emerald-700',
    icon: 'mdi:check-circle-outline',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600'
  },
  rejected: {
    label: 'Rejected',
    badge: 'bg-red-50 text-red-700',
    icon: 'mdi:alert-circle-outline',
    iconBg: 'bg-red-50',
    iconColor: 'text-red-500'
  }
}

const current = computed(() => statusMap[props.status] || statusMap.available)
const statusLabel = computed(() => current.value.label)
const badgeClass = computed(() => current.value.badge)
const iconName = computed(() => current.value.icon)
const iconBg = computed(() => current.value.iconBg)
const iconColor = computed(() => current.value.iconColor)
</script>
