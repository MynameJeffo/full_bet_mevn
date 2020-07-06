<template>
  <div id="app">
    <!-- 
    <div id="nav">
      <router-link to="/">Promotion</router-link> |
      <router-link to="/memberinfo">MemberInfo </router-link> |
      <router-link to="/login">{{isLoggedIn? 'Logout': 'Login'}}</router-link>
    </div> -->

    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand>
        <router-link to="/">
          <img
            class="img-thumbnail"
            height="125px"
            width="125px"
            src="./assets/logo.png"
          />
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <router-link to="/promotion">
              Promotion
            </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/memberinfo">
              My Profile
            </router-link>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <!-- Using 'button-content' slot -->
          <div v-if="isLoggedIn">
            <b-nav-item>
              <!-- <router-link to="/promotion"> -->
              Logged in as: {{ loginId }}
              <!-- </router-link> -->
            </b-nav-item>
            <b-nav-item @click.prevent="logout" right>
              logout
            </b-nav-item>
          </div>
          <div v-else>
            <b-nav-item>
              <router-link to="/register">
                Sign Up for Member
              </router-link>
            </b-nav-item>
            <b-nav-item right>
              <router-link to="/login">
                Login
              </router-link>
            </b-nav-item>
          </div>
        </b-navbar-nav>
        <!-- 
           <template class="row" v-slot:button-content>
              <div v-if="isLoggedIn" class="col loggedInButton">
                <em>{{ loginId }}</em>
              </div>
              <div class="col notLoggedInButton">
                <router-link to="/register">
                  Sign Up for Member
                </router-link>
              </div>
              <div>
                <router-link class="col" to="/login">
                  Login
                </router-link>
              </div>
            </template>
            <b-nav-item-dropdown >
            <b-dropdown-item>
              <div>
                <router-link to="/logout">
                  Sign Out
                </router-link>
              </div>
            </b-dropdown-item>
          </b-nav-item-dropdown>
          
          
          <b-navbar-nav v-if="!currentUser"  class="ml-auto">
          <b-nav-item right>
            <template v-slot:button-content>
              <router-link to="/register">
              Register
              </router-link>
            </template>
          </b-nav-item>
        </b-navbar-nav> -->
      </b-collapse>
    </b-navbar>
    <router-view />
  </div>
</template>

<script>
import store from "./store/store.js";
import { mapState } from "vuex";
import router from "./router";
export default {
  store,
  computed: {
    ...mapState(["isLoggedIn", "loginId", "username"])
  },
  methods: {
    logout: function() {
      store.state.isLoggedIn = false;
      store.state.loginId = "";
      store.state.username = "";
      router.push("/login");
    }
  },
  created() {
    store.state.loginLoading = false;
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

.nav-item a {
  font-size: 22px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
