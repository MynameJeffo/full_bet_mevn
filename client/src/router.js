import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Promotion from "./views/Promotion.vue";
import Memberinfo from "./views/Memberinfo.vue";
import Login from "./views/Login.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/fuckyou",
      name: "home",
      component: Home
    },
    {
      path: "/fuckoff",
      name: "about",
      component: () => import("./views/About.vue")
    },
    {
      path: "/promotion",
      alias: "/",
      name: "promotion",
      component: Promotion
    },
    {
      path: "/memberinfo",
      name: "memberinfo",
      component: Memberinfo
    },
    {
      path: "/login",
      name: "login",
      component: Login
    }
  ]
});
