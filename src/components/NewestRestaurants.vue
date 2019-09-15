<template>
  <div class="card mt-3 border-0 shadow-sm">
    <div class="card-header bg-white border-0">
      <p class="border-bottom m-0 pb-2">
        <i class="fas fa-store-alt mr-2"></i>最新餐廳
      </p>
    </div>
    <div class="card-body">
      <div v-for="restaurant in restaurants" :key="restaurant.id">
        <div class="d-flex justify-content-between">
          <h4 class="m-0">
            <router-link :to="{name: 'restaurant', params: {id: restaurant.id}}">{{restaurant.name}}</router-link>
          </h4>
          <small class="datetime d-block text-right">{{restaurant.createdAt | fromNow}}</small>
        </div>
        <small class="category">{{restaurant.Category && restaurant.Category.name}}</small>
        <p v-if="restaurant.description" class="mt-3">{{restaurant.description | shortenContent}}</p>
        <p v-else class="mt-3">No description</p>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import { fromNowFilter, shortenContentFilter } from "../utils/mixins";

export default {
  mixins: [fromNowFilter, shortenContentFilter],
  props: {
    restaurants: {
      type: Array,
      required: true
    }
  }
};
</script>
