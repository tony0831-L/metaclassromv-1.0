import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:"/",
      name:'home',
      component:()=>import('../views/home.vue')
    },
    {
      path:"/classroom",
      name:'classroom',
      component:()=>import('../views/classroom.vue')
    }
  ]
})

export default router
