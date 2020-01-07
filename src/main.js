import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import axios from 'axios';
import * as echarts from 'echarts/lib/echarts';
// 引入 echarts 主模块。
import 'echarts/lib/echarts';
// 引入柱形图
import 'echarts/lib/chart/bar';
//// 引入提示框组件、标题组件、工具箱、legend组件。
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/legend';


Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$echarts =echarts;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app")

