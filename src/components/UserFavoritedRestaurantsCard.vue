<template>
  <div class="card shadow-sm mt-4" id="favorite">
    <h6 class="mt-4 mb-1 pl-4 header">{{favoriteRestaurants.length}} 收藏的餐廳</h6>
    <hr class="mx-3" />
    <div class="card-body">
      <div class="row">
        <template v-if="favoriteRestaurants.length > 0">
          <router-link
            class="col-12 media my-2"
            v-for="restaurant in favoriteRestaurants"
            :key="restaurant.id"
            :to="{name: 'restaurant', params: {id: restaurant.id}}"
          >
            <div class="media-image mr-3 position-relative">
              <div class="loader-container text-center">
                <div class="loader"></div>
              </div>
              <img
                :src="restaurant.image | placeholderImage"
                alt="restaurant image"
                class="rounded"
              />
            </div>
            <div class="media-body text-truncate">
              <h6 class="mt-0 text-truncate m-0">{{restaurant.name}}</h6>
              <p class="text-truncate text-muted font-italic m-0">{{restaurant.Category.name}}</p>
            </div>
          </router-link>
        </template>
        <template v-else>
          <h5 class="col-12 text-center p-3 m-0 text-muted">
            <i class="far fa-paper-plane mr-2"></i>No Favorite Restaurant Yet!
          </h5>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { placeholderImageCreator } from "../utils/mixins";

export default {
  mixins: [placeholderImageCreator],
  props: {
    favoriteRestaurants: {
      type: Array,
      required: true
    }
  }
};
</script>