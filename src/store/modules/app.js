import { LANG, TAGS_VIEW } from '@/constant'
import { getItem, setItem } from '@/utils/storage'

export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true,
    language: getItem(LANG) || 'zh',
    tagsViewList: getItem(TAGS_VIEW) || []
  }),
  mutations: {
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    setLanguage(state, lang) {
      setItem(LANG, lang)
      state.language = lang
    },
    // 添加tags
    addTagsViewList(state, tag) {
      const isFind = state.tagsViewList.find((item) => item.path === tag.path)
      // 去重
      if (!isFind) {
        state.tagsViewList.push(tag)
        setItem(TAGS_VIEW, state.tagsViewList)
      }
    },
    // 为指定的tag修改title
    changeTagsView(state, { index, tag }) {
      state.tagsViewList[index] = tag
      setItem(TAGS_VIEW, state.tagsViewList)
    },
    /**
     *  删除tag
     * @param {*} state
     * @param {*} payload {type: 'other' || 'right' || 'index'}
     */
    removeTagsView(state, payload) {
      // 某一个
      if (payload.type === 'index') {
        state.tagsViewList.splice(payload.index, 1)
      } else if (payload.type === 'other') {
        // 其他
        state.tagsViewList.splice(
          payload.index + 1,
          state.tagsViewList.length - payload.index + 1
        )
        state.tagsViewList.splice(0, payload.index)
      } else if (payload.type === 'right') {
        // 右侧
        state.tagsViewList.splice(
          payload.index + 1,
          state.tagsViewList.length - payload.index + 1
        )
      }
      setItem(TAGS_VIEW, state.tagsViewList)
    }
  }
}
