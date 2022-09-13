import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const navRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    redirect: '/project',
    component: () => import('@/views/home/index.vue'),
    children: [
      {
        path: 'project',
        name: 'MyProject',
        component: () => import('@/views/configFormDemo/index.vue'),
        meta: { title: '配置面板demo' },
      },
    ],
  },
]

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录' },
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})



export default router