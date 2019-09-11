<template>
  <div class="container py-5">
    <AdminRestaurantForm
      @after-submit="handleAfterSubmit"
      :initial-restaurant="restaurant"
      :is-processing="isProcessing"
    />
  </div>
</template>

<script>
import AdminRestaurantForm from "../components/AdminRestaurantForm";
import adminAPI from "../apis/admin";
import { Toast } from "../utils/helpers";

export default {
  components: {
    AdminRestaurantForm
  },
  data() {
    return {
      restaurant: {
        id: -1,
        name: "",
        categoryId: "",
        tel: "",
        address: "",
        description: "",
        image: "",
        openingHours: ""
      },
      isProcessing: false
    };
  },
  created() {
    const { id } = this.$route.params;
    this.fetchRestaurant(id);
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params;
    this.fetchRestaurant(id);
    next();
  },
  methods: {
    async handleAfterSubmit(formData) {
      try {
        // change isProcessing status
        this.isProcessing = true;
        const { data, statusText } = await adminAPI.restaurants.update({
          formData,
          restaurantId: this.restaurant.id
        });
        // error handling
        if ((statusText !== "OK", data.status !== "success")) {
          throw new Error(statusText);
        }
        // redirect to amdin restaurant page
        this.$router.push({ name: "admin-restaurants" });
      } catch (error) {
        // change isProcssing status
        this.isProcessing = false;
        Toast.fire({
          type: "error",
          title: "Cannot update this restaurant, please try again later"
        });
      }
    },
    async fetchRestaurant(restaurantId) {
      try {
        const {
          data: { restaurant },
          statusText
        } = await adminAPI.restaurants.getDetail({ restaurantId });
        // error handling
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        // update restaurant detail data
        this.restaurant = {
          ...this.restaurant,
          id: restaurant.id,
          name: restaurant.name,
          categoryId: restaurant.CategoryId,
          tel: restaurant.tel,
          address: restaurant.address,
          description: restaurant.description,
          image: restaurant.image,
          openingHours: restaurant.opening_hours
        };
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "Cannot get restaurant data, please try again later"
        });
      }
    }
  }
};
</script>