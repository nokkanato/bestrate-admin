import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// initial state of the app
const state = {
  token: ''
}

export default new Vuex.Store({
  state
})
