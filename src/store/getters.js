const getters = {
  token: (state) => state.user.token,
  // 是否存在用户信息
  hasUserInfo: (state) => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  }
}
export default getters
