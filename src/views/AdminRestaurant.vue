<template>
  <div class="container py-5">
    <Spinner v-if="isLoading" />
    <transition name="fade">
      <div v-if="!isLoading" class="row">
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
    </transition>
    <hr />
    <transition name="fade" appear>
      <a href="#" @click="$router.back()">回上一頁</a>
    </transition>
  </div>
</template>

<script>
import adminAPI from "../apis/admin";
import { Toast } from "../utils/helpers";
import { placeholderImageCreator } from "../utils/mixins";
import Spinner from "../components/Spinner";

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
      },
      isLoading: true
    };
  },
  mounted() {
    const { id: restaurantId } = this.$route.params;
    this.fetchRestaurant(restaurantId);
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params;
    this.fetchRestaurant(id);
    next();
  },
  methods: {
    async fetchRestaurant(restaurantId) {
      try {
        // update loading status
        this.isLoading = true;
        const {
          data: { restaurant },
          statusText
        } = await adminAPI.restaurants.getDetail({ restaurantId });
        // error handling
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        // update restaurant data
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
        // update loading status
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          type: "error",
          title: "Cannot get restaurant info, please try again later"
        });
      }
    }
  },
  components: {
    Spinner
  }
};
</script>