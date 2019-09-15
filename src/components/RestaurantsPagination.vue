<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination d-flex justify-content-center">
      <!-- 回到上一頁 previousPage -->
      <li class="page-item">
        <router-link
          class="page-link"
          aria-label="Previous"
          v-show="previousPage"
          :to="{name: 'restaurants', query: { categoryId, page: previousPage }}"
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
        <router-link
          class="page-link"
          :to="{name: 'restaurants', query: { categoryId, page }}"
        >{{ page }}</router-link>
      </li>

      <!-- 前往下一頁 nextPage -->
      <li class="page-item">
        <router-link
          class="page-link"
          v-show="nextPage"
          :to="{name: 'restaurants', query: { categoryId, page: nextPage }}"
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
    categoryId: {
      default: -1
    },
    currentPage: {
      type: Number,
      default: 1
    },
    totalPage: {
      type: Number,
      default: -1
    }
  },
  computed: {
    previousPage() {
      return this.currentPage === 1 ? null : this.currentPage - 1;
    },
    nextPage() {
      return this.currentPage + 1 > this.totalPage
        ? null
        : this.currentPage + 1;
    }
  }
};
</script>

<style scoped>
.page-link {
  color: #c22424;
}

.page-item.active .page-link {
  background: #c22424;
  border-color: #c22424;
}

.page-link:focus {
  box-shadow: none;
}

.page-link:hover {
  background-color: #c22424;
  border-color: #c22424;
  color: white;
}
</style>