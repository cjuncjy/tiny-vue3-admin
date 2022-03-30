import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/styles/index.scss'

import installIcons from '@/assets/icons'

// 导入element的message.scss，解决自动引入导致的样式问题
import 'element-plus/theme-chalk/src/message.scss'

// 路由鉴权
import './permission'

const app = createApp(App)

// 全局注册svg-icon
installIcons(app)

app.use(store).use(router).mount('#app')
