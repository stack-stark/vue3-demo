import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Desktop from '../layouts/Desktop.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/Home.vue'),
    name: 'Home',
  },
  {
    path: '/index',
    component: Desktop,
    redirect: '/',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/Dashboard.vue'),
        name: 'Dashboard',
        meta:{
          keepAlive: true
        }
      },
      {
        path: 'table',
        component: () => import('@/views/Table.vue'),
        name: 'TableOne',
        meta:{
          keepAlive: false
        }
      },
      {
        path: 'keep',
        component: () => import('@/views/dashboard/Keep.vue'),
        name: 'Keep',
        meta:{
          keepAlive: true
        }
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
