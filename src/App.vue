<template>
  <div id="app">
    <div v-show="isLogin">
      <span>退出登录</span>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: "app",
  computed: {
   isLogin() {
     const userName = sessionStorage.getItem("userName");
     if (userName) {
        this.$store.commit("login", userName);
     } else {
        this.$store.commit("login", null)
     }
     return this.$store.getters.isLogin;
    },
  },
};
</script>

<style>
</style>
