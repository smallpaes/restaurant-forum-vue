<template>
  <div class="container py-3">
    <transition enter-active-class="animated fadeIn" appear>
      <!--NavTabs-->
      <NavTabs />
    </transition>
    <Spinner v-if="isLoading" />
    <transition name="slide">
      <div v-if="!isLoading" class="row">
        <div class="col-lg-6">
          <!-- 最新餐廳 NewestRestaurants -->
          <NewestRestaurants :restaurants="restaurants" />
        </div>
        <div class="col-lg-6">
          <!-- 最新評論 NewestComments-->
          <NewestComments :comments="comments" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import restaurantAPI from "../apis/restaurants";
import { Toast } from "../utils/helpers";
import NavTabs from "../components/NavTabs";
import NewestRestaurants from "../components/NewestRestaurants";
import NewestComments from "../components/NewestComments";
import Spinner from "../components/Spinner";

export default {
  components: {
    NavTabs,
    NewestRestaurants,
    NewestComments,
    Spinner
  },
  data() {
    return {
      restaurants: [],
      comments: [],
      isLoading: true
    };
  },
  created() {
    this.fetchFeeds();
  },
  methods: {
    async fetchFeeds() {
      try {
        const { data, statusText } = await restaurantAPI.getFeeds();

        // error handling
        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.restaurants = data.restaurants;
        this.comments = data.comments;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          type: "error",
          title: "Cannot retrieve restaurant feed, please try again later!"
        });
      }
    }
  }
};
</script>