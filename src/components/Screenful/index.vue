<template>
  <div class="" @click="onToggle">
    <svg-icon
      :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
    ></svg-icon>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import screenfull from 'screenfull'

// 是否全屏
const isFullscreen = ref(false)

// 触发事件
const onToggle = () => {
  screenfull.toggle()
}

const change = () => {
  isFullscreen.value = screenfull.isFullscreen
}
// 监听screenfull的变化
onMounted(() => {
  screenfull.on('change', change)
})
onUnmounted(() => {
  screenfull.off('change', change)
})
</script>

<style scoped lang="scss"></style>
