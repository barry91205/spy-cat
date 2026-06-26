<template>
  <div class="min-h-screen" style="background-color: #FFF8F0; font-family: 'Noto Sans TC', sans-serif;">

    <!-- 導覽列 -->
    <!-- <NavBar @open-post="showPostModal = true" /> -->

    <!-- Hero Banner -->
    <HeroBanner v-model:search="searchQuery" />

    <!-- 篩選標籤 -->
    <div class="max-w-5xl mx-auto px-4 mt-6">
      <div class="flex gap-2 flex-wrap">
        <button
          v-for="f in filters" :key="f.value"
          @click="activeFilter = f.value"
          :class="[
            'px-4 py-1.5 rounded-full text-sm font-medium border transition-all',
            activeFilter === f.value
              ? 'bg-paw text-white border-paw shadow-sm'
              : 'bg-white text-muted border-caramel/30 hover:border-paw hover:text-paw'
          ]"
        >
          {{ f.label }}
        </button>
      </div>
      <PawDivider class="mt-4" />
    </div>

    <!-- 卡片列表 -->
    <div class="max-w-5xl mx-auto px-4 pb-24">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        <CatCard
          v-for="cat in filteredCats" :key="cat.id"
          :cat="cat"
          @click="openDetail(cat)"
          @toggle-fav="toggleFav(cat)"
        />
      </div>

      <!-- 空狀態 -->
      <div v-if="filteredCats.length === 0" class="text-center py-20">
        <div class="text-5xl mb-4">🐾</div>
        <p class="text-muted text-base">目前沒有符合條件的貓咪</p>
        <p class="text-muted text-sm mt-1">試試看其他篩選條件？</p>
      </div>
    </div>

    <!-- 手機版浮動按鈕 -->
    <button
      @click="showPostModal = true"
      class="fab md:hidden bg-paw text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold fixed bottom-8 right-8 z-50"
    >
      ＋
    </button>

    <!-- 詳情 Modal -->
    <CatDetailModal
      v-if="selectedCat"
      :cat="selectedCat"
      @close="selectedCat = null"
    />

    <!-- 發布 Modal -->
    <PostModal
      v-if="showPostModal"
      @close="showPostModal = false"
    />

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import NavBar from '@/components/Navbar.vue'
import HeroBanner from '@/components/Herobanner.vue'
import PawDivider from '@/components/PawDivider.vue'
import CatCard from '@/components/Catcard.vue'
import CatDetailModal from '@/components/Catdetailmodal.vue'
import PostModal from '@/components/Postmodal.vue'

type Cat = {
  id: number
  name: string
  breed: string
  status: string
  statusLabel: string
  image: string
  desc: string
  location: string
  date: string
  contact: string
  comments: number
  fav: boolean
}

const searchQuery  = ref('')
const activeFilter = ref('all')
const selectedCat  = ref<Cat | null>(null)
const showPostModal = ref(false)

const filters = [
  { label: '全部',        value: 'all'     },
  { label: '🔴 走失中',   value: 'lost'    },
  { label: '🟢 已目擊',   value: 'found'   },
  { label: '🟡 待認領',   value: 'looking' },
]

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
  {
    id: 5, name: '糰子', breed: '布偶貓',
    status: 'lost', statusLabel: '走失中',
    image: 'https://placecats.com/neo_2/300/200',
    desc: '布偶貓，藍眼睛，毛長且蓬鬆，臉部有深色花紋，非常溫馴，走失已三天。',
    location: '台北市松山區', date: '2026/06/09',
    contact: '0956-789-012', comments: 21, fav: false,
  },
  {
    id: 6, name: '虎斑', breed: '虎斑貓',
    status: 'found', statusLabel: '已目擊',
    image: 'https://placecats.com/millie_neo/300/200',
    desc: '棕色虎斑花紋，在文山區動物園附近多次被目擊，疑似走失中，請主人聯繫。',
    location: '台北市文山區', date: '2026/06/14',
    contact: '0967-890-123', comments: 7, fav: false,
  },
])

const filteredCats = computed(() => {
  let list = cats.value
  if (activeFilter.value !== 'all') {
    list = list.filter((cat: Cat) => cat.status === activeFilter.value)
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter((cat: Cat) =>
      cat.name.includes(q) || cat.location.includes(q) ||
      cat.desc.includes(q)  || cat.breed.includes(q)
    )
  }
  return list
})

const openDetail = (cat: Cat) => { selectedCat.value = cat }
const toggleFav  = (cat: Cat) => { cat.fav = !cat.fav }
</script>

<style scoped>
.bg-paw       { background-color: #FF8C55; }
.border-paw   { border-color: #FF8C55; }
.text-paw     { color: #FF8C55; }
.text-muted   { color: #8B7355; }
.border-caramel\/30 { border-color: rgba(244,162,97,0.3); }

.fab { box-shadow: 0 8px 24px rgba(255,140,85,0.4); transition: transform 0.2s, box-shadow 0.2s; }
.fab:hover { transform: scale(1.08); box-shadow: 0 12px 32px rgba(255,140,85,0.5); }
</style>