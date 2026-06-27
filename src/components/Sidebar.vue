<template>
  <!-- 電腦版側邊欄 -->
  <aside
    class="sidebar hidden md:flex flex-col fixed left-0 top-0 h-full bg-white border-r border-warm z-40"
    @mouseenter="expanded = true"
    @mouseleave="expanded = false"
  >
    <!-- Logo -->
    <div class="flex items-center gap-3 px-4 py-5 border-b border-warm overflow-hidden">
      <span class="text-2xl flex-shrink-0">🐾</span>
      <span class="label font-bold text-paw text-lg whitespace-nowrap">貓咪協尋</span>
    </div>

    <!-- 導覽項目 -->
    <nav class="flex-1 py-4 flex flex-col gap-1 px-2">
      <SidebarItem
        v-for="item in navItems" :key="item.path"
        :item="item"
        :expanded="expanded"
        :active="$route.path === item.path"
        @click="handleNav(item)"
      />
    </nav>

    <!-- 底部：個人頭像 -->
    <div class="border-t border-warm py-3 px-2">
      <button class="flex items-center gap-3 px-3 py-2.5 rounded-2xl hover:bg-warm transition-all w-full overflow-hidden">
        <div class="w-8 h-8 rounded-full bg-caramel flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
          我
        </div>
        <span class="label text-sm font-medium text-gray-700 whitespace-nowrap">個人頁面</span>
      </button>
    </div>
  </aside>

  <!-- 手機版底部導覽列 -->
  <nav class="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-warm z-40 flex justify-around items-center py-2 px-4">
    <button
      v-for="item in mobileNavItems" :key="item.path"
      @click="handleNav(item)"
      :class="['flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all relative', $route.path === item.path ? 'text-paw' : 'text-muted']"
    >
      <span class="text-xl">{{ item.icon }}</span>
      <span class="text-xs">{{ item.label }}</span>
      <span v-if="item.badge" class="absolute top-0 right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
        {{ item.badge }}
      </span>
    </button>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SidebarItem from '@/components/Sidebaritem.vue'

const router   = useRouter()
const expanded = ref(false)

interface NavItem {
  icon: string
  label: string
  path: string
  badge?: number
}

const navItems: NavItem[] = [
  { icon: '🏠', label: '首頁',    path: '/' },
  { icon: '🔍', label: '搜尋',    path: '/search' },
  { icon: '➕', label: '發布協尋', path: '/post' },
  { icon: '💬', label: '私人訊息', path: '/messages', badge: 3 },
  { icon: '❤️', label: '我的收藏', path: '/favorites' },
  { icon: '🗺️', label: '協尋地圖', path: '/map' },
  { icon: '✅', label: '成功案例', path: '/success' },
]

const mobileNavItems = navItems.filter(i =>
  ['/', '/search', '/post', '/messages', '/favorites'].includes(i.path)
)

const handleNav = (item: NavItem) => {
  router.push(item.path)
}
</script>

<style scoped>
.text-paw    { color: #FF8C55; }
.text-muted  { color: #8B7355; }
.bg-warm     { background-color: #FDE8D8; }
.border-warm { border-color: #FDE8D8; }
.bg-caramel  { background-color: #F4A261; }

/* 側邊欄寬度動畫 */
.sidebar {
  width: 4rem;
  transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}
.sidebar:hover {
  width: 14rem;
}

/* 文字標籤淡入 */
.label {
  opacity: 0;
  transform: translateX(-6px);
  transition: opacity 0.2s ease 0.05s, transform 0.2s ease 0.05s;
  pointer-events: none;
}
.sidebar:hover .label {
  opacity: 1;
  transform: translateX(0);
}
</style>