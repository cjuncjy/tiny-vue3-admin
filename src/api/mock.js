import Mock from 'mockjs'
const Random = Mock.Random

Random.extend({
  constellation: function (date) {
    const constellations = [
      'Vue3+全家桶',
      'Element-Plus',
      'vue-element-admin',
      'ESlint+Git Hooks',
      '架构设计',
      '权限验证'
    ]
    return this.pick(constellations)
  }
})

// 使用mockjs模拟数据
Mock.mock('/mock/user/feature', {
  'data|5': [
    {
      title: '@CONSTELLATION',
      id: '@id',
      percentage: 100
    }
  ]
})
