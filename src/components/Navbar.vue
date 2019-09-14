<template>
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top px-4">
    <router-link class="navbar-brand text-white" to="/">
      <i class="fas fa-utensils mr-1 text-white"></i>
      餐廳評論網
    </router-link>

    <template v-if="isAuthenticated">
      <button
        class="navbar-toggler text-white"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>
    </template>

    <div id="navbarSupportedContent" class="navbar-collapse collapse">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item d-flex align-items-center">
          <!-- if user is admin -->
          <router-link
            v-if="currentUser.isAdmin"
            to="/admin"
            class="text-white mr-3 nav-link underline-animation"
          >管理員後台</router-link>
        </li>
        <!-- is user is login -->
        <template v-if="isAuthenticated">
          <li class="nav-item d-flex align-items-center">
            <router-link
              :to="{name: 'user', params: {id: currentUser.id}}"
              class="text-white mr-3 nav-link underline-animation"
            >{{currentUser.name || '使用者'}} 您好</router-link>
          </li>
          <li class="nav-item d-flex align-items-center">
            <button
              @click.stop.prevent="logout"
              type="button"
              class="btn btn-sm btn-outline-light my-2 my-lg-0 nav-link py-1 px-3"
            >登出</button>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Navbar",
  computed: {
    ...mapState(["currentUser", "isAuthenticated"])
  },
  methods: {
    logout() {
      this.$store.commit("revokeAuthentication");
      this.$router.push("/signin");
    }
  }
};
</script>

<style scoped>
nav {
  background: #c22424;
  text-shadow: 0.7px 0.7px 0px rgba(58, 56, 56, 0.61);
}

.navbar-toggler {
  border-color: transparent;
}

.navbar-nav .nav-item button {
  color: rgb(255, 255, 255);
}

.navbar-nav .nav-item button:hover {
  color: #c22424;
}

.underline-animation::after {
  border-bottom: 2px solid rgb(255, 255, 255);
}
</style>