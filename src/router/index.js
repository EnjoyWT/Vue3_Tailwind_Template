import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home.vue'
import About from '@/components/About.vue'
import SubAbout1 from '@/components/SubAbout1.vue'
import SubAbout2 from '@/components/SubAbout2.vue'

const routes = [
  { path: '/', component: Home },
  {
    path: '/about',
    component: About,
    children: [
      { path: '', component: SubAbout1 },
      { path: 'sub2', component: SubAbout2 }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
