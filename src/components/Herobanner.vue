<template>
  <div class="bg-gradient-to-br from-warm via-cream to-orange-50 py-12 px-4 text-center">
    <div class="max-w-2xl mx-auto">
      <div class="text-5xl mb-3">🐱</div>
      <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
        找回每一隻走失的毛孩
      </h1>
      <p class="text-muted text-base mb-6">
        一起幫助貓咪回家 ♥ 上傳照片、留言協助、愛心接力
      </p>

      <!-- 搜尋列 -->
      <div class="flex gap-2 max-w-lg mx-auto">
        <input
          :value="search"
          @input="$emit('update:search', ($event.target as HTMLInputElement).value)"
          type="text"
          placeholder="搜尋貓咪名字、地點、特徵..."
          class="search-input flex-1 border border-caramel bg-white rounded-2xl px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 transition-all"
        />
        <button class="bg-paw hover:bg-pawDark text-white px-5 py-2.5 rounded-2xl text-sm font-semibold transition-colors">
          搜尋
        </button>
      </div>

      <!-- 統計數字 -->
      <div class="flex justify-center gap-8 mt-8 text-center">
        <div>
          <div class="text-2xl font-bold text-paw">128</div>
          <div class="text-xs text-muted mt-0.5">協尋中</div>
        </div>
        <div class="w-px bg-caramel opacity-30"></div>
        <div>
          <div class="text-2xl font-bold text-green-500">94</div>
          <div class="text-xs text-muted mt-0.5">已找到</div>
        </div>
        <div class="w-px bg-caramel opacity-30"></div>
        <div>
          <div class="text-2xl font-bold text-caramel">2,341</div>
          <div class="text-xs text-muted mt-0.5">愛心留言</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ search: string }>()
defineEmits<{ 'update:search': [value: string] }>()
</script>

<style scoped>
.bg-warm     { background-color: #FDE8D8; }
.bg-cream    { background-color: #FFF8F0; }
.text-muted  { color: #8B7355; }
.text-paw    { color: #FF8C55; }
.text-caramel { color: #F4A261; }
.bg-paw      { background-color: #FF8C55; }
.bg-pawDark  { background-color: #E8723C; }
.bg-caramel  { background-color: #F4A261; }
.border-caramel { border-color: rgba(244,162,97,0.4); }

.search-input:focus {
  outline: none;
  border-color: #FF8C55;
  box-shadow: 0 0 0 3px rgba(255,140,85,0.2);
}
</style>