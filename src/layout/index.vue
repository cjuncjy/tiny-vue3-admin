<template>
  <div
    class="app-wrapper"
    :class="[$store.getters.sidebarOpened ? 'openSidebar' : 'hideSidebar']"
  >
    <!-- 左侧 -->
    <SideBar
      class="sidebar-container"
      :style="{ backgroundColor: variables.menuBg }"
    ></SideBar>
    <div class="main-container">
      <!-- 头部 -->
      <div class="fix-header">
        <NavBar></NavBar>
      </div>
      <!-- 内容区 -->
      <AppMain></AppMain>
    </div>
  </div>
</template>
<script setup>
import NavBar from './components/NavBar.vue'
import SideBar from './components/SideBar/index.vue'
import AppMain from './components/AppMain.vue'
import variables from '@/assets/styles/variables.scss'

console.log(variables)
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/mixin.scss';
@import '~@/assets/styles/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - #{hideSideBarWidth});
}
</style>
