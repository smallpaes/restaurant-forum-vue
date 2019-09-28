<template>
  <div class="container">
    <Spinner v-if="isLoading" />
    <transition name="fade">
      <div class="row" v-if="!isLoading">
        <div class="col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2">
          <h2 class="pt-3">Edit Profile</h2>
          <form @submit.stop.prevent="handleSubmit" class="py-3">
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
              <label for="Email">Email</label>
              <input
                id="email"
                v-model="profile.email"
                type="text"
                name="email"
                class="form-control"
                placeholder="Enter Email"
                required
              />
            </div>
            <div class="form-group">
              <label for="image">Image</label>
              <div
                v-if="profile.image && imgIsLoading"
                class="placeholder-img d-flex justify-content-center align-items-center rounded"
              >
                <Spinner class="p-0" />
              </div>
              <div class="img-container" v-show="profile.image && !imgIsLoading">
                <transition name="img-fade">
                  <img
                    v-show="profile.image && !imgIsLoading"
                    :src="profile.image"
                    :key="profile.image"
                    alt="Profile picture"
                    class="img-fluid d-block rounded"
                    @load="changeLoading"
                    width="200"
                    height="200"
                  />
                </transition>
              </div>
              <input
                id="image"
                @change="handleFileChange"
                type="file"
                name="image"
                accept="image/*"
                class="form-control-file mt-2"
              />
            </div>

            <button :disabled="isProcessing" type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import userAPI from "../apis/users";
import { Toast } from "../utils/helpers";
import Spinner from "../components/Spinner";

export default {
  name: "UserEdit",
  components: {
    Spinner
  },
  data() {
    return {
      profile: {
        id: -1,
        name: "",
        image: "",
        email: ""
      },
      isLoading: true,
      imgIsLoading: true,
      isProcessing: false
    };
  },
  created() {
    const { id } = this.$route.params;
    this.fetchProfile(id);
  },
  methods: {
    changeLoading() {
      this.imgIsLoading = false;
    },
    async fetchProfile(userId) {
      try {
        const { data, statusText } = await userAPI.get({ userId });
        // error handling
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        // update data
        this.profile = {
          ...this.profile,
          id: data.owner.id,
          name: data.owner.name,
          email: data.owner.email,
          image: data.owner.image
        };
        // update loading status
        this.isLoading = false;
      } catch (error) {
        // update loading status
        this.isLoading = false;
        Toast.fire({
          type: "error",
          title: "Cannot get you data, please try again later"
        });
      }
    },
    handleFileChange(e) {
      const files = e.target.files;
      if (!files.length) return;
      const imageURL = window.URL.createObjectURL(files[0]);
      this.profile.image = imageURL;
    },
    async handleSubmit(e) {
      // get the form
      const form = e.target;
      // create formData instance
      const formData = new FormData(form);
      try {
        // update processing status
        this.isProcessing = true;
        const { data, statusText } = await userAPI.updateUser({
          userId: this.profile.id,
          formData
        });
        // error handling
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        // update processing status
        this.isProcessing = false;
        // redirect back to user profile page
        this.$router.push({ name: "user", params: { id: this.profile.id } });
      } catch (error) {
        // update processing status
        this.isProcessing = false;
        Toast.fire({
          type: "error",
          title: "Cannot update your profile, please try again later"
        });
      }
    }
  }
};
</script>

<style scoped>
.placeholder-img {
  width: 200px;
  height: 200px;
}

.img-fade-enter,
.img-fade-leave {
  opacity: 0;
}

.img-fade-enter-active {
  transition: opacity 1s ease-out;
}
</style>