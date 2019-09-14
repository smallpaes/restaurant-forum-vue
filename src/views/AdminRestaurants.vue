<template>
  <div class="container py-3">
    <!-- 後台導覽頁籤 AdminNav -->
    <AdminNav />

    <router-link
      :to="{name: 'admin-restaurant-new'}"
      class="btn red-btn mb-4 text-right"
    >New Restaurant</router-link>

    <!-- 後台餐廳列表 AdminRestaurantsTable -->
    <AdminRestaurantsTable />
  </div>
</template>

<script>
import AdminNav from "../components/AdminNav";
import AdminRestaurantsTable from "../components/AdminRestaurantsTable";

export default {
  components: {
    AdminNav,
    AdminRestaurantsTable
  }
};
</script>