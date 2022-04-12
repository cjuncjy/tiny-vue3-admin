<template>
  <div class="header-search" :class="{ show: isShow }">
    <div class="svg-icon" @click.stop="onShowClick">
      <svg-icon class-name="search-icon" icon="search"></svg-icon>
    </div>

    <el-select
      ref="headerSearchSelectRef"
      class="header-search-select"
      v-model="search"
      filterable
      remote
      default-first-option
      :remote-method="querySearch"
      placeholder="search"
      @change="onSelectChange"
    >
      <el-option
        v-for="option in searchOptions"
        :key="option.item.path"
        :label="option.item.title.join(' > ')"
        :value="option.item"
      ></el-option>
    </el-select>
  </div>
</template>

<script setup>
import { filterRoutes } from '@/utils/router'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import Fuse from 'fuse.js'
import { generateRoutes } from './fuseData'
import { watchSwitchLang } from '@/utils/i18n'

// 数据源
const router = useRouter()
let searchPool = computed(() => {
  const myFilterRoutes = filterRoutes(router.getRoutes())
  return generateRoutes(myFilterRoutes)
})
// 搜索库相关
let fuse

const initFuse = (searchPool) => {
  fuse = new Fuse(searchPool.value, {
    // 是否按照优先级排序
    shouldSort: true,
    // 匹配长度超过多少才认为是匹配的
    minMatchCharLength: 1,
    // 将被搜索的键列表，支持嵌套路径
    keys: [
      {
        name: 'title', // 键
        weight: 0.7 // 权重
      },
      {
        name: 'path',
        weight: 0.3
      }
    ]
  })
}

initFuse(searchPool)

const isShow = ref(false)
const search = ref('')

const onShowClick = () => {
  isShow.value = !isShow.value
}

// 搜索方法
const searchOptions = ref([])
const querySearch = (query) => {
  if (query !== '') {
    searchOptions.value = fuse.search(query)
  } else {
    searchOptions.value = []
  }
}

// 选中回调
const onSelectChange = (val) => {
  router.push(val.path)
}

// 关闭search的事件
const headerSearchSelectRef = ref(null)
const onClose = () => {
  headerSearchSelectRef.value?.blur()
  isShow.value = false
  searchOptions.value = []
}

watch(isShow, (val) => {
  if (val) {
    headerSearchSelectRef.value.focus()
    document.body.addEventListener('click', onClose)
  } else {
    document.body.removeEventListener('click', onClose)
  }
})

watchSwitchLang(() => {
  searchPool = computed(() => {
    const routes = filterRoutes(router.getRoutes())
    return generateRoutes(routes)
  })

  initFuse(searchPool)
})
</script>

<style scoped lang="scss">
.header-search {
  font-size: 0 !important;

  .svg-icon {
    display: inline-block;
  }
  :deep(.search-icon) {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;
    :deep(.el-input__inner) {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
