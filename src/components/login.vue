<template>
  <div>
    <van-cell-group>
      <van-field
        v-model="userName"
        required
        clearable
        label="用户名"
        left-icon="contact"
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
      <van-field
        v-model="sms"
        center
        clearable
        required
        label="短信验证码"
        placeholder="请输入短信验证码"
      >
        <van-button
          slot="button"
          size="small"
          type="primary"
        >发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <van-button
      :loading="loading"
      type="info"
      loading-text="加载中..."
      size="large"
      @click="login"
    >登录</van-button>
    <span>{{ count }}</span>
  </div>
</template>

<script>
import Vue from "vue";
import { Button, Field, CellGroup, Toast } from "vant";
// import { mapActions } from "vuex";
import {mapState} from 'vuex';
Vue.use(Field)
  .use(Button)
  .use(CellGroup)
  .use(Toast);

export default {
  name: "Login",
  data() {
    return {
      userName: "",
      passWord: "",
      sms: "",
      loading: false
    };
  },

  computed: {
    ...mapState({
    count: state => state.account.count,
  })
    // count() {
    //   debugger
    //   return this.$store.state.account.count;
    // }
  },

  methods: {
    // ...mapActions(["increment"]),
    login() {
      //  this.$store.dispatch({
      //   type: "increment",
      //   amount: 10
      // });
      // this.increment({amount: 10})
      this.$store.dispatch("account/increment", {amount: 10}).then(() => {
        debugger
        this.loading = true;
      });
      // this.$storestore.dispatch("actionAlert").then(() => {
      // });
      this.$axios
        .post("/api/login", {
          userName: this.userName,
          passWord: this.passWord
        })
        .then(() => {
          console.log(123);
        })
        .catch(err => {
          console.log(err);
        });
      console.log(this.userName, this.passWord);
    }
  }
};
</script>

<style scoped>
</style>
