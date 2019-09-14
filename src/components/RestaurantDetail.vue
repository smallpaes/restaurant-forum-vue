<template>
  <div class="row shadow-sm rounded-lg">
    <div class="col-md-12 mb-3">
      <h1>{{restaurant.name}}</h1>
      <p class="badge badge-secondary mt-1 mb-3">{{restaurant.categoryName}}</p>
    </div>
    <div class="col-md-4">
      <div class="restaurant-image position-relative">
        <img class="img-fluid rounded" :src="restaurant.image | placeholderImage" />
        <div class="save-like-buttons d-flex">
          <button
            v-if="restaurant.isFavorited"
            @click.stop.prevent="deleteFavorite(restaurant.id)"
            :disabled="isProcessingFavorite"
            type="button"
            class="btn favorite-btn"
          >
            <i class="fas fa-bookmark text-warning"></i>
          </button>
          <button
            v-else
            @click.stop.prevent="addFavorite(restaurant.id)"
            :disabled="isProcessingFavorite"
            type="button"
            class="btn favorite-btn"
          >
            <i class="far fa-bookmark"></i>
          </button>
          <button
            v-if="restaurant.isLiked"
            @click.stop.prevent="deleteLike(restaurant.id)"
            :disabled="isProcessingLike"
            type="button"
            class="btn like-btn"
          >
            <i class="fas fa-heart text-danger"></i>
          </button>
          <button
            v-else
            @click.stop.prevent="addLike(restaurant.id)"
            :disabled="isProcessingLike"
            type="button"
            class="btn like-btn"
          >
            <i class="far fa-heart"></i>
          </button>
        </div>
      </div>

      <div class="contact-info-wrap mt-3">
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
    <div class="col-md-8 d-flex flex-column justify-content-around my-2">
      <p>{{ restaurant.description }}</p>
      <router-link
        :to="{name: 'restaurant-dashboard', params: {id: restaurant.id}}"
        class="btn red-btn mr-2 align-self-end"
      >Dashboard</router-link>
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

<style scoped>
.save-like-buttons {
  position: absolute;
  bottom: 0.5rem;
  right: 0.6rem;
}

.save-like-buttons button {
  margin: 0 0.1rem;
  background: transparent;
  border-radius: 50%;
  background: rgba(70, 70, 70, 0.6);
  -webkit-box-shadow: 0.5px 0.5px 0.5px 0px rgba(107, 107, 107, 1);
  -moz-box-shadow: 0.5px 0.5px 0.5px 0px rgba(107, 107, 107, 1);
  box-shadow: 0.5px 0.5px 0.5px 0px rgba(107, 107, 107, 1);
}

.favorite-btn {
  padding: 0rem 0.4rem;
}

.like-btn {
  padding: 0rem 0.25rem;
}

.like-btn i,
.favorite-btn i {
  color: rgb(206, 206, 206);
}

.like-btn:hover i,
.favorite-btn:hover i {
  color: rgb(255, 255, 255);
}

.btn.focus,
.btn:focus {
  box-shadow: none;
}
</style>