<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-10">
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
        <h1 class="text-2xl font-bold text-gray-900">Create Account</h1>
        <p class="text-sm text-gray-500 mt-1">Alumni Knights' Hub</p>
        <div class="w-8 h-0.5 bg-blue-800 mt-3"></div>
      </div>

      <div class="space-y-4">
        <!-- Full Name -->
        <div>
          <label class="text-xs font-semibold tracking-widest text-gray-500 uppercase">Full Name</label>
          <div class="mt-1 relative">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Icon name="mdi:account-outline" size="18" />
            </span>
            <input v-model="form.name" type="text" placeholder="Juan Dela Cruz"
              class="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-800 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800" />
          </div>
        </div>

        <!-- Student Number -->
        <div>
          <label class="text-xs font-semibold tracking-widest text-gray-500 uppercase">Student Number</label>
          <div class="mt-1 relative">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Icon name="mdi:card-account-details-outline" size="18" />
            </span>
            <input v-model="form.studentNumber" type="text" placeholder="e.g. 20210001"
              class="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-800 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800" />
          </div>
        </div>

        <!-- Email -->
        <div>
          <label class="text-xs font-semibold tracking-widest text-gray-500 uppercase">University Email</label>
          <div class="mt-1 relative">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Icon name="mdi:email-outline" size="18" />
            </span>
            <input v-model="form.email" type="email" placeholder="yourname@addu.edu.ph"
              class="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-800 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800" />
          </div>
        </div>

        <!-- Password -->
        <div>
          <label class="text-xs font-semibold tracking-widest text-gray-500 uppercase">Password</label>
          <div class="mt-1 relative">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Icon name="mdi:lock-outline" size="18" />
            </span>
            <input v-model="form.password" :type="showPassword ? 'text' : 'password'" placeholder="Create a strong password"
              class="w-full pl-9 pr-10 py-3 border border-gray-200 rounded-xl bg-white text-gray-800 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800" />
            <button @click="showPassword = !showPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <Icon :name="showPassword ? 'mdi:eye-off-outline' : 'mdi:eye-outline'" size="18" />
            </button>
          </div>
        </div>

        <!-- Confirm Password -->
        <div>
          <label class="text-xs font-semibold tracking-widest text-gray-500 uppercase">Confirm Password</label>
          <div class="mt-1 relative">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Icon name="mdi:lock-check-outline" size="18" />
            </span>
            <input v-model="form.confirmPassword" :type="showPassword ? 'text' : 'password'" placeholder="Re-enter password"
              class="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-800 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800" />
          </div>
        </div>

        <button
          @click="handleRegister"
          class="w-full py-3.5 rounded-xl font-bold text-white text-sm shadow-md transition-transform active:scale-95"
          style="background: linear-gradient(135deg, #1e3a6e 60%, #c9a84c 100%)"
        >
          Create Account
        </button>

        <p class="text-center text-xs text-gray-500">
          Already have an account?
          <NuxtLink to="/alumni/login" class="font-bold text-blue-800 hover:underline">Sign In</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const form = reactive({ name: '', studentNumber: '', email: '', password: '', confirmPassword: '' })
const showPassword = ref(false)
const router = useRouter()

const handleRegister = () => {
  if (form.name && form.studentNumber && form.email && form.password) {
    router.push('/alumni/home')
  }
}
</script>
