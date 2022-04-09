import i18n from '@/i18n'

// 转化路由title
export function generateTitle(title) {
  return i18n.global.t('msg.route.' + title)
}
