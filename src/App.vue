<template>
  <div class="min-h-screen bg-cream">

    <!-- 側邊欄 -->
    <SideBar />

     <!-- 主內容區：左邊留出收合狀態的寬度 (4rem = w-16) -->
    <main class="md:ml-16 pb-20 md:pb-0 transition-all duration-300">
      <RouterView />
    </main>

  </div>
</template>

<script setup lang="ts">
import SideBar from '@/components/Sidebar.vue'
</script>

<style>
body { background-color: #FFF8F0; }

::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #FFF8F0; }
::-webkit-scrollbar-thumb { background: #F4A261; border-radius: 99px; }
</style>