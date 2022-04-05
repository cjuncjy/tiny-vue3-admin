import variables from '@/assets/styles/variables.scss'

const getters = {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  // 是否存在用户信息
  hasUserInfo: (state) => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  cssVar: (state) => variables,
  sidebarOpened: (state) => state.app.sidebarOpened
}
export default getters
