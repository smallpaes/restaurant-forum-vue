<template>
  <section class="col-12 row m-0 p-0">
    <section class="col-12 col-md-5" id="profile-section">
      <!--Personal Info-->
      <ul class="list-group text-center shadow-sm">
        <li class="list-group-item p-0 pt-4 px-2 border-0 avatar">
          <img
            :src="profile.image | placeholderImage"
            alt="avatar"
            class="img-thumbnail rounded-circle border-0 w-50"
          />
        </li>
        <li class="list-group-item p-0 pt-2 px-2 border-0">
          <h4 class="m-0 user-name">{{profile.name}}</h4>
        </li>
        <li class="list-group-item p-0 border-0 px-2 text-secondary">{{profile.email}}</li>
        <li v-if="currentUser.id === profile.id" class="list-group-item py-4 px-2 border-0">
          <router-link
            :to="{name: 'user-edit', params: {id: profile.id}}"
            class="btn red-btn btn-sm px-2 py-0 align-self-end"
            role="button"
          >Edit</router-link>
        </li>
        <li v-else-if="isFollowed" class="list-group-item py-4 px-2 border-0">
          <button
            @click.stop.prevent="deleteFollowing(profile.id)"
            type="button"
            class="btn red-btn btn-sm px-2 py-0 align-self-end"
          >
            <i class="fas fa-star mr-1"></i>取消追蹤
          </button>
        </li>
        <li v-else class="list-group-item py-4 px-2 border-0">
          <button
            type="button"
            @click.stop.prevent="addFollowing(profile.id)"
            class="btn red-btn btn-sm px-2 py-0 align-self-end"
          >
            <i class="far fa-star mr-1"></i>追蹤
          </button>
        </li>
      </ul>
    </section>
    <section class="col-12 col-md-7" id="status-section">
      <!--Data Summary-->
      <div class="row bg-white shadow-sm rounded text-center text-secondary w-100 mx-0 h-100">
        <div class="col-6 px-3 py-4 d-flex flex-column justify-content-center">
          <h2 class="mb-2">{{profile.Comments.length}}</h2>
          <p class="m-0">已評論餐廳</p>
        </div>
        <div class="col-6 px-3 py-4 d-flex flex-column justify-content-center">
          <h2 class="mb-2">{{profile.FavoritedRestaurants.length}}</h2>
          <p class="m-0">收藏的餐廳</p>
        </div>
        <div class="col-6 px-3 py-4 d-flex flex-column justify-content-center">
          <h2 class="mb-2">{{profile.Followings.length}}</h2>
          <p class="m-0">已追蹤用戶</p>
        </div>
        <div class="col-6 px-3 py-4 d-flex flex-column justify-content-center">
          <h2 class="mb-2">{{profile.Followers.length}}</h2>
          <p class="m-0">用戶追蹤</p>
        </div>
      </div>
    </section>
  </section>
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

<style scoped>
.fa-star {
  color: #c22424;
}

.red-btn:hover .fa-star {
  color: white;
  transition: color 0.15s ease-in-out;
}

/*md size*/
@media screen and (min-width: 768px) {
  /*display area  size*/
  li.avatar {
    min-height: 127px;
  }
}

/*lg size*/
@media screen and (min-width: 992px) {
  /*display area  size*/
  li.avatar {
    min-height: 177px;
  }
}

/*xl size*/
@media screen and (min-width: 1200px) {
  /*display area  size*/
  li.avatar {
    min-height: 214px;
  }
}
</style>