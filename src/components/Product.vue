<template>
  <div class="container">
    <div class="row" v-if="loader">
      <div class="col-12 text-center">
        <div class="loader"></div>
      </div>
    </div>

    <div v-else class="row">
      <div class="col-8">
        <h1>Produtos</h1>
      </div>
      <div class="col-4">
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
            <tr v-for="item in products" :key="item.id">
              <th scope="row">{{item.id}}</th>
              <td>{{item.title}}</td>
              <td>{{item.unit_price}}</td>
              <td>{{item.quantity}}</td>
              <td>
                <button @click="edit(item.id)" class="btn btn-outline-secondary mr-2">
                  <span>editar</span>
                </button>
                <button @click="remove(item.id)" class="btn btn-outline-secondary">
                  <span>excluir</span>
                </button>
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
            <button
              type="button"
              @click="close()"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
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
            <button @click="save()" class="btn btn-outline-secondary">
              <span>salvar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const nocontent = require("../assets/no-image-1.jpg");

export default {
  name: "Product",
  data() {
    return {
      loader: false,
      product: {},
      products: [],
      previewImage: nocontent,
    };
  },
  mounted() {
    this.list();
  },
  methods: {
    list() {
      this.loader = true;
      axios
        .get("https://localhost:5001/product")
        .then((response) => {
          this.loader = false;
          this.products = response.data;
          this.product = {};
        })
        .catch(() => {
          this.loader = false;
          this.$toasted.show("não foi possivel buscar os dados");
        });
    },
    save() {
      this.loader = true;
      if (this.product.id) {
        axios
          .put("https://localhost:5001/product/", this.product)
          .then(() => {
            this.list();
            this.$toasted.show("salvo!");
          })
          .catch(() => {
            this.loader = false;
            this.$toasted.show("não foi possivel realizar o cadastro");
          });

        return window.$("#staticBackdrop").modal("hide");
      }

      this.product.unit_price = parseInt(this.product.unit_price);
      this.product.quantity = parseInt(this.product.quantity);

      axios
        .post("https://localhost:5001/product/", this.product)
        .then(() => {
          this.$toasted.show("salvo");
          this.list();
        })
        .catch(() => {
          this.loader = false;
          this.$toasted.show("não foi possivel realizar o cadastro");
        });

      window.$("#staticBackdrop").modal("hide");
    },
    edit(id) {
      this.product = this.products.filter((item) => {
        return item.id == id;
      })[0];

      this.previewImage = "data:image/jpeg;base64," + this.product.image;

      window.$("#staticBackdrop").modal("show");
    },
    remove(id) {
      this.loader = true;
      axios
        .delete("https://localhost:5001/product/", {
          params: {
            id: id,
          },
        })
        .then(() => {
          this.$toasted.show("salvo!");
          this.list();
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

        this.product.image = e.target.result.replace(
          "data:image/jpeg;base64,",
          ""
        );
      };
    },
    close() {
      this.product = {};
      this.previewImage = nocontent;
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
  float: none;
  margin: auto;
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
