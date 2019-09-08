<template>
  <div class="container py-5">
    <AdminNav />

    <form class="my-4">
      <div class="form-row">
        <div class="col-auto">
          <input v-model="newCategoryName" type="text" class="form-control" placeholder="新增餐廳類別..." />
        </div>
        <div class="col-auto">
          <button @click.stop.prevent="createCategory" type="button" class="btn btn-primary">新增</button>
        </div>
      </div>
    </form>
    <!--Category List Dsiplay-->
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col" width="60">#</th>
          <th scope="col">Category Name</th>
          <th scope="col" width="210">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.id">
          <th scope="row">{{ category.id }}</th>
          <td class="position-relative">
            <div class="category-name">{{ category.name }}</div>
          </td>
          <td class="d-flex justify-content-between">
            <button type="button" class="btn btn-link mr-2">Edit</button>
            <button
              @click.stop.prevent="deleteCategory(category.id)"
              type="button"
              class="btn btn-link mr-2"
            >Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminNav from "../components/AdminNav";
import uuid from "uuid/v4";

const dummyData = {
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
  ]
};

export default {
  components: {
    AdminNav
  },
  data() {
    return {
      newCategoryName: "",
      categories: []
    };
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    fetchCategories() {
      this.categories = dummyData.categories;
    },
    createCategory() {
      // POST request to API
      // Add new category to the list rendered
      this.categories.push({
        id: uuid(),
        name: this.newCategoryName
      });
      // clear up input field
      this.newCategoryName = "";
    },
    deleteCategory(cateogryId) {
      this.categories = this.categories.filter(
        category => category.id !== cateogryId
      );
    }
  }
};
</script>