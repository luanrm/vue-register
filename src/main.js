import Vue from "vue";
import App from "./App.vue";
import Toasted from "vue-toasted";
import VueRouter from "vue-router";

Vue.config.productionTip = false;

Vue.use(Toasted, {
    theme: "toasted-primary",
    position: "top-right",
    duration: 2000,
    type: "success",
});

Vue.use(VueRouter);

import Product from "./components/Product";

const Customer = { template: "<div>Customer</div>" };

const routes = [
    { path: "/product", component: Product },
    { path: "/customer", component: Customer },
];

const router = new VueRouter({
    routes,
});

new Vue({
    render: (h) => h(App),
    router,
}).$mount("#app");
