<template>
  <div
    class="bg-gradient-to-br from-warm via-cream to-orange-50 py-12 px-4 text-center"
  >
    <div class="max-w-2xl mx-auto">
      <SearchBar
        :search="search"
        @update:search="$emit('update:search', $event)"
        @search="$emit('search')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchBar from "@/components/SearchBar.vue";
defineProps<{ search: string }>();
defineEmits<{
  "update:search": [value: string];
  search: [];
}>();
</script>

<style scoped>
.bg-paw {
  background-color: #ff8c55;
}
.bg-warm {
  background-color: #fde8d8;
}
.bg-cream {
  background-color: #fff8f0;
}
.text-muted {
  color: #8b7355;
}
.text-paw {
  color: #ff8c55;
}
.text-caramel {
  color: #f4a261;
}
.bg-paw {
  background-color: #ff8c55;
}
.bg-pawDark {
  background-color: #e8723c;
}
.bg-caramel {
  background-color: #f4a261;
}
.border-caramel {
  border-color: rgba(244, 162, 97, 0.4);
}

.search-input:focus {
  outline: none;
  border-color: #ff8c55;
  box-shadow: 0 0 0 3px rgba(255, 140, 85, 0.2);
}
</style>
