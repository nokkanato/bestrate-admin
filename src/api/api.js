import Vue from 'vue'
import Store from '@/Store.js'

export default {
  isLogined () {
    if (localStorage.getItem('token')) {
      return true
    } else {
      return false
    }
  },
  // 500 internal error
  // 400 wrong parameter
  // 401 unauthorized
  // 409 same existed user
  resetToken () {
    localStorage.clear()
  },
  // login {username, password}
  // login then add token to Authorization header tag
  login (param, callback) {
    Vue.$http.post('adminsignin', param).then(function (response) {
      Store.state.token = response.data
      Vue.$http.defaults.headers.common['Authorization'] = response.data
      callback(response)
    }).catch(function (response) {
      console.log('err')
      callback(response.response.status)
    })
  },
  // get all branches
  getbranches (callback) {
    Vue.$http.get('getbranches').then(function (response) {
      console.log('getbranch', response)
      callback(response.data)
    }).catch(function (response) {
      callback(response)
    })
  },
  // get branch detail {_id}
  // remove branch {_id}
  getBranch (params, callback) {
    let option = {
      headers: {Authorization: `Bearer ${Store.state.token}`}
    }
    Vue.$http.get('getbranch', {params}, option).then(function (response) {
      console.log('get branch', response)
      callback(response.data)
    }).catch(function (response) {
      callback(response)
    })
  },
  // getall currency
  getAllCurrency (callback) {
    let option = {
      headers: {Authorization: `Bearer ${Store.state.token}`}
    }
    Vue.$http.get('getcurrencies', option).then(function (response) {
      console.log('get currency', response)
      callback(response.data)
    }).catch(function (response) {
      callback(response)
    })
  },
  // remove branch {}
  removeBranch (param, callback, errCallback) {
    let option = {
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    }
    Vue.$http.post('removebranch', param, option).then(function (response) {
      console.log('removed branch', response)
      callback(response.data)
    }).catch(function (response) {
      callback(response.response.status)
    })
  },
  // create currency {name, flag}
  createCurrency (param, callback, errCallback) {
    let option = {
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    }
    Vue.$http.post('createcurrency', param, option).then(function (response) {
      console.log('created branch', response)
      callback(response.data)
    }).catch(function (response) {
      callback(response.response.status)
    })
  },
  // edit currency {_id, name, flag}
  editCurrency (param, callback) {
    let option = {
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    }
    Vue.$http.post('editcurrency', param, option).then(function (response) {
      console.log('editcurrency', response)
      callback(response.data)
    }).catch(function (response) {
      callback(response.response.status)
    })
  },
  // delete currency {id}
  deleteCurrency (param, callback, errCallback) {
    let option = {
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    }
    Vue.$http.post('removecurrency', param, option).then(function (response) {
      console.log('remove branch', response)
      callback(response.data)
    }).catch(function (response) {
      callback(response.response.status)
    })
  },
  // create branch {name}
  createBranch (param, callback) {
    let option = {
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    }
    Vue.$http.post('createbranch', param, option).then(function (response) {
      console.log('created branch', response)
      callback(response.data)
    }).catch(function (response) {
      console.log('heema', response.response.status)
      callback(response.response.status)
    })
  },
  // edit branch {
  //    _id : id, flag: flag, rates: []
  // }   }
  editBranch (param, callback, errCallback) {
    let option = {
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    }
    console.log(Store.state.token, 'token')
    Vue.$http.post('editbranch', param, option).then(function (response) {
      console.log('edit branch', response, Store.state.token)
      callback(response.data)
    }).catch(function (response) {
      console.log(response, 'err')
      callback(response.response.status)
    })
  }
}
