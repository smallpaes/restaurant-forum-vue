<template>
  <div class="container py-5">
    <h1>餐廳描述頁</h1>
    <!-- 餐廳資訊頁 RestaurantDetail -->
    <RestaurantDetail :initial-restaurant="restaurant" />
    <hr />
    <!-- 餐廳評論 RestaurantComments -->
    <RestaurantComments
      :restaurant-comments="restaurantComments"
      @after-delete-comment="afterDeleteComment"
    />
    <!-- 新增評論 CreateComment -->
    <CreateComment :restaurant-id="restaurant.id" @after-create-comment="afterCreateComment" />
  </div>
</template>

<script>
import restaurantAPI from "../apis/restaurants";
import { Toast } from "../utils/helpers";
import RestaurantDetail from "../components/RestaurantDetail";
import RestaurantComments from "../components/RestaurantComments";
import CreateComment from "../components/CreateComment";
import { mapState } from "vuex";

export default {
  data() {
    return {
      restaurant: {
        id: -1,
        name: "",
        tel: "",
        address: "",
        openingHours: "",
        description: "",
        image: "",
        categoryName: "",
        isFavorited: false,
        isLiked: false
      },
      restaurantComments: []
    };
  },
  created() {
    const { id: restaurantId } = this.$route.params;
    this.fetchRestaurant(restaurantId);
  },
  beforeRouteUpdate(to, from, next) {
    const { id: restaurantId } = to.params;
    this.fetchRestaurant(restaurantId);
    next();
  },
  computed: {
    ...mapState(["currentUser"])
  },
  methods: {
    async fetchRestaurant(restaurantId) {
      try {
        const { data, statusText } = await restaurantAPI.getRestaurant({
          restaurantId
        });

        // error handling
        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        // update restaurant data
        this.restaurant = {
          id: data.restaurant.id,
          name: data.restaurant.name,
          tel: data.restaurant.tel,
          address: data.restaurant.address,
          openingHours: data.restaurant.opening_hours,
          description: data.restaurant.description,
          image: data.restaurant.image,
          categoryName: data.restaurant.Category.name,
          isFavorited: data.restaurant.isFavorited,
          isLiked: data.restaurant.isLiked
        };
        this.restaurantComments = data.restaurant.Comments;
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "Cannot get restaurant info, please try again later"
        });
      }
    },
    afterDeleteComment(commentId) {
      // filter 未被刪除的評論
      this.restaurantComments = this.restaurantComments.filter(
        comment => comment.id !== commentId
      );
    },
    afterCreateComment(payload) {
      const { commentId, restaurantId, text } = payload;
      this.restaurantComments.push({
        id: commentId,
        text,
        RestaurantId: restaurantId,
        createdAt: new Date(),
        User: {
          id: this.currentUser.id,
          name: this.currentUser.name
        }
      });
    }
  },
  components: {
    RestaurantDetail,
    RestaurantComments,
    CreateComment
  }
};
</script>