<template>
  <div class="container py-5">
    <AdminRestaurantForm @after-submit="handleAfterSubmit" :initial-restaurant="restaurant" />
  </div>
</template>

<script>
import AdminRestaurantForm from "../components/AdminRestaurantForm";

const dummyData = {
  restaurant: {
    id: 1,
    name: "Tina Schamberger",
    tel: "216.427.8386",
    address: "899 Erica Alley",
    opening_hours: "08:00",
    description: "natus veritatis omnis",
    image: "http://lorempixel.com/640/480",
    viewCounts: 7,
    createdAt: "2019-09-01T05:36:02.606Z",
    updatedAt: "2019-09-06T05:05:20.378Z",
    CategoryId: 1,
    Category: {
      id: 1,
      name: "中式料理",
      createdAt: "2019-09-01T05:36:02.602Z",
      updatedAt: "2019-09-01T05:36:02.602Z"
    }
  }
};

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
      }
    };
  },
  created() {
    const { id } = this.$route.params;
    this.fetchRestaurant(id);
  },
  methods: {
    handleAfterSubmit(formData) {
      for (let [name, value] of formData.entries()) {
        console.log(name + ":" + value);
      }
    },
    fetchRestaurant(restaurantId) {
      console.log("fetchRestaurant id:", restaurantId);
      const { restaurant } = dummyData;
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
    }
  }
};
</script>