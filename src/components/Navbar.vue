<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
    <router-link class="navbar-brand" to="/">餐廳評論網</router-link>

    <template v-if="isAuthenticated">
      <button
        class="navbar-toggler"
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
        <li class="nav-item">
          <!-- if user is admin -->
          <router-link v-if="currentUser.isAdmin" to="/admin" class="text-white mr-3 nav-link">管理員後台</router-link>
        </li>
        <!-- is user is login -->
        <template v-if="isAuthenticated">
          <li class="nav-item">
            <router-link
              :to="{name: 'user', params: {id: currentUser.id}}"
              class="text-white mr-3 nav-link"
            >{{currentUser.name || '使用者'}} 您好</router-link>
          </li>
          <li class="nav-item d-none d-lg-inline">
            <button
              @click.stop.prevent="logout"
              type="button"
              class="btn btn-sm btn-outline-success my-2 my-sm-0 nav-link"
            >登出</button>
          </li>
          <li class="nav-item d-lg-none">
            <button
              @click.stop.prevent="logout"
              type="button"
              class="btn btn-link nav-link text-white"
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