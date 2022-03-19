import { login } from '@/api/sys'
import { TOKEN } from '@/constant'
import router from '@/router'
import { getItem, setItem } from '@/utils/storage'
import md5 from 'md5'

export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || ''
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
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
            resolve(data)
          })
          .catch((err) => {
            // reject(err)
            // TODO 暂时直接跳转
            console.log(err)
            setItem(TOKEN, 'test-token')
            router.push('/')
          })
      })
    }
  }
}
