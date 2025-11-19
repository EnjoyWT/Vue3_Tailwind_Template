import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/components/About.vue";
import SubAbout1 from "@/components/SubAbout1.vue";
import SubAbout2 from "@/components/SubAbout2.vue";

const routes = [
  // Dashboard Layout (Header + Sidebar)
  {
    path: "/",
    component: () => import("@/layouts/BasicLayout.vue"),
    redirect: "/home",
    children: [
      { path: "/home", component: Home },
      {
        path: "about",
        component: About,
        children: [
          { path: "", component: SubAbout1 },
          { path: "sub2", component: SubAbout2 },
        ],
      },
    ],
  },
  // SPA Layout (Blank)
  // {
  //   path: "/landing",
  //   component: () => import("@/layouts/BlankLayout.vue"),
  //   children: [{ path: "", component: () => import("@/views/Landing.vue") }],
  // },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
