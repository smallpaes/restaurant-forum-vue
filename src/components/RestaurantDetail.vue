<template>
  <div class="row">
    <div class="col-md-12 mb-3">
      <h1>{{restaurant.name}}</h1>
      <p class="badge badge-secondary mt-1 mb-3">{{restaurant.categoryName}}</p>
    </div>
    <div class="col-lg-4">
      <img
        class="img-responsive center-block"
        :src="restaurant.image | placeholderImage"
        style="width: 250px;margin-bottom: 25px;"
      />
      <div class="contact-info-wrap">
        <ul class="list-unstyled">
          <li>
            <strong>Opening Hour:</strong>
            {{restaurant.openingHours}}
          </li>
          <li>
            <strong>Tel:</strong>
            {{restaurant.tel}}
          </li>
          <li>
            <strong>Address:</strong>
            {{restaurant.address}}
          </li>
        </ul>
      </div>
    </div>
    <div class="col-lg-8">
      <p>{{ restaurant.description }}</p>
      <router-link
        :to="{name: 'restaurant-dashboard', params: {id: restaurant.id}}"
        class="btn btn-primary btn-border mr-2"
      >Dashboard</router-link>
      <button
        v-if="restaurant.isFavorited"
        @click.stop.prevent="deleteFavorite(restaurant.id)"
        :disabled="isProcessingFavorite"
        type="button"
        class="btn btn-danger btn-border mr-2"
      >移除最愛</button>
      <button
        v-else
        @click.stop.prevent="addFavorite(restaurant.id)"
        :disabled="isProcessingFavorite"
        type="button"
        class="btn btn-primary btn-border mr-2"
      >加到最愛</button>
      <button
        v-if="restaurant.isLiked"
        @click.stop.prevent="deleteLike(restaurant.id)"
        :disabled="isProcessingLike"
        type="button"
        class="btn btn-danger like mr-2"
      >Unlike</button>
      <button
        v-else
        @click.stop.prevent="addLike(restaurant.id)"
        :disabled="isProcessingLike"
        type="button"
        class="btn btn-primary like mr-2"
      >Like</button>
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
    initialRestaurant: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      restaurant: this.initialRestaurant,
      isProcessingLike: false,
      isProcessingFavorite: false
    };
  },
  watch: {
    initialRestaurant(restaurant) {
      this.restaurant = {
        ...this.restaurant,
        ...restaurant
      };
    }
  },
  methods: {
    async addFavorite(restaurantId) {
      try {
        // updating isProcessingLike status
        this.isProcessingFavorite = true;

        const { data, statusText } = await userAPI.addFavorite({
          restaurantId
        });
        // error handling
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        this.restaurant = {
          ...this.restaurant,
          isFavorited: true
        };

        // updating isProcessingLike status
        this.isProcessingFavorite = false;
      } catch (error) {
        // updating isProcessingLike status
        this.isProcessingFavorite = false;
        Toast.fire({
          type: "error",
          title: "Cannot add to favorite, please try again later!"
        });
      }
    },
    async deleteFavorite(restaurantId) {
      try {
        // updating isProcessingLike status
        this.isProcessingFavorite = true;

        const { data, statusText } = await userAPI.deleteFavorite({
          restaurantId
        });

        // error handling
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        this.restaurant = {
          ...this.restaurant,
          isFavorited: false
        };

        // updating isProcessingLike status
        this.isProcessingFavorite = false;
      } catch (error) {
        // updating isProcessingLike status
        this.isProcessingFavorite = false;
        Toast.fire({
          type: "error",
          title: "Cannot remove from favorite, please try again later!"
        });
      }
    },
    async addLike(restaurantId) {
      try {
        // updating isProcessingLike status
        this.isProcessingLike = true;

        const { data, statusText } = await userAPI.addLike({ restaurantId });

        // error handling
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        this.restaurant = {
          ...this.restaurant,
          isLiked: true
        };

        // updating isProcessingLike status
        this.isProcessingLike = false;
      } catch (error) {
        // updating isProcessingLike status
        this.isProcessingLike = false;
        Toast.fire({
          type: "error",
          title: "Cannot like the restaurant, please try again later!"
        });
      }
    },
    async deleteLike(restaurantId) {
      try {
        // updating isProcessingLike status
        this.isProcessingLike = true;

        const { data, statusText } = await userAPI.deleteLike({ restaurantId });

        // error handling
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        this.restaurant = {
          ...this.restaurant,
          isLiked: false
        };

        // updating isProcessingLike status
        this.isProcessingLike = false;
      } catch (error) {
        // updating isProcessingLike status
        this.isProcessingLike = false;
        Toast.fire({
          type: "error",
          title: "Cannot unlike the restaurant, please try again later!"
        });
      }
    }
  }
};
</script>