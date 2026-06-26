<template>
  <div class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" @click.self="$emit('close')">
    <div class="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
      <div class="p-6">
        <h2 class="text-xl font-bold text-gray-800 mb-1">發布協尋資訊 🐱</h2>
        <p class="text-sm text-muted mb-4">填寫越詳細，找回的機會越大！</p>

        <!-- 圖片上傳 -->
        <label class="block border-2 border-dashed border-caramel rounded-2xl p-6 text-center mb-4 hover:border-paw transition-colors cursor-pointer bg-cream">
          <input type="file" accept="image/*" class="hidden" @change="handleImage" />
          <div v-if="!previewUrl">
            <div class="text-3xl mb-2">📷</div>
            <p class="text-sm text-muted">點擊上傳貓咪照片</p>
            <p class="text-xs text-muted/70 mt-1">支援 JPG、PNG，最大 10MB</p>
          </div>
          <img v-else :src="previewUrl" class="mx-auto max-h-40 rounded-xl object-cover" />
        </label>

        <div class="space-y-3">
          <div>
            <label class="text-sm font-medium text-gray-700 mb-1 block">貓咪名字</label>
            <input v-model="form.name" type="text" placeholder="例如：小橘、咪咪"
              class="field w-full border border-caramel bg-cream rounded-xl px-3 py-2 text-sm" />
          </div>
          <div>
            <label class="text-sm font-medium text-gray-700 mb-1 block">狀態</label>
            <select v-model="form.status" class="field w-full border border-caramel bg-cream rounded-xl px-3 py-2 text-sm">
              <option value="lost">走失中</option>
              <option value="found">已找到（目擊）</option>
              <option value="looking">待認領</option>
            </select>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-700 mb-1 block">走失地點</label>
            <input v-model="form.location" type="text" placeholder="例如：台北市大安區XX路"
              class="field w-full border border-caramel bg-cream rounded-xl px-3 py-2 text-sm" />
          </div>
          <div>
            <label class="text-sm font-medium text-gray-700 mb-1 block">貓咪描述</label>
            <textarea v-model="form.desc" placeholder="毛色、花紋、體型、特徵、項圈顏色..." rows="3"
              class="field w-full border border-caramel bg-cream rounded-xl px-3 py-2 text-sm resize-none"></textarea>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-700 mb-1 block">聯絡方式</label>
            <input v-model="form.contact" type="text" placeholder="電話或 LINE ID"
              class="field w-full border border-caramel bg-cream rounded-xl px-3 py-2 text-sm" />
          </div>
        </div>

        <div class="flex gap-2 mt-5">
          <button @click="$emit('close')"
            class="flex-1 border border-caramel/40 text-muted py-2.5 rounded-xl text-sm font-medium hover:bg-warm transition-colors">
            取消
          </button>
          <button @click="submit"
            class="flex-1 bg-paw hover:bg-pawDark text-white py-2.5 rounded-xl text-sm font-semibold transition-colors">
            發布協尋
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

defineEmits<{ close: [] }>()

const previewUrl = ref<string | null>(null)
const form = reactive({
  name: '', status: 'lost', location: '', desc: '', contact: '',
})

const handleImage = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  previewUrl.value = URL.createObjectURL(file)
}

const submit = () => {
  // TODO: 串接 Node.js API
  console.log('送出表單', form)
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

.field { transition: border-color 0.2s, box-shadow 0.2s; }
.field:focus {
  outline: none;
  border-color: #FF8C55;
  box-shadow: 0 0 0 3px rgba(255,140,85,0.2);
}
</style>