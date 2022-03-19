import { login } from '@/api/sys'
import { TOKEN } from '@/constant'
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
            this.commit('user/setToken', data.data.data.token)
            resolve(data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
}