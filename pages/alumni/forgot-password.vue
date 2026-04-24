<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6">
    <div class="w-full max-w-sm">
      <!-- Header -->
      <div class="flex flex-col items-center mb-8">
        <div class="w-20 h-20 rounded-full bg-blue-900 flex items-center justify-center shadow-lg mb-4">
          <svg viewBox="0 0 80 80" class="w-16 h-16" fill="none">
            <ellipse cx="40" cy="30" rx="14" ry="16" fill="#c9a84c"/>
            <path d="M20 65 Q30 45 40 50 Q50 45 60 65" fill="#1e3a6e"/>
            <path d="M28 28 Q32 18 40 20 Q48 18 52 28 Q50 40 40 44 Q30 40 28 28Z" fill="#c9a84c"/>
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-gray-900">Reset Password</h1>
        <p class="text-sm text-gray-500 mt-1">Alumni Knights' Hub</p>
        <div class="w-8 h-0.5 bg-blue-800 mt-3"></div>
      </div>

      <p class="text-sm text-gray-600 text-center mb-6">
        Enter your student number or registered email and we'll send you a reset link.
      </p>

      <div class="space-y-4">
        <div>
          <label class="text-xs font-semibold tracking-widest text-gray-500 uppercase">Student Number / Email</label>
          <div class="mt-1 relative">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Icon name="mdi:account-outline" size="18" />
            </span>
            <input
              v-model="identifier"
              type="text"
              placeholder="e.g. 20210001 or email"
              class="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-800 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
            />
          </div>
        </div>

        <button
          @click="handleReset"
          class="w-full py-3.5 rounded-xl font-bold text-white text-sm shadow-md transition-transform active:scale-95"
          style="background: linear-gradient(135deg, #1e3a6e 60%, #c9a84c 100%)"
        >
          Send Reset Link
        </button>

        <NuxtLink to="/alumni/login" class="block text-center text-xs text-blue-800 hover:underline font-semibold">
          ← Back to Sign In
        </NuxtLink>
      </div>

      <!-- Success Message -->
      <div v-if="sent" class="mt-6 bg-green-50 border border-green-200 rounded-xl p-4 text-center">
        <Icon name="mdi:check-circle" size="24" class="text-green-500 mx-auto mb-1" />
        <p class="text-sm font-bold text-green-700">Reset link sent!</p>
        <p class="text-xs text-green-600">Check your registered email address.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const identifier = ref('')
const sent = ref(false)

const handleReset = () => {
  if (identifier.value) {
    sent.value = true
  }
}
</script>
