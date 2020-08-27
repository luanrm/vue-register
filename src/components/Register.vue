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

            <button type="submit" class="btn btn-primary">Cadastrar</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
