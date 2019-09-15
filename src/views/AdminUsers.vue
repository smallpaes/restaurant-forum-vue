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
    <!--Pagination-->
    <AdminPanelPagination
      v-if="totalPage > 1"
      :total-page="totalPage"
      :current-page="currentPage"
      :admin-panel="adminPanel"
    />
  </div>
</template>

<script>
import AdminNav from "../components/AdminNav";
import adminAPI from "../apis/admin";
import AdminPanelPagination from "../components/AdminPanelPagination";
import { Toast } from "../utils/helpers";
import Spinner from "../components/Spinner";
import { mapState } from "vuex";
import { stat } from "fs";

export default {
  components: {
    AdminNav,
    Spinner,
    AdminPanelPagination
  },
  data() {
    return {
      users: [],
      isLoading: true,
      currentPage: 1,
      totalPage: -1,
      adminPanel: ""
    };
  },
  created() {
    this.fetchUsers();
    this.adminPanel = this.$route.name;
  },
  computed: {
    ...mapState(["currentUser"])
  },
  beforeRouteUpdate(to, from, next) {
    const { page } = to.query;
    this.fetchUsers(page);
    next();
  },
  methods: {
    async fetchUsers(page = 1) {
      try {
        const { data, statusText } = await adminAPI.users.get({ page });
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