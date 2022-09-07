import { createApp, RendererElement } from 'vue'
import router from '@/route'
import App from './App.vue'
import './style.css'

const app:RendererElement = createApp({
  el: '#app',
  render: (h) => h(App)
})