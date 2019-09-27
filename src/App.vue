<template>
  <div id="restaurant-forum">
    <Navbar />
    <main class="mt-5 bg-white" role="main">
      <router-view />
    </main>
  </div>
</template>

<script>
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "animate.css";
import Navbar from "./components/Navbar";
export default {
  name: "App",
  components: {
    Navbar
  }
};
</script>

<style scoped>
main {
  margin-top: 65px !important;
}
</style>