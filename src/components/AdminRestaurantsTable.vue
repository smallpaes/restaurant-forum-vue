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
    <transition-group name="fade-up" tag="tbody">
      <tr v-for="restaurant in restaurants" :key="restaurant.id">
        <th scope="row" class="pt-3">{{ restaurant.id }}</th>
        <td class="pt-3">{{ restaurant.Category && restaurant.Category.name }}</td>
        <td class="pt-3">{{ restaurant.name }}</td>
        <td>
          <router-link
            :to="{name: 'admin-restaurant', params: {id: restaurant.id}}"
            class="btn btn-link pr-4"
          >Show</router-link>

          <router-link
            :to="{name: 'admin-restaurant-edit', params: {id: restaurant.id}}"
            class="btn btn-link pr-4"
          >Edit</router-link>

          <button
            @click.stop.prevent="deleteRestaurant(restaurant.id)"
            type="button"
            class="btn btn-link pr-4"
          >Delete</button>
        </td>
      </tr>
    </transition-group>
  </table>
</template>

<script>
import adminAPI from "../apis/admin";
import { Toast } from "../utils/helpers";

export default {
  props: {
    initialRestaurants: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      restaurants: this.initialRestaurants
    };
  },
  watch: {
    initialRestaurants(restaurants) {
      this.restaurants = [...restaurants];
    }
  },
  methods: {
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