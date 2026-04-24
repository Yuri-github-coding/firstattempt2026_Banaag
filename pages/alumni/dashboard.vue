<template>
  <div class="min-h-screen bg-gray-50 pb-24">
    <!-- Header -->
    <div class="bg-white px-5 pt-4 pb-4 flex items-center gap-3 shadow-sm">
      <NuxtLink to="/alumni/home" class="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
        <Icon name="mdi:arrow-left" size="20" class="text-gray-600" />
      </NuxtLink>
      <h1 class="text-lg font-bold text-gray-900">Dashboard</h1>
    </div>

    <div class="px-5 py-5 space-y-6">
      <!-- Welcome Section -->
      <div class="bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-2xl p-6 shadow-sm">
        <h2 class="text-2xl font-bold mb-2">Welcome Back, Alumni!</h2>
        <p class="text-blue-100">Manage your requests and track your status</p>
      </div>

      <!-- Tab Navigation -->
      <div class="flex gap-4 border-b border-gray-200">
        <button
          @click="activeTab = 'request'"
          :class="[
            'pb-4 px-2 transition-all font-semibold',
            activeTab === 'request' ? 'tab-active' : 'tab-inactive'
          ]"
        >
          <Icon name="mdi:plus-circle" size="20" class="inline mr-2" />
          New Request
        </button>
        <button
          @click="activeTab = 'status'"
          :class="[
            'pb-4 px-2 transition-all font-semibold',
            activeTab === 'status' ? 'tab-active' : 'tab-inactive'
          ]"
        >
          <Icon name="mdi:history" size="20" class="inline mr-2" />
          Status
        </button>
      </div>

      <!-- New Request Tab -->
      <div v-if="activeTab === 'request'" class="space-y-4">
        <StatusCard
          title="Request a Document"
          description="Submit a new document request to the Registrar's Office."
          status="available"
        />
        <NuxtLink to="/alumni/request-documents">
          <button class="w-full py-3.5 rounded-xl font-bold text-white text-sm bg-blue-900 hover:bg-blue-800 transition flex items-center justify-center gap-2">
            <Icon name="mdi:plus-circle" size="18" />
            Start New Request
          </button>
        </NuxtLink>
        <NuxtLink to="/alumni/guide">
          <button class="w-full py-3.5 rounded-xl font-semibold text-blue-900 text-sm border border-blue-200 bg-white hover:bg-blue-50 transition flex items-center justify-center gap-2">
            <Icon name="mdi:help-circle-outline" size="18" />
            Help me choose a document
          </button>
        </NuxtLink>
      </div>

      <!-- Status Tab -->
      <div v-if="activeTab === 'status'" class="space-y-4">
        <StatusCard
          title="Official Transcript of Records"
          description="Request ID: #TOR-2024-0342 - Pending Upload"
          status="pending"
        />
        <StatusCard
          title="Certificate of Graduation"
          description="Request ID: #COG-2024-0521 - Ready for Download"
          status="ready"
        />
        <NuxtLink to="/alumni/process-documents">
          <button class="w-full py-3.5 rounded-xl font-bold text-white text-sm bg-blue-900 hover:bg-blue-800 transition flex items-center justify-center gap-2">
            <Icon name="mdi:download" size="18" />
            View All Documents
          </button>
        </NuxtLink>
      </div>
    </div>

    <BottomNav active="home" />
  </div>
</template>

<script setup>
const activeTab = ref('request')
</script>
