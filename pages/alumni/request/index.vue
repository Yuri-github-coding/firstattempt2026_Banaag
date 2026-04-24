<script setup>
const tab = ref('request')
</script>
<template>
<div>
<h2 class="text-xl font-bold mb-6">Requests</h2>
<div class="flex border-b mb-6">
<button @click="tab='request'" class="px-4 py-2">Request</button>
<button @click="tab='history'" class="px-4 py-2">History</button>
</div>
<div v-if="tab==='request'">
<select class="w-full p-3 border rounded-xl mb-3">
<option>Select Document</option>
</select>
<button class="w-full bg-[#003366] text-white py-3 rounded-xl">Verify Biometrics</button>
</div>
<div v-else>
<p>History Item</p>
</div>
</div>
</template>
