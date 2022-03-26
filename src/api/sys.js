import request from '@/utils/request'
/**
 * 登录
 * @returns promise
 */
export const login = (data) => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

/**
 * 获取用户信息
 * @returns promise
 */
export const getUserInfo = (data) => {
  // return request({
  //   url: '/sys/profile',
  //   method: 'GET',
  //   data
  // })
  return {
    role: [{ id: 1, title: '超级管理员' }],
    id: '123123123',
    avatar:
      'https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png',
    permission: { menus: ['userManage', 'roleList', 'permissionList'] },
    title: '超级管理员',
    username: 'super-admin'
  }
}
