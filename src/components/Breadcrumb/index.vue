<template>
  <div class="">
    <el-breadcrumb class="breadcrumb-container" separator="/">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item
          v-for="(item, index) in breadcrumbData"
          :key="item.path"
        >
          <!-- 不可点击 -->
          <span
            class="no-redirect"
            v-if="index === breadcrumbData.length - 1"
            >{{ item.meta.title }}</span
          >
          <!-- 可点击 -->
          <span class="redirect" v-else @click="onLinkClick(item)">{{
            item.meta.title
          }}</span>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

const route = useRoute()

const breadcrumbData = ref([])
const getBreadcrumb = () => {
  console.log(123)
  // 当前路由的记录
  breadcrumbData.value = route.matched.filter(
    (item) => item.meta && item.meta.title
  )
}

const router = useRouter()
const onLinkClick = (item) => {
  router.push(item.path)
}

watch(
  route,
  () => {
    getBreadcrumb()
  },
  {
    immediate: true
  }
)

// 主题色，hover颜色
const store = useStore()
const linkHoverColor = ref(store.getters.cssVar.menuBg)
</script>

<style scoped lang="scss">
.breadcrumb-container {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }

  .redirect {
    color: #666;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      color: v-bind(linkHoverColor);
    }
  }
}
</style>
