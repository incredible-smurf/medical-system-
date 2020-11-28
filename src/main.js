import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import './plugins/element.js'
import store from './store/store'
import axios_instance from './axios/index'

import formCreate from "@form-create/element-ui"


//主文件 绑定APP

//全局使用form-create
Vue.use(formCreate)

//全部绑定axios对象
Vue.prototype.$axios = axios_instance

//默认设置没必要更改
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //路由对象
  router,
  //vuex对象
  store
}).$mount('#app')
