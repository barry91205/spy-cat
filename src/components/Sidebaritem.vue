<template>
  <button
    :class="[
      'flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all w-full relative',
      expanded ? '' : 'justify-center',
      active
        ? 'bg-warm text-paw font-semibold'
        : 'text-muted hover:bg-warm/60 hover:text-paw'
    ]"
  >
    <span class="text-xl flex-shrink-0">{{ item.icon }}</span>
    <span v-if="expanded" class="text-sm whitespace-nowrap overflow-hidden">{{ item.label }}</span>

    <!-- 通知紅點 -->
    <span
      v-if="item.badge"
      :class="[
        'bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0',
        expanded ? 'ml-auto w-5 h-5' : 'absolute top-1 right-1 w-4 h-4'
      ]"
    >
      {{ item.badge }}
    </span>

    <!-- 收合時的 tooltip -->
    <div v-if="!expanded" class="tooltip">
      {{ item.label }}
      <span v-if="item.badge" class="ml-1 bg-red-500 text-white text-xs px-1 rounded-full">{{ item.badge }}</span>
    </div>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  item: { icon: string; label: string; path: string; badge?: number }
  expanded: boolean
  active: boolean
}>()
</script>

<style scoped>
.text-paw   { color: #FF8C55; }
.text-muted { color: #8B7355; }
.bg-warm    { background-color: #FDE8D8; }

/* Tooltip（收合時滑過顯示） */
.tooltip {
  position: absolute;
  left: calc(100% + 0.75rem);
  top: 50%;
  transform: translateY(-50%);
  background: #3f3f3f;
  color: white;
  font-size: 0.75rem;
  padding: 0.3rem 0.6rem;
  border-radius: 0.5rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s;
  z-index: 99;
}
button:hover .tooltip {
  opacity: 1;
}
</style>