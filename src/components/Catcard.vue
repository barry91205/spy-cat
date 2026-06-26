<template>
  <div class="cat-card bg-white rounded-3xl overflow-hidden border border-warm cursor-pointer" @click="$emit('click')">
    <!-- 圖片 -->
    <div class="relative">
      <img :src="cat.image" :alt="cat.name" class="w-full h-48 object-cover" />
      <span :class="['absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full', statusClass]">
        {{ cat.statusLabel }}
      </span>
      <button
        class="absolute top-3 right-3 bg-white/80 hover:bg-white rounded-full w-8 h-8 flex items-center justify-center text-base transition-colors"
        @click.stop="$emit('toggle-fav')"
      >
        {{ cat.fav ? '❤️' : '🤍' }}
      </button>
    </div>

    <!-- 內容 -->
    <div class="p-4">
      <div class="flex items-start justify-between mb-1">
        <h3 class="font-bold text-gray-800 text-base">{{ cat.name }}</h3>
        <span class="text-xs text-muted bg-warm px-2 py-0.5 rounded-full">{{ cat.breed }}</span>
      </div>
      <p class="text-sm text-muted mb-3 line-clamp-2">{{ cat.desc }}</p>

      <div class="flex items-center gap-1 text-xs text-muted mb-1">
        <span>📍</span><span>{{ cat.location }}</span>
      </div>
      <div class="flex items-center gap-1 text-xs text-muted">
        <span>🕐</span><span>{{ cat.date }}</span>
      </div>

      <div class="flex items-center justify-between mt-3 pt-3 border-t border-warm">
        <span class="text-xs text-muted flex items-center gap-1">
          💬 {{ cat.comments }} 則留言
        </span>
        <span class="text-xs text-paw font-semibold">查看詳情 →</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Cat } from '@/types/cat'

const props = defineProps<{ cat: Cat }>()
defineEmits<{ click: []; 'toggle-fav': [] }>()

const statusClass = computed(() => ({
  lost:    'status-lost',
  found:   'status-found',
  looking: 'status-looking',
}[props.cat.status] ?? ''))
</script>

<style scoped>
.text-paw   { color: #FF8C55; }
.text-muted { color: #8B7355; }
.bg-warm    { background-color: #FDE8D8; }
.border-warm { border-color: #FDE8D8; }

.status-lost    { background: #FEE2E2; color: #DC2626; }
.status-found   { background: #D1FAE5; color: #059669; }
.status-looking { background: #FEF3C7; color: #D97706; }

.cat-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
.cat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(255,140,85,0.18);
}
</style>