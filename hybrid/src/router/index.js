import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName: "home" */ "@/pages/home"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/pages/about"),
  },
  {
    path: "/pdf-reader",
    name: "pdf-reader",
    component: () => import("@/pages/pdf-reader"),
  },
  {
    path: "/e-charts-demo",
    name: "e-charts-demo",
    component: () => import("@/pages/e-charts-demo"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
