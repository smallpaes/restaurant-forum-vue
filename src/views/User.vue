<template>
  <section>
    <Spinner v-if="isLoading" />
    <transition name="slide">
      <div v-if="!isLoading" class="container py-3">
        <div class="row">
          <UserProfileCard
            :profile="profile"
            :initial-is-followed="isFollowed"
            :currentUser="currentUser"
            @handle-after-following="handleAfterFollowing"
            @handle-after-unfollowing="handleAfterUnfollowing"
          />
          <section class="col-12 col-md-5">
            <UserFollowingsCard :following-users="profile.Followings" />
            <UserFollowersCard :followers="profile.Followers" />
          </section>

          <section class="col-12 col-md-7">
            <UserCommentsCard :comments="profile.Comments" />
            <UserFavoritedRestaurantsCard :favorite-restaurants="profile.FavoritedRestaurants" />
          </section>
        </div>
      </div>
    </transition>
  </section>
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

<style scoped>
/*display area  size*/
#following .card-body,
#follower .card-body,
#comment .card-body,
#favorite .card-body {
  max-height: 280px;
  overflow-y: scroll;
}

.header {
  color: rgb(100, 100, 100);
  font-size: 1.2rem;
}

/*User Profile*/
.user-name {
  color: #379683;
}

.btn-group-sm > .btn,
.btn-sm {
  border-radius: 1rem;
}

.btn-outline-secondary.focus,
.btn-outline-secondary:focus,
.btn.focus,
.btn:focus {
  box-shadow: none;
}

/*Commented Restaurants*/
a.media {
  color: rgb(100, 100, 100);
}

a.media:hover {
  color: rgb(73, 73, 73);
}

.media .media-image {
  width: 64px;
  height: 64px;
}

.media .media-image .loader-container {
  position: relative;
  display: inline-block;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.media .media-image .loader {
  border: 4px solid #f3f3f3;
  border-top: 5px solid rgb(133, 133, 133);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 2s linear infinite;
}

/*Control spin steps*/
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@-moz-keyframes spin {
  0% {
    -moz-transform: rotate(0deg);
  }
  100% {
    -moz-transform: rotate(360deg);
  }
}

@-o-keyframes spin {
  0% {
    -o-transform: rotate(0deg);
  }
  100% {
    -o-transform: rotate(360deg);
  }
}

.media img {
  position: absolute;
  top: 0;
  left: 0;
  max-width: 64px;
  height: auto;
}

/*md size*/
@media screen and (min-width: 768px) {
  /*display area  size*/
  #following .card-body,
  #follower .card-body,
  #comment .card-body,
  #favorite .card-body {
    height: 280px;
  }
}
</style>