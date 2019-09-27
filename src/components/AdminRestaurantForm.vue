<template>
  <Spinner v-if="isLoading" />
  <form v-else v-show="!isLoading" @submit.stop.prevent="handleSubmit">
    <div class="form-group">
      <label for="name">Name</label>
      <input
        id="name"
        v-model="restaurant.name"
        type="text"
        class="form-control"
        name="name"
        placeholder="Enter name"
        required
      />
    </div>

    <div class="form-group">
      <label for="categoryId">Category</label>
      <select
        id="categoryId"
        v-model="restaurant.categoryId"
        class="form-control"
        name="categoryId"
        required
      >
        <option value selected disabled>--請選擇--</option>
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
        >{{category.name}}</option>
      </select>
    </div>

    <div class="form-group">
      <label for="tel">Tel</label>
      <input
        id="tel"
        v-model="restaurant.tel"
        type="text"
        class="form-control"
        name="tel"
        placeholder="Enter telephone number"
      />
    </div>

    <div class="form-group">
      <label for="address">Address</label>
      <input
        id="address"
        v-model="restaurant.address"
        type="text"
        class="form-control"
        placeholder="Enter address"
        name="address"
      />
    </div>

    <div class="form-group">
      <label for="opening-hours">Opening Hours</label>
      <input
        id="opening-hours"
        v-model="restaurant.openingHours"
        type="time"
        class="form-control"
        name="opening_hours"
      />
    </div>

    <div class="form-group">
      <label for="description">Description</label>
      <textarea
        id="description"
        v-model="restaurant.description"
        class="form-control"
        rows="3"
        name="description"
      />
    </div>

    <div class="form-group">
      <label for="image">Image</label>
      <img
        :src="restaurant.image"
        v-if="restaurant.image"
        class="d-block img-thumbnail mb-3"
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

    <button
      type="submit"
      class="btn btn-primary"
      :disabled="isProcessing"
    >{{isProcessing ? "處理中" : "送出"}}</button>
  </form>
</template>

<script>
import adminAPI from "../apis/admin";
import { Toast } from "../utils/helpers";
import Spinner from "../components/Spinner";

export default {
  components: {
    Spinner
  },
  props: {
    initialRestaurant: {
      type: Object,
      default: () => ({
        name: "",
        categoryId: "",
        tel: "",
        address: "",
        description: "",
        image: "",
        openingHours: ""
      })
    },
    isProcessing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      restaurant: {
        name: "",
        categoryId: "",
        tel: "",
        address: "",
        description: "",
        image: "",
        openingHours: ""
      },
      categories: [],
      // make sure category data has received before showing the form
      isLoading: true
    };
  },
  watch: {
    initialRestaurant(restaurant) {
      this.restaurant = {
        ...this.restaurant,
        ...restaurant
      };
    }
  },
  created() {
    this.fetchCategories();
    this.restaurant = {
      ...this.restaurant,
      ...this.initialRestaurant
    };
  },
  methods: {
    async fetchCategories(page = null) {
      try {
        const { data, statusText } = await adminAPI.categories.get({ page });
        // error handling
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        // update categories data
        this.categories = data.categories;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          type: "error",
          title: "Cannot get restaurant categories, please try again later"
        });
      }
    },
    handleFileChange(e) {
      const files = e.target.files;
      if (!files.length) return;
      // create preview image
      const imageURL = window.URL.createObjectURL(files[0]);
      this.restaurant.image = imageURL;
    },
    handleSubmit(e) {
      // validate form input
      if (!this.restaurant.name) {
        Toast.fire({
          type: "error",
          title: "Please enter your name"
        });
        return;
      }
      if (!this.restaurant.categoryId) {
        Toast.fire({
          type: "error",
          title: "Please choose a category"
        });
        return;
      }

      const form = e.target;
      const formData = new FormData(form);
      this.$emit("after-submit", formData);
    }
  }
};
</script>