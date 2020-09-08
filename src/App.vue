<template>
  <div id="app">
    <Menu />
    <router-view></router-view>
  </div>
</template>

<script>
import Menu from "./components/Menu.vue";
// import Product from "./components/Product.vue";

export default {
  name: "App",
  components: {
    // Product,
    Menu,
  },
};
</script>

<style>
</style>
