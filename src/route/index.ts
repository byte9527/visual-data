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
        component: () => import('@/views/my-project/index.vue'),
        meta: { title: '我的可视化' },
      },
      {
        path: 'data',
        name: 'MyData',
        component: () => import('@/views/my-data/index.vue'),
        meta: { title: '我的数据' },
      },
      {
        path: 'com',
        name: 'MyCom',
        component: () => import('@/views/my-com/index.vue'),
        meta: { title: '我的组件' },
      },
      {
        path: 'case',
        name: 'MyCase',
        component: () => import('@/views/my-case/index.vue'),
        meta: { title: '教程' },
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
  },
  ...navRoutes,
  {
    path: '/create-screen',
    name: 'CreateScreen',
    component: () => import('@/views/my-project/create-screen.vue'),
    meta: { title: '创建' },
  },
  {
    path: '/admin/screen/:projectId',
    name: 'ScreenEditor',
    props: true,
    component: () => import('@/views/screen-editor/index.vue'),
    meta: { title: '编辑器' },
  },
  {
    path: '/screen/preview/:screenId',
    name: 'Preview',
    props: true,
    component: () => import('@/views/screen/index.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    name: 'NotFound',
    component: () => import('@/views/error/index.vue'),
    meta: { title: '找不到页面' },
  },
]

if (__DEV__) {
  routes.unshift(
    {
      path: '/dev/props-config',
      name: 'DevPropsConfig',
      component: () => import('@/pages/props-config/index.vue'),
      meta: { title: '属性配置' },
    },
    {
      path: '/dev/icons',
      name: 'DevIcons',
      component: () => import('@/pages/icons.vue'),
      meta: { title: '全部图标' },
    },
  )
}

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})


const whiteList = ['/login', '/auth-redirect', '/dev'] 

router.beforeEach(async (to, from, next) => {
})


export default router