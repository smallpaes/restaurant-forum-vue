<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">美食達人</h1>
    <hr />

    <div class="row text-center">
      <!--User Card-->
      <!-- <UserCard v-for="user in users" :key="user.id" :initial-user="user" /> -->
      <div v-for="user in users" :key="user.id" class="col-6 col-md-3">
        <a href="#">
          <img :src="user.image" width="140px" height="140px" />
        </a>
        <h2>{{user.name}}</h2>
        <span class="badge badge-secondary">追蹤人數：{{user.FollowerCount}}</span>
        <p class="mt-3">
          <button
            v-if="user.isFollowed"
            @click.stop.prevent="unfollow(user.id)"
            type="button"
            class="btn btn-danger"
          >取消追蹤</button>
          <button
            v-else
            @click.stop.prevent="follow(user.id)"
            type="button"
            class="btn btn-primary"
          >追蹤</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import userAPI from "../apis/users";
import { Toast } from "../utils/helpers";
import NavTabs from "../components/NavTabs";

export default {
  data() {
    return {
      users: []
    };
  },
  components: {
    NavTabs
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
    },
    async follow(userId) {
      try {
        const { data, statusText } = await userAPI.addFollowing({ userId });
        // error handling
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        // update user data
        this.users = this.users
          .map(user => {
            if (user.id !== userId) {
              return user;
            }
            return {
              ...user,
              isFollowed: true,
              FollowerCount: (user.FollowerCount += 1)
            };
          })
          .sort((a, b) => b.FollowerCount - a.FollowerCount);
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "Cannot follow this user, please try again later"
        });
      }
    },
    async unfollow(userId) {
      try {
        const { data, statusText } = await userAPI.removeFollowing({ userId });
        // error handling
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        //update user data
        this.users = this.users
          .map(user => {
            if (user.id !== userId) {
              return user;
            }
            return {
              ...user,
              isFollowed: false,
              FollowerCount: (user.FollowerCount -= 1)
            };
          })
          .sort((a, b) => b.FollowerCount - a.FollowerCount);
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "Cannnot unfollow this user, please try again later"
        });
      }
    }
  }
};
</script>