<template>
  <div class="container py-5">
    <!--AdminRestaurantForm-->
    <AdminRestaurantForm @after-submit="handleAfterSubmit" :is-processing="isProcessing" />
  </div>
</template>

<script>
import AdminRestaurantForm from "../components/AdminRestaurantForm";
import adminAPI from "../apis/admin";
import { Toast } from "../utils/helpers";

export default {
  data() {
    return {
      isProcessing: false
    };
  },
  components: {
    AdminRestaurantForm
  },
  methods: {
    async handleAfterSubmit(formData) {
      try {
        // change isProcessing status
        this.isProcessing = true;
        const { data, statusText } = await adminAPI.restaurants.create({
          formData
        });
        // error handling
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        // redirect back to admin restaurant page
        this.$router.push({ name: "admin-restaurants" });
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          type: "error",
          title: "Cannot create this restaurant, please try again later"
        });
      }
    }
  }
};
</script>