<template>
  <div class="card mt-3 border-0 shadow-sm">
    <div class="card-header bg-white border-0">
      <p class="border-bottom m-0 pb-2">
        <i class="fas fa-comment-alt mr-2"></i>最新評論
      </p>
    </div>
    <div class="card-body">
      <div v-for="comment in comments" :key="comment.id">
        <div class="d-flex justify-content-between">
          <h4 class="m-0">
            <router-link
              :to="{name: 'restaurant', params: {id: comment.Restaurant.id}}"
            >{{comment.Restaurant.name}}</router-link>
          </h4>
          <small class="datetime d-block text-right">{{comment.createdAt | fromNow}}</small>
        </div>
        <small>
          <i class="far fa-user mr-2"></i>
          <router-link :to="{name: 'user', params: {id: comment.UserId}}">{{comment.User.name}}</router-link>
        </small>
        <p class="mt-3">{{comment.text}}</p>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from "../utils/mixins";

export default {
  mixins: [fromNowFilter],
  props: {
    comments: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.fa-user {
  color: #c22424;
}
</style>
