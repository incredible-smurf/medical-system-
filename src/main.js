import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import './plugins/element.js'
import store from './store/store'
import axios_instance from './axios/index'

import formCreate from "@form-create/element-ui"

Vue.use(formCreate)
Vue.config.productionTip = false
Vue.prototype.$axios= axios_instance

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
