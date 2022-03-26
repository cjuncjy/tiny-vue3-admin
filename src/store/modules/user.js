import { getUserInfo, login } from '@/api/sys'
import { TOKEN } from '@/constant'
import router from '@/router'
import { setTimeStamp } from '@/utils/auth'
import { getItem, removeAllItem, setItem } from '@/utils/storage'
import md5 from 'md5'

export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || '',
    userInfo: {}
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    /**
     * 登录请求动作
     */
    login(ctx, userInfo) {
      const { username, password } = userInfo

      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password)
        })
          .then((data) => {
            this.commit('user/setToken', data.token)
            // 跳转
            router.push('/')
            // 保存登录时间
            setTimeStamp()
            resolve(data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },

    /**
     * 获取用户信息
     */
    async getUserInfo(ctx, userInfo) {
      const res = await getUserInfo()
      this.commit('user/setUserInfo', res)
      return res
    },
    /**
     * 退出登录
     */
    logout(ctx) {
      this.commit('user/setToken', '')
      this.commit('user/setUserInfo', {})
      removeAllItem()

      // TODO 清除权限
      router.push('/login')
    }
  }
}
