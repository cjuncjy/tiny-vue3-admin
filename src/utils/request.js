import store from '@/store'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { isCheckTimeout } from './auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 统一注入token
    if (store.getters.token) {
      // 检查token是否过期
      if (isCheckTimeout()) {
        // 退出操作
        store.dispatch('user/logout')
        return Promise.reject(new Error('token 失效'))
      }

      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

// 响应拦截器
service.interceptors.response.use(
  // 请求成功
  (response) => {
    const { success, message, data } = response.data
    // 判断是否成功
    if (success) {
      return data
    } else {
      ElMessage.error(message)
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    ElMessage.error(error.message)
    return Promise.reject(new Error(error))
  }
)

export default service
