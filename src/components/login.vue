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
      loading-text="登录中..."
      size="large"
      @click="login"
    >登录</van-button>
    <div
      class="login-charts"
      ref="loginCharts"
    ></div>
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
  name: "Login",
  data() {
    return {
      userName: "",
      passWord: "",
      sms: "",
      loading: false
    };
  },

  mounted() {
    this.drawInit();
  },

  methods: {
    drawInit() {
      let myChart = this.$echarts.init(this.$refs["loginCharts"]);
      myChart.setOption({
        title: {
          text: "ECharts 入门示例"
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      });
      window.onresize = function() {
        myChart.resize();
      };
    },

    login() {
      this.loading = true;
      this.$ajax("/api/login", { userName: this.userName, passWord: this.passWord}).then(res => {
        console.log(res);
        if (res.code == 0) {
          this.loading = false;
          sessionStorage.setItem("userName", res.data.userName);
          this.$store.commit("login", res.data.userName);
          this.$router.replace({path:'/home'})
        }
      }).catch((err) => {
        this.loading = false;
        Toast.fail({
          message: err,
          forbidClick: true
        });
      });
    
    }
  }
};
</script>

<style scoped>
.login-charts {
  width: 100%;
  max-width: 500px;
  max-height: 400px;
  height: 100%;
  position: absolute;
}
</style>
