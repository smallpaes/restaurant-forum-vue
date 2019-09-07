<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">人氣餐廳</h1>
    <hr />
    <!--Show Top Restaurants-->
    <RestaurantTopCard
      v-for="restaurant in restaurants"
      :key="restaurant.id"
      :initial-restaurant="restaurant"
    />
  </div>
</template>

<script>
import NavTabs from "../components/NavTabs";
import RestaurantTopCard from "../components/RestaurantTopCard";

const dummyData = {
  restaurants: [
    {
      id: 2,
      name: "Preston Adams",
      image: "http://lorempixel.com/640/480",
      description: "Et nobis et suscipit ratione in nesciunt....",
      favoriteUser: 2,
      isFavorite: true
    },
    {
      id: 50,
      name: "Vergie Durgan",
      image: "http://lorempixel.com/640/480",
      description: "soluta...",
      favoriteUser: 1,
      isFavorite: true
    },
    {
      id: 49,
      name: "Dr. Jarrod Cummerata",
      image: "http://lorempixel.com/640/480",
      description: "et...",
      favoriteUser: 1,
      isFavorite: true
    },
    {
      id: 45,
      name: "Beulah Murazik",
      image: "http://lorempixel.com/640/480",
      description:
        "Atque quo atque eum magni explicabo quibusdam accusantium est qui.\nEt quos explicabo enim architecto.\nMolestia...",
      favoriteUser: 1,
      isFavorite: true
    },
    {
      id: 43,
      name: "Fredy Cormier",
      image: "http://lorempixel.com/640/480",
      description:
        "Est architecto qui est. Necessitatibus asperiores voluptas quia dolor nulla quos laboriosam temporibus reicien...",
      favoriteUser: 1,
      isFavorite: true
    },
    {
      id: 4,
      name: "Bud O'Connell",
      image: "http://lorempixel.com/640/480",
      description: "voluptas...",
      favoriteUser: 1,
      isFavorite: true
    },
    {
      id: 11,
      name: "Marty Rath",
      image: "http://lorempixel.com/640/480",
      description:
        "Et et autem dolor a voluptas.\nQui vitae dolor fugiat ipsa....",
      favoriteUser: 0,
      isFavorite: false
    },
    {
      id: 10,
      name: "Orlo Stokes",
      image: "http://lorempixel.com/640/480",
      description: "officiis...",
      favoriteUser: 0,
      isFavorite: false
    },
    {
      id: 14,
      name: "Amara Daugherty",
      image: "http://lorempixel.com/640/480",
      description:
        "Doloribus autem et est odio. Unde sunt cum accusantium. Cumque nisi delectus dolor consectetur illo. Quasi nih...",
      favoriteUser: 0,
      isFavorite: false
    },
    {
      id: 7,
      name: "Joshua Purdy",
      image: "http://lorempixel.com/640/480",
      description:
        "Cumque recusandae accusamus pariatur quasi ea. Beatae maiores qui aliquam sit rerum natus et doloribus. Ut min...",
      favoriteUser: 0,
      isFavorite: false
    }
  ]
};

export default {
  components: {
    NavTabs,
    RestaurantTopCard
  },
  data() {
    return {
      restaurants: []
    };
  },
  created() {
    this.fetchRestaurants();
  },
  methods: {
    fetchRestaurants() {
      this.restaurants = dummyData.restaurants;
    }
  }
};
</script>