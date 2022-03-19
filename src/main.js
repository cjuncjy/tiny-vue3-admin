import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/styles/index.scss'

import installIcons from '@/assets/icons'

// 路由鉴权
import './permission'

const app = createApp(App)

// 全局注册svg-icon
installIcons(app)

app.use(store).use(router).mount('#app')
