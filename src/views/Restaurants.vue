<template>
  <div class="container py-5">
    <!--NavTabs-->
    <NavTabs />
    <!--RestaurantsNavPills-->
    <RestaurantsNavsPills :categories="categories" />
    <!--Display Restaurants-->
    <div class="row">
      <!--ResaturantCard-->
      <RestaurantCard
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        :initial-restaurant="restaurant"
      />
    </div>
    <!--RestaurantPagination-->
    <RestaurantPagination
      v-if="totalPage > 1"
      :categoryId="categoryId"
      :current-page="currentPage"
      :total-page="totalPage"
    />
  </div>
</template>

<script>
import NavTabs from "../components/NavTabs";
import RestaurantCard from "../components/RestaurantCard";
import RestaurantsNavsPills from "../components/RestaurantsNavPills";
import RestaurantPagination from "../components/RestaurantsPagination";

const dummyData = {
  restaurants: [
    {
      id: 50,
      name: "Vergie Durgan",
      tel: "(197) 229-4586 x111",
      address: "730 Keeling Fork",
      opening_hours: "08:00",
      description: "soluta",
      image: "http://lorempixel.com/640/480",
      viewCounts: 6,
      createdAt: "2019-09-01T05:36:02.619Z",
      updatedAt: "2019-09-03T11:52:19.873Z",
      CategoryId: 1,
      Category: {
        id: 1,
        name: "中式料理",
        createdAt: "2019-09-01T05:36:02.602Z",
        updatedAt: "2019-09-01T05:36:02.602Z"
      },
      isFavorited: true,
      isLiked: false
    },
    {
      id: 49,
      name: "Dr. Jarrod Cummerata",
      tel: "(495) 804-0164 x49046",
      address: "15490 Cartwright Lane",
      opening_hours: "08:00",
      description: "et",
      image: "http://lorempixel.com/640/480",
      viewCounts: 0,
      createdAt: "2019-09-01T05:36:02.619Z",
      updatedAt: "2019-09-01T05:36:02.619Z",
      CategoryId: 1,
      Category: {
        id: 1,
        name: "中式料理",
        createdAt: "2019-09-01T05:36:02.602Z",
        updatedAt: "2019-09-01T05:36:02.602Z"
      },
      isFavorited: true,
      isLiked: false
    },
    {
      id: 45,
      name: "Beulah Murazik",
      tel: "(534) 170-3838 x3475",
      address: "882 Kaela Rue",
      opening_hours: "08:00",
      description: "Atque quo atque eum magni explicabo quibusdam accu",
      image: "http://lorempixel.com/640/480",
      viewCounts: 0,
      createdAt: "2019-09-01T05:36:02.618Z",
      updatedAt: "2019-09-01T05:36:02.618Z",
      CategoryId: 1,
      Category: {
        id: 1,
        name: "中式料理",
        createdAt: "2019-09-01T05:36:02.602Z",
        updatedAt: "2019-09-01T05:36:02.602Z"
      },
      isFavorited: false,
      isLiked: false
    },
    {
      id: 43,
      name: "Fredy Cormier",
      tel: "661-841-2013",
      address: "55141 Augusta Neck",
      opening_hours: "08:00",
      description: "Est architecto qui est. Necessitatibus asperiores ",
      image: "http://lorempixel.com/640/480",
      viewCounts: 0,
      createdAt: "2019-09-01T05:36:02.618Z",
      updatedAt: "2019-09-01T05:36:02.618Z",
      CategoryId: 1,
      Category: {
        id: 1,
        name: "中式料理",
        createdAt: "2019-09-01T05:36:02.602Z",
        updatedAt: "2019-09-01T05:36:02.602Z"
      },
      isFavorited: false,
      isLiked: false
    },
    {
      id: 35,
      name: "Adella Bins",
      tel: "128-311-9569",
      address: "4060 Lila Cove",
      opening_hours: "08:00",
      description: "In est dignissimos. Nesciunt rerum qui recusandae ",
      image: "http://lorempixel.com/640/480",
      viewCounts: 0,
      createdAt: "2019-09-01T05:36:02.616Z",
      updatedAt: "2019-09-01T05:36:02.616Z",
      CategoryId: 1,
      Category: {
        id: 1,
        name: "中式料理",
        createdAt: "2019-09-01T05:36:02.602Z",
        updatedAt: "2019-09-01T05:36:02.602Z"
      },
      isFavorited: false,
      isLiked: false
    },
    {
      id: 1,
      name: "Tina Schamberger",
      tel: "216.427.8386",
      address: "899 Erica Alley",
      opening_hours: "08:00",
      description: "natus veritatis omnis",
      image: "http://lorempixel.com/640/480",
      viewCounts: 2,
      createdAt: "2019-09-01T05:36:02.606Z",
      updatedAt: "2019-09-01T05:36:41.475Z",
      CategoryId: 1,
      Category: {
        id: 1,
        name: "中式料理",
        createdAt: "2019-09-01T05:36:02.602Z",
        updatedAt: "2019-09-01T05:36:02.602Z"
      },
      isFavorited: false,
      isLiked: false
    },
    {
      id: 23,
      name: "Rene Ullrich",
      tel: "1-047-857-8021 x88051",
      address: "993 Andreanne Brooks",
      opening_hours: "08:00",
      description: "Et quae consectetur accusamus necessitatibus itaqu",
      image: "http://lorempixel.com/640/480",
      viewCounts: 0,
      createdAt: "2019-09-01T05:36:02.612Z",
      updatedAt: "2019-09-01T05:36:02.612Z",
      CategoryId: 1,
      Category: {
        id: 1,
        name: "中式料理",
        createdAt: "2019-09-01T05:36:02.602Z",
        updatedAt: "2019-09-01T05:36:02.602Z"
      },
      isFavorited: false,
      isLiked: false
    },
    {
      id: 7,
      name: "Joshua Purdy",
      tel: "586.613.7354 x207",
      address: "4355 Mike Track",
      opening_hours: "08:00",
      description: "Cumque recusandae accusamus pariatur quasi ea. Bea",
      image: "http://lorempixel.com/640/480",
      viewCounts: 0,
      createdAt: "2019-09-01T05:36:02.607Z",
      updatedAt: "2019-09-01T05:36:02.607Z",
      CategoryId: 1,
      Category: {
        id: 1,
        name: "中式料理",
        createdAt: "2019-09-01T05:36:02.602Z",
        updatedAt: "2019-09-01T05:36:02.602Z"
      },
      isFavorited: false,
      isLiked: false
    },
    {
      id: 44,
      name: "Miss Jennifer Kris",
      tel: "216-757-2626",
      address: "87631 Bertha Tunnel",
      opening_hours: "08:00",
      description: "quo",
      image: "http://lorempixel.com/640/480",
      viewCounts: 1,
      createdAt: "2019-09-01T05:36:02.618Z",
      updatedAt: "2019-09-03T11:51:49.885Z",
      CategoryId: 2,
      Category: {
        id: 2,
        name: "日本料理",
        createdAt: "2019-09-01T05:36:02.602Z",
        updatedAt: "2019-09-01T05:36:02.602Z"
      },
      isFavorited: false,
      isLiked: false
    },
    {
      id: 3,
      name: "Kara Grant",
      tel: "199.816.7254",
      address: "147 Carter Lights",
      opening_hours: "08:00",
      description: "Qui et quas odio qui ut nesciunt at recusandae nos",
      image: "http://lorempixel.com/640/480",
      viewCounts: 3,
      createdAt: "2019-09-01T05:36:02.606Z",
      updatedAt: "2019-09-01T08:36:15.822Z",
      CategoryId: 2,
      Category: {
        id: 2,
        name: "日本料理",
        createdAt: "2019-09-01T05:36:02.602Z",
        updatedAt: "2019-09-01T05:36:02.602Z"
      },
      isFavorited: false,
      isLiked: false
    }
  ],
  categories: [
    {
      id: 1,
      name: "中式料理",
      createdAt: "2019-09-01T05:36:02.602Z",
      updatedAt: "2019-09-01T05:36:02.602Z"
    },
    {
      id: 2,
      name: "日本料理",
      createdAt: "2019-09-01T05:36:02.602Z",
      updatedAt: "2019-09-01T05:36:02.602Z"
    },
    {
      id: 3,
      name: "義大利料理",
      createdAt: "2019-09-01T05:36:02.602Z",
      updatedAt: "2019-09-01T05:36:02.602Z"
    },
    {
      id: 4,
      name: "墨西哥料理",
      createdAt: "2019-09-01T05:36:02.602Z",
      updatedAt: "2019-09-01T05:36:02.602Z"
    },
    {
      id: 5,
      name: "素食料理",
      createdAt: "2019-09-01T05:36:02.602Z",
      updatedAt: "2019-09-01T05:36:02.602Z"
    },
    {
      id: 6,
      name: "美式料理",
      createdAt: "2019-09-01T05:36:02.602Z",
      updatedAt: "2019-09-01T05:36:02.602Z"
    },
    {
      id: 7,
      name: "複合式料理",
      createdAt: "2019-09-01T05:36:02.602Z",
      updatedAt: "2019-09-01T05:36:02.602Z"
    }
  ],
  categoryId: "",
  pagination: [1, 2, 3, 4, 5],
  currentPage: 1,
  nextPage: 2,
  lastPage: 0,
  hasLastPage: false,
  hasNextPage: true,
  displayPanelCSS: true
};

export default {
  components: {
    NavTabs,
    RestaurantCard,
    RestaurantsNavsPills,
    RestaurantPagination
  },
  data() {
    return {
      categories: [],
      categoryId: -1,
      currentPage: 1,
      restaurants: [],
      totalPage: -1
    };
  },
  created() {
    this.fetchRestaurant();
  },
  methods: {
    fetchRestaurant() {
      this.categories = dummyData.categories;
      this.categoryId = dummyData.categoryId;
      this.currentPage = dummyData.currentPage;
      this.restaurants = dummyData.restaurants;
      this.totalPage = dummyData.pagination.length;
    }
  }
};
</script>