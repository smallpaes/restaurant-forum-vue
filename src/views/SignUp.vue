<template>
  <div class="row">
    <div class="auth-form-container shadow-sm mt-5">
      <div class="cover-photo">
        <div class="overlay"></div>
        <h2>Sign Up</h2>
      </div>
      <form class="form-signup bg-white" @submit.stop.prevent="handleSubmit">
        <div class="form-group">
          <label for="name" class="m-0 text-secondary">
            <small>Name</small>
          </label>
          <input
            id="name"
            v-model="name"
            name="name"
            type="text"
            class="form-control"
            required
            autofocus
          />
        </div>
        <div class="form-group">
          <label for="email" class="m-0 text-secondary">
            <small>Email</small>
          </label>
          <input id="email" v-model="email" name="email" type="email" class="form-control" required />
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
        <div class="form-group">
          <label for="password-check" class="m-0 text-secondary">
            <small>Password Check</small>
          </label>
          <input
            id="password-check"
            v-model="passwordCheck"
            name="passwordCheck"
            type="password"
            class="form-control"
            required
          />
        </div>
        <div class="buttons sign-up-buttons text-center">
          <button :disabled="isProcessing" class="btn mx-2 signup w-50" type="submit">Sign Up</button>
          <router-link to="/signin" class="btn login w-50 mt-1">Sign In</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import authorizationAPI from "../apis/authorization";
import { Toast } from "../utils/helpers";

export default {
  name: "SignUp",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
      isProcessing: false
    };
  },
  methods: {
    async handleSubmit(e) {
      // check empty input field
      if (!this.name || !this.email || !this.password || !this.passwordCheck) {
        Toast.fire({
          type: "error",
          title: "You have missed some fields, please enter all the info "
        });
        return;
      }
      // check if password matches passwordCheck
      if (this.password !== this.passwordCheck) {
        Toast.fire({
          type: "error",
          title: "Passwords do not match"
        });
        return;
      }

      // change isProcessing status
      this.isProcessing = true;

      try {
        const { data, statusText } = await authorizationAPI.signUp({
          name: this.name,
          email: this.email,
          password: this.password,
          passwordCheck: this.passwordCheck
        });
        // error handling
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        // redirect to login page
        this.$router.push({ name: "sign-in" });
      } catch (error) {
        // change isProcessing status
        this.isProcessing = false;
        Toast.fire({
          type: "error",
          title: "Signup failed, please try again later"
        });
      }
    }
  }
};
</script>