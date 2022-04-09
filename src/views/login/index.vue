<template>
  <div class="login-container">
    <el-form
      class="login-form"
      :model="loginForm"
      :rules="loginRules"
      ref="loginFormRef"
    >
      <div class="title-container">
        <h3 class="title">{{ $t('msg.login.title') }}</h3>
        <LangSelect class="lang-select"></LangSelect>
      </div>
      <!-- username -->
      <el-form-item prop="username">
        <span class="svg-container">
          <span class="svg-container"> <svg-icon icon="user"></svg-icon> </span
        ></span>
        <el-input
          placeholder="username"
          name="username"
          type="text"
          v-model="loginForm.username"
        ></el-input>
      </el-form-item>
      <!-- password -->
      <el-form-item prop="password">
        <span class="svg-container">
          <span class="svg-container">
            <svg-icon icon="password"></svg-icon>
          </span>
        </span>
        <el-input
          placeholder="password"
          name="password"
          v-model="loginForm.password"
          :type="passwordType"
        ></el-input>
        <span class="show-pwd"
          ><span class="svg-container" @click="onChangePwdType">
            <svg-icon
              :icon="passwordType === 'password' ? 'eye' : 'eye-open'"
            ></svg-icon> </span
        ></span>
      </el-form-item>

      <!-- 按钮 -->
      <el-button
        type="primary"
        style="width: 100%; margin-bottom: 30px; height: 40px"
        :loading="loading"
        @click="handleLogin(loginFormRef)"
        >{{ $t('msg.login.loginBtn') }}</el-button
      >

      <div class="tips" v-html="$t('msg.login.desc')"></div>
    </el-form>
  </div>
</template>

<script setup>
import { TOKEN } from '@/constant'
import { setTimeStamp } from '@/utils/auth'
import { validatePassword } from '@/utils/rules'
import { setItem } from '@/utils/storage'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import LangSelect from '@/components/LangSelect/index.vue'
import { useI18n } from 'vue-i18n'
import { computed } from '@vue/reactivity'

const loginForm = ref({
  username: 'admin',
  password: '123456'
})

const { t } = useI18n()
const loginRules = computed(() => ({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: t('msg.login.usernameRule')
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePassword()
    }
  ]
}))

const passwordType = ref('password')

const onChangePwdType = () => {
  // ref的值这里使用要加.value，template中不用
  passwordType.value = passwordType.value === 'password' ? 'text' : 'password'
}

const loginFormRef = ref(null) // 会自己去找有没有ref为loginFormRef的引用
const loading = ref(false)

const store = useStore()

const router = useRouter()

const handleLogin = async (formEl) => {
  // 1.表单校验
  await formEl.validate((valid) => {
    if (!valid) return
    loading.value = true
    store
      .dispatch('user/login', loginForm.value)
      .then(() => {
        loading.value = false
        // 登录后操作
      })
      .catch((err) => {
        console.log(err)
        // 暂时无法用接口，直接登录
        setItem(TOKEN, 'test-token')
        loading.value = false
        store.commit('user/setToken', 'test-token')
        router.push({ path: '/' })
        setTimeStamp()
      })
  })
}
</script>

<style scoped lang="scss">
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    :deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    :deep(.el-input) {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        height: 47px;
        background: transparent;
        border: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        caret-color: $cursor;
        box-shadow: none;
      }
    }

    .tips {
      font-size: 16px;
      color: #fff;
      line-height: 24px;
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .lang-select {
    position: absolute;
    top: 4px;
    right: 0;
    background-color: #fff;
    font-size: 22px;
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;
  }
}
</style>
