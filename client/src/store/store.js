import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import * as Cookies from "js-cookie";
// import SecureLS from "secure-ls";
// var ls = new SecureLS({ isCompression: false });

Vue.use(Vuex);

let cookieStorage = {
  getItem: function(key) {
    return Cookies.getJSON(key);
  },
  setItem: function(key, value) {
    return Cookies.set(key, value, { expires: 3, secure: false });
  },
  removeItem: function(key) {
    return Cookies.remove(key);
  }
};

const store = new Vuex.Store({
  state: {
    isLoggedIn: false,
    loginId: "",
    username: "",
    loginLoading: false,
    registerMessage: "",
    registerSuccessful: false
  },
  plugins: [
    createPersistedState({
      storage: cookieStorage,
      getState: cookieStorage.getItem,
      setState: cookieStorage.setItem
    })
  ],
  getters: {
    getIsLoggedIn: state => {
      return state.isLoggedIn;
    },
    getLoginId: state => {
      return state.loginId;
    },
    getRegisterMessage: state => {
      return state.registerMessage;
    },
    getRegisterSuccessful: state => {
      return state.registerSuccessful;
    }
    // ,
    // isAuthenticated() {
    //   return this.$vueAuth.isAuthenticated();
    // }
  },
  mutations: {
    updateLoginStatus(state, payload) {
      state.isLoggedIn = payload;
    },
    isAuthenticated(state, payload) {
      state.isAuthenticated = payload.isAuthenticated;
    },
    updateRegisterMessage(state, message) {
      state.registerMessage = message;
    },
    updateRegisterSuccessful(state, boolean) {
      state.registerSuccessful = boolean;
    },
    updateLoginLoading(state, payload) {
      state.loginLoading = payload;
    }
  },
  actions: {
    // login(context, payload) {
    //   this.$vueAuth
    //     .login(payload.user, payload.requestOptions)
    //     .then(response => {
    //       context.commit("isAuthenticated", {
    //         isAuthenticated: this.$vueAuth.isAuthenticated()
    //       });
    //     });
    // }
  }
});

export default store;
