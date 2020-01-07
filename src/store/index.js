import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex)


const moduleA = {
  namespaced: true,

  state: {
    count: 'aaaa'
  },
  mutations: {
    increment (state, payload) {
      state.count += payload.amount
    }
  },
  actions: {
    increment ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        if (payload) {
          setTimeout(() => {
            commit('increment', payload);
            resolve();
          }, 1000)
          return;
        }
        reject();
      });
    },
    actionAlert ({ dispatch, commit }, payload) {
      return dispatch('increment', payload).then(() => {
        commit('someOtherMutation')
      })
    }
  }
};
const store = new Vuex.Store({
  modules: {
    account: moduleA,
  }
})
export default store;
