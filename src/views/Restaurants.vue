<template>
  <div class="container py-5">
    <!--NavTabs-->
    <NavTabs />
    <!--RestaurantsNavPills-->
    <RestaurantsNavsPills :categories="categories" />
    <!--Display Restaurants-->
    <div class="row">
      <!--ResaturantCard-->
      <RestaurantCard
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        :initial-restaurant="restaurant"
      />
    </div>
    <!--RestaurantPagination-->
    <RestaurantPagination
      v-if="totalPage > 1"
      :categoryId="categoryId"
      :current-page="currentPage"
      :total-page="totalPage"
    />
  </div>
</template>

<script>
import restaurantAPI from "../apis/restaurants";
import { Toast } from "../utils/helpers";
import NavTabs from "../components/NavTabs";
import RestaurantCard from "../components/RestaurantCard";
import RestaurantsNavsPills from "../components/RestaurantsNavPills";
import RestaurantPagination from "../components/RestaurantsPagination";

export default {
  components: {
    NavTabs,
    RestaurantCard,
    RestaurantsNavsPills,
    RestaurantPagination
  },
  data() {
    return {
      categories: [],
      categoryId: -1,
      currentPage: 1,
      restaurants: [],
      totalPage: -1
    };
  },
  created() {
    // get query info
    const { page, categoryId } = this.$route.query;

    this.fetchRestaurant({
      page,
      categoryId
    });
  },
  // fetch restaurants when route changes
  beforeRouteUpdate(to, from, next) {
    const { page, categoryId } = to.query;
    this.fetchRestaurant({ page, categoryId });
    next();
  },
  methods: {
    async fetchRestaurant({ page = 1, categoryId = "" }) {
      try {
        const { data, statusText } = await restaurantAPI.getRestaurants({
          page,
          categoryId
        });

        // error handing
        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.categories = data.categories;
        this.categoryId = data.categoryId;
        this.currentPage = data.currentPage;
        this.restaurants = data.restaurants;
        this.totalPage = data.pagination.length;
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "Cannot retrieve restaurant data, please try again later"
        });
      }
    }
  }
};
</script>