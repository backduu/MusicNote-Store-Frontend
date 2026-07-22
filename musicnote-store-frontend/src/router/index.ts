import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/song-market',
      name: 'song-market',
      component: () => import('../pages/SongMarket.vue')
    },
    {
      path: '/hot-tracks',
      name: 'hot-tracks',
      component: () => import('../pages/HotTracks.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/Login.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../pages/Signup.vue')
    }
  ]
})

export default router
