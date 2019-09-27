<template>
  <div class="container py-3">
    <transition enter-active-class="animated fadeIn" appear>
      <!--NavTabs-->
      <NavTabs />
    </transition>
    <Spinner v-if="isLoading" />
    <transition enter-active-class="animated fadeIn">
      <div v-if="!isLoading" class="row text-center mt-3">
        <!--User Card-->
        <div v-for="user in users" :key="user.id" class="col-12 col-md-6 col-lg-3 my-3">
          <router-link :to="{name: 'user', params: {id: user.id}}">
            <img :src="user.image | placeholderImage" class="rounded-circle img-thumbnail avatar" />
          </router-link>
          <h4 class="topic mb-0 mt-2">{{user.name}}</h4>
          <p class="text-secondary d-block follower">追蹤人數：{{user.FollowerCount}}</p>
          <p class="mt-2">
            <router-link
              v-if="currentUser.id === user.id"
              :to="{name: 'user-edit', params: {id: user.id}}"
              role="button"
              class="btn red-btn btn-sm mt-0"
            >編輯</router-link>
            <button
              v-else-if="user.isFollowed"
              @click.stop.prevent="unfollow(user.id)"
              type="button"
              class="btn red-btn btn-sm mt-0"
            >取消追蹤</button>
            <button
              v-else
              @click.stop.prevent="follow(user.id)"
              type="button"
              class="btn red-btn btn-sm mt-0"
            >追蹤</button>
          </p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import userAPI from "../apis/users";
import { Toast } from "../utils/helpers";
import NavTabs from "../components/NavTabs";
import { placeholderImageCreator } from "../utils/mixins";
import { mapState } from "vuex";
import Spinner from "../components/Spinner";

export default {
  mixins: [placeholderImageCreator],
  computed: {
    ...mapState(["currentUser"])
  },
  data() {
    return {
      users: [],
      isLoading: true
    };
  },
  components: {
    NavTabs,
    Spinner
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
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
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

<style scoped>
.avatar {
  width: 30%;
}

.btn-group-sm > .btn,
.btn-sm {
  border-radius: 0.2rem;
  padding: 0.1rem 0.8rem;
}

/*md size*/
@media screen and (min-width: 768px) {
  /*Top User Section*/
  .avatar {
    width: 40%;
  }
}

/*lg size*/
@media screen and (min-width: 992px) {
  /*Top User Section*/
  .avatar {
    width: 55%;
  }
}
</style>