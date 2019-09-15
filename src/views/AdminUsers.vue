<template>
  <div class="container py-3">
    <AdminNav />
    <Spinner v-if="isLoading" />
    <table v-else class="table">
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
          <th scope="row" class="py-3">{{user.id}}</th>
          <td class="py-3">{{user.email}}</td>
          <td class="py-3" v-if="user.isAdmin">admin</td>
          <td class="py-3" v-else>user</td>
          <td>
            <template v-if="currentUser.id !== user.id">
              <button
                v-if="user.isAdmin"
                @click.stop.prevent="toggleUserRole(user.id)"
                type="button"
                class="btn btn-link pl-0"
              >set as user</button>
              <button
                v-else
                @click.stop.prevent="toggleUserRole(user.id)"
                type="button"
                class="btn btn-link pl-0"
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
import adminAPI from "../apis/admin";
import { Toast } from "../utils/helpers";
import Spinner from "../components/Spinner";
import { mapState } from "vuex";
import { stat } from "fs";

export default {
  components: {
    AdminNav,
    Spinner
  },
  data() {
    return {
      users: [],
      isLoading: true
    };
  },
  created() {
    this.fetchUsers();
  },
  computed: {
    ...mapState(["currentUser"])
  },
  methods: {
    async fetchUsers() {
      try {
        const { data, statusText } = await adminAPI.users.get();
        // error handling
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        this.users = data.users;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          type: "error",
          title: "Cannot get user data, please try again later!"
        });
      }
    },
    async toggleUserRole(userId) {
      try {
        const { data, statusText } = await adminAPI.users.update({ userId });
        // error handling
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
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
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "Cannot change user role, please try again later!"
        });
      }
    }
  }
};
</script>