<template>
  <div class="min-h-screen bg-slate-50 pb-24">
    <!-- Header -->
    <div class="royal-gradient relative overflow-hidden">
      <div class="h-0.5 gold-accent"></div>
      <div class="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/5"></div>
      <div class="px-5 pt-4 pb-6 relative z-10 flex items-center gap-3">
        <NuxtLink to="/alumni/home" class="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition">
          <Icon name="mdi:arrow-left" size="20" />
        </NuxtLink>
        <div>
          <h1 class="text-base font-bold text-white">
            Process <span style="color: #c9a84c;">Documents</span>
          </h1>
          <p class="text-xs text-blue-200">Track your document requests</p>
        </div>
      </div>
    </div>

    <div class="px-5 py-5 space-y-4">
      <!-- Stats -->
      <div class="grid grid-cols-2 gap-3">
        <div class="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <div class="flex items-center gap-2 mb-1.5">
            <div class="w-7 h-7 rounded-lg bg-royal-50 flex items-center justify-center">
              <Icon name="mdi:clock-outline" size="15" class="text-royal-800" />
            </div>
            <span class="text-[10px] font-bold text-royal-800 uppercase tracking-wide">Pending</span>
          </div>
          <p class="text-3xl font-bold text-royal-800">3</p>
          <p class="text-xs text-slate-400 mt-0.5">Documents in process</p>
        </div>
        <div class="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <div class="flex items-center gap-2 mb-1.5">
            <div class="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center">
              <Icon name="mdi:alert-circle-outline" size="15" class="text-amber-600" />
            </div>
            <span class="text-[10px] font-bold text-amber-600 uppercase tracking-wide">Attention</span>
          </div>
          <p class="text-3xl font-bold text-amber-700">2</p>
          <p class="text-xs text-slate-400 mt-0.5">Require uploads</p>
        </div>
      </div>

      <!-- Document Requests -->
      <div>
        <h2 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Your Document Requests</h2>
        <div class="space-y-3">

          <!-- TOR Card -->
          <div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <div class="flex items-start justify-between mb-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-royal-50 flex items-center justify-center flex-shrink-0">
                  <Icon name="mdi:file-document-outline" size="20" class="text-royal-800" />
                </div>
                <div>
                  <p class="text-sm font-bold text-slate-800 leading-tight">Official Transcript of Records</p>
                  <p class="text-xs text-slate-400">Request ID: #TOR-2024-0342</p>
                </div>
              </div>
              <Icon name="mdi:chevron-right" size="18" class="text-slate-300 flex-shrink-0" />
            </div>
            <div class="flex items-center gap-2 mb-3">
              <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-100">Pending Upload</span>
              <span class="text-xs text-slate-400">• 2/3 requirements submitted</span>
            </div>
            <!-- Requirements checklist -->
            <div class="bg-slate-50 rounded-xl p-3 mb-3 space-y-1.5">
              <div class="flex items-center gap-2">
                <Icon name="mdi:check-circle" size="14" class="text-emerald-500 flex-shrink-0" />
                <span class="text-xs text-slate-600">Valid Government ID</span>
              </div>
              <div class="flex items-center gap-2">
                <Icon name="mdi:check-circle" size="14" class="text-emerald-500 flex-shrink-0" />
                <span class="text-xs text-slate-600">Payment Receipt (₱150)</span>
              </div>
              <div class="flex items-center gap-2">
                <Icon name="mdi:circle-outline" size="14" class="text-slate-300 flex-shrink-0" />
                <span class="text-xs text-slate-400">Authorization Letter (if representative)</span>
              </div>
            </div>
            <button
              @click="showRushConfirm = 'TOR'"
              class="w-full py-2.5 rounded-xl text-white text-xs font-bold flex items-center justify-center gap-2 transition active:scale-95"
              style="background: linear-gradient(135deg, #f59e0b, #d97706);"
            >
              <Icon name="mdi:clock-fast" size="16" />
              Rush Processing (+₱200)
            </button>
          </div>

          <!-- Diploma Card -->
          <div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <div class="flex items-start justify-between mb-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                  <Icon name="mdi:certificate-outline" size="20" class="text-amber-600" />
                </div>
                <div>
                  <p class="text-sm font-bold text-slate-800 leading-tight">Certified Diploma Copy</p>
                  <p class="text-xs text-slate-400">Request ID: #DIP-2024-0198</p>
                </div>
              </div>
              <Icon name="mdi:chevron-right" size="18" class="text-slate-300 flex-shrink-0" />
            </div>
            <div class="flex items-center gap-2 mb-3">
              <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">Processing</span>
              <span class="text-xs text-slate-400">• ETA: 3-5 days</span>
            </div>
            <button
              @click="showRushConfirm = 'DIP'"
              class="w-full py-2.5 rounded-xl text-white text-xs font-bold flex items-center justify-center gap-2 transition active:scale-95"
              style="background: linear-gradient(135deg, #f59e0b, #d97706);"
            >
              <Icon name="mdi:clock-fast" size="16" />
              Rush Processing (+₱300)
            </button>
          </div>

          <!-- Certificate of Graduation - Ready with expanded view -->
          <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div class="p-4">
              <div class="flex items-start justify-between mb-3">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                    <Icon name="mdi:school-outline" size="20" class="text-emerald-600" />
                  </div>
                  <div>
                    <p class="text-sm font-bold text-slate-800 leading-tight">Certificate of Graduation</p>
                    <p class="text-xs text-slate-400">#COG-2024-0521</p>
                  </div>
                </div>
                <button @click="expandedCard = expandedCard === 'COG' ? null : 'COG'" class="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center">
                  <Icon :name="expandedCard === 'COG' ? 'mdi:chevron-up' : 'mdi:chevron-down'" size="18" class="text-slate-400" />
                </button>
              </div>
              <div class="flex items-center gap-2 mb-2">
                <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">Ready</span>
                <span class="text-xs text-slate-400">• Ready to download</span>
              </div>
              <div class="flex items-center gap-1.5 mb-2">
                <Icon name="mdi:clock-outline" size="13" class="text-amber-500" />
                <span class="text-xs text-amber-600 font-semibold">Expires in 11 days 8 hours</span>
              </div>
              <div class="bg-amber-50 rounded-xl p-2.5 flex items-start gap-2 border border-amber-100">
                <Icon name="mdi:alert-circle-outline" size="13" class="text-amber-500 flex-shrink-0 mt-0.5" />
                <p class="text-xs text-amber-700">Download before expiration — This document will be automatically deleted after 14 days</p>
              </div>
            </div>

            <!-- Expanded Section -->
            <div v-if="expandedCard === 'COG'" class="border-t border-slate-100 px-4 pb-4">
              <!-- Status Timeline -->
              <div class="mt-4 mb-4">
                <p class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Request Status</p>
                <div class="relative">
                  <div class="flex items-center justify-between relative">
                    <div class="absolute top-3.5 left-3.5 right-3.5 h-0.5 bg-emerald-200 z-0"></div>
                    <div
                      v-for="(step, i) in statusSteps"
                      :key="i"
                      class="flex flex-col items-center gap-1.5 z-10 relative"
                    >
                      <div
                        class="w-7 h-7 rounded-full flex items-center justify-center border-2"
                        :class="step.done ? 'bg-emerald-500 border-emerald-500' : 'bg-white border-slate-200'"
                      >
                        <Icon name="mdi:check" size="14" :class="step.done ? 'text-white' : 'text-slate-300'" />
                      </div>
                      <span class="text-[10px] font-semibold text-center" :class="step.done ? 'text-emerald-600' : 'text-slate-300'">{{ step.label }}</span>
                    </div>
                  </div>
                </div>
                <!-- Timeline events -->
                <div class="mt-4 space-y-3">
                  <div v-for="event in timelineEvents" :key="event.id" class="flex items-start gap-2.5">
                    <div class="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0"></div>
                    <div class="flex-1">
                      <div class="flex items-center justify-between">
                        <p class="text-xs font-bold text-slate-800">{{ event.title }}</p>
                        <span class="text-[10px] text-slate-400">{{ event.date }}</span>
                      </div>
                      <p class="text-xs text-slate-500 leading-relaxed">{{ event.description }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Required documents checklist -->
              <div class="bg-emerald-50 rounded-xl p-3 mb-3 border border-emerald-100 flex items-center gap-2">
                <Icon name="mdi:check-circle" size="16" class="text-emerald-600 flex-shrink-0" />
                <span class="text-xs font-semibold text-emerald-700">All requirements submitted</span>
              </div>

              <!-- Download Button -->
              <button
                @click="showDocumentPreview = true"
                class="w-full py-3 rounded-2xl text-white text-sm font-bold flex items-center justify-center gap-2 transition active:scale-95 shadow-sm"
                style="background: linear-gradient(135deg, #059669, #047857);"
              >
                <Icon name="mdi:download-outline" size="18" />
                Download Document
              </button>

              <!-- Office Chat -->
              <div class="mt-4">
                <p class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Office–Alumni Chat</p>
                <div class="bg-slate-50 rounded-xl p-3 min-h-14 flex items-center justify-center mb-2 border border-slate-100">
                  <p class="text-xs text-slate-400 text-center">No messages yet. Start a conversation with the office...</p>
                </div>
                <div class="flex gap-2">
                  <input
                    v-model="chatMessage"
                    type="text"
                    placeholder="Type a message..."
                    class="flex-1 text-xs border-2 border-slate-100 rounded-xl px-3 py-2.5 focus:outline-none focus:border-royal-800 bg-white transition"
                  />
                  <button class="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm" style="background: #1e3a6e;">
                    <Icon name="mdi:send" size="16" class="text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Rush Processing Confirm Modal -->
    <Transition name="modal">
      <div v-if="showRushConfirm" class="fixed inset-0 bg-black/50 modal-backdrop z-50 flex items-end justify-center">
        <div class="bg-white w-full max-w-[480px] rounded-t-3xl p-6 animate-slide-up">
          <div class="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-5"></div>
          <div class="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-3">
            <Icon name="mdi:clock-fast" size="24" class="text-amber-600" />
          </div>
          <h3 class="text-lg font-bold text-slate-900 mb-1">Confirm Rush Processing</h3>
          <p class="text-sm text-slate-500 mb-5">Additional fee of <span class="font-bold text-slate-800">₱{{ showRushConfirm === 'TOR' ? '200' : '300' }}</span> will be added. Processing time will be reduced to 1-2 days.</p>
          <div class="flex gap-3">
            <button @click="showRushConfirm = null" class="flex-1 py-3.5 rounded-2xl border-2 border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition">Cancel</button>
            <button @click="confirmRush" class="flex-1 py-3.5 rounded-2xl text-white text-sm font-bold transition active:scale-95" style="background: linear-gradient(135deg, #f59e0b, #d97706);">Confirm</button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Payment Modal -->
    <Transition name="modal">
      <div v-if="showPayment" class="fixed inset-0 bg-black/50 modal-backdrop z-50 flex items-end justify-center">
        <div class="bg-white w-full max-w-[480px] rounded-t-3xl p-6 animate-slide-up">
          <div class="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-5"></div>
          <div class="w-12 h-12 rounded-2xl bg-royal-50 flex items-center justify-center mb-3">
            <Icon name="mdi:credit-card-outline" size="24" class="text-royal-800" />
          </div>
          <h3 class="text-lg font-bold text-slate-900 mb-1">Payment Required</h3>
          <p class="text-sm text-slate-500 mb-4">Settle the additional fee of <span class="font-bold text-slate-800">₱{{ rushAmount }}</span> via:</p>
          <div class="space-y-2 mb-5">
            <div class="flex items-center gap-3 bg-slate-50 rounded-xl p-3.5 border border-slate-100">
              <Icon name="mdi:bank-outline" size="20" class="text-royal-800" />
              <p class="text-sm font-semibold text-slate-800">GCash / PayMaya</p>
            </div>
            <div class="flex items-center gap-3 bg-slate-50 rounded-xl p-3.5 border border-slate-100">
              <Icon name="mdi:credit-card-outline" size="20" class="text-royal-800" />
              <p class="text-sm font-semibold text-slate-800">Credit / Debit Card</p>
            </div>
            <div class="flex items-center gap-3 bg-slate-50 rounded-xl p-3.5 border border-slate-100">
              <Icon name="mdi:receipt-outline" size="20" class="text-royal-800" />
              <p class="text-sm font-semibold text-slate-800">Upload Payment Receipt</p>
            </div>
          </div>
          <div class="flex gap-3">
            <button @click="showPayment = false" class="flex-1 py-3.5 rounded-2xl border-2 border-slate-200 text-sm font-bold text-slate-600">Cancel</button>
            <button @click="showPayment = false" class="flex-1 py-3.5 rounded-2xl text-white text-sm font-bold" style="background: #1e3a6e;">Proceed to Pay</button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Document Preview Modal -->
    <Transition name="modal">
      <div v-if="showDocumentPreview" class="fixed inset-0 bg-black/70 modal-backdrop z-50 flex items-center justify-center px-4">
        <div class="bg-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl animate-slide-up">
          <div class="px-5 py-4 flex items-center justify-between" style="background: #1e3a6e;">
            <div>
              <p class="text-sm font-bold text-white">Document Preview</p>
              <p class="text-xs text-blue-200">Certificate of Graduation</p>
            </div>
            <button @click="showDocumentPreview = false" class="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25 transition">
              <Icon name="mdi:close" size="18" class="text-white" />
            </button>
          </div>
          <div class="p-6 text-center bg-white">
            <div class="flex justify-center mb-4">
              <div class="w-14 h-14 rounded-full border-2 flex items-center justify-center" style="border-color: #1e3a6e; background: #eef2ff;">
                <svg viewBox="0 0 56 56" class="w-10 h-10" fill="none">
                  <ellipse cx="28" cy="20" rx="10" ry="12" fill="#c9a84c"/>
                  <path d="M14 50 Q21 32 28 36 Q35 32 42 50" fill="#1e3a6e"/>
                </svg>
              </div>
            </div>
            <p class="text-xs font-bold text-slate-800 mb-0.5">ATENEO DE DAVAO UNIVERSITY</p>
            <p class="text-[10px] text-slate-500 mb-0.5">E. JACINTO STREET, DAVAO CITY 8000, PHILIPPINES</p>
            <p class="text-[10px] text-slate-500 mb-3">Tel (082) 221-2411 | registrar@addu.edu.ph</p>
            <div class="border-t border-b border-slate-100 py-2 mb-3">
              <p class="text-[10px] font-bold text-slate-600">OFFICE OF THE UNIVERSITY REGISTRAR</p>
            </div>
            <p class="text-sm font-bold text-slate-900 mb-1 tracking-wider">CERTIFICATE OF GRADUATION</p>
            <p class="text-[10px] text-slate-400 mb-3">Document No.: CERT-2024-0012<br/>Date Issued: February 15, 2024</p>
            <p class="text-xs text-slate-600 leading-relaxed mb-3">This is to certify that the records of this University show that</p>
            <p class="text-base font-bold text-slate-900 mb-1">JUAN DELA CRUZ</p>
            <p class="text-xs text-slate-400 italic">has satisfactorily completed all requirements...</p>
          </div>
          <div class="px-5 py-4 border-t border-slate-100 flex gap-3">
            <button @click="showDocumentPreview = false" class="flex-1 py-2.5 rounded-xl border-2 border-slate-200 text-sm font-bold text-slate-600">Close</button>
            <button class="flex-1 py-2.5 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-1.5" style="background: #1e3a6e;">
              <Icon name="mdi:download-outline" size="16" />
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <BottomNav active="process" />
  </div>
</template>

<script setup>
const expandedCard = ref('COG')
const showRushConfirm = ref(null)
const showPayment = ref(false)
const showDocumentPreview = ref(false)
const chatMessage = ref('')
const rushAmount = ref(200)

const statusSteps = [
  { label: 'Submitted', done: true },
  { label: 'Verified', done: true },
  { label: 'Processed', done: true },
  { label: 'Ready', done: true },
]

const timelineEvents = [
  { id: 1, title: 'Request Submitted', date: 'Feb 10, 2024', description: 'Your Certificate of Graduation request was submitted with reference #COG-2024-0371.' },
  { id: 2, title: 'Documents Verified', date: 'Feb 11, 2024', description: 'All submitted documents and payment verified successfully.' },
  { id: 3, title: 'Document Processed', date: 'Feb 14, 2024', description: 'Your certificate has been processed and digitally signed by the registrar.' },
  { id: 4, title: 'Ready for Download', date: 'Feb 15, 2024', description: 'Document ready for download. Valid until March 1, 2024 (14 days remaining).' },
]

const confirmRush = () => {
  rushAmount.value = showRushConfirm.value === 'TOR' ? 200 : 300
  showRushConfirm.value = null
  showPayment.value = true
}
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: opacity 0.25s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
</style>
