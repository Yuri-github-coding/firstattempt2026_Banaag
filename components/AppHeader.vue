<template>
  <header class="royal-gradient text-white sticky top-0 z-40">
    <div class="h-0.5 gold-accent"></div>
    <div class="px-5 py-3.5 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 36 36" class="w-6 h-6" fill="none">
            <ellipse cx="18" cy="12" rx="6" ry="7" fill="#c9a84c"/>
            <path d="M8 32 Q13 20 18 23 Q23 20 28 32" fill="white" opacity="0.9"/>
            <circle cx="18" cy="11" r="3" fill="#1e3a6e" opacity="0.4"/>
          </svg>
        </div>
        <div>
          <h1 class="text-sm font-bold leading-tight tracking-wide">Alumni Knights' Hub</h1>
          <p class="text-xs text-blue-200 font-medium">Ateneo de Davao University</p>
        </div>
      </div>
      <slot name="right" />
    </div>
  </header>
</template>