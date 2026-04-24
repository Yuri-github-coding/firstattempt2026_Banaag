<template>
  <div class="min-h-screen bg-gray-50 pb-24">
    <!-- Header -->
    <div class="bg-white px-5 pt-4 pb-4 flex items-center gap-3 shadow-sm">
      <NuxtLink to="/alumni/home" class="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
        <Icon name="mdi:arrow-left" size="20" class="text-gray-600" />
      </NuxtLink>
      <h1 class="text-lg font-bold text-gray-900">Settings</h1>
    </div>

    <div class="px-5 py-5 space-y-4">
      <!-- Account Section -->
      <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
        <p class="text-xs font-bold text-gray-400 uppercase tracking-wide px-4 pt-4 pb-2">Account</p>
        <div class="divide-y divide-gray-50">
          <button class="w-full flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 transition">
            <div class="flex items-center gap-3">
              <Icon name="mdi:account-edit-outline" size="20" class="text-blue-800" />
              <span class="text-sm font-medium text-gray-800">Edit Profile</span>
            </div>
            <Icon name="mdi:chevron-right" size="18" class="text-gray-300" />
          </button>
          <button class="w-full flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 transition">
            <div class="flex items-center gap-3">
              <Icon name="mdi:lock-reset" size="20" class="text-blue-800" />
              <span class="text-sm font-medium text-gray-800">Change Password</span>
            </div>
            <Icon name="mdi:chevron-right" size="18" class="text-gray-300" />
          </button>
          <button class="w-full flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 transition">
            <div class="flex items-center gap-3">
              <Icon name="mdi:email-edit-outline" size="20" class="text-blue-800" />
              <span class="text-sm font-medium text-gray-800">Update Email</span>
            </div>
            <Icon name="mdi:chevron-right" size="18" class="text-gray-300" />
          </button>
        </div>
      </div>

      <!-- Security Section -->
      <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
        <p class="text-xs font-bold text-gray-400 uppercase tracking-wide px-4 pt-4 pb-2">Security</p>
        <div class="divide-y divide-gray-50">
          <div class="flex items-center justify-between px-4 py-3.5">
            <div class="flex items-center gap-3">
              <Icon name="mdi:fingerprint" size="20" class="text-blue-800" />
              <div>
                <span class="text-sm font-medium text-gray-800 block">Biometric Login</span>
                <span class="text-xs text-gray-500">Use fingerprint or face ID</span>
              </div>
            </div>
            <button
              @click="biometric = !biometric"
              :class="biometric ? 'bg-blue-800' : 'bg-gray-200'"
              class="w-11 h-6 rounded-full relative transition-colors"
            >
              <span
                :class="biometric ? 'translate-x-5' : 'translate-x-1'"
                class="absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform"
              ></span>
            </button>
          </div>
          <div class="flex items-center justify-between px-4 py-3.5">
            <div class="flex items-center gap-3">
              <Icon name="mdi:two-factor-authentication" size="20" class="text-blue-800" />
              <div>
                <span class="text-sm font-medium text-gray-800 block">Two-Factor Auth</span>
                <span class="text-xs text-gray-500">Add extra security layer</span>
              </div>
            </div>
            <button
              @click="twoFactor = !twoFactor"
              :class="twoFactor ? 'bg-blue-800' : 'bg-gray-200'"
              class="w-11 h-6 rounded-full relative transition-colors"
            >
              <span
                :class="twoFactor ? 'translate-x-5' : 'translate-x-1'"
                class="absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform"
              ></span>
            </button>
          </div>
        </div>
      </div>

      <!-- Notifications Section -->
      <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
        <p class="text-xs font-bold text-gray-400 uppercase tracking-wide px-4 pt-4 pb-2">Notifications</p>
        <div class="divide-y divide-gray-50">
          <div class="flex items-center justify-between px-4 py-3.5">
            <div class="flex items-center gap-3">
              <Icon name="mdi:bell-outline" size="20" class="text-blue-800" />
              <span class="text-sm font-medium text-gray-800">Push Notifications</span>
            </div>
            <button
              @click="pushNotif = !pushNotif"
              :class="pushNotif ? 'bg-blue-800' : 'bg-gray-200'"
              class="w-11 h-6 rounded-full relative transition-colors"
            >
              <span
                :class="pushNotif ? 'translate-x-5' : 'translate-x-1'"
                class="absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform"
              ></span>
            </button>
          </div>
          <div class="flex items-center justify-between px-4 py-3.5">
            <div class="flex items-center gap-3">
              <Icon name="mdi:email-outline" size="20" class="text-blue-800" />
              <span class="text-sm font-medium text-gray-800">Email Notifications</span>
            </div>
            <button
              @click="emailNotif = !emailNotif"
              :class="emailNotif ? 'bg-blue-800' : 'bg-gray-200'"
              class="w-11 h-6 rounded-full relative transition-colors"
            >
              <span
                :class="emailNotif ? 'translate-x-5' : 'translate-x-1'"
                class="absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform"
              ></span>
            </button>
          </div>
        </div>
      </div>

      <!-- Sign Out -->
      <NuxtLink to="/alumni/login" class="block">
        <button class="w-full py-3.5 rounded-xl font-bold text-red-500 text-sm flex items-center justify-center gap-2 border border-red-200 bg-white hover:bg-red-50 transition">
          <Icon name="mdi:logout" size="18" />
          Sign Out
        </button>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const biometric = ref(false)
const twoFactor = ref(false)
const pushNotif = ref(true)
const emailNotif = ref(true)
</script>
