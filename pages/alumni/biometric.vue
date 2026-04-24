<template>
  <div class="min-h-screen flex flex-col" style="background: linear-gradient(160deg, #0f1d38 0%, #1e3a6e 50%, #1a3060 100%);">
    <div class="h-0.5 gold-accent"></div>

    <div class="flex-1 flex flex-col items-center justify-center px-6 py-10">
      <div class="w-full max-w-sm">
        <!-- Logo -->
        <div class="flex flex-col items-center mb-10 animate-fade-in">
          <div class="w-20 h-20 rounded-full bg-white/10 border-2 border-gold-500/60 flex items-center justify-center mb-4 shadow-[0_0_40px_rgba(201,168,76,0.3)]">
            <svg viewBox="0 0 80 80" class="w-14 h-14" fill="none">
              <ellipse cx="40" cy="28" rx="14" ry="16" fill="#c9a84c"/>
              <path d="M20 70 Q30 46 40 52 Q50 46 60 70" fill="white" opacity="0.95"/>
              <ellipse cx="40" cy="26" rx="7" ry="8" fill="#1e3a6e" opacity="0.5"/>
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-white mb-1">Welcome Back,</h1>
          <h2 class="text-2xl font-bold" style="color: #c9a84c;">Blue Knight</h2>
          <p class="text-sm text-blue-200 mt-1">Alumni Knights' Hub</p>
          <div class="mt-3 w-12 h-0.5" style="background: linear-gradient(90deg, #c9a84c, #e8d08a);"></div>
        </div>

        <!-- Biometric Card -->
        <div class="bg-white/95 rounded-3xl p-7 shadow-[0_20px_60px_rgba(0,0,0,0.4)] animate-slide-up">
          <p class="text-center text-sm text-slate-500 mb-6 leading-relaxed">
            Forgot your student ID from years ago? No problem! Use biometric authentication to securely link to your alumni record.
          </p>

          <!-- Fingerprint scanner -->
          <div class="flex justify-center mb-4">
            <button
              @click="startBiometric"
              class="relative w-28 h-28 rounded-full flex items-center justify-center transition-all duration-300"
              :class="scanning ? 'bg-royal-50 scale-95' : 'bg-slate-100 hover:bg-royal-50'"
            >
              <!-- Pulse rings when scanning -->
              <div v-if="scanning" class="absolute inset-0 rounded-full border-2 border-royal-800/30 animate-ping"></div>
              <div v-if="scanning" class="absolute inset-2 rounded-full border-2 border-royal-800/20 animate-ping" style="animation-delay: 0.2s;"></div>
              <Icon name="mdi:fingerprint" size="56" :class="scanning ? 'text-royal-800' : 'text-slate-400'" />
            </button>
          </div>

          <p class="text-center text-xs font-semibold text-slate-500 mb-6">
            {{ scanning ? 'Authenticating...' : 'Ready to authenticate' }}
          </p>

          <button
            @click="startBiometric"
            :disabled="scanning"
            class="w-full py-4 rounded-2xl font-bold text-white text-sm tracking-wide shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 mb-3"
            style="background: linear-gradient(135deg, #1e3a6e 0%, #1a3060 60%, #c9a84c 150%);"
          >
            <Icon name="mdi:fingerprint" size="18" />
            {{ scanning ? 'Authenticating...' : 'Authenticate with Biometrics' }}
          </button>

          <button
            class="w-full py-3.5 rounded-2xl border-2 border-slate-100 bg-white flex items-center justify-center gap-2.5 text-sm text-slate-700 font-semibold hover:bg-slate-50 transition mb-4"
          >
            <Icon name="mdi:face-recognition" size="18" class="text-slate-500" />
            Use Face ID
          </button>

          <p class="text-center text-xs text-slate-400">
            Remember your details?
            <NuxtLink to="/alumni/login" class="font-bold text-royal-800 hover:underline">Sign in with ID</NuxtLink>
          </p>
        </div>
      </div>
    </div>

    <div class="h-1 gold-accent"></div>
  </div>
</template>

<script setup>
const scanning = ref(false)
const router = useRouter()

const startBiometric = async () => {
  if (scanning.value) return
  scanning.value = true
  await new Promise(r => setTimeout(r, 2000))
  scanning.value = false
  router.push('/alumni/home')
}
</script>
