<template>
  <table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Category</th>
        <th scope="col">Name</th>
        <th scope="col" width="300">操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="restaurant in restaurants" :key="restaurant.id">
        <th scope="row">{{ restaurant.id }}</th>
        <td>{{ restaurant.Category && restaurant.Category.name }}</td>
        <td>{{ restaurant.name }}</td>
        <td class="d-flex justify-content-between">
          <router-link
            :to="{name: 'admin-restaurant', params: {id: restaurant.id}}"
            class="btn btn-link"
          >Show</router-link>

          <router-link
            :to="{name: 'admin-restaurant-edit', params: {id: restaurant.id}}"
            class="btn btn-link"
          >Edit</router-link>

          <button
            @click.stop.prevent="deleteRestaurant(restaurant.id)"
            type="button"
            class="btn btn-link"
          >Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import adminAPI from "../apis/admin";
import { Toast } from "../utils/helpers";
import admin from "../apis/admin";

export default {
  created() {
    this.fetchRestaurants();
  },
  data() {
    return {
      restaurants: []
    };
  },
  methods: {
    async fetchRestaurants() {
      try {
        const { data, statusText } = await adminAPI.restaurants.get();
        // error handling
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        // update restaurant data
        this.restaurants = data.restaurants;
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "Cannot show restaurants, please try again later"
        });
      }
    },
    async deleteRestaurant(restaurantId) {
      try {
        const { data, statusText } = await adminAPI.restaurants.delete({
          restaurantId
        });
        // error handling
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        // update restaurants data
        this.restaurants = this.restaurants.filter(
          restaurant => restaurant.id !== restaurantId
        );
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "Cannot delete this restaurant, please try again later"
        });
      }
    }
  }
};
</script>