/**
 * 存储数据
 */
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }

  localStorage.setItem(key, value)
}

/**
 * 获取数据
 */
export const getItem = (key) => {
  const data = localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (e) {
    return data
  }
}

/**
 * 删除指定数据
 */
export const removeItem = (key) => {
  localStorage.removeItem(key)
}

/**
 * 删除所有数据
 */
export const removeAllItem = () => {
  localStorage.clear()
}
