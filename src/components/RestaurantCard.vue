<template>
  <div class="col-md-6 col-lg-4">
    <div class="card mb-4 border-0 shadow-sm">
      <div
        class="card-header bg-white p-0 d-flex align-items-center justify-content-center"
        v-if="isLoading"
      >
        <Spinner class="p-0" />
      </div>

      <transition enter-active-class="animated fadeIn">
        <img
          v-show="!isLoading"
          class="card-img-top"
          :src="restaurant.image"
          @load="changeLoading"
          alt="Card image cap"
        />
      </transition>
      <div class="card-body">
        <h5 class="card-title m-0">
          <router-link :to="{name: 'restaurant', params: {id: restaurant.id}}">{{restaurant.name}}</router-link>
        </h5>
        <div class="d-flex align-items-center mt-2 mb-3">
          <span class="badge mr-2">{{restaurant.Category && restaurant.Category.name}}</span>
          <button
            v-if="restaurant.isFavorited"
            type="button"
            class="btn p-0 mx-1"
            :disabled="isProcessing"
            @click.stop.prevent="deleteFavorite(restaurant.id)"
          >
            <i class="fas fa-bookmark text-warning"></i>
          </button>
          <button
            v-else
            type="button"
            class="btn p-0 mx-1 favorite-btn"
            :disabled="isProcessing"
            @click.stop.prevent="addFavorite(restaurant.id)"
          >
            <i class="far fa-bookmark"></i>
          </button>
          <button
            v-if="restaurant.isLiked"
            type="button"
            class="btn p-0 mx-1"
            :disabled="isProcessing"
            @click.stop.prevent="deleteLike(restaurant.id)"
          >
            <i class="fas fa-heart text-danger"></i>
          </button>
          <button
            v-else
            type="button"
            class="btn p-0 mx-1 like-btn"
            :disabled="isProcessing"
            @click.stop.prevent="addLike(restaurant.id)"
          >
            <i class="far fa-heart"></i>
          </button>
        </div>
        <p class="card-text card-description">{{restaurant.description}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import usersAPI from "../apis/users";
import { Toast } from "../utils/helpers";
import Spinner from "../components/Spinner";

export default {
  components: {
    Spinner
  },
  props: {
    initialRestaurant: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      restaurant: this.initialRestaurant,
      isLoading: true,
      isProcessing: false
    };
  },
  methods: {
    changeLoading(e) {
      this.isLoading = false;
    },
    async addFavorite(restaurantId) {
      try {
        // update processing status
        this.isProcessing = true;
        const { data, statusText } = await usersAPI.addFavorite({
          restaurantId
        });
        // error handing
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        // update restaurant data
        this.restaurant = {
          ...this.restaurant,
          isFavorited: true
        };
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          type: "error",
          title:
            "Cannot add this restaurant to favorite, please try again later"
        });
      }
    },
    async deleteFavorite(restaurantId) {
      try {
        // update processing status
        this.isProcessing = true;
        const { data, statusText } = await usersAPI.deleteFavorite({
          restaurantId
        });
        // error handling
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        // update restaurant data
        this.restaurant = {
          ...this.restaurant,
          isFavorited: false
        };
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          type: "error",
          title:
            "Cannot remove restaurant from favorite list, please try again later"
        });
      }
    },
    async addLike(restaurantId) {
      try {
        // update processing status
        this.isProcessing = true;
        const { data, statusText } = await usersAPI.addLike({ restaurantId });
        // error handling
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        // update restaurant data
        this.restaurant = {
          ...this.restaurant,
          isLiked: true
        };
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          type: "error",
          title: "Cannot like this restaurant, please try again later"
        });
      }
    },
    async deleteLike(restaurantId) {
      try {
        // update processing status
        this.isProcessing = true;
        const { data, statusText } = await usersAPI.deleteLike({
          restaurantId
        });
        // error handling
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        // update restaurant data
        this.restaurant = {
          ...this.restaurant,
          isLiked: false
        };
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          type: "error",
          title: "Cannot unlike this restaurant, please try again later"
        });
      }
    }
  }
};
</script>

<style scoped>
.card-title a {
  color: rgb(100, 100, 100);
  font-weight: 600;
}

.card-title a:hover {
  color: rgb(73, 73, 73);
}

.card-description {
  color: rgb(100, 100, 100);
}

/*Like & Favorite*/
.like-btn,
.favorite-btn {
  color: rgb(100, 100, 100);
}

.like-btn:hover,
.favorite-btn:hover {
  color: rgb(73, 65, 65);
}

.btn.focus,
.btn:focus {
  box-shadow: none;
}

/*sm size*/
@media screen and (min-width: 576px) {
  .card-body .card-text:last-of-type {
    min-height: 48px;
  }
}

/*md size*/
@media screen and (min-width: 768px) {
  .card-header {
    width: 330px;
    height: 247.484px;
  }
}

/*lg size*/
@media screen and (min-width: 992px) {
  .card-header {
    width: 289.984px;
    height: 217.484px;
  }
}

/*xl size*/
@media screen and (min-width: 1200px) {
  .card-header {
    width: 350px;
    height: 262.484px;
  }
}
</style>