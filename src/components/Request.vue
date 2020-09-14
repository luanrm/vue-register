<template>
  <div class="container">
    <div class="row" v-if="loader">
      <div class="col-12 text-center">
        <div class="loader"></div>
      </div>
    </div>

    <div v-else class="row">
      <div class="col-8">
        <h1>Pedidos</h1>
      </div>
      <div class="col-4"></div>
      <div class="col-12">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Nome do cliente</th>
              <th scope="col">Itens do pedido</th>
              <th scope="col">Status</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in requests" :key="item.id">
              <th scope="row">{{item.id}}</th>
              <td>{{item.name}}</td>
              <td>{{item.email}}</td>
              <td>{{item.status}}</td>
              <td>
                <button @click="view(item.id)" class="btn btn-outline-secondary mr-2">
                  <span>visualizar</span>
                </button>

                <button
                  class="btn btn-outline-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >status</button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a
                    class="dropdown-item"
                    href="javascript:void(0)"
                    @click="setStatus(item.id, 'preparando')"
                  >preparando</a>
                  <a
                    class="dropdown-item"
                    href="javascript:void(0)"
                    @click="setStatus(item.id, 'a caminho')"
                  >a caminho</a>
                  <a
                    class="dropdown-item"
                    href="javascript:void(0)"
                    @click="setStatus(item.id, 'finalizado')"
                  >finalizado</a>
                </div>
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
            <h5 class="modal-title" id="staticBackdropLabel">Detalhes do pedido</h5>
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
              <div class="col-sm-12">
                <form>
                  <div class="form-group">
                    <label for="name">Nome</label>
                    <input type="text" v-model="request.name" class="form-control" />
                  </div>
                  <div class="form-group">
                    <label for="description">Email</label>
                    <input type="text" v-model="request.email" class="form-control" />
                  </div>
                  <div class="form-group">
                    <label for="price">Telefone</label>
                    <input type="number" v-model="request.phone" class="form-control" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Request",
  data() {
    return {
      loader: false,
      request: {},
      address: {},
      requests: [],
    };
  },
  mounted() {
    this.list();
  },
  methods: {
    list() {
      this.loader = true;
      axios
        .get("https://localhost:5001/request")
        .then((response) => {
          this.loader = false;
          this.requests = response.data;
          this.request = {};
        })
        .catch(() => {
          this.loader = false;
          this.$toasted.show("não foi possivel buscar os dados");
        });
    },
    view(id) {
      this.request = this.products.filter((item) => {
        return item.id == id;
      })[0];
    },
    setStatus(id, status) {
      this.loader = true;

      var request = this.requests.filter((item) => {
        return item.id == id;
      })[0];

      request.status = status;

      axios
        .put("https://localhost:5001/request/", request)
        .then(() => {
          this.list();
          this.$toasted.show("salvo!");
        })
        .catch(() => {
          this.loader = false;
          this.$toasted.show("não foi possivel atualziar os dados");
        });
    },
    close() {
      this.request = {};
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
