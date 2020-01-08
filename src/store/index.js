import Vue from 'vue'
import Vuex from 'vuex';
import user from './modules/user';

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
  },
  getters: {
    isLogin: state => state.user.isLogin
  }
})
export default store;
