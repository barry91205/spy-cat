<template>
  <div
    class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
    @click.self="$emit('close')"
  >
    <div
      class="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl"
    >
      <div class="p-6">

        <div class="flex items-center justify-between mb-4">
  <button @click="$emit('close')" class="text-muted hover:text-paw transition-colors">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
    </svg>
  </button>

  <span class="text-base font-bold text-paw">發布協尋資訊</span>

  <button class="text-paw font-semibold text-sm hover:text-pawDark transition-colors">
    發布
  </button>
</div>

        <!-- 圖片上傳 -->
        <div class="mb-4">
          <input
            type="file"
            accept="image/*"
            class="hidden"
            ref="fileInput"
            @change="handleImage"
          />

          <!-- 預覽（有圖才顯示） -->
          <div v-if="previewUrl" class="relative mb-2 inline-block">
            <img :src="previewUrl" class="max-h-40 rounded-xl object-cover" />
            <button
              @click="clearImage"
              class="absolute top-1 right-1 bg-black/50 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center hover:bg-black/70"
            >
              ✕
            </button>
          </div>

          <!-- 上傳按鈕 -->
          <button
            @click="fileInput?.click()"
            class="flex items-center gap-1.5 text-sm text-muted rounded-xl px-3 py-1.5 hover:border-paw hover:text-paw transition-colors"
          >
            <span>📷</span>
          </button>
        </div>

        <div class="space-y-3">
          <input
            v-model="form.name"
            type="text"
            placeholder="貓咪名字（例如：小橘、咪咪）"
            class="field w-full border border-caramel rounded-xl px-3 py-2 text-sm"
          />

          <select
            v-model="form.status"
            class="field w-full border border-caramel rounded-xl px-3 py-2 text-sm"
          >
            <option value="" disabled>選擇狀態</option>
            <option value="lost">走失中</option>
            <option value="found">已找到（目擊）</option>
            <option value="looking">待認領</option>
          </select>

          <input
            v-model="form.location"
            type="text"
            placeholder="走失地點（例如：台北市大安區XX路）"
            class="field w-full border border-caramel rounded-xl px-3 py-2 text-sm"
          />

          <textarea
            v-model="form.desc"
            placeholder="貓咪描述：毛色、花紋、體型、特徵、項圈顏色..."
            rows="3"
            class="field w-full border border-caramel rounded-xl px-3 py-2 text-sm resize-none"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

defineEmits<{ close: [] }>();

const form = reactive({
  name: "",
  status: "lost",
  location: "",
  desc: "",
  contact: "",
});

const fileInput = ref<HTMLInputElement | null>(null);
const previewUrl = ref<string | null>(null);

function handleImage(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (file) previewUrl.value = URL.createObjectURL(file);
}

function clearImage() {
  previewUrl.value = null;
  if (fileInput.value) fileInput.value.value = "";
}
</script>

<style scoped>
.text-paw {
  color: #ff8c55;
}
.text-muted {
  color: #8b7355;
}
.bg-paw {
  background-color: #ff8c55;
}
.bg-pawDark {
  background-color: #e8723c;
}
.bg-warm {
  background-color: #fde8d8;
}
.bg-cream {
  background-color: #fff8f0;
}
.border-caramel {
  border-color: rgba(244, 162, 97, 0.4);
}

.field {
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}
.field:focus {
  outline: none;
  border-color: #ff8c55;
  box-shadow: 0 0 0 3px rgba(255, 140, 85, 0.2);
}
</style>
