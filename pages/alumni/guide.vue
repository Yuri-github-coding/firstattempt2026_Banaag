<template>
  <div class="min-h-screen bg-slate-50 pb-24">
    <div class="royal-gradient relative overflow-hidden">
      <div class="h-0.5 gold-accent"></div>
      <div class="px-5 pt-4 pb-6 flex items-center gap-3">
        <NuxtLink to="/alumni/home" class="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition">
          <Icon name="mdi:arrow-left" size="20" />
        </NuxtLink>
        <div>
          <h1 class="text-base font-bold text-white">Document <span style="color: #c9a84c;">Guide</span></h1>
          <p class="text-xs text-blue-200">Find the right document for your needs</p>
        </div>
      </div>
    </div>

    <div class="px-5 py-5">
      <div class="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100">
        <div class="px-5 py-4 border-b border-slate-100" style="background: #1e3a6e;">
          <h2 class="text-sm font-bold text-white">What do you need this for?</h2>
          <p class="text-xs text-blue-200 mt-0.5">Select your purpose to see recommended documents</p>
        </div>
        <div class="p-4 space-y-2.5">
          <button
            v-for="purpose in purposes"
            :key="purpose.id"
            @click="activePurpose = activePurpose === purpose.id ? null : purpose.id"
            class="w-full rounded-2xl p-4 flex items-center gap-3.5 text-left border-2 transition-all"
            :class="activePurpose === purpose.id ? 'border-royal-800 bg-royal-50' : 'border-slate-100 bg-slate-50 hover:border-royal-200'"
          >
            <div :class="purpose.iconBg" class="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Icon :name="purpose.icon" size="22" :class="purpose.iconColor" />
            </div>
            <div class="flex-1">
              <p class="text-sm font-bold text-slate-800">{{ purpose.label }}</p>
              <p class="text-xs text-slate-400 mt-0.5">{{ purpose.description }}</p>
            </div>
            <Icon :name="activePurpose === purpose.id ? 'mdi:chevron-up' : 'mdi:chevron-right'" size="18" class="text-slate-300" />
          </button>
        </div>
      </div>

      <!-- Recommended docs -->
      <div v-if="activePurpose" class="mt-4">
        <h3 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Recommended for you</h3>
        <div class="space-y-2.5">
          <NuxtLink
            v-for="doc in recommendedDocs"
            :key="doc.id"
            to="/alumni/request-documents"
            class="card-hover flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm border border-slate-100"
          >
            <div class="flex items-center gap-3">
              <div :class="doc.iconBg" class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon :name="doc.icon" size="20" :class="doc.iconColor" />
              </div>
              <div>
                <p class="text-sm font-bold text-slate-800">{{ doc.name }}</p>
                <div class="flex items-center gap-2 mt-0.5">
                  <span class="text-xs font-semibold text-royal-800">₱{{ doc.fee }}</span>
                  <span class="text-slate-300 text-xs">•</span>
                  <span class="text-xs text-slate-400">{{ doc.days }}</span>
                </div>
              </div>
            </div>
            <Icon name="mdi:chevron-right" size="18" class="text-slate-300" />
          </NuxtLink>
        </div>
      </div>
    </div>

    <BottomNav active="requests" />
  </div>
</template>

<script setup>
const activePurpose = ref(null)

const purposes = [
  { id: 'work', label: 'Employment / Work', description: 'Job applications or employment verification', icon: 'mdi:briefcase-outline', iconBg: 'bg-royal-50', iconColor: 'text-royal-800' },
  { id: 'abroad', label: 'Working / Studying Abroad', description: 'International opportunities requiring authentication', icon: 'mdi:earth', iconBg: 'bg-blue-50', iconColor: 'text-blue-600' },
  { id: 'board', label: 'Board Exam / Licensure', description: 'Professional board examination requirements', icon: 'mdi:medal-outline', iconBg: 'bg-amber-50', iconColor: 'text-amber-600' },
  { id: 'graduate', label: 'Graduate School', description: "Application to master's or doctoral programs", icon: 'mdi:school-outline', iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600' },
  { id: 'other', label: 'Other Purpose', description: 'Browse all available documents', icon: 'mdi:dots-horizontal', iconBg: 'bg-slate-100', iconColor: 'text-slate-600' },
]

const allDocs = [
  { id: 1, name: 'Transcript of Records', fee: 150, days: '5-7 days', icon: 'mdi:file-document-outline', iconBg: 'bg-royal-50', iconColor: 'text-royal-800', purposes: ['work','abroad','graduate','board','other'] },
  { id: 2, name: 'Certified True Copy of Diploma', fee: 200, days: '3-5 days', icon: 'mdi:certificate-outline', iconBg: 'bg-amber-50', iconColor: 'text-amber-600', purposes: ['work','abroad','other'] },
  { id: 3, name: 'Certificate of Graduation', fee: 100, days: '2-3 days', icon: 'mdi:school-outline', iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', purposes: ['work','abroad','graduate','other'] },
  { id: 5, name: 'Certificate of GWA', fee: 80, days: '2-3 days', icon: 'mdi:calculator-outline', iconBg: 'bg-violet-50', iconColor: 'text-violet-600', purposes: ['board','graduate'] },
  { id: 7, name: 'Document Authentication', fee: 250, days: '7-10 days', icon: 'mdi:shield-check-outline', iconBg: 'bg-teal-50', iconColor: 'text-teal-600', purposes: ['abroad'] },
]

const recommendedDocs = computed(() =>
  allDocs.filter(d => d.purposes.includes(activePurpose.value))
)
</script>
