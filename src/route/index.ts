import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'

import Home from '@/views/Home/index.vue'

const Drag =() => import('@/views/Drag/index.vue')

const routeComponents: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: 'drag',
        name: 'drag',
        components: {
          container: Drag
        }
      }
    ]
  }
]

export default createRouter({
  history: createWebHistory('.'),
  routes: routeComponents
})
