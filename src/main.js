import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import './plugins/element.js'
import store from './store/store'
import axios from 'axios'
Vue.config.productionTip = false
Vue.prototype.$axios = axios 
Vue.prototype.qs = qs   
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
