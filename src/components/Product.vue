<template>
  <div class="container">
    <div class="row">
      <div class="col-8">
        <h1>Produtos</h1>
      </div>
      <div class="col-4 justify-content-center">
        <button
          type="button"
          class="btn btn-outline-secondary"
          data-toggle="modal"
          data-target="#staticBackdrop"
        >novo produto</button>
      </div>
      <div class="col-12">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Nome</th>
              <th scope="col">Preço</th>
              <th scope="col">Quantidade em estoque</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  data-toggle="modal"
                  data-target="#staticBackdrop"
                >editar</button>
                <button
                  type="button"
                  class="btn btn-outline-secondary ml-1"
                  data-toggle="modal"
                  data-target="#staticBackdrop"
                >excluir</button>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  data-toggle="modal"
                  data-target="#staticBackdrop"
                >editar</button>
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  data-toggle="modal"
                  data-target="#staticBackdrop"
                >excluir</button>
              </td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
              <td>
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  data-toggle="modal"
                  data-target="#staticBackdrop"
                >editar</button>
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  data-toggle="modal"
                  data-target="#staticBackdrop"
                >excluir</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div
      class="modal"
      id="staticBackdrop"
      data-backdrop="static"
      data-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Cadastro de produtos</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-8">
                <form>
                  <div class="form-group">
                    <label for="name">Nome</label>
                    <input type="text" v-model="product.title" class="form-control" />
                  </div>
                  <div class="form-group">
                    <label for="description">Descrição</label>
                    <input type="text" v-model="product.description" class="form-control" />
                  </div>
                  <div class="form-group">
                    <label for="price">Preço</label>
                    <input type="number" v-model="product.unit_price" class="form-control" />
                  </div>

                  <div class="form-group">
                    <label for="amount">Quantidade em estoque</label>
                    <input type="number" v-model="product.quantity" class="form-control" />
                  </div>
                </form>
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
          <div class="modal-footer">
            <button v-if="!loader" @click="save()" class="btn btn-outline-secondary">
              <span>Cadastrar</span>
            </button>
            <div v-else class="loader"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Product",
  data() {
    return {
      loader: false,
      product: {},
      products: [],
      previewImage:
        "https://sisterhoodofstyle.com/wp-content/uploads/2018/02/no-image-1.jpg",
    };
  },
  methods: {
    list() {
      axios
        .get("https://localhost:5001/product")
        .then((response) => {
          this.loader = false;
          this.products = response.data;
        })
        .catch(() => {
          this.loader = false;
          this.$toasted.show("não foi possivel realizar o cadastro", {
            type: "danger",
          });
        });
    },
    save() {
      this.loader = true;
      console.log(this.product);
      axios
        .post("https://localhost:5001/product", this.product)
        .then((response) => {
          this.loader = false;
          this.$toasted.show(response);
        })
        .catch(() => {
          this.loader = false;
          this.$toasted.show("não foi possivel realizar o cadastro");
        });
    },
    uploadImage(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.previewImage = e.target.result;
        console.log(this.previewImage);
      };
    },
  },
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
