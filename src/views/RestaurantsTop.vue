<template>
  <div class="container py-3">
    <transition enter-active-class="animated fadeIn" appear>
      <!--NavTabs-->
      <NavTabs />
    </transition>
    <Spinner v-if="isLoading" />
    <transition enter-active-class="animated fadeIn">
      <!--Show Top Restaurants-->
      <section v-if="!isLoading">
        <div v-for="restaurant in restaurants" :key="restaurant.id" class="card my-3 border-0">
          <div class="row no-gutters">
            <div class="image p-2">
              <router-link :to="{name: 'restaurant', params: {id: restaurant.id}}">
                <img class="w-100 rounded-sm" :src="restaurant.image" />
              </router-link>
            </div>
            <div class="col flex-column d-flex justify-content-between">
              <div class="card-body pb-0">
                <h5 class="card-title m-0">{{restaurant.name}}</h5>
                <small>
                  <i class="fas fa-bookmark"></i>
                  收藏數：{{restaurant.favoriteUser}}
                </small>
                <p class="card-text mb-0 mt-2 mt-lg-3 py-sm-2 py-md-1">{{restaurant.description}}</p>
              </div>
              <div
                class="card-footer d-flex bg-white py-2 align-items-center justify-content-end border-0"
              >
                <router-link
                  :to="{name: 'restaurant', params: {id: restaurant.id}}"
                  class="btn btn-outline-secondary btn-sm mr-2 shadow-sm"
                >Show</router-link>

                <button
                  v-if="restaurant.isFavorite"
                  @click.stop.prevent="deleteFavorite(restaurant.id)"
                  type="button"
                  class="btn btn-outline-secondary btn-sm shadow-sm"
                >移除最愛</button>
                <button
                  v-else
                  @click.stop.prevent="addFavorite(restaurant.id)"
                  type="button"
                  class="btn btn-outline-secondary btn-sm shadow-sm"
                >加到最愛</button>
              </div>
            </div>
          </div>
          <hr />
        </div>
      </section>
    </transition>
  </div>
</template>

<script>
import restaurantsAPI from "../apis/restaurants";
import usersAPI from "../apis/users";
import { Toast } from "../utils/helpers";
import NavTabs from "../components/NavTabs";
import Spinner from "../components/Spinner";

export default {
  components: {
    NavTabs,
    Spinner
  },
  data() {
    return {
      restaurants: [],
      isLoading: true
    };
  },
  created() {
    this.fetchRestaurants();
  },
  methods: {
    async fetchRestaurants() {
      try {
        const { data, statusText } = await restaurantsAPI.getTopRestaurants();
        // error handling
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        // update restaurant data
        this.restaurants = data.restaurants;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          type: "error",
          title: "Cannot show top restaurants, please try again later"
        });
      }
    },
    async addFavorite(restaurantId) {
      try {
        const { data, statusText } = await usersAPI.addFavorite({
          restaurantId
        });
        // error handling
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        // update restaurant data
        this.restaurants = this.restaurants
          .map(restaurant => {
            if (restaurant.id !== restaurantId) {
              return restaurant;
            }
            return {
              ...restaurant,
              isFavorite: true,
              favoriteUser: (restaurant.favoriteUser += 1)
            };
          })
          .sort((a, b) => b.favoriteUser - a.favoriteUser);
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "Cannot add restaurant to favorite, please try again later"
        });
      }
    },
    async deleteFavorite(restaurantId) {
      try {
        const { data, statusText } = await usersAPI.deleteFavorite({
          restaurantId
        });
        // error handling
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        // update restaurant data
        this.restaurants = this.restaurants
          .map(restaurant => {
            if (restaurant.id !== restaurantId) {
              return restaurant;
            }
            return {
              ...restaurant,
              isFavorite: false,
              favoriteUser: (restaurant.favoriteUser -= 1)
            };
          })
          .sort((a, b) => b.favoriteUser - a.favoriteUser);
      } catch (error) {
        Toast.fire({
          type: "error",
          title:
            "Cannot remove restaurant from favorite, please try again later"
        });
      }
    }
  }
};
</script>

<style scoped>
.image {
  width: 100%;
}

.card-title {
  color: rgb(73, 73, 73);
}

.card-body small,
.card-body small i {
  color: #c22424;
}

.btn-group-sm > .btn,
.btn-sm {
  border-radius: 0.3rem;
  padding: 0.1 0.6rem;
}

/*md size*/
@media screen and (min-width: 768px) {
  /*Top Restaurant Section*/
  .image {
    width: 270px;
  }
}

/*lg size*/
@media screen and (min-width: 992px) {
  /*Top Restaurant Section*/
  .image {
    width: 300px;
  }

  /*Follow & Favorite*/
  .btn-group-sm > .btn,
  .btn-sm {
    padding: 0.2rem 0.7rem;
  }

  .card-title {
    font-size: 1.6rem;
  }

  .card-text {
    font-size: 1.1rem;
  }
}

/*xl size*/
@media screen and (min-width: 1200px) {
  /*Top Restaurant Section*/
  .image {
    width: 350px;
  }

  /*Follow & Favorite*/
  .btn-group-sm > .btn,
  .btn-sm {
    padding: 0.3rem 0.8rem;
  }
}
</style>