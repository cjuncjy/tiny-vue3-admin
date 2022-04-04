<template>
  <el-menu
    :unique-opened="true"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
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
import { useRouter } from 'vue-router'
import { filterRoutes, generateMenus } from '@/utils/router'
import SidebarItem from './SidebarItem.vue'

const router = useRouter()
const routes = computed(() => {
  const filterRoutesResult = filterRoutes(router.getRoutes())
  return generateMenus(filterRoutesResult)
})

console.log(routes.value)
</script>
