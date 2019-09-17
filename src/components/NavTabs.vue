<template>
  <ul class="nav nav-tabs nav-fill">
    <li class="nav-item" v-for="tab in tabs" :key="tab.id">
      <router-link
        :to="{name: tab.name}"
        class="nav-link"
        :class="{active: $route.name===tab.name}"
      >{{tab.title}}</router-link>
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
          name: "restaurants"
        },
        {
          id: uuid(),
          title: "最新動態",
          name: "restaurants-feeds"
        },
        {
          id: uuid(),
          title: "TOP 10 人氣餐廳",
          name: "restaurants-top"
        },
        {
          id: uuid(),
          title: "美食達人",
          name: "users-top"
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