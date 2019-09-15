<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination d-flex justify-content-center">
      <!-- 回到上一頁 previousPage -->
      <li class="page-item">
        <router-link
          class="page-link"
          aria-label="Previous"
          v-show="previousPage"
          :to="{name: adminPanel, query: { page: previousPage }}"
        >
          <span aria-hidden="true">&laquo;</span>
        </router-link>
      </li>

      <!-- 頁碼 -->
      <li
        v-for="page in totalPage"
        :key="page"
        class="page-item"
        :class="['page-item', { active: currentPage === page }]"
      >
        <router-link class="page-link" :to="{name: adminPanel, query: { page }}">{{ page }}</router-link>
      </li>

      <!-- 前往下一頁 nextPage -->
      <li class="page-item">
        <router-link
          class="page-link"
          v-show="nextPage"
          :to="{name: adminPanel, query: { page: nextPage }}"
          aria-label="Next"
        >
          <span aria-hidden="true">&raquo;</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    totalPage: {
      type: Number,
      default: -1
    },
    adminPanel: {
      type: String,
      required: true
    }
  },
  computed: {
    previousPage() {
      return this.currentPage === 1 ? null : this.currentPage - 1;
    },
    nextPage() {
      return this.currentPage === this.totalPage ? null : this.currentPage + 1;
    }
  }
};
</script>