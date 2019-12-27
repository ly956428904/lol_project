import Vue from 'vue';
import App from './App.vue';
import router from './router'
import ajax from './components/ajax'

Vue.config.productionTip = false
Vue.prototype.$Ajax = ajax;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app")

