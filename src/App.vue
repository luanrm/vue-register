<template>
  <div id="app">
    <Menu/>
    <Register />
  </div>
</template>

<script>
import Menu from "./components/Menu.vue";
import Register from "./components/Register.vue";

export default {
  name: "App",
  components: {
    Register,
    Menu,
  },
};
</script>

<style>
</style>
