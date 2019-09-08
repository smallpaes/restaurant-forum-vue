<template>
  <div class="container py-5">
    <form @submit.stop.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          id="name"
          v-model="profile.name"
          type="text"
          name="name"
          class="form-control"
          placeholder="Enter Name"
          required
        />
      </div>

      <div class="form-group">
        <label for="image">Image</label>
        <img
          v-if="profile.image"
          :src="profile.image"
          alt="Profile picture"
          class="img-fluid d-block"
          width="200"
          height="200"
        />
        <input
          id="image"
          @change="handleFileChange"
          type="file"
          name="image"
          accept="image/*"
          class="form-control-file"
        />
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
const dummyData = {
  owner: {
    id: 1,
    name: "root",
    email: "root@example.com",
    password: "$2a$10$Z/IqhTucYmIFOF.CwcBR9.5pO3FiV4JE5e854j3zQXEg3vaYxbVP.",
    isAdmin: true,
    image: "http://lorempixel.com/200/200/people",
    createdAt: "2019-09-01T05:36:02.343Z",
    updatedAt: "2019-09-01T05:36:02.343Z",
    Comments: [
      {
        id: 1,
        text: "Awesome!",
        UserId: 1,
        RestaurantId: 3,
        createdAt: "2019-09-01T05:37:04.341Z",
        updatedAt: "2019-09-01T05:37:04.341Z",
        Restaurant: {
          id: 3,
          name: "Kara Grant",
          tel: "199.816.7254",
          address: "147 Carter Lights",
          opening_hours: "08:00",
          description:
            "Qui et quas odio qui ut nesciunt at recusandae nostrum.",
          image: "http://lorempixel.com/640/480",
          viewCounts: 3,
          createdAt: "2019-09-01T05:36:02.606Z",
          updatedAt: "2019-09-01T08:36:15.822Z",
          CategoryId: 2
        }
      },
      {
        id: 2,
        text: "good!",
        UserId: 1,
        RestaurantId: 50,
        createdAt: "2019-09-01T08:36:30.536Z",
        updatedAt: "2019-09-01T08:36:30.536Z",
        Restaurant: {
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
          CategoryId: 1
        }
      },
      {
        id: 3,
        text: "Yum!\r\n",
        UserId: 1,
        RestaurantId: 50,
        createdAt: "2019-09-01T08:36:48.736Z",
        updatedAt: "2019-09-01T08:36:48.736Z",
        Restaurant: {
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
          CategoryId: 1
        }
      }
    ],
    FavoritedRestaurants: [
      {
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
        CategoryId: 3,
        Favorite: {
          UserId: 1,
          RestaurantId: 2,
          createdAt: "2019-09-01T05:36:48.129Z",
          updatedAt: "2019-09-01T05:36:48.129Z"
        },
        Category: {
          id: 3,
          name: "義大利料理",
          createdAt: "2019-09-01T05:36:02.602Z",
          updatedAt: "2019-09-01T05:36:02.602Z"
        }
      },
      {
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
        Favorite: {
          UserId: 1,
          RestaurantId: 4,
          createdAt: "2019-09-01T05:37:52.167Z",
          updatedAt: "2019-09-01T05:37:52.167Z"
        },
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
        viewCounts: 13,
        createdAt: "2019-09-01T05:36:02.619Z",
        updatedAt: "2019-09-07T08:59:00.687Z",
        CategoryId: 1,
        Favorite: {
          UserId: 1,
          RestaurantId: 50,
          createdAt: "2019-09-01T08:36:23.004Z",
          updatedAt: "2019-09-01T08:36:23.004Z"
        },
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
        Favorite: {
          UserId: 1,
          RestaurantId: 49,
          createdAt: "2019-09-01T13:55:19.296Z",
          updatedAt: "2019-09-01T13:55:19.296Z"
        },
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
        Favorite: {
          UserId: 1,
          RestaurantId: 43,
          createdAt: "2019-09-06T04:54:04.134Z",
          updatedAt: "2019-09-06T04:54:04.134Z"
        },
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
        Favorite: {
          UserId: 1,
          RestaurantId: 45,
          createdAt: "2019-09-06T05:05:04.565Z",
          updatedAt: "2019-09-06T05:05:04.565Z"
        },
        Category: {
          id: 1,
          name: "中式料理",
          createdAt: "2019-09-01T05:36:02.602Z",
          updatedAt: "2019-09-01T05:36:02.602Z"
        }
      }
    ],
    Followings: [
      {
        id: 2,
        name: "user1",
        email: "user1@example.com",
        password:
          "$2a$10$rNBwPRm.J3HAJoxhr8E.leFOOzxzSROUz9FviyCdlxodYiN.2kQmG",
        isAdmin: false,
        image: "http://lorempixel.com/200/200/people",
        createdAt: "2019-09-01T05:36:02.466Z",
        updatedAt: "2019-09-01T05:36:02.466Z",
        Followship: {
          followerId: 1,
          followingId: 2,
          createdAt: "2019-09-01T05:37:31.398Z",
          updatedAt: "2019-09-01T05:37:31.398Z"
        }
      },
      {
        id: 3,
        name: "user2",
        email: "user2@example.com",
        password:
          "$2a$10$e6aj/OE8rH0eRMMWWSh4Te7bJ4J9JzWtOmJCYsSfSHpY.4pbV3R2W",
        isAdmin: false,
        image: "http://lorempixel.com/200/200/people",
        createdAt: "2019-09-01T05:36:02.590Z",
        updatedAt: "2019-09-01T05:36:02.590Z",
        Followship: {
          followerId: 1,
          followingId: 3,
          createdAt: "2019-09-07T08:25:02.190Z",
          updatedAt: "2019-09-07T08:25:02.190Z"
        }
      }
    ],
    Followers: [
      {
        id: 2,
        name: "user1",
        email: "user1@example.com",
        password:
          "$2a$10$rNBwPRm.J3HAJoxhr8E.leFOOzxzSROUz9FviyCdlxodYiN.2kQmG",
        isAdmin: false,
        image: "http://lorempixel.com/200/200/people",
        createdAt: "2019-09-01T05:36:02.466Z",
        updatedAt: "2019-09-01T05:36:02.466Z",
        Followship: {
          followerId: 2,
          followingId: 1,
          createdAt: "2019-09-01T08:35:48.165Z",
          updatedAt: "2019-09-01T08:35:48.165Z"
        }
      }
    ]
  },
  uniqueComment: [3, 50]
};

export default {
  name: "UserEdit",
  data() {
    return {
      profile: {
        id: -1,
        name: "",
        image: ""
      }
    };
  },
  created() {
    const { id } = this.$route.params;
    this.fetchProfile(id);
  },
  methods: {
    fetchProfile(userId) {
      console.log("user id:", userId);
      this.profile = {
        ...this.profile,
        id: dummyData.owner.id,
        name: dummyData.owner.name,
        image: dummyData.owner.image
      };
    },
    handleFileChange(e) {
      const files = e.target.files;
      if (!files.length) return;
      const imageURL = window.URL.createObjectURL(files[0]);
      this.profile.image = imageURL;
    },
    handleSubmit(e) {
      // get the form
      const form = e.target;
      // create formData instance
      const formData = new FormData(form);
      // POST request to API
      for (let [name, value] of formData.entries()) {
        console.log(name + ":" + value);
      }
    }
  }
};
</script>