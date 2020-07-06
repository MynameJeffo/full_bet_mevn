import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import VueAuthenticate from "vue-authenticate";
import App from "./App.vue";
import router from "./router";
import vueRouter from "vue-router";
Vue.use(vueRouter);
import store from "./store/store.js";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt);
Vue.component("font-awesome-icon", FontAwesomeIcon);

import VeeValidate from "vee-validate";
Vue.use(VeeValidate);

import VModal from "vue-js-modal";
Vue.use(VModal, {
  dynamic: true,
  dynamicDefaults: { clickToClose: true },
  injectModalsContainer: true
});

import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
Vue.use(VueAuthenticate, {
  baseUrl: "http://localhost:9000/api", // Your API domain
  providers: {}
});

Vue.prototype.$vueAuth = new VueAuthenticate(Vue.prototype.$http, {
  baseUrl: "http://localhost:9000/api"
});

Vue.use(VueAuthenticate, {
  bindRequestInterceptor: function() {
    this.$http.interceptors.request.use(config => {
      if (this.isAuthenticated()) {
        config.headers["Authorization"] = [
          this.options.tokenType,
          this.getToken()
        ].join(" ");
      } else {
        delete config.headers["Authorization"];
      }
      return config;
    });
  },

  bindResponseInterceptor: function() {
    this.$http.interceptors.response.use(response => {
      this.setToken(response);
      return response;
    });
  }
});

import "./scss/custom.css";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
