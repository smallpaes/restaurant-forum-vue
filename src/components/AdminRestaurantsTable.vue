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
    <tbody>
      <tr v-for="restaurant in restaurants" :key="restaurant.id">
        <th scope="row">{{ restaurant.id }}</th>
        <td>{{ restaurant.Category && restaurant.Category.name }}</td>
        <td>{{ restaurant.name }}</td>
        <td class="d-flex justify-content-between">
          <a href="#" class="btn btn-link">Show</a>

          <a href="#" class="btn btn-link">Edit</a>

          <button type="button" class="btn btn-link">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
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
      viewCounts: 13,
      createdAt: "2019-09-01T05:36:02.619Z",
      updatedAt: "2019-09-07T08:59:00.687Z",
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
      viewCounts: 1,
      createdAt: "2019-09-01T05:36:02.618Z",
      updatedAt: "2019-09-06T05:05:08.406Z",
      CategoryId: 1,
      Category: {
        id: 1,
        name: "中式料理",
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
      viewCounts: 7,
      createdAt: "2019-09-01T05:36:02.618Z",
      updatedAt: "2019-09-06T05:05:00.901Z",
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
      id: 35,
      name: "Adella Bins",
      tel: "128-311-9569",
      address: "4060 Lila Cove",
      opening_hours: "08:00",
      description:
        "In est dignissimos. Nesciunt rerum qui recusandae et veritatis at ipsum eum rerum.",
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
      }
    },
    {
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
    },
    {
      id: 23,
      name: "Rene Ullrich",
      tel: "1-047-857-8021 x88051",
      address: "993 Andreanne Brooks",
      opening_hours: "08:00",
      description:
        "Et quae consectetur accusamus necessitatibus itaque facilis. Impedit in aut quam fuga officia eum non eaque. Accusamus officia aperiam dolores ea ea. Nihil consequatur distinctio magni repellendus neque quos vel. Modi earum sint esse laborum deserunt id reprehenderit tempora et. Illo suscipit cumque repellendus molestiae ipsa et.\n \rImpedit sit voluptas ex est est quasi consectetur. Assumenda rerum quos sint praesentium aut in molestiae. Dolorum at nobis est quasi molestiae. Sit quia reiciendis. Ut esse debitis deleniti autem molestiae ut.\n \rIure aut ratione. Suscipit velit dolorum saepe molestiae id similique. Iste non ab sit aliquam ut distinctio nihil. Eos odio repellat.",
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
      }
    },
    {
      id: 7,
      name: "Joshua Purdy",
      tel: "586.613.7354 x207",
      address: "4355 Mike Track",
      opening_hours: "08:00",
      description:
        "Cumque recusandae accusamus pariatur quasi ea. Beatae maiores qui aliquam sit rerum natus et doloribus. Ut minus sunt. Accusantium quaerat tempore non ab dolor placeat nostrum.",
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
      CategoryId: 2,
      Category: {
        id: 2,
        name: "日本料理",
        createdAt: "2019-09-01T05:36:02.602Z",
        updatedAt: "2019-09-01T05:36:02.602Z"
      }
    }
  ],
  pagination: [1, 2, 3, 4, 5],
  currentPage: 1,
  nextPage: 2,
  lastPage: 0,
  hasLastPage: false,
  hasNextPage: true,
  searchInput: "",
  sortBy: false,
  sortName: false,
  sortId: false
};

export default {
  created() {
    this.fetchRestaurants();
  },
  data() {
    return {
      restaurants: []
    };
  },
  methods: {
    fetchRestaurants() {
      this.restaurants = dummyData.restaurants;
    }
  }
};
</script>