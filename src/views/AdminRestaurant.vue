<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-md-12">
        <h1>{{ restaurant.name }}</h1>
        <p>[{{ restaurant.categoryName }}]</p>
      </div>
      <div class="col-md-4">
        <img
          class="img-responsive center-block"
          :src="restaurant.image | placeholderImage"
          style="width: 250px;margin-bottom: 25px;"
        />
        <div class="well">
          <ul class="list-unstyled">
            <li>
              <strong>Opening Hour:</strong>
              {{ restaurant.openingHours }}
            </li>
            <li>
              <strong>Tel:</strong>
              {{ restaurant.tel }}
            </li>
            <li>
              <strong>Address:</strong>
              {{ restaurant.address }}
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-8">
        <p>{{ restaurant.description }}</p>
      </div>
    </div>
    <hr />
    <a href="#" @click="$router.back()">回上一頁</a>
  </div>
</template>

<script>
import { placeholderImageCreator } from "../utils/mixins";

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
  name: "AdminRestaurant",
  mixins: [placeholderImageCreator],
  data() {
    return {
      restaurant: {
        id: -1,
        name: "",
        categoryName: "",
        image: "",
        openingHours: "",
        tel: "",
        address: "",
        description: ""
      }
    };
  },
  mounted() {
    const { id: restaurantId } = this.$route.params;
    this.fetchRestaurant(restaurantId);
  },
  methods: {
    fetchRestaurant(restaurantId) {
      console.log("Restaurant Id", restaurantId);
      const { restaurant } = dummyData;
      this.restaurant = {
        ...this.restaurant,
        id: restaurant.id,
        name: restaurant.name,
        categoryName: restaurant.Category.name,
        image: restaurant.image,
        openingHours: restaurant.opening_hours,
        tel: restaurant.tel,
        address: restaurant.address,
        description: restaurant.description
      };
    }
  }
};
</script>