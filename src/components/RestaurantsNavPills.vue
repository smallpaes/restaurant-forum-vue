<template>
  <ul class="nav nav-pills mt-2 mb-4">
    <li class="nav-item mr-1">
      <router-link
        class="nav-link px-3 py-1 my-1"
        :class="{active: $route.query.categoryId === ''}"
        :to="{ name: 'restaurants' }"
      >全部</router-link>
    </li>

    <li v-for="category in categories" :key="category.id" class="nav-item mr-1">
      <router-link
        class="nav-link px-3 py-1 my-1"
        :class="{active: Number($route.query.categoryId) === category.id}"
        :to="{ name: 'restaurants', query: { categoryId: category.id } }"
      >{{ category.name }}</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.nav-pills .nav-link {
  background-color: transparent;
  border: 1px solid rgb(116, 115, 115);
  color: rgb(116, 115, 115);
}

.nav-pills .nav-link.active,
.nav-pills .nav-link:hover {
  background-color: rgb(116, 115, 115);
  color: white;
  transition: all 0.2s linear;
}
</style>