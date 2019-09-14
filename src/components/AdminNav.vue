<template>
  <div class="mb-3">
    <h1>餐廳後台</h1>
    <div class="row admin-panel-nav mx-0">
      <router-link to="/admin/restaurants" class="mr-4 underline-animation pb-1">
        <i class="fas fa-store-alt mr-2"></i>Restaurant
      </router-link>
      <router-link to="/admin/categories" class="mr-4 underline-animation pb-1">
        <i class="fas fa-clipboard-list mr-2"></i>Categories
      </router-link>
      <router-link to="/admin/users" class="underline-animation pb-1">
        <i class="fas fa-user mr-2"></i>Users
      </router-link>
    </div>
  </div>
</template>

<style scoped>
a,
a i {
  color: #c22424;
}

.underline-animation::after {
  border-bottom: 2px solid #c22424;
}
</style>