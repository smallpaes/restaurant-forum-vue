<template>
  <div class="container py-5">
    <RestaurantOverview
      :restaurant="restaurant"
      :comment-count="commentCount"
      :favorite-user="favoriteUser"
    />
  </div>
</template>

<script>
import RestaurantOverview from "../components/RestaurantOverview";

const dummyData = {
  restaurant: {
    id: 4,
    name: "Bud O'Connell",
    tel: "1-804-671-7041 x06998",
    address: "328 Batz Curve",
    opening_hours: "08:00",
    description: "voluptas",
    image: "http://lorempixel.com/640/480",
    viewCounts: 2,
    createdAt: "2019-09-01T05:36:02.606Z",
    updatedAt: "2019-09-01T05:38:12.343Z",
    CategoryId: 4,
    Comments: [],
    Category: {
      id: 4,
      name: "墨西哥料理",
      createdAt: "2019-09-01T05:36:02.602Z",
      updatedAt: "2019-09-01T05:36:02.602Z"
    },
    FavoritedUsers: [
      {
        id: 1,
        name: "root",
        email: "root@example.com",
        password:
          "$2a$10$Z/IqhTucYmIFOF.CwcBR9.5pO3FiV4JE5e854j3zQXEg3vaYxbVP.",
        isAdmin: true,
        image: "http://lorempixel.com/200/200/people",
        createdAt: "2019-09-01T05:36:02.343Z",
        updatedAt: "2019-09-01T05:36:02.343Z",
        Favorite: {
          UserId: 1,
          RestaurantId: 4,
          createdAt: "2019-09-01T05:37:52.167Z",
          updatedAt: "2019-09-01T05:37:52.167Z"
        }
      }
    ]
  },
  commentCount: 0,
  favoriteUser: 1
};

export default {
  components: {
    RestaurantOverview
  },
  data() {
    return {
      restaurant: {
        id: -1,
        name: "",
        categoryName: ""
      },
      commentCount: -1,
      favoriteUser: -1
    };
  },
  created() {
    const restaurantId = this.$route.params.id;
    this.fetchRestaurant(restaurantId);
  },
  methods: {
    fetchRestaurant(restaurantId) {
      console.log("Restaurant Id", restaurantId);
      this.restaurant = {
        id: dummyData.restaurant.id,
        name: dummyData.restaurant.name,
        categoryName: dummyData.restaurant.Category.name
      };
      this.commentCount = dummyData.commentCount;
      this.favoriteUser = dummyData.favoriteUser;
    }
  }
};
</script>