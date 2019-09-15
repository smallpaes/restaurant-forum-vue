<template>
  <div>
    <h2 class="mb-4 mt-0">所有評論</h2>
    <hr />
    <div v-for="comment in restaurantComments" :key="comment.id">
      <blockquote class="blockquote mb-0">
        <button
          v-if="currentUser.isAdmin"
          @click.stop.prevent="handleDeleteButtonClick(comment.id)"
          :disabled="isProcessing"
          type="button"
          class="btn float-right"
          aria-label="Close"
        >
          <h4 aria-hidden="true" class="text-secondary">&times;</h4>
        </button>
        <h5 class="user-name">
          <router-link :to="{name: 'user', params: {id: comment.User.id}}">{{comment.User.name}}</router-link>
        </h5>
        <p>{{comment.text}}</p>
        <footer class="blockquote-footer">{{comment.createdAt | fromNow}}</footer>
      </blockquote>
      <hr />
    </div>
    <div v-if="restaurantComments.length < 1" class="my-4">
      目前還沒有任何評論！
      <hr />
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from "../utils/mixins";
import commentAPI from "../apis/comment";
import { Toast } from "../utils/helpers";
import { mapState } from "vuex";

export default {
  mixins: [fromNowFilter],
  props: {
    restaurantComments: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isProcessing: false
    };
  },
  computed: {
    ...mapState(["currentUser"])
  },
  methods: {
    async handleDeleteButtonClick(commentId) {
      try {
        // update isProcessing status
        this.isProcessing = true;

        const { data, statusText } = await commentAPI.deleteComment({
          commentId
        });

        // error handling
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        this.$emit("after-delete-comment", commentId);

        // update isProcessing status
        this.isProcessing = false;
      } catch (error) {
        // update isProcessing status
        this.isProcessing = false;
        Toast.fire({
          type: "error",
          title: "Cannot delete this comment, please try again later"
        });
      }
    }
  }
};
</script>

<style scoped>
.user-name a {
  color: #c22424;
}
</style>