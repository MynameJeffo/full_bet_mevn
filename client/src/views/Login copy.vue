<template>
  <div class="container">
    <b-form class="row" @submit="login" @reset="onReset">
      <b-form-group
        id="input-group-email"
        class="col-7"
        label="User Name"
        label-for="input-email"
      >
        <b-form-input
          id="input-email"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-password"
        label="Password"
        class="col-7"
        label-for="input-password"
      >
        <b-form-input
          id="input-password"
          v-model="form.name"
          type="password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>
      <b-form-group class="col-7 login-button-group">
        <b-button class="float-left btn btn-warning">Register</b-button>
        <b-button class="float-right reset-button" type="reset" variant="danger"
          >Reset</b-button
        >
        <b-button class="float-right login-button" type="submit"
          >Login</b-button
        >
      </b-form-group>
      <b-form-group class="col-9 col-offset-2 login-button-group">
        <vue-telegram-login
          class="telegram-login"
          mode="callback"
          telegram-login="fubokbot"
          @callback="loginCallback"
        />
      </b-form-group>
    </b-form>
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
  props: ["username", "email", "password"],
  components: {
    vueTelegramLogin
  },
  store,
  computed: {
    ...mapState(["isLoggedIn", "loginId"]),
    ...mapGetters(["getIsLoggedIn", "getLoginId"])
  },
  methods: {
    telegramLoginCallback(user) {
      console.log(" logged in as : ", user);
      this.$store.commit("updateLoginStatus", true);
      this.$router.push("/memberInfo");
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    login: function() {
      this.loading = true;
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          this.loading = false;
          return;
        }
        if (this.form.email && this.form.password) {
          let loginInput = {
            email: this.form.email,
            password: this.form.password
          };
          this.$auth.login(loginInput).then(function() {
            // Execute application logic after successful login
            () => {
              console.log("Login-> ", loginInput);
              //email password store to database
              this.loading = false;
              store.state.isLoggedIn = true;
              store.state.loginId = this.form.email;
              router.push("/memberinfo");
            },
              error => {
                this.loading = false;
                this.message =
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString();
              };
          });
        }
      });
    },
    register: function() {
      let registerInput = {
        name: this.form.name,
        email: this.form.email,
        password: this.form.password
      };
      this.$auth.register(registerInput).then(function() {
        // put email, password into memberInfo collection
        // keep track of login record -> email as pimary key
        // keep track of user register record
        console.log("Register-> ", registerInput);
        //store register record to DB,
        //prompt successful registration
        router.push("/login");
      });
    }
  },
  created() {
    if (this.$store.state.isLoggedIn == true) {
      this.$router.push("/promotion");
      console.log("already logged. Going to promotion page");
    } else {
      console.log("not logged in ");
    }
  },
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        loading: false
      },
      show: true
    };
  }
};
</script>
