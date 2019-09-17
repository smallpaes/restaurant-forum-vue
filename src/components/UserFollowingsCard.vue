<template>
  <div class="card shadow-sm mt-4" id="following">
    <h6 class="mt-4 mb-1 pl-4 header">{{followingUsers.length}} 已追蹤用戶</h6>
    <hr class="mx-3" />
    <div class="card-body">
      <div class="row">
        <template v-if="followingUsers.length > 0">
          <router-link
            class="col-12 media my-2"
            v-for="user in followingUsers"
            :key="user.id"
            :to="{name: 'user', params: {id: user.id}}"
          >
            <div class="media-image mr-3 position-relative">
              <div class="loader-container text-center">
                <div class="loader"></div>
              </div>
              <img :src="user.image | placeholderImage" alt="user image" class="rounded" />
            </div>
            <div class="media-body text-truncate">
              <h6 class="mt-0 text-truncate m-0">{{user.name}}</h6>
            </div>
          </router-link>
        </template>
        <template v-else>
          <h5 class="col-12 text-center p-3 m-0 text-muted">
            <i class="far fa-paper-plane mr-2"></i>No Following Users Yet!
          </h5>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { placeholderImageCreator } from "../utils/mixins";

export default {
  mixins: [placeholderImageCreator],
  props: {
    followingUsers: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.user-name {
  color: #379683;
}

.btn-group-sm > .btn,
.btn-sm {
  border-radius: 1rem;
}

.btn-outline-secondary.focus,
.btn-outline-secondary:focus,
.btn.focus,
.btn:focus {
  box-shadow: none;
}
</style>