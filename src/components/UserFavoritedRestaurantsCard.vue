<template>
  <div class="card">
    <div class="card-header">
      <strong>{{favoriteRestaurants.length}}</strong> 收藏的餐廳
    </div>
    <div class="card-body">
      <router-link
        v-for="restaurant in favoriteRestaurants"
        :key="restaurant.id"
        :to="{name: 'restaurant', params: {id: restaurant.id}}"
      >
        <img :src="restaurant.image | placeholderImage" width="60" height="60" class="avatar" />
      </router-link>
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