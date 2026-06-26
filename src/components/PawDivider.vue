<template>
  <div class="paw-divider">
    <span class="text-xl">🐾</span>
  </div>
</template>

<style scoped>
.paw-divider {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1.5rem 0;
}
.paw-divider::before,
.paw-divider::after {
  content: '';
  flex: 1;
  height: 1.5px;
  background: linear-gradient(to right, transparent, #F4A261, transparent);
}
</style>
