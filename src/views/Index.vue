<template>
  <div class="min-h-screen" style="background-color: #FFF8F0; font-family: 'Noto Sans TC', sans-serif;">

    <!-- 頂部 bar -->
<div class="sticky top-1 rounded z-10 bg-white border-b border-caramel/20 px-4 py-3 flex items-center justify-between max-w-lg mx-auto w-full">
  <span class="text-xl font-bold text-paw">🐾 偵探貓</span>
  <button @click="showPostModal = true" class="text-muted hover:text-paw transition-colors">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
    </svg>
  </button>
</div>

    <!-- Feed -->
    <div class="max-w-lg mx-auto px-4 py-4 mt-4 flex flex-col gap-5">
      <div
        v-for="cat in cats" :key="cat.id"
        class="bg-white rounded-2xl overflow-hidden shadow-sm"
        @click="openDetail(cat)"
      >
        <!-- 頂部：名字 + 狀態 -->
        <div class="flex items-center justify-between px-4 pt-3 pb-2">
          <div>
            <span class="font-semibold text-gray-800 text-sm">{{ cat.name }}</span>
            <span class="text-gray-400 text-xs ml-2">{{ cat.breed }}</span>
          </div>
          <span :class="statusClass(cat.status)" class="text-xs font-semibold px-2.5 py-1 rounded-full">
            {{ cat.statusLabel }}
          </span>
        </div>

        <!-- 照片 -->
        <img :src="cat.image" :alt="cat.name" class="w-full aspect-square object-cover" />

        <!-- 底部資訊 -->
        <div class="px-4 py-3 flex flex-col gap-1.5">
          <!-- 愛心 + 留言 -->
          <div class="flex items-center gap-4 text-gray-500 text-sm">
            <button @click.stop="toggleFav(cat)" class="flex items-center gap-1 transition-colors" :class="cat.fav ? 'text-red-500' : 'hover:text-red-400'">
              <span>{{ cat.fav ? '❤️' : '🤍' }}</span>
            </button>
            <span class="flex items-center gap-1">
              <span>💬</span>
              <span>{{ cat.comments }}</span>
            </span>
          </div>

          <!-- 地點 + 日期 -->
          <div class="flex items-center gap-1 text-xs text-gray-400">
            <span>📍</span>
            <span>{{ cat.location }}</span>
            <span class="mx-1">·</span>
            <span>{{ cat.date }}</span>
          </div>

          <!-- 描述 -->
          <p class="text-sm text-gray-600 leading-relaxed line-clamp-2">{{ cat.desc }}</p>
        </div>
      </div>
    </div>

    <!-- 浮動發布按鈕 -->
    <button
      @click="showPostModal = true"
      class="fixed bottom-8 right-8 z-50 bg-paw hover:bg-pawDark text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg transition-colors"
    >
      ＋
    </button>

    <!-- 詳情 Modal -->
    <CatDetailModal v-if="selectedCat" :cat="selectedCat" @close="selectedCat = null" />
    <PostModal v-if="showPostModal" @close="showPostModal = false" />

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CatDetailModal from '@/components/Catdetailmodal.vue'
import PostModal from '@/components/Postmodal.vue'
import type { Cat } from '@/types/cat'

const selectedCat = ref<Cat | null>(null)
const showPostModal = ref(false)

const openDetail = (cat: Cat) => { selectedCat.value = cat }
const toggleFav = (cat: Cat) => { cat.fav = !cat.fav }

function statusClass(status: string) {
  return {
    lost:    'bg-red-100 text-red-600',
    found:   'bg-green-100 text-green-600',
    looking: 'bg-yellow-100 text-yellow-700',
  }[status] ?? ''
}

const cats = ref<Cat[]>([
  {
    id: 1, name: '小橘', breed: '橘貓',
    status: 'lost', statusLabel: '走失中',
    image: 'https://placecats.com/300/200',
    desc: '橘白花色，左耳有缺口，非常親人，走失前戴著藍色項圈，請幫忙留意！',
    location: '台北市大安區', date: '2026/06/12',
    contact: '0912-345-678', comments: 8, fav: false,
  },
  {
    id: 2, name: '咪咪', breed: '三花貓',
    status: 'found', statusLabel: '已目擊',
    image: 'https://placecats.com/millie/300/200',
    desc: '三花花色，在信義區附近出沒，疑似走失貓咪，狀況良好，請認識的人聯絡。',
    location: '台北市信義區', date: '2026/06/13',
    contact: '0923-456-789', comments: 3, fav: false,
  },
  {
    id: 3, name: '豆腐', breed: '白貓',
    status: 'looking', statusLabel: '待認領',
    image: 'https://placecats.com/neo/300/200',
    desc: '全白色短毛，藍眼睛，在中山區被好心人拾獲，目前暫時安置中，尋找主人。',
    location: '台北市中山區', date: '2026/06/10',
    contact: '0934-567-890', comments: 12, fav: false,
  },
  {
    id: 4, name: '阿黑', breed: '黑貓',
    status: 'lost', statusLabel: '走失中',
    image: 'https://placecats.com/bella/300/200',
    desc: '全黑色，眼睛黃色，體型偏瘦，走失時沒有戴項圈，非常膽小怕生。',
    location: '新北市板橋區', date: '2026/06/11',
    contact: '0945-678-901', comments: 5, fav: false,
  },
])
</script>