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
            <a v-if="currentUser.id === profile.id" href="/users/1/edit">
              <button type="submit" class="btn btn-primary">edit</button>
            </a>
            <button
              v-else-if="isFollowed"
              @click.stop.prevent="deleteFollowing"
              type="button"
              class="btn btn-danger"
            >取消追蹤</button>
            <button v-else type="button" @click.stop.prevent="addFollowing" class="btn btn-info">追蹤</button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { placeholderImageCreator } from "../utils/mixins";

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
  methods: {
    addFollowing() {
      this.isFollowed = true;
    },
    deleteFollowing() {
      this.isFollowed = false;
    }
  }
};
</script>