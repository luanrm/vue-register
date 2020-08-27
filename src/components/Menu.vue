<template>
  <div>
    <div id="mySidenav" class="sidenav">
      <a href="javascript:void(0)" class="closebtn" @click="closeNav()">&times;</a>
      <a href="#">Clientes</a>
      <a href="#">Produtos</a>
    </div>
    <button class="btn btn-outline-secondary m-3" @click="openNav()">menu</button>
  </div>
</template>

<script>
export default {
  name: "Menu",
  data() {
    return {};
  },
  methods: {
    openNav() {
      document.getElementById("mySidenav").style.display = "block";
      
    },
    closeNav() {
      document.getElementById("mySidenav").style.display = "none";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sidenav {
  display: none;
  height: 100%;
  width: 250px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #f2f2f2;
  overflow-x: hidden;
  padding-top: 60px;
}

.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: black;
  display: block;
}

.sidenav a:hover {
  color: gray;
}

.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
  .sidenav a {
    font-size: 18px;
  }
}
</style>
