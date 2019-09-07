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
import RestaurantDetail from "../components/RestaurantDetail";
import RestaurantComments from "../components/RestaurantComments";
import CreateComment from "../components/CreateComment";

const dummyData = {
  restaurant: {
    id: 50,
    name: "Vergie Durgan",
    tel: "(197) 229-4586 x111",
    address: "730 Keeling Fork",
    opening_hours: "08:00",
    description: "soluta",
    image: "http://lorempixel.com/640/480",
    viewCounts: 8,
    createdAt: "2019-09-01T05:36:02.619Z",
    updatedAt: "2019-09-06T05:55:54.803Z",
    CategoryId: 1,
    Category: {
      id: 1,
      name: "中式料理",
      createdAt: "2019-09-01T05:36:02.602Z",
      updatedAt: "2019-09-01T05:36:02.602Z"
    },
    Comments: [
      {
        id: 2,
        text: "good!",
        UserId: 1,
        RestaurantId: 50,
        createdAt: "2019-09-01T08:36:30.536Z",
        updatedAt: "2019-09-01T08:36:30.536Z",
        User: {
          id: 1,
          name: "root",
          email: "root@example.com",
          password:
            "$2a$10$Z/IqhTucYmIFOF.CwcBR9.5pO3FiV4JE5e854j3zQXEg3vaYxbVP.",
          isAdmin: true,
          image: "http://lorempixel.com/200/200/people",
          createdAt: "2019-09-01T05:36:02.343Z",
          updatedAt: "2019-09-01T05:36:02.343Z"
        }
      },
      {
        id: 3,
        text: "Yum!\r\n",
        UserId: 1,
        RestaurantId: 50,
        createdAt: "2019-09-01T08:36:48.736Z",
        updatedAt: "2019-09-01T08:36:48.736Z",
        User: {
          id: 1,
          name: "root",
          email: "root@example.com",
          password:
            "$2a$10$Z/IqhTucYmIFOF.CwcBR9.5pO3FiV4JE5e854j3zQXEg3vaYxbVP.",
          isAdmin: true,
          image: "http://lorempixel.com/200/200/people",
          createdAt: "2019-09-01T05:36:02.343Z",
          updatedAt: "2019-09-01T05:36:02.343Z"
        }
      }
    ],
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
          RestaurantId: 50,
          createdAt: "2019-09-01T08:36:23.004Z",
          updatedAt: "2019-09-01T08:36:23.004Z"
        }
      }
    ],
    LikedUsers: [],
    isFavorited: true,
    isLiked: false
  },
  currentUser: {
    id: "1",
    name: "管理者",
    email: "root@example.com",
    isAdmin: true
  }
};

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
      restaurantComments: [],
      currentUser: dummyData.currentUser
    };
  },
  created() {
    const { id: restaurantId } = this.$route.params;
    this.fetchRestaurant(restaurantId);
  },
  methods: {
    fetchRestaurant(restaurantId) {
      console.log("fetchRestaurant id: ", restaurantId);
      this.restaurant = {
        id: dummyData.restaurant.id,
        name: dummyData.restaurant.name,
        tel: dummyData.restaurant.tel,
        address: dummyData.restaurant.address,
        openingHours: dummyData.restaurant.opening_hours,
        description: dummyData.restaurant.description,
        image: dummyData.restaurant.image,
        categoryName: dummyData.restaurant.Category.name,
        isFavorited: dummyData.restaurant.isFavorited,
        isLiked: dummyData.restaurant.isLiked
      };
      this.restaurantComments = dummyData.restaurant.Comments;
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