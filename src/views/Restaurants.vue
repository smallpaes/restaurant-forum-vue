<template>
  <div class="container py-3">
    <transition enter-active-class="animated fadeIn" appear>
      <!--NavTabs-->
      <NavTabs />
    </transition>

    <transition enter-active-class="animated fadeIn">
      <!--RestaurantsNavPills-->
      <RestaurantsNavsPills :categories="categories" v-if="!isLoading" />
    </transition>

    <Spinner v-if="isLoading" />
    <transition name="slide">
      <section v-if="!isLoading">
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

        <div v-if="restaurants.length < 1">此類別目前無餐廳資料</div>
      </section>
    </transition>
  </div>
</template>

<script>
import restaurantAPI from "../apis/restaurants";
import { Toast } from "../utils/helpers";
import NavTabs from "../components/NavTabs";
import RestaurantCard from "../components/RestaurantCard";
import RestaurantsNavsPills from "../components/RestaurantsNavPills";
import RestaurantPagination from "../components/RestaurantsPagination";
import Spinner from "../components/Spinner";

export default {
  components: {
    NavTabs,
    RestaurantCard,
    RestaurantsNavsPills,
    RestaurantPagination,
    Spinner
  },
  data() {
    return {
      categories: [],
      categoryId: -1,
      currentPage: 1,
      restaurants: [],
      totalPage: -1,
      isLoading: true
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
        this.isLoading = true;
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
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          type: "error",
          title: "Cannot retrieve restaurant data, please try again later"
        });
      }
    }
  }
};
</script>