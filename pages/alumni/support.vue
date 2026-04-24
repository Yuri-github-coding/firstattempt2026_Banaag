<template>
  <div class="min-h-screen bg-gray-50 pb-24 flex flex-col">
    <!-- Header -->
    <div class="bg-white px-5 pt-4 pb-4 flex items-center gap-3 shadow-sm">
      <NuxtLink to="/alumni/home" class="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
        <Icon name="mdi:arrow-left" size="20" class="text-gray-600" />
      </NuxtLink>
      <div>
        <h1 class="text-lg font-bold text-gray-900">Support Chat</h1>
        <p class="text-xs text-gray-500">AdDU Registrar's Office</p>
      </div>
      <div class="ml-auto flex items-center gap-1">
        <span class="w-2 h-2 bg-green-500 rounded-full"></span>
        <span class="text-xs text-green-600 font-medium">Online</span>
      </div>
    </div>

    <!-- Chat Area -->
    <div class="flex-1 px-5 py-5 space-y-4 overflow-y-auto">
      <!-- Bot greeting -->
      <div class="flex items-start gap-3">
        <div class="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center flex-shrink-0">
          <Icon name="mdi:robot-outline" size="16" class="text-white" />
        </div>
        <div class="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm max-w-xs">
          <p class="text-sm text-gray-800">Hello! I'm the AdDU Registrar's virtual assistant. How can I help you today?</p>
          <p class="text-xs text-gray-400 mt-1">Just now</p>
        </div>
      </div>

      <div class="flex items-start gap-3">
        <div class="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center flex-shrink-0">
          <Icon name="mdi:robot-outline" size="16" class="text-white" />
        </div>
        <div class="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm max-w-xs">
          <p class="text-sm text-gray-800">You can ask me about document requests, processing times, fees, or I can connect you with a staff member.</p>
          <p class="text-xs text-gray-400 mt-1">Just now</p>
        </div>
      </div>

      <!-- Quick replies -->
      <div class="flex flex-wrap gap-2 pl-11">
        <button
          v-for="q in quickReplies"
          :key="q"
          @click="sendQuick(q)"
          class="px-3 py-1.5 bg-blue-50 border border-blue-200 text-blue-800 text-xs font-medium rounded-full hover:bg-blue-100 transition"
        >
          {{ q }}
        </button>
      </div>

      <!-- Dynamic messages -->
      <div v-for="msg in messages" :key="msg.id">
        <!-- User message -->
        <div v-if="msg.from === 'user'" class="flex justify-end">
          <div class="bg-blue-900 rounded-2xl rounded-tr-none px-4 py-3 max-w-xs">
            <p class="text-sm text-white">{{ msg.text }}</p>
            <p class="text-xs text-blue-300 mt-1">Just now</p>
          </div>
        </div>
        <!-- Bot reply -->
        <div v-else class="flex items-start gap-3">
          <div class="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center flex-shrink-0">
            <Icon name="mdi:robot-outline" size="16" class="text-white" />
          </div>
          <div class="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm max-w-xs">
            <p class="text-sm text-gray-800">{{ msg.text }}</p>
            <p class="text-xs text-gray-400 mt-1">Just now</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Input -->
    <div class="bg-white border-t border-gray-100 px-5 py-3 flex gap-2">
      <input
        v-model="inputText"
        @keydown.enter="sendMessage"
        type="text"
        placeholder="Type a message..."
        class="flex-1 text-sm border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-800"
      />
      <button @click="sendMessage" class="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center">
        <Icon name="mdi:send" size="18" class="text-white" />
      </button>
    </div>
  </div>
</template>

<script setup>
const inputText = ref('')
const messages = ref([])
let idCounter = 0

const quickReplies = [
  'Track my request',
  'Processing fees',
  'Required documents',
  'Contact office',
]

const botReplies = {
  'Track my request': 'You can track your document requests under the "Process Documents" tab on your home screen.',
  'Processing fees': 'Fees vary by document: TOR - ₱150, Diploma Copy - ₱200, Certificate of Graduation - ₱100. Rush processing adds ₱200-₱300.',
  'Required documents': 'Most requests require a valid ID, proof of enrollment, and payment receipt. Specific requirements are shown when you select a document type.',
  'Contact office': 'You can reach the Registrar\'s Office at registrar@addu.edu.ph or call (082) 221-2411 during office hours (8AM–5PM, Mon–Fri).',
}

const sendQuick = (text) => {
  messages.value.push({ id: ++idCounter, from: 'user', text })
  setTimeout(() => {
    messages.value.push({
      id: ++idCounter,
      from: 'bot',
      text: botReplies[text] || 'Thank you for your message. A staff member will get back to you shortly.'
    })
  }, 800)
}

const sendMessage = () => {
  if (!inputText.value.trim()) return
  const text = inputText.value.trim()
  messages.value.push({ id: ++idCounter, from: 'user', text })
  inputText.value = ''
  setTimeout(() => {
    messages.value.push({
      id: ++idCounter,
      from: 'bot',
      text: 'Thanks for reaching out! Our team will respond to your query as soon as possible. For urgent concerns, please call (082) 221-2411.'
    })
  }, 1000)
}
</script>
