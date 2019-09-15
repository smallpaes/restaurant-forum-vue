<template>
  <div class="row">
    <div class="auth-form-container shadow-sm mt-5">
      <div class="cover-photo">
        <div class="overlay"></div>
        <h2>Sign In</h2>
      </div>
      <form class="form-signin bg-white" @submit.prevent.stop="handleSubmit">
        <div class="form-group">
          <label for="email" class="m-0 text-secondary">
            <small>User Email</small>
          </label>
          <input
            id="email"
            v-model="email"
            name="email"
            type="email"
            class="form-control"
            required
            autofocus
          />
        </div>
        <div class="form-group">
          <label for="password" class="m-0 text-secondary">
            <small>Password</small>
          </label>
          <input
            id="password"
            v-model="password"
            name="password"
            type="password"
            class="form-control"
            required
          />
        </div>

        <div class="buttons log-in-buttons text-center">
          <button :disabled="isProcessing" class="btn mx-2 login w-50" type="submit">Log In</button>
          <router-link to="/signup" class="btn signup w-50 mt-1">Sign Up</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import authorizationAPI from "../apis/authorization";
import { Toast } from "../utils/helpers";

export default {
  name: "SignIn",
  data() {
    return {
      email: "",
      password: "",
      isProcessing: false
    };
  },
  methods: {
    async handleSubmit(e) {
      // validate email and password format
      if (!this.email || !this.password) {
        Toast.fire({
          type: "warning",
          title: "Please enter email and password"
        });
        return;
      }

      // change button disable status
      this.isProcessing = true;

      try {
        // send login form to API
        const { data, statusText } = await authorizationAPI.signIn({
          email: this.email,
          password: this.password
        });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        // save token to local storage
        localStorage.setItem("token", data.token);

        // send user data to Vuex
        this.$store.commit("setCurrentUser", data.user);

        // redirect back to restaurant home page
        this.$router.push("/restaurants");
      } catch (error) {
        // clear password field
        this.password = "";
        // change button disable status
        this.isProcessing = false;
        // show error message
        Toast.fire({
          type: "warning",
          title: "Wrong email or password"
        });
        console.log("error", error);
      }
    }
  }
};
</script>