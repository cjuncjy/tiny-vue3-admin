<template>
  <el-menu
    :collapse="!$store.getters.sidebarOpened"
    :default-active="activeMenu"
    :unique-opened="true"
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
    router
  >
    <SidebarItem
      v-for="item in routes"
      :key="item.path"
      :route="item"
    ></SidebarItem>
  </el-menu>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { filterRoutes, generateMenus } from '@/utils/router'
import SidebarItem from './SidebarItem.vue'

const router = useRouter()
const routes = computed(() => {
  const filterRoutesResult = filterRoutes(router.getRoutes())
  return generateMenus(filterRoutesResult)
})

// 默认激活项
const route = useRoute()
const activeMenu = computed(() => {
  const { path } = route
  return path
})
</script>
