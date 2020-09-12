import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Home,
    name: 'Home',
  },
  {
    path: '/login',
    component: () => import('@/views/user/login.vue'),
    name: 'login',
  },
  {
    path: '/404',
    component: () => import('@/views/system-status-pages/notFound.vue'),
    name: 'notFound',
  },
  {
    path: '/403',
    component: () => import('@/views/system-status-pages/notAuthorized.vue'),
    name: 'notAuthorized',
  },
  {
    path: '/500',
    component: () => import('@/views/system-status-pages/serverWrong.vue'),
    name: 'serverWrong',
  },
  {
    path: '/index',
    component: () => import(/* webpackPrefetch: true */ '@/layouts/desktop.vue'),
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/dashboard.vue'),
        name: 'dashboard',
        meta:{
          keepAlive: true //是否进行路由缓存
        }
      },
      {
        path: 'table',
        component: () => import('@/views/dashboard/table.vue'),
        name: 'table',
        meta:{
          keepAlive: false
        }
      },
      {
        path: 'keep',
        component: () => import('@/views/dashboard/keep.vue'),
        name: 'keep',
        meta:{
          keepAlive: true
        }
      },
      {
        path: 'role',
        component: () => import('@/views/system/role.vue'),
        name: 'role',
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
