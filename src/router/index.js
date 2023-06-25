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
      path:"/test",
      name:'test',
      component:()=>import('../views/test.vue')
    },
    {
      path: '/classroom',
      name: 'classroom',
      component: ()=>import('../views/classroom.vue')
    },
    {
      path:"/restaurant",
      name:'restaurant',
      component:()=>import('../views/restaurant.vue')
    },
    {
      path:"/MRT",
      name:'MRT',
      component:()=>import('../views/MRT.vue')
    },
    {
      path:"/supermarket",
      name:'supermarket',
      component:()=>import('../views/supermarket.vue')
    }
  ]
})

export default router
