import { createRouter, createWebHashHistory } from "vue-router";


const routes = [
  { path: "/", component: () => import("@/views/Index.vue") },
  { path: "/search", component: () => import("@/views/Search.vue") },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...routes],
});

export default router;

