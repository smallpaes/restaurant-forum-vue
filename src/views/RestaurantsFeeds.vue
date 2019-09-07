<template>
  <div class="container py-5">
    <!--NavTabs-->
    <NavTabs />
    <h1 class="mt-5">最新動態</h1>
    <hr />
    <div class="row">
      <div class="col-md-6">
        <h3>最新餐廳</h3>
        <!-- 最新餐廳 NewestRestaurants -->
        <NewestRestaurants :restaurants="restaurants" />
      </div>
      <div class="col-md-6">
        <h3>最新評論</h3>
        <!-- 最新評論 NewestComments-->
        <NewestComments :comments="comments" />
      </div>
    </div>
  </div>
</template>

<script>
import NavTabs from "../components/NavTabs";
import NewestRestaurants from "../components/NewestRestaurants";
import NewestComments from "../components/NewestComments";

const dummyData = {
  restaurants: [
    {
      id: 47,
      name: "Chance Runolfsdottir",
      tel: "335-633-0037",
      address: "4775 Mossie Coves",
      opening_hours: "08:00",
      description: "sit qui repellendus",
      image: "http://lorempixel.com/640/480",
      viewCounts: 0,
      createdAt: "2019-09-01T05:36:02.619Z",
      updatedAt: "2019-09-01T05:36:02.619Z",
      CategoryId: 4,
      Category: {
        id: 4,
        name: "墨西哥料理",
        createdAt: "2019-09-01T05:36:02.602Z",
        updatedAt: "2019-09-01T05:36:02.602Z"
      }
    },
    {
      id: 48,
      name: "Fay Bernhard",
      tel: "1-679-021-6058 x005",
      address: "7298 Hoyt Cliffs",
      opening_hours: "08:00",
      description:
        "Beatae culpa eos vel ea nihil aut rerum. Vel praesentium corporis. Est labore maxime eligendi tempore praesentium dolorum. Eaque mollitia vel fuga.",
      image: "http://lorempixel.com/640/480",
      viewCounts: 0,
      createdAt: "2019-09-01T05:36:02.619Z",
      updatedAt: "2019-09-01T05:36:02.619Z",
      CategoryId: 4,
      Category: {
        id: 4,
        name: "墨西哥料理",
        createdAt: "2019-09-01T05:36:02.602Z",
        updatedAt: "2019-09-01T05:36:02.602Z"
      }
    },
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
      }
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
      }
    },
    {
      id: 45,
      name: "Beulah Murazik",
      tel: "(534) 170-3838 x3475",
      address: "882 Kaela Rue",
      opening_hours: "08:00",
      description:
        "Atque quo atque eum magni explicabo quibusdam accusantium est qui.\nEt quos explicabo enim architecto.\nMolestias reprehenderit cum.\nIure perferendis est rerum perferendis voluptatem vero rerum.",
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
      }
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
      }
    },
    {
      id: 46,
      name: "Allene Lueilwitz",
      tel: "205.825.0712 x8897",
      address: "270 Mayer Light",
      opening_hours: "08:00",
      description: "sequi libero quibusdam",
      image: "http://lorempixel.com/640/480",
      viewCounts: 0,
      createdAt: "2019-09-01T05:36:02.618Z",
      updatedAt: "2019-09-01T05:36:02.618Z",
      CategoryId: 5,
      Category: {
        id: 5,
        name: "素食料理",
        createdAt: "2019-09-01T05:36:02.602Z",
        updatedAt: "2019-09-01T05:36:02.602Z"
      }
    },
    {
      id: 43,
      name: "Fredy Cormier",
      tel: "661-841-2013",
      address: "55141 Augusta Neck",
      opening_hours: "08:00",
      description:
        "Est architecto qui est. Necessitatibus asperiores voluptas quia dolor nulla quos laboriosam temporibus reiciendis. Laborum sint itaque similique veritatis illum. Cupiditate eaque sunt cum excepturi tempora est. Iste expedita occaecati et perspiciatis inventore. Et inventore repellat qui.",
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
      }
    },
    {
      id: 42,
      name: "Randi Beier",
      tel: "(592) 343-0278 x838",
      address: "65844 Domenick Mission",
      opening_hours: "08:00",
      description:
        "Illum delectus sequi et accusantium. Doloribus rem unde ut. Libero qui dignissimos.",
      image: "http://lorempixel.com/640/480",
      viewCounts: 0,
      createdAt: "2019-09-01T05:36:02.617Z",
      updatedAt: "2019-09-01T05:36:02.617Z",
      CategoryId: 3,
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2019-09-01T05:36:02.602Z",
        updatedAt: "2019-09-01T05:36:02.602Z"
      }
    },
    {
      id: 40,
      name: "Jailyn Windler",
      tel: "(537) 727-0722 x3811",
      address: "03678 Bailey Island",
      opening_hours: "08:00",
      description: "maxime",
      image: "http://lorempixel.com/640/480",
      viewCounts: 0,
      createdAt: "2019-09-01T05:36:02.617Z",
      updatedAt: "2019-09-01T05:36:02.617Z",
      CategoryId: 2,
      Category: {
        id: 2,
        name: "日本料理",
        createdAt: "2019-09-01T05:36:02.602Z",
        updatedAt: "2019-09-01T05:36:02.602Z"
      }
    }
  ],
  comments: [
    {
      id: 4,
      text: "test",
      UserId: 4,
      RestaurantId: 2,
      createdAt: "2019-09-03T11:54:40.197Z",
      updatedAt: "2019-09-03T11:54:40.197Z",
      User: {
        id: 4,
        name: "test111",
        email: "test101@example.com",
        password:
          "$2a$10$ixwnv6bcsTKAlDcAVrCsvun.wHwSoXtMKUSi5TzRs44xMZFC4nE3u",
        isAdmin: false,
        image: "https://i.imgur.com/X1Oao1b.png",
        createdAt: "2019-09-03T11:51:30.989Z",
        updatedAt: "2019-09-03T11:53:24.820Z"
      },
      Restaurant: {
        id: 2,
        name: "Preston Adams",
        tel: "1-906-262-7033",
        address: "75137 Mohammed Route",
        opening_hours: "08:00",
        description: "Et nobis et suscipit ratione in nesciunt.",
        image: "http://lorempixel.com/640/480",
        viewCounts: 8,
        createdAt: "2019-09-01T05:36:02.606Z",
        updatedAt: "2019-09-03T11:54:58.958Z",
        CategoryId: 3
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
      },
      Restaurant: {
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
        CategoryId: 1
      }
    },
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
      },
      Restaurant: {
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
        CategoryId: 1
      }
    },
    {
      id: 1,
      text: "Awesome!",
      UserId: 1,
      RestaurantId: 3,
      createdAt: "2019-09-01T05:37:04.341Z",
      updatedAt: "2019-09-01T05:37:04.341Z",
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
      },
      Restaurant: {
        id: 3,
        name: "Kara Grant",
        tel: "199.816.7254",
        address: "147 Carter Lights",
        opening_hours: "08:00",
        description: "Qui et quas odio qui ut nesciunt at recusandae nostrum.",
        image: "http://lorempixel.com/640/480",
        viewCounts: 3,
        createdAt: "2019-09-01T05:36:02.606Z",
        updatedAt: "2019-09-01T08:36:15.822Z",
        CategoryId: 2
      }
    }
  ]
};

export default {
  components: {
    NavTabs,
    NewestRestaurants,
    NewestComments
  },
  data() {
    return {
      restaurants: [],
      comments: []
    };
  },
  created() {
    this.fetchFeeds();
  },
  methods: {
    fetchFeeds() {
      this.restaurants = dummyData.restaurants;
      this.comments = dummyData.comments;
    }
  }
};
</script>