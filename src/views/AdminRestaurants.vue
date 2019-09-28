<template>
  <div class="container py-3">
    <!-- 後台導覽頁籤 AdminNav -->
    <AdminNav />

    <router-link
      :to="{name: 'admin-restaurant-new'}"
      class="btn red-btn mb-4 text-right"
    >New Restaurant</router-link>
    <Spinner v-if="isLoading" />
    <transition name="slide">
      <section v-if="!isLoading">
        <!-- 後台餐廳列表 AdminRestaurantsTable -->
        <AdminRestaurantsTable :initial-restaurants="restaurants" />
        <!--Pagination-->
        <AdminPanelPagination
          v-if="totalPage > 1"
          :current-page="currentPage"
          :total-page="totalPage"
          :admin-panel="adminPanel"
        />
      </section>
    </transition>
  </div>
</template>

<script>
import AdminNav from "../components/AdminNav";
import AdminRestaurantsTable from "../components/AdminRestaurantsTable";
import AdminPanelPagination from "../components/AdminPanelPagination";
import { Toast } from "../utils/helpers";
import adminAPI from "../apis/admin";
import Spinner from "../components/Spinner";

export default {
  components: {
    AdminNav,
    AdminRestaurantsTable,
    Spinner,
    AdminPanelPagination
  },
  data() {
    return {
      restaurants: [],
      isLoading: true,
      currentPage: 1,
      totalPage: -1,
      adminPanel: ""
    };
  },
  created() {
    this.fetchRestaurants();
    this.adminPanel = this.$route.name;
  },
  beforeRouteUpdate(to, from, next) {
    const { page } = to.query;
    this.fetchRestaurants(page);
    next();
  },
  methods: {
    async fetchRestaurants(page = 1) {
      try {
        const { data, statusText } = await adminAPI.restaurants.get({ page });
        // error handling
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        // update restaurant data
        this.restaurants = data.restaurants;
        this.currentPage = data.currentPage;
        this.totalPage = data.pagination.length;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          type: "error",
          title: "Cannot show restaurants, please try again later"
        });
      }
    }
  }
};
</script>