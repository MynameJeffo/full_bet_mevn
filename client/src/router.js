import Vue from "vue";
import Router from "vue-router";
import Promotion from "./views/Promotion.vue";
import Memberinfo from "./views/Memberinfo.vue";
import MemberInfoAdmin from "./views/admin/Memberinfo.vue";
import PromotionAdmin from "./views/admin/Promotion.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";

Vue.use(Router);

export default new Router({
  // mode: "history",
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: "/fuckyou",
    //   name: "home",
    //   component: Home
    // },
    // {
    //   path: "/fuckoff",
    //   name: "about",
    //   component: () => import("./views/About.vue")
    // },
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
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/admin/memberinfo",
      name: "memberInfoAdmin",
      component: MemberInfoAdmin
    },
    {
      path: "/admin/promotion",
      name: "promotionAdmin",
      component: PromotionAdmin
    }
  ]
});
