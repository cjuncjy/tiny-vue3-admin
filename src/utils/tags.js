const whiteList = ['/login', '/404', '/401']

// 判断是否包含在白名单内
export function isTags(path) {
  return !whiteList.includes(path)
}
