import { createApp, RendererElement } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './route'
import App from './App.vue'
import './style.css'

const app:RendererElement = createApp(App)
app.use(router)
app.use(createPinia())
app.use(ElementPlus)
app.mount('#app')