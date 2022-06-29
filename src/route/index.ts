import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'

import Home from '@/views/Home/index.vue'

const routeComponents: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home
  }
]

export default createRouter({
  history: createWebHistory('.'),
  routes: routeComponents
})
