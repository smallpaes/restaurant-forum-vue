<template>
  <div class="container py-5">
    <Spinner v-if="isLoading" />
    <RestaurantOverview
      v-else
      :restaurant="restaurant"
      :comment-count="commentCount"
      :favorite-user="favoriteUser"
    />
  </div>
</template>

<script>
import RestaurantOverview from "../components/RestaurantOverview";
import restaurantAPI from "../apis/restaurants";
import { Toast } from "../utils/helpers";
import Spinner from "../components/Spinner";

export default {
  components: {
    RestaurantOverview,
    Spinner
  },
  data() {
    return {
      restaurant: {
        id: -1,
        name: "",
        categoryName: ""
      },
      commentCount: -1,
      favoriteUser: -1,
      isLoading: true
    };
  },
  created() {
    const restaurantId = this.$route.params.id;
    this.fetchRestaurant(restaurantId);
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params;
    this.fetchRestaurant(id);
    next();
  },
  methods: {
    async fetchRestaurant(restaurantId) {
      try {
        this.isLoading = true;
        const { data, statusText } = await restaurantAPI.getDashboard({
          restaurantId
        });
        // error handling
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        // update data
        this.restaurant = {
          id: data.restaurant.id,
          name: data.restaurant.name,
          categoryName: data.restaurant.Category.name
        };
        this.commentCount = data.commentCount;
        this.favoriteUser = data.favoriteUser;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          type: "error",
          title: "Cannot get restaurant info, please try again later"
        });
      }
    }
  }
};
</script>