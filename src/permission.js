import router from './router'
import store from './store'

// 白名单
const whiteList = ['/login']

/**
 * 路由前置守卫
 */
router.beforeEach(async (to, from, next) => {
  if (store.getters.token) {
    // 登录了就不能去登录页
    if (to.path === '/login') {
      next('/')
    } else {
      // 判断用户资料是否存在，如果不存在则去获取
      if (!store.getters.hasUserInfo) {
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    // 未登录只能去login
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
