import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/ControllerLogin'
import DashBoard from '@/components/Controller'
import EditBranch from '@/components/ControllerEditBranch'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: HelloWorld
    },
    {
      path: '/dashboard',
      name: 'DashBoard',
      component: DashBoard
    },
    {
      path: '/editBranch',
      name: 'EditBranch',
      component: EditBranch
    }
  ]
})
