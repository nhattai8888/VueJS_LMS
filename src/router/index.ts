
import LoginView from '@/views/auth/LoginView.vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'


const routes:RouteRecordRaw[] = [
  {
    path:"/",
    name:"/",
    redirect:"/auth"
  },
  {
    path:"/auth",
    name:"auth",
    component:LoginView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass:"active"
})

export default router
