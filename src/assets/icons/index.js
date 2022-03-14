import SvgIcon from '@/components/SvgIcon'

// 导入所有的svg
const svgRequire = require.context('./svg', false, /\.svg$/)
svgRequire.keys().forEach((svgIcon) => svgRequire(svgIcon))

// 导出注册函数
export default (app) => {
  app.component('svg-icon', SvgIcon)
}
