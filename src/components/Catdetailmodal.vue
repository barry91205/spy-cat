<template>
  <div class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" @click.self="$emit('close')">
    <div class="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">

      <!-- 圖片 -->
      <div class="relative">
        <img :src="cat.image" class="w-full h-56 object-cover rounded-t-3xl" />
        <button @click="$emit('close')" class="absolute top-3 right-3 bg-white/80 hover:bg-white rounded-full w-9 h-9 flex items-center justify-center text-lg font-bold">✕</button>
        <span :class="['absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full', statusClass]">
          {{ cat.statusLabel }}
        </span>
      </div>

      <div class="p-5">
        <div class="flex items-center justify-between mb-2">
          <h2 class="text-xl font-bold text-gray-800">{{ cat.name }}</h2>
          <span class="text-sm text-muted bg-warm px-3 py-1 rounded-full">{{ cat.breed }}</span>
        </div>
        <p class="text-sm text-gray-600 mb-4">{{ cat.desc }}</p>

        <div class="flex flex-col gap-1.5 mb-4">
          <div class="flex items-center gap-2 text-sm text-muted"><span>📍</span><span>{{ cat.location }}</span></div>
          <div class="flex items-center gap-2 text-sm text-muted"><span>🕐</span><span>{{ cat.date }}</span></div>
          <div class="flex items-center gap-2 text-sm text-muted"><span>📞</span><span>{{ cat.contact }}</span></div>
        </div>

        <!-- 留言區 -->
        <PawDivider />
        <h3 class="font-bold text-gray-700 mb-3">💬 留言 ({{ cat.comments }})</h3>

        <div class="space-y-3 mb-4">
          <div v-for="c in comments" :key="c.id" class="flex gap-3">
            <div class="w-8 h-8 rounded-full bg-warm flex items-center justify-center text-base flex-shrink-0">
              {{ c.avatar }}
            </div>
            <div class="flex-1 bg-cream rounded-2xl px-3 py-2">
              <div class="text-xs font-semibold text-paw mb-0.5">{{ c.name }}</div>
              <div class="text-sm text-gray-600">{{ c.text }}</div>
              <div class="text-xs text-muted mt-1">{{ c.time }}</div>
            </div>
          </div>
        </div>

        <!-- 發留言 -->
        <div class="flex gap-2">
          <input
            v-model="newComment"
            type="text"
            placeholder="留下你的訊息或目擊資訊..."
            class="search-input flex-1 border border-caramel bg-cream rounded-2xl px-3 py-2 text-sm transition-all"
            @keyup.enter="postComment"
          />
          <button @click="postComment" class="bg-paw hover:bg-pawDark text-white px-4 py-2 rounded-2xl text-sm font-semibold transition-colors">
            送出
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Cat, Comment } from '@/types/cat'
import PawDivider from '@/components/PawDivider.vue'

const props = defineProps<{ cat: Cat }>()
defineEmits<{ close: [] }>()

const newComment = ref('')
const comments = ref<Comment[]>([
  { id: 1, avatar: '🧑', name: '王小明', text: '我昨天在附近有看到類似的貓咪！在巷子裡，我拍了照片可以傳給你。', time: '2小時前' },
  { id: 2, avatar: '👩', name: '林美惠', text: '已分享到臉書社團，希望能盡快找到！加油！', time: '5小時前' },
  { id: 3, avatar: '🧓', name: '陳阿伯', text: '我家附近有放貓食，如果看到會通知你們。', time: '1天前' },
])



const statusClass = computed(() => ({
  lost:    'status-lost',
  found:   'status-found',
  looking: 'status-looking',
}[props.cat.status] ?? ''))

const postComment = () => {
  if (!newComment.value.trim()) return
  comments.value.unshift({
    id: Date.now(), avatar: '😊',
    name: '我', text: newComment.value, time: '剛剛',
  })
  props.cat.comments++
  newComment.value = ''
}
</script>

<style scoped>
.text-paw   { color: #FF8C55; }
.text-muted { color: #8B7355; }
.bg-paw     { background-color: #FF8C55; }
.bg-pawDark { background-color: #E8723C; }
.bg-warm    { background-color: #FDE8D8; }
.bg-cream   { background-color: #FFF8F0; }
.border-caramel { border-color: rgba(244,162,97,0.4); }

.status-lost    { background: #FEE2E2; color: #DC2626; }
.status-found   { background: #D1FAE5; color: #059669; }
.status-looking { background: #FEF3C7; color: #D97706; }

.search-input:focus {
  outline: none;
  border-color: #FF8C55;
  box-shadow: 0 0 0 3px rgba(255,140,85,0.2);
}
</style>