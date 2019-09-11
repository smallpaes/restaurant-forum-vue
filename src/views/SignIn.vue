<template>
  <div class="container py-5">
    <form class="w-100" @submit.prevent.stop="handleSubmit">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">Sign In</h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="email">email</label>
        <input
          id="email"
          v-model="email"
          name="email"
          type="email"
          class="form-control"
          placeholder="email"
          required
          autofocus
        />
      </div>

      <div class="form-label-group mb-3">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          name="password"
          type="password"
          class="form-control"
          placeholder="Password"
          required
        />
      </div>

      <button
        :disabled="isProcessing"
        class="btn btn-lg btn-primary btn-block mb-3"
        type="submit"
      >Submit</button>

      <div class="text-center mb-3">
        <p>
          <router-link to="/signup">Sign Up</router-link>
        </p>
      </div>

      <p class="mt-5 mb-3 text-muted text-center">&copy; 2017-2018</p>
    </form>
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