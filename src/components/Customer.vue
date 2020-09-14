<template>
  <div class="container">
    <div class="row" v-if="loader">
      <div class="col-12 text-center">
        <div class="loader"></div>
      </div>
    </div>

    <div v-else class="row">
      <div class="col-8">
        <h1>Clientes</h1>
      </div>
      <div class="col-4">
        <button
          type="button"
          class="btn btn-outline-secondary"
          data-toggle="modal"
          data-target="#staticBackdrop"
        >novo cliente</button>
      </div>
      <div class="col-12">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Nome</th>
              <th scope="col">Email</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in customers" :key="item.id">
              <th scope="row">{{item.id}}</th>
              <td>{{item.name}}</td>
              <td>{{item.email}}</td>
              <td>
                <button @click="edit(item.id)" class="btn btn-outline-secondary mr-2">
                  <span>editar</span>
                </button>
                <button @click="remove(item.id)" class="btn btn-outline-secondary mr-2">
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
            <h5 class="modal-title" id="staticBackdropLabel">Cadastro de clientes</h5>
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
                    <input type="text" v-model="customer.name" class="form-control" />
                  </div>
                  <div class="form-group">
                    <label for="description">Email</label>
                    <input type="text" v-model="customer.email" class="form-control" />
                  </div>
                  <div class="form-group">
                    <label for="price">Telefone</label>
                    <input type="number" v-model="customer.phone" class="form-control" />
                  </div>

                  <div class="form-group">
                    <label for="amount">Cpf</label>
                    <input type="number" v-model="customer.cpf" class="form-control" />
                  </div>

                  <div class="form-group">
                    <label for="amount">Data de Nascimento</label>
                    <input type="text" v-model="customer.birthday" class="form-control" />
                  </div>

                  <div class="form-group">
                    <label for="amount">Endereço</label>
                    <input type="text" v-model="address.address" class="form-control" />
                  </div>
                  <div class="form-group">
                    <label for="amount">Numero</label>
                    <input type="text" v-model="address.number" class="form-control" />
                  </div>
                  <div class="form-group">
                    <label for="amount">Cidade</label>
                    <input type="text" v-model="address.city" class="form-control" />
                  </div>
                  <div class="form-group">
                    <label for="amount">Bairro</label>
                    <input type="text" v-model="address.neighborhood" class="form-control" />
                  </div>
                  <div class="form-group">
                    <label for="amount">Rua</label>
                    <input type="text" v-model="address.street" class="form-control" />
                  </div>
                  <div class="form-group">
                    <label for="amount">Complemento</label>
                    <input type="text" v-model="address.complement" class="form-control" />
                  </div>
                  <div class="form-group">
                    <label for="amount">CEP</label>
                    <input type="text" v-model="address.zipcode" class="form-control" />
                  </div>
                </form>
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

export default {
  name: "Customer",
  data() {
    return {
      loader: false,
      customer: {},
      address: {},
      customers: [],
    };
  },
  mounted() {
    this.list();
  },
  methods: {
    list() {
      this.loader = true;
      axios
        .get("https://localhost:5001/customer")
        .then((response) => {
          this.loader = false;
          this.customers = response.data;
          this.customer = {};
        })
        .catch(() => {
          this.loader = false;
          this.$toasted.show("não foi possivel buscar os dados");
        });
    },
    save() {
      this.loader = true;

      this.customer.address = this.address;

      if (this.customer.id) {
        axios
          .put("https://localhost:5001/customer/", this.customer)
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

      axios
        .post("https://localhost:5001/customer/", this.customer)
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
      this.customer = this.customers.filter((item) => {
        return item.id == id;
      })[0];

      window.$("#staticBackdrop").modal("show");
    },
    remove(id) {
      this.loader = true;
      axios
        .delete("https://localhost:5001/customer/", {
          params: {
            id: id,
          },
        })
        .then(() => {
          this.list();
          this.$toasted.show("salvo!");
        })
        .catch(() => {
          this.loader = false;
          this.$toasted.show("não foi possivel realizar o cadastro");
        });
    },
    close() {
      this.customer = {};
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
