<template>
  <div class="app-wrapper">
    <!-- 左侧 -->
    <SideBar class="sidebar-container"></SideBar>
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
</script>
