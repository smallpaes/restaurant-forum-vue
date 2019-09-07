<template>
  <div class="card">
    <div class="card-header">
      <strong>{{followingUsers.length}}</strong> followings (追蹤者)
    </div>
    <div class="card-body">
      <router-link
        v-for="user in followingUsers"
        :key="user.id"
        :to="{name: 'user', params: {id: user.id}}"
      >
        <img :src="user.image | placeholderImage" width="60" height="60" class="avatar" />
      </router-link>
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