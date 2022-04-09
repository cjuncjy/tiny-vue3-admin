<template>
  <div class="nav-bar">
    <!-- 汉堡 -->
    <Hamburger class="hamburger"></Hamburger>
    <!-- 面包屑 -->
    <Breadcrumb class="breadcrumb"></Breadcrumb>
    <div class="right-menu">
      <!-- 主题选择 -->
      <ThemeSelect class="right-menu-item hover-effect"></ThemeSelect>
      <!-- 国际化 -->
      <LangSelect class="right-menu-item hover-effect"></LangSelect>
      <!-- 头像 -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar
            shape="square"
            :size="40"
            :src="$store.getters.userInfo.avatar"
          ></el-avatar>
          <svg-icon icon="s-tools"></svg-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>{{ $t('msg.navBar.home') }}</el-dropdown-item>
            </router-link>
            <a target="_blank" href="#">
              <el-dropdown-item>{{ $t('msg.navBar.course') }}</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="logout">{{
              $t('msg.navBar.logout')
            }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup>
import { useStore } from 'vuex'
import Hamburger from '@/components/Hamburger/index'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import LangSelect from '@/components/LangSelect/index.vue'
import ThemeSelect from '@/components/ThemeSelect/index.vue'

const store = useStore()
const logout = () => {
  store.dispatch('user/logout')
}
</script>

<style lang="scss" scoped>
.nav-bar {
  height: 50px;
  overflow: hidden;
  position: relative;
  border-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    // hover
    transition: background 0.5s;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }

  .breadcrumb {
    float: left;
  }

  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;

    ::v-deep .right-menu-item {
      display: inline-block;
      padding: 0 18px 0 0;
      font-size: 24px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
      }
    }

    ::v-deep .avatar-container {
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .el-avatar {
          --el-avatar-bg-color: none;
          margin-right: 12px;
        }
      }
    }
  }
}
</style>
