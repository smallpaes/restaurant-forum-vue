<template>
  <div class="card mb-3">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img :src="profile.image | placeholderImage" width="300px" height="300px" />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{profile.name}}</h5>
          <p class="card-text">{{profile.email}}</p>
          <ul class="list-unstyled list-inline">
            <li>
              <strong>{{profile.Comments.length}}</strong> 已評論餐廳
            </li>
            <li>
              <strong>{{profile.FavoritedRestaurants.length}}</strong> 收藏的餐廳
            </li>
            <li>
              <strong>{{profile.Followings.length}}</strong> followings (追蹤者)
            </li>
            <li>
              <strong>{{profile.Followers.length}}</strong> followers (追隨者)
            </li>
          </ul>
          <p>
            <router-link
              v-if="currentUser.id === profile.id"
              :to="{name: 'user-edit', params: {id: profile.id}}"
              class="btn btn-primary"
              role="button"
            >Edit</router-link>
            <button
              v-else-if="isFollowed"
              @click.stop.prevent="deleteFollowing(profile.id)"
              type="button"
              class="btn btn-danger"
            >取消追蹤</button>
            <button
              v-else
              type="button"
              @click.stop.prevent="addFollowing(profile.id)"
              class="btn btn-info"
            >追蹤</button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { placeholderImageCreator } from "../utils/mixins";
import userAPI from "../apis/users";
import { Toast } from "../utils/helpers";

export default {
  mixins: [placeholderImageCreator],
  props: {
    profile: {
      type: Object,
      required: true
    },
    initialIsFollowed: {
      type: Boolean,
      required: true
    },
    currentUser: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isFollowed: this.initialIsFollowed
    };
  },
  watch: {
    initialIsFollowed(isFollowed) {
      this.isFollowed = isFollowed;
    }
  },
  methods: {
    async addFollowing(userId) {
      try {
        const { data, statusText } = await userAPI.addFollowing({ userId });
        // error handling
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        this.isFollowed = true;
        this.$emit("handle-after-following");
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "Cannot follow this user, please try again later"
        });
      }
    },
    async deleteFollowing(userId) {
      try {
        const { data, statusText } = await userAPI.removeFollowing({ userId });
        // error handling
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        this.isFollowed = false;
        this.$emit("handle-after-unfollowing");
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "Cannot unfollow this user, please try again later"
        });
      }
    }
  }
};
</script>