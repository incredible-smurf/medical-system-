import Vue from 'vue'
import App from './App.vue'
import routes from './router/router'
import VueRouter from 'vue-router'
import './plugins/element.js'
Vue.config.productionTip = false
Vue.use(VueRouter)


const router = new VueRouter({
	routes,
	mode: 'history',
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
