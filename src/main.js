// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import Axios from 'axios'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.$http = Axios
Axios.defaults.baseURL = 'http://bestrate.coconutech.com/'
// Axios.defaults.withCredentials = true
Vue.use(Vuetify)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
