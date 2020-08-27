<template>
  <div>
    <div class="container">
      <div class="row">
        <h1>Cadastro de produtos</h1>
        <div class="col-sm-8">
          <form>
            <div class="form-group">
              <label for="name">Nome</label>
              <input type="text" class="form-control" aria-describedby="emailHelp" />
            </div>
            <div class="form-group">
              <label for="price">Preço</label>
              <input type="number" class="form-control" />
            </div>

            <div class="form-group">
              <label for="amount">Quantidade em estoque</label>
              <input type="number" class="form-control" />
            </div>
          </form>
          <button v-if="loader" @click="save()" class="btn btn-outline-secondary mt-5">
            <span>Cadastrar</span>
          </button>
          <div v-else class="loader"></div>
        </div>
        <div class="col-4">
          <label for="upload">
            <img v-bind:src="previewImage" class="uploading-image" />
            <input
              type="file"
              id="upload"
              accept="image/jpeg"
              @change="uploadImage"
              style="display:none"
            />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      loader: true,
      previewImage:
        "https://sisterhoodofstyle.com/wp-content/uploads/2018/02/no-image-1.jpg"
    };
  },
  methods: {
    save() {
      this.loader = false;
      setTimeout(() => {
        this.$toasted.show("salvo!");
        this.loader = true;
      }, 1000);
    },
    uploadImage(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = e => {
        this.previewImage = e.target.result;
        console.log(this.previewImage);
      };
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.uploading-image {
  display: flex;
  width: 250px;
  height: 250px;
  border-radius: 15px;
}
.loader {
  border: 5px solid #f3f3f3; /* Light grey */
  border-top: 5px solid black; /* Blue */
  border-radius: 50%;
  width: 35px;
  height: 35px;
  animation: spin 0.5s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
