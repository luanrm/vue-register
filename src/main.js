import Vue from 'vue'
import App from './App.vue'
import Toasted from 'vue-toasted';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

Vue.use(Toasted, { 
  theme: "toasted-primary", 
  position: "top-right", 
  duration : 2000,
  type: 'success'
})
