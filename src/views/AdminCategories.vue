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
            <div v-show="!category.isEditing" class="category-name">{{ category.name }}</div>
            <input
              type="text"
              v-show="category.isEditing"
              class="form-control"
              v-model="category.name"
            />
            <span v-show="category.isEditing" @click="handleCancel(category.id)" class="cancel">X</span>
          </td>
          <td class="d-flex justify-content-between">
            <button
              v-show="!category.isEditing"
              @click.stop.prevent="toggleIsEditing(category.id)"
              type="button"
              class="btn btn-link mr-2"
            >Edit</button>
            <button
              v-show="category.isEditing"
              @click.stop.prevent="updateCategory({categoryId: category.id, name: category.name})"
              type="button"
              class="btn btn-link mr-2"
            >Save</button>
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
      this.categories = dummyData.categories.map(category => ({
        ...category,
        isEditing: false
      }));
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
    },
    toggleIsEditing(categoryId) {
      this.categories = this.categories.map(category => {
        if (category.id !== categoryId) return category;
        return {
          ...category,
          isEditing: !category.isEditing,
          nameCatched: category.name
        };
      });
    },
    updateCategory({ categoryId, name }) {
      // PUT request to API
      // update isEditing status
      this.toggleIsEditing(categoryId);
    },
    handleCancel(categoryId) {
      this.categories = this.categories.map(category => {
        if (category.id !== categoryId) {
          return category;
        }
        return {
          ...category,
          name: category.nameCatched
        };
      });
      this.toggleIsEditing(categoryId);
    }
  }
};
</script>

<style scoped>
.category-name {
  padding: 0.375rem 0.75rem;
  border: 1px solid transparent;
  outline: 0;
  cursor: auto;
}

.btn-link {
  width: 62px;
}

.cancel {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border: 1px solid #aaaaaa;
  border-radius: 50%;
  user-select: none;
  cursor: pointer;
  font-size: 12px;
}
</style>