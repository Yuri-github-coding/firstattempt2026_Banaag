<template>
  <div class="min-h-screen bg-slate-50 pb-24">
    <!-- Header -->
    <div class="royal-gradient relative overflow-hidden">
      <div class="h-0.5 gold-accent"></div>
      <div class="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/5"></div>
      <div class="px-5 pt-4 pb-8 relative z-10 flex items-center gap-3">
        <NuxtLink to="/alumni/home" class="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition">
          <Icon name="mdi:arrow-left" size="20" />
        </NuxtLink>
        <h1 class="text-base font-bold text-white">My Academic Passport</h1>
        <span class="ml-auto text-xs px-2.5 py-1 rounded-full bg-white/15 text-white font-medium border border-white/20">Verified</span>
      </div>
    </div>

    <!-- Profile card floating over header -->
    <div class="px-5 -mt-5">
      <div class="bg-white rounded-3xl p-5 shadow-lg border border-slate-100 mb-4">
        <!-- Avatar + info -->
        <div class="flex items-center gap-4 pb-5 mb-5 border-b border-slate-100">
          <div class="relative">
            <div class="w-16 h-16 rounded-full bg-royal-50 border-2 border-royal-200 flex items-center justify-center">
              <svg viewBox="0 0 64 64" class="w-12 h-12" fill="none">
                <ellipse cx="32" cy="22" rx="11" ry="13" fill="#c9a84c"/>
                <path d="M14 58 Q23 38 32 43 Q41 38 50 58" fill="#1e3a6e" opacity="0.9"/>
                <ellipse cx="32" cy="20" r="5" fill="#1e3a6e" opacity="0.4"/>
              </svg>
            </div>
            <div class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
              <Icon name="mdi:check" size="10" class="text-white" />
            </div>
          </div>
          <div class="flex-1">
            <h2 class="text-base font-bold text-slate-900">Maria Clara Santos</h2>
            <p class="text-xs text-slate-500">Student No. 20180234</p>
            <div class="flex items-center gap-1.5 mt-1.5">
              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                <Icon name="mdi:check-circle" size="11" />
                Verified by Registrar
              </span>
            </div>
          </div>
        </div>

        <!-- Academic Info -->
        <div class="space-y-3.5">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-royal-50 flex items-center justify-center flex-shrink-0">
              <Icon name="mdi:school-outline" size="18" class="text-royal-800" />
            </div>
            <div>
              <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Degree</p>
              <p class="text-sm font-semibold text-slate-800">Bachelor of Science in Computer Science</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
              <Icon name="mdi:calendar-outline" size="18" class="text-blue-600" />
            </div>
            <div>
              <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Graduated</p>
              <p class="text-sm font-semibold text-slate-800">March 2022</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-gold-50 flex items-center justify-center flex-shrink-0" style="background: #fef9ee;">
              <Icon name="mdi:medal-outline" size="18" class="text-gold-600" style="color: #b7960a;" />
            </div>
            <div>
              <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Honors</p>
              <p class="text-sm font-semibold text-slate-800">Cum Laude</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Info -->
      <div class="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 mb-4">
        <h3 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Contact Information</h3>
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0">
              <Icon name="mdi:email-outline" size="18" class="text-slate-500" />
            </div>
            <div>
              <p class="text-[10px] text-slate-400 uppercase tracking-wide font-bold">Email</p>
              <p class="text-sm text-slate-700 font-medium">maria.santos@addu.edu.ph</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0">
              <Icon name="mdi:phone-outline" size="18" class="text-slate-500" />
            </div>
            <div>
              <p class="text-[10px] text-slate-400 uppercase tracking-wide font-bold">Phone</p>
              <p class="text-sm text-slate-700 font-medium">+63 912 345 6789</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0">
              <Icon name="mdi:map-marker-outline" size="18" class="text-slate-500" />
            </div>
            <div>
              <p class="text-[10px] text-slate-400 uppercase tracking-wide font-bold">Location</p>
              <p class="text-sm text-slate-700 font-medium">Davao City, Philippines</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Institution badge -->
      <div class="bg-royal-50 rounded-3xl p-4 mb-4 border border-royal-100 flex items-start gap-3">
        <div class="w-10 h-10 rounded-full bg-royal-800 flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 40 40" class="w-7 h-7" fill="none">
            <ellipse cx="20" cy="14" rx="7" ry="8" fill="#c9a84c"/>
            <path d="M10 34 Q15 22 20 25 Q25 22 30 34" fill="white"/>
          </svg>
        </div>
        <div>
          <p class="text-xs font-bold text-royal-800">Ateneo de Davao University</p>
          <p class="text-xs text-royal-600 mt-1 leading-relaxed">This credential is cryptographically secured and synced with the AdDU Registrar's Office.</p>
        </div>
      </div>

      <!-- Quick Login Settings -->
      <div class="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 mb-4">
        <h3 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Quick Login Settings</h3>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center">
              <Icon name="mdi:fingerprint" size="18" class="text-slate-500" />
            </div>
            <div>
              <p class="text-sm font-semibold text-slate-800">Biometric Login</p>
              <p class="text-xs text-slate-400">Enable biometric authentication</p>
            </div>
          </div>
          <button
            @click="biometricEnabled = !biometricEnabled"
            class="relative w-12 h-6 rounded-full transition-all duration-300 flex-shrink-0"
            :class="biometricEnabled ? 'bg-royal-800' : 'bg-slate-200'"
          >
            <span
              class="absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300"
              :class="biometricEnabled ? 'left-7' : 'left-1'"
            ></span>
          </button>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="space-y-2.5">
        <button class="w-full py-3.5 rounded-2xl font-bold text-white text-sm flex items-center justify-center gap-2 shadow-sm" style="background: linear-gradient(135deg, #1e3a6e, #1a3060);">
          <Icon name="mdi:share-variant-outline" size="18" />
          Share Credential
        </button>
        <button class="w-full py-3.5 rounded-2xl font-bold text-slate-700 text-sm flex items-center justify-center gap-2 border-2 border-slate-200 bg-white hover:bg-slate-50 transition">
          <Icon name="mdi:download-outline" size="18" />
          Download PDF
        </button>
        <button @click="handleSignOut" class="w-full py-3.5 rounded-2xl font-bold text-red-600 text-sm flex items-center justify-center gap-2 border-2 border-red-100 bg-red-50 hover:bg-red-100 transition">
          <Icon name="mdi:logout" size="18" />
          Sign Out
        </button>
      </div>
    </div>

    <BottomNav active="profile" />
  </div>
</template>

<script setup>
const biometricEnabled = ref(false)
const router = useRouter()

const handleSignOut = () => {
  router.push('/alumni/login')
}
</script>
