<template>
  <el-menu default-active="2" class="el-menu-vertical-demo">
    <el-sub-menu index="1">
      <template #title>
        <i class="el-icon-location"></i>
        <span>Navigator One</span>
      </template>
      <el-sub-menu index="1-4">
        <template #title>item four</template>
        <el-menu-item index="1-4-1">item one</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="2">
      <span>Navigator Two</span>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      <span>Navigator Three</span>
    </el-menu-item>
    <el-menu-item index="4">
      <span>Navigator Four</span>
    </el-menu-item>
  </el-menu>
</template>
