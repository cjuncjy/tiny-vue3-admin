<template>
  <router-view />
</template>

<script setup>
import { useStore } from 'vuex'
import { watchSwitchLang } from './utils/i18n'
import { generateNewStyle, writeNewStyle } from './utils/theme'

// 刷新后主题丢失问题解决
const store = useStore()
generateNewStyle(store.getters.mainColor).then((newStyle) => {
  writeNewStyle(newStyle)
})

watchSwitchLang(() => {
  if (store.getters.token) {
    store.dispatch('user/getUserInfo')
  }
})
</script>

<style lang="scss">
#app {
  height: 100%;
}
</style>
