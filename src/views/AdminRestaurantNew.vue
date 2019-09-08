<template>
  <div class="container py-5">
    <!--AdminRestaurantForm-->
    <AdminRestaurantForm @after-submit="handleAfterSubmit" />
  </div>
</template>

<script>
import AdminRestaurantForm from "../components/AdminRestaurantForm";

export default {
  components: {
    AdminRestaurantForm
  },
  methods: {
    handleAfterSubmit(formData) {
      // POST request to send form data
      for (let [name, value] of formData.entries()) {
        console.log(name + ":" + value);
      }
    }
  }
};
</script>