import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '@/constant'
import { getItem, setItem } from './storage'

/**
 * 获取时间戳
 */
export function getTimeStamp() {
  return getItem(TIME_STAMP)
}

/**
 * 设置时间戳
 */
export function setTimeStamp() {
  return setItem(TIME_STAMP, Date.now())
}

/**
 * 对比是否超时
 */
export function isCheckTimeout() {
  const currentTime = Date.now() // 当前时间
  const timeStamp = getTimeStamp() // 缓存时间
  return currentTime - timeStamp > TOKEN_TIMEOUT_VALUE
}
