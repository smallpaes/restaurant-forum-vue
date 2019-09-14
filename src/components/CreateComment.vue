<template>
  <form @submit.stop.prevent="handleSubmit">
    <div class="form-group">
      <label for="text">留下評論：</label>
      <textarea v-model="text" :disabled="isProcessing" class="form-control" rows="3" name="text" />
    </div>
    <div class="text-right">
      <button :disabled="isProcessing" type="submit" class="btn red-btn mr-0">Submit</button>
    </div>
  </form>
</template>

<script>
import commentAPI from "../apis/comment";
import { Toast } from "../utils/helpers";

export default {
  props: {
    restaurantId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      text: "",
      isProcessing: false
    };
  },
  methods: {
    async handleSubmit() {
      // check if input is empty
      if (!this.text) {
        Toast.fire({
          type: "error",
          title: "Please submit a comment with content!"
        });
        return;
      }

      try {
        // update isProcessing status
        this.isProcessing = true;

        const { data, statusText } = await commentAPI.postComment({
          text: this.text,
          restaurantId: this.restaurantId
        });

        // error handling
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        this.$emit("after-create-comment", {
          commentId: data.commentId,
          restaurantId: this.restaurantId,
          text: this.text
        });

        this.text = "";

        // update isProcessing status
        this.isProcessing = false;
      } catch {
        // update isProcessing status
        this.isProcessing = false;

        Toast.fire({
          type: "error",
          title: "Cannot add the comment, please try again later!"
        });
      }
    }
  }
};
</script>