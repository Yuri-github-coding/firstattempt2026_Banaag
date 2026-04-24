<template>
  <div class="min-h-screen flex flex-col" style="background: linear-gradient(160deg, #0f1d38 0%, #1e3a6e 50%, #1a3060 100%);">
    <!-- Gold accent top -->
    <div class="h-1 gold-accent w-full"></div>

    <!-- Content -->
    <div class="flex-1 flex flex-col items-center justify-center px-6 py-10">
      <div class="w-full max-w-sm">

        <!-- Logo section -->
        <div class="flex flex-col items-center mb-10 animate-fade-in">
          <div class="relative mb-5">
            <div class="w-24 h-24 rounded-full bg-white/10 border-2 border-gold-500/60 flex items-center justify-center shadow-[0_0_40px_rgba(201,168,76,0.3)]">
              <svg viewBox="0 0 80 80" class="w-16 h-16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="40" cy="28" rx="14" ry="16" fill="#c9a84c"/>
                <path d="M20 70 Q30 46 40 52 Q50 46 60 70" fill="white" opacity="0.95"/>
                <ellipse cx="40" cy="26" rx="7" ry="8" fill="#1e3a6e" opacity="0.5"/>
                <path d="M33 20 Q40 14 47 20" stroke="#c9a84c" stroke-width="1.5" stroke-linecap="round" opacity="0.7"/>
              </svg>
            </div>
            <!-- Glow ring -->
            <div class="absolute inset-0 rounded-full border border-gold-500/20 scale-110"></div>
          </div>

          <h1 class="text-3xl font-bold text-white mb-1">
            Welcome, <span style="color: #c9a84c;">Blue Knight</span>
          </h1>
          <p class="text-sm text-blue-200 tracking-wide">Alumni Knights' Hub</p>
          <div class="mt-3 w-12 h-0.5" style="background: linear-gradient(90deg, #c9a84c, #e8d08a);"></div>
        </div>

        <!-- Form card -->
        <div class="bg-white/95 backdrop-blur rounded-3xl p-7 shadow-[0_20px_60px_rgba(0,0,0,0.4)] animate-slide-up">

          <!-- Student Number -->
          <div class="mb-4">
            <label class="text-[11px] font-bold tracking-widest text-slate-500 uppercase block mb-1.5">Student Number</label>
            <div class="relative">
              <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-royal-800">
                <Icon name="mdi:account-outline" size="18" />
              </span>
              <input
                v-model="studentNumber"
                type="text"
                placeholder="e.g. 20210001"
                class="w-full pl-10 pr-4 py-3.5 border-2 border-slate-100 rounded-2xl bg-slate-50 text-slate-800 text-sm placeholder-slate-300 focus:outline-none focus:border-royal-800 focus:bg-white transition-all"
              />
            </div>
          </div>

          <!-- Password -->
          <div class="mb-3">
            <label class="text-[11px] font-bold tracking-widest text-slate-500 uppercase block mb-1.5">Password</label>
            <div class="relative">
              <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-royal-800">
                <Icon name="mdi:lock-outline" size="18" />
              </span>
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter your password"
                class="w-full pl-10 pr-12 py-3.5 border-2 border-slate-100 rounded-2xl bg-slate-50 text-slate-800 text-sm placeholder-slate-300 focus:outline-none focus:border-royal-800 focus:bg-white transition-all"
              />
              <button
                @click="showPassword = !showPassword"
                class="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
              >
                <Icon :name="showPassword ? 'mdi:eye-off-outline' : 'mdi:eye-outline'" size="18" />
              </button>
            </div>
          </div>

          <!-- Forgot -->
          <div class="text-right mb-5">
            <NuxtLink to="/alumni/forgot-password" class="text-xs font-semibold text-royal-800 hover:underline">
              Forgot password?
            </NuxtLink>
          </div>

          <!-- Sign In Button -->
          <button
            @click="handleLogin"
            :disabled="isLoading"
            class="w-full py-4 rounded-2xl font-bold text-white text-sm tracking-wider shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
            style="background: linear-gradient(135deg, #1e3a6e 0%, #1a3060 60%, #c9a84c 150%);"
          >
            <span v-if="!isLoading">Sign In</span>
            <span v-else class="flex items-center gap-2">
              <Icon name="mdi:loading" size="18" class="animate-spin" />
              Signing in...
            </span>
          </button>

          <!-- Divider -->
          <div class="flex items-center gap-3 my-4">
            <div class="flex-1 h-px bg-slate-100"></div>
            <span class="text-xs text-slate-400 font-medium">OR</span>
            <div class="flex-1 h-px bg-slate-100"></div>
          </div>

          <!-- Google -->
          <button
            @click="handleGoogleLogin"
            class="w-full py-3.5 rounded-2xl border-2 border-slate-100 bg-white flex items-center justify-center gap-2.5 text-sm text-slate-700 font-semibold hover:bg-slate-50 hover:border-slate-200 transition mb-2.5"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign in using university email
          </button>

          <!-- Biometric -->
          <NuxtLink to="/alumni/biometric">
            <button class="w-full py-3.5 rounded-2xl border-2 border-slate-100 bg-white flex items-center justify-center gap-2.5 text-sm text-slate-700 font-semibold hover:bg-slate-50 hover:border-royal-100 transition">
              <Icon name="mdi:fingerprint" size="20" class="text-royal-800" />
              Sign in with Biometrics
            </button>
          </NuxtLink>

          <!-- Register -->
          <p class="text-center text-xs text-slate-500 mt-5">
            Don't have an account?
            <NuxtLink to="/alumni/register" class="font-bold text-royal-800 hover:underline">Register</NuxtLink>
          </p>
        </div>
      </div>
    </div>

    <!-- Bottom gold bar -->
    <div class="h-1 gold-accent w-full"></div>
  </div>
</template>

<script setup>
const studentNumber = ref('')
const password = ref('')
const showPassword = ref(false)
const isLoading = ref(false)
const router = useRouter()

const handleLogin = async () => {
  if (!studentNumber.value || !password.value) return
  isLoading.value = true
  await new Promise(r => setTimeout(r, 1200))
  isLoading.value = false
  router.push('/alumni/home')
}

const handleGoogleLogin = () => {
  router.push('/alumni/home')
}
</script>
