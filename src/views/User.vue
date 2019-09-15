<template>
  <Spinner v-if="isLoading" />
  <div v-else class="album py-5 bg-light">
    <div class="container">
      <UserProfileCard
        :profile="profile"
        :initial-is-followed="isFollowed"
        :currentUser="currentUser"
        @handle-after-following="handleAfterFollowing"
        @handle-after-unfollowing="handleAfterUnfollowing"
      />
      <div class="row">
        <div class="col-md-4">
          <UserFollowingsCard :following-users="profile.Followings" />
          <br />
          <UserFollowersCard :followers="profile.Followers" />
        </div>
        <div class="col-md-8">
          <UserCommentsCard :comments="profile.Comments" />
          <br />
          <UserFavoritedRestaurantsCard :favorite-restaurants="profile.FavoritedRestaurants" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserProfileCard from "../components/UserProfileCard";
import UserFollowingsCard from "../components/UserFollowingsCard";
import UserFollowersCard from "../components/UserFollowersCard";
import UserCommentsCard from "../components/UserCommentsCard";
import UserFavoritedRestaurantsCard from "../components/UserFavoritedRestaurantsCard";
import userAPI from "../apis/users";
import Spinner from "../components/Spinner";
import { mapState } from "vuex";
import { Toast } from "../utils/helpers";
import { mkdir } from "fs";

export default {
  data() {
    return {
      profile: {
        id: -1,
        name: "",
        email: "",
        isAdmin: true,
        image: "https://i.imgur.com/58ImzMM.png",
        Comments: [],
        FavoritedRestaurants: [],
        Followers: [],
        Followings: []
      },
      isFollowed: false,
      isLoading: true
    };
  },
  components: {
    UserProfileCard,
    UserFollowingsCard,
    UserFollowersCard,
    UserCommentsCard,
    UserFavoritedRestaurantsCard,
    Spinner
  },
  computed: {
    ...mapState(["currentUser"])
  },
  created() {
    const { id: userId } = this.$route.params;
    this.fetchUser(userId);
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params;
    this.fetchUser(id);
    next();
  },
  methods: {
    async fetchUser(userId) {
      try {
        // update loading status
        this.isLoading = true;
        const { data, statusText } = await userAPI.get({ userId });
        // error handling
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        // update data
        this.profile = {
          id: data.owner.id,
          name: data.owner.name,
          email: data.owner.email,
          isAdmin: data.owner.isAdmin,
          image: data.owner.image,
          Comments: data.owner.Comments,
          FavoritedRestaurants: data.owner.FavoritedRestaurants,
          Followers: data.owner.Followers,
          Followings: data.owner.Followings
        };
        this.isFollowed = data.owner.isFollowed;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          type: "error",
          title: "Cannot get profile, please try again later!"
        });
      }
    },
    handleAfterFollowing() {
      this.profile.Followers.push({
        id: this.currentUser.id,
        image: this.currentUser.image
      });
    },
    handleAfterUnfollowing() {
      this.profile.Followers = this.profile.Followers.filter(
        user => user.id !== this.currentUser.id
      );
    }
  }
};
</script>