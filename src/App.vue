<template>
  <div id="app">
    <van-cell-group>
      <van-field
        v-model="userName"
        required
        clearable
        label="用户名"
        right-icon="question-o"
        placeholder="请输入用户名"
        @click-right-icon="$toast('question')"
      />

      <van-field
        v-model="passWord"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
    </van-cell-group>
    <van-button
      :loading="loading"
      type="info"
      loading-text="加载中..."
      size="large"
      @click="login"
    >登录</van-button>
  </div>
</template>

<script>
import Vue from "vue";
import { Button, Field, CellGroup, Toast } from "vant";
Vue.use(Field)
  .use(Button)
  .use(CellGroup)
  .use(Toast);

export default {
  name: "app",
  data() {
    return {
      userName: "",
      passWord: "",
      loading: false
    };
  },
  methods: {
    login() {
      console.log(this.userName, this.passWord);
    }
  }
};
</script>

<style>
</style>
