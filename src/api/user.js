// import request from '@/utils/request'
import axios from 'axios'

/**
 * 获取项目功能
 */
export const getFeature = async () => {
  const res = await axios.get('/mock/user/feature')
  return res.data.data
}
