<template>
  <div class="row">
    <div class="col-12 col-md-5 offset-md-1 mb-3">
      <div class="card border-0 shadow-sm">
        <img class="d-none d-md-block card-img-top" :src="restaurant.image" />
        <div class="card-body text-truncate">
          <h3 class="card-title text-secondary">{{restaurant.name}}</h3>
          <p class="card-text text-truncate">{{restaurant.description}}</p>
        </div>
        <ul class="list-group list-group-flush d-none d-md-block">
          <li class="list-group-item py-lg-3 mx-3 px-1">餐廳類型：{{restaurant.categoryName}}</li>
          <li class="list-group-item py-lg-3 mx-3 px-1">營業時間：{{restaurant.openingHour}}</li>
          <li class="list-group-item py-lg-3 mx-3 px-1">聯絡電話：{{restaurant.tel}}</li>
        </ul>
      </div>
    </div>

    <div class="col-12 col-md-4 mb-3" id="dashboard">
      <div class="card shadow-sm dashboard-outer">
        <div class="card-body">
          <div class="card my-sm-0 my-lg-3 overall-status border-0">
            <div class="card-body text-secondary">
              <h4 class="card-title text-center mb-1 mb-xl-3">評論數</h4>
              <h1 class="text-center m-0">{{commentCount}}</h1>
            </div>
          </div>
          <hr class="m-0" />
          <div class="card my-0 my-lg-3 overall-status border-0">
            <div class="card-body text-secondary">
              <h4 class="card-title text-center mb-1 mb-xl-3">瀏覽次數</h4>
              <h1 class="text-center m-0">{{restaurant.viewCounts}}</h1>
            </div>
          </div>
          <hr class="m-0" />
          <div class="card my-sm-0 my-lg-3 overall-status border-0">
            <div class="card-body text-secondary">
              <h4 class="card-title text-center mb-1 mb-xl-3">收藏數</h4>
              <h1 class="text-center m-0">{{favoriteUser}}</h1>
            </div>
          </div>
          <hr class="m-0" />
          <div class="text-center last-page-button-box">
            <button
              @click.stop.prevent="$router.go(-1)"
              class="btn btn-link underline-animation"
              type="button"
            >回上一頁</button>
          </div>
        </div>
      </div>
    </div>
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

<style scoped>
#dashboard > .card {
  border: none;
  border-top: 5px solid #c22424;
}

.last-page-button-box {
  margin-top: 0.8rem;
}

button {
  color: #c22424;
}

button:hover {
  text-decoration: none;
  color: #c22424;
}

.underline-animation::after {
  border-bottom: 2px solid #c22424;
}

/*lg size*/
@media screen and (min-width: 992px) {
  .last-page-button-box {
    margin-top: 1rem;
  }
}

/*xl size*/
@media screen and (min-width: 1200px) {
  .last-page-button-box {
    margin-top: 1.8rem;
    margin-bottom: 0.4rem;
  }
}
</style>