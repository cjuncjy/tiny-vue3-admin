<template>
  <div class="my-container">
    <el-row>
      <el-col :span="6"> <ProjectCard></ProjectCard></el-col>
      <el-col :span="18">
        <el-card>
          <el-tabs v-model="activeName">
            <el-tab-pane :label="$t('msg.profile.feature')" name="feature">
              <Feature></Feature>
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.chapter')" name="chapter">
              <Chapter></Chapter>
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.author')" name="author">
              <Author></Author>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import ProjectCard from './components/ProjectCard.vue'
import Feature from './components/Feature.vue'
import Chapter from './components/Chapter.vue'
import Author from './components/Author.vue'
import { ref } from 'vue'

const activeName = ref('feature')
</script>

<style lang="scss" scoped></style>
