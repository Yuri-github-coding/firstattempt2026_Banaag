<template>
  <div class="min-h-screen bg-slate-50 pb-24">

    <!-- Hero Header -->
    <div class="royal-gradient relative overflow-hidden">
      <div class="h-0.5 gold-accent"></div>
      <!-- Decorative circles -->
      <div class="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/5"></div>
      <div class="absolute top-4 -right-4 w-20 h-20 rounded-full bg-white/5"></div>

      <div class="px-5 pt-5 pb-7 relative z-10">
        <div class="flex items-start justify-between mb-5">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-full bg-white/10 border-2 border-gold-500/50 flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 48 48" class="w-9 h-9" fill="none">
                <ellipse cx="24" cy="17" rx="9" ry="10" fill="#c9a84c"/>
                <path d="M10 44 Q17 28 24 32 Q31 28 38 44" fill="white" opacity="0.95"/>
                <ellipse cx="24" cy="15" r="4.5" fill="#1e3a6e" opacity="0.45"/>
              </svg>
            </div>
            <div>
              <p class="text-xs text-blue-300 font-medium uppercase tracking-wider">Welcome back</p>
              <h1 class="text-xl font-bold text-white leading-tight">
                Blue <span style="color: #c9a84c;">Knight</span>
              </h1>
              <p class="text-xs text-blue-200">Your verified academic records</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <NuxtLink to="/alumni/settings" class="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition">
              <Icon name="mdi:cog-outline" size="20" />
            </NuxtLink>
            <NuxtLink to="/alumni/profile" class="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition">
              <Icon name="mdi:account-outline" size="20" />
            </NuxtLink>
          </div>
        </div>

        <!-- Stats bar -->
        <div class="grid grid-cols-3 gap-2">
          <div class="bg-white/10 rounded-2xl p-3 text-center border border-white/10">
            <p class="text-lg font-bold text-white">3</p>
            <p class="text-[10px] text-blue-200 font-medium">Requests</p>
          </div>
          <div class="bg-white/10 rounded-2xl p-3 text-center border border-white/10">
            <p class="text-lg font-bold text-white">1</p>
            <p class="text-[10px] text-blue-200 font-medium">Ready</p>
          </div>
          <div class="bg-white/10 rounded-2xl p-3 text-center border border-white/10">
            <p class="text-lg font-bold" style="color: #c9a84c;">2</p>
            <p class="text-[10px] text-blue-200 font-medium">Pending</p>
          </div>
        </div>
      </div>
    </div>

    <div class="px-5 py-5 space-y-5">

      <!-- Quick Actions -->
      <section>
        <h2 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Quick Actions</h2>
        <div class="space-y-2.5">
          <NuxtLink to="/alumni/profile" class="card-hover flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <div class="flex items-center gap-3.5">
              <div class="w-11 h-11 rounded-2xl bg-royal-50 flex items-center justify-center flex-shrink-0">
                <Icon name="mdi:account-outline" size="22" class="text-royal-800" />
              </div>
              <div>
                <p class="text-sm font-bold text-slate-800">View Profile</p>
                <p class="text-xs text-slate-400">Access verified academic records</p>
              </div>
            </div>
            <div class="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center">
              <Icon name="mdi:chevron-right" size="18" class="text-slate-400" />
            </div>
          </NuxtLink>

          <NuxtLink to="/alumni/request-documents" class="card-hover flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <div class="flex items-center gap-3.5">
              <div class="w-11 h-11 rounded-2xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                <Icon name="mdi:file-plus-outline" size="22" class="text-emerald-600" />
              </div>
              <div>
                <p class="text-sm font-bold text-slate-800">Request Document</p>
                <p class="text-xs text-slate-400">Order transcripts & certifications</p>
              </div>
            </div>
            <div class="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center">
              <Icon name="mdi:chevron-right" size="18" class="text-slate-400" />
            </div>
          </NuxtLink>
        </div>
      </section>

      <!-- What You Can Do -->
      <section>
        <h2 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">What You Can Do</h2>
        <div class="grid grid-cols-2 gap-2.5">
          <NuxtLink to="/alumni/request-documents" class="card-hover bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col items-start gap-2.5">
            <div class="w-11 h-11 rounded-2xl bg-royal-50 flex items-center justify-center">
              <Icon name="mdi:file-document-outline" size="22" class="text-royal-800" />
            </div>
            <div>
              <p class="text-sm font-bold text-slate-800">Request Documents</p>
              <p class="text-xs text-slate-400 mt-0.5">Order transcripts</p>
            </div>
          </NuxtLink>

          <NuxtLink to="/alumni/process-documents" class="card-hover bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col items-start gap-2.5">
            <div class="w-11 h-11 rounded-2xl bg-amber-50 flex items-center justify-center">
              <Icon name="mdi:download-circle-outline" size="22" class="text-amber-600" />
            </div>
            <div>
              <p class="text-sm font-bold text-slate-800">Process Documents</p>
              <p class="text-xs text-slate-400 mt-0.5">Track pending</p>
            </div>
          </NuxtLink>

          <NuxtLink to="/alumni/guide" class="card-hover bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col items-start gap-2.5">
            <div class="w-11 h-11 rounded-2xl bg-violet-50 flex items-center justify-center">
              <Icon name="mdi:help-circle-outline" size="22" class="text-violet-600" />
            </div>
            <div>
              <p class="text-sm font-bold text-slate-800">Document Guide</p>
              <p class="text-xs text-slate-400 mt-0.5">Find what you need</p>
            </div>
          </NuxtLink>

          <NuxtLink to="/alumni/dashboard" class="card-hover bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col items-start gap-2.5">
            <div class="w-11 h-11 rounded-2xl bg-sky-50 flex items-center justify-center">
              <Icon name="mdi:view-dashboard-outline" size="22" class="text-sky-600" />
            </div>
            <div>
              <p class="text-sm font-bold text-slate-800">Dashboard</p>
              <p class="text-xs text-slate-400 mt-0.5">Request overview</p>
            </div>
          </NuxtLink>
        </div>
      </section>

      <!-- Need Help -->
      <NuxtLink to="/alumni/support" class="card-hover flex items-center justify-between rounded-2xl p-4 shadow-sm" style="background: linear-gradient(135deg, #059669, #047857);">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
            <Icon name="mdi:chat-outline" size="22" class="text-white" />
          </div>
          <div>
            <p class="text-sm font-bold text-white">Need Help?</p>
            <p class="text-xs text-emerald-100">Chat with our support team</p>
          </div>
        </div>
        <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
          <Icon name="mdi:arrow-right" size="18" class="text-white" />
        </div>
      </NuxtLink>

      <!-- Latest Notifications -->
      <section>
        <h2 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Latest Notifications</h2>
        <div class="space-y-2.5">
          <div class="bg-royal-800 rounded-2xl p-4 flex items-start gap-3 shadow-sm">
            <div class="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name="mdi:check-circle-outline" size="20" class="text-white" />
            </div>
            <div class="flex-1">
              <p class="text-sm font-bold text-white">Transcript Request Approved</p>
              <p class="text-xs text-blue-200 mt-0.5 leading-relaxed">Your Official Transcript of Records is ready for download</p>
              <div class="flex items-center gap-1 mt-2">
                <Icon name="mdi:clock-outline" size="12" class="text-blue-300" />
                <p class="text-[10px] text-blue-300">2 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Security Notice -->
      <div class="flex items-center gap-3 bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
        <div class="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0">
          <Icon name="mdi:shield-check-outline" size="18" class="text-slate-500" />
        </div>
        <p class="text-xs text-slate-400 leading-relaxed">All credentials are cryptographically secured and verified by the AdDU Registrar's Office</p>
      </div>

    </div>

    <BottomNav active="home" />
  </div>
</template>

<script setup>
</script>
