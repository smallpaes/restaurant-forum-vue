<template>
  <ul class="nav nav-tabs nav-fill">
    <li class="nav-item" v-for="tab in tabs" :key="tab.id">
      <router-link :to="tab.path" class="nav-link">{{tab.title}}</router-link>
    </li>
  </ul>
</template>

<script>
import uuid from "uuid/v4";
export default {
  name: "NavTabs",
  data() {
    return {
      tabs: [
        {
          id: uuid(),
          title: "首頁",
          path: "/restaurants"
        },
        {
          id: uuid(),
          title: "最新動態",
          path: "/restaurants/feeds"
        },
        {
          id: uuid(),
          title: "TOP 10 人氣餐廳",
          path: "/restaurants/top"
        },
        {
          id: uuid(),
          title: "美食達人",
          path: "/users/top"
        }
      ]
    };
  }
};
</script>

<style scoped>
.nav-tabs {
  border-bottom: 1px solid #c22424;
}

.nav-tabs .nav-item.show .nav-link,
.nav-tabs .nav-link.active,
.nav-item a:hover,
.nav-tabs .nav-link:focus,
.nav-tabs .nav-link:hover {
  background: #c22424;
  color: white;
  border-color: transparent;
  transition: all 0.2s linear;
}

.nav-item a {
  color: #c22424;
}
</style>