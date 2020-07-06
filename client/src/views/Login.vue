<template>
  <div class="col-md-12">
    <div class="card card-container">
      <!-- <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      /> -->
      <center>
        <h3>User Login</h3>
      </center>
      <form name="user" @submit.prevent="login">
        <div class="form-group">
          <label for="email">E-mail</label>
          <input
            v-model="user.email"
            v-validate="'required'"
            type="email"
            class="form-control"
            name="email"
          />
          <div
            v-if="errors.has('email')"
            class="alert alert-danger"
            role="alert"
          >
            E-mail is required!
          </div>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            v-model="user.password"
            v-validate="'required'"
            type="password"
            class="form-control"
            name="password"
          />
          <div
            v-if="errors.has('password')"
            class="alert alert-danger"
            role="alert"
          >
            Password is required!
          </div>
        </div>
        <div class="form-group">
          <button
            type="submit"
            class="btn btn-primary btn-block"
            :disabled="loginLoading"
          >
            <span
              v-show="loginLoading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Login</span>
          </button>
        </div>
        <div class="form-group">
          <router-link to="/register">
            <button
              type="button"
              class="btn btn-primary btn-block"
              :disabled="loginLoading"
            >
              <span
                v-show="loginLoading"
                class="spinner-border spinner-border-sm"
              ></span>
              <span>Sign Up</span>
            </button>
          </router-link>
          <vue-telegram-login
            class="telegram-login"
            mode="callback"
            telegram-login="fubokbot"
            @callback="telegramLoginCallback"
          />
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<style scoped>
/* #input-group-email {
  margin: 5vw auto 0 auto;
  padding: 0 5vw;
}
#input-group-password {
  margin: 2vw auto;
  padding: 0 5vw;
}
.login-button-group {
  margin: 2vw auto;
  padding: 0 7vw;
} */

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

.telegram-login {
  margin: 2vw auto;
}
</style>

<script>
import { vueTelegramLogin } from "vue-telegram-login";
// import { VueAuthenticate } from "vue-authenticate";
import router from "../router";
import { mapState, mapGetters } from "vuex";
import store from "../store/store.js";
export default {
  name: "login",
  // props: ["username", "email", "password"],
  components: {
    vueTelegramLogin
  },
  store,
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      message: "",
      show: true
    };
  },
  computed: {
    ...mapState(["isLoggedIn", "loginId", "loginLoading"]),
    ...mapGetters(["getIsLoggedIn", "getLoginId"])
  },
  beforeMounted() {
    this.updateLoginLoading();
  },
  methods: {
    updateLoginLoading: function() {
      store.commit("updateLoginLoading", false);
    },
    telegramLoginCallback(user) {
      console.log(" logged in as : ", user);
      this.$store.commit("updateLoginStatus", true);
      this.$router.push("/memberInfo");
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.user.email = "";
      this.user.password = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    login: function() {
      store.state.loginLoading = true;
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          store.state.loginLoading = false;
          return;
        }
        if (this.user.email && this.user.password) {
          let loginInput = {
            email: this.user.email,
            password: this.user.password
          };
          this.$auth.login(loginInput).then(function(response) {
            // Execute application logic after successful login
            console.log("response->", response);
            if (response.data == "LOGIN_SUCCESS") {
              store.commit("updateLoginStatus", true);
              store.state.loginId = loginInput.email;
              router.push("/memberinfo");
            } else if (response.data == "LOGIN_FAILED") {
              // prompt error message
              this.data.message = "you failed";
            }
            store.state.loginLoading = false;
            // store.state.isLoggedIn = true;
          });
        }
      });
    }
  },
  created() {
    if (store.state.isLoggedIn) {
      console.log("already logged. Going to promotion page");
      store.commit("updateLoginLoading", false);
      this.$router.push("/promotion");
    } else {
      console.log("not logged in ");
    }
  }
};
</script>
