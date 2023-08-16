import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
{
  path: "/",
  name: "主页",
  redirect: "/home/configForm"
},
  {
    path: '/home',
    name: 'Home',
    redirect: "/home/configForm",
    component: () => import('@/views/home/index.vue'),
    children: [{
      path: '/home/configForm',
      name: '配置面板',
      component: () => import('@/views/configFormDemo/index.vue'),
      meta: { title: '配置面板demo' }
    },
    {
      path: '/home/visualPage',
      name: '可视化设计',
      component: () => import('@/views/VisualPage/PageList.vue'),
      meta: { title: '页面编辑器' },
    },
    {
      path: '/home/onlineComponent',
      name: '在线组件',
      component: () => import('@/views/VisualPage/PageList.vue'),
      meta: { title: '在线组件' },
    },
    {
      path: '/home/storyboard',
      name: '故事板',
      component: () => import('@/views/test/input.vue'),
      meta: { title: '在线excel' },
    },]
  },
  {
    path: "/pageDesigner",
    name: '页面设计器',
    component: () => import('@/views/Designer/index.vue'),
    meta: { title: '页面设计器' },
  }
]



const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach(async (to: { meta: { title: any } }, from: any, next: () => void) => {
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