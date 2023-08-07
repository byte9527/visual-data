import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/configForm',
    name: '配置面板',
    component: () => import('@/views/configFormDemo/index.vue'),
    meta: { title: '配置面板demo' },
  },
  {
    path: '/VisualPage',
    name: '可视化设计',
    component: () => import('@/views/VisualPage/PageList.vue'),
    meta: { title: '大屏编辑器' },
  },
  {
    path: '/storyboard',
    name: '故事板',
    component: () => import('@/views/test/input.vue'),
    meta: { title: '在线excel' },
  },
]



const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  // set page title
  const defaultTitle = '可视化'
  if (to.meta && to.meta.title) {
    document.title = `${defaultTitle} | ${to.meta.title}`
  } else {
    document.title = defaultTitle
  }
  next()
})

export default router