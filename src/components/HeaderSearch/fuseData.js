import i18n from '@/i18n'
import path from 'path'

/**
 * 筛选出可提供搜索的路由对象
 * @param {*} routes 路由表
 * @param {*} basePath 基础路径 默认为/
 * @param {*} prefixTitle
 */
export const generateRoutes = (routes, basePath = '/', prefixTitle = []) => {
  // 创建 result 数据
  let res = []

  for (const route of routes) {
    // 创建包含path和title的item
    const data = {
      path: path.resolve(basePath, route.path),
      title: [...prefixTitle]
    }

    // 当前存在meta时，使用 i18n 进行国际化解析
    // 动态路由不允许被检索
    // 正则判断是否动态路由
    const reg = /.*\/:.*/
    if (route.meta && route.meta.title && !reg.exec(route.path)) {
      const i18nTitle = i18n.global.t(`msg.route.${route.meta.title}`)
      data.title = [...data.title, i18nTitle]
      res.push(data)
    }

    // 存在children，迭代进行处理
    if (route.children) {
      const tempRoutes = generateRoutes(route.children, data.path, data.title)
      if (tempRoutes.length > 0) {
        res = [...res, ...tempRoutes]
      }
    }
  }

  return res
}
