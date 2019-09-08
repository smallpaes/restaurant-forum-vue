<template>
  <div class="container py-5">
    <AdminNav />

    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col" width="140">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <th scope="row">{{user.id}}</th>
          <td>{{user.email}}</td>
          <td v-if="user.isAdmin">admin</td>
          <td v-else>user</td>
          <td>
            <template v-if="currentUser.id !== user.id">
              <button
                v-if="user.isAdmin"
                @click.stop.prevent="toggleUserRole(user.id)"
                type="button"
                class="btn btn-link"
              >set as user</button>
              <button
                v-else
                @click.stop.prevent="toggleUserRole(user.id)"
                type="button"
                class="btn btn-link"
              >set as admin</button>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminNav from "../components/AdminNav";

const dummyData = {
  users: [
    {
      id: 1,
      name: "root",
      email: "root@example.com",
      password: "$2a$10$Z/IqhTucYmIFOF.CwcBR9.5pO3FiV4JE5e854j3zQXEg3vaYxbVP.",
      isAdmin: true,
      image: "http://lorempixel.com/200/200/people",
      createdAt: "2019-09-01T05:36:02.343Z",
      updatedAt: "2019-09-01T05:36:02.343Z"
    },
    {
      id: 2,
      name: "user1",
      email: "user1@example.com",
      password: "$2a$10$rNBwPRm.J3HAJoxhr8E.leFOOzxzSROUz9FviyCdlxodYiN.2kQmG",
      isAdmin: false,
      image: "http://lorempixel.com/200/200/people",
      createdAt: "2019-09-01T05:36:02.466Z",
      updatedAt: "2019-09-01T05:36:02.466Z"
    },
    {
      id: 3,
      name: "user2",
      email: "user2@example.com",
      password: "$2a$10$e6aj/OE8rH0eRMMWWSh4Te7bJ4J9JzWtOmJCYsSfSHpY.4pbV3R2W",
      isAdmin: false,
      image: "http://lorempixel.com/200/200/people",
      createdAt: "2019-09-01T05:36:02.590Z",
      updatedAt: "2019-09-01T05:36:02.590Z"
    },
    {
      id: 4,
      name: "test111",
      email: "test101@example.com",
      password: "$2a$10$ixwnv6bcsTKAlDcAVrCsvun.wHwSoXtMKUSi5TzRs44xMZFC4nE3u",
      isAdmin: false,
      image: "https://i.imgur.com/X1Oao1b.png",
      createdAt: "2019-09-03T11:51:30.989Z",
      updatedAt: "2019-09-03T11:53:24.820Z"
    }
  ],
  currentUser: {
    id: 1,
    name: "管理者",
    email: "root@example.com",
    image: "https://i.pravatar.cc/300",
    isAdmin: true
  },
  isAuthenticated: true
};

export default {
  components: {
    AdminNav
  },
  data() {
    return {
      users: [],
      currentUser: dummyData.currentUser
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      this.users = dummyData.users;
    },
    toggleUserRole(userId) {
      // PUT request to API
      // update user role
      this.users = this.users.map(user => {
        if (user.id !== userId) {
          return user;
        }
        return {
          ...user,
          isAdmin: !user.isAdmin
        };
      });
    }
  }
};
</script>