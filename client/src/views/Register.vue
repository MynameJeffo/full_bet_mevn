<template>
  <div class="col-md-12">
    <div class="card card-container">
      <!-- <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      /> -->
      <center>
        <h3>Sign Up</h3>
      </center>
      <form name="user" @submit.prevent="register">
        <div v-if="!successful">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              v-model="user.username"
              v-validate="'required|min:3|max:20'"
              type="text"
              class="form-control"
              name="username"
            />
            <div
              v-if="submitted && errors.has('username')"
              class="alert-danger"
            >
              {{ errors.first("username") }}
            </div>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              v-model="user.email"
              v-validate="'required|email|max:50'"
              type="email"
              class="form-control"
              name="email"
            />
            <div v-if="submitted && errors.has('email')" class="alert-danger">
              {{ errors.first("email") }}
            </div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              v-model="user.password"
              v-validate="'required|min:6|max:40'"
              type="password"
              class="form-control"
              name="password"
            />
            <div
              v-if="submitted && errors.has('password')"
              class="alert-danger"
            >
              {{ errors.first("password") }}
            </div>
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block">Sign Up</button>
          </div>
        </div>
      </form>
      {{ message }}
      {{successful }}
      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
// import User from "../models/user";
import router from "../router";
import { mapState, mapGetters } from "vuex";
import store from "../store/store.js";
export default {
  name: "Register",
  // props: ["username", "email", "password"],
  store,
  data() {
    return {
      // user: new User("", "", ""),
      user: {
        username: "",
        email: "",
        password: ""
      },
      submitted: false,
      message: "",
      successful: false
    };
  },
  beforeRouteUpdate(to, from, next) {
    console.log("do stuff");
  },
  computed: {
    ...mapState(["isLoggedIn", "loginId", "loginLoading", "registerMessage"]),
    ...mapGetters([
      "getIsLoggedIn",
      "getLoginId",
      "getRegisterMessage",
      "getRegisterSuccessful"
    ])
  },
  created() {
    store.commit("updateRegisterMessage", "");
  },
  mounted() {
    if (store.state.isLoggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    register: function() {
      let registerInput = {
        name: this.user.username,
        email: this.user.email,
        password: this.user.password
      };
      this.$auth.register(registerInput).then(function(response) {
        // keep track of login record -> email as pimary key
        if (response.data) {
          //register success
          //prompt successful
          self.message = "Register Successful";
          self.successful = true;
          console.log("success");
          // router.push("/login");
        } else {
          //prompt username or email already exists
          console.log("loser");
          store.commit("updateRegisterMessage", "Registration failed");
          store.commit("updateRegisterSuccessful", false);
          self.message = "Register Failed";
          self.successful = false;
        }
      });
    }
    // ,
    // message: function() {
    //   return store.getters.getRegisterMessage;
    // },
    // successful: function() {
    //   return store.getters.getRegisterSuccessful;
    // }
  }
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>
