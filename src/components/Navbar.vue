<template>
  <nav class="bg-white shadow-sm sticky top-0 z-40 border-b border-warm">
    <div class="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
      <!-- Logo -->
      <a href="#" class="flex items-center gap-2">
        <span class="text-2xl">🐾</span>
        <span class="text-xl font-bold text-paw tracking-wide">貓咪協尋</span>
      </a>

      <!-- 導覽連結 -->
      <div class="hidden md:flex items-center gap-6 text-muted font-medium">
        <a href="#" class="nav-link hover:text-paw transition-colors">首頁</a>
        <a href="#" class="nav-link hover:text-paw transition-colors">協尋地圖</a>
        <a href="#" class="nav-link hover:text-paw transition-colors">成功案例</a>
        <a href="#" class="nav-link hover:text-paw transition-colors">關於我們</a>
      </div>

      <!-- 按鈕 -->
      <div class="flex items-center gap-2">
        <button class="text-muted font-medium px-3 py-1.5 rounded-xl hover:bg-warm transition-colors text-sm">
          登入
        </button>
        <button
          @click="$emit('open-post')"
          class="bg-paw hover:bg-pawDark text-white font-semibold px-4 py-1.5 rounded-xl text-sm transition-colors"
        >
          ＋ 發布協尋
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
defineEmits<{ 'open-post': [] }>()
</script>

<style scoped>
.text-paw    { color: #FF8C55; }
.text-muted  { color: #8B7355; }
.bg-paw      { background-color: #FF8C55; }
.bg-pawDark  { background-color: #E8723C; }
.bg-warm     { background-color: #FDE8D8; }
.border-warm { border-color: #FDE8D8; }

.nav-link { position: relative; }
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px; left: 0;
  width: 0; height: 2px;
  background: #FF8C55;
  transition: width 0.25s;
}
.nav-link:hover::after { width: 100%; }
</style>