<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">美食達人</h1>
    <hr />

    <div class="row text-center">
      <!--User Card-->
      <UserCard v-for="user in users" :key="user.id" :initial-user="user" />
    </div>
  </div>
</template>

<script>
import NavTabs from "../components/NavTabs";
import UserCard from "../components/UserCard";

const dummyData = {
  users: [
    {
      id: 2,
      name: "user1",
      email: "user1@example.com",
      password: "$2a$10$rNBwPRm.J3HAJoxhr8E.leFOOzxzSROUz9FviyCdlxodYiN.2kQmG",
      isAdmin: false,
      image: "http://lorempixel.com/200/200/people",
      createdAt: "2019-09-01T05:36:02.466Z",
      updatedAt: "2019-09-01T05:36:02.466Z",
      Followers: [
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
          Followship: {
            followerId: 1,
            followingId: 2,
            createdAt: "2019-09-01T05:37:31.398Z",
            updatedAt: "2019-09-01T05:37:31.398Z"
          }
        }
      ],
      FollowerCount: 1,
      isFollowed: true,
      isOwner: false
    },
    {
      id: 3,
      name: "user2",
      email: "user2@example.com",
      password: "$2a$10$e6aj/OE8rH0eRMMWWSh4Te7bJ4J9JzWtOmJCYsSfSHpY.4pbV3R2W",
      isAdmin: false,
      image: "http://lorempixel.com/200/200/people",
      createdAt: "2019-09-01T05:36:02.590Z",
      updatedAt: "2019-09-01T05:36:02.590Z",
      Followers: [
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
          Followship: {
            followerId: 1,
            followingId: 3,
            createdAt: "2019-09-01T05:37:33.882Z",
            updatedAt: "2019-09-01T05:37:33.882Z"
          }
        }
      ],
      FollowerCount: 1,
      isFollowed: true,
      isOwner: false
    },
    {
      id: 1,
      name: "root",
      email: "root@example.com",
      password: "$2a$10$Z/IqhTucYmIFOF.CwcBR9.5pO3FiV4JE5e854j3zQXEg3vaYxbVP.",
      isAdmin: true,
      image: "http://lorempixel.com/200/200/people",
      createdAt: "2019-09-01T05:36:02.343Z",
      updatedAt: "2019-09-01T05:36:02.343Z",
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
      ],
      FollowerCount: 1,
      isFollowed: false,
      isOwner: true
    },
    {
      id: 4,
      name: "test111",
      email: "test101@example.com",
      password: "$2a$10$ixwnv6bcsTKAlDcAVrCsvun.wHwSoXtMKUSi5TzRs44xMZFC4nE3u",
      isAdmin: false,
      image: "https://i.imgur.com/X1Oao1b.png",
      createdAt: "2019-09-03T11:51:30.989Z",
      updatedAt: "2019-09-03T11:53:24.820Z",
      Followers: [],
      FollowerCount: 0,
      isFollowed: false,
      isOwner: false
    }
  ]
};

export default {
  data() {
    return {
      users: []
    };
  },
  components: {
    NavTabs,
    UserCard
  },
  created() {
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      this.users = dummyData.users;
    }
  }
};
</script>