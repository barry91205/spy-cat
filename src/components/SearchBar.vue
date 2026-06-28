<template>
  <div class="flex gap-2 max-w-lg mx-auto">
    <input
      :value="search"
      @input="handleInput($event)"
      @keyup.enter="$emit('search')"
      type="text"
      placeholder="搜尋貓咪名字、地點、特徵..."
      class="search-input flex-1 border border-caramel bg-white rounded-2xl px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 transition-all"
    />
    <button
      class="bg-paw hover:bg-pawDark text-white px-5 py-2.5 rounded-2xl text-sm font-semibold transition-colors"
      @click="$emit('search')"
    >
      搜尋
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ search: string }>()

const emit = defineEmits<{
  'update:search': [value: string]
  'search': []
}>()

function handleInput(event: Event) {
  const input = event.target as HTMLInputElement
  emit('update:search', input.value)
}
</script>

<style scoped>
.bg-paw {
  background-color: #ff8c55;
}
</style>