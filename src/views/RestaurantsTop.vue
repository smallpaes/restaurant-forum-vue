<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">人氣餐廳</h1>
    <hr />
    <!--Show Top Restaurants-->
    <div
      v-for="restaurant in restaurants"
      :key="restaurant.id"
      class="card mb-3"
      style="max-width: 540px;margin: auto;"
    >
      <div class="row no-gutters">
        <div class="col-md-4">
          <router-link :to="{name: 'restaurant', params: {id: restaurant.id}}">
            <img class="card-img" :src="restaurant.image" />
          </router-link>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{{restaurant.name}}</h5>
            <span class="badge badge-secondary">收藏數：{{restaurant.favoriteUser}}</span>
            <p class="card-text">{{restaurant.description}}</p>
            <router-link
              :to="{name: 'restaurant', params: {id: restaurant.id}}"
              class="btn btn-primary mr-2"
            >Show</router-link>

            <button
              v-if="restaurant.isFavorite"
              @click.stop.prevent="deleteFavorite(restaurant.id)"
              type="button"
              class="btn btn-danger mr-2"
            >移除最愛</button>
            <button
              v-else
              @click.stop.prevent="addFavorite(restaurant.id)"
              type="button"
              class="btn btn-primary"
            >加到最愛</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import restaurantsAPI from "../apis/restaurants";
import usersAPI from "../apis/users";
import { Toast } from "../utils/helpers";
import NavTabs from "../components/NavTabs";

export default {
  components: {
    NavTabs
  },
  data() {
    return {
      restaurants: []
    };
  },
  created() {
    this.fetchRestaurants();
  },
  methods: {
    async fetchRestaurants() {
      try {
        const { data, statusText } = await restaurantsAPI.getTopRestaurants();
        // error handling
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        // update restaurant data
        this.restaurants = data.restaurants;
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "Cannot show top restaurants, please try again later"
        });
      }
    },
    async addFavorite(restaurantId) {
      try {
        const { data, statusText } = await usersAPI.addFavorite({
          restaurantId
        });
        // error handling
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        // update restaurant data
        this.restaurants = this.restaurants
          .map(restaurant => {
            if (restaurant.id !== restaurantId) {
              return restaurant;
            }
            return {
              ...restaurant,
              isFavorite: true,
              favoriteUser: (restaurant.favoriteUser += 1)
            };
          })
          .sort((a, b) => b.favoriteUser - a.favoriteUser);
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "Cannot add restaurant to favorite, please try again later"
        });
      }
    },
    async deleteFavorite(restaurantId) {
      try {
        const { data, statusText } = await usersAPI.deleteFavorite({
          restaurantId
        });
        // error handling
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        // update restaurant data
        this.restaurants = this.restaurants
          .map(restaurant => {
            if (restaurant.id !== restaurantId) {
              return restaurant;
            }
            return {
              ...restaurant,
              isFavorite: false,
              favoriteUser: (restaurant.favoriteUser -= 1)
            };
          })
          .sort((a, b) => b.favoriteUser - a.favoriteUser);
      } catch (error) {
        Toast.fire({
          type: "error",
          title:
            "Cannot remove restaurant from favorite, please try again later"
        });
      }
    }
  }
};
</script>