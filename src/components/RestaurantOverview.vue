<template>
  <div class="row">
    <div class="col-md-12 mb-3">
      <h1>{{restaurant.name}}</h1>
      <p class="badge badge-secondary mt-1 mb-3">{{restaurant.categoryName}}</p>
    </div>
    <hr />
    <div class="col-md-12">
      <div class="contact-info-wrap">
        <ul>
          <li>有 {{commentCount}} 筆評論</li>
          <li>有 {{favoriteUser}} 人收藏這家餐廳</li>
        </ul>
      </div>
    </div>
    <button @click.stop.prevent="$router.go(-1)" class="btn btn-link" type="button">回上一頁</button>
  </div>
</template>

<script>
export default {
  props: {
    restaurant: {
      type: Object,
      required: true
    },
    commentCount: {
      type: Number,
      required: true
    },
    favoriteUser: {
      type: Number,
      required: true
    }
  }
};
</script>