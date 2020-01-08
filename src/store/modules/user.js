

const user = {
    state: {
        currentUser: null,
        isLogin: false,
    },

    mutations: {
         //用户登录处理
         login(state, user) {
            if (user) {
                state.currentUser = user;
                state.isLogin = true;
            } else if (user == null) {
                sessionStorage.setItem("userName", null);
                state.currentUser = null;
                state.isLogin = false;
            } 
        }
    },
};


export default user;
