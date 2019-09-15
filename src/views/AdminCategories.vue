<template>
  <div class="container py-3">
    <AdminNav />
    <Spinner v-if="isLoading" />
    <template v-else>
      <form class="mt-3 mb-4">
        <div class="form-row">
          <div class="col-4">
            <input
              v-model="newCategoryName"
              type="text"
              class="add-input"
              placeholder="新增餐廳類別..."
              required
            />
            <button
              @click.stop.prevent="createCategory"
              :disabled="isProcessing"
              type="button"
              class="btn red-btn px-3"
            >新增</button>
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
            <th scope="row" class="pt-3">{{ category.id }}</th>
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
            <td class="d-flex justify-content-start">
              <button
                v-show="!category.isEditing"
                @click.stop.prevent="toggleIsEditing(category.id)"
                :disabled="category.isProcessing"
                type="button"
                class="btn btn-link mr-2"
              >Edit</button>
              <button
                v-show="category.isEditing"
                @click.stop.prevent="updateCategory({categoryId: category.id, name: category.name})"
                :disabled="category.isProcessing"
                type="button"
                class="btn btn-link mr-2"
              >Save</button>
              <button
                @click.stop.prevent="deleteCategory(category.id)"
                :disabled="category.isProcessing"
                type="button"
                class="btn btn-link mr-2"
              >Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>

<script>
import adminAPI from "../apis/admin";
import { Toast } from "../utils/helpers";
import AdminNav from "../components/AdminNav";
import Spinner from "../components/Spinner";

export default {
  components: {
    AdminNav,
    Spinner
  },
  data() {
    return {
      newCategoryName: "",
      categories: [],
      isProcessing: false,
      isLoading: true
    };
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const { data, statusText } = await adminAPI.categories.get();
        // error handling
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        // update categories data
        this.categories = data.categories.map(category => ({
          ...category,
          isEditing: false,
          isProcessing: false
        }));
        // update loading status
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          type: "error",
          title: "Cannot get categories info, please try again later"
        });
      }
    },
    async createCategory() {
      // check if input is empty
      if (!this.newCategoryName) {
        Toast.fire({
          type: "error",
          title: "Please enter a category name"
        });
        return;
      }

      // check if category already existes
      if (
        this.categories.filter(
          category => category.name.trim() === this.newCategoryName.trim()
        ).length > 0
      ) {
        Toast.fire({
          type: "error",
          title: "This category already exists"
        });
        return;
      }

      try {
        // change isProcessing status
        this.isProcessing = true;

        const { data, statusText } = await adminAPI.categories.create({
          name: this.newCategoryName.trim()
        });

        // error handling
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        // add category to the list
        this.categories.push({
          id: data.categoryId,
          name: this.newCategoryName,
          isEditing: false
        });

        // clear up input field
        this.newCategoryName = "";

        // change isProcessing status
        this.isProcessing = false;
      } catch (error) {
        // change isProcessing status
        this.isProcessing = false;
        Toast.fire({
          type: "error",
          title: "Cannot add this category, please try again later"
        });
      }
    },
    async deleteCategory(categoryId) {
      try {
        // change isProcessing status
        this.toggleIsProcessing(categoryId);

        const { data, statusText } = await adminAPI.categories.delete({
          categoryId
        });

        // error handling
        if ((statusText !== "OK", data.status !== "success")) {
          throw new Error(statusText);
        }

        // update category data
        this.categories = this.categories.filter(
          category => category.id !== categoryId
        );

        // update isProcessing status
        this.toggleIsProcessing(categoryId);
      } catch (error) {
        // update isProcessing status
        this.toggleIsProcessing(categoryId);
        Toast.fire({
          type: "error",
          title: "Cannot delete this category, please try again later"
        });
      }
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
    toggleIsProcessing(categoryId) {
      this.categories = this.categories.map(category => {
        if (category.id !== categoryId) return category;
        return {
          ...category,
          isProcessing: !category.isProcessing
        };
      });
    },
    async updateCategory({ categoryId, name }) {
      // check if input is empty
      if (!name) {
        Toast.fire({
          type: "error",
          title: "Please enter the category name"
        });
        return;
      }

      // check if category already existes
      if (
        this.categories.filter(category => category.name.trim() === name.trim())
          .length > 1
      ) {
        Toast.fire({
          type: "error",
          title: "This category already exists"
        });
        return;
      }

      try {
        // update isProcessing status
        this.toggleIsProcessing(categoryId);

        const { data, statusText } = await adminAPI.categories.update({
          categoryId,
          name
        });

        // error handling
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        // update isEditing status
        this.toggleIsEditing(categoryId);

        // change isProcessing status
        this.toggleIsProcessing(categoryId);
      } catch (error) {
        // change isProcessing status
        this.toggleIsProcessing(categoryId);

        Toast.fire({
          type: "error",
          title: "Cannot update this category, please try again"
        });
      }
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

.form-row:hover .add-input,
.form-row:focus-within .add-input {
  width: 70%;
  transition: all 0.6s linear;
}

.add-input {
  border: none;
  width: 0;
  padding: 0.2rem 0rem;
  border-bottom: 1px solid #c22424;
  margin-right: 0.2rem;
}

.add-input:focus,
.add-input:hover {
  outline: none;
}
</style>