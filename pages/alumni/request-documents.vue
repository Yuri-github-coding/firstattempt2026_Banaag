<template>
  <div class="min-h-screen bg-slate-50 pb-24">
    <!-- Header -->
    <div class="royal-gradient relative overflow-hidden">
      <div class="h-0.5 gold-accent"></div>
      <div class="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/5"></div>
      <div class="px-5 pt-4 pb-4 relative z-10 flex items-center gap-3">
        <NuxtLink to="/alumni/home" class="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition">
          <Icon name="mdi:arrow-left" size="20" />
        </NuxtLink>
        <h1 class="text-base font-bold text-white">
          Request <span style="color: #c9a84c;">Documents</span>
        </h1>
      </div>
      <!-- Tabs -->
      <div class="px-5 pb-4 flex gap-0">
        <button
          @click="activeTab = 'new'"
          class="flex-1 py-2.5 text-sm font-bold transition-all border-b-2"
          :class="activeTab === 'new' ? 'text-white border-gold-500' : 'text-blue-300 border-transparent'"
          style="--gold: #c9a84c;"
        >New Request</button>
        <button
          @click="activeTab = 'history'"
          class="flex-1 py-2.5 text-sm font-bold transition-all border-b-2"
          :class="activeTab === 'history' ? 'text-white border-gold-500' : 'text-blue-300 border-transparent'"
        >Request History</button>
      </div>
    </div>

    <!-- New Request Tab -->
    <div v-if="activeTab === 'new'" class="px-5 py-5">
      <!-- Purpose filter badge -->
      <div v-if="activePurpose" class="mb-4 flex items-center gap-2">
        <span class="px-3 py-1.5 text-white text-xs font-bold rounded-full flex items-center gap-1" style="background: #1e3a6e;">
          <Icon name="mdi:filter-outline" size="13" />
          {{ purposeLabel }}
        </span>
        <button @click="clearPurpose" class="text-xs text-slate-400 hover:text-red-500 flex items-center gap-1 transition">
          <Icon name="mdi:close-circle-outline" size="13" />
          Clear filter
        </button>
      </div>

      <!-- Guide button -->
      <button @click="showPurposeGuide = true" class="w-full bg-royal-50 border border-royal-100 rounded-2xl p-3.5 flex items-center gap-3 mb-4 hover:bg-royal-100 transition">
        <div class="w-9 h-9 rounded-xl bg-royal-800 flex items-center justify-center flex-shrink-0">
          <Icon name="mdi:help-circle-outline" size="18" class="text-white" />
        </div>
        <div class="flex-1 text-left">
          <p class="text-sm font-bold text-royal-800">Not sure what to request?</p>
          <p class="text-xs text-royal-600">Use our "Help me choose" guide</p>
        </div>
        <Icon name="mdi:chevron-right" size="18" class="text-royal-600" />
      </button>

      <p class="text-xs text-slate-400 font-medium mb-3">Select a document type to request</p>

      <div class="space-y-2.5">
        <button
          v-for="doc in filteredDocuments"
          :key="doc.id"
          @click="selectDocument(doc)"
          class="card-hover w-full bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between text-left"
        >
          <div class="flex items-center gap-3.5">
            <div :class="doc.iconBg" class="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Icon :name="doc.icon" size="22" :class="doc.iconColor" />
            </div>
            <div>
              <p class="text-sm font-bold text-slate-800">{{ doc.name }}</p>
              <p class="text-xs text-slate-400 mt-0.5">{{ doc.description }}</p>
              <div class="flex items-center gap-2 mt-1">
                <span class="text-xs font-bold text-royal-800">₱{{ doc.fee }}</span>
                <span class="text-slate-300">•</span>
                <div class="flex items-center gap-1">
                  <Icon name="mdi:clock-outline" size="11" class="text-slate-400" />
                  <span class="text-xs text-slate-400">{{ doc.days }}</span>
                </div>
              </div>
            </div>
          </div>
          <Icon name="mdi:chevron-right" size="18" class="text-slate-300 flex-shrink-0" />
        </button>
      </div>
    </div>

    <!-- History Tab -->
    <div v-if="activeTab === 'history'" class="px-5 py-5 space-y-2.5">
      <div
        v-for="item in historyItems"
        :key="item.id"
        class="bg-white rounded-2xl p-4 shadow-sm border border-slate-100"
      >
        <div class="flex items-start justify-between mb-2">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
              <Icon name="mdi:file-check-outline" size="20" class="text-emerald-600" />
            </div>
            <div>
              <p class="text-sm font-bold text-slate-800">{{ item.name }}</p>
              <p class="text-xs text-slate-400">{{ item.id }}</p>
            </div>
          </div>
          <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
            <Icon name="mdi:check-circle" size="11" />
            Verified
          </span>
        </div>
        <div class="flex items-center justify-between">
          <p class="text-xs text-slate-400">Completed: {{ item.date }}</p>
          <button class="text-xs font-bold text-royal-800 flex items-center gap-1 hover:underline">
            <Icon name="mdi:share-variant-outline" size="14" />
            Share
          </button>
        </div>
      </div>
    </div>

    <!-- Purpose Guide Modal -->
    <Transition name="modal">
      <div v-if="showPurposeGuide" class="fixed inset-0 bg-black/50 modal-backdrop z-50 flex items-end justify-center">
        <div class="bg-white w-full max-w-[480px] rounded-t-3xl overflow-hidden animate-slide-up">
          <div class="px-5 py-5" style="background: #1e3a6e;">
            <div class="w-10 h-1 bg-white/30 rounded-full mx-auto mb-4"></div>
            <h3 class="text-lg font-bold text-white">What do you need this for?</h3>
            <p class="text-xs text-blue-200 mt-1">Please select the purpose for requesting this document</p>
          </div>
          <div class="p-5 space-y-2.5">
            <button
              v-for="purpose in purposes"
              :key="purpose.id"
              @click="selectPurpose(purpose)"
              class="card-hover w-full bg-slate-50 rounded-2xl p-4 flex items-center gap-3.5 text-left border border-slate-100"
            >
              <div :class="purpose.iconBg" class="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Icon :name="purpose.icon" size="22" :class="purpose.iconColor" />
              </div>
              <div class="flex-1">
                <p class="text-sm font-bold text-slate-800">{{ purpose.label }}</p>
                <p class="text-xs text-slate-400 mt-0.5">{{ purpose.description }}</p>
              </div>
              <Icon name="mdi:chevron-right" size="18" class="text-slate-300" />
            </button>

            <button @click="showPurposeGuide = false" class="w-full py-3.5 rounded-2xl border-2 border-slate-200 text-sm font-bold text-slate-500 hover:bg-slate-50 transition mt-2">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Confirm Request Modal -->
    <Transition name="modal">
      <div v-if="selectedDoc" class="fixed inset-0 bg-black/50 modal-backdrop z-50 flex items-end justify-center">
        <div class="bg-white w-full max-w-[480px] rounded-t-3xl p-6 animate-slide-up">
          <div class="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-5"></div>
          <div class="flex items-center gap-3 mb-4">
            <div :class="selectedDoc.iconBg" class="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Icon :name="selectedDoc.icon" size="24" :class="selectedDoc.iconColor" />
            </div>
            <div>
              <h3 class="text-base font-bold text-slate-900">{{ selectedDoc.name }}</h3>
              <p class="text-xs text-slate-500">{{ selectedDoc.description }}</p>
            </div>
          </div>
          <div class="bg-slate-50 rounded-2xl p-4 mb-4 border border-slate-100 space-y-2">
            <div class="flex justify-between">
              <span class="text-xs text-slate-500">Processing Fee</span>
              <span class="text-sm font-bold text-slate-800">₱{{ selectedDoc.fee }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-xs text-slate-500">Processing Time</span>
              <span class="text-sm font-semibold text-slate-800">{{ selectedDoc.days }}</span>
            </div>
          </div>
          <div class="bg-blue-50 rounded-2xl p-3.5 mb-5 border border-blue-100 flex items-start gap-2">
            <Icon name="mdi:information-outline" size="15" class="text-blue-600 flex-shrink-0 mt-0.5" />
            <p class="text-xs text-blue-700 leading-relaxed">You will be directed to payment after confirming this request. Required documents must be uploaded within 48 hours.</p>
          </div>

          <!-- Verify identity step -->
          <div v-if="!showVerify" class="flex gap-3">
            <button @click="selectedDoc = null" class="flex-1 py-3.5 rounded-2xl border-2 border-slate-200 text-sm font-bold text-slate-600">Cancel</button>
            <button @click="showVerify = true" class="flex-1 py-3.5 rounded-2xl text-white text-sm font-bold" style="background: #1e3a6e;">Continue</button>
          </div>

          <!-- Verify modal -->
          <div v-else>
            <h4 class="text-sm font-bold text-slate-800 mb-1">Verify Your Identity</h4>
            <p class="text-xs text-slate-500 mb-3">For security purposes, please authenticate before proceeding.</p>
            <div class="flex gap-2 mb-3">
              <button
                @click="verifyMethod = 'password'"
                class="flex-1 py-2.5 rounded-xl text-xs font-bold border-2 transition"
                :class="verifyMethod === 'password' ? 'border-royal-800 bg-royal-50 text-royal-800' : 'border-slate-200 text-slate-500'"
              >
                <Icon name="mdi:lock-outline" size="14" class="mb-0.5" /><br/>Password
              </button>
              <button
                @click="verifyMethod = 'biometric'"
                class="flex-1 py-2.5 rounded-xl text-xs font-bold border-2 transition"
                :class="verifyMethod === 'biometric' ? 'border-royal-800 bg-royal-50 text-royal-800' : 'border-slate-200 text-slate-500'"
              >
                <Icon name="mdi:fingerprint" size="14" class="mb-0.5" /><br/>Biometric
              </button>
            </div>
            <input v-if="verifyMethod === 'password'" type="password" placeholder="Enter your password" class="w-full border-2 border-slate-100 rounded-xl px-3 py-3 text-sm mb-3 focus:outline-none focus:border-royal-800 transition" />
            <div class="flex gap-3">
              <button @click="showVerify = false" class="flex-1 py-3.5 rounded-2xl border-2 border-slate-200 text-sm font-bold text-slate-600">Cancel</button>
              <button @click="confirmRequest" class="flex-1 py-3.5 rounded-2xl text-white text-sm font-bold" style="background: #1e3a6e;">Verify Password</button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <BottomNav active="requests" />
  </div>
</template>

<script setup>
const activeTab = ref('new')
const activePurpose = ref(null)
const showPurposeGuide = ref(false)
const selectedDoc = ref(null)
const showVerify = ref(false)
const verifyMethod = ref('password')
const router = useRouter()

const documents = [
  { id: 1, name: 'Transcript of Records', description: 'Official academic transcript with all courses and grades', fee: 150, days: '5-7 business days', icon: 'mdi:file-document-outline', iconBg: 'bg-royal-50', iconColor: 'text-royal-800', purposes: ['work', 'abroad', 'graduate', 'board'] },
  { id: 2, name: 'Certified True Copy of Diploma', description: 'Authenticated copy of your diploma', fee: 200, days: '3-5 business days', icon: 'mdi:certificate-outline', iconBg: 'bg-amber-50', iconColor: 'text-amber-600', purposes: ['work', 'abroad'] },
  { id: 3, name: 'Certificate of Graduation', description: 'Official certificate confirming degree completion', fee: 100, days: '2-3 business days', icon: 'mdi:school-outline', iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', purposes: ['work', 'abroad', 'graduate'] },
  { id: 4, name: 'Certificate of Enrollment', description: 'Proof of current or past enrollment', fee: 80, days: '1-2 business days', icon: 'mdi:file-check-outline', iconBg: 'bg-blue-50', iconColor: 'text-blue-600', purposes: ['work'] },
  { id: 5, name: 'Certificate of General Weighted Average', description: 'Official GWA certification', fee: 80, days: '2-3 business days', icon: 'mdi:certificate-outline', iconBg: 'bg-violet-50', iconColor: 'text-violet-600', purposes: ['board', 'graduate'] },
  { id: 6, name: 'Honorable Dismissal', description: 'Certificate of good standing for transfer', fee: 100, days: '3-5 business days', icon: 'mdi:file-star-outline', iconBg: 'bg-rose-50', iconColor: 'text-rose-600', purposes: [] },
  { id: 7, name: 'Document Authentication', description: 'Red ribbon authentication service', fee: 250, days: '7-10 business days', icon: 'mdi:shield-check-outline', iconBg: 'bg-teal-50', iconColor: 'text-teal-600', purposes: ['abroad'] },
  { id: 8, name: 'Certification, Authentication & Verification (CAV)', description: 'Complete document verification package', fee: 300, days: '10-14 business days', icon: 'mdi:check-all', iconBg: 'bg-slate-100', iconColor: 'text-slate-600', purposes: ['abroad'] },
]

const purposes = [
  { id: 'work', label: 'Employment / Work', description: 'Documents needed for job applications or employment verification', icon: 'mdi:briefcase-outline', iconBg: 'bg-royal-50', iconColor: 'text-royal-800' },
  { id: 'abroad', label: 'Working / Studying Abroad', description: 'Documents for international opportunities requiring authentication', icon: 'mdi:earth', iconBg: 'bg-blue-50', iconColor: 'text-blue-600' },
  { id: 'board', label: 'Board Exam / Licensure', description: 'Requirements for professional board examinations', icon: 'mdi:medal-outline', iconBg: 'bg-amber-50', iconColor: 'text-amber-600' },
  { id: 'graduate', label: 'Graduate School', description: "Application to master's or doctoral programs", icon: 'mdi:school-outline', iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600' },
  { id: 'other', label: 'Other Purpose', description: 'Browse all available documents', icon: 'mdi:file-document-outline', iconBg: 'bg-slate-100', iconColor: 'text-slate-600' },
]

const purposeLabel = computed(() => purposes.find(p => p.id === activePurpose.value)?.label || '')

const filteredDocuments = computed(() => {
  if (!activePurpose.value || activePurpose.value === 'other') return documents
  return documents.filter(d => d.purposes.includes(activePurpose.value))
})

const historyItems = [
  { id: '#TOR-2023-0198', name: 'Transcript of Records', date: 'Nov 15, 2023' },
  { id: '#COG-2023-0041', name: 'Certificate of Graduation', date: 'Mar 22, 2023' },
  { id: '#DIP-2022-0088', name: 'Certified True Copy of Diploma', date: 'Aug 10, 2022' },
]

const selectDocument = (doc) => {
  selectedDoc.value = doc
  showVerify.value = false
}

const selectPurpose = (purpose) => {
  activePurpose.value = purpose.id
  showPurposeGuide.value = false
}

const clearPurpose = () => {
  activePurpose.value = null
}

const confirmRequest = () => {
  selectedDoc.value = null
  showVerify.value = false
  router.push('/alumni/process-documents')
}
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: opacity 0.25s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
</style>
