<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">美食達人</h1>
    <hr />

    <div class="row text-center">
      <!--User Card-->
      <UserCard v-for="user in users" :key="user.id" :initial-user="user" />
    </div>
  </div>
</template>

<script>
import userAPI from "../apis/users";
import { Toast } from "../utils/helpers";
import NavTabs from "../components/NavTabs";
import UserCard from "../components/UserCard";

export default {
  data() {
    return {
      users: []
    };
  },
  components: {
    NavTabs,
    UserCard
  },
  created() {
    this.fetchUser();
  },
  methods: {
    async fetchUser() {
      try {
        const { data, statusText } = await userAPI.getTopUser();
        // error handling
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        // update user data
        this.users = data.users;
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "Cannot get top users, please try again later"
        });
      }
    }
  }
};
</script>